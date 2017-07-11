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
window[CFG_actionName(subffix)] = function (ui) {
	// ui.assembleData 就是 configInfo
	return $.contextPath + "/yzslda";
};
	

/**
 * 二次开发：复写自定义表单
 */
	function _override_form (ui) {
	if(isEmpty(ui.options.dataId)){
		ui._init = function () {
			//默认添加所属账户编号
			var slbh=$.loadJson($.contextPath + "/yzslda!getSlbh.json");
			//默认添加所属账户编号
			var qybm=$.loadJson($.contextPath + "/yzcdda!getQybm.json");
			ui.setFormData({SLBH:slbh,QYBM:qybm});
		}
	
	}
	ui.bindEvent=function(){
		var scrq=ui.getItemJQ("SCRQ");
		var dqrq=ui.getItemJQ("DQRQ");

		scrq.datepicker("option","onChange",function(e,data){
//			var  scrqDate=data.value;
//			//alert(dqrq.datepicker("getDate"));
//			var  sDate=new Date(scrqDate);
//			var  scrqValue=sDate.getDate();
//
//			var  dqrqDate=dqrq.datepicker("getDate");
//			var date=new Date(dqrqDate);
//
//            var dqrqValue=date.getDate();
//
//
//			//if(dqrq.datepicker("getDate")==''){}
//			if(dqrqValue!=null && scrqValue>dqrqValue){
//
//				$.alert("生产日期不可大于到期日期");
//				scrq.datepicker("setValue", "");
//				dqrq.datepicker("setValue","");
//
//			}
			var scrqValue=$(e.target).datepicker("getDate").getTime();
			var dqrqValue=dqrq.datepicker("getDate").getTime();
			if(dqrqValue!=null && scrqValue>dqrqValue){

				$.alert("生产日期不可大于到期日期");
				scrq.datepicker("setValue", "");
				dqrq.datepicker("setValue","");

			}

		});

       dqrq.datepicker("option","onChange",function(e,data){
//		   var dqrqDate=new Date(data.value);
//		   var dqrqValue=dqrqDate.getDate();
//		   var scrqDate=scrq.datepicker("getDate");
//		   var sDate=new Date(scrqDate);
//		   var scrqValue=sDate.getDate();
		   var dqrqValue=$(e.target).datepicker("getDate").getTime();
		   var scrqValue=scrq.datepicker("getDate").getTime();
		   if(dqrqValue<scrqValue){
			   $.alert("到期日期不可小于生产日期");
			   dqrq.datepicker("setValue","");

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
