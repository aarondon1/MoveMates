// src/components/MileTracker.js
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MileTracker = () => {
  const [distance, setDistance] = useState(0);
  const [points, setPoints] = useState(0);
  const [lastPosition, setLastPosition] = useState(null);

  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      position => {
        const { latitude, longitude } = position.coords;
        if (lastPosition) {
          const distanceMoved = calculateDistance(
            lastPosition.latitude,
            lastPosition.longitude,
            latitude,
            longitude
          );
          setDistance(prevDistance => prevDistance + distanceMoved);
          if (distanceMoved >= 1) {
            setPoints(prevPoints => prevPoints + 1);
            savePoints(points + 1);
          }
        }
        setLastPosition({ latitude, longitude });
      },
      error => console.log(error),
      { enableHighAccuracy: true, distanceFilter: 10 }
    );

    return () => Geolocation.clearWatch(watchId);
  }, [lastPosition, points]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance * 0.621371; // Convert to miles
  };

  const savePoints = async (points) => {
    try {
      await AsyncStorage.setItem('points', points.toString());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Text>Distance: {distance.toFixed(2)} miles</Text>
      <Text>Points: {points}</Text>
    </View>
  );
};

export default MileTracker;