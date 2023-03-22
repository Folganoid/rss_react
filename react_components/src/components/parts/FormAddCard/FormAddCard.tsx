import React from 'react';
import cl from './FormAddCard.module.scss';
import Button from '../../../components/UI/Button';
import { ICard } from '../Card/Card';
import Site from './parts/Site/Site';
import NameBlock from './parts/NameBlock/NameBlock';
import DateBlock from './parts/DateBlock/DateBlock';
import TypesBlock from './parts/TypesBlock/TypesBlock';
import SwitchBlock from './parts/SwitchBlock/SwitchBlock';

interface IState {
  nameCorrect: boolean;
  imageCorrect: boolean;
  descCorrect: boolean;
  siteCorrect: boolean;
  dateCorrect: boolean;
  typesCorrect: boolean;
}

interface IProps {
  addCard: (card: ICard) => void;
  controlModalOk: (show: boolean) => void;
}

export enum ETypes {
  'JS library',
  'Runtime environment',
  'WEB framework',
}

export default class FormAddCard extends React.Component<IProps, IState> {
  name: React.RefObject<HTMLInputElement>;
  desc: React.RefObject<HTMLTextAreaElement>;
  site: React.RefObject<HTMLInputElement>;
  image: React.RefObject<HTMLInputElement>;
  fYear: React.RefObject<HTMLSelectElement>;
  fMonth: React.RefObject<HTMLSelectElement>;
  lDate: React.RefObject<HTMLInputElement>;

  isOpenSourceYes: React.RefObject<HTMLInputElement>;
  isOpenSourceNo: React.RefObject<HTMLInputElement>;

  jsChecked: React.RefObject<HTMLInputElement>;
  reChecked: React.RefObject<HTMLInputElement>;
  wfChecked: React.RefObject<HTMLInputElement>;

  constructor(props: IProps) {
    super(props);

    this.state = {
      nameCorrect: true,
      imageCorrect: true,
      descCorrect: true,
      siteCorrect: true,
      dateCorrect: true,
      typesCorrect: true,
    };

    this.name = React.createRef();
    this.desc = React.createRef();
    this.site = React.createRef();
    this.image = React.createRef();
    this.fYear = React.createRef();
    this.fMonth = React.createRef();
    this.lDate = React.createRef();
    this.isOpenSourceYes = React.createRef();
    this.isOpenSourceNo = React.createRef();
    this.jsChecked = React.createRef();
    this.reChecked = React.createRef();
    this.wfChecked = React.createRef();
  }

