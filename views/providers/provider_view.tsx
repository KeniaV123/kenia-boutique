import { useEffect, useLayoutEffect } from "react";
import Details from "../../components/details";
import { Box, Button, Text, useToast } from "native-base";
import useProviders from "../../hooks/use_providers";

const ProviderView = ({ route, navigation }: any) => {
  const { id: providerId } = route.params;
  const toast = useToast();

  const { currentProvider, isLoading, error, fetchProvider, deleteProvider } =
    useProviders(false);

  const removeProvider = async () => {
    await deleteProvider(providerId);
    navigation.replace("home");
  };

  useEffect(() => {
    if (providerId) {
      fetchProvider(providerId);
    }
  }, [fetchProvider, providerId]);

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
            navigation.navigate("provider_update", { id: providerId })
          }
        >
          <Text>Editar</Text>
        </Button>
      ),
    });
  }, [navigation]);

  if (!currentProvider && !isLoading)
    return <Text>404 Provider not found</Text>;

  if (isLoading) return <Text>Loading...</Text>;

  if (!currentProvider) return <Text>Loading...</Text>;

  return (
    <Details
      title={currentProvider!.name}
      subtitle={currentProvider!.cellphone}
      description={currentProvider.address}
      kind="Provedor"
      onDelete={removeProvider}
      onEdit={() => navigation.navigate("provider_edit", { id: providerId })}
    />
  );
};

export default ProviderView;
