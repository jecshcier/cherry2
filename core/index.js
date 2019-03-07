const {
	app,
	BrowserWindow,
	ipcMain,
	Menu,
	shell
} = require('electron')
const url = require('url')
const path = require('path')
const util = require('util')
const CONFIG = require(path.join(__dirname, `../app/config`))



let mainWindow

app.on('ready', () => {

	// 创建主窗口
	mainWindow = new BrowserWindow(CONFIG.window)

	let defaultUrl = url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file:',
		slashes: true
	})

	mainWindow.loadURL(defaultUrl)

	mainWindow.on('close', (event) => {
		if (!mainWindow._closed && process.platform === 'darwin') {
			event.preventDefault()
			mainWindow.hide()
			return;
		}
		mainWindow = null
	})

	// 去除默认菜单

	if (process.platform !== 'darwin') {
		mainWindow.setMenu(null)
	} else {
		let template = [{
			label: 'cherry2',
			submenu: [{
				label: '退出',
				accelerator: 'CmdOrCtrl+Q',
				role: 'quit'
			}]
		}, {
			label: '操作',
			submenu: [{
				label: '复制',
				accelerator: 'CmdOrCtrl+C',
				role: 'copy'
			}, {
				label: '粘贴',
				accelerator: 'CmdOrCtrl+V',
				role: 'paste'
			}, {
				label: "全选",
				accelerator: "CmdOrCtrl+A",
				role: "selectAll"
			}]
		}, {
			label: '窗口',
			role: 'window',
			submenu: [{
				label: '最小化',
				accelerator: 'CmdOrCtrl+M',
				role: 'minimize'
			}, {
				label: '关闭',
				accelerator: 'CmdOrCtrl+W',
				role: 'close'
			}]
		}, {
			label: '帮助',
			role: 'help',
			submenu: [{
				label: '作者',
				click: function() {
					shell.openExternal('https://blog.cshayne.cn')
				}
			}]
		}]
		const menu = Menu.buildFromTemplate(template)
		Menu.setApplicationMenu(menu) // 设置菜单部分
	}

	// 开启监听
	require('./apps/ipc_listener')(ipcMain, mainWindow)
})

// app监听窗口关闭事件
app.on('window-all-closed', () => {
	// 判断是否为mac os，若为mac os 启用command+q
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	// 此处为了适应mac os的dock
	if (!mainWindow.isVisible()) {
		mainWindow.show()
	}
})

app.on('before-quit', () => {
	mainWindow._closed = true
})