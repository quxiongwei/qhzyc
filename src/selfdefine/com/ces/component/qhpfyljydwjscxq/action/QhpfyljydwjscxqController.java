package com.ces.component.qhpfyljydwjscxq.action;

import com.ces.component.qhpfyljydwjscxq.dao.QhpfyljydwjscxqDao;
import com.ces.component.qhpfyljydwjscxq.service.QhpfyljydwjscxqService;
import com.ces.component.trace.action.base.TraceShowModuleDefineServiceDaoController;
import com.ces.xarch.core.entity.StringIDEntity;

public class QhpfyljydwjscxqController extends TraceShowModuleDefineServiceDaoController<StringIDEntity, QhpfyljydwjscxqService, QhpfyljydwjscxqDao> {

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
