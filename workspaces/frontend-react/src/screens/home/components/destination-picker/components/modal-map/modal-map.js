import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Map from 'components/map';
import { Marker, GeoJSON } from 'react-leaflet';
import { Button, Card, Modal } from 'react-bulma-components';
import api from 'services/api';

import './modal-map.scss';

const ModalMap = ({ show, onClose, onSelect }) => {
  const [mapCenter, setCenter] = useState([52.517474393230245, 13.38838577270508]);
  const [polygon, setPolygon] = useState();

  return (
    <Modal className="modal-map" show={show} onClose={onClose}>
      <Modal.Content style={{ width: '90%' }}>
        <Card style={{ position: 'relative' }}>
          <Map
            center={mapCenter}
            onMove={async ({ center }) => {
              setCenter(center);
              const neighborhood = await api.searchNeighborhood(center);
              setPolygon(neighborhood);
            }}
          >
            <Marker position={mapCenter} />
            {polygon && <GeoJSON key={polygon._id} pathOptions={{ color: 'blue' }} data={polygon} />}
          </Map>
          <Button.Group className="map-buttons">
            <Button
              onClick={() => {
                onSelect(polygon);
              }}
              rounded
              disabled={!polygon}
              color="primary"
            >
              {polygon ? (
                <>
                  <span>Search in:</span>
                  &nbsp;
                  <b>{polygon.properties.neighborhood}</b>
                </>
              ) : (
                'No neighborhood selected'
              )}
            </Button>
            <Button rounded onClick={onClose}>
              Close
            </Button>
          </Button.Group>
        </Card>
      </Modal.Content>
    </Modal>
  );
};

ModalMap.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default ModalMap;
