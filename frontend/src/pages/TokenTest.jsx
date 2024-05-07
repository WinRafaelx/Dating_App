import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TokenTest = () => {
  const [tokenData, setTokenData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/app', {withCredentials: true});
        console.log(response.data);
        setTokenData(response.data);
      } catch (error) {
        setError(error.response.data);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Token Test</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {tokenData && (
        <div>
          <h3>Decoded Token</h3>
          <pre>{JSON.stringify(tokenData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default TokenTest;
