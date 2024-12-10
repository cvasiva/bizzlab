// /* eslint-disable no-unused-vars */
// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import StartingPage from './src/components/StartingPage';
import MyModules from './src/Mpdules/MyModules';
import AccountingDash from './src/Accounting/AccountingDash';
import Processing from './src/Mpdules/Processing';
import LoginPage from './src/Mpdules/LoginPage';
import {UserProvider} from './src/Auth/UserContext';
import IncomeProvider from './src/Auth/IncomeProvider';
import Getway from './src/Mpdules/Getway';
import VoucherPage from './src/Mpdules/VoucherPage';
import ModulesStatus from './src/Mpdules/ModulesStatus';
const Stack = createNativeStackNavigator();

function App() {
  return (
    <UserProvider>
      <IncomeProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="startingpage"
              component={StartingPage}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="loginpage"
              component={LoginPage}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="mymodules"
              component={MyModules}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="accountingdash"
              component={AccountingDash}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="processing"
              component={Processing}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="getway"
              component={Getway}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="VoucherPage"
              component={VoucherPage}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="modulesStatus"
              component={ModulesStatus}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </IncomeProvider>
    </UserProvider>
  );
}

export default App;
