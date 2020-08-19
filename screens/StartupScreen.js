import React, { useEffect, useCallback } from 'react'
import { StyleSheet, View, ActivityIndicator, AsyncStorage } from 'react-native'
import Colors from '../constants/Colors'
import { useDispatch } from 'react-redux'
import { authenticate, autoLoginAttempt } from '../store/actions/auth'

export default props => {
  const dispatch = useDispatch()

  const tryLogin = useCallback(async () => {
    const userData = await AsyncStorage.getItem('userData')
    if (!userData) {
      // props.navigation.navigate('Auth')
      dispatch(autoLoginAttempt())
      return;
    }
    
    const transformedData = JSON.parse(userData)
    const { token, userId, expiryDate } = transformedData
    const expirationDate = new Date(expiryDate)
    
    if (expirationDate <= new Date() || !token || !userId) {
      dispatch(autoLoginAttempt())
      return
    }

    // props.navigation.navigate('Shop')
    dispatch(authenticate(userId, token))
  }, [dispatch])

  useEffect(() => {
    tryLogin()
  })

  return (
    <View style={styles.screen}>
      <ActivityIndicator
        size='large'
        color={Colors.primary}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})