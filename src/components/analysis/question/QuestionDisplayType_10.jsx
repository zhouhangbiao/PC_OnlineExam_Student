import React from "React";
import {Col, Row} from "antd";
import classnames from "classnames";
import styles from './QuestionStyles.less';

/**
 * 七选五 QuestionDisplayType_10
 */
class ReadAndFillBlank extends React.Component {
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

    const stuAnswer = () => {
      let wrap = [];
      return question.QuestionGroups[0].StudentAnswers.map((item, index) => {
        let result = '*',
            style = '';

        if (item) {
          result = item;
        }

        if (item !== question.QuestionGroups[0].StandardAnswers[index]) {
          style = styles.error;
        }

        if (result === '*') {
          style = classnames(style, styles.lineLetter);
        }

        wrap.push(
          <span className={style}>{result}</span>
        );

        if ((index + 1) % 5 === 0 || (index + 1) === question.QuestionGroups[0].StudentAnswers.length) {
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
      return question.QuestionGroups[0].StandardAnswers.map((item, index) => {
        wrap.push(
          <span>{item}</span>
        );
        if ((index + 1) % 5 === 0 || (index + 1) === question.QuestionGroups[0].StandardAnswers.length) {
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

export default ReadAndFillBlank;
