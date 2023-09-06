import React, { useRef, useEffect, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import Loader from './Loader';

mapboxgl.accessToken = 'pk.eyJ1IjoicmVkbGlvbjk1IiwiYSI6ImNsbTd0b2RydjAyamIzZGxidWg4azc3eDcifQ.niHxh5TLu_CUQZL-JMSLGA';

interface MapProps {
  accessToken: any;
}

const Map: React.FC<MapProps> = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [zoom, setZoom] = useState(2);

  useEffect(() => {
    if (!map.current && mapContainer.current) {
      const container: string | HTMLElement = mapContainer.current;
      map.current = new mapboxgl.Map({
        container,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [lng, lat],
        zoom: zoom
      });

      map.current.addControl(
        new mapboxgl.GeolocateControl({
        positionOptions: {
        enableHighAccuracy: true
        },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: false,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true
        })
      );
    }

    // map.current?.on('move', () => {
    //   const lngValue = parseFloat(map.current!.getCenter().lng.toFixed(4));
    //   const latValue = parseFloat(map.current!.getCenter().lat.toFixed(4));
    //   const zoomValue = parseFloat(map.current!.getZoom().toFixed(2));
    
    //   setLng(lngValue);
    //   setLat(latValue);
    //   setZoom(zoomValue);
    // });
  });


  return (
    <div>
      {/* <div id="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div> */}
      <div ref={mapContainer} id='map-container'></div>
    </div>
  );
};

export default Map;
