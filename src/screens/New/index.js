import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import Icon from 'react-native-vector-icons/MaterialIcons';
Icon.loadFont();

import api from '../../services/api';
import styles from './styles';

export default function New({navigation}) {
  const [newTweet, setNewTweet] = useState('');

  handleTweet = async () => {
    if (!newTweet.length) return;

    const author = await AsyncStorage.getItem('@Twitter:user');
    await api.post('/tweets', {
      author,
      content: newTweet,
    });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Icon name="close" size={24} color="#4BB0EE" />
        </TouchableOpacity>
        <TouchableOpacity onPress={this.handleTweet} style={styles.button}>
          <Text style={styles.buttonText}>Tweetar</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        multiline
        placeholder="O que está acontecendo?"
        placeholderTextColor="#999999"
        value={newTweet}
        onChangeText={setNewTweet}
        returnKeyType="send"
        onSubmitEditing={this.handleTweet}
      />
    </SafeAreaView>
  );
}

New.navigationOptions = ({navigation}) => ({
  header: false,
});
