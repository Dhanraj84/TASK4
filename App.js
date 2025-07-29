import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/stats')
      .then(res => setStats(res.data));
  }, []);

  return (
    <div>
      <h2>Weekly Productivity Analytics</h2>
      <table border="1">
        <thead>
          <tr><th>Domain</th><th>Time Spent (sec)</th></tr>
        </thead>
        <tbody>
          {stats.map((s, i) => (
            <tr key={i}><td>{s.domain}</td><td>{s.timeSpent}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
