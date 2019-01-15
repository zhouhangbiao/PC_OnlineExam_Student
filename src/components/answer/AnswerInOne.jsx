import React from "React";
import UrlHelper from "js-url-helper";
import {Col, Row, Icon, Button, Modal, Affix} from "antd";
import _ from 'lodash';
import classnames from "classnames";
import Header from "../../components/layout/Header.jsx";
import Footer from "../../components/layout/Footer.jsx";
import AnswerQuestionSheetCard from "./QuestionSheetCard.jsx";
import CountDown from '../CountDown.jsx';
import QuestionDisplayType_1 from './question/inOne/QuestionDisplayType_1.jsx';
import QuestionDisplayType_2 from './question/inOne/QuestionDisplayType_2.jsx';
import QuestionDisplayType_3 from './question/inOne/QuestionDisplayType_3.jsx';
import QuestionDisplayType_4 from './question/inOne/QuestionDisplayType_4.jsx';
import QuestionDisplayType_9 from './question/inOne/QuestionDisplayType_9.jsx';
import QuestionDisplayType_10 from './question/inOne/QuestionDisplayType_10.jsx';
import QuestionDisplayType_22 from './question/inOne/QuestionDisplayType_22.jsx';
import QuestionDisplayType_23 from './question/inOne/QuestionDisplayType_23.jsx';
import Operation from './question/inOne/Operation.jsx';
import style from "./AnswerInOne.less";
import * as answerService from "../../services/answerServices";
import * as questionServices from "../../services/questionServices";

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
 * 整卷模式作答
 */
