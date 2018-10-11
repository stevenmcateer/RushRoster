import React from 'react'
import { Form, Input, Select } from 'semantic-ui-react'


const OrganizationOptions = [
  { key: '001', text: 'TKE', value: 'TKE' },
  { key: '002', text: 'AGD', value: 'AGD' },
  { key: '003', text: 'AXiD', value: 'AXiD' },
  { key: '004', text: 'SAE', value: 'SAE' },
]

const SignUpForm = () => (
<div verticalalign='middle'>
  <Form>
    <Form.Group widths='equal'>
      <Form.Field
        required
        id='form-input-control-full-name'
        control={Input}
        label='Full Name'
        placeholder='Full Name'
      />
      <Form.Field
        required
        id='form-input-control-email'
        control={Input}
        label='Email'
        placeholder='Email Address'
      />
      <Form.Field
        required
        control={Select}
        options={OrganizationOptions}
        label={{ children: 'Organization', htmlFor: 'form-select-control-Organization' }}
        placeholder='Organization'
        search
        searchInput={{ id: 'form-select-control-Organization' }}
      />
    </Form.Group>
    <Form.Group widths='equal'>
      <Form.Field
        required
        fluid
        icon='lock'
        type='password'
        id='form-input-control-password'
        control={Input}
        label='Password'
        placeholder='Password'
      />
      <Form.Field
        fluid
        required
        icon='lock'
        type='password'
        id='form-input-control-passwordconfirm'
        control={Input}
        label='Enter Password Again'
        placeholder='Password'
      />
    </Form.Group>
  </Form>
</div>
)

export default SignUpForm;
