import { useNavigate} from "react-router-dom";
import styled from "styled-components";
import OrderSummary from "./OrderSummary";
import OrderDetail from "./OrderDetail";

const StyledOrderCard = styled.article`
    height: 300px;
    width: 100%;
    display: flex;
    // max-width: 90vw;
    padding: 10px;
    margin-bottom: 10px;
    position: relative;
    box-shadow: var(--shadow);
    // border-radius: 10px;
    background: var(--cookie);
`

const OrderCard = ({order, setActiveReview}) => {

    return (
        <StyledOrderCard>
            <OrderSummary
                {...order}
            />
            <OrderDetail
                {...order}
                setActiveReview={setActiveReview}
            />
        </StyledOrderCard>
    );
}

export default OrderCard;
