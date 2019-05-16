import axios from 'axios';

const API_URL = 'https://c9b61e1b-54a3-46bf-b318-48b44a056f5e.mock.pstmn.io';
const USERS = '/users';

const apiRequest = async (request) => {
  try {
    return await axios(request);
  } catch (error) {
    throw new Error(error);
  }
};

export {
  API_URL,
  USERS,
  apiRequest,
};
