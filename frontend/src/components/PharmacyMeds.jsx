import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import styles from './PharmacyMeds.module.css';

const PharmacyMeds = () => {
  const [pharmacies, setPharmacies] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all'); // only one category here
  const [expandedPharmacy, setExpandedPharmacy] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Dummy categories array to mimic the Remedies component structure.
  const pharmacyCategories = [
    { id: 'all', name: 'All Pharmacies' }
  ];

  useEffect(() => {
    // Fetch the CSV file (ensure Pharmacy.meds.csv is in your public folder)
    fetch('/data/pharmacy.med.csv')
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
        setPharmacies(filteredData);
      })
      .catch(error => console.error('Error fetching or parsing CSV file:', error));
  }, []);

  // Apply category filtering first.
  const pharmaciesByCategory = activeCategory === 'all' 
    ? pharmacies 
    : pharmacies.filter(pharmacy => pharmacy.category === activeCategory);

  // Apply the search filter on top of the category filtered results.
  const filteredPharmacies = pharmaciesByCategory.filter(pharmacy => {
    const query = searchQuery.toLowerCase();
    return (
      pharmacy.name.toLowerCase().includes(query) ||
      pharmacy.address.toLowerCase().includes(query) ||
      pharmacy.city.toLowerCase().includes(query) ||
      pharmacy.state.toLowerCase().includes(query) ||
      pharmacy.pincode.toLowerCase().includes(query)
    );
  });

  // Toggle the expanded view for pharmacy details.
  const togglePharmacy = (index) => {
    setExpandedPharmacy(expandedPharmacy === index ? null : index);
  };

  return (
    <div className={styles.pharmaciesContainer}>
      <div className={styles.headingContainer}>
        <h1 className={styles.mainHeading}>Pharmacy Directory</h1>
        <h2 className={styles.subHeading}>Your source for up-to-date pharmacy information</h2>
      </div>
      <p className={styles.pharmaciesIntro}>
        Explore each pharmacy’s address, contact information, and operating hours below.
      </p>

      <div className={styles.pharmaciesCategories}>
        {pharmacyCategories.map(category => (
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
      <div className={styles.searchBarContainer}>
        <input
          type="text"
          placeholder="Search pharmacies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.pharmaciesGrid}>
        {filteredPharmacies.map((pharmacy, index) => (
          <div key={index} className={styles.pharmacyCard}>
            <div className={styles.pharmacyHeader}>
              <h2 className={styles.pharmacyName}>{pharmacy.name}</h2>
            </div>
            <p className={styles.pharmacyAddress}>
              {pharmacy.address}, {pharmacy.city}, {pharmacy.state} - {pharmacy.pincode}
            </p>
            <button 
              className={styles.viewDetailsButton}
              onClick={() => togglePharmacy(index)}
            >
              {expandedPharmacy === index ? 'Hide Details' : 'View Details'}
            </button>
            {expandedPharmacy === index && (
              <div className="pharmacy-details">
                <p className={styles.pharmacyPhone}><strong>Phone:</strong> {pharmacy.phone}</p>
                <p className={styles.pharmacyEmail}><strong>Email:</strong> {pharmacy.email}</p>
                <p className={styles.pharmacyContact}><strong>Contact Person:</strong> {pharmacy.contact_person}</p>
                <p className={styles.pharmacyHours}><strong>Open Hours:</strong> {pharmacy.open_hours}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className={styles.pharmaciesDisclaimer}>
        <h3>Important Note:</h3>
        <p>
          This directory is for informational purposes only. Please contact the pharmacy directly for the most up-to-date information.
        </p>
      </div>
    </div>
  );
};

export default PharmacyMeds;
