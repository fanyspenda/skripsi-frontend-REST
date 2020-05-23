import React from "react";
import { Route } from "react-router-dom";
import AddAlumni from "pages/addAlumni";
import DetailAlumni from "pages/detailAlumni";
import EditAlumni from "pages/editAlumni";
import Register from "pages/register";
import Login from "pages/login";
import Dashboard from "pages/dashboard";
import AlumniPage from "pages/listAlumni";
import MajorPage from "pages/listMajors";
import AddMajor from "pages/addMajor";
import EditMajor from "pages/editMajor";
import UserPage from "pages/listUser";
import AddUser from "pages/addUser";
import EditUser from "pages/editUser";

export interface RoutesProps {}

const PageRouter: React.SFC<RoutesProps> = () => {
	return (
		<>
			<Route exact path="/" component={Dashboard} />
			<Route exact path="/majors" component={MajorPage} />
			<Route exact path="/alumni" component={AlumniPage} />
			<Route exact path="/users" component={UserPage} />
			<Route exact path="/register" component={Register} />
			<Route exact path="/login" component={Login} />
			<Route exact path="/addAlumni" component={AddAlumni} />
			<Route exact path="/addMajor" component={AddMajor} />
			<Route exact path="/addUser" component={AddUser} />
			<Route exact path="/editAlumni" component={EditAlumni} />
			<Route exact path="/editMajor" component={EditMajor} />
			<Route exact path="/editUser" component={EditUser} />
			<Route exact path="/detailAlumni" component={DetailAlumni} />
		</>
	);
};

export default PageRouter;
