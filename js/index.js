"use strict";
var _a;
//创建HTML标签的基础类
class createHtmlEle {
    constructor() { }
    addCssStyle(ele, obj) {
        for (let key in obj) {
            ele.style[key] = obj[key];
        }
        return ele;
    }
    createDiv(text, row) {
        let div = document.createElement('div');
        const obj = row;
        div = this.addCssStyle(div, row);
        div.innerHTML = text;
        return div;
    }
    creatButton(text, btnCss = {
        width: '120px',
        height: '35px',
        background: '#007ff1',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        marginLeft: '20px'
    }) {
        let btn = document.createElement('button');
        btn = this.addCssStyle(btn, btnCss);
        btn.innerHTML = text;
        return btn;
    }
}
//创建dialog的基础类，继承了创建HTML标签的类
class DialogBox extends createHtmlEle {
    constructor(width, //dialog的宽度
    height, //dialog的高度
    content, //dialog的内容信息
    handleConfirm, //确认按钮的回调函数
    title = '对话框' //对话框的标题，默认值为对话框
    ) {
        super();
        this.width = width;
        this.height = height;
        this.title = title;
        this.content = content;
        this.handleConfirm = handleConfirm;
    }
    openBox() {
        const parent = this.creatParent();
        const child = this.creatChild(parent);
        parent.appendChild(child);
        document.body.appendChild(parent);
    }
    close() {
        const parent = document.getElementById('parent');
        document.body.removeChild(parent);
    }
    createTitle() {
        let div = document.createElement('div');
        div.innerHTML = this.title;
        div.style.borderBottom = "1px solid #e0e0e0";
        div.style.width = "100%";
        div.style.textAlign = "center";
        div.style.padding = "0 0 10px 0";
        return div;
    }
    creatChild(parent) {
        const contentDivStyle = {
            width: '100%',
            height: parseInt(this.height) - 60 + 'px',
            padding: '10px 15px',
            boxSizing: 'border-box'
        };
        const footDiv = this.createDiv('', {
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            boxSizing: 'border-box',
            padding: '0 15px'
        });
        const ChildStyle = {
            background: '#fff',
            position: 'fixed',
            top: '50%',
            left: '50%',
            width: this.width,
            height: this.height,
            marginTop: -parseInt(this.height) / 2 + 'px',
            marginLeft: -parseInt(this.width) / 2 + 'px',
            borderRadius: '5px',
            padding: '10px 0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        };
        const title = this.createTitle();
        const confirmBtn = this.creatButton('确认');
        let cancelBtn = this.creatButton('关闭', {
            width: '120px',
            height: '35px',
            background: '#edb569',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            marginLeft: '20px'
        });
        const contentDiv = this.createDiv(this.content, contentDivStyle);
        let child = this.createDiv('', ChildStyle);
        child.setAttribute('id', 'child');
        footDiv.append(confirmBtn);
        footDiv.append(cancelBtn);
        child.append(title);
        child.append(contentDiv);
        child.appendChild(footDiv);
        cancelBtn.addEventListener('click', this.close);
        confirmBtn.addEventListener('click', this.handleConfirm);
        return child;
    }
    creatParent() {
        let parent = document.createElement('div');
        parent.setAttribute('id', 'parent');
        parent.style.position = 'fixed';
        parent.style.top = '0';
        parent.style.background = 'rgba(0,0,0,.5)';
        parent.style.width = '100%';
        parent.style.height = '100%';
        return parent;
    }
}
//封装的简单的HTTP请求
function $http(url, data, method = "get") {
    return new Promise((resove, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let res = xhr.response;
                res = JSON.parse(res);
                resove(res.data);
            }
        };
        xhr.open(method, url, true);
        xhr.send();
    });
}
const url = "https://www.easy-mock.com/mock/5f572df097c9fd60c1dcdab4/YWBLOG/artical/list";
let dialog = new DialogBox('500px', '150px', '确定要删除吗？', doSomething, '我是对话框');
let btn = document.getElementById('button');
(_a = btn) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
    dialog.openBox();
});
function doSomething() {
    var _a;
    dialog.close();
    (_a = $http(url, { a: 1, b: 2 })) === null || _a === void 0 ? void 0 : _a.then((res) => {
        console.log(res);
    });
}
//# sourceMappingURL=index.js.map