import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Loader } from 'react-bulma-components';
import api from 'services/api';
import { Autocomplete } from 'components/autocomplete';

import './destination-picker.scss';
import ModalMap from './components/modal-map';

const DestinationPicker = ({ value, onChange, onSelect }) => {
  const [destinations, setDestinations] = useState({
    options: [],
    selected: undefined,
  });
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [showMap, setShowMap] = useState(false);

  useEffect(async () => {
    if (!value || !showAutocomplete) {
      setDestinations({
        options: [],
        selected: undefined,
      });
      return;
    }
    setDestinations({
      options: [{ isLoading: true }],
      selected: undefined,
    });
    const options = await api.autocomplete({ term: value });
    setDestinations({
      options,
      selected: undefined,
    });
  }, [value, showAutocomplete]);

  return (
    <>
      <div style={{ position: 'relative ' }}>
        <Form.Input
          onFocus={() => {
            setShowAutocomplete(true);
          }}
          onBlur={() => {
            setShowAutocomplete(false);
          }}
          autoComplete="off"
          autoCapitalize="off"
          onChange={onChange}
          value={value}
          name="destination"
          placeholder="I want to go to"
        />
        {showAutocomplete && (
          <Autocomplete options={destinations.options} onSelect={onSelect}>
            {(option) => {
              if (option.isLoading) {
                return (
                  <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Loader color="primary" />
                  </div>
                );
              }
              return <div>{option.name}</div>;
            }}
          </Autocomplete>
        )}
      </div>
      <Form.Label
        onClick={() => {
          return setShowMap(true);
        }}
        textColor="white"
      >
        Or select a neighborhood on the map
      </Form.Label>
      <ModalMap
        show={showMap}
        onClose={() => {
          setShowMap(false);
        }}
        onSelect={(neighborhood) => {
          onSelect({
            name: `${neighborhood.properties.neighborhood}, ${neighborhood.properties.neighborhood_group}`,
          });
          setShowMap(false);
        }}
      />
    </>
  );
};

DestinationPicker.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default DestinationPicker;
