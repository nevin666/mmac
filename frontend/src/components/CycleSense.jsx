import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CycleSense.css';
import './Chatbot.css';

function CycleSense() {
  const [openFaq, setOpenFaq] = useState(null);
  const navigate = useNavigate();

  // Toggle FAQ function
  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Navigate to login page
  const handleGetStarted = () => {
    navigate('/login');
  };

  // Scroll to How It Works section
  const handleLearnMore = () => {
    const howItWorksSection = document.getElementById('how-it-works');
    if (howItWorksSection) {
      howItWorksSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // FAQ data
  const faqData = [
    {
      question: "Is my medical information safe with this chatbot?",
      answer: "Yes, your data is encrypted and securely stored. We prioritize your privacy and never share your personal information without consent."
    },
    {
      question: "How reliable are the health suggestions given?",
      answer: "Our suggestions are based on symptom-based models and medical data. However, they should not replace professional medical advice. Always consult a doctor for serious concerns."
    },
    {
      question: "Can I use this chatbot to get a diagnosis?",
      answer: "While we can suggest possible conditions based on symptoms, we do not provide official medical diagnoses. It’s best to follow up with a licensed healthcare provider."
    },
    {
      question: "Can this chatbot help with menstrual health or period tracking?",
      answer: "No! Our platform does not provides menstrual health insights, symptom tracking, and natural remedy suggestions tailored to your needs."
    },
    {
      question: "Do I need to pay to use all features?",
      answer: "No, the basic features including symptom checking, health tips, and chatbot assistance are completely free. More advanced features may be introduced in the future."
    }
  ];
  
  return (
    <>
      {/* Navigation */}
      <nav>
        <div className="nav-container">
          <div className="logo">Med<span>Xpert</span></div>
          <ul className="nav-links">
            <li><a href="#features">Features</a></li>
            <li><a href="#how-it-works">How It Works</a></li>
            <li><a href="#testimonials">Testimonials</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li>
              <Link to="/login" className="btn" aria-label="Log In or Sign Up">
                <img
                  src="https://tse2.mm.bing.net/th?id=OIP.OdFnKF-wSLIEZh1lzZinSgHaHa&pid=Api&P=0&h=180"
                  alt="Login Icon"
                  className="btn-icon"
                />
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
        <h1 className="hero-title">Where Health Meets Intelligence</h1>
<p className="hero-text">
  Whether it’s late-night symptoms or everyday doubts, your personal medical assistant 
  is here to listen, guide, and support — instantly and intelligently. 
  Take charge of your health with confidence.
</p>

          <div className="hero-buttons">
            <button className="btn-primary" onClick={handleGetStarted}>
              Get Started
            </button>
            <button className="btn-secondary" onClick={handleLearnMore}>
              Learn More
            </button>
          </div>
        </div>
        <div className="hero-img">
  <img 
    src="https://i.imgur.com/R2wpze5.jpeg" 
    alt="Health tracking illustration" 
  />
</div>

      </section>

      {/* Features Section */}
      <Features />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Calendar Demo Section */}
      <CalendarDemo />

      {/* Testimonials Section */}
      <Testimonials />

     {/* FAQ Section */}
      <section className="modern-faq" id="faq">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <div className="faq-container">
          {faqData.map((item, index) => (
            <div className="faq-item" key={index}>
              <div
                className="faq-question"
                onClick={() => toggleFaq(index)}
              >
                <span>{item.question}</span>
                <span className="faq-toggle">
                  {openFaq === index ? '−' : '+'}
                </span>
              </div>
              <div
                className={`faq-answer ${openFaq === index ? 'open' : ''}`}
              >
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
      <h2 className="cta-title">Get the Support You Deserve</h2>
<p className="cta-text">
  Whether it’s a quick question or a deeper concern, your personal medical chatbot is 
  here 24/7 with trusted answers and helpful tips. Start your journey to better health today.
</p>

      </section>

      {/* Footer */}
      <Footer />

      {/* Chatbot */}
      <Chatbot />
    </>
  );
}

function Features() {
  const featureData = [
    {
      icon: "💬",
      title: "Instant Medical Assistance",
      text: "Chat with your AI-powered health assistant anytime for quick answers to symptoms, conditions, and remedies."
    },
    {
      icon: "🔔",
      title: "Smart Health Reminders",
      text: "Stay on top of medications, appointments, and self-care with timely, personalized alerts."
    },
    {
      icon: "📊",
      title: "Health Tracking Dashboard",
      text: "Monitor your symptoms, mood, and daily health patterns in one easy-to-understand place."
    },
    {
      icon: "🧠",
      title: "AI-Driven Insights",
      text: "Receive intelligent suggestions and insights tailored to your health data and concerns."
    },
    {
      icon: "💡",
      title: "Trusted Remedies & Tips",
      text: "Explore doctor-backed remedies, lifestyle tips, and prevention strategies — all verified and easy to follow."
    },
    {
      icon: "🔒",
      title: "Your Data, Fully Private",
      text: "We prioritize your privacy. All your medical data is encrypted, secure, and never shared without your consent."
    },
    {
      icon: "🩺",
      title: "Symptom Checker",
      text: "Describe what you’re feeling and get quick, AI-powered suggestions on possible causes and when to seek medical attention."
    },
    {
      icon: "👩‍⚕️",
      title: "Verified Doctor Directory",
      text: "Browse a list of trusted doctors with specializations, locations, and contact info to help you find the right care quickly."
    }
    
    
  ];

  return (
    <section className="modern-features" id="features">
      <h2 className="section-title">Comprehensive Features</h2>
      <div className="features-grid">
        {featureData.map((feature, index) => (
          <div className="feature-card" key={index}>
            <div className="feature-icon">{feature.icon}</div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-text">{feature.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
// HowItWorks Component
function HowItWorks() {
  return (
    <section className="how-it-works" id="how-it-works">
      <h2 className="section-title">How MedExpert Works</h2>
      <div className="steps-container">
        <div className="step">
          <div className="step-number">1</div>
          <h3 className="step-title">Start a Conversation</h3>
          <p>Tell the chatbot your symptoms, questions, or concerns — it’s like chatting with a smart, friendly assistant.</p>
        </div>
        <div className="step">
          <div className="step-number">2</div>
          <h3 className="step-title">Get Instant Guidance</h3>
          <p>Receive quick, reliable answers based on verified medical information and intelligent analysis.</p>
        </div>
        <div className="step">
          <div className="step-number">3</div>
          <h3 className="step-title">Explore Personalized Tips</h3>
          <p>Access symptom relief tips, home remedies, and wellness suggestions tailored to your unique health needs.</p>
        </div>
        <div className="step">
          <div className="step-number">4</div>
          <h3 className="step-title">Connect to a Doctor</h3>
          <p>If needed, get referred to qualified doctors or specialists for further advice, appointments, or treatment options.</p>
        </div>
      </div>
    </section>
  );
}

// CalendarDemo Component
function CalendarDemo() {
  return (
    <section className="challenge-demo">
      <div className="challenge-content">
        <h2 className="section-title">Daily Self-Care Challenge</h2>
        <p className="hero-text">
          Empower your wellness journey with a simple daily challenge. Whether it's drinking more water,
          practicing mindfulness, or doing a light stretch — these small habits build a healthier you.
        </p>
        <ul className="challenge-list">
          <li>💧 Drink 8 glasses of water</li>
          <li>🧘‍♀️ Meditate for 5 minutes</li>
          <li>🚶‍♀️ Take a short walk</li>
          <li>😴 Sleep before 11 PM</li>
          <li>🍎 Eat one fruit</li>
        </ul>
        <p className="note-text">✨ Come back every day to discover a new challenge and track your growth!</p>
        </div>
<div className="challenge-img">
  <img 
    src="https://i.imgur.com/y0LZYVf.jpeg" 
    alt="Selfcare illustration" 
  />
</div>

    </section>
  );
}

//export default DailyChallengeDemo;


// Testimonials Component
function Testimonials() {
  const testimonialData = [
    {
      text: "Honestly, I didn’t expect a chatbot to be this helpful! The home remedies are super easy to follow, and the little self-care challenges brighten my day.",
      author: "Joel Prasad"
    },
    {
      text: "I had no clue how to deal with my headaches and fatigue before—this bot gave me tips that actually work. Plus, it feels like chatting with a smart friend!",
      author: "Nevin George"
    },
    {
      text: "Such a cute and useful assistant! I love the quick replies, wellness tips, and even the fun challenges. It's like a pocket cheerleader for my health.",
      author: "Aswin Menon"
    },
    {
      text: "I never thought I'd enjoy using a health app this much. The chatbot is super responsive, the advice feels personal, and I love how everything is easy to understand.",
      author: "Nevin Anil Davidson"
    }
    
    
  ];

  return (
    <section className="modern-testimonials" id="testimonials">
      <h2 className="section-title">What Our Users Say</h2>
      <div className="testimonials-container">
        {testimonialData.map((testimonial, index) => (
          <div className="testimonial-card" key={index}>
            <p className="testimonial-text">“{testimonial.text}”</p>
            <p className="testimonial-author">— {testimonial.author}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="modern-footer">
      <div className="footer-container">
        <div className="footer-column">
          <h3 className="footer-title">Med<span>Expert</span></h3>
          <p className="footer-text">
          Your friendly health companion, empowering you with reliable medical insights, self-care tips, and daily wellness support...
          </p>
          <div className="social-icons">
            <a href="#" className="social-icon" aria-label="Facebook">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" fill="#e83e8c"/>
              </svg>
            </a>
            <a href="#" className="social-icon" aria-label="Twitter">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" fill="#e83e8c"/>
              </svg>
            </a>
            <a href="#" className="social-icon" aria-label="LinkedIn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" fill="#e83e8c"/>
                <circle cx="4" cy="4" r="2" fill="#e83e8c"/>
              </svg>
            </a>
            <a href="#" className="social-icon" aria-label="Instagram">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2a10 10 0 0 0-6.5 17.5A10 10 0 0 0 12 22a10 10 0 0 0 6.5-17.5A10 10 0 0 0 12 2zm0 4.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11zm5 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" fill="#e83e8c"/>
              </svg>
            </a>
          </div>
        </div>
        <div className="footer-column">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-links">
            <li><a href="#">Home</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#how-it-works">How It Works</a></li>
            <li><a href="#testimonials">Testimonials</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3 className="footer-title">Resources</h3>
          <ul className="footer-links">
            <li><a href="#">Blog</a></li>
            <li><a href="#">Health Articles</a></li>
            <li><a href="#">Community Forum</a></li>
            <li><a href="#">Support Center</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3 className="footer-title">Legal</h3>
          <ul className="footer-links">
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Data Protection</a></li>
            <li><a href="#">Disclaimer</a></li>
          </ul>
        </div>
      </div>
      <div className="copyright">
        <p>© 2025 MedExpert. All rights reserved.</p>
        <p>This app does not provide medical advice. Consult with healthcare professionals for medical concerns.</p>
      </div>
    </footer>
  );
}
// Chatbot Component
function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  const OPENROUTER_API_KEY = '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';
  const API_ENDPOINT = 'https://openrouter.ai/api/v1/chat/completions';

  const getBotResponse = async (userMessage) => {
    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Chatbot',
        },
        body: JSON.stringify({
          model: 'deepseek/deepseek-chat:free',
          messages: [{ role: 'user', content: userMessage }],
          max_tokens: 5000,
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data);

      if (data.choices && data.choices.length > 0) {
        return data.choices[0].message.content;
      } else {
        throw new Error('Invalid API response structure');
      }
    } catch (error) {
      console.error('Error:', error);
      return 'Sorry, I encountered an error. Please try again.';
    }
  };

  const formatBotMessage = (message) => {
    message = message.replace(/\n/g, '<br>');
    message = message.replace(/(#+)\s(.+)/g, (match, hashes, text) => {
      const size = hashes.length;
      return `<h${size}>${text}</h${size}>`;
    });
    message = message.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
    message = message.replace(/\*(.*?)\*/g, '<i>$1</i>');
    return message;
  };

  const addMessageToChat = (message, isUser) => {
    const newMessage = {
      text: message,
      isUser,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const handleUserInput = async () => {
    const message = userInput.trim();
    if (!message) return;

    addMessageToChat(message, true);
    setUserInput('');

    const typingMessage = { isTyping: true, isUser: false };
    setMessages((prevMessages) => [...prevMessages, typingMessage]);

    try {
      const botResponse = await getBotResponse(message);
      setMessages((prevMessages) => {
        const filtered = prevMessages.filter(msg => !msg.isTyping);
        return [...filtered, {
          text: botResponse,
          isUser: false,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }];
      });
    } catch (error) {
      console.error('Error:', error);
      setMessages((prevMessages) => {
        const filtered = prevMessages.filter(msg => !msg.isTyping);
        return [...filtered, {
          text: 'Sorry, there was an error processing your request.',
          isUser: false,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }];
      });
    }
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    if (!isChatOpen && messages.length === 0) {
      addMessageToChat(
        "Hi there! 👋 I'm MAC(Medical Assistant Chatbot). How can I support your health and wellness today?",
        false
      );
    }
  };

  const botAvatarUrl = "https://i.imgur.com/i1DTH1G.png";

  return (
    <div>
      {!isChatOpen && (
        <button
          onClick={toggleChat}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '65px',
            height: '65px',
            borderRadius: '50%',
            backgroundColor: '#FF6B8B',
            color: 'white',
            border: 'none',
            boxShadow: '0 6px 16px rgba(255, 107, 139, 0.25)',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: '1000',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <img
            src={botAvatarUrl}
            alt="Medical Assistant Chatbot"
            style={{ width: '40px', height: '40px', borderRadius: '50%' }}
          />
        </button>
      )}

      {isChatOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '380px',
            height: '550px',
            borderRadius: '20px',
            backgroundColor: 'white',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            zIndex: '1000',
            border: '1px solid #f1f1f1',
            animation: 'slideUp 0.3s ease'
          }}
        >
          <div
            style={{
              padding: '16px 24px',
              background: 'linear-gradient(135deg, #FF6B8B 0%, #FF8E9E 100%)',
              color: 'white',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img
                src={botAvatarUrl}
                alt="Medical Assistant Chatbot"
                style={{ width: '36px', height: '36px', borderRadius: '50%', border: '2px solid rgba(255, 255, 255, 0.7)' }}
              />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontWeight: 'bold', fontSize: '16px' }}>Medical Assistant Chatbot</span>
                <span style={{ fontSize: '12px', opacity: '0.8' }}>Online</span>
              </div>
            </div>
            <button
              onClick={toggleChat}
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                color: 'white',
                fontSize: '18px',
                cursor: 'pointer',
                padding: '0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
            >
              ✕
            </button>
          </div>

          <div
            style={{
              flex: '1',
              padding: '20px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              backgroundColor: '#f8f9fd'
            }}
          >
            {messages.map((message, index) =>
              message.isTyping ? (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    maxWidth: '80%',
                    marginLeft: '0',
                    marginRight: 'auto'
                  }}
                >
                  <img
                    src={botAvatarUrl}
                    alt="Medical Assistant Chatbot"
                    style={{ width: '30px', height: '30px', borderRadius: '50%' }}
                  />
                  <div
                    style={{
                      padding: '12px 16px',
                      backgroundColor: 'white',
                      borderRadius: '18px',
                      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                      border: '1px solid #eaeaea'
                    }}
                  >
                    <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#FF6B8B', animation: 'bounce 1s infinite' }}></span>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#FF6B8B', animation: 'bounce 1s infinite .3s' }}></span>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#FF6B8B', animation: 'bounce 1s infinite .6s' }}></span>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth: '80%',
                    marginLeft: message.isUser ? 'auto' : '0',
                    marginRight: message.isUser ? '0' : 'auto',
                    gap: '4px'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-end',
                      gap: '8px',
                      flexDirection: message.isUser ? 'row-reverse' : 'row'
                    }}
                  >
                    {!message.isUser && (
                      <img
                        src={botAvatarUrl}
                        alt="Medical Assistant Chatbot"
                        style={{ width: '30px', height: '30px', borderRadius: '50%' }}
                      />
                    )}
                    <div
                      style={{
                        padding: '14px 18px',
                        borderRadius: '20px',
                        backgroundColor: message.isUser ? '#FF6B8B' : 'white',
                        color: message.isUser ? 'white' : '#333',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.08)',
                        border: message.isUser ? 'none' : '1px solid #eaeaea',
                        fontSize: '14px',
                        lineHeight: '1.6',
                        wordBreak: 'break-word',
                        borderBottomRightRadius: message.isUser ? '4px' : '20px',
                        borderBottomLeftRadius: !message.isUser ? '4px' : '20px'
                      }}
                      dangerouslySetInnerHTML={{ __html: message.text }}
                    />
                  </div>
                  <div
                    style={{
                      fontSize: '11px',
                      color: '#999',
                      alignSelf: message.isUser ? 'flex-end' : 'flex-start',
                      marginLeft: message.isUser ? '0' : '38px',
                      marginTop: '2px'
                    }}
                  >
                    {message.timestamp}
                  </div>
                </div>
              )
            )}
          </div>

          <div
            style={{
              padding: '16px 20px',
              borderTop: '1px solid #eaeaea',
              backgroundColor: 'white',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleUserInput()}
              placeholder="Type your question about tracking..."
              style={{
                flex: '1',
                padding: '14px 20px',
                borderRadius: '30px',
                border: '1px solid #e0e0e0',
                outline: 'none',
                fontSize: '14px',
                transition: 'all 0.3s',
                backgroundColor: '#f8f9fd',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05) inset'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#FF6B8B';
                e.target.style.boxShadow = '0 0 0 2px rgba(255, 107, 139, 0.15)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e0e0e0';
                e.target.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05) inset';
              }}
            />
            <button
              onClick={handleUserInput}
              style={{
                background: 'linear-gradient(135deg, #FF6B8B 0%, #FF8E9E 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '48px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'transform 0.3s, box-shadow 0.3s',
                boxShadow: '0 4px 10px rgba(255, 107, 139, 0.3)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 6px 12px rgba(255, 107, 139, 0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 10px rgba(255, 107, 139, 0.3)';
              }}
            >
              <span style={{ fontWeight: 'bold', fontSize: '20px' }}>→</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CycleSense;