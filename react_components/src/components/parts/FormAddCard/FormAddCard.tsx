import React from 'react';
import cl from './FormAddCard.module.scss';
import Button from '../../../components/UI/Button';
import Input from '../../../components/UI/Input';
import Select from '../../../components/UI/Select';
import { ICard } from '../Card/Card';

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
}

enum ETypes {
  'JS library',
  'Runtime environment',
  'WEB framework',
}

export default class FormAddCard extends React.Component<IProps, IState> {
  years: { name: string; value: string }[] = [];

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

    for (let i = 2000; i < 2023; i++) {
      this.years.push({ name: String(i), value: String(i) });
    }
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
    }
  };

  render() {
    return (
      <form className={cl.form}>
        <div className={cl.form__nameBlock}>
          <label>
            Name:
            <br />
            <Input name="name" type="text" placeholder="Name" ref={this.name} />
            <p
              className={
                this.state.nameCorrect
                  ? cl.form__errorMsg
                  : [cl.form__errorMsg, cl.form__errorMsg_invalid].join(' ')
              }
            >
              Must be at least 3 characters
            </p>
          </label>
          <label>
            Upload image:
            <br />
            <Input type="file" name="image" ref={this.image} data-testid="image" />
            <p
              className={
                this.state.imageCorrect
                  ? cl.form__errorMsg
                  : [cl.form__errorMsg, cl.form__errorMsg_invalid].join(' ')
              }
            >
              Must be in .PNG / .JPG / .JPEG / .SVG / .GIF format
            </p>
          </label>
          <br />
          <label className={cl.form__desc}>
            Description:
            <br />
            <textarea name="desc" placeholder="Description" ref={this.desc} />
            <p
              className={
                this.state.descCorrect
                  ? cl.form__errorMsg
                  : [cl.form__errorMsg, cl.form__errorMsg_invalid].join(' ')
              }
            >
              Must be at least 10 characters
            </p>
          </label>
        </div>

        <br />
        <label className={cl.form__site}>
          Site:
          <br />
          <Input name="site" type="text" placeholder="Site" ref={this.site} />
          <p
            className={
              this.state.siteCorrect
                ? cl.form__errorMsg
                : [cl.form__errorMsg, cl.form__errorMsg_invalid].join(' ')
            }
          >
            Must be in http(s)://xxx.xx(x) format
          </p>
        </label>

        <br />
        <div className={cl.form__dateBlock}>
          <label>
            First release year:
            <br />
            <Select name="fYear" ref={this.fYear} options={this.years} />
          </label>
          <label>
            First release month:
            <br />
            <Select
              name="fMonth"
              ref={this.fMonth}
              options={[
                { value: 'January', name: 'January' },
                { value: 'February', name: 'February' },
                { value: 'March', name: 'March' },
                { value: 'April', name: 'April' },
                { value: 'May', name: 'May' },
                { value: 'June', name: 'June' },
                { value: 'July', name: 'July' },
                { value: 'August', name: 'August' },
                { value: 'September', name: 'September' },
                { value: 'October', name: 'October' },
                { value: 'November', name: 'November' },
                { value: 'December', name: 'December' },
              ]}
            />
          </label>
          <label>
            Last release date:
            <br />
            <Input data-testid="lDate" name="lDate" type="date" ref={this.lDate} />
            <p
              className={
                this.state.dateCorrect
                  ? cl.form__errorMsg
                  : [cl.form__errorMsg, cl.form__errorMsg_invalid].join(' ')
              }
            >
              Must be filled no later than 2022-12-31
            </p>
          </label>
        </div>
        <br />
        <div className={cl.form__switchBlock}>
          <p>Is open source:</p>
          <label className={cl.form__switch}>
            <input
              type="radio"
              name="isOpenSource"
              defaultChecked={true}
              ref={this.isOpenSourceYes}
            />
            Yes:&nbsp;&nbsp;&nbsp;
            <input
              type="radio"
              name="isOpenSource"
              defaultChecked={false}
              ref={this.isOpenSourceNo}
            />
            No:
          </label>
        </div>

        <br />
        <div className={cl.form__typesBlock}>
          <p>Types:</p>
          <label>
            <input
              type="checkbox"
              name="jsChecked"
              value={ETypes[0]}
              ref={this.jsChecked}
              defaultChecked={false}
            />
            &nbsp;JS library
          </label>
          <label>
            <input
              type="checkbox"
              name="reChecked"
              value={ETypes[1]}
              ref={this.reChecked}
              defaultChecked={false}
            />
            &nbsp;Runtime environment
          </label>
          <label>
            <input
              type="checkbox"
              name="wfChecked"
              value={ETypes[2]}
              ref={this.wfChecked}
              defaultChecked={false}
            />
            &nbsp;WEB framework
          </label>
          <p
            className={
              this.state.typesCorrect
                ? cl.form__errorMsg
                : [cl.form__errorMsg, cl.form__errorMsg_invalid].join(' ')
            }
          >
            At least one item must be selected
          </p>
        </div>

        <br />
        <Button type="submit" onClick={this.formSubmit}>
          Submit
        </Button>
      </form>
    );
  }
}
