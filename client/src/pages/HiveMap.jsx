import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useOutletContext } from "react-router-dom";
import { getHiveGeoPoints } from '../helper';
import Loading from './Loading';
import L from "leaflet"; // Import Leaflet for using divIcon
import styled from 'styled-components';
import { StyledContainer } from '../MiscStyling';

const StyledMap = styled(MapContainer)`
  width: 80%;
  height: 600px;
  max-height: 70vh;
  border: 4px double var(--honey);
  z-index: 0;
`

const HiveMap = () => {
  const { hives } = useOutletContext();
  const [mapData, setMapData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);  // Track if data is loaded

  // To avoid repeated fetches, we only want this effect to run once after hives are loaded
  useEffect(() => {
    if (hives.length > 0 && !dataLoaded) { // Check if hives are loaded and data hasn't been fetched
      const zipCodes = hives.map(hive => String(parseInt(hive.postalCode)));

      // Fetch the geo points for the zip codes
      getHiveGeoPoints(zipCodes).then(response => {
        // If the response contains geo data
        if (response && response.results) {
          // Create a map to count hives per zip code
          const hiveCounts = zipCodes.reduce((acc, zip) => {
            acc[zip] = (acc[zip] || 0) + 1;  // Increment count for each hive in the zip code
            return acc;
          }, {});

          // Transform the geo data into the desired format
          const transformedData = response.results.map(result => {
            const zipCode = result.zip_code;
            const count = hiveCounts[zipCode] || 0;  // Get the hive count for this zip code

            return {
              zip_code: String(zipCode).padStart(5, '0'),
              lat: result.geo_point_2d.lat,
              lon: result.geo_point_2d.lon,
              numberOfHives: count,  // Add the number of hives here
            };
          });

          // Set the transformed data for the map
          setMapData(transformedData);
          setDataLoaded(true); // Mark data as loaded
        }
      });
    }
  }, [hives, dataLoaded]);  // Only run if hives change or data is not loaded

  if (!dataLoaded) return <Loading />;

  return (
    <StyledContainer>
      <h1>Hive Map</h1>
      <h3>Find Your Fellow Beekeepers</h3>
      <h3>. . . . . </h3>
      <StyledMap center={[37.0902, -95.7129]} zoom={3}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {mapData.map((zip, index) => (
          <Marker
            key={index}
            position={[zip.lat, zip.lon]}
            icon={L.divIcon({
              html: `<span style="font-size: ${10 + zip.numberOfHives * 5}px; color: gold;">🐝</span>`,  // Bee emoji with size based on hive count
              className: 'bee-icon', // Optional: You can add custom styles if needed
            })}
          >
            <Popup>
              <b>ZIP Code:</b> {zip.zip_code} <br />
              <b>Number of Hives:</b> {zip.numberOfHives}
            </Popup>
          </Marker>
        ))}
      </StyledMap>
    </StyledContainer>
  );
};

export default HiveMap;