import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";

export default function HomeScreen({ navigation, prevScans, setPrevScans }) {
  const Item = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          navigation.navigate("Details", { product: item, setPrevScans })
        }
      >
        <Image style={styles.image} source={{ uri: item.image }} alt="Front" />
        <Text style={styles.rating}>{item.nutriscore}</Text>
        <Text style={styles.title}>{item.product}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ gap: 10, paddingHorizontal: 12 }}
        contentContainerStyle={{ gap: 10, paddingBottom: 20 }}
        numColumns={2}
        data={prevScans}
        keyExtractor={(item) => item.code}
        renderItem={Item}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    shadowColor: "grey",
    shadowOffset: { height: 1, width: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 2,
  },
  item: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    height: 200,
    borderRadius: 20,
    overflow: "hidden",
    textAlign: "center",
    maxWidth: "49%",
  },
  image: {
    position: "relative",
    height: "50%",
    width: "100%",
    resizeMode: "cover",
  },
  rating: {
    width: 50,
    height: 50,
    backgroundColor: "black",
    overflow: "hidden",
    borderRadius: "25%",
    padding: 10,
    textAlign: "center",
    color: "white",
    textTransform: "uppercase",
    fontSize: 25,
    position: "absolute",
    right: 0,
    top: 0,
    margin: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    marginHorizontal: 20,
  },
});
