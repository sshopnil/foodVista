import { View, Text, ImageBackground, StyleSheet, Dimensions, SectionList, ActivityIndicator, Image } from 'react-native';
import SearchInput from './components/searchInput';
import { useEffect, useState } from 'react';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

const App = () => {
  const [input, setInput] = useState('');
  const [searchData, setSearchData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sectionData, setSectionData] = useState([]);

  const handleBtnClick = () => {
    if (!input || input.trim() === '') return;

    axios
      .get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`)
      .then((response) => {
        setSearchData(response.data);
      })
      .catch((error) => {
        console.error('API Error:', error);
      });
  };

  // Fetch food data when the app starts
  useEffect(() => {
    const categories = ['Beef', 'Chicken', 'Dessert'];

    const fetchData = async () => {
      try {
        const results = await Promise.all(
          categories.map((cat) =>
            axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`)
          )
        );

        const formattedData = results.map((res, idx) => ({
          title: categories[idx],
          data: res.data.meals,
        }));

        setSectionData(formattedData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={[styles.container, { flexDirection: 'column' }]}>
      <ImageBackground
        style={styles.headerBG}
        source={{ uri: 'https://tinyurl.com/4srt76z9' }}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>Welcome to FoodVista!</Text>
          <Text style={styles.subtitle}>Enjoy Premium Foods</Text>
          <SearchInput input={input} setInput={setInput} handleBtnClick={handleBtnClick} />
        </View>
      </ImageBackground>

      {isLoading ? (
        <ActivityIndicator size="large" color="#FF5722" style={{ marginTop: 20 }} />
      ) : (
        <SectionList
          style={{ flex: 2 }}
          sections={sectionData}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Image source={{uri:`${item?.strMealThumb}`}} style={{width:'100%', height: 200, borderRadius: 10}}/>
              <Text style={styles.itemText}>{item?.strMeal}</Text>
            </View>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionHeader}>{title}</Text>
          )}
        />
      )}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
  headerBG: {
    width: width,
    height: height * 0.3,
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    color: '#e3e3e3',
    fontSize: 18,
    textAlign: 'center',
    paddingBottom: 50,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 20,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#eee',
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  item: {
    flex:1,
    backgroundColor: '#ffeceb',
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 60,
    borderRadius: 8,
    alignItems:'center',
    width:'auto'
  },
  itemText: {
    fontSize: 20,
    color: '#333',
    fontWeight:'bold'
  },
});
