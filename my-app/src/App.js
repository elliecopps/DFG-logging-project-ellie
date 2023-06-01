import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React, { useState } from 'react';


function App() {

  const [userMsg, setUserMsg] = useState('');
  const [messageSent, setMessageSent] = useState(false);

  const handleMsgChange = (event) => {
    setUserMsg(event.target.value);
  };

  const handleKeyDown = (event) => {
    //if the user presses enter, sends the message to the twilio api
    if (event.key === 'Enter'){
      handleSend();
    }
  };

  const handleSend = () => {
    console.log('sending message')
    logAPICall(userMsg);
  }

  async function logAPICall(message) {
    console.log(message);
    try {
  
      // Log the API call on the backend
      await axios.post('/api/send-message', {
        message: message,
        endpoint: 'http://localhost:3000',
      });
      setUserMsg('');
      // Set message sent state to true
      setMessageSent(true);

      // Reset the input value to empty after 3 seconds
      setTimeout(() => {
        setMessageSent(false);
      }, 3000);
    } catch (error) {
        // Log the API call error to Loggly
        await axios.post('/api/send-message', {
            message: 'API call error',
            endpoint: 'http://localhost:3000', 
            error: error.message
          });
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <input type='text' style = {{ marginRight: '5px' }} value={userMsg} onChange={handleMsgChange} onKeyDown={handleKeyDown}/>
          {messageSent ? <p>Message sent!</p> : <button onClick={handleSend}>Enter</button>}
        </div>
      </header>
    </div>
  );
}

export default App;
