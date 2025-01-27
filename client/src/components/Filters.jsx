
import styled from 'styled-components';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Rating from './Rating';

const FilterContainer = styled.div`
    display: flex;
    margin-bottom: 20px;
    align-items: center;
    
    section {
        display: flex;
        flex-direction: column;
        margin: 20px;
        justify-content: space-between;
    }

    .btn {
        margin: 5px;
        height: fit-content;
        width: fit-content;
    }
`

const ClearFilter = styled.p`
    font-style: italic;
    color: gray;
    size: 10px;
    
    &:hover {
        font-weight: bold;
        cursor: pointer;
        color: red;
    }
`;

const Filters = ({filterInput, setFilterInput}) => {

    function handleChange(event) {
        const name = event.target.name;
        const value = event.target.type==="checkbox" ? event.target.checked : event.target.value;

        setFilterInput(prevFilter=>{
            return {
                ...prevFilter,
                [name]: value,
            }
        });
    }

    function updateRating(rating) {
        setFilterInput(prevFilter=>{
            return {
                ...prevFilter,
                rating: rating,
            }
        });
    }

    const clearFilter = (filterType) => {

        switch (filterType) {
            case "toggle":
                setFilterInput(prevFilter=>{
                    return {
                        ...prevFilter,
                    }
                });
                break;
            case "price":
                setFilterInput(prevFilter=>{
                    return {
                        ...prevFilter,
                        price: 5,
                    }
                });
                break;
            case "rating":
                updateRating(0)
                break;
            default:
                break;
        }
    }

    return (
        <FilterContainer>
            {/* <h2>Apply Filters</h2> */}
            {/* <ToggleButtonGroup type="checkbox"> */}
                <section>
                    <label htmlFor="price-range">Price Range:</label>
                    <input
                        type="range"
                        id="price-range"
                        name="price"
                        min={0}
                        max={5}
                        value={filterInput.price}
                        onChange={handleChange}
                    />
                    <span>{`$${filterInput.price}`}</span>
                </section>
                <section> 
                    <p>Minimum Rating</p>
                    <Rating rating={filterInput.rating} handleStarClick={updateRating}/>   
                    <ClearFilter 
                        onClick={()=>clearFilter("rating")}
                    >
                        clear rating filter
                    </ClearFilter>
                </section>
                <ToggleButton
                    id="toggle-favorite"
                    name="isFavorite"
                    type="checkbox"
                    variant="outline-success"
                    checked={filterInput.isFavorite}
                    onChange={handleChange}
                >
                    Favorited
                </ToggleButton>
                <ToggleButton
                    id="toggle-vegan"
                    name="isVegan"
                    type="checkbox"
                    variant="outline-success"
                    checked={filterInput.isVegan}
                    onChange={handleChange}
                >
                    Vegan
                </ToggleButton>
                <ToggleButton
                    id="toggle-gf"
                    name="isGlutenFree"
                    type="checkbox"
                    variant="outline-success"
                    checked={filterInput.isGlutenFree}
                    onChange={handleChange}
                >
                    Gluten-Free
                </ToggleButton>
                <ToggleButton
                    id="toggle-nuts"
                    name="nutFree"
                    type="checkbox"
                    variant="outline-success"
                    checked={filterInput.nutFree}
                    onChange={handleChange}
                >
                    Nut-Free
                </ToggleButton>
                <ToggleButton
                    id="toggle-frosting"
                    name="hasFrosting"
                    type="checkbox"
                    variant="outline-success"
                    checked={filterInput.hasFrosting}
                    onChange={handleChange}
                >
                    Frosted
                </ToggleButton>
            {/* </ToggleButtonGroup> */}
        </FilterContainer>
    );
}

export default Filters;
