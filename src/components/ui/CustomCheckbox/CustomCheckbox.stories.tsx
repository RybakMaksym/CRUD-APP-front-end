import type { Meta, StoryObj } from '@storybook/react';
import { Form, Formik } from 'formik';

import CustomCheckbox from '@/components/ui/CustomCheckbox/CustomCheckbox';

const meta: Meta<typeof CustomCheckbox> = {
  title: 'UI/CustomCheckbox',
  component: CustomCheckbox,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    labelColor: { control: 'radio', options: ['white', 'dark'] },
    checked: { control: false },
    disabled: { control: 'boolean' },
  },
  globals: {
    backgrounds: {
      value: 'dark',
    },
  },
};

export default meta;
type Story = StoryObj<typeof CustomCheckbox>;

const Template = (args: any) => (
  <Formik initialValues={{ [args.name]: false }} onSubmit={() => {}}>
    <Form>
      <CustomCheckbox {...args} />
    </Form>
  </Formik>
);

export const Default: Story = {
  render: (args) => <Template {...args} />,
  args: {
    name: 'acceptTerms',
    label: 'Accept terms and conditions',
    labelColor: 'white',
    disabled: false,
  },
};

export const Checked: Story = {
  render: (args) => <Template {...args} />,
  args: {
    name: 'acceptTerms',
    label: 'Accept terms and conditions',
    labelColor: 'white',
    disabled: false,
  },
};

export const Disabled: Story = {
  render: (args) => <Template {...args} />,
  args: {
    name: 'acceptTerms',
    label: 'Accept terms and conditions',
    labelColor: 'white',
    disabled: true,
  },
};

export const DarkLabel: Story = {
  render: (args) => <Template {...args} />,
  args: {
    name: 'acceptTerms',
    label: 'Accept terms and conditions',
    labelColor: 'dark',
    disabled: false,
  },
  globals: {
    backgrounds: {
      value: 'white',
    },
  },
};
