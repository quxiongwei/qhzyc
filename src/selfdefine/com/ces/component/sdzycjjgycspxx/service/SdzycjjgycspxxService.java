package com.ces.component.sdzycjjgycspxx.service;

import com.ces.component.trace.utils.SerialNumberUtil;
import com.ces.config.dhtmlx.dao.common.DatabaseHandlerDao;
import com.ces.config.utils.AppDefineUtil;
import com.ces.config.utils.TableUtil;
import org.springframework.stereotype.Component;

import com.ces.component.sdzycjjgycspxx.dao.SdzycjjgycspxxDao;
import com.ces.component.trace.service.base.TraceShowModuleDefineDaoService;
import com.ces.xarch.core.entity.StringIDEntity;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class SdzycjjgycspxxService extends TraceShowModuleDefineDaoService<StringIDEntity, SdzycjjgycspxxDao> {
    public String saveycspxx(List<Map<String,String>> dataList){
        if( null != dataList && dataList.size() > 0){
            StringBuffer sbf = new StringBuffer();
            for( Map<String,String> dataMap : dataList){
                String zsspm = dataMap.get("ZSSPM");
                String sql = "select count(0)  count from t_sdzyc_zycspbm where  is_delete = '0' and qylx='JJG' and zsspm=? "+defaultFilter();
                List<Map<String,Object>> resList= DatabaseHandlerDao.getInstance().queryForMaps(sql,new String[]{zsspm});
                if( resList !=null ){
                    String count = String.valueOf(resList.get(0).get("COUNT"));
                    if( "0".equals(count)){
                        //企业编码
                        dataMap.put("QYBM", SerialNumberUtil.getInstance().getCompanyCode());
                        dataMap.put("ID","");
                        dataMap.put("YCLYNAME",dataMap.get("YCLYNAME"));
                        dataMap.put("YCLYBWNAME",dataMap.get("YCLYBWNAME"));
                        dataMap.put("YCMNAME",dataMap.get("YCMNAME"));
                        dataMap.put("YCXMNAME",dataMap.get("YCXMNAME"));
                        dataMap.put("YCLYCODE",dataMap.get("YCLYCODE"));
                        dataMap.put("YCLYBWCODE",dataMap.get("YCLYBWCODE"));
                        dataMap.put("YCMCODE",dataMap.get("YCMCODE"));
                        dataMap.put("YCXMCODE",dataMap.get("YCXMCODE"));
                        dataMap.put("QYLX","JJG");
                        saveOne("t_sdzyc_zycspbm",dataMap);
                    }else{
                        sbf.append(dataMap.get("YCMNAME")+"("+dataMap.get("YCXMNAME")+") ");
                    }
                }
            }
            return sbf.toString();

        }
        return "SUCCESS";
    }

    public String defaultFilter(){
        String qybm = SerialNumberUtil.getInstance().getCompanyCode();
        return AppDefineUtil.RELATION_AND + " qybm = '" + qybm + "'";
    }

    /**
     * 默认过滤掉企业编码和is_delete
     * @param tableId
     * @param componentVersionId
     * @param moduleId
     * @param menuId
     * @param  paramMap --其他参数，详细见ShowModuleDefineServiceDaoController.getMarkParamMap方法介绍
     * @return
     */
    @Override
    protected String buildCustomerFilter(String tableId, String componentVersionId, String moduleId, String menuId, Map<String, Object> paramMap) {
        StringBuffer filter = new StringBuffer(AppDefineUtil.RELATION_AND + " is_delete = '0'");
        String tableName = TableUtil.getTableName(tableId);
        boolean isQybmColumnExist = DatabaseHandlerDao.getInstance().columnExists(tableName, "qybm");
        if (isQybmColumnExist) {
            String qybm = SerialNumberUtil.getInstance().getCompanyCode();
            filter.append(AppDefineUtil.RELATION_AND + " qybm = '" + qybm + "' ");
            filter.append(AppDefineUtil.RELATION_AND + " qylx = 'JJG' ");
        }
        return filter.toString();
    }

    public Map<String,Object> searchYclComboGridData() {
        String  companyCode = SerialNumberUtil.getInstance().getCompanyCode();
        String sql = "select * from T_SDZYC_ZYCSPBM t where t.qylx = 'JJG' and t.qybm= '"+companyCode+"'";
        return getGridTypeData(DatabaseHandlerDao.getInstance().queryForMaps(sql));
    }

    public Map<String,Object> getGridTypeData(List<Map<String,Object>> list){
        Map<String,Object> dataMap = new HashMap<String, Object>();
        dataMap.put("data",list);
        return  dataMap;
    }
}
