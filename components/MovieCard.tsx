import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { routes } from "../utils/routes";
import { useAppDispatch } from "../hooks/toolkitHooks";
import { toggleFav } from "../store/slices/FavsSlice";

const MovieCard = ({ item }) => {
  const navigate = useNavigation();
  const dispatch = useAppDispatch();

  return (
    <View className="bg-gray-800 rounded-lg mb-4 p-2">
      <TouchableWithoutFeedback
        onPress={() => {
          // @ts-ignore
          navigate.navigate(routes.movieDetails, item);
        }}
      >
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
          className="rounded-lg"
          width={300}
          height={200}
        />
      </TouchableWithoutFeedback>
      <View className="flex-row justify-between items-center mt-2 px-4">
        <Text className="text-white font-bold">{item.title}</Text>
        <TouchableOpacity>
          <AntDesign
            name="hearto"
            size={24}
            color="white"
            onPress={(e) => {
              e.stopPropagation();
              dispatch(toggleFav(item));
              console.log("pressed");
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MovieCard;
