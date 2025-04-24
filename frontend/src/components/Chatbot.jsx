import React, { useState } from 'react';

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    // Add user's message to chat
    const newMessages = [...messages, { sender: 'user', text: userInput }];
    setMessages(newMessages);
    setUserInput('');

    try {
      const res = await fetch('http://localhost:5000/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ symptom: userInput })
      });

      const data = await res.json();

      setMessages([
        ...newMessages,
        { sender: 'bot', text: data.response || 'No response received.' }
      ]);
    } catch (error) {
      setMessages([
        ...newMessages,
        { sender: 'bot', text: 'Error connecting to chatbot.' }
      ]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div style={styles.container}>
      <h2>AI Medical Assistant</h2>
      <div style={styles.chatbox}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              ...styles.message,
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              background: msg.sender === 'user' ? '#aee1f9' : '#e2e2e2'
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="Enter your symptom..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyPress}
          style={styles.input}
        />
        <button onClick={sendMessage} style={styles.button}>Send</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: '400px',
    margin: 'auto',
    fontFamily: 'Arial, sans-serif',
    padding: '20px'
  },
  chatbox: {
    border: '1px solid #ccc',
    padding: '10px',
    height: '300px',
    overflowY: 'scroll',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '10px'
  },
  message: {
    padding: '8px 12px',
    borderRadius: '16px',
    margin: '4px 0',
    maxWidth: '70%'
  },
  inputContainer: {
    display: 'flex',
    gap: '10px'
  },
  input: {
    flex: 1,
    padding: '8px'
  },
  button: {
    padding: '8px 16px'
  }
};

export default Chatbot;
