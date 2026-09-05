import React, { useState } from 'react';
import { api } from '../apis/client';
import { getCalendars, getCalendar, createCalendar, deleteCalendars, deleteCalendar } from '../apis/calendarApi';
import { getDailies, getDaily, createDaily, deleteDaily, deleteDailies, updateDaily } from '../apis/dailyApi';
import { getCategories, getCategory, createCategory, updateCategory, deleteCategory, deleteCategories } from '../apis/categoryApi';
import { getTodos, createTodo, updateTodo, deleteTodo, deleteTodos} from '../apis/todoApi';

import { USER_ID } from '../constants/config';

export default function TestPage() {
  const [testResult, setTestResult] = useState('');

  const handleConnectionTest = async () => {
    const information = {
      title: "Scikit-Learn",
      content: "Standard Scaler 공부하고 블로그 올리기",
      is_done: false
    }
    const data = await deleteTodos(USER_ID,2026,9,5,3);
    setTestResult(JSON.stringify(data, null, 2));
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