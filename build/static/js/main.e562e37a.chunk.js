(this.webpackJsonpkamen=this.webpackJsonpkamen||[]).push([[0],{12:function(e,a,t){e.exports={dialogWindow:"MainWindow_dialogWindow__Lfg0b",dialog:"MainWindow_dialog__1r1z5",txtArea:"MainWindow_txtArea__2idLN",avatar:"MainWindow_avatar__27wIK",companion:"MainWindow_companion__PhMXJ",messageText:"MainWindow_messageText__24KSL",wInputContainer:"MainWindow_wInputContainer__12XGw",wInputTextGroup:"MainWindow_wInputTextGroup__1moxw",wPlaceholder:"MainWindow_wPlaceholder__1Rtnj",wrapper:"MainWindow_wrapper__1p7Eu",wInputText:"MainWindow_wInputText__2IYMh"}},15:function(e,a,t){e.exports={Dialogs:"dialogsField_Dialogs__NFlsQ",searchBox:"dialogsField_searchBox__1IfhA",searchInput:"dialogsField_searchInput__2sZpM",DialogList:"dialogsField_DialogList__2YwVe",dialogFieldSBox:"dialogsField_dialogFieldSBox__Z-faw",logOutBtn:"dialogsField_logOutBtn__226wQ"}},17:function(e,a,t){e.exports={msgListItem:"MessageListItem_msgListItem__3bVIm",right:"MessageListItem_right__3lJL5",left:"MessageListItem_left__327k1",time:"MessageListItem_time__1I0nl"}},19:function(e,a,t){e.exports={dialogItem:"dialog-item_dialogItem__1GGBJ",currentItem:"dialog-item_currentItem__3cU7H",avatar:"dialog-item_avatar__qtHNZ",dialogItemText:"dialog-item_dialogItemText__13eHc"}},273:function(e,a,t){},282:function(e,a,t){"use strict";t.r(a);var n=t(0),A=t.n(n),o=t(64),c=t.n(o),g=(t(77),t(3)),r=(t(32),t(18)),l=t(2),s=t(15),i=t.n(s),m=t(19),u=t.n(m),d=t(65),Q=t.n(d),E=function(e){e.id;var a=e.index,t=e.name,n=e.lastTalk,o=e.onclick,c=e.current;return A.a.createElement("div",{className:c?u.a.dialogItem+" "+u.a.currentItem:u.a.dialogItem,onClick:function(){o(a)}},A.a.createElement("div",{className:u.a.avatar},A.a.createElement("img",{src:Q.a,alt:"???"})),A.a.createElement("div",{className:u.a.dialogItemText},A.a.createElement("h3",null,t),A.a.createElement("p",null,n)))},I=function(e){var a=e.setDialog,t=e.dialogs,o=e.currentDialog,c=e.setTalk,r=e.setLoggedOut,l=Object(n.useState)(""),s=Object(g.a)(l,2),m=s[0],u=s[1],d=function(e){a(e),c(null),console.log(e)};return A.a.createElement("div",{className:i.a.Dialogs},A.a.createElement("div",{className:i.a.searchBox},A.a.createElement("div",{className:i.a.dialogFieldSBox},A.a.createElement("h2",null,"Search")," ",A.a.createElement("button",{className:i.a.logOutBtn,onClick:function(){return r(!1)}},"Log Out")),A.a.createElement("input",{className:i.a.searchInput,placeholder:"Write your talk here",value:m,onChange:function(e){return u(e.target.value)}})),A.a.createElement("div",{className:i.a.DialogList},t.map((function(e,a){return A.a.createElement(E,{key:e.id,id:e.id,index:a,name:e.name,lastTalk:e.talks[e.talks.length-1].name,onclick:d,current:o===a})}))))},B=t(66),p=t.n(B),C=t(12),w=t.n(C),v=(t(78),t(20)),T=t.n(v),f=t(17),D=t.n(f),x=function(e){var a=e.from,t=e.text,n=(e.name,e.time);return A.a.createElement("div",{className:a?D.a.right+" "+D.a.msgListItem:D.a.left+" "+D.a.msgListItem},A.a.createElement("p",{className:D.a.text},t),A.a.createElement("span",{className:D.a.time},n))},O=t(68),k=t.n(O),b=function(e){var a=Object(n.useState)([{from:!0,text:"123",time:"16:10"},{from:!1,text:"345678",time:"16:09"}]),t=Object(g.a)(a,2),o=t[0],c=t[1];Object(n.useEffect)((function(){T.a.get("/talk1").then((function(e){return c(e.data.parse)})).catch((function(e){return console.log(e)}))}),[]);return A.a.createElement("div",{className:k.a.MessageList},o.map((function(e,a){return A.a.createElement(x,{from:e.from,text:e.text,time:e.time,key:a})})))},h=t(69),N=t.n(h),H=function(e){var a=e.companion,t=Object(n.useRef)(null),o=Object(n.useState)(""),c=Object(g.a)(o,2),r=c[0],l=c[1];return Object(n.useEffect)((function(){t.current.style.height="0px";var e=t.current.scrollHeight;t.current.style.height=e+"px"}),[r]),A.a.createElement("div",{className:w.a.dialogWindow},A.a.createElement("div",{className:w.a.companion},void 0===a.photoURL?A.a.createElement("div",{className:w.a.avatar},A.a.createElement("img",{src:N.a})):A.a.createElement("div",{className:w.a.avatar},A.a.createElement("img",{src:a.photoURL})),A.a.createElement("h2",null,a.name)),A.a.createElement("div",{className:w.a.dialog},A.a.createElement(b,null)),A.a.createElement("form",{className:w.a.txtArea},A.a.createElement("div",{className:w.a.wInputContainer},A.a.createElement("textarea",{ref:t,className:w.a.wrapper,placeholder:"Type a message",value:r,onChange:function(e){return l(e.target.value)}})),A.a.createElement("button",{onClick:function(e){e.preventDefault(),console.log(r),l("")}},"Send")))},y=t(41),L=t.n(y),U=t(29),G=t.n(U),S=function(e){e.id;var a=e.name,t=e.item,n=e.current,o=e.onclick;return A.a.createElement("div",{className:n?G.a.talkItem+" "+G.a.currentTalkItem:G.a.talkItem,onClick:function(){console.log(t.id-1),o(t.id-1)}},a)},F=function(e){var a=e.talks,t=e.current,n=e.setTalk;return A.a.createElement("div",{className:L.a.talks},A.a.createElement("div",{className:L.a.talksHead},"Your Talks!"),a.map((function(e,a){return A.a.createElement(S,{key:e.id,id:e.id,name:e.name,item:e,current:t===a,onclick:n})})))},M=function(e){e.id;var a=e.companion,t=e.talks,n=e.currentTalk,o=e.setTalk;return A.a.createElement("div",{className:p.a.workTree},A.a.createElement(H,{companion:a}),A.a.createElement(F,{talks:t,current:n,setTalk:o}),A.a.createElement("p",null))};var j=function(e){var a=e.dialogs,t=e.setLoggedOut,o=Object(n.useState)(0),c=Object(g.a)(o,2),r=c[0],l=c[1],s=Object(n.useState)(0),i=Object(g.a)(s,2),m=i[0],u=i[1];return A.a.createElement("div",{className:"App"},A.a.createElement(I,{setDialog:l,dialogs:a,currentDialog:r,setTalk:u,setLoggedOut:t}),A.a.createElement(M,{id:r,companion:a[r],talks:a[r].talks,currentTalk:m,setTalk:u}))},P=t(4),W=(t(273),function(e){var a=e.setLoggedIn,t=Object(n.useState)({login:"",password:""}),o=Object(g.a)(t,2),c=o[0],l=o[1],s=Object(n.useState)(null),i=Object(g.a)(s,2),m=i[0],u=i[1];Object(n.useEffect)((function(){T.a.get("/text").then((function(e){return u(e.data)})).catch(console.log("error!!!"))}));return A.a.createElement("div",{className:"loginPage"},A.a.createElement("div",{className:"loginForm"},A.a.createElement("form",{className:"authForm"},A.a.createElement("h2",null," LogIn "),A.a.createElement("input",{class:"form-input",placeholder:"Email",value:c.login,onChange:function(e){return l(Object(P.a)(Object(P.a)({},c),{},{login:e.target.value}))}}),A.a.createElement("input",{class:"form-input",placeholder:"Password",type:"password",value:c.password,onChange:function(e){return l(Object(P.a)(Object(P.a)({},c),{},{password:e.target.value}))}}),A.a.createElement("div",{className:"buttons"},A.a.createElement("button",{className:"LoginPageButton",onClick:function(e){e.preventDefault(),console.log(c.login),a(!0)}},"Log In"),A.a.createElement("button",{className:"LoginPageButton",onClick:function(e){e.preventDefault(),console.log(c.password)}},"Forgot password?"))),A.a.createElement("div",{className:"loginPageAvatar"},A.a.createElement("div",{className:"loginLogo"},A.a.createElement("img",{src:!0,alt:"logo"})),A.a.createElement("div",{className:"loginPageText"},A.a.createElement("p",null,m," Talk is a new messenger with an advanced TALK system. Are you not with us yet? Register!"),A.a.createElement(r.b,{to:"/registration",className:"LoginPageButton ButtonText"},"Register now!")))))}),J=function(){var e=Object(n.useState)({name:"",age:"",login:"",password:"",password2:""}),a=Object(g.a)(e,2),t=a[0],o=a[1],c=Object(n.useState)(),l=Object(g.a)(c,2),s=l[0],i=(l[1],/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);return A.a.createElement("div",{className:"loginPage"},A.a.createElement("div",{className:"loginForm",style:{height:"600px"}},A.a.createElement("form",{className:"authForm regForm",method:"POST"},A.a.createElement("h2",null," Registration "),A.a.createElement("input",{className:"form-input",placeholder:"Your nickname",value:t.name,onChange:function(e){return o(Object(P.a)(Object(P.a)({},t),{},{name:e.target.value}))},required:!0}),A.a.createElement("input",{className:"form-input",placeholder:"Your age",value:t.age,onChange:function(e){return o(Object(P.a)(Object(P.a)({},t),{},{age:e.target.value}))},required:!0}),A.a.createElement("input",{className:"form-input",placeholder:"Your Email",value:t.login,onChange:function(e){return o(Object(P.a)(Object(P.a)({},t),{},{login:e.target.value}))},required:!0,style:{color:i.test(String(t.login).toLowerCase())&&""!==t.login?"#5E6472":"red"}}),A.a.createElement("input",{className:"form-input",placeholder:"Your Password",type:"password",value:t.password,onChange:function(e){return o(Object(P.a)(Object(P.a)({},t),{},{password:e.target.value}))},required:!0}),A.a.createElement("input",{className:"form-input",placeholder:"Repeat password",type:"password",value:t.password2,onChange:function(e){return o(Object(P.a)(Object(P.a)({},t),{},{password2:e.target.value}))},required:!0}),A.a.createElement("p",{style:{color:"black",marginBottom:"0"}},"\u041f\u0430\u0440\u043e\u043b\u044c \u043d\u0435 \u043a\u043e\u0440\u043e\u0447\u0435 8 \u0441\u0438\u043c\u0432\u043e\u043b\u043e\u0432."),t.password!==t.password2||""===t.password&&""===t.password2?A.a.createElement("p",{style:{color:"red",marginBottom:"0"}},"\u041f\u0430\u0440\u043e\u043b\u0438 \u0434\u043e\u043b\u0436\u043d\u044b \u0441\u043e\u0432\u043f\u0430\u0434\u0430\u0442\u044c!"):A.a.createElement("p",{style:{color:"green",marginBottom:"0"}},"\u041f\u0430\u0440\u043e\u043b\u0438 \u0441\u043e\u0432\u043f\u0430\u0434\u0430\u044e\u0442"),A.a.createElement("div",{className:"buttons"},A.a.createElement("button",{className:"LoginPageButton",style:{margin:"2%",width:"100%",padding:"15px"},type:"submit",onClick:function(e){e.preventDefault()},disabled:t.password!==t.password2||""===t.password&&""===t.password2||""===t.name||t.age<12||!i.test(String(t.login).toLowerCase())||t.password.length<8},"Register now"))),A.a.createElement("div",{className:"loginPageAvatar"},A.a.createElement("div",{className:"loginLogo"},A.a.createElement("img",{src:!0,alt:"logo"})),A.a.createElement("div",{className:"loginPageText"},A.a.createElement("p",null," ",s,"Talk is a new messenger with an advanced TALK system. Are you not with us yet? Register!"),A.a.createElement(r.b,{to:"/registration",className:"LoginPageButton ButtonText"},"Register now!")))))};var X=function(){var e=Object(n.useState)(0),a=Object(g.a)(e,2),t=(a[0],a[1],Object(n.useState)(!1)),o=Object(g.a)(t,2),c=o[0],s=o[1],i=[{id:1,name:"spareack",photoURL:void 0,talks:[{id:1,name:"\u043e \u043c\u0435\u0441\u0441\u0435\u043d\u0434\u0436\u0435\u0440\u0435"},{id:2,name:"\u0447\u0442\u043e?"},{id:3,name:"\u0445\u0438 \u0445\u0438"}]},{id:2,name:"zxchrnk",photoURL:void 0,talks:[{id:1,name:"\u0423\u0447\u0451\u0431\u0430 \u0441\u0440\u0430\u043d\u0430\u044f"},{id:2,name:"\u0414\u0438\u043c\u0430 \u043a\u0440\u0443\u0442\u043e\u0439"}]}];return A.a.createElement(r.a,null,c?A.a.createElement(l.d,null,A.a.createElement(l.b,{key:"/talk",exact:!0,path:"/talk",component:function(){return A.a.createElement(j,{dialogs:i,setLoggedOut:s})}}),A.a.createElement(l.a,{to:"/talk"})):A.a.createElement(l.d,null,A.a.createElement(l.b,{key:"/registration",exact:!0,path:"/registration",component:J}),A.a.createElement(l.b,{key:"/login",exact:!0,path:"/login",component:function(){return A.a.createElement(W,{setLoggedIn:s})}}),A.a.createElement(l.a,{to:"/login"})))},z=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,283)).then((function(a){var t=a.getCLS,n=a.getFID,A=a.getFCP,o=a.getLCP,c=a.getTTFB;t(e),n(e),A(e),o(e),c(e)}))};c.a.render(A.a.createElement(A.a.StrictMode,null,A.a.createElement(X,null)),document.getElementById("root")),z()},29:function(e,a,t){e.exports={talkItem:"talkItem_talkItem__1hVE-",currentTalkItem:"talkItem_currentTalkItem___evwp"}},32:function(e,a,t){},41:function(e,a,t){e.exports={talks:"talks_talks__mMSum",talksHead:"talks_talksHead__2itIp"}},65:function(e,a){e.exports="data:image/jpeg;base64,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"},66:function(e,a,t){e.exports={workTree:"workspace_workTree__3iQ6Y"}},68:function(e,a,t){e.exports={MessageList:"MessageList_MessageList__3CNJT"}},69:function(e,a){e.exports="data:image/jpeg;base64,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"},72:function(e,a,t){e.exports=t(282)},77:function(e,a,t){}},[[72,1,2]]]);
//# sourceMappingURL=main.e562e37a.chunk.js.map