const {
	dialog
} = require('electron')
const fs = require('fs-extra')


module.exports = (ipcMain) => {
	ipcMain.on('loadFile', (event, data) => {
		// 需要执行的操作
		dialog.showOpenDialog({
			properties: ['openFile']
		}, async (filePaths) => {
			try{
				const fileData = await fs.readFile(filePaths[0])
				event.sender.send(data.callback,fileData)
			}catch(err){
				event.sender.send(data.callback,{
					err:1,
					message:err
				})
			}
		})
	})
}