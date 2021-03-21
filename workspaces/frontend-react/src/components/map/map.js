import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import './map.scss';

const getBounds = (map) => {
  const bounds = map.getBounds();

  return {
    center: [map.getCenter().lat, map.getCenter().lng],
    bounds: {
      north: bounds.getNorth(),
      east: bounds.getEast(),
      south: bounds.getSouth(),
      west: bounds.getWest(),
    },
  };
};

function Events({ onClick, onDblClick, onMove, onMount }) {
  const map = useMapEvents({
    click: (evt) => {
      if (onClick) {
        onClick(evt);
      }
    },
    dblclick: (evt) => {
      if (onDblClick) {
        onDblClick(evt);
      }
    },
    move: () => {
      if (onMove) {
        onMove(getBounds(map));
      }
    },
  });

  useEffect(() => {
    if (onMount) {
      onMount(getBounds(map));
    }
  }, []);

  return null;
}

const Map = ({ onDblClick, onClick, onMove, onMount, center, children, zoom = 15 }) => {
  return (
    <MapContainer className="map" center={center} zoom={zoom}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Events onDblClick={onDblClick} onMount={onMount} onClick={onClick} onMove={onMove} />
      {children}
    </MapContainer>
  );
};

Map.propTypes = {
  zoom: PropTypes.number,
  onClick: PropTypes.func,
  onDblClick: PropTypes.func,
  onMove: PropTypes.func,
  onMount: PropTypes.func,
  center: PropTypes.array,
  children: PropTypes.node,
};

export default Map;
