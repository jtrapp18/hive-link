import { StyledSubmit, Button } from '../MiscStyling'
import { camelToProperCase } from '../helper'

const FormSubmit = ({ label, formValues, setIsEditing }) => {

  return (
    <StyledSubmit>
        <h1>{label}</h1>
        {Object.entries(formValues).map(([key, value]) => (
            <div key={key}>
                <label>{camelToProperCase(key)}:</label>
                <p>{typeof value === "boolean" ? value.toString() : value}</p>
            </div>
        ))}
        <Button 
            type="button" 
            onClick={() => setIsEditing(true)}
        >
            Edit
        </Button>
    </StyledSubmit>
  );
};

export default FormSubmit;