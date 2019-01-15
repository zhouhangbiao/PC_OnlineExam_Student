const answer = {
  /**
   * 获取答题卡信息
   * @param req
   * @param res
   * @param next
   */
  GetAnswerCardInfo: function (req, res, next) {
    res.send({
      "Message": "",
      "ResultType": 1,
      "ReturnEntity": {
        "ExamType": 1,
        "QuestionId": "1",
        "IsChangeSwitch": 1,
        "RemindTimeLength": "900",
        "TimeLength": "7200",
        "QuestionTypes":
          [
            {
              "QuestionCategoryId": 1,
              "QuestionCategoryName": "单选题",
              "QuestionCount": 3,
              "TotalScore": 40,
              "Questions":
                [
                  {
                    "QuestionId": "1",
                    "QuestionIndex": 1,
                    "QuestionAnswerStatus": 1,
                    "QuestionGroups":
                      [
                        {
                          "QuestionGroupId": "1001",
                          "OrderIndex": 1,
                          "QuestionGroupAnswerStatus": 1,
                        }
                      ]
                  },
                  {
                    "QuestionId": "1",
                    "QuestionIndex": 2,
                    "QuestionAnswerStatus": 1,
                    "QuestionGroups":
                      [
                        {
                          "QuestionGroupId": "1002",
                          "OrderIndex": 1,
                          "QuestionGroupAnswerStatus": 1,
                        }
                      ]
                  }
                ]
            },
            {
              "QuestionCategoryId": 2,
              "QuestionCategoryName": "多选题",
              "QuestionCount": 2,
              "TotalScore": 20,
              "Questions":
                [
                  {
                    "QuestionId": "2",
                    "QuestionIndex": 1,
                    "QuestionAnswerStatus": 0,
                    "QuestionGroups":
                      [
                        {
                          "QuestionGroupId": "2001",
                          "OrderIndex": 1,
                          "QuestionGroupAnswerStatus": 1,
                        }
                      ]
                  },
                  {
                    "QuestionId": "2",
                    "QuestionIndex": 2,
                    "QuestionAnswerStatus": 0,
                    "QuestionGroups":
                      [
                        {
                          "QuestionGroupId": "2002",
                          "OrderIndex": 1,
                          "QuestionGroupAnswerStatus": 1,
                        }
                      ]
                  }
                ]
            },
            {
              "QuestionCategoryId": 3,
              "QuestionCategoryName": "复杂题",
              "QuestionCount": 1,
              "TotalScore": 5,
              "Questions":
                [
                  {
                    "QuestionId": "3",
                    "QuestionIndex": 1,
                    "QuestionAnswerStatus": 0,
                    "QuestionGroups":
                      [
                        {
                          "QuestionGroupId": "3001",
                          "OrderIndex": 1,
                          "QuestionGroupAnswerStatus": 1,
                        },
                        {
                          "QuestionGroupId": "3002",
                          "OrderIndex": 2,
                          "QuestionGroupAnswerStatus": 0,
                        },
                        {
                          "QuestionGroupId": "3003",
                          "OrderIndex": 1,
                          "QuestionGroupAnswerStatus": 1,
                        },
                        {
                          "QuestionGroupId": "3004",
                          "OrderIndex": 2,
                          "QuestionGroupAnswerStatus": 0,
                        }
                      ]
                  },
                  {
                    "QuestionId": "3",
                    "QuestionIndex": 1,
                    "QuestionAnswerStatus": 0,
                    "QuestionGroups":
                      [
                        {
                          "QuestionGroupId": "3001",
                          "OrderIndex": 1,
                          "QuestionGroupAnswerStatus": 1,
                        },
                        {
                          "QuestionGroupId": "3002",
                          "OrderIndex": 2,
                          "QuestionGroupAnswerStatus": 0,
                        },
                        {
                          "QuestionGroupId": "3003",
                          "OrderIndex": 3,
                          "QuestionGroupAnswerStatus": 0,
                        },
                        {
                          "QuestionGroupId": "3004",
                          "OrderIndex": 3,
                          "QuestionGroupAnswerStatus": 0,
                        }
                      ]
                  }
                ]
            },
            {
              "QuestionCategoryId": 4,
              "QuestionCategoryName": "完形填空",
              "QuestionCount": 1,
              "TotalScore": 5,
              "Questions":
                [
                  {
                    "QuestionId": "4",
                    "QuestionIndex": 1,
                    "QuestionAnswerStatus": 0,
                    "QuestionGroups":
                      [
                        {
                          "QuestionGroupId": "4001",
                          "OrderIndex": 1,
                          "QuestionGroupAnswerStatus": 1,
                        },
                        {
                          "QuestionGroupId": "4002",
                          "OrderIndex": 2,
                          "QuestionGroupAnswerStatus": 0,
                        },
                        {
                          "QuestionGroupId": "4003",
                          "OrderIndex": 1,
                          "QuestionGroupAnswerStatus": 1,
                        },
                        {
                          "QuestionGroupId": "4004",
                          "OrderIndex": 2,
                          "QuestionGroupAnswerStatus": 0,
                        }
                      ]
                  },
                  {
                    "QuestionId": "4",
                    "QuestionIndex": 1,
                    "QuestionAnswerStatus": 0,
                    "QuestionGroups":
                      [
                        {
                          "QuestionGroupId": "4001",
                          "OrderIndex": 1,
                          "QuestionGroupAnswerStatus": 1,
                        },
                        {
                          "QuestionGroupId": "4002",
                          "OrderIndex": 2,
                          "QuestionGroupAnswerStatus": 0,
                        },
                        {
                          "QuestionGroupId": "4003",
                          "OrderIndex": 3,
                          "QuestionGroupAnswerStatus": 0,
                        },
                        {
                          "QuestionGroupId": "4004",
                          "OrderIndex": 3,
                          "QuestionGroupAnswerStatus": 0,
                        }
                      ]
                  }
                ]
            },
            {
              "QuestionCategoryId": 9,
              "QuestionCategoryName": "判断题",
              "QuestionCount": 1,
              "TotalScore": 5,
              "Questions":
                [
                  {
                    "QuestionId": "9",
                    "QuestionIndex": 1,
                    "QuestionAnswerStatus": 0,
                    "QuestionGroups":
                      [
                        {
                          "QuestionGroupId": "9001",
                          "OrderIndex": 1,
                          "QuestionGroupAnswerStatus": 1,
                        }
                      ]
                  },
                  {
                    "QuestionId": "9",
                    "QuestionIndex": 1,
                    "QuestionAnswerStatus": 0,
                    "QuestionGroups":
                      [
                        {
                          "QuestionGroupId": "9001",
                          "OrderIndex": 1,
                          "QuestionGroupAnswerStatus": 1,
                        }
                      ]
                  }
                ]
            },
            {
              "QuestionCategoryId": 10,
              "QuestionCategoryName": "七选五",
              "QuestionCount": 1,
              "TotalScore": 5,
              "Questions":
                [
                  {
                    "QuestionId": "10",
                    "QuestionIndex": 1,
                    "QuestionAnswerStatus": 0,
                    "QuestionGroups":
                      [
                        {
                          "QuestionGroupId": "10001",
                          "OrderIndex": 1,
                          "QuestionGroupAnswerStatus": 1,
                        },
                        {
                          "QuestionGroupId": "10002",
                          "OrderIndex": 2,
                          "QuestionGroupAnswerStatus": 1,
                        }
                      ]
                  },
                  {
                    "QuestionId": "10",
                    "QuestionIndex": 1,
                    "QuestionAnswerStatus": 0,
                    "QuestionGroups":
                      [
                        {
                          "QuestionGroupId": "10001",
                          "OrderIndex": 1,
                          "QuestionGroupAnswerStatus": 1,
                        },
                        {
                          "QuestionGroupId": "10002",
                          "OrderIndex": 2,
                          "QuestionGroupAnswerStatus": 1,
                        }
                      ]
                  }
                ]
            },
            {
              "QuestionCategoryId": 22,
              "QuestionCategoryName": "画图题",
              "QuestionCount": 1,
              "TotalScore": 5,
              "Questions":
                [
                  {
                    "QuestionId": "22",
                    "QuestionIndex": 1,
                    "QuestionAnswerStatus": 0,
                    "QuestionGroups": []
                  }
                ]
            },
            {
              "QuestionCategoryId": 24,
              "QuestionCategoryName": "Word 操作题",
              "QuestionCount": 1,
              "TotalScore": 20,
              "Questions":
                [
                  {
                    "QuestionId": "24",
                    "QuestionIndex": 1,
                    "QuestionAnswerStatus": 1,
                    "QuestionGroups": []
                  }
                ]
            },
            {
              "QuestionCategoryId": 25,
              "QuestionCategoryName": "Excel 操作题",
              "QuestionCount": 1,
              "TotalScore": 20,
              "Questions":
                [
                  {
                    "QuestionId": "25",
                    "QuestionIndex": 1,
                    "QuestionAnswerStatus": 1,
                    "QuestionGroups": []
                  }
                ]
            },
            {
              "QuestionCategoryId": 26,
              "QuestionCategoryName": "Windows 操作题",
              "QuestionCount": 1,
              "TotalScore": 20,
              "Questions":
                [
                  {
                    "QuestionId": "26",
                    "QuestionIndex": 1,
                    "QuestionAnswerStatus": 1,
                    "QuestionGroups": []
                  }
                ]
            },
            {
              "QuestionCategoryId": 23,
              "QuestionCategoryName": "写作题",
              "QuestionCount": 1,
              "TotalScore": 5,
              "Questions":
                [
                  {
                    "QuestionId": "23",
                    "QuestionIndex": 1,
                    "QuestionAnswerStatus": 1,
                    "QuestionGroups": []
                  }
                ]
            }
          ]
      }
    });
  },
  /**
   * 获取解析答题卡信息
   * @param req
   * @param res
   * @param next
   */
  GetAnalysisAnswerCardInfo: function (req, res, next) {
    res.send({
      "Message": "",
      "ResultType": 1,
      "ReturnEntity": {
        "ExamType": 1,
        "ExamSpend": "35：50",
        "ExamScore": "80.5",
        "QuestionId": "1",
        "IsChangeSwitch": 1,
        "RemindTimeLength": "900",
        "QuestionTypes":
          [
            {
              "QuestionCategoryId": 1,
              "QuestionCategoryName": "单选题",
              "QuestionCount": 3,
              "TotalScore": 40,
              "Questions":
                [
                  {
                    "QuestionId": "1",
                    "QuestionIndex": 1,
                    "QuestionAnswerStatus": 1,
                    "QuestionGroups":
                      [
                        {
                          "QuestionGroupId": "1001",
                          "OrderIndex": 1,
                          "QuestionGroupAnswerStatus": 1,
                        }
                      ]
                  },
                  {
                    "QuestionId": "1",
                    "QuestionIndex": 2,
                    "QuestionAnswerStatus": 1,
                    "QuestionGroups":
                      [
                        {
                          "QuestionGroupId": "1002",
                          "OrderIndex": 1,
                          "QuestionGroupAnswerStatus": 1,
                        }
                      ]
                  }
                ]
            },
            {
              "QuestionCategoryId": 2,
              "QuestionCategoryName": "多选题",
              "QuestionCount": 2,
              "TotalScore": 20,
              "Questions":
                [
                  {
                    "QuestionId": "2",
                    "QuestionIndex": 1,
                    "QuestionAnswerStatus": 0,
                    "QuestionGroups":
                      [
                        {
                          "QuestionGroupId": "2001",
                          "OrderIndex": 1,
                          "QuestionGroupAnswerStatus": 1,
                        }
                      ]
                  },
                  {
                    "QuestionId": "2",
                    "QuestionIndex": 2,
                    "QuestionAnswerStatus": 0,
                    "QuestionGroups":
                      [
                        {
                          "QuestionGroupId": "2002",
                          "OrderIndex": 1,
                          "QuestionGroupAnswerStatus": 1,
                        }
                      ]
                  }
                ]
            },
            {
              "QuestionCategoryId": 3,
              "QuestionCategoryName": "复杂题",
              "QuestionCount": 1,
              "TotalScore": 5,
              "Questions":
                [
                  {
                    "QuestionId": "3",
                    "QuestionIndex": 1,
                    "QuestionAnswerStatus": 0,
                    "QuestionGroups":
                      [
                        {
                          "QuestionGroupId": "3001",
                          "OrderIndex": 1,
                          "QuestionGroupAnswerStatus": 1,
                        },
                        {
                          "QuestionGroupId": "3002",
                          "OrderIndex": 2,
                          "QuestionGroupAnswerStatus": 0,
                        },
                        {
                          "QuestionGroupId": "3003",
                          "OrderIndex": 1,
                          "QuestionGroupAnswerStatus": 1,
                        },
                        {
                          "QuestionGroupId": "3004",
                          "OrderIndex": 2,
                          "QuestionGroupAnswerStatus": 0,
                        }
                      ]
                  },
                  {
                    "QuestionId": "3",
                    "QuestionIndex": 1,
                    "QuestionAnswerStatus": 0,
                    "QuestionGroups":
                      [
                        {
                          "QuestionGroupId": "3001",
                          "OrderIndex": 1,
                          "QuestionGroupAnswerStatus": 1,
                        },
                        {
                          "QuestionGroupId": "3002",
                          "OrderIndex": 2,
                          "QuestionGroupAnswerStatus": 0,
                        },
                        {
                          "QuestionGroupId": "3003",
                          "OrderIndex": 3,
                          "QuestionGroupAnswerStatus": 0,
                        },
                        {
                          "QuestionGroupId": "3004",
                          "OrderIndex": 3,
                          "QuestionGroupAnswerStatus": 0,
                        }
                      ]
                  }
                ]
            },
            {
              "QuestionCategoryId": 4,
              "QuestionCategoryName": "完形填空",
              "QuestionCount": 1,
              "TotalScore": 5,
              "Questions":
                [
                  {
                    "QuestionId": "4",
                    "QuestionIndex": 1,
                    "QuestionAnswerStatus": 0,
                    "QuestionGroups":
                      [
                        {
                          "QuestionGroupId": "4001",
                          "OrderIndex": 1,
                          "QuestionGroupAnswerStatus": 1,
                        },
                        {
                          "QuestionGroupId": "4002",
                          "OrderIndex": 2,
                          "QuestionGroupAnswerStatus": 0,
                        },
                        {
                          "QuestionGroupId": "4003",
                          "OrderIndex": 1,
                          "QuestionGroupAnswerStatus": 1,
                        },
                        {
                          "QuestionGroupId": "4004",
                          "OrderIndex": 2,
                          "QuestionGroupAnswerStatus": 0,
                        }
                      ]
                  },
                  {
                    "QuestionId": "4",
                    "QuestionIndex": 1,
                    "QuestionAnswerStatus": 0,
                    "QuestionGroups":
                      [
                        {
                          "QuestionGroupId": "4001",
                          "OrderIndex": 1,
                          "QuestionGroupAnswerStatus": 1,
                        },
                        {
                          "QuestionGroupId": "4002",
                          "OrderIndex": 2,
                          "QuestionGroupAnswerStatus": 0,
                        },
                        {
                          "QuestionGroupId": "4003",
                          "OrderIndex": 3,
                          "QuestionGroupAnswerStatus": 0,
                        },
                        {
                          "QuestionGroupId": "4004",
                          "OrderIndex": 3,
                          "QuestionGroupAnswerStatus": 0,
                        }
                      ]
                  }
                ]
            },
            {
              "QuestionCategoryId": 9,
              "QuestionCategoryName": "判断题",
              "QuestionCount": 1,
              "TotalScore": 5,
              "Questions":
                [
                  {
                    "QuestionId": "9",
                    "QuestionIndex": 1,
                    "QuestionAnswerStatus": 0,
                    "QuestionGroups":
                      [
                        {
                          "QuestionGroupId": "9001",
                          "OrderIndex": 1,
                          "QuestionGroupAnswerStatus": 1,
                        }
                      ]
                  },
                  {
                    "QuestionId": "10",
                    "QuestionIndex": 1,
                    "QuestionAnswerStatus": 0,
                    "QuestionGroups":
                      [
                        {
                          "QuestionGroupId": "9001",
                          "OrderIndex": 1,
                          "QuestionGroupAnswerStatus": 1,
                        }
                      ]
                  }
                ]
            },
            {
              "QuestionCategoryId": 10,
              "QuestionCategoryName": "七选五",
              "QuestionCount": 1,
              "TotalScore": 5,
              "Questions":
                [
                  {
                    "QuestionId": "11",
                    "QuestionIndex": 1,
                    "QuestionAnswerStatus": 0,
                    "QuestionGroups":
                      [
                        {
                          "QuestionGroupId": "10001",
                          "OrderIndex": 1,
                          "QuestionGroupAnswerStatus": 1,
                        },
                        {
                          "QuestionGroupId": "10002",
                          "OrderIndex": 2,
                          "QuestionGroupAnswerStatus": 1,
                        }
                      ]
                  },
                  {
                    "QuestionId": "12",
                    "QuestionIndex": 1,
                    "QuestionAnswerStatus": 0,
                    "QuestionGroups":
                      [
                        {
                          "QuestionGroupId": "10001",
                          "OrderIndex": 1,
                          "QuestionGroupAnswerStatus": 1,
                        },
                        {
                          "QuestionGroupId": "10002",
                          "OrderIndex": 2,
                          "QuestionGroupAnswerStatus": 1,
                        }
                      ]
                  }
                ]
            },
            {
              "QuestionCategoryId": 22,
              "QuestionCategoryName": "画图题",
              "QuestionCount": 1,
              "TotalScore": 5,
              "Questions":
                [
                  {
                    "QuestionId": "22",
                    "QuestionIndex": 1,
                    "QuestionAnswerStatus": 0,
                    "QuestionGroups": []
                  }
                ]
            },
            {
              "QuestionCategoryId": 24,
              "QuestionCategoryName": "Word 操作题",
              "QuestionCount": 1,
              "TotalScore": 20,
              "Questions":
                [
                  {
                    "QuestionId": "24",
                    "QuestionIndex": 1,
                    "QuestionAnswerStatus": 1,
                    "QuestionGroups": []
                  }
                ]
            },
            {
              "QuestionCategoryId": 25,
              "QuestionCategoryName": "Excel 操作题",
              "QuestionCount": 1,
              "TotalScore": 20,
              "Questions":
                [
                  {
                    "QuestionId": "25",
                    "QuestionIndex": 1,
                    "QuestionAnswerStatus": 1,
                    "QuestionGroups": []
                  }
                ]
            },
            {
              "QuestionCategoryId": 26,
              "QuestionCategoryName": "Windows 操作题",
              "QuestionCount": 1,
              "TotalScore": 20,
              "Questions":
                [
                  {
                    "QuestionId": "26",
                    "QuestionIndex": 1,
                    "QuestionAnswerStatus": 1,
                    "QuestionGroups": []
                  }
                ]
            },
            {
              "QuestionCategoryId": 23,
              "QuestionCategoryName": "写作题",
              "QuestionCount": 1,
              "TotalScore": 5,
              "Questions":
                [
                  {
                    "QuestionId": "23",
                    "QuestionIndex": 1,
                    "QuestionAnswerStatus": 1,
                    "QuestionGroups": []
                  }
                ]
            }
          ]
      }
    });
  },
  /**
   * 提交用户作答信息
   * @param req
   * @param res
   * @param next
   */
  SaveStudentAnswerInfo: function (req, res, next) {
    res.send({
      "Message": "",
      "ResultType": 1,
      "ReturnEntity": 1
    });
  },
  /**
   * 提交整卷用户作答信息
   * @param req
   * @param res
   * @param next
   */
  SaveStudentWholeExam: function (req, res, next) {
    res.send({
      "Message": "",
      "ResultType": 1,
      "ReturnEntity": 1
    });
  },
  /**
   * 交卷
   * @param req
   * @param res
   * @param next
   */
  HandInExamPaper: function (req, res, next) {
    res.send({
      "Message": "",
      "ResultType": 1,
      "ReturnEntity": {
        "HandResult": 1
      }
    });
  },
  /**
   * 获取考试结果
   * @param req
   * @param res
   * @param next
   */
  GetExamResult: function (req, res, next) {
    res.send({
      "Message": "",
      "ResultType": 1,
      "ReturnEntity": {
        "Score": 80,
        "HasAnalysis": true,
        "WaitedToExams": [
          "信息技术", "通用技术"
        ]
      }
    });
  }
};

module.exports = answer;
