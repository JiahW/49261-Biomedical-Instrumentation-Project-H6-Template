/**
 * Project H6 Backend Template
 *
 * @author Xu Lian (xu.lian@uts.edu.au)
 */

export default class API {
  static get Errors() {
    return {
      Duplicate: 0x8200,
      Unauthorized: 0x8401,
      NotFound: 0x8404,
      Internal: 0x8500,
      PasswordMismatch: 0x8FFF,
    }
  }

  static POST(url, data) {
    return fetch(url, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(data)
    })
  }

  static GET(url) {
    return fetch(url, {
      method: 'GET',
      credentials: 'include'
    })
  }

  static UserProfile(callback) {
    API.GET(`${ API.BaseUrl }/user/profile`)
    .then(response => response.json())
    .then(
      (result) => callback(result),
      (error) => {
        console.error(error);
      }
    );
  }

  static UserSignIn(credential, callback) {
    API.POST(`${ API.BaseUrl }/user/sign-in`, credential)
    .then(response => response.json())
    .then(
      (result) => callback(result),
      (error) => {
        console.error(error);
        callback({error: 1});
      }
    );
  }

  static UserSignUp(data, callback) {
    API.POST(`${ API.BaseUrl }/user/sign-up`, data)
    .then(response => response.json())
    .then(
      (result) => callback(result),
      (error) => {
        console.error(error);
        callback({error: 1});
      }
    );
  }

  static UserSignOut(callback) {
    setTimeout(() => {
      callback({});
    }, 1000);
  }

  static Samples(id, callback) {
    let url = `${ API.BaseUrl }/samples`;
    if (id !== undefined) {
      url = `${ url }/${ id }`;
    }
    API.GET(url)
    .then(response => response.json())
    .then(
      (result) => callback(result),
      (error) => {
        console.error(error);
      }
    );
  }

  static Reports(id, callback) {
    let url = `${ API.BaseUrl }/reports`;
    if (id !== undefined) {
      url = `${ url }/${ id }`;
    }
    API.GET(url)
    .then(response => response.json())
    .then(
      (result) => callback(result),
      (error) => {
        console.error(error);
      }
    );
  }
}
