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
import useStores from "../../hooks/use_stores";
import { AppNativeParamList, Store } from "../../types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface StoreFormProps {
  store?: Store;
}

const StoreForm = ({ store }: StoreFormProps) => {
  const [name, setName] = useState(store?.name || "");
  const [cellphone, setCellphone] = useState(store?.cellphone || "");
  const [address, setAddress] = useState(store?.address || "");
  const { createStore, isLoading, error, updateStore } = useStores(false);
  const { replace } =
    useNavigation<NativeStackNavigationProp<AppNativeParamList>>();
  const toast = useToast();

  // Emoji stuff 🥶
  // const [isOpen, setIsOpen] = useState(false);
  // const [selectedEmoji, setSelectedEmoji] = useState(store?.emoji || '🏪');

  const handleSubmit = async () => {
    if (store) {
      await updateStore({ id: store.id, name, cellphone, address });
      replace("store_detail", { id: store.id });
    } else {
      const newId = uuid();
      await createStore({ id: newId, name, cellphone, address });
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
            {store ? "Actualizar tienda" : "Agregar tienda"}
          </Text>
        </Button>
      </Box>
    </Box>
  );
};

export default StoreForm;
