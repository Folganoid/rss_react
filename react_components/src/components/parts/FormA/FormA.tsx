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
    };

    this.name = React.createRef();
    this.desc = React.createRef();
    this.site = React.createRef();
    this.image = React.createRef();
    this.fYear = React.createRef();
    this.fMonth = React.createRef();
    this.lDate = React.createRef();

    for (let i = 2000; i <= 2023; i++) {
      this.years.push(i);
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.setImage = this.setImage.bind(this);
    this.handlerOpenSource = this.handlerOpenSource.bind(this);
    this.handleCheckBox = this.handleCheckBox.bind(this);
  }

  handleInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const target = event.target;
    const value: string = target.value;
    const name: string = target.name;
    this.setState({
      [name]: value,
    } as Omit<IState, 'types' | 'image' | 'isOpenSource' | 'jsChecked' | 'reChecked' | 'wfChecked'>);
  }

  handlerOpenSource(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      isOpenSource: e.target.checked ? true : false,
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
  }

  formSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.setImage();

    const nameRef = this.name as React.RefObject<HTMLInputElement>;
    const name = nameRef && nameRef.current && nameRef.current.value ? nameRef.current.value : '';
    const descRef = this.desc as React.RefObject<HTMLTextAreaElement>;
    const desc = descRef && descRef.current && descRef.current.value ? descRef.current.value : '';
    const imageRef = this.image as React.RefObject<HTMLInputElement>;
    const image =
      imageRef && imageRef.current && imageRef.current.files && imageRef.current.files[0]
        ? URL.createObjectURL(imageRef.current.files[0])
        : '';
    const siteRef = this.site as React.RefObject<HTMLInputElement>;
    const site = siteRef && siteRef.current && siteRef.current.value ? siteRef.current.value : '';
    const yearRef = this.fYear as React.RefObject<HTMLSelectElement>;
    const year = yearRef && yearRef.current && yearRef.current.value ? yearRef.current.value : '';
    const monthRef = this.fMonth as React.RefObject<HTMLSelectElement>;
    const month =
      monthRef && monthRef.current && monthRef.current.value ? monthRef.current.value : '';
    const dateRef = this.lDate as React.RefObject<HTMLInputElement>;
    const lDate = dateRef && dateRef.current && dateRef.current.value ? dateRef.current.value : '';

    this.props.addCard({
      id: new Date().valueOf(),
      name: name,
      image: image,
      desc: desc,
      site: site,
      firstReleaseYear: +year,
      firstReleaseMonth: month,
      lastReleaseDate: lDate,
      openSource: this.state.isOpenSource,
      type: this.state.types,
    });

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
    });
  };

  setImage() {
    const file = this.image as React.RefObject<HTMLInputElement>;
    if (file && file.current && file.current.files && file.current.files[0]) {
      this.setState({
        image: URL.createObjectURL(file.current.files[0]),
      });
    }
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
          </label>
        </div>

        <br />
        <div className={cl.form__switchBlock}>
          <p>Is open source:</p>
          <label className={cl.form__switch}>
            <input
              type="checkbox"
              name="isOpenSource"
              onChange={this.handlerOpenSource}
              checked={this.state.isOpenSource ? true : false}
            />
            <span className={[cl.form__slider, cl.form__round].join(' ')}></span>
          </label>
          <div>{this.state.isOpenSource ? 'Yes' : 'No'}</div>
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
        </div>

        <br />
        <Button type="submit" onClick={this.formSubmit}>
          Submit
        </Button>
      </form>
    );
  }
}
