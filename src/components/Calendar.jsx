import { useState } from 'react';

function Calendar({ selectedDate, onDateSelect }) {
  const [calendarDate, setCalendarDate] = useState(new Date());

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handleDateSelect = (day) => {
    const selected = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), day);
    const formattedDate = formatDate(selected);
    onDateSelect(formattedDate);
  };

  const changeMonth = (direction) => {
    setCalendarDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const changeYear = (direction) => {
    setCalendarDate(prev => {
      const newDate = new Date(prev);
      newDate.setFullYear(prev.getFullYear() + direction);
      return newDate;
    });
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <div className="year-controls">
          <button type="button" onClick={() => changeYear(-1)}>‹‹</button>
          <span className="year-display">{calendarDate.getFullYear()}</span>
          <button type="button" onClick={() => changeYear(1)}>››</button>
        </div>
        <div className="month-controls">
          <button type="button" onClick={() => changeMonth(-1)}>‹</button>
          <span className="month-display">
            {calendarDate.toLocaleDateString('en-US', { month: 'long' })}
          </span>
          <button type="button" onClick={() => changeMonth(1)}>›</button>
        </div>
      </div>
      <div className="calendar-grid">
        <div className="weekdays">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="weekday">{day}</div>
          ))}
        </div>
        <div className="days-grid">
          {Array.from({ length: getFirstDayOfMonth(calendarDate) }, (_, i) => (
            <div key={`empty-${i}`} className="day empty"></div>
          ))}
          {Array.from({ length: getDaysInMonth(calendarDate) }, (_, i) => {
            const day = i + 1;
            const dayDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), day);
            const formattedDayDate = formatDate(dayDate);
            const isSelected = selectedDate === formattedDayDate;
            return (
              <div
                key={day}
                className={`day ${isSelected ? 'selected' : ''}`}
                onClick={() => handleDateSelect(day)}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Calendar;
