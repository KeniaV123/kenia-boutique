import { View, Text } from "native-base";
import ProductForm from "./product_form";

const ProductCreateView = () => {
  return (
    <View px="4" py="3" h="100%">
      <Text fontSize="2xl">Agregar un nuevo producto</Text>

      <ProductForm />
    </View>
  );
};

export default ProductCreateView;
