import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import { HeartIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { getAllChallenges } from '../libs/challenges'; // Import the function

export default function Destinations() {
    const [challenges, setChallenges] = useState([]);  // State to hold the fetched data
    const [loading, setLoading] = useState(true);  // Loading state
    const navigation = useNavigation();

    // Fetch data on component mount
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
        <View className="mx-4 flex-row justify-between flex-wrap">
            {challenges.length > 0 ? (
                challenges.map((item, index) => {
                    return (
                        <DestinationCard navigation={navigation} item={item} key={index} />
                    );
                })
            ) : (
                <Text>No challenges found</Text>
            )}
        </View>
    );
}

const DestinationCard = ({ item, navigation }) => {
    const [isFavourite, toggleFavourite] = useState(false);
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('Destination', { ...item })}
            style={{ width: wp(44), height: wp(65) }}
            className="flex justify-end relative p-4 py-6 space-y-2 mb-5">
            <Image
                source={{ uri: item.imageURL }} 
                style={{ width: wp(44), height: wp(65), borderRadius: 35 }}
                className="absolute"
            />

            <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                style={{ width: wp(44), height: hp(15), borderBottomLeftRadius: 35, borderBottomRightRadius: 35 }}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                className="absolute bottom-0"
            />

            <TouchableOpacity
                onPress={() => toggleFavourite(!isFavourite)}
                style={{ backgroundColor: 'rgba(255,255,255,0.4)' }}
                className="absolute top-1 right-3 rounded-full p-3">
                <HeartIcon size={wp(5)} color={isFavourite ? "red" : "white"} />
            </TouchableOpacity>

            <Text style={{ fontSize: wp(4) }} className="text-white font-semibold">{item.title}</Text>
            <Text style={{ fontSize: wp(2.2) }} className="text-white">{item.shortDescription}</Text>
        </TouchableOpacity>
    );
};