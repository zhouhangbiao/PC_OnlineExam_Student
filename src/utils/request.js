import axios from 'axios';

export default function request(options) {
  let statusCode;
  let errMessage;
  let formData;
  let defaults = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
    },
    withCredentials: true,
    validateStatus: function (status) {
      if (status >= 200 && status < 300) {
        return true
      } else {
        statusCode = status;
        if (statusCode === 401) {
          location.href = '/onlineExamStudent/login.html';
        }
        return false;
      }
    },
    timeout: 10000
  };

  /**
   * 检查接口返回状态（业务）
   * @param data
   */
  function checkResultType(data) {
    if (data.ResultType !== 1) {
      errMessage = data.Message;
      statusCode = -1;
      throw statusCode;
    }

    return data;
  }

  options = Object.assign(defaults, options);
  formData = options.data;
  options.data = "param=" + JSON.stringify(formData);

  return axios.request(options)
    .then((response) => response.data)
    .then(checkResultType)
    .catch(() => {
      if (statusCode === undefined) {
        errMessage = '请检查教师机开启状态，或联系管理员';
        layer.msg(errMessage, {icon: 2, time: 2000});
      } else {
        layer.msg(errMessage, {icon: 2, time: 2000});
      }
    });
}
