import { ArtWorkT } from '../types/apiResponses'

const getArtWork = async (id: number): Promise<ArtWorkT | null> => {
  try {
    const response = await fetch(`https://api.artic.edu/api/v1/artworks/${id}`)

    if (!response.ok) {
      throw new Error('Network response was not ok.')
    }
    const data = await response.json()
    if (!data || !data.data) throw Error('Empty data')

    const filteredData: ArtWorkT = {
      id: data.data.id,
      title: data.data.title,
      placeOrigin: data.data.place_origin,
      artistTitle: data.data.artist_title,
      img: {
        imgCode: data.data.image_id,
        baseUrl: data.config.iiif_url,
      },
    }
    // console.log(filteredData)
    return filteredData
  } catch (error) {
    console.log(error, 'Unexpected error getting artWork')
    return null
  }
}

export default getArtWork
