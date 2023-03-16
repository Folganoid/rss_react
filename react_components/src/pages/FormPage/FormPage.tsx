import React from 'react';
import cl from './FormPage.module.scss';
import FormA from '../../components/parts/FormA/FormA';

export default class FormPage extends React.Component {
  render() {
    return (
      <main className={cl.main}>
        <h1>Form page</h1>
        <br />
        <FormA />
      </main>
    );
  }
}
