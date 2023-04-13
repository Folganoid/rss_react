import React from 'react';
import FormPage from './FormPage';
import store from '../../store';
import user from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { describe, it } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

describe('FormPage', () => {
  it('FormPage <h1>Form...</h1> exists', () => {
    render(
      <Provider store={store}>
        <FormPage />
      </Provider>
    );
    expect(screen.getAllByRole('heading')[0]).toBeInTheDocument();
    expect(screen.getByText(/form page/i)).toBeInTheDocument();
  });

  it('FormPage Card integration test', async () => {
    await waitFor(async () =>
      render(
        <Provider store={store}>
          <FormPage />
        </Provider>
      )
    );
    const checkboxes = screen.getAllByRole('checkbox') as HTMLInputElement[];
    const radios = screen.getAllByRole('radio') as HTMLInputElement[];
    const btnOk = screen.getAllByRole('button')[0];
    const btnSubmit = screen.getAllByRole('button')[1];

    const inpName = screen.getByRole('textbox', { name: /name/i }) as HTMLInputElement;
    const inpDesc = screen.getByRole('textbox', { name: /description/i }) as HTMLTextAreaElement;
    const inpSite = screen.getByRole('textbox', { name: /site/i }) as HTMLInputElement;
    const inpDate = screen.getByTestId('lDate') as HTMLInputElement;
    const inpImage = screen.getByTestId('image') as HTMLInputElement;

    const blob = new Blob(['hello']);
    const file = new File([blob], 'i_angular.jpg', { type: 'image/jpg' });

    await waitFor(async () => fireEvent.click(radios[0]));
    await waitFor(async () => fireEvent.click(checkboxes[0]));
    await waitFor(async () => fireEvent.change(inpName, { target: { value: 'XXX' } }));
    await waitFor(async () => fireEvent.change(inpDesc, { target: { value: '1234567890' } }));
    await waitFor(async () => fireEvent.change(inpSite, { target: { value: 'https://xxx.xxx' } }));
    await waitFor(async () => fireEvent.change(inpDate, { target: { value: '2021-01-01' } }));
    await waitFor(async () => user.upload(inpImage, file));

    await waitFor(async () => fireEvent.click(btnSubmit));

    expect(screen.getAllByRole('article').length).toEqual(1);
    expect(inpName.value).toEqual('');
    expect(inpDesc.value).toEqual('');
    expect(inpSite.value).toEqual('');
    expect(inpImage.value).toEqual('');
    expect(checkboxes[0].checked).toEqual(false);
    expect(checkboxes[1].checked).toEqual(false);
    expect(checkboxes[2].checked).toEqual(false);

    await waitFor(async () => fireEvent.change(inpName, { target: { value: 'XXX' } }));
    await waitFor(async () => fireEvent.change(inpDesc, { target: { value: '1234567890' } }));
    await waitFor(async () => fireEvent.change(inpSite, { target: { value: 'https://xxx.xxx' } }));
    await waitFor(async () => fireEvent.change(inpDate, { target: { value: '2021-01-01' } }));
    await waitFor(async () => user.upload(inpImage, file));
    await waitFor(async () => fireEvent.click(checkboxes[1]));
    expect(screen.getAllByRole('heading').length).toEqual(3);
    await waitFor(async () => fireEvent.click(btnSubmit));
    expect(screen.getAllByRole('heading').length).toEqual(4);
    await waitFor(async () => fireEvent.click(btnOk));
    expect(screen.getAllByRole('article').length).toEqual(2);
    await waitFor(async () => user.upload(inpImage, file));
    await waitFor(async () => fireEvent.click(checkboxes[1]));
    await waitFor(async () => fireEvent.click(btnSubmit));
    await waitFor(async () => fireEvent.click(btnOk));
    expect(screen.getAllByRole('article').length).toEqual(2);
  });
});
