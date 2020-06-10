import React from "react";
import alumniInterface from "interfaces/alumniInterface";
import { Card } from "semantic-ui-react";
import { useHistory } from "react-router";
import EditDeleteButton from "components/EditDeleteButton";
import useAuth from "hooks/useAuth";
import axios from "axios";
import { restUrl } from "serverUrl";
import UseLoading from "hooks/useLoading";

interface alumniCardProps
	extends Omit<alumniInterface, "entry_year" | "graduate_year" | "major"> {
	_id: string;
}

interface alumniData {
	alumni: alumniCardProps;
}

const AlumniCard: React.FunctionComponent<alumniData> = ({ alumni }) => {
	const history = useHistory();
	const { token, level } = useAuth();
	const { isLoading, setLoadingToFalse, setLoadingToTrue } = UseLoading();
	const handleCardClick = (_id: string, data_source: string) => {
		const data = {
			_id,
			data_source,
		};
		history.push("/detailAlumni", data);
	};
	const handleEditClick = (_id: string) => {
		history.push("/editAlumni", _id);
	};

	const handleDeleteClick = (_id: string) => {
		setLoadingToTrue();
		axios
			.delete(`${restUrl}alumni/${_id}`, {
				headers: {
					authorization: `bearer ${token}`,
				},
			})
			.then(() => window.location.reload(true))
			.catch((err) => alert(err))
			.finally(() => setLoadingToFalse());
	};

	return (
		<Card centered link>
			<Card.Content
				onClick={() => handleCardClick(alumni._id, alumni.data_source)}
			>
				<Card.Header>{alumni.name}</Card.Header>
				<Card.Meta>{alumni.work_at}</Card.Meta>
				<Card.Description>{`${alumni.work_position}`}</Card.Description>
				<Card.Description>{`${alumni.email}`}</Card.Description>
			</Card.Content>
			<Card.Content extra>
				{alumni.data_source == "manual" && level == 0 ? (
					<EditDeleteButton
						isDisabled={isLoading}
						onEditClick={() => handleEditClick(alumni._id)}
						onDeleteClick={() => handleDeleteClick(alumni._id)}
					/>
				) : null}
			</Card.Content>
		</Card>
	);
};

export default AlumniCard;
