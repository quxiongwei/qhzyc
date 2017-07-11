
var RelGrid;var tRgrid;var url;var count=0;var old_cols="";
function loadLogicRelation(tabbar, treeName, that) {
	RelGrid = tabbar.cells("tab$table$01").attachGrid();
	tabbar.cells("tab$table$01").detachToolbar();
	var toolbar = tabbar.cells("tab$table$01").attachToolbar();
	toolbar.setIconsPath(TOOLBAR_IMAGE_PATH);
	toolbar.addButton("add", 1, "新增", "new.gif");
	toolbar.addSeparator("top$septr$01", 2);
	toolbar.addButton("modify", 3, "修改", "update.gif");
	toolbar.addSeparator("top$septr$01", 4);
	toolbar.addButton("delete", 5, "删除", "delete.gif");
	var logicGroupRelation = loadJson(AppActionURI.logicGroupRelation + "!search.json?Q_EQ_id=" + nodeId).data[0];
	tRgrid  = {
			format: {
				headers: ["源逻辑表","源逻辑表字段","目标逻辑表","目标逻辑表字段"],
				userdata: [5],
				colWidths: ["260","260","260","*"],
				colTypes: ["ro","ro","ro","ro"],
				colAligns: ["left","left","left","left"]
			}
		};
			    
	url = AppActionURI.logicTableRelation + "!getAllLogicTableRelationList.json?P_tableCode="+ logicGroupRelation.tableCode + "&P_groupCode=" + logicGroupRelation.groupCode;
	initGridWithoutColumnsAndPageable(RelGrid, tRgrid, url);
	
	toolbar.attachEvent("onClick", function(id){
		if (id == "add"){
			var win = openLogicRelationWin(treeName,null,that,logicGroupRelation);
			win.attachEvent("onClose", function(win){
				loadGridData(RelGrid, tRgrid, url);
				count=0;
				return true;
   			 });
		}else if(id == "modify"){
			var selectId = RelGrid.getSelectedRowId();
			var reTableCode = RelGrid.getUserData(selectId,"userdata_0");
			if(reTableCode == ""){
				dhtmlx.message(getMessage("select_record"));
				return;
			}
			var win = openLogicRelationWin(treeName, reTableCode,that,logicGroupRelation);
			win.attachEvent("onClose", function(win){
				loadGridData(RelGrid, tRgrid, url);	
				count=0;
				return true;
   			 });
			//initAgainGrid(RelGrid, tRgrid, url);
		}else if(id == "delete"){
			var selectId = RelGrid.getSelectedRowId();
			if(selectId == undefined){
				dhtmlx.message(getMessage("select_record"));
				return;
			}
			var str= new Array();  
			str=selectId.split(",");
			var curr = "";
			var next = "";
			var reId = "";
			for(var i=0;i<str.length;i++){
				if(i==str.length-1){continue;}
				reId = RelGrid.getUserData(str[i],"userdata_0");
				curr = reId;
				next = RelGrid.getUserData(str[i+1],"userdata_0");
				if(curr!=next){
					dhtmlx.message("选择存在多重表关系,请选择一张源表对应一张目标表");
					return ;
				}
				curr="";
				next="";
			}
			dhtmlx.confirm({
				type:"confirm",
				text: getMessage("delete_warning"),
				ok: "确定",
				cancel: "取消",
				callback: function(flag) {
					if (flag) {
						MODEL_URL = AppActionURI.logicTableRelation;
						deleteById(selectId, function(loader){
							var jsonObj = eval("(" + loader.xmlDoc.responseText + ")");
							if (jsonObj.success) {
					    		dhtmlx.message(getMessage("operate_success"));
					    		that.isChange = true;
					   		 } else {
					    		dhtmlx.message(getMessage("operate_failure"));
					    	}
							loadGridData(RelGrid, tRgrid, AppActionURI.logicTableRelation + "!getAllLogicTableRelationList.json?P_tableCode="+ logicGroupRelation.tableCode + "&P_groupCode=" + logicGroupRelation.groupCode);	
						});
					}
				}
			});
		}
	});
	pageable = true;
}

