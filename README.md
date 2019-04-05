
### 安装
```
npm install kiana-js --save
```

### 安装配套插件
```
npm install babel-plugin-kiana-demand-loading --save-dev
```

### 修改.babelrc
```
  "plugins": [
    [
      "kiana-demand-loading",
      {
        "library": "kiana-js"
      }
    ],
  ]
```
