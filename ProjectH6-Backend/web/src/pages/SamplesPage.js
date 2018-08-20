/**
 * Project H6 Backend Template
 *
 * @author Xu Lian (xu.lian@uts.edu.au)
 */
import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Layout, Breadcrumb, Modal, Spin, Icon, List } from 'antd';
import API from '../API';
import './SamplesPage.css';

export default class SamplesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      redirectToSignIn: false,
      total: 0,
      data: []
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: true });
      API.Samples(undefined, (data) => {
        let { samples, error } = data;
        if (error) {
          switch (error) {
            case API.Errors.Unauthorized:
              this.setState({
                loading: false,
                redirectToSignIn: true
              });
              break;
            default:
              Modal.error({
                title: 'Error',
                content: `Code ${error}`
              });
          }
        } else {
          let data = [];
          for (let sample of samples) {
            data.push({
              label: `SA-${ sample.id }`,
              from: `from ${ sample.agent }`,
              link: `/samples/${ sample.id }`
            });
          }
          this.setState({
            loading: false,
            total: data.length,
            data: data
          });
        }
      });
    }, 0);
  }

  render() {
    const { loading, redirectToSignIn, total, data } = this.state;
    return (
      <Layout className="layout">
        <Layout.Header className="layout-header">
          <Breadcrumb>
            <Breadcrumb.Item className="breadcrumb-item">
              <span>Samples</span>
            </Breadcrumb.Item>
          </Breadcrumb>
        </Layout.Header>
        {loading ? (
          <Layout.Content className="layout-content"><Spin indicator={<Icon className="icon-loading" type="loading" spin />} /></Layout.Content>
        ) : redirectToSignIn ? (
          <Layout.Content className="layout-content"><Redirect to="/sign-in" /></Layout.Content>
        ) :(
          <Layout.Content className="layout-content">
            <List bordered dataSource={data} renderItem={item => (
              <List.Item>
                <List.Item.Meta title={<Link to={item.link}>{item.label}</Link>} description={item.from}/>
              </List.Item>
            )}>
            </List>
          </Layout.Content>
        )}
        <Layout.Footer className="layout-footer">
          <div>Total {total} records</div>
        </Layout.Footer>
      </Layout>
    )
  }
}
