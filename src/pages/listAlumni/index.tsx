import React, { useState, useEffect } from "react";
import {
	Card,
	Grid,
	Button,
	Label,
	Segment,
	Divider,
	Form,
	Input,
	Icon,
} from "semantic-ui-react";
import axios from "axios";
import AlumniCard from "./alumniCard";
import { page } from "interfaces/pageInterface";
import CustomPagination from "components/CustomPagination";
import useAuth from "hooks/useAuth";
import UseLoading from "hooks/useLoading";
import { useFormik } from "formik";

interface alumniListInterface {
	_id: string;
	name: string;
	work_at: string;
	work_position: string;
	email: string;
	data_source: string;
}

const ListAlumni: React.FunctionComponent<{}> = () => {
	const { token } = useAuth();
	const { isLoading, setLoadingToFalse, setLoadingToTrue } = UseLoading();
	const [currentPageL, setCurrentPageL] = useState(1);
	const [pagesL, setPagesL] = useState<page[]>([
		{
			number: 1,
			url: "",
		},
	]);
	const [search, setSearch] = useState("");
	const [alumniL, setAlumniL] = useState<alumniListInterface[]>([
		{
			_id: "",
			name: "",
			work_at: "",
			work_position: "",
			email: "",
			data_source: "",
		},
	]);
	const [totalPageL, setTotalPageL] = useState(0);
	const [totalDataL, setTotalDataL] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [pages, setPages] = useState<page[]>([
		{
			number: 1,
			url: "",
		},
	]);
	const [alumni, setAlumni] = useState<alumniListInterface[]>([
		{
			_id: "",
			name: "",
			work_at: "",
			work_position: "",
			email: "",
			data_source: "",
		},
	]);
	const [totalPage, setTotalPage] = useState(0);
	const [totalData, setTotalData] = useState(0);

	const getAlumni = (page: number, searchName?: string) => {
		setLoadingToTrue();
		axios
			.get(`http://localhost:4000/alumni?page=${page}&limit=40`, {
				headers: {
					authorization: `bearer ${token}`,
				},
				params: {
					name: searchName || "",
				},
			})
			.then((res1) => {
				setAlumni(res1.data.data);
				setPages(res1.data.pages);
				setTotalPage(res1.data.pageCount);
				setTotalData(res1.data.countAlumnis);
			})
			.catch((err) => {
				alert("gagal mengambil data dari input manual alumni!");
				console.log(err);
			})
			.finally(() => setLoadingToFalse());
	};
	const getAlumniL = (page: number, searchName?: string) => {
		setLoadingToTrue();
		axios
			.get(`http://localhost:4000/alumnilinkedin?page=${page}&limit=40`, {
				headers: {
					authorization: `bearer ${token}`,
				},
				params: {
					name: searchName || "",
				},
			})
			.then((res2) => {
				setAlumniL(res2.data.data);
				setPagesL(res2.data.pages);
				setTotalPageL(res2.data.pageCount);
				setTotalDataL(res2.data.countAlumnis);
			})
			.catch((err) => {
				alert("gagal mengambil data alumni linkedin!");
				console.log(err);
			})
			.finally(() => setLoadingToFalse());
	};
	const handleLinkedinScrap = () => {
		axios
			.get("http://localhost:5000/scraper")
			.then((res) => {
				alert("Selesai Men-scrape data dari linkedIn!");
			})
			.catch((err) => {
				alert(`terjadi kesalahan dalam scraper: ${err}`);
			});
	};

	const handlePageClickL = (pageClicked: number) => {
		setCurrentPageL(pageClicked);
		getAlumniL(pageClicked, search);
	};
	const handlePageClick = (pageClicked: number) => {
		setCurrentPage(pageClicked);
		getAlumni(pageClicked, search);
	};

	const formik = useFormik({
		initialValues: { search: "" },
		onSubmit: ({ search }) => {
			setSearch(search);
			getAlumni(1, search);
			getAlumniL(1, search);
			setCurrentPage(1);
			setCurrentPageL(1);
		},
	});

	useEffect(() => {
		getAlumni(currentPage);
		getAlumniL(currentPageL);
	}, []);

	return (
		<>
			<Segment basic>
				<Form onSubmit={formik.handleSubmit}>
					<Grid stackable textAlign="center">
						<Grid.Row>
							<Grid.Column width="10">
								<Input
									name="search"
									onChange={formik.handleChange}
									values={formik.values.search}
									placeholder="cari alumni di sini..."
									fluid
								/>
							</Grid.Column>
							<Grid.Column width="2" textAlign="center">
								<Button fluid color="green" type="submit">
									<Icon name="search" />
									Cari
								</Button>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Form>
			</Segment>
			<Segment basic disabled={isLoading}>
				<Grid columns={4} stackable>
					<Grid.Row>
						<Grid.Column width={16}>
							<h1>Data Input Manual</h1>
							<Label color="olive">
								jumlah jurusan: {totalData}
							</Label>
							<Label color="olive">
								jumlah halaman: {totalPage}
							</Label>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						{alumni.map((values, index) => (
							<Grid.Column key={values._id}>
								<AlumniCard alumni={values} />
							</Grid.Column>
						))}
					</Grid.Row>
					<Grid.Row>
						<Grid.Column width={16} textAlign="center">
							<CustomPagination
								currentPage={currentPage}
								data={pages}
								handlePageClick={handlePageClick}
							/>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Segment>
			<Divider />

			<Segment basic disabled={isLoading}>
				<Grid columns={4} stackable>
					<Grid.Row>
						<Grid.Column width={8} textAlign="left">
							<h1>Data Linkedin</h1>
							<Label color="olive">
								jumlah jurusan: {totalDataL}
							</Label>
							<Label color="olive">
								jumlah halaman: {totalPageL}
							</Label>
						</Grid.Column>
						<Grid.Column width={8} textAlign="right">
							<Button
								onClick={() => handleLinkedinScrap()}
								color="green"
							>
								Scrap From LinkedIn
							</Button>
						</Grid.Column>
					</Grid.Row>
					{alumniL.map((values, index) => (
						<Grid.Column key={values._id}>
							<AlumniCard alumni={values} />
						</Grid.Column>
					))}
					<Grid.Row>
						<Grid.Column width={16} textAlign="center">
							<CustomPagination
								currentPage={currentPageL}
								data={pagesL}
								handlePageClick={handlePageClickL}
							/>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Segment>
		</>
	);
};

export default ListAlumni;
