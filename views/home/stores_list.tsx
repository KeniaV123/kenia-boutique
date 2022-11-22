import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Box, Pressable, Text, useToast } from "native-base";
import randomColor from "randomcolor";
import { useEffect } from "react";
import useStores from "../../hooks/use_stores";
import { AppNativeParamList } from "../../types";
import ItemsList from "./items_list";

const StoreLogo = (title: string, id: string) => {
  const color = randomColor();
  const { navigate } =
    useNavigation<NativeStackNavigationProp<AppNativeParamList>>();

  const moveToStoreDetail = () => navigate("store_detail", { id });

  return (
    <Pressable w="80%" h="80%" onPress={moveToStoreDetail}>
      <Box borderRadius="full" bgColor={color}>
        <Text
          fontSize="4xl"
          color="white"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
        >
          {title[0].toUpperCase()}
        </Text>
      </Box>
    </Pressable>
  );
};

const StoresList = () => {
  const { stores, isLoading, error } = useStores(true);
  const toast = useToast();
  const { navigate } =
    useNavigation<NativeStackNavigationProp<AppNativeParamList>>();

  const moveToStoreCreate = () => navigate("store_create");

  const data = stores.map((store) => ({
    title: store.name,
    image: StoreLogo(store.name, store.id),
  }));

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

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <ItemsList list={data} title="Tiendas" onAddClick={moveToStoreCreate} />
  );
};

export default StoresList;
