import { useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Tags from "./Tags";
import { deleteJSONFromDb, postJSONToDb } from "../helper";
import Rating from './Rating';
import { useOutletContext } from "react-router-dom";
import { UserContext } from '../context/userProvider';
import Button from 'react-bootstrap/Button';
import { FaCartPlus, FaRegHeart } from 'react-icons/fa';
import NotLoggedInToast from './NotLoggedInToast';

const StyledCookieCard = styled.article`
    width: 100%;
    max-width: clamp(300px, 100%, 600px);
    padding: 10px;
    margin-bottom: 10px;
    box-shadow: var(--shadow);
    border-radius: 10px;  
    background: var(--light-green);

    .btn-container {
        height: 15%;
        padding-top: 2%;
        border-top: 3px double var(--dark-chocolate);
        justify-content: end;
        display: flex;
    }

    .main-cookie {
        position: relative;
        display: flex;
        justify-content: space-between;
        height: 80%;
        cursor: pointer;

        img {
            max-width: 50%;
            aspect-ratio: 1 / 1;
            object-fit: contain;
        }
        
        section {
            display: flex;
            flex-direction: column;
            padding: 2%;
            justify-content: center;

            h3 {
                font-size: clamp(1.2rem, 1.8vw, 1.8rem);
            }

            .price {
                font-size: clamp(2rem, 3.5vw, 4rem);
            }

            .cookie-info {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            }
    }
`

const CookieCard = ({ id, name, image, price, isVegan, isGlutenFree, hasNuts, frosting, reviews, favorites, cartItems }) => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const { cartOrder, addCookieToCart, removeCookieFromCart, addCookieToFavorites, removeCookieFromFavorites } = useOutletContext();
    const [avgReview, setAvgReview] = useState(0);
    const [favoriteId, setFavoriteId] = useState("");
    const [cartId, setCartId] = useState("");
    const [showToast, setShowToast] = useState(false);

    // Update favoriteId when favorites or user changes
    useEffect(() => {
        if (user) {
            const userFavorite = favorites.filter((favorite) => favorite.userId === user.id);
            if (userFavorite.length > 0) {
                setFavoriteId(userFavorite[0].id);
            } else {
                setFavoriteId("");
            }
        }
    }, [favorites, user]);

    useEffect(() => {
        if (cartItems) {
            const userCart = cartItems.filter((cartItem) => cartItem.orderId === cartOrder.id);
            if (userCart.length > 0) {
                setCartId(userCart[0].id);
            } else {
                setCartId("");
            }
        }
    }, [cartItems, user]);

    // Update average review when reviews change
    useEffect(() => {
        if (reviews) {
            if (reviews.length > 0) {
                const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
                const average = totalRating / reviews.length;
                setAvgReview(average);
            } else {
                setAvgReview(0);
            }
        }
    }, [reviews]);

    function handleClick() {
        navigate(`/menu/${id}`);
    }

    function addToCart() {
        if (!user) {
            setShowToast(true);
        }
        else {
            const body = {
                orderId: cartOrder.id,
                cookieId: id
            }
    
            postJSONToDb("cart_items", body)
                .then(cartItem => {
                    console.log(`Added to cart: ${cartItem}`);
                    addCookieToCart(id, cartItem);
                    setCartId(cartItem.id);
                })
        }
    }

    function removeFromCart() {
        deleteJSONFromDb("cart_items", cartId)
        removeCookieFromCart(cartId);
        setCartId("");
    }

    function addToFavorites() {
        if (!user) {
            setShowToast(true);
        }
        else {
            const body = {
                userId: user.id,
                cookieId: id
            }

            postJSONToDb("favorites", body)
                .then(favorite => {
                    console.log(`Added to favorites: ${favorite}`);
                    setFavoriteId(favorite.id);                    
                    addCookieToFavorites(id, {...body, id: favorite.id});
                })
        }
    }

    function removeFromFavorites() {
        deleteJSONFromDb("favorites", favoriteId);
        removeCookieFromFavorites(id, favoriteId);
        setFavoriteId("");
    }

    const tags = [];
    if (isVegan) {
        tags.push("Vegan");
    }

    if (isGlutenFree) {
        tags.push("GF");
    }

    if (hasNuts) {
        tags.push("Contains Nuts");
    }

    return (
        <StyledCookieCard className="cookie-card">
            <div 
                className="main-cookie"
                onClick={handleClick}
            >
                <img
                    src={`images/menu_items/${image}`}
                    alt={name}
                />
                <section>
                    <div className="cookie-info">
                        <h2>{name}</h2>
                        <h3>Frosting: {frosting ? frosting : 'None'}</h3>
                        <span className="price">${price}</span>
                        <Tags tags={tags} />
                    </div>
                    {cartItems &&
                        <div className="cookie-info">
                            <Rating rating={avgReview} />
                            <p>{`Based on ${reviews.length} Reviews`}</p>
                            <p>{`Favorited by ${favorites.length} Users`}</p>
                        </div>
                    }
                </section>    
            </div>
            {cartItems &&
                <div className="btn-container">
                    {favoriteId ?
                        <Button variant="outline-danger" onClick={removeFromFavorites}><FaRegHeart /> Remove from Favorites</Button> :
                        <Button variant="outline-primary" onClick={addToFavorites}><FaRegHeart /> Add to Favorites</Button>
                    }
                    {cartId ?
                        <Button variant="outline-danger" onClick={removeFromCart}>Remove from Cart</Button> :
                        <Button variant="success" onClick={addToCart}><FaCartPlus /> Add to Cart</Button>
                    }
                    {showToast &&
                        <NotLoggedInToast onClose={() => setShowToast(false)}/>            
                    }
                </div>
            }    
        </StyledCookieCard>
    );
}

export default CookieCard;