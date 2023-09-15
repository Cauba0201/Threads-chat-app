import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = () => {
  return (
    <SafeAreaView style={{flex:1, backgroundColor:"white",alignItems:"center"}}>
      <View style={{marginTop: 50}}>
        <Text style={{fontSize:20,fontWeight: 500}}>LoginScreen</Text>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
