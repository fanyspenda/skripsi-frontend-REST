import React, { useState, useEffect } from "react";
import { Card, Grid, Button } from "semantic-ui-react";
import axios from "axios";
import AlumniCard from "./alumniCard";
import { page } from "interfaces/pageInterface";

interface alumniListInterface {
	_id: string;
	name: string;
	work_at: string;
	work_position: string;
	email: string;
	data_source: string;
}

const ListAlumni: React.FunctionComponent<{}> = () => {
	const [currentPageLinkedin, setCurrentPageLinkedin] = useState(1);
	const [currentPage, setCurrentPage] = useState(1);
	const [alumniPage, setAlumniPage] = useState(1);
	const [alumniLinkedinPage, setAlumniLinkedinPage] = useState<page[]>([
		{
			number: 1,
			url: "",
		},
	]);
	const [alumnis, setAlumnis] = useState<alumniListInterface[]>([
		{
			_id: "",
			name: "",
			work_at: "",
			work_position: "",
			email: "",
			data_source: "",
		},
	]);

	const [alumniLinkedin, setAlumniLinkedin] = useState<alumniListInterface[]>(
		[
			{
				_id: "",
				name: "",
				work_at: "",
				work_position: "",
				email: "",
				data_source: "",
			},
		]
	);

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

	const handlePageClick = (pageNumber: number, url: string) => {
		axios
			.get(`http://localhost:4000${url}`)
			.then((res) => {
				setAlumniLinkedin(res.data.data);
				setAlumniLinkedinPage(res.data.pages);
				setCurrentPageLinkedin(pageNumber);
			})
			.catch((err) => {
				alert(err);
			});
	};

	useEffect(() => {
		axios
			.get("http://localhost:4000/alumni?page=1&limit=40")
			.then((res1) => {
				console.log(res1.data);
				setAlumnis(res1.data.data);
			})
			.catch((err) => {
				alert("gagal mengambil data dari input manual alumni!");
				console.log(err);
			});
		axios
			.get("http://localhost:4000/alumnilinkedin?page=1&limit=40")
			.then((res2) => {
				setAlumniLinkedin(res2.data.data);
				setAlumniLinkedinPage(res2.data.pages);
			})
			.catch((err) => {
				alert("gagal mengambil data alumni linkedin!");
				console.log(err);
			});
	}, []);

	return (
		<>
			<h1>Data Input Manual</h1>
			<Grid columns={4} stackable>
				{alumnis.map((alumni, index) => (
					<Grid.Column key={alumni._id}>
						<AlumniCard alumni={alumni} />
					</Grid.Column>
				))}
			</Grid>
			<br />
			<br />
			<br />
			<Grid columns={4} stackable>
				<Grid.Row>
					<Grid.Column width={8} textAlign="left">
						<h1>Data Linkedin</h1>
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
				{alumniLinkedin.map((alumni, index) => (
					<Grid.Column key={alumni._id}>
						<AlumniCard alumni={alumni} />
					</Grid.Column>
				))}
				<Grid.Row>
					<Grid.Column width={16} textAlign="center">
						{alumniLinkedinPage.map((page, index) =>
							page.number === currentPageLinkedin ? (
								<Button color="grey">{page.number}</Button>
							) : (
								<Button
									color="instagram"
									onClick={() =>
										handlePageClick(page.number, page.url)
									}
								>
									{page.number}
								</Button>
							)
						)}
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</>
	);
};

export default ListAlumni;
