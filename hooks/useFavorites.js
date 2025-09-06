// hooks/useFavoritos.js
import { useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = '@favorites';

export function useFavorites() {
  const [ids, setIds] = useState(new Set());

  // cargar al inicio
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(KEY);
        if (raw) setIds(new Set(JSON.parse(raw))); // array -> Set
      } catch {}
    })();
  }, []);

  // persistir cada cambio
  const persist = useCallback(async (nextSet) => {
    setIds(nextSet);
    await AsyncStorage.setItem(KEY, JSON.stringify([...nextSet]));
  }, []);

  // acciones
  const toggle = useCallback(async (id) => {
    const next = new Set(ids);
    next.has(id) ? next.delete(id) : next.add(id);
    await persist(next);
  }, [ids, persist]);

  const clearAll = useCallback(async () => {
    await persist(new Set());
  }, [persist]);

  const isFav = useCallback((id) => ids.has(id), [ids]);

  return { favoritos: ids, toggle, isFav, clearAll };
}