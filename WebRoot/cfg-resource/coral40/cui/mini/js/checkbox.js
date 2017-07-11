/*!
 * 组件库4.0：下拉框
 * 
 * 依赖JS文件：
 *    jquery.coral.core.js
 *    jquery.coral.component.js
 */
(function(a){a.component("coral.checkbox",a.coral.formelement,{version:"4.0.1",castProperties:["triggers"],options:{showStar:true,id:null,name:null,value:"",label:"",maxLabelWidth:"auto",labelField:null,starBefore:false,title:"",width:"auto",height:null,disabled:false,required:false,readonly:false,checked:false,errMsg:null,errMsgPosition:"leftBottom",onValidError:null,onKeyDown:null,onValidSuccess:null,onChange:a.noop,triggers:null,excluded:false},_create:function(){var e=this,d=this.options,f=d.maxLabelWidth,c=d.label;e.originalValue="";if(!e.element.jquery){e.element=a(e.element)}e.element.addClass("coral-form-element-checkbox");e.element.addClass("coral-validation-checkbox");typeof e.element.attr("id")=="undefined"&&!!e.options.id&&e.element.attr("id",e.options.id);e.options.id=e.element.uniqueId().attr("id");var b=e.element.attr("name");typeof b!="undefined"?(e.options.name=b):(e.element.attr("name",e.options.name));if(a.trim(e.element.val())!=""&&a.trim(e.element.val())!="on"){e.options.value=e.element.val()}else{if(e.options.value){e.element.val(e.options.value)}}if(e.options.name){e.nameMark="coral-checkbox-element-"+e._hashCode(e.options.name);e.element.addClass(e.nameMark)}e.uiCheckbox=a('<span class="coral-checkbox"></span>');e.uiLabel=a('<label class="coral-checkbox-label" for=\''+e.options.id+"'></label>");e.uiIcon=a('<span class="coral-checkbox-icon"></span>');if(f=="auto"){e.uiText=a('<span class="coral-checkbox-text"></span>')}else{e.uiText=a("<span class='coral-checkbox-text'  title='"+c+"' style='max-width:"+f+"px;'></span>")}e.uiLabel.append(e.uiIcon);e.uiLabel.append(this.uiText);if(e.options.label){e.uiText.append(e.options.label)}if(e.options.title){e.uiLabel.attr("title",e.options.title)}if(e.options.checked){e.uiIcon.addClass("cui-icon-checkbox-checked coral-checkbox-hightlight");e.element.prop("checked",true)}else{e.uiIcon.addClass("cui-icon-checkbox-unchecked");
e.element.prop("checked",false)}e.element.after(e.uiCheckbox);e.uiCheckbox.append(e.element).append(e.uiLabel);if(d.labelField){this.uiLabelField=a('<label class="coral-label">'+d.labelField+"</label>");this.uiCheckbox.prepend(this.uiLabelField);this.uiCheckbox.addClass("coral-hasLabel")}if((e.element)[0].checked===true){e.originalValue=e.options.value}e._bindEvent();e._trigger("onCreate",null,[])},reset:function(){if(this.originalValue===""){this.uncheck()}else{this.check()}},_getCheckboxs:function(){var c=this,b=c.element.closest("form");if(!c.nameMark){return c.element}if(b.length>0){return b.find(a("."+c.nameMark))}else{return a("."+c.nameMark)}},_setDisabled:function(b){if(b){this.element.prop("disabled",true);this.uiCheckbox.addClass("coral-state-disabled")}else{this.element.prop("disabled",false);this.uiCheckbox.removeClass("coral-state-disabled")}this.options.disabled=(b?true:false)},_setReadonly:function(b){if(b){this.element.prop("readonly",true);this.uiCheckbox.addClass("coral-readonly")}else{this.element.prop("readonly",false);this.uiCheckbox.removeClass("coral-readonly")}this.options.readonly=!!b},focus:function(){var b=this;if(this.options.disabled||this.options.readonly){return false}this.element.focus();return true},_bindEvent:function(){var b=this;if(this.options.disabled){this._setDisabled(this.options.disabled)}this.element.bind("change",function(c){if(a(this).prop("checked")){b.uiIcon.removeClass("cui-icon-checkbox-unchecked ").addClass("cui-icon-checkbox-checked coral-checkbox-hightlight")}else{b.uiIcon.removeClass("cui-icon-checkbox-checked coral-checkbox-hightlight").addClass("cui-icon-checkbox-unchecked")}b._trigger("onChange",c,[{checked:!!b.element.prop("checked")}])}).bind("focus",function(c){b.uiCheckbox.addClass("coral-checkbox-highlight")}).bind("blur",function(){b.uiCheckbox.removeClass("coral-checkbox-highlight")}).bind("keydown"+this.eventNamespace,function(c){b._trigger("onKeyDown",c,{})});this.uiCheckbox.bind("mouseenter"+this.eventNamespace,function(){if(b.options.disabled||b.uiCheckbox.hasClass("coral-checkbox-highlight")||b.uiCheckbox.hasClass("coral-checkbox-highlight")){return
}a(this).addClass("coral-checkbox-hover")}).bind("mouseleave"+this.eventNamespace,function(){if(b.options.disabled){return}a(this).removeClass("coral-checkbox-hover")});this.uiLabel.bind("click",function(c){if(b.options.readonly||b.options.isLabel){return false}b._trigger("onClick",c,{})})},_setOption:function(b,c){if(b==="id"||b==="name"){return}if(b==="readonly"){this._setReadonly(c)}if(b==="disabled"){this._setDisabled(c)}if(b==="label"){this.uiText.html(c)}if(b==="maxLabelWidth"){var d=c;if(c!="auto"){d=d+"px";this.uiText.attr("title",this.options.label)}else{d="";this.uiText.attr("title","")}this.uiText.css("max-width",d)}this._super(b,c)},_destroy:function(){this.uiCheckbox.replaceWith(this.element);this.uncheck();this.element.removeAttr("value");this.element.removeClass("coral-form-element-checkbox");this.element.removeClass("coral-validation-checkbox");this.element.removeClass(this.nameMark)},_hashCode:function(f){if(!f){return 0}f=""+f;var d=0,e=0,b=f.length;for(var c=0;c<b;c++){d=31*d+f.charCodeAt(e++);if(d>2147483647||d<2147483648){d=d&4294967295}}return d},component:function(){return this.uiCheckbox},disable:function(){this._setDisabled(true)},readonly:function(){this._setReadonly(true)},enable:function(){this._setDisabled(false)},show:function(){this.component().show()},hide:function(){this.component().hide()},check:function(){if(!this.uiIcon.hasClass("coral-checkbox-hightlight")){this.uiIcon.removeClass("cui-icon-checkbox-unchecked").addClass("cui-icon-checkbox-checked coral-checkbox-hightlight");this.element.prop("checked",true)}},uncheck:function(){if(this.uiIcon.hasClass("coral-checkbox-hightlight")){this.uiIcon.removeClass("cui-icon-checkbox-checked coral-checkbox-hightlight").addClass("cui-icon-checkbox-unchecked");this.element.prop("checked",false)}},isChecked:function(){return this.element.prop("checked")},getValue:function(){return this.getValues().join(",")},getValues:function(){var c=this,b=[];c._getCheckboxs().each(function(){var d=a(this);if(d.checkbox("isChecked")){b.push(d.val())
}});return b},refresh:function(){this._destroy();this._create()}})})(jQuery);