import { LinearGradient } from "expo-linear-gradient";
import { Box } from "native-base";
import { StyleSheet } from "react-native";

interface CardProps {
  children: React.ReactNode;
  paddingY?: number;
  paddingX?: number;
}

const Card = ({ children, paddingY = 60, paddingX = 20 }: CardProps) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      color: "white",
    },
    linearGradient: {
      borderRadius: 5,
      color: "white",
      paddingVertical: paddingY,
      paddingHorizontal: paddingX,
    },
  });

  return (
    <LinearGradient
      colors={["#CC2B5E", "#753A88"]}
      style={styles.linearGradient}
    >
      <Box>{children}</Box>
    </LinearGradient>
  );
};

export default Card;
