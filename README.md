# cherry2
开箱即用的electronApp。只要你会前端html+js，即可像发起ajax请求那样执行原生操作！

windows版下载：https://github.com/jecshcier/cherry2/releases/tag/win

mac版下载：https://github.com/jecshcier/cherry2/releases/tag/mac

linux需要自行编译，如有需要，可留issue或者联系我

win版静态资源目录位于：cherry2-win32-x64\resources\app

mac版静态资源目录位于：⁨cherry2⁩ ▸ ⁨Contents⁩ ▸ ⁨Resources⁩ ▸ ⁨app⁩

配置config.js文件即可。

示例代码已给出。

目前完成的接口如下：

## 网络请求：

- post请求
- get请求

## webview操作：
- 添加webview
- 删除webview
- 获取当前窗口的webview列表
- 给webview添加devtools

## 文件操作：
- 获取文件/文件夹路径
- 创建文件
- 创建文件夹
- 复制文件/文件夹
- 移动文件/文件夹
- 删除文件/文件夹
- 判断路径是否存在
- 读取文件
- 获取文件夹下所有文件、文件夹
- 获取文件/文件夹属性
- 打开文件

## window操作：
- 最大化
- 最小化
- 全屏
- 退出

## 进程操作：
- 删除进程

## 系统操作：
- 获取systemKey
- 获取当前系统标识
- 执行终端命令(执行终端命令必须获取systemkey)
