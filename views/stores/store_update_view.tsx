import { View, Text, useToast, Box } from "native-base";
import { useEffect } from "react";
import useStores from "../../hooks/use_stores";
import StoreForm from "./store_form";

const StoreUpdateView = ({ route, navigation }: any) => {
  const { fetchStore, currentStore, error, isLoading } = useStores(false);
  const toast = useToast();

  useEffect(() => {
    console.log("route.params.id", route.params.id);
    if (route.params.id) {
      fetchStore(route.params.id);
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

  if (!currentStore) return <Text>Store not found...</Text>;

  console.log(currentStore);

  return (
    <View px="4" py="3" h="100%">
      <Text fontSize="2xl">Acturalizar tienda</Text>

      <StoreForm store={currentStore} />
    </View>
  );
};

export default StoreUpdateView;
