const {
	ipcRenderer
} = require('electron')

function loadFile() {
	ipcRenderer.once('loadFileCallback', function(event, data) {
		alert(data)
	})
	ipcRenderer.send('loadFile', {
		callback: 'loadFileCallback'
	})
}