class AnswerInOne extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      answerCardVisible: false,
      answerCardInfo: {},
      questionInfo: {},
      prevQuestionId: null,
      nextQuestionId: null,
      questionTypes: undefined,
      currentAnswers: undefined,
      affixed: false,
      color: "#000000",
      showRightStickyWrap: true,
      saveTime: "",
      totalScore: "",
      totalQuestions: "",
    };
  }

  saveLoading = false;

  componentDidMount() {
    let loading = layer.msg('获取题目中', {
      icon: 16,
      shade: 0.3,
      time: 0
    });

    this.getAnswerCardInfo().then(this.getQuestionInOneInfo).then(() => {
      this.getCurrentAnswer();
      this.initExamQuestionsInfo();
      layer.close(loading);
    });
  }

  /**
   * 初始化试卷题目：总题数、总分
   */
  initExamQuestionsInfo = () => {
    let score = 0, count = 0;

    this.state.questionTypes.map(function (item) {
      item.Questions.map(function (question) {
        score += question.Score;
        count++;
      });
    });

    this.setState({
      totalScore: score,
      totalQuestions: count
    });
  };

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
      this.getAnswerCardInfo().then(() => {
        this.checkAnswerStatus().then(confirmHandInExam, confirmUnfinishedAllQuestion);
      });
    });
  };

  /**
   * 处理切换题目（改变滚动条位置，定位题目）
   * @param questionId
   */
  handleChangeQuestion = (questionId) => {
    let anchor = document.createElement('a');

    anchor.href = `#${questionId}`;
    $("body").append(anchor);
    anchor.click();
    $(anchor).remove();

    this.setState({
      answerCardVisible: false
    });
  };

  /**
   * 考试完成
   */
  onExamComplete = () => {
    this.saveAnswerInfo().then(() => {
      this.handInExam('已到考试时间！正在自动交卷');
    });
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
   * 当固钉状态改变
   * @param affixed
   */
  onAffixChange = (affixed) => {
    if (affixed) {
      this.setState({
        affixed: true
      });
    } else {
      this.setState({
        affixed: false
      });
    }
  };

  /**
   * 交卷
   */
  handInExam = (message) => {
    this.handInLoading = layer.msg(message, {
      icon: 16,
      shade: 0.3,
      time: 0
    });

    answerService.HandInExamPaper({
      payload: {
        "ExamSceneId": query.examSceneId,
        "CourseId": query.courseId,
        "ExamPaperId": query.examPaperId,
      }
    }).then((res) => {
      layer.close(this.handInLoading);

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
            title: '提示',
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
      that.state.answerCardInfo.QuestionTypes.forEach((item) => {
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
   * 获取答题卡信息
   */
  getAnswerCardInfo = () => {
    return new Promise((resolve, reject) => {
      answerService.GetAnswerCardInfo({
        payload: {
          "ExamSceneId": query.examSceneId,
          "CourseId": query.courseId,
          "ExamPaperId": query.examPaperId,
        }
      }).then(result => {
        if (result.ResultType === 1) {
          this.setState({
            answerCardInfo: result.ReturnEntity
          }, resolve);
        } else {
          reject();
        }
      });
    });
  };

  /**
   * 获取整卷题目信息
   */
  getQuestionInOneInfo = () => {
    return new Promise((resolve, reject) => {
      questionServices.GetWholeExamPaperQuestions({
        payload: {
          "ExamSceneId": query.examSceneId,
          "CourseId": query.courseId,
          "ExamPaperId": query.examPaperId,
        }
      }).then(result => {
        if (result.ResultType === 1) {
          this.setState({
            questionInfo: result.ReturnEntity,
            questionTypes: result.ReturnEntity.QuestionTypes,
            saveTime: result.ReturnEntity.LastSaveTimePoint ? result.ReturnEntity.LastSaveTimePoint : '无' ,
          }, resolve);
        } else {
          reject();
        }
      });
    });
  };

  /**
   * 获取用户作答信息
   */
  getCurrentAnswer = () => {
    let currentAnswers = [];

    this.state.questionTypes.map(item => {
      item.Questions.map(answer => {
        let QuestionAnswers = [];

        answer.QuestionGroups.map(groupAnswer => {
          QuestionAnswers.push({
            QuestionGroupId: groupAnswer.QuestionGroupId,
            StudentAnswer: groupAnswer.StudentAnswers,
          })
        });

        currentAnswers.push({
          QuestionId: answer.QuestionId,
          QuestionDisplayTypeId: answer.QuestionDisplayTypeId,
          QuestionAnswers: QuestionAnswers,
        });
      });
    });

    this.setState({ currentAnswers: currentAnswers });
  };

  /**
   * 设置用户作答信息
   * @param questionId
   * @param answer
   */
  setCurrentAnswer = (questionId, answer) => {
    const { currentAnswers } = this.state;
    const newAnswers = _.cloneDeep(currentAnswers);
    let index = _.findIndex(currentAnswers, (item) => {
      return item.QuestionId === questionId;
    });

    if (index >= 0) {
      newAnswers[index].QuestionAnswers = answer;
      this.setState({ currentAnswers: newAnswers });
    }
  };

  /**
   * 保存作答信息
   */
  saveAnswerInfo = () => {
    const { currentAnswers } = this.state;
    let sendAnswer = _.cloneDeep(currentAnswers);

    if (this.saveLoading)
      return;

    this.saveLoading = true;

    _.remove(sendAnswer, item =>{
      return item.QuestionDisplayTypeId === 22 || item.QuestionDisplayTypeId === 24 || item.QuestionDisplayTypeId === 25 || item.QuestionDisplayTypeId === 26;
    });

    sendAnswer = sendAnswer.map(item => {
      return {
        QuestionId: item.QuestionId,
        QuestionAnswers: item.QuestionAnswers,
      }
    });

    return new Promise((resolve, reject) => {
      let saveTime = this.refs.CountDown.getCountDownTime();

      answerService.SaveStudentWholeExam({
        payload: {
          "ExamSceneId": query.examSceneId,
          "CourseId": query.courseId,
          "Answers": sendAnswer,
          "LastSaveTimePoint": saveTime,
          "ExamPaperId": query.examPaperId,
        }
      }).then(result => {
        this.saveLoading = false;
        if (result.ReturnEntity === 1) {
          this.setState({
            saveTime: saveTime
          });
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
          reject();
        }
      });
    });
  };

  /**
   * 处理悬浮提示
   */
  handleSwitchSticky = () => {
    const {showRightStickyWrap} = this.state;
    if (showRightStickyWrap) {
      this.setState({ showRightStickyWrap: false });
    } else {
      this.setState({ showRightStickyWrap: true });
    }
  };

  /**
   * 处理保存作答信息
   */
  handleSaveAnswerInfo = () => {
    layer.msg('保存中', {
      icon: 16,
      shade: 0.3,
      time: 0
    });

    this.saveAnswerInfo().then(() => {
      layer.msg('保存成功', {icon: 1, time: 1000});
      this.getAnswerCardInfo();
    });
  };

  /**
   * 渲染整卷题目
   * @return {XML}
   */
  renderQuestions = () => {
    const { questionTypes } = this.state;

    if (questionTypes) {
      return questionTypes.map(item => {
        return (
          <div className={style.questionTypeWrap}>
            <div className={style.questionTypeDesc}>{`${item.QuestionCategoryIndex}、${item.QuestionCategoryName}（共${item.QuestionCount}题，合计${item.TotalScore}分）`}</div>
            {this.switchQuestionType(item.Questions)}
          </div>
        )
      });
    }
  };

  /**
   * 匹配题目类型
   * @param questions
   * @return {XML}
   */
  switchQuestionType = (questions) => {
    const { currentAnswers } = this.state;

    if (questions) {
      return questions.map(item => {
        switch (item.QuestionDisplayTypeId) {
          case 1:
            return <QuestionDisplayType_1
              question={item}
              currentAnswers={currentAnswers}
              setCurrentAnswer={this.setCurrentAnswer}/>;
            break;
          case 2:
            return <QuestionDisplayType_2
              question={item}
              currentAnswers={currentAnswers}
              setCurrentAnswer={this.setCurrentAnswer}/>;
            break;
          case 3:
            return <QuestionDisplayType_3
              question={item}
              currentAnswers={currentAnswers}
              setCurrentAnswer={this.setCurrentAnswer}/>;
            break;
          case 4:
            return <QuestionDisplayType_4
              question={item}
              currentAnswers={currentAnswers}
              setCurrentAnswer={this.setCurrentAnswer}/>;
            break;
          case 9:
            return <QuestionDisplayType_9
              question={item}
              currentAnswers={currentAnswers}
              setCurrentAnswer={this.setCurrentAnswer}/>;
            break;
          case 10:
            return <QuestionDisplayType_10
              question={item}
              currentAnswers={currentAnswers}
              setCurrentAnswer={this.setCurrentAnswer}/>;
            break;
          case 22:
            return <QuestionDisplayType_22
              question={item}
              onSaveAnswer={this.getAnswerCardInfo}/>;
            break;
          case 23:
            return <QuestionDisplayType_23 question={item}/>;
            break;
          case 24:
            return <Operation question={item}/>;
            break;
          case 25:
            return <Operation question={item}/>;
            break;
          case 26:
            return <Operation question={item}/>;
            break;
        }
      });
    }
  };

  render(){
    const { showRightStickyWrap, saveTime } = this.state;

    return (
      <div>
        <Header noLogout={true} />
        <div className={style.contentWrap}>
          <Affix offsetTop={0}>
            <div className={style.answerTitleWrap}
                 style={{
                   backgroundColor: (this.state.affixed ? "#f5f6f7" : "#ffffff"),
                   boxShadow: (this.state.affixed ? "1px 4px 10px #dfdfdf" : "none")
                 }}>
              <Row type="flex">
                <Modal title="答题卡"
                       visible={this.state.answerCardVisible}
                       onCancel={this.handleCancelAnswerCard}
                       width={680}
                       bodyStyle={{"padding": 0}}
                       footer={null}>
                  <AnswerQuestionSheetCard data={this.state.answerCardInfo}
                                           type="answer"
                                           onClick={this.handleChangeQuestion}/>
                </Modal>
                <Col span={12}>
                  <span className={style.titleDesc}>{`共 ${this.state.totalQuestions} 题，合计 ${this.state.totalScore} 分`}</span>
                </Col>
                <Col className="text-r" span={12}>
                  <a className="btn-default u-btn" onClick={this.handleAnswerCard}>答题卡</a>
                  <a className="button-prompt u-btn" onClick={this.handleHandInExam}>交卷</a>
                </Col>
              </Row>
            </div>
          </Affix>
          <div className={style.stickyWrap}>
            <Affix offsetTop={50}
                   style={{
                     position: 'absolute',
                     marginTop: '10px',
                     zIndex: 1,
                     width: 280,
                     height: 170,
                     right: 0,
                   }}
                   onChange={this.onAffixChange}>
              <div className={showRightStickyWrap ? style.rightStickyWrap : classnames(style.rightStickyWrap, style.hide)}>
                <div className={style.stickySwitchBtn} onClick={this.handleSwitchSticky}>
                  <Icon type={showRightStickyWrap ? "double-right" : "double-left"} theme="outlined"/>
                </div>
                <div className={showRightStickyWrap ? '' : style.hideDescWrap}>
                  <div className={style.leftTimeWrap}>
                    剩余时间：
                    <span className={style.leftTime}>
                      {
                        this.state.answerCardInfo.TimeLength !== undefined ?
                          <CountDown count={parseInt(this.state.answerCardInfo.TimeLength)}
                                     onComplete={this.onExamComplete}
                                     bound={parseInt(this.state.answerCardInfo.RemindTimeLength)}
                                     onBound={this.onExamBound}
                                     color={this.state.color}
                                     ref="CountDown"/> : null
                      }
                    </span>
                  </div>
                  <div className={style.firstLineDesc}>提示：答题过程中，请及时保存答案</div>
                  <div className={style.secondLineDesc}>上次保存（剩余时间点）：{saveTime}</div>
                  <Button type="primary" onClick={this.handleSaveAnswerInfo}>保存</Button>
                </div>
              </div>
            </Affix>
          </div>
          <div className={style.answerContentWrap}>
            {this.renderQuestions()}
          </div>
          <div className={style.bottomWrap}>
            <div className={style.dashLine} />
            <div className={style.desc}>试卷结尾标记</div>
          </div>
        </div>
        <Footer fixed={false}/>
      </div>
    );
  }
}

export default AnswerInOne;
