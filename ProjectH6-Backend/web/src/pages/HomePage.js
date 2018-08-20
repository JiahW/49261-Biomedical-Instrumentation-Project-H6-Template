/**
 * Project H6 Backend Template
 *
 * @author Xu Lian (xu.lian@uts.edu.au)
 */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import './HomePage.css';

export default class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout className="layout">
        <Layout.Content className="layout-content">
          <Redirect to="/profile" />
        </Layout.Content>
      </Layout>
    )
  }
}
