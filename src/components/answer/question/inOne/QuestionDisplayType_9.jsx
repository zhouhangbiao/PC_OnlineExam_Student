import React from "React";
import style from './QuestionStyles.less';
import classnames from "classnames";
import _ from 'lodash';

/**
 * 判断题 QuestionDisplayType_9
 */
class Judgement extends React.Component {
  constructor(props){
    super(props);
  }

  handleOptionClick = (value) => {
    const { question } = this.props;

    this.props.setCurrentAnswer(question.QuestionId, [{
      QuestionGroupId: question.QuestionGroups[0].QuestionGroupId,
      StudentAnswer: [value],
    }]);
  };

  render(){
    const { question, currentAnswers } = this.props;

    const option = () => {
      let questionAnswer;

      if (currentAnswers) {
        questionAnswer = _.find(currentAnswers, { QuestionId: question.QuestionId });
      }

      return question.QuestionGroups[0].QuestionGroupOptions.map(item => {
        let optionStyle = style.option;

        if (questionAnswer && questionAnswer.QuestionAnswers[0].StudentAnswer[0] === item.QuestionOptionId) {
          optionStyle = classnames(optionStyle, style.cur);
        }

        return (
          <span className={optionStyle} onClick={()=>{this.handleOptionClick(item.QuestionOptionId)}}>{item.QuestionOptionText}</span>
        )
      });
    };

    return (
      <div className={style.questionWrap} id={question.QuestionId}>
        <span className={style.questionNumberWrap}>第{question.QuestionIndex}题</span>
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

export default Judgement;
