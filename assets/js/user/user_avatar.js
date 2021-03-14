$(function () {
  // =================== 初始化裁剪区域 ===================

  // 1.1 获取裁剪区域的 DOM 元素
  let $image = $("#image");

  // 1.2 配置选项
  let options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: ".img-preview",
  };

  // 1.3 创建裁剪区域
  $image.cropper(options);

  // =================== 上传按钮点击功能 ===================
  $("#btnChooseImage").click(function () {
    $("#file").click();
  });

  // 文件域 change 事件 ==> 当选择的文件发生改变的时候会触发该事件
  $("#file").on("change", function () {
    // 1. 需要获取到选择的文件 ==> 文件域的DOM对象有files属性
    let file = this.files[0];
    // console.log(file);

    // 如果用户没有选择文件，那么后续代码不用执行
    if (!file) {
      return;
    }

    // 2. 通过裁剪图片插件，将选择的图片处理好（放到裁剪区域，预览区域）
    // 根据选择的文件，为文件对象创建一个对应的url 地址：
    let newImgURL = URL.createObjectURL(file);

    $image
      .cropper("destroy") // 销毁旧的裁剪区域
      .attr("src", newImgURL) // 重新设置图片路径
      .cropper(options); // 重新初始化裁剪区域
  });

  // =================== 确定按钮 ===================
  $("#btnCreateAvatar").click(function () {
    // 剪裁得到一张图片（canvas图片）
    let base64Str = $image.cropper("getCroppedCanvas", {
      // 创建一个 Canvas 画布
      width: 100,
      height: 100,
    });

    // 把图片转成base64格式
    let dataURL = base64Str.toDataURL("image/png"); // 把canvas图片转成base64格式的字符串
    // console.log("🚀 ~ file: user_avatar.js ~ line 55 ~ dataURL", dataURL);

    // 以下写法有问题：
    // dataURL 是base64字符串，其中含有特殊符号，需要将其编码处理 encodeURIComponent
    /* axios.post("/my/update/avatar", "avatar=" + dataURL).then((res) => {
      console.log(res);
    }); */

    axios
      .post("/my/update/avatar", "avatar=" + encodeURIComponent(dataURL))
      .then((res) => {
        // console.log(res);

        if (res.data.status !== 0) {
          return layer.msg("更换头像失败");
        }

        layer.msg("更换头像成功");

        window.parent.getUserInfo();
      });
  });
});
