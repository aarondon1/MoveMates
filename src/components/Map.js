import React from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const Map = ({ location }) => {
  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        mapType="mutedStandard"
        initialRegion={location}
        showsUserLocation={true}
      >
      </MapView>
    </View>
  );
};

export default Map;