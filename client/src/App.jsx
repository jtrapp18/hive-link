import {useState, useEffect, useContext} from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import { getJSON, snakeToCamel } from './helper';
import { UserContext } from './context/userProvider';

function App() {

  const { setUser } = useContext(UserContext);
  const [hives, setHives] = useState([]);

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

  return (
    <>
      <Header/>
      <Outlet
          context={{
            hives,
            setHives
          }}
        />
      <Footer />
    </>
  );
}

export default App;