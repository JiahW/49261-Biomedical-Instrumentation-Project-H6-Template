/**
 * Project H6 Backend Template
 *
 * @author Xu Lian (xu.lian@uts.edu.au)
 */
import React, { Component } from 'react';
import { Layout, Breadcrumb, Form, Input, Icon, Button } from 'antd';
import './ForgotPasswordPage.css';

class ForgotPasswordForm extends Component {
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((error, values) => {
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={(e) => this.handleSubmit(e)} className="form">
        <Form.Item>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="E-mail Address" />
          )}
        </Form.Item>
        <Form.Item>
          <Button className="button-submit" type="primary" htmlType="submit">Forgot Password</Button>
        </Form.Item>
      </Form>
    )
  }
}

const WrappedForgotPasswordForm = Form.create()(ForgotPasswordForm);

export default class ForgotPasswordPage extends Component {
  render() {
    return (
      <Layout className="layout">
        <Layout.Header className="layout-header">
          <Breadcrumb>
            <Breadcrumb.Item className="breadcrumb-item">
              <span>Forgot Password</span>
            </Breadcrumb.Item>
          </Breadcrumb>
        </Layout.Header>
        <Layout.Content className="layout-content">
          <WrappedForgotPasswordForm />
        </Layout.Content>
        <Layout.Footer className="layout-footer"></Layout.Footer>
      </Layout>
    )
  }
}
