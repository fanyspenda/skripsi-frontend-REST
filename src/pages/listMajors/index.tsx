import React, { useContext, useState, useEffect } from "react";
import { Segment, Grid, Table, Tab, Label, Button } from "semantic-ui-react";
import { TokenContext } from "contexts/tokenContext";
import { major } from "interfaces/majorInterface";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";

const MajorPage: React.FunctionComponent = () => {
	const location: any = useLocation();
	const previousPage = location.state?.page as number;
	const history = useHistory();
	const { token } = useContext(TokenContext);
	const [currentPage, setCurrentPage] = useState(previousPage || 1);
	const [majors, setMajors] = useState<major[]>([
		{
			_id: "",
			name: "",
		},
	]);
	const [totalData, setTotalData] = useState(0);
	const [totalPage, setTotalPage] = useState(0);
	const getMajorData = (page: number, limit: number) => {
		axios
			.get(`http://localhost:4000/major?limit=${limit}&page=${page}`, {
				headers: {
					authorization: `bearer ${token}`,
				},
			})
			.then((res) => {
				setMajors(res.data.data);
				setTotalData(res.data.totalMajor);
				setTotalPage(res.data.pageCount);
			})
			.catch((err) => {
				return <Label color="red">{err}</Label>;
			});
	};
	useEffect(() => {
		getMajorData(currentPage, 40);
	});

	return (
		<Segment basic>
			<h1>Jurusan Terdaftar</h1>
			<Label color="olive">jumlah jurusan: {totalData}</Label>
			<Label color="olive">jumlah halaman: {totalPage}</Label>
			<Table color="blue" structured columns={3} striped celled>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell
							rowSpan="2"
							textAlign="center"
							width="11"
						>
							<h4>Nama Jurusan</h4>
						</Table.HeaderCell>
						<Table.HeaderCell
							colSpan="2"
							textAlign="center"
							width="4"
						/>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{majors.map((major: major, index: number) => (
						<Table.Row>
							<Table.Cell width="11">{major.name}</Table.Cell>
							<Table.Cell width="2">
								<Button
									color="yellow"
									basic
									fluid
									onClick={() =>
										history.push("/editMajor", major._id)
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
									// 	deleteMajor({
									// 		variables: {
									// 			id: major._id,
									// 		},
									// 	})
									// }
								>
									HAPUS
								</Button>
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table>
			{/* <Segment basic textAlign="center">
				<CustomPagination
					currentPage={currentPage}
					handlePageClick={setCurrentPage}
					data={pages}
				/>
			</Segment> */}
		</Segment>
	);
};

export default MajorPage;
