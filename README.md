### exanple
1.引入js文件
```
<script src='./circle.js'></script>
```
2.添加html代码
```html
<canvas id="canvasExp"></canvas>
```
3.添加js代码
```js
new DrawCanvas({
        id: 'canvasExp',
	width: 200,
	height: 200,
        percent: 60,
	font: '22px SimSong',
        num: 55,
        text: '用户示例',
    }).init();
```
