import React from "React";
import UrlHelper from "js-url-helper";
import {Col, Row, Button, Modal} from "antd";
import DrawPaper from './DrawPaper';
import * as questionService from '../../../services/questionServices';
import * as answerService from '../../../services/answerServices';
import styles from './QuestionStyles.less';

const urlHelper = new UrlHelper(location);
const query = urlHelper.getSearchParam();
let saveErrMsg = {
  0: "提交失败",
  2: "考试已关闭",
  3: "已被监考老师强制交卷",
  4: "监考老师已设置重考，请重新考试",
};
let loading, drawPaper;

/**
 * 显示加载
 * @param {String} msg
 */
function showLoading(msg) {
  loading = layer.msg(msg, {
    icon: 16,
    shade: 0.3,
    time: 0
  });
}

/**
 * 关闭加载
 */
function closeLoading() {
  layer.close(loading);
}


/**
 * 画图题 QuestionDisplayType_22
 */
class Draw extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      visible: false,
      questionInfo: {}
    };
  }

  /**
   * 处理开始答题
   */
  handleAnswer = () => {
    this.setState({
      visible: true
    }, this.getQuestionInfo);
  };

  /**
   * 处理点击取消
   */
  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  /**
   * 获取题目信息
   */
  getQuestionInfo = () => {
    showLoading('加载中');
    questionService.GetQuestion({
      payload: {
        "ExamSceneId": query.examSceneId,
        "CourseId": query.courseId,
        "QuestionId": this.props.question.QuestionId,
        "ExamPaperId": query.examPaperId,
      }
    }).then((data) => {
      closeLoading();
      this.setState({
        questionInfo: data.ReturnEntity
      }, this.initDrawPaper);
    });
  };

  /**
   * 初始化试卷绘图
   */
  initDrawPaper = () => {
    const that = this;

    drawPaper = new DrawPaper({
      tools: ['line', 'dash', 'circle'],
      wrapper: '#draw_root',
      resource: {
        desc: this.state.questionInfo.QuestionComment,
        data: this.state.questionInfo.QuestionPicture,
        answer: this.state.questionInfo.QuestionGroups[0].DrawAnswers
      },
      onClickFinish: function (answers) {
        that.saveAnswer(answers);
      }
    });

    drawPaper.init();
  };

  /**
   * 保存作答
   * @param {Object} answers
   */
  saveAnswer = (answers) => {
    showLoading('保存中');
    answerService.SaveStudentAnswerInfo({
      payload: {
        "ExamSceneId": query.examSceneId,
        "CourseId": query.courseId,
        "QuestionId": this.props.question.QuestionId,
        "ExamPaperId": query.examPaperId,
        "Answers": [
          {
            "QuestionGroupId": this.state.questionInfo.QuestionGroups[0].QuestionGroupId,
            "StudentAnswer": [],
            "DrawAnswers": answers.answerData
          }
        ]
      }
    }).then((data) => {
      closeLoading();
      if (data.ReturnEntity === 1) {
        layer.msg('保存成功', {icon: 1, time: 1000});
        this.props.saveAnswer && this.props.saveAnswer(this.state.questionInfo.QuestionId);
        setTimeout(() => {
          this.setState({
            visible: false
          });
        }, 1000);
      } else {
        if (data.ReturnEntity === 4) {
          layer.confirm(saveErrMsg[data.ReturnEntity], {
            title: '提示',
            btn: ['确定']
          }, function(){
            if (window.opener) {
              window.opener.location.href = urlHelper.link({
                path: '/onlineExamStudent/index.html'
              });
            }
          });
        } else {
          layer.msg(saveErrMsg[data.ReturnEntity], {icon: 2, time: 2000});
          setTimeout(() => {
            this.setState({
              visible: false
            });
          }, 2000);
        }
      }
    });
  };

  render(){
    const { visible } = this.state;

    return (
      <Col className={styles.questionsInfo} span={24}>
        <Row type="flex">
          <Col className={styles.infoHeader} span={24}>
            作答区
          </Col>
          <Col className={styles.questionsCont} span={24}>
            <Button type="primary" className={styles.operationDesc} onClick={this.handleAnswer}>点击此处开始答题</Button>
          </Col>
        </Row>
        <Modal
          visible={visible}
          title="画图题作答"
          onCancel={this.handleCancel}
          width={900}
          bodyStyle={{"padding": 10}}
          footer={null}
          destroyOnClose={true}
        >
          <div id="draw_root" style={{ height: '535px' }} />
        </Modal>
      </Col>
    );
  }
}

export default Draw;
