/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';

import './autocomplete.scss';

const Autocomplete = ({ options = [], children, onSelect }) => {
  return (
    <div className="autocomplete">
      {options.map((option, i) => {
        return (
          <div
            role="presentation"
            key={i}
            onMouseDown={() => {
              onSelect(option);
            }}
            className="item"
          >
            {children(option)}
          </div>
        );
      })}
    </div>
  );
};

Autocomplete.propTypes = {
  children: PropTypes.func.isRequired,
  options: PropTypes.array,
  onSelect: PropTypes.func.isRequired,
};

export default Autocomplete;
