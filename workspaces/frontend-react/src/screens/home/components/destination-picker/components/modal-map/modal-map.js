import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Map from 'components/map';
import { Marker, GeoJSON } from 'react-leaflet';
import { Button, Card, Modal } from 'react-bulma-components';
import api from 'services/api';

import './modal-map.scss';

const ModalMap = ({ show, onClose, onSelect }) => {
  const [polygon, setPolygon] = useState();
  const [marker, setMarker] = useState();

  useEffect(() => {
    setMarker([52.517474393230245, 13.38838577270508]);
  }, [show]);

  useEffect(async () => {
    if (!marker) {
      return;
    }
    const data = await api.searchNeighborhood(marker);
    setPolygon(data);
  }, [marker]);

  return (
    <Modal className="modal-map" show={show} onClose={onClose}>
      <Modal.Content style={{ width: '90%' }}>
        <Card style={{ position: 'relative' }}>
          <Map
            center={[52.517474393230245, 13.38838577270508]}
            onClick={(evt) => {
              setMarker([evt.latlng.lat, evt.latlng.lng]);
            }}
            zoom={14}
          >
            <Marker
              position={marker}
              draggable
              eventHandlers={{
                moveend: async (evt) => {
                  setMarker([evt.target._latlng.lat, evt.target._latlng.lng]);
                },
              }}
            />
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
                  <b>
                    {polygon?.properties?.neighborhood} ({polygon.results})
                  </b>
                </>
              ) : (
                'No neighborhood found'
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
