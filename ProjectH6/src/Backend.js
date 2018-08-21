/**
 * Project H6 App Template
 *
 * @author Xu Lian (xu.lian@uts.edu.au)
 */

export default class Backend {
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
    Backend.GET(`${ Backend.BaseUrl }/user/profile`)
    .then(response => response.json())
    .then(
      (result) => callback(result),
      (error) => {
        console.error(error);
      }
    );
  }

  static UserSignIn(credential, callback) {
    Backend.POST(`${ Backend.BaseUrl }/user/sign-in`, credential)
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
    Backend.POST(`${ Backend.BaseUrl }/user/sign-up`, data)
    .then(response => response.json())
    .then(
      (result) => callback(result),
      (error) => {
        console.error(error);
        callback({error: 1});
      }
    );
  }

  static Samples(id, callback) {
    let url = `${ Backend.BaseUrl }/samples`;
    if (id !== undefined) {
      url = `${ url }/${ id }`;
    }
    Backend.GET(url)
    .then(response => response.json())
    .then(
      (result) => callback(result),
      (error) => {
        console.error(error);
      }
    );
  }

  static Reports(id, callback) {
    let url = `${ Backend.BaseUrl }/reports`;
    if (id !== undefined) {
      url = `${ url }/${ id }`;
    }
    Backend.GET(url)
    .then(response => response.json())
    .then(
      (result) => callback(result),
      (error) => {
        console.error(error);
      }
    );
  }
}
