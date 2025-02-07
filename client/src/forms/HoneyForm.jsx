import React, { useContext, useState } from "react";
import {useOutletContext} from "react-router-dom";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup"; // Validation library
import { UserContext } from "../context/userProvider";
import Error from "../styles/Error";
import { StyledForm, Button } from "../MiscStyling";
import useCrudStateDB from '../hooks/useCrudStateDB';
import FormSubmit from '../components/FormSubmit'

const HoneyForm = ({ initObj, viewHoney }) => {
  const { user } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(!initObj);
  const { id } = useParams(); // Get hive ID from URL
  const { setHives } = useOutletContext();
  const {addToKey, updateKey} = useCrudStateDB(setHives, "hives", null, viewHoney);
  const hiveId = parseInt(id);
 
  const initialValues = initObj
    ? {
        dateReset: initObj.dateReset || "",
        datePulled: initObj.datePulled || "",
        weight: initObj.weight || "",
      }
    : {
        dateReset: "",
        datePulled: "",
        weight: "",
      };

  const submitToDB = initObj
    ? (body) =>
        updateKey(hiveId, "honey_pulls", initObj.id, body)
    : (body) =>
        addToKey(hiveId, "honey_pulls", body)
 
  // Validation schema matching backend
  const validationSchema = Yup.object({
    dateReset: Yup.date()
      .required("Date reset is required")
      .typeError("Invalid date format"),
    datePulled: Yup.date()
      .nullable()
      .typeError("Invalid date format"),
    weight: Yup.number()
      .nullable()
      .min(0, "Weight cannot be below 0")
      .max(200, "Weight cannot exceed 200")
      .typeError("Weight must be a number"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const body = {
        ...Object.fromEntries(
          Object.entries(values).map(([key, value]) => [key, value === "" ? null : value])
        ),
        hiveId: hiveId,
      };

      submitToDB(body);
    },
  });

  return (
    <div>
      {isEditing ? (
        <StyledForm onSubmit={formik.handleSubmit}>
          <h3>{initObj ? "Update Honey Pull" : "Add New Honey Pull"}</h3>

          <div className="form-input">
            <label htmlFor="dateReset">Start Date</label>
            <input
              type="date"
              id="dateReset"
              name="dateReset"
              value={formik.values.dateReset}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.datePulled && formik.errors.datePulled && (
              <Error>{formik.errors.datePulled}</Error>
            )}
          </div>
          <div className="form-input">
            <label htmlFor="datePulled">Date Pulled</label>
            <input
              type="date"
              id="datePulled"
              name="datePulled"
              value={formik.values.datePulled}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.datePulled && formik.errors.datePulled && (
              <Error>{formik.errors.datePulled}</Error>
            )}
          </div>
          <div className="form-input">
            <label htmlFor="weight">Weight (lbs)</label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={formik.values.weight}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.weight && formik.errors.weight && (
              <Error>{formik.errors.weight}</Error>
            )}
          </div>

          <Button type="submit">{initObj ? "Update" : "Add"}</Button>
        </StyledForm>
      ) : (
        <FormSubmit
          label={'Honey Pull Details'}
          formValues={formik.values}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
};

export default HoneyForm;