import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { theme } from '../theme';

const RewardCard = ({ reward, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.cardContainer}>
      <Text style={styles.title}>{reward.title}</Text>
      <View style={styles.card}>
        <Image source={{ uri: reward.imageURL }} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.description}>{reward.description}</Text>
          <Text style={styles.cost}>{reward.cost.toString()} points</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Styles remain the same
const styles = StyleSheet.create({
  cardContainer: {
    margin: 10,
    alignItems: 'center',
  },
  card: {
    backgroundColor: theme.bg(1),
    borderRadius: 20,
    padding: 0,
    width: wp(60),
    height: hp(35),
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  infoContainer: {
    width: '100%',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    bottom: 0,
  },
  title: {
    color: theme.text,
    fontSize: wp(5),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    color: theme.text,
    fontSize: wp(4),
    textAlign: 'center',
    marginBottom: 5,
  },
  cost: {
    color: theme.text,
    fontSize: wp(4),
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default RewardCard;
