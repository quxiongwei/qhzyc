package com.ces.component.trace.code;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.ces.config.application.CodeApplication;
import com.ces.config.dhtmlx.entity.code.Code;

public class JyzmcCode extends CodeApplication {

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
		List<Map<String, Object>> a = getColModel();
		gcfg.put("colNames", getColNames());
		gcfg.put("colModel", getColModel());
		gcfg.put("url", "jyzxx!getJyzxx.json?xtlx=PC");
		gcfg.put("gridOptions", "{ajaxGridOptions:{async:false}}");
		gcfg.put("valueField", "JYZBM");// 列表中PFSBM列值作为 显示值
		gcfg.put("textField", "JYZMC");// 列表中PFSMC列值作为 隐藏值
		gcfg.put("panelWidth",350);
		gcfg.put("pager",false);
		return gcfg;
	}
	
	protected List<String> getColNames() {
        List<String> list = new ArrayList<String>();
        list.add("经营者编码");
        list.add("经营者名称");
        list.add("经营类型");
        return list;
    }
	
	protected List<Map<String, Object>> getColModel() {
		List<Map<String, Object>> colModel = new ArrayList<Map<String, Object>>();
		Map<String, Object> item =null;
		
		item = new HashMap<String, Object>();
		item.put("name", "JYZBM");
		item.put("width", 100);
		colModel.add(item);
		
		item = new HashMap<String, Object>();
		item.put("name", "JYZMC");
		item.put("width", 125);
		colModel.add(item);

		item = new HashMap<String, Object>();
		item.put("name", "JYLX");
		item.put("width", 125); 
		colModel.add(item);

        return colModel;
    }
}
