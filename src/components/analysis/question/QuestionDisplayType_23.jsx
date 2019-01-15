import React from "React";
import {Col, Row} from "antd";
import classnames from "classnames";
import styles from './QuestionStyles.less';

/**
 * 写作题 QuestionDisplayType_23
 */
class Writing extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    const { question } = this.props;

    let result = '';

    if (question.QuestionGroups[0]) {
      result = question.QuestionGroups[0].StandardAnswers[0];
    }

    return (
      <Col className={styles.questionsInfo} span={24}>
        <Row type="flex">
          <Col className={styles.infoHeader} span={24}>
            答案与解析
          </Col>
          <Col className={classnames(styles.questionsCont, styles.analysis)} span={24}>
            <div className={styles.writingAnswerDesc}>参考答案：</div>
            <div dangerouslySetInnerHTML={
              {
                __html: result
              }
            }/>
            <div className={styles.writingAnalysisDesc}>解析：</div>
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

export default Writing;
