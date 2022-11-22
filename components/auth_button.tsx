import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, Text } from "native-base";
import { AppContext } from "../provider/app_provider";
import { AppNativeParamList } from "../types";

interface AuthButtonProps {
  type: "signin" | "signup";
}

const AuthButton = ({ type }: AuthButtonProps) => {
  const { replace } =
    useNavigation<NativeStackNavigationProp<AppNativeParamList>>();
  const { login, logout, currentUser } = useContext(AppContext);

  const publicText = type === "signin" ? "Sign Up" : "Sign In";

  const redirect = () => {
    if (type === "signin") return replace("signup");
    replace("login");
  };

  return currentUser ? (
    <Button size="xs" bgColor="white" onPress={logout}>
      <Text color="black">Log out</Text>
    </Button>
  ) : (
    <Button size="xs" onPress={redirect} bgColor="white" py="1">
      <Text color="black">{publicText}</Text>
    </Button>
  );
};

export default AuthButton;
