/**
 * Project H6 Backend Template
 *
 * @author Xu Lian (xu.lian@uts.edu.au)
 */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Layout, Breadcrumb, Modal, Form, Input, Button, Checkbox, Select, DatePicker } from 'antd';
import API from '../API';
import './SignUpPage.css';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToProfile: false
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((error, values) => {
      if (error === null) {
        let { userName, password, firstname, lastname, gender, birthday, email, prefix, phone } = values;
        API.UserSignUp({
          user: {
            username: userName,
            password: password
          },
          profile: {
            firstname: firstname,
            lastname: lastname,
            gender: gender,
            birthday: birthday.format('YYYY-MM-DD'),
            email_address: email,
            telephone_number: `${prefix} ${phone}`
          }
        }, (data) => {
          let { user, profile, error } = data;
          if (error) {
            switch (error) {
              case API.Errors.Duplicate:
                Modal.error({
                  title: 'Username',
                  content: 'Your username already been used.'
                });
                break;
              default:
                Modal.error({
                  title: 'Error',
                  content: `Code ${error}`
                });
            }
          } else {
            this.setState({
              redirectToProfile: true
            });
          }
        });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    let { redirectToProfile } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 9 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 15 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 15,
          offset: 9,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '61',
    })(
      <Select style={{ width: 70 }}>
        <Select.Option value="61">+61</Select.Option>
      </Select>
    );
    return redirectToProfile ? (
      <Redirect to="/profile" />
    ) : (
      <Form onSubmit={(e) => this.handleSubmit(e)} className="form">
        <Form.Item
          {...formItemLayout}
          label="Username"
        >
          {getFieldDecorator('userName', {
            rules: [{
              required: true, message: 'Please input your username!',
            }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="Password"
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: 'Please input your password!',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="password" />
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="Confirm Password"
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: 'Please confirm your password!',
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur} />
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="First Name"
        >
          {getFieldDecorator('firstname', {
            rules: [{ required: true, message: 'Please input your first name!' }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="Last Name"
        >
          {getFieldDecorator('lastname', {
            rules: [{ required: true, message: 'Please input your last name!' }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="Gender"
        >
          {getFieldDecorator('gender', {
            rules: [{ required: true, message: 'Please choose your gender!' }],
          })(
            <Select>
              <Select.Option value="male">Male</Select.Option>
              <Select.Option value="female">Female</Select.Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="Birthday"
        >
          {getFieldDecorator('birthday', {
            rules: [{ required: true, message: 'Please select your birthday!' }],
          })(
            <DatePicker />
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="E-mail Address"
        >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="Telephone Number"
        >
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: 'Please input your phone number!' }],
          })(
            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          {getFieldDecorator('agreement', {
            valuePropName: 'checked',
            rules: [{ required: true, message: 'You must accept the terms and conditions!' }]
          })(
            <Checkbox>I accept the <a href="#">terms and conditions</a>.</Checkbox>
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button className="button-submit" type="primary" htmlType="submit">Sign Up</Button>
        </Form.Item>
      </Form>
    )
  }
}

const WrappedSignUpForm = Form.create()(SignUpForm);

export default class SignUpPage extends Component {
  render() {
    return (
      <Layout className="layout">
        <Layout.Header className="layout-header">
          <Breadcrumb>
            <Breadcrumb.Item className="breadcrumb-item">
              <span>Sign Up</span>
            </Breadcrumb.Item>
          </Breadcrumb>
        </Layout.Header>
        <Layout.Content className="layout-content">
          <WrappedSignUpForm />
        </Layout.Content>
        <Layout.Footer className="layout-footer"></Layout.Footer>
      </Layout>
    )
  }
}
