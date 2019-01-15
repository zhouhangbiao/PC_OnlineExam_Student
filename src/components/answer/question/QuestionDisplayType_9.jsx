import React from "React";
import {Col, Row, Radio} from "antd";
import styles from './QuestionStyles.less';

const RadioGroup = Radio.Group;

/**
 * 判断题 QuestionDisplayType_9
 */
class Judgement extends React.Component {
  constructor(props){
    super(props);
  }

  handleOptionClick = (e) => {
    this.props.setCurrentAnswer([{
      ...this.props.currentAnswer[0],
      StudentAnswer: [e.target.value],
    }]);
  };

  render(){
    const { question, currentAnswer } = this.props;

    const options = () => {
      let value = '';

      if (currentAnswer && currentAnswer[0]) {
        value = currentAnswer[0].StudentAnswer[0];
      }

      const optionContent = question.QuestionGroups[0].QuestionGroupOptions.map(item => {
        return (
          <Radio className={styles.questionOptions} value={item.QuestionOptionId}>
            <span className={styles.option} dangerouslySetInnerHTML={
              {
                __html: item.QuestionOptionText
              }
            }/>
          </Radio>
        )
      });

      return (
        <RadioGroup onChange={this.handleOptionClick} value={value}>
          {optionContent}
        </RadioGroup>
      )
    };

    return (
      <Col className={styles.questionsInfo} span={24}>
        <Row type="flex">
          <Col className={styles.infoHeader} span={24}>
            作答区
          </Col>
          <Col className={styles.questionsCont} span={24}>
            {options()}
          </Col>
        </Row>
      </Col>
    );
  }
}

export default Judgement;
