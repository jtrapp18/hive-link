import React, { useState } from 'react';
import StarRatings from 'react-star-ratings';

const Rating = ({rating, handleStarClick}) => {

  return (
    <StarRatings
      rating={rating}
      starRatedColor="var(--dark-chocolate)"
      changeRating={(newRating) => handleStarClick(newRating)}
      numberOfStars={5}
      starDimension="30px"
      starSpacing="5px"
    />
  );
};

export default Rating;