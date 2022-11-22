import { View, Text } from "native-base";
import StoreForm from "./store_form";

const StoreCreateView = () => {
  return (
    <View px="4" py="3" h="100%">
      <Text fontSize="2xl">Agregar una nueva tienda</Text>

      <StoreForm />
    </View>
  );
};

export default StoreCreateView;
