const common = {
  /**
   * 获取配置信息
   * @param req
   * @param res
   * @param next
   * @constructor
   */
  GetSystemInfo: function (req, res, next) {
    res.send({
      "Message": "",
      "ResultType": 1,
      "ReturnEntity": {
        "SystemName": "江西省普通高中学业水平考试",
        "SystemLogo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAolBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8ELnaCAAAANXRSTlMA0qTwHgTmwVza1ZlZy6KggxMHzzAiyLqOGhHqq1MpFt7EioBIsJN7c2U/+vZsOrNhNAxkZzRlUFcAAAISSURBVEjH7dbZjpswFAbgQ8AOJFBI2IZ9X7Mn9fu/Wo2blMxAmWgiVdUo/wXWOfg7trgCXnnlH8eR9ELLXehjBqUtqWha7cNuEUgXvbm1V6nXNeYMG4Y7atF8iw85wywqsIQLwmJTvLN4/m0cY7plkyGHXJN23bNyreZw9ru1+OiE0KVYIp0W1uSWFgA08geLbJ11E0Onx7anVwgY5u+wTcfyQ7yuLM/ucUyb2hCTE2TkI1bZZeIec7T0R7AG1gAvoaBP7j1WR3AReSN49hi2KvJ1zPkP48VvvLrDswfxD+CewYv/FCsgv/BXcDmJ3Wn8NomjZ7DwDDbHcTyNOYZNN1HwAMfKEsS/4xnoDIeAXDOv9Tt8OO6FM8Dlc+wAi3vhr9hqEbAEn+JtJYotG9DyDCtRV4T5MVCn8S2xGrCTpBnx6KD1ruC79hSO6bl4kSh4Q8t5C2DjGWkALnF3I8myJG9LyHIcp1obsVJofExIDSfuIAGie6Vl4AINEoL0OI7Z68g0uwnrWiEpVPoRLHKQgSYyhYh9uTGsIjn1EwnzPF7YZQ4owJlR7P3kBJCXNod5D0uJn8pIHWKCPWypWiOLPzV/ziW1adRBXjeOWSXc3Nd2otxoqkV3kfdYJ4S3MwP1nbWxK+XQXJmhWO5O6/4FMjKbJ0TvO3ijGWO/GS64ewcGMbQN7qtsSKdjZPDKK985vwAxm+iuMKlJZQAAAABJRU5ErkJggg==",
        "TerminalName": "考生端",
        "Copyright": "江西省考试院2018",
      }
    })
  },
  /**
   * 获取秘钥
   * @param req
   * @param res
   * @param next
   */
  GetSecretKey: function (req, res, next) {
    res.send({
      "Message": "",
      "ResultType": 1,
      "ReturnEntity": {
        "SecretKey": "EnohT5gQY9eBPrCqG1JvPnC8"
      }
    })
  },
  /**
   * 获取准考证号
   * @param req
   * @param res
   */
  GetStudentCode: function (req, res) {
    res.send({
      "Message": "",
      "ResultType": 1,
      "ReturnEntity": "10001"
    })
  },
  /**
   * 用户登录
   * @param req
   * @param res
   * @param next
   */
  Login: function (req, res, next) {
    res.send({
      "Message": "",
      "ResultType": 1,
      "ReturnEntity": {
        "UserTrueName": "考生姓名",
        "UserFace": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAIAAAC1nk4lAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3NEFEOEUxN0EwNEUxMUU4QUU3MEM3NDZEMEYyRUEzOSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo3NEFEOEUxOEEwNEUxMUU4QUU3MEM3NDZEMEYyRUEzOSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjc0QUQ4RTE1QTA0RTExRThBRTcwQzc0NkQwRjJFQTM5IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjc0QUQ4RTE2QTA0RTExRThBRTcwQzc0NkQwRjJFQTM5Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+x84DogAAAixJREFUeNrsmrtSwlAQhpNARuAFErvwAmAJnRVt6IDOSgsaSiikkAJegEIrO0MHrZUdlMILkI7kBbhMJEdIDogaQi5HDji7TTLMTvKxnN39/xlYhBBzbsExZxgADdAADdAADdAADdAA/R+ho8SfuHhkl6Nfn6b6ibsMqVewBE2A8Vo0eh23DHmSyIknBP2jwOwtiqedvgmJkpOB3iFuRtrVC4eUwaycRYS4STTisIWJhRfemXgVmXh7wgnW7Sg7G1KeHtq8V8M1rhd5t0wxVu+z1h3qKQZNaO3N1O0mu7k4nJ2JyoX1Ve8uNXrQxqhrXQtcytNY4FN569oxRxo1aHNsT4Yr1uMoEyX7hDBjlfZGFCTPD5JY4UTWuK6aXlNVpNOG5pJWYzHvyOMR1VQ8rZMSNWi/jeW3cf/meIjXeGX0KvOD2JqCV7qQj4g0z7QYk5u42I3Wwi1zMGuUsHiQ3dfQERoxXeXtlcHUluWic701ZbrVHvLE1lInp/LWOmS91bX5w6WpExbWJPX0SjlNn2puL9vo1VOCdrEChOQ/VHpX4x+IfS7hyNCrybCZZXvL+e1HKHD3SkykCe3DR3lwZceA3plo3lrtq03xTDz+chk+Y+JVjb0NBz6n4E2klz6COkUuVJm37tDPvuBzlZBOMQS0P3dI0ikGhw4jMkM6xeDQvt2ho6AN5BRDqzwf7pBYEIAONLbEMPaWhb9OADRAAzRAAzRAAzRAu8enAAMA6OkDfBbFr8wAAAAASUVORK5CYII=",
        "SchoolName": "考点学校",
        "RoomName": "12",
        "SeatNumber": "12",
        "LoginStatus": 1
      }
    });
  },
  /**
   * 用户退出
   * @param req
   * @param res
   * @param next
   */
  Logout: function (req, res, next) {
    res.send({
      "Message": "",
      "ResultType": 1,
      "ReturnEntity": 1 //1：成功，0：失败
    });
  },
  /**
   * 绑定座位号
   * @param req
   * @param res
   * @param next
   */
  BandingSeat: function (req, res, next) {
    res.send({
      "Message": "",
      "ResultType": 1,
      "ReturnEntity": 1 //1：成功，0：失败
    });
  },
  /**
   * 获取考生须知
   * @param req
   * @param res
   * @param next
   */
  GetExamExplainInfo: function (req, res, next) {
    res.send({
      "Message": "",
      "ResultType": 1,
      "ReturnEntity": '<h1 style="text-align: center;"><span style="font-weight: bold; text-align: center;">考生须知</span> </h1> <p>一、考试开始前15分钟考生凭学生证和有效身份证件（身份证等）进入规定考场对号入座，并将有效证件放在考桌左上角，以便监考人员查验。考试开始指令发出后，考生才能开始答卷。</p><p>二、考生进入考场必须关闭各种通讯工具。 </p> <p>参加闭卷考试考生在入场时除携带必要的文具外，不准携带其它物品(如:书籍、资料、笔记本和自备草稿纸以及具有收录、储存、记忆功能的电子工具等)。已携带入场的应按要求指定位置存放。 </p> <p>参加非闭卷考试的考生除携带必要的文具外，可携带该考试科目规定允许的相关资料。 </p> <p>三、考试开始30分钟后，考生停止进入考场（听力考试开始至结束，考生不得进出考场）。开考30分钟后考生方可交卷离开考场。考生交卷后应立即退场，不得在考场附近逗留、交谈，不得再返回考场续考。 </p> <p>四、考生领到试卷后，应清点试卷是否齐全，检查试卷有无缺损、错印等情况，若发现试卷差错应举手向监考人员报告。 </p> <p>五、考生答卷前，在试卷密封线内填写指定内容（如姓名、学号等）。凡漏写姓名、学生证号、座位号或字迹模糊无法辨认，以及在试卷密封线外填写学生证号、姓名或作其他标记的试卷一律按零分处理。 </p> <p>六、考生答卷时只允许用黑、蓝色钢笔或圆珠笔书写。特殊要求的科目（如使用答题卡）按具体要求执行。 </p> <p>七、考生不得询问试题题意，若发现试题字迹模糊或试题有误，可举手向监考人员询问，不准询问其他考生。 </p> <p>八、考生必须服从监考人员的监督管理。不准交头接耳，左顾右盼，传递物品，打手势，做暗号；不准擅自借用其他考生文具；不准偷看、抄袭他人答卷或允许他人抄袭自己的答卷；严禁夹带；严禁换卷、替考，以及其他违纪、舞弊行为。 </p> <p>九、在考试期间原则上不允许上厕所，若遇特殊情况，须由工作人员陪同出入考场。 </p> <p>十、考试结束指令发出后，考生立即停止答卷，将答卷（答题卡）反扣在桌面上，并按监考人员要求退离考场。严禁将试卷、答卷（答题卡）和考场统一发放的草稿纸带出考场。 </p> <p>十一、留考考生必须服从考试工作人员和监考人员的安排，不得与其他考生或场外人员接触。 </p>'
    });
  },
  /**
   * 获取考试信息
   * @param req
   * @param res
   * @param next
   */
  GetExamInfo: function (req, res, next) {
    res.send({
      "Message": "",
      "ResultType": 1,
      "ReturnEntity": {
        "ExamName": "江西省2018年高中学业水平考试",
        "ExamInstruction": "本场考试包含2门学科，考试时间为：2018-05-21 10:00--11:30 共90分钟，请把握好时间。",
        "AnswerModel": 2,
        "ExamType": 2,
        "ExamArrangedType": 1,
        "ExamSceneId": 123,
        "ExamSceneStatus": 1,
        "ExamCourses": [
          {
            "CourseName": "通用技术",
            "CourseId": "01",
            "TimeLength": 2700,
            "TotalScore": 100,
            "PassScore": 60,
            "IsCanOpenExam": 1,
            "StatusFlag": 3,
            "Score": 80
          },
          {
            "CourseName": "信息技术",
            "CourseId": "02",
            "TimeLength": 2700,
            "TotalScore": 100,
            "PassScore": 60,
            "IsCanOpenExam": 0,
            "StatusFlag": 1,
            "Score": 80
          }
        ]
      }
    });
  },
  /**
   * 开启考试
   * @param req
   * @param res
   * @param next
   */
  StartToExam: function (req, res, next) {
    res.send({
      "Message": "",
      "ResultType": 1,
      "ReturnEntity": {
        "ExamPaperId": "3"
      }
    });
  },
};

module.exports = common;
