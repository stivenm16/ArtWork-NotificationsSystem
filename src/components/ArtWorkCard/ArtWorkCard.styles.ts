import { StyleSheet } from 'react-native'
import colors from '../../utils/colorPallete'

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.darkBarkground,
    borderRadius: 10,
    padding: 15,
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 180,
    borderRadius: 5,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: colors.darkOnSurface,
    fontSize: 18,
    fontWeight: 'bold',
  },
  artist: {
    color: colors.darkOnSurface,
    fontSize: 16,
    marginTop: 5,
  },
  addToFavoritesButton: {
    backgroundColor: colors.darkPrimary,
    padding: 8,
    borderRadius: 5,
    marginTop: 10,
  },
  addToFavoritesText: {
    textAlign: 'center',
  },
  button: {
    backgroundColor: colors.darkPrimary,
    padding: 8,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    textAlign: 'center',
  },
})

export default styles
