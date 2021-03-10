import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Form, Tag } from 'react-bulma-components';
import useonClickOutside from 'hooks/useOnClickOutside';

import './travelers-picker.scss';

const getTextValue = (value) => {
  if (value.adults === 0) {
    return '';
  }
  if (value.adults === 1 && value.children === 0) {
    return 'and I will travel alone';
  }

  return `and we are ${value.adults} adult${value.adults > 1 ? 's' : ''} ${value.children > 0 ? `and ${value.children} children` : ''}`.trim();
};

const TravelersPicker = ({ value, onChange }) => {
  const ref = useRef();
  const [showPicker, setShowPicker] = useState(false);
  const valueInText = getTextValue(value);

  useonClickOutside(ref, () => {
    setShowPicker(false);
  });

  const onIncrease = (event) => {
    onChange({
      target: {
        name: 'travelers',
        value: {
          ...value,
          [event.target.dataset.name]: value[event.target.dataset.name] + 1,
        },
      },
    });
  };

  const onDecrease = (event) => {
    if (!value[event.target.dataset.name]) {
      return;
    }
    onChange({
      target: {
        name: 'travelers',
        value: {
          ...value,
          [event.target.dataset.name]: value[event.target.dataset.name] - 1,
        },
      },
    });
  };

  return (
    <div className="travelers-picker" ref={ref} style={{ position: 'relative ' }}>
      <Form.Input
        onFocus={() => {
          return setShowPicker(true);
        }}
        readOnly
        autoComplete="off"
        onChange={onChange}
        value={valueInText}
        name="travelers"
        placeholder="and we are 2 adults an a child"
      />
      {showPicker && (
        <Box className="picker">
          <div className="row">
            <div>Adults</div>
            <div className="count-selector">
              <Tag data-name="adults" onClick={onDecrease}>
                -
              </Tag>{' '}
              {value.adults}{' '}
              <Tag data-name="adults" onClick={onIncrease}>
                +
              </Tag>
            </div>
          </div>
          <div className="row">
            <div>Children</div>
            <div className="count-selector">
              <Tag data-name="children" onClick={onDecrease}>
                -
              </Tag>{' '}
              {value.children}{' '}
              <Tag data-name="children" onClick={onIncrease}>
                +
              </Tag>
            </div>
          </div>
        </Box>
      )}
    </div>
  );
};

TravelersPicker.propTypes = {
  value: PropTypes.shape({
    adults: PropTypes.number,
    children: PropTypes.number,
  }),
  onChange: PropTypes.func.isRequired,
};

export default TravelersPicker;
