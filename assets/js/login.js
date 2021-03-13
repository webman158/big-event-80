$(function () {
  // ================ 去注册按钮点击功能 ================
  $("#showReg").click(function () {
    // 显示注册界面
    $(".reg-form").show();
    // 隐藏登录界面
    $(".login-form").hide();
  });

  // ================ 去登录按钮点击功能 ================
  $("#showLogin").click(function () {
    // 隐藏注册界面
    $(".reg-form").hide();
    // 显示登录界面
    $(".login-form").show();
  });

  // ================ layui提供的自定义校验规则 ================
  // 一定不要忘记以下代码，否则使用form.verify方法会报错的
  let form = layui.form;
  // 自定义校验规则： 通过layui提供的form.verify方法可以实现
  form.verify({
    // 密码的校验规则
    // 数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],

    // 两次输入的密码必须一致
    samePass: function (value, item) {
      // value：表单的值（就是再次输入密码的内容）、item：表单的DOM对象
      // console.log(value, item);

      // 还需要获取到注册表单中的密码的内容
      let pwd = $("#regi_pass").val();

      // 两次密码进行比较判断，是否一致，如果不一致，出现提示文字
      if (value !== pwd) {
        // return 的内容就是匹配不符合的时候出现的提示文字
        return "两次输入的密码不一致";
      }
    },
  });

  // ================ 实现注册功能 ================
  // 1. 给注册的form表单注册submit事件，去阻止表单的默认行为
  // 2. ajax请求，实现注册功能

  // 说明： layer.msg方法，需要先将layer给获取，如下
  let layer = layui.layer;

  $(".reg-form").on("submit", function (e) {
    e.preventDefault();

    // 收集表单数据
    let data = $(this).serialize();

    // 发送ajax请求 jQ的$.ajax() 或者  axios
    axios
      .post("http://ajax.frontend.itheima.net/api/reguser", data)
      .then(function (res) {
        // console.log(res); // 服务器响应的结果是在 res.data

        if (res.data.status !== 0) {
          // 注册失败
          // return alert("注册失败");
          // return alert(res.data.message);
          return layer.msg(res.data.message);
        }

        // 注册成功
        // 1. 弹框提示用户
        // 2. 去显示登录界面

        // 1.
        // alert("注册成功");
        layer.msg("注册成功");

        // 2.
        $("#showLogin").click();
      });
  });

  // ================ 实现登录功能 ================
  $(".login-form").on("submit", function (e) {
    e.preventDefault();

    // axios 发送请求

    // 表单数据
    let data = $(this).serialize();

    axios
      .post("http://ajax.frontend.itheima.net/api/login", data)
      .then((res) => {
        // console.log(res);

        if (res.data.status !== 0) {
          // 登录失败
          return layer.msg("登录失败");
        }

        /* // 登录成功
        layer.msg("登录成功");
        // 跳转页面，跳转到index页面
        location.href = "/index.html"; */

        // 把服务器响应回来的 token 信息给存储到本地存储中（localStorage）
        localStorage.setItem("token", res.data.token);

        // 以上代码细节优化： layer.msg当它隐藏之后才跳转页面
        layer.msg("登录成功", function () {
          // do something
          // 跳转页面，跳转到index页面
          location.href = "/index.html";
        });
      });
  });
});
