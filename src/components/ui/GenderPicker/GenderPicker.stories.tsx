import type { Meta, StoryObj } from '@storybook/react';
import { Form, Formik } from 'formik';

import GenderPicker from '@/components/ui/GenderPicker/GenderPicker';

const meta: Meta<typeof GenderPicker> = {
  title: 'UI/GenderPicker',
  component: GenderPicker,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof GenderPicker>;

export const Default: Story = {
  render: () => (
    <Formik initialValues={{ gender: '' }} onSubmit={() => {}}>
      <Form>
        <GenderPicker />
      </Form>
    </Formik>
  ),
};
