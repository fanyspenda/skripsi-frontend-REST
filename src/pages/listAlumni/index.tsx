import React, { useState, useEffect } from "react";
import { Card, Grid } from "semantic-ui-react";
import axios from "axios";
import { useHistory } from "react-router";
import EditDeleteButton from "../../components/EditDeleteButton";

interface alumniListInterface {
  _id: string;
  name: string;
  work_at: string;
  work_position: string;
  email: string;
  data_source: string;
}

const ListAlumni: React.FunctionComponent<{}> = () => {
  const history = useHistory();

  const [alumnis, setAlumnis] = useState<alumniListInterface[]>([
    {
      _id: "",
      name: "",
      work_at: "",
      work_position: "",
      email: "",
      data_source: ""
    }
  ]);

  const handleCardClick = (_id: string, data_source: string) => {
    const data = {
      _id,
      data_source
    };
    history.push("/detailAlumni", data);
  };

  const handleEditClick = (_id: string) => {
    history.push("/editAlumni", _id);
  };

  const handleDeleteClick = (_id: string) => {
    console.log(`delete alumni with id ${_id}`);
  };

  useEffect(() => {
    axios.get("http://localhost:4000/alumni").then(res1 => {
      let alumniData = res1.data;
      axios.get("http://localhost:4000/alumniFacebook").then(res2 => {
        alumniData.push(...res2.data);
        axios.get("http://localhost:4000/alumniLinkedin").then(res3 => {
          alumniData.push(...res3.data);
          setAlumnis(alumniData);
        });
      });
    });
  }, []);

  return (
    <Grid columns={4} stackable>
      {alumnis.map((alumni, index) => (
        <Grid.Column key={alumni._id}>
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
              {alumni.data_source == "manual" ? (
                <EditDeleteButton
                  onEditClick={() => handleEditClick(alumni._id)}
                  onDeleteClick={() => handleDeleteClick(alumni._id)}
                />
              ) : null}
            </Card.Content>
          </Card>
        </Grid.Column>
      ))}
    </Grid>
  );
};

export default ListAlumni;
