import React from "React";
import {Col, Row} from "antd";
import styles from './QuestionStyles.less';

/**
 * 写作题 QuestionDisplayType_23
 */
class Writing extends React.Component {
  constructor(props){
    super(props);
  }

  handleOptionClick = (e) => {

  };

  render() {
    return (
      <Col className={styles.questionsInfo} span={24}>
        <Row type="flex">
          <Col className={styles.infoHeader} span={24}>
            作答区
          </Col>
          <Col className={styles.questionsCont} span={24}>
            <span className={styles.writingDesc}>提示：作答完成后，请直接将纸质答卷交给监考老师</span>
          </Col>
        </Row>
      </Col>
    );
  }
}

export default Writing;
