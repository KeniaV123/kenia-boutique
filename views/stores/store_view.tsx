import { useEffect, useLayoutEffect } from "react";
import Details from "../../components/details";
import useStores from "../../hooks/use_stores";
import { Box, Button, Text, useToast } from "native-base";

const StoreView = ({ route, navigation }: any) => {
  const { id: storeId } = route.params;
  const toast = useToast();

  const { currentStore, isLoading, error, fetchStore, deleteStore } =
    useStores(false);

  const removeStore = async () => {
    await deleteStore(storeId);
    navigation.replace("home");
  };

  useEffect(() => {
    if (storeId) {
      fetchStore(storeId);
    }
  }, [fetchStore, storeId]);

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
          onPress={() => navigation.navigate("store_update", { id: storeId })}
        >
          <Text>Editar</Text>
        </Button>
      ),
    });
  }, [navigation]);

  if (!currentStore && !isLoading) return <Text>404 Store not found</Text>;

  if (isLoading) return <Text>Loading...</Text>;

  if (!currentStore) return <Text>Loading...</Text>;

  return (
    <Details
      title={currentStore!.name}
      subtitle={currentStore!.cellphone}
      description={currentStore.address}
      kind="Tienda"
      onDelete={removeStore}
      onEdit={() => navigation.navigate("store_edit", { id: storeId })}
    />
  );
};

export default StoreView;
