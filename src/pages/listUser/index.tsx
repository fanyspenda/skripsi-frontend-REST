import React, { useState, useEffect } from "react";
import useAuth from "hooks/useAuth";
import { Segment, Label, Table, Button } from "semantic-ui-react";
import UseLoading from "hooks/useLoading";
import { userType } from "interfaces/userInterface";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import { page } from "interfaces/pageInterface";
import CustomPagination from "components/CustomPagination";

type userNoPass = Omit<userType, "password">;

const UserPage: React.FunctionComponent = () => {
	const { isLevelMatch, level, token } = useAuth();
	const history = useHistory();
	const { isLoading, setLoadingToFalse, setLoadingToTrue } = UseLoading();
	const [users, setUsers] = useState<userNoPass[]>([
		{
			_id: "",
			email: "test@gmail.com",
			name: "test alalalalas",
			level: 1,
		},
	]);
	const [currentPage, setCurrentPage] = useState(1);
	const [pages, setPages] = useState<page[]>([
		{
			number: 0,
			url: "",
		},
	]);
	const [totalUser, setTotalUser] = useState(0);
	const [totalpage, setTotalPage] = useState(0);

	const getInitialUser = () => {
		setLoadingToTrue();
		Axios.get("http://localhost:4000/user?limit=2&page=1", {
			headers: {
				authorization: `bearer ${token}`,
			},
		})
			.then((res) => {
				setUsers(res.data.data);
				setPages(res.data.pages);
				setTotalUser(res.data.countUsers);
				setTotalPage(res.data.pageCount);
			})
			.catch((err) => {
				alert(err);
			})
			.finally(() => setLoadingToFalse());
	};

	const handlePageClick = (pageClicked: number) => {
		setLoadingToTrue();
		Axios.get(`http://localhost:4000/user?limit=2&page=${pageClicked}`, {
			headers: {
				authorization: `bearer ${token}`,
			},
		})
			.then((res) => {
				setCurrentPage(pageClicked);
				setUsers(res.data.data);
				setPages(res.data.pages);
			})
			.finally(() => setLoadingToFalse());
	};

	useEffect(() => {
		getInitialUser();
	}, []);

	return (
		<>
			{isLevelMatch(level, 0)}

			<Segment basic disabled={isLoading}>
				<h1>Daftar Akun Pengguna</h1>
				<Label color="olive">jumlah pengguna: {totalUser}</Label>
				<Label color="olive">jumlah halaman: {totalpage}</Label>
				<Table color="blue" structured columns={3} singleLine celled>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell
								rowSpan="2"
								textAlign="center"
								width={level == 0 ? 4 : 6}
							>
								<h4>Nama</h4>
							</Table.HeaderCell>
							<Table.HeaderCell
								rowSpan="2"
								textAlign="center"
								width={level == 0 ? 4 : 5}
							>
								<h4>Email</h4>
							</Table.HeaderCell>
							<Table.HeaderCell
								rowSpan="2"
								textAlign="center"
								width={level == 0 ? 4 : 5}
							>
								<h4>Role</h4>
							</Table.HeaderCell>
							{level == 0 && (
								<Table.HeaderCell
									colSpan="2"
									textAlign="center"
									width="4"
								/>
							)}
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{users.map((user, index: number) => (
							<Table.Row warning={isLoading}>
								<Table.Cell width={level == 0 ? 4 : 6}>
									{user.name}
								</Table.Cell>
								<Table.Cell width={level == 0 ? 4 : 5}>
									{user.email}
								</Table.Cell>
								<Table.Cell width={level == 0 ? 4 : 5}>
									{user.level == 0 ? "admin" : "user"}
								</Table.Cell>
								{level == 0 && (
									<>
										<Table.Cell width="2">
											<Button
												color="yellow"
												basic
												fluid
												onClick={() =>
													history.push(
														"/editMajor",
														user._id
													)
												}
											>
												EDIT
											</Button>
										</Table.Cell>
										<Table.Cell width="2">
											<Button
												color="red"
												basic
												fluid
												// onClick={() =>
												// 	handleDeleteClick(major._id)
												// }
											>
												HAPUS
											</Button>
										</Table.Cell>
									</>
								)}
							</Table.Row>
						))}
					</Table.Body>
				</Table>
				<Segment basic textAlign="center">
					<CustomPagination
						currentPage={currentPage}
						handlePageClick={handlePageClick}
						data={pages}
					/>
				</Segment>
			</Segment>
		</>
	);
};

export default UserPage;
