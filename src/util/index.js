/**
 * 常用工具函数模块
 * @module util
 * */

/**
 * 递归 深拷贝
 * @param data {Object} 拷贝的数据
 */
export function deepCopyBy(data) {
	const t = getType(data)
	let o
	if (t === 'array') {
		o = []
	} else if (t === 'object') {
		o = {}
	} else {
		return data
	}

	if (t === 'array') {
		for (let i = 0; i < data.length; i++) {
			o.push(deepCopy(data[i]))
		}
	} else if (t === 'object') {
		for (let i in data) {
			o[i] = deepCopy(data[i])
		}
	}
	return o
}

/**
 * JSON 深拷贝
 * @param data {Object} 拷贝的数据
 * @return data {Object} 复制后生成的对象
 */
export function deepCopy(data) {
	return JSON.parse(JSON.stringify(data))
}

/**
 * 将手机号中间部分替换为星号
 * @param phone {String}: 手机号码
 */
export function formatPhone(phone) {
	return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}

/**
 * 防抖
 * @param func {Function}  执行函数
 * @param wait {Number}  防抖时间（毫秒）
 */
export function debounce(func, wait) {
	let id
	return function (...args) {
		id && clearTimeout(id)
		id = setTimeout(() => {
			func.apply(this, args)
		}, wait)
	}
}

/**
 * 节流
 * @param func {Function}  执行函数
 * @param wait {Number}  节流时间（毫秒）
 */
export function throttle(func, wait) {
	let lastTime = Date.now()
	return function (...args) {
		let now = Date.now()
		if (now - lastTime > wait) {
			lastTime = now
			func.apply(this, args)
		}
	}
}

/**
 * 检测对象是否含有某组属性
 * @param obj {Object} 检测对象
 * @param keys {Array} 属性列表
 * @example
 * var obj={name:"test",age:18};
 * hasKey(obj,["name","age"]) // true
 * hasKey(obj,["name","age","sex"]); // false
 */
export function hasKeys(obj, keys) {
	if (obj instanceof Object && keys instanceof Array) {
		var ble = false
		for (var i = 0, n = keys.length; i < n; i++) {
			if (Object.prototype.hasOwnProperty.call(obj, keys[i])) {
				ble = true
			} else {
				ble = false
				break
			}
		}
		return ble
	}
}

/**
 * 格式化字符串成数字，保留2位小数
 * @param value 格式化的字符串
 * */
export function formatToNum(value) {
	value = value.toString()
	// 只能输入"数字"和"."
	value = value.replace(/[^\d.]/g, '')
	// 第一位字符不能为"."
	value = value.replace(/^\./g, '')
	// 只能输入一个小数点且只保留一个
	value = value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
	// 只能输入1位小数
	// value = value.replace(/^(\-)*(\d+)\.(\d).*$/, "$1$2.$3");
	// 只能输入两个小数
	// eslint-disable-next-line
  value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
	return value
}

/**
 * 格式化现在的已过时间
 * @param {Date} startTime
 * @return {String}
 * @example
 *
 * formatPassTime(new Date(2022-01-01 00:00:00)) ===> 1年前
 * formatPassTime(new Date(2021-21-01 10:00:00)) ===> 2月前
 */
export function formatPassTime(startTime) {
	let currentTime = Date.parse(new Date()),
		time = currentTime - startTime,
		day = parseInt(time / (1000 * 60 * 60 * 24)),
		hour = parseInt(time / (1000 * 60 * 60)),
		min = parseInt(time / (1000 * 60)),
		month = parseInt(day / 30),
		year = parseInt(month / 12)
	if (year) return year + '年前'
	if (month) return month + '个月前'
	if (day) return day + '天前'
	if (hour) return hour + '小时前'
	if (min) return min + '分钟前'
	else return '刚刚'
}

/**
 * 格式化时间戳
 * @param {number} time 时间戳
 * @param {string} fmt 格式
 * @return {String}
 * @example
 * formatTime(1700152449834) ===> 2023-11-17 00:34:09
 */
