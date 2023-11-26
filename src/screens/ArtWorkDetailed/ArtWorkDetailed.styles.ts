import { StyleSheet } from 'react-native'
import colors from '../../utils/colorPallete'

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  detailsContainer: {
    width: '100%',
  },
  title: {
    color: colors.darkOnSurface,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  artist: {
    color: colors.darkOnSurface,
    fontSize: 18,
    marginBottom: 10,
  },
  description: {
    color: colors.darkOnSurface,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: colors.darkPrimary,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    textAlign: 'center',
  },
})
