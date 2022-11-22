import { StyleSheet, Text, View } from "react-native";
import { Input, Icon } from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";
import { backgroundColor, borderColor } from "styled-system";

interface LoginFormProps {
  email: string;
  password: string;
  onChange: (value: string, key: string) => void;
}

const LoginForm = ({ email, password, onChange }: LoginFormProps) => {
  return (
    <>
      {/* Username or Email Input Field */}
      <View style={styles.buttonStyle}>
        <View style={styles.emailInput}>
          <Input
            autoCapitalize="none"
            value={email}
            onChangeText={(value: string) => onChange(value, "email")}
            placeholder="Nombre de usuario o correo electrónico"
            bgColor="white"
            color="#CC2B5E"
            placeholderTextColor="#CC2B5E"
            size="xl"
            borderRadius={15}
            _focus={{
              borderColor: "#CC2B5E",
              borderWidth: 2,
              borderRadius: 15,
            }}
          />
        </View>
      </View>

      {/* Password Input Field */}
      <View style={styles.buttonStyleX}>
        <View style={styles.emailInput}>
          <Input
            value={password}
            onChangeText={(value: string) => onChange(value, "password")}
            placeholder="Contraseña"
            type="password"
            bgColor="white"
            color="#CC2B5E"
            placeholderTextColor="#CC2B5E"
            size="xl"
            borderRadius={15}
            _focus={{
              borderColor: "#CC2B5E",
              borderWidth: 2,
              borderRadius: 15,
            }}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  emailField: {
    marginTop: 30,
    marginLeft: 15,
  },
  emailInput: {
    marginTop: 10,
    marginRight: 5,
  },
  buttonStyle: {
    marginTop: 30,
    marginLeft: 15,
    marginRight: 15,
  },
  buttonStyleX: {
    marginTop: 12,
    marginLeft: 15,
    marginRight: 15,
  },
});

export default LoginForm;
