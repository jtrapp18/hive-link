import { useContext, useState } from 'react';
import {WindowWidthContext} from "../context/windowSize";
import {UserContext} from '../context/userProvider'
import { snakeToCamel, getNearbyZipcodes } from '../helper';
import { Button } from '../MiscStyling';
import styled from 'styled-components';

const SearchContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

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
      width: 100px;
    }

    &#radius {
      width: 50px;
    }
  }
`

const EventSearch = ({updateFilter}) => {
  const { user } = useContext(UserContext);
  const { isMobile } = useContext(WindowWidthContext);
  const [filterZip, setFilterZip] = useState(!user ? '' : user.zipcode);
  const [filterRadius, setFilterRadius] = useState(5);
  const [isFiltered, setIsFiltered] = useState(false);

  function apiZipcodeCall() {
    if (filterZip) {
      getNearbyZipcodes(filterZip, filterRadius).then((json) => {
        const zipcodesTransformed = snakeToCamel(json);
        const zipcodeList = zipcodesTransformed.zipCodes.map(z=>z.zipCode);
        updateFilter(zipcodeList);
        setIsFiltered(true);

        console.log("Nearby Zipcodes:", zipcodeList)
      });
    }
  }

  const clearFilters = () => {
    updateFilter([]);
    setIsFiltered(false);
    setFilterZip('');
  }

  return (
        <SearchContainer>
          <p htmlFor='zipcode'>Search near Zipcode: 
            <input
              id='zipcode'
              name='zipcode'
              onChange={(event)=>setFilterZip(event.target.value)}
              value={filterZip}
            >
            </input>

            within

            <input
              id='radius'
              type="number"
              name='radius'
              onChange={(event)=>setFilterRadius(event.target.value)}
              value={filterRadius}
            >
            </input>
            miles
          </p>
          {/* Manually click button to avoid making too many API calls */}
          <section>
            <Button onClick={apiZipcodeCall}>Submit</Button>
            <Button onClick={clearFilters}>Clear</Button>
          </section>
          {isFiltered ? <span>{`Filtered on events within ${filterRadius} miles of ${filterZip}`}</span> : <span>No Filters Applied</span>}
        </SearchContainer>
    );
  };
  
  export default EventSearch;