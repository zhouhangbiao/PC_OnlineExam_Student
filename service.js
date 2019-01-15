const fs = require('fs');

const express = require('express'),
  timeout = require('connect-timeout'),
  app = express(),
  bodyParser = require('body-parser');

const API = {
  common: require('./api/common'),
  answer: require('./api/answer'),
  question: require('./api/question'),
};

const PORT = '3000',
  TIME_OUT = 30 * 1e3;

app.set('port', PORT);

app.use(timeout(TIME_OUT));
app.use((req, res, next) => {
  if (!req.timedout) next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// 设置跨域访问
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  res.header("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
  next();
});

// 获取配置信息
app.post('/Login/GetSystemInfo', API.common.GetSystemInfo);
// 获取登录秘钥
app.post('/Login/GetSecretKey', API.common.GetSecretKey);
// 获取准考证号
app.post('/Seat/GetStudentCode', API.common.GetStudentCode);
// 用户登录
app.post('/Login/Login', API.common.Login);
// 用户退出
app.post('/Login/Logout', API.common.Logout);
// 绑定座位号
app.post('/Seat/BandingSeat', API.common.BandingSeat);
// 获取考生须知
app.post('/Exam/GetExamExplainInfo', API.common.GetExamExplainInfo);
// 获取考试信息
app.post('/Exam/GetExamInfo', API.common.GetExamInfo);
// 开启考试
app.post('/Exam/StartToExam', API.common.StartToExam);
// 获取答题卡信息
app.post('/Answer/GetAnswerCardInfo', API.answer.GetAnswerCardInfo);
// 获取解析答题卡信息
app.post('/Answer/GetAnalysisAnswerCardInfo', API.answer.GetAnalysisAnswerCardInfo);
// 提交用户作答信息
app.post('/Answer/SaveStudentAnswerInfo', API.answer.SaveStudentAnswerInfo);
// 提交用户整卷作答信息
app.post('/Answer/SaveStudentWholeExam', API.answer.SaveStudentWholeExam);
// 交卷
app.post('/Exam/HandInExamPaper', API.answer.HandInExamPaper);
// 获取考试结果
app.post('/Exam/GetExamResult', API.answer.GetExamResult);
// 获取题目信息
app.post('/Question/GetQuestion', API.question.GetQuestion);
// 获取整卷题目信息
app.post('/Question/GetWholeExamPaperQuestions', API.question.GetWholeExamPaperQuestions);
// 获取题目解析信息
app.post('/Question/GetQuestionAnalysis', API.question.GetQuestionAnalysis);

app.listen(app.get('port'), () => {
  console.log(`server running @ ${app.get('port')} port`);
});

