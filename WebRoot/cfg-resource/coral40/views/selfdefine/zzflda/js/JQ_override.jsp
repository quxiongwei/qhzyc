<%@page language="java" pageEncoding="UTF-8"%>
<script type="text/javascript">
/***************************************************!
 * @author qiucs 
 * @date   2014-7-15
 * 系统配置平台应用自定义二次开发JS模板 
 ***************************************************/
 
 
(function(subffix) {

/**
 * 二次开发定位自己controller
 * @returns {String}
 **/
window[CFG_actionName(subffix)] = function () {
	// this.assembleData 就是 configInfo
	return $.contextPath + "/zzflda";
};
	

/**
 * 二次开发：复写自定义表单
 */
function _override_form (ui) {
	if(isEmpty(ui.options.dataId)){//肥料 与所属企业编码初始化
		ui._init = function () {
			var flbh=$.loadJson($.contextPath + '/zzflda!getFlbh.json');
			var qybm=$.loadJson($.contextPath + '/zzcdda!getQybm.json');
			ui.setFormData({FLBH:flbh,QYBM:qybm});
		}
	}

	ui.bindEvent = function(){
		var scrqJQ = ui.getItemJQ("SCRQ");//生产日期
		var dqrqJQ = ui.getItemJQ("DQRQ");//到期日期
		scrqJQ.datepicker("option","onChange",function(){
			var scrqData = scrqJQ.datepicker( "getDateValue" );
			var dqrqData = dqrqJQ.datepicker( "getDateValue" );
			if(dqrqData.length != 0){
				if(dqrqData >= scrqData){
					//alert(true);
				}else{
					//dqrqJQ.datepicker( "setDate" ,"");
					scrqJQ.datepicker( "setDate" ,"");
					CFG_message("生产日期不能大于到期日期！", "warning");
				}
			}
		});

		dqrqJQ.datepicker("option","onChange",function(){
			var scrqData = scrqJQ.datepicker( "getDateValue" );
			var dqrqData = dqrqJQ.datepicker( "getDateValue" );
			if(scrqData.length != 0){
				if(dqrqData >= scrqData){
					//alert(true);
				}else{
					dqrqJQ.datepicker( "setDate" ,"");
					//scrqJQ.datepicker( "setDate" ,"");
					CFG_message("生产日期不能大于到期日期！", "warning");
				}
			}
		});
	}
};
/**
 *  二次开发：复写自定义列表
 */
function _override_grid (ui) {
	// ui.assembleData 就是 configInfo
	//console.log("override grid!");
	//ui.getAction = function () {
	//	return $.contextPath + "/appmanage/show-module";
	//};
};
/**
 *  二次开发：复写自定义树
 */
function _override_tree (ui) {
	// ui.assembleData 就是 configInfo
	//console.log("override tree!");
	//ui.getAction = function () {
	//	return $.contextPath + "/appmanage/show-module";
	//};
};
/**
 *  二次开发：复写自定义工具条
 */
function _override_tbar (ui) {
	// ui.assembleData 就是 configInfo
	//console.log("override tbar!");
	//ui.getAction = function () {
	//	return $.contextPath + "/appmanage/show-module";
	//};
};
/**
 *  二次开发：复写自定义布局
 */
function _override_layout (ui) {
	//console.log("override layout!");
	//ui.getAction = function () {
	//	return $.contextPath + "/appmanage/show-module";
	//};
};








/**
 * 在此可以复写所有自定义JS类
 * @param selector
 * @returns {JQ_override}
 */
window[CFG_overrideName(subffix)] = function () {
	
	//var startTime = new Date().getTime();
	
	if (this instanceof $.config.cform) {
		_override_form(this);
	} else if (this instanceof $.config.cgrid) {
		_override_grid(this);
	} else if (this instanceof $.config.ctree) {
		_override_tree(this);
	} else if (this instanceof $.config.ctbar) {
		_override_tbar(this);
	} else if (this instanceof $.config.clayout) {
		_override_layout(this);
	}
	
	//console.log("over ride cost time: " + (new Date().getTime() - startTime));
};

	
	
	
	
})("${timestamp}");
</script>