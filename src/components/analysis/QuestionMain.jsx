import React from "React";
import {Col, Row, Button, Modal} from "antd";
import AnswerQuestionSheetCard from "../answer/QuestionSheetCard.jsx";
import QuestionDisplayType_1 from './question/QuestionDisplayType_1.jsx';
import QuestionDisplayType_2 from './question/QuestionDisplayType_2.jsx';
import QuestionDisplayType_3 from './question/QuestionDisplayType_3.jsx';
import QuestionDisplayType_4 from './question/QuestionDisplayType_4.jsx';
import QuestionDisplayType_9 from './question/QuestionDisplayType_9.jsx';
import QuestionDisplayType_10 from './question/QuestionDisplayType_10.jsx';
import QuestionDisplayType_22 from './question/QuestionDisplayType_22.jsx';
import QuestionDisplayType_23 from './question/QuestionDisplayType_23.jsx';
import Operation from './question/Operation.jsx';
import styles from './Analysis.less'

/**
 * 试卷解析-右侧题目信息区
 */
class AnswerQuestion extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      answerCardVisible: false,
      currentAnswer: undefined,
      questionOverflow: false
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
   * 处理回到首页
   */
  handleBackToIndex = () => {
    window.location.href = '/onlineExamStudent/index.html';
  };

  /**
   * 显示答题卡
   */
  handleAnswerCard = () => {
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
   * 处理超出页面布局
   */
  handleOverFlowLayout = () => {
    this.setState({
      questionOverflow: true
    });
    this.props.handleOverflow && this.props.handleOverflow();
  };

  /**
   * 取消超出页面布局
   */
  cancelOverFlowLayout = () => {
    this.setState({
      questionOverflow: false
    });
    this.props.cancelOverflow && this.props.cancelOverflow();
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
   * 处理切换题目
   * @param questionId
   */
  handleChangeQuestion = (questionId) => {
    this.props.changeQuestion && this.props.changeQuestion(questionId).then(() => {
      this.setState({
        answerCardVisible: false
      });
    });
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
          return <QuestionDisplayType_1 question={this.props.questionInfo}/>;
          break;
        case 2:
          return <QuestionDisplayType_2 question={this.props.questionInfo}/>;
          break;
        case 3:
          return <QuestionDisplayType_3 question={this.props.questionInfo}/>;
          break;
        case 4:
          return <QuestionDisplayType_4 question={this.props.questionInfo}/>;
          break;
        case 9:
          return <QuestionDisplayType_9 question={this.props.questionInfo}/>;
          break;
        case 10:
          return <QuestionDisplayType_10 question={this.props.questionInfo}/>;
          break;
        case 22:
          return <QuestionDisplayType_22
            question={this.props.questionInfo}
            onDidMount={this.handleOverFlowLayout}
            onWillUnmount={this.cancelOverFlowLayout}/>;
          break;
        case 23:
          return <QuestionDisplayType_23 question={this.props.questionInfo}/>;
          break;
        case 24:
          return <Operation question={this.props.questionInfo}/>;
          break;
        case 25:
          return <Operation question={this.props.questionInfo}/>;
          break;
        case 26:
          return <Operation question={this.props.questionInfo}/>;
          break;
      }
    }
  };

  render() {
    const { questionInfo, answerCardInfo } = this.props;

    return (
      <Row className={styles.answer} type="flex" style={ this.state.questionOverflow ?
        {
          minHeight: '100%',
          height: 'auto',
          paddingBottom: '60px'
        } : {}}>
        <Modal title="答题卡"
               visible={this.state.answerCardVisible}
               onCancel={this.handleCancelAnswerCard}
               width={680}
               bodyStyle={{"padding": 0}}
               footer={null}
        >
          <AnswerQuestionSheetCard data={answerCardInfo}
                                   type="analysis"
                                   onClick={this.handleChangeQuestion}
          />
        </Modal>
        <Col className={styles.questionsHeader} span={24}>
          <Row type="flex">
            <Col span={12}>
              成绩：<span style={{ color: "#fd7700", paddingRight: "30px" }}>{answerCardInfo.ExamScore}</span>
              用时：<span style={{ color: "#fd3131" }}>{answerCardInfo.ExamSpend}</span>
            </Col>
            <Col className="text-r" span={12}>
              <a className="btn-default u-btn" onClick={this.handleAnswerCard}>答题卡</a>
              <a className="ant-btn-primary u-btn" onClick={this.handleBackToIndex}>返回首页</a>
            </Col>
          </Row>
        </Col>
        {this.switchQuestionType()}
        <Col className={styles.answerFooter} span={24} style={ this.state.questionOverflow ?
          {
            position: 'relative',
            bottom: '-10px'
          } : {}}>
          <Row>
            <Col className="float-l">
              <Button type="primary"
                      onClick={() => {
                        this.handleChangeQuestion(questionInfo.PreQuestionId)
                      }}
                      disabled={!(questionInfo.PreQuestionId && answerCardInfo.IsChangeSwitch === 1)}>上一题</Button>
            </Col>
            <Col className="float-r">
              <Button type="primary"
                      onClick={() => {
                        this.handleChangeQuestion(questionInfo.NextQuestionId)
                      }}
                      disabled={!questionInfo.NextQuestionId}>下一题</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default AnswerQuestion;
