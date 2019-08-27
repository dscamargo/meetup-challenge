import React, { useState, useEffect, useMemo } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity, FlatList } from 'react-native';
import { format, parseISO, subDays, addDays } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';
import Background from '~/components/background';
import Header from '~/components/header';
import MeetupBanner from '~/assets/images/banner.png';

import {
  Container,
  ChooseDate,
  ChosenDate,
  Meetup,
  Banner,
  ListContainer,
  Title,
  InfoView,
  InfoText,
  RegisterButton,
  ButtonText,
} from './styles';

async function handleRegister(id) {
  await api.post(`/meetups/registers/${id}`);
}

const RenderMeetup = ({ item }) => {
  return (
    <Meetup>
      <Banner source={MeetupBanner} />
      <ListContainer>
        <Title>{item.title}</Title>
        <InfoView>
          <Icon name="event" size={20} color="#999"></Icon>
          <InfoText>
            {format(
              parseISO(item.date),
              "dd 'de' LLLL 'de' yyyy 'às' HH':'mm'h'",
              { locale: pt }
            )}
          </InfoText>
        </InfoView>
        <InfoView>
          <Icon name="place" size={20} color="#999"></Icon>
          <InfoText>{item.place}</InfoText>
        </InfoView>
        <InfoView>
          <Icon name="person" size={20} color="#999"></Icon>
          <InfoText>Organizador: {item.user.username}</InfoText>
        </InfoView>

        <RegisterButton onPress={() => handleRegister(item.id)}>
          <ButtonText>Realizar inscrição</ButtonText>
        </RegisterButton>
      </ListContainer>
    </Meetup>
  );
};

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);
  const [date, setDate] = useState(new Date());

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('/meetups', {
        params: { date },
      });

      setMeetups(response.data);
    }

    loadMeetups();
  }, [date]);

  async function handleNextDay() {
    setDate(addDays(date, 1));
  }
  async function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  return (
    <Background>
      <Header />
      <Container>
        <ChooseDate>
          <TouchableOpacity onPress={handlePrevDay}>
            <Icon name="arrow-back" size={30} color="#fff" />
          </TouchableOpacity>

          <ChosenDate>{dateFormatted}</ChosenDate>

          <TouchableOpacity onPress={handleNextDay}>
            <Icon name="arrow-forward" size={30} color="#fff" />
          </TouchableOpacity>
        </ChooseDate>

        <FlatList
          data={meetups}
          renderItem={RenderMeetup}
          keyExtractor={(item, index) => item.title}
        ></FlatList>
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="list" size={30} color={tintColor} />
  ),
};
