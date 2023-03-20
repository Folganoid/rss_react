import React from 'react';
import { describe, it, vi } from 'vitest';
import { fireEvent, render, screen, act } from '@testing-library/react';
import FormAddCard from './FormAddCard';
import user from '@testing-library/user-event';

describe('FormA components exist', () => {
  const addCard = vi.fn();

  it('FormA <input name="name"> exists', () => {
    render(<FormAddCard addCard={addCard} />);

    expect(
      screen.getByRole('textbox', {
        name: /name/i,
      })
    ).toBeInTheDocument();
  });

  it('FormA <input name="description"> exists', () => {
    render(<FormAddCard addCard={addCard} />);

    expect(
      screen.getByRole('textbox', {
        name: /description/i,
      })
    ).toBeInTheDocument();
  });

  it('FormA 2x<select> exist', () => {
    render(<FormAddCard addCard={addCard} />);
    expect(screen.getAllByRole('combobox').length).toEqual(2);
  });

  it('FormA 2x<input type="radio"> exist', () => {
    render(<FormAddCard addCard={addCard} />);
    expect(screen.getAllByRole('radio').length).toEqual(2);
  });

  it('FormA <button> exists', () => {
    render(<FormAddCard addCard={addCard} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});

describe('FormA components functional', () => {
  const addCard = vi.fn();
  it('FormA <button> disabled as default', () => {
    render(<FormAddCard addCard={addCard} />);
    const btn = screen.getByRole('button') as HTMLButtonElement;
    expect(btn.disabled).toEqual(true);
  });

  it('FormA <button> disabled=false if input typed', async () => {
    await act(async () => render(<FormAddCard addCard={addCard} />));
    const btn = screen.getByRole('button') as HTMLButtonElement;
    const inp = screen.getByRole('textbox', { name: /name/i }) as HTMLInputElement;
    await act(async () => fireEvent.change(inp, { target: { value: 'xxX' } }));
    expect(btn.disabled).toEqual(false);
  });

  it('FormA <input name="name"> works', async () => {
    await act(async () => render(<FormAddCard addCard={addCard} />));
    const inp = screen.getByRole('textbox', { name: /name/i }) as HTMLInputElement;
    await act(async () => fireEvent.change(inp, { target: { value: 'xxX' } }));
    expect(inp.value).toEqual('xxX');
  });

  it('FormA <input name="description"> works', async () => {
    await act(async () => render(<FormAddCard addCard={addCard} />));
    const inp = screen.getByRole('textbox', { name: /description/i }) as HTMLTextAreaElement;
    await act(async () => fireEvent.change(inp, { target: { value: 'xxX' } }));
    expect(inp.value).toEqual('xxX');
  });

  it('FormA <input type="radio"> works', async () => {
    await act(async () => render(<FormAddCard addCard={addCard} />));
    const radios = screen.getAllByRole('radio') as HTMLInputElement[];
    await act(async () => fireEvent.click(radios[0]));
    expect(screen.getByText('Yes')).toBeInTheDocument();
    await act(async () => fireEvent.click(radios[1]));
    expect(screen.getByText('No')).toBeInTheDocument();
  });

  it('FormA <input type="checkbox"> works', async () => {
    await act(async () => render(<FormAddCard addCard={addCard} />));
    const checkboxes = screen.getAllByRole('checkbox') as HTMLInputElement[];
    expect(checkboxes.length).toEqual(3);
    expect(checkboxes[0].checked).toEqual(false);
    expect(checkboxes[1].checked).toEqual(false);
    expect(checkboxes[2].checked).toEqual(false);

    await act(async () => fireEvent.click(checkboxes[0]));
    await act(async () => fireEvent.click(checkboxes[1]));
    await act(async () => fireEvent.click(checkboxes[2]));
    expect(checkboxes[0].checked).toEqual(true);
    expect(checkboxes[1].checked).toEqual(true);
    expect(checkboxes[2].checked).toEqual(true);

    await act(async () => fireEvent.click(checkboxes[0]));
    expect(checkboxes[0].checked).toEqual(false);
  });

  it('FormA form validation', async () => {
    await act(async () => render(<FormAddCard addCard={addCard} />));
    const checkboxes = screen.getAllByRole('checkbox') as HTMLInputElement[];
    const radios = screen.getAllByRole('radio') as HTMLInputElement[];
    const btn = screen.getByRole('button') as HTMLButtonElement;

    const inpName = screen.getByRole('textbox', { name: /name/i }) as HTMLInputElement;
    const inpDesc = screen.getByRole('textbox', { name: /description/i }) as HTMLTextAreaElement;
    const inpSite = screen.getByRole('textbox', { name: /site/i }) as HTMLInputElement;
    const inpDate = screen.getByTestId('lDate') as HTMLInputElement;
    const inpImage = screen.getByTestId('image') as HTMLInputElement;

    const blob = new Blob(['hello']);
    const file = new File([blob], 'i_angular.jpg', { type: 'image/jpg' });

    await act(async () => fireEvent.click(radios[0]));
    await act(async () => fireEvent.change(inpName, { target: { value: 'XX' } }));
    await act(async () => fireEvent.change(inpDesc, { target: { value: '123456789' } }));
    await act(async () => fireEvent.change(inpSite, { target: { value: 'https://xxx' } }));
    await act(async () => fireEvent.change(inpDate, { target: { value: '2024-01-01' } }));
    await act(async () => fireEvent.click(btn));
    expect(btn.disabled).toEqual(true);

    await act(async () => user.upload(inpImage, file));
    await act(async () => fireEvent.change(inpName, { target: { value: 'XXX' } }));
    await act(async () => fireEvent.click(btn));
    expect(btn.disabled).toEqual(true);
    expect(inpName.value).toEqual('XXX');

    await act(async () => fireEvent.change(inpDesc, { target: { value: '1234567890' } }));
    await act(async () => fireEvent.change(inpSite, { target: { value: 'https://xxx.xxx' } }));
    await act(async () => fireEvent.click(btn));
    expect(btn.disabled).toEqual(true);
    expect(inpName.value).toEqual('XXX');

    await act(async () => fireEvent.click(checkboxes[0]));
    await act(async () => fireEvent.click(btn));
    expect(btn.disabled).toEqual(true);
    expect(inpName.value).toEqual('XXX');

    await act(async () => fireEvent.click(checkboxes[1]));
    await act(async () => fireEvent.click(btn));
    expect(btn.disabled).toEqual(true);
    expect(inpName.value).toEqual('XXX');

    await act(async () => fireEvent.click(checkboxes[2]));
    await act(async () => fireEvent.click(btn));
    expect(btn.disabled).toEqual(true);
    expect(inpName.value).toEqual('XXX');
    expect(screen.getByText('Yes')).toBeInTheDocument();

    await act(async () => fireEvent.change(inpDate, { target: { value: '2022-01-01' } }));
    expect(btn.disabled).toEqual(false);
    await act(async () => fireEvent.click(btn));
    expect(btn.disabled).toEqual(true);

    expect(inpName.value).toEqual('');
    expect(inpDesc.value).toEqual('');
    expect(inpSite.value).toEqual('');
    expect(inpImage.value).toEqual('');
    expect(checkboxes[0].checked).toEqual(false);
    expect(checkboxes[1].checked).toEqual(false);
    expect(checkboxes[2].checked).toEqual(false);
    expect(screen.getByText('No')).toBeInTheDocument();
  });
});
