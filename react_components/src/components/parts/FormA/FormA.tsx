import Input from '../../../components/UI/Input';
import React from 'react';
import cl from './FormA.module.scss';
import Button from '../../../components/UI/Button';
import Select from '../../../components/UI/Select';

export default class FormA extends React.Component {
  years: number[] = [];

  constructor(props: object) {
    super(props);
    for (let i = 2000; i <= 2023; i++) {
      this.years.push(i);
    }
  }

  formSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  render() {
    const a = this.years;

    return (
      <form className={cl.form}>
        <div className={cl.form__nameBlock}>
          <label>
            Name:
            <br />
            <Input name="name" type="text" placeholder="Name" />
          </label>
          <label>
            Upload image:
            <br />
            <Input type="file" name="file" />
          </label>
          <br />
          <br />
          <br />
          <label className={cl.form__desc}>
            Description:
            <br />
            <textarea name="description" placeholder="Description" />
          </label>
        </div>

        <br />
        <label className={cl.form__site}>
          Site:
          <br />
          <Input name="site" type="text" placeholder="Site" />
        </label>

        <br />
        <div className={cl.form__dateBlock}>
          <label>
            First release year:
            <br />
            <Select name="first_rel_year">
              {a.map((el) => (
                <option key={el} value={el}>
                  {el}
                </option>
              ))}
            </Select>
          </label>
          <label>
            First release month:
            <br />
            <Select name="first_rel_month">
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
            </Select>
          </label>
          <label>
            Last release date:
            <br />
            <Input name="date" type="date" />
          </label>
        </div>

        <br />
        <div className={cl.form__switchBlock}>
          <p>Is open source:</p>
          <label className={cl.form__switch}>
            <input type="checkbox" name="opensource" />
            <span className={[cl.form__slider, cl.form__round].join(' ')}></span>
          </label>
          <div>Yes</div>
        </div>

        <br />
        <div className={cl.form__typesBlock}>
          <p>Types:</p>
          <label>
            <input type="checkbox" name="type" value="JS library" />
            &nbsp;JS library
          </label>
          <label>
            <input type="checkbox" name="type" value="Runtime environment" />
            &nbsp;Runtime environment
          </label>
          <label>
            <input type="checkbox" name="type" value="WEB framework" />
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
