(function(f,e,a,g){var b="easyinput",d="easytext",c=b+d.charAt(0).toUpperCase()+d.slice(1);f.component(b+"."+d,{options:{currentValue:"",values:[],maxWidth:200,minWidth:80,maxChars:200,storage:"array",ajaxConfig:{url:"/",id:"",UPDATETemplate:"",UPDATEData:{},GETCallback:null}},_name:d,_input:null,_id:null,_valuesIndex:null,_classUnChanged:null,_classEmpty:null,_classOnEdit:null,_classChanged:null,_classEasyText:d.toLowerCase(),_setListeners:function(){this._input.bind({focus:this._focusBehaviour,input:this._autoGrownBehaviour,blur:this._blurBehaviour,storageChange:this._storageChange})},_getClassName:function(h){return this._name.toLowerCase()+"-"+h},_setClassNames:function(){this._classOnHover=this._getClassName("onHover");this._classUnChanged=this._getClassName("unChanged");this._classOnEdit=this._getClassName("onEdit");this._classChanged=this._getClassName("changed");this._classEmpty=this._getClassName("empty")},_setVars:function(){var h=this.element;this._input=h;h.uniqueId();this._valuesIndex=0;this._id=this._name+"-"+h.attr("id");h.attr("maxLength",this.options.maxChars)},_setRuler:function(){var i="#"+this._name+"-ruler",j=f(i),h=this._input;if(!j.length){String.prototype.visualLength=function(){var k=f(i);k.html(this.replace(/&/g,"&amp;").replace(/\s/g,"&nbsp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"));return k.width()};j=f('<span id="'+i.substr(1)+'"></span>');j.css({fontSize:h.css("fontSize"),fontFamily:h.css("font-family"),fontWeight:h.css("fontWeight"),position:"absolute",visibility:"hidden",whiteSpace:"nowrap"});f("body").after(j)}},_initializeAjax:function(){var h=this.options.ajaxConfig;if(!f.isFunction(h.GETCallback)){return}if(h.url.charAt(h.url.length-1)!=="/"){h.url+="/"}if(!h.id){h.id=this._id}f.ajax({url:h.url+h.id,succes:h.GETCallback})},_setState:function(){var h=this._input,m=h.val(),i=m.visualLength(),k=this.options.minWidth,l=this.options.maxWidth,j;if(i<k){j=k}else{if(l<i){j=l}else{j=i}}h.width(j);if(h.val().length===0){h.removeClass(this._classChanged);
h.addClass(this._classEmpty)}else{h.addClass(this._classChanged)}},_focusBehaviour:function(){var i=f(this).data(c),h=i._input;h.removeClass(i._classChanged+" "+i._classUnChanged+" "+i._classEmpty).addClass(i._classOnEdit)},_autoGrownBehaviour:function(){var l=f(this).data(c),h=l._input,m=h.val(),j=l.options.minWidth,k=l.options.maxWidth,i=m.visualLength();if(i<j){i=j}else{if(i>k){i=k}}h.width(i)},_blurBehaviour:function(){var j=f(this).data(c),h=j._input,k=h.val(),i=j.options.ajaxConfig,l;h.removeClass(j._classOnEdit);if(k.length===0){h.addClass(j._classEmpty)}else{h.addClass(j._classChanged);j.option("values",k);j._valuesIndex=j.option("values").length-1;if(j.options.storage==="ajax"){i.UPDATEData.value=h.val();f.ajax({url:i.url+i.id,data:j._tmpl(i.UPDATETemplate,i.UPDATEData),type:"UPDATE"})}}j._setState()},_tmpl:function(j,i){var h=typeof(j)!=="string"?(function(){throw {name:"Invalid Parameter",message:"You must insert a string into the function"}}()):new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+j.replace(/[\r\t\n]/g," ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g,"$1\r").replace(/\t=(.*?)%>/g,"',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'")+"');}return p.join('');");return i?h(i):h},_setOption:function(i,j){var h=this.options;switch(i){case"values":h.values.push(j);if(h.storage==="localStorage"){localStorage.setItem(this._id,JSON.stringify(h.values))}return;case"currentValue":this.option("values",j);this._input.val(j);break}this._super("_setOption",i,j)},_create:function(){var i,h,j=this.options.storage;this._setClassNames();this._setVars();this._setListeners();h=this._input;h.addClass(this._classEasyText);if(j==="localStorage"){if(localStorage[this._id]){i=JSON.parse(localStorage[this._id]);this.options.values=i;h.val(i[i.length-1]);this._valuesIndex=i.length-1}}else{if(j==="ajax"){this._initializeAjax()}}this._setRuler();this._setState()},_destroy:function(){this._input.attr("class","")
},deleteStorage:function(){var i=this.options.ajaxConfig,h=this.options.storage;if(h==="localStorage"){localStorage.removeItem(this._id)}else{if(h==="ajax"){f.ajax({url:i.url+i.id,type:"DELETE"})}}this.options.values=[];this._input.val("");this._setState()},getNextBackValue:function(j){var h=this.option("values"),i=this._valuesIndex;if(j===g){j=true}if(typeof(j)!=="boolean"){throw new Error("Invalid parameter")}i+=j?1:(-1);if(h[i]===g){return -1}this._valuesIndex=i;this._input.val(h[i]);this._setState();return h[i]}})})(jQuery,window,document);