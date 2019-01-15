const fs = require('fs');
const path = require('path');
const mineType = require('mime-types');

let questionPictures = {};
let questionGroupsPictures = {};

[1, 2, 3, 4, 9, 10, 22, 23, 24, 25, 26].forEach(function (item) {
  let questionPicturePath = path.resolve(__dirname, 'pictures/' + item + '.jpg');
  let questionPictureData = fs.readFileSync(questionPicturePath);
  questionPictureData = new Buffer(questionPictureData).toString('base64');

  questionPictures[item] = 'data:' + mineType.lookup(questionPicturePath) + ';base64,' + questionPictureData;
});

[3, 4, 10].forEach(function (item) {
  let questionPicturePath = path.resolve(__dirname, 'pictures/' + item + '-1.jpg');
  let questionPictureData = fs.readFileSync(questionPicturePath);
  questionPictureData = new Buffer(questionPictureData).toString('base64');

  questionGroupsPictures[item] = 'data:' + mineType.lookup(questionPicturePath) + ';base64,' + questionPictureData;
});

/**
 * 题目类型
 */
const questionType = {
  /**
   * @cfg 1、单选题
   */
  1: {
    "QuestionId": "1",
    "PreQuestionId": "",
    "NextQuestionId": "2",
    "QuestionIndex": 1,
    "QuestionDisplayTypeId": 1,
    "QuestionCategoryName": "单选题",
    "QuestionCount": 8,
    "Score": 10,
    "QuestionPicture": questionPictures[1],
    "QuestionGroupsPicture": "",
    "QuestionComment": "",
    "TimeLength": "7200",
    "AllowTimeLength": "60",
    "QuestionGroups": [{
      "QuestionGroupId": "测试用小题Id1",
      "QuestionGroupOptions": [{
        "QuestionOptionId": "A",
        "QuestionOptionText": "选项A"
      }, {
        "QuestionOptionId": "B",
        "QuestionOptionText": "选项B"
      }, {
        "QuestionOptionId": "C",
        "QuestionOptionText": "选项C"
      }, {
        "QuestionOptionId": "D",
        "QuestionOptionText": "选项D"
      }],
      "StudentAnswers": []
    }]
  },
  /**
   * @cfg 2、多选题
   */
  2: {
    "QuestionId": "2",
    "PreQuestionId": "1",
    "NextQuestionId": "3",
    "QuestionIndex": 1,
    "QuestionDisplayTypeId": 2,
    "QuestionCategoryName": "多选题",
    "QuestionCount": 8,
    "Score": 10,
    "QuestionPicture": questionPictures[2],
    "QuestionGroupsPicture": "",
    "QuestionComment": "",
    "TimeLength": "7200",
    "AllowTimeLength": "60",
    "QuestionGroups": [{
      "QuestionGroupId": "测试用小题Id2",
      "QuestionGroupOptions": [{
        "QuestionOptionId": "A",
        "QuestionOptionText": "选项A"
      }, {
        "QuestionOptionId": "B",
        "QuestionOptionText": "选项B"
      }, {
        "QuestionOptionId": "C",
        "QuestionOptionText": "选项C"
      }, {
        "QuestionOptionId": "D",
        "QuestionOptionText": "选项D"
      }],
      "StudentAnswers": ["A", "B", "D"]
    }]
  },
  /**
   * @cfg 3、阅读理解（复杂题）
   */
  3: {
    "QuestionId": "3",
    "PreQuestionId": "2",
    "NextQuestionId": "3-1",
    "QuestionIndex": 1,
    "QuestionDisplayTypeId": 3,
    "QuestionCategoryName": "阅读理解",
    "QuestionCount": 3,
    "Score": 10,
    "QuestionPicture": questionPictures[3],
    "QuestionGroupsPicture": questionGroupsPictures[3],
    "QuestionComment": "",
    "TimeLength": "7200",
    "AllowTimeLength": "60",
    "QuestionGroups": [{
      "QuestionGroupId": "测试用小题Id61",
      "QuestionGroupOptions": [{
        "QuestionOptionId": "A",
        "QuestionOptionText": "小题61选项A"
      }, {
        "QuestionOptionId": "B",
        "QuestionOptionText": "小题61选项B"
      }, {
        "QuestionOptionId": "C",
        "QuestionOptionText": "小题61选项C"
      }, {
        "QuestionOptionId": "D",
        "QuestionOptionText": "小题61选项D"
      }],
      "StudentAnswers": [""]
    }, {
      "QuestionGroupId": "测试用小题Id62",
      "QuestionGroupOptions": [{
        "QuestionOptionId": "A",
        "QuestionOptionText": "小题62选项A"
      }, {
        "QuestionOptionId": "B",
        "QuestionOptionText": "小题62选项B"
      }, {
        "QuestionOptionId": "C",
        "QuestionOptionText": "小题62选项C"
      }, {
        "QuestionOptionId": "D",
        "QuestionOptionText": "小题62选项D"
      }],
      "StudentAnswers": []
    }, {
      "QuestionGroupId": "测试用小题Id63",
      "QuestionGroupOptions": [{
        "QuestionOptionId": "A",
        "QuestionOptionText": "小题63选项A"
      }, {
        "QuestionOptionId": "B",
        "QuestionOptionText": "小题63选项B"
      }, {
        "QuestionOptionId": "C",
        "QuestionOptionText": "小题63选项C"
      }, {
        "QuestionOptionId": "D",
        "QuestionOptionText": "小题63选项D"
      }],
      "StudentAnswers": ["C"]
    }, {
      "QuestionGroupId": "测试用小题Id64",
      "QuestionGroupOptions": [{
        "QuestionOptionId": "A",
        "QuestionOptionText": "小题64选项A"
      }, {
        "QuestionOptionId": "B",
        "QuestionOptionText": "小题64选项B"
      }, {
        "QuestionOptionId": "C",
        "QuestionOptionText": "小题64选项C"
      }, {
        "QuestionOptionId": "D",
        "QuestionOptionText": "小题64选项D"
      }],
      "StudentAnswers": ["D"]
    }]
  },
  "3-1": {
    "QuestionId": "3-1",
    "PreQuestionId": "3",
    "NextQuestionId": "3-2",
    "QuestionIndex": 1,
    "QuestionDisplayTypeId": 3,
    "QuestionCategoryName": "阅读理解",
    "QuestionCount": 3,
    "Score": 10,
    "QuestionPicture": questionPictures[3],
    "QuestionGroupsPicture": questionGroupsPictures[3],
    "QuestionComment": "",
    "TimeLength": "7200",
    "AllowTimeLength": "60",
    "QuestionGroups": [{
      "QuestionGroupId": "测试用小题Id61",
      "QuestionGroupOptions": [{
        "QuestionOptionId": "A",
        "QuestionOptionText": "小题61选项A"
      }, {
        "QuestionOptionId": "B",
        "QuestionOptionText": "小题61选项B"
      }, {
        "QuestionOptionId": "C",
        "QuestionOptionText": "小题61选项C"
      }, {
        "QuestionOptionId": "D",
        "QuestionOptionText": "小题61选项D"
      }],
      "StudentAnswers": [""]
    }, {
      "QuestionGroupId": "测试用小题Id62",
      "QuestionGroupOptions": [{
        "QuestionOptionId": "A",
        "QuestionOptionText": "小题62选项A"
      }, {
        "QuestionOptionId": "B",
        "QuestionOptionText": "小题62选项B"
      }, {
        "QuestionOptionId": "C",
        "QuestionOptionText": "小题62选项C"
      }, {
        "QuestionOptionId": "D",
        "QuestionOptionText": "小题62选项D"
      }],
      "StudentAnswers": []
    }, {
      "QuestionGroupId": "测试用小题Id63",
      "QuestionGroupOptions": [{
        "QuestionOptionId": "A",
        "QuestionOptionText": "小题63选项A"
      }, {
        "QuestionOptionId": "B",
        "QuestionOptionText": "小题63选项B"
      }, {
        "QuestionOptionId": "C",
        "QuestionOptionText": "小题63选项C"
      }, {
        "QuestionOptionId": "D",
        "QuestionOptionText": "小题63选项D"
      }],
      "StudentAnswers": ["C"]
    }]
  },
  "3-2": {
    "QuestionId": "3-2",
    "PreQuestionId": "3-1",
    "NextQuestionId": "4",
    "QuestionIndex": 1,
    "QuestionDisplayTypeId": 3,
    "QuestionCategoryName": "阅读理解",
    "QuestionCount": 3,
    "Score": 10,
    "QuestionPicture": questionPictures[3],
    "QuestionGroupsPicture": questionGroupsPictures[3],
    "QuestionComment": "",
    "TimeLength": "7200",
    "AllowTimeLength": "60",
    "QuestionGroups": [{
      "QuestionGroupId": "测试用小题Id61",
      "QuestionGroupOptions": [{
        "QuestionOptionId": "A",
        "QuestionOptionText": "小题61选项A"
      }, {
        "QuestionOptionId": "B",
        "QuestionOptionText": "小题61选项B"
      }, {
        "QuestionOptionId": "C",
        "QuestionOptionText": "小题61选项C"
      }, {
        "QuestionOptionId": "D",
        "QuestionOptionText": "小题61选项D"
      }],
      "StudentAnswers": [""]
    }, {
      "QuestionGroupId": "测试用小题Id62",
      "QuestionGroupOptions": [{
        "QuestionOptionId": "A",
        "QuestionOptionText": "小题62选项A"
      }, {
        "QuestionOptionId": "B",
        "QuestionOptionText": "小题62选项B"
      }, {
        "QuestionOptionId": "C",
        "QuestionOptionText": "小题62选项C"
      }, {
        "QuestionOptionId": "D",
        "QuestionOptionText": "小题62选项D"
      }],
      "StudentAnswers": []
    }, {
      "QuestionGroupId": "测试用小题Id63",
      "QuestionGroupOptions": [{
        "QuestionOptionId": "A",
        "QuestionOptionText": "小题63选项A"
      }, {
        "QuestionOptionId": "B",
        "QuestionOptionText": "小题63选项B"
      }, {
        "QuestionOptionId": "C",
        "QuestionOptionText": "小题63选项C"
      }, {
        "QuestionOptionId": "D",
        "QuestionOptionText": "小题63选项D"
      }],
      "StudentAnswers": ["C"]
    }, {
      "QuestionGroupId": "测试用小题Id64",
      "QuestionGroupOptions": [{
        "QuestionOptionId": "A",
        "QuestionOptionText": "小题64选项A"
      }, {
        "QuestionOptionId": "B",
        "QuestionOptionText": "小题64选项B"
      }, {
        "QuestionOptionId": "C",
        "QuestionOptionText": "小题64选项C"
      }, {
        "QuestionOptionId": "D",
        "QuestionOptionText": "小题64选项D"
      }],
      "StudentAnswers": ["D"]
    }]
  },
  /**
   * @cfg 4、完形填空
   */
  4: {
    "QuestionId": "4",
    "PreQuestionId": "3-2",
    "NextQuestionId": "9",
    "QuestionIndex": 1,
    "QuestionDisplayTypeId": 4,
    "QuestionCategoryName": "完形填空",
    "QuestionCount": 3,
    "Score": 10,
    "QuestionPicture": questionPictures[4],
    "QuestionGroupsPicture": questionGroupsPictures[4],
    "QuestionComment": "",
    "TimeLength": "7200",
    "AllowTimeLength": "60",
    "QuestionGroups": [{
      "QuestionGroupId": "测试用小题Id61",
      "QuestionGroupOptions": [{
        "QuestionOptionId": "A",
        "QuestionOptionText": "小题61选项A"
      }, {
        "QuestionOptionId": "B",
        "QuestionOptionText": "小题61选项B"
      }, {
        "QuestionOptionId": "C",
        "QuestionOptionText": "小题61选项C"
      }, {
        "QuestionOptionId": "D",
        "QuestionOptionText": "小题61选项D"
      }],
      "StudentAnswers": [""]
    }, {
      "QuestionGroupId": "测试用小题Id62",
      "QuestionGroupOptions": [{
        "QuestionOptionId": "A",
        "QuestionOptionText": "小题62选项A"
      }, {
        "QuestionOptionId": "B",
        "QuestionOptionText": "小题62选项B"
      }, {
        "QuestionOptionId": "C",
        "QuestionOptionText": "小题62选项C"
      }, {
        "QuestionOptionId": "D",
        "QuestionOptionText": "小题62选项D"
      }],
      "StudentAnswers": []
    }, {
      "QuestionGroupId": "测试用小题Id63",
      "QuestionGroupOptions": [{
        "QuestionOptionId": "A",
        "QuestionOptionText": "小题63选项A"
      }, {
        "QuestionOptionId": "B",
        "QuestionOptionText": "小题63选项B"
      }, {
        "QuestionOptionId": "C",
        "QuestionOptionText": "小题63选项C"
      }, {
        "QuestionOptionId": "D",
        "QuestionOptionText": "小题63选项D"
      }],
      "StudentAnswers": ["C"]
    }, {
      "QuestionGroupId": "测试用小题Id64",
      "QuestionGroupOptions": [{
        "QuestionOptionId": "A",
        "QuestionOptionText": "小题64选项A"
      }, {
        "QuestionOptionId": "B",
        "QuestionOptionText": "小题64选项B"
      }, {
        "QuestionOptionId": "C",
        "QuestionOptionText": "小题64选项C"
      }, {
        "QuestionOptionId": "D",
        "QuestionOptionText": "小题64选项D"
      }],
      "StudentAnswers": ["D"]
    }]
  },
  /**
   * @cfg 9、判断题
   */
  9: {
    "QuestionId": "9",
    "PreQuestionId": "4",
    "NextQuestionId": "10",
    "QuestionIndex": 1,
    "QuestionDisplayTypeId": 9,
    "QuestionCategoryName": "判断题",
    "QuestionCount": 5,
    "Score": 10,
    "QuestionPicture": questionPictures[9],
    "QuestionGroupsPicture": "",
    "QuestionComment": "",
    "TimeLength": "7200",
    "AllowTimeLength": "60",
    "QuestionGroups": [{
      "QuestionGroupId": "测试用小题Id3",
      "QuestionGroupOptions": [{
        "QuestionOptionId": "A",
        "QuestionOptionText": "对"
      }, {
        "QuestionOptionId": "B",
        "QuestionOptionText": "错"
      }],
      "StudentAnswers": ["A"]
    }]
  },
  /**
   * @cfg 7、七选五
   */
  10: {
    "QuestionId": "10",
    "PreQuestionId": "9",
    "NextQuestionId": "22",
    "QuestionIndex": 1,
    "QuestionDisplayTypeId": 10,
    "QuestionCategoryName": "七选五",
    "QuestionCount": 1,
    "Score": 10,
    "QuestionPicture": questionPictures[10],
    "QuestionGroupsPicture": questionGroupsPictures[10],
    "QuestionComment": "",
    "TimeLength": "7200",
    "AllowTimeLength": "60",
    "QuestionGroups": [{
      "QuestionGroupId": "测试用小题Id7",
      "QuestionGroupOptions": [{
        "QuestionOptionId": "A",
        "QuestionOptionText": "小题7选项A"
      }, {
        "QuestionOptionId": "B",
        "QuestionOptionText": "小题7选项B"
      }, {
        "QuestionOptionId": "C",
        "QuestionOptionText": "小题7选项C"
      }, {
        "QuestionOptionId": "D",
        "QuestionOptionText": "小题7选项D"
      }, {
        "QuestionOptionId": "E",
        "QuestionOptionText": "小题7选项E"
      }, {
        "QuestionOptionId": "F",
        "QuestionOptionText": "小题7选项F"
      }, {
        "QuestionOptionId": "G",
        "QuestionOptionText": "小题7选项G"
      }],
      "StudentAnswers": ["D", "", "C", "", "A"]
    }]
  },
  /**
   * @cfg 22、画图题
   */
  22: {
    "QuestionId": "22",
    "PreQuestionId": "10",
    "NextQuestionId": "24",
    "QuestionIndex": 1,
    "QuestionDisplayTypeId": 22,
    "QuestionCategoryName": "画图题",
    "QuestionCount": 2,
    "Score": 10,
    "QuestionPicture": questionPictures[22],
    "QuestionGroupsPicture": "",
    "QuestionComment": "请根据所给立体图补齐三视图中的三处线条缺漏，每处2分，共6分。补画超过三处，每处倒扣2分，直至本题0分。",
    "TimeLength": "7200",
    "AllowTimeLength": "60",
    "QuestionGroups": [{
      "QuestionGroupId": "22-1",
      "DrawAnswers": [{
        "Id": "drawHistory-1533797077332",
        "Type": "line",
        "PointStart": [141, 74],
        "PointEnd": [322, 229]
      }, {
        "Id": "drawHistory-1533797078164",
        "Type": "dash",
        "PointStart": [384, 108],
        "PointEnd": [29, 396]
      }, {
        "Id": "drawHistory-1533797080471",
        "Type": "circle",
        "PointStart": [205, 281],
        "PointEnd": [246, 342],
        "Radii": 73.49829930005184
      }]
    }],
  },
  /**
   * @cfg 23、写作题
   */
  23: {
    "QuestionId": "23",
    "PreQuestionId": "26",
    "NextQuestionId": "",
    "QuestionIndex": 1,
    "QuestionDisplayTypeId": 23,
    "QuestionCategoryName": "写作题",
    "QuestionCount": 1,
    "Score": 10,
    "QuestionPicture": questionPictures[23],
    "QuestionGroupsPicture": "",
    "QuestionComment": "",
    "TimeLength": "7200",
    "AllowTimeLength": "120",
    "QuestionGroups": []
  },
  /**
   * @cfg 24、Word 操作题
   */
  24: {
    "QuestionId": "24",
    "PreQuestionId": "22",
    "NextQuestionId": "25",
    "QuestionIndex": 4,
    "QuestionDisplayTypeId": 24,
    "QuestionCategoryName": "Word 操作题",
    "QuestionCount": 5,
    "Score": 10,
    "QuestionPicture": questionPictures[24],
    "QuestionGroupsPicture": "",
    "QuestionComment": "",
    "TimeLength": "7200",
    "AllowTimeLength": "10",
    "QuestionGroups": []
  },
  /**
   * @cfg 25、Excel 操作题
   */
  25: {
    "QuestionId": "25",
    "PreQuestionId": "24",
    "NextQuestionId": "26",
    "QuestionIndex": 4,
    "QuestionDisplayTypeId": 25,
    "QuestionCategoryName": "Excel 操作题",
    "QuestionCount": 5,
    "Score": 10,
    "QuestionPicture": questionPictures[25],
    "QuestionGroupsPicture": "",
    "QuestionComment": "",
    "TimeLength": "7200",
    "AllowTimeLength": "10",
    "QuestionGroups": []
  },
  /**
   * @cfg 26、Windows 操作题
   */
  26: {
    "QuestionId": "26",
    "PreQuestionId": "25",
    "NextQuestionId": "23",
    "QuestionIndex": 4,
    "QuestionDisplayTypeId": 26,
    "QuestionCategoryName": "Windows 操作题",
    "QuestionCount": 5,
    "Score": 10,
    "QuestionPicture": questionPictures[26],
    "QuestionGroupsPicture": "",
    "QuestionComment": "",
    "TimeLength": "7200",
    "AllowTimeLength": "10",
    "QuestionGroups": []
  },
};

