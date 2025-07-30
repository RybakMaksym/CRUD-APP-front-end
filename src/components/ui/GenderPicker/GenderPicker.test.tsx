import { fireEvent, render, screen } from '@testing-library/react';
import { Form, Formik } from 'formik';

import GenderPicker from '@/components/ui/GenderPicker/GenderPicker';

describe('GenderPicker', () => {
  it('renders gender radio buttons with labels', () => {
    render(
      <Formik initialValues={{ gender: '' }} onSubmit={() => {}}>
        <Form>
          <GenderPicker />
        </Form>
      </Formik>,
    );

    expect(screen.getByText('Gender:')).toBeInTheDocument();
    const maleRadio = screen.getByDisplayValue('male');
    const femaleRadio = screen.getByDisplayValue('female');
    expect(maleRadio).toBeInTheDocument();
    expect(femaleRadio).toBeInTheDocument();
    expect(maleRadio).not.toBeChecked();
    expect(femaleRadio).not.toBeChecked();
  });

  it('allows selecting male and female radios', async () => {
    render(
      <Formik initialValues={{ gender: '' }} onSubmit={() => {}}>
        <Form>
          <GenderPicker />
        </Form>
      </Formik>,
    );

    const maleRadio = screen.getByDisplayValue('male');
    const femaleRadio = screen.getByDisplayValue('female');

    fireEvent.click(maleRadio);
    expect(maleRadio).toBeChecked();
    expect(femaleRadio).not.toBeChecked();

    fireEvent.click(femaleRadio);
    expect(femaleRadio).toBeChecked();
    expect(maleRadio).not.toBeChecked();
  });
});
