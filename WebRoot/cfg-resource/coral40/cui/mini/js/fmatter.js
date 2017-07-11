(function(b){b.fmatter={};b.extend(b.fmatter,{isBoolean:function(c){return typeof c==="boolean"},isObject:function(c){return(c&&(typeof c==="object"||b.isFunction(c)))||false},isString:function(c){return typeof c==="string"},isNumber:function(c){return typeof c==="number"&&isFinite(c)},isNull:function(c){return c===null},isUndefined:function(c){return typeof c==="undefined"},isValue:function(c){return(this.isObject(c)||this.isString(c)||this.isNumber(c)||this.isBoolean(c))},isEmpty:function(c){if(!this.isString(c)&&this.isValue(c)){return false}else{if(!this.isValue(c)){return true}}c=b.trim(c).replace(/\&nbsp\;/ig,"").replace(/\&#160\;/ig,"");return c===""}});b.fn.fmatter=function(i,j,h,c,d){var e=j;h=b.extend({},b.grid.formatter,h);if(d==="edit"&&i!=="convertCode"&&h.rowId){b("#"+h.rowId,this.element).children("td[aria-describedby$='"+h.colModel.name+"']").attr("data-org",e)}if(d==="edit"&&h.colModel.cellEditoptions){var g=b.coral.toFunction(h.colModel.cellEditoptions).call(this,e,h,c);i=g&&g.type?g.type:i;if(i==="combobox"||i==="combogrid"||i==="combotree"||i==="convertCode"){return b.fn.fmatter.convertCode.call(this,j,h,c,d)}else{return e}}try{e=b.fn.fmatter[i].call(this,j,h,c,d)}catch(f){}return e};b.fmatter.util={NumberFormat:function(e,c){if(!b.fmatter.isNumber(e)){e*=1}if(b.fmatter.isNumber(e)){var g=(e<0);var m=e+"";var j=(c.decimalSeparator)?c.decimalSeparator:".";var k;if(b.fmatter.isNumber(c.decimalPlaces)){var l=c.decimalPlaces;var f=Math.pow(10,l);m=Math.round(e*f)/f+"";k=m.lastIndexOf(".");if(l>0){if(k<0){m+=j;k=m.length-1}else{if(j!=="."){m=m.replace(".",j)}}while((m.length-1-k)<l){m+="0"}}}if(c.thousandsSeparator){var o=c.thousandsSeparator;k=m.lastIndexOf(j);k=(k>-1)?k:m.length;var n=m.substring(k);var d=-1;for(var h=k;h>0;h--){d++;if((d%3===0)&&(h!==k)&&(!g||(h>1))){n=o+n}n=m.charAt(h-1)+n}m=n}m=(c.prefix)?c.prefix+m:m;m=(c.suffix)?m+c.suffix:m;return m}else{return e}},DateFormat:function(K,O,Q,A){var p=/\\.|[dDjlNSwzWFmMntLoYyaABgGhHisueIOPTZcrU]/g,E=/\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,M=/[^-+\dA-Z]/g,q=new RegExp("^/Date\\((([-+])?[0-9]+)(([-+])([0-9]{2})([0-9]{2}))?\\)/$"),g=((typeof O==="string")?O.match(q):null),L=function(j,i){j=String(j);
i=parseInt(i,10)||2;while(j.length<i){j="0"+j}return j},c={m:1,d:1,y:1970,h:0,i:0,s:0,u:0},f=0,t,H,e,F=["i18n"];F.i18n={dayNames:A.dayNames,monthNames:A.monthNames};if(K in A.masks){K=A.masks[K]}if(!isNaN(O-0)&&String(K).toLowerCase()=="u"){f=new Date(parseFloat(O)*1000)}else{if(O.constructor===Date){f=O}else{if(g!==null){f=new Date(parseInt(g[1],10));if(g[3]){var h=Number(g[5])*60+Number(g[6]);h*=((g[4]=="-")?1:-1);h-=f.getTimezoneOffset();f.setTime(Number(Number(f)+(h*60*1000)))}}else{O=String(O).split(/[\\\/:_;.,\t\T\s-]/);K=K.split(/[\\\/:_;.,\t\T\s-]/);for(H=0,e=K.length;H<e;H++){if(K[H]=="M"){t=b.inArray(O[H],F.i18n.monthNames);if(t!==-1&&t<12){O[H]=t+1}}if(K[H]=="F"){t=b.inArray(O[H],F.i18n.monthNames);if(t!==-1&&t>11){O[H]=t+1-12}}if(O[H]){c[K[H].toLowerCase()]=parseInt(O[H],10)}}if(c.f){c.m=c.f}if(c.m===0&&c.y===0&&c.d===0){return"&#160;"}c.m=parseInt(c.m,10)-1;var P=c.y;if(P>=70&&P<=99){c.y=1900+c.y}else{if(P>=0&&P<=69){c.y=2000+c.y}}f=new Date(c.y,c.m,c.d,c.h,c.i,c.s,c.u)}}}if(Q in A.masks){Q=A.masks[Q]}else{if(!Q){Q="Y-m-d"}}var x=f.getHours(),J=f.getMinutes(),I=f.getDate(),D=f.getMonth()+1,C=f.getTimezoneOffset(),B=f.getSeconds(),y=f.getMilliseconds(),v=f.getDay(),d=f.getFullYear(),m=(v+6)%7+1,r=(new Date(d,D-1,I)-new Date(d,0,1))/86400000,l={d:L(I),D:F.i18n.dayNames[v],j:I,l:F.i18n.dayNames[v+7],N:m,S:A.S(I),w:v,z:r,W:m<5?Math.floor((r+m-1)/7)+1:Math.floor((r+m-1)/7)||((new Date(d-1,0,1).getDay()+6)%7<4?53:52),F:F.i18n.monthNames[D-1+12],m:L(D),M:F.i18n.monthNames[D-1],n:D,t:"?",L:"?",o:"?",Y:d,y:String(d).substring(2),a:x<12?A.AmPm[0]:A.AmPm[1],A:x<12?A.AmPm[2]:A.AmPm[3],B:"?",g:x%12||12,G:x,h:L(x%12||12),H:L(x),i:L(J),s:L(B),u:y,e:"?",I:"?",O:(C>0?"-":"+")+L(Math.floor(Math.abs(C)/60)*100+Math.abs(C)%60,4),P:"?",T:(String(f).match(E)||[""]).pop().replace(M,""),Z:"?",c:"?",r:"?",U:Math.floor(f/1000)};return Q.replace(p,function(i){return i in l?l[i]:i.substring(1)})}};b.fn.fmatter.defaultFormat=function(f,e,c,d){return(b.fmatter.isValue(f)&&f!=="")?f:e.defaultValue?e.defaultValue:"&#160;"
};b.fn.fmatter.email=function(f,e,c,d){if(!b.fmatter.isEmpty(f)){return'<a href="mailto:'+f+'">'+f+"</a>"}else{return b.fn.fmatter.defaultFormat(f,e)}};b.fn.fmatter.combobox=function(g,e,c,d){var h=b.extend({},e.combobox),f;if(!b.fmatter.isUndefined(e.colModel.formatoptions)){h=b.extend({},h,e.colModel.formatoptions)}if(h.disabled===true){f='disabled="disabled"'}else{f=""}if(b.fmatter.isEmpty(g)||b.fmatter.isUndefined(g)){g=""}g=g+"";return'<input class="parseformatter" data-formatter="combobox" data-pos="'+e.pos+'" type="text" value="'+g+'" '+f+"/>"};b.fn.fmatter.combotree=function(g,e,c,d){var h=b.extend({},e.combotree),f;if(!b.fmatter.isUndefined(e.colModel.formatoptions)){h=b.extend({},h,e.colModel.formatoptions)}if(h.disabled===true){f='disabled="disabled"'}else{f=""}if(b.fmatter.isEmpty(g)||b.fmatter.isUndefined(g)){g=""}g=g+"";return'<input class="parseformatter" data-formatter="combotree" data-pos="'+e.pos+'" type="text" value="'+g+'" '+f+"/>"};b.fn.fmatter.combogrid=function(g,e,c,d){var h=b.extend({},e.combogrid),f;if(!b.fmatter.isUndefined(e.colModel.formatoptions)){h=b.extend({},h,e.colModel.formatoptions)}if(h.disabled===true){f='disabled="disabled"'}else{f=""}if(b.fmatter.isEmpty(g)||b.fmatter.isUndefined(g)){g=""}g=g+"";return'<input class="parseformatter" data-formatter="combogrid" data-pos="'+e.pos+'" type="text" value="'+g+'" '+f+"/>"};b.fn.fmatter.autocomplete=function(g,e,c,d){var h=b.extend({},e.autocomplete),f;if(!b.fmatter.isUndefined(e.colModel.formatoptions)){h=b.extend({},h,e.colModel.formatoptions)}if(h.disabled===true){f='disabled="disabled"'}else{f=""}if(b.fmatter.isEmpty(g)||b.fmatter.isUndefined(g)){g=""}g=g+"";return'<input class="parseformatter" data-formatter="autocomplete" data-pos="'+e.pos+'" type="text" value="'+g+'" '+f+"/>"};b.fn.fmatter.toolbar=function(g,e,c,d){var h=b.extend({},e.toolbar),f;if(!b.fmatter.isUndefined(e.colModel.formatoptions)){h=b.extend({},h,e.colModel.formatoptions)}if(h.disabled===true){f='disabled="disabled"'
}else{f=""}if(b.fmatter.isEmpty(g)||b.fmatter.isUndefined(g)){g=""}g=g+"";return'<div class="parseformatter" data-formatter="toolbar" data-pos="'+e.pos+'" '+f+"/>"};b.fn.fmatter.text=function(g,e,c,d){var h=b.extend({},e.textbox),f;if(!b.fmatter.isUndefined(e.colModel.formatoptions)){h=b.extend({},h,e.colModel.formatoptions)}if(h.disabled===true){f='disabled="disabled"'}else{f=""}if(b.fmatter.isEmpty(g)||b.fmatter.isUndefined(g)){g=""}g=g+"";return'<input class="parseformatter" data-formatter="textbox" data-pos="'+e.pos+'" type="text" value="'+g+'" '+f+"/>"};b.fn.fmatter.datepicker=function(g,e,c,d){var h=b.extend({},e.datepicker),f;if(!b.fmatter.isUndefined(e.colModel.formatoptions)){h=b.extend({},h,e.colModel.formatoptions)}if(h.disabled===true){f='disabled="disabled"'}else{f=""}if(b.fmatter.isEmpty(g)||b.fmatter.isUndefined(g)){g=""}g=g+"";return'<input class="parseformatter" data-formatter="datepicker" data-pos="'+e.pos+'" type="text" value="'+g+'" '+f+"/>"};b.fn.fmatter.textarea=function(g,e,c,d){var h=b.extend({},e.textbox),f;if(!b.fmatter.isUndefined(e.colModel.formatoptions)){h=b.extend({},h,e.colModel.formatoptions)}if(h.disabled===true){f='disabled="disabled"'}else{f=""}if(b.fmatter.isEmpty(g)||b.fmatter.isUndefined(g)){g=""}g=g+"";return'<textarea class="parseformatter" data-formatter="textbox" data-pos="'+e.pos+'" '+f+"/>"+g+"</textarea>"};b.fn.fmatter.progressbar=function(g,e,c,d){var h=b.extend({},e.progressbar),f;if(!b.fmatter.isUndefined(e.colModel.formatoptions)){h=b.extend({},h,e.colModel.formatoptions)}if(h.disabled===true){f='disabled="disabled"'}else{f=""}if(b.fmatter.isEmpty(g)||b.fmatter.isUndefined(g)){g=""}g=g+"";return'<div class="parseformatter" data-formatter="progressbar" data-pos="'+e.pos+'" '+f+"/>"};b.fn.fmatter.convertCode=function(q,m,l,u){var g=m.colModel.formatoptions||m.colModel.editoptions||{},o=g.postMode||"value";var h="convertCode";if(m.colModel.cellEditoptions){var t=b.coral.toFunction(m.colModel.cellEditoptions).call(this,q,g,l);
g=t&&t.cellEditoptions?t.cellEditoptions:g;h=t&&t.type?t.type:"convertCode"}b("#"+m.rowId,this.element).children("td[aria-describedby$='"+m.colModel.name+"']").attr("data-org",q);if(h!=="convertCode"&&h!=="combobox"&&h!=="combogrid"){return q}var d=g.data,v=g.dataStructure||"list",c=g.valueField||"value",n=g.textField||"text",k=g.separator||",";if(typeof(q)==="undefined"||q===null){return""}if(o!="value"){return q}if(m.colModel.edittype=="combobox"&&g.code){d=g.code}if(m.colModel.edittype=="combotree"&&g.code){d=g.code}if(m.colModel.edittype=="combogrid"&&g.code){d=g.code}if(m.colModel.edittype=="combotree"){v="tree"}if(m.colModel.edittype=="autocomplete"&&typeof(g.code)=="string"){d=g.code}if(m.colModel.edittype=="autocomplete"&&g.source){d=g.source}var s=[],f=false,e=q.toString().split(k);if(v=="tree"){for(var r=0;r<e.length;r++){a(d,e[r],s)}}else{for(var r=0;r<e.length;r++){for(var p=0;p<d.length;p++){if(d[p][c]==e[r]){s.push(d[p][n]);f=true}}if(!f&&!g.forceSelection){s.push(e[r])}f=false}}return s.join(k)};function a(f,c,e){for(var d=0;d<f.length;d++){if(f[d].id==c){e.push(f[d].name)}else{if(f[d].children){a(f[d].children,c,e)}}}}b.fn.fmatter.checkbox=function(f,d){var g=b.extend({},d.checkbox),e;var c=["Yes","No"];if(!b.fmatter.isUndefined(d.colModel.formatoptions)){g=b.extend({},g,d.colModel.formatoptions);if(d.colModel.formatoptions&&d.colModel.formatoptions.value){c=d.colModel.formatoptions.value.split(":")}}if(g.disabled===true){e='disabled="disabled"'}else{e=""}if(b.fmatter.isEmpty(f)||b.fmatter.isUndefined(f)){f=""}f=f+"";return'<input class="parseformatter" data-formatter="checkbox" value=\''+f+"' data-pos=\""+d.pos+'" type="checkbox" '+e+"/>"};b.fn.afterFmatter=function(c){var d=this;b(".parseformatter",d.element).each(function(){b(this).removeClass("parseformatter");var i=b(this).attr("data-pos"),f=b(this).attr("data-formatter"),g=b.trim(b(this).val())===""?"":b(this).val(),h=b.extend({},d.options.colModel[i].formatoptions,{dataCustom:{rowId:b(this).closest("tr")[0].id,gridId:d.options.id}});
switch(f){case"combobox":case"combotree":case"combogrid":case"textbox":h.value=g;break;case"toolbar":case"progressbar":break;case"checkbox":var e=["Yes","No"];if(f&&d.options.colModel[i].formatoptions.value){e=d.options.colModel[i].formatoptions.value.split(":")}if(b(this).val()==e[0]){h.checked=true}else{h.checked=false}break}b(this)[f](h)})};b.fn.fmatter.link=function(e,c){var f={target:c.target};var d="";if(!b.fmatter.isUndefined(c.colModel.formatoptions)){f=b.extend({},f,c.colModel.formatoptions)}if(f.target){d="target="+f.target}if(!b.fmatter.isEmpty(e)){return"<a "+d+' href="'+e+'">'+e+"</a>"}else{return b.fn.fmatter.defaultFormat(e,c)}};b.fn.fmatter.showlink=function(e,c){var g={baseLinkUrl:c.baseLinkUrl,showAction:c.showAction,addParam:c.addParam||"",target:c.target,idName:c.idName},d="",f;if(!b.fmatter.isUndefined(c.colModel.formatoptions)){g=b.extend({},g,c.colModel.formatoptions)}if(g.target){d="target="+g.target}f=g.baseLinkUrl+g.showAction+"?"+g.idName+"="+c.rowId+g.addParam;if(b.fmatter.isString(e)||b.fmatter.isNumber(e)){return"<a "+d+' href="'+f+'">'+e+"</a>"}else{return b.fn.fmatter.defaultFormat(e,c)}};b.fn.fmatter.integer=function(d,c){var e=b.extend({},c.integer);if(!b.fmatter.isUndefined(c.colModel.formatoptions)){e=b.extend({},e,c.colModel.formatoptions)}if(b.fmatter.isEmpty(d)){return e.defaultValue}return b.fmatter.util.NumberFormat(d,e)};b.fn.fmatter.number=function(d,c){var e=b.extend({},c.number);if(!b.fmatter.isUndefined(c.colModel.formatoptions)){e=b.extend({},e,c.colModel.formatoptions)}if(b.fmatter.isEmpty(d)){return e.defaultValue}return b.fmatter.util.NumberFormat(d,e)};b.fn.fmatter.currency=function(d,c){var e=b.extend({},c.currency);if(!b.fmatter.isUndefined(c.colModel.formatoptions)){e=b.extend({},e,c.colModel.formatoptions)}if(b.fmatter.isEmpty(d)){return e.defaultValue}return b.fmatter.util.NumberFormat(d,e)};b.fn.fmatter.date=function(h,g,c,d){var i=b.extend({},g.date);if(!b.fmatter.isUndefined(g.colModel.formatoptions)){i=b.extend({},i,g.colModel.formatoptions)
}var f=i.srcDateFormat||i.dateFormat;var e=b.datepicker.parseDate(f,h||"");return b.datepicker.formatDate(i.dateFormat,e)||""};b.fn.fmatter.select=function(h,c){h=h+"";var f=false,l=[],p,e;if(!b.fmatter.isUndefined(c.colModel.formatoptions)){f=c.colModel.formatoptions.value;p=c.colModel.formatoptions.separator===undefined?":":c.colModel.formatoptions.separator;e=c.colModel.formatoptions.delimiter===undefined?";":c.colModel.formatoptions.delimiter}else{if(!b.fmatter.isUndefined(c.colModel.editoptions)){f=c.colModel.editoptions.value;p=c.colModel.editoptions.separator===undefined?":":c.colModel.editoptions.separator;e=c.colModel.editoptions.delimiter===undefined?";":c.colModel.editoptions.delimiter}}if(f){var o=c.colModel.editoptions.multiple===true?true:false,n=[],m;if(o){n=h.split(",");n=b.map(n,function(i){return b.trim(i)})}if(b.fmatter.isString(f)){var d=f.split(e),g=0;for(var k=0;k<d.length;k++){m=d[k].split(p);if(m.length>2){m[1]=b.map(m,function(q,j){if(j>0){return q}}).join(p)}if(o){if(b.inArray(m[0],n)>-1){l[g]=m[1];g++}}else{if(b.trim(m[0])==b.trim(h)){l[0]=m[1];break}}}}else{if(b.fmatter.isObject(f)){if(o){l=b.map(n,function(i){return f[i]})}else{l[0]=f[h]||""}}}}h=l.join(", ");return h===""?b.fn.fmatter.defaultFormat(h,c):h};b.fn.fmatter.rowactions=function(m,h,i,k){var g={keys:false,onEdit:null,onSuccess:null,afterSave:null,onError:null,afterRestore:null,extraparam:{},url:null,delOptions:{},editOptions:{}};m=b.grid.coralID(m);h=b.grid.coralID(h);var l=b("#"+h)[0].options.colModel[k];if(!b.fmatter.isUndefined(l.formatoptions)){g=b.extend(g,l.formatoptions)}if(!b.fmatter.isUndefined(b("#"+h)[0].options.editOptions)){g.editOptions=b("#"+h)[0].options.editOptions}if(!b.fmatter.isUndefined(b("#"+h)[0].options.delOptions)){g.delOptions=b("#"+h)[0].options.delOptions}var e=b("#"+h)[0];var f=function(o,n){if(b.isFunction(g.afterSave)){g.afterSave.call(e,o,n)}b("tr#"+m+" div.coral-inline-edit, tr#"+m+" div.coral-inline-del","#"+h+".coral-grid-btable:first").show();
b("tr#"+m+" div.coral-inline-save, tr#"+m+" div.coral-inline-cancel","#"+h+".coral-grid-btable:first").hide()},j=function(n){if(b.isFunction(g.afterRestore)){g.afterRestore.call(e,n)}b("tr#"+m+" div.coral-inline-edit, tr#"+m+" div.coral-inline-del","#"+h+".coral-grid-btable:first").show();b("tr#"+m+" div.coral-inline-save, tr#"+m+" div.coral-inline-cancel","#"+h+".coral-grid-btable:first").hide()};if(b("#"+m,"#"+h).hasClass("grid-new-row")){var d=e.options.prmNames,c=d.oper;g.extraparam[c]=d.addoper}switch(i){case"edit":b("#"+h).grid("editRow",m,g.keys,g.onEdit,g.onSuccess,g.url,g.extraparam,f,g.onError,j);b("tr#"+m+" div.coral-inline-edit, tr#"+m+" div.coral-inline-del","#"+h+".coral-grid-btable:first").hide();b("tr#"+m+" div.coral-inline-save, tr#"+m+" div.coral-inline-cancel","#"+h+".coral-grid-btable:first").show();b(e).triggerHandler("jqGridAfterGridComplete");break;case"save":if(b("#"+h).grid("saveRow",m,g.onSuccess,g.url,g.extraparam,f,g.onError,j)){b("tr#"+m+" div.coral-inline-edit, tr#"+m+" div.coral-inline-del","#"+h+".coral-grid-btable:first").show();b("tr#"+m+" div.coral-inline-save, tr#"+m+" div.coral-inline-cancel","#"+h+".coral-grid-btable:first").hide();b(e).triggerHandler("jqGridAfterGridComplete")}break;case"cancel":b("#"+h).grid("restoreRow",m,j);b("tr#"+m+" div.coral-inline-edit, tr#"+m+" div.coral-inline-del","#"+h+".coral-grid-btable:first").show();b("tr#"+m+" div.coral-inline-save, tr#"+m+" div.coral-inline-cancel","#"+h+".coral-grid-btable:first").hide();b(e).triggerHandler("jqGridAfterGridComplete");break;case"del":b("#"+h).grid("delGridRow",m,g.delOptions);break;case"formedit":b("#"+h).grid("setSelection",m);b("#"+h).grid("editGridRow",m,g.editOptions);break}};b.fn.fmatter.actions=function(f,d){var h={keys:false,editbutton:true,delbutton:true,editformbutton:false};if(!b.fmatter.isUndefined(d.colModel.formatoptions)){h=b.extend(h,d.colModel.formatoptions)}var c=d.rowId,g="",e;if(typeof(c)=="undefined"||b.fmatter.isEmpty(c)){return""}if(h.editformbutton){e="onclick=jQuery.fn.fmatter.rowactions('"+c+"','"+d.gid+"','formedit',"+d.pos+"); onmouseover=jQuery(this).addClass('coral-state-hover'); onmouseout=jQuery(this).removeClass('coral-state-hover'); ";
g=g+"<div title='"+b.grid.nav.edittitle+"' style='float:left;cursor:pointer;' class='coral-pg-div coral-inline-edit' "+e+"><span class='coral-icon coral-icon-pencil'></span></div>"}else{if(h.editbutton){e="onclick=jQuery.fn.fmatter.rowactions('"+c+"','"+d.gid+"','edit',"+d.pos+"); onmouseover=jQuery(this).addClass('coral-state-hover'); onmouseout=jQuery(this).removeClass('coral-state-hover') ";g=g+"<div title='"+b.grid.nav.edittitle+"' style='float:left;cursor:pointer;' class='coral-pg-div coral-inline-edit' "+e+"><span class='coral-icon coral-icon-pencil'></span></div>"}}if(h.delbutton){e="onclick=jQuery.fn.fmatter.rowactions('"+c+"','"+d.gid+"','del',"+d.pos+"); onmouseover=jQuery(this).addClass('coral-state-hover'); onmouseout=jQuery(this).removeClass('coral-state-hover'); ";g=g+"<div title='"+b.grid.nav.deltitle+"' style='float:left;margin-left:5px;' class='coral-pg-div coral-inline-del' "+e+"><span class='coral-icon coral-icon-trash'></span></div>"}e="onclick=jQuery.fn.fmatter.rowactions('"+c+"','"+d.gid+"','save',"+d.pos+"); onmouseover=jQuery(this).addClass('coral-state-hover'); onmouseout=jQuery(this).removeClass('coral-state-hover'); ";g=g+"<div title='"+b.grid.edit.bSubmit+"' style='float:left;display:none' class='coral-pg-div coral-inline-save' "+e+"><span class='coral-icon coral-icon-disk'></span></div>";e="onclick=jQuery.fn.fmatter.rowactions('"+c+"','"+d.gid+"','cancel',"+d.pos+"); onmouseover=jQuery(this).addClass('coral-state-hover'); onmouseout=jQuery(this).removeClass('coral-state-hover'); ";g=g+"<div title='"+b.grid.edit.bCancel+"' style='float:left;display:none;margin-left:5px;' class='coral-pg-div coral-inline-cancel' "+e+"><span class='coral-icon coral-icon-cancel'></span></div>";return"<div style='margin-left:8px;'>"+g+"</div>"};b.unformat=function(g,p,l,e,d){var j,d=d||"formatter",h=p.colModel[d],f,i=p.colModel.formatoptions||{},o,n=/([\.\*\_\'\(\)\{\}\+\?\\])/g,k=p.colModel.unformat||(b.fn.fmatter[h]&&b.fn.fmatter[h].unformat);k=b.coral.toFunction(k);
if(p.colModel.edittype=="combobox"&&p.colModel.revertCode||p.colModel.edittype=="combotree"&&p.colModel.revertCode||p.colModel.edittype=="combogrid"&&p.colModel.revertCode||p.colModel.edittype=="datepicker"&&p.colModel.revertCode||p.colModel.edittype=="autocomplete"&&p.colModel.revertCode||p.colModel.revertCode){if(h=="autocomplete"||h=="datepicker"||h=="combobox"||h=="combotree"||h=="combogrid"){}else{h="convertCode"}}if(typeof k!=="undefined"&&b.isFunction(k)){j=k.call(this,b(g).text(),p,g)}else{if(!b.fmatter.isUndefined(h)&&b.fmatter.isString(h)){var c=b.grid.formatter||{},m;switch(h){case"integer":i=b.extend({},c.integer,i);o=i.thousandsSeparator.replace(n,"\\$1");m=new RegExp(o,"g");j=b(g).text().replace(m,"");break;case"number":i=b.extend({},c.number,i);o=i.thousandsSeparator.replace(n,"\\$1");m=new RegExp(o,"g");j=b(g).text().replace(m,"").replace(i.decimalSeparator,".");break;case"currency":i=b.extend({},c.currency,i);o=i.thousandsSeparator.replace(n,"\\$1");m=new RegExp(o,"g");j=b(g).text();if(i.prefix&&i.prefix.length){j=j.substr(i.prefix.length)}if(i.suffix&&i.suffix.length){j=j.substr(0,j.length-i.suffix.length)}j=j.replace(m,"").replace(i.decimalSeparator,".");break;case"checkbox":j=b.unformat.checkbox(g,p,l,e);break;case"select":j=b.unformat.select(g,p,l,e);break;case"date":j=b.unformat.date(g,p,l,e);break;case"combobox":case"combogrid":case"combotree":j=b.unformat[h](g,p,l,e);break;case"datepicker":j=b.unformat.datepicker(g,p,l,e);break;case"autocomplete":j=b.unformat.autocomplete(g,p,l,e);break;case"text":case"textarea":j=b.unformat.textbox(g,p,l,e);break;case"convertCode":if(e=="get"){if(p.colModel.revertCode==true){j=b.unformat.convertCode(g,p,l,e)}else{j=b(g).text()}}else{if(p.colModel.postMode=="value"){j=b.unformat.convertCode(g,p,l,e)}else{j=b(g).text()}}break;case"actions":return"";default:j=b(g).text()}}}return j!==undefined?j:e===true?b(g).text():b.grid.htmlDecode(b(g).html())};b.unformat.autocomplete=function(e,j,h,d){var g=[];var i=b(e).text();
if(d===true){return i}var f=b.extend({},!b.fmatter.isUndefined(j.colModel.formatoptions)?j.colModel.formatoptions:j.colModel.editoptions),k=f.separator===undefined?":":f.separator,c=f.delimiter===undefined?";":f.delimiter;if(j.colModel.revertCode){return b(e).find(".ctrl-init").autocomplete("getValue").toString()}else{return b(e).find(".ctrl-init").autocomplete("getText")}};b.unformat.combobox=function(e,j,h,d){var g=[];var i=b(e).text();if(d===true){return i}var f=b.extend({},!b.fmatter.isUndefined(j.colModel.formatoptions)?j.colModel.formatoptions:j.colModel.editoptions),k=f.separator===undefined?":":f.separator,c=f.delimiter===undefined?";":f.delimiter;if(j.colModel.revertCode){return b(e).find(".ctrl-init").combobox("getValue")}else{return b(e).find(".ctrl-init").combobox("getText")}};b.unformat.combotree=function(e,j,h,d){var g=[];var i=b(e).text();if(d===true){return i}var f=b.extend({},!b.fmatter.isUndefined(j.colModel.formatoptions)?j.colModel.formatoptions:j.colModel.editoptions),k=f.separator===undefined?":":f.separator,c=f.delimiter===undefined?";":f.delimiter;if(j.colModel.revertCode){return b(e).find(".ctrl-init").combotree("getValue").toString()}else{return b(e).find(".ctrl-init").combotree("getText")}};b.unformat.combogrid=function(e,j,h,d){var g=[];var i=b(e).text();if(d===true){return i}var f=b.extend({},!b.fmatter.isUndefined(j.colModel.formatoptions)?j.colModel.formatoptions:j.colModel.editoptions),k=f.separator===undefined?":":f.separator,c=f.delimiter===undefined?";":f.delimiter;if(j.colModel.revertCode){return b(e).find(".ctrl-init").combogrid("getValue")}else{return b(e).find(".ctrl-init").combogrid("getText")}};b.unformat.textbox=function(e,j,h,d){var g=[];var i=b(e).text();if(d===true){return i}var f=b.extend({},!b.fmatter.isUndefined(j.colModel.formatoptions)?j.colModel.formatoptions:j.colModel.editoptions),k=f.separator===undefined?":":f.separator,c=f.delimiter===undefined?";":f.delimiter;return b(e).find(".ctrl-init").textbox("getValue")};
b.unformat.datepicker=function(e,j,h,d){var g=[];var i=b(e).text();if(d===true){return i}var f=b.extend({},!b.fmatter.isUndefined(j.colModel.formatoptions)?j.colModel.formatoptions:j.colModel.editoptions),k=f.separator===undefined?":":f.separator,c=f.delimiter===undefined?";":f.delimiter;return b(e).find(".ctrl-init").datepicker("getValue")};b.unformat.convertCode=function(e,c,f,d){return b(e).attr("data-org")};b.unformat.select=function(h,s,n,e){var m=[];var q=b(h).text();if(e===true){return q}var l=b.extend({},!b.fmatter.isUndefined(s.colModel.formatoptions)?s.colModel.formatoptions:s.colModel.editoptions),t=l.separator===undefined?":":l.separator,d=l.delimiter===undefined?";":l.delimiter;if(l.value){var f=l.value,r=l.multiple===true?true:false,p=[],o;if(r){p=q.split(",");p=b.map(p,function(i){return b.trim(i)})}if(b.fmatter.isString(f)){var c=f.split(d),g=0;for(var k=0;k<c.length;k++){o=c[k].split(t);if(o.length>2){o[1]=b.map(o,function(u,j){if(j>0){return u}}).join(t)}if(r){if(b.inArray(o[1],p)>-1){m[g]=o[0];g++}}else{if(b.trim(o[1])==b.trim(q)){m[0]=o[0];break}}}}else{if(b.fmatter.isObject(f)||b.isArray(f)){if(!r){p[0]=q}m=b.map(p,function(j){var i;b.each(f,function(u,v){if(v==j){i=u;return false}});if(typeof(i)!="undefined"){return i}})}}return m.join(", ")}else{return q||""}};b.unformat.date=function(d,c){if(c.revertCode){return b(d).attr("data-org")}else{return b(d).text()}};b.unformat.checkbox=function(e,d){var f=b.extend({},!b.fmatter.isUndefined(d.colModel.formatoptions)?d.colModel.formatoptions:d.colModel.editoptions);var c=(f.value)?f.value.split(":"):["Yes","No"];return b("input",e).is(":checked")?c[0]:c[1]}})(jQuery);