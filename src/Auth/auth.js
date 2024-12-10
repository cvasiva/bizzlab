/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to retrieve user data from AsyncStorage
export const getUser = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('register');
    if (jsonValue) {
      const user = JSON.parse(jsonValue);
      // Ensure user object contains expected properties
      return user && user.token ? user : {};
    }
    return {};
  } catch (error) {
    console.error('Error retrieving user from AsyncStorage:', error);
    return {};
  }
};

export const is_dev = async () => {
  try {
    const user = await AsyncStorage.getItem('register');
    const parsedUser = user ? JSON.parse(user) : null;
    return parsedUser?.is_dev === true;
  } catch (error) {
    console.error('Error retrieving user data:', error);
    return false;
  }
};

export const isLoggedIn = async () => {
  try {
    // Try to get the user token from AsyncStorage
    const user = await AsyncStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      return parsedUser && parsedUser.token ? true : false;
    }
    return false;
  } catch (error) {
    console.error('Error reading value from AsyncStorage', error);
    return false;
  }
};

// Function to get the current user, ensuring the user has a token
// export const getCurrentUser = async () => {
//   const user = await getUser();
//   if (user && user.token) {
//     return user;
//   } else {
//     throw new Error('User token not found');
//   }
// };
export const getCurrentUser = async () => {
  const user = await getUser(); // Await the user retrieval
  return user.token ? user : null; // Return the user if token exists, otherwise null
};

// Function to log out and clear user data
export const logout = async () => {
  try {
    await AsyncStorage.removeItem('register');
  } catch (error) {
    console.error('Error clearing user data from AsyncStorage:', error);
  }
};

// Function to set user data in AsyncStorage
export const setUser = async user => {
  try {
    if (user && user.token) {
      await AsyncStorage.setItem('register', JSON.stringify(user));
    } else {
      // Clear user data if invalid or no token
      await AsyncStorage.removeItem('register');
    }
  } catch (error) {
    console.error('Error saving user data to AsyncStorage:', error);
  }
};

export const setInvoiceData = async data => {
  try {
    await AsyncStorage.setItem('payroll_data', JSON.stringify(data));
    console.log('Payroll data saved successfully.');
  } catch (error) {
    console.error('Error saving payroll data:', error);
  }
};

export const setAccountData = async data => {
  try {
    await AsyncStorage.setItem('categories', JSON.stringify(data));
    console.log('Account data saved successfully');
  } catch (error) {
    console.error('Error saving account data:', error);
  }
};
