import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // To access cookie ID from URL
import HiveCard from '../components/HiveCard'; // Import CookieCard
import {useOutletContext} from "react-router-dom";
import styled from 'styled-components';

const StyledMain = styled.main`
  min-height: var(--size-body);
  padding: 20px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .listing-container {
    max-width: 90vw;
    width: 1000px;  
  }
`

const ReviewContainer = styled.div`
    margin-top: 20px;
`

const StyledRating = styled.div`
  background: var(--cookie);
  padding: 1%;
  margin-bottom: 2%
`

const HiveDetails = () => {
  const { id } = useParams(); // Get the cookie ID from the URL
  const { hives } = useOutletContext();
  const [loading, setLoading] = useState(true);
  const hive = hives.find((hive) => hive.id === parseInt(id));

  useEffect(() => {
    if (!id) return; // Ensure ID exists before making API calls
  
    setLoading(true); // Start loading
    
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; // Show loading message until data is fetched
  }

  if (!hives) {
    return <div>Error loading hive details.</div>; // Error handling if cookie is null
  }
  return (
    <StyledMain>
      <div className='listing-container'>
        <h1>Hive Details</h1>
        <HiveCard
          {...hive}
        />
        <hr />
        <ReviewContainer>
          <h2>Inspections:</h2>
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <StyledRating key={index}>
                <span>{review.user.username}</span>
                <Rating rating={review.rating} />
                <h3>{review.review_title}</h3>
                <p>{review.review_body}</p>
              </StyledRating>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </ReviewContainer>
      </div>
    </StyledMain>
  );
};

export default HiveDetails;
