import React from "React";
import UrlHelper from "js-url-helper";
import {Col, Row, Button, Modal} from "antd";
import CountDown from '../CountDown.jsx';
import QuestionSheetCard from "./QuestionSheetCard.jsx";
import QuestionDisplayType_1 from './question/QuestionDisplayType_1.jsx';
import QuestionDisplayType_2 from './question/QuestionDisplayType_2.jsx';
import QuestionDisplayType_3 from './question/QuestionDisplayType_3.jsx';
import QuestionDisplayType_4 from './question/QuestionDisplayType_4.jsx';
import QuestionDisplayType_9 from './question/QuestionDisplayType_9.jsx';
import QuestionDisplayType_10 from './question/QuestionDisplayType_10.jsx';
import QuestionDisplayType_22 from './question/QuestionDisplayType_22.jsx';
import QuestionDisplayType_23 from './question/QuestionDisplayType_23.jsx';
import Operation from './question/Operation.jsx';
import styles from './Answer.less'
import * as service from "../../services/answerServices";

const urlHelper = new UrlHelper(location);
const query = urlHelper.getSearchParam();
const saveErrMsg = {
  0: "提交失败",
  2: "考试已关闭",
  3: "已被监考老师强制交卷",
  4: "监考老师已设置重考，请重新考试",
};
const handInErrMsg = {
  0: "提交失败",
  2: "考试已关闭",
  3: "已被监考老师强制交卷",
  4: "监考老师已设置重考，请重新考试",
};

/**
 * 单题模式作答-右侧题目作答区
 */
