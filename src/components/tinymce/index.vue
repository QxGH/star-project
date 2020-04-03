<template>
  <div class="tinymce-editor">
    <Editor
      v-model="myValue"
      :init="init"
      apiKey="432vqvsx3exn47k8riofge7ck78wqxfpo5h5ekwplwhy5pjl"
    ></Editor>
  </div>
</template>
<script>
import tinymce from "tinymce/tinymce";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/themes/silver";
// 编辑器插件plugins
// 更多插件参考：https://www.tiny.cloud/docs/plugins/
import "tinymce/plugins/image"; // 插入上传图片插件
import "tinymce/plugins/media"; // 插入视频插件
import "tinymce/plugins/table"; // 插入表格插件
import "tinymce/plugins/lists"; // 列表插件
import "tinymce/plugins/advlist"; // 高级列表插件
import "tinymce/plugins/wordcount"; // 字数统计插件
import "tinymce/plugins/preview"; // 预览
import "tinymce/plugins/print"; // 打印
import "tinymce/plugins/insertdatetime"; // 插入当前日期时间
import "tinymce/plugins/hr"; // 水平分割线
import "tinymce/plugins/fullscreen"; // 全屏
import "tinymce/plugins/emoticons"; // 表情插件
import "tinymce/plugins/directionality"; // 文字方向
import "tinymce/plugins/codesample"; // 代码示例插件
import "tinymce/plugins/code"; // 编辑源码
import "tinymce/plugins/charmap"; // 特殊字符插件
import "tinymce/plugins/bbcode"; // 使用该插件，会导致很多TinyMCE的功能无法使用，因为bbcode不支持完整的HTML规范。
import "tinymce/plugins/link"; // 超链接
import "tinymce/plugins/pagebreak"; // 分页符
import "tinymce/plugins/quickbars"; // 快速工具栏
import "tinymce/plugins/searchreplace"; // 查找替换
import "./plugins/axupimgs";

/* toolbar
 * undo 后退
 * redo 前进
 * bold italic underline strikethrough 样式
 * fontselect fontsizeselect formatselect 字体 段落
 * alignleft aligncenter alignright alignjustify 对齐方式
 * outdent indent 缩进
 * numlist bullist 列表 ul ol、高级列表
 * forecolor backcolor removeformat 字体、背景颜色，清除样式
 * pagebreak 分页
 * charmap emoticons 特殊符号、表情
 * fullscreen preview save print 全屏、预览、保存、打印
 * image media link codesample 图片 媒体 链接 代码
 * ltr rtl 文字从左往右 从右往左
 */

