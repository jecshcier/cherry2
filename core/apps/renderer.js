const path = require('path')
const CONFIG = require(path.join(__dirname, `../app/config`))
const defaultUrl = path.join(__dirname, `../${CONFIG.webview.root}/${CONFIG.webview.defaultUrl}`)


onload = () => {
	const mainWebview = createWebview('mainWebview', {
		position: 'absolute',
		top: '0',
		left: '0',
		width: '100%',
		height: '100%'
	})

	document.body.appendChild(mainWebview)
	mainWebview.addEventListener('dom-ready', () => {
		mainWebview.openDevTools()
	})

}

function createWebview(id, style, src) {
	const webview = document.createElement('webview')
	webview.id = id
	console.log(style)
	for (let i in style) {
		webview.style[i] = style[i]
	}
	webview.preload = './apps/preload.js'
	webview.src = defaultUrl
	return webview
}