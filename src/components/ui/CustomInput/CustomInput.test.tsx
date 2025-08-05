import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Form, Formik } from 'formik';

import CustomInput from '@/components/ui/CustomInput/CustomInput';

describe('CustomInput', () => {
  const initialValues = { email: '' };
  const onSubmit = jest.fn();

  it('should render input with correct class and default value', () => {
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

  it('should update value on change', async () => {
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
    await userEvent.type(input, 'test@example.com');

    expect(input.value).toBe('test@example.com');
  });

  it('should show error message when input is blurred and validation fails', async () => {
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
    const user = userEvent.setup();
    await user.click(input);
    await user.tab();

    expect(await screen.findByText('Email is required')).toBeInTheDocument();
  });
});
