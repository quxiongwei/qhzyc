/*!
 * jQuery coral Droppable 4.0.1
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.component.js
 *	jquery.ui.mouse.js
 *	jquery.ui.draggable.js
 */
(function(b,c){function a(e,d,f){return(e>=d)&&(e<(d+f))}b.component("coral.droppable",{version:"4.0.1",componentEventPrefix:"drop",options:{accept:"*",activeClass:false,addClasses:true,greedy:false,hoverClass:false,scope:"default",tolerance:"intersect",activate:null,deactivate:null,drop:null,out:null,over:null},_create:function(){var e,f=this.options,d=f.accept;this.isover=false;this.isout=true;this.accept=b.isFunction(d)?d:function(g){return g.is(d)};this.proportions=function(){if(arguments.length){e=arguments[0]}else{return e?e:e={width:this.element[0].offsetWidth,height:this.element[0].offsetHeight}}};this._addToManager(f.scope);(f.addClasses&&this.element.addClass("coral-droppable"))},_addToManager:function(d){b.coral.ddmanager.droppables[d]=b.coral.ddmanager.droppables[d]||[];b.coral.ddmanager.droppables[d].push(this)},_splice:function(d){var e=0;for(;e<d.length;e++){if(d[e]===this){d.splice(e,1)}}},_destroy:function(){var d=b.coral.ddmanager.droppables[this.options.scope];this._splice(d);this.element.removeClass("coral-droppable coral-droppable-disabled")},_setOption:function(e,f){if(e==="accept"){this.accept=b.isFunction(f)?f:function(g){return g.is(f)}}else{if(e==="scope"){var d=b.coral.ddmanager.droppables[this.options.scope];this._splice(d);this._addToManager(f)}}this._super(e,f)},_activate:function(e){var d=b.coral.ddmanager.current;if(this.options.activeClass){this.element.addClass(this.options.activeClass)}if(d){this._trigger("activate",e,this.ui(d))}},_deactivate:function(e){var d=b.coral.ddmanager.current;if(this.options.activeClass){this.element.removeClass(this.options.activeClass)}if(d){this._trigger("deactivate",e,this.ui(d))}},_over:function(e){var d=b.coral.ddmanager.current;if(!d||(d.currentItem||d.element)[0]===this.element[0]){return}if(this.accept.call(this.element[0],(d.currentItem||d.element))){if(this.options.hoverClass){this.element.addClass(this.options.hoverClass)
}this._trigger("over",e,this.ui(d))}},_out:function(e){var d=b.coral.ddmanager.current;if(!d||(d.currentItem||d.element)[0]===this.element[0]){return}if(this.accept.call(this.element[0],(d.currentItem||d.element))){if(this.options.hoverClass){this.element.removeClass(this.options.hoverClass)}this._trigger("out",e,this.ui(d))}},_drop:function(e,f){var d=f||b.coral.ddmanager.current,g=false;if(!d||(d.currentItem||d.element)[0]===this.element[0]){return false}this.element.find(":data(coral-droppable)").not(".coral-draggable-dragging").each(function(){var h=b.data(this,"coral-droppable");if(h.options.greedy&&!h.options.disabled&&h.options.scope===d.options.scope&&h.accept.call(h.element[0],(d.currentItem||d.element))&&b.coral.intersect(d,b.extend(h,{offset:h.element.offset()}),h.options.tolerance,e)){g=true;return false}});if(g){return false}if(this.accept.call(this.element[0],(d.currentItem||d.element))){if(this.options.activeClass){this.element.removeClass(this.options.activeClass)}if(this.options.hoverClass){this.element.removeClass(this.options.hoverClass)}this._trigger("drop",e,this.ui(d));return this.element}return false},ui:function(d){return{draggable:(d.currentItem||d.element),helper:d.helper,position:d.position,offset:d.positionAbs}}});b.coral.intersect=(function(){function d(f,e,g){return(f>=e)&&(f<(e+g))}return function(q,j,o,f){if(!j.offset){return false}var h=(q.positionAbs||q.position.absolute).left,n=(q.positionAbs||q.position.absolute).top,g=h+q.helperProportions.width,m=n+q.helperProportions.height,i=j.offset.left,p=j.offset.top,e=i+j.proportions().width,k=p+j.proportions().height;switch(o){case"fit":return(i<=h&&g<=e&&p<=n&&m<=k);case"intersect":return(i<h+(q.helperProportions.width/2)&&g-(q.helperProportions.width/2)<e&&p<n+(q.helperProportions.height/2)&&m-(q.helperProportions.height/2)<k);case"pointer":return d(f.pageY,p,j.proportions().height)&&d(f.pageX,i,j.proportions().width);case"touch":return((n>=p&&n<=k)||(m>=p&&m<=k)||(n<p&&m>k))&&((h>=i&&h<=e)||(g>=i&&g<=e)||(h<i&&g>e));
default:return false}}})();b.coral.ddmanager={current:null,droppables:{"default":[]},prepareOffsets:function(g,k){var f,e,d=b.coral.ddmanager.droppables[g.options.scope]||[],h=k?k.type:null,l=(g.currentItem||g.element).find(":data(coral-droppable)").addBack();droppablesLoop:for(f=0;f<d.length;f++){if(d[f].options.disabled||(g&&!d[f].accept.call(d[f].element[0],(g.currentItem||g.element)))){continue}for(e=0;e<l.length;e++){if(l[e]===d[f].element[0]){d[f].proportions().height=0;continue droppablesLoop}}d[f].visible=d[f].element.css("display")!=="none";if(!d[f].visible){continue}if(h==="mousedown"){d[f]._activate.call(d[f],k)}d[f].offset=d[f].element.offset();d[f].proportions({width:d[f].element[0].offsetWidth,height:d[f].element[0].offsetHeight})}},drop:function(d,e){var f=false;b.each((b.coral.ddmanager.droppables[d.options.scope]||[]).slice(),function(){if(!this.options){return}if(!this.options.disabled&&this.visible&&b.coral.intersect(d,this,this.options.tolerance,e)){f=this._drop.call(this,e)||f}if(!this.options.disabled&&this.visible&&this.accept.call(this.element[0],(d.currentItem||d.element))){this.isout=true;this.isover=false;this._deactivate.call(this,e)}});return f},dragStart:function(d,e){d.element.parentsUntil("body").bind("scroll.droppable",function(){if(!d.options.refreshPositions){b.coral.ddmanager.prepareOffsets(d,e)}})},drag:function(d,e){if(d.options.refreshPositions){b.coral.ddmanager.prepareOffsets(d,e)}b.each(b.coral.ddmanager.droppables[d.options.scope]||[],function(){if(this.options.disabled||this.greedyChild||!this.visible){return}var i,g,f,h=b.coral.intersect(d,this,this.options.tolerance,e),j=!h&&this.isover?"isout":(h&&!this.isover?"isover":null);if(!j){return}if(this.options.greedy){g=this.options.scope;f=this.element.parents(":data(coral-droppable)").filter(function(){return b.data(this,"coral-droppable").options.scope===g});if(f.length){i=b.data(f[0],"coral-droppable");i.greedyChild=(j==="isover")}}if(i&&j==="isover"){i.isover=false;i.isout=true;
i._out.call(i,e)}this[j]=true;this[j==="isout"?"isover":"isout"]=false;this[j==="isover"?"_over":"_out"].call(this,e);if(i&&j==="isout"){i.isout=false;i.isover=true;i._over.call(i,e)}})},dragStop:function(d,e){d.element.parentsUntil("body").unbind("scroll.droppable");if(!d.options.refreshPositions){b.coral.ddmanager.prepareOffsets(d,e)}}}})(jQuery);