import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getJSONById, snakeToCamel } from '../helper';
import Loading from './Loading';
import { StyledContainer } from '../MiscStyling';

const ForumDetails = () => {
    const { id } = useParams();
    const [forum, setForum] = useState('');

    useEffect(()=> {
        getJSONById("forums", id)
        .then(forum => {
            const forumTransformed = snakeToCamel(forum);
            setForum(forumTransformed);
        })
    }, [])

    if (!forum) return <Loading />

    return (
        <StyledContainer>
            {forum.user.username}
            {forum.title}
        </StyledContainer>
    );
}

export default ForumDetails;
