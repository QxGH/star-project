import Jszip from "jszip";
import FileSaver  from "file-saver";

function getBase64Image(image, callback) {
    var img = new Image();
    var canvas = document.createElement("canvas");
    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        // canvas.style.width =  img.width + "px";
        // canvas.style.height =  img.height + "px";
        canvas.getContext("2d").drawImage(img, 0, 0);
        //  console.log(img.height,img.width);
        var dataURL = canvas.toDataURL(); //使用canvas获取图片的base64数据
        callback ? callback(dataURL) : null; //调用回调函数
    };
    img.setAttribute("crossOrigin",'anonymous');
    img.src = image;
}

export default function(file_name,images){
    let zip = new Jszip();
    var array = images;
    var len = function (arr) {
        var l = 0;
        for (var key in arr){
            l++;
        }
        return l
    };
    for (let i = 0; i < array.length; i++) {
    //对每一个图片链接获取base64的数据，并使用回调函数处理
        getBase64Image(array[i], function (dataURL) {
            //对获取的图片base64数据进行处理
            var img_arr = dataURL.split(",");
            zip.file(i.toString() + ".jpg", img_arr[1], { base64: true }); //根据base64数据在压缩包中生成jpg数据
            var ziplength = len(zip.files);
            console.log(ziplength,array.length);
            console.log(zip.files);
            if (ziplength == array.length) {
            //当所有图片都已经生成打包并保存zip
                zip.generateAsync({ type: "blob" }).then(function (content) {
                    FileSaver.saveAs(content, file_name);
                });
            }
        });
    }
}