package com.ces.component.tcsymsyymbh.action;

import com.ces.component.tcsymsyymbh.dao.TcsymsyymbhDao;
import com.ces.component.tcsymsyymbh.service.TcsymsyymbhService;
import com.ces.component.trace.action.base.TraceShowModuleDefineServiceDaoController;
import com.ces.xarch.core.entity.StringIDEntity;

public class TcsymsyymbhController extends TraceShowModuleDefineServiceDaoController<StringIDEntity, TcsymsyymbhService, TcsymsyymbhDao> {

    private static final long serialVersionUID = 1L;

    /*
     * (非 Javadoc)
     * <p>标题: initModel</p>
     * <p>描述: </p>
     * @see com.ces.xarch.core.web.struts2.BaseController#initModel()
     */
    @Override
    protected void initModel() {
        setModel(new StringIDEntity());
    }

}
