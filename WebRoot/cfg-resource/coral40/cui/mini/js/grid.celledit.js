(function(a){a.component("coral.grid",a.coral.grid,{editCell:function(f,d,g){var i=this,c,t,o,j;if(!i.grid||i.options.cellEdit!==true){return}d=parseInt(d,10);if(!i.options.knv){a(i.element).grid("GridNav")}if(i.options.savedRow.length>0){if(g===true){if(f==i.options.iRow&&d==i.options.iCol){return}}if(i.rows[i.options.savedRow[0].id]){if(!a(i.element).grid("saveCell",i.options.savedRow[0].id,i.options.savedRow[0].ic)){return}}}else{window.setTimeout(function(){a("#"+a.grid.coralID(i.options.knv)).attr("tabindex","-1").focus()},0)}j=i.options.colModel[d];c=j.name;if(c=="subgrid"||c=="cb"||c=="rn"){return}o=a("td:eq("+d+")",i.rows[f]);if(j.editable===true&&g===true&&!o.hasClass("not-editable-cell")){if(parseInt(i.options.iCol,10)>=0&&parseInt(i.options.iRow,10)>=0){a("td:eq("+i.options.iCol+")",i.rows[i.options.iRow]).removeClass("edit-cell coral-state-highlight");a(i.rows[i.options.iRow]).removeClass("selected-row coral-state-hover")}a(o).addClass("edit-cell coral-state-highlight");a(i.rows[f]).addClass("selected-row coral-state-hover");try{t=a.unformat.call(i,o,{rowId:i.rows[f].id,colModel:j},d)}catch(u){t=(j.edittype&&j.edittype=="textarea")?a(o).text():a(o).html()}if(i.options.autoencode){t=a.grid.htmlDecode(t)}if(!i._trigger("beforeEditCell",null,[{rowId:i.rows[f].id,name:c,cellValue:t,rowIndex:f,cellIndex:d}])){return}i.options.savedRow.push({id:f,ic:d,name:c,value:t});if(t==="&nbsp;"||t==="&#160;"||(t.length===1&&t.charCodeAt(0)===160)){t=""}if(a.isFunction(i.options.formatCell)){var p=i.options.formatCell.call(i,i.rows[f].id,c,t,f,d);if(p!==undefined){t=p}}var v=j.editoptions,r={id:f+"_"+c,name:c};v=a.extend({},v||{},r);var n=a.grid.createEl.call(i,j.edittype,v,t,true,a.extend({},a.grid.ajaxOptions,i.options.ajaxSelectOptions||{}));a(o).html("").append(n).attr("tabindex","0");var b=function(w){if(w.keyCode===27){if(a("input.hasDatepicker",o).length>0){if(a(".coral-datepicker").is(":hidden")){a(i.element).grid("restoreCell",f,d)}else{a("input.hasDatepicker",o).datepicker("hide")
}}else{a(i.element).grid("restoreCell",f,d)}}if(w.keyCode===13){a(i.element).grid("saveCell",f,d);return false}if(w.keyCode===9){if(!i.grid.columnsView.loading){if(w.shiftKey){a(i.element).grid("prevCell",f,d)}else{a(i.element).grid("nextCell",f,d)}}else{return false}}w.stopPropagation()};var h={onKeyDown:b,value:a(n).val()},e=j.edittype,l=a(i.element).grid("getRowData",i.rows[f].id);switch(j.edittype){case"text":case"textarea":v=a.extend({},v,h);a(n).textbox(v);break;case"datepicker":v=a.extend({},v,h);a(n).datepicker(v);break;case"radio":v=a.extend({},v,h);a(n).radio(v);if(a(n).val()=="Yes"){a(n).radio("check")}else{a(n).radio("uncheck")}break;case"checkbox":v=a.extend({},v,h);a(n).checkbox(v);if(a(n).val()=="Yes"){a(n).checkbox("check")}else{a(n).checkbox("uncheck")}break;case"autocomplete":var q=a(n).val();var k=typeof(v.source)=="string";v=a.extend({},v,h);var s=v.postMode||"value";v.postMode=s;v=a.extend({},v,{onKeyDown:b});a(n).autocomplete(v);if(k){v.postMode="text";a(n).autocomplete(v);a(n).autocomplete("setValue",q)}else{if(s=="value"){a(n).autocomplete("setValue",q)}else{a(n).autocomplete("setValue",q);a(n).autocomplete("setText",q)}}break;case"combobox":case"combotree":case"combogrid":v=a.extend({},v,h);if(j.cellEditoptions){var m=i.getCellEditOptions(j,a(n).val(),v,l,r,h)}e=m&&m.type?m.type:j.edittype;v=m&&m.cOpts?m.cOpts:v;e=e=="text"?"textbox":e;a(n)[e](v);break}window.setTimeout(function(){a(n).focus()},0);i._trigger("afterEditCell",null,[{rowId:i.rows[f].id,name:c,cellValue:t,rowIndex:f,celIndex:d}])}else{if(parseInt(i.options.iCol,10)>=0&&parseInt(i.options.iRow,10)>=0){a("td:eq("+i.options.iCol+")",i.rows[i.options.iRow]).removeClass("edit-cell coral-state-highlight");a(i.rows[i.options.iRow]).removeClass("selected-row coral-state-hover")}o.addClass("edit-cell coral-state-highlight");a(i.rows[f]).addClass("selected-row coral-state-hover");t=o.html().replace(/\&#160\;/ig,"");a(i.element).triggerHandler("jqGridSelectCell",[i.rows[f].id,c,t,f,d]);if(a.isFunction(i.options.onSelectCell)){i.options.onSelectCell.call(i,i.rows[f].id,c,t,f,d)
}}i.options.iCol=d;i.options.iRow=f},getCellEditOptions:function(d,g,h,c,b,i){var e=a.coral.toFunction(d.cellEditoptions).call(this,g,h,c);var f=e&&e.type?e.type:d.edittype;e=e&&e.cellEditoptions?a.extend({},e.cellEditoptions,b,i):h;h=e||h;return{cOpts:e,type:f}},GridNav:function(){var g=this;if(!g.grid||g.options.cellEdit!==true){return}g.options.knv=g.options.id+"_kn";var f=a("<span style='width:0px;height:0px;background-color:black;' tabindex='0'><span tabindex='-1' style='width:0px;height:0px;background-color:grey' id='"+g.options.knv+"'></span></span>"),d,c;function e(p,n,o){if(o.substr(0,1)=="v"){var h=a(g.grid.rowsView)[0].clientHeight,q=a(g.grid.rowsView)[0].scrollTop,r=g.rows[p].offsetTop+g.rows[p].clientHeight,l=g.rows[p].offsetTop;if(o=="vd"){if(r>=h){a(g.grid.rowsView)[0].scrollTop=a(g.grid.rowsView)[0].scrollTop+g.rows[p].clientHeight}}if(o=="vu"){if(l<q){a(g.grid.rowsView)[0].scrollTop=a(g.grid.rowsView)[0].scrollTop-g.rows[p].clientHeight}}}if(o=="h"){var k=a(g.grid.rowsView)[0].clientWidth,j=a(g.grid.rowsView)[0].scrollLeft,i=g.rows[p].cells[n].offsetLeft+g.rows[p].cells[n].clientWidth,m=g.rows[p].cells[n].offsetLeft;if(i>=k+parseInt(j,10)){a(g.grid.rowsView)[0].scrollLeft=a(g.grid.rowsView)[0].scrollLeft+g.rows[p].cells[n].clientWidth}else{if(m<j){a(g.grid.rowsView)[0].scrollLeft=a(g.grid.rowsView)[0].scrollLeft-g.rows[p].cells[n].clientWidth}}}}function b(l,h){var k,j;if(h=="lft"){k=l+1;for(j=l;j>=0;j--){if(g.options.colModel[j].hidden!==true){k=j;break}}}if(h=="rgt"){k=l-1;for(j=l;j<g.options.colModel.length;j++){if(g.options.colModel[j].hidden!==true){k=j;break}}}return k}a(f).insertBefore(g.grid.columnsView);a("#"+g.options.knv).focus().keydown(function(h){c=h.keyCode;if(g.options.direction=="rtl"){if(c===37){c=39}else{if(c===39){c=37}}}switch(c){case 38:if(g.options.iRow-1>0){e(g.options.iRow-1,g.options.iCol,"vu");a(g.element).grid("editCell",g.options.iRow-1,g.options.iCol,false)}break;case 40:if(g.options.iRow+1<=g.rows.length-1){e(g.options.iRow+1,g.options.iCol,"vd");
a(g.element).grid("editCell",g.options.iRow+1,g.options.iCol,false)}break;case 37:if(g.options.iCol-1>=0){d=b(g.options.iCol-1,"lft");e(g.options.iRow,d,"h");a(g.element).grid("editCell",g.options.iRow,d,false)}break;case 39:if(g.options.iCol+1<=g.options.colModel.length-1){d=b(g.options.iCol+1,"rgt");e(g.options.iRow,d,"h");a(g.element).grid("editCell",g.options.iRow,d,false)}break;case 13:if(parseInt(g.options.iCol,10)>=0&&parseInt(g.options.iRow,10)>=0){a(g.element).grid("editCell",g.options.iRow,g.options.iCol,true)}break;default:return true}return false})},saveCell:function(g,f){var i=this,h;if(!i.grid||i.options.cellEdit!==true){return}if(i.options.savedRow.length>=1){h=0}else{h=null}if(h!==null){var r=a("td:eq("+f+")",i.rows[g]),p,b,k=i.options.colModel[f],c=k.name,j=a.grid.coralID(c);if(this.options.autoValid){var y=this.valid(i.rows[g].id,k.name);if(!this.options.allowSaveOnError&&!y){a.message("请确认是否输入正确！");return y}}var s=k.edittype;if(k.cellEditoptions){var o=a(i.element).grid("getRowData",i.rows[g].id),x=a("#"+g+"_"+j,i.rows[g]),A=a.coral.toFunction(k.cellEditoptions).call(this,a(x).val(),k.editoptions,o);s=A&&A.type?A.type:s}switch(s){case"select":if(!k.editoptions.multiple){p=a("#"+g+"_"+j+" option:selected",i.rows[g]).val();b=a("#"+g+"_"+j+" option:selected",i.rows[g]).text()}else{var x=a("#"+g+"_"+j,i.rows[g]),w=[];p=a(x).val();if(p){p.join(",")}else{p=""}a("option:selected",x).each(function(e,v){w[e]=a(v).text()});b=w.join(",")}if(k.formatter){b=p}break;case"checkbox":var t=["Yes","No"];if(k.editoptions){t=k.editoptions.value.split(":")}p=a("#"+g+"_"+j,i.rows[g]).is(":checked")?t[0]:t[1];b=p;break;case"password":case"text":case"textarea":p=a("#"+g+"_"+j,i.rows[g]).val();b=p;break;case"button":p=a("#"+g+"_"+j,i.rows[g]).val();b=p;break;case"custom":try{if(k.editoptions&&a.isFunction(k.editoptions.custom_value)){p=k.editoptions.custom_value.call(i,a(".customelement",r),"get");if(p===undefined){throw"e2"}else{b=p}}else{throw"e1"}}catch(z){if(z=="e1"){a.grid.info_dialog(jQuery.jgrid.errors.errcap,"function 'custom_value' "+a.grid.edit.msg.nodefined,jQuery.jgrid.edit.bClose)
}if(z=="e2"){a.grid.info_dialog(jQuery.jgrid.errors.errcap,"function 'custom_value' "+a.grid.edit.msg.novalue,jQuery.jgrid.edit.bClose)}else{a.grid.info_dialog(jQuery.jgrid.errors.errcap,z.message,jQuery.jgrid.edit.bClose)}}break;case"datepicker":p=a("#"+g+"_"+j,i.rows[g]).val();b=p;var D=a("#"+g+"_"+j,i.rows[g]);break;case"combobox":case"combogrid":case"combotree":p=a("#"+g+"_"+j,i.rows[g])[s]("getValues").toString();b=a("#"+g+"_"+j,i.rows[g])[s]("getText");if(k.formatter){b=p}break;case"autocomplete":b=a("#"+g+"_"+j,i.rows[g])[s]("getText");if(typeof(k.editoptions.source)=="string"){p=b}else{p=a("#"+g+"_"+j,i.rows[g])[s]("getValue")}if(k.formatter&&k.postMode=="value"){b=p}break}if(b!==i.options.savedRow[h].value){var C=a(i).triggerHandler("jqGridBeforeSaveCell",[i.rows[g].id,c,p,g,f]);if(C){p=C;b=C}if(a.isFunction(i.options.beforeSaveCell)){var u=i.options.beforeSaveCell.call(i,i.rows[g].id,c,p,g,f);if(u){p=u;b=u}}var d=a.grid.checkValues(p,f,i);if(d[0]===true){var m=a(i).triggerHandler("jqGridBeforeSubmitCell",[i.rows[g].id,c,p,g,f])||{};if(a.isFunction(i.options.beforeSubmitCell)){m=i.options.beforeSubmitCell.call(i,i.rows[g].id,c,p,g,f);if(!m){m={}}}if(a("input.hasDatepicker",r).length>0){a("input.hasDatepicker",r).datepicker("hide")}if(i.options.cellsubmit=="remote"){if(i.options.cellurl){var B={};if(i.options.autoencode){p=a.grid.htmlEncode(p)}B[c]=p;var q,n,l;l=i.options.prmNames;q=l.id;n=l.oper;B[q]=a.grid.stripPref(i.options.idPrefix,i.rows[g].id);B[n]=l.editoper;B=a.extend(m,B);a("#lui_"+a.grid.coralID(i.options.id)).show();i.grid.columnsView.loading=true;a.ajax(a.extend({url:i.options.cellurl,data:a.isFunction(i.options.serializeCellData)?i.options.serializeCellData.call(i,B):B,type:"POST",complete:function(e,E){a("#lui_"+i.options.id).hide();i.grid.columnsView.loading=false;if(E=="success"){var v=a(i).triggerHandler("jqGridAfterSubmitCell",[i,e,B.id,c,p,g,f])||[true,""];if(v[0]===true&&a.isFunction(i.options.afterSubmitCell)){v=i.options.afterSubmitCell.call(i,e,B.id,c,p,g,f)
}if(v[0]===true){a(r).empty();a(i.element).grid("setCell",i.rows[g].id,f,b,false,false,true);a(r).addClass("dirty-cell");a(i.rows[g]).addClass("edited");a(i).triggerHandler("jqGridAfterSaveCell",[i.rows[g].id,c,p,g,f]);if(a.isFunction(i.options.afterSaveCell)){i.options.afterSaveCell.call(i,i.rows[g].id,c,p,g,f)}i.options.savedRow.splice(0,1)}else{a.grid.info_dialog(a.grid.errors.errcap,v[1],a.grid.edit.bClose);a(i.element).grid("restoreCell",g,f)}}},error:function(e,v,E){a("#lui_"+a.grid.coralID(i.options.id)).hide();i.grid.columnsView.loading=false;a(i).triggerHandler("jqGridErrorCell",[e,v,E]);if(a.isFunction(i.options.errorCell)){i.options.errorCell.call(i,e,v,E);a(i.element).grid("restoreCell",g,f)}else{a.grid.info_dialog(a.grid.errors.errcap,e.status+" : "+e.statusText+"<br/>"+v,a.grid.edit.bClose);a(i.element).grid("restoreCell",g,f)}}},a.grid.ajaxOptions,i.options.ajaxCellOptions||{}))}else{try{a.grid.info_dialog(a.grid.errors.errcap,a.grid.errors.nourl,a.grid.edit.bClose);a(i.element).grid("restoreCell",g,f)}catch(z){}}}if(i.options.cellsubmit=="clientArray"){a(r).empty();a(i.element).grid("setCell",i.rows[g].id,f,b,false,false,true);a(r).addClass("dirty-cell");a(i.rows[g]).addClass("edited");i._trigger("afterSaveCell",null,[{rowId:i.rows[g].id,name:c,cellValue:p,rowIndex:g,celIndex:f}]);i.options.savedRow.splice(0,1)}}else{try{window.setTimeout(function(){a.grid.info_dialog(a.grid.errors.errcap,p+" "+d[1],a.grid.edit.bClose)},100);a(i.element).grid("restoreCell",g,f)}catch(z){}}}else{a(i.element).grid("restoreCell",g,f)}}if(false){a("#"+a.grid.coralID(i.options.knv)).attr("tabindex","-1").focus()}else{window.setTimeout(function(){a("#"+a.grid.coralID(i.options.knv)).attr("tabindex","-1").focus()},0)}},restoreCell:function(e,c){var d=this,b;if(!d.grid||d.options.cellEdit!==true){return}if(d.options.savedRow.length>=1){b=0}else{b=null}if(b!==null){var f=a("td:eq("+c+")",d.rows[e]);a(f).empty().attr("tabindex","-1");a(d.element).grid("setCell",d.rows[e].id,c,d.options.savedRow[b].value,false,false,true);
a(d).triggerHandler("jqGridAfterRestoreCell",[d.rows[e].id,d.options.savedRow[b].value,e,c]);if(a.isFunction(d.options.afterRestoreCell)){d.options.afterRestoreCell.call(d,d.rows[e].id,d.options.savedRow[b].value,e,c)}d.options.savedRow.splice(0,1)}window.setTimeout(function(){a("#"+d.options.knv).attr("tabindex","-1").focus()},0)},nextCell:function(e,b){var d=this,f=false;if(!d.grid||d.options.cellEdit!==true){return}for(var c=b+1;c<d.options.colModel.length;c++){if(d.options.colModel[c].editable===true){f=c;break}}if(f!==false){a(d.element).grid("editCell",e,f,true)}else{if(d.options.savedRow.length>0){a(d.element).grid("saveCell",e,b)}}},prevCell:function(e,b){var d=this,f=false;if(!d.grid||d.options.cellEdit!==true){return}for(var c=b-1;c>=0;c--){if(d.options.colModel[c].editable===true){f=c;break}}if(f!==false){a(d.element).grid("editCell",e,f,true)}else{if(d.options.savedRow.length>0){a(d.element).grid("saveCell",e,b)}}},getChangedCells:function(f){var c=[];if(!f){f="all"}var d=this,b,e=true;if(!d.grid||d.options.cellEdit!==true){return}a(d.rows).each(function(g){var h={};if(a(this).hasClass("edited")){a("td",this).each(function(j){b=d.options.colModel[j].name;if(b!=="cb"&&b!=="subgrid"){if(a(this).hasClass("coral-gridcell-error")){e=false;return false}if(f=="dirty"){if(a(this).hasClass("dirty-cell")){try{h[b]=a.unformat.call(d,this,{rowId:d.rows[g].id,colModel:d.options.colModel[j]},j)}catch(k){h[b]=a.jgrid.htmlDecode(a(this).html())}}}else{try{h[b]=a.unformat.call(d,this,{rowId:d.rows[g].id,colModel:d.options.colModel[j]},j)}catch(k){h[b]=a.jgrid.htmlDecode(a(this).html())}}}});if(!e){return false}h.id=this.id;c.push(h)}});if(!e){c=[]}return c}})})(jQuery);