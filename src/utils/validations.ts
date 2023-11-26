import { getFavoriteRecords } from './persistDataFunc'

export const artWorkValidation = async (title: string) => {
  const favorites = await getFavoriteRecords()
  if (favorites !== null) {
    return favorites.some((obj: any) => obj.title === title)
  } else {
    return false
  }
}
