/*!
 * 组件库4.0：下拉框
 * 
 * 依赖JS文件：
 *    jquery.coral.core.js
 *    jquery.coral.component.js
 */

( function( $ ) {
"use strict";
	
$.component( "coral.checkbox", {
	version: "4.0.1",
	castProperties : ["triggers"],
	options: {
		showStar: true,
		id: null,
		name: null,
		value: null,
		label: "",
		maxLabelWidth:"auto",
		labelField: null,
		starBefore: false,
		title: "",//只有设置maxLabelWidth属性的时候会显示title
		width: "auto",
		height: null,
		disabled: false,
		required: false,
		readonly: false,
		checked: false,
		errMsg: null,
		errMsgPosition: "leftBottom",
		onValidError: null,
		onKeyDown: null,
		onValidSuccess: null,
		onChange: $.noop,  /* 参数 ( event, { checked: boolean } ) */
		triggers: null, // 覆盖 validate 里的 triggers
		excluded: false // true 则不单独校验
	},
    _create: function() {
    	var that = this,
    		options = this.options,
    		maxLabelWidth = options.maxLabelWidth,
    		label = options.label;
    	
    	if ( !that.element.jquery ) {
    		that.element = $(that.element);
    	}    		
    	
    	that.element.addClass("coral-form-element-checkbox");
    	that.element.addClass("coral-validation-checkbox");

    	typeof that.element.attr("id") == "undefined" && !!that.options.id&&that.element.attr( "id", that.options.id );
    	that.options.id = that.element.uniqueId().attr("id");
    	
    	var name = that.element.attr("name");
    	typeof name != "undefined"?(that.options.name = name):(that.element.attr("name", that.options.name));
    	
    	if ( $.trim(that.element.val()) != "" && $.trim(that.element.val()) != "on" ) {
    		that.options.value = that.element.val();
    	} else if (that.options.value) {
    		that.element.val(that.options.value);
    	}
    	// 便于查找同一个name的所复选框
    	if (that.options.name) {
    		that.nameMark = "coral-checkbox-element-" + that._hashCode(that.options.name);
    		that.element.addClass(that.nameMark);
    	}    	
    	
		that.uiCheckbox = $("<span class=\"coral-checkbox\"></span>");
		that.uiLabel = $("<label class=\"coral-checkbox-label\" for='"+that.options.id+"'></label>");
		that.uiIcon = $("<span class=\"coral-checkbox-icon\"></span>");
		if ( maxLabelWidth == "auto" ){
			that.uiText = $("<span class=\"coral-checkbox-text\"></span>");
		}else{
			that.uiText = $("<span class=\'coral-checkbox-text\'  title=\'"+label+"\' style=\'max-width:"+maxLabelWidth+"px;\'></span>");
		}
			
		that.uiLabel.append(that.uiIcon);		
		that.uiLabel.append(this.uiText);
		if (that.options.label) {
			that.uiText.append(that.options.label);			
		}		
		if (that.options.title) {
			that.uiLabel.attr("title", that.options.title);
		}
		if (that.options.checked) {
			that.uiIcon.addClass("icon icon-checkbox-checked");
			that.element.prop("checked", true);
		} else {
			that.uiIcon.addClass("icon icon-checkbox-unchecked");
			that.element.prop("checked", false);
		}
		
		that.element.after(that.uiCheckbox);
		that.uiCheckbox.append(that.element).append(that.uiLabel);
		// add label and required star before function @lhb @2015-04-27 add labelField attribute
		if (options.labelField) {
			this.uiLabelField = $("<label class=\"coral-label\">"+ options.labelField +"</label>");
			this.uiCheckbox.prepend(this.uiLabelField);
			this.uiCheckbox.addClass("coral-hasLabel");
		}
		// add label and required star before function @lhb @2015-04-27
		that._bindEvent();
		
		that._trigger("onCreate", null, []);
	},
	// 获取checkbox name相同的list
	_getCheckboxs: function () {
		var that = this,
			form  = that.element.closest("form");
		
		if (!that.nameMark) return that.element;
		
		if ( form.length > 0 ) {
			return form.find($("."+that.nameMark+":visible")); 
		} else {
			return $("."+that.nameMark+":visible");
		}
	},
	_setDisabled: function(disabled) {
		//this._setOption("disabled", disabled);
		
		if (disabled) {
			this.element.prop("disabled", true);
			this.uiCheckbox.addClass("coral-state-disabled");			
		} else {
			this.element.prop("disabled", false);
			this.uiCheckbox.removeClass("coral-state-disabled");
		}
		
		this.options.disabled = ( disabled ? true : false );
	},
	_setReadonly: function(readonly) {
		if (readonly) {
			this.element.prop("readonly", true);
			this.uiCheckbox.addClass("coral-readonly");			
		} else {
			this.element.prop("readonly", false);
			this.uiCheckbox.removeClass("coral-readonly");
		}	
		this.options.readonly = !!readonly;
	},
	/**
	 * 获取焦点方法
	 */
	focus: function() {
		var that = this;
		if (this.options.disabled || this.options.readonly) return false;
		
		this.element.focus();
		return true;
	},
	_bindEvent: function() {
		var that = this;
		
		if ( this.options.disabled ) {
			this._setDisabled(this.options.disabled);
		}	
		
		this.element.bind("change", function(event){
			if ($(this).prop("checked")) {
				that.uiIcon.removeClass("icon-checkbox-unchecked").addClass("icon-checkbox-checked");
			} else {
				that.uiIcon.removeClass("icon-checkbox-checked").addClass("icon-checkbox-unchecked");
			}
			that._trigger("onChange", event, [{ checked: !!that.element.prop("checked") }]);
		}).bind( "focus", function(event) {
			that.uiCheckbox.addClass("coral-checkbox-highlight");
		}).bind( "blur", function() {
			that.uiCheckbox.removeClass("coral-checkbox-highlight");
		}).bind( "keydown" + this.eventNamespace, function(e) {
			that._trigger("onKeyDown", e, {});
		});
		
		this.uiCheckbox.bind("mouseenter" + this.eventNamespace, function() {
			if (that.options.disabled || that.uiCheckbox.hasClass("coral-checkbox-highlight") || that.uiCheckbox.hasClass("coral-checkbox-highlight")) {
				return;
			}
			$(this).addClass("coral-checkbox-hover");
		}).bind("mouseleave" + this.eventNamespace, function() {
			if (that.options.disabled) {
				return;
			}
			$(this).removeClass("coral-checkbox-hover");
		});
		this.uiLabel.bind("click" ,function(e){
			if (that.options.readonly) {
				return false;
			}
			that._trigger("onClick", e, {});
		})
	},
	//设置属性处理
	_setOption: function(key, value) {
		//默认属性不允许更改
		if (key === "id" || key === "name") {
			return;
		}
		if (key === "readonly") {
			this._setReadonly(value);
		} 
		if (key === "disabled") {
			this._setDisabled(value);
		} 
		if (key === "label") {
			this.uiText.html(value);
		} 
		if (key ==="maxLabelWidth"){
			var maxLabelWidth = value;
			if ( value != "auto" ){
				maxLabelWidth = maxLabelWidth+"px";
				this.uiText.attr("title",this.options.label);
			} else {
				maxLabelWidth = "";
				this.uiText.attr("title","");
			}
			this.uiText.css("max-width",maxLabelWidth);
		}
		/*if (key === "isLabel") {
			this._setIsLabel(value);
			return;
		}*/
		this._super(key, value );
	},
	_destroy : function() {
		this.uiCheckbox.replaceWith( this.element );

		this.element.removeClass("coral-form-element-checkbox");
		this.element.removeClass("coral-validation-checkbox");
		this.element.removeClass(this.nameMark);
	},
	// hash code
	_hashCode : function (str) {
		if (!str) return 0;
		str = "" + str;
		var h = 0, off = 0, len = str.length;
        for (var i = 0; i < len; i++) { 
        	h = 31 * h  + str.charCodeAt(off++);
        	if ( h > 0x7fffffff || h < 0x80000000) {  
        		h=h & 0xffffffff; 
        	}
        }
        return h; 
	},	
	component : function() {
		return this.uiCheckbox;
	},
	disable : function() {
		this._setDisabled(true);
	},
	readonly: function(){
		this._setReadonly(true);
	},
	enable : function() {
		this._setDisabled(false);
	},
	show : function() {
		this.component().show();
	},
	hide : function() {
		this.component().hide();
	},
	reset : function() {
		if (this.options.multiple) {
			this.setValues(this.options.originalValue);
		} else {
			this.setValue(this.options.originalValue);
		}
	},
	check : function() {
		if (this.uiIcon.hasClass("icon-checkbox-unchecked")) {
			this.uiIcon.removeClass("icon-checkbox-unchecked").addClass("icon-checkbox-checked");
			this.element.prop("checked", true);
		}		
	},	
	uncheck : function() {
		if (this.uiIcon.hasClass("icon-checkbox-checked")) {
			this.uiIcon.removeClass("icon-checkbox-checked").addClass("icon-checkbox-unchecked");
			this.element.prop("checked", false);
		}	
	},
	isChecked: function() {
		return this.element.prop("checked");
	},
	getValue: function() {
		return this.getValues();
		/*if (this.isChecked()) {
			return this.element.val();
		}

		return "";*/
	},
	getValues : function() {
		var that = this,
			valArr = [];
		
		that._getCheckboxs().each(function() {
			var jq = $(this);
			if (jq.checkbox("isChecked")) {
				valArr.push(jq.val());
			}
		});
		return valArr.toString();
	},
	refresh : function() {
		this._destroy();
		this._create();
	}
});
})(jQuery);