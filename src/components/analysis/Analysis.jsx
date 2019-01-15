import React from "React";
import UrlHelper from "js-url-helper";
import {Col, Row} from "antd";
import Header from "../../components/layout/Header.jsx";
import Footer from "../../components/layout/Footer.jsx";
import QuestionStem from "./QuestionStem.jsx";
import QuestionMain from "./QuestionMain.jsx";
import * as answerService from "../../services/answerServices";
import * as questionServices from "../../services/questionServices";
import styles from "./Analysis.less";

const urlHelper = new UrlHelper(location);
const query = urlHelper.getSearchParam();

/**
 * 试卷解析
 */
class Analysis extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      data: [],
      answerCardInfo: {},
      questionInfo: {},
      currentQuestionId: null,
      prevQuestionId: null,
      nextQuestionId: null,
      questionOverflow: false
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
      answerService.GetAnalysisAnswerCardInfo({
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
              currentQuestionId: result.ReturnEntity.QuestionId
            }, resolve);
          }
        } else {
          reject();
        }
      });
    });
  };

  /**
   * 获取题目信息
   * @param {String} [questionId]
   */
  getQuestionInfo = (questionId) => {
    return new Promise((resolve, reject) => {
      questionServices.GetQuestionAnalysis({
        payload: {
          "ExamSceneId": query.examSceneId,
          "CourseId": query.courseId,
          "QuestionId": questionId || this.state.nextQuestionId || this.state.currentQuestionId,
          "ExamPaperId": query.examPaperId,
        }
      }).then(result => {
        if (result.ResultType === 1) {
          this.setState({
            questionInfo: result.ReturnEntity,
            prevQuestionId: result.ReturnEntity.PreQuestionId,
            nextQuestionId: result.ReturnEntity.NextQuestionId
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
    return this.getQuestionInfo(questionId);
  };

  /**
   * 处理超出页面布局
   */
  handleOverFlowLayout = () => {
    this.setState({
      questionOverflow: true
    });
  };

  /**
   * 取消超出页面布局
   */
  cancelOverFlowLayout = () => {
    this.setState({
      questionOverflow: false
    });
  };

  render(){
    return (
      <div>
        <Header noLogout={true} />
        <div className={styles.AnalysisQuestionsBox}>
          <Row className={styles.AnalysisBox} type="flex" justify="center" style={ this.state.questionOverflow ?
            {
              minHeight: '100%',
              height: 'auto'
            } : {}}>
            <Col className={styles.QuestionStem} span={12}>
              <QuestionStem
                questionInfo={this.state.questionInfo}
              />
            </Col>
            <Col className={styles.AnswerQuestion} span={12}>
              <QuestionMain
                questionInfo={this.state.questionInfo}
                answerCardInfo={this.state.answerCardInfo}
                changeQuestion={this.changeQuestion}
                getAnswerCardInfo={this.getAnswerCardInfo}
                handleOverflow={this.handleOverFlowLayout}
                cancelOverflow={this.cancelOverFlowLayout}
              />
            </Col>
          </Row>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Analysis;
