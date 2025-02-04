import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import {useOutletContext} from "react-router-dom";
import { UserContext } from '../context/userProvider';
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup"; // Validation library
import Error from "../styles/Error";
import { StyledForm, StyledSubmit, Button } from '../MiscStyling';
import FormFooter from "../components/FormFooter";

const InspectionForm = ({ initObj, addInspection, updateInspection }) => {
  const { id: hiveId } = useParams(); // Get hive ID from URL
  const { hives } = useOutletContext();
  const [isEditing, setIsEditing] = useState(!initObj);
  const [step, setStep] = useState(1);

  const hive = hives.find(hive=>hive.id===parseInt(hiveId))
  const honeyPull = hive.honeyPulls.find(honeyPull=>!honeyPull.pullDate)

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const submitToDB = initObj
    ? (body) =>
      updateInspection(initObj.id, body)
    : (body) => {
      addInspection(body)
    }

  // Validation schema
  const validationSchema = Yup.object({
    dateChecked: Yup.date().required("Date is required").typeError("Invalid date format"),
    bias: Yup.number().required("Bias is required").min(0, "Must be a non-negative number"),
    fate: Yup.string().required("Fate is required").oneOf(["Dead", "Swarmed", "Split", "Thriving"]),
    activitySurroundingHive: Yup.string().oneOf(["Low", "Medium", "High"]),
    stabilityInHive: Yup.string().oneOf(["Low", "Medium", "High"]),
    temp: Yup.number().min(-10, "Temperature must be between -10 and 50").max(50, "Temperature must be between -10 and 50"),
    humidity: Yup.number().min(0, "Humidity must be between 0 and 100").max(100, "Humidity must be between 0 and 100"),
    weatherConditions: Yup.string().oneOf(["Sunny", "Overcast", "Rainy", "Snowy", "Windy"]),
    antsPresent: Yup.boolean(),
    slugsPresent: Yup.boolean(),
    hiveBeetlesPresent: Yup.boolean(),
    waxMothsPresent: Yup.boolean(),
    waspsHornetsPresent: Yup.boolean(),
    micePresent: Yup.boolean(),
    robberBeesPresent: Yup.boolean(),
    numPollenPatties: Yup.number().min(0, "Number of pollen patties cannot be negative"),
    numSugarSyrupFrames: Yup.number().min(0, "Number of sugar syrup frames cannot be negative"),
    oxalicAcidDosage: Yup.number().min(0, "Oxalic acid dosage cannot be negative"),
    formicAcidDosage: Yup.number().min(0, "Formic acid dosage cannot be negative"),
    thymolDosage: Yup.number().min(0, "Thymol dosage cannot be negative"),
    apistanDosage: Yup.number().min(0, "Apistan dosage cannot be negative"),
    hasTwistedLarvae: Yup.boolean(),
    hasChalkbrood: Yup.boolean(),
    varroaMiteCount: Yup.number().min(0, "Varroa mite count cannot be negative"),
  });

  const formik = useFormik({
      enableReinitialize: true,
      initialValues: initObj || { 
      dateChecked: "", 
      bias: "", 
      fate: "", 
      activitySurroundingHive: "", 
      stabilityInHive: "",
      temp: "", 
      humidity: "", 
      weatherConditions: "",
      antsPresent: false,
      slugsPresent: false,
      hiveBeetlesPresent: false,
      waxMothsPresent: false,
      waspsHornetsPresent: false,
      micePresent: false,
      robberBeesPresent: false,
      numPollenPatties: 0,
      numSugarSyrupFrames: 0,
      oxalicAcidDosage: 0,
      formicAcidDosage: 0,
      thymolDosage: 0,
      apistanDosage: 0,
      hasTwistedLarvae: false,
      hasChalkbrood: false,
      varroaMiteCount: 0,
      activity_surrounding_hive: "",
      stability_in_hive: "",
      notes: ""
    },
    validationSchema,
    onSubmit: (values) => {
      const body = {
        ...values,
        honeyPullId: honeyPull.id,
      };

      submitToDB(body);
      setIsEditing(false);
    },
  });

  return (
    <div>
      {isEditing ? (
        <StyledForm onSubmit={formik.handleSubmit}>
          <h3>{initObj ? "Inspection Details" : "Add New Inspection"}</h3>
          <br />
        {step === 1 && (
          <>
            <p>Basic Information</p>
            <div className="form-input">
              <label htmlFor="dateChecked">Date</label>
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
          </>
        )}

        {step === 2 && (
          <>
            <p>Hive Conditions</p>
            <div className="form-input">
              <label htmlFor="bias">Bias (Number of frames with brood)</label>
              <input
                type="number"
                id="bias"
                name="bias"
                value={formik.values.bias}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.bias && formik.errors.bias && (
                <Error>{formik.errors.bias}</Error>
              )}
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <p>Weather</p>
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
            <div className="form-input">
              <label htmlFor="humidity">Humidity</label>
              <input
                type="number"
                id="humidity"
                name="humidity"
                value={formik.values.humidity}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.humidity && formik.errors.humidity && (
                <Error>{formik.errors.humidity}</Error>
              )}
            </div>
            <div className="form-input">
              <label htmlFor="weatherConditions">Weather Conditions</label>
              <select
                id="weatherConditions"
                name="weatherConditions"
                value={formik.values.weatherConditions}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Select Weather</option>
                <option value="Sunny">Sunny</option>
                <option value="Overcast">Overcast</option>
                <option value="Rainy">Rainy</option>
                <option value="Snowy">Snowy</option>
                <option value="Windy">Windy</option>
              </select>
              {formik.touched.weatherConditions && formik.errors.weatherConditions && (
                <Error>{formik.errors.weatherConditions}</Error>
              )}
            </div>
          </>
        )}
        {step === 4 && (
          <>
            <p>Pests</p>
            <div className="form-input">
              <label htmlFor="antsPresent">Ants Present</label>
              <input
                type="checkbox"
                id="antsPresent"
                name="antsPresent"
                checked={formik.values.antsPresent}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="form-input">
              <label htmlFor="slugsPresent">Slugs Present</label>
              <input
                type="checkbox"
                id="slugsPresent"
                name="slugsPresent"
                checked={formik.values.slugsPresent}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="form-input">
              <label htmlFor="hiveBeetlesPresent">Hive Beetles Present</label>
              <input
                type="checkbox"
                id="hiveBeetlesPresent"
                name="hiveBeetlesPresent"
                checked={formik.values.hiveBeetlesPresent}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="form-input">
              <label htmlFor="waxMothsPresent">Wax Moths Present</label>
              <input
                type="checkbox"
                id="waxMothsPresent"
                name="waxMothsPresent"
                checked={formik.values.waxMothsPresent}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="form-input">
              <label htmlFor="waspsHornetsPresent">Wasps/Hornets Present</label>
              <input
                type="checkbox"
                id="waspsHornetsPresent"
                name="waspsHornetsPresent"
                checked={formik.values.waspsHornetsPresent}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="form-input">
              <label htmlFor="micePresent">Mice Present</label>
              <input
                type="checkbox"
                id="micePresent"
                name="micePresent"
                checked={formik.values.micePresent}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="form-input">
              <label htmlFor="robberBeesPresent">Robber Bees Present</label>
              <input
                type="checkbox"
                id="robberBeesPresent"
                name="robberBeesPresent"
                checked={formik.values.robberBeesPresent}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </>
        )}
        {step === 5 && (
          <>
            <p>Active Hive Management</p>
            <div className="form-input">
              <label htmlFor="numPollenPatties">Number of Pollen Patties</label>
              <input
                type="number"
                id="numPollenPatties"
                name="numPollenPatties"
                value={formik.values.numPollenPatties}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="form-input">
              <label htmlFor="numSugarSyrupFrames">Number of Sugar Syrup Frames</label>
              <input
                type="number"
                id="numSugarSyrupFrames"
                name="numSugarSyrupFrames"
                value={formik.values.numSugarSyrupFrames}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="form-input">
              <label htmlFor="oxalicAcidDosage">Oxalic Acid Dosage (grams)</label>
              <input
                type="number"
                id="oxalicAcidDosage"
                name="oxalicAcidDosage"
                value={formik.values.oxalicAcidDosage}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="form-input">
              <label htmlFor="formicAcidDosage">Formic Acid Dosage (grams)</label>
              <input
                type="number"
                id="formicAcidDosage"
                name="formicAcidDosage"
                value={formik.values.formicAcidDosage}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="form-input">
              <label htmlFor="thymolDosage">Thymol Dosage (grams)</label>
              <input
                type="number"
                id="thymolDosage"
                name="thymolDosage"
                value={formik.values.thymolDosage}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="form-input">
              <label htmlFor="apistanDosage">Apistan Dosage (grams)</label>
              <input
                type="number"
                id="apistanDosage"
                name="apistanDosage"
                value={formik.values.apistanDosage}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="form-input">
              <label htmlFor="hasTwistedLarvae">Has Twisted Larvae?</label>
              <input
                type="checkbox"
                id="hasTwistedLarvae"
                name="hasTwistedLarvae"
                checked={formik.values.hasTwistedLarvae}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </>
        )}
        {step === 6 && (
          <>
            <p>Outcomes</p>
            <div className="form-input">
              <label htmlFor="fate">Fate</label>
              <select
                id="fate"
                name="fate"
                value={formik.values.fate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Select Fate</option>
                <option value="Dead">Dead</option>
                <option value="Swarmed">Swarmed</option>
                <option value="Split">Split</option>
                <option value="Thriving">Thriving</option>
              </select>
              {formik.touched.fate && formik.errors.fate && (
                <Error>{formik.errors.fate}</Error>
              )}
            </div>
            <div className="form-input">
              <label htmlFor="hasChalkbrood">Has Chalkbrood?</label>
              <input
                type="checkbox"
                id="hasChalkbrood"
                name="hasChalkbrood"
                checked={formik.values.hasChalkbrood}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="form-input">
              <label htmlFor="varroaMiteCount">Varroa Mite Count</label>
              <input
                type="number"
                id="varroaMiteCount"
                name="varroaMiteCount"
                value={formik.values.varroaMiteCount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </>
        )}
        {step === 7 && (
          <>
            <p>Additional Notes</p>
            <div className="form-input">
              <label htmlFor="activitySurroundingHive">Activity Surrounding Hive</label>
              <select
                id="activitySurroundingHive"
                name="activitySurroundingHive"
                value={formik.values.activitySurroundingHive}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Select Activity Level</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              {formik.touched.activitySurroundingHive && formik.errors.activitySurroundingHive && (
                <Error>{formik.errors.activitySurroundingHive}</Error>
              )}
            </div>
            <div className="form-input">
              <label htmlFor="stabilityInHive">Stability in Hive</label>
              <select
                id="stabilityInHive"
                name="stabilityInHive"
                value={formik.values.stabilityInHive}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Select Stability</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              {formik.touched.stabilityInHive && formik.errors.stabilityInHive && (
                <Error>{formik.errors.stabilityInHive}</Error>
              )}
            </div>
            <div className="form-input">
              <label htmlFor="notes">Notes</label>
              <textarea
                id="notes"
                name="notes"
                value={formik.values.notes}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </>
        )}
          <Button type="submit">{initObj ? "Update Inspection" : "Add Inspection"}</Button>
        </StyledForm>
      ) : (
        <StyledSubmit>
          <h1>Inspection Details</h1>
          <div>
            <label>Fate:</label>
            <p>{formik.values.fate}</p>
          </div>
          <Button type="button" onClick={() => setIsEditing(true)}>
            Edit Inspection Details
          </Button>
        </StyledSubmit>
      )}
      <FormFooter
        step={step}
        prevStep={prevStep} 
        nextStep={nextStep}
      />
    </div>
  );
};

export default InspectionForm;