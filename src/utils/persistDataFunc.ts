import AsyncStorage from '@react-native-async-storage/async-storage'
import { FavoriteArtWork } from '../types/localStorageTypes'
import { ArtWorkT } from '../types/apiResponses'

export const emptyFavStructure: FavoriteArtWork = {
  id: 0,
  title: '',
  artistTitle: '',
  imgCode: '',
}
export const emptyArtWorkStructure: ArtWorkT = {
  id: 0,
  title: '',
  artistTitle: '',
  placeOrigin: '',
  img: {
    imgCode: '',
    baseUrl: '',
  },
}

export const saveFavoriteRecord = async (record: FavoriteArtWork) => {
  try {
    let favorites = await getFavoriteRecords()
    if (!favorites) {
      favorites = []
    }
    favorites.push(record)
    await AsyncStorage.setItem('favoriteRecords', JSON.stringify(favorites))
  } catch (error) {
    console.error('Error saving favorite record:', error)
  }
}

export const getFavoriteRecords = async () => {
  try {
    const favorites = await AsyncStorage.getItem('favoriteRecords')
    return favorites ? JSON.parse(favorites) : null
  } catch (error) {
    console.error('Error getting favorite records:', error)
    return null
  }
}

export const clearAllData = async () => {
  try {
    await AsyncStorage.clear()
    console.log('AsyncStorage data cleared successfully.')
  } catch (error) {
    console.error('Error clearing AsyncStorage data:', error)
  }
}

export const rmvFavoriteRecord = async (id: number) => {
  try {
    const favs = await getFavoriteRecords()
    const filteredFavs = favs.filter(
      (artwork: FavoriteArtWork) => artwork.id !== id,
    )
    await AsyncStorage.setItem('favoriteRecords', JSON.stringify(filteredFavs))
  } catch (error) {
    console.log(error, 'Unexpected error')
  }
}
