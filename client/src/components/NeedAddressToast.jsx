import Toast from 'react-bootstrap/Toast';
import styled from 'styled-components';

const StyledToast = styled(Toast)`
  display: flex;
  flex-direction: column;
  z-index: 1000;
`

function NeedAddressToast({onClose}) {
  return (
      <StyledToast onClose={onClose}>
        <Toast.Header>
          <strong className="me-auto">No Saved Address</strong>
        </Toast.Header>
        <Toast.Body>Please fill in delivery address</Toast.Body>
      </StyledToast>
  );
}

export default NeedAddressToast;