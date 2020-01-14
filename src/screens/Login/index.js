import React, {useState, useEffect} from 'react';
import {
  KeyboardAvoidingView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont();
import styles from './styles';

export default function Login({navigation}) {
  const [user, setUser] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('@Twitter:user').then(user => {
      if (user) {
        navigation.navigate('App', {user});
      }
    });
  }, [navigation]);

  handleLogin = async () => {
    if (!user.length) return;

    await AsyncStorage.setItem('@Twitter:user', user);
    navigation.navigate('App', {user});
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      enabled={Platform.OS === 'ios'}
      style={styles.container}>
      <View style={styles.content}>
        <Icon name="twitter" size={64} color="#4BB0EE" />

        <TextInput
          style={styles.input}
          placeholder="Nome de usuário"
          returnKeyType="send"
          autoCapitalize="none"
          autoCorrect={false}
          value={user}
          onChangeText={setUser}
          onSubmitEditing={this.handleLogin}
          returnKeyType="send"
        />

        <TouchableOpacity onPress={this.handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
