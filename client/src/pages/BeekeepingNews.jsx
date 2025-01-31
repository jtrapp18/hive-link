import { useState, useEffect } from "react";
import styled from "styled-components";
import { getBeekeepingNews } from '../helper';

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 90vw;
    padding: 50px;

    h1, h3 {
        text-align: center;
    }

    article {

    }
`

const BeekeepingNews = () => {

  const [articles, setArticles] = useState([]);

  useEffect(()=> {
    getBeekeepingNews()
    .then(json => {
        setArticles(json.items)
    })

  }, [])

  return (
      <main>
        <StyledContainer>
            <h1>Recent Beekeeping News</h1>
            <h3>. . . . . </h3>
            <br />
            {articles.map(article =>
                <article key={article.link}>
                    <a href={article.link} target='_blank'>{article.title}</a>
                    <p>{article.snippet}</p>
                    <hr />
                </article>
            )}
        </StyledContainer>
      </main>
    );
  };
  
  export default BeekeepingNews;
  