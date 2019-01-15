import React from "React";
import {Col, Row, Button} from "antd";
import styles from './QuestionStyles.less';

/**
 * 操作题 Operation
 */
class Operation extends React.Component {
  constructor(props){
    super(props);
  }

  handleClick = (e) => {

  };

  render() {
    return (
      <Col className={styles.questionsInfo} span={24}>
        <Row type="flex">
          <Col className={styles.infoHeader} span={24}>
            作答区
          </Col>
          <Col className={styles.questionsCont} span={24}>
            <Button type="primary" className={styles.operationDesc} onClick={this.handleClick} disabled>点击此处开始答题</Button>
          </Col>
        </Row>
      </Col>
    );
  }
}

export default Operation;
