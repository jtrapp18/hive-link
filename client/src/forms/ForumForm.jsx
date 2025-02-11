import React, { useContext, useState } from "react";
import { UserContext } from '../context/userProvider';
import { useFormik } from "formik";
import * as Yup from "yup"; // Validation library
import Error from "../styles/Error";
import { StyledForm, StyledSubmit, StyledDeleted, Button } from '../MiscStyling';

const ForumForm = ({ initObj, addForum, updateForum, deleteForum, deleted }) => {
  const { user } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(!initObj);

  const submitToDB = initObj
    ? (body) => updateForum(body, initObj.id)
    : (body) => addForum(body);

  // Validation schema
  const validationSchema = Yup.object({
    category: Yup.string().required("Category is required"),
  });

  const formik = useFormik({
    enableReinitialize: true, // Ensure Formik updates when initObj changes
    initialValues: initObj || { title: "", category: "", userId: user.id },
    validationSchema,
    onSubmit: (values) => {
      const body = {
        ...values,
        userId: user.id,
      };
      submitToDB(body);
      setIsEditing(false);
    },
  });

  if (deleted) return (
    <StyledDeleted>
      <h1>Forum Deleted</h1>
      <div>
        <label>Category:</label>
        <p>{formik.values.category}</p>
      </div>
      <div>
        <label>Title:</label>
        <p>{formik.values.title}</p>
      </div>
    </StyledDeleted>
  )

  return (
    <div>
      {isEditing ? (
        <StyledForm onSubmit={formik.handleSubmit}>
          <h3>{initObj ? "Forum Details" : "Add New Forum Post"}</h3>
          <br />
          <div className="form-input">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.category && formik.errors.category && (
              <Error>{formik.errors.category}</Error>
            )}
          </div>
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
          <Button type="submit">{initObj ? "Update Forum" : "Create Forum"}</Button>
        </StyledForm>
      ) : (
        <StyledSubmit>
          <h1>Forum Details</h1>
          <div>
            <label>Category:</label>
            <p>{formik.values.category}</p>
          </div>
          <div>
            <label>Title:</label>
            <p>{formik.values.title}</p>
          </div>
          <Button 
            type="button" 
            onClick={() => setIsEditing(true)}
          >
            Edit Forum Details
          </Button>
          <Button 
            type="button" 
            onClick={() => deleteForum(initObj.id)}
          >
            Delete Forum
          </Button>
        </StyledSubmit>
      )}
    </div>
  );
};

export default ForumForm;