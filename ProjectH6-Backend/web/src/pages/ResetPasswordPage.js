/**
 * Project H6 Backend Template
 *
 * @author Xu Lian (xu.lian@uts.edu.au)
 */
import React, { Component } from 'react';
import { Layout, Breadcrumb, Form, Input, Button } from 'antd';
import './ResetPasswordPage.css';

class ResetPasswordForm extends Component {
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
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: 'Please input your password!',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="password" placeholder="Password" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: 'Please confirm your password!',
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur} placeholder="Confirm Password" />
          )}
        </Form.Item>
        <Form.Item>
          <Button className="button-submit" type="primary" htmlType="submit">Reset Password</Button>
        </Form.Item>
      </Form>
    )
  }
}

const WrappedResetPasswordForm = Form.create()(ResetPasswordForm);

export default class ResetPasswordPage extends Component {
  render() {
    return (
      <Layout className="layout">
        <Layout.Header className="layout-header">
          <Breadcrumb>
            <Breadcrumb.Item className="breadcrumb-item">
              <span>Reset Password</span>
            </Breadcrumb.Item>
          </Breadcrumb>
        </Layout.Header>
        <Layout.Content className="layout-content">
          <WrappedResetPasswordForm />
        </Layout.Content>
        <Layout.Footer className="layout-footer"></Layout.Footer>
      </Layout>
    )
  }
}
