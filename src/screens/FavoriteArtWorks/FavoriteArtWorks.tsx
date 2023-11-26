import { ScrollView, Spinner, Text, View } from '@gluestack-ui/themed'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Layout from '../../../Layout'
import ArtWorkCard from '../../components/ArtWorkCard/ArtWorkCard'
import MainRoutes from '../../navigation/routes/MainRoutes'
import { FavoriteArtWork } from '../../types/localStorageTypes'
import colors from '../../utils/colorPallete'
import { getFavoriteRecords } from '../../utils/persistDataFunc'

const FavoriteArtWorks = ({ navigation }: any) => {
  const [artWorks, setArtWorks] = useState<FavoriteArtWork[] | null>(null)
  const [updateArtWorks, setUpdateArtWorks] = useState<boolean>(false)

  useEffect(() => {
    getFavoriteRecords().then((res) => setArtWorks(res))
  }, [updateArtWorks])

  const handleUpdate = () => {
    setUpdateArtWorks(!updateArtWorks)
  }
  return (
    <SafeAreaView>
      <ScrollView>
        <Layout>
          <Text color={colors.darkPrimary} size={'2xl'}>
            Favorites ArtWorks
          </Text>

          <TouchableOpacity
            onPress={() => navigation.navigate(MainRoutes.HOME)}
          >
            <Text>Go Home</Text>
          </TouchableOpacity>

          {artWorks ? (
            artWorks?.length > 0 &&
            artWorks.map((artWork) => (
              <ArtWorkCard
                id={artWork.id}
                title={artWork.title}
                artistTitle={artWork.artistTitle}
                navigation={navigation}
                key={artWork.imgCode}
                baseUrl={'https://www.artic.edu/iiif/2/'}
                imgCode={artWork.imgCode}
                onPress={handleUpdate}
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

export default FavoriteArtWorks
