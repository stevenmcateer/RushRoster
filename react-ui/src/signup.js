import React from 'react'
import { Form, Input, TextArea, Button, Select } from 'semantic-ui-react'


const OrganizationOptions = [
  { key: '001', text: 'TKE', value: '123' },
  { key: '002', text: 'AGD', value: 'AGD' },
  { key: '003', text: 'AXiD', value: 'AXiD' },
]

const FormExampleFieldControlId = () => (
<div verticalalign='middle'>
  <Form>
    <Form.Group widths='equal'>
      <Form.Field
        id='form-input-control-full-name'
        control={Input}
        label='Full Name'
        placeholder='Full Name'
      />
      <Form.Field
        id='form-input-control-email'
        control={Input}
        label='Email'
        placeholder='Email Address'
      />
      <Form.Field
        control={Select}
        options={OrganizationOptions}
        label={{ children: 'Organization', htmlFor: 'form-select-control-Organization' }}
        placeholder='Organization'
        search
        searchInput={{ id: 'form-select-control-Organization' }}
      />
    </Form.Group>
    <Form.Group widths='equal'>
      <Form.Field fluid
        icon='lock'
        type='password'
        id='form-input-control-password'
        control={Input}
        label='Password'
        placeholder='Password'
      />
      <Form.Field fluid
        icon='lock'
        type='password'
        id='form-input-control-passwordconfirm'
        control={Input}
        label='Enter Password Again'
        placeholder='Password'
      />
    </Form.Group>
    <Form.Field
      id='form-button-control-public'
      control={Button}
      content='Submit'
      // onClick={props.callback}
      // label='Submit'
    />
  </Form>
</div>
)

export default FormExampleFieldControlId
