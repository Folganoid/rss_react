import React from 'react';
import cl from './FormAddCard.module.scss';
import Button from '../../../components/UI/Button';
import { ICard } from '../Card/Card';
import { useForm, SubmitHandler, Controller, Validate } from 'react-hook-form';

interface IProps {
  addCard: (card: ICard) => void;
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
    },
  });
  const onSubmit: SubmitHandler<IFormValues> = (data) => {
    const newCard: ICard = {
      id: new Date().valueOf(),
      name: data.name,
      image: URL.createObjectURL(new Blob([data.image[0]])),
      desc: data.desc,
      site: data.site,
      firstReleaseYear: +data.fYear,
      firstReleaseMonth: data.fMonth,
      lastReleaseDate: data.lDate,
      openSource: data.radio === 'true',
      type: data.checkbox,
    };
    props.addCard(newCard);
    reset();
  };

  const years = [
    '2010',
    '2011',
    '2012',
    '2013',
    '2014',
    '2015',
    '2016',
    '2017',
    '2018',
    '2019',
    '2020',
    '2021',
    '2022',
  ];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const validateDate = (value: string): boolean => {
    if (Date.parse(value) < Date.parse('2023-01-01')) return true;
    return false;
  };

  const validateImage: Validate<string | FileList, IFormValues> = (value) => {
    if (!value || !value[0]) {
      return false;
    }
    //const imageLink = URL.createObjectURL(new Blob([value[0]]));
    const imageName = value[0] as File;
    if (!imageName.name.match(/\.(gif|jpe?g|svg?|png)$/i)) {
      return false;
    }
    return true;
  };

  const validateCheckbox = (value: string[]): boolean => {
    return value.length > 0;
  };

  return (
    <form className={cl.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={cl.nameBlock}>
        <label>
          Name:
          <br />
          <input
            type={'text'}
            placeholder="Name"
            {...register('name', { required: true, minLength: 3, maxLength: 20 })}
          />
          <p className={!errors?.name ? cl.errorMsg : [cl.errorMsg, cl.errorMsg_invalid].join(' ')}>
            Must be 3-20 characters...
          </p>
        </label>
        <label>
          Upload image:
          <br />
          <input
            type="file"
            data-testid="image"
            {...register('image', { validate: validateImage })}
          />
          <p
            className={!errors?.image ? cl.errorMsg : [cl.errorMsg, cl.errorMsg_invalid].join(' ')}
          >
            Must be in .PNG / .JPG / .JPEG / .SVG / .GIF format
          </p>
        </label>
        <br />
        <label className={cl.desc}>
          Description:
          <br />
          <textarea
            placeholder="Description"
            {...register('desc', { required: true, minLength: 10 })}
          />
          <p className={!errors?.desc ? cl.errorMsg : [cl.errorMsg, cl.errorMsg_invalid].join(' ')}>
            Must be at least 10 characters
          </p>
        </label>
        <label>
          Site:
          <br />
          <input
            type="text"
            placeholder="Site"
            {...register('site', {
              pattern:
                /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/i,
              required: true,
            })}
          />
          <p className={!errors?.site ? cl.errorMsg : [cl.errorMsg, cl.errorMsg_invalid].join(' ')}>
            Must be in http(s)://xxx.xx(x) format
          </p>
        </label>
      </div>
      <div className={cl.dateBlock}>
        <label>
          First release year:
          <br />
          <select {...register('fYear')}>
            {...years.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
        </label>
        <label>
          First release month:
          <br />
          <select {...register('fMonth')}>
            {...months.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
        </label>
        <label>
          Last release date:
          <br />
          <Controller
            name="lDate"
            control={control}
            rules={{ validate: validateDate }}
            render={({ field }) => <input data-testid="lDate" type="date" {...field} />}
          />
          <p
            className={!errors?.lDate ? cl.errorMsg : [cl.errorMsg, cl.errorMsg_invalid].join(' ')}
          >
            Must be filled no later than 2022-12-31
          </p>
        </label>
      </div>
      <div className={cl.switchBlock}>
        <p>Is open source:</p>
        <label className={cl.switch}>
          <input {...register('radio')} type="radio" value="true" defaultChecked={true} />
          Yes:&nbsp;&nbsp;&nbsp;
          <input {...register('radio')} type="radio" value="false" />
          No:
        </label>
      </div>

      <Controller
        control={control}
        name="checkbox"
        render={({ field }) => (
          <div className={cl.typesBlock}>
            <p>Types:</p>
            <label>
              <input
                type="checkbox"
                value={ETypes[0]}
                defaultChecked={false}
                onChange={(e) => {
                  const { checked, value } = e.target;
                  if (checked) {
                    field.onChange([...field.value, value]);
                  } else {
                    field.onChange(field.value.filter((v) => v !== value && v));
                  }
                }}
              />
              &nbsp;JS library
            </label>
            <label>
              <input
                type="checkbox"
                value={ETypes[1]}
                defaultChecked={false}
                onChange={(e) => {
                  const { checked, value } = e.target;
                  if (checked) {
                    field.onChange([...field.value, value]);
                  } else {
                    field.onChange(field.value.filter((v) => v !== value && v));
                  }
                }}
              />
              &nbsp;Runtime environment
            </label>
            <label>
              <input
                type="checkbox"
                value={ETypes[2]}
                defaultChecked={false}
                onChange={(e) => {
                  const { checked, value } = e.target;
                  if (checked) {
                    field.onChange([...field.value, value]);
                  } else {
                    field.onChange(field.value.filter((v) => v !== value && v));
                  }
                }}
              />
              &nbsp;WEB framework
            </label>
            <p
              className={
                !errors.checkbox ? cl.errorMsg : [cl.errorMsg, cl.errorMsg_invalid].join(' ')
              }
            >
              At least one item must be selected
            </p>
          </div>
        )}
        rules={{ validate: validateCheckbox }}
      />
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
    </form>
  );
}
