/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PrivateRoute = ({navigation, component: Component}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const user = await AsyncStorage.getItem('user');
      setIsAuthenticated(user && JSON.parse(user).token ? true : false);
      // eslint-disable-next-line curly
      if (!user) navigation.navigate('loginpage');
    };
    checkAuth();
  }, [navigation]);

  return isAuthenticated ? (
    <Component />
  ) : (
    <View>
      <Text>Loading...</Text>
    </View>
  );
};

export default PrivateRoute;
