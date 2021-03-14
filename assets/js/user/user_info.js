// 发送ajax请求 axios优化代码

$(function () {
  // 处理layui的form
  let form = layui.form;

  // ================ 发送ajax请求 ================
  userinfo();
  function userinfo() {
    // 步骤：1. 发送ajax请求， 获取用户的基本信息
    // 步骤：2. 把用户的基本信息填充到form表单中
    //    让用户在信息的基础上进行修改
    axios.get("/my/userinfo").then((res) => {
      // console.log(res);

      // 给表单赋值
      // form 即 class="layui-form" 所在元素属性 lay-filter="" 对应的值
      // form.val("form", 数据);

      // 注意点：虽然使用简单，但有前提条件：数据里面的key必须要和表单元素的name的值要对应起来
      form.val("form", res.data.data);
    });
  }

  // ================ 对表单进行校验 ================
  form.verify({
    // leg： 昵称的长度限制 1-6字符
    len: function (value, item) {
      // value：表单的值、item：表单的DOM对象
      // console.log(value);

      if (value.length > 6) {
        return "昵称的长度需要在1-6字符之间";
      }
    },
  });

  // ================ 实现修改功能 ================
  $("#form").on("submit", function (e) {
    e.preventDefault();

    let data = $(this).serialize();

    // ajax请求
    axios.post("/my/userinfo", data).then((res) => {
      // console.log(res);

      if (res.data.status !== 0) {
        // 失败了
        return layer.msg(res.data.message);
      }

      // 修改成功了
      layer.msg("修改用户信息成功");

      // console.log($("#welcome")); // 获取不到该元素
      // console.log(window.parent); // 获取到父页面

      // 还要修改昵称
      window.parent.getUserInfo(); // 父页面的getUserInfo方法可以实现获取用户信息并渲染展示
    });
  });

  // ================ 实现重置功能 ================
  $("#btnReset").click(function (e) {
    e.preventDefault();

    // 重新发送ajax请求，获取到用户信息，重新填充到表单中
    userinfo();
  });
});