export function formatTime(time, fmt = 'yyyy-MM-dd hh:mm:ss') {
	let ret
	let date = new Date(time)
	let opt = {
		'y+': date.getFullYear().toString(),
		'M+': (date.getMonth() + 1).toString(), // 月份
		'd+': date.getDate().toString(), // 日
		'h+': date.getHours().toString(), // 小时
		'm+': date.getMinutes().toString(), // 分
		's+': date.getSeconds().toString() // 秒
	}
	for (let k in opt) {
		ret = new RegExp('(' + k + ')').exec(fmt)
		if (ret) {
			fmt = fmt.replace(ret[1], ret[1].length === 1 ? opt[k] : opt[k].padStart(ret[1].length, '0'))
		}
	}
	return fmt
}

/**
 * 添加script
 * @param {string} url js url
 * @param {function} [onload] 加载成功回调
 * @param {function} [onerror] 加载失败回调
 * @return {HTMLElement} script引用
 */
export function addScript(url, onload, onerror) {
	var script = document.createElement('script')
	if (onload) {
		script.onload = function () {
			onload(script)
		}
	}
	script.onerror = function () {
		if (onerror) {
			onerror(script)
		} else if (onload) {
			onload(script)
		}
	}
	script.src = url
	document.head.appendChild(script)
	return script
}

/**
 * DOM添加类
 * @param {HTMLElement} element - DOM元素
 * @param {string} className - 类名
 * */
export function addClass(element, className) {
	const regClassName = new RegExp('(^| )' + className + '( |$)')
	// ( /\s+/ 匹配任何空白符，包括\n,\r,\f,\t,\v等（换行、回车、空格、tab等）})
	if (!regClassName.test(element.className)) {
		element.className = element.className.split(/\s+/).concat(className).join(' ')
	}
}

/**
 * DOM删除类
 * @param {HTMLElement} element - DOM元素
 * @param {string} className - 类名
 * */
export function removeClass(element, className) {
	const regClassName = new RegExp('(^|\\s)' + className + '(\\s|$)', 'g')
	element.className = element.className.replace(regClassName, '')
}

/**
 * 判断DOM是否有某个类名
 * @param {HTMLElement} element - DOM元素
 * @param {string} className - 类名
 * @return {Boolean} 判断后的值
 * */
export function hasClass(element, className) {
	return element.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}

/**
 * DOM添加/删除类的切换操作
 * @param {HTMLElement} element - DOM元素
 * @param {string} className - 类名
 * */
export function toggleClass(element, className) {
	if (hasClass(element, className)) {
		removeClass(element, className)
	} else {
		addClass(element, className)
	}
}

export function secondToHour(second) {
	return second / 60 / 60
}

export function secondToMinute(second) {
	return second / 60
}

export function secondsToHms(seconds) {
	// 定义时分秒变量
	let h = Math.floor(seconds / 3600) // 计算小时数
	let m = Math.floor((seconds % 3600) / 60) // 计算分钟数
	let s = seconds % 60 // 计算秒数

	// 格式化时分秒为两位数（如果需要）
	h = h < 10 ? '0' + h : h
	m = m < 10 ? '0' + m : m
	s = s < 10 ? '0' + s : s

	// 返回时分秒字符串
	return h + ':' + m + ':' + s
}

/**
 * 在小于10的数字之前补0
 * @param {Number} num
 * @return {String} 补0之后的值
 * */
export function padZero(num) {
	return num < 10 ? '0' + num : num.toString()
}

/**
 * HSL颜色值转换为RGB.
 * 换算公式改编自 http://en.wikipedia.org/wiki/HSL_color_space.
 * h, s, 和 1 设定在 [0,1] 之间
 * 返回的 r, g, 和 b 在 [0,255] 之间
 *
 * @param Number h 色相
 * @param Number s 饱和度
 * @param Number 1 亮度
 * @return Array RGB色值数值
 */
export function hslToRgb(h, s, l) {
	var r, g, b

	if (s == 0) {
		r = g = b = 1 // achromatic
	} else {
		var hue2rgb = function (p, q, t) {
			if (t < 0) t += 1
			if (t > 1) t -= 1
			if (t < 1 / 6) return p + (q - p) * 6 * t
			if (t < 1 / 2) return q
			if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
			return p
		}

		var q = l < 0.5 ? 1 * (1 + s) : 1 + s - 1 * s
		var p = 2 * l - q

		r = hue2rgb(p, q, h + 1 / 3)
		g = hue2rgb(p, q, h)
		b = hue2rgb(p, q, h - 1 / 3)
	}

	return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
}

function getType(obj) {
	return Object.prototype.toString.call(obj).slice(8, -1)
}
