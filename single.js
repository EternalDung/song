var glob = require("glob");
var fs = require("fs");
var path = require("path");
const { log } = require("console");

glob("./single/**/*.{mp3,wav,flac}", {}, function (er, files) {
  if (er) {
    console.error("Error in glob:", er);
    return;
  }

  let singleList = [];
  let download = "";

  files.forEach((item) => {
    let fileInfo = fs.statSync(item);
    if (fileInfo.size / (1024 * 1024) < 20) {
      // 小于20M
      let dirname = path.dirname(item); // 获取文件所在的目录  ./audio/Ang 5.0
      let basename = path.basename(item, path.extname(item)); // 获取文件名（无扩展名）
      let arr = item.split("/");
      // 如果该目录尚未在结果对象中，则初始化一个空数组
      // 将文件信息添加到对应目录的数组中
      singleList.push({
        title: basename,
        artist: "张韶涵",
        album: arr[2], // 文件夹名
        url:
          "https://testingcf.jsdelivr.net/gh/EternalDung/song@1.1" +
          item.slice(1),
        cover:
          "https://testingcf.jsdelivr.net/gh/EternalDung/song@1.1/single/" +
          arr[2] +
          "/" +
          basename +
          ".png",
        publish: "2019-03-27",
        intro: "张韶涵",
        lyric:
          "https://testingcf.jsdelivr.net/gh/EternalDung/song@1.1/single/" +
          arr[2] +
          "/" +
          basename +
          ".lrc",
      });

      download += `https://testingcf.jsdelivr.net/gh/EternalDung/song@1.1${item.slice(
        1
      )}\n`;
    } else {
      console.log("文件大于20M：", item);
    }
  });

  // 写入JSON文件
  fs.writeFileSync("./single/list-v1.js", JSON.stringify(singleList, null, 2)); // 使用缩进美化输出

  // 写入下载列表
  fs.writeFileSync("./single/download.txt", download);
});
