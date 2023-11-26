import { ArtWorkT } from '../types/apiResponses'

const getArtWorks = async (
  pageNumber: number = 1,
  pageSize: number = 10,
): Promise<ArtWorkT[] | null> => {
  try {
    const response = await fetch(
      `https://api.artic.edu/api/v1/artworks?page=${pageNumber}&limit=${pageSize}`,
    )
    if (!response.ok) {
      throw new Error('Network response was not ok.')
    }
    const data = await response.json()
    if (!data || !data.data) throw Error('Empty data')
    const filteredData: ArtWorkT[] = data.data.map((artWork: any) => {
      return {
        id: artWork.id,
        title: artWork.title,
        placeOrigin: artWork.place_origin,
        artistTitle: artWork.artist_title,
        img: {
          imgCode: artWork.image_id,
          baseUrl: data.config.iiif_url,
        },
      }
    })

    return filteredData
  } catch (error) {
    console.log(error, 'Unexpected error getting artWorks')
    return null
  }
}

export default getArtWorks
