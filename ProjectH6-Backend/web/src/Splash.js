/**
 * Project H6 Backend Template
 *
 * @author Xu Lian (xu.lian@uts.edu.au)
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './Splash.css';

export default class Splash extends Component {
  constructor(props) {
    super(props);
    if (Splash.Singleton === undefined) {
      Splash.Singleton = this;
    } else {
      console.error('Splash.Singleton already exists!');
    }
  }

  render() {
    return (
      <img src={logo} className="splash-logo" alt="logo" />
    )
  }

  remove() {
    setTimeout(() => {
      ReactDOM.findDOMNode(this).parentNode.remove();
    }, 0);
    Splash.Singleton = undefined;
  }
}
