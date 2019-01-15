import $ from 'jQuery';
import style from './DrawPaper.css'; /*DO NOT REMOVE*/

function DrawPaper(options) {
  let defaults = {
    /**
     * 绘图工具
     * @cfg {Array} [tools = ['dash', 'line', 'circle', 'restore']]
     */
    tools: ['line', 'dash', 'circle', 'restore'],
    /**
     * 绘图数据
     * @cfg {Object}
     */
    resource: {
      desc: '',
      data: '',
      answer: []
    },
    /**
     * 父容器
     * @cfg {String} [wrapper="body"]
     */
    wrapper: 'body',
    /**
     * 绘图组件id
     * @cfg {String} [id = new Date().getTime()]
     */
    id: new Date().getTime(),
    /**
     * 点击动作回调
     * @event onClickAction
     */
    onClickAction: function () {},
    /**
     * 点击完成回调
     * @event onClickFinish
     */
    onClickFinish: function () {},
  };

  let $drawContainer, drawPaperBg;
  let $drawPaper, paperContext;
  let $drawPaperHistory;
  let $drawPaperAssist, paperAssistContext;
  let $drawPaperCover, paperCoverContext;
  let $describe, $container, $tool, $history;
  let paperWidth, paperHeight;
  let counter = [];
  let drawTool, RED, BLACK, drawSize;
  let drawTools = ['dash', 'line', 'circle', 'square'];
  let actionTools = ['restore'];
  let drawFlag;
  let pointStart = [], pointEnd = [], radii;
  let currentId;

  let toolItems = {
    'dash': {
      name: '虚线',
      tool: 'dash',
      className: 'icon icon-dotted'
    },
    'line': {
      name: '直线',
      tool: 'line',
      className: 'icon icon-line'
    },
    'circle': {
      name: '圆形',
      tool: 'circle',
      className: 'icon icon-circle'
    },
    'restore': {
      name: '重置',
      tool: 'restore',
      className: 'icon icon-reset'
    }
  };

  /**
   * 组件初始化
   * @private
   * @template
   */
  function _init() {
    defaults = $.extend({}, defaults, options);
    drawTool = defaults.tools[0];
    defaults.resource.answer.length ? counter = defaults.resource.answer : "";
    RED = '#FF0000';
    BLACK = '#000000';
    drawSize = 1;
    drawFlag = false;

    _renderDOM();
    _attachEvent();
  }

  /**
   * 画布初始化
   * @private
   */
  function _initDrawPaper() {
    paperContext = $drawPaper.get(0).getContext('2d');
    paperCoverContext = $drawPaperCover.get(0).getContext('2d');
    paperAssistContext = $drawPaperAssist.get(0).getContext('2d');

    drawPaperBg = new Image();
    drawPaperBg.src = defaults.resource.data;
    drawPaperBg.onload = function () {
      paperWidth = drawPaperBg.width;
      paperHeight = drawPaperBg.height;
      $drawPaper.attr({
        'width': paperWidth,
        'height': paperHeight
      });
      $drawPaperHistory.css({
        'width': paperWidth,
        'height': paperHeight
      });
      $drawPaperAssist.attr({
        'width': paperWidth,
        'height': paperHeight
      });
      $drawPaperCover.attr({
        'width': paperWidth,
        'height': paperHeight
      });
      paperContext.drawImage(drawPaperBg, 0, 0);

      _renderHistoryDraw(defaults.resource.answer);
    };
  }

  /**
   * 描述初始化
   * @private
   */
  function _initDescribe() {
    $describe = $drawContainer.find('[data-node="describe"]');
    $describe.text(defaults.resource.desc).attr('title', defaults.resource.desc);
  }

  /**
   * 工具初始化
   * @private
   */
  function _initTools() {
    let toolTemplate = '<li data-tool="${tools}"><div class="${type}"><span class="${className}"></div><p>${name}</p></li>';
    let toolsStr = '';

    $tool = $drawContainer.find('[data-node="tool"]');

    $.each(defaults.tools, function (i) {
      let type;

      if (drawTools.indexOf(toolItems[defaults.tools[i]].tool) > -1) {
        type = 'tools';
      } else if (actionTools.indexOf(toolItems[defaults.tools[i]].tool) > -1) {
        type = 'operating';
      }

      switch (defaults.tools[i]) {
        default:
          toolsStr += toolTemplate.replace(/\$\{className}/g, toolItems[defaults.tools[i]].className)
            .replace(/\$\{name}/g, toolItems[defaults.tools[i]].name)
            .replace(/\$\{tools}/g, toolItems[defaults.tools[i]].tool)
            .replace(/\$\{type}/g, type);
      }
    });

    $tool.find('ul.tools-item').append(toolsStr);
  }

  /**
   * 渲染绘图历史列表
   * @param {Array} history
   * @private
   */
  function _renderHistoryList(history) {
    let list = '<select multiple="multiple"></select>';
    let btn = '<a data-node="delete" class="draw-delete disabled">删除选中</a>';

    $history = $drawContainer.find('[data-node="history"]');

    $history.append(list).append(btn);

    history.length && history.forEach(function (item) {
      _appendHistoryDrawList(item.Id, toolItems[item.Type].name);
    });
  }

  /**
   * 渲染绘图历史
   * @param {Array} history
   * @private
   */
  function _renderHistoryDraw(history) {
    history.length && history.forEach(function (item) {
      drawFlag = true;

      switch (item.Type) {
        case 'line':
          paperCoverContext.setLineDash([]);
          _drawLine(item.PointStart, item.PointEnd);
          break;
        case 'dash':
          paperCoverContext.setLineDash([5]);
          _drawLine(item.PointStart, item.PointEnd);
          break;
        case 'circle':
          paperCoverContext.setLineDash([]);
          _drawCircle(item.PointStart, item.PointEnd);
          break;
      }

      _appendHistoryDraw(item.Id);
    });
  }

  /**
   * 渲染组件DOM
   * @private
   */
  function _renderDOM() {
    $drawContainer = $('<div class="draw-container">' +
      '  <div data-node="describe" class="draw-title"></div>' +
      '  <div data-node="tool" class="draw-tools">' +
      '    <ul class="tools-item"></ul>' +
      '    <div class="tools-item-ex">' +
      '      <a data-node="finish" class="draw-finish">绘图完成</a>' +
      '    </div>' +
      '  </div>' +
      '  <div data-node="history" class="draw-history"></div>' +
      '  <div class="draw-paper-title">绘图区</div>' +
      '  <div data-node="container" class="draw-paper"></div>' +
      '</div>').attr('id', 'drawContainer-' + defaults.id);
    $drawPaper = $('<canvas class="draw-paper-canvas">您的浏览器不支持绘图哦，亲</canvas>').attr('id', 'drawPaper-' + defaults.id);
    $drawPaperHistory = $('<div class="draw-paper-canvas"></div>').attr('id', 'drawPaperHistory-' + defaults.id);
    $drawPaperAssist = $('<canvas class="draw-paper-canvas"></canvas>').attr('id', 'drawPaperAssist-' + defaults.id);
    $drawPaperCover = $('<canvas class="draw-paper-canvas"></canvas>').attr('id', 'drawPaperCover-' + defaults.id);

    $(defaults.wrapper).append($drawContainer);
    _initTools();
    _initDescribe();

    $container = $drawContainer.find('[data-node="container"]');
    $container.append($drawPaper);
    $container.append($drawPaperHistory);
    $container.append($drawPaperAssist);
    $container.append($drawPaperCover);
    _initDrawPaper();
    _renderHistoryList(defaults.resource.answer);
  }

  /**
   * 事件绑定
   * @private
   * @template
   */
  function _attachEvent() {
    $drawPaperCover.bind('mousedown', _startDrawing);
    $drawPaperCover.bind('mousemove', _moveDrawing);
    $drawPaperCover.bind('mouseup', _endDrawing);
    $drawPaperCover.bind('mouseout', _pauseDrawing);

    $tool.on('click', 'li', _selectTool);
    $tool.on('click', '[data-node="finish"]', _finishDraw);
    $history.on('click', 'option', _selectHistory);
    $history.on('click', '[data-node="delete"]', _deleteHistory);
  }

  /**
   * 选择绘图工具
   */
  function _selectTool() {
    paperContext.strokeStyle = BLACK;
    paperCoverContext.strokeStyle = RED;
    paperCoverContext.lineWidth = drawSize;

    if (drawTools.indexOf($(this).attr('data-tool')) > -1) {
      $(this).addClass('on').siblings().removeClass('on');
      drawTool = $(this).attr('data-tool');

      if (drawTool === 'dash') {
        paperCoverContext.setLineDash([5]);
      } else {
        paperCoverContext.setLineDash([]);
      }
      return true;
    }

    switch ($(this).attr('data-tool')) {
      case 'restore':
        _restoreDraw();
        break;
    }
  }

  /**
   * 插入历史绘图
   * @param {String} id 绘制图片id
   */
  function _appendHistoryDraw(id) {
    let image = new Image();
    let imageSelected = new Image();
    let $imageContent = $('<div class="draw-paper-canvas-history"></div>');

    _clearDrawingRect();

    paperCoverContext.strokeStyle = RED;
    paperCoverContext.stroke();
    imageSelected.style.display = 'none';
    imageSelected.src = $drawPaperCover.get(0).toDataURL();

    _clearDrawingRect();

    paperCoverContext.strokeStyle = BLACK;
    paperCoverContext.stroke();
    image.src = $drawPaperCover.get(0).toDataURL();

    _clearDrawingRect();

    $imageContent.css({
      'width': paperWidth,
      'height': paperHeight
    }).attr('id', id);

    $drawPaperHistory.append($imageContent);
    $imageContent.append(imageSelected).append(image);
  }

  /**
   * 插入历史绘图列表
   * @param {String} id
   * @param {String} name
   * @private
   */
  function _appendHistoryDrawList(id, name) {
    let $item = $('<option value="' + id + '">' + name + '</option>');

    $history.find('select').append($item);
  }

  /**
   * 选中历史记录
   * @private
   */
  function _selectHistory(event) {
    let id = event.target.value;
    let $target = $('#' + id);

    $('[data-node="delete"]').removeClass('disabled');
    $(this).siblings().removeAttr('selected');
    $(this).attr('selected');

    $target.siblings('.draw-paper-canvas-history').each(function () {
      $(this).find('img').each(function (i) {
        if (i === 0) {
          this.style.display = 'none';
        } else {
          this.style.display = 'block';
        }
      });
    });

    $target.find('img').each(function (i) {
      if (i === 0) {
        this.style.display = 'block';
      } else {
        this.style.display = 'none';
      }
    });
  }

  /**
   * 取消选中历史记录
   * @private
   */
  function _unSelectHistory() {
    $drawPaperHistory.find('.draw-paper-canvas-history').each(function () {
      $(this).find('img').each(function (i) {
        if (i === 0) {
          this.style.display = 'none';
        } else {
          this.style.display = 'block';
        }
      });
    });
    $history.find('select').find('option:selected').removeAttr('selected');
  }

  /**
   * 删除历史记录
   * @private
   */
  function _deleteHistory() {
    let id;

    if ($('[data-node="delete"]').hasClass('disabled')) {
      return false;
    }

    if ($history.find('select').find('option:selected').length) {
      id = $history.find('select').find('option:selected').get(0).value;
      $('#' + id).remove();
      $history.find('select').find('[value="' + id + '"]').remove();
      counter = counter.filter(function(item) {
        return item.Id !== id;
      });
      $('[data-node="delete"]').addClass('disabled');
    } else {
      layer.msg('请先选择要删除的记录');
    }
  }

  /**
   * 完成绘图
   * @private
   */
  function _finishDraw() {
    defaults.onClickFinish && defaults.onClickFinish({
      markingData: _getMarkingData(),
      answerData: counter
    });
  }

  /**
   * 开始绘图
   * @param {Object} event
   * @private
   */
  function _startDrawing(event) {
    drawFlag = true;
    pointStart[0] = event.offsetX;
    pointStart[1] = event.offsetY;
    paperCoverContext.moveTo(pointStart[0], pointStart[1]);
    paperCoverContext.strokeStyle = RED;

    if (drawTool === 'circle') {
      paperContext.beginPath();
      paperContext.moveTo(pointStart[0], pointStart[1]);
      paperContext.lineTo(pointStart[0], pointStart[1]);
      paperContext.stroke();
    }

    _unSelectHistory();
  }

  /**
   * 正在绘图
   * @param {Object} event
   */
  function _moveDrawing(event) {
    pointEnd[0] = event.offsetX;
    pointEnd[1] = event.offsetY;

    paperAssistContext && paperAssistContext.clearRect(0, 0, paperWidth, paperHeight);

    switch (drawTool) {
      case 'line':
        _drawLine(pointStart, pointEnd);
        _drawAssistLine(pointEnd);
        break;
      case 'dash':
        _drawLine(pointStart, pointEnd);
        _drawAssistLine(pointEnd);
        break;
      case 'circle':
        _drawCircle(pointStart, pointEnd);
        break;
    }
  }

  /**
   * 完成绘图
   * @private
   */
  function _endDrawing() {
    _clearDrawingRect();

    drawFlag = false;

    if (_getPointRange(pointStart, pointEnd) < 2) {
      return;
    }

    currentId = 'drawHistory-' + new Date().getTime();
    $('[data-node="delete"]').addClass('disabled');

    if (drawTool === 'circle') {
      _saveDrawHistory({
        id: currentId,
        type: drawTool,
        pointStart: [pointStart[0], pointStart[1]],
        pointEnd: [pointEnd[0], pointEnd[1]],
        radii: radii
      });
    } else {
      _saveDrawHistory({
        id: currentId,
        type: drawTool,
        pointStart: [pointStart[0], pointStart[1]],
        pointEnd: [pointEnd[0], pointEnd[1]]
      });
    }

    _appendHistoryDrawList(currentId, toolItems[drawTool].name);
    _appendHistoryDraw(currentId);
  }

  /**
   * 暂停绘图
   */
  function _pauseDrawing() {
    _clearDrawingRect();
  }

  /**
   * 获取两点间距离
   * @return {Number}
   */
  function _getPointRange(pointA, pointB) {
    return Math.sqrt(Math.pow((pointB[0] - pointA[0]), 2) + Math.pow((pointB[1] - pointA[1]), 2))
  }

  /**
   * 清空绘图过程中的矩形
   * @param {String} [type]
   */
  function _clearDrawingRect(type) {
    if (!type) {
      paperAssistContext && paperAssistContext.clearRect(0, 0, paperWidth, paperHeight);
      paperCoverContext && paperCoverContext.clearRect(0, 0, paperWidth, paperHeight);
    } else {
      paperContext && paperContext.clearRect(0, 0, paperWidth, paperHeight);
      paperAssistContext && paperAssistContext.clearRect(0, 0, paperWidth, paperHeight);
      paperCoverContext && paperCoverContext.clearRect(0, 0, paperWidth, paperHeight);
      paperContext && paperContext.drawImage(drawPaperBg, 0, 0);
    }
  }

  /**
   * 画辅助线
   * @param {Array} pointEnd
   * @private
   */
  function _drawAssistLine(pointEnd) {
    paperAssistContext.strokeStyle = BLACK;
    paperAssistContext.setLineDash([3]);
    paperAssistContext.beginPath();
    paperAssistContext.moveTo(pointEnd[0], 0);
    paperAssistContext.lineTo(pointEnd[0], paperHeight);
    paperAssistContext.moveTo(0, pointEnd[1]);
    paperAssistContext.lineTo(paperWidth, pointEnd[1]);
    paperAssistContext.stroke();
  }

  /**
   * 画圆形
   * @param {Array} pointStart
   * @param {Array} pointEnd
   * @private
   */
  function _drawCircle(pointStart, pointEnd) {
    _clearDrawingRect();

    if (drawFlag) {
      paperCoverContext.beginPath();
      radii = Math.sqrt((pointStart[0] - pointEnd[0]) * (pointStart[0] - pointEnd[0]) + (pointStart[1] - pointEnd[1]) * (pointStart[1] - pointEnd[1]));
      paperCoverContext.arc(pointStart[0], pointStart[1], radii, 0, Math.PI * 2, false);
      paperCoverContext.stroke();
    }
  }

  /**
   * 画直线
   * @param {Array} pointStart
   * @param {Array} pointEnd
   * @private
   */
  function _drawLine(pointStart, pointEnd) {
    if (drawFlag) {
      _clearDrawingRect();
      paperCoverContext.beginPath();
      paperCoverContext.moveTo(pointStart[0], pointStart[1]);
      paperCoverContext.lineTo(pointEnd[0], pointEnd[1]);
      paperCoverContext.stroke();
    }
  }

  /**
   * 保存绘图历史
   * @private
   */
  function _saveDrawHistory(path) {
    if (drawTool === 'circle') {
      counter.push({
        Id: path.id,
        Type: path.type,
        PointStart: path.pointStart,
        PointEnd: path.pointEnd,
        Radii: path.radii
      });
    } else {
      counter.push({
        Id: path.id,
        Type: path.type,
        PointStart: path.pointStart,
        PointEnd: path.pointEnd
      });
    }
  }

  /**
   * 重置绘图
   * @private
   */
  function _restoreDraw() {
    _clearDrawingRect('all');
    $drawPaperHistory.empty();
    $history.find('select').empty();
    defaults.onClickAction && defaults.onClickAction('success', '重置');
  }

  /**
   * 获取绘图数据
   * @private
   */
  function _getMarkingData() {
    /**
     * 画圆形
     * @param {Array} pointStart
     * @param {Array} pointEnd
     * @private
     */
    function _drawCircleTemp(pointStart, pointEnd) {
      paperContext.beginPath();
      radii = Math.sqrt((pointStart[0] - pointEnd[0]) * (pointStart[0] - pointEnd[0]) + (pointStart[1] - pointEnd[1]) * (pointStart[1] - pointEnd[1]));
      paperContext.arc(pointStart[0], pointStart[1], radii, 0, Math.PI * 2, false);
      paperContext.stroke();
    }

    /**
     * 画直线
     * @param {Array} pointStart
     * @param {Array} pointEnd
     * @private
     */
    function _drawLineTemp(pointStart, pointEnd) {
      paperContext.beginPath();
      paperContext.moveTo(pointStart[0], pointStart[1]);
      paperContext.lineTo(pointEnd[0], pointEnd[1]);
      paperContext.stroke();
    }

    counter.length && counter.forEach(function (item) {
      switch (item.Type) {
        case 'line':
          paperContext.setLineDash([]);
          _drawLineTemp(item.PointStart, item.PointEnd);
          break;
        case 'dash':
          paperContext.setLineDash([5]);
          _drawLineTemp(item.PointStart, item.PointEnd);
          break;
        case 'circle':
          paperContext.setLineDash([]);
          _drawCircleTemp(item.PointStart, item.PointEnd);
          break;
      }
    });

    setTimeout(function () {
      paperContext.drawImage(drawPaperBg, 0, 0);
    }, 10);

    return $drawPaper.get(0).toDataURL();
  }

  /**
   * 初始化（选中默认工具）
   * @template
   */
  this.init = function () {
    $tool.find('ul.tools-item').children().first().click();
  };

  /**
   * 获取作答数据
   */
  this.getDrawData = function () {
    return {
      markingData: _getMarkingData(),
      answerData: counter
    }
  };

  _init();
}

export default DrawPaper;
