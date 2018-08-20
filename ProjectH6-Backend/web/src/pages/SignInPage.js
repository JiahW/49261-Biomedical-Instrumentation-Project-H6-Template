/**
 * Project H6 Backend Template
 *
 * @author Xu Lian (xu.lian@uts.edu.au)
 */
import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Layout, Breadcrumb, Modal, Form, Input, Button, Checkbox, Icon } from 'antd';
import API from '../API';
import './SignInPage.css';

class SignInForm extends Component {
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
        let { userName, password, remember } = values;
        API.UserSignIn({
          user: {
            username: userName,
            password: password
          },
          persistent: remember
        }, (data) => {
          let { user, error } = data;
          if (error) {
            switch (error) {
              case API.Errors.NotFound:
                Modal.error({
                  title: 'Username',
                  content: 'Your username cannot be found.'
                });
                break;
              case API.Errors.PasswordMismatch:
                Modal.error({
                  title: 'Password',
                  content: 'Your password does not match the existing record.'
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
    return redirectToProfile ? (
      <Redirect to="/profile" />
    ) : (
      <Form onSubmit={(e) => this.handleSubmit(e)} className="form">
        <Form.Item>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <Link className="link-reset-password" to="/forgot-password">Forgot password</Link>
          <Button type="primary" htmlType="submit" className="button-submit">Sign In</Button>
          Or <Link to="/sign-up">sign up now!</Link>
        </Form.Item>
      </Form>
    )
  }
}

const WrappedSignInForm = Form.create()(SignInForm);

export default class SignInPage extends Component {
  render() {
    return (
      <Layout className="layout">
        <Layout.Header className="layout-header">
          <Breadcrumb>
            <Breadcrumb.Item className="breadcrumb-item">
              <span>Sign In</span>
            </Breadcrumb.Item>
          </Breadcrumb>
        </Layout.Header>
        <Layout.Content className="layout-content">
          <WrappedSignInForm />
        </Layout.Content>
        <Layout.Footer className="layout-footer"></Layout.Footer>
      </Layout>
    )
  }
}
