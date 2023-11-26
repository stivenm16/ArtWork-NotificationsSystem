import { ScrollView, Spinner, Text, View } from '@gluestack-ui/themed'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { TouchableOpacity } from 'react-native'
import Layout from '../../Layout'
import ArtWorkCard from '../components/ArtWorkCard/ArtWorkCard'
import MainRoutes from '../navigation/routes/MainRoutes'
import getArtWorks from '../services/getArtWorks'
import { ArtWorkT } from '../types/apiResponses'
import colors from '../utils/colorPallete'

const Home = ({ navigation }: any) => {
  const [artWorks, setArtWorks] = useState<ArtWorkT[] | null>(null)
  useEffect(() => {
    getArtWorks().then((res) => setArtWorks(res))
  }, [])
  const handleNavigate = () => {
    navigation.navigate(MainRoutes.FAVORITES)
  }
  return (
    <SafeAreaView>
      <ScrollView>
        <Layout>
          <Text color={colors.darkPrimary} size={'2xl'}>
            Home
          </Text>

          <TouchableOpacity onPress={handleNavigate}>
            <Text>Go to favorites</Text>
          </TouchableOpacity>
          {artWorks ? (
            artWorks?.length > 0 &&
            artWorks.map((artWork) => (
              <ArtWorkCard
                id={artWork.id}
                title={artWork.title}
                artistTitle={artWork.artistTitle}
                navigation={navigation}
                key={artWork.img.imgCode}
                baseUrl={artWork.img.baseUrl}
                imgCode={artWork.img.imgCode}
              />
            ))
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 470,
              }}
            >
              <Spinner size={'large'} />
            </View>
          )}
        </Layout>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home
