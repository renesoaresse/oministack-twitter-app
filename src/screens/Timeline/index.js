import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, FlatList} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
Icon.loadFont();

import socket from 'socket.io-client';

import api from '../../services/api';
import Tweet from '../../components/Tweet';

import styles from './styles';

export default function Timeline({navigation}) {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    async function loadTweets() {
      const reponse = await api.get('/tweets');
      setTweets(reponse.data);
    }
    loadTweets();
  }, [tweets]);

  useEffect(() => {
    const io = socket('http://localhost:3000');

    io.on('tweet', data => {
      setTweets([data, ...tweets]);
    });

    io.on('tweet-like', data => {
      setTweets(
        tweets.map(tweet => {
          return tweet._id === data._id ? data : tweet;
        }),
      );
    });
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={tweets}
        keyExtractor={tweet => tweet._id}
        renderItem={({item}) => <Tweet tweet={item} />}
      />
    </View>
  );
}

Timeline.navigationOptions = ({navigation}) => ({
  title: 'Timeline',
  headerRight: () => (
    <TouchableOpacity onPress={() => navigation.navigate('New')}>
      <Icon
        size={24}
        color="#4BB0EE"
        name="add-circle-outline"
        style={{marginRight: 20}}
      />
    </TouchableOpacity>
  ),
});
