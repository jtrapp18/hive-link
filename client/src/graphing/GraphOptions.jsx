import React, { useContext, useState } from "react";
import { UserContext } from '../context/userProvider';
import {useOutletContext} from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup"; // Validation library
import { patchJSONToDb, postJSONToDb } from '../helper';
import Error from "../styles/Error";
import { Button } from '../MiscStyling'
import styled from "styled-components";

const StyledForm = styled.form`
  background: var(--yellow);
  padding: 20px;
  width: 100%;

  color: black;

  h3, label, input, select, option, p {
    color: inherit;
    margin: 0;
  }

  #options-container {
    label {
      font-family: var(--default-font);
    }

    & > div {
      padding: 10px;
      border: 1px solid black;
      justify-content: space-between;
      margin: 1%;
    }

    .form-input {
      display: flex;
      justify-content: space-between;
    }

    .filter-input {
      display: flex;
      flex-direction: column;
    }

    #filters {
      display: flex;
    }

    #variable-selection {

    }
  }
`

const GraphOptions = ({ filters, setFilters, target, setTarget, 
  explanatoryVar, setExplanatoryVar }) => {

  const initialValues = {
        userOnly: false,
        somethingElse: false,
        target: "fate",
        explanatory: "dateChecked"
      };

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      setFilters({user: values.userOnly});
      setTarget({value: "Dead", variable: values.target})
      setExplanatoryVar({table: "inspections", variable: values.explanatory})
    }
  });

  return (
    <StyledForm onSubmit={formik.handleSubmit}>
        <h3>Graph options</h3>
        <div id="options-container">
          <strong>Filters</strong>
          <div id="filters">
            <div className="filter-input">
                <label htmlFor="userOnly">User Only</label>
                <input
                    type="checkbox"
                    id="userOnly"
                    name="userOnly"
                    value={formik.values.userOnly}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
            </div>
            <div className="filter-input">
                <label htmlFor="somethingElse">User Only</label>
                <input
                    type="checkbox"
                    id="somethingElse"
                    name="somethingElse"
                    value={formik.values.somethingElse}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
              </div>
          </div>
          <strong>Variable Selection</strong>
          <div id="variable-selection">
            <div className="form-input">
                <label htmlFor="target">Target Variable</label>
                <select
                    id="target"
                    name="target"
                    value={formik.values.target}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                >
                    <option value="" label="Select target" />
                    <option value="Fate" label="Fate" />
                </select>
            </div>
            <div className="form-input">
                <label htmlFor="explanatory">Explanatory Variable</label>
                <select
                    id="explanatory"
                    name="explanatory"
                    value={formik.values.explanatory}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                >
                    <option value="" label="Select target" />
                    <option value="dateChecked" label="dateChecked" />
                </select>
            </div>
          </div>
        </div>
        <Button type="submit">Apply Filters</Button>
    </StyledForm>
  );
};

export default GraphOptions;