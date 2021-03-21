import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Loader } from 'react-bulma-components';
import api from 'services/api';
import { Autocomplete } from 'components/autocomplete';

import './destination-picker.scss';
import useonClickOutside from 'hooks/useOnClickOutside';
import ModalMap from './components/modal-map';

const DestinationPicker = ({ onSelect, value }) => {
  const [textValue, setTextValue] = useState('');
  const [destinations, setDestinations] = useState({
    options: [],
    selected: undefined,
  });
  const ref = useRef();
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [showMap, setShowMap] = useState(false);
  useonClickOutside(ref, () => {
    setShowAutocomplete(false);
  });

  useEffect(async () => {
    if (!textValue || !showAutocomplete) {
      setDestinations({
        options: [],
        selected: undefined,
      });
      return;
    }
    const options = await api.autocomplete({ term: textValue });
    setDestinations({
      options,
      selected: undefined,
    });
  }, [textValue, showAutocomplete]);

  useEffect(() => {
    if (!value) {
      return;
    }
    setTextValue(`${value.properties.neighborhood}, ${value.properties.neighborhood_group}`);
  }, [value]);

  return (
    <>
      <div ref={ref} style={{ position: 'relative ' }}>
        <Form.Input
          onFocus={(evt) => {
            setShowAutocomplete(true);
            evt.target.select();
          }}
          autoComplete="off"
          autoCapitalize="off"
          onChange={({ target }) => {
            setTextValue(target.value);
          }}
          value={textValue}
          name="destination"
          placeholder="I want to go to"
        />
        {showAutocomplete && (
          <Autocomplete
            options={destinations.options}
            onSelect={(neighborhood) => {
              onSelect(neighborhood);
              setShowAutocomplete(false);
            }}
          >
            {(option) => {
              if (option.isLoading) {
                return (
                  <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Loader color="primary" />
                  </div>
                );
              }
              return (
                <div>
                  {`${option.properties.neighborhood}, ${option.properties.neighborhood_group}`} <b>({option.results})</b>
                </div>
              );
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
          onSelect(neighborhood);
          setShowMap(false);
        }}
      />
    </>
  );
};

DestinationPicker.propTypes = {
  value: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
};

export default DestinationPicker;
