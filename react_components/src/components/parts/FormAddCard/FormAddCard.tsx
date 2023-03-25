import React, { MutableRefObject, RefObject, useRef, useState } from 'react';
import cl from './FormAddCard.module.scss';
import Button from '../../../components/UI/Button';
import { ICard } from '../Card/Card';
import Site from './parts/Site/Site';
import NameBlock from './parts/NameBlock/NameBlock';
import DateBlock from './parts/DateBlock/DateBlock';
import TypesBlock from './parts/TypesBlock/TypesBlock';
import SwitchBlock from './parts/SwitchBlock/SwitchBlock';

interface IProps {
  addCard: (card: ICard) => void;
  controlModalOk: (show: boolean) => void;
}

export enum ETypes {
  'JS library',
  'Runtime environment',
  'WEB framework',
}

export default function FormAddCard(props: IProps) {
  const [nameCorrect, setNameCorrect] = useState(true);
  const [imageCorrect, setImageCorrect] = useState(true);
  const [descCorrect, setDescCorrect] = useState(true);
  const [siteCorrect, setSiteCorrect] = useState(true);
  const [dateCorrect, setDateCorrect] = useState(true);
  const [typesCorrect, setTypesCorrect] = useState(true);

  const name: MutableRefObject<HTMLInputElement | null | undefined> = useRef();
  const desc: MutableRefObject<HTMLTextAreaElement | null | undefined> = useRef();
  const site: MutableRefObject<HTMLInputElement | null | undefined> = useRef();
  const image: MutableRefObject<HTMLInputElement | null | undefined> = useRef();
  const fYear: MutableRefObject<HTMLSelectElement | null | undefined> = useRef();
  const fMonth: MutableRefObject<HTMLSelectElement | null | undefined> = useRef();
  const lDate: MutableRefObject<HTMLInputElement | null | undefined> = useRef();

  const isOpenSourceYes: MutableRefObject<HTMLInputElement | null | undefined> = useRef();
  const isOpenSourceNo: MutableRefObject<HTMLInputElement | null | undefined> = useRef();

  const jsChecked: MutableRefObject<HTMLInputElement | null | undefined> = useRef();
  const reChecked: MutableRefObject<HTMLInputElement | null | undefined> = useRef();
  const wfChecked: MutableRefObject<HTMLInputElement | null | undefined> = useRef();

  const formValidate = (): ICard | null => {
    let cardOk = true;
    let imageName = '';
    let imageLink = '';
    if (image && image.current && image.current.files && image.current.files[0]) {
      try {
        imageName = image.current.files[0].name;
        imageLink = URL.createObjectURL(image.current.files[0]);
      } catch (e) {
        imageName = 'i_default.jpg';
        imageLink = 'i_default.jpg';
      }
    }

    const types: string[] = [];
    if (jsChecked.current?.checked) types.push(ETypes[0]);
    if (reChecked.current?.checked) types.push(ETypes[1]);
    if (wfChecked.current?.checked) types.push(ETypes[2]);

    const newCard: ICard = {
      id: new Date().valueOf(),
      name: name.current?.value || '',
      image: imageLink,
      desc: desc.current?.value || '',
      site: site.current?.value || '',
      firstReleaseYear: Number(fYear.current?.value || 0),
      firstReleaseMonth: fMonth.current?.value || '',
      lastReleaseDate: lDate.current?.value || '',
      openSource: !!isOpenSourceYes.current?.checked,
      type: types,
    };
    if (newCard.name.length >= 3) {
      setNameCorrect(true);
    } else {
      setNameCorrect(false);
      cardOk = false;
    }

    if (newCard.desc.length >= 10) {
      setDescCorrect(true);
    } else {
      setDescCorrect(false);
      cardOk = false;
    }

    if (
      newCard.site.match(
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
      )
    ) {
      setSiteCorrect(true);
    } else {
      setSiteCorrect(false);
      cardOk = false;
    }

    if (imageName.match(/\.(gif|jpe?g|svg?|png)$/i)) {
      setImageCorrect(true);
    } else {
      setImageCorrect(false);
      cardOk = false;
    }

    if (Date.parse(newCard.lastReleaseDate) < Date.parse('2023-01-01')) {
      console.log('+', newCard.lastReleaseDate);
      setDateCorrect(true);
    } else {
      setDateCorrect(false);
      cardOk = false;
    }

    if (jsChecked.current?.checked || reChecked.current?.checked || wfChecked.current?.checked) {
      setTypesCorrect(true);
    } else {
      setTypesCorrect(false);
      cardOk = false;
    }
    if (cardOk) {
      return newCard;
    }
    return null;
  };

  const formSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const newCard = await formValidate();
    if (newCard) {
      props.addCard(newCard);

      await setNameCorrect(true);
      await setImageCorrect(true);
      await setDescCorrect(true);
      await setSiteCorrect(true);
      await setDateCorrect(true);
      await setTypesCorrect(true);

      if (name.current) name.current.value = '';
      if (image.current) image.current.value = '';
      if (desc.current) desc.current.value = '';
      if (site.current) site.current.value = '';
      if (fYear.current) fYear.current.value = '2000';
      if (fMonth.current) fMonth.current.value = 'January';
      if (lDate.current) lDate.current.value = '';
      if (jsChecked.current) jsChecked.current.checked = false;
      if (wfChecked.current) wfChecked.current.checked = false;
      if (reChecked.current) reChecked.current.checked = false;
      if (isOpenSourceYes.current) isOpenSourceYes.current.checked = true;
      if (isOpenSourceNo.current) isOpenSourceNo.current.checked = false;

      props.controlModalOk(true);
    }
  };

  return (
    <form className={cl.form}>
      <NameBlock
        refForwardName={name as RefObject<HTMLInputElement>}
        refForwardImage={image as RefObject<HTMLInputElement>}
        refForwardDesc={desc as RefObject<HTMLTextAreaElement>}
        nameCorrect={nameCorrect}
        imageCorrect={imageCorrect}
        descCorrect={descCorrect}
      />
      <br />
      <Site refForward={site as RefObject<HTMLInputElement>} siteCorrect={siteCorrect} />
      <br />
      <DateBlock
        refForwardYear={fYear as RefObject<HTMLSelectElement>}
        refForwardMonth={fMonth as RefObject<HTMLSelectElement>}
        refForwardDate={lDate as RefObject<HTMLInputElement>}
        dateCorrect={dateCorrect}
      />
      <br />
      <SwitchBlock
        refForwardIsOpenYes={isOpenSourceYes as RefObject<HTMLInputElement>}
        refForwardIsOpenNo={isOpenSourceNo as RefObject<HTMLInputElement>}
      />
      <br />
      <TypesBlock
        refForwardJs={jsChecked as RefObject<HTMLInputElement>}
        refForwardRe={reChecked as RefObject<HTMLInputElement>}
        refForwardWf={wfChecked as RefObject<HTMLInputElement>}
        typesCorrect={typesCorrect}
      />
      <br />
      <Button type="submit" onClick={formSubmit}>
        Submit
      </Button>
    </form>
  );
}
