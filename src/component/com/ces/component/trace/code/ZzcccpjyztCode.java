package com.ces.component.trace.code;

import com.ces.component.trace.utils.DataDictionaryUtil;
import com.ces.config.application.CodeApplication;
import com.ces.config.dhtmlx.entity.code.Code;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2015/9/10.
 */
public class ZzcccpjyztCode extends CodeApplication {

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
        return DataDictionaryUtil.getInstance().getDictionaryData("ZZCSWTBJ");
    }

    @Override
    public Object getCodeTree(String codeTypeCode) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Object getCodeGrid(String codeTypeCode) {

        return null;
    }

    protected List<String> getColNames() {

        return null;
    }

    protected List<Map<String, Object>> getColModel() {
        return null;
    }
}
