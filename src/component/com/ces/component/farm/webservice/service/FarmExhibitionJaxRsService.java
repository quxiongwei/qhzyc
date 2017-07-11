package com.ces.component.farm.webservice.service;

import com.ces.component.farm.service.FarmExhibitionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.Map;

/**
 * Created by Synge on 2015/10/26.
 */
@Component
@Path("/exhibition")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
public class FarmExhibitionJaxRsService {

    @Autowired
    private FarmExhibitionService farmExhibitionService;

    /**
     * 获取工作量
     * @return
     */
    @Path("/getWorkLoad")
    @GET
    public Response getWorkLoad () {
        Map<String,Object> result = farmExhibitionService.getWorkLoad();
        return FarmResponseUtil.generateResponse(FarmResponseUtil.RES_OK, result);
    }

    /**
     * 销售量
     * @return
     */
    @Path("/getSalesVolume")
    @GET
    public Response getSalesVolume () {
        List<Map<String,Object>> result = farmExhibitionService.getSalesVolume();
        return FarmResponseUtil.generateResponse(FarmResponseUtil.RES_OK, result);
    }

    /**
     * 满意度
     * @return
     */
    @Path("/getSatisfaction")
    @GET
    public Response getSatisfaction () {
        List<Map<String,Object>> result = farmExhibitionService.getSatisfaction();
        return FarmResponseUtil.generateResponse(FarmResponseUtil.RES_OK, result);
    }

    /**
     * 安全率
     * @return
     */
    @Path("/getSafety")
    @GET
    public Response getSafety () {
        List<Map<String,Object>> result = farmExhibitionService.getSafety();
        return FarmResponseUtil.generateResponse(FarmResponseUtil.RES_OK, result);
    }

    /**
     * 物联网数据
     * @param dkbh
     * @return
     */
    @Path("/getIotByDkbh")
    @GET
    public Response getIotByDkbh (@QueryParam("dkbh") String dkbh) {
        Map<String,Object> result = farmExhibitionService.getIotByDkbh(dkbh);
        return FarmResponseUtil.generateResponse(FarmResponseUtil.RES_OK,result);
    }

    /**
     * 视频账号
     * @param dkbh
     * @return
     */
    @Path("/getVideoAccount")
    @GET
    public Response getVideoAccount (@QueryParam("dkbh") String dkbh) {
        Map<String,Object> result = farmExhibitionService.getVideoAccount(dkbh);
        return FarmResponseUtil.generateResponse(FarmResponseUtil.RES_OK,result);
    }

}