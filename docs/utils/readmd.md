### resetElement

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
