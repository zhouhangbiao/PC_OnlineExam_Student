import request from '../utils/request';
import cookie from '../utils/cookie';

const ApiHost = cookie.get('ApiHost') === 'undefined' ? 'http://localhost:3000' : cookie.get('ApiHost');

/**
 * 获取配置信息
 * @param params
 * @return {Promise.<Object>}
 */
export async function GetSystemInfo(params) {
  return request({
    url: ApiHost + '/Login/GetSystemInfo',
    method: "POST",
    data: params.payload
  });
}

/**
 * 获取秘钥
 * @param params
 * @return {Promise.<Object>}
 */
export async function GetSecretKey(params) {
  return request({
    url: ApiHost + '/Login/GetSecretKey',
    method: "POST",
    data: params.payload
  });
}

/**
 * 获取准考证号
 * @param params
 * @return {Promise.<Object>}
 */
export async function GetStudentCode(params) {
  return request({
    url: ApiHost + '/Seat/GetStudentCode',
    method: "POST",
    data: params.payload
  });
}

/**
 * 用户登录
 * @param params
 * @return {Promise.<Object>}
 */
export async function Login(params) {
  return request({
    url: ApiHost + '/Login/Login',
    method: "POST",
    data: params.payload
  });
}

/**
 * 用户退出
 * @param params
 * @return {Promise.<Object>}
 */
export async function Logout(params) {
  return request({
    url: ApiHost + '/Login/Logout',
    method: "POST",
    data: params.payload
  });
}

/**
 * 绑定座位号
 * @param params
 * @return {Promise.<Object>}
 */
export async function BandingSeat(params) {
  return request({
    url: ApiHost + '/Seat/BandingSeat',
    method: "POST",
    data: params.payload
  });
}

/**
 * 获取考生须知
 * @param params
 * @return {Promise.<Object>}
 */
export async function GetExamExplainInfo(params) {
  return request({
    url: ApiHost + '/Exam/GetExamExplainInfo',
    method: "POST",
    data: params.payload
  });
}

/**
 * 获取考试信息
 * @param params
 * @return {Promise.<Object>}
 */
export async function GetExamInfo(params) {
  return request({
    url: ApiHost + '/Exam/GetExamInfo',
    method: "POST",
    data: params.payload
  });
}

/**
 * 开启考试
 * @param params
 * @return {Promise.<Object>}
 */
export async function StartToExam(params) {
  return request({
    url: ApiHost + '/Exam/StartToExam',
    method: "POST",
    data: params.payload
  });
}
