import { useState, useEffect, useRef } from "react";

export default function useSemiPersistentState(
  initState: string,
  key: string
): [string, (newValue: string) => void] {
  const isMounted = useRef(false);
  const [value, setValue] = useState<any>(
    localStorage.getItem(key) || initState
  );

  useEffect(() => {
    if (isMounted.current) {
      localStorage.setItem(key, value);
    } else {
      isMounted.current = true;
    }
  }, [key, value]);

  return [value, setValue];
}