class AnswerQuestion extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      answerCardVisible: false,
      currentAnswer: undefined,
      color: "#000000",
      preSaving: false,
      nextSaving: false,
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.questionInfo.QuestionId !== prevProps.questionInfo.QuestionId) {
      const { questionInfo } = this.props;
      switch(questionInfo.QuestionDisplayTypeId) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 9:
        case 10:
        case 22:
        case 23:
        case 24:
        case 25:
        case 26:
          this.setState({
            currentAnswer: questionInfo.QuestionGroups.map(item => {
              return {
                QuestionGroupId: item.QuestionGroupId,
                StudentAnswer: item.StudentAnswers,
              }
            })
          });
          break;
      }
    }
  }

  /**
   * 显示答题卡
   */
  handleAnswerCard = () => {
    layer.closeAll();
    this.setState({
      answerCardVisible: true
    });
  };

  /**
   * 隐藏答题卡
   */
  handleCancelAnswerCard = () => {
    this.setState({
      answerCardVisible: false
    });
  };

  /**
   * 确认交卷（refs 使用）
   */
  confirmHandInExam = () => {
    layer.confirm('你已完成全部答题，请确认是否交卷？', {
      title: '交卷提示',
      btn: ['确定','取消']
    }, () => {
      this.confirmAgainHandInExam();
    });
  };

  /**
   * 再次确认交卷
   */
  confirmAgainHandInExam = () => {
    layer.confirm('请再次确认是否继续交卷？交卷后将会直接结束本场考试', {
      title: '交卷提示',
      btn: ['确定','取消']
    }, () => {
      this.handInExam('交卷中');
    });
  };

  /**
   * 处理交卷
   */
  handleHandInExam = () => {
    const that = this;

    /**
     * 确认交卷
     */
    function confirmHandInExam() {
      layer.confirm('你已完成全部答题，请确认是否交卷？', {
        title: '交卷提示',
        btn: ['确定','取消']
      }, confirmAgainHandInExam);
    }

    /**
     * 再次确认交卷
     */
    function confirmAgainHandInExam() {
      layer.confirm('请再次确认是否继续交卷？交卷后将会直接结束本场考试', {
        title: '交卷提示',
        btn: ['确定','取消']
      }, function(){
        that.handInExam('交卷中');
      });
    }

    /**
     * 确认未完成所有题目
     * @param {Object} count
     */
    function confirmUnfinishedAllQuestion(count) {
      layer.confirm(`<p>请确认试题已经全部做完，且操作题已成功保存！</p>
                         <p>你还有 <span class="font-red">“${count.question}”</span> 道大题和 <span class="font-red">“${count.questionGroup}”</span> 道小题未完成，请查看答题卡确认；</p>
                         <p>请确认是否继续交卷？</p>`, {
        title: '交卷提示',
        btn: ['查看答题卡', '确定','取消']
      }, that.handleAnswerCard, confirmAgainHandInExam);
    }

    this.saveAnswerInfo().then(() => {
      this.props.getAnswerCardInfo && this.props.getAnswerCardInfo().then(() => {
        this.checkAnswerStatus().then(confirmHandInExam, confirmUnfinishedAllQuestion);
      });
    });
  };

  /**
   * 考试完成
   */
  onExamComplete = () => {
    this.saveAnswerInfo().then(() => {this.handInExam('已到考试时间！正在自动交卷')});
  };

  /**
   * 考试即将完成
   */
  onExamBound = (count) => {
    /**
     * 格式化时间
     */
    function secondToTime(seconds) {
      let h = Math.floor(seconds / 3600) < 10 ? '0' + Math.floor(seconds / 3600) : Math.floor(seconds / 3600);
      let m = Math.floor((seconds / 60 % 60)) < 10 ? '0' + Math.floor((seconds / 60 % 60)) : Math.floor((seconds / 60 % 60));
      let s = Math.floor((seconds % 60)) < 10 ? '0' + Math.floor((seconds % 60)) : Math.floor((seconds % 60));

      if (h !== "00") {
        return h + "小时" + m + "分" + s + '秒';
      } else if (m !== 0) {
        return m + "分" + s + '秒';
      } else {
        return s + '秒';
      }
    }

    layer.msg(`考试还有 <span class="font-red">${secondToTime(count)}</span> 即将结束，请抓紧时间作答`);
    this.setState({
      color: "#ff0000"
    });
  };

  /**
   * 检查答题状态
   */
  checkAnswerStatus = () => {
    const that = this;
    let allAnswered = true;
    let unAnswerCount = {
      question: 0,
      questionGroup: 0
    };

    return new Promise((resolve, reject) => {
      that.props.answerCardInfo.QuestionTypes.forEach((item) => {
        item.Questions.forEach((item) => {
          if (item.QuestionAnswerStatus === 0) {
            allAnswered = false;
            unAnswerCount.question++;
          }
          item.QuestionGroups.forEach((item) => {
            if (item.QuestionGroupAnswerStatus === 0) {
              allAnswered = false;
              unAnswerCount.questionGroup++;
            }
          });
        })
      });

      if (allAnswered) {
        resolve();
      } else {
        reject(unAnswerCount);
      }
    });
  };

  /**
   * 交卷
   */
  handInExam = (message) => {
    let loading = layer.msg(message, {
      icon: 16,
      shade: 0.3,
      time: 0
    });

    service.HandInExamPaper({
      payload: {
        "ExamSceneId": query.examSceneId,
        "CourseId": query.courseId,
        "ExamPaperId": query.examPaperId,
      }
    }).then((res) => {
      layer.close(loading);

      if (res.ReturnEntity.HandResult === 1) {
        layer.msg('交卷成功', {icon: 1, time: 1000});
        setTimeout(() => {
          urlHelper.jump({
            path: '/onlineExamStudent/answer/result.html',
            search: urlHelper.setSearchParam({
              examSceneId: query.examSceneId,
              courseId: query.courseId,
              examPaperId: query.examPaperId,
            })
          });
        }, 1000);
      } else {
        if (res.ReturnEntity.HandResult === 4) {
          layer.confirm(handInErrMsg[res.ReturnEntity.HandResult], {
            title: '交卷提示',
            btn: ['确定']
          }, function(){
            window.location.href = '/onlineExamStudent/index.html';
          });
        } else {
          layer.msg(handInErrMsg[res.ReturnEntity.HandResult], {icon: 2, time: 2000});
          setTimeout(function () {
            urlHelper.jump({
              path: '/onlineExamStudent/answer/result.html',
              search: urlHelper.setSearchParam({
                examSceneId: query.examSceneId,
                courseId: query.courseId,
                examPaperId: query.examPaperId,
              })
            });
          }, 2000);
        }
      }
    });
  };

  /**
   * 保存操作题作答信息
   * @return {Promise}
   */
  saveClientAnswerInfo = () => {
    return new Promise((resolve) => {
      resolve();
    });
  };

  /**
   * 保存页面作答信息
   * @return {Promise}
   */
  savePageAnswerInfo = () => {
    let loading = layer.msg('保存中', {
      icon: 16,
      shade: 0.3,
      time: 0
    });

    return new Promise((resolve) => {
      service.SaveStudentAnswerInfo({
        payload: {
          "ExamSceneId": query.examSceneId,
          "CourseId": query.courseId,
          "QuestionId": this.props.questionInfo.QuestionId,
          "Answers": this.state.currentAnswer,
          "ExamPaperId": query.examPaperId,
        }
      }).then((result) => {
        setTimeout(() => {
          this.setState({
            preSaving: false,
            nextSaving: false,
          });
        }, 300);

        layer.close(loading);
        if (result.ReturnEntity === 1) {
          resolve();
        } else {
          if (result.ReturnEntity === 4) {
            layer.confirm(saveErrMsg[result.ReturnEntity], {
              title: '提示',
              btn: ['确定']
            }, function(){
              window.location.href = '/onlineExamStudent/index.html';
            });
          } else {
            layer.msg(saveErrMsg[result.ReturnEntity], {icon: 2, time: 2000});
            setTimeout(function () {
              urlHelper.jump({
                path: '/onlineExamStudent/answer/result.html',
                search: urlHelper.setSearchParam({
                  examSceneId: query.examSceneId,
                  courseId: query.courseId,
                  examPaperId: query.examPaperId,
                })
              });
            }, 2000);
          }
        }
      });
    });
  };

  /**
   * 保存作答信息
   * @return {Promise}
   */
  saveAnswerInfo = () => {
    const questionType = this.props.questionInfo.QuestionDisplayTypeId;

    return new Promise((resolve) => {
      if (questionType === 24 || questionType === 25 || questionType === 26) {
        setTimeout(() => {
          this.setState({
            preSaving: false,
            nextSaving: false,
          });
        }, 300);

        this.saveClientAnswerInfo().then(resolve);
      } else if (questionType === 22) {
        setTimeout(() => {
          this.setState({
            preSaving: false,
            nextSaving: false,
          });
        }, 300);

        resolve();
      } else {

        this.savePageAnswerInfo().then(resolve);
      }
    });
  };

  /**
   * 设置作答信息
   * @param answer
   */
  setCurrentAnswer = (answer) => {
    this.setState({
      currentAnswer: answer
    });
  };

  /**
   * 切题确认
   */
  changeQuestionConfirm = () => {
    const { answerCardInfo, questionInfo } = this.props;

    if (answerCardInfo.IsChangeSwitch === 1) {
      return Promise.resolve();
    } else {
      if (questionInfo.QuestionDisplayTypeId === 3 || questionInfo.QuestionDisplayTypeId === 4) {
        return new Promise((resolve) => {
          layer.confirm('请确认各小题均已作答，切题后无法回退。<br>确定切至下一题吗？', {
            title: '提示',
            btn: ['确定','取消']
          }, resolve);
        });
      } else {
        return Promise.resolve();
      }
    }
  };

  /**
   * 处理切换题目
   * @param questionId 要切换的题目Id
   */
  handleChangeQuestion = (questionId) => {
    this.saveAnswerInfo().then(() => {
      this.props.changeQuestion && this.props.changeQuestion(questionId).then(() => {
        this.setState({
          answerCardVisible: false
        });
      });
    });
  };

  /**
   * 处理加载效果
   * @param {String} flag
   */
  toggleSavingStatus = (flag) => {
    if (flag === 'pre') {
      this.setState({
        preSaving: true,
        nextSaving: false,
      });
    } else if (flag === 'next') {
      this.setState({
        preSaving: false,
        nextSaving: true,
      });
    }
  };

  /**
   * 匹配题目类型
   * @return {XML}
   */
  switchQuestionType = () => {
    const { questionInfo } = this.props;

    if (questionInfo) {
      switch (questionInfo.QuestionDisplayTypeId) {
        case 1:
          return <QuestionDisplayType_1
            question={this.props.questionInfo}
            currentAnswer={this.state.currentAnswer}
            setCurrentAnswer={this.setCurrentAnswer}/>;
          break;
        case 2:
          return <QuestionDisplayType_2
            question={this.props.questionInfo}
            currentAnswer={this.state.currentAnswer}
            setCurrentAnswer={this.setCurrentAnswer}/>;
          break;
        case 3:
          return <QuestionDisplayType_3
            question={this.props.questionInfo}
            currentAnswer={this.state.currentAnswer}
            setCurrentAnswer={this.setCurrentAnswer}
            saveAnswerInfo={this.saveAnswerInfo}
            updateAnswerCardInfo={this.props.updateAnswerCardInfo}/>;
          break;
        case 4:
          return <QuestionDisplayType_4
            question={this.props.questionInfo}
            currentAnswer={this.state.currentAnswer}
            setCurrentAnswer={this.setCurrentAnswer}
            saveAnswerInfo={this.saveAnswerInfo}
            updateAnswerCardInfo={this.props.updateAnswerCardInfo}/>;
          break;
        case 9:
          return <QuestionDisplayType_9
            question={this.props.questionInfo}
            currentAnswer={this.state.currentAnswer}
            setCurrentAnswer={this.setCurrentAnswer}/>;
          break;
        case 10:
          return <QuestionDisplayType_10
            question={this.props.questionInfo}
            currentAnswer={this.state.currentAnswer}
            setCurrentAnswer={this.setCurrentAnswer}
            saveAnswerInfo={this.saveAnswerInfo}
            updateAnswerCardInfo={this.props.updateAnswerCardInfo}/>;
          break;
        case 22:
          return <QuestionDisplayType_22
            question={this.props.questionInfo}
            saveAnswer={this.props.changeQuestion}/>;
          break;
        case 23:
          return <QuestionDisplayType_23 />;
          break;
        case 24:
          return <Operation />;
          break;
        case 25:
          return <Operation />;
          break;
        case 26:
          return <Operation />;
          break;
      }
    }
  };

  render() {
    const { questionInfo, answerCardInfo } = this.props;

    return (
      <Row className={styles.answer} type="flex">
        <Modal title="答题卡"
               visible={this.state.answerCardVisible}
               onCancel={this.handleCancelAnswerCard}
               width={680}
               bodyStyle={{"padding": 0}}
               footer={null}>
          <QuestionSheetCard data={answerCardInfo}
                                   type="answer"
                                   onClick={this.handleChangeQuestion}/>
        </Modal>
        <Col className={styles.questionsHeader} span={24}>
          <Row type="flex">
            <Col span={12}>
              剩余时间：
              {
                questionInfo.TimeLength !== undefined ?
                  <CountDown count={parseInt(answerCardInfo.TimeLength)}
                             onComplete={this.onExamComplete}
                             bound={parseInt(answerCardInfo.RemindTimeLength)}
                             onBound={this.onExamBound}
                             color={this.state.color}/> : null
              }
            </Col>
            <Col className="text-r" span={12}>
              <a className="btn-default u-btn" onClick={this.handleAnswerCard}>答题卡</a>
              <a className="button-prompt u-btn" onClick={this.handleHandInExam}>交卷</a>
            </Col>
          </Row>
        </Col>
        {this.switchQuestionType()}
        <Col className={styles.answerFooter} span={24}>
          <Row>
            <Col className="float-l">
              <Button type="primary"
                      onClick={() => {
                        this.toggleSavingStatus('pre');
                        this.handleChangeQuestion(questionInfo.PreQuestionId);
                      }}
                      disabled={!(questionInfo.PreQuestionId && answerCardInfo.IsChangeSwitch === 1)}
                      loading={this.state.preSaving}>上一题</Button>
            </Col>
            <Col className="float-r">
              <Button type="primary"
                      onClick={() => {
                        this.changeQuestionConfirm().then(() => {
                          this.toggleSavingStatus('next');
                          this.handleChangeQuestion(questionInfo.NextQuestionId);
                        });
                      }}
                      disabled={!questionInfo.NextQuestionId}
                      loading={this.state.nextSaving}>下一题</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default AnswerQuestion;
