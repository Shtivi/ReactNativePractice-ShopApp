import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useReducer, useCallback, useEffect } from 'react';
import {
  Button, KeyboardAvoidingView, ScrollView, StyleSheet, View, ActivityIndicator, Alert
} from 'react-native';
import { useDispatch } from 'react-redux';
import Card from '../../components/UI/Card';
import Input from '../../components/UI/Input';
import Colors from '../../constants/Colors';
import * as authActions from '../../store/actions/auth'

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};

const AuthScreen = props => {
  const dispatch = useDispatch()

  const [isSignup, setIsSignup] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: ''
    },
    inputValidities: {
      email: false,
      password: false
    },
    formIsValid: false
  });

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );

  useEffect(() => {
    if (error) {
      Alert.alert('Oops!', error)
    }
  }, [error])

  const authHandler = async () => {
    let action;
    if (isSignup) {
      action = authActions.signup(formState.inputValues.email, formState.inputValues.password)
    } else {
      action = authActions.login(formState.inputValues.email, formState.inputValues.password)
    }

    setError()
    setIsLoading(true)
    try {
      await dispatch(action)
    } catch (err) {
      setError(err.message)
      setIsLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              label="E-Mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please enter a valid email address."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorText="Please enter a valid password."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            {isLoading ? (
              <View style={styles.buttonContainer}>
                <ActivityIndicator
                  size='small'
                  color={Colors.accent} />
              </View>
            ) : (
                <View>
                  <View style={styles.buttonContainer}>
                    <Button title={isSignup ? "Sign up" : "Login"} color={Colors.primary} onPress={authHandler} />
                  </View>
                  <View style={styles.buttonContainer}>
                    <Button
                      title={isSignup ? "Back to Login" : "Switch to Sign Up"}
                      color={Colors.accent}
                      onPress={() => setIsSignup(isSignup => !isSignup)}
                    />
                  </View>
                </View>
              )}
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export const screenOptions = {
  headerTitle: 'Authenticate'
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20
  },
  buttonContainer: {
    marginTop: 10
  }
});

export default AuthScreen;
