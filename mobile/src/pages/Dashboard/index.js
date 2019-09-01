import React, { useState, useEffect, useMemo } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity, FlatList, Alert } from 'react-native';
import { format, parseISO, subDays, addDays, isAfter } from 'date-fns';
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
  ListEmpty,
  Empty,
} from './styles';

export default function Dashboard({ navigation }) {
  const [meetups, setMeetups] = useState([]);
  const [date, setDate] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [registered, setRegistered] = useState(false);

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  async function handleRegister(id) {
    try {
      await api.post(`/registers/${id}`);

      setRegistered(true);

      Alert.alert('Inscrição', 'Inscrição realizada com sucesso');
    } catch (err) {
      Alert.alert('Inscrição', err.response.data.message);
    }
  }

  async function loadMeetups() {
    const response = await api.get(`/meetups?page=1`, {
      params: { date },
    });

    setMeetups(response.data.rows);
    setRegistered(false);
    setTotal(Math.floor(response.data.count / 10));
  }

  async function loadPage() {
    if (total && page > total) {
      return;
    }

    const response = await api.get(`/meetups?page=${page + 1}`, {
      params: { date },
    });
    setMeetups([...meetups, ...response.data.rows]);
    setPage(page + 1);
  }

  useEffect(() => {
    loadMeetups();
  }, [date, registered]);

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
          ListEmptyComponent={() => (
            <ListEmpty>
              <Empty>Não há meetups para mostrar</Empty>
            </ListEmpty>
          )}
          keyExtractor={item => String(item.id)}
          onRefresh={() => loadMeetups()}
          refreshing={refreshing}
          onEndReached={() => loadPage()}
          onEndReachedThreshold={0.1}
          renderItem={({ item }) => (
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

                <RegisterButton
                  disabled={isAfter(new Date(), parseISO(item.date))}
                  onPress={() => handleRegister(item.id)}
                >
                  {isAfter(new Date(), parseISO(item.date)) ? (
                    <ButtonText>Meetup já realizado</ButtonText>
                  ) : (
                    <ButtonText>Realizar inscrição</ButtonText>
                  )}
                </RegisterButton>
              </ListContainer>
            </Meetup>
          )}
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
