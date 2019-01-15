import React from "React";
import style from './QuestionStyles.less';
import classnames from "classnames";
import _ from 'lodash';

/**
 * 多选题 QuestionDisplayType_2
 */
class MultiSection extends React.Component {
  constructor(props){
    super(props);

    this.state = {};
  }

  handleOptionClick = (value) => {
    const { question, currentAnswers } = this.props;
    let questionAnswer;

    if (currentAnswers) {
      questionAnswer = _.find(currentAnswers, { QuestionId: question.QuestionId });
    }

    let tempAnswer = _.cloneDeep(questionAnswer.QuestionAnswers[0].StudentAnswer);

    const result = _.find(tempAnswer, answer => {
      return answer === value;
    });

    if (result) {
      _.remove(tempAnswer, answer => {
        return answer === value;
      });
    } else {
      tempAnswer = [];
      question.QuestionGroups[0].QuestionGroupOptions.map(item => {
        const result = _.find(questionAnswer.QuestionAnswers[0].StudentAnswer, answer => {
          return answer === item.QuestionOptionId;
        });

        if (result || value === item.QuestionOptionId) {
          tempAnswer.push(item.QuestionOptionId);
        }
      });
    }

    this.props.setCurrentAnswer(question.QuestionId, [{
      QuestionGroupId: question.QuestionGroups[0].QuestionGroupId,
      StudentAnswer: tempAnswer,
    }]);
  };

  render(){
    const { question, currentAnswers } = this.props;

    if (!question)
      return '';

    const option = () => {
      let questionAnswer;
      if (currentAnswers) {
        questionAnswer = _.find(currentAnswers, { QuestionId: question.QuestionId });
      }

      return question.QuestionGroups[0].QuestionGroupOptions.map(item => {
        let optionStyle = classnames(style.option, style.multiOption);

        if (questionAnswer && _.find(questionAnswer.QuestionAnswers[0].StudentAnswer, optionId => { return optionId === item.QuestionOptionId })) {
          optionStyle = classnames(optionStyle, style.cur);
        }

        return (
          <span className={optionStyle} onClick={()=>{this.handleOptionClick(item.QuestionOptionId)}}>{item.QuestionOptionId}</span>
        )
      });
    };

    return (
      <div className={style.questionWrap} id={question.QuestionId}>
        <span className={style.questionNumberWrap}>{`第${question.QuestionIndex}题`}</span>
        <div className={style.questionContentWrap}>
          <img src={question.QuestionPicture}/>
        </div>
        <div className={style.questionAnswerWrap}>
          <div className={style.answerDesc}>作答区：</div>
          <div className={style.answerContent}>
            {option()}
          </div>
        </div>
      </div>
    );
  }
}

export default MultiSection;
