<%@ page language="java" contentType="text/json; charset=UTF-8" pageEncoding="UTF-8"%>
{status:<%=request.getAttribute("status")%>,message:"<%=request.getAttribute("message")%>",code:<%=""/*response.getStatus()*/%>}