/**
 * 题目解析类型
 */
const questionAnalysisType = {
  /**
   * @cfg 1、单选题
   */
  1: {
    "QuestionId": "1",
    "PreQuestionId": "",
    "NextQuestionId": "2",
    "QuestionIndex": 1,
    "QuestionDisplayTypeId": 1,
    "QuestionCategoryName": "单选题",
    "QuestionCount": 8,
    "Score": 10,
    "QuestionPicture": questionPictures[1],
    "QuestionGroupsPicture": "",
    "QuestionComment": "",
    "TimeLength": "7200",
    "AllowTimeLength": "60",
    "QuestionAnalysis": "单选题解析",
    "QuestionGroups": [{
      "QuestionGroupId": "测试用小题Id1",
      "QuestionDisplayTypeId": 1,
      "IsQuestionGroupCorrect": 1,
      "QuestionGroupOptions": [{
        "QuestionOptionId": "A",
        "QuestionOptionText": "选项A"
      }, {
        "QuestionOptionId": "B",
        "QuestionOptionText": "选项B"
      }, {
        "QuestionOptionId": "C",
        "QuestionOptionText": "选项C"
      }, {
        "QuestionOptionId": "D",
        "QuestionOptionText": "选项D"
      }],
      "StudentAnswers": ["C"],
      "StandardAnswers": ["C"],
    }]
  },
  /**
   * @cfg 2、多选题
   */
  2: {
    "QuestionId": "2",
    "PreQuestionId": "1",
    "NextQuestionId": "3",
    "QuestionIndex": 1,
    "QuestionDisplayTypeId": 2,
    "QuestionCategoryName": "多选题",
    "QuestionCount": 8,
    "Score": 10,
    "QuestionPicture": questionPictures[2],
    "QuestionGroupsPicture": "",
    "QuestionComment": "",
    "TimeLength": "7200",
    "AllowTimeLength": "60",
    "QuestionAnalysis": "多选题解析",
    "QuestionGroups": [{
      "QuestionGroupId": "测试用小题Id2",
      "QuestionDisplayTypeId": 1,
      "IsQuestionGroupCorrect": 0,
      "QuestionGroupOptions": [{
        "QuestionOptionId": "A",
        "QuestionOptionText": "选项A"
      }, {
        "QuestionOptionId": "B",
        "QuestionOptionText": "选项B"
      }, {
        "QuestionOptionId": "C",
        "QuestionOptionText": "选项C"
      }, {
        "QuestionOptionId": "D",
        "QuestionOptionText": "选项D"
      }],
      "StudentAnswers": ["A", "B", "D"],
      "StandardAnswers": ["C", "D"],
    }]
  },
  /**
   * @cfg 3、复杂题
   */
  3: {
    "QuestionId": "3",
    "PreQuestionId": "2",
    "NextQuestionId": "4",
    "QuestionIndex": 1,
    "QuestionDisplayTypeId": 3,
    "QuestionCategoryName": "复杂题",
    "QuestionCount": 3,
    "Score": 10,
    "QuestionPicture": questionPictures[3],
    "QuestionGroupsPicture": questionGroupsPictures[3],
    "QuestionComment": "",
    "TimeLength": "7200",
    "AllowTimeLength": "60",
    "QuestionAnalysis": "复杂题解析",
    "QuestionGroups": [{
      "QuestionGroupId": "测试用小题Id61",
      "QuestionDisplayTypeId": 1,
      "IsQuestionGroupCorrect": 0,
      "QuestionGroupOptions": [{
        "QuestionOptionId": "A",
        "QuestionOptionText": "小题61选项A"
      }, {
        "QuestionOptionId": "B",
        "QuestionOptionText": "小题61选项B"
      }, {
        "QuestionOptionId": "C",
        "QuestionOptionText": "小题61选项C"
      }, {
        "QuestionOptionId": "D",
        "QuestionOptionText": "小题61选项D"
      }],
      "StudentAnswers": [""],
      "StandardAnswers": ["C"],
    }, {
      "QuestionGroupId": "测试用小题Id62",
      "QuestionDisplayTypeId": 1,
      "IsQuestionGroupCorrect": 0,
      "QuestionGroupOptions": [{
        "QuestionOptionId": "A",
        "QuestionOptionText": "小题62选项A"
      }, {
        "QuestionOptionId": "B",
        "QuestionOptionText": "小题62选项B"
      }, {
        "QuestionOptionId": "C",
        "QuestionOptionText": "小题62选项C"
      }, {
        "QuestionOptionId": "D",
        "QuestionOptionText": "小题62选项D"
      }],
      "StudentAnswers": [],
      "StandardAnswers": ["C"],
    }, {
      "QuestionGroupId": "测试用小题Id63",
      "QuestionDisplayTypeId": 1,
      "IsQuestionGroupCorrect": 1,
      "QuestionGroupOptions": [{
        "QuestionOptionId": "A",
        "QuestionOptionText": "小题63选项A"
      }, {
        "QuestionOptionId": "B",
        "QuestionOptionText": "小题63选项B"
      }, {
        "QuestionOptionId": "C",
        "QuestionOptionText": "小题63选项C"
      }, {
        "QuestionOptionId": "D",
        "QuestionOptionText": "小题63选项D"
      }],
      "StudentAnswers": ["C"],
      "StandardAnswers": ["C"],
    }, {
      "QuestionGroupId": "测试用小题Id64",
      "QuestionDisplayTypeId": 1,
      "IsQuestionGroupCorrect": 0,
      "QuestionGroupOptions": [{
        "QuestionOptionId": "A",
        "QuestionOptionText": "小题64选项A"
      }, {
        "QuestionOptionId": "B",
        "QuestionOptionText": "小题64选项B"
      }, {
        "QuestionOptionId": "C",
        "QuestionOptionText": "小题64选项C"
      }, {
        "QuestionOptionId": "D",
        "QuestionOptionText": "小题64选项D"
      }],
      "StudentAnswers": ["D"],
      "StandardAnswers": ["C"],
    }]
  },
  /**
   * @cfg 4、完形填空
   */
  4: {
    "QuestionId": "4",
    "PreQuestionId": "3",
    "NextQuestionId": "9",
    "QuestionIndex": 1,
    "QuestionDisplayTypeId": 4,
    "QuestionCategoryName": "完形填空",
    "QuestionCount": 3,
    "Score": 10,
    "QuestionPicture": questionPictures[4],
    "QuestionGroupsPicture": questionGroupsPictures[4],
    "QuestionComment": "",
    "TimeLength": "7200",
    "AllowTimeLength": "60",
    "QuestionAnalysis": "1. 前一句中说&ldquo;弗兰克开始讲述他的童年&rdquo;，可判断此处句意为：我是在圣佩德罗长大的。选项中只有 grew up 能表示&ldquo;成长；长大&rdquo;之意。<br>2. 根据下文 He worked hard and would stay&nbsp;out until he caught enough to ____ the family. 可知，父亲在海上以捕鱼为生是很艰辛的。it is/was hard doing sth. 是固定搭配，表示&ldquo;做某件事很艰难所以选 hard&rdquo;。<br>3. 根据设空处前面的&ldquo;捕到足够多的鱼&rdquo;，可知其目的是养家。feed the family 意为&ldquo;养活一家人&rdquo;。remove 意为&ldquo;移走；除去&rdquo;；reach 意为&ldquo;到达；达到&rdquo;；urge 意为&ldquo;力劝；催促&rdquo;。<br>4. 句意为：我真希望你们见过我的爸爸。由 could have met 可知此句用了虚拟语气，选项中只有 wish 后的宾语从句可以使用虚拟。wish 意为&ldquo;希望&rdquo;。<br>5. catch 作名词时意为&ldquo;（鱼的）捕获量&rdquo;；favorite 意为&ldquo;最爱&rdquo;；benefit 意为&ldquo;利益&rdquo;；glory 意为&ldquo;光荣&rdquo;。由 fighting the&nbsp;seas 可推知父亲为了捕鱼与大海搏斗。故选A项。<br>6. 根据下文 ...they would still smell of&nbsp;the sea and of fish. 可知此处为 smelled，意为&ldquo;闻起来&rdquo;。smelled like the ocean 表示&ldquo;（闻到）他身上散发出大海的气息&rdquo;。<br>7. 句意为：无论妈妈多么努力地洗，他的衣服还是有大海和鱼的气味。process 意为&ldquo;加工；处理&rdquo;；wash 意为&ldquo;洗&rdquo;；handle 意为&ldquo;解决&rdquo;；manage 意为&ldquo;管理&rdquo;。根据句意选B项。<br>8. drive 意为&ldquo;开车&rdquo;，drive sb. to 意为&ldquo;开车送某人去......&rdquo;；limit 意为&ldquo;限制&rdquo;；adapt 意为&ldquo;适应；改编&rdquo;；devote 意为&ldquo;致力于&rdquo;。根据下一句的 He had his old truck... 可知A项符合语境。<br>9. 此处 as 相当于 when，表示&ldquo;当&hellip;&hellip;的时候；随着&rdquo;。而不是在此&ldquo;之前(before)&rdquo;、&ldquo;之后(after)&rdquo;或是&ldquo;自从&hellip;&hellip; (since)&rdquo;。故选D项。<br>10. back up 意为&ldquo;支持；援助&rdquo;；pick up 意为&ldquo;捡起；获得；不费力地学会&rdquo;；pull up 意为&ldquo;停车&rdquo;；speed up 意为&ldquo;加速&rdquo;。根据语境选D项。<br>11. 句意为：...... 好像每个人都会站在一旁观看。could 意为&ldquo;能够&rdquo;；should 意为&ldquo;应该&rdquo;；might 意为&ldquo;有可能&rdquo;。would 意为&ldquo;总是&rdquo;，表示时常会发生的情况，符合语境。&nbsp;<br>12. 根据本段最后一句 I was twelve years&nbsp;old, and my dad would lean over and kiss&nbsp;me goodbye! 可知答案为 lean。<br>13.&nbsp;frightening 意为&ldquo;令人害怕的&rdquo;；challenging 意为&ldquo;有挑战性的&rdquo;；embarrassing 意为&ldquo;使人难为情的&rdquo;；entertaining 意为&ldquo;令人愉快的&rdquo;。父亲在学校大门口亲&ldquo;我&rdquo;，使&ldquo;我&rdquo;感到难为情。所以选 embarrassing。<br>14. 句意为：他停顿了一下之后继续说：&ldquo;我记得我说&lsquo;不&rsquo;的那一天。&rdquo;根据后面的 then went on（然后又继续说），可推断他先是停顿了一下。选项中只有 paused 意为&ldquo;停顿&rdquo;。yawn 意为&ldquo;打哈欠&rdquo;；twist 意为&ldquo;扭曲&rdquo;；swing 意为&ldquo;摇摆&rdquo;。故选B项。<br>15. 句意为：那是我第一次以那样的方式对他说话&hellip;&hellip;。way 意为&ldquo;方式；方法&rdquo;，符合语境。<br>16. 小弗兰克认为自己已经长大，不再需要告别之吻。选项中只有 old 表示年龄。所以选A项。<br>17. 根据语境以及前面一句话中提到的 tear up (眼泪涌出来)，可知弗兰克从来没有见过父亲哭。故选 cry。<br>18.&nbsp;break down 意为&ldquo;分解；发生故障；失败&rdquo;；hold back 意为&ldquo;隐瞒；抑制；阻止&rdquo;；well up 意为&ldquo;涌出&rdquo;；start off 意为&ldquo;出发；开始&rdquo;。根据语境选C项。<br>19. 句意为：伙计们，你们不知道，如果我爸爸能再在我脸上亲一下&hellip;&hellip; 让我感觉一下他那粗糙的脸&hellip;&hellip; 闻一闻他身上海洋的气息&hellip;&hellip;享受他搂着我脖子的感觉，那么我付出什么都愿意。句子的主干是 you don&#39;t&nbsp;know what I would give。give 在此处表示&ldquo;付出（任何代价）&rdquo;。<br>20. 此句为虚拟语气。这句话与前一句 I&nbsp;wish I had been a man then. 对应，故应选 man。此处指&ldquo;如果那时候我是个男子汉，我就不会告诉爸爸我已经长大了，不再需要告别之吻了&rdquo;。",
    "QuestionGroups": [{
      "QuestionGroupId": "测试用小题Id61",
      "QuestionDisplayTypeId": 1,
      "IsQuestionGroupCorrect": 0,
      "QuestionGroupOptions": [{
        "QuestionOptionId": "A",
        "QuestionOptionText": "小题61选项A"
      }, {
        "QuestionOptionId": "B",
        "QuestionOptionText": "小题61选项B"
      }, {
        "QuestionOptionId": "C",
        "QuestionOptionText": "小题61选项C"
      }, {
        "QuestionOptionId": "D",
        "QuestionOptionText": "小题61选项D"
      }],
      "StudentAnswers": [""],
      "StandardAnswers": ["C"],
    }, {
      "QuestionGroupId": "测试用小题Id62",
      "QuestionDisplayTypeId": 1,
      "IsQuestionGroupCorrect": 0,
      "QuestionGroupOptions": [{
        "QuestionOptionId": "A",
        "QuestionOptionText": "小题62选项A"
      }, {
        "QuestionOptionId": "B",
        "QuestionOptionText": "小题62选项B"
      }, {
        "QuestionOptionId": "C",
        "QuestionOptionText": "小题62选项C"
      }, {
        "QuestionOptionId": "D",
        "QuestionOptionText": "小题62选项D"
      }],
      "StudentAnswers": [],
      "StandardAnswers": ["C"],
    }, {
      "QuestionGroupId": "测试用小题Id63",
      "QuestionDisplayTypeId": 1,
      "IsQuestionGroupCorrect": 1,
      "QuestionGroupOptions": [{
        "QuestionOptionId": "A",
        "QuestionOptionText": "小题63选项A"
      }, {
        "QuestionOptionId": "B",
        "QuestionOptionText": "小题63选项B"
      }, {
        "QuestionOptionId": "C",
        "QuestionOptionText": "小题63选项C"
      }, {
        "QuestionOptionId": "D",
        "QuestionOptionText": "小题63选项D"
      }],
      "StudentAnswers": ["C"],
      "StandardAnswers": ["C"],
    }, {
      "QuestionGroupId": "测试用小题Id64",
      "QuestionDisplayTypeId": 1,
      "IsQuestionGroupCorrect": 0,
      "QuestionGroupOptions": [{
        "QuestionOptionId": "A",
        "QuestionOptionText": "小题64选项A"
      }, {
        "QuestionOptionId": "B",
        "QuestionOptionText": "小题64选项B"
      }, {
        "QuestionOptionId": "C",
        "QuestionOptionText": "小题64选项C"
      }, {
        "QuestionOptionId": "D",
        "QuestionOptionText": "小题64选项D"
      }],
      "StudentAnswers": ["D"],
      "StandardAnswers": ["C"],
    }]
  },
  /**
   * @cfg 9、判断题
   */
  9: {
    "QuestionId": "9",
    "PreQuestionId": "4",
    "NextQuestionId": "10",
    "QuestionIndex": 1,
    "QuestionDisplayTypeId": 9,
    "QuestionCategoryName": "判断题",
    "QuestionCount": 5,
    "Score": 10,
    "QuestionPicture": questionPictures[9],
    "QuestionGroupsPicture": "",
    "QuestionComment": "",
    "TimeLength": "7200",
    "AllowTimeLength": "60",
    "QuestionAnalysis": "判断题解析",
    "QuestionGroups": [{
      "QuestionGroupId": "测试用小题Id3",
      "QuestionDisplayTypeId": 1,
      "IsQuestionGroupCorrect": 0,
      "QuestionGroupOptions": [{
        "QuestionOptionId": "A",
        "QuestionOptionText": "对"
      }, {
        "QuestionOptionId": "B",
        "QuestionOptionText": "错"
      }],
      "StudentAnswers": [],
      "StandardAnswers": ["B"],
    }]
  },
  /**
   * @cfg 7、七选五
   */
  10: {
    "QuestionId": "10",
    "PreQuestionId": "9",
    "NextQuestionId": "22",
    "QuestionIndex": 1,
    "QuestionDisplayTypeId": 10,
    "QuestionCategoryName": "七选五",
    "QuestionCount": 1,
    "Score": 10,
    "QuestionPicture": questionPictures[10],
    "QuestionGroupsPicture": questionGroupsPictures[10],
    "QuestionComment": "",
    "TimeLength": "7200",
    "AllowTimeLength": "60",
    "QuestionAnalysis": "7选5解析",
    "QuestionGroups": [{
      "QuestionGroupId": "测试用小题Id7",
      "QuestionDisplayTypeId": 1,
      "IsQuestionGroupCorrect": 0,
      "QuestionGroupOptions": [{
        "QuestionOptionId": "A",
        "QuestionOptionText": "小题7选项A"
      }, {
        "QuestionOptionId": "B",
        "QuestionOptionText": "小题7选项B"
      }, {
        "QuestionOptionId": "C",
        "QuestionOptionText": "小题7选项C"
      }, {
        "QuestionOptionId": "D",
        "QuestionOptionText": "小题7选项D"
      }, {
        "QuestionOptionId": "E",
        "QuestionOptionText": "小题7选项E"
      }, {
        "QuestionOptionId": "F",
        "QuestionOptionText": "小题7选项F"
      }, {
        "QuestionOptionId": "G",
        "QuestionOptionText": "小题7选项G"
      }],
      "StudentAnswers": ["D", "", "C", "", "A"],
      "StandardAnswers": ["C", "D", "A", "B", "E"],
    }]
  },
  /**
   * @cfg 22、画图题
   */
  22: {
    "QuestionId": "22",
    "PreQuestionId": "10",
    "NextQuestionId": "24",
    "QuestionIndex": 1,
    "QuestionDisplayTypeId": 22,
    "QuestionCategoryName": "画图题",
    "QuestionCount": 2,
    "Score": 10,
    "QuestionPicture": questionPictures[22],
    "QuestionGroupsPicture": "",
    "QuestionComment": "请根据所给立体图补齐三视图中的三处线条缺漏，每处2分，共6分。补画超过三处，每处倒扣2分，直至本题0分。",
    "TimeLength": "7200",
    "AllowTimeLength": "60",
    "QuestionAnalysis": "画图题解析",
    "QuestionGroups": [{
      "DrawAnswers": [{
        "Id": "drawHistory-1533797077332",
        "Type": "line",
        "PointStart": [141, 74],
        "PointEnd": [322, 229],
        "IsQuestionGroupCorrect": 0,
      }, {
        "Id": "drawHistory-1533797078164",
        "Type": "dash",
        "PointStart": [384, 108],
        "PointEnd": [29, 396],
        "IsQuestionGroupCorrect": 0,
      }, {
        "Id": "drawHistory-1533797080471",
        "Type": "circle",
        "PointStart": [438, 118],
        "PointEnd": [451, 133],
        "Radii": 19.849433241279208,
        "IsQuestionGroupCorrect": 1,
      }],
      "DrawStandardAnswers": [{
        "Id": "drawHistory-1536572930614",
        "Type": "line",
        "PointStart": [127, 165],
        "PointEnd": [268, 168]
      }, {
        "Id": "drawHistory-1536572954517",
        "Type": "dash",
        "PointStart": [416, 263],
        "PointEnd": [416, 197]
      }, {
        "Id": "drawHistory-1536572957428",
        "Type": "dash",
        "PointStart": [463, 264],
        "PointEnd": [465, 195]
      }, {
        "Id": "drawHistory-1536572962484",
        "Type": "circle",
        "PointStart": [438, 118],
        "PointEnd": [451, 133],
        "Radii": 19.849433241279208
      }]
    }],
  },
  /**
   * @cfg 23、写作题
   */
  23: {
    "QuestionId": "23",
    "PreQuestionId": "26",
    "NextQuestionId": "",
    "QuestionIndex": 1,
    "QuestionDisplayTypeId": 23,
    "QuestionCategoryName": "写作题",
    "QuestionCount": 1,
    "Score": 10,
    "QuestionPicture": questionPictures[23],
    "QuestionGroupsPicture": "",
    "QuestionComment": "",
    "TimeLength": "7200",
    "AllowTimeLength": "120",
    "QuestionAnalysis": "写作题解析",
    "QuestionGroups": []
  },
  /**
   * @cfg 24、Word 操作题
   */
  24: {
    "QuestionId": "24",
    "PreQuestionId": "22",
    "NextQuestionId": "25",
    "QuestionIndex": 4,
    "QuestionDisplayTypeId": 24,
    "QuestionCategoryName": "Word 操作题",
    "QuestionCount": 5,
    "Score": 10,
    "QuestionPicture": questionPictures[24],
    "QuestionGroupsPicture": "",
    "QuestionComment": "",
    "TimeLength": "7200",
    "AllowTimeLength": "10",
    "QuestionAnalysis": "Word 操作题解析",
    "QuestionGroups": []
  },
  /**
   * @cfg 25、Excel 操作题
   */
  25: {
    "QuestionId": "25",
    "PreQuestionId": "24",
    "NextQuestionId": "26",
    "QuestionIndex": 4,
    "QuestionDisplayTypeId": 25,
    "QuestionCategoryName": "Excel 操作题",
    "QuestionCount": 5,
    "Score": 10,
    "QuestionPicture": questionPictures[25],
    "QuestionGroupsPicture": "",
    "QuestionComment": "",
    "TimeLength": "7200",
    "AllowTimeLength": "10",
    "QuestionAnalysis": "Excel 操作题解析",
    "QuestionGroups": []
  },
  /**
   * @cfg 26、Windows 操作题
   */
  26: {
    "QuestionId": "26",
    "PreQuestionId": "25",
    "NextQuestionId": "23",
    "QuestionIndex": 4,
    "QuestionDisplayTypeId": 26,
    "QuestionCategoryName": "Windows 操作题",
    "QuestionCount": 5,
    "Score": 10,
    "QuestionPicture": questionPictures[26],
    "QuestionGroupsPicture": "",
    "QuestionComment": "",
    "TimeLength": "7200",
    "AllowTimeLength": "10",
    "QuestionAnalysis": "Windows 操作题解析",
    "QuestionGroups": []
  },
};

