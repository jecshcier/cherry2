const fs = require('fs-extra')
const util = require('util')
const path = require('path')
const child = require('child_process')
const callbackObj = require('./callback_obj')
const request = require('superagent')
const {
	dialog,
	app
} = require('electron')
const webviewList = {}
const systemKey = parseInt(Math.random() * 900000 + 100000, 10)


module.exports = (ipcMain, win) => {

	// get请求
	ipcMain.on('get', async (event, data) => {
		let r = request.get(data.url)
		if (data.header) {
			r.set(data.header)
		}
		if (data.data) {
			r.query(data.data)
		}
		if (data.timeout) {
			r.timeout(data.timeout)
		}
		r.then(res => {
			event.sender.send(data.callback, res)
		}, err => {
			event.sender.send(data.callback, callbackObj.error(err))
		})
	})

	// post请求
	ipcMain.on('post', async (event, data) => {
		let r = request.post(data.url)
		if (data.header) {
			r.set(data.header)
		}
		if (data.data) {
			if (data.type === 'query') {
				r.query(data.data)
			} else {
				r.send(data.data)
			}
		}
		if (data.timeout) {
			r.timeout(data.timeout)
		}

		r.then(res => {
			event.sender.send(data.callback, res)
		}, err => {
			event.sender.send(data.callback, callbackObj.error(err))
		})
	})


	// 获取文件路径
	ipcMain.on('getFilesUrl', async (event, data) => {
		let filePath = dialog.showOpenDialog({
			'properties': ['openFile', 'openDirectory', 'multiSelections', 'createDirectory', 'promptToCreate']
		})
		if (filePath) {
			event.sender.send(data.success, filePath)
		} else {
			event.sender.send(data.cancel, filePath)
		}
	})

	// 创建文件/图片
	ipcMain.on('createFile', async (event, data) => {
		try {
			if (data.base64) {
				const buf = Buffer.from(data.content, 'base64')
				await fs.ensureFile(data.url)
				await fs.outputFile(data.url, buf)
			} else {
				await fs.outputFile(data.url, data.content)
			}
			event.sender.send(data.callback)
		} catch (err) {
			console.log(err)
			event.sender.send(data.callback, callbackObj.error(err))
		}
	})

	// 创建文件夹
	ipcMain.on('createFolder', async (event, data) => {
		try {
			await fs.ensureDir(data.url)
			event.sender.send(data.callback)
		} catch (err) {
			event.sender.send(data.callback, callbackObj.error(err))
		}
	})

	// 判断url是否存在
	ipcMain.on('urlIsExist', async (event, data) => {
		try {
			const exists = await fs.pathExists(data.url)
			event.sender.send(data.callback, exists)
		} catch (err) {
			event.sender.send(data.callback, callbackObj.error(err))
		}
	})

	// 删除文件/文件夹
	ipcMain.on('deleteFile', async (event, data) => {
		try {
			await fs.remove(data.url)
			event.sender.send(data.callback)
		} catch (err) {
			console.log(err)
			event.sender.send(data.callback, callbackObj.error(err))
		}
	})

	// 复制文件/文件夹
	ipcMain.on('copyFile', async (event, data) => {
		try {
			await fs.copy(data.url, data.targetUrl, {
				overwrite: data.overwrite || true,
				errorOnExist: !data.overwrite || false
			})
			event.sender.send(data.callback)
		} catch (err) {
			console.log(err)
			event.sender.send(data.callback, callbackObj.error(err))
		}
	})

	// 移动文件/文件夹
	ipcMain.on('moveFile', async (event, data) => {
		try {
			await fs.move(data.url, data.targetUrl, {
				overwrite: data.overwrite || false
			})
			event.sender.send(data.callback)
		} catch (err) {
			console.log(err)
			event.sender.send(data.callback, callbackObj.error(err))
		}
	})

	// 获取文件夹内文件、文件夹
	ipcMain.on('getFolder', async (event, data) => {
		const readDir = util.promisify(fs.readdir)
		try {
			const files = await readDir(data.url)
			event.sender.send(data.callback, files)
		} catch (err) {
			console.log(err)
			event.sender.send(data.callback, callbackObj.error(err))
		}

	})

	// 读取文件
	ipcMain.on('loadFile', async (event, data) => {
		// 需要执行的操作
		try {
			const fileData = await fs.readFile(data.url)
			event.sender.send(data.callback, fileData)
		} catch (err) {
			console.log(err)
			event.sender.send(data.callback, callbackObj.error(err))
		}
	})

	// 获取文件信息
	ipcMain.on('getFileStats', async (event, data) => {
		const getStats = util.promisify(fs.stat)
		try {
			const stats = await getStats(data.url)
			stats.isDirectory = stats.isDirectory()
			stats.isFile = stats.isFile()
			stats.isSymbolicLink = stats.isSymbolicLink()
			event.sender.send(data.callback, stats)
		} catch (err) {
			console.log(err)
			event.sender.send(data.callback, callbackObj.error(err))
		}
	})

	// 打开文件
	ipcMain.on('openFile', async (event, data) => {
		let url = path.normalize(data.url)
		let p
		if (process.platform !== "darwin") {
			url = '"' + url + '"'
			p = child.exec('start "" ' + url, (error, stdout, stderr) => {
				if (error) {
					event.sender.send(data.callback, callbackObj.error(error))
				}
				console.log(stdout)
			})
		} else {
			p = child.execFile('open', [url], (error, stdout, stderr) => {
				if (error) {
					event.sender.send(data.callback, callbackObj.error(error))
				}
				console.log(stdout)
			})
		}
		p.on('close', (code) => {
			"use strict"
			console.log('线程结束标识：' + code)
			event.sender.send(data.callback)
		})
	})

	// 删除进程
	ipcMain.on('killProcess', async (event, data) => {
		try {
			process.kill(data.pid)
		} catch (err) {
			console.log(err)
			event.sender.send(data.callback, callbackObj.error(err))
		}
		event.sender.send(data.callback);
	})

	ipcMain.on('getSystemCode', async (event, data) => {
		event.sender.send(data.callback, process.platform);
	})

	ipcMain.on('getWebviewList', async (event, data) => {
		event.sender.send('getWebviewListCallback', webviewList)
	})


	ipcMain.on('registerWebview', async (event, data) => {
		webviewList[data.id] = {
			id: data.id,
			style: data.style,
			src: data.src
		}
		// 这里是直接向窗口发送消息
		win.webContents.send('registerWebviewCallback', data)
	})

	ipcMain.on('removeWebview', async (event, data) => {
		delete webviewList[data.id]
		// 这里是直接向窗口发送消息
		win.webContents.send('removeWebviewCallback', data)
	})

	ipcMain.on('addWebviewDevTools', async (event, data) => {
		console.log(data)
		win.webContents.send('addWebviewDevTools', data)
	})

	ipcMain.on('getSystemKey', async (event, data) => {
		event.sender.send(data.callback, systemKey)
	})

	ipcMain.on('execCommand', async (event, data) => {
		if (typeof(data) === 'string') {
			try {
				data = JSON.parse(decodeURI(data))
			} catch (err) {
				console.log(err)
				return false
			}
		}
		if (data.systemKey !== systemKey) {
			event.sender.send(data.callback, callbackObj.error('systemKey不正确'))
			return false
		}
		child.exec(data.command, data.options, (error, stdout, stderr) => {
			if (error) {
				console.log(error)
				event.sender.send(data.callback, callbackObj.error(error))
			}
			event.sender.send(data.callback, stdout)
		})
	})

	ipcMain.on('downloadFile', async (event, data) => {
		console.log(data)
		let p = child.fork(`${path.join(__dirname,'download.js')}`, [], {})
		p.on('message', function(m) {
			console.log(m)
		})
		p.on('close', (code) => {
			console.log("process EXIT code:" + code)
		})
		p.send({
			url: data.url,
			saveDir: data.saveDir
		})
	})


	// window操作

	// 最大化
	ipcMain.on('Maximization', async (event, data) => {
		win.maximize()
	})

	// 最小化
	ipcMain.on('minimize', async (event, data) => {
		win.minimize()
	})

	// 全屏
	ipcMain.on('fullscreen', async (event, data) => {
		if (!win.isFullScreen()) {
			win.setFullScreen(true)
		} else {
			win.setFullScreen(false)
		}
	})

	// 退出
	ipcMain.on('exit', async (event, data) => {
		app.quit()
	})
}