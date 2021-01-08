// css 转义
// http://tool.mkblog.cn/autoprefixer/

// svg 通过img引入并更改颜色 https://codepen.io/sosuke/pen/Pjoqqp
var app = new Vue({
  el: "#app",
  created: function () {
    // let ws = new ReconnectingWebSocket("ws://127.0.0.1:30400");
    let that = this;
    const router = new VueRouter(function () {
      that._switchPage("main");
      that.switchRouter("main");
    });
    this.routerCtrl = router;
    router.route("/main", function () {
      that._switchPage("main");
      console.log("main");
    });
    router.route("/tx/:id", function (params) {
      that._switchPage("tx");
      let txID = params.slice(params.lastIndexOf("/") + 1);
      console.log("tx id is ", txID);
    });
    router.route("/name", function () {
      that._switchPage("name");
      console.log("router name");
    });
  },
  data: {
    pages: {
      main: true,
      tx: false,
      name: false,
    },
    message: "Hello shaokun",
    routerCtrl: null,
  },
  methods: {
    switchRouter: function (action, parmas) {
      this.routerCtrl.switchRouter(action, parmas);
    },
    _switchPage: function (_page) {
      for (let page of Object.keys(this.pages)) {
        if (page === _page) {
          this.pages[page] = true;
        } else {
          this.pages[page] = false;
        }
      }
    },
  },
});
