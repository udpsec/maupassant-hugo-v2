var CanvasParticle = (function() {
	function getElementByTag(name) {
		return document.getElementsByTagName(name)
	}

	function getELementById(id) {
		return document.getElementById(id)
	}

	function canvasInit(canvasConfig) {
		canvasConfig = canvasConfig || {};
		var html = getElementByTag("html")[0];
		var body = getElementByTag("body")[0];
		var canvasDiv = getELementById("canvas-particle");
		var canvasObj = document.createElement("canvas");
		var canvas = {
			element: canvasObj,
			points: [],
			config: {
				vx: canvasConfig.vx || 4,
				vy: canvasConfig.vy || 4,
				height: canvasConfig.height || 2,
				width: canvasConfig.width || 2,
				count: canvasConfig.count || 100,
				color: canvasConfig.color || "121, 162, 185",
				stroke: canvasConfig.stroke || "130,255,255",
				dist: canvasConfig.dist || 6000,
				e_dist: canvasConfig.e_dist || 20000,
				max_conn: 10
			}
		};
		if(canvas.element.getContext("2d")) {
			canvas.context = canvas.element.getContext("2d")
		} else {
			return null
		}
		body.style.padding = "0";
		body.style.margin = "0";
		body.appendChild(canvas.element);
		canvas.element.style = "position: absolute; top: 0; left: 0; z-index: -1;";
		canvasSize(canvas.element);
		window.onresize = function() {
			canvasSize(canvas.element)
		};
		body.onmousemove = function(e) {
			var event = e || window.event;
			canvas.mouse = {
				x: event.clientX,
				y: event.clientY
			}
		};
		document.onmouseleave = function() {
			canvas.mouse = undefined
		};
		setInterval(function() {
			drawPoint(canvas)
		}, 40)
	}

	function canvasSize(canvas) {
		canvas.width = window.innerWeight || document.documentElement.clientWidth || document.body.clientWidth;
		canvas.height = window.innerWeight || document.documentElement.clientHeight || document.body.clientHeight
	}

	function drawPoint(canvas) {
		var context = canvas.context,
			point, dist;
		context.clearRect(0, 0, canvas.element.width, canvas.element.height);
		context.beginPath();
		context.fillStyle = "rgb(" + canvas.config.color + ")";
		for(var i = 0, len = canvas.config.count; i < len; i++) {
			if(canvas.points.length != canvas.config.count) {
				point = {
					x: Math.floor(Math.random() * canvas.element.width),
					y: Math.floor(Math.random() * canvas.element.height),
					vx: canvas.config.vx / 2 - Math.random() * canvas.config.vx,
					vy: canvas.config.vy / 2 - Math.random() * canvas.config.vy
				}
			} else {
				point = borderPoint(canvas.points[i], canvas)
			}
			context.fillRect(point.x - canvas.config.width / 2, point.y - canvas.config.height / 2, canvas.config.width, canvas.config.height);
			canvas.points[i] = point
		}
		drawLine(context, canvas, canvas.mouse);
		context.closePath()
	}

	function borderPoint(point, canvas) {
		var p = point;
		if(point.x <= 0 || point.x >= canvas.element.width) {
			p.vx = -p.vx;
			p.x += p.vx
		} else {
			if(point.y <= 0 || point.y >= canvas.element.height) {
				p.vy = -p.vy;
				p.y += p.vy
			} else {
				p = {
					x: p.x + p.vx,
					y: p.y + p.vy,
					vx: p.vx,
					vy: p.vy
				}
			}
		}
		return p
	}

	function drawLine(context, canvas, mouse) {
		context = context || canvas.context;
		for(var i = 0, len = canvas.config.count; i < len; i++) {
			canvas.points[i].max_conn = 0;
			for(var j = 0; j < len; j++) {
				if(i != j) {
					dist = Math.round(canvas.points[i].x - canvas.points[j].x) * Math.round(canvas.points[i].x - canvas.points[j].x) + Math.round(canvas.points[i].y - canvas.points[j].y) * Math.round(canvas.points[i].y - canvas.points[j].y);
					if(dist <= canvas.config.dist && canvas.points[i].max_conn < canvas.config.max_conn) {
						canvas.points[i].max_conn++;
						context.lineWidth = 0.5 - dist / canvas.config.dist;
						context.strokeStyle = "rgba(" + canvas.config.stroke + "," + (1 - dist / canvas.config.dist) + ")";
						context.beginPath();
						context.moveTo(canvas.points[i].x, canvas.points[i].y);
						context.lineTo(canvas.points[j].x, canvas.points[j].y);
						context.stroke()
					}
				}
			}
			if(mouse) {
				dist = Math.round(canvas.points[i].x - mouse.x) * Math.round(canvas.points[i].x - mouse.x) + Math.round(canvas.points[i].y - mouse.y) * Math.round(canvas.points[i].y - mouse.y);
				if(dist > canvas.config.dist && dist <= canvas.config.e_dist) {
					canvas.points[i].x = canvas.points[i].x + (mouse.x - canvas.points[i].x) / 20;
					canvas.points[i].y = canvas.points[i].y + (mouse.y - canvas.points[i].y) / 20
				}
				if(dist <= canvas.config.e_dist) {
					context.lineWidth = 1;
					context.strokeStyle = "rgba(" + canvas.config.stroke + "," + (1 - dist / canvas.config.e_dist) + ")";
					context.beginPath();
					context.moveTo(canvas.points[i].x, canvas.points[i].y);
					context.lineTo(mouse.x, mouse.y);
					context.stroke()
				}
			}
		}
	}
	return canvasInit
})();
$(function() {
	var config = {
		vx: 4,
		vy: 4,
		height: 2,
		width: 2,
		count: 20,
		color: "0,137,225",
		stroke: "0,137,224",
		dist: 6000,
		e_dist: 20000,
		max_conn: 10
	};
	if($(window).width() > 700) {
		CanvasParticle(config)
	}
});
$(function() {
	$('#calendar').calendar({
		ifSwitch: true,
		hoverDate: true,
		backToday: true
	})
});
(function($, window, document, undefined) {
	var Calendar = function(elem, options) {
		this.$calendar = elem;
		this.defaults = {
			ifSwitch: true,
			hoverDate: false,
			backToday: false
		};
		this.opts = $.extend({}, this.defaults, options)
	};
	Calendar.prototype = {
		showHoverInfo: function(obj) {
			var _dateStr = $(obj).attr('data');
			var offset_t = $(obj).offset().top + (this.$calendar_today.height() - $(obj).height()) / 2;
			var offset_l = $(obj).offset().left + $(obj).width();
			var changeStr = _dateStr.substr(0, 4) + '-' + _dateStr.substr(4, 2) + '-' + _dateStr.substring(6);
			var _week = changingStr(changeStr).getDay();
			var _weekStr = '';
			this.$calendar_today.show();
			this.$calendar_today.css({
				left: offset_l + 30,
				top: offset_t
			}).stop().animate({
				left: offset_l + 16,
				top: offset_t,
				opacity: 1
			});
			switch(_week) {
				case 0:
					_weekStr = '星期日';
					break;
				case 1:
					_weekStr = '星期一';
					break;
				case 2:
					_weekStr = '星期二';
					break;
				case 3:
					_weekStr = '星期三';
					break;
				case 4:
					_weekStr = '星期四';
					break;
				case 5:
					_weekStr = '星期五';
					break;
				case 6:
					_weekStr = '星期六';
					break
			}
			this.$calendarToday_date.text(changeStr);
			this.$calendarToday_week.text(_weekStr)
		},
		showCalendar: function() {
			var self = this;
			var year = dateObj.getDate().getFullYear();
			var month = dateObj.getDate().getMonth() + 1;
			var dateStr = returnDateStr(dateObj.getDate());
			var firstDay = new Date(year, month - 1, 1);
			this.$calendarTitle_text.text(year + '/' + dateStr.substr(4, 2));
			this.$calendarDate_item.each(function(i) {
				var allDay = new Date(year, month - 1, i + 1 - firstDay.getDay());
				var allDay_str = returnDateStr(allDay);
				$(this).text(allDay.getDate()).attr('data', allDay_str);
				if(returnDateStr(new Date()) === allDay_str) {
					$(this).attr('class', 'item item-curDay')
				} else if(returnDateStr(firstDay).substr(0, 6) === allDay_str.substr(0, 6)) {
					$(this).attr('class', 'item item-curMonth')
				} else {
					$(this).attr('class', 'item')
				}
			})
		},
		renderDOM: function() {
			this.$calendar_title = $('<div class="calendar-title"></div>');
			this.$calendar_week = $('<ul class="calendar-week"></ul>');
			this.$calendar_date = $('<ul class="calendar-date"></ul>');
			this.$calendar_today = $('<div class="calendar-today"></div>');
			var _titleStr = '<a href="#" class="title"></a>' + '<a href="javascript:;" id="backToday">T</a>' + '<div class="arrow">' + '<span class="arrow-prev"><</span>' + '<span class="arrow-next">></span>' + '</div>';
			var _weekStr = '<li class="item">日</li>' + '<li class="item">一</li>' + '<li class="item">二</li>' + '<li class="item">三</li>' + '<li class="item">四</li>' + '<li class="item">五</li>' + '<li class="item">六</li>';
			var _dateStr = '';
			var _dayStr = '<i class="triangle"></i>' + '<p class="date"></p>' + '<p class="week"></p>';
			for(var i = 0; i < 6; i++) {
				_dateStr += '<li class="item">26</li>' + '<li class="item">26</li>' + '<li class="item">26</li>' + '<li class="item">26</li>' + '<li class="item">26</li>' + '<li class="item">26</li>' + '<li class="item">26</li>'
			}
			this.$calendar_title.html(_titleStr);
			this.$calendar_week.html(_weekStr);
			this.$calendar_date.html(_dateStr);
			this.$calendar_today.html(_dayStr);
			this.$calendar.append(this.$calendar_title, this.$calendar_week, this.$calendar_date, this.$calendar_today);
			this.$calendar.show()
		},
		inital: function() {
			var self = this;
			this.renderDOM();
			this.$calendarTitle_text = this.$calendar_title.find('.title');
			this.$backToday = $('#backToday');
			this.$arrow_prev = this.$calendar_title.find('.arrow-prev');
			this.$arrow_next = this.$calendar_title.find('.arrow-next');
			this.$calendarDate_item = this.$calendar_date.find('.item');
			this.$calendarToday_date = this.$calendar_today.find('.date');
			this.$calendarToday_week = this.$calendar_today.find('.week');
			this.showCalendar();
			if(this.opts.ifSwitch) {
				this.$arrow_prev.bind('click', function() {
					var _date = dateObj.getDate();
					dateObj.setDate(new Date(_date.getFullYear(), _date.getMonth() - 1, 1));
					self.showCalendar()
				});
				this.$arrow_next.bind('click', function() {
					var _date = dateObj.getDate();
					dateObj.setDate(new Date(_date.getFullYear(), _date.getMonth() + 1, 1));
					self.showCalendar()
				})
			}
			if(this.opts.backToday) {
				this.$backToday.bind('click', function() {
					if(!self.$calendarDate_item.hasClass('item-curDay')) {
						dateObj.setDate(new Date());
						self.showCalendar()
					}
				})
			}
			this.$calendarDate_item.hover(function() {}, function() {
				self.$calendar_today.css({
					left: 0,
					top: 0
				}).hide()
			})
		},
		constructor: Calendar
	};
	$.fn.calendar = function(options) {
		var calendar = new Calendar(this, options);
		return calendar.inital()
	};
	var dateObj = (function() {
		var _date = new Date();
		return {
			getDate: function() {
				return _date
			},
			setDate: function(date) {
				_date = date
			}
		}
	})();

	function returnDateStr(date) {
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var day = date.getDate();
		month = month < 10 ? ('0' + month) : ('' + month);
		day = day < 10 ? ('0' + day) : ('' + day);
		return year + month + day
	};

	function changingStr(fDate) {
		var fullDate = fDate.split("-");
		return new Date(fullDate[0], fullDate[1] - 1, fullDate[2])
	}
})(jQuery, window, document);
$('.tablelist nav li').addClass("fa fa-chevron-circle-right").css("display", "block");
$('.tablelist nav li').css("line-height", "2em");
$("img.lazy").lazyload({
	effect: "fadeIn"
});