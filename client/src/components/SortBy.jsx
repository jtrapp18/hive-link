import styled from "styled-components";

const SortContainer = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;
    height: 100%;
    background-color: var(--blue);
    padding: 0;
    width: 300px;
    min-width: 100px;
    position: relative;

    select {
        height: 45px;
        width: 80%;
        font-size: 16px;
        border: 1px solid #ccc;
        padding: 10px 15px;
        
        &:hover {
            background: var(--yellow);
        }
    }
`

const SortBy = ({sortInput, setSortInput}) => {
    
    function handleChangeSort(event) {
        setSortInput(event.target.value);
    }

    return (
        <SortContainer>
            <select
                value={sortInput}
                id="sort"
                onChange={handleChangeSort}
            >
                <option value="">Sort By</option>
                <option value="name">Name</option>
                <option value="price">Price</option>
            </select>
        </SortContainer>
    );
}

export default SortBy;
