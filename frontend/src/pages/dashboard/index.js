import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdAddCircleOutline, MdChevronRight } from "react-icons/md";
import { format, parseISO } from "date-fns";
import pt from "date-fns/locale/pt";

import { useSelector } from "react-redux";

import Header from "../../components/header";

import {
  Container,
  InnerContainer,
  MyMeetups,
  Meetup,
  NewMeetup
} from "./styles";
import api from "../../services/api";

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);
  const profile = useSelector(state => state.user.profile);
  useEffect(() => {
    async function getMeetups() {
      try {
        const response = await api.get("/meetups");

        setMeetups(response.data);
      } catch (error) {}
    }

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

        {meetups.map(meetup => (
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
