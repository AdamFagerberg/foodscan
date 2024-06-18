import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function FetchScreen({ route, setPrevScans, navigation }) {
  const [data, setData] = useState(null);
  const { barcode } = route.params;

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://us.openfoodfacts.org/api/v0/product/${barcode}.json`
      );
      const result = await response.json();

      const productData = {
        code: result.code,
        product: result.product.product_name,
        allergens: result.product.allergens,
        brands: result.product.brands,
        ecoscore_grade: result.product.ecoscore_grade,
        nutriscore: result.product.nutriscore_grade,
        image: result.product.image_front_url,
        energy: result.product.nutriments["energy-kcal"],
        sugar: result.product.nutriments.sugars,
        protein: result.product.nutriments.proteins,
        salt: result.product.nutriments.salt,
        fat: result.product.nutriments.fat,
        satfat: result.product.nutriments["saturated-fat"],
      };
      setData(productData);
      setPrevScans((prevScans) => [...prevScans, productData]);
    }

    fetchData();
  }, []);

  return (
    <>
      {data ? (
        <>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{ uri: data.image }}
              alt="Front"
            />
          </View>
          <View style={styles.productContainer}>
            <Text style={styles.title}>{data.product}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>{data.nutriscore}</Text>
            </View>
            <View style={styles.infoContainer}>
              <View style={styles.item}>
                <MaterialIcons
                  name="energy-savings-leaf"
                  size={30}
                  color="black"
                />
                <Text style={styles.itemText}>{data.energy} kcal</Text>
              </View>
              <View style={styles.item}>
                <FontAwesome6 name="cubes-stacked" size={30} color="black" />
                <Text style={styles.itemText}>Sugar: {data.sugar} g</Text>
              </View>
              <View style={styles.item}>
                <MaterialCommunityIcons
                  name="food-drumstick"
                  size={30}
                  color="black"
                />
                <Text style={styles.itemText}>Protein: {data.protein} g</Text>
              </View>
              <View style={styles.item}>
                <MaterialCommunityIcons
                  name="shaker-outline"
                  size={30}
                  color="black"
                />
                <Text style={styles.itemText}>Salt: {data.salt} g</Text>
              </View>
              <View style={styles.item}>
                <FontAwesome5 name="bacon" size={30} color="black" />
                <Text style={styles.itemText}>Fat: {data.fat} g</Text>
              </View>
              <View style={styles.item}>
                <FontAwesome5 name="bacon" size={30} color="black" />
                <Text style={styles.itemText}>
                  Saturated Fat: {data.satfat} g
                </Text>
              </View>
            </View>
          </View>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
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
    marginBottom: 10,
  },
  ratingContainer: {
    height: 50,
    width: 50,
    borderRadius: "50%",
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
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
    marginVertical: 10,
  },
  itemText: {
    fontSize: 20,
    marginHorizontal: 15,
  },
});
