import React from 'react'

//Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { MainStackParamListT } from '../../types/navigationTypes/MainStackNavigatorTypes'

//Screens
import ArtWorkDetailed from '../../screens/ArtWorkDetailed/ArtWorkDetailed'
import FavoriteArtWorks from '../../screens/FavoriteArtWorks/FavoriteArtWorks'
import Home from '../../screens/Home'
import MainRoutes from '../routes/MainRoutes'

const Stack = createNativeStackNavigator<MainStackParamListT>()
const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={MainRoutes.HOME as 'HOME'}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={MainRoutes.HOME as 'HOME'} component={Home} />
      <Stack.Screen
        name={MainRoutes.ARTWORKDETAILED as 'ARTWORKDETAILED'}
        component={ArtWorkDetailed}
      />
      <Stack.Screen
        name={MainRoutes.FAVORITES as 'FAVORITES'}
        component={FavoriteArtWorks}
      />
    </Stack.Navigator>
  )
}

export default MainStack
