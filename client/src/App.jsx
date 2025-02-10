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
  const [predictions, setPredictions] = useState({});

  console.log('reloading app page...')

  // Auto-login
  useEffect(() => {
    console.log('logging check session...')
    getJSON("check_session")
      .then((user) => {
        const userTransformed = snakeToCamel(user);
        if (JSON.stringify(userTransformed) !== JSON.stringify(user)) {
          setUser(userTransformed);
        }
      });
  }, []);

  // Fetching hives data once
  useEffect(() => {
    if (user) {
      console.log('logging hives...')
      if (!hives.length) {
        getJSON("hives_by_user")
          .then((hives) => {
            const hivesTransformed = snakeToCamel(hives);
            setHives(hivesTransformed);
          });
      }
    }
  }, [user]);

  // Fetching general graph data (available to everyone)
  useEffect(() => {
    console.log('logging graphs...')
    getJSON("graph_data")
      .then((data) => {
        setGraphData(snakeToCamel(data));
      });
  }, []);

  // Fetching user-specific graph data
  useEffect(() => {
    console.log('logging user graphs...')
    if (user) {
      getJSON("graph_data_user")
        .then((data) => {
          const dataTransformed = snakeToCamel(data);
          setGraphDataUser(dataTransformed);
        });
    }
  }, [user]);

  // Fetching predictions, based on user
  useEffect(() => {
    console.log('logging user predictions...')
    if (user) {
      getJSON("predictions")
        .then((data) => {
          const dataTransformed = snakeToCamel(data);
          setPredictions(dataTransformed.predicted);
        });
    }
  }, [user]);

  return (
    <>
      <Header/>
      <main>
        <Outlet
            context={{
              hives,
              setHives,
              graphDataUser,
              graphData,
              predictions
            }}
          />
        </main>
      <Footer />
    </>
  );
}

export default App;