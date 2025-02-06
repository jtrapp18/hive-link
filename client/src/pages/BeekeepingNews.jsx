import { useState, useEffect } from "react";
import styled from "styled-components";
import { getBeekeepingNews } from '../helper';
import SearchBar from "../components/SearchBar";
import {StyledContainer} from '../MiscStyling'

const ArticleContainer = styled.div`
    width: 1000px;
    max-width: 90vw;

    display: flex;
    flex-direction: column;
    padding: 0 5% 0 5%;
`

const BeekeepingNews = () => {

  const [articles, setArticles] = useState([]);

  const pullFromSearch = (searchQuery) => {
    getBeekeepingNews(searchQuery)
    .then(json => {
        setArticles(json.items)
    })
  }

  useEffect(()=> {
    pullFromSearch('');
  }, []);

  return (
      <StyledContainer>
          <h1>Recent Beekeeping News</h1>
          <h3>. . . . . </h3>
          <SearchBar
            pullFromSearch={pullFromSearch}
          />
          <br />
          <ArticleContainer>
            {articles.map(article =>
                <article key={article.link}>
                    <a href={article.link} target='_blank'>{article.title}</a>
                    <p>{article.snippet}</p>
                    <hr />
                </article>
            )}
          </ArticleContainer>
      </StyledContainer>
    );
  };
  
  export default BeekeepingNews;
  