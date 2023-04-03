import { useState } from 'react';

export default function useAddError(delay = 5000) {
  const [errors, setErrors] = useState<string[]>([]);

  const addErrors = (error: string) => {
    setErrors((prev) => {
      return [...prev, error];
    });
    setTimeout(() => {
      setErrors((prev) => {
        return prev.slice(1);
      });
    }, delay);
  };

  return { errors, addErrors };
}
