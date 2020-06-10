import React, { useContext, useState, useEffect } from "react";
import { Segment, Grid, Table, Tab, Label, Button } from "semantic-ui-react";
import { TokenContext } from "contexts/tokenContext";
import { major } from "interfaces/majorInterface";
import { page } from "interfaces/pageInterface";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import CustomPagination from "components/CustomPagination";
import useAuth from "hooks/useAuth";
import UseLoading from "hooks/useLoading";
import { restUrl } from "serverUrl";

const MajorPage: React.FunctionComponent = () => {
	const location: any = useLocation();
	const previousPage = location.state?.page as number;
	const history = useHistory();
	const { token, level, isTokenValid } = useAuth();
	const { isLoading, setLoadingToTrue, setLoadingToFalse } = UseLoading();
	const [currentPage, setCurrentPage] = useState(previousPage || 1);
	const [majors, setMajors] = useState<major[]>([
		{
			_id: "",
			name: "",
		},
	]);
	const [totalData, setTotalData] = useState(0);
	const [totalPage, setTotalPage] = useState(0);
	const [pages, setPages] = useState<page[]>([{ number: 1, url: "" }]);
	const getMajorData = (page: number, limit: number) => {
		setLoadingToTrue();
		axios
			.get(`${restUrl}major?limit=${limit}&page=${page}`, {
				headers: {
					authorization: `bearer ${token}`,
				},
			})
			.then((res) => {
				setMajors(res.data.data);
				setTotalData(res.data.totalMajor);
				setTotalPage(res.data.pageCount);
				setPages(res.data.pages);
			})
			.catch((err) => {
				return <Label color="red">{err}</Label>;
			})
			.finally(() => setLoadingToFalse());
	};
	const deleteMajor = (id: string) => {
		setLoadingToTrue();
		axios
			.delete(`${restUrl}major/${id}`, {
				headers: {
					authorization: `bearer ${token}`,
				},
			})
			.then(() => {
				history.replace("/majors", currentPage);
				window.location.reload(true);
			})
			.catch((err) => alert(err))
			.finally(() => setLoadingToFalse());
	};
	const handleDeleteClick = (id: string) => {
		deleteMajor(id);
	};

	const handlePageClick = (pageClicked: number) => {
		setCurrentPage(pageClicked);
		getMajorData(pageClicked, 20);
	};

	useEffect(() => {
		isTokenValid();
		getMajorData(currentPage, 20);
	}, []);

	return (
		<Segment basic loading={isLoading}>
			<h1>Jurusan Terdaftar</h1>
			<Label color="olive">jumlah jurusan: {totalData}</Label>
			<Label color="olive">jumlah halaman: {totalPage}</Label>
			<Table color="blue" structured columns={3} striped celled>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell
							rowSpan="2"
							textAlign="center"
							width={level == 0 ? 11 : 16}
						>
							<h4>Nama Jurusan</h4>
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
					{majors.map((major: major, index: number) => (
						<Table.Row warning={isLoading}>
							<Table.Cell width={level == 0 ? 11 : 16}>
								{major.name}
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
													major._id
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
											onClick={() =>
												handleDeleteClick(major._id)
											}
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
	);
};

export default MajorPage;
