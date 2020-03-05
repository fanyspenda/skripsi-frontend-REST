import React, { useState, useEffect } from "react";
import { Segment, Card, Grid } from "semantic-ui-react";
import axios from "axios";
import { useHistory } from "react-router";

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

  const handleCardClick = (_id: string) => {
    history.push("/detailAlumni", _id);
  };

  useEffect(() => {
    axios.get("http://localhost:4000/alumni").then(res => {
      setAlumnis(res.data);
    });
  }, []);

  return (
    <Grid columns={4} stackable>
      {alumnis.map((alumni, index) => (
        <Grid.Column key={alumni._id}>
          <Card onClick={() => handleCardClick(alumni._id)} centered>
            <Card.Content>
              <Card.Header>{alumni.name}</Card.Header>
              <Card.Meta>{alumni.work_at}</Card.Meta>
              <Card.Description>{`${alumni.work_position}`}</Card.Description>
              <Card.Description>{`${alumni.email}`}</Card.Description>
            </Card.Content>
          </Card>
        </Grid.Column>
      ))}
    </Grid>
  );
};

export default ListAlumni;
