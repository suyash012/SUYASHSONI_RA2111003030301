import React, { useState } from 'react';
import axios from 'axios';

const AuthTokenComponent = () => {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  const getAuthToken = async () => {
    const apiUrl = 'https://20.244.56.144/test/auth';
    const requestData = {
      companyName: 'goMart',
      clientID: 'dc0e121b-6e47-4c76-80a3-cea29619166a',
      clientSecret: 'bmHEzhWFhiqjGJCN',
      ownerName: 'Suyash Soni',
      ownerEmail: 'ss9333@srmist.edu.in',
      rollNo: 'RA2111003030301'
    };

    try {
      const response = await axios.post(apiUrl, requestData);
      if (response.status === 200) {
        const responseData = response.data; // Assuming the response is JSON
        setToken(responseData.token); // Assuming the response contains a 'token' field
        setError('');
      } else {
        setError(`Error getting token: ${response.status}`);
        setToken('');
      }
    } catch (error) {
      setError(`Request error: ${error.message}`);
      setToken('');
    }
  };

  return (
    <div>
      <button onClick={getAuthToken}>Get Auth Token</button>
      {token && <p>Token: {token}</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};


export default AuthTokenComponent;
