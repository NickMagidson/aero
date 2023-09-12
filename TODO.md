Aero:
Air pollution app built with React, Next.js, Tailwind, and Node
Pulls from Open Weather API. Will eventually have map funcitonality (with coord)

Notes:
CTRL + ALT + A to toggle Tawilwind Code readability


1. Setup    
  - ~~Setup and learn Next.js~~
  - ~~Learn server components~~
  - ~~API fetch testing for proof-of-concept~~
  - ~~Create repo~~
  - ~~Add TypeScript into project and refactor accordingly~~

2. Air Data Component
  - ~~Fetch with OpenWeather air pollution API (start with one number)~~
  - ~~Build out Navbar component~~
  - ~~Style Navbar~~
  - ~~Air menu icon~~
  - ~~Make burger menu hide when it hits certain breakpoint~~
  - ~~Conditionals to render a range of 'poor' to 'good. And final number~~
  - ~~Credit Karma style UI (react-gauge-chart)~~
  - ~~value={} to be linked/referenced with whatever the index value will be.~~
  - ~~Design the component~~
    - ~~Container div for co, no, etc. Background color?~~
    - ~~Drop shadows for things~~
  - ~~Location input functionality (coord input?, then location with geocoding API)~~
    - ~~Add the search bar input~~
    - ~~Implement the geocoding API~~
    - ~~Make the search function with the AirData component~~
    - ~~Get rid of ugly small text in gauge component~~
    - ~~Set a default location / settings~~
  - ~~React Countup component for re renders~~
  - ~~Break gauge into its own component~~
  - ~~Add and style location coordinates in the AirData component~~
  - ~~Break data-grid into it's own component~~

3. Map Integration
  - ~~Implement Leaflet to be a full screen map~~
  - ~~Link the coorodinates with the API data~~
  - ~~Adjust map controls and functionality~~
  - ~~Make pan animation smoother~~ 

4. Deploy
  - ~~Finish documentation on website~~
  - ~~Create small top right blurb with about the app. maybe mini updates section~~
  - ~~Deploy on Netlify~~


5. Mapbox Refactor
  - ~~Implement new map~~
  - ~~Make fullscreen~~
  - ~~New searchbar with autofill for cities and address that match coordinates (Mapbox API?)~~
  - ~~Make sure Geocoding API and searchbar match with the coordinates of OpenWeather's API. Display air data accordingly.~~
  - ~~Add flyTo on search input~~
  - Lat and Lon bar display
  - Have location of the visitor be the default coordinates (addControl())
    - Fix position of button


Updates
  - ~~Load spinner!~~
  - ~~Color code gradient for text~~
  - ~~Make Loader its own component~~
  - ~~Fix mobile responsive bug (no scroll or smaller)~~
  - ~~Component organization~~
  - ~~Add tooltip dialog boxes (defines what co, no, etc mean)~~
  - ~~Reintergrate gauge with colors (perhaps a new gauge? chart.js?)~~
  - Override styles for Gauge tootlips
  - Center loaders
  - Bubble overlays with AQI for some locations (map clustering)
  - App Loader
  - Data visualization with d3.js or chart.js
  - Color code for gases
  - Allow drag and droppable pin to change Air data
  - Utilize SSR for OpenWeather APIs
  - Make map false for mobile?
  - Implement a more mobile design (hide arrow wordmark, smaller search bar?, simplify component to aqi word and searchbar.)


