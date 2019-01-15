import React from "React";
import {Col, Row} from "antd";
import classnames from "classnames";
import styles from './QuestionStyles.less';

/**
 * 多选题 QuestionDisplayType_2
 */
class MultiSection extends React.Component {
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

    let stuAnswer = '';
    question.QuestionGroups[0].StudentAnswers.map(item => {
      stuAnswer += item;
    });

    let corAnswer = '';
    question.QuestionGroups[0].StandardAnswers.map(item => {
      corAnswer += item;
    });

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
              <span className={stuAnswerStyle}>{stuAnswer || '*'}</span>
              正确答案：
              <span className={styles.corAnswer}>{corAnswer}</span>
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

export default MultiSection;
