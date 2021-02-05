import React, { useEffect, useState } from 'react';
import { Form } from 'react-bulma-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './date-picker.scss';

const DatePicker = ({ placeholder, name, value, onChange }) => {
  const [showCalendar, setShowCalendar] = useState(false)

  useEffect(() => {
    if (!showCalendar) {
      return;
    }

    const hide = () => {
      setShowCalendar(false);
    }
    window.requestAnimationFrame(() => {
      window.addEventListener('click', hide);
    })
    return () => window.removeEventListener('click', hide)
  }, [showCalendar])

  const onSelectDate = (value) => {
    setShowCalendar(false);
    onChange({
      target: {
        name, value,
      },
    });
  }

  return (
    <div className="date-picker">
      <Form.Input onChange={() => null} value={value ? value.toLocaleString().split(' ').shift() : ''} placeholder={placeholder} name={name} onFocus={() => setShowCalendar(true)} />
      {
        showCalendar && (
          <div onClick={evt => evt.stopPropagation()} className="calendar-container"><Calendar value={value} onChange={onSelectDate} /></div>
        )
      }
    </div>
  )
}


export default DatePicker;
