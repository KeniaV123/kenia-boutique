import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import AuthButton from "../components/auth_button";
import { AppNativeParamList } from "../types";
import {
  LoginView,
  SignUpView,
  HomeView,
  StoreView,
  StoreCreateView,
  StoreUpdateView,
  ProductView,
  ProductCreateView,
  ProductUpdateView,
  ProviderView,
  ProviderCreateView,
  ProviderUpdateView,
} from "../views";

const AppStack = createNativeStackNavigator<AppNativeParamList>();

const AppNavigator = () => (
  <NavigationContainer>
    <AppStack.Navigator>
      <AppStack.Screen
        name="login"
        component={LoginView}
        options={{
          title: "Login",
          headerTitle: "Kenia Boutique",
          headerBackground: () => (
            <LinearGradient
              colors={["#CC2B5E", "#753A88"]}
              style={{ flex: 1 }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          ),
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerRight: () => <AuthButton type="signin" />,
        }}
      />
      <AppStack.Screen
        name="signup"
        component={SignUpView}
        options={{
          headerTitle: "Kenia Boutique",
          headerBackground: () => (
            <LinearGradient
              colors={["#CC2B5E", "#753A88"]}
              style={{ flex: 1 }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          ),
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerRight: () => <AuthButton type="signup" />,
        }}
      />
      <AppStack.Screen
        name="home"
        component={HomeView}
        options={{
          headerTitle: "Kenia Boutique",
          headerBackground: () => (
            <LinearGradient
              colors={["#CC2B5E", "#753A88"]}
              style={{ flex: 1 }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          ),
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerRight: () => <AuthButton type="signup" />,
        }}
      />

      {/* ---------------------------------------------------- */}
      {/* ------------------     STORES     ------------------- */}
      {/* ---------------------------------------------------- */}

      <AppStack.Screen
        name="store_detail"
        component={StoreView}
        options={{
          headerTitle: "Detalle de tienda",
          headerBackground: () => (
            <LinearGradient
              colors={["#CC2B5E", "#753A88"]}
              style={{ flex: 1 }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          ),
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />

      <AppStack.Screen
        name="store_create"
        component={StoreCreateView}
        options={{
          headerTitle: "Crear tienda",
          headerBackground: () => (
            <LinearGradient
              colors={["#CC2B5E", "#753A88"]}
              style={{ flex: 1 }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          ),
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />

      <AppStack.Screen
        name="store_update"
        component={StoreUpdateView}
        options={{
          headerTitle: "Editar tienda",
          headerBackground: () => (
            <LinearGradient
              colors={["#CC2B5E", "#753A88"]}
              style={{ flex: 1 }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          ),
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />

      {/* ---------------------------------------------------- */}
      {/* ------------------     PRODUCTS     ------------------- */}
      {/* ---------------------------------------------------- */}

      <AppStack.Screen
        name="product_detail"
        component={ProductView}
        options={{
          headerTitle: "Detalle de producto",
          headerBackground: () => (
            <LinearGradient
              colors={["#CC2B5E", "#753A88"]}
              style={{ flex: 1 }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          ),
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />

      <AppStack.Screen
        name="product_create"
        component={ProductCreateView}
        options={{
          headerTitle: "Crear producto",
          headerBackground: () => (
            <LinearGradient
              colors={["#CC2B5E", "#753A88"]}
              style={{ flex: 1 }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          ),
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />

      <AppStack.Screen
        name="product_update"
        component={ProductUpdateView}
        options={{
          headerTitle: "Editar producto",
          headerBackground: () => (
            <LinearGradient
              colors={["#CC2B5E", "#753A88"]}
              style={{ flex: 1 }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          ),
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />

      {/* ---------------------------------------------------- */}
      {/* ------------------     PROVIDERS     ------------------- */}
      {/* ---------------------------------------------------- */}

      <AppStack.Screen
        name="provider_detail"
        component={ProviderView}
        options={{
          headerTitle: "Detalle de proveedor",
          headerBackground: () => (
            <LinearGradient
              colors={["#CC2B5E", "#753A88"]}
              style={{ flex: 1 }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          ),
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />

      <AppStack.Screen
        name="provider_create"
        component={ProviderCreateView}
        options={{
          headerTitle: "Crear proveedor",
          headerBackground: () => (
            <LinearGradient
              colors={["#CC2B5E", "#753A88"]}
              style={{ flex: 1 }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          ),
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />

      <AppStack.Screen
        name="provider_update"
        component={ProviderUpdateView}
        options={{
          headerTitle: "Editar proveedor",
          headerBackground: () => (
            <LinearGradient
              colors={["#CC2B5E", "#753A88"]}
              style={{ flex: 1 }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          ),
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </AppStack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
