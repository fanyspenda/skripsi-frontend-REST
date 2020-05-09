import React from "react";
import {
	IconProps,
	StatisticGroupProps,
	Card,
	Statistic,
	Icon,
} from "semantic-ui-react";

export interface StatisticCardProps {
	label: string;
	icon: IconProps["name"];
	total: number;
	color: StatisticGroupProps["color"];
}

const StatisticCard: React.FunctionComponent<StatisticCardProps> = ({
	color,
	icon,
	label,
	total,
}) => {
	return (
		<Card fluid>
			<Card.Content>
				<Statistic size="huge" color={color}>
					<Statistic.Value>
						<Icon name={icon} size="small" />
						<br />
						{total == 0 ? <h2>loading...</h2> : total}
					</Statistic.Value>
					<Statistic.Label>{label}</Statistic.Label>
				</Statistic>
			</Card.Content>
		</Card>
	);
};

export default StatisticCard;
