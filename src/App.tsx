import React from "react";
import { Menu, Dropdown, Segment } from "semantic-ui-react";
import { Router, Link, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import AddAlumni from "./pages/addAlumni";
import ListAlumni from "./pages/listAlumni";
import DetailAlumni from "./pages/detailAlumni";
import EditAlumni from "./pages/editAlumni";
import TokenContextProvider from "contexts/tokenContext";
import Register from "pages/register";
import Login from "pages/login";

const App: React.FunctionComponent<{}> = () => {
	const history = createBrowserHistory();
	return (
		<TokenContextProvider>
			<Router history={history}>
				<Menu inverted color="blue" attached>
					<Menu.Item header>Alumni Tracker</Menu.Item>
					<Dropdown item text="Alumni">
						<Dropdown.Menu>
							<Dropdown.Item as={Link} to="/addAlumni">
								Tambah Alumni
							</Dropdown.Item>
							<Dropdown.Item as={Link} to="/listAlumni">
								Lihat Daftar Alumni
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</Menu>
				<Segment basic>
					<Route exact path="/addAlumni" component={AddAlumni} />
					<Route exact path="/listAlumni" component={ListAlumni} />
					<Route
						exact
						path="/detailAlumni"
						component={DetailAlumni}
					/>
					<Route exact path="/editAlumni" component={EditAlumni} />
					<Route exact path="/register" component={Register} />
					<Route exact path="/login" component={Login} />
				</Segment>
			</Router>
		</TokenContextProvider>
	);
};

export default App;
