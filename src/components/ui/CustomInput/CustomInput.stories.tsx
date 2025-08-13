import type { Meta, StoryObj } from '@storybook/react';
import { Form, Formik } from 'formik';

import CustomInput from '@/components/ui/CustomInput/CustomInput';

const meta: Meta<typeof CustomInput> = {
  title: 'UI/CustomInput',
  component: CustomInput,
  tags: ['autodocs'],
  argTypes: {
    background: {
      control: 'select',
      options: ['white', 'dark'],
    },
    placeholder: { control: 'text' },
    type: { control: 'text' },
    name: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof CustomInput>;

const Template = (args: any) => (
  <Formik initialValues={{ [args.name]: '' }} onSubmit={() => {}}>
    <Form>
      <CustomInput {...args} />
    </Form>
  </Formik>
);

export const WhiteBackground: Story = {
  render: (args) => <Template {...args} />,
  args: {
    name: 'email',
    placeholder: 'Enter email',
    background: 'white',
    type: 'email',
  },
};

export const DarkBackground: Story = {
  render: (args) => <Template {...args} />,
  args: {
    name: 'username',
    placeholder: 'Enter username',
    background: 'dark',
    type: 'text',
  },
};
