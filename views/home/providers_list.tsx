import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Box, Pressable, Text, useToast } from "native-base";
import randomColor from "randomcolor";
import { useEffect } from "react";
import useProviders from "../../hooks/use_providers";
import { AppNativeParamList } from "../../types";
import ItemsList from "./items_list";

const ProviderLogo = (title: string, id: string) => {
  const color = randomColor();
  const { navigate } =
    useNavigation<NativeStackNavigationProp<AppNativeParamList>>();

  const moveToProviderDetail = () => navigate("provider_detail", { id });

  return (
    <Pressable w="80%" h="80%" onPress={moveToProviderDetail}>
      <Box borderRadius="full" bgColor={color}>
        <Text
          fontSize="4xl"
          color="white"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
        >
          {title[0].toUpperCase()}
        </Text>
      </Box>
    </Pressable>
  );
};

const ProvidersList = () => {
  const { providers, isLoading, error } = useProviders(true);
  const toast = useToast();
  const { navigate } =
    useNavigation<NativeStackNavigationProp<AppNativeParamList>>();

  const moveToProviderCreate = () => navigate("provider_create");

  const data = providers.map((provider) => ({
    title: provider.name,
    image: ProviderLogo(provider.name, provider.id),
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
      title="Provedores"
      onAddClick={moveToProviderCreate}
    />
  );
};

export default ProvidersList;
