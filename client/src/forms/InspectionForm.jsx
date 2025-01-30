import React, { useContext, useState } from "react";
import { postJSONToDb, patchJSONToDb } from '../helper';
import styled from "styled-components";
import { UserContext } from '../context/userProvider';
import { useFormik } from 'formik';
import * as Yup from 'yup'; // Import yup for validation
import Error from "../styles/Error";
import { StyledForm, StyledSubmit, Button } from "../MiscStyling"

const InspectionForm = ({ initObj }) => {
  const { user } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(!initObj);

  const initialValues = initObj
    ? {
        dateChecked: initObj.dateChecked || "",
        temp: initObj.origin || "",
        activitySurroundingHive: initObj.activitySurroundingHive || "",
        eggCount: initObj.eggCount || "",
        larvaeCount: initObj.larvaeCount || "",
        superCount: initObj.superCount || ""
      }
    : {
        dateChecked: '',
        temp: '',
        activitySurroundingHive: '',
        eggCount: '',
        larvaeCount: '',
        superCount: ''
      };

  const submitToDB = initObj
    ? (body) =>
        patchJSONToDb("inspections", initObj.id, body)
          .then(() => setIsEditing(false))
          .catch((err) => console.error(err))
    : (body) =>
        postJSONToDb("inspections", body)
          .then(() => setIsEditing(false))
          .catch((err) => console.error(err));

  // Yup validation schema
  const validationSchema = Yup.object({
    dateChecked: Yup.date().required('Date is required').typeError('Invalid date format'),
    temp: Yup.number().min(-10, 'Temperature must be between -10 and 50').max(50, 'Temperature must be between -10 and 50').nullable(),
    activitySurroundingHive: Yup.string().max(50, 'Max length is 50 characters').nullable(),
    eggCount: Yup.mixed().oneOf(['Low', 'Medium', 'High'], 'Egg count must be Low, Medium, or High').nullable(),
    larvaeCount: Yup.mixed().oneOf(['Low', 'Medium', 'High'], 'Larvae count must be Low, Medium, or High').nullable(),
    superCount: Yup.number().nullable(),
    // Add other fields as necessary, applying the validation rules from your backend model
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const body = {
        ...values,
        userId: user.id,
        queenId: queen.id,
      };

      submitToDB(body);
    },
  });

  return (
    <div>
      {isEditing ? (
        <StyledForm onSubmit={formik.handleSubmit}>
          <h3>{initObj ? "Update Inspection Details" : "Add New Inspection"}</h3>
          <div className="form-input">
            <label htmlFor="dateChecked">Date of Inspection</label>
            <input
              type="date"
              id="dateChecked"
              name="dateChecked"
              value={formik.values.dateChecked}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.dateChecked && formik.errors.dateChecked && (
              <Error>{formik.errors.dateChecked}</Error>
            )}
          </div>
          <div className="form-input">
            <label htmlFor="temp">Temperature</label>
            <input
              type="number"
              id="temp"
              name="temp"
              value={formik.values.temp}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.temp && formik.errors.temp && (
              <Error>{formik.errors.temp}</Error>
            )}
          </div>
          {/* Add more form inputs based on other inspection attributes */}
          <div className="form-input">
            <label htmlFor="activitySurroundingHive">Activity Surrounding Hive</label>
            <input
              type="text"
              id="activitySurroundingHive"
              name="activitySurroundingHive"
              value={formik.values.activitySurroundingHive}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.activitySurroundingHive && formik.errors.activitySurroundingHive && (
              <Error>{formik.errors.activitySurroundingHive}</Error>
            )}
          </div>
          <div>
            <Button type="submit">{initObj ? "Update Inspection" : "Add Inspection"}</Button>
          </div>
        </StyledForm>
      ) : (
        <StyledSubmit>
            <h1>Inspection Details</h1>
            <div>
                <label>Date Checked: </label>
                <p>{formik.values.dateChecked}</p>
            </div>
            <div>
                <label>Temperature: </label>
                <p>{formik.values.temp}</p>
            </div>
            <div>
                <label>Activity Around Hive: </label>
                <p>{formik.values.activitySurroundingHive}</p>
            </div>
            <div>
                <label>Egg Count: </label>
                <p>{formik.values.eggCount}</p>
            </div>
            <div>
                <label>Larvae Count: </label>
                <p>{formik.values.larvaeCount}</p>
            </div>
            <div>
                <label>Super Count: </label>
                <p>{formik.values.superCount}</p>
            </div>
            <Button 
              type="button" 
              onClick={() => setIsEditing(true)}
            >
                Edit
            </Button>
        </StyledSubmit>
      )}
    </div>
  );
};

export default InspectionForm;