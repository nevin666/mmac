import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
// Removed useHistory since it's not used (useNavigate can be used if navigation is needed)
import './HospitalDirectory.css';

const HospitalDirectory = () => {
  const [hospitals, setHospitals] = useState([]);
  const [activeCategory, setActiveCategory] = useState('ayur'); // default category
  const [expandedHospital, setExpandedHospital] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Define categories outside of any hook to keep them stable between renders.
  const categories = [
    { id: 'gen', name: 'General Medicine', file: '/data/hosp.general.csv' },
    { id: 'gov', name: 'Government', file: '/data/hosp.govt gen.csv' },
    { id: 'ayur', name: 'Ayurvedic', file: '/data/hosp.ayur.csv' },
    { id: 'hom', name: 'Homeopathy', file: '/data/hosp.hom.csv' },
    { id: 'allo', name: 'Allopathic', file: '/data/hosp.allo.csv' }
  ];

  useEffect(() => {
    // Reset the search query whenever the active category changes.
    setSearchQuery('');

    // Determine the file path based on the active category.
    const fileUrl = categories.find(cat => cat.id === activeCategory)?.file;
    if (!fileUrl) return;

    fetch(fileUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network error: ${response.statusText}`);
        }
        return response.text();
      })
      .then(csvText => {
        // Parse CSV text using PapaParse.
        const results = Papa.parse(csvText, { header: true, skipEmptyLines: true });
        const data = results.data.map(row => {
          // Collect address parts from the CSV.
          const address = {
            street: row["address.street"],
            city: row["address.city"],
            state: row["address.state"],
            zip: row["address.zip"],
            country: row["address.country"]
          };

          // Gather departments from CSV columns [0] to [5].
          const departments = [];
          for (let i = 0; i < 6; i++) {
            const dept = row[`departments[${i}]`];
            if (dept && dept.trim() !== '') {
              departments.push(dept);
            }
          }

          return {
            name: row.name,
            address,
            phone: row.phone,
            website: row.website,
            type: row.type,
            departments
          };
        });
        setHospitals(data);
      })
      .catch(error => {
        console.error('Error fetching or parsing CSV file:', error);
      });
  }, [activeCategory]); // Only depending on activeCategory now

  // Filter hospitals based on the search query.
  const filteredHospitals = hospitals.filter(hospital => {
    const query = searchQuery.toLowerCase();
    return (
      hospital.name.toLowerCase().includes(query) ||
      hospital.address.street.toLowerCase().includes(query) ||
      hospital.address.city.toLowerCase().includes(query) ||
      hospital.address.state.toLowerCase().includes(query) ||
      hospital.address.zip.toLowerCase().includes(query) ||
      hospital.address.country.toLowerCase().includes(query)
    );
  });

  // Toggle the expanded view for hospital card details.
  const toggleHospital = (index) => {
    setExpandedHospital(expandedHospital === index ? null : index);
  };

  return (
    <div className="hospitals-container">
      <h1>Hospitals</h1>
      
      <div className="hospitals-categories">
        {categories.map(category => (
          <button 
            key={category.id}
            className={`category-button ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => {
              setActiveCategory(category.id);
              setExpandedHospital(null); // Collapse any open details when switching category.
            }}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Search bar specific to current hospital tab */}
      <div className="searchBarContainer">
        <input
          type="text"
          className="searchInput"
          placeholder="Search hospitals..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="hospitals-grid">
        {filteredHospitals.map((hospital, index) => (
          <div key={index} className="hospital-card">
            <h2 className="hospital-name">{hospital.name}</h2>
            <p className="hospital-address">
              {hospital.address.street}, {hospital.address.city}, {hospital.address.state} {hospital.address.zip}, {hospital.address.country}
            </p>
            <p className="hospital-phone"><strong>Phone:</strong> {hospital.phone}</p>
            <p className="hospital-website">
              <strong>Website:</strong> <a href={hospital.website} target="_blank" rel="noopener noreferrer">{hospital.website}</a>
            </p>
            <p className="hospital-type"><strong>Type:</strong> {hospital.type}</p>
            <button 
              className="view-details-button"
              onClick={() => toggleHospital(index)}
            >
              {expandedHospital === index ? 'Hide Departments' : 'Show Departments'}
            </button>
            {expandedHospital === index && (
              <div className="hospital-departments">
                <strong>Departments:</strong>
                <ul>
                  {hospital.departments.map((dept, i) => (
                    <li key={i}>{dept}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HospitalDirectory;
