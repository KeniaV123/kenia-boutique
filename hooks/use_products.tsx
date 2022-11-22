import { useCallback, useEffect, useState } from "react";
import { Product, ProductWithProvider } from "../types";
import {
  collection,
  query,
  where,
  doc,
  getDocs,
  getDoc,
  getFirestore,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import useFirebase from "./use_firebase";
import useProviders from "./use_providers";

const useProducts = (fetchByDefault = true) => {
  const { providers, fetchProvider, currentProvider } = useProviders();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [currentProduct, setCurrentProduct] = useState<
    Product | null | ProductWithProvider
  >(null);
  const { client } = useFirebase();
  const db = getFirestore(client);
  const targetCollection = collection(db, "products");

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const q = await getDocs(targetCollection);
      const dbProducts = [] as Product[];

      q.forEach((doc) => {
        const {
          name,
          original_price,
          sale_price,
          description,
          provider,
          stock,
          emoji,
        } = doc.data();

        dbProducts.push({
          id: doc.id,
          name,
          original_price,
          sale_price,
          description,
          provider,
          stock,
          emoji,
        });
      });

      setProducts(dbProducts);
    } catch (err: any) {
      setError(err.message);
    }
    setIsLoading(false);
  }, []);

  const fetchProduct = useCallback(
    async (id: string) => {
      setIsLoading(true);
      setError(null);
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const {
            name,
            original_price,
            sale_price,
            description,
            provider,
            stock,
            emoji,
          } = docSnap.data();

          await fetchProvider(provider);

          setCurrentProduct({
            id: docSnap.id,
            name,
            original_price,
            sale_price,
            description,
            provider: currentProvider as ProductWithProvider["provider"],
            stock,
            emoji,
          });
        } else {
          setError("No such document!");
          setCurrentProduct(null);
        }
      } catch (err: any) {
        setError(err.message);
      }
      setIsLoading(false);
    },
    [db]
  );

  const addProduct = useCallback(
    async (product: Product) => {
      setIsLoading(true);
      setError(null);
      try {
        const docRef = await addDoc(targetCollection, product);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const {
            name,
            original_price,
            sale_price,
            description,
            provider,
            stock,
            emoji,
          } = docSnap.data();
          setCurrentProduct({
            id: docSnap.id,
            name,
            original_price,
            sale_price,
            description,
            provider,
            stock,
            emoji,
          });
        } else {
          setError("No such document!");
          setCurrentProduct(null);
        }
      } catch (err: any) {
        setError(err.message);
      }
      setIsLoading(false);
    },
    [targetCollection]
  );

  const updateProduct = useCallback(
    async (product: Product) => {
      setIsLoading(true);
      setError(null);
      try {
        const docRef = doc(db, "products", product.id);
        await updateDoc(docRef, { ...product });
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const {
            name,
            original_price,
            sale_price,
            description,
            provider,
            stock,
            emoji,
          } = docSnap.data();
          setCurrentProduct({
            id: docSnap.id,
            name,
            original_price,
            sale_price,
            description,
            provider,
            stock,
            emoji,
          });
        } else {
          setError("No such document!");
          setCurrentProduct(null);
        }
      } catch (err: any) {
        setError(err.message);
      }
      setIsLoading(false);
    },
    [db]
  );

  const deleteProduct = useCallback(
    async (id: string) => {
      setIsLoading(true);
      setError(null);
      try {
        const docRef = doc(db, "products", id);
        await deleteDoc(docRef);
        setCurrentProduct(null);
      } catch (err: any) {
        setError(err.message);
      }
      setIsLoading(false);
    },
    [db]
  );

  useEffect(() => {
    if (fetchByDefault) {
      fetchProducts();
    }
  }, [fetchByDefault]);

  return {
    isLoading,
    error,
    products,
    providers,
    currentProduct,
    fetchProducts,
    fetchProduct,
    addProduct,
    updateProduct,
    deleteProduct,
  };
};

export default useProducts;
