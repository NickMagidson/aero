import React, { useRef, useEffect, useState } from 'react';

// import ReactMapGL from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import Loader from './Loader';

mapboxgl.accessToken = 'pk.eyJ1IjoicmVkbGlvbjk1IiwiYSI6ImNsbTd0b2RydjAyamIzZGxidWg4azc3eDcifQ.niHxh5TLu_CUQZL-JMSLGA';


interface MapProps {
  accessToken: any;
}

const Map: React.FC<MapProps> = () => {

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lat, setLat] = useState(42.35);
  const [lng, setLng] = useState(-70.9);
  const [zoom, setZoom] = useState(9);
  // const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
    container: mapContainer.current,
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [lng, lat],
    zoom: zoom
    });
  });

  return (
    <>
      <div ref={mapContainer} id='map-container'></div>
    </>
  );
};

export default Map;
