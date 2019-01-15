import React from "React";
import UrlHelper from "js-url-helper";
import classnames from "classnames";
import {Button} from "antd";
import Header from "../../components/layout/Header.jsx";
import Footer from "../../components/layout/Footer.jsx";
import style from "./Result.less";
import * as answerService from "../../services/answerServices";
import * as commonService from "../../services/commonServices";

const urlHelper = new UrlHelper(location);
const query = urlHelper.getSearchParam();

/**
 * 考试结果
 */
class Result extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      score: '',
      hasAnalysis: false,
      unFinishExams: ''
    };

    this.getGetExamResult();
  }

  /**
   * 获取考试结果
   */
  getGetExamResult = () => {
    let loading = layer.msg('加载中', {
      icon: 16,
      shade: 0.3,
      time: 0
    });

    answerService.GetExamResult({
      payload: {
        "ExamSceneId": query.examSceneId,
        "CourseId": query.courseId,
        "ExamPaperId": query.examPaperId,
      }
    }).then((res) => {
      layer.close(loading);

      this.setState({
        score: res.ReturnEntity.Score,
        hasAnalysis: res.ReturnEntity.HasAnalysis,
        unFinishExams: res.ReturnEntity.WaitedToExams
      });
    });
  };

  /**
   * 清除用户缓存
   */
  clearUserInfoStorage = () => {
    localStorage.removeItem('StudentCode');
    localStorage.removeItem('SeatNumber');
    localStorage.removeItem('UserTrueName');
    localStorage.removeItem('UserFace');
    localStorage.removeItem('SchoolName');
    localStorage.removeItem('RoomName');
  };

  /**
   * 退出
   */
  logout = () => {
    let loading = layer.msg('退出中', {
      icon: 16,
      shade: 0.3,
      time: 0
    });

    commonService.Logout({
      payload: {}
    }).then((res) => {
      layer.close(loading);

      if (res.ReturnEntity === 1) {
        layer.msg('退出成功', {icon: 1, time: 1000});
        this.clearUserInfoStorage();
        setTimeout(() => {
          window.location.href = '/onlineExamStudent/login.html';
        }, 1000);
      } else {
        layer.msg('退出失败', {icon: 2, time: 2000});
      }
    });
  };

  /**
   * 跳转到首页
   */
  handleJumpIndex = () => {
    window.location.href = '/onlineExamStudent/index.html';
  };

  /**
   * 跳转到解析
   */
  handleJumpAnalysis = () => {
    urlHelper.jump({
      path: '/onlineExamStudent/answer/analysis.html',
      search: urlHelper.setSearchParam({
        examSceneId: query.examSceneId,
        courseId: query.courseId,
        examPaperId: query.examPaperId,
      })
    });
  };

  /**
   * 退出考试（注销）
   */
  handleLogout = () => {
    const that = this;

    layer.confirm('确定退出考试？', {
      btn: ['确定','取消']
    }, function(){
      that.logout();
    });
  };

  /**
   * 渲染考试完成提示信息
   */
  renderExamFinish = () => {
    return (
      <div className={classnames(style.finishInfo, "text-c")}>
        <p>本考场已完成，请离开考场。</p>
        <p>
          <Button type="primary" onClick={this.handleJumpIndex}>返回首页</Button>
          <Button type="primary" onClick={this.handleLogout}>退出考试</Button>
        </p>
      </div>
    );
  };

  /**
   * 渲染考试未完成提示信息
   */
  renderExamUnFinish = () => {
    return (
      <div className={classnames(style.finishInfo, "text-c")}>
        <p>本考场还有 <span className="font-red">{this.state.unFinishExams.length}</span> 门学科。<br />
        您还有“ <span className="font-red">{this.state.unFinishExams.join("，")}</span> ”等待考试。</p>
        <p>
          <Button type="primary" onClick={this.handleJumpIndex}>继续考试</Button>
        </p>
      </div>
    );
  };

  render(){
    return (
      <div>
        <Header />
        <div className={style.finishBox} type="flex" justify="center">
          <div className={style.finishWrap}>
            <div className={classnames(style.finishStatus, "text-c")}>
              <p>
                <span className="icon icon-right" />
              </p>
              <p className="h4">交卷成功</p>
              {
                this.state.score !== "" ? <p>{this.state.score}分</p> : null
              }
              {
                this.state.hasAnalysis ? <p><Button onClick={this.handleJumpAnalysis}>查看解析</Button></p> : null
              }
            </div>
            {
              this.state.unFinishExams.length === 0 ? this.renderExamFinish() : this.renderExamUnFinish()
            }
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Result;