/**
 * 打开新增或修改表关系窗口
 * @param tableShowName
 *        表显示名称
 * @param relatedTableId
 *        关系表ID(如果关系ID为null，则为新增窗口，否则为修改窗口)
 */
function openLogicRelationWin(tableShowName, relatedTableCode,that,logicGroupRelation) {
	var _this = this;
	var dhxtrWins = new dhtmlXWindows();
    dhxtrWins.setImagePath(IMAGE_PATH);
    var title = relatedTableCode ? "修改逻辑表关系" : "新增逻辑表关系";
    var h=document.body.clientHeight;
    var height=600;
    if(height>document.body.clientHeight){
    	height=document.body.clientHeight;
    }
    var win = dhxtrWins.createWindow("win$tableRelation", 0, 0, 850, height);
	win.setModal(true);
	win.denyResize();
	win.button("park").hide();
	win.button("minmax1").hide();
	win.button("minmax2").hide();
	win.setText(title);
	win.center();
	var mTableCode;
	var dhxLayout = win.attachLayout("4W");
	dhxLayout.cont.obj._offsetTop = 1;
	dhxLayout.cont.obj._offsetLeft = 1;
	dhxLayout.cont.obj._offsetHeight = -2;
	dhxLayout.cont.obj._offsetWidth = -2;
	dhxLayout.setSizes();
	var sbar = dhxLayout.attachStatusBar();
	var btbar = new dhtmlXToolbarObject(sbar.id);
	btbar.setIconPath(IMAGE_PATH);
	btbar.addButton("bottom$save", 0, "保存", "save.gif");
	btbar.addSeparator("botton$septr$01", 1);
	btbar.addButton("bottom$close", 4, "关闭", "default/close.png");
	btbar.setAlign("right");
	btbar.attachEvent("onClick", function(itemId) {
		if ("bottom$close" == itemId) {
			win.close();
		}  else if ("bottom$save" == itemId) {
			mTableCode = inpselcet.getSelectedValue();
			var cnt = hGrid.getRowsNum();
			if (0 == cnt) {
				dhtmlx.message("请先进行列表字段配置，再保存！");
				return;
			}
			var rowsValue = "";
			hGrid.forEachRow(function(rowId) {
				rowsValue += ";" + rowId;
			});
			//如果是修改,则判断关系是否已经改变
			if(relatedTableCode){
				if(count==0){
					dhtmlx.message("配置没有改变,不需要保存操作.");
					return;
				}
				if(rowsValue==old_cols){
					dhtmlx.message("配置没有改变,不需要保存操作.");
					return ;
				}
			}
			rowsValue = rowsValue.substring(1);
			var surl = AppActionURI.logicTableRelation + "!saveColumn.json?P_rowsValue=" + rowsValue + "&Q_tableCode=" + mTableCode + "&Q_parentTableCode=" + logicGroupRelation.tableCode + "&Q_groupCode=" + logicGroupRelation.groupCode;
			dhtmlxAjax.get(surl,function(loader){
				var jsonObj = eval("(" + loader.xmlDoc.responseText + ")");
				if (jsonObj.success) {
			    	dhtmlx.message(getMessage("operate_success"));
			    	that.isChange = true;
			    } else {
			    	dhtmlx.message(getMessage("operate_failure"));
				//initAgainGrid(RelGrid, tRgrid, url);
			    }
				//var curl = AppActionURI.tableRelation + "!getAllTableRelationList.json?E_model_name=datagrid&Q_tableId="+ nodeId;
				win.close();
			});
		}
	});
	
	var yLayout = dhxLayout.cells("a");
	var mLayout = dhxLayout.cells("b");
	var cLayout = dhxLayout.cells("c");
	var hLayout = dhxLayout.cells("d");
	//yLayout.setText("源字段");
	yLayout.setWidth(205);
	
	yLayout.hideHeader();
	var ttbar = dhxLayout.attachToolbar();
	ttbar.setIconsPath(IMAGE_PATH);
	ttbar.addDiv("top$columndiv", 0);
	var sform = initSearchArea(tableShowName);
	
	ttbar.addDiv("inpselcetDiv", 3);
	var inpselcet = new dhtmlXCombo("inpselcetDiv","inpselcet",193);
	inpselcet.readonly(false);
	
	var od = new Array();
	var url = relatedTableCode ? (AppActionURI.logicTableDefine + "!search.json?Q_EQ_code=" + relatedTableCode + "&F_in=showName") :
		(AppActionURI.logicGroupRelation + "!getComboOfLogicTable.json?P_parentTableCode=" + logicGroupRelation.tableCode + "&P_groupCode=" + logicGroupRelation.groupCode);
	var datas = loadJson(url);
	//如果是修改,下拉框就只有一个值.
	if(!relatedTableCode){
		od.push({value: "", text: "请选择目标表"});
		for (var i = 0; i < datas.length; i++) {
			od.push(datas[i]);
		}
	}else{
		od.push({value: relatedTableCode, text: datas.data[0].showName});
	}
	inpselcet.addOption(od);
	inpselcet.selectOption(0);
	
	
	var yGrid = dhxLayout.cells("a").attachGrid();
	var mGrid = dhxLayout.cells("b").attachGrid();
	var hGrid = dhxLayout.cells("d").attachGrid();
	var ytbar = dhxLayout.cells("a").attachToolbar();
	var mtbar = dhxLayout.cells("b").attachToolbar();
	ytbar.addInputText("ysearch", 0, "字段检索", 180);	
	mtbar.addInputText("msearch", 0, "字段检索", 180);	
	ytbar.attachEvent("onEnter", function(itemId, value) {
		if ("ysearch" == itemId) {
			searchRelationList(yGrid, value);
		}
	});
	mtbar.attachEvent("onEnter", function(itemId, value) {
		if ("msearch" == itemId) {
			searchRelationList(mGrid, value);
		}
	});
	
	//获取光标事件
	ytbar.attachEvent("onFocus", function(itemId) {
		ytbar.setValue("ysearch","");
	});
	//获取光标失焦事件
	ytbar.attachEvent("onblur", function(itemId) {
		ytbar.setValue("ysearch","字段检索");
	});
	
	
	//获取光标事件
	mtbar.attachEvent("onFocus", function(itemId) {
		mtbar.setValue("msearch","");
	});
	//获取光标失焦事件
	mtbar.attachEvent("onblur", function(itemId) {
		mtbar.setValue("msearch","字段检索");
	});
	
	
	function searchRelationList(grid, value) {
		if (null == grid) return;
		grid.forEachRow(function(rowId) {
			grid.setRowHidden(rowId, false);
		});
		if (null ==value || "" == value) return;
		value = value.toLowerCase();
		var hideRowIds = [];
		grid.forEachRow(function(rowId) {
			var columnData = grid.cells(rowId,0).getValue();
			if (columnData.toLowerCase().indexOf(value) < 0) {
				hideRowIds.push(rowId);
			}
		});
		for (var i = 0; i < hideRowIds.length; i++) {
			grid.setRowHidden(hideRowIds[i], true);
		}
	};
	
	inpselcet.attachEvent("onChange", function() {
		mTableCode = inpselcet.getSelectedValue();
		if(inpselcet.optionsArr.length==1) return;
		var rurl = AppActionURI.logicTableRelation + "!getShowMbTableColum.json?Q_tableCode=" + logicGroupRelation.tableCode+ "&Q_groupCode=" + logicGroupRelation.groupCode + "&Q_relationTableCode=" + mTableCode;
		loadGridData(mGrid, rcfg, rurl);
		hGrid.clearAll();
	});
	
	//cLayout.setText("操作区");
	cLayout.hideHeader();

	//hLayout.setText("目标表");
	mLayout.setWidth(205);
	mLayout.hideHeader();
	//hLayout.setText("合并表");
	hLayout.setWidth(280);
	hLayout.hideHeader();
	
	var lcfg = {
			format: {
				headers: ["源逻辑表字段"],
				//cols: ["show_name"],
				//userdata: [1, 2],
				colWidths: ["200"],
				colTypes: ["ro"],
				colAligns: ["left"]
			}
		};
		var rcfg = {
				format: {
					headers: ["目标逻辑表字段"],
					//cols: ["col_name", "sort"],
					colWidths: ["200"],
					colTypes: ["ro"],
					colAligns: ["left"]
				}
			};
			
		var hcfg = {
				format: {
					headers: ["源逻辑表字段","目标逻辑表字段"],
					//cols: [1, 2],
					//userdata:[3,4],
					colWidths: ["136", "135"],
					colTypes: ["ro", "ro"],
					colAligns: ["left", "left"]
				}
			};
	
	mGrid.enableDragAndDrop(true);
	var lurl = AppActionURI.logicTableRelation + "!getShowYTableColum.json?Q_tableCode=" + logicGroupRelation.tableCode + "&Q_groupCode=" + logicGroupRelation.groupCode;
	var rurl;
	var hurl;
	if (relatedTableCode) {
		rurl = AppActionURI.logicTableRelation + "!getShowMbTableColum.json?Q_tableCode=" + logicGroupRelation.tableCode+ "&Q_groupCode=" + logicGroupRelation.groupCode + "&Q_relationTableCode=" + relatedTableCode; 
		hurl = AppActionURI.logicTableRelation + "!getShowRelationColum.json?Q_tableCode="+ relatedTableCode + "&Q_groupCode=" + logicGroupRelation.groupCode;
	}
	
	initGridWithoutColumnsAndPageable(yGrid, lcfg, lurl);
	initGridWithoutColumnsAndPageable(mGrid, rcfg, rurl);
	initGridWithoutColumnsAndPageable(hGrid, hcfg, hurl);
	
	var formcfg = [{
		type:"label",
		list: [{
			type: "button",
			offsetLeft:"30",
			name: "toRight",
			value: "&gt;"
		},{
			type: "button",
			offsetLeft:"30",
			name: "toLeft",
			value: "&lt;"
		}]
	}];
	
	createEmptyDiv("DIV-oparatorArea");
	var buttonForm = new dhtmlXForm("DIV-oparatorArea", formcfg);
	dhxLayout.cells("c").attachObject("DIV-oparatorArea");
	buttonForm.attachEvent("onButtonClick", function(id){
    	if(count==0){
    		hGrid.forEachRow(function(id){
    			old_cols += ";"+id;
		   });
    		count++;
    	}
	    if ("toRight" == id) {
	    	var hIds;
	    	
	    	var yId = yGrid.getSelectedRowId();
	    	if (null == yId) return;
	    	var yname  = yGrid.cells(yId,0).getValue();
	    	
	    	var mId = mGrid.getSelectedRowId();
	    	if (null == mId) return;
	    	var mbname  = mGrid.cells(mId,0).getValue();
	    	hIds = yId+"'"+mId;
	    	hGrid.addRow(hIds, [yname,mbname], 3);
	    	yGrid.deleteSelectedRows();
	    	mGrid.deleteSelectedRows();
	    } else if ("toLeft" == id) {
	    	var rowIds = hGrid.getSelectedRowId();
	    	if (null == rowIds) return;
	    	var rowArray = rowIds.split(",");
	    	for (var i = 0; i < rowArray.length; i++) {
	    		var name  = hGrid.cells(rowArray[i], 0).getValue();
	    		var vname = hGrid.cells(rowArray[i], 1).getValue();
	    		var rId = rowArray[i].split("'");
	    			yGrid.addRow(rId[0], name);
	    			mGrid.addRow(rId[1], vname);
	    	}
	    	hGrid.deleteSelectedRows();
	    }
	});
	return win;
	
	function initSearchArea(tableShowName) {
		var sformJson = [{type: "input", name: "searchcolumn",value:tableShowName, className: "dhx_toolbar_form", readonly:"true", width:195, inputHeight:17}];
		var form = new dhtmlXForm("top$columndiv",sformJson);
		return form;
	}
}

function initAgainGrid(grid, gridcfg, url) {
	grid.setImagePath(IMAGE_PATH);
	grid.setHeader(gridcfg.format.headers.toString());
	grid.setInitWidths(gridcfg.format.colWidths.toString());
	grid.setColTypes(gridcfg.format.colTypes.toString());
	grid.setColAlign(gridcfg.format.colAligns.toString());
	grid.setSkin(Skin);
	grid.enableMultiselect(true);
	grid.setStyle("font-weight:bold;", "", "", "");
	loadGridData(grid, gridcfg, url);
}