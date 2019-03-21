### resetElement(id)

用来对元素进行重置,使用于canvas生成二维码,重复生成的问题

```
k.resetElement("imgCon"); //reset
k.resetElement("imgCon1"); //new
```
- 参数 (id) 
    - id 元素的id值
- 返回值
    - "reset"当前元素已存在,进行了重置操作
    - "new"当前元素不存在

### fileDownload(data,filename,mime)

用来进行文件的下载

请求文件后的数据
```
axios.get({}).then(data=>{
 k.fileDownload(data, "统计.xlsx");
})
```

base64图片/url图片的下载
```
let img = document.getElementsByClassName(i)[0];
k.fileDownload(img.src, "二维码.png", "image");
```

- 参数
    - data文件数据
    - filename下载的文件名称
    - mine文件类型
- 返回值(无)
