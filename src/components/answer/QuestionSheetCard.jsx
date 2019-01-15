import React from "React";
import style from './QuestionSheetCard.less';

/**
 * 作答状态卡
 */
class AnswerQuestionSheetCard extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      clickAble: this.props.data.IsChangeSwitch === 1,
      type: this.props.type
    };
  }

  /**
   * 处理切换题目
   * @param {Object} event
   */
  handleChangeQuestion = (event) => {
    const questionId = event.target.getAttribute('data-id');

    if (this.state.clickAble) {
      this.props.onClick && this.props.onClick(questionId);
    }
  };

  /**
   * 渲染答题卡列表
   */
  renderQuestionSheetCardList = (item) => {
    const that = this;
    /**
     * 渲染简单题型
     */
    function renderSampleQuestion(item, i) {
      return (
        <li key={i} data-id={item.QuestionId}
            className={item.QuestionAnswerStatus === 1 ? style.answered : ""}
            onClick={that.handleChangeQuestion}
        >{i + 1}</li>
      );
    }

    /**
     * 渲染复杂题型
     */
    function renderMultiQuestion(item, i) {
      /**
       * 渲染小题
       */
      function renderGroups(item, i) {
        return (
          <li key={i} data-id={item.QuestionGroupId} className={item.QuestionGroupAnswerStatus === 1 ? style.answered + " " + style.groups : style.groups}>
            {i + 1}
          </li>
        );
      }

      return (
        <div className={style.groupsContainer}>
          <ul className={style.groups}>
            <li key={i} data-id={item.QuestionId}
                className={item.QuestionAnswerStatus === 1 ? style.answered + " " + style.groupsHead : style.groupsHead}
                onClick={that.handleChangeQuestion}
            >
              {i + 1}
            </li>
          </ul>
          <ul>
            {item.QuestionGroups.map(renderGroups)}
          </ul>
        </div>
      );
    }

    /**
     * 渲染主观题型
     */
    function renderSubjectiveQuestion(item, i) {
      return (
        <li key={i} data-id={item.QuestionId}
            className={item.QuestionAnswerStatus === 1 ? style.exclude : ""}
            onClick={that.handleChangeQuestion}
        >{i + 1}</li>
      );
    }
    /**
     * 匹配题目显示类型
     * @param {Number} type
     */
    function matchQuestionDisplayType(type) {
      if (type === 1 || type === 2 || type === 9 || type === 10 || type === 22 || type === 24 || type === 25 || type === 26) {
        return (
          <div className={style.items}>
            <ul>
              {item.Questions.map(renderSampleQuestion)}
            </ul>
          </div>
        );
      } else if (type === 3 || type === 4) {
        return (
          <div className={style.items}>
            {item.Questions.map(renderMultiQuestion)}
          </div>
        );
      } else if (type === 23) {
        return (
          <div className={style.items}>
            <ul>
              {item.Questions.map(renderSubjectiveQuestion)}
            </ul>
          </div>
        );
      } else {
        return (
          <div className={style.items}>
            <ul>
              {item.Questions.map(renderSampleQuestion)}
            </ul>
          </div>
        );
      }
    }

    return (
      <div className={style.questionGroup}>
        <h3 className={style.title}>{item.QuestionCategoryName} （共{item.QuestionCount}题，合计{item.TotalScore}分）</h3>
        {matchQuestionDisplayType(item.QuestionCategoryId)}
      </div>
    );
  };

  render(){
    const data = this.props.data;
    const type = this.state.type;
    const styleMap = {
      "answer": style.answerContainer,
      "analysis": style.analysisContainer
    };
    const statusMap = {
      "answer": {
        answer: "已答",
        unAnswer: "未答",
        exclude: "主观题",
      },
      "analysis": {
        answer: "正确",
        unAnswer: "错误",
        exclude: "主观题",
      }
    };

    return (
      <div className={styleMap[type] ? styleMap[type] : style.answerContainer}>
        <div className={this.state.clickAble ? style.content + " " + style.clickAble : style.content}>
          {
            data ?
              data.QuestionTypes.length && data.QuestionTypes.map(this.renderQuestionSheetCardList)
              :
              null
          }
        </div>
        <div className={style.statusExample}>
          <div className={style.exampleWrap}>
            <div className={style.exampleItem}>
              <span><i className={style.answer} /> {statusMap[type] ? statusMap[type].answer : "已答"}</span>
              <span><i className={style.unAnswer} /> {statusMap[type] ? statusMap[type].unAnswer: "未答"}</span>
              <span><i className={style.exclude} /> {statusMap[type] ? statusMap[type].exclude : "主观题"}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AnswerQuestionSheetCard;
