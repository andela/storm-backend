const facebook = {
  id: '2095868869373636',
  username: undefined,
  name: 'Samuel Ladapo',
  gender: undefined,
  profileUrl: undefined,
  emails: [{ value: 'samuel@facebook.com' }],
  photos:
  [{
    value:
      'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=2095868869373636&height=50&width=50&ext=1569565681&hash=AeQBSXQxB0Hne32F'
  }],
  provider: 'facebook',
  _raw:
    '{"id":"2095868869373636","email":"samuel\\u0040facebook.com","name":"Samuel jerry Ladapo","last_name":"Ladapo","first_name":"Samuel","middle_name":"jerry","picture":{"data":{"height":50,"is_silhouette":false,"url":"https:\\/\\/platform-lookaside.fbsbx.com\\/platform\\/profilepic\\/?asid=2095868869373636&height=50&width=50&ext=1569565681&hash=AeQBSXQxB0Hne32F","width":50}}}',
  _json:
  {
    id: '2095868869373636',
    email: 'samuel@facebook.com',
    name: 'Samuel Ladapo',
    picture:
    {
      data:
      {
        height: 50,
        is_silhouette: false,
        url:
          'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=2095868869373636&height=50&width=50&ext=1569566077&hash=AeTYxB3GVCEEhpLt',
        width: 50
      }
    }
  }
};

const google = {
  id: '857578736364757586',
  displayName: 'Samuel Ladapo',
  familyName: 'Ladapo',
  givenName: 'Samuel',
  emails: [{ value: 'samuel@gmail.com', verified: true }],
  photos:
  [{
    value:
      'https://lh5.googleusercontent.com/-WUXse3rcqLI/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3reehqwq3qe1mqnWEvt44uLLkEA32g/photo.jpg'
  }],
  provider: 'google',
  _raw:
    '{\n  "sub": "857578736364757586",\n  "name": "Samuel Ladapo",\n  "given_name": "Samuel",\n  "family_name": "Ladapo",\n  "picture": "https://lh5.googleusercontent.com/-WUXse3rcqLI/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3reehqwq3qe1mqnWEvt44uLLkEA32g/photo.jpg",\n  "email": "samuel@gmail.com",\n  "email_verified": true,\n  "locale": "en"\n}',
  _json:
  {
    sub: '857578736364757586',
    name: 'Samuel Ladapo',
    given_name: 'Samuel',
    family_name: 'Ladapo',
    picture:
      'https://lh5.googleusercontent.com/-WUXse3rcqLI/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3reehqwq3qe1mqnWEvt44uLLkEA32g/photo.jpg',
    email: 'samuel@gmail.com',
    email_verified: true,
    locale: 'en'
  }
};

export default {
  google,
  facebook
};
