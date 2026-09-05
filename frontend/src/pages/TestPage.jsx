import React, { useState } from 'react';
import { api } from '../apis/client';

export default function TestPage() {
  const [testResult, setTestResult] = useState('');

  const handleConnectionTest = async () => {
    try {
      const response = await api.get('/users/1/calendars');
      setTestResult(`백엔드 통신 성공! 데이터 수: ${response.data.length}`);
    } catch (err) {
      console.error(err);
      setTestResult('통신 실패: ' + err.message);
    }
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>QuestDay Frontend Test</h1>
      <button 
        onClick={handleConnectionTest}
        style={{ padding: '10px 20px', cursor: 'pointer', marginTop: '10px' }}
      >
        백엔드 연결 테스트
      </button>
      <p style={{ marginTop: '20px', fontWeight: 'bold' }}>{testResult}</p>
    </div>
  );
}