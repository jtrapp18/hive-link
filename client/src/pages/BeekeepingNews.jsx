import { useState, useEffect } from "react";
import styled from "styled-components";
import { getBeekeepingNews } from '../helper';
import SearchBar from "../components/SearchBar";
import {StyledContainer} from '../MiscStyling'

const BeekeepingNews = () => {

  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(()=> {
    getBeekeepingNews()
    .then(json => {
        setArticles(json.items)
    })

  }, [])

  return (
      <StyledContainer>
          <h1>Recent Beekeeping News</h1>
          <h3>. . . . . </h3>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <br />
          {articles.map(article =>
              <article key={article.link}>
                  <a href={article.link} target='_blank'>{article.title}</a>
                  <p>{article.snippet}</p>
                  <hr />
              </article>
          )}
      </StyledContainer>
    );
  };
  
  export default BeekeepingNews;
  