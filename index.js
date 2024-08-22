var glob = require("glob")
var fs = require("fs")
var path = require("path"); 

glob("./audio/**/*.{mp3,wav,flac}", {}, function (er, files) {
  if (er) {
    console.error('Error in glob:', er);
    return;
  }

  let albums = []; 
  let albumMap = {};
  let download = '';

  files.forEach(item => {
    let fileInfo = fs.statSync(item);
    if (fileInfo.size / (1024 * 1024) < 20) { // 小于20M
      let dirname = path.dirname(item); // 获取文件所在的目录  ./audio/Ang 5.0
      let basename = path.basename(item, path.extname(item)); // 获取文件名（无扩展名）
      let arr = item.split('/')
      let albumTitle = arr[2];
      // 如果该目录尚未在结果对象中，则初始化一个空数组
      let album = albumMap[albumTitle];
      if (!album) {
        album = {
          artist: "张韶涵", // 艺术家名，这里假设是固定的，也可以从文件名或目录结构中提取
          album: albumTitle, // 专辑名
          publish: "2019-08", 
          company: "待完善", 
          cover: 'https://testingcf.jsdelivr.net/gh/EternalDung/song@a10/audio/' + arr[2] + '/cover.png',
          intro: "待完善", // 专辑简介
          songs: [] // 歌曲集合
        };
        albums.push(album);
        albumMap[albumTitle] = album; 
      }


      // 将文件信息添加到对应目录的数组中
      album.songs.push({
        title: basename,
        artist: "张韶涵",
        album: arr[2], // 假设文件夹名是专辑名
        url: 'https://testingcf.jsdelivr.net/gh/EternalDung/song@a10' + item.slice(1),
      });

      download += `https://testingcf.jsdelivr.net/gh/EternalDung/song@a10${item.slice(1)}\n`;
    } else {
      console.log('文件大于20M：', item);
    }
  });

  // 写入JSON文件
  fs.writeFileSync('./audio/list.js', JSON.stringify(albums, null, 2)); // 使用缩进美化输出

  // 写入下载列表
  fs.writeFileSync('./audio/download.txt', download);
});