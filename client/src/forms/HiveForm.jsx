import React, { useContext, useState } from "react";
import { UserContext } from '../context/userProvider';
import {useOutletContext} from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup"; // Validation library
import Error from "../styles/Error";
import { StyledForm, Button } from '../MiscStyling'
import useCrudStateDB from '../hooks/useCrudStateDB';
import FormSubmit from '../components/FormSubmit'

const HiveForm = ({ initObj, viewHive }) => {
  const { user } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(!initObj);
  const { setHives } = useOutletContext();
  const {addItem, updateItem} = useCrudStateDB(setHives, "hives", null, viewHive); 

  const initialValues = initObj
    ? {
        dateAdded: initObj.dateAdded || "",
        material: initObj.material || "",
        addressLine: initObj.addressLine || "",
        city: initObj.city || "",
        state: initObj.state || "",
        postalCode: initObj.postalCode || "",
      }
    : {
        dateAdded: "",
        material: "",
        addressLine: "",
        city: "",
        state: "",
        postalCode: "",
      };

      const submitToDB = initObj
      ? (body) =>
        updateItem(body, initObj.id)
      : (body) => {
        addItem(body)
      }

  // Validation schema
  const validationSchema = Yup.object({
    dateAdded: Yup.date()
      .required("Date is required")
      .typeError("Invalid date format"),
    material: Yup.string()
      .oneOf(["Wood", "Polystyrene", "Other"], "Material must be Wood, Polystyrene, or Other")
      .required("Material is required"),
    addressLine: Yup.string()
      .required("Address is required"),
    city: Yup.string()
      .required("City is required"),
    state: Yup.string()
    .required("State is required"),
    postalCode: Yup.string()
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
      setIsEditing(false);
    }
  });

  return (
    <div>
      {isEditing ? (
        <StyledForm onSubmit={formik.handleSubmit}>
          <h2>{initObj ? "Update Hive Details" : "Add New Hive"}</h2>
          <br />
          <div className="form-input">
            <label htmlFor="dateAdded">Date Added</label>
            <input
              type="date"
              id="dateAdded"
              name="dateAdded"
              value={formik.values.dateAdded}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.dateAdded && formik.errors.dateAdded && (
              <Error>{formik.errors.dateAdded}</Error>
            )}
          </div>

          <div className="form-input">
            <label htmlFor="material">Material</label>
            <select
              id="material"
              name="material"
              value={formik.values.material}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="" label="Select material" />
              <option value="Wood" label="Wood" />
              <option value="Polystyrene" label="Polystyrene" />
              <option value="Other" label="Other" />
            </select>
            {formik.touched.material && formik.errors.material && (
              <Error>{formik.errors.material}</Error>
            )}
          </div>
          <div className="form-input">
            <label htmlFor="addressLine">Address Line</label>
            <input
              id="addressLine"
              name="addressLine"
              value={formik.values.addressLine}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.addressLine && formik.errors.addressLine && (
              <Error>{formik.errors.addressLine}</Error>
            )}
          </div>
          <div className="form-input">
            <label htmlFor="city">City</label>
            <input
              id="city"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.city && formik.errors.city && (
              <Error>{formik.errors.city}</Error>
            )}
          </div>
          <div className="form-input">
            <label htmlFor="state">State</label>
            <input
              id="state"
              name="state"
              value={formik.values.state}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.state && formik.errors.state && (
              <Error>{formik.errors.state}</Error>
            )}
          </div>
          <div className="form-input">
            <label htmlFor="postalCode">Zip Code</label>
            <input
              id="postalCode"
              name="postalCode"
              value={formik.values.postalCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.postalCode && formik.errors.postalCode && (
              <Error>{formik.errors.postalCode}</Error>
            )}
          </div>
          <Button type="submit">{initObj ? "Update Hive" : "Add Hive"}</Button>
        </StyledForm>
      ) : (
        <FormSubmit
          label={'Hive Details'}
          formValues={formik.values}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
};

export default HiveForm;