(this["webpackJsonpspotify-lists"]=this["webpackJsonpspotify-lists"]||[]).push([[0],{15:function(t,e,n){"use strict";n.r(e);var a=n(0),c=n.n(a),r=n(8),o=n.n(r),l=n(6),i=n(2),s=n.n(i),u=n(5),p=n(4),m=["playlist-read-private"];var h=window.location.hash.substring(1).split("&").reduce((function(t,e){if(e){var n=e.split("=");t[(a=n[0],a.replace("_"," ").replace(/(?:^\w|[A-Z]|\b\w)/g,(function(t,e){return 0===e?t.toLowerCase():t.toUpperCase()})).replace(/\s+/g,""))]=decodeURIComponent(n[1])}var a;return t}),{}),d=h.accessToken,f=h.tokenType;h.expiresIn;window.history.pushState("",document.title,window.location.pathname+window.location.search);var b=function(){var t=Object(a.useState)(null),e=Object(p.a)(t,2),n=e[0],r=e[1],o=Object(a.useState)(!1),i=Object(p.a)(o,2),h=i[0],b=i[1],E=Object(a.useState)(""),y=Object(p.a)(E,2),v=y[0],k=y[1];function w(){return(w=Object(u.a)(s.a.mark((function t(e){var n,a;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.preventDefault(),b(!0),t.next=4,fetch("https://api.spotify.com/v1/playlists/".concat(v),{method:"GET",headers:{Authorization:"".concat(f," ").concat(d)}}).then((function(t){return t.json()}));case 4:n=t.sent,a=n.tracks;case 6:if(!a.next){t.next=14;break}return t.next=9,fetch(a.next,{method:"GET",headers:{Authorization:"".concat(f," ").concat(d)}}).then((function(t){return t.json()}));case 9:a=t.sent,console.log(a),n.tracks.items=[].concat(Object(l.a)(n.tracks.items),Object(l.a)(a.items)),t.next=6;break;case 14:console.log(n.tracks.items,n.tracks.items.length),r(n),k(""),b(!1);case 18:case"end":return t.stop()}}),t)})))).apply(this,arguments)}Object(a.useEffect)((function(){}),[]);var j,g=n?n.tracks.items.filter((function(t){return t.track})).reduce((function(t,e){var n,a=e.track;return t.push({name:a.name,artists:(n=a.artists,n.map((function(t){return t.name})).join(", "))}),t}),[]):null;return d?c.a.createElement("div",null,c.a.createElement("form",{type:"submit",onSubmit:function(t){return function(t){return w.apply(this,arguments)}(t)}},c.a.createElement("label",{htmlFor:"playlist-input"},"Input playlist id:",c.a.createElement("input",{id:"playlist-input",type:"text",value:v,onChange:function(t){return k(t.target.value)}})),c.a.createElement("button",{disabled:h},"Fetch playlist!")),n?c.a.createElement("div",null,c.a.createElement("h2",null,n.name),c.a.createElement("a",{href:(j=g,"data:text/plain;charset=utf-8,"+encodeURIComponent("Title;Artist;Code\n"+j.map((function(t){var e=t.name,n=t.artists;return"".concat(e,";").concat(n,";\n")})).join(""))),download:"".concat(n.name,".csv")},"Download csv"),c.a.createElement("table",null,c.a.createElement("thead",null,c.a.createElement("tr",null,c.a.createElement("th",null,"Song title"),c.a.createElement("th",null,"Artists"))),c.a.createElement("tbody",null,g.map((function(t,e){return c.a.createElement("tr",{key:e},c.a.createElement("td",null,t.name),c.a.createElement("td",null,t.artists))}))))):null):c.a.createElement("div",null,c.a.createElement("h1",null,"Authorize with spotify"),c.a.createElement("a",{href:"".concat("https://accounts.spotify.com/authorize","?client_id=").concat("f10fc34ec54b46fc92b4086dd5d86fcd","&redirect_uri=").concat("https://photolyzeant.github.io/playlist2csv/","&scope=").concat(m.join("%20"),"&response_type=token")},"Click to authorize"))};o.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(b,null)),document.getElementById("root"))},9:function(t,e,n){t.exports=n(15)}},[[9,1,2]]]);
//# sourceMappingURL=main.52acff97.chunk.js.map