import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
  Alert,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { settings } from "@/constants/data";
import { useGlobalContext } from "@/lib/global-provider";
import { logout } from "@/lib/appwrite";
import { Link, router } from "expo-router";

interface SettingsItemProps {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  textStyle?: string;
  showArrow?: boolean;
  path?: string;
}

const SettigsItem = ({
  icon,
  title,
  onPress,
  textStyle,
  showArrow = true,
  path,
}: SettingsItemProps) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex flex-row items-center justify-between py-3"
  >
    <View className="flex flex-row items-center gap-3">
      <Image source={icon} className="size-6" />
      <Text className={`text-lg font-rubik-medium text-black-300 ${textStyle}`}>
        {title}
      </Text>
    </View>
    {showArrow && <Image source={icons.rightArrow} className="size-5" />}
  </TouchableOpacity>
);

const Profile = () => {
  const { user, refetch } = useGlobalContext();

  const handleLogout = async () => {
    const result = await logout();

    if (result) {
      Alert.alert("Success", "You have been logged out successfully");
      refetch();
    } else {
      Alert.alert("Error", "A error occured while logging out");
    }
  };

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-7"
      >
        <View className="flex flex-row items-center justify-between mt-5">
          <Text className="text-xl font-rubik-bold"></Text>
          <Image source={icons.bell} className="size-5" />
        </View>
        <View className="flex-row justify-center flex mt-5">
          <View className="flex flex-col items-center relative mt-5">
            <Image
              source={{ uri: user?.avatar }}
              className="size-44 relative rounded-full"
            />
            <TouchableOpacity className="absolute bottom-11 right-2">
              <Image source={icons.edit} className="size-9" />
            </TouchableOpacity>
            <Text className="text-2xl font-rubik-bold mt-2">{user?.name}</Text>
          </View>
        </View>

        <View className="flex flex-col mt-10">
          <SettigsItem
            icon={icons.calendar}
            title="My Bookings"
            onPress={() => {
              router.push("/screens/MyBookings");
            }}
          />
          <SettigsItem
            icon={icons.wallet}
            title="Payments"
            onPress={() => {
              router.push("/screens/Payments");
            }}
          />
        </View>

        <View className="flex flex-col mt-5 border-t pt-5 border-primary-200">
          {/* {settings.slice(2).map((item, index) => (
            <SettigsItem
              key={index}
              icon={item.icon}
              title={item.title}
              path={item.path} // Pass the path for navigation
            />
          ))} */}

          <SettigsItem
            icon={icons.person}
            title="Profile"
            onPress={() => {
              router.push("/screens/Account");
            }}
          />
          <SettigsItem
            icon={icons.bell}
            title="Notification"
            onPress={() => {
              router.push("/screens/Notifications");
            }}
          />
          <SettigsItem
            icon={icons.shield}
            title="Security"
            onPress={() => {
              router.push("/screens/Security");
            }}
          />
          <SettigsItem
            icon={icons.language}
            title="Language"
            onPress={() => {
              router.push("/screens/Language");
            }}
          />
          <SettigsItem
            icon={icons.info}
            title="Help Center"
            onPress={() => {
              router.push("/screens/HelpCenter");
            }}
          />
          <SettigsItem
            icon={icons.people}
            title="Invite Friends"
            onPress={() => {
              router.push("/screens/InviteFriends");
            }}
          />
        </View>

        {/* 
        {settings.map((item, index) => (
          <View key={index} className="flex flex-col  border-primary-200">
            <Link href={item.path as any}>
              <SettigsItem {...item} />
            </Link>
          </View>
        ))} */}

        <View className="flex flex-col mt-5 border-t pt-5 border-primary-200">
          <SettigsItem
            icon={icons.logout}
            title="Logout"
            textStyle="text-danger"
            showArrow={false}
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
