import React from 'react';
import cl from './FormAddCard.module.scss';
import Button from '../../../components/UI/Button';
import { ICard } from '../Card/Card';
import { useForm, SubmitHandler } from 'react-hook-form';
import Site from './parts/Site/Site';
import NameBlock from './parts/NameBlock/NameBlock';
import DateBlock from './parts/DateBlock/DateBlock';
import SwitchBlock from './parts/SwitchBlock/SwitchBlock';
import TypesBlock from './parts/TypesBlock/TypesBlock';
import { useAppDispatch, useAppSelector } from '../../../hooks/rtk';
import { setCardList } from '../../../store/formSlice';

interface IProps {
  controlModalOk: (show: boolean) => void;
}

export interface IFormValues {
  site: string;
  name: string;
  image: string;
  desc: string;
  fYear: string;
  fMonth: string;
  lDate: string;
  radio: string;
  checkbox: string[];
}

export enum ETypes {
  'JS library',
  'Runtime environment',
  'WEB framework',
}

export default function FormAddCard(props: IProps) {
  const dispatch = useAppDispatch();
  const cards = useAppSelector((state) => state.form.cardList);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IFormValues>({
    defaultValues: {
      lDate: '',
      checkbox: [],
      name: '',
      desc: '',
      site: '',
      image: '',
      radio: 'true',
      fYear: '2010',
      fMonth: 'January',
    },
  });

  const onSubmit: SubmitHandler<IFormValues> = (data) => {
    let img = 'i_default.jpg';
    try {
      img = URL.createObjectURL(new Blob([data.image[0]]));
    } catch (e) {}

    const newCard: ICard = {
      id: new Date().valueOf(),
      name: data.name,
      image: img,
      desc: data.desc,
      site: data.site,
      firstReleaseYear: +data.fYear,
      firstReleaseMonth: data.fMonth,
      lastReleaseDate: data.lDate,
      openSource: data.radio === 'true',
      type: data.checkbox,
    };
    dispatch(setCardList([...cards, newCard]));
    props.controlModalOk(true);
    reset();
  };

  return (
    <form className={cl.form} onSubmit={handleSubmit(onSubmit)}>
      <NameBlock errors={errors} register={register} />
      <Site errors={errors} register={register} />
      <DateBlock errors={errors} register={register} control={control} />
      <SwitchBlock errors={errors} register={register} />
      <TypesBlock errors={errors} register={register} control={control} />
      <Button
        type="submit"
        disabled={
          errors.name ||
          errors.desc ||
          errors.image ||
          errors.site ||
          errors.lDate ||
          errors.checkbox
            ? true
            : false
        }
      >
        Submit
      </Button>
      <button
        className={cl.resetBtn}
        onClick={() => {
          reset();
        }}
      >
        Reset
      </button>
    </form>
  );
}
