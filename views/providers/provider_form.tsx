import {
  Box,
  Button,
  FormControl,
  Input,
  Stack,
  WarningOutlineIcon,
  Text,
  useToast,
} from "native-base";
import { useEffect, useState } from "react";
import uuid from "uuid-random";
import { AppNativeParamList, Store } from "../../types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Provider } from "../../types/crud";
import useProviders from "../../hooks/use_providers";

interface ProviderFormProps {
  provider?: Provider;
}

const ProviderForm = ({ provider }: ProviderFormProps) => {
  const [name, setName] = useState(provider?.name || "");
  const [cellphone, setCellphone] = useState(provider?.cellphone || "");
  const [address, setAddress] = useState(provider?.address || "");
  const { createProvider, isLoading, error, updateProvider } =
    useProviders(false);
  const { replace } =
    useNavigation<NativeStackNavigationProp<AppNativeParamList>>();
  const toast = useToast();

  const handleSubmit = async () => {
    if (provider) {
      await updateProvider({ id: provider.id, name, cellphone, address });
      replace("provider_detail", { id: provider.id });
    } else {
      const newId = uuid();
      await createProvider({ id: newId, name, cellphone, address });
      replace("home");
    }
  };

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

  return (
    <Box>
      <FormControl isRequired>
        <Stack mx="4">
          <FormControl.Label>Nombre</FormControl.Label>
          <Input
            type="text"
            value={name}
            onChangeText={setName}
            placeholder="Nombre"
            bgColor="white"
          />
        </Stack>
      </FormControl>

      <FormControl isRequired>
        <Stack mx="4">
          <FormControl.Label>Telefono</FormControl.Label>
          <Input
            type="text"
            value={cellphone}
            onChangeText={setCellphone}
            placeholder="Telefono"
            bgColor="white"
          />
        </Stack>
      </FormControl>

      <FormControl isRequired>
        <Stack mx="4">
          <FormControl.Label>Domicilio</FormControl.Label>
          <Input
            type="text"
            value={address}
            onChangeText={setAddress}
            placeholder="Domicilio"
            bgColor="white"
          />
        </Stack>
      </FormControl>

      <Box justifyContent="flex-end" mt="2" mx="3">
        <Button bgColor="#753A88" onPress={handleSubmit} disabled={isLoading}>
          <Text color="white">
            {provider ? "Actualizar provedor" : "Agregar provedor"}
          </Text>
        </Button>
      </Box>
    </Box>
  );
};

export default ProviderForm;
