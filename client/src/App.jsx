import {useState, useEffect, useContext} from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import { getJSON, snakeToCamel } from './helper';
import { UserContext } from './context/userProvider';

function App() {

  const { setUser } = useContext(UserContext);
  const [hives, setHives] = useState([]);
  const [aggData, setAggData] = useState([]);
  const [aggDataUser, setAggDataUser] = useState([]);

  useEffect(() => {
    // auto-login
    getJSON("check_session")
    .then((user) => {
      const userTransformed = snakeToCamel(user);
      setUser(userTransformed);
    });
  }, []);

  useEffect(() => {
    getJSON("hives").then((hives) => {
      const hivesTransformed = snakeToCamel(hives);
      setHives(hivesTransformed);
    });
  }, []);

  useEffect(() => {
    getJSON("aggregate_data").then((data) => {
      const dataTransformed = snakeToCamel(data);
      setAggData(dataTransformed);
    });

    getJSON("aggregate_data_user").then((data) => {
      const dataTransformed = snakeToCamel(data);
      setAggDataUser(dataTransformed);
    });
  }, []);

  return (
    <>
      <Header/>
      <Outlet
          context={{
            hives,
            setHives,
            aggDataUser,
            aggData
          }}
        />
      <Footer />
    </>
  );
}

export default App;