(this.webpackJsonpkamen=this.webpackJsonpkamen||[]).push([[0],{12:function(e,a,t){e.exports={dialogWindow:"MainWindow_dialogWindow__Lfg0b",dialog:"MainWindow_dialog__1r1z5",txtArea:"MainWindow_txtArea__2idLN",avatar:"MainWindow_avatar__27wIK",companion:"MainWindow_companion__PhMXJ",messageText:"MainWindow_messageText__24KSL",wInputContainer:"MainWindow_wInputContainer__12XGw",wInputTextGroup:"MainWindow_wInputTextGroup__1moxw",wPlaceholder:"MainWindow_wPlaceholder__1Rtnj",wrapper:"MainWindow_wrapper__1p7Eu",wInputText:"MainWindow_wInputText__2IYMh"}},15:function(e,a,t){e.exports={Dialogs:"dialogsField_Dialogs__NFlsQ",searchBox:"dialogsField_searchBox__1IfhA",searchInput:"dialogsField_searchInput__2sZpM",DialogList:"dialogsField_DialogList__2YwVe",dialogFieldSBox:"dialogsField_dialogFieldSBox__Z-faw",logOutBtn:"dialogsField_logOutBtn__226wQ"}},17:function(e,a,t){e.exports={msgListItem:"MessageListItem_msgListItem__3bVIm",right:"MessageListItem_right__3lJL5",left:"MessageListItem_left__327k1",time:"MessageListItem_time__1I0nl"}},20:function(e,a,t){e.exports={dialogItem:"dialog-item_dialogItem__1GGBJ",currentItem:"dialog-item_currentItem__3cU7H",avatar:"dialog-item_avatar__qtHNZ",dialogItemText:"dialog-item_dialogItemText__13eHc"}},273:function(e,a,t){},282:function(e,a,t){"use strict";t.r(a);var n=t(0),o=t.n(n),c=t(64),A=t.n(c),r=(t(77),t(3)),g=(t(32),t(19)),l=t(2),s=t(15),i=t.n(s),m=t(20),u=t.n(m),d=t(65),Q=t.n(d),E=function(e){e.id;var a=e.index,t=e.name,n=e.lastTalk,c=e.onclick,A=e.current;return o.a.createElement("div",{className:A?u.a.dialogItem+" "+u.a.currentItem:u.a.dialogItem,onClick:function(){c(a)}},o.a.createElement("div",{className:u.a.avatar},o.a.createElement("img",{src:Q.a,alt:"???"})),o.a.createElement("div",{className:u.a.dialogItemText},o.a.createElement("h3",null,t),o.a.createElement("p",null,n)))},I=function(e){var a=e.setDialog,t=e.dialogs,c=e.currentDialog,A=e.setTalk,g=e.setLoggedOut,l=Object(n.useState)(""),s=Object(r.a)(l,2),m=s[0],u=s[1],d=function(e){a(e),A(null),console.log(e)};return o.a.createElement("div",{className:i.a.Dialogs},o.a.createElement("div",{className:i.a.searchBox},o.a.createElement("div",{className:i.a.dialogFieldSBox},o.a.createElement("h2",null,"Search")," ",o.a.createElement("button",{className:i.a.logOutBtn,onClick:function(){return g(!1)}},"Log Out")),o.a.createElement("input",{className:i.a.searchInput,placeholder:"Write your talk here",value:m,onChange:function(e){return u(e.target.value)}})),o.a.createElement("div",{className:i.a.DialogList},t.map((function(e,a){return o.a.createElement(E,{key:e.id,id:e.id,index:a,name:e.name,lastTalk:e.talks[e.talks.length-1].name,onclick:d,current:c===a})}))))},B=t(66),p=t.n(B),C=t(12),w=t.n(C),v=(t(78),t(18)),T=t.n(v),f=t(17),D=t.n(f),x=function(e){var a=e.from,t=e.text,n=(e.name,e.time);return o.a.createElement("div",{className:a?D.a.right+" "+D.a.msgListItem:D.a.left+" "+D.a.msgListItem},o.a.createElement("p",{className:D.a.text},t),o.a.createElement("span",{className:D.a.time},n))},O=t(68),k=t.n(O),b=function(e){var a=Object(n.useState)([{from:!0,text:"123",time:"16:10"},{from:!1,text:"345678",time:"16:09"}]),t=Object(r.a)(a,2),c=t[0],A=t[1];Object(n.useEffect)((function(){T.a.get("/talk1").then((function(e){return A(e.data)})).catch((function(e){return console.log(e)}))}),[]);return o.a.createElement("div",{className:k.a.MessageList},c?c.map((function(e,a){return o.a.createElement(x,{from:e.from,text:e.text,time:e.time,key:a})})):o.a.createElement(x,{from:!0,text:"\u041d\u0430\u043f\u0438\u0448\u0438\u0442\u0435 \u044d\u0442\u043e\u043c\u0443 \u0447\u0435\u043b\u043e\u0432\u0435\u043a\u0443!",time:"\u0410 \u044d\u0442\u043e \u043d\u0435 \u0432\u0430\u0436\u043d\u043e"}))},h=t(69),N=t.n(h),H=function(e){var a=e.companion,t=Object(n.useRef)(null),c=Object(n.useState)(""),A=Object(r.a)(c,2),g=A[0],l=A[1];return Object(n.useEffect)((function(){t.current.style.height="0px";var e=t.current.scrollHeight;t.current.style.height=e+"px"}),[g]),o.a.createElement("div",{className:w.a.dialogWindow},o.a.createElement("div",{className:w.a.companion},void 0===a.photoURL?o.a.createElement("div",{className:w.a.avatar},o.a.createElement("img",{src:N.a})):o.a.createElement("div",{className:w.a.avatar},o.a.createElement("img",{src:a.photoURL})),o.a.createElement("h2",null,a.name)),o.a.createElement("div",{className:w.a.dialog},o.a.createElement(b,null)),o.a.createElement("form",{className:w.a.txtArea},o.a.createElement("div",{className:w.a.wInputContainer},o.a.createElement("textarea",{ref:t,className:w.a.wrapper,placeholder:"Type a message",value:g,onChange:function(e){return l(e.target.value)}})),o.a.createElement("button",{onClick:function(e){e.preventDefault(),console.log(g),l("")}},"Send")))},y=t(41),L=t.n(y),U=t(29),G=t.n(U),S=function(e){e.id;var a=e.name,t=e.item,n=e.current,c=e.onclick;return o.a.createElement("div",{className:n?G.a.talkItem+" "+G.a.currentTalkItem:G.a.talkItem,onClick:function(){console.log(t.id-1),c(t.id-1)}},a)},F=function(e){var a=e.talks,t=e.current,n=e.setTalk;return o.a.createElement("div",{className:L.a.talks},o.a.createElement("div",{className:L.a.talksHead},"Your Talks!"),a.map((function(e,a){return o.a.createElement(S,{key:e.id,id:e.id,name:e.name,item:e,current:t===a,onclick:n})})))},M=function(e){e.id;var a=e.companion,t=e.talks,n=e.currentTalk,c=e.setTalk;return o.a.createElement("div",{className:p.a.workTree},o.a.createElement(H,{companion:a}),o.a.createElement(F,{talks:t,current:n,setTalk:c}),o.a.createElement("p",null))};var j=function(e){var a=e.dialogs,t=e.setLoggedOut,c=Object(n.useState)(0),A=Object(r.a)(c,2),g=A[0],l=A[1],s=Object(n.useState)(0),i=Object(r.a)(s,2),m=i[0],u=i[1];return o.a.createElement("div",{className:"App"},o.a.createElement(I,{setDialog:l,dialogs:a,currentDialog:g,setTalk:u,setLoggedOut:t}),o.a.createElement(M,{id:g,companion:a[g],talks:a[g].talks,currentTalk:m,setTalk:u}))},W=t(4),P=(t(273),function(e){var a=e.setLoggedIn,t=Object(n.useState)({login:"",password:""}),c=Object(r.a)(t,2),A=c[0],l=c[1],s=Object(n.useState)(null),i=Object(r.a)(s,2),m=i[0],u=i[1];Object(n.useEffect)((function(){T.a.get("/text").then((function(e){return u(e.data)})).catch(console.log("error!!!"))}));return o.a.createElement("div",{className:"loginPage"},o.a.createElement("div",{className:"loginForm"},o.a.createElement("form",{className:"authForm"},o.a.createElement("h2",null," LogIn "),o.a.createElement("input",{class:"form-input",placeholder:"Email",value:A.login,onChange:function(e){return l(Object(W.a)(Object(W.a)({},A),{},{login:e.target.value}))}}),o.a.createElement("input",{class:"form-input",placeholder:"Password",type:"password",value:A.password,onChange:function(e){return l(Object(W.a)(Object(W.a)({},A),{},{password:e.target.value}))}}),o.a.createElement("div",{className:"buttons"},o.a.createElement("button",{className:"LoginPageButton",onClick:function(e){e.preventDefault(),console.log(A.login),a(!0)}},"Log In"),o.a.createElement("button",{className:"LoginPageButton",onClick:function(e){e.preventDefault(),console.log(A.password)}},"Forgot password?"))),o.a.createElement("div",{className:"loginPageAvatar"},o.a.createElement("div",{className:"loginLogo"},o.a.createElement("img",{src:!0,alt:"logo"})),o.a.createElement("div",{className:"loginPageText"},o.a.createElement("p",null,m," Talk is a new messenger with an advanced TALK system. Are you not with us yet? Register!"),o.a.createElement(g.b,{to:"/registration",className:"LoginPageButton ButtonText"},"Register now!")))))}),J=function(){var e=Object(n.useState)({name:"",age:"",login:"",password:"",password2:""}),a=Object(r.a)(e,2),t=a[0],c=a[1],A=Object(n.useState)(),l=Object(r.a)(A,2),s=l[0],i=l[1],m=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;return o.a.createElement("div",{className:"loginPage"},o.a.createElement("div",{className:"loginForm",style:{height:"600px"}},o.a.createElement("form",{className:"authForm regForm",method:"POST"},o.a.createElement("h2",null," Registration "),o.a.createElement("input",{className:"form-input",placeholder:"Your nickname",value:t.name,onChange:function(e){return c(Object(W.a)(Object(W.a)({},t),{},{name:e.target.value}))},required:!0}),o.a.createElement("input",{className:"form-input",placeholder:"Your age",value:t.age,onChange:function(e){return c(Object(W.a)(Object(W.a)({},t),{},{age:e.target.value}))},required:!0}),o.a.createElement("input",{className:"form-input",placeholder:"Your Email",value:t.login,onChange:function(e){return c(Object(W.a)(Object(W.a)({},t),{},{login:e.target.value}))},required:!0,style:{color:m.test(String(t.login).toLowerCase())&&""!==t.login?"#5E6472":"red"}}),o.a.createElement("input",{className:"form-input",placeholder:"Your Password",type:"password",value:t.password,onChange:function(e){return c(Object(W.a)(Object(W.a)({},t),{},{password:e.target.value}))},required:!0}),o.a.createElement("input",{className:"form-input",placeholder:"Repeat password",type:"password",value:t.password2,onChange:function(e){return c(Object(W.a)(Object(W.a)({},t),{},{password2:e.target.value}))},required:!0}),o.a.createElement("p",{style:{color:"black",marginBottom:"0"}},"\u041f\u0430\u0440\u043e\u043b\u044c \u043d\u0435 \u043a\u043e\u0440\u043e\u0447\u0435 8 \u0441\u0438\u043c\u0432\u043e\u043b\u043e\u0432."),t.password!==t.password2||""===t.password&&""===t.password2?o.a.createElement("p",{style:{color:"red",marginBottom:"0"}},"\u041f\u0430\u0440\u043e\u043b\u0438 \u0434\u043e\u043b\u0436\u043d\u044b \u0441\u043e\u0432\u043f\u0430\u0434\u0430\u0442\u044c!"):o.a.createElement("p",{style:{color:"green",marginBottom:"0"}},"\u041f\u0430\u0440\u043e\u043b\u0438 \u0441\u043e\u0432\u043f\u0430\u0434\u0430\u044e\u0442"),o.a.createElement("div",{className:"buttons"},o.a.createElement("button",{className:"LoginPageButton",style:{margin:"2%",width:"100%",padding:"15px"},type:"submit",onClick:function(e){e.preventDefault(),T()({method:"post",url:"/registratenewuser",data:{userName:t.name,email:t.login,password:t.password},headers:{"Content-Type":"application/json","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36"}}).then((function(e){return i(e.data)})).catch((function(e){return alert(e)}))},disabled:t.password!==t.password2||""===t.password&&""===t.password2||""===t.name||t.age<12||!m.test(String(t.login).toLowerCase())||t.password.length<8},"Register now"))),o.a.createElement("div",{className:"loginPageAvatar"},o.a.createElement("div",{className:"loginLogo"},o.a.createElement("img",{src:!0,alt:"logo"})),o.a.createElement("div",{className:"loginPageText"},o.a.createElement("p",null," \u0412\u043e\u0442 \u0442\u0443\u0442 \u043d\u0430\u043f\u0438\u0448\u0435\u0442\u0441\u044f \u043e\u0442\u0432\u0435\u0442 ","->"," ",s," ","<-"," Talk is a new messenger with an advanced TALK system. Are you not with us yet? Register!"),o.a.createElement(g.b,{to:"/registration",className:"LoginPageButton ButtonText"},"Register now!")))))};var X=function(){var e=Object(n.useState)(0),a=Object(r.a)(e,2),t=(a[0],a[1],Object(n.useState)(!1)),c=Object(r.a)(t,2),A=c[0],s=c[1],i=[{id:1,name:"spareack",photoURL:void 0,talks:[{id:1,name:"\u043e \u043c\u0435\u0441\u0441\u0435\u043d\u0434\u0436\u0435\u0440\u0435"},{id:2,name:"\u0447\u0442\u043e?"},{id:3,name:"\u0445\u0438 \u0445\u0438"}]},{id:2,name:"zxchrnk",photoURL:void 0,talks:[{id:1,name:"\u0423\u0447\u0451\u0431\u0430 \u0441\u0440\u0430\u043d\u0430\u044f"},{id:2,name:"\u0414\u0438\u043c\u0430 \u043a\u0440\u0443\u0442\u043e\u0439"}]}];return o.a.createElement(g.a,null,A?o.a.createElement(l.d,null,o.a.createElement(l.b,{key:"/talk",exact:!0,path:"/talk",component:function(){return o.a.createElement(j,{dialogs:i,setLoggedOut:s})}}),o.a.createElement(l.a,{to:"/talk"})):o.a.createElement(l.d,null,o.a.createElement(l.b,{key:"/registration",exact:!0,path:"/registration",component:J}),o.a.createElement(l.b,{key:"/login",exact:!0,path:"/login",component:function(){return o.a.createElement(P,{setLoggedIn:s})}}),o.a.createElement(l.a,{to:"/login"})))},z=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,283)).then((function(a){var t=a.getCLS,n=a.getFID,o=a.getFCP,c=a.getLCP,A=a.getTTFB;t(e),n(e),o(e),c(e),A(e)}))};A.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(X,null)),document.getElementById("root")),z()},29:function(e,a,t){e.exports={talkItem:"talkItem_talkItem__1hVE-",currentTalkItem:"talkItem_currentTalkItem___evwp"}},32:function(e,a,t){},41:function(e,a,t){e.exports={talks:"talks_talks__mMSum",talksHead:"talks_talksHead__2itIp"}},65:function(e,a){e.exports="data:image/jpeg;base64,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"},66:function(e,a,t){e.exports={workTree:"workspace_workTree__3iQ6Y"}},68:function(e,a,t){e.exports={MessageList:"MessageList_MessageList__3CNJT"}},69:function(e,a){e.exports="data:image/jpeg;base64,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"},72:function(e,a,t){e.exports=t(282)},77:function(e,a,t){}},[[72,1,2]]]);
//# sourceMappingURL=main.90cee2f5.chunk.js.map