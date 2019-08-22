import React from "react";
import { Link } from "react-router-dom";
import { MdAddCircleOutline, MdChevronRight } from "react-icons/md";

import Header from "../../components/header";

import {
  Container,
  InnerContainer,
  MyMeetups,
  Meetup,
  NewMeetup
} from "./styles";

export default function dashboard() {
  return (
    <Container>
      <Header user="Diego Fernandes" />
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

        <Meetup>
          <strong>Meetup de React Native</strong>
          <div>
            <span>24 de junho, às 20h</span>
            <Link to="/meetup/1">
              <MdChevronRight
                style={{ marginLeft: 20 }}
                size={"2em"}
                color="#979797"
              />
            </Link>
          </div>
        </Meetup>

        <Meetup>
          <strong>Meetup de React Native</strong>
          <div>
            <span>24 de junho, às 20h</span>
            <Link to="/meetup/1">
              <MdChevronRight
                style={{ marginLeft: 20 }}
                size={"2em"}
                color="#979797"
              />
            </Link>
          </div>
        </Meetup>

        <Meetup>
          <strong>Meetup de React Native</strong>
          <div>
            <span>25 de dezembro de 2019, às 21h</span>
            <Link to="/meetup/1">
              <MdChevronRight
                style={{ marginLeft: 20 }}
                size={"2em"}
                color="#979797"
              />
            </Link>
          </div>
        </Meetup>
      </InnerContainer>
    </Container>
  );
}
