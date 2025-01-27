import React, { useContext, useState } from "react";
import { postJSONToDb } from '../helper';
import styled from "styled-components";
import { UserContext } from '../context/userProvider';
import CookieCard from './CookieCard';
import CloseButton from 'react-bootstrap/CloseButton';
import Rating from '../components/Rating';
import { useFormik } from 'formik';

const ReviewContainer = styled.div`
  position: fixed;
  z-index: 1000;
  top: var(--height-header);
  left: 50%;
  transform: translateX(-50%);
  border: 1px solid black;
  background: var(--gray);

  .cookie-card {
    zoom: .7;
  }

  .main-review {
    padding: 20px;
    background: white;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;

    form {
      display: flex;
      flex-direction: column;
      width: 90%;
      padding: 20px;
      align-items: center;

      .form-input {
        &:not(:last-child) {
          margin-bottom: 12px;
        }

        input:hover, textarea:hover {
          background: var(--yellow);
        }

        display: flex;
        flex-direction: column;
        align-items: space-between;
        width: 90%;
      }
    }

    .submitted-confirm {
      background: var(--green);
      border-radius: 20px;
      padding: 20px;

      label {
        font-weight: bold;
      }

      p, label, h3 {
        color: white;
      }
    }
  }
`;

function ReviewForm({ cookie, setActiveReview }) {
  const { user } = useContext(UserContext);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {
      reviewTitle: '',
      rating: 0,
      reviewBody: '',
    },
    onSubmit: (values) => {
      const body = {
        ...values,
        user_id: user.id,
        cookie_id: cookie.id,
      };

      postJSONToDb("reviews", body)
        .then(review => {
          console.log(review);
          setIsSubmitted(true);
        });
    },
    validate: (values) => {
      const errors = {};
      if (!values.reviewTitle) {
        errors.reviewTitle = 'Title is required';
      }
      if (!values.reviewBody) {
        errors.reviewBody = 'Description is required';
      }
      return errors;
    }
  });

  const updateRating = (rating) => {
    formik.setFieldValue("rating", rating);
  };

  return (
    <ReviewContainer>
      <CloseButton onClick={() => setActiveReview(null)} />
        <div className="main-review">
      {(!isSubmitted) ? (
        <>
          <h1>{`Review ${cookie.name} Cookie`}</h1>
          <CookieCard {...cookie} />
          <form onSubmit={formik.handleSubmit}>
            <Rating rating={formik.values.rating} handleStarClick={updateRating} />
            <div className="form-input">
              <label htmlFor="reviewTitle">Title</label>
              <input
                type="text"
                id="reviewTitle"
                name="reviewTitle"
                autoComplete="off"
                value={formik.values.reviewTitle}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.reviewTitle && formik.errors.reviewTitle ? (
                <div>{formik.errors.reviewTitle}</div>
              ) : null}
            </div>
            <div className="form-input">
              <label htmlFor="reviewBody">Description</label>
              <textarea
                id="reviewBody"
                name="reviewBody"
                autoComplete="off"
                value={formik.values.reviewBody}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.reviewBody && formik.errors.reviewBody ? (
                <div>{formik.errors.reviewBody}</div>
              ) : null}
            </div>
            <div>
              <button type="submit">Submit Review</button>
            </div>
          </form>
        </>
      ) : (
        <div className="submitted-confirm">
          <h3>Thank you for your review!</h3>
          <hr />
          <Rating rating={formik.values.rating} handleStarClick={updateRating} />
          <div>
            <label htmlFor="reviewTitle">Review Title:</label>
            <p>{formik.values.reviewTitle}</p>
          </div>
          <div>
            <label htmlFor="reviewBody">Review:</label>
            <p>{formik.values.reviewBody}</p>
          </div>
        </div>
      )}
      </div>
    </ReviewContainer>
  );
}

export default ReviewForm;
