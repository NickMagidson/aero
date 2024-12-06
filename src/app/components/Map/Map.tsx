import React, { useRef, useEffect, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';

interface MapProps {
  accessToken: string;
  lat: number;
  lon: number;
}

const Map: React.FC<MapProps> = ({ lat, lon, accessToken }) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const [zoom] = useState(1);
  const [issLocation, setIssLocation] = useState<{ lat: number; lon: number } | null>(null);

  // const MAPBOX_API_KEY = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;

  // if (!MAPBOX_API_KEY) {
  //   throw new Error('Mapbox API key is missing. Please add it to your .env file.');
  // }

  mapboxgl.accessToken = accessToken; // Now it's guaranteed to be a string
  const ISS_API_URL = 'http://api.open-notify.org/iss-now.json';

  useEffect(() => {
    if (!map.current && mapContainer.current) {
      const container: string | HTMLElement = mapContainer.current;
      map.current = new mapboxgl.Map({
        container,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [lon, lat],
        zoom: zoom,
        projection: 'globe'
      });

      // map.current.on('style.load', () => {
      //   map.current.setFog({
      //     color: 'rgb(186, 210, 235)', // Lower atmosphere
      //     'high-color': 'rgb(36, 92, 223)', // Upper atmosphere
      //     'horizon-blend': 0.02, // Atmosphere thickness (default 0.2 at low zooms)
      //     'space-color': 'rgb(11, 11, 25)', // Background color
      //     'star-intensity': 0.6 // Background star brightness (default 0.35 at low zoooms )
      //   });
      // });

      map.current.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
          showUserHeading: true,
        })
      );

      // Create a marker and add it to the map
      marker.current = new mapboxgl.Marker()
        .setLngLat([lon, lat])
        .addTo(map.current);
      // Repeating this will add more markers to the map
      // Need to map through an array of locations to render a cluster
      // From there, add popups with AQI data from API
      
        
    } else if (map.current && marker.current) {
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

        // Update the marker's position
        marker.current.setLngLat([lon, lat]);
      }
    }

    const fetchISSLocation = async () => {
      try {
        const response = await fetch(ISS_API_URL);
        const data = await response.json();
        const { latitude, longitude } = data.iss_position;
        setIssLocation({ lat: parseFloat(latitude), lon: parseFloat(longitude) });
      } catch (error) {
        console.error('Error fetching ISS location:', error);
      }
    };

    fetchISSLocation();
    
    const interval = setInterval(fetchISSLocation, 10); // Update every 10 seconds

    return () => clearInterval(interval);
  }, [lat, lon, zoom]);
  

  useEffect(() => {
    // Update marker when ISS location changes
    if (map.current && issLocation) {
      const { lat, lon } = issLocation;

      // If the marker doesn't exist, create it
      if (!marker.current) {
        marker.current = new mapboxgl.Marker({ color: 'red' })
          .setLngLat([lon, lat])
          .addTo(map.current);
      } else {
        // Update the marker's position
        marker.current.setLngLat([lon, lat]);
      }
      map.current.addLayer({
        id: 'iss',
        type: 'symbol',
        source: 'iss',
        layout: {
          'icon-image': 'rocket'
        }
      });
      // Smoothly move the map to the new location
      // map.current.flyTo({
      //   center: [lon, lat],
      //   essential: true,
      //   speed: 0.5, // Adjust speed of transition
      // });
    }
  }, [issLocation]);

  return (
    <div>
      <div ref={mapContainer} id="map-container"></div>
    </div>
  );
};

export default Map;