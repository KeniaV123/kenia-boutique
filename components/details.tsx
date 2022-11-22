import { Ionicons } from "@expo/vector-icons";
import { View, Text, IconButton, Box, Icon } from "native-base";
import Card from "./card";

interface DetailsProps {
  kind: string;
  image?: string;
  title: string;
  subtitle: string;
  description: string;
  showButton?: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onButtonPress?: () => void;
}

const Details = ({
  kind,
  image,
  title,
  subtitle,
  description,
  showButton = false,
  onEdit,
  onDelete,
  onButtonPress,
}: DetailsProps) => {
  return (
    <View px="4" py="3" position="relative" h="100%">
      <Text fontSize="2xl">{kind}</Text>

      <Card>
        {image && (
          <Text textAlign={"center"} fontSize="6xl">
            {image}
          </Text>
        )}

        <Text
          textAlign={"center"}
          fontSize="2xl"
          fontWeight="bold"
          mt="5"
          ml="1"
          color="white"
        >
          {title}
        </Text>

        <Text
          textAlign={"center"}
          fontSize="lg"
          fontWeight="bold"
          mt="5"
          ml="1"
          color="white"
        >
          {subtitle}
        </Text>

        <Text
          textAlign={"center"}
          fontSize="md"
          fontWeight="bold"
          mt="5"
          mb="3"
          ml="1"
          color="white"
        >
          {description}
        </Text>
      </Card>

      <IconButton
        icon={<Icon as={Ionicons} name="trash-sharp" size="lg" color="white" />}
        onPress={onDelete}
        position="absolute"
        bottom="10"
        right="15"
        rounded="5"
        bg="#753A88"
      />
    </View>
  );
};

export default Details;
