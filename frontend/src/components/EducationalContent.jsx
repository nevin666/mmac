import React, { useState } from 'react';
import './EducationalContent.css';

const EducationalContent = () => {
  const [activeTab, setActiveTab] = useState('articles');
  const [expandedArticle, setExpandedArticle] = useState(null);
  const [expandedMyth, setExpandedMyth] = useState(null);
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  const articles = [
    {
      id: 1,
      category: 'Disease Overview',
      title: 'Understanding Common Diseases: Symptoms & Diagnosis',
      image: 'https://i.imgur.com/rNVGbgw.jpeg',
      summary: 'Learn how to identify common symptoms and the diagnostic tests used to confirm diseases.',
      content: `Detailed content about common diseases, their symptoms, and the importance of early and accurate diagnosis.`
    },
    {
      id: 2,
      category: 'Diagnostic Techniques',
      title: 'Modern Diagnostic Techniques in Medicine',
      image: 'https://i.imgur.com/Ibcl6Cj.jpeg',
      summary: 'Explore the latest advancements in diagnostic imaging, lab tests, and digital health technologies.',
      content: `Detailed content on the latest diagnostic tools including MRI, CT scans, blood tests, and AI-driven analysis.`
    },
    {
      id: 3,
      category: 'Treatment',
      title: 'Integrative Approaches to Disease Management',
      image: 'https://media.istockphoto.com/id/2189524135/vector/holistic-medicine-abstract-concept-vector-illustration.jpg?s=612x612&w=0&k=20&c=BsXei-Zm1IcNSYTx2ojNmsjIXWPo0pcJhylIqIfxc1M=',
      summary: 'Discover holistic methods and conventional treatments for managing chronic diseases.',
      content: `Detailed content discussing both conventional and complementary treatment strategies for various conditions.`
    },
    {
      id: 4,
      category: 'Prevention',
      title: 'Preventive Healthcare: Tips and Strategies',
      image: 'https://www.medicoverhospitals.in/images/articles/preventive-health-strategies-sangamner.webp',
      summary: 'Learn how lifestyle, diet, and regular screenings can help prevent serious illnesses.',
      content: `Detailed content on preventive measures, including lifestyle changes and routine screenings, to maintain long-term health.`
    },
    {
      id: 5,
      category: 'Case Studies',
      title: 'Real Life Case Studies in Disease Diagnosis',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4SZouwCa_4TNk2ziMJrni4xINZDGdY9HWUFQsJNYyo2_b-P6YC2UyTU4x9OW0F10tcKc&usqp=CAU',
      summary: 'Read about real-world cases where early diagnosis made a crucial difference in outcomes.',
      content: `Detailed case studies highlighting the impact of early diagnosis and treatment on patient outcomes.`
    }
  ];

  const myths = [
    {
      id: 1,
      myth: "A negative test result means you're completely disease-free",
      reality: "Many diagnostic tests have false negatives, so a negative result doesn't always guarantee the absence of disease. Follow-up tests and clinical evaluations are often necessary."
    },
    {
      id: 2,
      myth: "Diagnostic tests are always painful and invasive",
      reality: "Modern diagnostic tests include many non-invasive procedures, such as ultrasounds, blood tests, and MRI scans. Most tests are designed for patient comfort and safety."
    },
    {
      id: 3,
      myth: "All diseases present with clear and obvious symptoms",
      reality: "Some diseases, especially in their early stages, can be asymptomatic or have very subtle symptoms. This is why regular check-ups and screenings are important."
    },
    {
      id: 4,
      myth: "Self-diagnosis using online resources is accurate",
      reality: "While online information can be helpful for general awareness, self-diagnosis often leads to misinterpretation. A professional evaluation is essential for an accurate diagnosis."
    },
    {
      id: 5,
      myth: "Once diagnosed, there's no hope for recovery",
      reality: "Many diseases can be managed, treated, or even cured with early intervention and appropriate care. Advances in medicine continue to improve outcomes."
    },
    {
      id: 6,
      myth: "Diagnostic errors are extremely rare",
      reality: "Diagnostic errors can and do occur, which is why seeking a second opinion and undergoing thorough evaluations are important parts of healthcare."
    }
  ];

  const expertAdvice = [
    {
      id: 1,
      expert: "Dr. Sarah Thompson, Internist",
      question: "What are the most reliable diagnostic tests for chronic diseases?",
      answer: `Comprehensive blood panels, imaging studies like MRI and CT scans, and a detailed patient history are key to diagnosing chronic diseases. Always consult with a specialist for a complete evaluation.`
    },
    {
      id: 2,
      expert: "Dr. Michael Lee, Radiologist",
      question: "How has technology improved diagnostic accuracy?",
      answer: `Advancements in digital imaging and AI-driven analysis have significantly enhanced our ability to detect abnormalities early, leading to more accurate and timely diagnoses.`
    },
    {
      id: 3,
      expert: "Dr. Emily Carter, Epidemiologist",
      question: "What role does preventive screening play in disease management?",
      answer: `Preventive screening is crucial in early detection and management of diseases. It can lead to timely interventions that reduce complications and improve overall patient outcomes.`
    },
    {
      id: 4,
      expert: "Dr. James Rodriguez, Specialist",
      question: "What should patients do if they suspect a misdiagnosis?",
      answer: `If you suspect a misdiagnosis, seek a second opinion and request further testing. Clear communication with your healthcare provider is essential to ensure accurate diagnosis and treatment.`
    },
    {
      id: 5,
      expert: "Dr. Linda Gomez, Public Health Expert",
      question: "How can individuals stay informed about new diagnostic methods?",
      answer: `Staying informed involves consulting reputable sources, attending health seminars, and discussing new developments with your healthcare providers. Continuous education is key in an ever-evolving field.`
    }
  ];

  const toggleArticle = (id) => {
    setExpandedArticle(expandedArticle === id ? null : id);
  };

  const toggleMyth = (id) => {
    setExpandedMyth(expandedMyth === id ? null : id);
  };

  const toggleQuestion = (id) => {
    setExpandedQuestion(expandedQuestion === id ? null : id);
  };

  return (
    <div className="educational-content">
      <h1>Disease Diagnosis Education</h1>
      
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'articles' ? 'active' : ''}`} 
          onClick={() => setActiveTab('articles')}
        >
          Articles & Blogs
        </button>
        <button 
          className={`tab ${activeTab === 'myths' ? 'active' : ''}`} 
          onClick={() => setActiveTab('myths')}
        >
          Myth Busting
        </button>
        <button 
          className={`tab ${activeTab === 'expert' ? 'active' : ''}`} 
          onClick={() => setActiveTab('expert')}
        >
          Expert Advice
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'articles' && (
          <div className="articles-section">
            <p className="section-intro">
              Expand your knowledge about disease diagnosis with our expert-curated articles covering diagnostic techniques, treatment options, preventive care, and real-life case studies.
            </p>
            
            <div className="category-filters">
              <button className="category-filter active">All</button>
              <button className="category-filter">Disease Overview</button>
              <button className="category-filter">Diagnostic Techniques</button>
              <button className="category-filter">Treatment</button>
              <button className="category-filter">Prevention</button>
              <button className="category-filter">Case Studies</button>
            </div>

            <div className="articles-grid">
              {articles.map(article => (
                <div key={article.id} className="article-card">
                  <div className="article-image">
                    <img src={article.image} alt={article.title} />
                    <span className="article-category">{article.category}</span>
                  </div>
                  <div className="article-info">
                    <h3>{article.title}</h3>
                    <p>{article.summary}</p>
                    <button 
                      className="read-more" 
                      onClick={() => toggleArticle(article.id)}
                    >
                      {expandedArticle === article.id ? 'Read Less' : 'Read More'}
                    </button>
                    
                    {expandedArticle === article.id && (
                      <div className="article-content">
                        <p>{article.content}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'myths' && (
          <div className="myths-section">
            <p className="section-intro">
              Let's separate fact from fiction. Here we debunk common myths surrounding disease diagnosis and healthcare.
            </p>
            
            <div className="myths-list">
              {myths.map(item => (
                <div key={item.id} className="myth-item">
                  <div 
                    className="myth-header" 
                    onClick={() => toggleMyth(item.id)}
                  >
                    <h3>Myth: {item.myth}</h3>
                    <span className={`expand-icon ${expandedMyth === item.id ? 'expanded' : ''}`}>+</span>
                  </div>
                  
                  {expandedMyth === item.id && (
                    <div className="myth-reality">
                      <h4>Reality:</h4>
                      <p>{item.reality}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'expert' && (
          <div className="expert-section">
            <p className="section-intro">
              Our panel of healthcare professionals answers your most pressing questions about disease diagnosis and related concerns.
            </p>
            
            <div className="expert-questions">
              {expertAdvice.map(item => (
                <div key={item.id} className="expert-item">
                  <div 
                    className="expert-question" 
                    onClick={() => toggleQuestion(item.id)}
                  >
                    <div className="expert-header">
                      <h3>{item.question}</h3>
                      <span className="expert-name">{item.expert}</span>
                    </div>
                    <span className={`expand-icon ${expandedQuestion === item.id ? 'expanded' : ''}`}>+</span>
                  </div>
                  
                  {expandedQuestion === item.id && (
                    <div className="expert-answer">
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="ask-expert">
              <h3>Have a Question?</h3>
              <p>Submit your questions about disease diagnosis to our panel of experts.</p>
              <form className="question-form">
                <textarea placeholder="Type your question here..."></textarea>
                <button type="submit">Submit Question</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EducationalContent;
