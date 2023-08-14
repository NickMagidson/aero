import React, { useEffect, useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

interface MapProps {
  center: [number, number],
  attribution: string,
}

const defaultCenter: [number, number] = [40.7128, -74.0060]; // New York City

const Map: React.FC<MapProps> = ({ center = defaultCenter }) => {

  const mapRef = useRef<any>(null); // Reference to the MapContainer
  useEffect(() => {
    if (mapRef.current && center) {
      // Animate the map to the new coordinates with a smooth transition
      mapRef.current.flyTo(center, 11, {
        duration: 6, // Animation duration in seconds
      });
    }
  }, [center]);

  return (
    <MapContainer id='map-container' ref={mapRef} center={defaultCenter} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  )
}

export default Map
