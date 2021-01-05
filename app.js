// css 转义
// http://tool.mkblog.cn/autoprefixer/
var toastElList = [].slice.call(document.querySelectorAll('.toast'))
var toastList = toastElList.map(function (toastEl) {
  return new bootstrap.Toast(toastEl)
})
var app = new Vue({
  el: "#app",
  created: function () {
  
    let that = this;
    const router = new VueRouter(function () {
      console.log("not found");
      that.switchRouter("main");
    });
    router.route("/main", function () {
      that._switchRouter("main");
      console.log("main");
    });
    router.route("/tx/:id", function (params) {
      that._switchRouter("tx");
      let txID = params.slice(params.lastIndexOf("/") + 1);
      console.log("tx id is ", txID);
    });
    router.route("/name", function () {
      that._switchRouter("name");
      console.log("router name");
    });
  },
  data: {
    router: {
      main: true,
      tx: false,
      name: false,
    },
    message: "Hello shaokun",
  },
  methods: {
    _switchRouter: function (action) {
      for (let route of Object.keys(this.router)) {
        if (route === action) {
          this.router[route] = true;
        } else {
          this.router[route] = false;
        }
      }
    },

    switchRouter: function (action = "main", params = "") {
      toastr.info('hello shaokun')
      let url = !!action ? "#/" + action : "";
      if (params) url = url + "/" + params;
      var a = document.createElement("a");
      a.setAttribute("href", url);
      a.setAttribute("target", "_self");
      a.setAttribute("id", "router_id_x");
      a.click();
    },
  },
});
