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
  
  const { graphData } = useOutletContext();

  return (
    <StyledForm>
        <h3>Graph options</h3>
        <div id="options-container">
          {/* <strong>Filters</strong> */}
          {/* <div id="filters">
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
            </div> */}
          <strong>Variable Selection</strong>
          <div id="variable-selection">
            <div className="form-input">
                <label htmlFor="target">Target Variable</label>
                <select
                    id="target"
                    name="target"
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                >
                    <option value="weight" label="Weight" />
                </select>
            </div>
            <div className="form-input">
                <label htmlFor="explanatoryVar">Explanatory Variable</label>
                <select
                    id="explanatoryVar"
                    name="explanatoryVar"
                    value={explanatoryVar}
                    onChange={(e) => setExplanatoryVar(e.target.value)}
                >
                    {Object.keys(graphData.aggregated).map(key=>
                      <option key={key} value={key} label={key} />
                    )}
                </select>
            </div>
          </div>
        </div>
    </StyledForm>
  );
};

export default GraphOptions;