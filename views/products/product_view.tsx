import { useEffect, useLayoutEffect } from "react";
import Details from "../../components/details";
import useStores from "../../hooks/use_stores";
import { Box, Button, Text, useToast } from "native-base";
import useProducts from "../../hooks/use_products";

const ProductView = ({ route, navigation }: any) => {
  const { id: productId } = route.params;
  const toast = useToast();

  const { currentProduct, isLoading, error, fetchProduct, deleteProduct } =
    useProducts(false);

  const removeStore = async () => {
    await deleteProduct(productId);
    navigation.replace("home");
  };

  useEffect(() => {
    if (productId) {
      fetchProduct(productId);
    }
  }, [fetchProduct, productId]);

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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          size="xs"
          bgColor="white"
          onPress={() =>
            navigation.navigate("product_update", { id: productId })
          }
        >
          <Text>Editar</Text>
        </Button>
      ),
    });
  }, [navigation]);

  if (!currentProduct && !isLoading) return <Text>404 Product not found</Text>;

  if (isLoading) return <Text>Loading...</Text>;

  if (!currentProduct) return <Text>Loading...</Text>;

  return (
    <Details
      image={currentProduct!.emoji}
      title={currentProduct!.name}
      subtitle={`$${currentProduct!.sale_price}`}
      description={`Disponible ${currentProduct?.stock || 0} unidades`}
      kind="Producto"
      onDelete={removeStore}
      onEdit={() => navigation.navigate("store_edit", { id: productId })}
    />
  );
};

export default ProductView;
