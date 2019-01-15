import request from '../utils/request';
import cookie from '../utils/cookie';

const ApiHost = cookie.get('ApiHost') === 'undefined' ? 'http://localhost:3000' : cookie.get('ApiHost');

/**
 * 获取答题卡信息
 * @param params
 * @return {Promise.<Object>}
 */
export async function GetAnswerCardInfo(params) {
  return request({
    url: ApiHost + '/Answer/GetAnswerCardInfo',
    method: "POST",
    data: params.payload
  });
}

/**
 * 获取解析答题卡信息
 * @param params
 * @return {Promise.<Object>}
 */
export async function GetAnalysisAnswerCardInfo(params) {
  return request({
    url: ApiHost + '/Answer/GetAnalysisAnswerCardInfo',
    method: "POST",
    data: params.payload
  });
}

/**
 * 提交用户作答信息
 * @param params
 * @return {Promise.<Object>}
 */
export async function SaveStudentAnswerInfo(params) {
  return request({
    url: ApiHost + '/Answer/SaveStudentAnswerInfo',
    method: "POST",
    data: params.payload
  });
}

/**
 * 提交整卷用户作答信息
 * @param params
 * @return {Promise.<Object>}
 */
export async function SaveStudentWholeExam(params) {
  return request({
    url: ApiHost + '/Answer/SaveStudentWholeExam',
    method: "POST",
    data: params.payload
  });
}

/**
 * 交卷
 * @param params
 * @return {Promise.<Object>}
 */
export async function HandInExamPaper(params) {
  return request({
    url: ApiHost + '/Exam/HandInExamPaper',
    method: "POST",
    data: params.payload
  });
}

/**
 * 获取考试结果
 * @param params
 * @return {Promise.<Object>}
 */
export async function GetExamResult(params) {
  return request({
    url: ApiHost + '/Exam/GetExamResult',
    method: "POST",
    data: params.payload
  });
}
