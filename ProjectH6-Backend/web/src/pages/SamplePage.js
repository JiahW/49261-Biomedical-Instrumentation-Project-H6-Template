/**
 * Project H6 Backend Template
 *
 * @author Xu Lian (xu.lian@uts.edu.au)
 */
import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Layout, Breadcrumb, Modal, Spin, Icon, List } from 'antd';
import API from '../API';
import './SamplePage.css';

export default class SamplePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      redirectToSignIn: false,
      sampleData: []
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: true });
      const { id } = this.props.match.params;
      API.Samples(id, (data) => {
        let { sample, error } = data;
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
                title: 'Sample',
                content: 'This sample cannot be found'
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
            sampleData: [
              {
                label: 'Id',
                value: sample.id
              },
              {
                label: 'From',
                value: sample.agent
              },
              {
                label: 'Date',
                value: sample.updated
              }
            ]
          });
        }
      });
    }, 0);
  }

  render() {
    const { id } = this.props.match.params;
    const { loading, redirectToSignIn, sampleData } = this.state;
    return (
      <Layout className="layout">
        <Layout.Header className="layout-header">
          <Breadcrumb>
            <Breadcrumb.Item className="breadcrumb-item">
              <Link to="/samples">Samples</Link>
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
            <List bordered dataSource={sampleData} renderItem={item => (
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
