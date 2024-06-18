import { StyleSheet, View, Button, Text } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function CameraScreen({ navigation, setPrevScans }) {
  const [permission, requestPermission] = useCameraPermissions();
  const facing = "back";

  const handleBarCodeScanned = ({ data }) => {
    navigation.navigate("Fetch", {
      barcode: data,
      setPrevScans,
    });
  };

  const renderCamera = () => {
    return (
      <View style={styles.container}>
        <CameraView
          style={styles.camera}
          facing={facing}
          flash={"auto"}
          onBarcodeScanned={handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["ean13", "upc_a", "upc_e"],
          }}
        />
      </View>
    );
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View>
        <Text>We need your permission to use the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return <View style={styles.container}>{renderCamera()}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  button: {
    backgroundColor: "blue",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
});
