import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Pressable,
  ImageBackground,
} from "react-native";
import {
  Text,
  Input,
  Button,
  Icon,
  Box,
  Image,
  AspectRatio,
  useToast,
} from "native-base";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppNativeParamList } from "../../types";
import useAuth from "../../hooks/use_auth";
import { AppContext } from "../../provider/app_provider";
import Card from "../../components/card";
import SignUpForm from "./signup_form";

const SignUpView = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signup, error, currentUser } = useContext(AppContext);
  const toast = useToast();

  const { replace } =
    useNavigation<NativeStackNavigationProp<AppNativeParamList>>();

  const submit = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
    } else {
      signup(email, password, userName);
    }
  };

  const handleInputchange = (value: string, key: string) => {
    if (key === "email") return setEmail(value);
    if (key === "password") return setPassword(value);
    if (key === "confirmPassword") return setConfirmPassword(value);

    setUserName(value);
  };

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
    if (currentUser) replace("home");
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
                Registrar
              </Text>
            </Box>

            <SignUpForm
              name={userName}
              onChange={handleInputchange}
              {...{ password, email, confirmPassword }}
            />

            {/* Button */}
            <View style={styles.buttonStyle}>
              <Button onPress={submit} bgColor="white" borderRadius={15}>
                <Text color="#AC316E">Crear cuenta</Text>
              </Button>
            </View>
          </Card>
        </Box>

        <StatusBar style="auto" />
      </ImageBackground>
    </View>
  );
};

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

export default SignUpView;
