import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MdModeEdit, MdDeleteForever, MdPlace, MdEvent } from "react-icons/md";
import { format, parseISO, isAfter } from "date-fns";
import pt from "date-fns/locale/pt";
import { toast } from "react-toastify";

import {
  Container,
  InnerContainer,
  Title,
  EditLink,
  InformationsContainer,
  Description,
  LocalContainer,
  DateContainer,
  Place
} from "./styles";
import Header from "../../components/header";
import Loading from "../../components/loading";
import api from "../../services/api";
import history from "../../services/history";

export default function Details({ match }) {
  const { id } = match.params;
  const profile = useSelector(state => state.user.profile);
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(false);

  async function handleCancel() {
    setLoading(true);
    try {
      await api.delete(`/meetups/${id}`);
      history.push("/");
      toast.info(`Meetup cancelado com sucesso.`, {
        position: toast.POSITION.TOP_RIGHT
      });
    } catch (error) {
      console.tron.log(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    async function getDetails() {
      setLoading(true);
      try {
        const response = await api.get(`/meetups/${id}`);

        setDetails(response.data);
      } catch (error) {
        console.tron.log(error);
      }
      setLoading(false);
    }

    getDetails();
  }, [id]);
  return (
    <Container>
      <Header username={profile.username} />
      {loading && (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Loading></Loading>
        </div>
      )}
      {details.file && (
        <InnerContainer>
          <Title>
            <strong>{details.title}</strong>
            {isAfter(parseISO(details.date), new Date()) && (
              <div>
                <EditLink to={`/meetup/${id}/edit`}>
                  <MdModeEdit size={"1.5em"} />
                  <span>Editar</span>
                </EditLink>
                <button onClick={handleCancel} name="cancel" type="button">
                  {loading ? (
                    <Loading color="#fff"></Loading>
                  ) : (
                    <div>
                      <MdDeleteForever size={"2em"} />
                      <span>Cancelar</span>
                    </div>
                  )}
                </button>
              </div>
            )}
          </Title>

          <InformationsContainer>
            <img
              src={`http://localhost:3333/uploads/${details.file.path}`}
              alt="Banner"
            />

            <Description>
              <h3>{details.description}</h3>
            </Description>

            <LocalContainer>
              <DateContainer>
                <MdEvent size={"1.0em"} />
                <span>
                  {format(
                    parseISO(details.date),
                    "dd 'de' LLLL 'de' yyyy 'às' HH':'mm'h'",
                    {
                      locale: pt
                    }
                  )}
                </span>
              </DateContainer>
              <Place>
                <MdPlace size={"1.0em"} />
                <span>{details.place}</span>
              </Place>
            </LocalContainer>
          </InformationsContainer>
        </InnerContainer>
      )}
    </Container>
  );
}
