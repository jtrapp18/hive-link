import styled from "styled-components";

const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100vw;
    background-color: var(--green);
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

        &:hover {
            background: var(--yellow);
        }
    }
`

const SearchBar = ({searchInput, setSearchInput}) => {
    
    function handleChangeSearch(event) {
        setSearchInput(event.target.value);
    }

    return (
        <SearchContainer >
            <input 
                value={searchInput}
                type="text"
                id="search"
                placeholder="Type cookie to search..."
                onChange={handleChangeSearch}
            />
        </SearchContainer>
    );
}

export default SearchBar;