const question = {
  /**
   * 获取题目信息
   * @param req
   * @param res
   * @param next
   */
  GetQuestion: function (req, res, next) {
    let questionId = JSON.parse(req.body.param).QuestionId;

    res.send({
      "Message": "",
      "ResultType": 1,
      "ReturnEntity": questionType[questionId]
    });
  },
  /**
   * （二期）1.6获取题目解析信息
   */
  GetQuestionAnalysis: function (req, res, next) {
    let questionId = JSON.parse(req.body.param).QuestionId;

    res.send({
      "Message": "",
      "ResultType": 1,
      "ReturnEntity": questionAnalysisType[questionId]
    });
  },
  /**
   * （二期）1.3  获取整卷作答题目信息
   */
  GetWholeExamPaperQuestions: function (req, res, next) {
    res.send({
      "Message": "",
      "ResultType": 1,
      "ReturnEntity": {
        "RemindTimeLength": "900",
        "TimeLength": "900",
        "LastSaveTimePoint": "14:50",
        "QuestionCount": "1",
        "TotalScore": "1",
        "QuestionTypes": [
          {
            "QuestionCategoryId": 1,
            "QuestionCategoryName": "单选题",
            "QuestionCount": 2,
            "TotalScore": 20,
            "QuestionCategoryIndex": "一",
            "Questions": [
              {
                "QuestionId": "1",
                "QuestionIndex": 1,
                "QuestionDisplayTypeId": 1,
                "QuestionCategoryName": "单选题",
                "QuestionCount": 1,
                "Score": 10,
                "QuestionPicture": questionPictures[1],
                "QuestionGroupsPicture": "",
                "QuestionComment": "",
                "TimeLength": "7200",
                "AllowTimeLength": "60",
                "QuestionGroups": [
                  {
                    "QuestionGroupId": "单选题-小题Id1",
                    "QuestionGroupOptions": [
                      {
                        "QuestionOptionId": "A",
                        "QuestionOptionText": "单选题-小题Id1-选项A"
                      },
                      {
                        "QuestionOptionId": "B",
                        "QuestionOptionText": "单选题-小题Id1-选项B"
                      },
                      {
                        "QuestionOptionId": "C",
                        "QuestionOptionText": "单选题-小题Id1-选项C"
                      },
                      {
                        "QuestionOptionId": "D",
                        "QuestionOptionText": "单选题-小题Id1-选项D"
                      }],
                    "StudentAnswers": []
                  }]
              },
              {
                "QuestionId": "2",
                "QuestionIndex": 2,
                "QuestionDisplayTypeId": 1,
                "QuestionCategoryName": "单选题",
                "QuestionCount": 1,
                "Score": 10,
                "QuestionPicture": questionPictures[1],
                "QuestionGroupsPicture": "",
                "QuestionComment": "",
                "TimeLength": "7200",
                "AllowTimeLength": "60",
                "QuestionGroups": [
                  {
                    "QuestionGroupId": "单选题-小题Id2",
                    "QuestionGroupOptions": [
                      {
                        "QuestionOptionId": "A",
                        "QuestionOptionText": "单选题-小题Id2-选项A"
                      },
                      {
                        "QuestionOptionId": "B",
                        "QuestionOptionText": "单选题-小题Id2-选项B"
                      },
                      {
                        "QuestionOptionId": "C",
                        "QuestionOptionText": "单选题-小题Id2-选项C"
                      },
                      {
                        "QuestionOptionId": "D",
                        "QuestionOptionText": "单选题-小题Id2-选项D"
                      }],
                    "StudentAnswers": []
                  }]
              }]
          },
          {
            "QuestionCategoryId": 2,
            "QuestionCategoryName": "多选题",
            "QuestionCount": 2,
            "TotalScore": 20,
            "QuestionCategoryIndex": "二",
            "Questions": [
              {
                "QuestionId": "3",
                "QuestionIndex": 1,
                "QuestionDisplayTypeId": 2,
                "QuestionCategoryName": "多选题",
                "QuestionCount": 1,
                "Score": 10,
                "QuestionPicture": questionPictures[2],
                "QuestionGroupsPicture": "",
                "QuestionComment": "",
                "TimeLength": "7200",
                "AllowTimeLength": "60",
                "QuestionGroups": [
                  {
                    "QuestionGroupId": "多选题-小题Id1",
                    "QuestionGroupOptions": [
                      {
                        "QuestionOptionId": "A",
                        "QuestionOptionText": "多选题-小题Id1-选项A"
                      },
                      {
                        "QuestionOptionId": "B",
                        "QuestionOptionText": "多选题-小题Id1-选项B"
                      },
                      {
                        "QuestionOptionId": "C",
                        "QuestionOptionText": "多选题-小题Id1-选项C"
                      },
                      {
                        "QuestionOptionId": "D",
                        "QuestionOptionText": "多选题-小题Id1-选项D"
                      }],
                    "StudentAnswers": ["A", "B", "D"]
                  }]
              },
              {
                "QuestionId": "4",
                "QuestionIndex": 2,
                "QuestionDisplayTypeId": 2,
                "QuestionCategoryName": "多选题",
                "QuestionCount": 1,
                "Score": 10,
                "QuestionPicture": questionPictures[2],
                "QuestionGroupsPicture": "",
                "QuestionComment": "",
                "TimeLength": "7200",
                "AllowTimeLength": "60",
                "QuestionGroups": [
                  {
                    "QuestionGroupId": "多选题-小题Id2",
                    "QuestionGroupOptions": [
                      {
                        "QuestionOptionId": "A",
                        "QuestionOptionText": "多选题-小题Id2-选项A"
                      },
                      {
                        "QuestionOptionId": "B",
                        "QuestionOptionText": "多选题-小题Id2-选项B"
                      },
                      {
                        "QuestionOptionId": "C",
                        "QuestionOptionText": "多选题-小题Id2-选项C"
                      },
                      {
                        "QuestionOptionId": "D",
                        "QuestionOptionText": "多选题-小题Id2-选项D"
                      }],
                    "StudentAnswers": ["A", "B", "D"]
                  }]
              }]
          },
          {
            "QuestionCategoryId": 3,
            "QuestionCategoryName": "复杂题",
            "QuestionCount": 2,
            "TotalScore": 20,
            "QuestionCategoryIndex": "三",
            "Questions": [
              {
                "QuestionId": "5",
                "QuestionIndex": 1,
                "QuestionDisplayTypeId": 3,
                "QuestionCategoryName": "复杂题",
                "QuestionCount": 1,
                "Score": 10,
                "QuestionPicture": questionPictures[3],
                "QuestionGroupsPicture": questionGroupsPictures[3],
                "QuestionComment": "",
                "TimeLength": "7200",
                "AllowTimeLength": "60",
                "QuestionGroups": [
                  {
                    "QuestionGroupId": "复杂题-小题Id1-1",
                    "QuestionGroupOptions": [
                      {
                        "QuestionOptionId": "A",
                        "QuestionOptionText": "复杂题-小题Id1-1-选项A"
                      },
                      {
                        "QuestionOptionId": "B",
                        "QuestionOptionText": "复杂题-小题Id1-1-选项B"
                      },
                      {
                        "QuestionOptionId": "C",
                        "QuestionOptionText": "复杂题-小题Id1-1-选项C"
                      },
                      {
                        "QuestionOptionId": "D",
                        "QuestionOptionText": "复杂题-小题Id1-1-选项D"
                      }],
                    "StudentAnswers": [""]
                  },
                  {
                    "QuestionGroupId": "复杂题-小题Id1-2",
                    "QuestionGroupOptions": [
                      {
                        "QuestionOptionId": "A",
                        "QuestionOptionText": "复杂题-小题Id1-2-选项A"
                      },
                      {
                        "QuestionOptionId": "B",
                        "QuestionOptionText": "复杂题-小题Id1-2-选项B"
                      },
                      {
                        "QuestionOptionId": "C",
                        "QuestionOptionText": "复杂题-小题Id1-2-选项C"
                      },
                      {
                        "QuestionOptionId": "D",
                        "QuestionOptionText": "复杂题-小题Id1-2-选项D"
                      }],
                    "StudentAnswers": []
                  },
                  {
                    "QuestionGroupId": "复杂题-小题Id1-3",
                    "QuestionGroupOptions": [
                      {
                        "QuestionOptionId": "A",
                        "QuestionOptionText": "复杂题-小题Id1-3-选项A"
                      },
                      {
                        "QuestionOptionId": "B",
                        "QuestionOptionText": "复杂题-小题Id1-3-选项B"
                      },
                      {
                        "QuestionOptionId": "C",
                        "QuestionOptionText": "复杂题-小题Id1-3-选项C"
                      },
                      {
                        "QuestionOptionId": "D",
                        "QuestionOptionText": "复杂题-小题Id1-3-选项D"
                      }],
                    "StudentAnswers": ["C"]
                  },
                  {
                    "QuestionGroupId": "复杂题-小题Id1-4",
                    "QuestionGroupOptions": [
                      {
                        "QuestionOptionId": "A",
                        "QuestionOptionText": "复杂题-小题Id1-4-选项A"
                      },
                      {
                        "QuestionOptionId": "B",
                        "QuestionOptionText": "复杂题-小题Id1-4-选项B"
                      },
                      {
                        "QuestionOptionId": "C",
                        "QuestionOptionText": "复杂题-小题Id1-4-选项C"
                      },
                      {
                        "QuestionOptionId": "D",
                        "QuestionOptionText": "复杂题-小题Id1-4-选项D"
                      }],
                    "StudentAnswers": ["D"]
                  }]
              },
              {
                "QuestionId": "6",
                "QuestionIndex": 2,
                "QuestionDisplayTypeId": 3,
                "QuestionCategoryName": "复杂题",
                "QuestionCount": 1,
                "Score": 10,
                "QuestionPicture": questionPictures[3],
                "QuestionGroupsPicture": questionGroupsPictures[3],
                "QuestionComment": "",
                "TimeLength": "7200",
                "AllowTimeLength": "60",
                "QuestionGroups": [
                  {
                    "QuestionGroupId": "复杂题-小题Id2-1",
                    "QuestionGroupOptions": [
                      {
                        "QuestionOptionId": "A",
                        "QuestionOptionText": "复杂题-小题Id2-1-选项A"
                      },
                      {
                        "QuestionOptionId": "B",
                        "QuestionOptionText": "复杂题-小题Id2-1-选项B"
                      },
                      {
                        "QuestionOptionId": "C",
                        "QuestionOptionText": "复杂题-小题Id2-1-选项C"
                      },
                      {
                        "QuestionOptionId": "D",
                        "QuestionOptionText": "复杂题-小题Id2-1-选项D"
                      }],
                    "StudentAnswers": [""]
                  },
                  {
                    "QuestionGroupId": "复杂题-小题Id2-2",
                    "QuestionGroupOptions": [
                      {
                        "QuestionOptionId": "A",
                        "QuestionOptionText": "复杂题-小题Id2-2-选项A"
                      },
                      {
                        "QuestionOptionId": "B",
                        "QuestionOptionText": "复杂题-小题Id2-2-选项B"
                      },
                      {
                        "QuestionOptionId": "C",
                        "QuestionOptionText": "复杂题-小题Id2-2-选项C"
                      },
                      {
                        "QuestionOptionId": "D",
                        "QuestionOptionText": "复杂题-小题Id2-2-选项D"
                      }],
                    "StudentAnswers": []
                  },
                  {
                    "QuestionGroupId": "复杂题-小题Id2-3",
                    "QuestionGroupOptions": [
                      {
                        "QuestionOptionId": "A",
                        "QuestionOptionText": "复杂题-小题Id2-3-选项A"
                      },
                      {
                        "QuestionOptionId": "B",
                        "QuestionOptionText": "复杂题-小题Id2-3-选项B"
                      },
                      {
                        "QuestionOptionId": "C",
                        "QuestionOptionText": "复杂题-小题Id2-3-选项C"
                      },
                      {
                        "QuestionOptionId": "D",
                        "QuestionOptionText": "复杂题-小题Id2-3-选项D"
                      }],
                    "StudentAnswers": ["C"]
                  },
                  {
                    "QuestionGroupId": "复杂题-小题Id2-4",
                    "QuestionGroupOptions": [
                      {
                        "QuestionOptionId": "A",
                        "QuestionOptionText": "复杂题-小题Id2-4-选项A"
                      },
                      {
                        "QuestionOptionId": "B",
                        "QuestionOptionText": "复杂题-小题Id2-4-选项B"
                      },
                      {
                        "QuestionOptionId": "C",
                        "QuestionOptionText": "复杂题-小题Id2-4-选项C"
                      },
                      {
                        "QuestionOptionId": "D",
                        "QuestionOptionText": "复杂题-小题Id2-4-选项D"
                      }],
                    "StudentAnswers": ["D"]
                  }]
              }]
          },
          {
            "QuestionCategoryId": 4,
            "QuestionCategoryName": "完形填空",
            "QuestionCount": 2,
            "TotalScore": 20,
            "QuestionCategoryIndex": "四",
            "Questions": [
              {
                "QuestionId": "7",
                "QuestionIndex": 1,
                "QuestionDisplayTypeId": 4,
                "QuestionCategoryName": "完形填空",
                "QuestionCount": 1,
                "Score": 10,
                "QuestionPicture": questionPictures[4],
                "QuestionGroupsPicture": questionGroupsPictures[4],
                "QuestionComment": "",
                "TimeLength": "7200",
                "AllowTimeLength": "60",
                "QuestionGroups": [
                  {
                    "QuestionGroupId": "完形填空-小题Id1-1",
                    "QuestionGroupOptions": [
                      {
                        "QuestionOptionId": "A",
                        "QuestionOptionText": "完形填空-小题Id1-1-选项A"
                      },
                      {
                        "QuestionOptionId": "B",
                        "QuestionOptionText": "完形填空-小题Id1-1-选项B"
                      },
                      {
                        "QuestionOptionId": "C",
                        "QuestionOptionText": "完形填空-小题Id1-1-选项C"
                      },
                      {
                        "QuestionOptionId": "D",
                        "QuestionOptionText": "完形填空-小题Id1-1-选项D"
                      }],
                    "StudentAnswers": [""]
                  },
                  {
                    "QuestionGroupId": "完形填空-小题Id1-2",
                    "QuestionGroupOptions": [
                      {
                        "QuestionOptionId": "A",
                        "QuestionOptionText": "完形填空-小题Id1-2-选项A"
                      },
                      {
                        "QuestionOptionId": "B",
                        "QuestionOptionText": "完形填空-小题Id1-2-选项B"
                      },
                      {
                        "QuestionOptionId": "C",
                        "QuestionOptionText": "完形填空-小题Id1-2-选项C"
                      },
                      {
                        "QuestionOptionId": "D",
                        "QuestionOptionText": "完形填空-小题Id1-2-选项D"
                      }],
                    "StudentAnswers": []
                  },
                  {
                    "QuestionGroupId": "完形填空-小题Id1-3",
                    "QuestionGroupOptions": [
                      {
                        "QuestionOptionId": "A",
                        "QuestionOptionText": "完形填空-小题Id1-3-选项A"
                      },
                      {
                        "QuestionOptionId": "B",
                        "QuestionOptionText": "完形填空-小题Id1-3-选项B"
                      },
                      {
                        "QuestionOptionId": "C",
                        "QuestionOptionText": "完形填空-小题Id1-3-选项C"
                      },
                      {
                        "QuestionOptionId": "D",
                        "QuestionOptionText": "完形填空-小题Id1-3-选项D"
                      }],
                    "StudentAnswers": ["C"]
                  },
                  {
                    "QuestionGroupId": "完形填空-小题Id1-4",
                    "QuestionGroupOptions": [
                      {
                        "QuestionOptionId": "A",
                        "QuestionOptionText": "完形填空-小题Id1-4-选项A"
                      },
                      {
                        "QuestionOptionId": "B",
                        "QuestionOptionText": "完形填空-小题Id1-4-选项B"
                      },
                      {
                        "QuestionOptionId": "C",
                        "QuestionOptionText": "完形填空-小题Id1-4-选项C"
                      },
                      {
                        "QuestionOptionId": "D",
                        "QuestionOptionText": "完形填空-小题Id1-4-选项D"
                      }],
                    "StudentAnswers": ["D"]
                  }]
              },
              {
                "QuestionId": "8",
                "QuestionIndex": 2,
                "QuestionDisplayTypeId": 4,
                "QuestionCategoryName": "完形填空",
                "QuestionCount": 1,
                "Score": 10,
                "QuestionPicture": questionPictures[4],
                "QuestionGroupsPicture": questionGroupsPictures[4],
                "QuestionComment": "",
                "TimeLength": "7200",
                "AllowTimeLength": "60",
                "QuestionGroups": [
                  {
                    "QuestionGroupId": "完形填空-小题Id2-1",
                    "QuestionGroupOptions": [
                      {
                        "QuestionOptionId": "A",
                        "QuestionOptionText": "完形填空-小题Id2-1-选项A"
                      },
                      {
                        "QuestionOptionId": "B",
                        "QuestionOptionText": "完形填空-小题Id2-1-选项B"
                      },
                      {
                        "QuestionOptionId": "C",
                        "QuestionOptionText": "完形填空-小题Id2-1-选项C"
                      },
                      {
                        "QuestionOptionId": "D",
                        "QuestionOptionText": "完形填空-小题Id2-1-选项D"
                      }],
                    "StudentAnswers": [""]
                  },
                  {
                    "QuestionGroupId": "完形填空-小题Id2-2",
                    "QuestionGroupOptions": [
                      {
                        "QuestionOptionId": "A",
                        "QuestionOptionText": "完形填空-小题Id2-2-选项A"
                      },
                      {
                        "QuestionOptionId": "B",
                        "QuestionOptionText": "完形填空-小题Id2-2-选项B"
                      },
                      {
                        "QuestionOptionId": "C",
                        "QuestionOptionText": "完形填空-小题Id2-2-选项C"
                      },
                      {
                        "QuestionOptionId": "D",
                        "QuestionOptionText": "完形填空-小题Id2-2-选项D"
                      }],
                    "StudentAnswers": []
                  },
                  {
                    "QuestionGroupId": "完形填空-小题Id2-3",
                    "QuestionGroupOptions": [
                      {
                        "QuestionOptionId": "A",
                        "QuestionOptionText": "完形填空-小题Id2-3-选项A"
                      },
                      {
                        "QuestionOptionId": "B",
                        "QuestionOptionText": "完形填空-小题Id2-3-选项B"
                      },
                      {
                        "QuestionOptionId": "C",
                        "QuestionOptionText": "完形填空-小题Id2-3-选项C"
                      },
                      {
                        "QuestionOptionId": "D",
                        "QuestionOptionText": "完形填空-小题Id2-3-选项D"
                      }],
                    "StudentAnswers": ["C"]
                  },
                  {
                    "QuestionGroupId": "完形填空-小题Id2-4",
                    "QuestionGroupOptions": [
                      {
                        "QuestionOptionId": "A",
                        "QuestionOptionText": "完形填空-小题Id2-4-选项A"
                      },
                      {
                        "QuestionOptionId": "B",
                        "QuestionOptionText": "完形填空-小题Id2-4-选项B"
                      },
                      {
                        "QuestionOptionId": "C",
                        "QuestionOptionText": "完形填空-小题Id2-4-选项C"
                      },
                      {
                        "QuestionOptionId": "D",
                        "QuestionOptionText": "完形填空-小题Id2-4-选项D"
                      }],
                    "StudentAnswers": ["D"]
                  }]
              }]
          },
          {
            "QuestionCategoryId": 9,
            "QuestionCategoryName": "判断题",
            "QuestionCount": 2,
            "TotalScore": 20,
            "QuestionCategoryIndex": "五",
            "Questions": [
              {
                "QuestionId": "9",
                "QuestionIndex": 1,
                "QuestionDisplayTypeId": 9,
                "QuestionCategoryName": "判断题",
                "QuestionCount": 1,
                "Score": 10,
                "QuestionPicture": questionPictures[9],
                "QuestionGroupsPicture": questionGroupsPictures[9],
                "QuestionComment": "",
                "TimeLength": "7200",
                "AllowTimeLength": "60",
                "QuestionGroups": [{
                  "QuestionGroupId": "判断题-小题Id1",
                  "QuestionGroupOptions": [{
                    "QuestionOptionId": "A",
                    "QuestionOptionText": "对"
                  }, {
                    "QuestionOptionId": "B",
                    "QuestionOptionText": "错"
                  }],
                  "StudentAnswers": ["A"]
                }]
              },
              {
                "QuestionId": "10",
                "QuestionIndex": 2,
                "QuestionDisplayTypeId": 9,
                "QuestionCategoryName": "判断题",
                "QuestionCount": 1,
                "Score": 10,
                "QuestionPicture": questionPictures[9],
                "QuestionGroupsPicture": questionGroupsPictures[9],
                "QuestionComment": "",
                "TimeLength": "7200",
                "AllowTimeLength": "60",
                "QuestionGroups": [{
                  "QuestionGroupId": "判断题-小题Id2",
                  "QuestionGroupOptions": [{
                    "QuestionOptionId": "A",
                    "QuestionOptionText": "对"
                  }, {
                    "QuestionOptionId": "B",
                    "QuestionOptionText": "错"
                  }],
                  "StudentAnswers": ["A"]
                }]
              }
            ]
          },
          {
            "QuestionCategoryId": 10,
            "QuestionCategoryName": "七选五",
            "QuestionCount": 2,
            "TotalScore": 20,
            "QuestionCategoryIndex": "六",
            "Questions": [
              {
                "QuestionId": "11",
                "QuestionIndex": 1,
                "QuestionDisplayTypeId": 10,
                "QuestionCategoryName": "七选五",
                "QuestionCount": 1,
                "Score": 10,
                "QuestionPicture": questionPictures[10],
                "QuestionGroupsPicture": questionGroupsPictures[10],
                "QuestionComment": "",
                "TimeLength": "7200",
                "AllowTimeLength": "60",
                "QuestionGroups": [{
                  "QuestionGroupId": "七选五-小题Id1",
                  "QuestionGroupOptions": [{
                    "QuestionOptionId": "A",
                    "QuestionOptionText": "七选五-小题Id1-选项A"
                  }, {
                    "QuestionOptionId": "B",
                    "QuestionOptionText": "七选五-小题Id1-选项B"
                  }, {
                    "QuestionOptionId": "C",
                    "QuestionOptionText": "七选五-小题Id1-选项C"
                  }, {
                    "QuestionOptionId": "D",
                    "QuestionOptionText": "七选五-小题Id1-选项D"
                  }, {
                    "QuestionOptionId": "E",
                    "QuestionOptionText": "七选五-小题Id1-选项E"
                  }, {
                    "QuestionOptionId": "F",
                    "QuestionOptionText": "七选五-小题Id1-选项F"
                  }, {
                    "QuestionOptionId": "G",
                    "QuestionOptionText": "七选五-小题Id1-选项G"
                  }],
                  "StudentAnswers": ["D", "", "C", "", "A"]
                }]
              },
              {
                "QuestionId": "12",
                "QuestionIndex": 2,
                "QuestionDisplayTypeId": 10,
                "QuestionCategoryName": "七选五",
                "QuestionCount": 1,
                "Score": 10,
                "QuestionPicture": questionPictures[10],
                "QuestionGroupsPicture": questionGroupsPictures[10],
                "QuestionComment": "",
                "TimeLength": "7200",
                "AllowTimeLength": "60",
                "QuestionGroups": [{
                  "QuestionGroupId": "七选五-小题Id2",
                  "QuestionGroupOptions": [{
                    "QuestionOptionId": "A",
                    "QuestionOptionText": "七选五-小题Id2-选项A"
                  }, {
                    "QuestionOptionId": "B",
                    "QuestionOptionText": "七选五-小题Id2-选项B"
                  }, {
                    "QuestionOptionId": "C",
                    "QuestionOptionText": "七选五-小题Id2-选项C"
                  }, {
                    "QuestionOptionId": "D",
                    "QuestionOptionText": "七选五-小题Id2-选项D"
                  }, {
                    "QuestionOptionId": "E",
                    "QuestionOptionText": "七选五-小题Id2-选项E"
                  }, {
                    "QuestionOptionId": "F",
                    "QuestionOptionText": "七选五-小题Id2-选项F"
                  }, {
                    "QuestionOptionId": "G",
                    "QuestionOptionText": "七选五-小题Id2-选项G"
                  }],
                  "StudentAnswers": ["D", "", "C", "", "A"]
                }]
              }]
          },
          {
            "QuestionCategoryId": 22,
            "QuestionCategoryName": "画图题",
            "QuestionCount": 1,
            "TotalScore": 10,
            "QuestionCategoryIndex": "七",
            "Questions": [
              {
                "QuestionId": "22",
                "QuestionIndex": 1,
                "QuestionDisplayTypeId": 22,
                "QuestionCategoryName": "画图题",
                "QuestionCount": 1,
                "Score": 10,
                "QuestionPicture": questionPictures[22],
                "QuestionGroupsPicture": "",
                "QuestionComment": "请根据所给立体图补齐三视图中的三处线条缺漏，每处2分，共6分。补画超过三处，每处倒扣2分，直至本题0分。",
                "TimeLength": "7200",
                "AllowTimeLength": "120",
                "QuestionGroups": []
              }
            ]
          },
          {
            "QuestionCategoryId": 24,
            "QuestionCategoryName": "Word 操作题",
            "QuestionCount": 1,
            "TotalScore": 10,
            "QuestionCategoryIndex": "八",
            "Questions": [
              {
                "QuestionId": "24",
                "QuestionIndex": 1,
                "QuestionDisplayTypeId": 24,
                "QuestionCategoryName": "Word 操作题",
                "QuestionCount": 1,
                "Score": 10,
                "QuestionPicture": questionPictures[24],
                "QuestionGroupsPicture": "",
                "QuestionComment": "请根据所给立体图补齐三视图中的三处线条缺漏，每处2分，共6分。补画超过三处，每处倒扣2分，直至本题0分。",
                "TimeLength": "7200",
                "AllowTimeLength": "120",
                "QuestionGroups": []
              }
            ]
          },
          {
            "QuestionCategoryId": 25,
            "QuestionCategoryName": "Excel 操作题",
            "QuestionCount": 1,
            "TotalScore": 10,
            "QuestionCategoryIndex": "九",
            "Questions": [
              {
                "QuestionId": "25",
                "QuestionIndex": 1,
                "QuestionDisplayTypeId": 25,
                "QuestionCategoryName": "Excel 操作题",
                "QuestionCount": 1,
                "Score": 10,
                "QuestionPicture": questionPictures[25],
                "QuestionGroupsPicture": "",
                "QuestionComment": "请根据所给立体图补齐三视图中的三处线条缺漏，每处2分，共6分。补画超过三处，每处倒扣2分，直至本题0分。",
                "TimeLength": "7200",
                "AllowTimeLength": "120",
                "QuestionGroups": []
              }
            ]
          },
          {
            "QuestionCategoryId": 26,
            "QuestionCategoryName": "Windows 操作题",
            "QuestionCount": 1,
            "TotalScore": 10,
            "QuestionCategoryIndex": "十",
            "Questions": [
              {
                "QuestionId": "26",
                "QuestionIndex": 1,
                "QuestionDisplayTypeId": 26,
                "QuestionCategoryName": "Windows 操作题",
                "QuestionCount": 1,
                "Score": 10,
                "QuestionPicture": questionPictures[26],
                "QuestionGroupsPicture": "",
                "QuestionComment": "请根据所给立体图补齐三视图中的三处线条缺漏，每处2分，共6分。补画超过三处，每处倒扣2分，直至本题0分。",
                "TimeLength": "7200",
                "AllowTimeLength": "120",
                "QuestionGroups": []
              }
            ]
          },
          {
            "QuestionCategoryId": 23,
            "QuestionCategoryName": "写作题",
            "QuestionCount": 1,
            "TotalScore": 40,
            "QuestionCategoryIndex": "十一",
            "Questions": [
              {
                "QuestionId": "23",
                "QuestionIndex": 1,
                "QuestionDisplayTypeId": 23,
                "QuestionCategoryName": "写作题",
                "QuestionCount": 1,
                "Score": 40,
                "QuestionPicture": questionPictures[23],
                "QuestionGroupsPicture": questionGroupsPictures[23],
                "QuestionComment": "",
                "TimeLength": "7200",
                "AllowTimeLength": "120",
                "QuestionGroups": []
              }
            ]
          }
        ]
      }
    });
  },
};

module.exports = question;
