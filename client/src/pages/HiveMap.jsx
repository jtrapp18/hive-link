import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { getJSON, snakeToCamel } from '../helper';
import Loading from './Loading';
import L from "leaflet"; // Import Leaflet for using divIcon
import styled from 'styled-components';
import { StyledContainer } from '../MiscStyling';

const StyledMap = styled(MapContainer)`
  width: 100%;
  height: 600px;
  max-height: 60vh;
  border: 4px double var(--honey);
  z-index: 0;

  animation: fadeIn 1s ease-in-out;
`

const HiveMap = () => {
  const [mapData, setMapData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);  // Track if data is loaded

  useEffect(() => {
    if (!dataLoaded) {
      getJSON("geo_data")
      .then(json => {
        if (json) {
          const jsonTransformed = snakeToCamel(json);
          setMapData(jsonTransformed);
          setDataLoaded(true);
          console.log(jsonTransformed)
        }
      });
    }
  }, [dataLoaded]);

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