import { StyledSubmit, Button } from '../MiscStyling'
import { camelToProperCase } from '../helper'

const FormSubmit = ({ label, formValues, setIsEditing }) => {

  const formatPhoneNumber = (phoneNumber) => {
    // Format phone number as (XXX) XXX-XXXX
    return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  };

  return (
    <StyledSubmit>
        <h1>{label}</h1>
        {Object.entries(formValues).map(([key, value]) => (
            <div key={key}>
                <label>{camelToProperCase(key)}:</label>
                <p>
                  {key === 'phoneNumber' 
                    ? formatPhoneNumber(value) 
                    : typeof value === "boolean" 
                    ? value.toString() 
                    : value}
                </p>
            </div>
        ))}
        <br />
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