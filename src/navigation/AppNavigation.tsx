import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import MainStack from './stacks/MainStack'

const AppNavigation = (): JSX.Element => {
  // Here there's a possibility to create an auth system to switch between navigation stacks

  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  )
}

export default AppNavigation
