import React, { useState } from "react";
import { Menu, Dropdown } from "semantic-ui-react";
import { Router, Link, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import AddAlumni from "./pages/addAlumni";

const App = () => {
  const history = createBrowserHistory();
  const [activeMenu, setActiveMenu] = useState("A");
  return (
    <Router history={history}>
      <Menu inverted color="blue" attached>
        <Menu.Item header>Alumni Tracker</Menu.Item>
        <Dropdown item text="Alumni">
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/addAlumni">
              Tambah Alumni
            </Dropdown.Item>
            <Dropdown.Item>Lihat Daftar Alumni</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu>
      <Route exact path="/addAlumni" component={AddAlumni} />
    </Router>
  );
};

export default App;
