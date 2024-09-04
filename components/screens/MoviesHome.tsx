import { AntDesign, Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MovieCard from "../MovieCard";

const emojisWithIcons = [
  { title: "now_playing" },
  { title: "popular" },
  { title: "top_rated" },
  { title: "upcoming" },
];

const MoviesHome = () => {
  const [movies, setMovies] = useState([]);
  const [moviesCate, setMoviesCate] = useState("now_playing");
  const [searchText, setSsearchText] = useState("");

  const getMovies = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${moviesCate}?api_key=b97f1c6678b72de3e513505f0c5126fa`
      );
      const data = await res.json();
      setMovies([...data.results]);
      console.log(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovies();
  }, [moviesCate]);

  const filteredMovies = movies.filter((item) =>
    item.title.includes(searchText)
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchAndDropdownContainer}>
        <TextInput
          placeholder="Search"
          placeholderTextColor="#A9A9A9"
          style={styles.searchInput}
          onChangeText={(text) => setSsearchText(text)}
        />
        <SelectDropdown
          data={emojisWithIcons}
          onSelect={(selectedItem, index) => {
            setMoviesCate(selectedItem.title);
          }}
          renderButton={(selectedItem, isOpened) => {
            return (
              <View style={styles.dropdownButtonStyle}>
                {selectedItem && (
                  <Icon
                    name={selectedItem.icon}
                    style={styles.dropdownButtonIconStyle}
                  />
                )}
                <Text style={styles.dropdownButtonTxtStyle}>
                  {(selectedItem && selectedItem.title) || "Select"}
                </Text>
                <Icon
                  name={isOpened ? "chevron-up" : "chevron-down"}
                  style={styles.dropdownButtonArrowStyle}
                />
              </View>
            );
          }}
          renderItem={(item, index, isSelected) => {
            return (
              <View
                style={{
                  ...styles.dropdownItemStyle,
                  ...(isSelected && { backgroundColor: "#1F1F1F" }),
                }}
              >
                <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
          dropdownStyle={styles.dropdownMenuStyle}
        />
      </View>
      <FlatList
        data={filteredMovies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MovieCard item={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default MoviesHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212", 
    padding: 16,
  },
  searchAndDropdownContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#1F1F1F",
    color: "#FFFFFF",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  dropdownButtonStyle: {
    width: 160,
    height: 45,
    backgroundColor: "#292929",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: "#E0E0E0",
  },
  dropdownButtonArrowStyle: {
    fontSize: 20,
    color: "#E0E0E0",
  },
  dropdownButtonIconStyle: {
    fontSize: 20,
    marginRight: 8,
    color: "#E0E0E0",
  },
  dropdownMenuStyle: {
    backgroundColor: "#292929",
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 15,
    fontWeight: "500",
    color: "#E0E0E0",
  },
});
