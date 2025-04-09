import { View, Text } from 'react-native';
import { ImageBackground } from 'react-native';
import { StyleSheet, Dimensions } from 'react-native';
import SearchInput from './components/searchInput';


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
        style={styles.headerBG}
        source={{ uri: 'https://tinyurl.com/4srt76z9' }}
        resizeMode='cover'
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>Welcome to FoodVista!</Text>
          <Text style={styles.subtitle}>Enjoy Premium Foods</Text>
          <SearchInput />
        </View>
      </ImageBackground>

      <View style={{ flex: 2, backgroundColor: 'darkorange' }} />
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
    justifyContent: 'center'
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight:'bold',
    textAlign:'center'
  },
  subtitle:{
    color:'#e3e3e3',
    fontSize: 18,
    textAlign:'center',
    paddingBottom: 50
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignContent:'center',
    justifyContent:'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding:20
  },
})
