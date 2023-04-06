import { useState } from 'react';

export default function useAddError(delay = 50) {
  const [errors, setErrors] = useState<string[]>([]);

  const addErrors = (error: string): void => {
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
