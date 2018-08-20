/**
 * Project H6 Backend Template
 *
 * @author Xu Lian (xu.lian@uts.edu.au)
 */
import React, { Component } from 'react';
import { Layout, Breadcrumb } from 'antd';
import './NotFoundPage.css';

export default class NotFoundPage extends Component {
  render() {
    let { location } = this.props;
    return(
      <Layout className="layout">
        <Layout.Header className="layout-header">
          <Breadcrumb>
            <Breadcrumb.Item className="breadcrumb-item">
              <span>Error</span>
            </Breadcrumb.Item>
          </Breadcrumb>
        </Layout.Header>
        <Layout.Content className="layout-content">
          <div>
            <span>404 Not Found</span>
          </div>
          <div>
            <span>{location.pathname}</span>
          </div>
          <div>
            <span>Above page could not be found.</span>
          </div>
        </Layout.Content>
      </Layout>
    )
  }
}
