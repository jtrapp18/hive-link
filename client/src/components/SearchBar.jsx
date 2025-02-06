import { useState } from 'react';
import styled from "styled-components";

const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100vw;
    padding: 1vh 0 1vh 0;
    position: relative;
    justify-content: center;
    margin: 0;

    input {
        width: 500px;
        max-width: 80%;
        border-radius: 20px;
        height: 45px;
        font-size: 16px;
        border: 1px solid #ccc;
        padding: 10px 15px;
        color: black;

        &:hover {
            background: var(--yellow);
        }
    }

    span {
        margin: -30px;
        color: black;
        cursor: pointer;
    }
`

const SearchBar = ({pullFromSearch}) => {

    const [searchInput, setSearchInput] = useState('');
    
    const handleChangeSearch = (event) => {
        setSearchInput(event.target.value);
    }

    const handleClearSearch = (event) => {
        setSearchInput('');
        pullFromSearch('');
    }

    const handleKeyPress = (event) => {
        // Check if "Enter" key is pressed
        if (event.key === 'Enter') {
            pullFromSearch(searchInput);
        }
    };

    return (
        <SearchContainer >
            <input 
                value={searchInput}
                type="text"
                id="search"
                placeholder="Search articles..."
                onChange={handleChangeSearch}
                onKeyDown={handleKeyPress}
            />
            <span onClick={handleClearSearch}>✖</span>
        </SearchContainer>
    );
}

export default SearchBar;