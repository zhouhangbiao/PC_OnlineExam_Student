import React from "React";
import {Col, Row} from "antd";
import classnames from "classnames";
import styles from './QuestionStyles.less';

/**
 * 单选题 QuestionDisplayType_1
 */
class SingleSection extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    const { question } = this.props;

    let result = question.QuestionGroups[0].IsQuestionGroupCorrect;
    let resultWrapStyle, resultText, stuAnswerStyle;

    if (result === 1) {
      resultWrapStyle = classnames(styles.resultWrap, styles.cor);
      resultText = '正确';
      stuAnswerStyle = classnames(styles.stuAnswer, styles.cor);
    } else {
      resultWrapStyle = styles.resultWrap;
      resultText = '错误';
      stuAnswerStyle = styles.stuAnswer;
    }

    return (
      <Col className={styles.questionsInfo} span={24}>
        <Row type="flex">
          <Col className={styles.infoHeader} span={24}>
            答案与解析
          </Col>
          <Col className={classnames(styles.questionsCont, styles.analysis)} span={24}>
            <div className={resultWrapStyle}>{resultText}</div>
            <div className={styles.answerWrap}>
              你的答案：
              <span className={stuAnswerStyle}>{question.QuestionGroups[0].StudentAnswers[0] || '*'}</span>
              正确答案：
              <span className={styles.corAnswer}>{question.QuestionGroups[0].StandardAnswers[0]}</span>
            </div>
            <div className={styles.analysisDesc}>试题解析：</div>
            <div dangerouslySetInnerHTML={
              {
                __html: question.QuestionAnalysis
              }
            }/>
          </Col>
        </Row>
      </Col>
    );
  }
}

export default SingleSection;
