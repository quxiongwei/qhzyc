<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page import="com.ces.config.utils.CfgCommonUtil"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String folderPath = request.getRequestURI();
folderPath = folderPath.substring(0, folderPath.lastIndexOf("/"));
String dhxResPath = path + com.ces.config.dhtmlx.utils.DhtmlxCommonUtil.DHX_FOLDER;
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<base href="<%=basePath%>">
		<title>菜单管理</title>
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="This is my page">
		<script type="text/javascript" src="<%=dhxResPath %>/views/config/appmanage/js/appcommon.js"></script>
		<script type="text/javascript" src="<%=folderPath %>/js/menu4coral40.js"></script>
		<script type="text/javascript">
			var releasedSystem = false;
			<%
				if (CfgCommonUtil.isReleasedSystem()) {
			%>
			releasedSystem = true;
			<%
				}
			%>
		</script>
	</head>
	<body onload="init()">
	</body>
</html>
