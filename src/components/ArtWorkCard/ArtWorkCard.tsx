import { Image, Text, View } from '@gluestack-ui/themed'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import MainRoutes from '../../navigation/routes/MainRoutes'
import {
  rmvFavoriteRecord,
  saveFavoriteRecord,
} from '../../utils/persistDataFunc'
import { artWorkValidation } from '../../utils/validations'
import styles from './ArtWorkCard.styles'

interface Props {
  id: number
  title: string
  imgCode: string
  artistTitle: string
  baseUrl: string
  navigation: any
  onPress?: any
}
const ArtWorkCard = ({
  id,
  title,
  artistTitle,
  imgCode,
  baseUrl,
  navigation,
  onPress,
}: Props) => {
  const [isOnFavorites, setIsOnFavorites] = useState<boolean>(false)

  const checkIfOnFavorites = async () => {
    const result = await artWorkValidation(title)
    setIsOnFavorites(result)
  }
  useEffect(() => {
    checkIfOnFavorites()
  }, [title])

  const handleNavigate = () => {
    navigation.navigate(MainRoutes.ARTWORKDETAILED, {
      id,
    })
  }
  const handleSetFavorites = async () => {
    if (!isOnFavorites) {
      await saveFavoriteRecord({
        id,
        title,
        artistTitle,
        imgCode,
      })
      checkIfOnFavorites()
      if (onPress) onPress()
    } else {
      await rmvFavoriteRecord(id)
      checkIfOnFavorites()
      if (onPress) onPress()
    }
  }

  return (
    <View style={styles.cardContainer}>
      <Image
        source={{ uri: `${baseUrl}/${imgCode}/full/843,/0/default.jpg` }}
        style={styles.image}
        alt={title}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.artist}>{artistTitle}</Text>
        <TouchableOpacity
          onPress={handleSetFavorites}
          style={styles.addToFavoritesButton}
        >
          <Text style={styles.addToFavoritesText}>
            {isOnFavorites ? 'Remove favorite' : 'Add to favorites'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNavigate} style={styles.button}>
          <Text style={styles.buttonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ArtWorkCard
