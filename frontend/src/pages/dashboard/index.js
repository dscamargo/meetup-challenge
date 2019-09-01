import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdAddCircleOutline, MdChevronRight } from "react-icons/md";
import { format, parseISO } from "date-fns";
import pt from "date-fns/locale/pt";
import { toast } from "react-toastify";

import {
  Container,
  InnerContainer,
  MyMeetups,
  Meetup,
  NewMeetup
} from "./styles";
import api from "../../services/api";
import Header from "../../components/header";
import Loading from "../../components/loading";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [meetups, setMeetups] = useState([]);

  const profile = useSelector(state => state.user.profile);

  async function getMeetups() {
    setLoading(true);
    try {
      const response = await api.get("/meetups");

      setMeetups(response.data.rows);
    } catch (error) {
      toast.error(error.response.data.message || "Internal server error", {
        position: toast.POSITION.TOP_RIGHT
      });
    }
    setLoading(false);
  }

  useEffect(() => {
    getMeetups();
  }, []);

  return (
    <Container>
      <Header username={profile.username} />
      <InnerContainer>
        <MyMeetups>
          <strong>Meus meetups</strong>
          <NewMeetup to="/meetup/new">
            <div>
              <MdAddCircleOutline size={"1.4em"} />
              <strong>Novo Meetup</strong>
            </div>
          </NewMeetup>
        </MyMeetups>

        {!meetups.length && (
          <h1 style={{ textAlign: "center", fontSize: 20, color: "#fff" }}>
            Nenhum meetup encontrado
          </h1>
        )}

        {loading && <Loading></Loading>}

        {!!meetups.length &&
          meetups.map(meetup => (
            <Meetup key={meetup.id}>
              <strong>{meetup.title}</strong>
              <div>
                <span>
                  {format(
                    parseISO(meetup.date),
                    "dd 'de' LLLL 'de' yyyy 'às' HH':'mm",
                    {
                      locale: pt
                    }
                  )}
                </span>
                <Link to={`/meetup/${meetup.id}/details`}>
                  <MdChevronRight
                    style={{ marginLeft: 20 }}
                    size={"2em"}
                    color="#979797"
                  />
                </Link>
              </div>
            </Meetup>
          ))}
      </InnerContainer>
    </Container>
  );
}
