// 放置ajax优化代码

// 优化1. 优化根路径  ==> axios的使用： 全局配置根路径
axios.defaults.baseURL = "http://api-breakingnews-web.itheima.net";

// 优化2: 优化headers请求头携带 Authorization 身份认证信息 ==> axios的拦截器
// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么 config 是配置信息

    // 在发送请求之前，可以对配置信息config做处理，添加上请求头的Authorization 身份认证信息

    if (config.url.indexOf("/my") !== -1) {
      // Authorization的值token，token的值是在登录的时候，存储到本地
      config.headers.Authorization = localStorage.getItem("token");
    }

    // console.log("发送请求之前做的事情 ", config);

    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 优化03：添加访问的权限（没有登录就无法访问index页面）

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么

    // console.log("拦截器- 数据响应回来了 ", response); // response 响应回来的数据

    // 只要发现 status: 1 和 message: "身份认证失败！", 就跳转回到登录页面, 重新登录去
    if (
      response.data.status === 1 &&
      response.data.message === "身份认证失败！"
    ) {
      // token信息给删除掉
      localStorage.removeItem("token");

      // 跳转操作
      location.href = "/login.html";
    }

    return response;
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);
