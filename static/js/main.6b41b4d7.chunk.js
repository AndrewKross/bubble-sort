(this["webpackJsonpvisual-sorting"]=this["webpackJsonpvisual-sorting"]||[]).push([[0],{16:function(e,t,n){"use strict";n.r(t);var r=n(0),s=n(1),a=n.n(s),i=n(4),o=n.n(i),c=n(3),l=n.n(c),u=n(5),h=n(6),d=n(7),m=n(9),b=n(8),j=35,p=5,f=.2,g=100,y=3,x=100,v=10,O=45,k="#9755c9",S="#c157af",w="#ac3469",A=function(e){return new Array(e).fill("").map((function(){return Math.floor(Math.random()*x)}))},C=function(e){Object(m.a)(n,e);var t=Object(b.a)(n);function n(){var e,s=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object(h.a)(this,n),(e=t.call(this,s)).containerRef=void 0,e.sortedArray=void 0,e.generateSortingElements=function(e){return e.slice().map((function(e,t){var n={height:"".concat(e*y,"px"),transform:"translateX(".concat(t*(j+p),"px)"),width:"".concat(j,"px"),transition:"".concat(f,"s all ease")};return Object(r.jsx)("div",{className:"sorting-element",style:n,children:Object(r.jsx)("p",{children:e})},Math.random())}))},e.swapElements=function(t,n){return new Promise((function(r){var s=window.getComputedStyle(t),a=window.getComputedStyle(n),i=s.getPropertyValue("transform");t.style.transform=a.getPropertyValue("transform"),n.style.transform=i,window.requestAnimationFrame((function(){setTimeout((function(){e.containerRef.current.insertBefore(n,t),r()}),250)}))}))},e.state={isReverse:!1,elementsCount:v,isSorting:!1,initialArray:A(v),sortingElements:null},e.containerRef=a.a.createRef(),e.sortedArray=[],e}return Object(d.a)(n,[{key:"componentDidMount",value:function(){this.setState({sortingElements:this.generateSortingElements(this.state.initialArray)})}},{key:"componentDidUpdate",value:function(){var e=arguments.length>1?arguments[1]:void 0;e.initialArray!==this.state.initialArray&&this.setState({sortingElements:this.generateSortingElements(this.state.initialArray)})}},{key:"render",value:function(){var e=this;return Object(r.jsxs)("div",{className:"App",children:[Object(r.jsx)("header",{className:"main-header",children:"\u0421\u043e\u0440\u0442\u0438\u0440\u043e\u0432\u043a\u0430 \u043f\u0443\u0437\u044b\u0440\u044c\u043a\u043e\u043c"}),Object(r.jsx)("div",{className:"data-wrapper",children:Object(r.jsx)("section",{className:"data-container",ref:this.containerRef,style:{width:"".concat(this.state.initialArray.length*(j+p),"px")},children:this.state.sortingElements})}),Object(r.jsxs)("section",{className:"controls",children:[Object(r.jsx)("input",{type:"number",className:"controls__number-input",value:this.state.elementsCount,max:O,onChange:function(t){+t.target.value<=O&&+t.target.value>0&&e.setState({elementsCount:+t.target.value})}}),Object(r.jsxs)("div",{className:"controls__radio-wrapper",children:[Object(r.jsxs)("div",{children:[Object(r.jsx)("input",{type:"radio",checked:!this.state.isReverse,name:"sort",id:"sort1",onChange:function(){return e.setState({isReverse:!1})}}),Object(r.jsx)("label",{htmlFor:"sort1",children:"\u041f\u043e \u0432\u043e\u0437\u0440\u0430\u0441\u0442\u0430\u043d\u0438\u044e"})]}),Object(r.jsxs)("div",{children:[Object(r.jsx)("input",{type:"radio",checked:this.state.isReverse,name:"sort",id:"sort2",onChange:function(){return e.setState({isReverse:!0})}}),Object(r.jsx)("label",{htmlFor:"sort2",children:"\u041f\u043e \u0443\u0431\u044b\u0432\u0430\u043d\u0438\u044e"})]})]}),Object(r.jsx)("button",{className:"controls__generate-button",disabled:this.state.isSorting,onClick:function(){e.setState({initialArray:A(e.state.elementsCount)}),e.sortedArray=[]},children:"\u0421\u0433\u0435\u043d\u0435\u0440\u0438\u0440\u043e\u0432\u0430\u0442\u044c"}),Object(r.jsx)("button",{className:"controls__start-button",onClick:function(){e.setState({isSorting:!0}),e.sortElements().then((function(){return e.setState({isSorting:!1})}))},disabled:this.state.isSorting,children:"\u041d\u0430\u0447\u0430\u0442\u044c"}),Object(r.jsxs)("div",{className:"result",children:[Object(r.jsxs)("p",{children:["\u0418\u0437\u043d\u0430\u0447\u0430\u043b\u044c\u043d\u044b\u0439 \u043c\u0430\u0441\u0441\u0438\u0432: ",this.state.initialArray.join(", ")]}),Object(r.jsxs)("p",{children:["\u041e\u0442\u0441\u043e\u0440\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u043d\u044b\u0439 \u043c\u0430\u0441\u0441\u0438\u0432: ",!this.state.isSorting&&this.sortedArray.join(", ")]})]})]}),Object(r.jsxs)("p",{className:"info",children:['\u041d\u0430\u0436\u043c\u0438\u0442\u0435 \u043d\u0430 \u043a\u043d\u043e\u043f\u043a\u0443 "\u041d\u0430\u0447\u0430\u0442\u044c", \u0447\u0442\u043e \u0431\u044b \u0437\u0430\u043f\u0443\u0441\u0442\u0438\u0442\u044c \u043f\u0440\u043e\u0446\u0435\u0441\u0441 \u0441\u043e\u0440\u0442\u0438\u0440\u043e\u0432\u043a\u0438. ',Object(r.jsx)("br",{}),"\u0418\u0437\u043d\u0430\u0447\u0430\u043b\u044c\u043d\u043e \u0433\u0435\u043d\u0435\u0440\u0438\u0440\u0443\u0435\u0442\u0441\u044f \u043c\u0430\u0441\u0441\u0438\u0432 \u0438\u0437 10 \u044d\u043b\u0435\u043c\u0435\u043d\u0442\u043e\u0432. ",Object(r.jsx)("br",{}),'\u0412\u044b \u043c\u043e\u0436\u0435\u0442\u0435 \u043f\u0435\u0440\u0435\u0433\u0435\u043d\u0435\u0440\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u043c\u0430\u0441\u0441\u0438\u0432, \u0443\u043a\u0430\u0437\u0430\u0432 \u043b\u044e\u0431\u043e\u0435 \u0434\u0440\u0443\u0433\u043e\u0435 \u043a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u043e \u044d\u043b\u0435\u043c\u0435\u043d\u0442\u043e\u0432 \u0432 \u043f\u043e\u043b\u0435 \u0432\u0432\u043e\u0434\u0430 (\u0434\u043e 45), \u0438 \u043d\u0430\u0436\u0430\u0432 \u043a\u043d\u043e\u043f\u043a\u0443 "\u0421\u0433\u0435\u043d\u0435\u0440\u0438\u0440\u043e\u0432\u0430\u0442\u044c". ',Object(r.jsx)("br",{}),"\u0422\u0430\u043a \u0436\u0435, \u0432\u044b \u043c\u043e\u0436\u0435\u0442\u0435 \u0438\u0437\u043c\u0435\u043d\u0438\u0442\u044c \u043f\u043e\u0440\u044f\u0434\u043e\u043a \u0441\u043e\u0440\u0442\u0438\u0440\u043e\u0432\u043a\u0438, \u0432\u044b\u0431\u0440\u0430\u0432 \u043e\u0434\u0438\u043d \u0438\u0437 \u0434\u0432\u0443\u0445 \u0432\u0430\u0440\u0438\u0430\u043d\u0442\u043e\u0432."]})]})}},{key:"sortElements",value:function(){var e=Object(u.a)(l.a.mark((function e(){var t,n,r,s,a,i,o=arguments;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=o.length>0&&void 0!==o[0]?o[0]:g,n=this.containerRef.current.getElementsByClassName("sorting-element"),this.sortedArray=[],r=0;case 4:if(!(r<n.length-1)){e.next=32;break}s=0;case 6:if(!(s<n.length-r-1)){e.next=27;break}return n[s].style.backgroundColor=S,n[s+1].style.backgroundColor=S,e.next=11,new Promise((function(e){return setTimeout((function(){e()}),t)}));case 11:if(a=Number(n[s].querySelector("p").innerHTML),i=Number(n[s+1].querySelector("p").innerHTML),this.state.isReverse){e.next=19;break}if(!(a>i)){e.next=17;break}return e.next=17,this.swapElements(n[s],n[s+1]);case 17:e.next=22;break;case 19:if(!(a<i)){e.next=22;break}return e.next=22,this.swapElements(n[s],n[s+1]);case 22:n[s].style.backgroundColor=k,n[s+1].style.backgroundColor=k;case 24:s++,e.next=6;break;case 27:this.sortedArray.push(Number(n[n.length-r-1].querySelector("p").innerHTML)),n[n.length-r-1].style.backgroundColor=w;case 29:r++,e.next=4;break;case 32:this.sortedArray.push(Number(n[0].querySelector("p").innerHTML)),this.sortedArray.reverse(),n[0].style.backgroundColor=w;case 35:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()}]),n}(a.a.Component);o.a.render(Object(r.jsx)(a.a.StrictMode,{children:Object(r.jsx)(C,{})}),document.getElementById("root"))}},[[16,1,2]]]);
//# sourceMappingURL=main.6b41b4d7.chunk.js.map