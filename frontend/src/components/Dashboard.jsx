import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faCalendarAlt,
  faChartLine,
  faNotesMedical,
  faUserMd,
  faBook,
  faUsers,
  faCog,
  faClock,
  faChartPie,
  faStethoscope,
  faStickyNote,
  faLightbulb,
  faPlus,
  faBell,
  faChevronLeft,
  faChevronRight,
  faTint,
  faBolt,
  faHeadSideVirus,
  faCloudRain,
  faTemperatureHigh,
  faTired,
  faExclamationTriangle,
  faRunning,
  faHeartbeat,
  faHotTub,
  faSpinner,
  faAppleAlt,
  faSync,
  faHospital,
  faMessage
} from '@fortawesome/free-solid-svg-icons';
import './Dashboard.css';
import PeriodTrackerForm from './PeriodTrackerForm';
import axios from 'axios';
import Chatbot from './Chatbot';

const Dashboard = ({ isAuthenticated, setIsAuthenticated }) => {
  // Rename "cycleData" to "diagnosisData" to store symptom info
  const [activeSymptom, setActiveSymptom] = useState(null);
  const [notes, setNotes] = useState([
    { date: 'March 15, 2025', text: 'Started feeling severe headache and fatigue. Rested and hydrated.' },
    { date: 'March 9, 2025', text: 'Noticed mild fever and body aches. Took over-the-counter pain reliever.' },
    { date: 'March 5, 2025', text: 'Mild cough and slight fever. Monitoring symptoms closely.' },
  ]);
  const [newNote, setNewNote] = useState('');
  const [showForm, setShowForm] = useState(false); // Show form for new symptom data
  const [diagnosisData, setDiagnosisData] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // New function to navigate to Doctors route
  const navigateTodoctors = () => {
    navigate('/doctors');
  };

  // Format date for display
  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Fetch symptom/diagnosis data from database
  const fetchDiagnosisData = async () => {
    const userEmail = localStorage.getItem('email');

    if (!userEmail) {
      setShowForm(true);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/get-diagnosis-data?email=${userEmail}`);

      if (response.data) {
        // Convert the data from the database to the format expected by the Dashboard
        const formattedData = {
          symptomStartDate: new Date(response.data.symptomStart),
          severity: parseInt(response.data.severity),
          duration: parseInt(response.data.duration),
        };

        setDiagnosisData(formattedData);
        setShowForm(false);
      } else {
        setShowForm(true);
      }
    } catch (error) {
      console.error('Error fetching diagnosis data:', error);
      setShowForm(true);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchDiagnosisData();
  }, []);

  // Handle refresh button click
  const handleRefresh = () => {
    setLoading(true); // Show loading spinner
    fetchDiagnosisData(); // Re-fetch data
  };

  // Compute diagnosis prediction based on severity and duration
  const calculateDiagnosis = () => {
    if (!diagnosisData) return { prediction: 'unknown', advice: '' };

    const { severity, duration } = diagnosisData;
    let prediction = '';
    let advice = '';

    if (severity >= 8 && duration >= 7) {
      prediction = 'High Risk - Seek immediate medical attention';
      advice = 'Your symptoms indicate a high-risk condition. Please consult a healthcare provider as soon as possible.';
    } else if (severity >= 5 && duration >= 4) {
      prediction = 'Moderate Risk - Monitor closely';
      advice = 'Your symptoms are moderate. Keep monitoring your condition and consider consulting a doctor if they worsen.';
    } else {
      prediction = 'Low Risk - Self-care recommended';
      advice = 'Your symptoms appear mild. Consider home care and monitor for any changes.';
    }

    return { prediction, advice };
  };

  // Calculate the next recommended check-up date based on symptom start date and duration
  const calculateNextCheckup = () => {
    if (!diagnosisData) return null;

    const { symptomStartDate, duration } = diagnosisData;
    const nextCheckup = new Date(symptomStartDate);
    // Arbitrary recommendation: check-up after duration + 3 days
    nextCheckup.setDate(nextCheckup.getDate() + duration + 3);
    return nextCheckup;
  };

  // Handle form submission
  const handleFormSubmit = async (data) => {
    setDiagnosisData(data);

    const userEmail = localStorage.getItem('email');

    if (userEmail) {
      try {
        const response = await axios.post('http://localhost:5000/add-diagnosis', {
          email: userEmail,
          symptomStart: data.symptomStartDate.toISOString(),
          severity: data.severity.toString(),
          duration: data.duration.toString(),
        });

        if (response.status === 201) {
          console.log('Diagnosis data saved successfully');
        }
      } catch (error) {
        console.error('Error saving diagnosis data:', error);
      }
    }

    setShowForm(false);
  };

  // Handle quiz navigation
  const navigateToQuiz = () => {
    navigate('/quiz');
  };

  const navigateToremedies = () => {
    navigate('/remedies');
  };

  const navigateTocontents = () => {
    navigate('/contents');
  };

  // Navigation for LabMeds route
  const navigateTolabs = () => {
    navigate('/labs');
  };

  // Navigation for Hospital Directory route
  const navigateToHospitals = () => {
    navigate('/hospitals');
  };

  // Navigation for Pharmacy Directory route
  const navigateToPharmacies = () => {
    navigate('/pharmacies');
  };
  const navigateToChatbot = () => {
    navigate('/dashboard/chatbot');
  };

  // Safely calculate diagnosis info and next check-up date
  const diagnosisInfo = diagnosisData ? calculateDiagnosis() : { prediction: 'No Data', advice: '' };
  const nextCheckup = diagnosisData ? calculateNextCheckup() : null;

  return (
    <div>
      {loading ? (
        <div className="loading-spinner">
          <FontAwesomeIcon icon={faSpinner} spin />
          <p>Loading your health data...</p>
        </div>
      ) : (
        <>
          {/* Symptom Tracker Form Modal */}
          {showForm && (
            <PeriodTrackerForm
              onSubmit={handleFormSubmit}
              onClose={() => setShowForm(false)}
            />
          )}

          {/* Dashboard Content */}
          {!showForm && (
            <>
              {/* Navigation */}
              <nav>
                <div className="nav-container">
                  <div className="logo">
                    Med<span>Xpert</span>
                  </div>
                  <div className="user-profile">
                    {/* Add user profile info if needed */}
                  </div>
                </div>
              </nav>

              {/* Dashboard Layout */}
              <div className="dashboard">
                {/* Sidebar */}
                <div className="sidebar">
                  <ul className="sidebar-menu">
                  <li>
                      <Link to="/dashboard/chatbot" onClick={navigateToChatbot}>
                        <FontAwesomeIcon icon={faMessage} /> Chatbot
                      </Link>
                    </li>
                    <li>
                      <Link to="/remedies" onClick={navigateToremedies}>
                        <FontAwesomeIcon icon={faHome} /> Remedies
                      </Link>
                    </li>
                    <li>
                      <Link to="/quiz" onClick={navigateToQuiz}>
                        <FontAwesomeIcon icon={faChartLine} /> Health Status
                      </Link>
                    </li>
                    <li>
                      <Link to="/contents" onClick={navigateTocontents}>
                        <FontAwesomeIcon icon={faChartLine} /> Contents
                      </Link>
                    </li>
                    <li>
                      <Link to="/labs" onClick={navigateTolabs}>
                        <FontAwesomeIcon icon={faUserMd} /> Labs
                      </Link>
                    </li>
                    <li>
                      <Link to="/hospitals" onClick={navigateToHospitals}>
                        <FontAwesomeIcon icon={faHospital} /> Hospitals
                      </Link>
                    </li>
                    <li>
                      <Link to="/pharmacies" onClick={navigateToPharmacies}>
                        <FontAwesomeIcon icon={faNotesMedical} /> Pharmacies
                      </Link>
                    </li>
                    {/* New Doctor Directory Link */}
                    <li>
                      <Link to="/doctors" onClick={navigateTodoctors}>
                        <FontAwesomeIcon icon={faStethoscope} /> Doctors
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Main Content */}
                <div className="main-content">
                  {/* Dashboard Header */}
                  <div className="dashboard-header">
                    <div>
                      <h2 className="greeting">Hello Patient</h2>
                      <p className="date">
                        {new Date().toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                    <div className="actions">
                      <button onClick={() => setShowForm(true)}>
                        <FontAwesomeIcon icon={faPlus} /> Log Symptoms
                      </button>
                      <button>
                        <FontAwesomeIcon icon={faBell} /> Reminders
                      </button>
                      <button onClick={handleRefresh}>
                        <FontAwesomeIcon icon={faSync} /> Refresh
                      </button>
                    </div>
                  </div>

                  {/* Widgets Grid */}
                  <div className="widgets-grid">
                    {/* Health Status Widget */}
                    <div className="widget">
                      <div className="widget-header">
                        <h3 className="widget-title">Health Status</h3>
                        <div className="widget-icon">
                          <FontAwesomeIcon icon={faStethoscope} />
                        </div>
                      </div>
                      <div className="widget-content">
                        <div className="health-status">
                          {diagnosisData ? (
                            <>
                              <h2>
                                Symptoms started on{' '}
                                {new Date(diagnosisData.symptomStartDate).toLocaleDateString()}
                              </h2>
                              <p>
                                Severity: {diagnosisData.severity} / 10 | Duration: {diagnosisData.duration} days
                              </p>
                              <h3>Diagnosis Prediction:</h3>
                              <p className="prediction">{diagnosisInfo.prediction}</p>
                              <p className="advice">{diagnosisInfo.advice}</p>
                              {nextCheckup && (
                                <div className="upcoming-checkup">
                                  <span className="date-label">Next Check-up Recommended:</span>
                                  <span className="date-value">{formatDate(nextCheckup)}</span>
                                </div>
                              )}
                            </>
                          ) : (
                            <div className="no-data-message">
                              <p>Please log your symptom data to receive a diagnosis prediction</p>
                              <button onClick={() => setShowForm(true)} className="action-button">
                                <FontAwesomeIcon icon={faPlus} /> Log Symptoms
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Additional Dashboard widgets can be added here */}
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
