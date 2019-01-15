import React from "React";
import {Col, Row} from "antd";
import classnames from "classnames";
import _ from 'lodash';
import styles from './QuestionStyles.less';

/**
 * 判断题 QuestionDisplayType_9
 */
class Judgement extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    const { question } = this.props;

    let result = question.QuestionGroups[0].IsQuestionGroupCorrect;
    let options = question.QuestionGroups[0].QuestionGroupOptions;
    let resultWrapStyle, resultText, stuAnswerStyle;
    let curResult = _.find(options, item => { return item.QuestionOptionId === question.QuestionGroups[0].StudentAnswers[0]});
    let corResult = _.find(options, item => { return item.QuestionOptionId === question.QuestionGroups[0].StandardAnswers[0]});

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
              <span className={stuAnswerStyle}>{(curResult && curResult.QuestionOptionText) || '*'}</span>
              正确答案：
              <span className={styles.corAnswer}>{corResult.QuestionOptionText}</span>
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

export default Judgement;
