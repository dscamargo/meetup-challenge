import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FlatList, Alert } from 'react-native';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Background from '~/components/background';
import Header from '~/components/header';
import MeetupBanner from '~/assets/images/banner.png';
import api from '~/services/api';

import {
  Container,
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

export default function Registers() {
  const [registeredMeetups, setRegisteredMeetups] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [canceled, setCanceled] = useState(false);
  async function loadRegisteredMeetups() {
    const response = await api.get('/registers');

    setRegisteredMeetups(response.data);
    setCanceled(false);
  }
  useEffect(() => {
    loadRegisteredMeetups();
  }, [canceled]);

  async function handleCancel(id) {
    try {
      await api.delete(`/registers/${id}`);

      Alert.alert('Cancelamento', 'Inscrição cancelada com sucesso.');
      setCanceled(true);
    } catch (error) {
      Alert.alert('Cancelamento', error.response.data.message);
    }
  }
  return (
    <Background>
      <Header />
      <Container>
        <FlatList
          style={{ width: '90%' }}
          ListEmptyComponent={() => (
            <ListEmpty>
              <Empty>Sem inscrições, no momento.</Empty>
            </ListEmpty>
          )}
          data={registeredMeetups}
          keyExtractor={(item, index) => item.id.toString()}
          onRefresh={() => loadRegisteredMeetups()}
          refreshing={refreshing}
          renderItem={({ item }) => {
            const { meetup } = item;
            return (
              <Meetup>
                <Banner source={MeetupBanner} />
                <ListContainer>
                  <Title>{meetup.title}</Title>
                  <InfoView>
                    <Icon name="event" size={20} color="#999"></Icon>
                    <InfoText>
                      {format(
                        parseISO(meetup.date),
                        "dd 'de' LLLL 'de' yyyy 'às' HH':'mm'h'",
                        { locale: pt }
                      )}
                    </InfoText>
                  </InfoView>
                  <InfoView>
                    <Icon name="place" size={20} color="#999"></Icon>
                    <InfoText>{meetup.place}</InfoText>
                  </InfoView>
                  <InfoView>
                    <Icon name="person" size={20} color="#999"></Icon>
                    <InfoText>Organizador: {meetup.user.username}</InfoText>
                  </InfoView>

                  <RegisterButton onPress={() => handleCancel(item.id)}>
                    <ButtonText>Cancelar inscrição</ButtonText>
                  </RegisterButton>
                </ListContainer>
              </Meetup>
            );
          }}
        ></FlatList>
      </Container>
    </Background>
  );
}

Registers.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="done" size={30} color={tintColor} />
  ),
};
