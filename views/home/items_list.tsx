import {
  Box,
  Center,
  HStack,
  Icon,
  IconButton,
  Pressable,
  ScrollView,
  Text,
} from "native-base";
import { ReactNode } from "react";
import { Ionicons } from "@expo/vector-icons";

interface Item {
  image: ReactNode;
  title: string;
}

interface ItemsListProps {
  list: Item[];
  title: string;
  onAddClick: () => void;
}

const ItemCard = (item: Item) => {
  return (
    <Center>
      <Box
        h="70"
        w="70"
        bg="white"
        rounded="md"
        justifyContent="center"
        alignItems="center"
        mr={1}
      >
        {item.image}
      </Box>
      <Text>{item.title}</Text>
    </Center>
  );
};

const ItemsList = ({ list, title, onAddClick }: ItemsListProps) => {
  return (
    <>
      <Text fontSize="xl" fontWeight="bold" mt="5" mb="3" ml="1">
        {title}
      </Text>

      <HStack space={3} justifyContent="center" alignItems="center">
        <ScrollView horizontal={true}>
          {list.map((item, key) => (
            <ItemCard {...item} key={`item-${key}`} />
          ))}
        </ScrollView>

        <Pressable onPress={onAddClick}>
          <Ionicons name="add-circle-outline" size={40} color="#CC2B5E" />
        </Pressable>
      </HStack>
    </>
  );
};

export default ItemsList;
