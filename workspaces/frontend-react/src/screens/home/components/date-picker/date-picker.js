import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bulma-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './date-picker.scss';
import useonClickOutside from 'hooks/useOnClickOutside';

const DatePicker = ({ placeholder = undefined, name = undefined, value = undefined, onChange }) => {
  const [showCalendar, setShowCalendar] = useState(false);

  const ref = useRef();

  useonClickOutside(ref, () => {
    setShowCalendar(false);
  });

  const onSelectDate = (newValue) => {
    setShowCalendar(false);
    onChange({
      target: {
        name,
        value: newValue,
      },
    });
  };

  return (
    <div ref={ref} className="date-picker">
      <Form.Input
        onChange={() => {
          return null;
        }}
        value={value ? value.toLocaleString().split(' ').shift() : ''}
        placeholder={placeholder}
        autoComplete="off"
        autoCapitalize="off"
        name={name}
        onFocus={() => {
          return setShowCalendar(true);
        }}
      />
      {showCalendar && (
        <div
          role="presentation"
          onClick={(evt) => {
            return evt.stopPropagation();
          }}
          className="calendar-container"
        >
          <Calendar value={value} onChange={onSelectDate} />
        </div>
      )}
    </div>
  );
};

DatePicker.propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.instanceOf(Date),
  onChange: PropTypes.func.isRequired,
};

export default DatePicker;
