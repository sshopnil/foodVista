import { View, Text } from 'react-native';
import React from 'react';
import { ImageBackground } from 'react-native';
import { StyleSheet, Dimensions } from 'react-native';
import { TextInput, TouchableOpacity} from 'react-native';


const { width, height } = Dimensions.get('window');


const App = () => {
  return (
    <View
      style={[
        styles.container,
        {
          flexDirection: 'column',
        },
      ]}>
      <ImageBackground
        style={[styles.headerBG, styles.searchGroup]}
        source={{ uri: 'https://tinyurl.com/4srt76z9' }}
        resizeMode='cover'
      >
        <TextInput
          placeholder='serach here..'
        />
         <TouchableOpacity style={styles.searchBtn}>
          <Text style={styles}>Search</Text>
         </TouchableOpacity>
      </ImageBackground>

      <View style={{ flex: 2, backgroundColor: 'darkorange' }} />
      <View style={{ flex: 3, backgroundColor: 'green' }} />
    </View>
  );
};

export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0
  },
  headerBG: {
    width: width,
    height: height * 0.3,
  },
  searchGroup: {
    display: 'flex',
    flexDirection:'row',
    justifyContent:'space-around'
  },
  searchBtn: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignSelf:'center'
  },
  searchText: {
    color: 'white !important',
    fontWeight: 'bold',
  },
})
