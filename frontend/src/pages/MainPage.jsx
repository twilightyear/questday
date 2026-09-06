import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StreakGrid from '../components/StreakGrid';
import { USER_ID } from '../constants/config';
import { getCalendars } from '../apis/calendarApi';

export default function MainPage() {
    const [calendarData, setCalendarData] = useState([]);

    useEffect(() => {
        const fetchCalendarData = async () => {
            try {
                const response = await getCalendars(USER_ID);
                setCalendarData(response);
            } catch (error) {
                console.error("[ Calendar API 에러 발생 ] : ", error);
            }
        };

        fetchCalendarData();
    }, []);

    return (
        <div>
            <StreakGrid calendarData={calendarData} />
        </div>
    );
}