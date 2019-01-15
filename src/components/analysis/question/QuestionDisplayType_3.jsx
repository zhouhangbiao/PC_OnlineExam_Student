import React from "React";
import {Col, Row} from "antd";
import styles from './QuestionStyles.less';
import classnames from "classnames";

/**
 * 阅读理解（复杂题）QuestionDisplayType_3
 */
class MultiGroupIncluedText extends React.Component {
  constructor(props){
    super(props);
  }

  /**
   * 切换原始/缩放大小
   */
  toggleOriginalSize = (event) => {
    if (event.target.className.indexOf('original-max-width') === -1) {
      event.target.className = 'original-max-width';
      event.target.title = '点击缩小';
    } else {
      event.target.className = '';
      event.target.title = '点击放大';
    }
  };

  render(){
    const { question } = this.props;

    const questionGroupBtn = () => {
      return question.QuestionGroups.map((item, index) => {
        let style = styles.questionGroupBtn;
        if (item.IsQuestionGroupCorrect === 1){
          style = classnames(style, styles.cor);
        } else {
          style = classnames(style, styles.error);
        }

        return (
          <span className={style}>{index + 1}</span>
        )
      });
    };

    const stuAnswer = () => {
      let wrap = [];
      return question.QuestionGroups.map((item, index) => {
        let result = '*',
            style = '';

        if (item.StudentAnswers[0]) {
          result = item.StudentAnswers[0];
        }

        if (item.StudentAnswers[0] !== item.StandardAnswers[0]) {
          style = styles.error;
        }

        if (result === '*') {
          style = classnames(style, styles.lineLetter);
        }

        wrap.push(
          <span className={style}>{result}</span>
        );

        if ((index + 1) % 5 === 0 || (index + 1) === question.QuestionGroups.length) {
          const content = (
            <div className={styles.multiAnswerContent}>
              {wrap}
            </div>
          );

          wrap = [];
          return content;
        }
      });
    };

    const corAnswer = () => {
      let wrap = [];
      return question.QuestionGroups.map((item, index) => {
        wrap.push(
          <span>{item.StandardAnswers[0]}</span>
        );

        if ((index + 1) % 5 === 0 || (index + 1) === question.QuestionGroups.length) {
          const content = (
            <div className={styles.multiAnswerContent}>
              {wrap}
            </div>
          );

          wrap = [];
          return content;
        }
      });
    };

    return (
      <Col className={classnames(styles.questionsInfo, styles.multiGroupInfo)} span={24}>
        <Row type="flex" className={styles.flexWrap}>
          {
            question.QuestionGroupsPicture !== '' ? (
              <Col className={styles.questionGroupDescWrap} span={24}>
                <img src={question.QuestionGroupsPicture} onClick={this.toggleOriginalSize} title="点击放大"/>
              </Col>
            ) : ''
          }
          <Col className={styles.questionGroupBtnWrap} span={24}>
            {questionGroupBtn()}
          </Col>
          <Col className={classnames(styles.infoHeader, styles.multiGroupInfoHeader)} span={24}>
            <span>答案与解析</span>
          </Col>
          <Col className={classnames(styles.questionGroupOptionWrap, styles.analysis)} span={24}>
            <div className={styles.answerWrap}>
              <div>
                <span className={styles.multiAnswerDesc}>你的答案：</span>
                <span className={styles.multiAnswerWrap}>
                  {stuAnswer()}
                </span>
              </div>
              <div>
                <span className={styles.multiAnswerDesc}>正确答案：</span>
                <span className={styles.multiAnswerWrap}>
                  {corAnswer()}
                </span>
              </div>
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

export default MultiGroupIncluedText;
