import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { theme } from "../theme";
import { getAllRewards } from "../libs/rewards"; // Import the function to get rewards

export default function Categories() {
  const [rewards, setRewards] = useState([]); // State to store the fetched rewards
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigation = useNavigation(); // Use the navigation hook

  // Fetch data on component mount
  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const data = await getAllRewards(); // Fetch rewards from Firestore
        setRewards(data); // Set the fetched data into state
      } catch (error) {
        console.error("Error fetching rewards: ", error);
        setError("Error fetching rewards"); // Store the error message
      } finally {
        setLoading(false); // Stop loading
      }
    };
    fetchRewards(); // Call the fetch function
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <Text style={{ fontSize: wp(4), fontWeight: 'bold' }}>Rewards</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Rewards')}>
          <Text style={{ fontSize: wp(4), color: theme.text }}>See all</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        contentContainerStyle={{ paddingHorizontal: 15 }}
        showsHorizontalScrollIndicator={false}
      >
        {rewards.length > 0 ? (
          rewards.map((reward, index) => (
            <TouchableOpacity key={index} style={{ alignItems: 'center', marginRight: 10 }}>
              <Image source={{ uri: reward.imageURL }} style={{ width: wp(30), height: hp(20), borderRadius: 15 }} />
              <Text style={{ marginTop: 5, fontSize: wp(3.5) }}>{reward.title}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text>No rewards found</Text>
        )}
      </ScrollView>
    </View>
  );
}