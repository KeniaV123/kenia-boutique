import {
  Box,
  Button,
  FormControl,
  Input,
  Stack,
  WarningOutlineIcon,
  Text,
  useToast,
  Select,
  CheckIcon,
} from "native-base";
import { useEffect, useState } from "react";
import uuid from "uuid-random";
import useStores from "../../hooks/use_stores";
import { AppNativeParamList, ProductWithProvider } from "../../types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import useProducts from "../../hooks/use_products";
import EmojiPicker from "rn-emoji-keyboard";

interface ProductFormProps {
  product?: ProductWithProvider;
}

const ProductForm = ({ product }: ProductFormProps) => {
  const [name, setName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const [stock, setStock] = useState(product?.stock || "");
  const [provider, setProvider] = useState(product?.provider?.id || "");
  const [sale_price, setSalePrice] = useState(product?.sale_price || "");
  const [original_price, setOriginalPrice] = useState(
    product?.original_price || ""
  );
  const { addProduct, isLoading, error, updateProduct, providers } =
    useProducts(false);
  const { replace } =
    useNavigation<NativeStackNavigationProp<AppNativeParamList>>();
  const toast = useToast();

  // Emoji stuff 🥶
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(product?.emoji || "🏪");

  const handleSubmit = async () => {
    if (product) {
      await updateProduct({
        id: product.id,
        name,
        description,
        stock: Number(stock),
        provider,
        sale_price: Number(sale_price),
        original_price: Number(original_price),
        emoji: selectedEmoji,
      });
      replace("product_detail", { id: product.id });
    } else {
      const newId = uuid();
      await addProduct({
        id: newId,
        name,
        description,
        stock: Number(stock),
        provider,
        sale_price: Number(sale_price),
        original_price: Number(original_price),
        emoji: selectedEmoji,
      });
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
      <Text fontSize="6xl" textAlign="center" onPress={() => setIsOpen(true)}>
        {selectedEmoji}
      </Text>

      <EmojiPicker
        onEmojiSelected={(emojiObj) => setSelectedEmoji(emojiObj.emoji)}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      />

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
          <FormControl.Label>Descripción</FormControl.Label>
          <Input
            type="text"
            value={description}
            onChangeText={setDescription}
            placeholder="Descripción"
            bgColor="white"
          />
        </Stack>
      </FormControl>

      <FormControl isRequired>
        <Stack mx="4">
          <FormControl.Label>Stock</FormControl.Label>
          <Input
            type="text"
            value={`${stock}`}
            onChangeText={setStock}
            placeholder="Stock"
            bgColor="white"
          />
        </Stack>
      </FormControl>

      <FormControl isRequired>
        <Stack mx="4">
          <FormControl.Label>Provedor</FormControl.Label>
          <Select
            selectedValue={provider}
            minWidth="200"
            accessibilityLabel="Choose Provider"
            placeholder="Provedor"
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />,
            }}
            mt={1}
            onValueChange={setProvider}
          >
            {providers.map((provider) => (
              <Select.Item label={provider.name} value={provider.id} />
            ))}
          </Select>
        </Stack>
      </FormControl>

      <FormControl isRequired>
        <Stack mx="4">
          <FormControl.Label>Precio de venta</FormControl.Label>
          <Input
            type="text"
            value={`${sale_price}`}
            onChangeText={setSalePrice}
            placeholder="Precio de venta"
            bgColor="white"
          />
        </Stack>
      </FormControl>

      <FormControl isRequired>
        <Stack mx="4">
          <FormControl.Label>Precio recomendado</FormControl.Label>
          <Input
            type="text"
            value={`${original_price}`}
            onChangeText={setOriginalPrice}
            placeholder="Precio recomendado"
            bgColor="white"
          />
        </Stack>
      </FormControl>

      <Box justifyContent="flex-end" mt="2" mx="3">
        <Button bgColor="#753A88" onPress={handleSubmit} disabled={isLoading}>
          <Text color="white">
            {product ? "Actualizar producto" : "Agregar producto"}
          </Text>
        </Button>
      </Box>
    </Box>
  );
};

export default ProductForm;
