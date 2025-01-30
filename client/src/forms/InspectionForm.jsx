import React, { useContext, useState } from "react";
import { postJSONToDb, patchJSONToDb } from '../helper';
import styled from "styled-components";
import { UserContext } from '../context/userProvider';
import HiveCard from '../components/HiveCard';
import { useFormik } from 'formik';
import * as Yup from 'yup'; // Import yup for validation
import Error from "../styles/Error";
import {StyledForm} from "../MiscStyling"

const InspectionContainer = styled.div`
    .submitted-confirm {
      border-radius: 20px;
      padding: 20px;
    }
  }
`;

const InspectionForm = ({ initObj }) => {
  const { user } = useContext(UserContext);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
          .then(() => setIsSubmitted(true))
          .catch((err) => console.error(err))
    : (body) =>
        postJSONToDb("inspections", body)
          .then(() => setIsSubmitted(true))
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
    <InspectionContainer>
      <div className="main-inspection">
        {!isSubmitted ? (
          <>
            <h1>Inspection</h1>
            <StyledForm onSubmit={formik.handleSubmit}>
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
                <button type="submit">{initObj ? "Update Inspection" : "Add Inspection"}</button>
              </div>
            </StyledForm>
          </>
        ) : (
          <div className="submitted-confirm">
            <h3>Thank you for your inspection!</h3>
            <hr />
            <div>
              <label htmlFor="dateChecked">Inspection Date:</label>
              <p>{formik.values.dateChecked}</p>
            </div>
            {/* Display other inspection details here */}
          </div>
        )}
      </div>
    </InspectionContainer>
  );
};

export default InspectionForm;