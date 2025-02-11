import React, { useContext, useState, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup"; // Validation library
import { UserContext } from "../context/userProvider";
import Error from "../styles/Error";
import { StyledForm, Button } from "../MiscStyling";
import useCrudStateDB from '../hooks/useCrudStateDB';
import FormSubmit from '../components/FormSubmit';
import { IMaskInput } from 'react-imask';

const AccountForm = () => {
  const { user, setUser } = useContext(UserContext); // User info from context
  const [isEditing, setIsEditing] = useState(false); // Start in edit mode
  const { updateItem } = useCrudStateDB(setUser, "users");

  // Initialize form values from user context
  const initialValues = {
    username: user.username || "",
    email: user.email || "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phoneNumber: user.phoneNumber || "",
    zipcode: user.zipcode || "",
  };

  const submitToDB = (body) => {
    updateItem(body, user.id); // Update user in database
    setIsEditing(false);
  };

  const cancelChange = () => {
    formik.resetForm();
    setIsEditing(false);
  };

  const phoneInputRef = useRef(null); // Ref for IMaskInput

  const handlePhoneAccept = (value) => {
    // Get unmasked value and update Formik field
    formik.setFieldValue('phoneNumber', value.replace(/\D/g, '')); // Removing non-digit characters
  }

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required("First name is required.")
      .min(1, "First name must be at least 1 character long"),
    lastName: Yup.string()
      .required("Last name is required.")
      .min(1, "Last name must be at least 1 character long"),
    email: Yup.string()
      .email("Invalid email address format")
      .required("Email address is required."),
    phoneNumber: Yup.string()
      .matches(/^\+?1?\d{9,15}$/, "Phone number must be in a valid format")
      .nullable(),
    zipcode: Yup.string()
      .matches(/^\d{5}(-\d{4})?$/, "Invalid zip code format")
      .required("Zip code is required."),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const body = {
        ...Object.fromEntries(
          Object.entries(values).map(([key, value]) => [key, value === "" ? null : value])
        ),
      };

      submitToDB(body); // Submit updated data to the backend
    },
  });

  return (
    <div>
      {isEditing ? (
        <StyledForm onSubmit={formik.handleSubmit}>
          <h2>Edit Account Details</h2>
          <div className="form-input">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.username && formik.errors.username && (
              <Error>{formik.errors.username}</Error>
            )}
          </div>
          <div className="form-input">
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <div className="error">{formik.errors.firstName}</div>
            )}
          </div>
          <div className="form-input">
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <div className="error">{formik.errors.lastName}</div>
            )}
          </div>
          <div className="form-input">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <Error>{formik.errors.email}</Error>
            )}
          </div>
          <div className="form-input">
            <label htmlFor="phoneNumber">Phone Number</label>
            <IMaskInput
              name="phoneNumber"
              mask="(000) 000-0000"
              unmask={true}
              value={formik.values.phoneNumber}
              onAccept={handlePhoneAccept}
              inputRef={phoneInputRef}
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <Error>{formik.errors.phoneNumber}</Error>
            )}
          </div>
          <div className="form-input">
            <label>Zip Code:</label>
            <input
              type="text"
              name="zipcode"
              value={formik.values.zipcode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.zipcode && formik.errors.zipcode && (
              <div className="error">{formik.errors.zipcode}</div>
            )}
          </div>
          <div>
            <Button type="button" onClick={cancelChange}>Cancel</Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </StyledForm>
      ) : (
        <FormSubmit
          label={"Account Details"}
          formValues={formik.values}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
};

export default AccountForm;