const path = require('path')
const CONFIG = require(path.join(__dirname, `../app/config`))
const rootUrl = path.join(__dirname, `../${CONFIG.webview.root}`)
const {
	ipcRenderer
} = require('electron')
const webviewList = []

onload = () => {
	let id = 'mainWebview'
	let style = {
		position: 'absolute',
		top: '0',
		left: '0',
		width: '100%',
		height: '100%'
	}
	let src = CONFIG.webview.defaultUrl
	ipcRenderer.send('registerWebview', {
		id: id,
		style: style,
		src: src
	})
}

function createWebview(id, style, src) {
	let webview = document.createElement('webview')
	webview.id = id
	for (let i in style) {
		webview.style[i] = style[i]
	}
	webview.preload = './apps/preload.js'
	webview.src = src
	return webview
}

function deleteWebview(id) {
	let webview = document.getElementById(id)
	document.body.removeChild(webview)
}

ipcRenderer.on('registerWebviewCallback', (event, data) => {
	console.log(data)
	let url = path.normalize(`${rootUrl}/${data.src}`)
	let webview = createWebview(data.id, data.style, url)
	document.body.appendChild(webview)
	webview.addEventListener('dom-ready', () => {
        webview.openDevTools()
        // webview.loadURL();
    })
})

ipcRenderer.on('removeWebviewCallback', (event, data) => {
	deleteWebview(data.id)
})

ipcRenderer.on('addWebviewDevTools', (event, data) => {
	console.log(data)
	let webview = document.getElementById(data.id)
	if (webview.isDevToolsOpened()) {
		webview.closeDevTools()
	} else {
		webview.openDevTools()
	}
})