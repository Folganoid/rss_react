import React, { MouseEvent, useEffect } from 'react';
import cl from './ModalCard.module.scss';
import { cardApi } from '../../../services/CardsService';
import { setIsLoading } from '../../../store/loaderSlice';
import { addError, delError } from '../../../store/errorsSlice';
import { useAppDispatch } from '../../../hooks/rtk';

interface IProps {
  setModal: (id: number) => void;
  id: number;
}

export default function ModalCard(props: IProps) {
  const closeHandler = (e: MouseEvent<HTMLElement>) => {
    if (e.target !== e.currentTarget) return;
    props.setModal(0);
  };

  const dispatch = useAppDispatch();

  const { data, error, isFetching } = cardApi.useFetchCardQuery(props.id);

  useEffect(() => {
    if (error) {
      dispatch(addError('Error: something wrong with API...'));
      setTimeout(() => dispatch(delError()), 5000);
    }
  }, [error, dispatch]);

  useEffect(() => {
    dispatch(setIsLoading(isFetching));
  }, [isFetching, dispatch]);

  if (isFetching || error || !data) return <></>;

  return (
    <div className={cl.modal} onClick={closeHandler}>
      <article className={cl.modal__card}>
        <div className={cl.modal__body}>
          <img src={data.image} alt={data.name} className={cl.modal__image} />
          <div className={cl.modal__desc}>
            <h2 className={cl.modal__title}>{data.name}</h2>
            <p>
              <b>Gender: </b>
              <span className={cl.grey}>{data.gender}</span>
            </p>
            <p>
              <b>Species: </b>
              <span className={cl.boldGrey}>{data.species}</span>
            </p>
            <hr />
            <p>
              <b>Created: </b> {data.created}
            </p>
            <p>
              <b>Type: </b> {data.type}
            </p>
            <hr />
            <p>
              <b>status: </b> {data.status}
            </p>
            <p>
              <b>URL: </b> <a href={data.url}>{data.url}</a>
            </p>
          </div>
          <button className={cl.close} onClick={closeHandler}>
            X
          </button>
        </div>
      </article>
    </div>
  );
}
