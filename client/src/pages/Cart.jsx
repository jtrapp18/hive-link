import {Fragment, useState, useEffect, useContext} from 'react';
import Login from './Login'
import styled from 'styled-components';
import {UserContext} from '../context/userProvider'
import {useOutletContext} from "react-router-dom";
import CartItem from '../components/CartItem';
import Button from 'react-bootstrap/Button';
import { NavLink } from "react-router-dom";

const StyledMain = styled.main`
  min-height: var(--size-body);
  padding: 20px;
  display: flex;
  justify-content: center;

  .cookie-card {
    zoom: .7;
  }

  a:hover {
    text-decoration: underline;
    color: blue;
  }
`
const StyledOrderSummary = styled.article`
    padding: 20px;
    margin: 10px;
    height: 100%;
    width: fit-content;
    min-width: 30%;
    margin-bottom: 10px;
    position: relative;
    box-shadow: var(--shadow);

    h3 {
      font-size: clamp(1rem, 1.8vw, 1.1rem)
    }
`

const CardContainer = styled.div`
  padding: 20px;
  margin: 10px;
  display: grid;
  box-shadow: var(--shadow);
  gap: 0;
  justify-content: center;

  article.cookie-card {
    width: 70%;
  }

  h2 {
    padding: 0;
    margin: 0;
    line-height: 1;
  }
`

const Cart = () => {
  const { user } = useContext(UserContext);
  const { cartOrder, totalPrice, totalCookies } = useOutletContext();

  if (!user) return <Login />

  if (!cartOrder) {
    return <h1>Loading Cart...</h1>
  }

  if (cartOrder.cartItems.length===0) {
    return (
      <StyledMain>
        <div>
          <h1>Your Cart is Empty</h1>
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
        <CardContainer>
          <h2>Shopping Cart</h2>         
          {cartOrder.cartItems.map(cartItem=>
            <Fragment key={cartItem.id}>
              <CartItem
                  {...cartItem}
                  isFinal={false}
              />
              <hr />
            </Fragment>
          )}
        </CardContainer>
        <StyledOrderSummary>
          <h3>Subtotal ({totalCookies}) Items: <strong>${totalPrice}</strong></h3>
          <p>Order ID: {cartOrder.id}</p>
          <hr />
          <NavLink
            to="/checkout"
            className="nav-link"
          >
            <Button variant="warning">Proceed to Checkout</Button>            
          </NavLink>
        </StyledOrderSummary>
      </StyledMain>
    );
  };
  
  export default Cart;
  