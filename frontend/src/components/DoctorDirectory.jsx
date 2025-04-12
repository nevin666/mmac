import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import './DoctorDirectory.css';

const DoctorDirectory = () => {
  const [doctors, setDoctors] = useState([]);
  // activeTab controls the view mode: either 'allSpec' (grouped by speciality) or 'allHosp' (grouped by hospital)
  const [activeTab, setActiveTab] = useState('allSpec');
  // expandedGroup holds the name of the currently expanded grouping (speciality or hospital)
  const [expandedGroup, setExpandedGroup] = useState(null);
  // Separate search states for the two modes (group search)
  const [specSearch, setSpecSearch] = useState('');
  const [hospSearch, setHospSearch] = useState('');
  // Doctor name search (common for both tabs)
  const [doctorSearch, setDoctorSearch] = useState('');

  // CSV file for doctors
  const csvFile = '/data/Doctors.csv';

  useEffect(() => {
    fetch(csvFile)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network error: ${response.statusText}`);
        }
        return response.text();
      })
      .then(csvText => {
        const results = Papa.parse(csvText, { header: true, skipEmptyLines: true });
        const data = results.data.map(row => ({
          name: row.name,
          speciality: row.speciality,
          contact: row.contact,
          qualification: row.qualification,
          rating: row.rating,
          consultation_time: row.consultation_time,
          hospital: row.hospital
        }));
        setDoctors(data);
      })
      .catch(error => {
        console.error('Error fetching or parsing CSV file:', error);
      });
  }, []);

  // Toggle the expanded view for a given group (speciality or hospital)
  const toggleGroup = (groupName) => {
    setExpandedGroup(expandedGroup === groupName ? null : groupName);
  };

  // First filter doctors by the doctor search query
  const filteredDoctors = doctors.filter(doc =>
    doc.name.toLowerCase().includes(doctorSearch.toLowerCase())
  );

  // Group filtered doctors by speciality or hospital based on the current active tab
  let groups = {};
  if (activeTab === 'allSpec') {
    groups = filteredDoctors.reduce((acc, doctor) => {
      if (!acc[doctor.speciality]) {
        acc[doctor.speciality] = [];
      }
      acc[doctor.speciality].push(doctor);
      return acc;
    }, {});
  } else if (activeTab === 'allHosp') {
    groups = filteredDoctors.reduce((acc, doctor) => {
      if (!acc[doctor.hospital]) {
        acc[doctor.hospital] = [];
      }
      acc[doctor.hospital].push(doctor);
      return acc;
    }, {});
  }

  // Use the appropriate group search query based on active tab
  const groupSearchQuery = activeTab === 'allSpec' ? specSearch : hospSearch;

  // Filter group names based on the group search query (case-insensitive)
  const filteredGroupNames = Object.keys(groups).filter(groupName =>
    groupName.toLowerCase().includes(groupSearchQuery.toLowerCase())
  );

  return (
    <div className="doctors-container">
      <h1>Doctors Directory</h1>
      
      {/* Tabs for All Specialities / All Hospitals */}
      <div className="speciality-tabs">
        <button 
          className={`category-button ${activeTab === 'allSpec' ? 'active' : ''}`}
          onClick={() => { 
            setActiveTab('allSpec'); 
            setExpandedGroup(null);
            setSpecSearch('');
            setHospSearch('');
          }}
        >
          All Specialities
        </button>
        <button 
          className={`category-button ${activeTab === 'allHosp' ? 'active' : ''}`}
          onClick={() => { 
            setActiveTab('allHosp'); 
            setExpandedGroup(null);
            setSpecSearch('');
            setHospSearch('');
          }}
        >
          All Hospitals
        </button>
      </div>
      
      {/* Flex container for search bars */}
      <div className="search-bars-container">
        {activeTab === 'allSpec' && (
          <div className="search-bar group-search">
            <input
              type="text"
              placeholder="Search Specialities..."
              value={specSearch}
              onChange={(e) => setSpecSearch(e.target.value)}
            />
          </div>
        )}
        {activeTab === 'allHosp' && (
          <div className="search-bar group-search">
            <input
              type="text"
              placeholder="Search Hospitals..."
              value={hospSearch}
              onChange={(e) => setHospSearch(e.target.value)}
            />
          </div>
        )}
        <div className="search-bar doctor-search">
          <input
            type="text"
            placeholder="Search Doctors..."
            value={doctorSearch}
            onChange={(e) => setDoctorSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Group Container: Display groups in a single column */}
      <div className="groups-container">
        {filteredGroupNames.map((groupName, index) => (
          <div key={index} className="group-card">
            <h2 className="group-title">{groupName}</h2>
            <button 
              className="toggle-button"
              onClick={() => toggleGroup(groupName)}
            >
              {expandedGroup === groupName ? 'Hide Doctors' : 'Show Doctors'}
            </button>
            {expandedGroup === groupName && (
              <div className="doctor-cards">
                {groups[groupName].map((doc, i) => (
                  <div key={i} className="doctor-card">
                    <h3 className="doctor-name">{doc.name}</h3>
                    <p className="doctor-contact">
                      <strong>Contact:</strong> {doc.contact}
                    </p>
                    <p className="doctor-qualification">
                      <strong>Qualification:</strong> {doc.qualification}
                    </p>
                    <p className="doctor-rating">
                      <strong>Rating:</strong> {doc.rating}
                    </p>
                    <p className="doctor-consultation">
                      <strong>Consultation Time:</strong> {doc.consultation_time}
                    </p>
                    {activeTab === 'allSpec' && (
                      <p className="doctor-hospital">
                        <strong>Hospital:</strong> {doc.hospital}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorDirectory;
