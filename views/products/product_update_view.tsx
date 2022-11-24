import { View, Text, useToast, Box } from "native-base";
import { useEffect } from "react";
import useProducts from "../../hooks/use_products";
import { ProductWithProvider } from "../../types";
import ProductForm from "./product_form";

const ProductUpdateView = ({ route, navigation }: any) => {
  const { fetchProduct, currentProduct, error, isLoading } = useProducts(false);
  const toast = useToast();

  useEffect(() => {
    if (route.params.id) {
      fetchProduct(route.params.id);
    }
  }, [route.params.id]);

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

  if (!currentProduct) return <Text>Product not found...</Text>;

  return (
    <View px="4" py="3" h="100%">
      <Text fontSize="2xl">Actualizar producto</Text>

      <ProductForm
        product={currentProduct as ProductWithProvider | undefined}
      />
    </View>
  );
};

export default ProductUpdateView;
