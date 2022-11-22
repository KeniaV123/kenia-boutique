import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Box, Pressable, Text, useToast } from "native-base";
import randomColor from "randomcolor";
import { useEffect } from "react";
import useProducts from "../../hooks/use_products";
import useStores from "../../hooks/use_stores";
import { AppNativeParamList } from "../../types";
import ItemsList from "./items_list";

const ProductLogo = (emoji: string, id: string) => {
  const color = randomColor();
  const { navigate } =
    useNavigation<NativeStackNavigationProp<AppNativeParamList>>();

  const moveToProductDetail = () => navigate("product_detail", { id });

  return (
    <Pressable w="80%" h="80%" onPress={moveToProductDetail}>
      <Box borderRadius="full" bgColor={color}>
        <Text
          fontSize="4xl"
          color="#753A88"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
        >
          {emoji}
        </Text>
      </Box>
    </Pressable>
  );
};

const ProductsList = () => {
  const { products, isLoading, error } = useProducts(true);
  const toast = useToast();
  const { navigate } =
    useNavigation<NativeStackNavigationProp<AppNativeParamList>>();

  const moveToProductCreate = () => navigate("product_create");

  const data = products.map((product) => ({
    title: product.name,
    image: ProductLogo(product.emoji, product.id),
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
    <ItemsList
      list={data}
      title="Inventario"
      onAddClick={moveToProductCreate}
    />
  );
};

export default ProductsList;
