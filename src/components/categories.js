import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import React, { useState, useEffect } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { theme } from "../theme";
import { getAllRewards } from "../libs/rewards"; // Import the function to get rewards

export default function Categories() {
  const [rewards, setRewards] = useState([]); // State to store the fetched rewards
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch data on component mount
  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const data = await getAllRewards(); // Fetch rewards from Firestore
        setRewards(data); // Set the fetched data into state
      } catch (error) {
        console.error("Error fetching rewards: ", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchRewards(); // Call the fetch function
  }, []);

  // If loading, show a loading text (you can replace this with a loader/spinner)
  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View className="space-y-5">
      <View className="mx-5 flex-row justify-between items-center">
        <Text
          style={{ fontSize: wp(4) }}
          className="font-semibold text-neutral-700"
        >
          Rewards
        </Text>
        <TouchableOpacity>
          <Text style={{ fontSize: wp(4), color: theme.text }}>See all</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        contentContainerStyle={{ paddingHorizontal: 15 }}
        className="space-x-4"
        showsHorizontalScrollIndicator={false}
      >
        {rewards.length > 0 ? (
          rewards.map((reward, index) => (
            <TouchableOpacity
              key={index}
              className="flex items-center space-y-2"
            >
              <Image
                source={{ uri: reward.imageURL }} // Assuming `reward.image` is a URL
                className="rounded-3xl"
                style={{ width: wp(20), height: wp(19) }}
              />
              <Text
                className="text-neutral-700 font-medium"
                style={{ fontSize: wp(3) }}
              >
                {reward.title}
              </Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text>No rewards found</Text>
        )}
      </ScrollView>
    </View>
  );
}
