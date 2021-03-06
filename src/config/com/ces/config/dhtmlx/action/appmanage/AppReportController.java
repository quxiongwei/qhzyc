package com.ces.config.dhtmlx.action.appmanage;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.ces.config.datamodel.message.MessageModel;
import com.ces.config.dhtmlx.action.base.ConfigDefineServiceDaoController;
import com.ces.config.dhtmlx.dao.appmanage.AppReportDao;
import com.ces.config.dhtmlx.entity.appmanage.AppReport;
import com.ces.config.dhtmlx.service.appmanage.AppReportService;
import com.ces.config.utils.CommonUtil;
import com.ces.xarch.core.exception.FatalException;

public class AppReportController extends ConfigDefineServiceDaoController<AppReport, AppReportService, AppReportDao> {

    private static final long serialVersionUID = -2917286991129733497L;

    private static final Log log = LogFactory.getLog(AppReportController.class);

    @Override
    protected void initModel() {
        setModel(new AppReport());
    }

    /*
     * (非 Javadoc)
     * <p>标题: setService</p>
     * <p>描述: 注入服务层(Service)</p>
     * @param service
     * @see com.ces.xarch.core.web.struts2.BaseController#setService(com.ces.xarch.core.service.AbstractService)
     */
    @Override
    @Autowired
    @Qualifier("appReportService")
    protected void setService(AppReportService service) {
        super.setService(service);
    }

    /**
     * <p>标题: defaultReport</p>
     * <p>描述: 表关联的报表</p>
     * 
     * @return Object 返回类型
     * @throws FatalException
     */
    public Object defaultReport() throws FatalException {
        try {
            list = getDataModel(getModelTemplate());
            String tableId = getParameter("P_tableId");
            String componentVersionId = getParameter("P_componentVersionId");
            String menuId = getParameter("P_menuId");
            String userId = CommonUtil.getUser().getId();
            list.setData(getService().findDefaultList(tableId, componentVersionId, menuId, userId));
        } catch (Exception e) {
            log.error("可选报表出错", e);
        }
        return NONE;
    }

    /**
     * <p>标题: defineReport</p>
     * <p>描述: 选中的报表</p>
     * 
     * @return Object 返回类型
     * @throws FatalException
     */
    public Object defineReport() throws FatalException {
        try {
            list = getDataModel(getModelTemplate());
            String tableId = getParameter("P_tableId");
            String componentVersionId = getParameter("P_componentVersionId");
            String menuId = getParameter("P_menuId");
            String userId = CommonUtil.getUser().getId();
            list.setData(getService().findDefineList(tableId, componentVersionId, menuId, userId));
        } catch (Exception e) {
            log.error("已选报表出错", e);
        }
        return NONE;
    }

    /**
     * <p>标题: save</p>
     * <p>描述: 保存配置好的报表</p>
     * 
     * @return Object 返回类型
     * @throws
     */
    public Object save() {
        try {
            String tableId = getParameter("P_tableId");
            String componentVersionId = getParameter("P_componentVersionId");
            String menuId = getParameter("P_menuId");
            String rowsValue = getParameter("P_rowsValue");
            getService().save(tableId, componentVersionId, menuId, rowsValue);
            setReturnData(MessageModel.trueInstance("OK"));
        } catch (Exception e) {
            e.printStackTrace();
            setReturnData(MessageModel.falseInstance("ERROR"));
        }
        return NONE;
    }

    /**
     * <p>标题: clear</p>
     * <p>描述: TODO(这里用一句话描述这个方法的作用)</p>
     * 
     * @return Object 返回类型
     * @throws FatalException
     */
    public Object clear() throws FatalException {
        try {
            String tableId = getParameter("P_tableId");
            String componentVersionId = getParameter("P_componentVersionId");
            String menuId = getParameter("P_menuId");
            getService().clear(tableId, componentVersionId, menuId);
            setReturnData(MessageModel.trueInstance("OK"));
        } catch (Exception e) {
            e.printStackTrace();
            setReturnData(MessageModel.falseInstance("ERROR"));
        }
        return NONE;
    }
}
