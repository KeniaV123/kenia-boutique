import { View, Text, useToast, Box } from "native-base";
import { useEffect } from "react";
import useProviders from "../../hooks/use_providers";
import ProviderForm from "./provider_form";

const StoreUpdateView = ({ route, navigation }: any) => {
  const { fetchProvider, currentProvider, error, isLoading } =
    useProviders(false);
  const toast = useToast();

  useEffect(() => {
    console.log("route.params.id", route.params.id);
    if (route.params.id) {
      fetchProvider(route.params.id);
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

  if (!currentProvider) return <Text>Provider not found...</Text>;

  console.log(currentProvider);

  return (
    <View px="4" py="3" h="100%">
      <Text fontSize="2xl">Actualizar proveedor</Text>

      <ProviderForm provider={currentProvider} />
    </View>
  );
};

export default StoreUpdateView;
