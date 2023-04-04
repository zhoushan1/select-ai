/* eslint-disable camelcase */
import axios from 'axios';
import { message } from 'antd';
import GPT_KEY from '../../../secret/constant';

// const PROXY_IP = '127.0.0.1';
// const PROXY_PORT = 7890;
const CHAT_BASE_URl = 'https://api.openai.com';
const GPT_MODEL = 'gpt-3.5-turbo';
const GPT_TEMPERATURE = 0.7;
// const CHAT_URl = 'https://api.openai.com/v1/chat/completions';

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${GPT_KEY}`,
};
// 创建 axios 实例
const instance = axios.create({
  baseURL: CHAT_BASE_URl,
  timeout: 10000,
  headers,
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    return config;
  },
  (error) => {
    message.error('请求参数错误');
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 对响应数据做些什么
    if (response.status === 200) {
      return response.data;
    }
    return response;
  },
  (error) => {
    message.error('接口返回错误');
    // 对响应错误做些什么
    return Promise.reject(error);
  }
);

// 封装请求接口函数
const request = (url, method = 'get', data = {}) => {
  return instance({
    url,
    method,
    [method.toUpperCase() === 'GET' ? 'params' : 'data']: {
      messages: [{ role: 'user', content: data.content || '' }],
      model: GPT_MODEL,
      temperature: GPT_TEMPERATURE,
    },
  });
};

export default request;
