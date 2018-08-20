/**
 * Project H6 Backend Template
 *
 * @author Xu Lian (xu.lian@uts.edu.au)
 */
import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Layout, Breadcrumb, Modal, Spin, Icon, List } from 'antd';
import API from '../API';
import './ReportPage.css';

export default class ReportPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      redirectToSignIn: false,
      reportData: []
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: true });
      const { id } = this.props.match.params;
      API.Reports(id, (data) => {
        let { report, error } = data;
        if (error) {
          switch (error) {
            case API.Errors.Unauthorized:
              this.setState({
                loading: false,
                redirectToSignIn: true
              });
              break;
            case API.Errors.NotFound:
              this.setState({
                loading: false,
              });
              Modal.error({
                title: 'Report',
                content: 'This report cannot be found'
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
            loading: false,
            reportData: [
              {
                label: 'Id',
                value: report.id
              },
              {
                label: 'Date',
                value: report.updated
              }
            ]
          });
        }
      });
    }, 0);
  }

  render() {
    let { id } = this.props.match.params;
    const { loading, redirectToSignIn, reportData } = this.state;
    return (
      <Layout className="layout">
        <Layout.Header className="layout-header">
          <Breadcrumb>
            <Breadcrumb.Item className="breadcrumb-item">
              <Link to="/reports">Reports</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item className="breadcrumb-item">
              <span>{id}</span>
            </Breadcrumb.Item>
          </Breadcrumb>
        </Layout.Header>
        {loading ? (
          <Layout.Content className="layout-content"><Spin indicator={<Icon className="icon-loading" type="loading" spin />} /></Layout.Content>
        ) : redirectToSignIn ? (
          <Layout.Content className="layout-content"><Redirect to="/sign-in" /></Layout.Content>
        ) :(
          <Layout.Content className="layout-content">
            <List bordered dataSource={reportData} renderItem={item => (
              <List.Item>
                <List.Item.Meta title={item.label}/>
                <span>{item.value}</span>
              </List.Item>
            )}>
            </List>
          </Layout.Content>
        )}
        <Layout.Footer className="layout-footer"></Layout.Footer>
      </Layout>
    )
  }
}
