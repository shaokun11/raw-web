// css 转义
// http://tool.mkblog.cn/autoprefixer/

// svg 通过img引入并更改颜色 https://codepen.io/sosuke/pen/Pjoqqp

// js 压缩  https://tool.lu/js/index.html
function handleWs(_this) {
  // let rws = new ReconnectingWebSocket("ws://127.0.0.1:8000");
  // rws.addEventListener("open", () => {
  //   rws.send(JSON.stringify({
  //     type: "login",
  //     data: {
  //       user: "shaokun",
  //       password: "1234"
  //     }
  //   }));
  //   rws.send(JSON.stringify({
  //     type:"loginWithToken",
  //     data:{
  //       token:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50Ijoic2hhb2t1biIsImlhdCI6MTYxMjE1MTE5OCwiZXhwIjoxNjEyMTU0Nzk4fQ.XUCcHj8Sav1P8ModA-1iRZBp9bxxJSWuVcRE1f0iSKw"
  //     }
  //   }))
  //
  //   setTimeout(() => {
  //     rws.send(JSON.stringify({
  //       type: "getMe",
  //       data: {}
  //     }));
  //   }, 1000);
  // });
  // rws.addEventListener("close", () => {
  //   console.log("close");
  // });
  // rws.addEventListener("message", (message) => {
  //   console.log("message", JSON.parse(message.data));
  // });
}


new Vue({
  el: "#app",
  created: function () {
    handleWs(this)
    let that = this
    this.routerCtrl = new VueRouter()
    this.routerCtrl.route("/main", function () {
      that._switchPage("main")
      console.log("main")
    })
    this.routerCtrl.route("/tx/:id", function (params) {
      that._switchPage("tx")
      console.log("tx id is ", params)
    })
    this.routerCtrl.route("/name", function (params) {
      that._switchPage("name")
      console.log("router name", params)
    })
  },
  data: {
    pages: {
      main: true,
      tx: false,
      name: false
    },
    message: "Hello shaokun",
    routerCtrl: null
  },
  methods: {
    switchRouter: function (action, params) {
      this.routerCtrl.switchRouter(action, params)
    },
    _switchPage: function (_page) {
      for (let page of Object.keys(this.pages)) {
        this.pages[page] = page === _page
      }
    }
  }
})
