import React from "React";
import {Col, Row} from "antd";
import classnames from "classnames";
import styles from './QuestionStyles.less';

/**
 * 操作题 Operation
 */
class Operation extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    const { question } = this.props;

    return (
      <Col className={styles.questionsInfo} span={24}>
        <Row type="flex">
          <Col className={styles.infoHeader} span={24}>
            答案与解析
          </Col>
          <Col className={classnames(styles.questionsCont, styles.analysis)} span={24}>
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

export default Operation;
