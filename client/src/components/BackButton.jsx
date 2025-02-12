import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

const StyledContainer = styled.div`
    width: 100%;
    transform: translateX(calc(500px - 50vw));

    button {
        background: rgba(0, 0, 0, .7);
        color: #00A3FF;
        text-decoration: underline;
        border: none;

        &:hover {
            color: var(--bright-blue);
        }
    }

    @media (max-width: 1000px) {
        transform: translateX(0);
    }
`

const BackButton = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    // Extract the first segment of the URL (e.g., 'forums' from '/forums/123/thread/456')
    const basePath = location.pathname.split("/")[1]; 

    return (
        <StyledContainer>
            <button onClick={() => navigate(`/${basePath}`)}>
                Back to {basePath.charAt(0).toUpperCase() + basePath.slice(1)}
            </button>
        </StyledContainer>
    );
};

export default BackButton;