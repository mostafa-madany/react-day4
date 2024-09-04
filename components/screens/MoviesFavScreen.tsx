import { View, Text } from "react-native";
import React from "react";
import { useAppSelector } from "../../hooks/toolkitHooks";
import { FlatList } from "react-native-gesture-handler";
import MovieCard from "../MovieCard";

const MoviesFavScreen = () => {
  const favMovies = useAppSelector((state) => state.favs.favs);

  console.log(favMovies);

  return (
    <View className="flex-1 bg-black p-4">
      <FlatList
        data={favMovies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MovieCard item={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default MoviesFavScreen;
