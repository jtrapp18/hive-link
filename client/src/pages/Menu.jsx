import { useContext, useState} from 'react';
import styled from "styled-components";
import Filters from "../components/Filters";
import {WindowWidthContext} from "../context/windowSize";
import {useOutletContext} from "react-router-dom";
import CookieCard from '../components/CookieCard';
import SearchBar from '../components/SearchBar';
import SortBy from '../components/SortBy';
import {UserContext} from '../context/userProvider'

const StyledMain = styled.main`
  min-height: var(--size-body);
  padding: 2vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .filter-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    // overflow: scroll;
  }
}
`

const CardContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 10px;
  max-width: 100vw;
  justify-items: center;
`

const Menu = () => {
  const { user } = useContext(UserContext);
  const { isMobile } = useContext(WindowWidthContext);
  const { cookies } = useOutletContext();

  const [searchInput, setSearchInput] = useState("");
  const [sortInput, setSortInput] = useState("");
  const [filterInput, setFilterInput] = useState({
      price: 5,
      rating: 0,
      isFavorite: "",
      isVegan: "",
      isGlutenFree: "",
      nutFree: "",
      hasFrosting: ""
  });

  const showCookies = cookies.filter(cookie=>{

      let ratingFilter

      if (filterInput.rating) {
        let avgReview

        if (cookie.reviews.length > 0) {
          const totalRating = cookie.reviews.reduce((sum, review) => sum + review.rating, 0);
          avgReview = totalRating / cookie.reviews.length;
        } else {
          avgReview = 0;
        }
        ratingFilter = filterInput.rating <= avgReview
      } else {
        ratingFilter = true
      }

      let favoriteFilter

      if (!user && filterInput.isFavorite) {
        favoriteFilter = false
      } else if (filterInput.isFavorite) {
        const userFavorite = cookie.favorites.filter(favorite => favorite.userId === user.id);
        favoriteFilter = (userFavorite.length > 0)
      } else {
        favoriteFilter = true
      }

      const searchFilter = searchInput==="" ? true : cookie.name.toLowerCase().includes(searchInput.toLowerCase());
      const priceFilter = filterInput.price ? filterInput.price >= cookie.price : true;
      const veganFilter = !filterInput.isVegan ? true : cookie.isVegan;
      const glutenFreeFilter = !filterInput.isGlutenFree ? true : cookie.isGlutenFree;
      const nutsFilter = !filterInput.nutFree ? true : !cookie.hasNuts;
      const frostingFilter = !filterInput.hasFrosting ? true : cookie.frosting != null;

      return searchFilter && priceFilter && ratingFilter && favoriteFilter && veganFilter && glutenFreeFilter && nutsFilter && frostingFilter;   
  })

  const sortedCookies = sortInput === "" 
  ? showCookies 
  : [...showCookies].sort((a, b) => {
      if (sortInput === "price") {
        return a.price - b.price; // Sort by price (ascending)
      } else if (sortInput === "name") {
        return a.name.localeCompare(b.name); // Sort by name (alphabetical)
      }
      return 0; // No sorting if sortInput is neither 'price' nor 'name'
    });

  return (
      <StyledMain>
          <SearchBar
            searchInput={searchInput}
            setSearchInput={setSearchInput}
          />
          <section className="filter-container">
            <Filters
              filterInput={filterInput}
              setFilterInput={setFilterInput}
            />
            <SortBy
              sortInput={sortInput}
              setSortInput={setSortInput}
            />
          </section>
        <CardContainer>
          {sortedCookies.map(cookie=>
            <CookieCard
                key={cookie.id}
                {...cookie} 
            />
          )}
        </CardContainer>
      </StyledMain>
    );
  };
  
  export default Menu;
  