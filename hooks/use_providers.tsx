import { useCallback, useEffect, useState } from "react";
import { Provider } from "../types";
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

const useProviders = (fetchByDefault = true) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [providers, setStores] = useState<Provider[]>([]);
  const [currentProvider, setCurrentStore] = useState<Provider | null>(null);
  const { client } = useFirebase();
  const db = getFirestore(client);
  const targetCollection = collection(db, "providers");

  const fetchProviders = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const q = await getDocs(targetCollection);
      const dbStores = [] as Provider[];

      q.forEach((doc) => {
        const { name, cellphone, address } = doc.data();

        dbStores.push({ id: doc.id, name, cellphone, address });
      });

      setStores(dbStores);
    } catch (err: any) {
      setError(err.message);
    }
    setIsLoading(false);
  }, []);

  const fetchProvider = useCallback(
    async (id: string) => {
      setIsLoading(true);
      setError(null);
      try {
        const docRef = doc(db, "providers", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const { name, cellphone, address } = docSnap.data();
          setCurrentStore({ id: docSnap.id, name, cellphone, address });
        } else {
          setError("No such document!");
          setCurrentStore(null);
        }
      } catch (err: any) {
        setError(err.message);
        setCurrentStore(null);
      }
      setIsLoading(false);
    },
    [db]
  );

  const createProvider = useCallback(
    async (provider: Provider) => {
      setIsLoading(true);
      setError(null);
      try {
        const docRef = await addDoc(targetCollection, provider);
        fetchProviders();
      } catch (err: any) {
        setIsLoading(false);
        setError(err.message);
      }
    },
    [fetchProviders]
  );

  const updateProvider = useCallback(
    async (provider: Provider) => {
      setIsLoading(true);
      setError(null);
      try {
        const docRef = await updateDoc(doc(db, "providers", provider.id), {
          ...provider,
        });
        fetchProviders();
      } catch (err: any) {
        setIsLoading(false);
        setError(err.message);
      }
    },
    [fetchProviders]
  );

  const deleteProvider = useCallback(
    async (id: string) => {
      setIsLoading(true);
      setError(null);
      try {
        const docRef = await deleteDoc(doc(db, "providers", id));
        fetchProviders();
      } catch (err: any) {
        setIsLoading(false);
        setError(err.message);
      }
    },
    [fetchProviders]
  );

  useEffect(() => {
    if (fetchByDefault) {
      fetchProviders();
    }
  }, [fetchProviders, fetchByDefault]);

  return {
    isLoading,
    error,
    providers,
    fetchProviders,
    fetchProvider,
    createProvider,
    updateProvider,
    deleteProvider,
    currentProvider,
  };
};

export default useProviders;
