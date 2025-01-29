import React, { useContext, useState } from "react";
import { postJSONToDb, patchJSONToDb } from '../helper';
import styled from "styled-components";
import { UserContext } from '../context/userProvider';
import HiveCard from './HiveCard';
import { useFormik } from 'formik';
import * as Yup from 'yup'; // Import yup for validation

const InspectionContainer = styled.div`
  // position: fixed;
  // z-index: 1000;
  // top: var(--height-header);
  // left: 50%;
  // transform: translateX(-50%);
  border: 1px solid black;
  background: var(--gray);

  .hive-card {
    zoom: .7;
  }

  .main-inspection {
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

const InspectionForm = ({ hive }) => {
  const { user } = useContext(UserContext);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const initialValues = hive
    ? {
        dateChecked: hive.dateChecked || "",
        temp: hive.origin || "",
        activitySurroundingHive: hive.activitySurroundingHive || "",
        eggCount: hive.eggCount || "",
        larvaeCount: hive.larvaeCount || "",
        superCount: hive.superCount || ""
      }
    : {
        dateChecked: '',
        temp: '',
        activitySurroundingHive: '',
        eggCount: '',
        larvaeCount: '',
        superCount: ''
      };

  const submitToDB = hive
    ? (body) =>
        patchJSONToDb("hives", hive.id, body)
          .then(() => setIsSubmitted(true))
          .catch((err) => console.error(err))
    : (body) =>
        postJSONToDb("hives", body)
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
        user_id: user.id,
        hive_id: hive.id,
      };

      submitToDB(body);
    },
  });

  return (
    <InspectionContainer>
      <div className="main-inspection">
        {!isSubmitted ? (
          <>
            <h1>Inspection of Hive {hive.name}</h1>
            <HiveCard {...hive} />
            <form onSubmit={formik.handleSubmit}>
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
                  <div>{formik.errors.dateChecked}</div>
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
                  <div>{formik.errors.temp}</div>
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
                  <div>{formik.errors.activitySurroundingHive}</div>
                )}
              </div>
              <div>
                <button type="submit">Submit Inspection</button>
              </div>
            </form>
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