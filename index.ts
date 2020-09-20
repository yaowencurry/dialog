//按钮的基础样式接口
interface btnStyle {
  width: string,
  height: string,
  background: string,
  color: string,
  border: string,
  cursor: string,
  marginLeft: string
}

//创建HTML标签的基础类
class createHtmlEle {
  constructor() { }
  addCssStyle(ele: any, obj: any) {

    for (let key in obj) {
      ele.style[key] = obj[key]
    }

    return ele
  }

  createDiv(text: string, row: object) {
    let div: any = document.createElement('div');
    const obj: any = row;
    div = this.addCssStyle(div, row);
    div.innerHTML = text;

    return div;
  }

  creatButton(text: string, btnCss: btnStyle = {
    width: '120px',
    height: '35px',
    background: '#007ff1',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    marginLeft: '20px'
  }) {
    let btn: any = document.createElement('button');

    btn = this.addCssStyle(btn, btnCss);
    btn.innerHTML = text;

    return btn
  }
}


//创建dialog的基础类，继承了创建HTML标签的类
class DialogBox extends createHtmlEle {
  width: string
  height: string
  title: string
  content: string
  handleConfirm: Function

  constructor(
    width: string, //dialog的宽度
    height: string, //dialog的高度
    content: string, //dialog的内容信息
    handleConfirm: Function, //确认按钮的回调函数
    title: string = '对话框' //对话框的标题，默认值为对话框
  ) {
    super();
    this.width = width;
    this.height = height;
    this.title = title;
    this.content = content;
    this.handleConfirm = handleConfirm;
  }

  openBox(): void {
    const parent = this.creatParent();
    const child = this.creatChild(parent);
    parent.appendChild(child);

    document.body.appendChild(parent);
  }

  close(): void {
    const parent: any = document.getElementById('parent');
    document.body.removeChild(parent);
  }

  createTitle(): void {
    let div: any = document.createElement('div');
    div.innerHTML = this.title;
    div.style.borderBottom = "1px solid #e0e0e0";
    div.style.width = "100%";
    div.style.textAlign = "center";
    div.style.padding = "0 0 10px 0";
    return div
  }

  creatChild(parent: any) {
    const contentDivStyle: object = {
      width: '100%',
      height: parseInt(this.height) - 60 + 'px',
      padding: '10px 15px',
      boxSizing: 'border-box'
    }
    const footDiv = this.createDiv('', {
      width: '100%',
      display: 'flex',
      justifyContent: 'flex-end',
      boxSizing: 'border-box',
      padding: '0 15px'
    });
    const ChildStyle: object = {
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
    }


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

function $http(url: string, data: object, method: string = "get"): any {
  return new Promise((resove: Function, reject: Function) => {
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
  })
}


const url = "https://www.easy-mock.com/mock/5f572df097c9fd60c1dcdab4/YWBLOG/artical/list";

let dialog = new DialogBox(
  '500px', '150px',
  '确定要删除吗？',
  doSomething,
  '我是对话框'
);

let btn = document.getElementById('button');


btn?.addEventListener('click', () => {
  dialog.openBox();
})

function doSomething() {
  dialog.close();
  $http(url, { a: 1, b: 2 })?.then((res: any): void => {
    console.log(res);
  })
}
