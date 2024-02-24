import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Redirect, useRouter } from 'expo-router';
import styles from './nearbyjobs.style';
import { COLORS } from '../../../constants';
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard';
import {useFetch} from '../../../hook/useFetch';

const Nearbyjobs = () => {
  const router = useRouter();
  const { data, isLoading, error } = useFetch(
    'search', {
      query: 'React Developer',
      num_pages: 1
    }
  );

  const handleCardPress = (item) => {
    navigation.navigate('job-details', { jobId: item.job_id });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby jobs</Text>
        <TouchableOpacity>
          <Text>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
      {
        isLoading ? (
          <ActivityIndicator size={'large'} color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong.</Text>
        ) : (
          data?.map((job) => (
            <TouchableOpacity key={`nearby-job-${job?.job_id}`} onPress={() => handleCardPress(job)}>
            <NearbyJobCard 
              job={job}
              handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
            />
            </TouchableOpacity>
          ))
        )
      }
      </View>
    </View>
  )
}

export default Nearbyjobs