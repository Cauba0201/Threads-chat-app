import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigator = useNavigation("");

  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password,
    };

    axios
      .post("http://localhost:3000/register", user)
      .then((response) => {
        console.log(response);
        Alert.alert(
          "Registeration successful",
          "you have been resgistered successfully"
        );
        setName("");
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        Alert.alert(
          "Resgistration failed",
          "An error occurred during resgistration"
        );
        console.log("error", error);
      });
      console.log(axios.isCancel('something'));
  };
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
      <View style={{ marginTop: 80, alignItems: "center" }}>
        <Image
          style={{ width: 100, height: 60, resizeMode: "contain" }}
          source={{
            uri: "https://freelogopng.com/images/all_img/1688663386threads-logo-transparent.png",
          }}
        />
      </View>
      <KeyboardAvoidingView>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 25 }}>
            Register to Your Account
          </Text>
        </View>

        <View style={{ marginTop: 40 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              borderRadius: 8,
              marginHorizontal: 10,
              marginVertical: 5,
            }}
          >
            <MaterialIcons
              name="account-circle"
              size={24}
              color="gray"
              style={{ marginLeft: 8 }}
            />
            <TextInput
              placeholder="Username"
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: name ? 16 : 16,
              }}
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              borderRadius: 8,
              marginHorizontal: 10,
              marginVertical: 5,
            }}
          >
            <MaterialIcons
              name="email"
              size={24}
              color="black"
              style={{ marginLeft: 8, color: "gray" }}
            />
            <TextInput
              placeholder="Enter your Email"
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: email ? 16 : 16,
              }}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              borderRadius: 8,
              marginHorizontal: 10,
              marginVertical: 5,
            }}
          >
            <FontAwesome
              name="lock"
              size={24}
              color="black"
              style={{ marginLeft: 8, color: "gray" }}
            />
            <TextInput
              secureTextEntry={true}
              placeholder="Enter your Password"
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: password ? 16 : 16,
              }}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginHorizontal: 10,
              marginTop: 10,
            }}
          >
            <Text>Keep me logged in</Text>
            <Text style={{ fontWeight: 500, color: "#007FFF" }}>
              Forgot Password
            </Text>
          </View>
        </View>

        <View style={{ marginTop: 45 }} />

        <Pressable
          onPress={handleRegister}
          style={{
            width: 200,
            backgroundColor: "black",
            padding: 15,
            marginTop: 40,
            marginLeft: "auto",
            marginRight: "auto",
            borderRadius: 6,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Register
          </Text>
        </Pressable>

        <Pressable
          style={{
            marginTop: 10,
            flexDirection: "row",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Text style={{ textAlign: "center", fontSize: 16 }}>
            Already have an account?
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              marginLeft: 5,
              fontWeight: 400,
              color: "#007FFF",
            }}
            onPress={() => navigator.goBack()}
          >
            Sign In
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
