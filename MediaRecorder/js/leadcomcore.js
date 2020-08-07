(function($){
	/* 扩展核心API */
	$.extend({
		namespace:function(){	//添加命名空间的功能
			var a=arguments, o=null, i, j, d, rt;
			for (i=0; i<a.length; ++i) {
				d=a[i].split(".");
				rt = d[0];
				eval('if (typeof ' + rt + ' == "undefined"){' + rt + ' = {};} o = ' + rt + ';');
				for (j=1; j<d.length; ++j) {
					o[d[j]]=o[d[j]] || {};
					o=o[d[j]];
				}
			}
		}
		,raise:function(){
			var reFlag =true;
			var evtHandler,params;
			evtHandler =arguments[0];
			try{
				if (evtHandler==null ||evtHandler=="")return reFlag;
			}catch(e){
			}
			if (typeof(evtHandler)=="function"){
				reFlag =evtHandler(arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]);
				if (reFlag==null)reFlag =true;
				return reFlag;
			}else if (evtHandler.constructor ==Array ||typeof(evtHandler)=="object"){
				for (var index=0; index<evtHandler.length; index++){
					var eFun =evtHandler[index];
					if (eFun ==null)continue;
					reFlag =eFun(arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]);
					if (reFlag==null)reFlag =true;
					if (!reFlag)break;
				}
				return reFlag;
			}
			params ="";
			for(var index=1;index<arguments.length;index++){
				if (arguments[index]!=null){
					if (arguments[index].constructor==String) params =params +"'" +escape(arguments[index])+"',";
					else params =params +"arguments[" +index +"],";
				}
				else params =params +"null,";
			}
			if (params.length>0) params ="(" +params.substr(0,params.length-1)+")";
			if (evtHandler.indexOf(";")>-1){
				var funs =evtHandler.split(';');
				for(var index=0; index<funs.length; index++){
					var fun =funs[index];
					if (fun.indexOf("(")==-1) fun +=params;
					reFlag =eval(fun);
					if (reFlag==null)reFlag =true;
					if (!reFlag)break;
				}
			}else{
				if (evtHandler.indexOf("(")==-1) evtHandler +=params;
				reFlag =eval(evtHandler);
			}
			if (reFlag==null)reFlag =true;
			return reFlag;
		}
	});
})(jQuery);