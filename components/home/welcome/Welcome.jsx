import {useState} from 'react';
import { View, Text, TextInput, SafeAreaView, TouchableOpacity, Image, FlatList } from 'react-native'
import { useRouter } from 'expo-router';
import styles from './welcome.style';
import { icons, SIZES } from '../../../constants';


const jobTypes = ["Full-time", "Part-time", "Contractor"];

const Welcome = ({ searchTerm, setSearchTerm, handleClick }) => {

  const router = useRouter();
  const [activeJobtype, setActiveJobType] = useState("Full-time");


  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello John!</Text>
        <Text style={styles.welcomeMessage}>Find your perfect job</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput 
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
            placeholder='What are you looking for?'
          />
        </View>

        <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
          <Image 
            source={icons.search}
            resizeMode='contain'
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>

      <SafeAreaView style={styles.tabsContainer}>
        <FlatList 
          data={jobTypes} 
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(activeJobtype, item)}
              onPress={() => {
                setActiveJobType(item)
                router.push(`/search/${item}`)
              }}
              >
              <Text style={styles.tabText(activeJobtype, item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
        />
      </SafeAreaView>
    </View>
  )
}

export default Welcome