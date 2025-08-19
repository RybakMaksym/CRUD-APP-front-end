import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Form, Formik } from 'formik';

import GenderPicker from '@/components/ui/GenderPicker/GenderPicker';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('GenderPicker', () => {
  it('should render gender radio buttons with labels', () => {
    render(
      <Formik initialValues={{ gender: '' }} onSubmit={() => {}}>
        <Form>
          <GenderPicker />
        </Form>
      </Formik>,
    );
    const maleRadio = screen.getByDisplayValue('male');
    const femaleRadio = screen.getByDisplayValue('female');

    expect(screen.getByText('gender')).toBeInTheDocument();
    expect(maleRadio).toBeInTheDocument();
    expect(femaleRadio).toBeInTheDocument();
    expect(maleRadio).not.toBeChecked();
    expect(femaleRadio).not.toBeChecked();
  });

  it('should allow selecting male and female radios', async () => {
    render(
      <Formik initialValues={{ gender: '' }} onSubmit={() => {}}>
        <Form>
          <GenderPicker />
        </Form>
      </Formik>,
    );
    const maleRadio = screen.getByDisplayValue('male');
    const femaleRadio = screen.getByDisplayValue('female');

    await userEvent.click(maleRadio);
    expect(maleRadio).toBeChecked();
    expect(femaleRadio).not.toBeChecked();
    await userEvent.click(femaleRadio);
    expect(femaleRadio).toBeChecked();
    expect(maleRadio).not.toBeChecked();
  });
});
