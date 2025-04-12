import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import './LabMeds.css';

const LabMeds = () => {
  const [labs, setLabs] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all'); // only one category here
  const [expandedLab, setExpandedLab] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Dummy categories array to mimic the Remedies component structure.
  const labCategories = [
    { id: 'all', name: 'All Labs' }
  ];

  useEffect(() => {
    // Fetch the CSV file (ensure Labs.meds.csv is in your public folder)
    fetch('/data/Labs.meds.csv')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.text();
      })
      .then(csvText => {
        const results = Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true
        });
        // Extract only the required fields
        const filteredData = results.data.map(row => ({
          name: row.name,
          address: row.address,
          city: row.city,
          state: row.state,
          pincode: row.pincode,
          phone: row.phone,
          email: row.email,
          contact_person: row.contact_person,
          open_hours: row.open_hours
        }));
        setLabs(filteredData);
      })
      .catch(error => console.error('Error fetching or parsing CSV file:', error));
  }, []);

  // First filter labs by category (for now, only "all" is used)
  const labsByCategory = activeCategory === 'all'
    ? labs
    : labs.filter(lab => lab.category === activeCategory);

  // Apply search filter over the category filtered labs
  const filteredLabs = labsByCategory.filter(lab => {
    const query = searchQuery.toLowerCase();
    return (
      lab.name.toLowerCase().includes(query) ||
      lab.address.toLowerCase().includes(query) ||
      lab.city.toLowerCase().includes(query) ||
      lab.state.toLowerCase().includes(query) ||
      lab.pincode.toLowerCase().includes(query)
    );
  });

  // Toggle the expanded view for lab details.
  const toggleLab = (index) => {
    setExpandedLab(expandedLab === index ? null : index);
  };

  return (
    <div className="labs-container">
      <h1>Laboratory Directory</h1>
      <p className="labs-intro">
        Explore each laboratory’s address, contact information, and operating hours below.
      </p>

      <div className="labs-categories">
        {labCategories.map(category => (
          <button 
            key={category.id}
            className={`category-button ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="searchBarContainer">
        <input
          type="text"
          placeholder="Search labs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="searchInput"
        />
      </div>

      <div className="labs-grid">
        {filteredLabs.map((lab, index) => (
          <div key={index} className="lab-card">
            <div className="lab-header">
              <h2 className="lab-name">{lab.name}</h2>
            </div>
            <p className="lab-address">
              {lab.address}, {lab.city}, {lab.state} - {lab.pincode}
            </p>
            <button 
              className="view-details-button"
              onClick={() => toggleLab(index)}
            >
              {expandedLab === index ? 'Hide Details' : 'View Details'}
            </button>
            {expandedLab === index && (
              <div className="lab-details">
                <p className="lab-phone"><strong>Phone:</strong> {lab.phone}</p>
                <p className="lab-email"><strong>Email:</strong> {lab.email}</p>
                <p className="lab-contact"><strong>Contact Person:</strong> {lab.contact_person}</p>
                <p className="lab-hours"><strong>Open Hours:</strong> {lab.open_hours}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="labs-disclaimer">
        <h3>Important Note:</h3>
        <p>
          This directory is for informational purposes only. Please contact the laboratory directly for the most up-to-date information.
        </p>
      </div>
    </div>
  );
};

export default LabMeds;
