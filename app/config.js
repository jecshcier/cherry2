module.exports = {
	window: {
		// 最小宽度
		minWidth: 800,
		// 最小高度
		minHeight: 600,
		// 默认宽度
		width: 800,
		// 默认高度
		height: 600,
		// 默认窗口名称
		title: "cherry2",
		// 是否居中
		center: true,
		// 是否全屏
		fullscreen: false,
		// 是否允许全屏
		fullscreenable: true
	},
	webview: {
		// 默认放置静态网页的文件夹，可以自定义
		root: 'app',
		// 加载完默认webview之后的默认网页
		defaultUrl: 'index.html'
	}
}