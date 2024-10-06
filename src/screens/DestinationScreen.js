import { View, Text, Image, TouchableOpacity, ScrollView, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { ClockIcon, HeartIcon, MapPinIcon, SunIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../theme';

import { getAllChallenges } from '../libs/challenges';

const ios = Platform.OS == 'ios';
const topMargin = ios ? '' : 'mt-10';

export default function DestinationScreen(props) {
    const item = props.route.params;
    const navigation = useNavigation();
    const [isFavourite, toggleFavourite] = useState(false);
    const [challenges, setChallenges] = useState([]);  // State to hold the fetched challenges
    const [loading, setLoading] = useState(true);  // Loading state

    useEffect(() => {
        const fetchChallenges = async () => {
            try {
                const data = await getAllChallenges();  // Fetch the challenges from Firestore
                setChallenges(data);  // Set the fetched data into state
            } catch (error) {
                console.error('Error fetching challenges: ', error);
            } finally {
                setLoading(false);  // Stop loading
            }
        };

        fetchChallenges();  // Call the fetch function
    }, []);

    // If loading, show a loading text (you can replace this with a loader/spinner)
    if (loading) {
        return <Text>Loading...</Text>;
    }

  return (
    <View className="bg-white flex-1">
        {/* Destination image */}
        {challenges.length > 0 && (
            <Image source={{ uri: challenges[0]?.imageURL }} style={{ width: wp(100), height: hp(55) }} />
        )}
        <StatusBar style={'light'} />

        {/* Back button */}
        <SafeAreaView className={"flex-row justify-between items-center w-full absolute " + topMargin}>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                className="p-2 rounded-full ml-4"
                style={{ backgroundColor: 'rgba(255,255,255,0.5)' }}
            >
                <ChevronLeftIcon size={wp(7)} strokeWidth={4} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => toggleFavourite(!isFavourite)}
                className="p-2 rounded-full mr-4"
                style={{ backgroundColor: 'rgba(255,255,255,0.5)' }}
            >
                <HeartIcon size={wp(7)} strokeWidth={4} color={isFavourite ? "red" : "white"} />
            </TouchableOpacity>
        </SafeAreaView>

        {/* Title & Description & Booking button */}
        <View style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }} className="px-5 flex flex-1 justify-between bg-white pt-8 -mt-14">
            <ScrollView showsVerticalScrollIndicator={false} className="space-y-5">
                <View className="flex-row justify-between items-start">
                    <Text style={{ fontSize: wp(7) }} className="font-bold flex-1 text-neutral-700">
                        {challenges.length > 0 ? challenges[0]?.title : "No Title"}
                    </Text>
                </View>
                <Text style={{ fontSize: wp(3.7) }} className="text-neutral-700 tracking-wide mb-2">
                    {challenges.length > 0 ? challenges[0]?.description : "No Description"}
                </Text>
                <View className="flex-row justify-between mx-1">
                    <View className="flex-row space-x-2 items-start">
                        <ClockIcon size={wp(7)} color="skyblue" />
                        <View className="flex space-y-2">
                            <Text style={{ fontSize: wp(4.5) }} className="font-bold text-neutral-700">
                                {challenges.length > 0 ? challenges[0]?.duration : "N/A"}
                            </Text>
                            <Text className="text-neutral-600 tracking-wide">Duration</Text>
                        </View>
                    </View>
                    <View className="flex-row space-x-2 items-start">
                        <MapPinIcon size={wp(7)} color="#f87171" />
                        <View className="flex space-y-2">
                            <Text style={{ fontSize: wp(4.5) }} className="font-bold text-neutral-700">
                                {challenges.length > 0 ? challenges[0]?.distance : "N/A"}
                            </Text>
                            <Text className="text-neutral-600 tracking-wide">Distance</Text>
                        </View>
                    </View>
                    <View className="flex-row space-x-2 items-start">
                        <SunIcon size={wp(7)} color="orange" />
                        <View className="flex space-y-2">
                            <Text style={{ fontSize: wp(4.5) }} className="font-bold text-neutral-700">
                                {challenges.length > 0 ? challenges[0]?.weather : "N/A"}
                            </Text>
                            <Text className="text-neutral-600 tracking-wide">Sunny</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity
                style={{ backgroundColor: theme.bg(0.8), height: wp(15), width: wp(50) }}
                className="mb-6 mx-auto flex justify-center items-center rounded-full"
            >
                <Text className="text-white font-bold" style={{ fontSize: wp(5.5) }}>Begin</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
}