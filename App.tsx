import {config} from '@gluestack-ui/config';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import messaging from '@react-native-firebase/messaging';
import {useEffect} from 'react';
import AppNavigation from './src/navigation/AppNavigation';
export default function App() {
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  // This method retrieves the firebase token to set up scheduled notifications
  // const getToken = async () => {
  //   const token = await messaging().getToken();

  //   console.log(token, '<-- Firebase Token ');
  // };

  useEffect(() => {
    requestUserPermission();
    // getToken();
  }, []);

  return (
    <GluestackUIProvider config={config}>
      <AppNavigation />
    </GluestackUIProvider>
  );
}
