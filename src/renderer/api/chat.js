import request from '../utils/request';

const fetchChatData = (params) => {
  return request('/v1/chat/completions', 'post', params);
};

export default fetchChatData;
