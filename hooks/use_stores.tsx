import { useCallback, useEffect, useState } from "react";
import { Store } from "../types";
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

const useStores = (fetchByDefault = true) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stores, setStores] = useState<Store[]>([]);
  const [currentStore, setCurrentStore] = useState<Store | null>(null);
  const { client } = useFirebase();
  const db = getFirestore(client);
  const targetCollection = collection(db, "stores");

  const fetchStores = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const q = await getDocs(targetCollection);
      const dbStores = [] as Store[];

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

  const fetchStore = useCallback(
    async (id: string) => {
      setIsLoading(true);
      setError(null);
      try {
        const docRef = doc(db, "stores", id);
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

  const createStore = useCallback(
    async (store: Store) => {
      setIsLoading(true);
      setError(null);
      try {
        const docRef = await addDoc(targetCollection, store);
        fetchStores();
      } catch (err: any) {
        setIsLoading(false);
        setError(err.message);
      }
    },
    [fetchStores]
  );

  const updateStore = useCallback(
    async (store: Store) => {
      setIsLoading(true);
      setError(null);
      try {
        const docRef = await updateDoc(doc(db, "stores", store.id), {
          ...store,
        });
        fetchStores();
      } catch (err: any) {
        setIsLoading(false);
        setError(err.message);
      }
    },
    [fetchStores]
  );

  const deleteStore = useCallback(
    async (id: string) => {
      setIsLoading(true);
      setError(null);
      try {
        const docRef = await deleteDoc(doc(db, "stores", id));
        fetchStores();
      } catch (err: any) {
        setIsLoading(false);
        setError(err.message);
      }
    },
    [fetchStores]
  );

  useEffect(() => {
    if (fetchByDefault) {
      fetchStores();
    }
  }, [fetchStores, fetchByDefault]);

  return {
    isLoading,
    error,
    stores,
    fetchStores,
    createStore,
    updateStore,
    deleteStore,
    fetchStore,
    currentStore,
  };
};

export default useStores;
