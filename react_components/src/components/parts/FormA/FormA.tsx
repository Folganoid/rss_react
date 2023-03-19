import React from 'react';
import cl from './FormA.module.scss';
import Button from '../../../components/UI/Button';
import { ICard } from '../../interfaces/common';

interface IState {
  name: string;
  desc: string;
  image: string;
  site: string;
  fYear: string;
  fMonth: string;
  lDate: string;
  isOpenSource: boolean;
  jsChecked: boolean;
  reChecked: boolean;
  wfChecked: boolean;
  types: string[];

  nameCorrect: boolean;
  imageCorrect: boolean;
  descCorrect: boolean;
  siteCorrect: boolean;
  dateCorrect: boolean;
  typesCorrect: boolean;

  isButtonActive: boolean;
}

interface IProps {
  addCard: (card: ICard) => void;
}

export default class FormA extends React.Component<IProps, IState> {
  years: number[] = [];

  name: React.Ref<HTMLInputElement>;
  desc: React.RefObject<HTMLTextAreaElement>;
  site: React.Ref<HTMLInputElement>;
  image: React.RefObject<HTMLInputElement>;
  fYear: React.RefObject<HTMLSelectElement>;
  fMonth: React.RefObject<HTMLSelectElement>;
  lDate: React.RefObject<HTMLInputElement>;

  constructor(props: IProps) {
    super(props);

    this.state = {
      name: '',
      desc: '',
      image: '',
      site: '',
      fYear: '2000',
      fMonth: 'January',
      lDate: '',
      isOpenSource: false,

      jsChecked: false,
      reChecked: false,
      wfChecked: false,
      types: [],

      nameCorrect: true,
      imageCorrect: true,
      descCorrect: true,
      siteCorrect: true,
      dateCorrect: true,
      typesCorrect: true,

      isButtonActive: false,
    };

    this.name = React.createRef();
    this.desc = React.createRef();
    this.site = React.createRef();
    this.image = React.createRef();
    this.fYear = React.createRef();
    this.fMonth = React.createRef();
    this.lDate = React.createRef();

    for (let i = 2000; i < 2023; i++) {
      this.years.push(i);
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlerOpenSource = this.handlerOpenSource.bind(this);
    this.handleCheckBox = this.handleCheckBox.bind(this);
    this.checkFields = this.checkFields.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }

  handleInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const target = event.target;
    const value: string = target.value;
    const name: string = target.name;
    this.setState({
      [name]: value,
    } as Pick<IState, 'name' | 'desc' | 'site' | 'fYear' | 'fMonth' | 'lDate' | 'image'>);
    this.checkFields(name);
  }