export default {
  components: {
    Editor
  },
  props: {
    value: {
      // 输入的内容
      type: String,
      default: "<p>默认文本</p>"
    },
    readonly: {
      // 是否只读
      type: Boolean,
      default: false
    },
    plugins: {
      // 插件
      type: [String, Array],
      default:
        "image media table lists advlist wordcount preview print insertdatetime hr fullscreen link pagebreak quickbars"
    },
    toolbar: {
      // 工具栏
      type: [String, Array],
      default:
        "undo redo | bold italic underline strikethrough | fontselect | fontsizeselect | formatselect | alignleft aligncenter alignright | numlist bullist | forecolor backcolor removeformat"
    },
    showMenubar: {
      // 是否显示菜单栏
      type: Boolean,
      default: true
    },
    height: {
      // 高度
      type: Number,
      default: 300
    },
    customIcons: {
      // 自定义图标
      type: String,
      default: "default"
    },
    isApplet: {
      // 是否是小程序
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      init: {
        language_url: process.env.NODE_ENV == 'test' ? "./static/tinymce/langs/zh_CN.js" : "/static/tinymce/langs/zh_CN.js", //public目录下  t
        language: "zh_CN",
        skin_url: process.env.NODE_ENV == 'test' ? "./static/tinymce/skins/ui/oxide" : "/static/tinymce/skins/ui/oxide", //public目录下
        branding: false, // 隐藏水印
        draggable_modal: true, // 窗口拖动
        icons_url: process.env.NODE_ENV == 'test' ? "./static/tinymce/icons/christmas.js" : "/static/tinymce/icons/christmas.js", // 自定义图标
        icons: this.customIcons, // use icon pack
        menubar: this.showMenubar, // 是否显示菜单栏
        height: this.height,
        plugins: this.plugins, // 插件
        toolbar: this.toolbar, // 工具栏
        quickbars_selection_toolbar:
          !this.isApplet 
          ? 
          'bold italic | quicklink h2 h3 | forecolor backcolor' 
          :
          "bold italic |h1 h2 h3 | forecolor backcolor", // 快速工具栏
        quickbars_insert_toolbar: false,
        toolbar_drawer: "sliding",
        // contextmenu: "bold copy ",   // 右键菜单
        setup: editor => {
          // init 前执行
          // 自定义图标
          // editor.ui.registry.addButton("imageUpload", {
          //   tooltip: "插入图片",
          //   icon: "image",
          //   onAction: () => {}
          // });
        },
        init_instance_callback: editor => {
          // init 后执行
          console.log("Editor: " + editor.id + " is now initialized.");

          // 只读
          if(this.readonly) {
            tinymce.activeEditor.setMode('readonly');
          };
        },
        fontsize_formats: "12px 14px 16px 18px 24px 36px 48px",
        font_formats:
          "默认字体=sans-serif;微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;",
        paste_data_images: true, // 是否允许粘贴图片
        images_upload_url: "", //上传路径
        // 此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
        // 如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
        image_dimensions: true, // 显示隐藏图片尺寸input
        image_title: true, // 显示隐藏图片标题input
        image_description: true, // 显示隐藏图片说明input
        image_prepend_url: "", // 图片前缀
        image_uploadtab: true, // 图片对话框中上传标签开关
        image_advtab: false, // 是否显示高级参数
        images_upload_handler: (blobInfo, success, failure) => {
          this.upload(blobInfo.blob())
            .then(res => {
              success(res.data.data);
            })
            .catch(err => {
              failure(err);
              this.$message.warning("上传失败！");
            });
        },
        // 只有这里配置的节点和属性，编辑器才支持，不符合的会自动过滤(下面是目前rich-text支持的所有节点和属性)
        valid_elements: !this.isApplet
          ? ""
          : "p[style|class],a[style|class],abbr[style|class],b[style|class],blockquote[style|class],br[style|class],code[style|class],col[style|class|span|width],colgroup[style|class|span|width],dd[style|class],del[style|class],div[style|class],dl[style|class],dt[style|class],em[style|class],fieldset[style|class],h1[style|class],h2[style|class],h3[style|class],h4[style|class],h5[style|class],h6[style|class],hr[style|class],i[style|class],img[style|class|alt|src|height|width],ins[style|class],label[style|class],legend[style|class],li[style|class],ol[style|class|start|type],p[style|class],q[style|class],span[style|class],strong[style|class],sub[style|class],sup[style|class],table[style|class|width],tbody[style|class],td[style|class|colspan|height|rowspan|width],tfoot[style|class],th[style|class|colspan|height|rowspan|width],thead[style|class],tr[style|class],ul[style|class]",
        // 如果配置了这个，编辑器会自动抹掉节点的属性(如果要保留请设置为false)
        paste_as_text: this.isApplet,
        // rich-text不支持html实体，所以我们得将实体转为字符
        entities: !this.isApplet ? '' :
          "nbsp,160,iexcl,161,cent,162,pound,163,curren,164,yen,165,brvbar,166,sect,167,uml,168,copy,169,ordf,170," +
          "laquo,171,not,172,shy,173,reg,174,macr,175,deg,176,plusmn,177,sup2,178,sup3,179,acute,180,micro,181,para,182," +
          "middot,183,cedil,184,sup1,185,ordm,186,raquo,187,frac14,188,frac12,189,frac34,190,iquest,191,Agrave,192,Aacute,193," +
          "Acirc,194,Atilde,195,Auml,196,Aring,197,AElig,198,Ccedil,199,Egrave,200,Eacute,201,Ecirc,202,Euml,203,Igrave,204," +
          "Iacute,205,Icirc,206,Iuml,207,ETH,208,Ntilde,209,Ograve,210,Oacute,211,Ocirc,212,Otilde,213,Ouml,214,times,215," +
          "Oslash,216,Ugrave,217,Uacute,218,Ucirc,219,Uuml,220,Yacute,221,THORN,222,szlig,223,agrave,224,aacute,225,acirc,226," +
          "atilde,227,auml,228,aring,229,aelig,230,ccedil,231,egrave,232,eacute,233,ecirc,234,euml,235,igrave,236,iacute,237," +
          "icirc,238,iuml,239,eth,240,ntilde,241,ograve,242,oacute,243,ocirc,244,otilde,245,ouml,246,divide,247,oslash,248," +
          "ugrave,249,uacute,250,ucirc,251,uuml,252,yacute,253,thorn,254,yuml,255,fnof,402,Alpha,913,Beta,914,Gamma,915,Delta,916," +
          "Epsilon,917,Zeta,918,Eta,919,Theta,920,Iota,921,Kappa,922,Lambda,923,Mu,924,Nu,925,Xi,926,Omicron,927,Pi,928,Rho,929," +
          "Sigma,931,Tau,932,Upsilon,933,Phi,934,Chi,935,Psi,936,Omega,937,alpha,945,beta,946,gamma,947,delta,948,epsilon,949," +
          "zeta,950,eta,951,theta,952,iota,953,kappa,954,lambda,955,mu,956,nu,957,xi,958,omicron,959,pi,960,rho,961,sigmaf,962," +
          "sigma,963,tau,964,upsilon,965,phi,966,chi,967,psi,968,omega,969,thetasym,977,upsih,978,piv,982,bull,8226,hellip,8230," +
          "prime,8242,Prime,8243,oline,8254,frasl,8260,weierp,8472,image,8465,real,8476,trade,8482,alefsym,8501,larr,8592,uarr,8593," +
          "rarr,8594,darr,8595,harr,8596,crarr,8629,lArr,8656,uArr,8657,rArr,8658,dArr,8659,hArr,8660,forall,8704,part,8706,exist,8707," +
          "empty,8709,nabla,8711,isin,8712,notin,8713,ni,8715,prod,8719,sum,8721,minus,8722,lowast,8727,radic,8730,prop,8733,infin,8734," +
          "ang,8736,and,8743,or,8744,cap,8745,cup,8746,int,8747,there4,8756,sim,8764,cong,8773,asymp,8776,ne,8800,equiv,8801,le,8804,ge,8805," +
          "sub,8834,sup,8835,nsub,8836,sube,8838,supe,8839,oplus,8853,otimes,8855,perp,8869,sdot,8901,lceil,8968,rceil,8969,lfloor,8970," +
          "rfloor,8971,lang,9001,rang,9002,loz,9674,spades,9824,clubs,9827,hearts,9829,diams,9830,OElig,338,oelig,339,Scaron,352,scaron,353," +
          "Yuml,376,circ,710,tilde,732,ensp,8194,emsp,8195,thinsp,8201,zwnj,8204,zwj,8205,lrm,8206,rlm,8207,ndash,8211,mdash,8212,lsquo,8216," +
          "rsquo,8217,sbquo,8218,ldquo,8220,rdquo,8221,bdquo,8222,dagger,8224,Dagger,8225,permil,8240,lsaquo,8249,rsaquo,8250,euro,8364,"
      },
      myValue: this.value
    };
  },
  methods: {
    upload(file) {
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append("file", file);
        this.$api.qiniu
          .upload(formData)
          .then(res => {
            if (res.data.code == 0) {
              resolve(res);
            } else {
              reject(res);
            }
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  },
  watch: {
    value(newValue) {
      this.myValue = newValue;
    },
    myValue(newValue) {
      this.$emit("tinymceChange", newValue);
    }
  }
};
</script>