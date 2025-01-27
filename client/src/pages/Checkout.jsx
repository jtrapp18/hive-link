import {Fragment, useState, useEffect, useContext} from 'react';
import styled from 'styled-components';
import {UserContext} from '../context/userProvider'
import {useOutletContext} from "react-router-dom";
import CartItem from '../components/CartItem';
import Button from 'react-bootstrap/Button';
import { patchJSONToDb, postJSONToDb } from '../helper';
import NeedAddressToast from '../components/NeedAddressToast'

const StyledMain = styled.main`
  min-height: var(--size-body);
  padding: 20px;
  display: flex;

  h3 {
    font-size: clamp(1rem, 1.8vw, 1.1rem)
  }
`
const StyledOrderSummary = styled.article`
    padding: 20px;
    margin: 10px;
    height: 100%;
    width: 40%;
    margin-bottom: 10px;
    position: relative;
    box-shadow: var(--shadow);
    display: flex;
    flex-direction: column;
    align-items: center;

    section {
      display: flex;
      width: 50%;
      justify-content: space-between;
    }

    h3 {
      font-size: clamp(1rem, 1.8vw, 1.1rem)
    }

    p {
      line-height: 1;
    }
`

const StyledDiv = styled.div`
  padding: 20px;
  margin: 10px;
  display: grid;
  width: 60%;
  box-shadow: var(--shadow);

  .cookie-card {
    zoom: .7;
  }

  .delivery-edit {
    display: flex;
    flex-direction: column;
  }
`

const OrderConfirmation = styled.article`

    width: 100%;
    display: flex;
    justify-content: center;
    height: fit-content;

    .confirm-container {
      padding: 20px;
      margin: 10px;
      width: fit-content;
      min-width: 50%;
      max-width: 90vw;
      margin-bottom: 10px;
      position: relative;
      background: var(--green);
      border-radius: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;

      div {
        display: flex;
        flex-direction: column;
        width: 100%;
      }

      h3 {
        font-size: clamp(1rem, 1.8vw, 1.1rem)
      }

      p {
        line-height: 1;
      }

      h2, h3, p {
        color: white;
      }
    }
`

const Checkout = () => {
  const { user } = useContext(UserContext);
  const { cartOrder, placeCookieOrder, createNewCart } = useOutletContext();
  const [orderComplete, setOrderComplete] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [deliveryAddress, setDeliveryAddress] = useState(user.address);
  const [isEditing, setIsEditing] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  // Update average review when reviews change
  useEffect(() => {
    if (cartOrder && cartOrder.cartItems.length > 0) {
      const totalPrice = cartOrder.cartItems.reduce((sum, item) => sum + (item.cookie.price * item.numCookies), 0);
      setTotalPrice(totalPrice.toFixed(2));
    }
  }, [cartOrder]);

  const handleSubmit = (e) => {
    if (deliveryAddress) {
      const orderObj = {
        purchaseComplete: 1,
        orderTotal: parseFloat(totalPrice),
        orderDate: 'today'
      }
  
      patchJSONToDb("orders", cartOrder.id, orderObj);
      setOrderComplete(true);
      placeCookieOrder(cartOrder.id, orderObj);
  
      postJSONToDb("orders", {userId: user.id, purchaseComplete: 0, orderTotal: 0})
      .then(newOrder => createNewCart(newOrder.id));
    }
    else {
      setShowErrorToast(true);
    }
  }

  return (
      <StyledMain>
        {!orderComplete ? (
          <>
            <StyledDiv>
              <div>
                <h3>Delivering to {`${user.first_name} ${user.last_name}`}</h3>  
                {!isEditing ? (
                  <>
                    <p>{deliveryAddress}</p>
                    <Button onClick={()=>setIsEditing(true)}>Change Delivery Address</Button>
                  </>
                ) : (
                  <div className='delivery-edit'>
                    <input 
                      type="text" 
                      name="address" 
                      value={deliveryAddress} 
                      onChange={(e)=>setDeliveryAddress(e.target.value)} 
                    />
                    <Button onClick={()=>setIsEditing(false)}>Confirm Changes</Button>
                  </div>
                )}
              </div>
              <hr />
              <h3>Selected Cookies</h3>         
              {cartOrder.cartItems.map(cartItem=>
                <Fragment key={cartItem.id}>
                <CartItem
                    {...cartItem}
                    isFinal={true}
                />
                <hr />
              </Fragment>
              )}
            </StyledDiv>
            <StyledOrderSummary>
              <section>
                <p>Order ID:</p>
                <p>{cartOrder.id}</p>
              </section>
              <section>
                <p>Items ({2})</p>
                <p>${totalPrice}</p>
              </section>
              <section>
                <p>Shipping:</p>
                <p>$0.00</p>
              </section>
              <section>
                <p>Taxes:</p>
                <p>$0.00</p>
              </section>
              <section>
                <h3>Order Total</h3>
                <h3>${totalPrice}</h3>
              </section>
              <hr />
              <section>
                <Button variant="warning" onClick={handleSubmit}>Place Order</Button>
              </section>
              {showErrorToast && <section><NeedAddressToast onClose={()=>setShowErrorToast(false)}/></section>}
            </StyledOrderSummary>
          </>
        ) : (
          <OrderConfirmation>
            <div className="confirm-container">
              <h2>Thank you for your Order!</h2>
              <hr />
              <div>
                <h3>Confirmation email sent to: {`${user.email}`}</h3>  
                <hr />
                <h3>Delivering to {`${user.first_name} ${user.last_name}`}</h3>  
                <p>{deliveryAddress}</p>
                <hr />
                <h3><strong>Order Total: </strong>${totalPrice}</h3>
                <hr />
              </div>
            </div>
          </OrderConfirmation>
        )}
      </StyledMain>
    );
  };
  
  export default Checkout;
  