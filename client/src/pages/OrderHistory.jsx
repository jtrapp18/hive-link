import {useState, useContext} from 'react';
import Login from './Login'
import styled from 'styled-components';
import OrderCard from '../components/OrderCard';
import {UserContext} from '../context/userProvider'
import ReviewForm from '../components/ReviewForm';
import {useOutletContext} from "react-router-dom";
import { NavLink } from "react-router-dom";

const StyledMain = styled.main`
  min-height: var(--size-body);
  padding: 20px;
  90vh;
  display: flex;
  flex-direction: column;

  a:hover {
    text-decoration: underline;
    color: blue;
  }
`

const CardContainer = styled.div`
  padding: 20px;
  margin: 10px;
  display: grid;
  gap: 0;
`

const OrderHistory = () => {
  const { user, setUser} = useContext(UserContext);
  const [activeReview, setActiveReview] = useState(null);
  const { orders } = useOutletContext();

  if (!user) return <Login />

  if (!orders) {
    return <h1>Loading Cart...</h1>
  }

  const showOrders = orders.filter(order=>order.purchaseComplete)

  if (showOrders.length===0) {
    return (
      <StyledMain>
        <div>
          <h1>No Past Orders</h1>
          <NavLink
            to="/menu"
            className="nav-link"
          >
            <h3>Check out our cookie menu!</h3>        
          </NavLink>
        </div>
      </StyledMain>
    );
  }

  return (
      <StyledMain>
          {/* <SearchBar
            searchInput={searchInput}
            setSearchInput={setSearchInput}
          />
          <Filters
            filterInput={filterInput}
            setFilterInput={setFilterInput}
          /> */}
        <h1>Order History</h1>
        <CardContainer>
          {showOrders.map(order=>
            <OrderCard
                key={order.id}
                order={order} 
                setActiveReview={setActiveReview}
            />
          )}
        </CardContainer>
        {activeReview && 
          <ReviewForm 
            cookie={activeReview} 
            setActiveReview={setActiveReview}
          />
        }
      </StyledMain>
    );
  };
  
  export default OrderHistory;