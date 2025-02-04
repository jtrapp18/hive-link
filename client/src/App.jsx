import {useState, useEffect, useContext} from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import { getJSON, snakeToCamel } from './helper';
import { UserContext } from './context/userProvider';

function App() {

  const { user, setUser } = useContext(UserContext);
  const [hives, setHives] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [graphDataUser, setGraphDataUser] = useState([]);

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
    getJSON("graph_data").then((data) => {
      const dataTransformed = snakeToCamel(data);
      setGraphData(dataTransformed);
    });
  }, []);

  useEffect(() => {
    if (user) {
      getJSON("graph_data_user").then((data) => {
        const dataTransformed = snakeToCamel(data);
        setGraphDataUser(dataTransformed);
      });
    }
  }, [user]);

  return (
    <>
      <Header/>
      <Outlet
          context={{
            hives,
            setHives,
            graphDataUser,
            graphData
          }}
        />
      <Footer />
    </>
  );
}

export default App;