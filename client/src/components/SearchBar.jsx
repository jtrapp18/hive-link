import { useState } from 'react';
import styled from "styled-components";

const SearchContainer = styled.div`
    height: 45px;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 1vh 0 1vh 0;
    position: relative;
    justify-content: center;
    margin: 0;

    div {
        width: 500px;
        max-width: 80%;
        height: 45px;
    }

    input {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 100%;
        width: 100%;
        border-radius: 20px;
        font-size: 16px;
        border: 1px solid #ccc;
        padding: 10px 15px;
        color: black;

        &:hover {
            background: var(--yellow);
        }
    }

    span {
        position: absolute;
        right: 5%;
        bottom: 50%;
        transform: translateY(50%);
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
            <div>
                <input 
                    value={searchInput}
                    type="text"
                    id="search"
                    placeholder="Search articles..."
                    onChange={handleChangeSearch}
                    onKeyDown={handleKeyPress}
                />
                <span onClick={handleClearSearch}>✖</span>
            </div>
        </SearchContainer>
    );
}

export default SearchBar;