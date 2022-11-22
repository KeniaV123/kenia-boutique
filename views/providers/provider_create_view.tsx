import { View, Text } from "native-base";
import ProviderForm from "./provider_form";

const ProviderCreateView = () => {
  return (
    <View px="4" py="3" h="100%">
      <Text fontSize="2xl">Agregar un nuevo provedor</Text>

      <ProviderForm />
    </View>
  );
};

export default ProviderCreateView;
