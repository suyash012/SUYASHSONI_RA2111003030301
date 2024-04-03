import React, { useState } from 'react';
import AuthTokenComponent from './components/uthTokenComponent.jsx';
import Calculator from './components/calculator.jsx';

const RegisterForm = () => {
  const [companyName, setCompanyName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [registrationData, setRegistrationData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = 'http://20.244.56.144/test/register';
    const payload = {
      companyName,
      ownerName,
      rollNo,
      ownerEmail,
      accessCode,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      setRegistrationData(data);
      setError(null);
    } catch (error) {
      console.error('Error:', error);
      setError('Registration failed. Please try again.');
      setRegistrationData(null);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Owner Name"
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Roll No"
          value={rollNo}
          onChange={(e) => setRollNo(e.target.value)}
        />
        <input
          type="email"
          placeholder="Owner Email"
          value={ownerEmail}
          onChange={(e) => setOwnerEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Access Code"
          value={accessCode}
          onChange={(e) => setAccessCode(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
      {error && <p>{error}</p>}
      {registrationData && (
        <div>
          <h3>Registration Successful</h3>
          <pre>{JSON.stringify(registrationData, null, 2)}</pre>
        </div>
      )}
      <AuthTokenComponent/>
      <Calculator/>

    </div>
  );
};

export default RegisterForm;