(function(){
    $('#owl').owlCarousel({
        navigation : true,
        pagination: false,
          slideSpeed : 300,
          paginationSpeed : 400,
          singleItem : true,
          autoPlay: 4000,
          navigationText: [],
          /*autoPlay: 7000*/
    });
    $('#carousel').owlCarousel({
        navigation : true,
        pagination: true,
          slideSpeed : 300,
          paginationSpeed : 400,
          singleItem : true,
          navigationText: []
    });
  $('#carousel2').owlCarousel({
        navigation :true,
        pagination: true,
          slideSpeed : 300,
          paginationSpeed : 400,
          singleItem : false,
       autoPlay: 5000,
      items : 7, //10 items above 1000px browser width
      itemsDesktop : [1000,7], //5 items between 1000px and 901px
      itemsDesktopSmall : [900,5], // betweem 900px and 601px
      itemsTablet: [600,3], //2 items between 600 and 0
      itemsMobile : [360,2], // itemsMobile disabled - inherit from itemsTablet option
    });
 $('#carousel3').owlCarousel({
        navigation : false,
        pagination: true,
          slideSpeed : 300,
          paginationSpeed : 400,
        autoPlay: 5000,
          singleItem : true
    });
    $('#carousel4').owlCarousel({
        navigation : true,
        pagination:true,
          slideSpeed : 300,
          paginationSpeed : 400,
           autoPlay: 5000,
        items : 4, //10 items above 1000px browser width
      itemsDesktop : [1000,4], //5 items between 1000px and 901px
      itemsDesktopSmall : [900,3], // betweem 900px and 601px
      itemsTablet: [600,2], //2 items between 600 and 0
      itemsMobile : [480,1] // itemsMobile disabled - inherit from itemsTablet option
    });
//show modal
    $("[data-modal]").click(function(e){
    e.preventDefault();
    var target = $(this).data('modal');
    var modal = $('[data-target="'+target+'"]');
    modal.fadeIn(400);
  })
  
//hide modal by clicking CLOSE
    $('.close').click(function(e){
    e.preventDefault();
    $(this).parents('.modal-wrapper').fadeOut(400);
  })

$(document).keydown(function(eventObject){
	if(eventObject.which==27){
		$('.modal-wrapper').fadeOut(400);
	}
});

  var menuOffset = $('#menu-fixed').offset().top;
$(window).scroll(function(){
  
  var windowOffset = $(window).scrollTop();

  if(windowOffset >= menuOffset) {
    $('#menu-fixed').addClass('fixed').css({
      'margin-top': 0
    });
  } else {
    $('#menu-fixed').removeClass('fixed').css({
      'margin-top': 6
    });
  }


});


$('.content1-elem-1 a').click(function(e){
  e.preventDefault();

  if($(this).hasClass('active')) {
    return false;
  } else {
    $('.content1-elem-1 a').removeClass('active');
    $(this).addClass('active');

    if($(this).text() == 'краснодар') {
      $('.content1-elem-2.telephone').html("<span>8 800 </span><span>200 72 57</span><br><span>8 861 </span><span>204 12 56</span>")
    } else {
      $('.content1-elem-2.telephone').html("<span>8 800 </span><span>200 72 57</span><br><span>8 495 </span><span>777 96 45</span>")
    }
  }

});


})($)



function validate_form(form){
	if((form.tel&&form.tel.value)||(form.email&&form.email.value)||(!form.phone&&!form.email)){
		$.ajax({
			'url': (form.action||''), 
			'type': 'POST', 
			'data': new FormData(form), 
			'processData': true, 
			'contentType': true, 
			'success': function(z){
				if(z=='0'){
					$(form).parents('.modal-wrapper').fadeOut(0);
					$('[data-target="some_modal_ok"]').fadeIn(0);
				}else{alert('Ваша заявка успешна отправлена!');}
			}, 
		});
	}
	return false;
}



