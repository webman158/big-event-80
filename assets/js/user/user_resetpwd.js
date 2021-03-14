$(function () {
  let form = layui.form;
  let layer = layui.layer;

  // ================ 添加表单校验规则 ================
  form.verify({
    // 密码校验规则
    // 数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],

    // samePass 新密码和原密码不能相同的校验规则
    samePass: (value) => {
      // 获取到新密码  value
      // 获取到原密码  $("[name=oldPwd]").val()

      // console.log(value);
      // console.log($("[name=oldPwd]").val());

      if (value === $("[name=oldPwd]").val()) {
        return "新旧密码不能相同";
      }
    },

    // rePass 确认新密码和新密码必须要一致
    rePass: (value) => {
      // value; 确认新密码
      // 新密码 $("[name=newPwd]").val()

      if (value !== $("[name=newPwd]").val()) {
        return "两次输入的新密码不一致";
      }
    },
  });

  // ================ 实现重置密码 ================
  $("#form").submit(function (e) {
    e.preventDefault();

    // 收集表单数据
    let data = $(this).serialize();

    axios.post("/my/updatepwd", data).then((res) => {
      // console.log(res);

      if (res.data.status !== 0) {
        return layer.msg(res.data.message);
      }

      // 修改密码成功
      layer.msg("修改密码成功");

      // 重置表单
      $("#form")[0].reset();
    });
  });
});
