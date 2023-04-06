import React, { useState, Dispatch } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer/Footer';
import NavBar from './NavBar/NavBar';
import Loader from './Loader/Loader';
import ModalError from './ModalError/ModalError';
import useAddError from '../../hooks/useAddError';

interface LoaderContextType {
  isLoading: boolean;
  setIsLoading: Dispatch<React.SetStateAction<boolean>>;
}

interface ErrorContextType {
  addErrors: (error: string) => void;
}

export const LoaderContext = React.createContext<LoaderContextType>({
  isLoading: false,
  setIsLoading: () => {},
});

export const ErrorContext = React.createContext<ErrorContextType>({
  addErrors: () => {},
});

export default function Layout() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { errors, addErrors } = useAddError(5000);

  return (
    <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
      <ErrorContext.Provider value={{ addErrors }}>
        {errors.length ? <ModalError errors={errors} /> : ''}
        <header>
          <NavBar />
        </header>
        <Outlet />
        <Footer />
        {isLoading && <Loader />}
      </ErrorContext.Provider>
    </LoaderContext.Provider>
  );
}
