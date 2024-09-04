import { createDrawerNavigator } from "@react-navigation/drawer";
import MoviesHome from "../components/screens/MoviesHome";
import MovieDetails from "../components/screens/MovieDetails";
import { routes } from "../utils/routes";
import MoviesFavScreen from "../components/screens/MoviesFavScreen";

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "black" },
        headerTitleStyle: { color: "white" },
        headerTintColor: "white",
      }}
    >
      <Drawer.Screen name={routes.moviesHome} component={MoviesHome} />
      <Drawer.Screen name={routes.moviesFav} component={MoviesFavScreen} />
    </Drawer.Navigator>
  );
}

export default MyDrawer;
