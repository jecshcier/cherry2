function post(sdata = {
	url: 'http://127.0.0.1:7092/api/app/edit',
	header: {
		"Authorization": "bearer ZXB0SDZYZGxIdzlwQnVkZXVQZW9YTWxW"
	},
	data: {
		"id": 67,
		"icon_type": 2
	},
	type: 'query',
	timeout: {
		response: 5000,
		deadline: 30000
	}
}) {
	const {
		url,
		header,
		data,
		type,
		timeout
	} = sdata
	app.once('postCallback', function(event, data) {
		console.log(data)
	})
	app.send('post', {
		url: url,
		header: header,
		data: data,
		timeout: timeout,
		// query || json
		type: type,
		callback: 'postCallback'
	})
}

function get(sdata = {
	url: 'www.baidu.com',
	header: null,
	data: {
		'test': 'test'
	},
	timeout: {
		response: 5000,
		deadline: 30000
	}
}) {
	const {
		url,
		header,
		data,
		timeout
	} = sdata
	app.once('getCallback', function(event, data) {
		console.log(data)
	})
	app.send('get', {
		url: url,
		header: header,
		data: data,
		timeout: timeout,
		callback: 'getCallback'
	})
}

function loadFile() {
	app.once('loadFileCallback', function(event, data) {
		alert(data)
	})
	app.send('loadFile', {
		url: '/Users/jecshcier/Documents/jecshcier/project/nodejs/cherry2/core/test.txt',
		callback: 'loadFileCallback'
	})
}

function getFilesUrl() {
	// 这里需要移除监听事件，否则监听事件被重复添加，会重复执行
	app.removeAllListeners('getFilesUrlSuccess')
	app.removeAllListeners('getFilesUrlCancel')
	app.once('getFilesUrlSuccess', function(event, data) {
		alert(data)
	})
	app.once('getFilesUrlCancel', function(event, data) {
		// 这里需要移除监听事件，否则监听事件被重复添加，会重复执行
		alert("用户取消")
	})
	app.send('getFilesUrl', {
		success: 'getFilesUrlSuccess',
		cancel: 'getFilesUrlCancel',
		// type - file/dir
		type:'file'
	})
}

function createFile() {
	app.once('createFileCallback', function(event, data) {
		console.log(data)
	})
	app.send('createFile', {
		url: '/Users/jecshcier/Documents/jecshcier/project/nodejs/cherry2/core/test.txt',
		content: "测试",
		base64: false,
		callback: 'createFileCallback'
	})
}

function createFolder() {
	app.once('createFolderCallback', function(event, data) {
		console.log(data)
	})
	app.send('createFolder', {
		url: '/Users/jecshcier/Documents/jecshcier/project/nodejs/cherry2/core/okoko',
		callback: 'createFolderCallback'
	})
}

function urlIsExist() {
	app.once('urlIsExistCallback', function(event, data) {
		console.log(data)
	})
	app.send('urlIsExist', {
		url: '/Users/jecshcier/Documents/jecshcier/project/nodejs/cherry2/core/',
		callback: 'urlIsExistCallback'
	})
}

function deleteFile() {
	app.once('deleteFileCallback', function(event, data) {
		console.log(data)
	})
	app.send('deleteFile', {
		url: '/Users/jecshcier/Documents/jecshcier/project/nodejs/cherry2/core/okoko',
		callback: 'deleteFileCallback'
	})
}

function deleteFolder() {
	app.once('deleteFolderCallback', function(event, data) {
		console.log(data)
	})
	app.send('deleteFolder', {
		url: '/Users/jecshcier/Documents/jecshcier/project/nodejs/cherry2/core/okoko',
		callback: 'deleteFolderCallback'
	})
}

function copyFile() {
	app.once('copyFileCallback', function(event, data) {
		console.log(data)
	})
	app.send('copyFile', {
		url: '/Users/jecshcier/Documents/jecshcier/project/nodejs/cherry2/core/okoko',
		targetUrl: '/Users/jecshcier/Desktop/okoko',
		overwirte: false,
		callback: 'copyFileCallback'
	})
}


function moveFile() {
	app.once('moveFileCallback', function(event, data) {
		console.log(data)
	})
	app.send('moveFile', {
		url: '/Users/jecshcier/Documents/jecshcier/project/nodejs/cherry2/core/okoko',
		targetUrl: '/Users/jecshcier/Desktop/okoko',
		overwirte: false,
		callback: 'moveFileCallback'
	})
}

function getFolder() {
	app.once('getFolderCallback', function(event, data) {
		console.log(data)
	})
	app.send('getFolder', {
		url: '/Users/jecshcier/Documents/jecshcier/project/nodejs/cherry2/core/okoko',
		callback: 'getFolderCallback'
	})
}

function getFileStats() {
	app.once('getFileStatsCallback', function(event, data) {
		console.log(data)
	})
	app.send('getFileStats', {
		url: '/Users/jecshcier/Documents/jecshcier/project/nodejs/cherry2/core/okoko',
		callback: 'getFileStatsCallback'
	})
}

function openFile() {
	app.once('openFileCallback', function(event, data) {
		console.log(data)
	})
	app.send('openFile', {
		url: '/Users/jecshcier/Documents/jecshcier/project/nodejs/cherry2/core/test.txt',
		callback: 'openFileCallback'
	})
}

function maximization() {
	app.send('Maximization')
}

function minimize() {
	app.send('minimize')
}

function fullscreen() {
	app.send('fullscreen')
}

function exit() {
	app.send('exit')
}

function killProcess() {
	app.once('killProcessCallback', function(event, data) {
		console.log(data)
	})
	app.send('killProcess', {
		pid: 1,
		callback: 'killProcessCallback'
	})
}

function getSystemCode() {
	app.once('getSystemCodeCallback', function(event, data) {
		console.log(data)
	})
	app.send('getSystemCode', {
		callback: 'getSystemCodeCallback'
	})
}

function registerWebview() {
	app.send('registerWebview', {
		id: 'webview2',
		style: {
			position: 'absolute',
			top: '0',
			left: '0',
			width: '50%',
			height: '50%'
		},
		src: 'webview.html'
	})
}

function removeWebview() {
	app.send('removeWebview', {
		id: 'webview2'
	})
}

function getWebviewList() {
	app.once('getWebviewListCallback', function(event, data) {
		console.log(data)
	})
	app.send('getWebviewList', {
		callback: 'getWebviewListCallback'
	})
}

function addWebviewDevTools() {
	app.send('addWebviewDevTools', {
		id: 'mainWebview'
	})
}

let systemKey = 0

function getSystemKey(_this) {
	app.once('getSystemKeyCallback', function(event, data) {
		console.log(data)
		systemKey = data
		_this.innerHTML = systemKey
	})
	app.send('getSystemKey', {
		callback: 'getSystemKeyCallback'
	})
}

function execCmd() {
	app.once('execCommandCallback', function(event, data) {
		console.log(data)
	})
	app.send('execCommand', {
		command: 'ls',
		options: {
			cwd: '/Users/jecshcier/Documents/jecshcier/project/nodejs/blog',
			env: null,
			windowsHide: false,
			maxBuffer: 200 * 1024
		},
		systemKey: systemKey,
		callback: 'execCommandCallback'
	})
}

function downloadFile() {
	const url = document.getElementById("downloadUrl").value
	app.removeAllListeners('getFilesUrlSuccess')
	app.once('getFilesUrlSuccess', function(event, data) {
		app.send('downloadFile', {
			saveDir: data,
			url:url
		})
	})
	app.send('getFilesUrl', {
		success: 'getFilesUrlSuccess'
	})
}