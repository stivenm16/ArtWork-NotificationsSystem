import {config} from '@gluestack-ui/config'; // Optional if you want to use default theme
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

  const getToken = async () => {
    const token = await messaging().getToken();
    console.log(token, '<------ token ');
  };

  useEffect(() => {
    requestUserPermission();
    getToken();
  }, []);

  return (
    <GluestackUIProvider config={config}>
      <AppNavigation />
    </GluestackUIProvider>
  );
}
