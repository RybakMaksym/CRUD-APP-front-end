import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Form, Formik } from 'formik';

import CustomCheckbox from '@/components/ui/CustomCheckbox/CustomCheckbox';

describe('CustomCheckbox', () => {
  const initialValues = { testCheckbox: false };
  function renderWithFormik(props: any) {
    return render(
      <Formik initialValues={initialValues} onSubmit={() => {}}>
        <Form>
          <CustomCheckbox {...props} />
        </Form>
      </Formik>,
    );
  }

  it('should render checkbox with label', () => {
    renderWithFormik({ name: 'testCheckbox', label: 'Accept Terms' });
    const checkbox = screen.getByRole('checkbox');

    expect(screen.getByText('Accept Terms')).toBeInTheDocument();
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  it('should check checkbox when clicked', async () => {
    renderWithFormik({ name: 'testCheckbox', label: 'Accept Terms' });
    const checkbox = screen.getByRole('checkbox');

    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    await userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it('should display error message when touched and has error', async () => {
    const validate = (values: any) => {
      const errors: any = {};

      if (!values.testCheckbox) {
        errors.testCheckbox = 'Required';
      }

      return errors;
    };

    render(
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={() => {}}
      >
        {({ handleSubmit, setFieldTouched }) => (
          <Form>
            <CustomCheckbox name="testCheckbox" label="Accept Terms" />
            <button
              type="button"
              onClick={() => {
                setFieldTouched('testCheckbox', true);
                handleSubmit();
              }}
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>,
    );

    expect(screen.queryByText('Required')).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(await screen.findByText('Required')).toBeInTheDocument();
  });
});
