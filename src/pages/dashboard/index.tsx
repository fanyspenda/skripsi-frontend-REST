import React, { useContext, useState } from "react";
import RedirectToLogin from "components/RedirectToLogin";
import {
	Segment,
	Card,
	Statistic,
	Icon,
	Label,
	Grid,
	StrictStatisticProps,
	IconProps,
	StatisticProps,
	Divider,
} from "semantic-ui-react";
import { TokenContext } from "contexts/tokenContext";
import { isArray } from "util";
import StatisticCard from "./StatisticCard";

export interface DashboardProps {}

interface totalDataProps {
	label: string;
	icon: IconProps["name"];
	color: StatisticProps["color"];
	total: number;
}

const Dashboard: React.SFC<DashboardProps> = () => {
	const { token } = useContext(TokenContext);
	const [totalData, setTotalData] = useState<totalDataProps[]>([
		{ label: "", total: 0, icon: undefined, color: undefined },
	]);
	const [sourceData, setSourceData] = useState<totalDataProps[]>([
		{ label: "", total: 0, icon: undefined, color: undefined },
	]);

	return (
		<>
			<RedirectToLogin />

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
