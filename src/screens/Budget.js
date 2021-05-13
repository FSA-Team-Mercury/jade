import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { client } from "../../App";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function Budget(props) {
  return (
    <View style={styles.container}>
      <View>
        {/* graph here */}
      </View>

      <View>
        {/* lower components */}
        <Text>Budget Screen</Text>
        <View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Single Budget")}
          >
            <View>
              <Text>Single Budget</Text>
              <MaterialCommunityIcons
                name="chevron-right"
                color={"#00A86B"}
                size={30}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Add Budget")}
          >
            <View>
              <Text>Add Budget</Text>
              <MaterialCommunityIcons
                name="chevron-right"
                color={"#00A86B"}
                size={30}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>

    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 100,
  }
});
