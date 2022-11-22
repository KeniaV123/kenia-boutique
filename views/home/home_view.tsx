import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Box, Divider } from "native-base";
import { useContext, useEffect } from "react";
import { AppContext } from "../../provider/app_provider";
import { AppNativeParamList } from "../../types";
import MainCarousel from "./main_carouse";
import StoresList from "./stores_list";
import ProductsList from "./products_list";
import ProvidersList from "./providers_list";

const HomeView = () => {
  const { replace } =
    useNavigation<NativeStackNavigationProp<AppNativeParamList>>();
  const { currentUser } = useContext(AppContext);

  useEffect(() => {
    if (!currentUser) replace("login");
  }, [currentUser]);
  return (
    <Box bgColor="gray.300" h="100%">
      <MainCarousel />

      <Box marginX="8">
        <Divider my="2" bgColor="#AFAFAF" />

        <StoresList />

        <ProductsList />

        <ProvidersList />
      </Box>
    </Box>
  );
};

export default HomeView;
