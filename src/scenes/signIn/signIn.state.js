// @flow
import { ofType } from "redux-observable";
// Look here to optimize bundle size on rxjs operators
// https://github.com/ReactiveX/rxjs/blob/master/doc/lettable-operators.md
import { switchMap, map } from "rxjs/operators";
import { ajax } from "rxjs/ajax";
import { CALL_API } from "../../redux/api";
import { tap } from "rxjs/operators";

const GET_ACCESS_TOKEN = "matisa/scenes/signIn/getAccessToken";
const SET_ACCESS_TOKEN = "matisa/scenes/signIn/setAccessToken";
const SUCCESS_HELLO_WORLD = "matisa/scenes/signIn/successHelloWorld";
const ERROR_HELLO_WORLD = "matisa/scenes/signIn/errorHelloWorld";

const initialState = { accessToken: "null", error: null };

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_ACCESS_TOKEN: {
      return {
        ...state,
        accessToken: action.accessToken
      };
    }
    default:
      return state;
  }
}

export function getAccessTokenAction() {
  return {
    type: GET_ACCESS_TOKEN
  };
}

export const getAccessToken = action$ => {
  const {
    REACT_APP_CLIENT_ID,
    REACT_APP_CLIENT_SECRET,
    REACT_APP_OAUTH_URL
  } = process.env;

  const base64ClientId = btoa(
    `${REACT_APP_CLIENT_ID}:${REACT_APP_CLIENT_SECRET}`
  );

  const payload = {
    headers: { Authorization: `Basic ${base64ClientId}` },
    url: REACT_APP_OAUTH_URL,
    responseType: "json"
    // crossDomain: true
  };

  return action$.pipe(
    ofType(GET_ACCESS_TOKEN),
    switchMap(() => ajax(payload)),
    tap(data => console.log(data)), // this is how u debug rxjs
    map(data => ({
      type: SET_ACCESS_TOKEN,
      accessToken: data.response.access_token
    }))
  );
};