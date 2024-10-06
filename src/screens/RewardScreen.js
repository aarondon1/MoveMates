import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { getAllRewards } from '../libs/rewards';
import RewardCard from '../components/rewards';

export default function RewardScreen() {
    const [rewards, setRewards] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchRewards = async () => {
            try {
                const data = await getAllRewards();
                setRewards(data);
            } catch (error) {
                console.error('Error fetching rewards: ', error);
            } finally {
                setLoading(false);
            }
        };
        fetchRewards();
    }, []);

    const handleRewardPress = () => {
        Alert.alert("Redeemed", "Your reward has been redeemed!");
    };

    if (loading) {
        return <Text>Loading...</Text>;
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                {rewards.length > 0 ? (
                    rewards.map((reward, index) => (
                        <RewardCard
                            key={index}
                            reward={reward}
                            onPress={handleRewardPress} // Pass the function to handle card press
                        />
                    ))
                ) : (
                    <Text>No rewards found</Text>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
});
