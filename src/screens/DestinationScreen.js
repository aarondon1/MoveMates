// src/screens/DestinationScreen.js
import { View, Text, TouchableOpacity, ScrollView, Platform, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { ClockIcon, HeartIcon, MapPinIcon, SunIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../theme';
import { getAllChallenges } from '../libs/challenges';
import Map from '../components/Map'; // Import the Map component

const ios = Platform.OS == 'ios';
const topMargin = ios ? '' : 'mt-10';

export default function DestinationScreen(props) {
    const [challenges, setChallenges] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchChallenges = async () => {
            try {
                const data = await getAllChallenges();
                setChallenges(data);
            } catch (error) {
                console.error('Error fetching challenges: ', error);
            } finally {
                setLoading(false);
            }
        };

        fetchChallenges();
    }, []);

    if (loading) {
        return <Text>Loading...</Text>;
    }

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView showsVerticalScrollIndicator={false} className={"space-y-6 " + topMargin}>
                <View className="mx-5 flex-row justify-between items-center mb-10">
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ChevronLeftIcon size={30} color="black" />
                    </TouchableOpacity>
                    <Text style={{ fontSize: wp(7) }} className="font-bold text-neutral-700">Destination</Text>
                    <TouchableOpacity>
                        <HeartIcon size={30} color="red" />
                    </TouchableOpacity>
                </View>

                {/* Replace the image with the Map component */}
                <View style={{ height: hp(40) }}>
                    <Map />
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
                onPress={() => Alert.alert('Navigation Started', 'Follow the route to your destination!')}
            >
                <Text className="text-white font-bold" style={{ fontSize: wp(5.5) }}>Begin</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}