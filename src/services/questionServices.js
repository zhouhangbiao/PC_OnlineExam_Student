import request from '../utils/request';
import cookie from '../utils/cookie';

const ApiHost = cookie.get('ApiHost') === 'undefined' ? 'http://localhost:3000' : cookie.get('ApiHost');

/**
 * 获取题目信息
 * @param params
 * @return {Promise.<Object>}
 */
export async function GetQuestion(params) {
  return request({
    url: ApiHost + '/Question/GetQuestion',
    method: "POST",
    data: params.payload
  });
}

/**
 * 获取整卷作答题目信息
 * @param params
 * @return {Promise.<Object>}
 */
export async function GetWholeExamPaperQuestions(params) {
  return request({
    url: ApiHost + '/Question/GetWholeExamPaperQuestions',
    method: "POST",
    data: params.payload
  });
}

/**
 * 获取题目解析信息
 * @param params
 * @return {Promise.<Object>}
 */
export async function GetQuestionAnalysis(params) {
  return request({
    url: ApiHost + '/Question/GetQuestionAnalysis',
    method: "POST",
    data: params.payload
  });
}
