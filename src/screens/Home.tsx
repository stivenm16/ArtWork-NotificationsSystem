import {Spinner, Text, View} from '@gluestack-ui/themed';
import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

import {ScrollView, TouchableOpacity} from 'react-native';
import Layout from '../../Layout';
import ArtWorkCard from '../components/ArtWorkCard/ArtWorkCard';
import styles from '../components/ArtWorkCard/ArtWorkCard.styles';
import MainRoutes from '../navigation/routes/MainRoutes';
import getArtWorks from '../services/getArtWorks';
import {ArtWorkT} from '../types/apiResponses';
import colors from '../utils/colorPallete';

const Home = ({navigation}: any) => {
  const [artWorks, setArtWorks] = useState<ArtWorkT[] | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    fetchArtworks();
  }, [pageNumber]);

  const fetchArtworks = async () => {
    const fetchedArtWorks = await getArtWorks(pageNumber);
    if (fetchedArtWorks) {
      setArtWorks(fetchedArtWorks);
      scrollToTop();
    }
  };

  const handleNextPage = () => {
    setPageNumber(prevPageNumber => prevPageNumber + 1);
  };

  const handlePreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(prevPageNumber => prevPageNumber - 1);
    }
  };

  const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({x: 0, y: 0, animated: true});
  };

  const handleNavigate = () => {
    navigation.navigate(MainRoutes.FAVORITES);
  };
  return (
    <SafeAreaView>
      <ScrollView ref={scrollViewRef}>
        <Layout>
          <Text color={colors.darkPrimary} size={'2xl'}>
            Home
          </Text>

          <TouchableOpacity onPress={handleNavigate}>
            <Text>Go to favorites</Text>
          </TouchableOpacity>
          {artWorks ? (
            artWorks?.length > 0 &&
            artWorks.map(artWork => (
              <ArtWorkCard
                id={artWork.id}
                title={artWork.title}
                artistTitle={artWork.artistTitle}
                navigation={navigation}
                key={artWork.img.imgCode}
                baseUrl={artWork.img.baseUrl}
                imgCode={artWork.img.imgCode}
              />
            ))
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 470,
              }}>
              <Spinner size={'large'} />
            </View>
          )}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              gap: 20,
              marginBottom: 20,
            }}>
            <TouchableOpacity
              onPress={handlePreviousPage}
              style={styles.button}>
              <Text>Previous Page</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNextPage} style={styles.button}>
              <Text>Next Page</Text>
            </TouchableOpacity>
          </View>
        </Layout>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
