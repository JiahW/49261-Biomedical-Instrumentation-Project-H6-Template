/**
 * Project H6 Backend Template
 *
 * @author Xu Lian (xu.lian@uts.edu.au)
 */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Layout, Breadcrumb, Modal, Spin, Icon, Avatar, Tag, List } from 'antd';
import API from '../API';
import './ProfilePage.css';

export default class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      redirectToSignIn: false,
      userName: '',
      profileData: []
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: true });
      API.UserProfile((data) => {
        let { user, profile, error } = data;
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
          this.setState({
            loading: false,
            userName: user.username,
            profileData: [
              {
                label: 'Name',
                value: `${profile.firstname} ${profile.lastname}`
              },
              {
                label: 'Gender',
                value: profile.gender
              },
              {
                label: 'Birthday',
                value: profile.birthday
              },
              {
                label: 'E-mail Address',
                value: profile.email_address
              },
              {
                label: 'Telephone Number',
                value: profile.telephone_number
              }
            ]
          });
        }
      });
    }, 0);
  }

  render() {
    const { loading, redirectToSignIn, userName, profileData } = this.state;
    return (
      <Layout className="layout">
        <Layout.Header className="layout-header">
          <Breadcrumb>
            <Breadcrumb.Item className="breadcrumb-item">
              <span>Profile</span>
            </Breadcrumb.Item>
          </Breadcrumb>
        </Layout.Header>
        {loading ? (
          <Layout.Content className="layout-content"><Spin indicator={<Icon className="icon-loading" type="loading" spin />} /></Layout.Content>
        ) : redirectToSignIn ? (
          <Layout.Content className="layout-content"><Redirect to="/sign-in" /></Layout.Content>
        ) :(
          <Layout.Content className="layout-content">
            <Avatar className="avatar-profile" size={96} icon="user" />
            <Tag className="tag-userName">@{userName}</Tag>
            <List bordered dataSource={profileData} renderItem={item => (
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
