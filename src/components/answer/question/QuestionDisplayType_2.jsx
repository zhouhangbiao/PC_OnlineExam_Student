import React from "React";
import {Col, Row, Checkbox} from "antd";
import styles from './QuestionStyles.less';
import _ from 'lodash';

/**
 * 多选题 QuestionDisplayType_2
 */
class MultiSection extends React.Component {
  constructor(props){
    super(props);

    this.state = {};
  }

  handleOptionClick = (e) => {
    const { question, currentAnswer } = this.props;
    let tempAnswer = _.cloneDeep(currentAnswer[0].StudentAnswer);

    const result = _.find(tempAnswer, answer => {
      return answer === e.target.value;
    });

    if (result) {
      _.remove(tempAnswer, answer => {
        return answer === e.target.value;
      });
    } else {
      tempAnswer = [];

      question.QuestionGroups[0].QuestionGroupOptions.map(item => {
        const result = _.find(currentAnswer[0].StudentAnswer, answer => {
          return answer === item.QuestionOptionId;
        });

        if (result || e.target.value === item.QuestionOptionId) {
          tempAnswer.push(item.QuestionOptionId);
        }
      });
    }

    this.props.setCurrentAnswer([{
      ...this.props.currentAnswer[0],
      StudentAnswer: tempAnswer,
    }]);
  };

  render(){
    const { question, currentAnswer } = this.props;

    const options = () => {
      const optionContent = question.QuestionGroups[0].QuestionGroupOptions.map(item => {
        let check = false;

        if (currentAnswer && currentAnswer[0]) {
          const result = _.find(currentAnswer[0].StudentAnswer, answer => {
            return answer === item.QuestionOptionId;
          });

          if (result) {
            check = true;
          }
        }

        return (
          <Checkbox className={styles.questionOptions} value={item.QuestionOptionId} onChange={this.handleOptionClick} checked={check}>
            <span className={styles.option}>{item.QuestionOptionId}</span>
            <span className={styles.option} dangerouslySetInnerHTML={
              {
                __html: item.QuestionOptionText
              }
            }/>
          </Checkbox>
        )
      });

      return (
        <div>
          {optionContent}
        </div>
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

export default MultiSection;
