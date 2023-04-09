import React from 'react';
import { describe, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import FormAddCard from './FormAddCard';
import user from '@testing-library/user-event';
import { Provider } from 'react-redux';
import store from '../../../store';

describe('FormA components exist', () => {
  it('FormAddCard <input name="name"> exists', () => {
    render(
      <Provider store={store}>
        <FormAddCard controlModalOk={vi.fn()} />
      </Provider>
    );

    expect(
      screen.getByRole('textbox', {
        name: /name/i,
      })
    ).toBeInTheDocument();
  });

  it('FormAddCard <input name="description"> exists', () => {
    render(
      <Provider store={store}>
        <FormAddCard controlModalOk={vi.fn()} />
      </Provider>
    );

    expect(
      screen.getByRole('textbox', {
        name: /description/i,
      })
    ).toBeInTheDocument();
  });

  it('FormAddCard 2x<select> exist', () => {
    render(
      <Provider store={store}>
        <FormAddCard controlModalOk={vi.fn()} />
      </Provider>
    );
    expect(screen.getAllByRole('combobox').length).toEqual(2);
  });

  it('FormAddCard 2x<input type="radio"> exist', () => {
    render(
      <Provider store={store}>
        <FormAddCard controlModalOk={vi.fn()} />
      </Provider>
    );
    expect(screen.getAllByRole('radio').length).toEqual(2);
  });

  it('FormAddCard <button> exists', () => {
    render(
      <Provider store={store}>
        <FormAddCard controlModalOk={vi.fn()} />
      </Provider>
    );
    expect(screen.getAllByRole('button').length).toEqual(2);
  });
});

describe('FormAddCard components functional', () => {
  it('FormAddCard <input name="name"> works', async () => {
    render(
      <Provider store={store}>
        <FormAddCard controlModalOk={vi.fn()} />
      </Provider>
    );
    const inp = screen.getByRole('textbox', { name: /name/i }) as HTMLInputElement;
    await waitFor(async () => fireEvent.change(inp, { target: { value: 'xxX' } }));
    expect(inp.value).toEqual('xxX');
  });

  it('FormAddCard <input name="description"> works', async () => {
    render(
      <Provider store={store}>
        <FormAddCard controlModalOk={vi.fn()} />
      </Provider>
    );
    const inp = screen.getByRole('textbox', { name: /description/i }) as HTMLTextAreaElement;
    await waitFor(async () => fireEvent.change(inp, { target: { value: 'xxX' } }));
    expect(inp.value).toEqual('xxX');
  });

  it('FormAddCard <input type="checkbox"> works', async () => {
    render(
      <Provider store={store}>
        <FormAddCard controlModalOk={vi.fn()} />
      </Provider>
    );
    const checkboxes = screen.getAllByRole('checkbox') as HTMLInputElement[];
    expect(checkboxes.length).toEqual(3);
    expect(checkboxes[0].checked).toEqual(false);
    expect(checkboxes[1].checked).toEqual(false);
    expect(checkboxes[2].checked).toEqual(false);

    await waitFor(async () => fireEvent.click(checkboxes[0]));
    await waitFor(async () => fireEvent.click(checkboxes[1]));
    await waitFor(async () => fireEvent.click(checkboxes[2]));
    expect(checkboxes[0].checked).toEqual(true);
    expect(checkboxes[1].checked).toEqual(true);
    expect(checkboxes[2].checked).toEqual(true);

    await waitFor(async () => fireEvent.click(checkboxes[0]));
    await waitFor(async () => fireEvent.click(checkboxes[1]));
    await waitFor(async () => fireEvent.click(checkboxes[2]));
    expect(checkboxes[0].checked).toEqual(false);
    expect(checkboxes[1].checked).toEqual(false);
    expect(checkboxes[2].checked).toEqual(false);
  });

  it('FormAddCard form validation', async () => {
    render(
      <Provider store={store}>
        <FormAddCard controlModalOk={vi.fn()} />
      </Provider>
    );
    const checkboxes = screen.getAllByRole('checkbox') as HTMLInputElement[];
    const radios = screen.getAllByRole('radio') as HTMLInputElement[];
    const btn = screen.getAllByRole('button') as HTMLButtonElement[];
    const selects = screen.getAllByRole('combobox') as HTMLSelectElement[];
    const inpName = screen.getByRole('textbox', { name: /name/i }) as HTMLInputElement;
    const inpDesc = screen.getByRole('textbox', { name: /description/i }) as HTMLTextAreaElement;
    const inpSite = screen.getByRole('textbox', { name: /site/i }) as HTMLInputElement;
    const inpDate = screen.getByTestId('lDate') as HTMLInputElement;
    const inpImage = screen.getByTestId('image') as HTMLInputElement;

    // form is not filled
    await waitFor(async () => fireEvent.click(radios[0]));
    await waitFor(async () => fireEvent.change(inpName, { target: { value: 'XX' } }));
    await waitFor(async () => fireEvent.change(inpDesc, { target: { value: '123456789' } }));
    await waitFor(async () => fireEvent.change(inpSite, { target: { value: 'https://xxx' } }));
    await waitFor(async () => fireEvent.change(inpDate, { target: { value: '2024-01-01' } }));
    expect(btn[0].disabled).toBeFalsy();
    await waitFor(async () => fireEvent.click(btn[0]));
    expect(btn[0].disabled).toBeTruthy();
    expect(inpName.value).toEqual('XX');

    const blob2 = new Blob(['hello2']);
    const file2 = new File([blob2], 'i_angular.txt', { type: 'text/plain' });

    await waitFor(async () => user.upload(inpImage, file2));
    await waitFor(async () => fireEvent.change(inpName, { target: { value: 'XXX' } }));
    await waitFor(async () => fireEvent.click(btn[0]));
    await waitFor(async () => fireEvent.change(selects[0], { target: { value: '' } }));
    await waitFor(async () => fireEvent.change(selects[1], { target: { value: '' } }));

    expect(inpName.value).toEqual('XXX');

    await waitFor(async () => fireEvent.change(inpDesc, { target: { value: '1234567890' } }));
    await waitFor(async () => fireEvent.change(inpSite, { target: { value: 'https://xxx.xxx' } }));
    await waitFor(async () => fireEvent.change(selects[0], { target: { value: '2009' } }));
    await waitFor(async () => fireEvent.change(selects[1], { target: { value: 'May' } }));
    await waitFor(async () => fireEvent.click(btn[0]));
    expect(inpName.value).toEqual('XXX');

    await waitFor(async () => fireEvent.click(checkboxes[0]));
    await waitFor(async () => fireEvent.click(btn[0]));
    const blob = new Blob(['hello']);
    const file = new File([blob], 'i_angular.jpg', { type: 'image/jpg' });
    await waitFor(async () => user.upload(inpImage, file));
    expect(inpName.value).toEqual('XXX');

    await waitFor(async () => fireEvent.click(checkboxes[1]));
    await waitFor(async () => fireEvent.click(btn[0]));
    expect(inpName.value).toEqual('XXX');

    await waitFor(async () => fireEvent.click(checkboxes[2]));
    await waitFor(async () => fireEvent.click(btn[0]));
    expect(inpName.value).toEqual('XXX');

    // form filled
    await waitFor(async () => fireEvent.change(inpDate, { target: { value: '2022-01-01' } }));
    expect(btn[0].disabled).toBeFalsy();
    await waitFor(async () => fireEvent.click(btn[0]));
    expect(btn[0].disabled).toBeFalsy();

    expect(inpName.value).toEqual('');
    expect(inpDesc.value).toEqual('');
    expect(inpSite.value).toEqual('');
    expect(inpImage.value).toEqual('');
    expect(checkboxes[0].checked).toEqual(false);
    expect(checkboxes[1].checked).toEqual(false);
    expect(checkboxes[2].checked).toEqual(false);

    //reset
    await waitFor(async () => fireEvent.click(checkboxes[2]));
    await waitFor(async () => fireEvent.click(btn[1]));
    expect(checkboxes[2].checked).toEqual(false);
  });
});
