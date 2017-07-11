package com.ces.component.trace.code;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.ces.config.application.CodeApplication;
import com.ces.config.dhtmlx.entity.code.Code;

/**
 * <h2>上海中信信息发展股份有限公司</h2>
 * 
 * @author Hpu.Plain
 * 
 * @version V1.0
 * 
 * @category 复合框下拉列表数据：蔬菜种植-使用菜田（菜田档案）
 * 
 */
public class ZzctdaCode extends CodeApplication {

	@Override
	public String getCodeValue(String name) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getCodeName(String value) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Code> getCodeList(String codeTypeCode) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Object getCodeTree(String codeTypeCode) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Object getCodeGrid(String codeTypeCode) {
		// TODO Auto-generated method stub
		Map<String, Object> gcfg = new HashMap<String, Object>();
		gcfg.put("colNames", getColNames());
		gcfg.put("colModel", getColModel());
		gcfg.put("url", "zzctda!getCtdaGrid.json");
		// 设置点击是，需要获得的是那个数据 textField 显示的数据，和隐藏数据
		gcfg.put("valueField", "CTBH");
		gcfg.put("textField", "CTMC");
		gcfg.put("panelWidth", 250);
		return gcfg;
	}

	protected List<String> getColNames() {
		List<String> list = new ArrayList<String>();
		list.add("菜田编号");
		list.add("菜田名称");
		return list;
	}

	protected List<Map<String, Object>> getColModel() {
		List<Map<String, Object>> colModel = new ArrayList<Map<String, Object>>();
		Map<String, Object> item = null;

		item = new HashMap<String, Object>();
		item.put("name", "CTBH");
		item.put("width", 100);
		colModel.add(item);

		item = new HashMap<String, Object>();
		item.put("name", "CTMC");
		item.put("width", 150);
		colModel.add(item);
		return colModel;
	}

}
