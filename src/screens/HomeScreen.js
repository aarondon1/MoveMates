import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, Platform, TextInput } from 'react-native';
import React, { useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import Categories from '../components/categories';
import SortCategories from '../components/sortCategories';
import Destinations from '../components/destinations';

const ios = Platform.OS == 'ios';
const topMargin = ios ? 'mt-3' : 'mt-10';

export default function HomeScreen() {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false} className={"space-y-6 " + topMargin}>
        {/* avatar */}
        <View className="mx-5 flex-row justify-between items-center mb-10">
          <Text style={{ fontSize: wp(7) }} className="font-bold text-neutral-700">Let's Discover</Text>
          <TouchableOpacity onPress={() => setMenuVisible(true)}>
            <Image source={require('../../assets/images/avatar.png')} style={{ height: wp(12), width: wp(12) }} />
          </TouchableOpacity>
        </View>

        

        {/* categories */}
        <View className="mb-4">
          <Categories />
        </View>

        {/* sort categories */}
        <View className="mb-4">
          <SortCategories />
        </View>

        {/* destinations */}
        <View>
          <Destinations />
        </View>
      </ScrollView>

      {/* Hamburger Menu */}
    </SafeAreaView>
  );
}