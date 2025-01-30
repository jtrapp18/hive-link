import React, { useContext, useState } from "react";
import styled from "styled-components";
import { UserContext } from '../context/userProvider';
import { useFormik } from "formik";
import * as Yup from "yup"; // Validation library
import { patchJSONToDb, postJSONToDb } from '../helper';
import Error from "../styles/Error";
import { StyledForm } from '../MiscStyling';

const EventForm = ({ initObj }) => {
  const { user } = useContext(UserContext);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const initialValues = initObj
    ? {
        title: initObj.title || "",
        eventDate: initObj.eventDate || "",
        descr: initObj.descr || "",
        zipcode: initObj.zipcode || "",
      }
    : {
        title: "",
        eventDate: "",
        descr: "",
        zipcode: "",
      };

  const submitToDB = initObj
    ? (body) =>
        patchJSONToDb("events", initObj.id, body)
          .then(() => setIsSubmitted(true))
          .catch((err) => console.error(err))
    : (body) =>
        postJSONToDb("events", body)
          .then(() => setIsSubmitted(true))
          .catch((err) => console.error(err));

  // Validation schema
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    eventDate: Yup.date()
      .required("Event date is required")
      .typeError("Invalid date format"),
    zipcode: Yup.string()
      .matches(/^\d{5}(-\d{4})?$/, "Invalid zipcode format")
      .required("Zipcode is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const body = {
        ...values,
        userId: user.id,
      };

      submitToDB(body);
    }
  });

  return (
    <div>
      {!isSubmitted ? (
        <StyledForm onSubmit={formik.handleSubmit}>
          <h3>{initObj ? "Event Details" : "Add New Event"}</h3>
          <br />
          <div className="form-input">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.title && formik.errors.title && (
              <Error>{formik.errors.title}</Error>
            )}
          </div>

          <div className="form-input">
            <label htmlFor="eventDate">Event Date</label>
            <input
              type="date"
              id="eventDate"
              name="eventDate"
              value={formik.values.eventDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.eventDate && formik.errors.eventDate && (
              <Error>{formik.errors.eventDate}</Error>
            )}
          </div>

          <div className="form-input">
            <label htmlFor="descr">Description</label>
            <textarea
              id="descr"
              name="descr"
              value={formik.values.descr}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.descr && formik.errors.descr && (
              <Error>{formik.errors.descr}</Error>
            )}
          </div>

          <div className="form-input">
            <label htmlFor="zipcode">Zipcode</label>
            <input
              type="text"
              id="zipcode"
              name="zipcode"
              value={formik.values.zipcode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.zipcode && formik.errors.zipcode && (
              <Error>{formik.errors.zipcode}</Error>
            )}
          </div>

          <button type="submit">{initObj ? "Update Event" : "Add Event"}</button>
          <button type="button">Delete Event</button>
        </StyledForm>
      ) : (
        <div>
          <h3>Event successfully added!</h3>
        </div>
      )}
    </div>
  );
};

export default EventForm;