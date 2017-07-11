/*!
 * 组件库4.0： 窗体
 *
 * 依赖JS文件:
 *	jquery.coral.core.js
 *	jquery.coral.component.js
 *	jquery.coral.mouse.js
 *  jquery.coral.button.js
 *	jquery.coral.draggable.js
 *	jquery.coral.position.js
 *	jquery.coral.resizable.js
 */
(function(c,d){var a={buttons:true,height:true,maxHeight:true,maxWidth:true,minHeight:true,minWidth:true,width:true},b={maxHeight:true,maxWidth:true,minHeight:true,minWidth:true},e=null;c.component("coral.dialog",{version:"4.0.1",castProperties:["buttons"],options:{appendTo:"body",autoOpen:true,buttons:[],closeOnEscape:true,closeText:"关闭",closeButtonClass:"cui-icon-cross2",closable:true,loadtext:"加载中，请耐心等候 ...",maximumText:"最大化",maximizable:false,maximized:false,restoreWidth:200,restoreHeight:200,dialogClass:"",iframePanel:false,draggable:true,hide:null,height:"auto",percent:false,manualResize:false,maxHeight:null,maxWidth:null,minHeight:150,minWidth:150,modal:false,zIndex:null,timeOut:0,position:{my:"center",at:"center",of:window,collision:"fit",using:function(g){var f=c(this).css(g).offset().top;if(f<0){c(this).css("top",g.top-f)}}},resizable:true,show:null,title:null,subTitle:null,type:null,wtype:"dialog",message:null,width:300,url:"",reLoadOnOpen:false,postData:[],asyncType:"post",beforeClose:null,onCreate:null,onClose:null,onDrag:null,onDragStart:null,onDragStop:null,onFocus:null,onLoad:null,onLoadError:null,onOpen:null,onResize:null,onResizeStart:null,onResizeStop:null,onConfirm:null,onCancel:null,focusInput:false},_create:function(){var g=this;var f=/^(\d|[1-9]\d|100)%$/;if(f.test(this.options.height)){this.options.percent=this.options.height;this.options.height=this._percentToPx()}if(c.inArray(this.options.wtype,["dialog","message","alert","confirm"])<0){this.options.wtype="dialog"}if(this.options.wtype!=="dialog"){this.options.minHeight=null}this.originalCss={display:this.element[0].style.display,width:this.element[0].style.width,minHeight:this.element[0].style.minHeight,maxHeight:this.element[0].style.maxHeight,height:this.element[0].style.height};
this.originalPosition={parent:this.element.parent(),index:this.element.parent().children().index(this.element)};this.originalTitle=this.element.attr("title");this.options.title=this.options.title||this.originalTitle;this.originalsubTitle=this.element.attr("subTitle");this.options.subTitle=this.options.subTitle||this.originalsubTitle;this._createWrapper();var h=this.options.isMessage?"alert-box":"coral-dialog-content";this.element.show().removeAttr("title").addClass(h+" coral-component-content").appendTo(this.uiDialog);if(this.options.wtype!=="dialog"){this.uiDialog.addClass("coral-messager")}switch(this.options.wtype){case"alert":this._createTitlebar();this._createButtonPanel();break;case"message":break;case"confirm":this._createTitlebar();this._createButtonPanel();break;case"dialog":this._createTitlebar();this._createButtonPanel()}if(this.options.draggable&&c.fn.draggable){this._makeDraggable()}if(this.options.resizable&&c.fn.resizable){this._makeResizable()}this._isOpen=false;this._trackFocus()},_init:function(){if(this.options.autoOpen){this.open()}},_appendTo:function(){var f=this.options.appendTo;if(typeof f=="string"&&f=="parent"){return this.originalPosition.parent}if(f&&(f.jquery||f.nodeType)){return c(f)}return this.document.find(f||"body").eq(0)},forceDestroy:function(){var f=this;this._destroy(true)},_destroy:function(h){var g,f=this.originalPosition;this._destroyOverlay();this.element.removeUniqueId().removeClass("coral-dialog-content coral-component-content").css(this.originalCss).detach();this.uiDialog.stop(true,true).remove();if(this.options.iframePanel){this.iframePanel.stop(true,true).remove()}if(!h){if(this.originalTitle){this.element.attr("title",this.originalTitle)}g=f.parent.children().eq(f.index);if(g.length&&g[0]!==this.element[0]){g.before(this.element)}else{f.parent.append(this.element)}}},component:function(){return this.uiDialog},disable:c.noop,enable:c.noop,close:function(j){var i,h=this,g,f=this.originalPosition;if(this.options.reLoadOnOpen){this.loaded=false
}if(!this._isOpen||this._trigger("beforeClose",j)===false){return}if(h.options.destroyOnClose){h.element.html("")}if(h.options.url!=""&&h.options.reLoadOnOpen&&h.options.autoDestroy){h.element.html("")}this._hide(this.uiDialog,this.options.hide,function(){g=f.parent.children().eq(f.index);if(g.length&&g[0]!==h.element[0]){g.before(h.uiDialog)}else{f.parent.append(h.uiDialog)}h._isOpen=false;h._focusedElement=null;h._destroyOverlay();h._untrackInstance();if(c.inArray(h.options.wtype,["dialog","alert","confirm"])>-1){if(h.opener.length&&h.opener[0].tagName.toLowerCase()!="object"&&!h.opener.filter(":focusable").focus().length){try{i=h.document[0].activeElement;if(i&&i.nodeName.toLowerCase()!=="body"){c(i).blur()}}catch(k){}}}if("dialog"!==h.options.wtype){h.element.remove()}h._trigger("onClose",j)});if(this.options.iframePanel){this.iframePanel.hide()}},isOpen:function(){return this._isOpen},moveToTop:function(){this._moveToTop()},_moveToTop:function(j,g){var i=false,f=this.uiDialog.siblings(".coral-front:visible").map(function(){return +c(this).css("z-index")}).get(),h=Math.max.apply(null,f);if(h>=+this.uiDialog.css("z-index")){this.uiDialog.css("z-index",h+1);if(this.options.iframePanel){this.iframePanel.css("z-index",h+1)}i=true}if(i&&!g){this._trigger("onFocus",j)}return i},open:function(){var h=this,g={panel:h.element};this.uiDialog.appendTo(this._appendTo());var i=this.options.url&&!h.loaded;if(i){c(h.element).loading({position:"overlay",text:"加载中，请耐心等候！"});h.loaded=true;c.ajax({url:this.options.url,type:this.options.asyncType,dataType:"html",data:this.options.postData,success:function(k,j,l){c(h.element).loading("hide");h.element.html(k);c(h.element).loading({text:"渲染中，请耐心等候！",position:"overlay"});if(c.coral.openTag==true){c.parser.parse(h.element)}c(h.element).loading("hide");h._trigger("onLoad",null,g);c.coral.refreshAllComponent(h.element)},error:function(l,j,k){h._trigger("onLoadError",null,[{xhr:l,st:j,err:k}])},beforeSend:function(k,j){}})}e=null;if(this._isOpen){if(this._moveToTop()){if(c.inArray(h.options.wtype,["dialog","alert","confirm"])>-1){this._focusTabbable()
}}return}this._isOpen=true;this.opener=c(this.document[0].activeElement);this._size();this._position();this._createOverlay();this._moveToTop(null,true);if(this.overlay){this.overlay.css("z-index",this.uiDialog.css("z-index")-1);if(this.options.iframePanel){this.overlay.css("z-index",this.iframePanel.css("z-index")-1)}}this._show(this.uiDialog,this.options.show,function(){if(c.inArray(h.options.wtype,["dialog","alert","confirm"])>-1){h._focusTabbable()}if(!i){c.coral.refreshAllComponent(h.element)}if(h.options.iframePanel){h.iframePanel.show();h.iframePanel.css("width",h.uiDialog.outerWidth())}h._trigger("onFocus")});this._makeFocusTarget();this._trigger("onOpen");if(!isNaN(this.options.timeOut)&&this.options.timeOut>0){e=setTimeout(f,h.options.timeOut);this.uiDialog.hover(function(){if(e){clearTimeout(e)}},function(){e=setTimeout(f,h.options.timeOut)})}function f(){h.close()}},_focusTabbable:function(){var f=this._focusedElement;if(this.options.focusInput===true){this._focusFirst();return}if(!f){f=this.element.find("[autofocus]")}if(!f.length){f=this.element.find(":tabbable")}if(!f.length&&this.uiDialogButtonPane){f=this.uiDialogButtonPane.find(":tabbable")}if(!f.length&&this.uiDialogTitlebarClose){f=this.uiDialogTitlebarClose.filter(":tabbable")}if(!f.length){f=this.uiDialog}f.eq(0).focus()},_findFields:function(){return c.coral.findComponent(".ctrl-form-element",this.element)},_focusFirst:function(){var j=this,g=this._findFields();for(var h in g){var f=g[h];if(g[h] instanceof Array){if(true==c(f[0].element)[f[0].name]("focus")){return}}else{if(f.focus&&true==f.focus()){return}}}},_keepFocus:function(f){function g(){var i=this.document[0].activeElement,h=this.uiDialog[0]===i||c.contains(this.uiDialog[0],i);if(!h){this._focusTabbable()}}f.preventDefault();g.call(this);this._delay(g)},_createWrapper:function(){this.uiDialog=c("<div>").addClass("coral-dialog coral-component coral-component-content coral-corner-all coral-front "+this.options.dialogClass).hide().attr({tabIndex:-1,role:"dialog"}).appendTo(this.element.parent());
if(this.options.iframePanel){this.iframePanel=c("<iframe class='coral-dialog-iframePanel' style='position:absolute;'></iframe>").hide().appendTo(this._appendTo())}if(this.options.zIndex){this.uiDialog.css("z-index",this.options.zIndex);if(this.options.iframePanel){this.iframePanel.css("z-index",this.options.zIndex)}}this._on(this.uiDialog,{keydown:function(h){if(this.options.closeOnEscape&&!h.isDefaultPrevented()&&h.keyCode&&h.keyCode===c.coral.keyCode.ESCAPE){h.preventDefault();this.close(h);return}if(h.keyCode!==c.coral.keyCode.TAB||h.isDefaultPrevented()){return}var g=this.uiDialog.find(":tabbable"),i=g.filter(":first"),f=g.filter(":last");if((h.target===f[0]||h.target===this.uiDialog[0])&&!h.shiftKey){this._delay(function(){i.focus()});h.preventDefault()}else{if((h.target===i[0]||h.target===this.uiDialog[0])&&h.shiftKey){this._delay(function(){f.focus()});h.preventDefault()}}},mousedown:function(f){if(this._moveToTop(f)){this._focusTabbable()}}});if(!this.element.find("[aria-describedby]").length){this.uiDialog.attr({"aria-describedby":this.element.uniqueId().attr("id")})}},_createTitlebar:function(){var g=this.options,f;this.uiDialogTitlebar=c("<div>").addClass("coral-dialog-titlebar coral-component-header coral-corner-all coral-helper-clearfix").prependTo(this.uiDialog);this.uiDialogToolbar=c("<div>").addClass("coral-dialog-toolbar coral-corner-all coral-helper-clearfix").appendTo(this.uiDialogTitlebar);this._on(this.uiDialogTitlebar,{mousedown:function(h){if(!c(h.target).closest(".coral-dialog-toolbar-close")&&!c(h.target).closest(".coral-dialog-toolbar-maximum")){this.uiDialog.focus()}}});if(this.options.maximizable){this.uiDialogTitlebarMaximum=c("<button type='button'></button>").button({label:this.options.maximumText,icons:{primary:"cui-icon-enlarge7"},text:false}).addClass("coral-dialog-toolbar-maximum").appendTo(this.uiDialogToolbar);this._on(this.uiDialogTitlebarMaximum,{click:function(h){h.preventDefault();if(!this.uiDialog.hasClass("coral-dialog-maximum")){this.maximize()
}else{this.restore()}c.coral.refreshAllComponent(this.element);this._trigger("onMaximize",null,{width:c(window).outerWidth(),height:c(window).outerHeight()})}})}if(this.options.closable){this.uiDialogTitlebarClose=c("<button type='button'></button>").button({label:this.options.closeText,icons:{primary:this.options.closeButtonClass},text:false}).addClass("coral-dialog-toolbar-close").appendTo(this.uiDialogToolbar);this._on(this.uiDialogTitlebarClose,{click:function(h){var i=c(h.target);i.removeClass("coral-state-hover");h.preventDefault();this.close(h)}})}f=c("<span>").uniqueId().addClass("coral-dialog-title").prependTo(this.uiDialogTitlebar);this._title(f);uiDialogsubTitle=c("<span>").uniqueId().addClass("coral-dialog-subTitle").prependTo(this.uiDialogTitlebar);this._subTitle(uiDialogsubTitle);this.uiDialog.attr({"aria-labelledby":f.attr("id")});if(this.options.maximizable&&this.options.maximized){this.maximize();c.coral.refreshAllComponent(this.element)}},maximize:function(g){var f=this.options;f.restoreHeight=f.height;f.restoreWidth=f.width;c(this.element).dialog("option","width",c(window).width());c(this.element).dialog("option","height",c(window).height());this.uiDialog.addClass("coral-dialog-maximum");this.uiDialogTitlebarMaximum.find(".cui-icon-enlarge7").removeClass("cui-icon-enlarge7").addClass("cui-icon-shrink7");if(this.options.iframePanel){this.iframePanel.css({width:c(window).width(),height:c(window).height()})}},minimize:function(){},restore:function(){var g=this,f=this.options;c(g.element).dialog("option","width",f.restoreWidth);c(g.element).dialog("option","height",f.restoreHeight);g.uiDialog.removeClass("coral-dialog-maximum");if(this.options.iframePanel){this.iframePanel.css({width:f.restoreWidth,height:f.restoreHeight});this.iframePanel.position(f.position)}g.uiDialogTitlebarMaximum.find(".cui-icon-shrink7").removeClass("cui-icon-shrink7").addClass("cui-icon-enlarge7")},_title:function(g){var f=c.coral.toFunction(this.options.titleFormat);if(!this.options.title){g.html("&#160;")
}if(f){g.html(f.call(this.element,this.options.title))}else{g.text(this.options.title)}},_subTitle:function(f){if(!this.options.subTitle){f.html("&#160;")}f.text(this.options.subTitle)},_createButtonPanel:function(){this.uiDialogButtonPane=c("<div>").addClass("coral-dialog-buttonpane coral-component-content coral-helper-clearfix");this.uiButtonSet=c("<div>").addClass("coral-dialog-buttonset").appendTo(this.uiDialogButtonPane);this._createButtons()},_createButtons:function(){var j=this,i=this.options.buttons,f=c.noop,h=c.noop;this.uiDialogButtonPane.remove();this.uiButtonSet.empty();if(c.isEmptyObject(i)){i={}}if((c.isArray(i)&&!i.length)){this.uiDialog.removeClass("coral-dialog-buttons");return}var g=true;c.each(i,function(k,l){var m,o,n="coral-btn-primary";l=c.isFunction(l)?{click:l,text:k}:l;l=c.extend({type:"button"},l);m=l.click;l.click=function(){m.apply(j.element[0],arguments)};o={icons:l.icons,icons:l.cls,countdown:l.countdown,text:l.showText};if(l.id){o.id=l.id}if(g){o=c.extend({},o,{cls:n+" "+l.cls})}else{o=c.extend({},o,{cls:l.cls})}delete l.icons;delete l.cls;delete l.showText;c("<button></button>",l).button(o).appendTo(j.uiButtonSet);g=false});this.uiDialog.addClass("coral-dialog-buttons");this.uiDialogButtonPane.appendTo(this.uiDialog)},_makeDraggable:function(){var h=this,g=this.options;function f(i){return{position:i.position,offset:i.offset}}this.uiDialog.draggable({cancel:".coral-dialog-content, .coral-dialog-toolbar-close",handle:".coral-dialog-titlebar",containment:"document",start:function(i,j){c(this).addClass("coral-dialog-dragging");h._blockFrames();if(h.options.iframePanel){h.iframePanel.css(j.position)}h._trigger("onDragStart",i,f(j))},drag:function(i,j){if(h.options.iframePanel){h.iframePanel.css(j.position)}h._trigger("onDrag",i,f(j))},stop:function(i,j){var l=j.offset.left-h.document.scrollLeft(),k=j.offset.top-h.document.scrollTop();g.position={my:"left top",at:"left"+(l>=0?"+":"")+l+" top"+(k>=0?"+":"")+k,of:h.window};c(this).removeClass("coral-dialog-dragging");
if(h.options.iframePanel){h.iframePanel.position(g.position)}h._unblockFrames();h._trigger("onDragStop",i,f(j))}})},_makeResizable:function(){var k=this,i=this.options,j=i.resizable,f=this.uiDialog.css("position"),h=typeof j==="string"?j:"n,e,s,w,se,sw,ne,nw";function g(l){return{originalPosition:l.originalPosition,originalSize:l.originalSize,position:l.position,size:l.size}}this.uiDialog.resizable({cancel:".coral-dialog-content",containment:"document",alsoResize:this.element,maxWidth:i.maxWidth,maxHeight:i.maxHeight,minWidth:i.minWidth,minHeight:this._minHeight(),handles:h,start:function(l,m){c(this).addClass("coral-dialog-resizing");k.manualResize=true;if(k.options.iframePanel){k.iframePanel.css(m.position);k.iframePanel.css(m.size)}k._blockFrames();k._trigger("onResizeStart",l,g(m))},resize:function(l,m){if(k.options.iframePanel){k.iframePanel.css(m.position);k.iframePanel.css(m.size)}c.coral.refreshAllComponent(k.element);k._trigger("onResize",l,g(m))},stop:function(l,m){var p=k.uiDialog.offset(),o=p.left-k.document.scrollLeft(),n=p.top-k.document.scrollTop();i.height=k.uiDialog.height();i.width=k.uiDialog.width();i.position={my:"left top",at:"left"+(o>=0?"+":"")+o+" top"+(n>=0?"+":"")+n,of:k.window};c(this).removeClass("coral-dialog-resizing");if(k.options.iframePanel){k.iframePanel.position(i.position);k.iframePanel.position(m.size)}k._unblockFrames();k._trigger("onResizeStop",l,g(m))}}).css("position",f)},_trackFocus:function(){this._on(this.component(),{focusin:function(f){this._makeFocusTarget();this._focusedElement=c(f.target)}})},_makeFocusTarget:function(){this._untrackInstance();this._trackingInstances().unshift(this)},_untrackInstance:function(){var g=this._trackingInstances(),f=c.inArray(this,g);if(f!==-1){g.splice(f,1)}},_trackingInstances:function(){var f=this.document.data("coral-dialog-instances");if(!f){f=[];this.document.data("coral-dialog-instances",f)}return f},_minHeight:function(){var f=this.options;return f.height==="auto"?f.minHeight:Math.min(f.minHeight,f.height)
},_position:function(){var g=this.options.position,j=[0,0],h=[],i,f;if(g){if(typeof g==="string"||(typeof g==="object"&&"0" in g)){h=g.split?g.split(" "):[g[0],g[1]];if(h.length===1){h[1]=h[0]}c.each(["left","top"],function(l,k){if(+h[l]===h[l]){j[l]=h[l];h[l]=k}});g={my:h[0]+(j[0]<0?j[0]:"+"+j[0])+" "+h[1]+(j[1]<0?j[1]:"+"+j[1]),at:h.join(" ")}}g=c.extend({},c.coral.dialog.prototype.options.position,g)}else{g=c.coral.dialog.prototype.options.position}f=this.uiDialog.is(":visible");if(!f){this.uiDialog.show()}if(this.options.iframePanel){i=this.iframePanel.is(":visible");if(!i){this.iframePanel.show()}}if(this.options.queue){c("#coral-msgBox").position(g)}else{this.uiDialog.position(g);if(this.options.iframePanel){this.iframePanel.position(g)}}if(!f){this.uiDialog.hide()}if(this.options.iframePanel){if(!i){this.iframePanel.hide()}}},_setOptions:function(h){var i=this,g=false,f={};c.each(h,function(j,k){i._setOption(j,k);if(j in a){g=true}if(j in b){f[j]=k}});if(g&&!c(i.element).is(":hidden")){this._size();this._position()}if(this.uiDialog.is(":data(coral-resizable)")){this.uiDialog.resizable("option",f)}},_setOption:function(h,i){var g,j,f=this.uiDialog;if(h==="dialogClass"){f.removeClass(this.options.dialogClass).addClass(i)}if(h==="disabled"){return}this._super(h,i);if(h==="appendTo"){this.uiDialog.appendTo(this._appendTo())}if(h==="buttons"){this._createButtons()}if(h==="maximumText"){this.uiDialogTitlebarMaximum.button({label:""+i})}if(h==="closeText"){this.uiDialogTitlebarClose.button({label:""+i})}if(h==="draggable"){g=f.is(":data(coral-draggable)");if(g&&!i){f.draggable("destroy");if(this.options.iframePanel){this.iframePanel.draggable("destroy")}}if(!g&&i){this._makeDraggable()}}if(h==="position"){this._position()}if(h==="resizable"){j=f.is(":data(coral-resizable)");if(j&&!i){f.resizable("destroy");if(this.options.iframePanel){this.iframePanel.resizable("destroy")}}if(j&&typeof i==="string"){f.resizable("option","handles",i)}if(!j&&i!==false){this._makeResizable()
}}if(h==="title"){this._title(this.uiDialogTitlebar.find(".coral-dialog-title"))}if(h==="subTitle"){this._subTitle(this.uiDialogTitlebar.find(".coral-dialog-subTitle"))}},_size:function(){var f,h,j,g=this.options;this.element.hide().css({width:"auto",minHeight:0,maxHeight:"none",height:0});if(g.minWidth>g.width){g.width=g.minWidth}f=this.uiDialog.css({height:"auto",width:g.width}).outerHeight();this.element.show();h=Math.max(0,g.minHeight-f);j=typeof g.maxHeight==="number"?Math.max(0,g.maxHeight-f):"none";if(g.height==="auto"){this.element.css({minHeight:h,maxHeight:j,height:"auto"})}else{var i=/^(\d|[1-9]\d|100)%$/;if(i.test(this.options.height)){this.options.percent=this.options.height;this.element.height(Math.max(0,this._percentToPx()-f))}else{this.element.height(Math.max(0,this.options.height-f))}}if(this.uiDialog.is(":data(coral-resizable)")){this.uiDialog.resizable("option","minHeight",this._minHeight())}if(this.options.iframePanel){this.iframePanel.css({width:this.uiDialog.outerWidth(),height:this.uiDialog.outerHeight()})}},_blockFrames:function(){this.iframeBlocks=this.document.find("iframe").map(function(){var f=c(this);return c("<div>").css({position:"absolute",width:f.outerWidth(),height:f.outerHeight()}).appendTo(f.parent()).offset(f.offset())[0]})},_unblockFrames:function(){if(this.iframeBlocks){this.iframeBlocks.remove();delete this.iframeBlocks}},_allowInteraction:function(f){if(c(f.target).closest(".coral-dialog").length){return true}return !!c(f.target).closest(".coral-datepicker").length},_createOverlay:function(){if(!this.options.modal){return}var f=true;this._delay(function(){f=false});if(!this.document.data("coral-dialog-overlays")){this._on(this.document,{focusin:function(g){if(f){return}if(!this._allowInteraction(g)){g.preventDefault();var h=this.document.find(".coral-dialog:visible:last .coral-dialog-content").data(this.componentFullName);if(h&&h._focusTabbable){}}}})}this.overlay=c("<div>").addClass("coral-component-overlay coral-front").appendTo(this._appendTo());
if(this.options.appendTo!="body"){this.overlay.css({position:"relative"})}this._on(this.overlay,{mousedown:"_keepFocus"});this.document.data("coral-dialog-overlays",(this.document.data("coral-dialog-overlays")||0)+1)},_destroyOverlay:function(){if(!this.options.modal){return}if(this.overlay){var f=this.document.data("coral-dialog-overlays")-1;if(!f){this.document.unbind("focusin").removeData("coral-dialog-overlays")}else{this.document.data("coral-dialog-overlays",f)}this.overlay.remove();this.overlay=null}},buttonPanel:function(){return this.uiButtonSet},hide:function(){this._isOpen=false;this.component().hide()},_percentToPx:function(){var i=this,f=this.options,h=f.percent,g=c(window);maxHeight=g.height()*parseInt(h.substring(0,h.length-1))/100;return maxHeight},refresh:function(){var i=this,f=this.options,h=f.percent;var g=/^(\d|[1-9]\d|100)%$/;if(g.test(h)&&!f.manualResize){maxHeight=i._percentToPx();f.height=maxHeight;setTimeout(function(){c(i.element).dialog("option","height",maxHeight)},0)}else{}}})}(jQuery));