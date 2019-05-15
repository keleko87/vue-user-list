import axios from 'axios';

const API_URL = 'https://c9d093e3-eaa1-42d7-a7eb-f437679c2a30.mock.pstmn.io';
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
