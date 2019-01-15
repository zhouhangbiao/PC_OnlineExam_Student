import React from "React";
import UrlHelper from "js-url-helper";
import {Col, Row} from "antd";
import Header from "../../components/layout/Header.jsx";
import Footer from "../../components/layout/Footer.jsx";
import QuestionStem from "./QuestionStem.jsx";
import QuestionMain from "./QuestionMain.jsx";
import styles from "./Answer.less";
import * as answerService from "../../services/answerServices";
import * as questionServices from "../../services/questionServices";

const urlHelper = new UrlHelper(location);
const query = urlHelper.getSearchParam();

/**
 * 单题模式作答
 */
class Answer extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      data: [],
      answerCardInfo: {},
      questionInfo: {},
    };
  }

  componentDidMount() {
    this.getAnswerCardInfo().then(this.getQuestionInfo);
  }

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
          if (result.ReturnEntity.QuestionId) {
            this.setState({
              answerCardInfo: result.ReturnEntity,
            }, () => {
              resolve(result.ReturnEntity.QuestionId);
            });
          } else {
            this.setState({
              answerCardInfo: result.ReturnEntity,
            }, () => {
              this.refs.QuestionMain.confirmHandInExam();
            });
          }
        } else {
          reject();
        }
      });
    });
  };

  /**
   * 更新答题卡信息（仅更新不切题，不提示）
   */
  updateAnswerCardInfo = () => {
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
            answerCardInfo: result.ReturnEntity,
          }, resolve);
        } else {
          reject();
        }
      });
    });
  };

  /**
   * 获取题目信息
   * @param {String} questionId
   */
  getQuestionInfo = (questionId) => {
    return new Promise((resolve, reject) => {
      questionServices.GetQuestion({
        payload: {
          "ExamSceneId": query.examSceneId,
          "CourseId": query.courseId,
          "QuestionId": questionId,
          "ExamPaperId": query.examPaperId,
        }
      }).then(result => {
        if (result.ResultType === 1) {
          this.setState({
            questionInfo: result.ReturnEntity,
          }, resolve);
        } else {
          reject();
        }
      });
    });
  };

  /**
   * 切换题目
   * @param {String} questionId
   */
  changeQuestion = (questionId) => {
    return this.getAnswerCardInfo().then(() => {
      this.getQuestionInfo(questionId);
    });
  };

  /**
   * 保存作答信息
   */
  saveAnswerInfo = () => {
    return this.refs.QuestionMain.saveAnswerInfo();
  };

  render(){
    return (
      <div>
        <Header noLogout={true} />
        <div className={styles.AnswerQuestionsBox}>
          <Row className={styles.AnswerBox} type="flex" justify="center">
            <Col className={styles.QuestionStem} span={12}>
              <QuestionStem
                questionInfo={this.state.questionInfo}
                changeQuestion={this.changeQuestion}
                saveAnswerInfo={this.saveAnswerInfo}
              />
            </Col>
            <Col className={styles.AnswerQuestion} span={12}>
              <QuestionMain
                questionInfo={this.state.questionInfo}
                answerCardInfo={this.state.answerCardInfo}
                changeQuestion={this.changeQuestion}
                getAnswerCardInfo={this.getAnswerCardInfo}
                updateAnswerCardInfo={this.updateAnswerCardInfo}
                ref="QuestionMain"
              />
            </Col>
          </Row>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Answer;
