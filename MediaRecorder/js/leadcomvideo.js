jQuery.namespace("leadcom.video");

(function($,δ,win){
	win.leadcom.video=δ={
		version:"2.0.1.1",timeHandler:-1,timeRate:500,cometState:-1,events:{},socket:null
		,result:{"success":0,"fail":-1,"validTelNum":201,"limitTelNum":202,"timeout":100,"nophone":101,"online":102}
		,video:function(){
			this.setVideo=function(callback){			//播放视频
				δ.fn.jsonpRequest({"msgType":"setVideo","params":"{}","message":"设置视频设备"},callback);
			};
			this.startVideo=function(filename,callback){		//开始视频
				δ.fn.jsonpRequest({"msgType":"startVideo","params":"{\"filename\":\""+filename+"\"}","message":"开始视频"},callback);
			};
			this.stopVideo=function(callback){			//结束视频
				δ.fn.jsonpRequest({"msgType":"stopVideo","params":"{}","message":"结束视频"},callback);
			};
			this.playVideo=function(exserial,callback){			//播放视频
				δ.fn.jsonpRequest({"msgType":"playVideo","params":"{\"exserial\":\""+exserial+"\"}","message":"开始播放视频"},callback);
			};
			this.deleteVideo=function(exserial,callback){			//删除视频
				δ.fn.jsonpRequest({"msgType":"deleteVideo","params":"{\"exserial\":\""+exserial+"\"}","message":"删除视频"},callback);
			};			
		}
		,create:function(){		
			var video = new δ.video();
			return video;
		}
		,fn:{
			jsonpRequest:function(data,callback,completeback){
				$.ajax({
						type: "GET",
						url: "http://127.0.0.1:9000/webrequest/",						 
						data: data,						
						timeout:10000,				//超时10秒
						async:false,
						jsonp:"callback",			//服务端用于接收callback调用的function名的参数
						jsonpCallback:"localCallback",			//callback的function名称
						dataType:"jsonp",
						success: function(msg){
								var args = (msg.content)?$.parseJSON(msg.content):{};
								if(args.result==-1){
									args["result"]=args.result;
									args["message"]=args.message;
									δ.fn.raiseCallback(args,callback);
								}else{
									args["result"]=δ.result.success;
									args["message"]=data.message;
									δ.fn.raiseCallback(args,callback);
								}
							  },
					error:function(XHR,status,errorThrown){						
					},
					complete:function(XHR,status){						
						if(completeback)$.raise(completeback,status);
				　}
				 });
			}			
			,jsonpCallback:function(msg){

			}
			,raiseCallback:function(args,callback){
				try{
					if(callback)$.raise(callback,args);
				}catch(e){
					
				}
			}
		}		
	}
})(jQuery,leadcom.video,window);

var localCallback = leadcom.video.fn.jsonpCallback;

