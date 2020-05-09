import React, { useContext } from "react";
import { Menu, Dropdown, Segment, Icon } from "semantic-ui-react";
import { Router, Link, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import AddAlumni from "./pages/addAlumni";
import ListAlumni from "./pages/listAlumni";
import DetailAlumni from "./pages/detailAlumni";
import EditAlumni from "./pages/editAlumni";
import TokenContextProvider, { TokenContext } from "contexts/tokenContext";
import Register from "pages/register";
import Login from "pages/login";
import PageRouter from "PageRouter";
import CustomMenu from "components/CustomMenu";

const App: React.FunctionComponent<{}> = () => {
	const { token } = useContext(TokenContext);
	const history = createBrowserHistory();
	return (
		<TokenContextProvider>
			<Router history={history}>
				<Menu inverted color="blue" attached stackable>
					<Menu.Item header as={Link} to="/" exact>
						<Icon name="graduation" />
						Alumni Tracker
					</Menu.Item>
					<TokenContext.Consumer>
						{(values) => <CustomMenu token={values.token} />}
					</TokenContext.Consumer>
				</Menu>
				<Segment basic>
					<PageRouter />
				</Segment>
			</Router>
		</TokenContextProvider>
	);
};

export default App;
