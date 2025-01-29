import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // To access cookie ID from URL
import HiveCard from '../components/HiveCard'; // Import CookieCard
import {useOutletContext} from "react-router-dom";
import styled from 'styled-components';
import HiveForm from '../components/HiveForm'

const HiveDetails = () => {
  const { id } = useParams(); // Get the ID from the URL
  const { hives } = useOutletContext();
  const hive = hives.find((hive) => hive.id === parseInt(id));

  if (!hive) {
    return <main>Loading...</main>; // Error handling if cookie is null
  }
  return (
    <main>
      <h1>Hive Details</h1>
      <HiveCard
        {...hive}
      />
      <HiveForm
        hive={hive}
      />
    </main>
  );
};

export default HiveDetails;
