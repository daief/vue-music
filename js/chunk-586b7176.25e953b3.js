(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-586b7176"],{"285e":function(t,i,s){},"73b4":function(t,i,s){},7846:function(t,i,s){"use strict";var n=s("73b4"),a=s.n(n);a.a},8608:function(t,i,s){"use strict";var n=s("f69a"),a=s.n(n);a.a},"9d70":function(t,i,s){},bbb7:function(t,i,s){t.exports=s.p+"img/0.464e87a6.gif"},db63:function(t,i,s){"use strict";var n=s("9d70"),a=s.n(n);a.a},f69a:function(t,i,s){},fceb:function(t,i,s){"use strict";var n=s("285e"),a=s.n(n);a.a},ff31:function(t,i,s){"use strict";s.r(i);var n=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("div",{staticClass:"song main-content"},[n("div",{staticClass:"left"},[n("song-info",{attrs:{id:t.ID}})],1),n("div",{staticClass:"right"},[n("img",{staticClass:"gif0",attrs:{src:s("bbb7")}}),n("simi-list",{staticClass:"block",attrs:{id:t.ID}}),n("simi-songs",{staticClass:"block",attrs:{id:t.ID}})],1)])},a=[],e=s("c665"),c=s("dc0a"),r=s("aa9a"),l=s("d328"),o=s("11d9"),u=s("9ab4"),d=s("60a3"),f=function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"song-info"},[s("div",{staticClass:"left"},[s("div",{staticClass:"cover-wrap"},[s("img",{staticClass:"cover",attrs:{src:t.SongAlbum.picUrl}}),s("span",{staticClass:"ibs mask"})]),s("div",{staticClass:"out"},[t._v("\n      🎵"),s("router-link",{attrs:{to:"/outchain"}},[t._v("生成外链播放器")])],1)]),s("div",{staticClass:"right"},[s("div",{staticClass:"name"},[t._v(t._s(t.$u.getProp(t.song,"name","")))]),t.$u.getProp(t.song,"alia",[]).length>0?s("div",{staticClass:"alia fs-14"},[t._v("\n      "+t._s(t.song.alia[0])+"\n    ")]):t._e(),s("p",{staticClass:"artists"},[t._v("\n      歌手：\n      "),t._l(t.$u.getProp(t.song,"ar",[]),function(i,n){return[s("router-link",{key:"0-"+n,attrs:{to:"/artist?id="+i.id}},[t._v(t._s(i.name))]),n<t.$u.getProp(t.song,"ar",[]).length-1?s("span",{key:"1-"+n},[t._v(" / ")]):t._e()]})],2),s("p",{staticClass:"album"},[t._v("\n      所属专辑：\n      "),s("router-link",{attrs:{to:"/album?id="+t.SongAlbum.id}},[t._v(t._s(t.SongAlbum.name))])],1),s("div",{staticClass:"ops"},[s("span",{staticClass:"ibs c-p play",on:{click:t.handleClickPlaySong}},[s("span",{staticClass:"ibs c-p ct"},[t._v("播放")])]),s("span",{staticClass:"ibs c-p add",on:{click:t.handleClickAddSong}})]),s("div",{staticClass:"lyrics"},[t._l(t.LyricArr,function(i,n){return s("p",{key:n,staticClass:"line"},[t._v(t._s(i))])}),0===t.LyricArr.length?s("p",{staticClass:"line"},[t._v("纯音乐，无歌词")]):s("p",{staticClass:"c-p"},[s("span",{on:{click:function(i){t.isExpand=!t.isExpand}}},[t._v(t._s(t.isExpand?"收起⬆️":"展开⬇️"))])]),s("p",{staticClass:"lyric-user"},[t.lyric.lyricUser?s("span",[t._v("\n          贡献歌词："),s("router-link",{attrs:{to:"/user"}},[t._v(t._s(t.lyric.lyricUser.nickname))])],1):t._e(),t.lyric.transUser?s("span",[t._v("\n          贡献翻译："),s("router-link",{attrs:{to:"/user"}},[t._v(t._s(t.lyric.transUser.nickname))])],1):t._e()])],2)])])},h=[],p=(s("c5f6"),s("7514"),s("67e2")),v={tlyric:{lyric:"",version:""},lrc:{lyric:"",version:""}},g=function(t){function i(){var t;return Object(e["a"])(this,i),t=Object(l["a"])(this,Object(o["a"])(i).apply(this,arguments)),t.lyric=v,t.song=null,t.isExpand=!1,t}return Object(r["a"])(i,[{key:"fetchLyric",value:function(t){var i=this;return this.$u.get("/lyric?id=".concat(t)).then(function(t){i.lyric=t.failMark||!0===t.nolyric?v:t,i.isExpand=!1})}},{key:"fetchSongDetail",value:function(t){var i=this;this.$u.get("/song/detail?ids=".concat(t)).then(function(t){i.song=t.failMark?null:i.$u.getProp(t.songs,"0",null)})}},{key:"handleClickPlaySong",value:function(){this.song&&this.$store.dispatch(Object(p["a"])("playANewSong"),this.song)}},{key:"handleClickAddSong",value:function(){this.song&&this.$store.dispatch(Object(p["a"])("addSongToList"),this.song)}},{key:"mounted",value:function(){this.fetchLyric(this.id),this.fetchSongDetail(this.id)}},{key:"onIdChange",value:function(t){this.fetchLyric(t),this.fetchSongDetail(t)}},{key:"LyricArr",get:function(){var t=this.lyric,i=this.$u.getLyricArr(t&&t.lrc?t.lrc.lyric:void 0),s=this.$u.getLyricArr(t&&t.tlyric?t.tlyric.lyric:void 0),n=[];return s.length>0?i.map(function(t,i){var a=s.find(function(i){return i.millisecond===t.millisecond});n.push(t.content),a&&n.push(a.content)}):i.map(function(t,i){n.push(t.content)}),this.isExpand?n:n.slice(0,12)}},{key:"SongAlbum",get:function(){return this.$u.getProp(this.song,"al",{})}}]),Object(c["a"])(i,t),i}(d["c"]);u["a"]([Object(d["b"])({type:Number,required:!0})],g.prototype,"id",void 0),u["a"]([Object(d["d"])("id")],g.prototype,"onIdChange",null),g=u["a"]([d["a"]],g);var y=g,b=y,_=(s("7846"),s("2877")),m=Object(_["a"])(b,f,h,!1,null,"5e02c0d3",null);m.options.__file="SongInfo.vue";var k=m.exports,C=function(){var t=this,i=t.$createElement,s=t._self._c||i;return t.list.length>0?s("div",{staticClass:"simi-list"},[s("h1",{staticClass:"title fs-12"},[t._v("包含这首歌的歌单")]),t._l(t.list,function(i){return s("div",{key:i.id,staticClass:"item"},[s("router-link",{staticClass:"ibs c-p cover",attrs:{to:"/discover/playlist?id="+i.id}},[s("img",{attrs:{src:i.coverImgUrl+"?param=50y50",title:i.name}})]),s("div",{staticClass:"text"},[s("router-link",{staticClass:"c-p fs-14 f-thide name",attrs:{to:"/discover/playlist?id="+i.id,title:i.name}},[t._v("\n        "+t._s(i.name)+"\n      ")]),s("span",{staticClass:"creator fs-12 f-thide c-p"},[t._v("by "),s("router-link",{attrs:{to:"/user"}},[t._v(t._s(i.creator.nickname))])],1)],1)],1)})],2):t._e()},j=[],O=function(t){function i(){var t;return Object(e["a"])(this,i),t=Object(l["a"])(this,Object(o["a"])(i).apply(this,arguments)),t.list=[],t}return Object(r["a"])(i,[{key:"fetchSimiList",value:function(t){var i=this;return this.$u.get("/simi/playlist?id=".concat(t)).then(function(t){i.list=t.failMark?[]:t.playlists})}},{key:"mounted",value:function(){this.fetchSimiList(this.id)}},{key:"onIdChnage",value:function(t){this.fetchSimiList(t)}}]),Object(c["a"])(i,t),i}(d["c"]);u["a"]([Object(d["b"])({type:Number,required:!0})],O.prototype,"id",void 0),u["a"]([Object(d["d"])("id")],O.prototype,"onIdChnage",null),O=u["a"]([d["a"]],O);var S=O,$=S,A=(s("db63"),Object(_["a"])($,C,j,!1,null,"4a16fe50",null));A.options.__file="SimiList.vue";var L=A.exports,x=function(){var t=this,i=t.$createElement,s=t._self._c||i;return t.list.length>0?s("div",{staticClass:"simi-songs"},[s("h1",{staticClass:"title fs-12"},[t._v("相似歌曲")]),t._l(t.list,function(i){return s("div",{key:i.id,staticClass:"item"},[s("div",{staticClass:"text"},[s("router-link",{staticClass:"c-p ibs fs-12 f-thide song-name",attrs:{to:"/discover/song?id="+i.id,title:i.name}},[t._v("\n        "+t._s(i.name)+"\n      ")]),t._l(i.artists,function(n,a){return s("p",{key:n.id,staticClass:"artists"},[s("router-link",{staticClass:"c-p ibs fs-12 f-thide artist-name",attrs:{to:"/artist",title:n.name}},[t._v("\n          "+t._s(n.name)+"\n        ")]),a<i.artists.length-1?s("span",[t._v("/")]):t._e()],1)})],2),s("span",{staticClass:"c-p ic iconfont play",on:{click:function(s){t.handleClickPlay(i)}}},[t._v("")]),s("span",{staticClass:"c-p ic iconfont add",on:{click:function(s){t.handleClickAdd(i)}}},[t._v("")])])})],2):t._e()},I=[],E=function(t){function i(){var t;return Object(e["a"])(this,i),t=Object(l["a"])(this,Object(o["a"])(i).apply(this,arguments)),t.list=[],t}return Object(r["a"])(i,[{key:"fetchSimiSongs",value:function(t){var i=this;return this.$u.get("/simi/song?id=".concat(t)).then(function(t){i.list=t.failMark?[]:t.songs})}},{key:"handleClickPlay",value:function(t){this.$store.dispatch(Object(p["a"])("playANewSong"),t)}},{key:"handleClickAdd",value:function(t){this.$store.dispatch(Object(p["a"])("addSongToList"),t)}},{key:"mounted",value:function(){this.fetchSimiSongs(this.id)}},{key:"onIdChnage",value:function(t){this.fetchSimiSongs(t)}}]),Object(c["a"])(i,t),i}(d["c"]);u["a"]([Object(d["b"])({type:Number,required:!0})],E.prototype,"id",void 0),u["a"]([Object(d["d"])("id")],E.prototype,"onIdChnage",null),E=u["a"]([d["a"]],E);var P=E,w=P,D=(s("fceb"),Object(_["a"])(w,x,I,!1,null,"36699daa",null));D.options.__file="SimiSongs.vue";var U=D.exports,N=function(t){function i(){return Object(e["a"])(this,i),Object(l["a"])(this,Object(o["a"])(i).apply(this,arguments))}return Object(r["a"])(i,[{key:"ID",get:function(){return+this.$route.query.id}}]),Object(c["a"])(i,t),i}(d["c"]);N=u["a"]([Object(d["a"])({components:{SongInfo:k,SimiList:L,SimiSongs:U}})],N);var q=N,M=q,J=(s("8608"),Object(_["a"])(M,n,a,!1,null,"f8eaff60",null));J.options.__file="index.vue";i["default"]=J.exports}}]);
//# sourceMappingURL=chunk-586b7176.25e953b3.js.map