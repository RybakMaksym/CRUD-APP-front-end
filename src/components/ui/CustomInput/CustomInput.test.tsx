import { fireEvent, render, screen } from '@testing-library/react';
import { Form, Formik } from 'formik';

import CustomInput from '@/components/ui/CustomInput/CustomInput';

describe('CustomInput', () => {
  const initialValues = { email: '' };
  const onSubmit = jest.fn();

  it('renders input with correct class and default value', () => {
    render(
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form>
          <CustomInput name="email" placeholder="Enter email" />
        </Form>
      </Formik>,
    );

    const input = screen.getByPlaceholderText(
      'Enter email',
    ) as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('');
  });

  it('updates value on change', () => {
    render(
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form>
          <CustomInput name="email" placeholder="Enter email" />
        </Form>
      </Formik>,
    );

    const input = screen.getByPlaceholderText(
      'Enter email',
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    expect(input.value).toBe('test@example.com');
  });

  it('shows error message when input is blurred and validation fails', async () => {
    const validate = (values: typeof initialValues) => {
      const errors: { email?: string } = {};

      if (!values.email) errors.email = 'Email is required';

      return errors;
    };

    render(
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={validate}
      >
        <Form>
          <CustomInput name="email" placeholder="Enter email" />
        </Form>
      </Formik>,
    );

    const input = screen.getByPlaceholderText('Enter email');
    fireEvent.blur(input);

    expect(await screen.findByText('Email is required')).toBeInTheDocument();
  });
});
