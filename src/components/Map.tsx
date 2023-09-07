import React, { useRef, useEffect, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoicmVkbGlvbjk1IiwiYSI6ImNsbTd0b2RydjAyamIzZGxidWg4azc3eDcifQ.niHxh5TLu_CUQZL-JMSLGA';

interface MapProps {
  accessToken: any;
  lat: number;
  lon: number;
}

const Map: React.FC<MapProps> = ({ lat, lon }) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [zoom, setZoom] = useState(2);

  useEffect(() => {
    if (!map.current && mapContainer.current) {
      const container: string | HTMLElement = mapContainer.current;
      map.current = new mapboxgl.Map({
        container,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [lon, lat],
        zoom: zoom,
      });

      map.current.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: false,
          showUserHeading: true,
        })
      );
    } else if (map.current) {
      // Check if the user's input coordinates have changed
      const currentCenter = map.current.getCenter();
      if (lat !== currentCenter.lat || lon !== currentCenter.lng) {
        // Use the `flyTo` method to smoothly transition to the new coordinates
        map.current.flyTo({
          center: [lon, lat],
          zoom: 17, // You can set the desired zoom level here
          essential: true, // This ensures the animation is not canceled by user interactions
          duration: 15000
        });
      }
    }
  }, [lat, lon, zoom]);

  return (
    <div>
      <div ref={mapContainer} id="map-container"></div>
    </div>
  );
};

export default Map;