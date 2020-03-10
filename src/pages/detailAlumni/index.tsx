import { Segment, Card } from "semantic-ui-react";
import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useLocation } from "react-router";
import alumniInterface from "../../interfaces/alumniInterface";
import axios from "axios";

interface DetailAlumniInterface extends alumniInterface {
  _id: string;
}

interface AlumniIdSource {
  _id: string;
  data_source: string;
}

const DetailAlumni: React.FunctionComponent<RouteComponentProps> = () => {
  const location = useLocation<AlumniIdSource>().state;

  const [alumni, setAlumni] = useState<DetailAlumniInterface>({
    _id: "",
    name: "",
    major: "",
    entry_year: 0,
    graduate_year: 0,
    email: "",
    work_at: "",
    work_position: "",
    data_source: ""
  });

  useEffect(() => {
    const alumniId = location._id;
    const alumniSource = location.data_source;
    if (alumniSource === "manual") {
      axios
        .get(`http://localhost:4000/alumni/${alumniId}`)
        .then(res => {
          const alumniData = res.data;
          setAlumni(alumniData);
        })
        .catch(err => {
          alert(err);
        });
    } else if (alumniSource === "facebook") {
      axios
        .get(`http://localhost:4000/alumniFacebook/${alumniId}`)
        .then(res => {
          const alumniData = res.data;
          setAlumni(alumniData);
        })
        .catch(err => {
          alert(err);
        });
    } else if (alumniSource === "linkedin") {
      axios
        .get(`http://localhost:4000/alumniLinkedin/${alumniId}`)
        .then(res => {
          const alumniData = res.data;
          setAlumni(alumniData);
        })
        .catch(err => {
          alert(err);
        });
    }
  }, []);

  const isWorkEmpty = (work_at: string, work_position: string) => {
    if (work_at == ``) {
      return `saat ini masih belum bekerja`;
    } else {
      return `saat ini bekerja di ${work_at} sebagai ${work_position}`;
    }
  };

  const isEmailEmpty = (email: string, name: string) => {
    if (email == "") {
      return `email tidak dapat ditemukan`;
    } else {
      return `anda dapat menghubungi ${name} dengan menghubungi email ${email}`;
    }
  };

  const {
    name,
    data_source,
    work_at,
    work_position,
    email,
    major,
    entry_year,
    graduate_year
  } = alumni;

  return (
    <Segment basic>
      <Card centered fluid>
        <Card.Content>
          <Card.Header>{name}</Card.Header>
          <Card.Meta>{isWorkEmpty(work_at, work_position)}</Card.Meta>
          <Card.Description>{`mengambil Jurusan ${major}`}</Card.Description>
          <Card.Description>{`Mulai berkuliah tahun ${entry_year} dan lulus tahun ${graduate_year}`}</Card.Description>
          <Card.Description>{`data didapat dari ${data_source}`}</Card.Description>
          <br />
          <Card.Description>{isEmailEmpty(email, name)}</Card.Description>
        </Card.Content>
      </Card>
    </Segment>
  );
};

export default DetailAlumni;
