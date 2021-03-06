package com.ces.component.sensor.service;

import com.ces.component.trace.utils.JSON;

import javax.ws.rs.core.Response;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by Administrator on 2016/7/8.
 */
public class SensorResponseUtil {
    public static final String TOKEN_NOT_FOUND = "{'status':'1','value':'令牌不存在','code':'TOKEN_NOT_FOUND'}";

    public static final String TOKEN_OUT_DATE = "{'status':'1','value':'令牌过期','code':'TOKEN_OUT_DATE'}";

    public static final String TOKEN_ERROR = "{'status':'1','value':'令牌错误','code':'TOKEN_ERROR'}";

    public static final String QUERY_TYPE_ERROR = "{'status':'1','value':'请求用户类型错误','code':'QUERY_TYPE_ERROR'}";

    /**
     * 请求响应状态码
     */
    public static final String RES_OK = "0";

    public static final String RES_ERROR = "1";

    /**
     * 构造webservices返回值
     * @param status
     * @param value
     * @return
     */
    public static Response generateResponse(String status, Object value) {
        Map<String, Object> result = new HashMap<String, Object>();
        result.put("status", status);
        result.put("value", value);
        return generateResponse(result);
    }

    /**
     * webservice返回值构造
     * @param value
     * @return
     */
    public static Response generateResponse(Object value) {
        Response.ResponseBuilder builder = Response.ok();
        if (value != null) {
            if (value instanceof String) {
                builder.entity(value);
            } else {
                builder.entity(JSON.toJSON(value));
            }
        }
        return builder
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS")
                .header("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept,X-Requested-With, Xarch-Token")
                .build();
    }

}