/*
 Input Mask plugin for jquery
 http://github.com/RobinHerbots/jquery.inputmask
 Copyright (c) 2010 - 2014 Robin Herbots
 Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
 Version: 2.5.10
*/
(function(e){if(void 0===e.fn.inputmask){var Q=function(e){var l=document.createElement("input");e="on"+e;var a=e in l;a||(l.setAttribute(e,"return;"),a="function"==typeof l[e]);return a},E=function(d,l,a){return(d=a.aliases[d])?(d.alias&&E(d.alias,void 0,a),e.extend(!0,a,d),e.extend(!0,a,l),!0):!1},D=function(d){function l(a){d.numericInput&&(a=a.split("").reverse().join(""));var g=!1,l=0,n=d.greedy,p=d.repeat;"*"==p&&(n=!1);1==a.length&&!1==n&&0!=p&&(d.placeholder="");a=e.map(a.split(""),function(a,
e){var k=[];if(a==d.escapeChar)g=!0;else if(a!=d.optionalmarker.start&&a!=d.optionalmarker.end||g){var p=d.definitions[a];if(p&&!g)for(var r=0;r<p.cardinality;r++)k.push(d.placeholder.charAt((l+r)%d.placeholder.length));else k.push(a),g=!1;l+=k.length;return k}});for(var s=a.slice(),r=1;r<p&&n;r++)s=s.concat(a.slice());return{mask:s,repeat:p,greedy:n}}function a(a){d.numericInput&&(a=a.split("").reverse().join(""));var g=!1,l=!1,p=!1;return e.map(a.split(""),function(a,e){var k=[];if(a==d.escapeChar)l=
!0;else{if(a!=d.optionalmarker.start||l){if(a!=d.optionalmarker.end||l){var m=d.definitions[a];if(m&&!l){for(var u=m.prevalidator,w=u?u.length:0,v=1;v<m.cardinality;v++){var C=w>=v?u[v-1]:[],K=C.validator,C=C.cardinality;k.push({fn:K?"string"==typeof K?RegExp(K):new function(){this.test=K}:/./,cardinality:C?C:1,optionality:g,newBlockMarker:!0==g?p:!1,offset:0,casing:m.casing,def:m.definitionSymbol||a});!0==g&&(p=!1)}k.push({fn:m.validator?"string"==typeof m.validator?RegExp(m.validator):new function(){this.test=
m.validator}:/./,cardinality:m.cardinality,optionality:g,newBlockMarker:p,offset:0,casing:m.casing,def:m.definitionSymbol||a})}else k.push({fn:null,cardinality:0,optionality:g,newBlockMarker:p,offset:0,casing:null,def:a}),l=!1;p=!1;return k}g=!1}else g=!0;p=!0}})}function m(a){for(var e=a.length,g=0;g<e&&a.charAt(g)!=d.optionalmarker.start;g++);var l=[a.substring(0,g)];g<e&&l.push(a.substring(g+1,e));return l}function g(k,t,w){for(var n=0,v=0,s=t.length,r=0;r<s&&!(t.charAt(r)==d.optionalmarker.start&&
n++,t.charAt(r)==d.optionalmarker.end&&v++,0<n&&n==v);r++);n=[t.substring(0,r)];r<s&&n.push(t.substring(r+1,s));r=m(n[0]);1<r.length?(t=k+r[0]+(d.optionalmarker.start+r[1]+d.optionalmarker.end)+(1<n.length?n[1]:""),-1==e.inArray(t,p)&&""!=t&&(p.push(t),s=l(t),u.push({mask:t,_buffer:s.mask,buffer:s.mask.slice(),tests:a(t),lastValidPosition:-1,greedy:s.greedy,repeat:s.repeat,metadata:w})),t=k+r[0]+(1<n.length?n[1]:""),-1==e.inArray(t,p)&&""!=t&&(p.push(t),s=l(t),u.push({mask:t,_buffer:s.mask,buffer:s.mask.slice(),
tests:a(t),lastValidPosition:-1,greedy:s.greedy,repeat:s.repeat,metadata:w})),1<m(r[1]).length&&g(k+r[0],r[1]+n[1],w),1<n.length&&1<m(n[1]).length&&(g(k+r[0]+(d.optionalmarker.start+r[1]+d.optionalmarker.end),n[1],w),g(k+r[0],n[1],w))):(t=k+n,-1==e.inArray(t,p)&&""!=t&&(p.push(t),s=l(t),u.push({mask:t,_buffer:s.mask,buffer:s.mask.slice(),tests:a(t),lastValidPosition:-1,greedy:s.greedy,repeat:s.repeat,metadata:w})))}var u=[],p=[];e.isFunction(d.mask)&&(d.mask=d.mask.call(this,d));e.isArray(d.mask)?
e.each(d.mask,function(a,e){void 0!=e.mask?g("",e.mask.toString(),e):g("",e.toString())}):g("",d.mask.toString());return d.greedy?u:u.sort(function(a,e){return a.mask.length-e.mask.length})},fa="function"===typeof ScriptEngineMajorVersion?ScriptEngineMajorVersion():10<=(new Function("/*@cc_on return @_jscript_version; @*/"))(),w=navigator.userAgent,ga=null!==w.match(/iphone/i),ha=null!==w.match(/android.*safari.*/i),ia=null!==w.match(/android.*chrome.*/i),Y=null!==w.match(/android.*firefox.*/i),Z=
/Kindle/i.test(w)||/Silk/i.test(w)||/KFTT/i.test(w)||/KFOT/i.test(w)||/KFJWA/i.test(w)||/KFJWI/i.test(w)||/KFSOWI/i.test(w)||/KFTHWA/i.test(w)||/KFTHWI/i.test(w)||/KFAPWA/i.test(w)||/KFAPWI/i.test(w),S=Q("paste")?"paste":Q("input")?"input":"propertychange",v=function(d,l,a,m){function g(){return d[l]}function u(){return g().tests}function p(){return g()._buffer}function k(){return g().buffer}function t(h,c,b){function f(h,b,c,f){for(var e=v(h),g=c?1:0,B="",y=b.buffer,d=b.tests[e].cardinality;d>g;d--)B+=
I(y,e-(d-1));c&&(B+=c);return null!=b.tests[e].fn?b.tests[e].fn.test(B,y,h,f,a):c==I(b._buffer.slice(),h,!0)||c==a.skipOptionalPartCharacter?{refresh:!0,c:I(b._buffer.slice(),h,!0),pos:h}:!1}if(b=!0===b){var y=f(h,g(),c,b);!0===y&&(y={pos:h});return y}var B=[],y=!1,L=l,p=k().slice(),m=g().lastValidPosition;G(h);var t=[];e.each(d,function(a,e){if("object"==typeof e){l=a;var d=h,x=g().lastValidPosition,q;if(x==m){if(1<d-m)for(x=-1==x?0:x;x<d&&(q=f(x,g(),p[x],!0),!1!==q);x++)H(k(),x,p[x],!0),!0===q&&
(q={pos:x}),q=q.pos||x,g().lastValidPosition<q&&(g().lastValidPosition=q);if(!n(d)&&!f(d,g(),c,b)){x=r(d)-d;for(q=0;q<x&&!1===f(++d,g(),c,b);q++);t.push(l)}}(g().lastValidPosition>=m||l==L)&&0<=d&&d<s()&&(y=f(d,g(),c,b),!1!==y&&(!0===y&&(y={pos:d}),q=y.pos||d,g().lastValidPosition<q&&(g().lastValidPosition=q)),B.push({activeMasksetIndex:a,result:y}))}});l=L;return function(a,b){var g=!1;e.each(b,function(h,b){if(g=-1==e.inArray(b.activeMasksetIndex,a)&&!1!==b.result)return!1});if(g)b=e.map(b,function(h,
b){if(-1==e.inArray(h.activeMasksetIndex,a))return h;d[h.activeMasksetIndex].lastValidPosition=m});else{var B=-1,y=-1,k;e.each(b,function(h,b){-1!=e.inArray(b.activeMasksetIndex,a)&&!1!==b.result&(-1==B||B>b.result.pos)&&(B=b.result.pos,y=b.activeMasksetIndex)});b=e.map(b,function(b,g){if(-1!=e.inArray(b.activeMasksetIndex,a)){if(b.result.pos==B)return b;if(!1!==b.result){for(var L=h;L<B;L++)if(k=f(L,d[b.activeMasksetIndex],d[y].buffer[L],!0),!1===k){d[b.activeMasksetIndex].lastValidPosition=B-1;
break}else H(d[b.activeMasksetIndex].buffer,L,d[y].buffer[L],!0),d[b.activeMasksetIndex].lastValidPosition=L;k=f(B,d[b.activeMasksetIndex],c,!0);!1!==k&&(H(d[b.activeMasksetIndex].buffer,B,c,!0),d[b.activeMasksetIndex].lastValidPosition=B);return b}}})}return b}(t,B)}function w(){var a=l,c={activeMasksetIndex:0,lastValidPosition:-1,next:-1};e.each(d,function(a,h){"object"==typeof h&&(l=a,g().lastValidPosition>c.lastValidPosition?(c.activeMasksetIndex=a,c.lastValidPosition=g().lastValidPosition,c.next=
r(g().lastValidPosition)):g().lastValidPosition==c.lastValidPosition&&(-1==c.next||c.next>r(g().lastValidPosition))&&(c.activeMasksetIndex=a,c.lastValidPosition=g().lastValidPosition,c.next=r(g().lastValidPosition)))});l=-1!=c.lastValidPosition&&d[a].lastValidPosition==c.lastValidPosition?a:c.activeMasksetIndex;a!=l&&(K(k(),r(c.lastValidPosition),s()),g().writeOutBuffer=!0);q.data("_inputmask").activeMasksetIndex=l}function n(a){a=v(a);a=u()[a];return void 0!=a?a.fn:!1}function v(a){return a%u().length}
function s(){var h=p(),c=g().greedy,b=g().repeat,f=k();if(e.isFunction(a.getMaskLength))return a.getMaskLength(h,c,b,f,a);var y=h.length;c||("*"==b?y=f.length+1:1<b&&(y+=h.length*(b-1)));return y}function r(a){var c=s();if(a>=c)return c;for(;++a<c&&!n(a););return a}function G(a){if(0>=a)return 0;for(;0<--a&&!n(a););return a}function H(a,c,b,f){f&&(c=E(a,c));f=u()[v(c)];var e=b;if(void 0!=e&&void 0!=f)switch(f.casing){case "upper":e=b.toUpperCase();break;case "lower":e=b.toLowerCase()}a[c]=e}function I(a,
c,b){b&&(c=E(a,c));return a[c]}function E(a,c){for(var b;void 0==a[c]&&a.length<s();)for(b=0;void 0!==p()[b];)a.push(p()[b++]);return c}function C(a,c,b){a._valueSet(c.join(""));void 0!=b&&z(a,b)}function K(a,c,b,f){for(var e=s();c<b&&c<e;c++)!0===f?n(c)||H(a,c,""):H(a,c,I(p().slice(),c,!0))}function D(a,c){var b=v(c);H(a,c,I(p(),b))}function O(h){return a.placeholder.charAt(h%a.placeholder.length)}function J(a,c,b,f,y){f=void 0!=f?f.slice():T(a._valueGet()).split("");e.each(d,function(a,b){"object"==
typeof b&&(b.buffer=b._buffer.slice(),b.lastValidPosition=-1,b.p=-1)});!0!==b&&(l=0);c&&a._valueSet("");s();e.each(f,function(f,d){if(!0===y){var k=g().p,k=-1==k?k:G(k),l=-1==k?f:r(k);-1==e.inArray(d,p().slice(k+1,l))&&R.call(a,void 0,!0,d.charCodeAt(0),c,b,f)}else R.call(a,void 0,!0,d.charCodeAt(0),c,b,f),b=b||0<f&&f>g().p});!0===b&&-1!=g().p&&(g().lastValidPosition=G(g().p))}function Q(a){return e.inputmask.escapeRegex.call(this,a)}function T(a){return a.replace(RegExp("("+Q(p().join(""))+")*$"),
"")}function U(a){var c=k(),b=c.slice(),f,e;for(e=b.length-1;0<=e;e--)if(f=v(e),u()[f].optionality)if(n(e)&&t(e,c[e],!0))break;else b.pop();else break;C(a,b)}function ja(h,c){if(!u()||!0!==c&&h.hasClass("hasDatepicker"))return h[0]._valueGet();var b=e.map(k(),function(a,b){return n(b)&&t(b,a,!0)?a:null}),b=(A?b.reverse():b).join(""),f=(A?k().reverse():k()).join("");return e.isFunction(a.onUnMask)?a.onUnMask.call(h,f,b,a):b}function M(h){!A||"number"!=typeof h||a.greedy&&""==a.placeholder||(h=k().length-
h);return h}function z(h,c,b){var f=h.jquery&&0<h.length?h[0]:h;if("number"==typeof c)c=M(c),b=M(b),e(f).is(":visible")&&(b="number"==typeof b?b:c,f.scrollLeft=f.scrollWidth,!1==a.insertMode&&c==b&&b++,f.setSelectionRange?(f.selectionStart=c,f.selectionEnd=b):f.createTextRange&&(h=f.createTextRange(),h.collapse(!0),h.moveEnd("character",b),h.moveStart("character",c),h.select()));else{if(!e(h).is(":visible"))return{begin:0,end:0};f.setSelectionRange?(c=f.selectionStart,b=f.selectionEnd):document.selection&&
document.selection.createRange&&(h=document.selection.createRange(),c=0-h.duplicate().moveStart("character",-1E5),b=c+h.text.length);c=M(c);b=M(b);return{begin:c,end:b}}}function P(h){if(e.isFunction(a.isComplete))return a.isComplete.call(q,h,a);if("*"!=a.repeat){var c=!1,b=0,f=l;e.each(d,function(a,f){if("object"==typeof f){l=a;var e=G(s());if(f.lastValidPosition>=b&&f.lastValidPosition==e){for(var g=!0,d=0;d<=e;d++){var k=n(d),m=v(d);if(k&&(void 0==h[d]||h[d]==O(d))||!k&&h[d]!=p()[m]){g=!1;break}}if(c=
c||g)return!1}b=f.lastValidPosition}});l=f;return c}}function ka(a){a=e._data(a).events;e.each(a,function(a,b){e.each(b,function(a,b){if("inputmask"==b.namespace&&"setvalue"!=b.type){var c=b.handler;b.handler=function(a){if(this.readOnly||this.disabled)a.preventDefault;else return c.apply(this,arguments)}}})})}function la(a){function c(a){if(void 0==e.valHooks[a]||!0!=e.valHooks[a].inputmaskpatch){var b=e.valHooks[a]&&e.valHooks[a].get?e.valHooks[a].get:function(a){return a.value},c=e.valHooks[a]&&
e.valHooks[a].set?e.valHooks[a].set:function(a,b){a.value=b;return a};e.valHooks[a]={get:function(a){var c=e(a);if(c.data("_inputmask")){if(c.data("_inputmask").opts.autoUnmask)return c.inputmask("unmaskedvalue");a=b(a);c=c.data("_inputmask");return a!=c.masksets[c.activeMasksetIndex]._buffer.join("")?a:""}return b(a)},set:function(a,b){var f=e(a),h=c(a,b);f.data("_inputmask")&&f.triggerHandler("setvalue.inputmask");return h},inputmaskpatch:!0}}}var b;Object.getOwnPropertyDescriptor&&(b=Object.getOwnPropertyDescriptor(a,
"value"));if(b&&b.get){if(!a._valueGet){var f=b.get,g=b.set;a._valueGet=function(){return A?f.call(this).split("").reverse().join(""):f.call(this)};a._valueSet=function(a){g.call(this,A?a.split("").reverse().join(""):a)};Object.defineProperty(a,"value",{get:function(){var a=e(this),b=e(this).data("_inputmask"),c=b.masksets,h=b.activeMasksetIndex;return b&&b.opts.autoUnmask?a.inputmask("unmaskedvalue"):f.call(this)!=c[h]._buffer.join("")?f.call(this):""},set:function(a){g.call(this,a);e(this).triggerHandler("setvalue.inputmask")}})}}else document.__lookupGetter__&&
a.__lookupGetter__("value")?a._valueGet||(f=a.__lookupGetter__("value"),g=a.__lookupSetter__("value"),a._valueGet=function(){return A?f.call(this).split("").reverse().join(""):f.call(this)},a._valueSet=function(a){g.call(this,A?a.split("").reverse().join(""):a)},a.__defineGetter__("value",function(){var a=e(this),b=e(this).data("_inputmask"),c=b.masksets,h=b.activeMasksetIndex;return b&&b.opts.autoUnmask?a.inputmask("unmaskedvalue"):f.call(this)!=c[h]._buffer.join("")?f.call(this):""}),a.__defineSetter__("value",
function(a){g.call(this,a);e(this).triggerHandler("setvalue.inputmask")})):(a._valueGet||(a._valueGet=function(){return A?this.value.split("").reverse().join(""):this.value},a._valueSet=function(a){this.value=A?a.split("").reverse().join(""):a}),c(a.type))}function $(a,c,b,f){var e=k();if(!1!==f)for(;!n(a)&&0<=a-1;)a--;for(f=a;f<c&&f<s();f++)if(n(f)){D(e,f);var d=r(f),l=I(e,d);if(l!=O(d))if(d<s()&&!1!==t(f,l,!0)&&u()[v(f)].def==u()[v(d)].def)H(e,f,l,!0);else if(n(f))break}else D(e,f);void 0!=b&&H(e,
G(c),b);if(!1==g().greedy){c=T(e.join("")).split("");e.length=c.length;f=0;for(b=e.length;f<b;f++)e[f]=c[f];0==e.length&&(g().buffer=p().slice())}return a}function aa(a,c,b){var e=k();if(I(e,a,!0)!=O(a))for(var d=G(c);d>a&&0<=d;d--)if(n(d)){var l=G(d),m=I(e,l);m!=O(l)&&!1!==t(d,m,!0)&&u()[v(d)].def==u()[v(l)].def&&(H(e,d,m,!0),D(e,l))}else D(e,d);void 0!=b&&I(e,a)==O(a)&&H(e,a,b);a=e.length;if(!1==g().greedy){b=T(e.join("")).split("");e.length=b.length;d=0;for(l=e.length;d<l;d++)e[d]=b[d];0==e.length&&
(g().buffer=p().slice())}return c-(a-e.length)}function ba(e,c,b){if(a.numericInput||A){switch(c){case a.keyCode.BACKSPACE:c=a.keyCode.DELETE;break;case a.keyCode.DELETE:c=a.keyCode.BACKSPACE}if(A){var f=b.end;b.end=b.begin;b.begin=f}}f=!0;b.begin==b.end?(f=c==a.keyCode.BACKSPACE?b.begin-1:b.begin,a.isNumeric&&""!=a.radixPoint&&k()[f]==a.radixPoint&&(b.begin=k().length-1==f?b.begin:c==a.keyCode.BACKSPACE?f:r(f),b.end=b.begin),f=!1,c==a.keyCode.BACKSPACE?b.begin--:c==a.keyCode.DELETE&&b.end++):1!=
b.end-b.begin||a.insertMode||(f=!1,c==a.keyCode.BACKSPACE&&b.begin--);K(k(),b.begin,b.end);var d=s();if(!1==a.greedy&&(isNaN(a.repeat)||0<a.repeat))$(b.begin,d,void 0,!A&&c==a.keyCode.BACKSPACE&&!f);else{for(var l=b.begin,m=b.begin;m<b.end;m++)if(n(m)||!f)l=$(b.begin,d,void 0,!A&&c==a.keyCode.BACKSPACE&&!f);f||(b.begin=l)}c=r(-1);K(k(),b.begin,b.end,!0);J(e,!1,!1,k());g().lastValidPosition<c?(g().lastValidPosition=-1,g().p=c):g().p=b.begin}function V(d){W=!1;var c=this,b=e(c),f=d.keyCode,l=z(c);f==
a.keyCode.BACKSPACE||f==a.keyCode.DELETE||ga&&127==f||d.ctrlKey&&88==f?(d.preventDefault(),88==f&&(N=k().join("")),ba(c,f,l),w(),C(c,k(),g().p),c._valueGet()==p().join("")&&b.trigger("cleared"),a.showTooltip&&b.prop("title",g().mask)):f==a.keyCode.END||f==a.keyCode.PAGE_DOWN?setTimeout(function(){var b=r(g().lastValidPosition);a.insertMode||b!=s()||d.shiftKey||b--;z(c,d.shiftKey?l.begin:b,b)},0):f==a.keyCode.HOME&&!d.shiftKey||f==a.keyCode.PAGE_UP?z(c,0,d.shiftKey?l.begin:0):f==a.keyCode.ESCAPE||
90==f&&d.ctrlKey?(J(c,!0,!1,N.split("")),b.click()):f!=a.keyCode.INSERT||d.shiftKey||d.ctrlKey?!1!=a.insertMode||d.shiftKey||(f==a.keyCode.RIGHT?setTimeout(function(){var a=z(c);z(c,a.begin)},0):f==a.keyCode.LEFT&&setTimeout(function(){var a=z(c);z(c,a.begin-1)},0)):(a.insertMode=!a.insertMode,z(c,a.insertMode||l.begin!=s()?l.begin:l.begin-1));b=z(c);!0===a.onKeyDown.call(this,d,k(),a)&&z(c,b.begin,b.end);ca=-1!=e.inArray(f,a.ignorables)}function R(h,c,b,f,m,p){if(void 0==b&&W)return!1;W=!0;var q=
e(this);h=h||window.event;b=c?b:h.which||h.charCode||h.keyCode;if(!(!0===c||h.ctrlKey&&h.altKey)&&(h.ctrlKey||h.metaKey||ca))return!0;if(b){!0!==c&&46==b&&!1==h.shiftKey&&","==a.radixPoint&&(b=44);var n,v,u=String.fromCharCode(b);c?(b=m?p:g().lastValidPosition+1,n={begin:b,end:b}):n=z(this);p=A?1<n.begin-n.end||1==n.begin-n.end&&a.insertMode:1<n.end-n.begin||1==n.end-n.begin&&a.insertMode;var E=l;p&&(e.each(d,function(a,b){"object"==typeof b&&(l=a,g().undoBuffer=k().join(""))}),l=E,ba(this,a.keyCode.DELETE,
n),a.insertMode||e.each(d,function(a,b){"object"==typeof b&&(l=a,aa(n.begin,s()),g().lastValidPosition=r(g().lastValidPosition))}),l=E);var D=k().join("").indexOf(a.radixPoint);a.isNumeric&&!0!==c&&-1!=D&&(a.greedy&&n.begin<=D?(n.begin=G(n.begin),n.end=n.begin):u==a.radixPoint&&(n.begin=D,n.end=n.begin));var F=n.begin;b=t(F,u,m);!0===m&&(b=[{activeMasksetIndex:l,result:b}]);var x=-1;e.each(b,function(b,e){l=e.activeMasksetIndex;g().writeOutBuffer=!0;var c=e.result;if(!1!==c){var f=!1,d=k();!0!==c&&
(f=c.refresh,F=void 0!=c.pos?c.pos:F,u=void 0!=c.c?c.c:u);if(!0!==f){if(!0==a.insertMode){c=s();for(d=d.slice();I(d,c,!0)!=O(c)&&c>=F;)c=0==c?-1:G(c);c>=F?(aa(F,s(),u),d=g().lastValidPosition,c=r(d),c!=s()&&d>=F&&I(k().slice(),c,!0)!=O(c)&&(g().lastValidPosition=c)):g().writeOutBuffer=!1}else H(d,F,u,!0);if(-1==x||x>r(F))x=r(F)}else!m&&(d=F<s()?F+1:F,-1==x||x>d)&&(x=d);x>g().p&&(g().p=x)}});!0!==m&&(l=E,w());if(!1!==f)if(e.each(b,function(a,b){if(b.activeMasksetIndex==l)return v=b,!1}),void 0!=v){var K=
this;setTimeout(function(){a.onKeyValidation.call(K,v.result,a)},0);if(g().writeOutBuffer&&!1!==v.result){var J=k();f=c?void 0:a.numericInput?F>D?G(x):u==a.radixPoint?x-1:G(x-1):x;C(this,J,f);!0!==c&&setTimeout(function(){!0===P(J)&&q.trigger("complete");X=!0;q.trigger("input")},0)}else p&&(g().buffer=g().undoBuffer.split(""))}else p&&(g().buffer=g().undoBuffer.split(""));a.showTooltip&&q.prop("title",g().mask);h&&(h.preventDefault?h.preventDefault():h.returnValue=!1)}}function da(d){var c=e(this),
b=d.keyCode,f=k();a.onKeyUp.call(this,d,f,a);b==a.keyCode.TAB&&a.showMaskOnFocus&&(c.hasClass("focus.inputmask")&&0==this._valueGet().length?(f=p().slice(),C(this,f),z(this,0),N=k().join("")):(C(this,f),f.join("")==p().join("")&&-1!=e.inArray(a.radixPoint,f)?(z(this,M(0)),c.click()):z(this,M(0),M(s()))))}function ea(d){if(!0===X&&"input"==d.type)return X=!1,!0;var c=this,b=e(c);if("propertychange"==d.type&&c._valueGet().length<=s())return!0;setTimeout(function(){var d=e.isFunction(a.onBeforePaste)?
a.onBeforePaste.call(c,c._valueGet(),a):c._valueGet();J(c,!1,!1,d.split(""),!0);C(c,k());!0===P(k())&&b.trigger("complete");b.click()},0)}function ma(d){var c=e(this),b=z(this),f=this._valueGet(),f=f.replace(RegExp("("+Q(p().join(""))+")*"),"");b.begin>f.length&&(z(this,f.length),b=z(this));1!=k().length-f.length||f.charAt(b.begin)==k()[b.begin]||f.charAt(b.begin+1)==k()[b.begin]||n(b.begin)?(J(this,!1,!1,f.split("")),C(this,k()),!0===P(k())&&c.trigger("complete"),c.click()):(d.keyCode=a.keyCode.BACKSPACE,
V.call(this,d));d.preventDefault()}function na(h){q=e(h);if(q.is(":input")){q.data("_inputmask",{masksets:d,activeMasksetIndex:l,opts:a,isRTL:!1});a.showTooltip&&q.prop("title",g().mask);g().greedy=g().greedy?g().greedy:0==g().repeat;if(null!=q.attr("maxLength")){var c=q.prop("maxLength");-1<c&&e.each(d,function(a,b){"object"==typeof b&&"*"==b.repeat&&(b.repeat=c)});s()>=c&&-1<c&&(c<p().length&&(p().length=c),!1==g().greedy&&(g().repeat=Math.round(c/p().length)),q.prop("maxLength",2*s()))}la(h);a.numericInput&&
(a.isNumeric=a.numericInput);("rtl"==h.dir||a.numericInput&&a.rightAlignNumerics||a.isNumeric&&a.rightAlignNumerics)&&q.css("text-align","right");if("rtl"==h.dir||a.numericInput){h.dir="ltr";q.removeAttr("dir");var b=q.data("_inputmask");b.isRTL=!0;q.data("_inputmask",b);A=!0}q.unbind(".inputmask");q.removeClass("focus.inputmask");q.closest("form").bind("submit",function(){N!=k().join("")&&q.change()}).bind("reset",function(){setTimeout(function(){q.trigger("setvalue")},0)});q.bind("mouseenter.inputmask",
function(){!e(this).hasClass("focus.inputmask")&&a.showMaskOnHover&&this._valueGet()!=k().join("")&&C(this,k())}).bind("blur.inputmask",function(){var b=e(this),c=this._valueGet(),f=k();b.removeClass("focus.inputmask");N!=k().join("")&&b.change();a.clearMaskOnLostFocus&&""!=c&&(c==p().join("")?this._valueSet(""):U(this));!1===P(f)&&(b.trigger("incomplete"),a.clearIncomplete&&(e.each(d,function(a,b){"object"==typeof b&&(b.buffer=b._buffer.slice(),b.lastValidPosition=-1)}),l=0,a.clearMaskOnLostFocus?
this._valueSet(""):(f=p().slice(),C(this,f))))}).bind("focus.inputmask",function(){var b=e(this),c=this._valueGet();a.showMaskOnFocus&&!b.hasClass("focus.inputmask")&&(!a.showMaskOnHover||a.showMaskOnHover&&""==c)&&this._valueGet()!=k().join("")&&C(this,k(),r(g().lastValidPosition));b.addClass("focus.inputmask");N=k().join("")}).bind("mouseleave.inputmask",function(){var b=e(this);a.clearMaskOnLostFocus&&(b.hasClass("focus.inputmask")||this._valueGet()==b.attr("placeholder")||(this._valueGet()==p().join("")||
""==this._valueGet()?this._valueSet(""):U(this)))}).bind("click.inputmask",function(){var b=this;setTimeout(function(){var c=z(b),d=k();if(c.begin==c.end){var c=A?M(c.begin):c.begin,f=g().lastValidPosition,d=a.isNumeric?!1===a.skipRadixDance&&""!=a.radixPoint&&-1!=e.inArray(a.radixPoint,d)?a.numericInput?r(e.inArray(a.radixPoint,d)):e.inArray(a.radixPoint,d):r(f):r(f);c<d?n(c)?z(b,c):z(b,r(c)):z(b,d)}},0)}).bind("dblclick.inputmask",function(){var a=this;setTimeout(function(){z(a,0,r(g().lastValidPosition))},
0)}).bind(S+".inputmask dragdrop.inputmask drop.inputmask",ea).bind("setvalue.inputmask",function(){J(this,!0);N=k().join("");this._valueGet()==p().join("")&&this._valueSet("")}).bind("complete.inputmask",a.oncomplete).bind("incomplete.inputmask",a.onincomplete).bind("cleared.inputmask",a.oncleared);q.bind("keydown.inputmask",V).bind("keypress.inputmask",R).bind("keyup.inputmask",da);if(ha||Y||ia||Z)if(q.attr("autocomplete","off").attr("autocorrect","off").attr("autocapitalize","off").attr("spellcheck",
!1),Y||Z)q.unbind("keydown.inputmask",V).unbind("keypress.inputmask",R).unbind("keyup.inputmask",da),"input"==S&&q.unbind(S+".inputmask"),q.bind("input.inputmask",ma);fa&&q.bind("input.inputmask",ea);b=e.isFunction(a.onBeforeMask)?a.onBeforeMask.call(h,h._valueGet(),a):h._valueGet();J(h,!0,!1,b.split(""));N=k().join("");var f;try{f=document.activeElement}catch(m){}f===h?(q.addClass("focus.inputmask"),z(h,r(g().lastValidPosition))):a.clearMaskOnLostFocus?k().join("")==p().join("")?h._valueSet(""):
U(h):C(h,k());ka(h)}}var A=!1,N=k().join(""),q,W=!1,X=!1,ca=!1;if(void 0!=m)switch(m.action){case "isComplete":return P(m.buffer);case "unmaskedvalue":return A=m.$input.data("_inputmask").isRTL,ja(m.$input,m.skipDatepickerCheck);case "mask":na(m.el);break;case "format":return q=e({}),q.data("_inputmask",{masksets:d,activeMasksetIndex:l,opts:a,isRTL:a.numericInput}),a.numericInput&&(a.isNumeric=a.numericInput,A=!0),m=m.value.split(""),J(q,!1,!1,A?m.reverse():m,!0),A?k().reverse().join(""):k().join("");
case "isValid":return q=e({}),q.data("_inputmask",{masksets:d,activeMasksetIndex:l,opts:a,isRTL:a.numericInput}),a.numericInput&&(a.isNumeric=a.numericInput,A=!0),m=m.value.split(""),J(q,!1,!0,A?m.reverse():m),P(k())}};e.inputmask={defaults:{placeholder:"_",optionalmarker:{start:"[",end:"]"},quantifiermarker:{start:"{",end:"}"},groupmarker:{start:"(",end:")"},escapeChar:"\\",mask:null,oncomplete:e.noop,onincomplete:e.noop,oncleared:e.noop,repeat:0,greedy:!0,autoUnmask:!1,clearMaskOnLostFocus:!0,insertMode:!0,
clearIncomplete:!1,aliases:{},onKeyUp:e.noop,onKeyDown:e.noop,onBeforeMask:void 0,onBeforePaste:void 0,onUnMask:void 0,showMaskOnFocus:!0,showMaskOnHover:!0,onKeyValidation:e.noop,skipOptionalPartCharacter:" ",showTooltip:!1,numericInput:!1,isNumeric:!1,radixPoint:"",skipRadixDance:!1,rightAlignNumerics:!0,definitions:{9:{validator:"[0-9]",cardinality:1,definitionSymbol:"*"},a:{validator:"[A-Za-z\u0410-\u044f\u0401\u0451]",cardinality:1,definitionSymbol:"*"},"*":{validator:"[A-Za-z\u0410-\u044f\u0401\u04510-9]",
cardinality:1}},keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91},ignorables:[8,9,13,19,27,33,34,35,36,37,38,39,40,45,46,93,112,113,114,115,116,117,118,119,120,121,122,123],
getMaskLength:void 0,isComplete:void 0},escapeRegex:function(e){return e.replace(RegExp("(\\/|\\.|\\*|\\+|\\?|\\||\\(|\\)|\\[|\\]|\\{|\\}|\\\\)","gim"),"\\$1")},format:function(d,l){var a=e.extend(!0,{},e.inputmask.defaults,l);E(a.alias,l,a);return v(D(a),0,a,{action:"format",value:d})},isValid:function(d,l){var a=e.extend(!0,{},e.inputmask.defaults,l);E(a.alias,l,a);return v(D(a),0,a,{action:"isValid",value:d})}};e.fn.inputmask=function(d,l){var a=e.extend(!0,{},e.inputmask.defaults,l),m,g=0;if("string"===
typeof d)switch(d){case "mask":return E(a.alias,l,a),m=D(a),0==m.length?this:this.each(function(){v(e.extend(!0,{},m),0,a,{action:"mask",el:this})});case "unmaskedvalue":var u=e(this);return u.data("_inputmask")?(m=u.data("_inputmask").masksets,g=u.data("_inputmask").activeMasksetIndex,a=u.data("_inputmask").opts,v(m,g,a,{action:"unmaskedvalue",$input:u})):u.val();case "remove":return this.each(function(){var d=e(this);if(d.data("_inputmask")){m=d.data("_inputmask").masksets;g=d.data("_inputmask").activeMasksetIndex;
a=d.data("_inputmask").opts;this._valueSet(v(m,g,a,{action:"unmaskedvalue",$input:d,skipDatepickerCheck:!0}));d.removeData("_inputmask");d.unbind(".inputmask");d.removeClass("focus.inputmask");var k;Object.getOwnPropertyDescriptor&&(k=Object.getOwnPropertyDescriptor(this,"value"));k&&k.get?this._valueGet&&Object.defineProperty(this,"value",{get:this._valueGet,set:this._valueSet}):document.__lookupGetter__&&this.__lookupGetter__("value")&&this._valueGet&&(this.__defineGetter__("value",this._valueGet),
this.__defineSetter__("value",this._valueSet));try{delete this._valueGet,delete this._valueSet}catch(l){this._valueSet=this._valueGet=void 0}}});case "getemptymask":return this.data("_inputmask")?(m=this.data("_inputmask").masksets,g=this.data("_inputmask").activeMasksetIndex,m[g]._buffer.join("")):"";case "hasMaskedValue":return this.data("_inputmask")?!this.data("_inputmask").opts.autoUnmask:!1;case "isComplete":return this.data("_inputmask")?(m=this.data("_inputmask").masksets,g=this.data("_inputmask").activeMasksetIndex,
a=this.data("_inputmask").opts,v(m,g,a,{action:"isComplete",buffer:this[0]._valueGet().split("")})):!0;case "getmetadata":if(this.data("_inputmask"))return m=this.data("_inputmask").masksets,g=this.data("_inputmask").activeMasksetIndex,m[g].metadata;break;default:return E(d,l,a)||(a.mask=d),m=D(a),0==m.length?this:this.each(function(){v(e.extend(!0,{},m),g,a,{action:"mask",el:this})})}else{if("object"==typeof d)return a=e.extend(!0,{},e.inputmask.defaults,d),E(a.alias,d,a),m=D(a),0==m.length?this:
this.each(function(){v(e.extend(!0,{},m),g,a,{action:"mask",el:this})});if(void 0==d)return this.each(function(){var d=e(this).attr("data-inputmask");if(d&&""!=d)try{var d=d.replace(RegExp("'","g"),'"'),g=e.parseJSON("{"+d+"}");e.extend(!0,g,l);a=e.extend(!0,{},e.inputmask.defaults,g);E(a.alias,g,a);a.alias=void 0;e(this).inputmask(a)}catch(m){}})}}}})(jQuery);



$(document).ready(function(){
	$('input[type="tel"]').inputmask('+7 (999) 999-99-99');
});

$(document).ready(function(){
	$('#menu').slicknav();
});