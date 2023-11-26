import {Image, Spinner} from '@gluestack-ui/themed';
import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Layout from '../../../Layout';
import getArtWork from '../../services/getArtWork';
import {ArtWorkT} from '../../types/apiResponses';
import {
  emptyArtWorkStructure,
  rmvFavoriteRecord,
  saveFavoriteRecord,
} from '../../utils/persistDataFunc';
import {artWorkValidation} from '../../utils/validations';
import {styles} from './ArtWorkDetailed.styles';

const ArtWorkDetailed = ({route, navigation}: any) => {
  const [artWorkDetailed, setArtWorkDetailed] = useState<ArtWorkT>(
    emptyArtWorkStructure,
  );
  const [isOnFavorites, setIsOnFavorites] = useState<boolean>(false);

  const checkIfOnFavorites = async (title: string) => {
    const result = await artWorkValidation(title);
    setIsOnFavorites(result);
  };

  useEffect(() => {
    getArtWork(route.params.id).then(res => {
      setArtWorkDetailed(res!);
      checkIfOnFavorites(res?.title!);
    });
  }, []);

  const handleSetFavorites = async () => {
    if (!isOnFavorites) {
      await saveFavoriteRecord({
        id: artWorkDetailed.id,
        title: artWorkDetailed.title,
        artistTitle: artWorkDetailed.artistTitle,
        imgCode: artWorkDetailed.img.imgCode,
      });
      checkIfOnFavorites(artWorkDetailed.title);
    } else {
      await rmvFavoriteRecord(artWorkDetailed.id);
      checkIfOnFavorites(artWorkDetailed.title);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Layout>
        {artWorkDetailed ? (
          <>
            <Image
              source={{
                uri: `${artWorkDetailed.img.baseUrl}/${artWorkDetailed.img.imgCode}/full/843,/0/default.jpg`,
              }}
              alt={artWorkDetailed.title}
              style={styles.image}
            />
            <View style={styles.detailsContainer}>
              <Text style={styles.title}>{artWorkDetailed.title}</Text>
              <Text style={styles.artist}>{artWorkDetailed.artistTitle}</Text>

              <TouchableOpacity
                onPress={handleSetFavorites}
                style={styles.button}>
                <Text style={styles.buttonText}>
                  {isOnFavorites ? 'Remove favorite' : 'Add to favorites'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={[styles.button, {marginTop: 10}]}>
                <Text style={styles.buttonText}>Go back</Text>
              </TouchableOpacity>
            </View>
          </>
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
      </Layout>
    </SafeAreaView>
  );
};

export default ArtWorkDetailed;
