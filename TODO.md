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
  - Add auto complete for the search bar (Google places API)
  - Break gauge into its own component?
  - Change font?

3. Map Integration
  - ~~Implement Leaflet to be a full screen map~~
  - ~~Link the coorodinates with the API data~~
  - ~~Adjust map controls and functionality~~
  - ~~Make pan animation smoother~~ 
  - Allow drag and droppable pin to change Air data


4. Deploy
  - Create small top right blurb with about the app. maybe mini updates section?
  - Deploy on Netlify
  - Finish documentation on website


5. Data Visualization
Other notes:
  - Mobile: menu on left and search in middle. Ease in from bottom for info. App inspired
  - If there are limitations, make a dropdown on the Nav (or just a div) that explains how to use the app and its limitations.
  - Load spinner!