<%@ attribute name="id" %><%@ attribute name="title" type="java.lang.Boolean" %><%@ attribute name="style" %><%@ attribute name="name" %><%@ attribute name="cls" %><%@ attribute name="componentCls" %><%@ attribute name="rendered" type="java.lang.Boolean" %><%@ attribute name="authorized" %><%@ attribute name="label" %><%@ attribute name="once" type="java.lang.Boolean" %><%@ attribute name="text" type="java.lang.Boolean" %><%@ attribute name="disabled" type="java.lang.Boolean" %><%@ attribute name="icons" %><%@ attribute name="width" type="java.lang.Integer" %><%@ attribute name="onCreate" type="java.lang.String" %><%@ attribute name="onClick" type="java.lang.String" %><%@ attribute name="onDblClick" type="java.lang.String" %><%@ attribute name="onMouseEnter" %><%@ attribute name="onMouseLeave" %><%@ include file="TagUtil.jsp" %><% 
id = tagUtil.getClientId( id );
String dataOption = tagUtil.add("name", name)
.add("id", id)
.add("cls", cls)
.add("title", title)
.add("componentCls", componentCls)
.add("rendered", rendered).add("authorized", authorized)
.add("label", label)
.add("width", width)
.add("disabled", disabled)
.add("once", once)
.add("text", text)
.add("icons", icons)

.add("onCreate", onCreate)
.add("onClick", onClick)
.add("onMouseEnter", onMouseEnter)
.add("onMouseLeave", onMouseLeave)
.add("onDblClick", onDblClick).toString();
 %><button id="<%=id %>" type="button" class="<%=cls==null?"":cls%>" style="<%=style==null?"":style%>" data-options="<%=dataOption %>"></button>
<script <%= "id=" + id + "_s" %>>
Coral.cc("button", "<%= id%>");
</script>