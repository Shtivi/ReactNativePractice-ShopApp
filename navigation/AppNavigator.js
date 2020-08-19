import React from 'react'
import { useSelector } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { AuthNavigator, ShopNavigator } from './ShopNavigator'
import StartupScreen from '../screens/StartupScreen'

export default props => {
  const isAuthorized = useSelector(state => !!state.auth.token)
  const hasAttemptedAutoLogin = useSelector(state => state.auth.hasAttemptedAutoLogin)

  return (
    <NavigationContainer>
      {isAuthorized && <ShopNavigator />}
      {!isAuthorized && hasAttemptedAutoLogin && <AuthNavigator />}
      {!isAuthorized && !hasAttemptedAutoLogin && <StartupScreen />}
    </NavigationContainer>
  );
}