import{M as i,y as f,w as _,_ as v,$ as p,O as s,E as o,D as E,C as h,a0 as g}from"./runtime.DTchB4Bm.js";function y(n){var t=document.createElement("template");return t.innerHTML=n,t.content}function r(n,t){var e=_;e.nodes_start===null&&(e.nodes_start=n,e.nodes_end=t)}function M(n,t){var e=(t&v)!==0,u=(t&p)!==0,a,c=!n.startsWith("<!>");return()=>{if(s)return r(o,null),o;a===void 0&&(a=y(c?n:"<!>"+n),e||(a=f(a)));var d=u?document.importNode(a,!0):a.cloneNode(!0);if(e){var m=f(d),l=d.lastChild;r(m,l)}else r(d,d);return d}}function N(n=""){if(!s){var t=i(n+"");return r(t,t),t}var e=o;return e.nodeType!==3&&(e.before(e=i()),h(e)),r(e,e),e}function b(){if(s)return r(o,null),o;var n=document.createDocumentFragment(),t=document.createComment(""),e=i();return n.append(t,e),r(t,e),n}function x(n,t){if(s){_.nodes_end=o,E();return}n!==null&&n.before(t)}const T="5";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(T);g();export{x as a,r as b,b as c,N as d,M as t};
