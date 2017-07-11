<%@ tag language="java" pageEncoding="UTF-8"%><%@ attribute name="cls" %><%@ attribute name="componentCls" %><%@ attribute name="focusFirst" type="java.lang.Boolean" %><%@ attribute name="rendered" type="java.lang.Boolean" %><%@ attribute name="authorized" %><%@attribute name="ajaxSubmit" type="java.lang.Boolean"%><%@attribute name="novalidate" type="java.lang.Boolean"%><%@attribute name="url"%><%@attribute name="postData"%><%@attribute name="target"%><%@attribute name="errTipsType"%><%@attribute name="errorMode"%><%@attribute name="separator"%><%@attribute name="excluded"%><%@ attribute name="onCreate" %><%@ attribute name="onSubmit" %><%@ attribute name="onSuccess" %><%@ attribute name="onChange" %><%@ attribute name="onLoad" %><%@ attribute name="onLoadError" %><%@ attribute name="id" %><%@ attribute name="name" %><%@ attribute name="action" %><%@ attribute name="method" %><%@ attribute name="context" %><%@ attribute name="heightStyle" %><%@ attribute name="style" %><%@ include file="TagUtil.jsp" %><% 
id = tagUtil.getClientId( id );
String dataOption = tagUtil.add("id", id)
.add("cls", cls)
.add("componentCls", componentCls)
.add("rendered", rendered).add("authorized", authorized)
.add("focusFirst", focusFirst)
.add("ajaxSubmit", ajaxSubmit)
.add("novalidate", novalidate)
.add("url", url)
.add("postData", postData)
.add("name", name)
.add("target", target)
.add("errTipsType", errTipsType)
.add("errorMode", errorMode)
.add("separator", separator)
.add("excluded", excluded)
.add("action", action)
.add("context", context)
.add("heightStyle", heightStyle)
.add("onCreate", onCreate)
.add("onSubmit", onSubmit)
.add("onSuccess", onSuccess)
.add("onChange", onChange)
.add("onLoad", onLoad)
.add("onLoadError", onLoadError)
.add("method", method).toString();
%><form <%=(id == null ? "" : "id="+id) %> class="<%=cls==null?"":cls%>" <%=(style == null ? "" : "style=" + style) %> <%=(target == null ? "" : "target="+target) %> <%=(name == null ? "" : "name=" + name) %> data-options="<%=dataOption %>"><jsp:doBody/></form>
<script <%= "id=" + id + "_s" %>>
Coral.cc("form", "<%= id%>");
</script>