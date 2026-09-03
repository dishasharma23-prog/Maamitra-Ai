import { useState, useEffect } from "react";
import { db } from "../services/store/localDb";

export function useDatabase() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const handleUpdate = () => {
      setTick((t) => t + 1);
    };
    window.addEventListener("db-updated", handleUpdate);
    return () => window.removeEventListener("db-updated", handleUpdate);
  }, []);

  return {
    db,
    tick,
  };
}
