### copyText(text)

用来对元素进行重置,使用于canvas生成二维码,重复生成的问题

```
k.resetElement("imgCon"); //reset
k.resetElement("imgCon1"); //new
```
- 参数 (text) 
    - text 要复制的文本

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

> image类型的文件在mime中必须带有"image"字段

### imageDownload(id, filename)

获取dom的url的image图片进行下载

```
k.imageDownload(url,"默认图片.png");
```
- 参数 (id, filename) 
    - id <div id="Own">，元素的id属性
    - filename 下载文件的名称
   
### resetElement(id)

获取dom的url的image图片进行下载

```
k.resetElement(id);
```
- 参数 (id, filename) 
    - id <div id="Own">，元素的id属性
    
### formatMoney(money, place)

将金额转英文计算样式

```
k.formatMoney();
```
- 参数 (money, place) 
    - money 需要格式的钱
    - place 保留的位数
