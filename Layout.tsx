import React, {ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from './src/utils/colorPallete';

interface LayoutProps {
  children: ReactNode;
}
const Layout = ({children}: LayoutProps) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.darkBarkground,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
    minHeight: 550,
  },
});

export default Layout;
