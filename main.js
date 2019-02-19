const {
	app,
	BrowserWindow,
	ipcMain
} = require('electron')
const url = require('url')
const path = require('path')
const util = require('util')
require('./ipc_listener')(ipcMain)



let mainWindow

app.on('ready', () => {

	// 创建主窗口
	mainWindow = new BrowserWindow({
		minWidth: 800,
		minHeight: 600,
		width: 800,
		height: 600,
		title: "electron",
		center: true,
		fullscreen: false,
		fullscreenable: true
	})
	
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