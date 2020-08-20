import React from 'react'
import { useSelector } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { AuthNavigator, ShopNavigator } from './ShopNavigator'
import StartupScreen from '../screens/StartupScreen'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native'

export default props => {
  const isAuthorized = useSelector(state => !!state.auth.token)
  const hasAttemptedAutoLogin = useSelector(state => state.auth.hasAttemptedAutoLogin)

  return (
    // <SafeAreaProvider>

      <NavigationContainer>
        {/* <SafeAreaView style={{flex:1}}> */}

          {isAuthorized && <ShopNavigator />}
          {!isAuthorized && hasAttemptedAutoLogin && <AuthNavigator />}
          {!isAuthorized && !hasAttemptedAutoLogin && <StartupScreen />}
        {/* </SafeAreaView> */}
      </NavigationContainer>
    // </SafeAreaProvider>
  );
}