  formValidate = async (): Promise<ICard | null> => {
    const imageRef = this.image as React.RefObject<HTMLInputElement>;
    let imageLink = '';
    let imageName = '';
    if (imageRef && imageRef.current && imageRef.current.files && imageRef.current.files[0]) {
      try {
        imageLink = URL.createObjectURL(imageRef.current.files[0]);
        imageName = imageRef.current.files[0].name;
      } catch (e) {
        imageLink = 'i_default.jpg';
        imageName = 'i_default.jpg';
      }
    }

    const nameRef = this.name as React.RefObject<HTMLInputElement>;
    const name = nameRef && nameRef.current && nameRef.current.value ? nameRef.current.value : '';
    const descRef = this.desc as React.RefObject<HTMLTextAreaElement>;
    const desc = descRef && descRef.current && descRef.current.value ? descRef.current.value : '';
    const siteRef = this.site as React.RefObject<HTMLInputElement>;
    const site = siteRef && siteRef.current && siteRef.current.value ? siteRef.current.value : '';
    const yearRef = this.fYear as React.RefObject<HTMLSelectElement>;
    const year = yearRef && yearRef.current && yearRef.current.value ? yearRef.current.value : '';
    const monthRef = this.fMonth as React.RefObject<HTMLSelectElement>;
    const month =
      monthRef && monthRef.current && monthRef.current.value ? monthRef.current.value : '';
    const dateRef = this.lDate as React.RefObject<HTMLInputElement>;
    const lDate = dateRef && dateRef.current && dateRef.current.value ? dateRef.current.value : '';

    const types: string[] = [];
    if (this.jsChecked.current?.checked) types.push(ETypes[0]);
    if (this.reChecked.current?.checked) types.push(ETypes[1]);
    if (this.wfChecked.current?.checked) types.push(ETypes[2]);

    const newCard: ICard = {
      id: new Date().valueOf(),
      name: name,
      image: imageLink,
      desc: desc,
      site: site,
      firstReleaseYear: +year,
      firstReleaseMonth: month,
      lastReleaseDate: lDate,
      openSource: !!this.isOpenSourceYes.current?.checked,
      type: types,
    };

    if (name.length >= 3) {
      await this.setState({ nameCorrect: true });
    } else {
      await this.setState({ nameCorrect: false });
    }

    if (desc.length >= 10) {
      await this.setState({ descCorrect: true });
    } else {
      await this.setState({ descCorrect: false });
    }

    if (
      site.match(
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
      )
    ) {
      await this.setState({ siteCorrect: true });
    } else {
      await this.setState({ siteCorrect: false });
    }

    if (imageName.match(/\.(gif|jpe?g|svg?|png)$/i)) {
      await this.setState({ imageCorrect: true });
    } else {
      await this.setState({ imageCorrect: false });
    }

    if (Date.parse(lDate) < Date.parse('2023-01-01')) {
      await this.setState({ dateCorrect: true });
    } else {
      await this.setState({ dateCorrect: false });
    }

    if (
      this.jsChecked.current?.checked ||
      this.reChecked.current?.checked ||
      this.wfChecked.current?.checked
    ) {
      await this.setState({ typesCorrect: true });
    } else {
      await this.setState({ typesCorrect: false });
    }

    if (
      this.state.descCorrect &&
      this.state.nameCorrect &&
      this.state.siteCorrect &&
      this.state.dateCorrect &&
      this.state.typesCorrect &&
      this.state.imageCorrect
    ) {
      return newCard;
    }
    return null;
  };

  formSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const newCard = await this.formValidate();

    if (newCard) {
      this.props.addCard(newCard);

      this.setState({
        nameCorrect: true,
        imageCorrect: true,
        descCorrect: true,
        siteCorrect: true,
        dateCorrect: true,
        typesCorrect: true,
      });

      if (this.name.current) this.name.current.value = '';
      if (this.image.current) this.image.current.value = '';
      if (this.desc.current) this.desc.current.value = '';
      if (this.site.current) this.site.current.value = '';
      if (this.fYear.current) this.fYear.current.value = '2000';
      if (this.fMonth.current) this.fMonth.current.value = 'January';
      if (this.lDate.current) this.lDate.current.value = '';
      if (this.jsChecked.current) this.jsChecked.current.checked = false;
      if (this.wfChecked.current) this.wfChecked.current.checked = false;
      if (this.reChecked.current) this.reChecked.current.checked = false;
      if (this.isOpenSourceYes.current) this.isOpenSourceYes.current.checked = true;
      if (this.isOpenSourceNo.current) this.isOpenSourceNo.current.checked = false;

      this.props.controlModalOk(true);
    }
  };

  render() {
    return (
      <form className={cl.form}>
        <NameBlock
          refForwardName={this.name}
          refForwardImage={this.image}
          refForwardDesc={this.desc}
          nameCorrect={this.state.nameCorrect}
          imageCorrect={this.state.imageCorrect}
          descCorrect={this.state.descCorrect}
        />
        <br />
        <Site refForward={this.site} siteCorrect={this.state.siteCorrect} />
        <br />
        <DateBlock
          refForwardYear={this.fYear}
          refForwardMonth={this.fMonth}
          refForwardDate={this.lDate}
          dateCorrect={this.state.dateCorrect}
        />
        <br />
        <SwitchBlock
          refForwardIsOpenYes={this.isOpenSourceYes}
          refForwardIsOpenNo={this.isOpenSourceNo}
        />
        <br />
        <TypesBlock
          refForwardJs={this.jsChecked}
          refForwardRe={this.reChecked}
          refForwardWf={this.wfChecked}
          typesCorrect={this.state.typesCorrect}
        />
        <br />
        <Button type="submit" onClick={this.formSubmit}>
          Submit
        </Button>
      </form>
    );
  }
}
