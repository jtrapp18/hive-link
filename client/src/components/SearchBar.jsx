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

        &:hover {
            background: var(--yellow);
        }
    }
`

const SearchBar = ({searchQuery, setSearchQuery}) => {
    
    function handleChangeSearch(event) {
        setSearchQuery(event.target.value);
    }

    return (
        <SearchContainer >
            <input 
                value={searchQuery}
                type="text"
                id="search"
                placeholder="Search articles..."
                onChange={handleChangeSearch}
            />
        </SearchContainer>
    );
}

export default SearchBar;