import React, { useContext, useState, useEffect } from "react";
import RedirectToLogin from "components/RedirectToLogin";
import {
	Segment,
	Grid,
	IconProps,
	StatisticProps,
	Divider,
} from "semantic-ui-react";
import { TokenContext } from "contexts/tokenContext";
import StatisticCard from "./StatisticCard";
import axios from "axios";
import useAuth from "hooks/useAuth";
import { restUrl } from "serverUrl";

export interface DashboardProps {}

interface totalDataProps {
	label: string;
	icon: IconProps["name"];
	color: StatisticProps["color"];
	total: number;
}

const authOption = (token: string) => {
	return {
		headers: {
			authorization: `bearer ${token}`,
		},
	};
};
const Dashboard: React.SFC<DashboardProps> = () => {
	const { token, isTokenValid } = useAuth();
	const [totalData, setTotalData] = useState<totalDataProps[]>([
		{ label: "", total: 0, icon: undefined, color: undefined },
	]);
	const [sourceData, setSourceData] = useState<totalDataProps[]>([
		{ label: "", total: 0, icon: undefined, color: undefined },
	]);

	const getTotalData = async () => {
		const [totalRes, workingRes, notWorkingRes] = await Promise.all([
			axios.get(`${restUrl}counter/countAll`, authOption(token)),
			axios.get(`${restUrl}counter/countWorking`, authOption(token)),
			axios.get(`${restUrl}counter/countNotWorking`, authOption(token)),
		]);
		setTotalData([
			{
				label: "Alumni Terdaftar",
				icon: "graduation",
				color: "blue",
				total: totalRes.data.total,
			},
			{
				label: "Sudah Bekerja",
				icon: "suitcase",
				color: "green",
				total: workingRes.data.total,
			},
			{
				label: "Belum Bekerja",
				icon: "group",
				color: "red",
				total: notWorkingRes.data.total,
			},
		]);
	};
	const getTotalResouce = async () => {
		const [totalRes, totalLRes] = await Promise.all([
			axios.get(`${restUrl}counter/countLinkedin`, authOption(token)),
			axios.get(`${restUrl}counter/countAlumni`, authOption(token)),
		]);
		setSourceData([
			{
				label: "Linkedin",
				icon: "linkedin",
				color: "orange",
				total: totalRes.data.total,
			},
			{
				label: "Input Manual",
				icon: "edit",
				color: "orange",
				total: totalLRes.data.total,
			},
		]);
	};

	useEffect(() => {
		isTokenValid();
		getTotalData();
		getTotalResouce();
	}, []);

	return (
		<>
			<h1>Data Alumni</h1>
			<Segment basic>
				<Grid stackable textAlign="center">
					<Grid.Row>
						{totalData.map((value, index) => {
							return (
								<Grid.Column width="4" textAlign="center">
									<StatisticCard {...value} />
								</Grid.Column>
							);
						})}
					</Grid.Row>
				</Grid>
			</Segment>
			<Divider />

			<h1>Sumber Data</h1>
			<Segment basic>
				<Grid stackable textAlign="center">
					<Grid.Row>
						{sourceData.map((value, index) => {
							return (
								<Grid.Column width="5" textAlign="center">
									<StatisticCard
										color={value.color}
										icon={value.icon}
										total={value.total}
										label={value.label}
									/>
								</Grid.Column>
							);
						})}
					</Grid.Row>
				</Grid>
			</Segment>
		</>
	);
};

export default Dashboard;
