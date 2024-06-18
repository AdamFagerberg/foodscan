import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Button,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function DetailsScreen({ route, navigation, setPrevScans }) {
  const { product } = route.params;

  function handleRemove() {
    setPrevScans((prevScans) =>
      prevScans.filter((prevScan) => prevScan.code !== product.code)
    );

    navigation.navigate("Home");
  }

  return (
    <>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{ uri: product.image }}
          alt="Front"
        />
      </View>
      <View style={styles.productContainer}>
        <Text style={styles.title}>{product.product}</Text>
        <Text>{product.brands}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>{product.nutriscore}</Text>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.item}>
            <MaterialIcons name="energy-savings-leaf" size={30} color="black" />
            <Text style={styles.itemText}>{product.energy} kcal</Text>
          </View>
          <View style={styles.item}>
            <FontAwesome6 name="cubes-stacked" size={30} color="black" />
            <Text style={styles.itemText}>Sugar: {product.sugar} g</Text>
          </View>
          <View style={styles.item}>
            <MaterialCommunityIcons
              name="food-drumstick"
              size={30}
              color="black"
            />
            <Text style={styles.itemText}>Protein: {product.protein} g</Text>
          </View>
          <View style={styles.item}>
            <MaterialCommunityIcons
              name="shaker-outline"
              size={30}
              color="black"
            />
            <Text style={styles.itemText}>Salt: {product.salt} g</Text>
          </View>
          <View style={styles.item}>
            <FontAwesome5 name="bacon" size={30} color="black" />
            <Text style={styles.itemText}>Fat: {product.fat} g</Text>
          </View>
          <View style={styles.item}>
            <FontAwesome5 name="bacon" size={30} color="black" />
            <Text style={styles.itemText}>
              Saturated Fat: {product.satfat} g
            </Text>
          </View>
        </View>
        <Button title="Remove" onPress={handleRemove} />
      </View>
    </>
  );
}

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const styles = StyleSheet.create({
  imageContainer: {
    height: "30%",
    justifyContent: "center",
  },
  image: {
    width: width,
    height: height,
  },
  productContainer: {
    flex: 1,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 5,
  },
  ratingContainer: {
    height: 50,
    width: 50,
    borderRadius: "50%",
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  ratingText: {
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 25,
  },
  infoContainer: {
    flex: 1,
    flexDirection: "column",
    marginVertical: 20,
  },
  item: {
    flexDirection: "row",
    marginTop: 5,
  },
  itemText: {
    fontSize: 20,
    marginHorizontal: 15,
  },
});
