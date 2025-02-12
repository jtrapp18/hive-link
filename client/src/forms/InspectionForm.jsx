import React, { useContext, useState } from "react";
import styled from "styled-components";
import {useOutletContext} from "react-router-dom";
import { UserContext } from '../context/userProvider';
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup"; // Validation library
import Error from "../styles/Error";
import { StyledForm, Button } from '../MiscStyling';
import FormFooter from "../components/FormFooter";
import FormSubmit from '../components/FormSubmit';
import useCrudStateDB from '../hooks/useCrudStateDB';
import InspectionIndex from "../components/InspectionIndex";

const ModForm = styled(StyledForm)`
  height: 70vh;

  .checkbox-area {
      padding: 5%;
      border: 1px solid gray;
      width: 100%;

      .form-input {
        width: 100%;
        display: flex;
        justify-content: space-between;
        
        input {
          width: fit-content;
        }
      }
  }
`

const InspectionForm = ({ initObj, honeyPullId, viewInspection }) => {
  const [isEditing, setIsEditing] = useState(!initObj);
  const { id } = useParams(); // Get hive ID from URL
  const { setHives } = useOutletContext();
  const {addNestedKey, updateNestedKey} = useCrudStateDB(setHives, "hives", null, viewInspection);
  const hiveId = parseInt(id);
  const [step, setStep] = useState(1);

  const prevStep = () => setStep((prev) => prev - 1);

  const nextStep = async () => {
    const errors = await formik.validateForm();
  
    const pageFields = {
      1: ["dateChecked", "bias"],
      2: ["temp", "humidity", "weatherConditions"],
      5: ["activitySurroundingHive", "stabilityInHive"]
    };
  
    // Get errors relevant to the current step
    const stepErrors = Object.keys(errors).filter(field =>
      pageFields[step]?.includes(field)
    );
  
    // If there are errors for the current step, mark them as touched and prevent navigation
    if (stepErrors.length > 0) {
      formik.setTouched(
        stepErrors.reduce((acc, key) => ({ ...acc, [key]: true }), {})
      );
      return; // Stop navigation if there are errors
    }

    setStep(step + 1); // Proceed if no errors
  };

  const submitToDB = initObj
    ? (body) =>
      updateNestedKey("honey_pulls", honeyPullId, "inspections", initObj.id, body, hiveId)
    : (body) => {
      console.log(body)
      addNestedKey("honey_pulls", honeyPullId, "inspections", body, hiveId)
    }

  // Validation schema
  const validationSchema = Yup.object({
    dateChecked: Yup.date().required("Date is required").typeError("Invalid date format"),
    bias: Yup.number().required("Bias is required").min(0, "Must be a non-negative number"),
    hasEggs: Yup.boolean(),
    hasLarvae: Yup.boolean(),    
    temp: Yup.number().min(-10, "Temperature must be between -10 and 50").max(50, "Temperature must be between -10 and 50"),
    humidity: Yup.number().min(0, "Humidity must be between 0 and 100").max(100, "Humidity must be between 0 and 100"),
    weatherConditions: Yup.string().required().oneOf(["Sunny", "Overcast", "Rainy", "Snowy", "Windy"]),
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
    varroaMiteCount: Yup.number().min(0, "Varroa mite count cannot be negative"),
    hasChalkbrood: Yup.boolean(),
    hasTwistedLarvae: Yup.boolean(),
    activitySurroundingHive: Yup.string().required().oneOf(["Low", "Medium", "High"]),
    stabilityInHive: Yup.string().required().oneOf(["Low", "Medium", "High"]),
    notes: Yup.string().nullable().max(255, 'Notes must be at most 255 characters')
  });

  const formik = useFormik({
      enableReinitialize: true,
      initialValues: {
        dateChecked: initObj?.dateChecked || "",
        bias: initObj?.bias ?? 0,
        hasEggs: initObj?.hasEggs ?? false,      
        hasLarvae: initObj?.hasLarvae ?? false,
        temp: initObj?.temp ?? 0, 
        humidity: initObj?.humidity || 0, 
        weatherConditions: initObj?.weatherConditions || "",
        antsPresent: initObj?.antsPresent ?? false,
        slugsPresent: initObj?.slugsPresent ?? false,
        hiveBeetlesPresent: initObj?.hiveBeetlesPresent ?? false,
        waxMothsPresent: initObj?.waxMothsPresent ?? false,
        waspsHornetsPresent: initObj?.waspsHornetsPresent ?? false,
        micePresent: initObj?.micePresent ?? false,
        robberBeesPresent: initObj?.robberBeesPresent ?? false,
        numPollenPatties: initObj?.numPollenPatties ?? 0,
        numSugarSyrupFrames: initObj?.numSugarSyrupFrames ?? 0,
        oxalicAcidDosage: initObj?.oxalicAcidDosage ?? 0,
        formicAcidDosage: initObj?.formicAcidDosage ?? 0,
        thymolDosage: initObj?.thymolDosage ?? 0,
        apistanDosage: initObj?.apistanDosage ?? 0,
        hasTwistedLarvae: initObj?.hasTwistedLarvae ?? false,
        hasChalkbrood: initObj?.hasChalkbrood ?? false,
        varroaMiteCount: initObj?.varroaMiteCount ?? 0,
        activitySurroundingHive: initObj?.activitySurroundingHive || "",
        stabilityInHive: initObj?.stabilityInHive || "",
        notes: initObj?.notes ?? ""
      },
      validationSchema,
      onSubmit: (values) => {
        const body = {
          ...values,
          honeyPullId: honeyPullId,
        };
        submitToDB(body);
        setIsEditing(false);
      },
  });

  return (
    <div>
      {isEditing ? (
        <ModForm onSubmit={formik.handleSubmit}>
          <h2>{initObj ? "Inspection Details" : "Add New Inspection"}</h2>
          <br />
        {step ===0 && (
          <InspectionIndex setStep={setStep}/>
        )}
        {step === 1 && (
          <>
            <h3>Basic Information</h3>
            <span>{`Honey Pull ID: ${honeyPullId}`}</span>
            <br />
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
            <hr />
            <h3>Hive Conditions</h3>
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
            <div className="checkbox-area">
              <div className="form-input">
                <label htmlFor="hasEggs">Eggs Present</label>
                <input
                  type="checkbox"
                  id="hasEggs"
                  name="hasEggs"
                  checked={formik.values.hasEggs}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              <div className="form-input">
                <label htmlFor="hasLarvae">Larva Present</label>
                <input
                  type="checkbox"
                  id="hasLarvae"
                  name="hasLarvae"
                  checked={formik.values.hasLarvae}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
            </div>
            <br />
            <br />
          </>
        )}

        {step === 2 && (
          <>
            <h3>Weather</h3>
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
            <br />
            <br />
          </>
        )}
        {step === 3 && (
          <>
            <h3>Pests</h3>
            <div className="checkbox-area">
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
            </div>
            <br />
            <br />
          </>
        )}
        {step === 4 && (
          <>
            <h3>Active Hive Management</h3>
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
            <br />
            <br />
          </>
        )}
        {step === 5 && (
          <>
            <h2>Outcomes</h2>
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
            <div className="checkbox-area">
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
            </div>
            <hr />
            <h2>Additional Notes</h2>
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
            <hr />
            <Button type="submit">{initObj ? "Submit Updates" : "Submit New Inspection"}</Button>
            {(formik.errors.dateChecked || formik.errors.bias) && (
              <div 
                className='submit-error' 
                onClick={()=>setStep(1)}
              >
                <Error>Fix errors on page 1 before submitting</Error>
              </div>
            )}
            {(formik.errors.temp || formik.errors.humidity || formik.errors.weatherConditions) && (
              <div 
                className='submit-error' 
                onClick={()=>setStep(2)}
              >
                <Error>Fix errors on page 2 before submitting</Error>
              </div>
            )}
            <hr />
            <br />
            <br />
          </>
        )}
          <FormFooter
            step={step}
            setStep={setStep}
            prevStep={prevStep} 
            nextStep={nextStep}
          />
        </ModForm>
      ) : (
        <FormSubmit
          label={'Inspection Details'}
          formValues={formik.values}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
};

export default InspectionForm;