import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // To access cookie ID from URL
import CookieCard from '../components/CookieCard'; // Import CookieCard
import { getReviewsByCookieId } from '../helper';
import {useOutletContext} from "react-router-dom";
import Rating from '../components/Rating';
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

const CookieListing = () => {
  const { id } = useParams(); // Get the cookie ID from the URL
  const { cookies } = useOutletContext();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const cookie = cookies.find((cookie) => cookie.id === parseInt(id));

  useEffect(() => {
    if (!id) return; // Ensure ID exists before making API calls
  
    setLoading(true); // Start loading
    
    // Fetch reviews for this cookie
    getReviewsByCookieId(id)
      .then((data) => setReviews(data)) // Get the reviews for the specific cookie
      .catch((error) => console.error('Error fetching reviews:', error))
      .finally(() => setLoading(false)); // Set loading to false when done
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; // Show loading message until data is fetched
  }

  if (!cookie) {
    return <div>Error loading cookie details.</div>; // Error handling if cookie is null
  }
  return (
    <StyledMain>
      <div className='listing-container'>
        <h1>Cookie Listing</h1>
        <CookieCard
          id={cookie.id}
          name={cookie.name}
          image={cookie.image}
          price={cookie.price}
          isVegan={cookie.isVegan}
          isGlutenFree={cookie.isGlutenFree}
          hasNuts={cookie.hasNuts}
          frosting={cookie.frosting}
          reviews={reviews}
          favorites={cookie.favorites}
          cartItems={cookie.cartItems}
        />
        <hr />
        <ReviewContainer>
          <h2>Reviews:</h2>
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

export default CookieListing;
