import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
Icon.loadFont();

import api from '../../services/api';

import styles from './styles';

export default function Tweet(props) {
  const {tweet} = props;

  handleLike = () => {
    const {_id} = tweet;
    api.post(`/likes/${_id}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.author}>{tweet.author}</Text>
      <Text style={styles.content}>{tweet.content}</Text>

      <TouchableOpacity onPress={this.handleLike} style={styles.likeButton}>
        <Icon name="ios-heart-empty" size={20} color="#999999" />
        <Text style={styles.likeText}>{tweet.likes}</Text>
      </TouchableOpacity>
    </View>
  );
}
