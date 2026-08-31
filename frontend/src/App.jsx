import { useState } from 'react';
import axios from 'axios';

function App() {
  const [apiData, setApiData] = useState("아직 불러온 데이터가 없어요");

  const handleFetch = async () => {
    try {
      const response = await axios.get('https://improved-capybara-jgggj56j7462jj54-8000.app.github.dev/users/1/calendars'); 
      setApiData(JSON.stringify(response.data, null, 2));
    } catch (error) {
      setApiData("에러 발생!");
      console.error(error);
    }
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>내 백엔드 연동 테스트</h1>
      <button 
        onClick={handleFetch}
        style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
      >
        백엔드 데이터 가져오기
      </button>
      <pre style={{ 
        background: '#f4f4f4', 
        padding: '20px', 
        marginTop: '20px', 
        borderRadius: '8px',
        maxHeight: '400px',
        overflow: 'auto' 
      }}>
        {apiData}
      </pre>
    </div>
  );
}

export default App;