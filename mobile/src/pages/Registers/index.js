import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity, FlatList } from 'react-native';

import Background from '~/components/background';
import Header from '~/components/header';
import MeetupBanner from '~/assets/images/banner.png';

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
} from './styles';

const RenderMeetup = ({ item }) => {
  return (
    <Meetup>
      <Banner source={MeetupBanner} />
      <ListContainer>
        <Title>{item.title}</Title>
        <InfoView>
          <Icon name="event" size={20} color="#999"></Icon>
          <InfoText>{item.date}</InfoText>
        </InfoView>
        <InfoView>
          <Icon name="place" size={20} color="#999"></Icon>
          <InfoText>{item.place}</InfoText>
        </InfoView>
        <InfoView>
          <Icon name="person" size={20} color="#999"></Icon>
          <InfoText>Organizador: {item.user}</InfoText>
        </InfoView>

        <RegisterButton>
          <ButtonText>Cancelar inscrição</ButtonText>
        </RegisterButton>
      </ListContainer>
    </Meetup>
  );
};

export default function Registers() {
  const data = [
    {
      id: 1,
      title: 'Meetup de React Native 1',
      date: '24 de junho, às 20h',
      place: 'Rua Guilherme Gembala, 260',
      user: 'Diego Fernandes',
    },
    {
      id: 2,
      title: 'Meetup de React Native 2',
      date: '24 de junho, às 20h',
      place: 'Rua Guilherme Gembala, 260',
      user: 'Diego Fernandes',
    },
  ];
  return (
    <Background>
      <Header />
      <Container>
        <FlatList
          style={{ width: '90%' }}
          data={data}
          renderItem={data => RenderMeetup(data)}
          keyExtractor={(item, index) => item.title}
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
