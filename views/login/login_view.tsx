import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import {
  Input,
  NativeBaseProvider,
  Button,
  Icon,
  Box,
  Text,
  useToast,
} from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppNativeParamList } from "../../types";
import useFirebase from "../../hooks/use_firebase";
import useAuth from "../../hooks/use_auth";
import { AppContext } from "../../provider/app_provider";
import Card from "../../components/card";
import LoginForm from "./login_form";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { replace } =
    useNavigation<NativeStackNavigationProp<AppNativeParamList>>();
  const { login, error, currentUser } = useContext(AppContext);

  const submit = () => {
    login(email, password);
  };

  const handleInputchange = (value: string, key: string) => {
    if (key === "email") return setEmail(value);

    setPassword(value);
  };

  // TOAST stuff

  const toast = useToast();

  useEffect(() => {
    if (error)
      toast.show({
        description: error,
        render: () => {
          return (
            <Box bg="red.500" px="2" py="1" color="white" rounded="sm" mb={5}>
              {error}
            </Box>
          );
        },
      });
  }, [error]);

  useEffect(() => {
    console.log("currentUser", currentUser);
    if (currentUser) {
      console.log("navigate to home");
      replace("home");
    }
  }, [currentUser]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/background-1.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <Box marginX={8} marginTop={-5}>
          <Card>
            <Box alignItems="center">
              <Text fontSize="4xl" color="white">
                Iniciar sesión
              </Text>
            </Box>

            <LoginForm onChange={handleInputchange} {...{ password, email }} />

            {/* Button */}
            <View style={styles.buttonStyle}>
              <Button onPress={submit} bgColor="white" borderRadius={15}>
                <Text color="#AC316E">Iniciar sesión</Text>
              </Button>
            </View>
          </Card>
        </Box>

        <StatusBar style="auto" />
      </ImageBackground>
    </View>
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  buttonStyle: {
    marginTop: 30,
    marginLeft: 15,
    marginRight: 15,
  },
});
