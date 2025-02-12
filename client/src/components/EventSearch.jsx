import { useContext, useState } from 'react';
import {UserContext} from '../context/userProvider'
import { snakeToCamel, getNearbyZipcodes } from '../helper';
import { Button } from '../MiscStyling';
import styled from 'styled-components';

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 90vw;

  .zip-error {
    color: red;
  }

  p {
    margin: 0;
  }
  
  span {
    color: var(--honey);
  }

  section {
    display: flex;
    justify-content: center;

  }

  input, button {
    margin: 5px;
  }

  input {
    color: black;

    &:hover {
      background: var(--yellow);
    }

    &#zipcode {
      width: 50px;
    }

    &#radius {
      width: 38px;
    }
  }
`

const EventSearch = ({updateFilter}) => {
  const { user } = useContext(UserContext);
  const [filterZip, setFilterZip] = useState(!user ? '' : user.zipcode);
  const [filterRadius, setFilterRadius] = useState(5);
  const [isFiltered, setIsFiltered] = useState(false);
  const [showError, setShowError] = useState(false);

  async function apiZipcodeCall() {
    if (filterZip) {
      try {
        // Await the async call
        const json = await getNearbyZipcodes(filterZip, filterRadius);
        
        // Check for error in response
        if (json.error) {
          console.error("Error fetching nearby zipcodes:", json.error);
          setShowError(true);
        } else {
          const zipcodesTransformed = snakeToCamel(json);
          const zipcodeList = zipcodesTransformed.zipCodes.map(z => z.zipCode);
          
          updateFilter(zipcodeList);
          setIsFiltered(true);
          setShowError(false);
  
          console.log("Nearby Zipcodes:", zipcodeList);
        }
      } catch (error) {
        // Catch any errors that occur during the async call
        console.error("Error fetching nearby zipcodes:", error);
        setShowError(true);
      }
    }
  }  

  const clearFilters = () => {
    updateFilter([]);
    setIsFiltered(false);
    setFilterZip('');
    setShowError(false);
  }

  return (
        <SearchContainer>
          <p htmlFor='zipcode'>
            Within: 
            <input
              id='radius'
              type="number"
              name='radius'
              onChange={(event)=>setFilterRadius(event.target.value)}
              value={filterRadius}
            >
            </input>
            miles of Zipcode:
            <input
              id='zipcode'
              name='zipcode'
              onChange={(event)=>setFilterZip(event.target.value)}
              value={filterZip}
            >
            </input>
          </p>
          {/* Manually click button to avoid making too many API calls */}
          <section>
            <Button onClick={apiZipcodeCall}>Submit</Button>
            <Button onClick={clearFilters}>Clear</Button>
          </section>
          {isFiltered ? <span>{`Filtered on events within ${filterRadius} miles of ${filterZip}`}</span> : <span>No Filters Applied</span>}
          {showError && <span className='zip-error'>{`Zipcode ${filterZip} not found`}</span>}
        </SearchContainer>
    );
  };
  
  export default EventSearch;