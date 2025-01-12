import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Dimensions } from "react-native";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { facilities } from "@/constants/data";
import { getPropertyById } from "@/lib/appwrite";
import { useAppwrite } from "@/lib/useAppwrite";
import { ID } from "react-native-appwrite";

const Property = () => {
  const { id } = useLocalSearchParams<{ id?: string }>();

  const windowHeight = Dimensions.get("window").height;

  const { data: property } = useAppwrite({
    fn: getPropertyById,
    params: {
      id: id!,
    },
  });
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* <Text>Property {id}</Text> */}
      <View
        className="relative w-full h-1/3"
        style={{ height: windowHeight / 2 }}
      >
        <Image source={images.japan} className="size-full contain" />
      </View>

      <View className="absolute flex flex-row justify-between items-center p-4">
        <TouchableOpacity onPress={() => router.back()}>
          <Image source={icons.backArrow} className="size-7" />
        </TouchableOpacity>
        <View className="relative right-[-250px] flex flex-row items-center gap-3">
          <Image
            source={icons.heart}
            className="size-7"
            tintColor={"#191D31"}
          />
          <Image source={icons.send} className="size-7" />
        </View>
      </View>

      <View className="details flex flex-col py-5 px-7 gap-3 w-full my-3">
        <Text className="font-rubik-bold text-2xl">{property?.name}</Text>
        <View className="flex flex-row justify-start items-center mb-2">
          <Text className="font-rubik-medium text-xs uppercase w-3/12 text-primary-300">
            {property?.type}
          </Text>
          <View className="flex flex-row items-center gap-2">
            <Image source={icons.star} />
            <Text className="text-black-200 font-rubik">4.5 (12 Reviews) </Text>
          </View>
        </View>
        <View className="flex flex-row justify-between items-center">
          <View className="flex flex-row items-center gap-5">
            <Image source={icons.bed} className="size-6" />
            <Text className="font-rubik-medium">8 Bed</Text>
          </View>
          <View className="flex flex-row items-center gap-5">
            <Image source={icons.bath} className="size-6" />
            <Text className="font-rubik-medium">3 Bath</Text>
          </View>
          <View className="flex flex-row items-center gap-5">
            <Image source={icons.area} className="size-6" />
            <Text className="font-rubik-medium">2000 Sqft</Text>
          </View>
        </View>
      </View>

      <View className="w-full border-t border-primary-200 p-7 mt-5">
        <Text className="text-xl font-rubik-bold">Agent</Text>
        <View className="flex flex-row items-center justify-between mt-3">
          <View className="flex flex-row items-center justify-evenly">
            <Image source={images.avatar} className="size-16" />
            <View className="flex flex-col justify-center ml-3">
              <Text className="text-lg font-rubik-bold">John Martin</Text>
              <Text className="font-rubik-light">Owner</Text>
            </View>
          </View>
          <View className="flex flex-row justify-center items-center gap-3 ml-3">
            <Image source={icons.chat} className="size-8" />
            <Image source={icons.phone} className="size-8" />
          </View>
        </View>
      </View>

      <View className="w-full border-t border-primary-200 p-7 mt-5">
        <Text className="text-xl font-rubik-bold">Overview</Text>
        <Text className="text-black-200 text-lg font-rubik mt-3">
          Sleek, modern 2-bedroom apartment with open living space, high-end
          finishes, and city views. Minutes from downtown, dining, and transit.
        </Text>
      </View>

      <View className="m-7">
        <Text className="text-xl font-rubik-bold">Facilites</Text>
        <View>
          {property?.facilities.map((item: string, index: number) => {
            const facilityData = facilities.find(
              (facility) => facility.title == item
            );

            return (
              <View key={index} className="mt-5">
                <View className="size-14 bg-primary-100 rounded-full flex items-center justify-center">
                  <Image
                    source={facilityData ? facilityData.icon : icons.info}
                    className="size-6"
                  />
                </View>
                <Text>{facilityData?.title}</Text>
              </View>
            );
          })}
        </View>
      </View>

      
    </ScrollView>
  );
};

export default Property;
