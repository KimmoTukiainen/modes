import { compose } from "../functional.functions";
export const getTokenString = token => `Bearer ${token}`;
export const getTokenHeaderObject = authString => ({
  headers: { Authorization: authString }
});
export const getTokenHeader = compose([getTokenString, getTokenHeaderObject]);