  handlerOpenSource(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      isOpenSource: e.target.name === 'isOpenSourceYes',
    });
  }

  handleCheckBox(e: React.ChangeEvent<HTMLInputElement>) {
    let arr = this.state.types;
    const val = e.target.value;
    const name = e.target.name;
    const checked = e.target.checked;
    if (checked && !arr.includes(val)) {
      arr.push(val);
    }
    if (!checked && arr.includes(val)) {
      arr = arr.filter((e) => e !== val);
    }
    this.setState({
      types: arr,
      [name]: checked,
    } as Pick<IState, 'types' | 'jsChecked' | 'reChecked' | 'wfChecked'>);
    this.checkFields('types');
  }

  async checkFields(field = ''): Promise<void> {
    if (field === 'name') await this.setState({ nameCorrect: true });
    if (field === 'desc') await this.setState({ descCorrect: true });
    if (field === 'lDate') await this.setState({ dateCorrect: true });
    if (field === 'site') await this.setState({ siteCorrect: true });
    if (field === 'image') await this.setState({ imageCorrect: true });
    if (field === 'types') await this.setState({ typesCorrect: true });

    if (
      this.state.descCorrect &&
      this.state.nameCorrect &&
      this.state.siteCorrect &&
      this.state.dateCorrect &&
      this.state.typesCorrect &&
      this.state.imageCorrect
    ) {
      this.setState({ isButtonActive: true });
    } else {
      this.setState({ isButtonActive: false });
    }
  }

  async formValidate(): Promise<ICard | null> {
    const imageRef = this.image as React.RefObject<HTMLInputElement>;
    let imageLink = '';
    let imageName = '';
    if (imageRef && imageRef.current && imageRef.current.files && imageRef.current.files[0]) {
      imageLink = URL.createObjectURL(imageRef.current.files[0]);
      imageName = imageRef.current.files[0].name;
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

    const newCard: ICard = {
      id: new Date().valueOf(),
      name: name,
      image: imageLink,
      desc: desc,
      site: site,
      firstReleaseYear: +year,
      firstReleaseMonth: month,
      lastReleaseDate: lDate,
      openSource: this.state.isOpenSource,
      type: this.state.types,
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

    if (this.state.jsChecked || this.state.reChecked || this.state.wfChecked) {
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
  }

  async formSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    const newCard = await this.formValidate();

    if (newCard) {
      this.props.addCard(newCard);

      this.setState({
        name: '',
        image: '',
        desc: '',
        site: '',
        fYear: '2000',
        fMonth: 'January',
        lDate: '',
        isOpenSource: false,
        jsChecked: false,
        reChecked: false,
        wfChecked: false,
        types: [],

        nameCorrect: true,
        imageCorrect: true,
        descCorrect: true,
        siteCorrect: true,
        dateCorrect: true,
        typesCorrect: true,
      });
    }
    this.setState({ isButtonActive: false });
  }

  render() {
    const a = this.years;

    return (
      <form className={cl.form}>
        <div className={cl.form__nameBlock}>
          <label>
            Name:
            <br />
            <input
              name="name"
              type="text"
              placeholder="Name"
              ref={this.name}
              onChange={this.handleInputChange}
              value={this.state.name}
            />
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
            <input
              type="file"
              name="image"
              ref={this.image}
              onChange={this.handleInputChange}
              value={this.state.image}
            />
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
          <br />
          <br />
          <label className={cl.form__desc}>
            Description:
            <br />
            <textarea
              name="desc"
              placeholder="Description"
              ref={this.desc}
              onChange={this.handleInputChange}
              value={this.state.desc}
            />
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
          <input
            name="site"
            type="text"
            placeholder="Site"
            ref={this.site}
            onChange={this.handleInputChange}
            value={this.state.site}
          />
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
            <select
              name="fYear"
              onChange={this.handleInputChange}
              ref={this.fYear}
              value={this.state.fYear}
            >
              {a.map((el) => (
                <option key={el} value={el}>
                  {el}
                </option>
              ))}
            </select>
          </label>
          <label>
            First release month:
            <br />
            <select
              name="fMonth"
              onChange={this.handleInputChange}
              ref={this.fMonth}
              value={this.state.fMonth}
            >
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
          </label>
          <label>
            Last release date:
            <br />
            <input
              name="lDate"
              type="date"
              onChange={this.handleInputChange}
              ref={this.lDate}
              value={this.state.lDate}
            />
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
              name="isOpenSourceYes"
              onChange={this.handlerOpenSource}
              checked={this.state.isOpenSource}
            />
            Yes:&nbsp;&nbsp;&nbsp;
            <input
              type="radio"
              name="isOpenSourceNo"
              onChange={this.handlerOpenSource}
              checked={!this.state.isOpenSource}
            />
            No:
          </label>
          <b>{this.state.isOpenSource ? 'Yes' : 'No'}</b>
        </div>

        <br />
        <div className={cl.form__typesBlock}>
          <p>Types:</p>
          <label>
            <input
              type="checkbox"
              name="jsChecked"
              value="JS library"
              checked={this.state.jsChecked}
              onChange={this.handleCheckBox}
            />
            &nbsp;JS library
          </label>
          <label>
            <input
              type="checkbox"
              name="reChecked"
              value="Runtime environment"
              checked={this.state.reChecked}
              onChange={this.handleCheckBox}
            />
            &nbsp;Runtime environment
          </label>
          <label>
            <input
              type="checkbox"
              name="wfChecked"
              value="WEB framework"
              checked={this.state.wfChecked}
              onChange={this.handleCheckBox}
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
        <Button type="submit" onClick={this.formSubmit} disabled={!this.state.isButtonActive}>
          Submit
        </Button>
      </form>
    );
  }
}
