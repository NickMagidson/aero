import React, { useRef, useEffect, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import { mockMeteoriteData } from '../meteoriteMock.js'

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
  // const [issLocation, setIssLocation] = useState<{ lat: number; lon: number } | null>(null);

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
        // style: 'mapbox://styles/mapbox/streets-v12', 
        style: 'mapbox://styles/mapbox/satellite-v9', // Could turn this into a state that sets onClick()
        projection: 'globe',
        center: [lon, lat],
        zoom: zoom,
        projection: 'globe'
      });

      map.current.on('style.load', () => {
        map.current.setFog({
          color: 'rgb(186, 210, 235)', // Lower atmosphere
          'high-color': 'rgb(36, 92, 223)', // Upper atmosphere
          'horizon-blend': 0.02, // Atmosphere thickness (default 0.2 at low zooms)
          'space-color': 'rgb(11, 11, 25)', // Background color
          'star-intensity': 0.6 // Background star brightness (default 0.35 at low zoooms )
        });
      });




      const size = 80;

      const createPulsingDot = () => {
        return {
          width: size,
          height: size,
          data: new Uint8Array(size * size * 4),
      
          onAdd: function () {
            const canvas = document.createElement("canvas");
            canvas.width = this.width;
            canvas.height = this.height;
            this.context = canvas.getContext("2d");
          },
      
          render: function () {
            const duration = 1000;
            const t = (performance.now() % duration) / duration;
      
            const radius = (size / 2) * 0.3;
            const outerRadius = (size / 2) * 0.7 * t + radius;
            const context = this.context;
      
            context.clearRect(0, 0, this.width, this.height);
            context.beginPath();
            context.arc(
              this.width / 2,
              this.height / 2,
              outerRadius,
              0,
              Math.PI * 2
            );
            context.fillStyle = `rgba(255, 200, 200, ${1 - t})`;
            context.fill();
      
            context.beginPath();
            context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
            context.fillStyle = "rgba(255, 100, 100, 1)";
            context.strokeStyle = "white";
            context.lineWidth = 2 + 4 * (1 - t);
            context.fill();
            context.stroke();
      
            this.data = context.getImageData(0, 0, this.width, this.height).data;
      
            map.current.triggerRepaint();
      
            return true;
          },
        };
      };
      
      map.current.on("load", () => {
        mockMeteoriteData.meteorites.forEach((meteorite, index) => {
          const pulsingDot = createPulsingDot();
          const imageId = `pulsing-dot-${index}`;
      
          map.current.addImage(imageId, pulsingDot, { pixelRatio: 2 });
      
          map.current.addSource(`dot-point-${index}`, {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: [
                {
                  type: "Feature",
                  geometry: {
                    type: "Point",
                    coordinates: [parseFloat(meteorite.reclong), parseFloat(meteorite.reclat)],
                  },
                },
              ],
            },
          });
      
          map.current.addLayer({
            id: `layer-with-pulsing-dot-${index}`,
            type: "symbol",
            source: `dot-point-${index}`,
            layout: {
              "icon-image": imageId,
            },
          });
        });
      });

      // map.current.addControl(
      //   new mapboxgl.GeolocateControl({
      //     positionOptions: {
      //       enableHighAccuracy: true,
      //     },
      //     trackUserLocation: true,
      //     showUserHeading: true,
      //   })
      // );

      // Create a marker and add it to the map
      // marker.current = new mapboxgl.Marker()
      //   .setLngLat([lon, lat])
      //   .addTo(map.current);        
    } 
    // else if (map.current && marker.current) {
    //   // Check if the user's input coordinates have changed
    //   const currentCenter = map.current.getCenter();
    //   if (lat !== currentCenter.lat || lon !== currentCenter.lng) {
    //     // Use the `flyTo` method to smoothly transition to the new coordinates
    //     map.current.flyTo({
    //       center: [lon, lat],
    //       zoom: 17, // You can set the desired zoom level here
    //       essential: true, // This ensures the animation is not canceled by user interactions
    //       duration: 15000
    //     });

    //     // Update the marker's position
    //     marker.current.setLngLat([lon, lat]);
    //   }
    // }


    

        
        // Update the marker's position
   

    // const fetchISSLocation = async () => {
    //   try {
    //     const response = await fetch(ISS_API_URL);
    //     const data = await response.json();
    //     const { latitude, longitude } = data.iss_position;
    //     setIssLocation({ lat: parseFloat(latitude), lon: parseFloat(longitude) });
    //   } catch (error) {
    //     console.error('Error fetching ISS location:', error);
    //   }
    // };

    // fetchISSLocation();
    
    // const interval = setInterval(fetchISSLocation, 10); // Update every 10 seconds

    // return () => clearInterval(interval);



  }, [lat, lon, zoom]);
  

  // useEffect(() => {
  //   // Update marker when ISS location changes
  //   if (map.current && issLocation) {
  //     const { lat, lon } = issLocation;

  //     // If the marker doesn't exist, create it
  //     if (!marker.current) {
  //       marker.current = new mapboxgl.Marker({ color: 'red' })
  //         .setLngLat([lon, lat])
  //         .addTo(map.current);
  //     } else {
  //       // Update the marker's position
  //       marker.current.setLngLat([lon, lat]);
  //     }
  //     map.current.addLayer({
  //       id: 'iss',
  //       type: 'symbol',
  //       source: 'iss',
  //       layout: {
  //         'icon-image': 'rocket'
  //       }
  //     });
  //     // Smoothly move the map to the new location
  //     // map.current.flyTo({
  //     //   center: [lon, lat],
  //     //   essential: true,
  //     //   speed: 0.5, // Adjust speed of transition
  //     // });
  //   }
  // }, [issLocation]);

  return (
    <div>
      <div ref={mapContainer} id="map-container"></div>
    </div>
  );
};

export default Map;