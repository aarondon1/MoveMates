import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { theme } from '../theme';

const RewardCard = ({ reward }) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.title}>{reward.title}</Text>
      <View style={styles.card}>
        <Image source={{ uri: reward.imageURL }} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.description}>{reward.description}</Text>
          <Text style={styles.cost}>{reward.cost.toString()} points</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    margin: 10,
    alignItems: 'center',
  },
  card: {
    backgroundColor: theme.bg(1),
    borderRadius: 20,
    padding: 10,
    width: wp(80), // Increased width to make the card more horizontal
    height: hp(20), // Decreased height to make the card more horizontal
    flexDirection: 'row', // Arrange children in a row
    alignItems: 'center',
  },
  image: {
    width: wp(30), // Adjusted width for the image
    height: '100%', // Make the image take the full height of the card
    borderRadius: 10,
    marginRight: 10, // Add margin to create space between image and text
  },
  infoContainer: {
    flex: 1, // Take up the remaining space
    justifyContent: 'center',
  },
  title: {
    color: theme.text,
    fontSize: wp(5),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10, // Add margin to create space between title and card
  },
  description: {
    color: theme.text,
    fontSize: wp(4),
    textAlign: 'left',
    marginBottom: 5,
  },
  cost: {
    color: theme.text,
    fontSize: wp(4),
    fontWeight: 'bold',
    textAlign: 'left',
  },
});

export default RewardCard;