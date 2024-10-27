import React, { useState } from "react";

const SearchBar: React.FC<{
  setLat: React.Dispatch<React.SetStateAction<number | undefined>>;
  setLon: React.Dispatch<React.SetStateAction<number | undefined>>;
}> = ({ setLat, setLon }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setSearchQuery(input);

    // Call MapBox Geocoding API for autocomplete suggestions
    const MAPBOX_API_KEY = process.env.NEXT_PUBLIC_MAPBOX_API_KEY
    const autocompleteUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${input}.json?access_token=${MAPBOX_API_KEY}&autocomplete=true&limit=5`;

    fetch(autocompleteUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.features) {
          const suggestions = data.features.map((feature: any) => feature.place_name);
          setSuggestions(suggestions);
        } else {
          setSuggestions([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching autocomplete suggestions:', error);
        setSuggestions([]);
      });
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setSuggestions([]); // Clear suggestions
    // Fetch coordinates for the selected suggestion
    fetchCoordinatesForSuggestion(suggestion);
  };

  const fetchCoordinatesForSuggestion = (selectedSuggestion: string) => {
    const apiKey = 'pk.eyJ1IjoicmVkbGlvbjk1IiwiYSI6ImNsbTd2cDVkMzAzdDUzam1zYnd5dXdwdTQifQ.DLJTzbg_x88gmEV6NNrHjg';
    const coordinatesUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${selectedSuggestion}.json?access_token=${apiKey}&limit=1`;

    fetch(coordinatesUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.features && data.features.length > 0) {
          const coordinates = data.features[0].center;
          if (coordinates.length >= 2) {
            // MapBox provides latitude and longitude in reverse order
            setLon(coordinates[0]);
            setLat(coordinates[1]);
          }
        }
      })
      .catch((error) => {
        console.error('Error fetching coordinates for selected suggestion:', error);
      });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission if needed
  };

  return (
    <form onSubmit={handleSubmit} className="z-30 w-full relative ">
      <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 z-20 flex items-center pl-3 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24">
    <path d="M 9 2 C 5.1458514 2 2 5.1458514 2 9 C 2 12.854149 5.1458514 16 9 16 C 10.747998 16 12.345009 15.348024 13.574219 14.28125 L 14 14.707031 L 14 16 L 20 22 L 22 20 L 16 14 L 14.707031 14 L 14.28125 13.574219 C 15.348024 12.345009 16 10.747998 16 9 C 16 5.1458514 12.854149 2 9 2 z M 9 4 C 11.773268 4 14 6.2267316 14 9 C 14 11.773268 11.773268 14 9 14 C 6.2267316 14 4 11.773268 4 9 C 4 6.2267316 6.2267316 4 9 4 z"></path>
</svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="glassmorphism block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 
         placeholder-black"
          placeholder="Where do you want to go?"
          autoComplete="off"
          value={searchQuery}
          onChange={handleInputChange}
        />
        <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Search</button>
      </div>
      {suggestions.length > 0 && (
        <ul className="glassmorphism absolute z-10 mt-2 py-2 bg-white border border-gray-300 rounded-lg w-full">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="px-4 py-2 cursor-pointer text hover:bg-gray-100"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};

export default SearchBar;
