import { StyleSheet, Text, View } from "react-native";
import { Input } from "native-base";

interface SignUpProps {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  onChange: (value: string, key: string) => void;
}

const SignUpForm = ({
  email,
  password,
  confirmPassword,
  name,
  onChange,
}: SignUpProps) => {
  return (
    <>
      {/* Username Input Field */}
      <View style={styles.buttonStyleX}>
        <View style={styles.emailInput}>
          <Input
            autoCapitalize="none"
            value={name}
            onChangeText={(value: string) => onChange(value, "name")}
            placeholder="Nombre de usuario"
            marginTop={5}
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

      {/* Email Input Field */}
      <View style={styles.buttonStyleX}>
        <View style={styles.emailInput}>
          <Input
            autoCapitalize="none"
            value={email}
            onChangeText={(value: string) => onChange(value, "email")}
            placeholder="Correo electrónico"
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
            autoCapitalize="none"
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

      {/* Password Input Field */}
      <View style={styles.buttonStyleX}>
        <View style={styles.emailInput}>
          <Input
            autoCapitalize="none"
            value={confirmPassword}
            onChangeText={(value: string) => onChange(value, "confirmPassword")}
            placeholder="Confirmar Contraseña"
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

export default SignUpForm;
