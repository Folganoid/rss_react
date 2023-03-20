import React from 'react';
import { describe, it } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import FormPage from './FormPage';
import user from '@testing-library/user-event';

describe('FormPage', () => {
  it('FormPage <h1>Form...</h1> exists', () => {
    render(<FormPage />);
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByText(/form page/i)).toBeInTheDocument();
  });

  it('FormPage Card creating', async () => {
    await waitFor(async () => render(<FormPage />));
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

    await waitFor(async () => fireEvent.click(radios[0]));
    await waitFor(async () => fireEvent.click(checkboxes[0]));
    await waitFor(async () => fireEvent.change(inpName, { target: { value: 'XXX' } }));
    await waitFor(async () => fireEvent.change(inpDesc, { target: { value: '1234567890' } }));
    await waitFor(async () => fireEvent.change(inpSite, { target: { value: 'https://xxx.xxx' } }));
    await waitFor(async () => fireEvent.change(inpDate, { target: { value: '2021-01-01' } }));
    await waitFor(async () => user.upload(inpImage, file));

    await waitFor(async () => fireEvent.click(btn));

    expect(screen.getAllByRole('article').length).toEqual(1);
    expect(btn.disabled).toEqual(true);
    expect(inpName.value).toEqual('');
    expect(inpDesc.value).toEqual('');
    expect(inpSite.value).toEqual('');
    expect(inpImage.value).toEqual('');
    expect(checkboxes[0].checked).toEqual(false);
    expect(checkboxes[1].checked).toEqual(false);
    expect(checkboxes[2].checked).toEqual(false);
    expect(screen.getByText('No')).toBeInTheDocument();

    await waitFor(async () => fireEvent.change(inpName, { target: { value: 'XXX' } }));
    await waitFor(async () => fireEvent.change(inpDesc, { target: { value: '1234567890' } }));
    await waitFor(async () => fireEvent.change(inpSite, { target: { value: 'https://xxx.xxx' } }));
    await waitFor(async () => fireEvent.change(inpDate, { target: { value: '2021-01-01' } }));
    await waitFor(async () => user.upload(inpImage, file));
    await waitFor(async () => fireEvent.click(checkboxes[1]));
    await waitFor(async () => fireEvent.click(btn));
    expect(screen.getAllByRole('article').length).toEqual(2);

    await waitFor(async () => user.upload(inpImage, file));
    await waitFor(async () => fireEvent.click(checkboxes[1]));
    await waitFor(async () => fireEvent.click(btn));
    expect(screen.getAllByRole('article').length).toEqual(2);
  });
});
