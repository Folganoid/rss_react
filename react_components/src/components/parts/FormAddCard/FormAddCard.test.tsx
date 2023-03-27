import React from 'react';
import { describe, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import FormAddCard from './FormAddCard';
import user from '@testing-library/user-event';

describe('FormA components exist', () => {
  const addCard = vi.fn();

  it('FormAddCard <input name="name"> exists', () => {
    render(<FormAddCard addCard={addCard} controlModalOk={vi.fn()} />);

    expect(
      screen.getByRole('textbox', {
        name: /name/i,
      })
    ).toBeInTheDocument();
  });

  it('FormAddCard <input name="description"> exists', () => {
    render(<FormAddCard addCard={addCard} controlModalOk={vi.fn()} />);

    expect(
      screen.getByRole('textbox', {
        name: /description/i,
      })
    ).toBeInTheDocument();
  });

  it('FormAddCard 2x<select> exist', () => {
    render(<FormAddCard addCard={addCard} controlModalOk={vi.fn()} />);
    expect(screen.getAllByRole('combobox').length).toEqual(2);
  });

  it('FormAddCard 2x<input type="radio"> exist', () => {
    render(<FormAddCard addCard={addCard} controlModalOk={vi.fn()} />);
    expect(screen.getAllByRole('radio').length).toEqual(2);
  });

  it('FormAddCard <button> exists', () => {
    render(<FormAddCard controlModalOk={vi.fn()} addCard={addCard} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});

describe('FormAddCard components functional', () => {
  const addCard = vi.fn();

  it('FormAddCard <input name="name"> works', async () => {
    await waitFor(async () => render(<FormAddCard addCard={addCard} controlModalOk={vi.fn()} />));
    const inp = screen.getByRole('textbox', { name: /name/i }) as HTMLInputElement;
    await waitFor(async () => fireEvent.change(inp, { target: { value: 'xxX' } }));
    expect(inp.value).toEqual('xxX');
  });

  it('FormAddCard <input name="description"> works', async () => {
    await waitFor(async () => render(<FormAddCard addCard={addCard} controlModalOk={vi.fn()} />));
    const inp = screen.getByRole('textbox', { name: /description/i }) as HTMLTextAreaElement;
    await waitFor(async () => fireEvent.change(inp, { target: { value: 'xxX' } }));
    expect(inp.value).toEqual('xxX');
  });

  it('FormAddCard <input type="checkbox"> works', async () => {
    await waitFor(async () => render(<FormAddCard addCard={addCard} controlModalOk={vi.fn()} />));
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
    await waitFor(async () => render(<FormAddCard addCard={addCard} controlModalOk={vi.fn()} />));
    const checkboxes = screen.getAllByRole('checkbox') as HTMLInputElement[];
    const radios = screen.getAllByRole('radio') as HTMLInputElement[];
    const btn = screen.getByRole('button') as HTMLButtonElement;
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
    expect(btn.disabled).toBeFalsy();
    await waitFor(async () => fireEvent.click(btn));
    expect(btn.disabled).toBeTruthy();
    expect(inpName.value).toEqual('XX');

    const blob2 = new Blob(['hello2']);
    const file2 = new File([blob2], 'i_angular.txt', { type: 'text/plain' });

    await waitFor(async () => user.upload(inpImage, file2));
    await waitFor(async () => fireEvent.change(inpName, { target: { value: 'XXX' } }));
    await waitFor(async () => fireEvent.click(btn));
    await waitFor(async () => fireEvent.change(selects[0], { target: { value: '' } }));
    await waitFor(async () => fireEvent.change(selects[1], { target: { value: '' } }));

    expect(inpName.value).toEqual('XXX');

    await waitFor(async () => fireEvent.change(inpDesc, { target: { value: '1234567890' } }));
    await waitFor(async () => fireEvent.change(inpSite, { target: { value: 'https://xxx.xxx' } }));
    await waitFor(async () => fireEvent.change(selects[0], { target: { value: '2009' } }));
    await waitFor(async () => fireEvent.change(selects[1], { target: { value: 'May' } }));
    await waitFor(async () => fireEvent.click(btn));
    expect(inpName.value).toEqual('XXX');

    await waitFor(async () => fireEvent.click(checkboxes[0]));
    await waitFor(async () => fireEvent.click(btn));
    const blob = new Blob(['hello']);
    const file = new File([blob], 'i_angular.jpg', { type: 'image/jpg' });
    await waitFor(async () => user.upload(inpImage, file));
    expect(inpName.value).toEqual('XXX');

    await waitFor(async () => fireEvent.click(checkboxes[1]));
    await waitFor(async () => fireEvent.click(btn));
    expect(inpName.value).toEqual('XXX');

    await waitFor(async () => fireEvent.click(checkboxes[2]));
    await waitFor(async () => fireEvent.click(btn));
    expect(inpName.value).toEqual('XXX');

    // form filled
    await waitFor(async () => fireEvent.change(inpDate, { target: { value: '2022-01-01' } }));
    expect(btn.disabled).toBeFalsy();
    await waitFor(async () => fireEvent.click(btn));
    expect(btn.disabled).toBeFalsy();

    expect(inpName.value).toEqual('');
    expect(inpDesc.value).toEqual('');
    expect(inpSite.value).toEqual('');
    expect(inpImage.value).toEqual('');
    expect(checkboxes[0].checked).toEqual(false);
    expect(checkboxes[1].checked).toEqual(false);
    expect(checkboxes[2].checked).toEqual(false);
  });
});
