/**
 * UMD(Universal Module Definition - 범용 모듈 정의) 패턴 
 * @param factory
 * @since 2020.02.19
 * @author 진주영
 */
//IIFE(즉시 함수 호출 표현식)
;(function (factory) {	//코드 닫힘 없는 예외 상황 해결 위해 ; 추가
	"use strict";
	//jQuery 즉시 호출
	factory(jQuery);
}(function ($, undefined) {	//익명 함수
	"use strict";
	/* 기본 설정 */
	//osl 기본 생성자
	$.osl = {
		name: "LUNA™ SEC-OPS"	//솔루션명
		,deferred: $.Deferred() //비동기 처리 완수 시점 제어를 위한 지연변수
		,version: "1.0"		//솔루션 버전
		,cVersion: "1.08"	//코어 버전
		,langCd: "ko"		//코어 언어
		,selPrjGrpId: ''
		,selPrjId: ''
		,selAuthGrpIds: ''
		,selMenuId: ''
		,selMenuInfo: {}
		,isReady: false		//코어 준비 상태 (init 실행 완료 유무)
		/**
		 *  function 명 	: $.osl.ready
		 *  function 설명	: 코어 init 실행이 모두 완료된 경우 callback 실행
		 *  @param callback: 코어 init 실행 이후 callback 함수
		 **/
		,ready: function(callback){
			//callback이 함수가 아닌 경우 종료
			if(typeof callback != "function"){
				return false;
			}
			
			//modal 선언이 있는 경우 modal script 실행 시 호출 타이밍
			//modal에서 호출 시 core는 호출 완료 상태 (필수 선행 조건)
			if($(".modal-body").length > 0){
				$.osl.deferred.then(function(){
					
					/* 모달 오픈 시 해당 모달의 select2 초기화 시작 */
					//select2 선언된 elements 가져오기
					var elements = [].slice.call($('.modal-body:eq(0) [data-control="select2"], [data-kt-select2="true"]'));
					
					//data-hide-search 속성 있는지 파악 후 select2 선언
					elements.map(function (element) {
						//이미 선언된 경우 제외
						if (element.getAttribute("data-kt-initialized") === "1") {
							return;
						}

						var options = {
							width: '100%'
						};

						//data-hide-search="true" 옵션 있는 경우 select2 검색박스 영역 제외
						if (element.getAttribute('data-hide-search') == 'true') {
							options.minimumResultsForSearch = Infinity;
						}

						//select2 선언
						$(element).select2(options);

						element.setAttribute("data-kt-initialized", "1");
					});
					
					/* select2 초기화 종료 */
					
					callback();
					
					//언어팩 적용
					$.osl.langConvert(".modal-body");
					
					$.osl.isReady = true;
				});
			}
			
			//이미 코어 준비 상태라면 바로 callback 실행
			else if(this.isReady){
				callback();
			}else{
				//코어 준비 상태 아닌 경우
				//비동기로 init실행 완료 시 callback 실행
				$.osl.deferred.then(function(){
					callback();
					
					//언어팩 적용
					$.osl.langConvert(".app-root");
					
					$.osl.isReady = true;
				});
			}
		}
		/**
		 *  function 명 	: $.osl.init
		 *  function 설명	: 즐겨찾기, 메뉴, 프로젝트 및 권한 그룹 및 솔루션 초기 세팅
		 **/
		,init: function(){
			//가이드 시스템 세팅(es6)
			OSLCoreGuideSetting.init();
			//언어 정보 세팅
			OSLCoreLangSetting.init();
			//차트 정보 세팅
			OSLCoreChartSetting.init();
			//데이터 테이블 세팅
			OSLDatatableSetting.init();
			
			//유효성 추가 생성 세팅(기본+양식정규식)_ 양식 생성보다 먼저 선언해야 함
			OSLCoreRegexSetting.init();
			/*
			//기본항목 html 생성 세팅
			OSLCoreCustomOptionSetting.init();
			 */
			//양식 html 생성 세팅
			OSLCoreTemplateFormSetting.init();
			
			//이력 카드 공통 함수 세팅
			OSLCmmCard.init();
			
			//위젯 정보 세팅
			OSLCoreWidget.init();
			OSLCoreWidgetSetting.init();
			
			var headerExist = $("#kt_app_header");
			var contentExist = $("#kt_app_content");
			
			
			//header 있는 경우에만 데이터 조회
			if(!$.osl.isNull(headerExist) && headerExist.length > 0){
				//영역 초기화
				$.osl.initHeaderClear();
				//header init function
				$.osl.initHeader(function(){
					/*var headerFnBar = new KTToggle('kt_header_pc_topbar_toggler', {
						target: 'body',
						targetState: 'kt-header__topbar--pc-on',
						togglerState: 'kt-header-pc__toolbar-topbar-toggler--active'
					});

					//상단 기능 바 옵션 세팅
					if($.osl.user.usrOptData.hasOwnProperty("OPT00002") && !$.osl.isNull($.osl.user.usrOptData["OPT00002"].value)){
						if($.osl.user.usrOptData["OPT00002"].value == "02"){
							headerFnBar.toggleOn();
							KTLayout.getAsideToggler().toggleOn();
						}
					}
					
					//KT 툴팁 재 호출
					KTApp.initTooltips();*/
					OSLApp.initTooltips();
					
					//실행 완료 호출
					$.osl.deferred.resolve();
				});
			}else{
				//실행 완료 호출
				$.osl.deferred.resolve();
			}
			
			//content 있는 경우에만 데이터 조회
			if(!$.osl.isNull(contentExist) && contentExist.length > 0){
				//content 내에 kt-portlet이 있는 경우 생성 (각자 제어 없음)
				var portletList = contentExist.find(".kt-portlet");
				$.each(portletList, function(idx, map){
					var elemId = $(map).attr("id");
					
					if(!$.osl.isNull(portletList)){
						//new KTPortlet(elemId, $.osl.lang("portlet"));
					}
				});
			}
			
			return $.osl.deferred.promise();
		}
		/**  
		 * function 명	: $.osl.color
		 * function 설명	: 공통 사용 컬러로 css 컬러 추가될 경우, 같이 수정 바람.
		 * @param colorNm : default, lighting, active 또는 지정 컬러 명(--kt-제외)
		 * @param index : colorNm이 default, lighting, active일 때 몇개까지 출력할 지 지정(없을 경우 해당 값 전체)
		 * @param type : 단순 컬러 호출시 colorNm 앞에 붙여서 검색할 명칭 (default kt)
		 **/
		,color : function(colorNm, index, type){
			var root = document.querySelector(":root");
			var rootStyle = getComputedStyle(root);
			
			if($.osl.isNull(colorNm)){
				return false;
			}else{
				var colorList = {
					"default" : ["primary", "info", "secondary", "warning", "danger", "success", "navy", "orange", "dark", "light"]
					,"lighting" : ["primary-light", "info-light", "secondary-light", "warning-light", "danger-light", "success-light", "navy-light", "orange-light", "dark-light", "light-light"]
					,"active" : ["primary-active", "info-active", "secondary-active", "warning-active", "danger-active", "success-active", "navy-active", "orange-active", "dark-actve", "light-active"]
					,"sample": ["sample-color-01","sample-color-02","sample-color-03","sample-color-04","sample-color-05","sample-color-06","sample-color-07","sample-color-08"
								,"sample-color-09","sample-color-10","sample-color-11","sample-color-12","sample-color-13","sample-color-14","sample-color-15","sample-color-16"]
					//2025.01.27 lg 보안포탈 디자인 상 추가된 색상
					,"main":["main-navy", "main-manatee", "main-red", "main-pink", "main-yellow", "main-green", "main-blue"]
					,"colorChart":["color-01", "color-02", "color-03", "color-04", "color-05", "color-06", "color-07", "color-08", "color-09", "color-10"
								,"color-11", "color-12", "color-13", "color-14", "color-15", "color-16", "color-17", "color-18", "color-19", "color-20"]
					,"chart":["color-01", "color-04", "color-11", "color-07", "color-13", "color-15", "color-20"
								,"color-02", "color-05", "color-06", "color-09", "color-12", "color-17", "color-19"
								,"color-03", "color-08", "color-10", "color-14", "color-16", "color-18"]
				};
				if("default" == colorNm || "lighting" == colorNm || "active" == colorNm){
					var returnColorList = [];
					if($.osl.isNull(index)){
						index = colorList[colorNm].length;
					}
					
					for(var idx = 0; idx<index; idx++){
						returnColorList.push(rootStyle.getPropertyValue('--kt-'+colorList[colorNm][idx]).trim());
						if(idx == colorList[colorNm].length-1){
							index -= (idx+1);
							idx = -1;
						}
					};
					return returnColorList;
				}
				else if("sample" == colorNm){
					var returnColorList = [];
					if($.osl.isNull(index)){
						index = colorList[colorNm].length;
					}
					
					for(var idx = 0; idx<index; idx++){
						returnColorList.push(rootStyle.getPropertyValue('--bs-'+colorList[colorNm][idx]).trim());
					};
					return returnColorList;
				}
				else if("main" == colorNm || "colorChart" == colorNm || "chart" == colorNm){
					var returnColorList = [];
					if($.osl.isNull(index)){
						index = colorList[colorNm].length;
					}
					
					for(var idx = 0; idx<index; idx++){
						returnColorList.push(rootStyle.getPropertyValue('--osl-sec-'+colorList[colorNm][idx]).trim());
						if(idx == colorList[colorNm].length-1){
							index -= (idx+1);
							idx = -1;
						}
					};
					return returnColorList;
				}
				else {
					//단순 컬러 지정하여 단건 가져오기
					if($.osl.isNull(type)){
						type = "kt";
					}
					
					var colorValue = rootStyle.getPropertyValue("--"+type+"-"+colorNm).trim();
					if($.osl.isNull(colorValue)){
						return rootStyle.getPropertyValue('--kt-dark').trim();
					}else{
						return colorValue;
					}
				}
			}
		}
		/*
		 * function 명 : $.osl.colorCalculateColor
		 * function 설명 : 전달 받은 색상이 흰색에 가까울 경우 border 그리기 위한 색상을 반환한다.
		 * param color : 16진수로 6자리가 들어와야 한다.
		 */
		,colorCalculateColor: function(color){
			//현재 라이트 모드일 때만 진행
			 if(themeMode != "light"){
				 return color;
			 }
			 
			 //1. 전달 받은 컬러를 rgb로 변경
			 //# 제거
			 var hex = color.replace("#", "");
			 
			 //만약 세자리이면
			 if(hex.length == 3){
				var hexColor = "";
				 $.each(color.splict(""), function(i, str){
					 hexColor += str+str;
				 });
				 hex = hexColor;
			 }
			 
			 //rgb로 분리
			 hex = parseInt(hex, 16);
			 var r = (hex >> 16) & 255;
			 var g = (hex >> 8) & 255;
			 var b = hex & 255;
			 
			 //2. 평균 245 이상이면 눈에 잘 들어오지 않으므로 -20 처리한다.
			 if((parseInt(r) + parseInt(g) + parseInt(b))/3 > 245){
				 r -= 20;
				 g -= 20;
				 b -= 20;
			 }
			 //아니면 원래 데이터 반환
			 else{
				 return color;
			 }
			 
			 //3. rgb를 hex로 변환하여 반환한다.
			var toHex = function( string ){ 
				string = parseInt( string, 10 ).toString( 16 ); 
				string = ( string.length === 1 ) ? "0" + string : string; 
		
				return string; 
			}; 
			
			return "#" + toHex(r)+ toHex(g)+ toHex(b);
		}
		/**
		 *  function 명 	: $.osl.serverTime
		 *  function 설명	: 서버 시간 가져오기
	 	 *  @param format : ex) yyyy-mm-dd
		 *  @return time: format에 맞는 날짜 반환 
		 **/
		,serverTime : function(format) {
			//서버 시간 반환 변수
			var time = "";
			//format 빈값 default
			if($.osl.isNull(format)) {
				format = 'yyyy-mm-dd';
			}
			var ajaxObj = new $.osl.ajaxRequestAction(
				{"url":"/cmm/selectSelectServerTimeAjax.do","async": false},
				{"format" : format});
			ajaxObj.setFnSuccess(function(data){
				// 에러시 클라이언트 시간 조회
				if(data.errorYn == "Y"){
					var nowdate = new Date();
					 if("yyyy-mm-dd" == format){
						time = nowdate.getFullYear()+"-"+ (nowdate.getMonth() + 1).zf(2) +"-"+nowdate.getDate().zf(2);
					 }
					else if("yyyy-mm" == format){
						time = nowdate.getFullYear()+"-"+ (nowdate.getMonth() + 1).zf(2);
					 }
				}
				else {
					time =  data.serverTime;
				}
			});
			//AJAX 전송
			ajaxObj.send();
			
			return time;
		}
		 
		/**
		 *  function 명 	: $.osl.file
		 *  function 설명	: 파일 기본 객체
		 **/
		,file:{
			list: {},
			/**
			 *  function 명 	: $.osl.file.uploadSet
			 *  function 설명	: 해당 targetId element에 파일 업로드를 세팅한다.
			 *  @param targetId: 파일 업로드 영역 대상 Id (# 제외)
			 *  @param config: 
			 **/
			uploadSet: function(targetId, config){
				var rtnObject = null;
				
				var defaultConfig = {
					/* 고정 옵션 - 변경 없음 */
					proudlyDisplayPoweredByUppy: false,
					inline: true,
					darkMode : document.documentElement.getAttribute("data-theme") == "dark" ? true : false,
					browserBackButtonClose: true,
					debug: false,
					logger: {
						debug: function(args){},
						warn: function(args){},
						error: function(args){}
					},
					
					/* 동적 옵션 */
					target: "#"+targetId,
					width:'100%',
					height:370,
					note: '',
					replaceTargetContent: true,
					showProgressDetails: true,
					disableStatusBar:true,
					hideCancelButton: true,
					/* 파일 다운로드, 읽기 전용 기능 */
					fileDownload: false,
					fileReadonly: false,
					/* core config */
					autoProceed: false,
					maxFileSize: 100,	//MB단위
					maxNumberOfFiles: 10,
					minNumberOfFiles: 0,
					allowedFileTypes: null,	//['image/*', '.jpg', '.jpeg', '.png', '.gif'] mime또는 확장자로 선언
					locale:Uppy.locales.ko_KR,
					meta: {},
					onBeforeUpload: $.noop,
					onBeforeFileAdded: $.noop,
				};
				
				//설정 값 적용
				config = $.extend(true, defaultConfig, config);
				
				var targetObj = $("#"+targetId);
				if(targetObj.length > 0){
					rtnObject = Uppy.Core({
						targetId: targetId,
						autoProceed: config.autoProceed,
						restrictions: {
							maxFileSize: ((1024*1024)*parseInt(config.maxFileSize)),
							maxNumberOfFiles: config.maxNumberOfFiles,
							minNumberOfFiles: config.minNumberOfFiles,
							allowedFileTypes: config.allowedFileTypes
						},
						locale:config.locale,
						meta: config.meta,
						onBeforeUpload: function(files){
							return config.onBeforeUpload(files);
						},
						onBeforeFileAdded: function(currentFile, files){
							//데이터베이스 파일 제외,  파일 읽기 전용인경우 파일 업로드 불가 
							if(currentFile.source != "database" && config.fileReadonly){
								$.osl.toastr($.osl.lang("file.error.fileReadonly"),{type:"warning"});
								return false;
							}
							
							//파일 valid 다시 체크
							$.each($.osl.validate.list, function(formId){
								if($.osl.validate.list[formId]["fields"].hasOwnProperty(targetId)){
									$.osl.validate.list[formId].validateField(targetId);
									return false;
								}
							});
							
							//필수가 아니면
							return config.onBeforeFileAdded(currentFile, files);
						},
						debug: config.debug,
						logger: config.logger,
						fileDownload: config.fileDownload
					});
					
					rtnObject.use(Uppy.Dashboard, config);
					rtnObject.use(Uppy.XHRUpload, { endpoint: config.url,formData: true });
				}
				
				$.osl.file.list[targetId] = {config: config, targetUppy: rtnObject};
				
				//2023.12.29 안지혜 추가
				rtnObject["originalFileEvt"] = function(){
					let oriFileList = [];
					
					return {
						"setOriFileList": function(list){
							if(!$.osl.isNull(list)){
								oriFileList = list;
							}
						},
						"getOriFileList": function(){
							return oriFileList;
						}
					};
				};
				
				return rtnObject;
			},
			
			/**
			 * function 명 	: $.osl.file.makeAtchfileId
			 * function 설명	: atchFileId를 생성하고 해당 data를 반환한다.
			 * 
			 * @param	callback: atchFileId 생성 후 처리 함수
			 */
			makeAtchfileId: function(callback){
				//AJAX 설정
				var ajaxObj = new $.osl.ajaxRequestAction(
						{"url":"/com/fms/insertAtchFileIdInfo.do", "loadingShow": false, "async": false});

				//AJAX 전송 성공 함수
				
				ajaxObj.setFnSuccess(function(data){
					callback(data);
				});
				
				//AJAX 전송
				ajaxObj.send();
			},
			
			/**
			 * function 명 	: $.osl.file.fileListSetting
			 * function 설명	: 조회된 파일목록 Json Data를 파일 업로드 객체에 세팅한다.
			 * 
			 * @param	paramFileList: 파일 목록 Json Data
			 * @param	paramFileUploadObj: 파일 업로드 객체
			 */
			fileListSetting: function(paramFileList, paramFileUploadObj, callback){
				//canvas toDataURL -> blob
				function dataUrlToBlob( uri ) {
					var str, arr, i, matches, type;
					uri = uri.split( ',' );
					matches = /data:([^;]+)/.exec( uri[ 0 ] );
					if ( matches ) {
						type = matches[ 1 ];
					}
					str = atob( uri[ 1 ] );
					arr = new Uint8Array( str.length );
					for ( i = 0; i < arr.length ; i++ ) {
						arr[ i ] = str.charCodeAt( i );
					}
					return new Blob( [ arr ], { type: type } );
				}
				
				if(paramFileList.length > 0){
					var addFileCnt = 0;
					//파일이 전체 추가완료된경우 callback
					paramFileUploadObj.on("file-added", function(result){
						if(addFileCnt == (paramFileList.length-1)){
							//콜백
							if(typeof callback == "function" && !$.osl.isNull(callback)){
								//paramFileUploadObj.off("file-added");
								
								//ui loading time
								setTimeout(function(){
									callback(paramFileUploadObj, paramFileUploadObj.getFiles(), $("#"+paramFileUploadObj.opts.targetId+" .uppy-Dashboard-Item"));
								}, 100);
							}
						}
					});
					
					var atchFileId = null;
					
					$.each(paramFileList,function(idx, map){
						atchFileId = map.atchFileId;
						if(!$.osl.isNull(map.fileType) && map.fileType.indexOf("image") != -1){
							try{
								/* 해당 파일 url -> blob 구하기 (image만)*/
								var fileImage = new Image();
								fileImage.src = "/cmm/fms/getImage.do?fileSn="+map.fileSn+"&atchFileId="+map.atchFileId;
								
								
								//파일 이미지 로드 완료 시 이미지데이터 세팅
								fileImage.onload = function () {
									//해당 링크 이미지 canvas에 세팅
									var canvas = document.createElement("canvas"),
									ctx = canvas.getContext( "2d" );
								
									canvas.width = fileImage.width;
									canvas.height = fileImage.height;
									ctx.drawImage( fileImage, 0, 0, fileImage.width, fileImage.height );
									
									//이미지 데이터 blob 변환
									var fileData = dataUrlToBlob(canvas.toDataURL(map.type));
									
									//파일 객체에 이미지 추가
									var fileId = paramFileUploadObj.addFile({
										name: map.orignlFileNm,
										type: map.fileType,
										source: 'database',
										meta: {
											atchFileId: map.atchFileId,
											fileSn: map.fileSn
										},
										data: fileData,
									});
									
									//파일 다운로드 기능 있는 경우
									if(paramFileUploadObj.opts.fileDownload){
										//생성 파일에 이벤트 바인딩
										fileAddListener(paramFileUploadObj, fileId);
									}
									addFileCnt++;
								};
							}catch(error){
								//오류 발생하는 경우 기본
							}
						}else{
							//파일 객체에 이미지 추가 
							var fileId = paramFileUploadObj.addFile({
								name: map.orignlFileNm,
								type: map.fileType,
								source: 'database',
								meta: {
									atchFileId: map.atchFileId,
									fileSn: map.fileSn
								},
								data: {
									blob: new Blob(),
									size: parseInt(map.fileMg)
								}
							});
							//파일 다운로드 기능 있는 경우
							if(paramFileUploadObj.opts.fileDownload){
								//생성 파일에 이벤트 바인딩
								fileAddListener(paramFileUploadObj, fileId);
							}
							addFileCnt++;
						}
					});
					
					//생성 파일에 이벤트 바인딩
					function fileAddListener(paramFileUploadObj, paramFileId){
						//해당 파일에 이벤트 걸기
						$("#"+paramFileUploadObj.opts.targetId).off("click mouseenter", "#"+$.escapeSelector("uppy_"+paramFileId));
						$("#"+paramFileUploadObj.opts.targetId).on({
								"click": function(){
									//파일 정보 불러오기
									var source = paramFileUploadObj.getFile(paramFileId).source;
									var atchFileId = paramFileUploadObj.getFile(paramFileId).meta.atchFileId;
									var fileSn = paramFileUploadObj.getFile(paramFileId).meta.fileSn;
									
									//remove 상태 다운로드 불가 
									if(source == "remove"){
										$.osl.toastr($.osl.lang("file.error.downloadWait"));
									}
									else{
										$.osl.file.fileDownload(atchFileId, fileSn);
									}
								},
								/* 마우스 hover이벤트 걸기 (파일 생성 후 DOM생성이 비동기로 되어있어서 파일 객체에 직접 이벤트 바인딩 */
								"mouseenter": function(){
									$("#"+paramFileUploadObj.opts.targetId+" .osl-uppy-DashboardItem-action--download").remove();
									$(event.target).append('<div class="osl-uppy-DashboardItem-action--download"><i class="fas fa-arrow-circle-down"></i></div>');
									
									/*
									$("#"+paramFileUploadObj.opts.targetId+" .osl-uppy-DashboardItem-action--download").removeClass("osl-uppy-DashboardItem-action--download");
									$("#"+$.escapeSelector("uppy_"+paramFileId)).addClass("osl-uppy-DashboardItem-action--download");
									*/
								},
								"mouseleave": function(){
									$("#"+$.escapeSelector("uppy_"+paramFileId)+" .osl-uppy-DashboardItem-action--download").remove();
								}
							},
							"#"+$.escapeSelector("uppy_"+paramFileId)
						);
					}
					
					//2023.12.29 안지혜 추가
					//파일 목록 세팅 시 원본 목록으로도 정보 저장한다.
					paramFileUploadObj["originalFileEvt"]().setOriFileList(paramFileList);
				}
			},
			/**
			 *  function 명 	: $.osl.file.fileDownload
			 *  function 설명	: 파일 다운로드 함수
			 *  @param paramAtchFileId: 파일 ID
			 *  @param paramFileSn: 파일 Sn
			 **/
			fileDownload: function(paramAtchFileId, paramFileSn){
				if(!$.osl.isNull(paramAtchFileId) && !$.osl.isNull(paramFileSn)){
					var url = '/com/fms/FileDown.do?downAtchFileId='+paramAtchFileId+'&downFileSn='+paramFileSn;
					var fileLink = document.createElement("a");
					fileLink.href = url;
					fileLink.target = "_self";
					document.fileDownFrame.downForm.appendChild(fileLink);
					fileLink.click();
					fileLink.remove();
				}else{
					//다운로드에 필요한 정보가 부족할 경우
					$.osl.alert($.osl.lang("file.error.notEnoughFileInfo"));
				}
			}
		}
		/*
		* osl-common-card.js
		* function 명 : $.osl.cmmTagCard
		* function 설명 : 사용자, 조직, 권한, 결재, 이력 등 공통 카드 태그 폼 그리기 위한 객체
		*/
		,cmmTagCard : {
			/*
			* function 명 : $.osl.cmmTagCard.setting
			* function 설명 : 받은 데이터로 영역에 카드 그리기
			* @param config : 옵션
			* @param data : 데이터
			* ㄴ 예시
			* data = {
			* 	usrId : "oslajh", //key는 config에서 targetKey에 해당
			* 	title : "안지혜",
			* 	subLabel : "대리/-",
			* 	subDesc : "부서부서부서부서부서부서",
			* 	risk :{
			* 		chgDepth : true, //부서이동
			* 		chgDel : false, //퇴직원
			* 		chgYet : false //사직원
			* 	},
			*	cardClass : "", //카드 클래스 추가
			* }
			* @param areaElem : 넣을 영역 객체
			* return : html 반환
			*/
			setting : $.noop,
			/*
			* function 명 : $.osl.cmmTagCard.getList
			* function 설명 : 해당 영역에 있는 카드 데이터 가져오기
			* @param elem : 지정 영역 객체
			*/
			getList : $.noop,
		},
		/*
		* function 명 : $.osl.cmmHisCard
		* function 설명 : 이력 카드 폼 그리기 위한 객체
		*/
		cmmHisCard : {
			
			/*
			* function 명 : $.osl.cmmHisCard.setting
			* function 설명 : 받은 데이터로 영역에 카드 그리기
			* @param config : 옵션
			* @param data : 데이터
			* return : html 반환
			*/
			setting : $.noop,
		},
		/*
		* function 명 : $.osl.cmmSignCard.setting
		* function 설명 : 결재선 카드 그리기
		*/
		cmmSignCard : {
			
			/*
			* function 명 : $.osl.cmmSignCard.setting
			* function 설명 : 결재선 카드 그리기
			* @param config : 옵션
			* @param data : 데이터
			* return : html 반환
			*/
			setting : $.noop,
		},
		
		/*
		*	function 명 	: $.osl.getReqRisksLabel
		*	function 설명	: 보안 리스크 표출 벳지 만들기 (신청서 기준 권한부여 대상자별 리스크 건수 표출)
		*	@param info : {
		*		targetUsrCnt : 권한 부여 대상자 수,
		*		chgDeptUsrCnt : 사용자 정보 변경 건 수,
		*		retireCnt : 사직원 정보 수
		*	}
		*
		* $.osl.getUsrRiskLabel 와도 맞춰야 한다.
		*/
		getReqRisksLabel : function(info){
			var badgeClass = "";
			var spanTitle = "";
			var spanIcon = "";
						
			//권한 부여 대상자 있는 경우
			if(info.targetUsrCnt > 0) {
				if(info.chgDeptUsrCnt > 0 || info.retireCnt > 0) {
					badgeClass = "cursor-pointer";
					//기존) 권한 부여 대상자 수 core.label.spcAuthTagetUsrCnt => 대상자 수로 변경
					spanTitle = $.osl.lang("core.label.targetUsrCnt") + info.targetUsrCnt;
					spanIcon = "<i class='osl-icon osl-sm osl-icon-warning'></i>";
					
					//조직 변경된 사람 있는경우
					if(info.chgDeptUsrCnt > 0) {
						spanTitle = spanTitle + "</br> " + $.osl.lang("core.label.chgDeptUsrCnt") + info.chgDeptUsrCnt;
					}
					
					//퇴사/퇴사예정자인 경우
					if(info.retireCnt > 0) {
						spanTitle = spanTitle + "</br> " + $.osl.lang("core.label.retireUsrCnt") + info.retireCnt;
					}
				}
			}
			
			var badge = `<span class="${badgeClass} osl-evt__rist-badge" title="${spanTitle}" data-bs-toggle="tooltip" data-toggle="kt-tooltip" data-placement="top" data-bs-custom-class="tooltip-inverse" data-bs-html="true">
							${spanIcon}
						</span>`;
			
			return badge;
		},
		/*
		*	function 명 	: $.osl.getUsrRiskLabel
		*	function 설명	: 보안 리스크 표출 벳지 만들기 (사용자 기준 리스크 정보 표출)
		*	@param info : {
		*		chgDeptYn : 사용자 정보 변경 YN
		*		retireYn : 사직원 정보 YN,
		*	}
		*
		* $.osl.getReqRisksLabel 와도 맞춰야 한다.
		*/
		getUsrRiskLabel : function(info){
			
			var badge = "";
			
			//보안 리스크 하나라도 Y인 경우만 뱃지 생성
			if(!$.osl.isNull(info) && (info.chgDeptYn == "Y" || info.retireYn == "Y")) {
				var riskBadgeTooltip = "";
				var riskBadgeClass = "";
				
				//조직 변경된 사람 있는경우
				if(info.chgDeptYn == "Y") {
					if(!$.osl.isNull(riskBadgeTooltip)) {
						riskBadgeTooltip = riskBadgeTooltip + "<br>";
					}
					
					riskBadgeTooltip = riskBadgeTooltip + $.osl.lang("core.label.chgDeptYn");
					riskBadgeClass = "osl-icon-warning-gray";
				}
				
				//퇴사/퇴사예정자인 경우
				if(info.retireYn == "Y") {
					if(!$.osl.isNull(riskBadgeTooltip)) {
						riskBadgeTooltip = riskBadgeTooltip + "<br>";
					}
					riskBadgeTooltip = riskBadgeTooltip + $.osl.lang("core.label.retireYn");
					riskBadgeClass = "osl-icon-warning";
				}
				
				badge = `<span class="mx-1" title="${riskBadgeTooltip}" data-bs-toggle="tooltip" data-toggle="kt-tooltip" data-placement="top" data-bs-custom-class="tooltip-inverse" data-bs-html="true">
							<i class="osl-icon osl-sm ${riskBadgeClass}"></i>
						</span>`;
			}
			return badge;
		},
		/*
		 *  function 명 	: $.osl.tag
		 *  function 설명	: 트리 기본 객체
		 **/
		tag: {
			/**
			 *  function 명 	: $.osl.tag.list
			 *  function 설명	: 페이지에 생성된 tag 목록
			 **/
			list:{},
			/**
			 *  function 명 	: $.osl.tag.setting
			 *  function 설명	: 태그 객체 세팅
			 *  @param targetId : 태그 아이템 id
			 *  @param option : {
			 *  	tagType : 태그 타입 (cfg,,,) ,
			 *  	itemNm : 항목 명
			 *  }
			 **/
			setting: function(targetId, option){
				
				//기본 옵션
				var defaultOption = {
						//태그 타입
						tagType: "cfg",
						//태그 사용
						useCd : "01",
						itemNm : ""
				} 
				
				//사용자 입력 config extend
				defaultOption = $.extend(true, defaultOption, option);
				
				//태그 객체 별 리스트 저장
				$.osl.tag.list[targetId] = {
					targetId : targetId,
					//원본 태그 데이터
					oriTags : [],
					//추가된 태그 데이터
					addTags : [],
					//제거된 태그 데이터
					removeTags : [],
					//현재 태그 데이터
					tags : [],
					option: defaultOption,
					dom : $("#"+targetId),
					action : {
						//해당 태그 제거
						"destroy" : function() {
							delete $.osl.tag.list[targetId];
						}
					}
				}
			},
			//타겟 태그 제거
			destroy : function(targetId){
				delete $.osl.tag.list[targetId];
			}
		}
		/**
		 *  function 명 	: $.osl.tree
		 *  function 설명	: 트리 기본 객체
		 **/
		,tree: {
			/* 노드 제어 함수 실행 시 로딩바가 출력되는 기준 개수 */
			loadingNodeCnt:500,
			/**
			 *  function 명 	: $.osl.tree.list
			 *  function 설명	: 페이지에 생성된 tree 목록
			 **/
			list:{},
			/**
			 *  function 명 	: $.osl.tree.setting
			 *  function 설명	: 요소에 트리 객체 세팅
			 *  @param targetId: 요소 id (#id)
			 *  @param config: 트리 설정 값
			 **/
			setting: function(targetId, config){
				//트리 객체
				var treeObj = null;
				
				var targetObj = $("#"+targetId);
				if(targetObj.length > 0){
					/**
					 * 자식 노드 전체 펼치기/접기
					 * @param jstreeTarget: jstree 대상 (선언 객체)
					 * @param childrenList: 자식 노드 목록
					 * @param openClose: 접힘&펼침 (true - 펼침, false - 접힘)
					 */
					var nodeChildHandler = function(jstreeTarget, childrenList, openClose){
						if($.osl.isNull(childrenList) || childrenList.length == 0){
							return true;
						}
						
						//자식 객체 loop
						$.each(childrenList, function(idx, map){
							//자식 객체 노드 정도
							var childrenNodeInfo = jstreeTarget.jstree().get_node(map);
							
							//자식 노드 정보 없는 경우 skip
							if($.osl.isNull(childrenNodeInfo)){
								return true;
							}else{
								//현재 노드 자식이 있는 경우 open/close
								if(childrenNodeInfo.children.length > 0){
									//close
									var flagNodeStr = "close_node";
									//open
									if(openClose){
										flagNodeStr = "open_node";
									}
									jstreeTarget.jstree(flagNodeStr, childrenNodeInfo.id);
									
									//재귀 호출로 현재 함수 호출
									nodeChildHandler(jstreeTarget, childrenNodeInfo.children, openClose);
								}else{
									//없는 경우 skip
									return true
								}
							}
						});
					};
					
					//action 동작 함수
					var actionFunction = {
						/*
						Param selectCd : 트리 검색 여부 코드 값 (01 검색, 02 비동기 조회, 03 재조회(default)), 비동기 트리에서만 사용
						Param node : 선택된 노드 정보, 비동기 트리에서만 사용
						Param callback : 조회된 데이터 jstree에 전달, 비동기 트리에서만 사용
						*/
						select: function(selectCd, node, callback){
							var isAjax = config.core.ajax;
							
							//객체 없고 동기 조회인 경우
							if($.osl.isNull(treeObj) && !isAjax){
								$.osl.toastr($.osl.lang("tree.message.toast.handler"));
								return false;
							}
							
							/* data 셋팅 */
							var url = config.data.url;
							var key = config.data.key;
							var pKey = config.data.pKey;
							/*tree 함수 호출하는 곳에서 nodeKey : "nodeKey" 세팅하고 특정 node id를 root로 표출하고자 할 때 사용
							* - select 쿼리상에서 NODE_KEY가 0인 것을 구하여 사용
							*/
							var nodeKey = config.data.nodeKey;
							var labelKey = config.data.labelKey;
							var paramData = {}
							var searchValue = $("#treeSearch_"+targetId).val();
							if($.osl.isNull(selectCd)) {
								selectCd = "03";
							}
							
							//비동기 트리인 경우
							if(isAjax) {
								//treeObj 객체가 X 경우
								if($.osl.isNull(treeObj)){
									//세팅된 파라미터 값들
									paramData = config.data.param;
								}
								//treeObj 객체가 O 경우
								else {
									//세팅된 파라미터 값들
									paramData = treeObj.jstree().settings.data.param;
								}
								
								if($.osl.isNull(paramData)) {
									paramData = {};
								}
								
								//검색어 있는 경우 검색어 세팅
								if(selectCd == "01") {
									paramData["searchSelect"] = labelKey;
									paramData["searchTxt"] = searchValue;
								}
								//최상위(최초조회-node.parent null) 또는 전체 검색(node - null)인 경우 pKey 세팅하지 않음
								if(!$.osl.isNull(node) && !$.osl.isNull(node.parent)) {
									paramData[pKey] = node["original"][key];
								}
								
							//비동기인 경우 객체 있는경우 트리에서 파라미터 가져오기
							}else if(!isAjax) {
								paramData = treeObj.jstree().settings.data.param;
							}
							//AJAX 설정
							var ajaxObj = new $.osl.ajaxRequestAction(
									{"url": url, "async": false}
									,paramData);
							
							//AJAX 전송 성공 함수
							ajaxObj.setFnSuccess(function(data){
								if(data.errorYn == "Y"){
									$.osl.alert(data.message,{type: 'error'});
								}else{
									var treeDataList = data.list;
									
									//list data가 없는 경우 넘어온 data에서 배열 값 찾기
									if($.osl.isNull(treeDataList)){
										$.each(data,function(idx, map){
											if(typeof map == "object"){
												try{
													if(map.length > 0){
														treeDataList = map;
														return false;
													}
												}catch(e){
													return true;
												}
											}
										});
										//배열 값 찾지 못한 경우
										if($.osl.isNull(treeDataList)){
											//데이터 없음 문구 없을 경우에만 문구 출력
											if(!$(treeObj).prev().hasClass("osl-tree-empty")){
												$(treeObj).before('<div class="osl-tree-empty text-center" data-tree-id="'+targetId+'">'+$.osl.lang("tree.message.content.noData")+'</div>');
											}
											//트리 메뉴 없애기
											$(treeObj).children().empty();
										}
									}
									
									//treeData 세팅하기
									if(!$.osl.isNull(treeDataList) && treeDataList.length > 0){
										var rtnTreeData = [];
										var tmpMap = {};
										
										var subLabelKey = config.data.subLabelKey;
										var type = config.data.type;
										var icon = config.data.icon;
										var iconType = config.data.iconType;
										
										//데이터 없음 문구 있을 경우 삭제
										if($(treeObj).prev().hasClass("osl-tree-empty")){
											$(treeObj).prev('div.osl-tree-empty').remove();
										}
											
										/* jsonArray => key:{jsonData} 변환*/
										$.each(treeDataList, function(idx, map){
											
											/* 노드 제목에 스크립트 들어가 있는 경우 트리 검색 시 스크립트 동작 방지 */
											map["text"] = $.osl.escapeHtml(map[labelKey]);
											//트리 노드 ID 만들어주기
											map["id"] = targetId + "_" + map[key];
											
											/*  tree 노드명 서브라벨키를 사용하여 추가 */
											if(!$.osl.isNull(map[subLabelKey])){
												var subLabel = config.subLabel[map[subLabelKey]];
												if(!$.osl.isNull(subLabel)){
													map["text"] = map["text"] + subLabel;
												}
											}
											//트리 데이터의 type 구하기
											if(!$.osl.isNull(type) && map.hasOwnProperty(type)){
												map["type"] = map[type];
											}
											
											//icon넣기
											if(!$.osl.isNull(config.data.icon)){
												var rtnIcon = map[icon];
												
												//iconType 있는지 체크 
												if(!$.osl.isNull(config.data.iconType) && map[iconType] == "url"){
													rtnIcon = $.osl.user.usrImgUrlVal(rtnIcon);
												}
												
												map["icon"] = rtnIcon;
											}
											
											//트리 데이터에 key값과 pKey값 추가
											map["key"] = map[key];
											map["pKey"] = map[pKey];
											
											tmpMap[map[key]] = map;
										});
											
										//AJAX 사용 O
										if(isAjax) {
											/* 위에서 세팅된 목록 값으로 계층 데이터 구현하기 */
											$.each(treeDataList, function(idx, map){
												//부모 key 없는경우 jstree 기본 값으로 넣어주기 또는 연동 데이터 최상위값인경우
												if($.osl.isNull(map[pKey]) || map[pKey] == "00000000"){
													map["parent"] = "#";
												} else {
													//정해진 nodeKey가 있는 경우 nodeKey 기준으로 root 세팅
													if(!$.osl.isNull(map[nodeKey]) && map[nodeKey] == 0){
														map["parent"] = "#";
													}
													///정해진 nodeKey가 없는 경우
													else{
														map["parent"] = targetId + "_" + map[pKey];
													}
												}
												
												//자식 소유 여부
												if(!$.osl.isNull(map["hasChildYn"])) {
													if(map["hasChildYn"] == "Y") {
														map.state = {opened:false};
														map.children = true;
													}
												}
												
												//현재 데이터의 부모값이 존재하고, 해당 키 값과 부모 키값이 다른 경우
												if(tmpMap[map[pKey]] && map[key] != map[pKey]){
													//실제 하위 데이터가 있는 경우 children 데이터 제거, (boolean 값이 있는 경우 오류)
													delete tmpMap[map[pKey]]["children"];
													tmpMap[map[pKey]]["state"]["opened"] = true; 
												}
												
												rtnTreeData.push(map);
											});
											
											//데이터 수정
											rtnTreeData = config.core.modifyData(rtnTreeData);
											
											//검색아닌 경우 ajax 조회
											if(selectCd == "02") {
												//jstree에 데이터 세팅
												callback(rtnTreeData);
												
												if(!$.osl.isNull(treeObj)) {
													treeObj.jstree(true).trigger("refresh.jstree");
												}
											//검색인 경우 현재 값 표출
											} else {
												//1회용 바인딩 적용, refresh 후 검색 결과 대상 찾기
												treeObj.one('refresh.jstree',function(event, nodes){
													if(typeof callback == "function") {
														callback(rtnTreeData);
													}
												});
												
												//검색 데이터로 jstree 목록 표출
												treeObj.jstree(true).settings.core.data = rtnTreeData;
												treeObj.jstree(true).refresh();
												
												//data 다시 ajax 조회로 변경
												treeObj.jstree(true).settings.core.data = config.core.data;
												
												//on trigger
												config.callback.refresh(treeObj, rtnTreeData);
											}
											
										//AJAX 사용 X
										} else {
											
											/* 위에서 세팅된 목록 값으로 계층 데이터 구현하기 */
											$.each(treeDataList, function(idx, map){
												//현재 데이터의 부모값이 존재하고, 해당 키 값과 부모 키값이 다른 경우
												if(tmpMap[map[pKey]] && map[key] != map[pKey]){
													//children 없는 경우 배열로 생성
													if (!tmpMap[map[pKey]]["children"]){
														tmpMap[map[pKey]]["children"] = [];
													}
													
													//부모 자식 배열 값에 해당 값을 대입
													tmpMap[map[pKey]]["children"].push(map);
												}else{
													//부모 값이 존재하지 않는 경우 반환 데이터에 삽입
													rtnTreeData.push(map);
												}
											});	
											
											treeObj.jstree(true).settings.core.data = rtnTreeData;
											treeObj.jstree(true).refresh();
											
											//on trigger
											config.callback.refresh(treeObj, rtnTreeData);
										}
										
										//접근 권한에 따른 버튼 제어
										$.osl.btnAuthSetting();
									}
								}
							});
							
							//AJAX 전송
							return ajaxObj.send();
						},
						allNodeOpen: function(obj){
							if($.osl.isNull(treeObj)){
								$.osl.toastr($.osl.lang("tree.message.toast.handler"));
								return false;
							}
							//비동기 여부
							var isAjax = treeObj.jstree(true).settings.core.ajax;
							//비동기 시 전체 열기 제한 (성능 이슈)
							if(isAjax) {
								return false;
							}
						
							//노드 수에 따라 로딩바 출력
							var nodeSize = Object.keys(treeObj.jstree()._model.data).length;
							if(nodeSize > parseInt($.osl.tree.loadingNodeCnt)){
								$.osl.showLoadingBar(true,{target: targetId ,message: "data loading..."});
							}
							treeObj.jstree("open_all");

							if(nodeSize > parseInt($.osl.tree.loadingNodeCnt)){
								$.osl.showLoadingBar(false,{target: targetId});
							}
						},
						allNodeClose: function(obj){
							if($.osl.isNull(treeObj)){
								$.osl.toastr($.osl.lang("tree.message.toast.handler"));
								return false;
							}
							//비동기 여부
							var isAjax = treeObj.jstree(true).settings.core.ajax;
							//비동기 시 전체 닫기 제한 (성능 이슈)
							if(isAjax) {
								return false;
							}
							
							//노드 수에 따라 로딩바 출력
							var nodeSize = Object.keys(treeObj.jstree()._model.data).length;
							if(nodeSize > parseInt($.osl.tree.loadingNodeCnt)){
								$.osl.showLoadingBar(true,{target: targetId ,message: "data loading..."});
							}
							
							treeObj.jstree("close_all");

							if(nodeSize > parseInt($.osl.tree.loadingNodeCnt)){
								$.osl.showLoadingBar(false,{target: targetId});
							}
						},
						selNodeOpen: function(obj){
							if($.osl.isNull(treeObj)){
								$.osl.toastr($.osl.lang("tree.message.toast.handler"));
								return false;
							}
							var nodeInfo = treeObj.jstree().get_node(obj.reference);
							treeObj.jstree("open_node",nodeInfo.id);
							
							//자식의 모든 노드 수
							var childSize = nodeInfo.children_d.length;
							if(childSize > parseInt($.osl.tree.loadingNodeCnt)){
								$.osl.showLoadingBar(true,{target: "#"+treeObj[0].id,message: "data loading..."});
							}
							
							//전체 loop
							nodeChildHandler(treeObj, nodeInfo.children, true);
							
							if(childSize > parseInt($.osl.tree.loadingNodeCnt)){
								$.osl.showLoadingBar(false,{target: "#"+treeObj[0].id});
							}
						},
						selNodeClose: function(obj){
							if($.osl.isNull(treeObj)){
								$.osl.toastr($.osl.lang("tree.message.toast.handler"));
								return false;
							}
							var nodeInfo = treeObj.jstree().get_node(obj.reference);
							treeObj.jstree("close_node",nodeInfo.id);
							
							//자식의 모든 노드 수
							var childSize = nodeInfo.children_d.length;
							
							if(childSize > parseInt($.osl.tree.loadingNodeCnt)){
								$.osl.showLoadingBar(true,{target: "#"+treeObj[0].id,message: "data loading..."});
							}
							
							//전체 loop
							nodeChildHandler(treeObj, nodeInfo.children, false);
							
							if(childSize > parseInt($.osl.tree.loadingNodeCnt)){ 
								$.osl.showLoadingBar(false,{target: "#"+treeObj[0].id});
							}
						}
					};
					
					//기본 설정 값
					var defaultConfig = {
							'data':{
								url:"",
								param:"",
								key:"",
								/* 부모 key 값 */
								pKey:"",
								/* 출력 text key */
								labelKey: "",
								type:"",
								icon: null,
								/*icon type - file or url*/
								iconType: null
							},
							'plugins': ["contextmenu", "types", "search"],
							'core': {
								"themes" : {
									/* 노드 내용 영역 넘어가는 경우 줄임 */
									"ellipsis": true,
									"stripes": false
								},	
								'data': [],
								"check_callback" : true,
								'multiple':false,
								//비동기 통신 조회여부 
								//true - 처음부터 데이터 전체 조회
								//false - 최초 조회 후 노드 오픈시마다 조회
								"ajax": false,
								'data' : function(node, callback){
									//비동기 사용시
									if(config.core.ajax) {
										//data 조회
										actionFunction["select"]("02", node, callback);
									}
								},
								/**
								ajax로 받아온 데이터를 핸들링할 수 있는 함수								
								 */
								"modifyData" : function(dataList){
									return dataList;
								}
							},
							"types" : {
								"default" : { "icon" : "fa fa-folder kt-font-warning" },
								"file" : {"icon" : " flaticon2-file  kt-font-warning"}
							},
							"search":{
								//대소문자 구분
								"case_insensitive": false,
								//검색 결과 노드만 표시
								"show_only_matches": false,
								//show_only_matches: true 일때 하위 노드도 같이 표시 할건지
								"show_only_matches_children": false,
							},
							"contextmenu": {
								"display": ["allNodeOpen","allNodeClose","selNodeOpen","selNodeClose"],
								"items": {
									"allNodeOpen" : {
										"separator_before": true,
										"separator_after": false,
										"label": $.osl.lang("tree.contextmenu.allNodeOpen"),
										"title": $.osl.lang("tree.tooltip.allNodeOpen"),
										"action": function (obj){
											actionFunction["allNodeOpen"](obj);
										}
									},
									"allNodeClose" : {
										"separator_before": false,
										"separator_after": true,
										"label": $.osl.lang("tree.contextmenu.allNodeClose"),
										"title": $.osl.lang("tree.tooltip.allNodeClose"),
										"action": function (obj){
											actionFunction["allNodeClose"](obj);
										}
									},
									"selNodeOpen" : {
										"separator_before": true,
										"separator_after": false,
										"label": $.osl.lang("tree.contextmenu.selNodeOpen"),
										"title": $.osl.lang("tree.tooltip.selNodeOpen"),
										"action": function (obj){
											actionFunction["selNodeOpen"](obj);
										}
									},
									"selNodeClose" : {
										"separator_before": false,
										"separator_after": true,
										"label": $.osl.lang("tree.contextmenu.selNodeClose"),
										"title": $.osl.lang("tree.tooltip.selNodeClose"),
										"action": function (obj){
											actionFunction["selNodeClose"](obj);
										}
									}
								}
							},
							"actionFn":{
								
							},
							"callback":{
								/* tree 로딩 후 호출 */
								"init": $.noop,
								/* tree node 선택(클릭) 시 호출 */
								"onclick": $.noop,
								/* tree node 선택(더블 클릭) 시 호출 */
								"onDblClick": $.noop,
								/* tree select로 refresh 됬을때 호출 */
								"refresh": $.noop,
								/* tree node open시 호출 */
								"openNode": $.noop,
								/* tree 새로고침 시 호출 */
								"reload": $.noop,
								/* node 로드 후 호출 */
								"drawAfter": $.noop,
							},
						};
					
					config = $.extend(true, defaultConfig, config);
					
					//비동기 시 서버검색으로 변경
					if(config.core.ajax) {
						config.search.ajax = function(str, callback) {
							//data 조회
							actionFunction["select"]("01", null, callback);
						}
					}
					
					//contextmenu에 actionFn 처리하기
					if(config.hasOwnProperty("contextmenu") && config.contextmenu.hasOwnProperty("items")){
						$.each(config.contextmenu.items, function(key, map){
							//사용자 정의 함수 대상 설정이 있는 경우 action 대체
							if(map.hasOwnProperty("actionFn") && typeof map.actionFn == "string"){
								//사용자 정의 함수 있는지 체크
								if(config.hasOwnProperty("actionFn") && config.actionFn.hasOwnProperty(map.actionFn)){
									map.action = function(obj){
										//선택 노드
										var selectNodeIds = treeObj.jstree("get_selected");
										
										// 선택노드
										var selectNode = treeObj.jstree().get_node(selectNodeIds[0]);
										var nodeData = selectNode.original;
										
										config.actionFn[map.actionFn](treeObj, nodeData, obj.reference.eq(0));
									};
								}
								//없는 경우 tree actionFunction 변수에서 검색
								else if(actionFunction.hasOwnProperty(map.actionFn)){
									map.action = function(obj){
										actionFunction[map.actionFn](treeObj);
									}
								}
							}
						});
					}
					
					//page내에 action 버튼 세팅
					var actionBtnList = $(".osl-tree-action[data-tree-id="+targetId.replace("#","")+"]");
					if(actionBtnList.length > 0){
						$.each(actionBtnList, function(idx, map){
							//해당 버튼 action 동작 가져오기
							var action = $(map).data("tree-action");
							
							//config에 해당 action동작 있는지 체크 - 없는 경우 사용자 정의 함수 체크
							//사용자 정의 함수에 해당 action 동작 있는지 체크
							if(config.hasOwnProperty("actionFn") && config.actionFn.hasOwnProperty(action) && typeof config.actionFn[action] == "function"){
								//해당 버튼에 이벤트 주입
								$(map).click(function(){
									var nodeData = null;
									
									if(treeObj != null){
										//선택 노드
										var selectNodeIds = treeObj.jstree("get_selected");
										
										// 선택노드
										var selectNode = treeObj.jstree().get_node(selectNodeIds[0]);
										nodeData = selectNode.original;
									}
									
									config.actionFn[action](treeObj, nodeData, map);
								});
							}else{
								//config에 기본 동작 함수 없는 경우 버튼 제거
								if(!actionFunction.hasOwnProperty(action)){
									$(map).remove();
								}else{
									//해당 버튼에 이벤트 주입
									$(map).click(function(){
										actionFunction[action]();
									});
								}
							}
						});
					}
					
					/* context 셋팅*/
					treeObj = targetObj.jstree(config);
					
					//jsTree event
					treeObj.bind('select_node.jstree', function(event, data){
						//여러개 선택되면 가장 나중에 선택된 데이터 전송
						var selNode = data.instance.get_node(data.selected[data.selected.length - 1]);
						var id = selNode.id;
						treeObj.jstree().selNode = {id: id, data:data};
						//사용자 입력 callback function 호출
						config.callback.onclick(treeObj, selNode);
					}).bind('deselect_node.jstree', function(event, data){
						treeObj.jstree().selNode = null;
					}).bind('dblclick.jstree', function(event){
						var selNodeId = event.target.id;
						//subLabel클릭 시 selNodeId를 찾지 못하여 변경
						if($.osl.isNull(selNodeId)){
							if(event.target.classList.contains("osl-evt__sub-label")){
								selNodeId = event.target.parentElement.id;
							}
						}
						var selNode = treeObj.jstree().get_node(selNodeId);
						
						//사용자 입력 callback function 호출
						config.callback.onDblClick(treeObj, selNode);
					}).bind('search.jstree', function(nodes, str, res){
					
						//검색 결과 없는 경우
						if(str.nodes.length == 0){
							//노드 감추기
							treeObj.jstree(true).hide_all();
							
							//검색 결과 없음 문구 출력
							$(".osl-tree-empty[data-tree-id="+targetId+"]").remove();
							$(str.instance.element).before('<div class="osl-tree-empty text-center" data-tree-id="'+targetId+'">"'+str.str+'" '+$.osl.lang("tree.message.content.noData")+'</div>');
						}else{
							//검색 결과가 있다면 첫번째 노드 선택(default)
							$($("#"+nodes.currentTarget.id).find(".jstree-search")[0]).click();
						}
						
					}).bind('loaded.jstree', function(event, data) {
						var list = treeObj.jstree(true).getListData("#");
						//사용자 입력 callback function 호출
						config.callback.init(treeObj, data, list);
					}).bind('open_node.jstree',function(event, data){
						var list = treeObj.jstree(true).getListData(data.node.id);
						//노드 오픈시 호출
						config.callback.openNode(event, data, list);
					}).bind('refresh.jstree',function(event, nodes){
						//새로고침 시 호출
						config.callback.reload(treeObj, event, nodes.instance._model);
					}).bind('delete_node.jstree',function(node, parent){
						//노드 삭제시 호출
						//전체 노드 삭제 시 데이터 없음 문구 출력
						var rootNode = treeObj.jstree().get_node("#").children_d;
						if($.osl.isNull(rootNode)){
							$(treeObj).before('<div class="osl-tree-empty text-center" data-tree-id="'+targetId+'">'+$.osl.lang("tree.message.content.noData")+'</div>');
						}else{
							$(treeObj).prev('div.osl-tree-empty').remove();
						}
					}).bind("load_node.jstree", function(node, status){
						var list = treeObj.jstree(true).getListData(status.node.id);
						//노드 생성 후 호출
						config.callback.drawAfter(node, status, list);
					});
					
					
					var searchTarget = $('.osl-tree-search[data-tree-id="'+targetId+'"]');
					
					//검색 Element 있는지 체크
					if(searchTarget.length > 0){
						/* 검색  input 세팅 */
						//내용 비우기
						searchTarget.empty();
						
						var inputGrpBtnClass = "";
						var inputGrpElemClass = "";
						
						/*
						//검색바 반응형을 위한 클래스 적용 로직
						var searchBarWidth = $(searchTarget).width();
						
						//영역이 350 이하일 때 적용할 클래스
						var inputGrpBtnClass = "rounded w-100 mt-2";
						var inputGrpElemClass = "rounded-end";
						
						if(searchBarWidth > 350){
							//xl, lg, md 이면
							inputGrpBtnClass = "";
							inputGrpElemClass = "";
						}
						//검색바 반응형을 위한 클래스 적용 로직 끝
						*/
						//내용 채우기
						/*
						var searchTargetHtml = 
							'<div class="input-group">'
								+'<div class="kt-input-icon kt-input-icon--left osl-border-radius-none--right">'
									+'<input type="text" class="form-control" placeholder="'+$.osl.lang("tree.placeholder.search")+'" id="treeSearch_'+targetId+'" name="treeSearch" data-tree-id="'+targetId+'">'
									+'<span class="kt-input-icon__icon kt-input-icon__icon--left">'
										+'<span><i class="la la-search"></i></span>'
									+'</span>'
								+'</div>'
								+'<div class="input-group-append">'
									+'<button type="button" class="btn btn-square '+btnStyleStr+' osl-tree-search__button" data-tree-id="'+targetId+'">'
										+'<i class="fa fa-search osl-me-4"></i><span class=""><span>'+$.osl.lang("tree.button.search")+'</span></span>'
									'</button>'
								+'</div>'
							+'</div>';
						*/
						/*
						* 2025-01-22 최호현
						* 퍼블리싱된 검색 화면으로 전체 수정
						*/
						var searchTargetHtml = '<div class="input-group osl-search-type-002">'
													+ '<button type="button" class="btn btn-search osl-tree-search__button " data-tree-id="'+targetId+'">'
														+ '<i class="osl-icon osl-icon-search-2"></i>'
														+ '<span data-lang-cd="button.search" class="osl-blind"> '+$.osl.lang("tree.button.search")+'</span>'
													+ '</button>'
													+ '<input type="text" class="form-control '+inputGrpElemClass+'" placeholder="'+$.osl.lang("tree.placeholder.search")+'" id="treeSearch_'+targetId+'" name="treeSearch" data-tree-id="'+targetId+'">'
												+ '</div>';
						
						
						searchTarget.html(searchTargetHtml);
						
						//검색바 반응형 사이즈 적용 함수
						var fnTreeSearchResize = function(targetId){
							var searchBarElem = $(".osl-tree-search[data-tree-id="+targetId+"]");
							
							//검색 바 영역 너비
							var searchBarWidth = $(searchBarElem).parents("div.row").width();
							var searchBarParent = $(searchBarElem).parents("div.row");
							if($.osl.isNull(searchBarWidth)){
								searchBarWidth = $(searchBarElem).parent().width();
								searchBarParent =  $(searchBarElem).parent();
							}
							
							if($.osl.isNull(searchBarElem)){
								return false;
							}else{
								if(searchBarWidth <= 350){
									//sm 이면
									$(searchBarElem).find(".input-group .btn").addClass("rounded w-100 mt-2");
									$(searchBarElem).find(".input-group input").addClass("rounded-end");
									//상위 row에 대하여 m-0 w-100 지정
									$(searchBarParent).addClass("m-0 w-100");
								} else{
									//xl, lg, md 이면
									$(searchBarElem).find(".input-group .btn").removeClass("rounded w-100 mt-2");
									$(searchBarElem).find(".input-group input").removeClass("rounded-end");
									//상위 row에 대하여 m-0 w-100 제거
									$(searchBarParent).removeClass("m-0 w-100");
								}
							}
						};
						/*
						//우선 적용
						fnTreeSearchResize(targetId);
						
						//검색바 반응형(만들어진 것에 대하여 반응형 적용)
						//init이 아닌 setting으로 여러개 생성될 수 있어 만들어진 것에 대해서만 반응형 적용
						window.addEventListener('resize', function(){
							$.each(document.querySelectorAll(".osl-tree-search"), function(idx, searchBarElem){
								var targetId = searchBarElem.getAttribute("data-tree-id");
								fnTreeSearchResize(targetId);
							});
						});
						*/
						
						//tree 검색 이벤트
						var fnTreeSearch = function(searchValue){
							var isAjax = config.core.ajax;
							
							treeObj.jstree(true).show_all();
							
							//empty div 있는 경우 제거 
							if($(".osl-tree-empty[data-tree-id="+targetId+"]").length > 0){
								$(".osl-tree-empty[data-tree-id="+targetId+"]").remove();
							}

							//XSS 차단
							searchValue = $.osl.escapeHtml(searchValue);
							
							if($.osl.isNull(searchValue) && isAjax) {
								actionFunction["select"]("01");
							} else {
								treeObj.jstree("search", searchValue);
							}
						};
						
						//입력 창 엔터키 이벤트
						$(".osl-tree-search[data-tree-id="+targetId+"] input#treeSearch_"+targetId+"[data-tree-id="+targetId+"]").off('keypress');
						$(".osl-tree-search__button[data-tree-id="+targetId+"]").off('click');
						$(".osl-tree-search[data-tree-id="+targetId+"] input#treeSearch_"+targetId+"[data-tree-id="+targetId+"]").on('keypress', function(e) {
							if (e.which === 13){
								
								var thisObj = $(this).siblings("span.kt-input-icon__icon").children("span");
								//검색 icon 제거
								thisObj.children("i").removeClass("la la-search");
								
								//조회 load 효과
								thisObj.addClass("kt-spinner kt-spinner--v2 kt-spinner--sm kt-spinner--brand");
								
								//조회 동작
								fnTreeSearch($(this).val());
								
								setTimeout(function(){
									thisObj.removeClass("kt-spinner kt-spinner--v2 kt-spinner--sm kt-spinner--brand");
									
									//검색 icon 추가
									thisObj.children("i").addClass("la la-search");
								},300);
								return false;
							}
						});
						
						$(".osl-tree-search__button[data-tree-id="+targetId+"]").click(function(){

							var thisObj = $(this).children("span");
							
							//조회 load 효과
							thisObj.children("span").hide();
							thisObj.addClass("spinner-border spinner-border-sm");

							fnTreeSearch($("#treeSearch_"+targetId).val());
							
							setTimeout(function(){
								thisObj.removeClass("spinner-border spinner-border-sm");
								thisObj.children("span").show();
							},300);
						});
					}
					
					/*
					* function 명 : getListData
					* function 설명 : 노드 데이터 전달 시 하위 데이터까지 리스트 데이터로 반환
					*	param nodeId : 대상 노드 ID
					*	param childOnly : 자식 노드들만 가져오는지 여부 (boolean)
					*/
					treeObj.jstree(true).getListData = function(nodeId, childOnly) {
						if($.osl.isNull(nodeId)) {
							nodeId = "#";
						}
						if($.osl.isNull(childOnly)) {
							childOnly = true;
						}
						
						var rtnList = [];

						//노드 데이터 가져오기						
						var nodeData = treeObj.jstree(true).get_node(nodeId);
						if(!nodeData) {
							return rtnList;
						}
						
						//자식 데이터 가져오기
						var childNodes = nodeData.children; 
						
						//자식만 조회 아니고, 최상위 제외
						if(!childOnly && nodeData.id != "#") {
							rtnList.push(nodeData.original);
						}

						//자식 데이터 가져오기위한 재귀함수
						var fnGetChildData = function(childNodes) {
							
							//자식데이터 전체 저장
							childNodes.map(function(childId) {
								var node = treeObj.jstree(true).get_node(childId);
								//노드데이터 있는경우
								if(!$.osl.isNull(node)) {
									//데이터 저장
									rtnList.push(node.original);
									//자식 데이터 있는경우 재귀
									if(!$.osl.isNull(node.children)) {
										fnGetChildData(node.children)
									}
								}
							});
						}
						
						//재귀 함수 실행
						fnGetChildData(childNodes);
						
						return rtnList;
					}
					
					//비동기 아닌경우 data 조회
					if(!config.core.ajax) {
						actionFunction["select"]("02");
					}
					
					//생성된 데이터 저장
					$.osl.tree.list[targetId] = treeObj;
				}
				return treeObj;
			},
		}
		,langData: {}
		/**
		 *  function 명 	: $.osl.lang
		 *  function 설명	: 언어 코드
		 *  @param langId: 언어 값 가져오려는 계층 코드 (예: file.error.downloadWait)
		 **/
		,lang: function(langId){
			//언어 데이터 (osl-lang.js)
			var langData = this.langData;
			
			//var rtnLangStr = "제공되지 않는 언어입니다.<br/>(Language not available.)";
			var rtnLangStr = null;
			
			//파라미터 값 없는 경우
			if($.osl.isNull(langId)){
				return "";
			}
			
			//langId 분리
			var langTreeData = langId.split("\.");
			
			try{
				//이전 계층 구조
				var prevTreeData = langData[$.osl.langCd];
				$.each(langTreeData, function(idx, map){
					//해당 아이디가 존재하는지 체크
					if(!prevTreeData.hasOwnProperty(map)){
						return false;
					}
					
					//끝 부분인 경우 해당 데이터 출력
					if(langTreeData.length == (idx+1)){
						rtnLangStr = prevTreeData[map];
						return false;
					}else{
						prevTreeData = prevTreeData[map];
					}
				});
			}catch(e){
			}
			
			//해당 데이터 값이 빈 값인경우 빈값 출력
			if($.osl.isNull(rtnLangStr)){
				return "";
			}
			
			//추가 변수 있는 경우 세팅하기 {1}부터 시작
			if(arguments.length > 1 && typeof rtnLangStr !== 'object'){
				var mainArgu = arguments;
				rtnLangStr = rtnLangStr.replace(/\${(\d+)}/g, function(match, idx){
					return typeof mainArgu[idx] != 'undefined' ? mainArgu[idx] : match;
				});
			}
			return rtnLangStr;
		}
		/**
		 *  function 명 	: $.osl.langConvert
		 *  function 설명	: 대상 영역에 span 태그 문자열을 언어 코드에 맞게 변경한다.
		 *  @param targetElem: 대상 영역 (대상 영역 하위의 span만 적용)  
		 **/
		,langConvert: function(targetElem){
			//TEST - 2020-09-02 한국어인경우 변환 안함
			if($.osl.langCd == "ko"){
				return true;
			}
			
			var spanList = $(targetElem).find("span[data-lang-cd]");
			if(!$.osl.isNull(spanList) && spanList.length > 0){
				$.each(spanList, function(idx, map){
					//태그에서 lang param 변수 추가 코드 data-lang-param="[1,2,3,....]"
					var langParam = null;
					if(!$.osl.isNull($(map).attr("data-lang-param"))){
						//langParam = [ value, value, value, ... ]
						//text로 인식되는 [] 제거
						langParam = $(map).data("lang-param").slice(1,-1);
					}
					
					//언어 코드
					var langCd = $(map).data("lang-cd");
					var langStr = null;
					try{
						if(langParam != null){
							//langCd는 data option으로 string type 값인 것이므로 앞에 따옴표 필요
							langStr = eval(`$.osl.lang("${langCd}",${langParam})`);
						}else{
							langStr = $.osl.lang(langCd);
						}
					}catch (e) {
						//console.log(e)
					}
					
					if($.osl.isNull(langStr)){
						return true;
					}
					$(map).html(langStr);
				});
			}
			
			//그 외 title 언어 적용
			var tagTitleList = $("[data-title-lang-cd]");
			if(!$.osl.isNull(tagTitleList) && tagTitleList.length > 0){
				$.each(tagTitleList, function(idx, map){
					//언어 코드
					var langCd = $(map).data("title-lang-cd");
					var langStr = $.osl.lang(langCd);
					if($.osl.isNull(langStr)){
						return true;
					}
					$(map).attr("title",langStr);
					$(map).attr("data-original-title",langStr);
				});
			}
			
			//top.jsp 메인 프로젝트 placeholder 지정해야 함.
			//언어 코드 바뀔 때 재 설정 필요
			$("#mainPrjNm").attr("placeholder", $.osl.lang("top.placeholder.mainPrjNm"));
		}
		/**
		 *  function 명 	: $.osl.btnAuthVal
		 *  function 설명	: 공통 버튼 권한 전역 변수
		 **/
		,btnAuthVal: {
			btnAuthSelectYn:	"Y"
			,btnAuthInsertYn: "Y"
			,btnAuthUpdateYn:"Y"
			,btnAuthDeleteYn:"Y"
			,btnAuthExcelYn:	"Y"
			,btnAuthPrintYn: "Y"
		}
		/**
		 *  function 명 	: $.authBtnSetting
		 *  function 설명	: 공통 버튼 권한에 따라 버튼 세팅
		 **/
		,btnAuthSetting :function() {
			var map = $.osl.btnAuthVal;
			//버튼 권한에 따라 버튼 표출(모달 창 내 버튼 제외)
			//$(".kt-grid.app-root").find("[data-auth-button=select]").remove();
			//권한이 없으면 버튼 제거
			
			//TODO
			//21.05.20 : 현재 메뉴 기준으로 권한이 없으면 모달창 포함 모든 버튼 제거
			// select, insert, update, delete, excel, print 로만 선언
			//
			if(map.btnAuthSelectYn != "Y"){//조회
				$("[data-auth-button=select]").remove();
			}
			if(map.btnAuthInsertYn != "Y"){//등록
				$("[data-auth-button=insert]").remove();
			}
			if(map.btnAuthUpdateYn != "Y"){//수정
				$("[data-auth-button=update]").remove();
			}
			if(map.btnAuthDeleteYn != "Y"){//삭제
				$("[data-auth-button=delete]").remove();
			}
			if(map.btnAuthExcelYn != "Y"){//엑셀
				$("[data-auth-button=excel]").remove();
			}
			if(map.btnAuthPrintYn != "Y"){//프린트
				$("[data-auth-button=print]").remove();
			}
		}
		/**
		 *  function 명 	: $.osl.prjMenuList
		 *  function 설명	: 메뉴 계층 데이터
		 **/
		,prjMenuList:{}
		/**
		 *  function 명 	: $.osl.prjGrpAuthList
		 *  function 설명	: 프로젝트 그룹, 프로젝트, 권한그룹 데이터
		 **/
		,prjGrpAuthList:{}
		/**
		 *  function 명 	: $.osl.prjGrpAuthSelSetting
		 *  function 설명	: 프로젝트 그룹, 프로젝트, 권한그룹 데이터를 select에 세팅
		 *  @param depth: 출력 깊이
		 *  		1: 프로젝트 그룹
		 *  		2: 프로젝트 그룹(optGroup) > 프로젝트
		 *  @param paramSelFlag (Boolean): 현재 선택된 프로젝트 그룹, 프로젝트 초기 선택지정 유무  (기본 - false)
		 **/
		,prjGrpAuthSelSetting: function(depth, paramSelFlag){
			var rtnValue = '';
			
			var selFlag = false;
			if(!$.osl.isNull(paramSelFlag)){
				selFlag = paramSelFlag;
			}
			
			if(!$.osl.isNull($.osl.prjGrpAuthList)){
				$.each($.osl.prjGrpAuthList, function(idx1, map1){
					//프로젝트 그룹만 option으로 출력
					if(depth == 1){
						var selected = '';
						//selected
						if(selFlag){
							if($.osl.selPrjGrpId == map1.prjGrpInfo.prjId){
								selected = "selected";
							}
						}
						rtnValue += '<option value="'+map1.prjGrpInfo.prjId+'" '+selected+'>'+$.osl.escapeHtml(map1.prjGrpNm)+'</option>';
						return true;
					}
					
					//프로젝트 목록 없는 경우 skip
					if(Object.keys(map1.prjList).length == 0){
						return true;
					}
					
					//프로젝트 그룹 optgroup으로 출력
					if(depth == 2){
						rtnValue += '<optgroup label="'+$.osl.escapeHtml(map1.prjGrpNm)+'" data-prj-grp-id="'+map1.prjGrpInfo.prjId+'">';
					}
					
					//프로젝트 loop
					$.each(map1.prjList, function(idx2, map2){
						//프로젝트 option
						if(depth == 2){
							var selected = '';
							//selected
							if(selFlag){
								if($.osl.selPrjId == map2.prjId){
									selected = "selected";
								}
							}
							rtnValue += '<option value="'+map2.prjId+'" data-prj-grp-id="'+map1.prjGrpInfo.prjId+'" data-prj-type-cd="'+map2.prjTypeCd+'" '+selected+'>'+$.osl.escapeHtml(map2.prjNm)+'</option>';
							return true;
						}
						
					});
					
					//프로젝트 그룹 optGroup닫기
					if(depth == 2){
						rtnValue += '</optgroup>';
					}
				});
				
				return rtnValue;
			}
		}
		/**
		 *  function 명 	: $.osl.initHeaderClear
		 *  function 설명	: 헤더 데이터 세팅에 필요한 영역 초기화
		 **/
		,initHeaderClear: function(){
			//메뉴 목록
			//$("#globalsTopMenuUl > li.osl-menu-1depth").remove();
			$("#kt_app_sidebar_menu > div.menu-accordion").remove();
			
			//프로젝트 목록
			//$("#osl_aside_prjAuth_List").empty();
			
			//즐겨찾기 영역
			//$("ul[id^=fvrListType]").empty();
			
			//사용자 정보(직급/직책)
			$("#usrPositionAndDuty").text("");
			$("#usrPositionAndDuty").addClass("d-none");
			
			//프로젝트 그룹, 프로젝트, 권한그룹 선택
			//$("#submenu-prjGrp-sel_opt, #submenu-prj-sel_opt, #submenu-authGrp-sel_opt").empty();
			$("#usrSelAuthGrpIdList").empty();
			
			//사용자 설정 공통코드 option 초기화
			$("select[id^=usrOpt_]").empty();
		}
		/**
		 *  function 명 	: $.osl.initHeader
		 *  function 설명	: 즐겨찾기, 메뉴, 프로젝트 및 권한그룹 등 top 데이터 세팅
		 *  @param callBackFn : Header init 완료 후 실행 함수
		 **/
		,initHeader: function(callBackFn){
			/* 즐겨찾기 데이터 조회 */
			//AJAX 설정
			var ajaxObj = new $.osl.ajaxRequestAction(
					{"url":"/cmm/cmm9000/cmm9000/selectCmm9000InitHeaderData.do", "loadingShow": false});
			
			//AJAX 전송 성공 함수
			ajaxObj.setFnSuccess(function(data){
				
				if( data.errorYn == "N" ){
					//메뉴권한 관리자 권한 추가
					$.osl.menuAdm =data.menuAdmYn;
					//라이선스
					if(!$.osl.isNull(data.userAddPage)){
						$.osl.alert(data.userAddPage, {type: "warning"});
					}
					//버튼 권한 값
					if(!$.osl.isNull(data.btnAuthMap)){
						$.osl.btnAuthVal = $.extend($.osl.btnAuthVal, data.btnAuthMap);
						
						//접근 권한
						var authAccessYn = data.btnAuthMap.authAccessYn;
						
						//TODO
						//접근 권한 없는 경우
						//메인 페이지로 이동
						//메인 페이지에 대한 접근 권한이 없을 경우
						//접근 권한이 있는 첫번째 메뉴로 이동
						console.log("TODO \n1.접근 권한 없는 경우 \n2.메인 페이지로 이동 \n3.메인 페이지에 대한 접근 권한이 없을 경우 \n4.접근 권한이 있는 첫번째 메뉴로 이동 \n5.Session selPrjGrpId, selPrjId 갱신");
						//console.log(data);
					}

					//사용자 정보
					if(!$.osl.isNull(data.usrInfo)){
						$.osl.user.userInfo = data.usrInfo;
						$.osl.user.usrAuthSet = data.usrAuthSet;
						
						//직급/직책 표출
						var usrPositionNm = $.osl.escapeHtml(data.usrInfo.usrPositionNm);
						var usrDutyNm = $.osl.escapeHtml(data.usrInfo.usrDutyNm);
						var returnText = "";
						
						// 직급 && 직책 둘 다 있을 경우,
						if(!$.osl.isNull(usrPositionNm) && usrPositionNm != "-" 
							&& !$.osl.isNull(usrDutyNm) && usrDutyNm != "-"){
							returnText = usrPositionNm + "/" + usrDutyNm;
						}
						// 직급 && 직책 둘 다 없을 경우,
						else if(($.osl.isNull(usrPositionNm) || usrPositionNm == "-")
							&& ($.osl.isNull(usrDutyNm) || usrDutyNm == "-")){
							returnText = "-/-";
						}
						// 직급X, 직책O
						else if($.osl.isNull(usrPositionNm) || usrPositionNm == "-"){
							returnText = "-/" + usrDutyNm;
						}
						// 직급O, 직책X
						else if($.osl.isNull(usrDutyNm) || usrDutyNm == "-"){
							returnText = usrPositionNm + "/-";
						}
						
						if($.osl.isNull(returnText)){
							$("#oslUsrPositionAndDuty").addClass("d-none");
						}else{
							$("#oslUsrPositionAndDuty").text(returnText);
							$("#oslUsrPositionAndDuty").removeClass("d-none");
						}
					}
					
					//프로젝트 설정 정보
					if(!$.osl.isNull(data.prjSetList)){
						$.osl.prjSetList = data.prjSetList;
					}
					
					//메인 메뉴 목록
					if(!$.osl.isNull(data.mainMenuList)){
						var mainMenuId;
						
						//사용자 정보에서 설정된 메인메뉴 가져오기
						if(!$.osl.isNull(data.usrInfo)){
							mainMenuId = data.usrInfo.menuId;
						}
						
						//선택 항목 추가
						//var mainMenuSelectStr = '<option value="" >'+$.osl.lang("common.name.select")+'</option>';
						var mainMenuSelectStr = '';
						
						$.each(data.mainMenuList, function(idx, map){
							
							//사용자 선택 메인메뉴 있는경우 선택
							var selected = "";
							if(map.menuId == mainMenuId){
								selected = "selected";
							}							
							
							mainMenuSelectStr += `<option value="${map.menuId}" ${selected}>${map.menuNm}</option>`; 
							
						});
						
						$("#usrOptMainMenuSelect").html(mainMenuSelectStr);
					}
					
					//사용자 설정 값 데이터 세팅
					if(!$.osl.isNull(data.usrOptList)){
						var usrOptData = {};
						
						$.each(data.usrOptList, function(idx, map){
							var optSelect = $("#usrOpt_"+map.usrOptMstCd);
							
							if(optSelect.length > 0){
								//select box
								optSelect.data("osl-value",map.usrOptCd);
							}
							
							usrOptData[map.usrOptMstCd] = {"value": map.usrOptCd, "name": map.mstCdNm, "desc": map.mstCdDesc, "valueNm": map.subCdNm};
						});
						
						//사용자 설정 데이터
						$.osl.user.usrOptData = usrOptData;
					}
						
					//html에 사용자 설정 값 있는 경우
					if($("select[id^=usrOpt_]").length > 0){
						//개인 설정 공통코드
						var commonCodeArr = [];
						
						//개인 설정 공통코드 자동 parse
						$.each($("select[id^=usrOpt_]"),function(idx, map){
							var targetId = $(map).attr("id");
							var targetMstCd = $(map).data("mst-cd");
							
							//변수에 세팅
							commonCodeArr.push({mstCd: targetMstCd ,useYn: "Y",targetObj: "#"+targetId, comboType:"OS"});
						});

						//공통코드 채우기
						$.osl.getMulticommonCodeDataForm(commonCodeArr , true);
					}
					
					/* 옵션 값 있는 경우 화면 모드 전환 */
					var opt6 = $.osl.user.usrOptData["OPT00006"];
					if(!$.osl.isNull(opt6)) {
						//옵션 테마
						var themeMode = opt6.valueNm;
						
						//대상 확인
						if ( document.documentElement && !$.osl.isNull(themeMode)) { 
							//현재 모드 값 (dark, light)
							var nowMode = KTThemeMode.getMode();
							
							themeMode = themeMode.toLowerCase();
							nowMode = nowMode.toLowerCase();
							
							//현재 모드와 옵션 모드가 다른 경우 값 변경
							if(nowMode != themeMode) {
								KTThemeMode.setMode(themeMode);
							}
						}
					}
					//모드 기본 값이 없으면
					else {
						KTThemeMode.setMode("light");
					}
					
					//언어 목록 채우기
					if(!$.osl.isNull(data.langList)){
						var opt4 = $.osl.user.usrOptData["OPT00004"];
							
						//사용자 언어 active
						var usrLangCd = null;
						if(!$.osl.isNull(opt4)){
							usrLangCd = opt4.value;
						}
						
						var langListStr = '';
						$.each(data.langList, function(idx, map){
							var activeStr = '';
							if($.osl.isNull(usrLangCd) && idx == 0 || !$.osl.isNull(usrLangCd) && map.subCd == usrLangCd){
								activeStr = 'active';
								$("#usrCurrentLangCd #selLangNm").html(map.subCdRef1);
								$("#usrCurrentLangCd img").attr("src","/media/flags/"+map.subCdRef2);
								$.osl.langCd = map.subCdNm; 
							}
							
							langListStr +=
								  '<div class="menu-item px-3">'
									+ '<a href="javascript:void(0);" class="menu-link d-flex px-5 '+activeStr+'" value="'+map.subCd+'" id="usrLangCd_'+map.subCdNm+'" data-mst-cd="OPT00004" data-sub-cd="'+map.subCdNm+'" data-sub-cd-ref1="'+$.osl.escapeHtml(map.subCdRef1)+'" data-sub-cd-ref2="'+map.subCdRef2+'" data-title-lang-cd="top.tooltip.korean" onclick="$.osl.user.usrOptLangChg(this);">'
										+ '<span class="symbol symbol-20px me-4">'
										+ '		<img class="rounded-1" src="/media/flags/'+map.subCdRef2+'" alt="" />'
										+ '</span>'
										+ $.osl.escapeHtml(map.subCdRef1)
									+'</a>'
								+ '</div>';
						});
						$("#usrLangCdList").html(langListStr);
						
					}
					
					//메뉴 데이터 세팅
					if(!$.osl.isNull(data.menuList)){
						//현재 메뉴 Id
						var selMenuId = $("#selMenuId").val();
						
						//코어에 Id등록
						$.osl.selMenuId = selMenuId;
						
						var menuLvl1 = [];
						var menuLvl2 = [];
						var menuLvl3 = [];
						
						// 메뉴 lvl에 따라 분류
						$.each(data.menuList, function(idx, map){
							//접근 권한 없는경우 skip
							if(map.accessYn != "Y"){
								return true;
							}
							
							//현재 메뉴 정보 코어 등록
							if(map.menuId == selMenuId){
								$.osl.selMenuInfo = map;
							}
							
							//depth 분리
							if(map.lvl == 1){
								menuLvl1.push(map);
							}else if(map.lvl == 2){
								menuLvl2.push(map);
							}else if(map.lvl == 3){
								menuLvl3.push(map);
							}else{
								return true;
							}
						});
						
						// 권한있는 메뉴 정보 저장
						$.osl.prjMenuList = menuLvl3;
						
						//현재 메뉴 타입
						//01: 전체 펼치기 / 02: 단계별 펼치기
						var topMenuType = "01";
						if($.osl.user.usrOptData.hasOwnProperty("OPT00001") && !$.osl.isNull($.osl.user.usrOptData["OPT00001"].value)){
							topMenuType = $.osl.user.usrOptData["OPT00001"].value;
						}
						
						// 메뉴 div 비우기(초기화)
						$("#kt_app_sidebar_menu").empty();
						
						var nowPage = '';
						
						// 최상의 메뉴 먼저 세팅
						$.each(menuLvl1, function(idx, map){
							//기본 메뉴 아이콘(square)
							var menuIcon = '<i class="lnb_icon lnb_icon--bbs"></i>';
							//설정한 메뉴 아이콘 있을 경우 해당 아이콘으로 세팅
							if(!$.osl.isNull(map.menuIcon)){
								menuIcon = '<i class="lnb_icon '+map.menuIcon+'"></i>';
							}
							
							var menuInfoStr = 
											  '<!--begin:Menu item(1Dept 표출)-->'
											+ '<div class="menu-accordion osl-evt__1depth-menu-item osl-evt__menu-item-show menu-item" data-kt-menu-trigger="click">'
											+ '		<!-- 1Depth 메뉴 반복 시작 -->'
											+ '		<!--begin:Menu link(1Dept 표출)-->'
											+ '		<span class="menu-link collapsible collapsed osl-evt__aside-menu-link" id="'+ map.menuId +'" data-osl-menu-lvl="first" data-bs-toggle="collapse" data-bs-target="#menuLvl2_'+ map.menuId +'">'
											+ '			<span class="menu-icon">'+menuIcon+'</span>'
											+ '			<span class="menu-title osl-evt__aside-menu-title">'+$.osl.escapeHtml(map.menuNm)+'</span>'
											+ '			<i class="osl-icon osl-md osl-icon-chevronDown--black  rotate-180"></i>'
											+ '		</span>'
											+ '		<!--end:Menu link(1Dept 표출)-->'
											+ '		<div class="menu-2depth osl-evt__aside-2depth-menu-link collapse menu-sub menu-sub-accordion" id="menuLvl2_'+ map.menuId +'">'
											+ '		</div>'
											+ '</div>'
											+ '<!--end:Menu item(1Dept 표출)-->'
											+ '	<!-- 2Depth 메뉴 반복 시작 -->';
							
							$("#kt_app_sidebar_menu").append(menuInfoStr);
						});
						
						// 2depth메뉴 붙이기
						$.each(menuLvl2, function(idx, map){
							//데이터 String 세팅
							var menuInfoStr = '		<!--begin:Menu item-->'
											+ '		<div class="menu-accordion menu-item osl-evt__menu-item-show" data-kt-menu-trigger="click">'
											+ '			<!--begin:Menu link-->'
											+ '			<span class="menu-link osl-evt__aside-menu-link osl-evt__2depth-menu-item" id="'+ map.menuId +'" data-osl-menu-lvl="second">'
											+ '				<span class="menu-arrow"></span>'
											+ '				<span class="menu-title osl-evt__aside-menu-title">'+$.osl.escapeHtml(map.menuNm)+'</span>'
											+ '			</span>' 
											+ '			<!--begin:Menu sub(하위 메뉴 목록 -3Depth 표출)-->'
											+ '			<div class="menu-3depth menu-sub menu-sub-accordion menu-active-bg osl-evt__aside-3depth-menu-link" id="menuLvl3_'+ map.menuId +'">'
											+ '			</div>'
											+ '		</div>';
							
							$("#menuLvl2_"+map.upperMenuId).append(menuInfoStr);
						});
						
						//3depth메뉴 붙이기
						$.each(menuLvl3, function(idx, map){
							var nowPage = '';
							
							//선택한 메뉴일 경우
							if(selMenuId == map.menuId){
								nowPage = 'active';
								
								//메뉴 선택 처리
								$("#menuLvl3_"+map.upperMenuId).parents(".osl-evt__menu-item-show").addClass("show here");
								$(".osl-evt__menu-item-show.show").find(".osl-evt__aside-menu-link[data-osl-menu-lvl='first']").addClass("hover active");
								$(".osl-evt__menu-item-show.show").find(".osl-evt__aside-menu-link").removeClass("collapsed");
								
								//사용자 메뉴 설정 타입이 전체 펼치기인 경우
								if(topMenuType == "01"){
									//메뉴 클릭시 다른 메뉴 접히는 기능 방지
									$("#kt_app_sidebar_menu").attr('data-kt-menu-expand', 'true');
									
									//현재 펼쳐진 메뉴 전체 펼침 처리
									$("#menuLvl3_"+map.upperMenuId).parents(".osl-evt__menu-item-show").find(".osl-evt__menu-item-show").addClass("show");

									//메뉴 클릭시 다른 메뉴 접히는 기능 원복
									$("#kt_app_sidebar_menu").attr('data-kt-menu-expand', 'false');
								}
							}//선택한 메뉴일 경우 end
							
							//즐겨찾기 버튼 세팅 
							//default - 비활성화
							var fvrBtnOn = '';
							//즐겨찾기 활성화인 경우
							if(map.fvrCd == "01"){
								fvrBtnOn = 'on';
							}
							
							//데이터 String 세팅
							var menuInfoStr = '				<!--begin:Menu item-->'
											+ '				<div class="menu-item osl-evt__3depth-menu-item">'
											+ '					<!--begin:Menu link-->'
											+ '					<a class="menu-link osl-evt__aside-menu-link '+ nowPage +'" id="'+ map.menuId +'" data-osl-menu-lvl="third" href="javascript:$.osl.goMenu(\''+$.osl.escapeHtml(map.menuUrl)+'\', \''+map.menuId+'\', \''+$.osl.escapeHtml(map.menuNm)+'\', \''+$.osl.escapeHtml(map.menuTypeCd)+'\' )">'
											+ '						<span class="menu-bullet" name="fvrMenuBtn" data-osl-value="'+ map.fvrCd +'">'
											+ '							<i class="osl-evt__fvr-menu-toggle bookmark '+fvrBtnOn+'"></i>'
											+ '						</span>'
											+ '						<span class="menu-title osl-evt__aside-menu-title">'+$.osl.escapeHtml(map.menuNm)+'</span>'
											+ '					</a>'
											+ '					<!--end:Menu link-->'
											+ '				</div>'
											+ '				<!--end:Menu item-->';
							
							$("#menuLvl3_"+map.upperMenuId).append(menuInfoStr);
						});
						
						//세부 메뉴가 모두 없으면 중메뉴 제거
						$.each(menuLvl2, function(idx, map){
							if($("#menuLvl3_"+map.menuId).find(".osl-evt__aside-menu-link").length == 0) {
								$("#"+map.menuId).remove();
							}
						});
						//중 메뉴가 모두 없으면 대메뉴 제거
						$.each(menuLvl1, function(idx, map){
							if($("#menuLvl2_"+map.menuId).find(".osl-evt__aside-menu-link").length == 0) {
								$("#"+map.menuId).remove();
							}
						});
						
						//모든 메뉴에 타이틀 data 보관
						$.each($(".osl-evt__aside-menu-title"), function(n, menuTitleTarget){
							$(menuTitleTarget).data("ori-title", $(menuTitleTarget).text());
						});
						
						//현재 모바일 접근인지, 데스크탑 접근인지 확인(기본 데스크탑)
						var deviceClass = "osl-pc";
						if($.osl.isMobileDevice){
							deviceClass = "osl-mobile";
						}
						//상단에 클래스 삽입
						$("#kt_app_body").removeClass("osl-pc osl-mobile").addClass(deviceClass);
						
						//현재 화면 사이즈 모바일 인지 체크
						$.osl.isMobileDevice = KTUtil.isMobileDevice();
						
						//화면 resize 시 마다 체크
						$(window).resize(function(){
							$.osl.isMobileDevice = KTUtil.isMobileDevice(); 
							//모바일이 아닐때 접혀 있던 메뉴들 펼침상태로 변경
							if(!$.osl.isMobileDevice){
								$('.kt-menu__inner').slideDown();
							}
						});
						
						//메뉴 데이터 없는 화면 이동 시 active 없음 (ex. 통합검색)
						if($("#kt_app_sidebar_menu_box").find(".active").length) {
							// 현재 메뉴 스크롤 위치 계산
							var scrollHeight = $("#kt_app_sidebar_menu_box").find(".active")[0].offsetTop;
							// 스크롤 이동
							$("#kt_app_sidebar_menu_box").scrollTop(scrollHeight - 150);
						}
						
						// 사용자 설정 중 고정 유무 설정 값
						//01 : 항상 보이기 / 02 : 선택 보이기
						var isMenuFixed = "01";
						if($.osl.user.usrOptData.hasOwnProperty("OPT00002") && !$.osl.isNull($.osl.user.usrOptData["OPT00002"].value)){
							isMenuFixed = $.osl.user.usrOptData["OPT00002"];
						}
						
						//사용자 설정 중 고정 유무 설정 값이 있을 경우,
						if(!$.osl.isNull(isMenuFixed)){
							var toggleElement = document.querySelector("#kt_app_sidebar_toggle");
							var toggle = KTToggle.getInstance(toggleElement);
							// 메뉴 접힘 유무 확인
							//true : 접힘 / false : 펼침
							var isToggle = $("#kt_app_body")[0].hasAttribute("data-kt-app-sidebar-minimize");
							
							// 메뉴 접어야 하는데 펼쳐져 있거나, 메뉴 펼쳐야하는데 접혀있다면, 
							if((isMenuFixed.value == "01" && isToggle) || (isMenuFixed.value == "02" && !isToggle)){
								// 토글 버튼 클릭해서 접거나, 펼침
								toggle.toggle();
							}
						}
					}
					
					//프로젝트 데이터 세팅
					if(!$.osl.isNull(data.prjList)){
						//현재 선택된 프로젝트 그룹,프로젝트,권한 그룹 ID
						//var selPrjGrpId = $("#submenu-prjGrp-sel").data("target-id");
						//var selPrjId = $("#submenu-prj-sel").data("target-id");
						var selPrjGrpId = data.selPrjGrpId;
						var selPrjId = data.selPrjId;
						var selAuthGrpIds = data.selAuthGrpIds;
						
						//$.osl 변수 대입
						$.osl.selPrjGrpId = selPrjGrpId;
						$.osl.selPrjId = selPrjId;
						$.osl.selAuthGrpIds = selAuthGrpIds;
						
						var prjOrdList = {};
						
						//프로젝트 목록 계층 세팅
						$.each(data.prjList, function(idx, map){
							if(map.grpDelCd == "01" || map.delCd == "01"){
								return;
							}
							//프로젝트 그룹인 경우
							if(map.prjGrpCd == "01"){
								prjOrdList[map.prjId] = {"prjGrpNm":map.prjNm, "prjGrpInfo":map, "prjList":{}};
							}else{
								//프로젝트 인경우
								prjOrdList[map.prjGrpId]["prjList"][map.prjId] = map;
							}
							
							//현재 프로젝트 그룹 명
							if(selPrjGrpId == map.prjId){
								$("#submenu-prjGrp-sel").html('<i class="fas fa-folder-open osl-me-4"></i>'+$.osl.escapeHtml(map.prjNm));
							}
							//현재 프로젝트 명
							if(selPrjId == map.prjId){
								$("#submenu-prj-sel").html('<i class="fas fa-project-diagram osl-me-4"></i>'+$.osl.escapeHtml(map.prjNm));
							}
						});

						
						//프로젝트 그룹 목록 세팅
						$.each(prjOrdList, function(idx, map){ 
							if(Object.keys(map.prjList).length == 0){
								return true;
							}
							
							//프로젝트 그룹 정보
							var prjGrpInfo = map.prjGrpInfo;
							
							//tooltip
							var tooltipStr = '';
							
							//tooltip 빈 경우 출력 안함
							if(!$.osl.isNull(prjGrpInfo.prjDesc)){
								tooltipStr = ' data-toggle="kt-tooltip" data-skin="brand" title="'+$.osl.escapeHtml(prjGrpInfo.prjDesc).trim()+'"';
							}
							
							var itemActive = '';
							//현재 그룹 active
							if(selPrjGrpId == idx){
								itemActive = "active";
							}
							
							//서브메뉴 프로젝트 그룹 세팅
							$("#submenu-prjGrp-sel_opt").append(
									'<li class="kt-nav__item '+itemActive+'" data-toggle="kt-tooltip" data-skin="brand" data-html="true" title="['+$.osl.escapeHtml(map.prjGrpNm)+']'+$.osl.escapeHtml(prjGrpInfo.prjDesc)+'">'
										+'<a href="javascript:$.osl.goPrjGrp(\''+idx+'\')" class="kt-nav__link">'
											+'<span class="badge badge-dark kt-font-sm kt-font-bolder osl-aside__badge fas fa-folder-open kt-margin-r-10 osl-padding-l-px--9"></span>'
											+'<span class="kt-nav__link-text">'+$.osl.escapeHtml(map.prjGrpNm)+'</span>'
										+'</a>'
									+'</li>'
							);
							
							
							//프로젝트 그룹 그리기
							var appendStr = 
								'<li class="osl-favorites__item kt-menu__section kt-menu__section--first"'+tooltipStr+'>'
								+'	<i class="flaticon-star" data-fvr-data1="'+prjGrpInfo.prjId+'" data-fvr-data2="'+$.osl.escapeHtml(prjGrpInfo.prjNm)+'" data-fvr-data3="'+$.osl.escapeHtml(prjGrpInfo.prjDesc)+'" data-fvr-type="02" onclick="$.osl.favoritesEdit(event,this)"></i>'
										+'<span class="kt-menu__section-text fs-lg-4 kt-label-font-color-4 font-weight-bold text-truncate" onclick="$.osl.goPrjGrp(\''+idx+'\');">'
											+'<span class="badge badge-dark kt-font-sm kt-font-bolder osl-aside__badge fas fa-folder-open kt-margin-r-10 osl-padding-l-px--9"></span>'
											+$.osl.escapeHtml(map.prjGrpNm)
										+'</span>'
								+'	<i class="kt-menu__section-icon fas fa-ellipsis-v"></i>'
								+'</li>';
							
							//프로젝트 목록
							$.each(map.prjList,function(idx2, map2){

								//tooltip
								var tooltipStr = '';
								
								//tooltip 빈 경우 출력 안함
								if(!$.osl.isNull(map2.prjDesc)){
									tooltipStr = ' data-toggle="kt-tooltip" data-skin="brand" title="'+$.osl.escapeHtml(map2.prjDesc).trim()+'"';
								}

								var itemActive = '';
								//현재 프로젝트 active
								if(selPrjId == map2.prjId){
									itemActive = "active";
								}
								
								//서브메뉴 프로젝트 세팅
								if(selPrjGrpId == map2.prjGrpId){
									$("#submenu-prj-sel_opt").append(
											'<li class="kt-nav__item '+itemActive+'" data-toggle="kt-tooltip" data-skin="brand" data-html="true" title="['+$.osl.escapeHtml(map2.prjNm)+']<br/>'+$.osl.escapeHtml(map2.prjDesc)+'">'
												+'<a href="javascript:$.osl.goPrj(\''+map2.prjGrpId+'\',\''+map2.prjId+'\');" class="kt-nav__link">'
													+'<span class="badge badge-dark kt-font-sm kt-font-bolder osl-aside__badge fas fa-project-diagram kt-margin-r-10 osl-padding-l-px--9 osl-padding-l-px--9"></span>'
													+'<span class="kt-nav__link-text">'+$.osl.escapeHtml(map2.prjNm)+'</span>'
												+'</a>'
											+'</li>'
									);
								}
								
								appendStr += 
									'<li class="kt-menu__item  kt-menu__item--submenu" aria-haspopup="true" data-ktmenu-submenu-toggle="hover">'
									+'	<a href="javascript:void(0);" class="osl-favorites__item kt-menu__link kt-menu__toggle" '+tooltipStr+'>'
									+'		<i class="flaticon-star" data-fvr-data1="'+map2.prjGrpId+'" data-fvr-data2="'+map2.prjId+'" data-fvr-data3="'+$.osl.escapeHtml(prjGrpInfo.prjNm)+'" data-fvr-data4="'+$.osl.escapeHtml(map2.prjNm)+'" data-fvr-data5="'+$.osl.escapeHtml(map2.prjDesc)+'" data-fvr-type="03" onclick="$.osl.favoritesEdit(event,this)"></i>'
											+'<span class="kt-menu__link-text kt-font-md kt-font-bolder text-truncate">'
											+'<span class="badge badge-dark kt-font-sm kt-font-bolder osl-aside__badge fas fa-project-diagram kt-margin-r-10 osl-padding-l-px--9 osl-padding-l-px--9"></span>'
												+$.osl.escapeHtml(map2.prjNm)
											+'</span>'
									+'		<i class="kt-menu__ver-arrow fas fa-chevron-right"></i>'
									+'	</a>'
									+'	<div class="kt-menu__submenu "><span class="kt-menu__arrow"></span>'
									+'		<ul class="kt-menu__subnav osl-submenu-list__authGrp" data-prj-id="'+map2.prjId+'">'
									+'		</ul>'
									+'	</div>'
									+'</li>'; 
							});
							
							//구분선
							appendStr += '<div class="separator pt-2 mb-2"></div>';
							
							$("#osl_aside_prjAuth_List").append(appendStr);
						});
						
					}
					
					//즐겨찾기 데이터 세팅
					if(!$.osl.isNull(data.fvrList)){
						$.each(data.fvrList, function(idx, map){
							//즐겨찾기 타입
							var fvrType = map.fvrType;
							
							//메뉴 대상
							var fvrTargetElem;
							var fvrTargetEvt;
							var fvrTitleStr = "";
							
							//현재 추가된 메뉴 즐겨찾기 상태 변경
							if(fvrType == "01"){
								fvrTargetElem = $(".osl-favorites__item i[data-fvr-data1="+$.osl.escapeHtml(map.fvrSubData1)+"][data-fvr-type="+fvrType+"]");
								fvrTargetEvt = '$.osl.goMenu(\''+$.osl.escapeHtml(map.fvrSubData2)+'\', \''+$.osl.escapeHtml(map.fvrSubData1)+'\', \''+$.osl.escapeHtml(map.fvrNm)+'\', \''+$.osl.escapeHtml(map.fvrSubData3)+'\' )';
								fvrTitleStr = 
									'<div class="text-start">'
										+'<i class="fa fa-layer-group"></i>&nbsp;'
										+$.osl.lang("common.menu.top")+' : '
										+$.osl.escapeHtml(map.fvrSubData4)+'<br/>'
										+'<i class="fa fa-layer-group"></i>&nbsp;'
										+$.osl.lang("common.menu.upper")+'　 : '
										+$.osl.escapeHtml(map.fvrSubData5)+'<br/>'
										+'<i class="fa fa-layer-group"></i>&nbsp;'
										+$.osl.lang("common.menu.name")+' : '
										+$.osl.escapeHtml(map.fvrNm)
									'/<div>';
							}
							else if(fvrType == "02"){
								fvrTargetElem = $(".osl-favorites__item i[data-fvr-data1="+$.osl.escapeHtml(map.fvrSubData1)+"][data-fvr-type="+fvrType+"]");
								fvrTargetEvt = '$.osl.goPrjGrp(\''+map.fvrSubData1+'\')';
								fvrTitleStr = '';
								fvrTitleStr = 
									'<div class="text-start">'
										+$.osl.escapeHtml(map.fvrNm)
									'/<div>';
							}
							else if(fvrType == "03"){
								fvrTargetElem = $(".osl-favorites__item i[data-fvr-data1="+$.osl.escapeHtml(map.fvrSubData1)+"][data-fvr-data2="+$.osl.escapeHtml(map.fvrSubData2)+"][data-fvr-type="+fvrType+"]");
								fvrTargetEvt = '$.osl.goPrj(\''+map.fvrSubData1+'\',\''+map.fvrSubData2+'\')';
								fvrTitleStr = 
									'<div class="text-start">'
										+'<i class="fa fa-layer-group"></i>&nbsp;'
										+$.osl.lang("common.name.prjGrp")+': '
										+$.osl.escapeHtml(map.fvrSubData3)+'<br/>'
										+'<i class="fa fa-layer-group"></i>&nbsp;'
										+$.osl.lang("common.name.prj")+': '
										+$.osl.escapeHtml(map.fvrNm)+'<br/>'
									'/<div>';
							}
							
							//현재 즐겨찾기 메뉴가 전체 메뉴에 포함되어있는지 체크
							if(!$.osl.isNull(fvrTargetElem) && fvrTargetElem.length > 0){
								var fvrElem =
									'<li class="kt-menu__item " aria-haspopup="true" data-toggle="kt-tooltip" data-html="true" data-placement="top" data-skin="brand" title="'+$.osl.escapeHtml(fvrTitleStr)+'">'
									+'			<a href="javascript:'+fvrTargetEvt+';" class="kt-menu__link fvrHoverInfo">'
									+'		<i class="flaticon-star osl-favorites--active" data-fvr-id="'+map.fvrId+'" data-fvr-data1="'+$.osl.escapeHtml(map.fvrSubData1)+'"data-fvr-data2="'+$.osl.escapeHtml(map.fvrSubData2)+'"data-fvr-data3="'+$.osl.escapeHtml(map.fvrSubData3)+'" data-fvr-data4="'+$.osl.escapeHtml(map.fvrSubData4)+'" data-fvr-data5="'+$.osl.escapeHtml(map.fvrSubData5)+'" data-fvr-data6="'+$.osl.escapeHtml(map.fvrSubData6)+'" data-fvr-type="'+map.fvrType+'" onclick="$.osl.favoritesEdit(event,this)"></i>'
									+'		<span class="kt-menu__link-text">'+$.osl.escapeHtml(map.fvrNm)+'</span>'
									+'	</a>'
									+'</li>';
								
								//즐겨찾기 메뉴 추가
								$("#fvrListType"+map.fvrType).append(fvrElem);
								
								fvrTargetElem.data("fvr-id",map.fvrId);
								fvrTargetElem.addClass("osl-favorites--active");
							}
						});
					}
					
					$.osl.prjGrpAuthList = prjOrdList;
					$.osl.showLoadingBar(false,{target: "#kt_app_header"});
					//이벤트중복적용 제거
					$("#searchPrjNmBtn").off("click");
					//프로젝트 조회 이동
					$("#searchPrjNmBtn").click(function(){
						var data = {
								paramUsrId: $.osl.user.userInfo.usrId,
								paramPrjNm : $("#mainPrjNm").val(),
						};
						var options = {
								modalTitle: $.osl.lang("cmm6000.title.main.default"),
								closeConfirm: false,
								autoHeight: false,
								modalSize:"xl",
								callback:[{
									targetId: "selectPrj",
									actionFn: function(thisObj){
										var prjNm = OSLCmm6000Popup.getPrjInfo();
										$("#mainPrjNm").val(prjNm);
									}
								}]
						};
						$.osl.layerPopupOpen('/cmm/cmm6000/cmm6000/selectCmm6000View.do', data, options);
						
					});
					//엔터키
					//이벤트 중복 적용 제거
					$("#mainPrjNm").off("keydown");
					$("#mainPrjNm").keydown(function(e){
						if(e.keyCode=='13'){
							//해당 값으로 검색화면 띄우기
							$("#searchPrjNmBtn").click();
						}
					});
					
					//메인프로젝트 설정
					//지정한 메인프로젝트가 없거나 해당 프로젝트가 삭제된 경우 데이터가 없으므로
					if(!$.osl.isNull(data.mainPrjInfo)){
						$("#mainPrjNm").val(data.mainPrjInfo[0].popPrjNm);
					}
					
				}else{
					$.osl.toastr(data.message);
				}
				
				if(typeof callBackFn == "function"){
					//calback 함수
					callBackFn();
				}
			});
			
			//AJAX 전송
			ajaxObj.send();
		}
		/**
		 *  function 명 	: $.osl.req.reqAuthChk
		 *  function 설명	: 선택한 보안 티켓의 사용자 권한을 체크해주는 함수 
		 *  @param : reqId - 보안 티켓 ID
		 *  @return : rtnData = {
		 *  				authFlag : boolean (하나라도 권한 있는지 확인),
		 *  				authInfo : object (각 권한유무 정보)
		 *  			}
		 **/
		,req :{
			reqAuthChk : function(reqId) {
				
				//권한 유무
				var authFlag = false;
				
				//리턴 데이터
				var rtnData = {};
				
				//ajax 설정
				var ajaxObj = new $.osl.ajaxRequestAction(
						{"url":"/req/req1000/req1100/selectReq1100UserCheckAjax.do", "async": false}
						, {reqId : reqId});
				
				//반환할 결과
				var resultList = {};
				//ajax 전송 성공 함수
				ajaxObj.setFnSuccess(function(data){
					if(data.errorYn == "Y"){
						$.osl.alert(data.message,{type: 'error'});
						//모달 창 닫기
						$.osl.layerPopupClose();
					}else{
						var result = data.reqAuth;
						
						/* 
						reqUsrChk			보안 티켓 요청자
						reqAcceptUsrChk		보안 티켓 접수자
						reqChargerChk		보안 티켓 담당자(이전 담당자 포함)
						reqRegUsrChk		보안 티켓 작성자
						reqSignChk			보안 티켓 현재 결재진행 중인 결재선의 결재자
						reqWorkChk			보안 티켓 현재 단계 작업 담당자
						reqOpnChk			보안 티켓 의견답변대상자
						reqStarterChk		보안 티켓 스타터(조건: 첫번째 단계일 때, 담당자 및 담당 범위가 없을 때 업무처리 권한이 있으면 Y 그 외 N)
						*/
						if(result.reqUsrChk == 'Y' 
							|| result.reqAcceptUsrChk == 'Y'
							|| result.reqChargerChk == 'Y'
							|| result.reqRegUsrChk == 'Y'
							|| result.reqSignChk == 'Y'
							|| result.reqWorkChk == 'Y'
							|| result.reqOpnChk == 'Y'
							|| result.reqStarterChk == 'Y' ){
							authFlag = true;
						}else{
							authFlag = false;
						}
						
						//하나라도 권한 있는지 확인
						rtnData["authFlag"] = authFlag;
						//각 권한 정보
						rtnData["authInfo"] = result;
					}
				});
				//ajax 전송
				ajaxObj.send();
				
				return rtnData;
			}
		}
		/**
		 *  function 명 	: $.osl.flow.fnData
		 *  function 설명	: 단계에 사용되는 기능 목록 기본 데이터
		 *  param : type (json, list) - default json
		 **/
		,flow :{
			fnData : function(type){
				if($.osl.isNull(type)){
					type = "json";
				}
				
				if(type == "json"){
					return {
							flowRevisionCd : {icon : "fa fa-code", title : "리비전 저장", lang:"common.fnData.flowRevisionCd"}
							,flowDplCd : {icon : "fa fa-puzzle-piece", title : "배포계획 저장", lang:"common.fnData.flowDplCd"}
							,flowWorkCd : {icon : "fa fa-code-branch", title : "작업", lang:"common.fnData.flowWorkCd"}
							,flowAuthCd : {icon : "fa fa-user-shield", title : "허용 역할 제한", lang:"common.fnData.flowAuthCd"}
							,flowExpCd : {icon : "fas fa-exclamation-triangle", title : "소명 단계", lang:"common.fnData.flowExpCd"}
							,flowSignCd : {icon : "fa fa-file-signature", title : "결재", lang:"common.fnData.flowSignCd"}
							,flowSignStopCd : {icon : "far fa-stop-circle", title : "결재 반려시 종료", lang:"common.fnData.flowSignStopCd"}
							,flowMiddleEndCd : {icon : "fa fa-stopwatch", title : "중간 종료", lang:"common.fnData.flowMiddleEndCd"}
							,flowDoneCd : {icon : "fa fa-flag-checkered", title : "최종 완료 단계", lang:"common.fnData.flowDoneCd"}
							,flowTplEndArmcCd : {icon : "far fa-bell", title : "신청서 기간 만료 알림", lang:"common.fnData.flowTplEndArmcCd"}
							,flowSmrExcldCd : {icon : "fab fa-uncharted", title : "처리중 통계 제외", lang:"common.fnData.flowSmrExcldCd"}
					};
				}else if(type == "list"){
					/*아이콘이 그려져야 하는 항목 순으로 배치(결재, 종료는 마지막)*/
					return [
						{name : "flowRevisionCd", icon : "fa fa-code", title : "리비전 저장", lang:"common.fnData.flowRevisionCd"}
						,{name : "flowDplCd", icon : "fa fa-puzzle-piece", title : "배포계획 저장", lang:"common.fnData.flowDplCd"}
						,{name : "flowWorkCd", icon : "fa fa-code-branch", title : "작업", lang:"common.fnData.flowWorkCd"}
						,{name : "flowAuthCd", icon : "fa fa-user-shield", title : "허용 역할 제한", lang:"common.fnData.flowAuthCd"}
						,{name : "flowExpCd", icon : "fas fa-exclamation-triangle", title : "소명 단계", lang:"common.fnData.flowExpCd"}
						,{name : "flowSignCd", icon : "fa fa-file-signature", title : "결재", lang:"common.fnData.flowSignCd"}
						,{name : "flowSignStopCd", icon : "far fa-stop-circle", title : "결재 반려시 종료", lang:"common.fnData.flowSignStopCd"}
						,{name : "flowMiddleEndCd",icon : "fa fa-stopwatch", title : "중간 종료", lang:"common.fnData.flowMiddleEndCd"}
						,{name : "flowDoneCd", icon : "fa fa-flag-checkered", title : "최종 완료 단계", lang:"common.fnData.flowDoneCd"}
						,{name : "flowTplEndArmcCd", icon : "far fa-bell", title : "신청서 기간 만료 알림", lang:"common.fnData.flowTplEndArmcCd"}
						,{name : "flowSmrExcldCd", icon : "fab fa-uncharted", title : "처리중 통계 제외", lang:"common.fnData.flowSmrExcldCd"}
					];
				}
			},
			flowToolbarHtml : function(processId, flowId, flowInfoList, direction){
				var htmlStr = '';
					
				$.each($.osl.flow.fnData("list"), function(index, fnData){
					//해당 기능 사용중이면
					if(flowInfoList[fnData.name] == "01"){
						htmlStr += '<div class="menu-item" data-auth-button="select">'
										+'<div class="menu-content">'
											+'<span class="w-150px osl-word__break" data-lang-cd="'+fnData.lang+'">'
												+'<i class="'+fnData.icon+' text-primary osl-me-4"></i>'
												+$.osl.lang(fnData.lang)
											+'</span>'
										+'</div>'
									+'</div>';
					}
				});
				
				//하나도 없으면
				if(htmlStr == ''){
					htmlStr +='<div class="menu-item" data-auth-button="select">'
									+'<div class="menu-content">'
										+'<span data-lang-cd="message.none">'+$.osl.lang("message.none")+'</span>'
									+'</div>'
								+'</div>';
				}
				
				//기능 목록 조회 메뉴
				htmlStr = '<div class="osl-menu menu-sub menu-sub-dropdown">'
								+ htmlStr
							+ '</div>';
							
	
				//방향에 따른 아이콘 default
				var directionIcon = "fas fa-chevron-right";
				//방향
				if($.osl.isNull(direction)){
					direction = "auto";
				}
				//아이콘은 아래와 오른쪽만 사용
				if(direction.indexOf("bottom") > -1){
					directionIcon = "fas fa-chevron-down";
				}else if(direction.indexOf("right") > -1){
					directionIcon = "fas fa-chevron-right";
				}
				
				//단계 상세 조회 추가
							//1depth 기능 메뉴
				htmlStr = '<div class="osl-menu menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-semibold w-auto text-start" data-kt-menu="true">'
								//상세 조회
								+'<div class="menu-item" data-auth-button="select">'
									+'<div class="menu-content cursor-pointer osl-evt__flow-info-popup" data-process-id="'+processId+'" data-flow-id="'+flowId+'">'
										+'<i class="fa fa-info-circle text-primary osl-me-4"></i>'+$.osl.lang("process.menu.detail")
									+'</div>'
								+'</div>'
								//구분 선
								+'<div class="separator my-2" data-auth-button="select"></div>'
								//기능 목록 조회
								+'<div class="menu-item" data-auth-button="select" data-kt-menu-trigger="hover" data-kt-menu-placement="'+direction+'">'
									+'<div class="menu-link d-flex justify-contents-between">'
										+'<div class="">'
											+'<i class="fas fa-puzzle-piece text-primary osl-me-4"></i>'+$.osl.lang("process.menu.fnDatas")
										+'</div>'
										+'<div class="ms-2">'
											+'<i class="'+directionIcon+' fs-10"></i>'
										+'</div>'
									+'</div>'
									//2depth 기능 목록 조회 메뉴
									+htmlStr
									//2depth 기능 목록 조회 메뉴 끝
								+'</div>'
								//기능 목록 조회 끝
							+'</div>';
							//1depth 기능 메뉴 끝
				return htmlStr;
			}
		}
		/**
		 *  function 명 	: $.customOpt
		 *  function 설명	: customOpt 생성자
		 **/
		,customOpt:{
			/**
			 *  function 명 	: $.osl.customOpt.setting
			 *  function 설명	: targetId div에 기본항목을 생성한다.
			 **/
			setting: $.noop
		}
		/** osl-regex.js
		 * function 명 : $.osl.validate
		 * function 설명	: 폼값 유효성 체크 validator 세팅
		 * 
		 * TODO 
		 * 2022.09.15 keen테마 변경에 따라 생성되었으므로
		 * 오류 발생 시 기존 function ($.osl.validate_ 로 검색) 로직을 확인하여
		 * osl-regex.jsp 수정 바람.
		 * 문제 없을 경우 추후 기존 function 제거 필요
		 */ 
		,validate:{
			list : {}
			,setting : $.noop
		}
		/** osl-template.js
		 *  function 명 	: $.templateForm
		 *  function 설명	: templateForm 생성자
		 **/
		,templateForm:{
			/** osl-template.js
			 *  function 명 	: $.osl.templateForm.data
			 *  function 설명	: 세팅할 양식 항목 데이터를 가져온다.
			 **/
			data : {
				items : $.noop //아이템으로부터 DB 조회 값 가져오기
				,getForm : $.noop //폼만 가져오기
				,getFormValue : $.noop //폼+값 가져오기
				,setting : $.noop //db조회하여 html 그리기
				,html : $.noot //html 그리기
				//,getFormDataToJsonArray : $.noop //formDataToJsonArray
			}
			/**osl-template.js
			 *  function 명 	: $.osl.templateForm.setting
			 *  function 설명	: 양식의 폼과 값을 가져와 한번에 그리기
			 **/
			,setting: $.noop
			,regex: {
				/** osl-regex.js
				 *  function 명 	: $.osl.templateForm.regex.setting
				 *  function 설명	: targetId에 해당하는 정규식(유효성)을 추가한다.
				 **/
				setting : $.noop
			}
			,reTabIndex : $.noop
			,ItemHeightSize : $.noop
			//그리드스택 세팅
			/** $.osl.templateForm.gridStack
			 * 반응형을 위한 gridStack list 보관 및 최초 설정
			 **/
			,gridStack:{
				init : $.noop
				,initAll : $.noop
				,resize : $.noop
				,list : {}
			}
		}
		/**
		 *  function 명 	: $.osl.chart
		 *  function 설명	: chart 생성자
		 **/
		,chart:{
			/**
			 *  function 명 	: $.osl.chart.list
			 *  function 설명	: 페이지에 생성된 chart 목록
			 **/
			list: {},
			/**
			 *  function 명 	: $.osl.chart.setting
			 *  function 설명	: targetId div에 chart를 생성한다.
			 **/
			setting: $.noop
		}
		/**
		 *  function 명 	: $.osl.widget
		 *  function 설명	: widget 생성자
		 **/
		,widget:{
			/**
			 *  function 명 	: $.osl.widget.fnList
			 *  function 설명	: 사용 가능한 위젯 실행 함수 목록
			 **/
			fnList: [],
			/**
			 *  function 명 	: $.osl.widget.pageWidgetList
			 *  function 설명	: 페이지에서 사용되는 위젯 관리 변수
			 **/
			pageWidgetList: {},
			/**
			 *  function 명 	: $.osl.widget.getWidgetInfo
			 *  function 설명	: 위젯 키에 해당하는 위젯 정보 조회
			 *  @param widgetKey: 위젯 키값
			 **/
			getWidgetInfo: function(widgetKey){
				//return OSLCoreWidgetSetting.getWidgetInfo(widgetKey);
				return OSLCoreWidget.getWidgetInfo(widgetKey);
			},
			/**
			 *  function 명 	: $.osl.widget.getWidgetContent
			 *  function 설명	: 위젯 키에 해당하는 위젯 내용 조회
			 *  @param widgetKey: 위젯 키값
			 *  @param widgetOptValList: 위젯 설정 값
			 **/
			getWidgetContent: function(widgetKey, widgetOptValList){
				return OSLCoreWidgetSetting.getWidgetContent(widgetKey, widgetOptValList);
			}
		}
		/**
		 *  function 명 	: $.osl.datatable
		 *  function 설명	: datatable 생성자
		 **/
		,datatable:{
			/**
			 *  function 명 	: $.osl.datatable.list
			 *  function 설명	: 페이지에 생성된 datatable 목록
			 **/
			list:{},
			/**
			 *  function 명 	: $.osl.datatable.setting
			 *  function 설명	: targetId div에 datatable를 생성한다.
			 *  @param targetId: datatable 생성 타겟 요소 ID (# 제외) 
			 *  @param config: datatable 설정 값
			 **/
			setting: $.noop
		}
		,date: {
			/**
			 *  function 명 	: $.osl.date.init
			 *  function 설명	: datepicker, datetimepicker 언어 처리
			 **/
			init: function(){
				//datepicker daterangepicker로 덮어쓰기(없어짐)
				$.prototype.datepicker = $.prototype.daterangepicker;
				//datepicker 언어 처리
				//$.fn.datepicker.dates['ko'] = $.osl.lang("date.datepicker");
				
				moment.updateLocale('fr', $.osl.lang("date.moment"));
			}
			/**
			 *  function 명 	: $.osl.date.datepicker
			 *  function 설명	: 타겟 오브젝트에 datepicker 세팅
			 *  @param targetObj : datepicker 대상 오브젝트
			 *  @param config : datepicker 설정 값 (String == 'destroy'인 경우 해당 datepicker 제거)
			 *  		예) $.osl.date.datepicker($(".osl-datatable-search__input > input#searchData"),"destroy")
			 *  @param callback: 일자 선택시 반환 함수
			 **/
			,datepicker: function(targetObj, config, callback){
				//target elem 있는 경우
				if($.osl.isNull($(targetObj)) || $(targetObj).length == 0){
					return true;
				}
				//callback 함수가 아닌 경우 빈 함수 대입
				if(typeof callback != "function"){
					callback = $.noop;
				}
				
				//해당 elem datepicker 제거
				if(typeof config == "string" && config == "destroy"){
					var aa= $(targetObj).unbind();
				}else{
					var defaultConfig = {
							classes : 'osl-daterangepicker__single-date',
							parentEl: $(targetObj).parent(),
							buttonClasses: 'btn btn-sm',
							applyClass: "btn-primary",
							cancelClass: "btn-secondary",
							autoApply: true,
							showDropdowns: true,
							opens : "center",
							todayHighlight: true,
							singleDatePicker: true,
							minYear : 1901,
							maxYear : parseInt(moment().format('YYYY'),10) + 10,
							timePicker: false,
							timePicker24Hour: false,
							timePickerIncrement: 1,
							timePickerDshonds: false,
							locale:{
								format : "YYYY-MM-DD",
								applyLabel: $.osl.lang("date.datepicker.apply"), //적용
								cancelLabel: $.osl.lang("date.datepicker.cancle"), //취소
								daysOfWeek: $.osl.lang("date.datepicker.daysShort"),
								monthNames: $.osl.lang("date.datepicker.months"),
								firstDay : 0, //월요일부터 시작할 경우 1
							},
					};
					
					//사용자 입력 config extend
					defaultConfig = $.extend(true, defaultConfig, config);

					//드롭 다운으로 표출되는 year의 최대, 최소
					defaultConfig.minYearshowDropdowns = defaultConfig.minYear;
					defaultConfig.maxYearshowDropdowns = defaultConfig.maxYear;
					
					//시간 표출 시
					if(defaultConfig.timePicker){
						defaultConfig.locale.format = 'YYYY-MM-DD hh:mm A';
					}
					if(defaultConfig.timePicker24Hour){
						//24시 표출 시
						defaultConfig.locale.format = 'YYYY-MM-DD HH:mm';
					}
					//classes 옵션이 있으면
					if(!$.osl.isNull(defaultConfig.classes)){
						//해당 daterangepicker에 클래스 추가
						$(targetObj).addClass(defaultConfig.classes);
					}
					
					var datepicker = $(targetObj).datepicker(defaultConfig);
					
					//datepicker
					datepicker.on('changeDate', function (selected) {
						callback(defaultConfig, selected);
					});
				}
			}
			/**
			 *  function 명 	: $.osl.date.daterangepicker
			 *  function 설명	: 타겟 오브젝트에 daterangepicker 세팅
			 *  @param targetObj : daterangepicker 대상 오브젝트
			 *  @param config : daterangepicker 설정 값 (String == 'destroy'인 경우 해당 daterangepicker 제거)
			 *  		예) $.osl.date.daterangepicker($(".osl-datatable-search__input > input#searchData"),"destroy")
			 *  @param callback: 일시 선택시 반환 함수
			 **/
			,daterangepicker: function(targetObj, config, callback){
				var datePickerObj = null;
				//target elem 있는 경우
				if($.osl.isNull($(targetObj)) || $(targetObj).length == 0){
					return true;
				}
				//callback 함수가 아닌 경우 빈 함수 대입
				if(typeof callback != "function"){
					callback = $.noop;
				}
				
				//해당 elem datepicker 제거
				if(typeof config == "string" && config == "destroy"){
					//선언된 객체 존재하는 경우 제거
					if(!$.osl.isNull($(targetObj).data('daterangepicker'))){
						$(targetObj).data('daterangepicker').remove();
					}
				}else{
					var minYear = moment().subtract(10, 'year').format('YYYY');
					var maxYear = moment().subtract(-10, 'year').format('YYYY');
					
					var defaultConfig = {
							classes : 'osl-daterangepicker__double-date',
							parentEl: $(targetObj).parent(),
							buttonClasses: 'btn btn-sm',
							applyClass: "btn-primary",
							cancelClass: "btn-secondary",
							autoApply: false,
							showDropdowns: true,
							opens : "center",
							todayHighlight: false,
							minYear : parseInt(minYear),
							maxYear : parseInt(maxYear),
							singleDatePicker: false,
							timePicker: false,
							timePicker24Hour: false,
							timePickerIncrement: 1,
							timePickerSeconds: false,
							locale:{
								format : "YYYY-MM-DD",
								applyLabel: $.osl.lang("date.datepicker.apply"), //적용
								cancelLabel: $.osl.lang("date.datepicker.cancle"), //취소
								daysOfWeek: $.osl.lang("date.datepicker.daysShort"),
								monthNames: $.osl.lang("date.datepicker.months"),
								firstDay : 0, //월요일부터 시작할 경우 1
							},
						};
					
					//사용자 입력 config extend
					defaultConfig = $.extend(true, defaultConfig, config);
					
					//드롭 다운으로 표출되는 year의 최대, 최소
					defaultConfig.minYearshowDropdowns = defaultConfig.minYear;
					defaultConfig.maxYearshowDropdowns = defaultConfig.maxYear;
					
					//시간 표출 시
					if(defaultConfig.timePicker){
						defaultConfig.locale.format = 'YYYY-MM-DD hh:mm A';
					}
					if(defaultConfig.timePicker24Hour){
						//24시 표출 시
						defaultConfig.locale.format = 'YYYY-MM-DD HH:mm';
					}
					//classes 옵션이 있으면
					if(!$.osl.isNull(defaultConfig.classes)){
						//해당 객체에 클래스 추가
						$(targetObj).addClass(defaultConfig.classes);
					}
					
					//datepicker
					datePickerObj = $(targetObj).daterangepicker(defaultConfig,
						function(start, end, label) {
							callback(defaultConfig, start, end, label);
						}
					);
				}
				return datePickerObj;
			}
		}
		/**
		 *  function 명 	: $.osl.user
		 *  function 설명	: 사용자 처리 기본 생성자 함수
		 **/
		,user: {
			/* 사용자 정보 */
			userInfo:{}
			/* 사용자 설정 값 데이터 */
			,usrOptData:{}
			/* 사용자 권한  */
			,usrAuthSet :{}
			/**
			 *  function 명 	: $.osl.user.logout
			 *  function 설명	: 로그아웃 처리
			 * @param cookieName 쿠키이름
			 */
			,logout: function(){
				$.osl.confirm($.osl.lang("common.logout.confirm"),{"confirmButtonText": $.osl.lang("common.logout.button")},function(result) {
					if (result.value) {
						// 로그인 시 생성한 비밀번호 만료 쿠키 삭제
						$.osl.user.deleteCookie("pwExpire");
						// 로그인 시 생성한 공지팝업 표출 여부 쿠키 삭제
						$.osl.user.deleteCookie("isNoticed");
						$(location).attr('href',"/cmm/cmm4000/cmm4000/selectCmm4000Logout.do");
					}
				});
			}
			/**
			 *  function 명 	: $.osl.user.deleteCookie
			 *  function 설명	: 비밀번호 만료일 alert이 로그인 시 한번만 나타나게 하기위해 생성한 쿠키를 삭제
			 * @param cookieName 쿠키이름
			 */
			,deleteCookie: function(cookieName){
				var expireDate = new Date();
				  
			  	//어제 날짜를 쿠키 소멸 날짜로 설정
				expireDate.setDate( expireDate.getDate() - 1 );
				document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString() + "; path=/";
			}
			/**
			 *  function 명 	: $.osl.user.pwChangeDay
			 *  function 설명	: 사용자 비밀번호 만료일 체크
			 * @param pwlimitDay 비밀번호 만료일
			 */
			,pwChangeDay: function(pwExpireDay){
				// 비밀번호 만료일 쿠키가 없을경우 
				if( $.osl.user.isCookie("pwExpire") == false ){
				
					if( !$.osl.isNull(pwExpireDay) ){
						
						$.osl.alert($.osl.lang("common.alert.title"),$.osl.lang("common.user.pwChange", pwExpireDay),"warning", function(result){
							// 비밀번호 만료일 alert이 로그인 시 한번만 나타나게 하기위한 쿠키를 생성
							$.osl.user.setCookie("pwExpire", "expire"); 
						});
					}	
				}
			}
			/**
			 *  function 명 	: $.osl.user.isCookie
			 *  function 설명	:   쿠키의 유무 체크
			 * @param cookieName 쿠키이름
			 */
			,isCookie: function(cookieName) {
				cookieName = cookieName + '=';
				var cookieData = document.cookie;
				var cIdx = cookieData.indexOf(cookieName);
				var exist = false;	
				
				if(cIdx != -1 ){
					exist = true;	
				}
				return exist;
			}
			/**
			 *  function 명 	: $.osl.user.setCookie
			 *  function 설명	:  비밀번호 만료일 alert이 로그인 시 한번만 나타나게 하기위한 쿠키를 생성한다.
			 * @param cookieName 쿠키이름
			 * @param cookieValue 쿠키값
			 */
			,setCookie: function(cookieName, cookieValue) {   
				var cDate = new Date();
				cDate.setTime(cDate.getTime() + 1000*60*60*1); // 만료시간 1시간
				document.cookie = cookieName + "=" + cookieValue + "; path=/; expires=" + cDate.toGMTString() + ";";
			}
			/**
			 *  function 명 	: $.osl.user.usrOptChg
			 *  function 설명	: 사용자 설정 값 변경 시 즉시 적용 함수
			 * @param 사용자 설정 값
			 */
			,usrOptChg: function(thisTarget){
				//선택 값
				var usrOptCd = thisTarget.value;
				
				//설정 코드 값
				var usrOptMstCd = $(thisTarget).data("mst-cd");
				
				var paramData = {"usrOptCd": usrOptCd, "usrOptMstCd": usrOptMstCd};
				
				//AJAX 설정
				var ajaxObj = new $.osl.ajaxRequestAction(
						{"url":"/stm/stm3000/stm3000/saveStm3001UsrOptInfo.do", "loadingShow":true}
						,paramData);
				
				//AJAX 전송 성공 함수
				ajaxObj.setFnSuccess(function(data){
					
					if( data.errorYn == "N" ){
						//변경 값 적용
						$("#usrOpt_"+usrOptMstCd).data("osl-value",usrOptCd);
						/*
						//영역 초기화
						$.osl.initHeaderClear();
						//헤더 다시 불러오기
						$.osl.initHeader();
						*/
						
						//사용자 설정 값 변경
						$.osl.user.usrOptData["usrOpt_"+usrOptMstCd] = usrOptCd;
					}
					
					//즐겨찾기만 보기 설정이 아닐 경우만 알림 표출
					if(usrOptMstCd != "OPT00007"){
						$.osl.toastr(data.message);
					}
				});
				
				//AJAX 전송
				ajaxObj.send();
			}
			/**
			 *  function 명 	: $.osl.user.usrMainMenuChg
			 *  function 설명	: 사용자의 메인 메뉴 변경
			 * @param menuId : 변경 메뉴의 id
			 */
			,usrMainMenuChg: function(menuId){
				//AJAX 설정
				var ajaxObj = new $.osl.ajaxRequestAction(
						{"url":"/stm/stm3000/stm3000/updateUsr1000UsrMainMenu.do", "loadingShow":true}
						,{menuId:menuId});
				
				//AJAX 전송 성공 함수
				ajaxObj.setFnSuccess(function(data){
					$.osl.toastr(data.message);
				});
				
				//AJAX 전송
				ajaxObj.send();
			}
			/**
			 *  function 명 	: $.osl.user.usrOptLangChg
			 *  function 설명	: 사용자 언어 코드 설정
			 * @param 언어코드 Element 대상
			 */
			,usrOptLangChg: function(thisTarget){
				//선택 값
				var usrOptCd = $(thisTarget).attr("value");
				
				//설정 코드 값
				var usrOptMstCd = $(thisTarget).data("mst-cd");
				var subCd = $(thisTarget).data("sub-cd");
				var subCdRef1 = $(thisTarget).data("sub-cd-ref1");
				var subCdRef2 = $(thisTarget).data("sub-cd-ref2");
				
				var paramData = {"usrOptCd": usrOptCd, "usrOptMstCd": usrOptMstCd};
				
				//AJAX 설정
				var ajaxObj = new $.osl.ajaxRequestAction(
						{"url":"/stm/stm3000/stm3000/saveStm3001UsrOptInfo.do", "loadingShow":true}
						,paramData);
				
				//AJAX 전송 성공 함수
				ajaxObj.setFnSuccess(function(data){
					if( data.errorYn == "N" ){
						//화면 리로드
						location.reload();
						//변경 값 적용
						$("#usrCurrentLangCd > img").attr("src","/media/flags/"+subCdRef2);
						$(thisTarget).children(".kt-nav__link-text").text(subCdRef1);
						
						//언어 코드 수정
						$.osl.langCd = subCd;
						
						//active 수정
						$("#usrLangCdList .kt-nav__item.active").removeClass("active");
						$(thisTarget).parent(".kt-nav__item").addClass("active");
						
						//영역 초기화
						$.osl.initHeaderClear();
						//헤더 다시 불러오기
						$.osl.initHeader();
					}
					
					//$.osl.toastr(data.message);
					
				});
				
				//AJAX 전송
				ajaxObj.send();
			}
			/**
			 *  function 명 	: $.osl.user.usrImgSet
			 *  function 설명	: 사용자 프로필 이미지와 사용자명을 세팅해서 반환한다.
			 * @param paramUsrImgId 사용자 프로필 이미지 ID
			 * @param paramData 사용자 명 또는 Json Object
			 * 			json Object인경우
			 * 			html: 사용자 이미지 우측에 출력하려는 내용 (화면에서 변수 넘길 시 $.osl.escapeHtml 처리 필수)
			 * 			imgSize: 사용자 이미지 사이즈 (sm, md, lg, xl) - sm 기본
			 * 			class:{
			 * 				cardBtn: 최 상위 요소 class
			 * 				cardPic: 사용자 이미지 상위 요소 class
			 * 				usrImg: 사용자 이미지 class
			 * 				cardDetail: 사용자 이미지 우측 내용 상위 요소 class
			 * 				cardName: 우측 내용 class
			 * 			}
			 * 			usrId: 연결될 사용자의 아이디
			 * 
			 * 예제)
			 * 	var paramData =	{
			 * 		html: row.usrNm,
			 * 		imgSize: md,
			 * 		class: {
			 * 			cardBtn: "",
			 * 			cardPic: "",
			 * 			usrImg: "",
			 * 			cardDetail: "",
			 * 			cardName: ""
			 * 		},
			 * 		usrId: ""
			 * 	}
			 */
			,usrImgSet: function(paramUsrImgId, paramData){
				var usrImgId = $.osl.user.usrImgUrlVal(paramUsrImgId);
				
				var cardContent = $.osl.escapeHtml(paramData);
				var imgSize = "osl-symbol--sm";
				
				//연결되는 사용자 아이디
				var usrId = "";
				
				//css
				var cardBtn = ""
					, cardPic = ""
					, usrImg = ""
					, cardDetail = ""
					, cardName = "";
				
				//json object인 경우
				if(typeof paramData == "object"){
					cardContent = paramData["html"];
					imgSize = "osl-symbol--"+$.osl.escapeHtml(paramData["imgSize"]);
					//imgSize가 md인경우 공백
					if(paramData["imgSize"] == "md"){
						imgSize = "";
					}
					
					//각 요소 class
					if(paramData.hasOwnProperty("class")){
						cardBtn = $.osl.escapeHtml(paramData["class"]["cardBtn"]);
						cardPic = $.osl.escapeHtml(paramData["class"]["cardPic"]);
						usrImg = $.osl.escapeHtml(paramData["class"]["usrImg"]);
						cardDetail = $.osl.escapeHtml(paramData["class"]["cardDetail"]);
						cardName = $.osl.escapeHtml(paramData["class"]["cardName"]);
					}
					
					//연결되는 사용자 아이디
					if(paramData.hasOwnProperty("usrId")){
						usrId = paramData.usrId;
					};
				}
				
				var returnStr = 
					'<div class="osl-user-card osl-symbol '+cardBtn+'" data-usr-id="'+usrId+'">'
						+'<div class="symbol symbol-circle '+imgSize+' '+cardPic+'">'
							+'<img class=" '+usrImg+'" src="'+usrImgId+'" onerror="this.src=\'/media/users/default.jpg\'"/>'
						+'</div>'
						+'<div class="osl-user__details '+cardDetail+'">'
							+'<span class="osl-user__name '+cardName+'">'+cardContent+'</span>'
						+'</div>'
					+'</div>';
				
				//cardContent 없는경우 
				if($.osl.isNull(cardContent) || cardContent.replace(/(\s*)/g, "") == ""){
					returnStr = "";
				}
				
				return returnStr;
			}
			/**
			 *  function 명 	: $.osl.user.usrCardSet
			 *  function 설명	: 사용자 카드를 반환한다.(타입에 따라 조직 카드로도 반환)
			 * @param paramType user(default) / dept
			 * @param paramData 표출명 명 또는 Json Object
			 * 			json Object인경우
			 * 			html: 카드 우측에 출력하려는 내용 (화면에서 변수 넘길 시 $.osl.escapeHtml 처리 필수)
			 *			imgView : 아이콘 표출 유무 (default - false)
			 * 			imgSize: 아이콘 사이즈 (sm, md, lg, xl) - sm 기본
			 * 			class:{
			 * 				cardBtn: 최 상위 요소 class
			 * 				cardPic: 사용자 아이콘 상위 요소 class
			 * 				usrImg: 사용자 아이콘 class
			 * 				cardDetail: 사용자 아이콘 우측 내용 상위 요소 class
			 * 				cardName: 우측 내용 class
			 * 			}
			 * 			cardTooltip : card detail 영역에 툴팁 지정하기 위한 메시지
			 * 			usrId: 연결될 사용자의 아이디 - 타입이 조직인 경우, deptId를 넣는다.
			 * @param paramRisk 사용자 리스크 json - 타입이 부서일 땐 불필요
			 *			{
			 *				chgDeptYn : Y/N 부서 이동 여부
			 *				retireYn : Y/N 삭제 여부 -- 퇴직자
			 *			}
			 */
			,usrCardSet: function(paramType, paramData, paramRisk){
				var riskConfig = {
					chgDeptYn : "N",
					retireYn : "N",
				};
				
				if($.osl.isNull(paramType) || ["user", "dept"].indexOf(paramType) == -1){
					paramType = "user";
				}
				
				if($.osl.isNull(paramRisk) || paramType != "user"){
					paramRisk = riskConfig;
				}
				if(!$.osl.isNull(paramRisk) && typeof paramRisk == "object"){
					paramRisk = $.extend({}, riskConfig, paramRisk);
				}
				
				var imgView = false;
				var iconHtml = '';
				
				var cardContent = $.osl.escapeHtml(paramData);
				//json object인 경우
				if(typeof paramData == "object"){
					cardContent = paramData["html"];
					
					if(paramData.hasOwnProperty("imgView")){
						imgView = paramData["imgView"];
					}
				}
				
				//보안 리스크 표출 html
				var riskBadgeHtml = $.osl.getUsrRiskLabel(paramRisk);
				
				var imgSize = "osl-symbol--sm";
				
				//연결되는 사용자 아이디
				var usrId = "";
				
				//css
				var cardBtn = ""
					, cardPic = ""
					, usrImg = ""
					, cardDetail = ""
					, cardName = "";
					
				//cardDetailTooltip
				var cardDetailTooltip = "";
				var cardDetailTooltipStr = "";
				
				//json object인 경우
				if(typeof paramData == "object"){
					cardContent = paramData["html"];
					imgSize = "osl-symbol--"+$.osl.escapeHtml(paramData["imgSize"]);
					//imgSize가 md인경우 공백
					if(paramData["imgSize"] == "md"){
						imgSize = "";
					}
					
					//각 요소 class
					if(paramData.hasOwnProperty("class")){
						cardBtn = $.osl.escapeHtml(paramData["class"]["cardBtn"]);
						cardPic = $.osl.escapeHtml(paramData["class"]["cardPic"]);
						usrImg = $.osl.escapeHtml(paramData["class"]["usrImg"]);
						cardDetail = $.osl.escapeHtml(paramData["class"]["cardDetail"]);
						cardName = $.osl.escapeHtml(paramData["class"]["cardName"]);
					}
					
					//툴팁 존재하는지
					if(paramData.hasOwnProperty("cardTooltip")){
						//1차 언어팩 확인
						cardDetailTooltipStr = $.osl.lang(paramData["cardTooltip"]);
						if($.osl.isNull(cardDetailTooltipStr)){
							//없으면 그냥 넣기
							cardDetailTooltipStr = paramData["cardTooltip"];
						}
						
						//값이 존재하면
						if(!$.osl.isNull(cardDetailTooltipStr)){
							cardDetailTooltip = `
								data-bs-toggle="tooltip" data-toggle="kt-tooltip" data-placement="top" data-bs-custom-class="tooltip-inverse" data-bs-dismiss="click" title="${cardDetailTooltipStr}"
							`;
						}
					}
					
					//연결되는 사용자 아이디
					if(paramData.hasOwnProperty("usrId")){
						if(paramType == "user"){
							usrId = `data-usr-id="${paramData.usrId}"`;
						}
						else{
							usrId = `data-dept-id="${paramData.usrId}"`;
						}
					};
				}
				
				//아이콘 표출인 경우
				if(imgView){
					//사용자 아이콘
					if(paramType == "user"){
						iconHtml = `
							<div class="symbol symbol-circle ${imgSize} ${cardPic}">
								<img class="${usrImg}" src="/media/users/default.jpg" />
							</div>
						`;
					}
					//조직 아이콘
					else{
						iconHtml = `
							<div class="symbol symbol-circle ${imgSize} ${cardPic}">
								<img class="${usrImg}" src="/media/users/default2.jpg" />
							</div>
						`;
					}
				}
				
				var returnStr = `
						<div class="osl-user-card osl-symbol ${cardBtn} osl-evt__user-card" ${usrId}>
							${iconHtml}
							<div class="osl-user__details ${cardDetail}"${cardDetailTooltip}>
								<span class="osl-user__name ${cardName}">
									${riskBadgeHtml}${cardContent}
								</span>
							</div>
						</div>
					`;
				
				//cardContent 없는경우 
				if($.osl.isNull(cardContent) || cardContent.replace(/(\s*)/g, "") == ""){
					returnStr = "";
				}
				
				return returnStr;
			}
			/**
			 *  function 명 	: $.osl.user.usrImgUrlVal
			 *  function 설명	: 사용자 프로필 이미지 Url 세팅
			 * @param paramUsrImgId 사용자 프로필 이미지 ID
			 * @param paramKTAvatar KTAvatar 대상 div의 기본 이미지를 data로 세팅(true, false 기본 false)
			 */
			,usrImgUrlVal: function(paramUsrImgId, paramKTAvatar){
				if($.osl.isNull(paramKTAvatar)){
					paramKTAvatar = false;
				}
				var usrImgId = '/cmm/fms/getImage.do?fileSn=0&atchFileId='+paramUsrImgId+'&time='+new Date().getTime();
				if($.osl.isNull(paramUsrImgId) && !paramKTAvatar){
					//paramKTAvatar 사용일 때, src가 아닌 data에 경로를 넣어야 하는데
					//아래의 defualt.jpg 경로를 직접적으로 넣으면 에러 발생하기 때문에 paramKTAvatar 파라미터 추가 및 조건 추가
					usrImgId = '/media/users/default.jpg';
				}
				
				return usrImgId;
			}
			/**
			 *  function 명 	: $.osl.user.usrInfoPopup
			 *  function 설명	: 사용자 정보 팝업
			 * @param paramUsrId 사용자 ID
			 * @param showSendMsgBtn 메시지 전송 버튼 표출 여부(default true)
			 * @param dataParam 별도 파라미터 전송(외부 팝업일 때 라이선스 아이디 등)
			 */
			,usrInfoPopup: function(paramUsrId, showSendMsgBtn, dataParam){
				if($.osl.isNull(showSendMsgBtn)){
					showSendMsgBtn = true;
				}
				
				if(!$.osl.isNull(paramUsrId) && paramUsrId.replace(/(\s*)/g, "") != ""){
					var data = {
							paramUsrId: paramUsrId,
							paramShowSendMsgBtn : showSendMsgBtn
					};
					
					if(!$.osl.isNull(dataParam)){
						if(typeof dataParam == "object"){
							dataParam = JSON.stringify(dataParam);
						}
						data.dataParam = dataParam;
					}
					
					var options = {
							autoHeight: true,
							modalSize: "lg",
							modalTitle: $.osl.lang("cmm6400.title.main.default"),
							keyboard: true,
							closeConfirm: false,
							class:{
								body:"osl-padding-none"
							}
					};
					
					$.osl.layerPopupOpen('/cmm/cmm6000/cmm6400/selectCmm6400View.do',data,options);
				}
			}
			/**
			 *  function 명 	: $.osl.user.passwordValidate
			 *  function 설명	: 사용자가 입력한 비밀번호 유효성 체크
			 *  			  1. 비밀번호에 사용자 아이디 포함되었는지 체크
			 *  			  2. 비밀번호에 같은 문자가 3자 이상 연속해서 사용되었는지 체크
			 *  			  3. 비밀번호에 연속된 문자열(123, abc 등)이 3자 이상 포함되어있는지 체크
			 * @param inUsrId 입력한 사용자 ID
			 * @param inUsrPw 입력한 사용자 비밀번호
			 */
			,passwordValidate: function(inUsrId, inUsrPw){
				
				if($.osl.isNull(inUsrId)){
					$.osl.alert($.osl.lang("common.user.validate.usrId"), {type:"warning"});
					return true;
				}
				
				if($.osl.isNull(inUsrPw)){
					$.osl.alert($.osl.lang("common.user.validate.usrPw"), {type:"warning"});
					return true;
				}
				
				// 비밀번호에 사용자 아이디가 포함되어있는지 체크
				if(inUsrPw.indexOf(inUsrId) > -1) {
					$.osl.alert($.osl.lang("common.user.validate.usrPwIndexOfUsrId"), {type:"warning"});
					return true;
				}
				
				// 같은 문자열 반복 체크
				var repetRegx = /(\w)\1\1/;
				if(repetRegx.test(inUsrPw)) {
					$.osl.alert($.osl.lang("common.user.validate.usrPwContinue"), {type:"warning"});
					return true;
				}
				
				// 문자열 연속성 체크 - 123, 321, abc, cba
				var continueMatchNum = 3;
				if(!$.osl.continueStrChk(inUsrPw, continueMatchNum)){
					$.osl.alert($.osl.lang("common.user.validate.usrPwContinueMatch",continueMatchNum), {type:"warning"});
					return true;
				}
				
				return false;
			}
			/**
			 *  function 명 	: $.usrMyPagePopUp
			 *  function 설명	: 사용자 개인정보 수정 팝업을 오픈한다.
			 * @param usrId : 로그인한 사용자 아이디
			 */
			,usrMyPagePopUp:function(usrId){
				
				// 마이페이지 팝업 오픈시 사용자 아이디 없을경우
				if($.osl.isNull(usrId)){
					$.osl.alert($.osl.lang("common.user.myPage.error"), {type:"error"});
					return false;
				}
				
				var data = {"usrId":usrId};
				var options = {
						idKey: "prs3000",
						modalSize: 'xl',
						modalTitle: $.osl.lang("usr1000.title.main.default"),
						autoHeight: false,
						closeConfirm: false
					};
				
				$.osl.layerPopupOpen('/usr/usr1000/usr1000/selectUsr1000View.do',data,options);
			}
		}
		/**
		 *  function 명 	: $.osl.ImageInput
		 *  function 설명	: KTImageInput을 사용하여 KTAvatar 생성
		 * @param elemId 이미지 미리보기가 들어가는 객체 아이디
		 * @param options
		 * options = {
		 * 		defaultImg : 기본 이미지 url
		 * 		, imageInputId : .image-input에 해당하는 객체 아이디로 하위의 이벤트를 생성할 경우 전달 필수
		 * 		, changed : function 이미지 변경 되었을 때 발생할 이벤트
		 * 		, canceled : function 이미지 입력 취소되었을 때 발생할 이벤트
		 * 		, removed : function 이미지 제거되었을 때 발생할 이벤트 
		 * }
		 * 
		 * 예시
		 * <div class="image-input image-input-circle mx-auto" id="usrImageDiv" name="usrImageDiv" data-kt-image-input="true" alt="사용자 이미지">
		 * 		<div class="image-input-wrapper w-125px h-125px" id="usrImage" name="usrImage" data-kt-image-input="true"></div>
		 * </div>
		 * 일 때, elemId = usrImage, imageInputId = usrImageDiv 
		 */
		,imageInput: function(elemId, options){
			if($.osl.isNull(elemId)){
				return false;
			}
			
			var defaultImg = $.osl.user.usrImgUrlVal(null, true);
			
			//사용자가 전달한 options이 있으면
			if(!$.osl.isNull(options)){
				//이미지 url
				if(options.hasOwnProperty("defaultImg")){
					defaultImg = options["defaultImg"];
				}
			}

			$("#"+elemId).attr("data-default-img", defaultImg);
			$("#"+elemId).css("background-image", "url("+defaultImg+")");
			$("#"+elemId).parents("div.image-input").css("background-image", "url("+defaultImg+")");
			
			// 이미지 avate 생성
			new KTImageInput.createInstances();
			
			//사용자가 전달한 options이 있으면
			if(!$.osl.isNull(options)){	
				if(options.hasOwnProperty("imageInputId")){
					//입력 가져오기(image-input에 해당하는 element)
					var imageInput = KTImageInput.getInstance($("#"+options.imageInputId)[0]);
					
					//이미지 변경되었을 때
					if(options.hasOwnProperty("changed")){
						if(typeof options.changed == "function"){
							imageInput.on("kt.imageinput.changed", options.changed);
						}
					}
					//이미지 입력 취소되었을 때
					if(options.hasOwnProperty("canceled")){
						if(typeof options.canceled == "function"){
							imageInput.on("kt.imageinput.canceled", options.canceled);
						}
					}
					//이미지 입력 제거되었을 때
					if(options.hasOwnProperty("removed")){
						if(typeof options.removed == "function"){
							imageInput.on("kt.imageinput.removed", options.removed);
						}
					}
				}
			}
		}
		/**
		 *  function 명 	: $.osl.goMenu
		 *  function 설명	: 상단 메뉴 클릭시 메뉴페이지 이동(메뉴 데이터 이동)
		 * @param menuUrl 메뉴 URL
		 * @param menuId 메뉴 ID
		 * @param menuNm 메뉴명
		 * @param menuTypeCd 메뉴 이동 타입
		 */
		,goMenu: function(menuUrl, menuId, menuNm, menuTypeCd){
			if(menuTypeCd != null && menuTypeCd != "" && menuTypeCd == "03"){
				var popupWidth = window.screen.availWidth;
				var popupHeight = window.screen.availHeight;
				window.open(menuUrl,menuNm ,'width='+popupWidth+', height='+(popupHeight-100)+', menubar=no, status=no, toolbar=no, location=no, scrollbars =yes');
			}else{
				document.hideMoveForm.menuUrl.value = menuUrl;
				document.hideMoveForm.menuId.value = menuId;
				document.hideMoveForm.menuNm.value = menuNm;
				document.hideMoveForm.action= "/cmm/cmm9000/cmm9000/selectCmm9000MenuChgView.do";
				document.hideMoveForm.submit();
			}
		}
		/**
		 *  function 명 	: $.osl.goMenu
		 *  function 설명	: 페이지 이동 (메뉴 데이터 미사용)
		 * @param menuUrl 메뉴 URL
		 * @param menuNm 메뉴명
		 */
		,goPage: function(menuUrl, menuNm) {
			document.hideMoveForm.menuUrl.value = menuUrl;
			document.hideMoveForm.menuNm.value = menuNm;
			document.hideMoveForm.action= "/cmm/cmm9000/cmm9000/selectCmm9000PageChgView.do";
			document.hideMoveForm.submit();
		}
		/**
		 * function 명 	: $.osl.goPrjGrp
		 * function 설명	: 프로젝트 그룹 선택 시 페이지 이동
		 * @param prjGrpId 프로젝트 그룹 Id
		 */
		,goPrjGrp: function(prjGrpId){
			document.hideMoveForm.moveType.value = "01";
			document.hideMoveForm.prjGrpId.value = prjGrpId;
			document.hideMoveForm.menuId.value = $("#selMenuId").val();
			document.hideMoveForm.action= "/cmm/cmm9000/cmm9000/selectCmm9000PrjGrpChgView.do";
			document.hideMoveForm.submit();
		}
		/**
		 * function 명 	: $.osl.goPrj
		 * function 설명	: 프로젝트 선택 시 페이지 이동
		 * @param prjGrpId 프로젝트 그룹 Id
		 * @param prjId 프로젝트 Id
		 */
		,goPrj: function(prjGrpId, prjId){
			document.hideMoveForm.moveType.value = "02";
			document.hideMoveForm.prjGrpId.value = prjGrpId;
			document.hideMoveForm.prjId.value = prjId;
			document.hideMoveForm.menuId.value = $("#selMenuId").val();
			document.hideMoveForm.action= "/cmm/cmm9000/cmm9000/selectCmm9000PrjGrpChgView.do";
			document.hideMoveForm.submit();
		}
		/**
		 * function 명 	: $.osl.goPrjMenu
		 * function 설명	: 특정 프로젝트의 특정 메뉴로 이동
		 * @param prjGrpId 프로젝트 그룹 Id
		 * @param prjId 프로젝트 Id
		 */
		,goPrjMenu: function(prjGrpId, prjId, menuId){
			document.hideMoveForm.prjGrpId.value = prjGrpId;
			document.hideMoveForm.prjId.value = prjId;
			document.hideMoveForm.menuId.value = menuId;
			document.hideMoveForm.action= "/cmm/cmm9000/cmm9000/selectCmm9000PageMenuChgView.do";
			document.hideMoveForm.submit();
		},
		/**
		 * function 명 	: $.osl.util
		 * function 설명	: util function
		 */
		util:{
			/**
			 * function 명 	: $.osl.util.initInputNumbers
			 * function 설명	: 현재 로드된 DOM에 있는 input[type=number]에 touchSpin 적용
			 */
			initInputNumbers: function(){
				this.initInputNumber("input[type=number]");
			},
			/**
			 * function 명 	: $.osl.util.initInputNumber
			 * function 설명	: 지정 대상에 touchSpin 적용 (selector 전체 입력 필요 #, . 등)
			 */
			initInputNumber: function(target){
				//input[type=number]에 touchSpin 적용
				var inputNumberList = $(target);
				if(!$.osl.isNull(inputNumberList) && inputNumberList.length > 0){
					$.each(inputNumberList, function(idx, map){
						//readonly인경우 적용 안함
						var readonly = $(map).attr("readonly");
						if(!$.osl.isNull(readonly) || (readonly == true || readonly == "readonly")){
							return true;
						}
						//적용 값 가져오기
						var min = $(map).attr("min") || 0;
						var max = $(map).attr("max") || 9999999;
						var step = $(map).attr("step") || 1;
						var boostat = $(map).attr("boostat") || 5;
						var maxboostedstep = $(map).attr("maxboostedstep") || 10;
						/*
						//정렬 순서
						$(map).TouchSpin({
							buttondown_class: 'btn btn-secondary',
							buttonup_class: 'btn btn-secondary',
							min: parseInt(min),
							max: parseInt(max),
							step: step,
							boostat: boostat,
							maxboostedstep: maxboostedstep,
						});
						*/
					});
				}
			},
			/**
			 * function 명 	: $.osl.util.print();
			 * function 설명	: 해당 페이지 출력
			 */
			print: function(){
				//프로젝트 프린트 설정값
				//var printSet = $.osl.prjSetList[5];
				//존재하면 설정된 값 존재하지않으면 기본값 01
				//var printType = "";
//				if(printSet.prjGrpId == $.osl.selPrjGrpId && printSet.prjId == $.osl.selPrjId){
//					printType = printSet.prjSetVal;
//				}else{
//					printType = "01";
//				}
				
				//인쇄영역 (01: 전체영역, 02: 컨텐츠 영역)
				var printType = "01";
				
				//클릭한 프린트 버튼 요소 가져오기
				var btnPrint = event.target;
				//모든 데이터 테이블 조회
				var index = 0;
				
				// 출력 전 후 판단 하여 차트 라이브러리 별 다른 처리 진행
				// 출력 전
				var onBeforePrint = function(event){
					// 현재 화면에 존재하는 전체 차트 목록 가져오기
					var chartList = $.osl.chart.list;
					
					if(!$.osl.isNull(chartList)){
						// 차트 목록 루프
						for (var id in chartList) {
							//차트를 이미지로 변환
							let instance = chartList[id];
							let chartType = instance.chartType;
							// apex 차트의 경우
							if(chartType == "apex"){
								instance.targetCt.dataURI().then(function(imgURI){
									let parent = instance.el;
									let i = new Image();
									i.style.maxWidth = "100%";
									i.src = imgURI.imgURI;
									$(parent).html(i);
									$(parent).css("min-height","0");
									var start = new Date().getTime();
									while (new Date().getTime() < start + 100);
								});
								// 사이즈 변경 트리거 제거
								$(".resizeTrigger").remove();
							//chartJs의 경우
							}else if(chartType == "chartJs2" || chartType == "chartJs"){
								let parent = instance.targetCt.canvas;
								let i = new Image();
								i.src = parent.toDataURL("image/png");
								$('#'+id).html(i);
								$('#'+id).css("min-height","0");
								var start = new Date().getTime();
								while (new Date().getTime() < start + 100);
							}
						}
					}
				};
				var onAfterPrint = function(event){
					// 현재 화면에 존재하는 전체 차트 목록 가져오기
					var chartList = $.osl.chart.list;
					if(!$.osl.isNull(chartList)){
						//이미지로 변환했던 것 제거하기
						for (var id in chartList) {
							let instance = chartList[id];
							let chartType = chartList[id].chartType;
							// apex 차트의 경우
							if(chartType == "apex"){
								if (instance.tempImage) {
									let parent = instance.targetCt.el;
									delete instance.oldDisplay;
									delete instance.tempImage;
								}
							}else if(chartType == "chartJs2" || chartType == "chartJs"){
								// canvas추가
								$("#"+id).html(instance.targetCt.canvas);
								// 차트 새로 그리기
								instance.targetCt.draw();
							}
						}
					}
				};
				
				//설정값이 전체 영역 프린트 인 경우
				if(printType == "01"){
					var loadCssList = ["/plugins/global/plugins.bundle.css","/plugins/jquery-loading/css/app.css","/plugins/custom/uppy/uppy.min.css","/plugins/custom/jstree/jstree.bundle.css","/plugins/apexcharts/apexcharts.css","/plugins/dragula/dragula.css","/plugins/highlight/styles/ir-black.css","/plugins/flowchart/jquery.flowchart.css","/plugins/bootstrap-progressbar/css/bootstrap-progressbar-3.3.4.min.css","/plugins/gridstack/gridstack.css","/media/logos/favicon.ico","/css/print/style.bundle.css","/css/print/style.osl.css",,"/css/print/style.lg.css","/css/print/navy.css"];
					$(document.body).printThis(
							{	importCSS:false,
								//css 적용되기까지 대기시간
								printDelay:2000,
								loadCSS:loadCssList,
								beforePrint:onBeforePrint,
								afterPrint:onAfterPrint,
							});
					
				//설정값이 컨텐츠 영역인 경우
				}else if(printType == "02"){
					$(document.getElementById("kt_app_content")).printThis(
							{	
								importStyle:true,
								canvas:true,
								importCSS:true,
								loadCSS:loadCssList,
								//css 적용되기까지 대기시간
								printDelay:2000,
							}
						);
				}
			},
			/**
			 * function 명 	: $.osl.util.download();
			 * function 설명	: 해당 페이지 일괄 다운로드
			 */
			download : function(url, data, method){
				if( url && data ){
					$.osl.toastr($.osl.lang("file.message.notMove"));
					// data 는  string 또는 array/object 를 파라미터로 받는다. (object의 value가 array인 경우 배열 표기법 표출 방지 목적 true 옵션 추가)
					data = typeof data == 'string' ? data : jQuery.param(data, true);
					//Form input box 삭제
					try{
						var tagNameInputBox = document.fileDownFrame.downForm.getElementsByTagName('input');
						if(tagNameInputBox.length > 0){
							$.each(tagNameInputBox,function(){
								document.fileDownFrame.downForm.removeChild(document.fileDownFrame.downForm.childNodes[0]);
							});
						}
					}
					catch(err){
						//tagNameInputBox를 못찾는 경우 무시
					}
					
					// 파라미터를 form의  input으로 만든다.
					var inputs = '';
					$.each(data.split('&'), function(){
						var pair = this.split('=');
						inputs = document.createElement("INPUT");
						inputs.type = "hidden";
						inputs.name = pair[0];
						inputs.value = pair[1];
						document.fileDownFrame.downForm.appendChild(inputs);
					});
					// form값 설정
					document.fileDownFrame.downForm.action = url;
					document.fileDownFrame.downForm.method = (method||'post');
					document.fileDownFrame.downForm.submit();
					
					//jQuery('<form action="'+ url +'" method="'+ (method||'post') +'">'+inputs+'</form>')
					//.appendTo($('#tmpFrame')).submit().remove();
				   // $('#tmpFrame').remove();
				}else{
					console.log("non data");
				}
			}
		},
		/**
		 * function 명 	: $.osl.guide;
		 * function 설명	: 가이드 관련 영역
		 * 
		 * guideContents:	osl-guide.js에 들어있는 가이드 상자 데이터
		 * guideFnList:		현재 페이지까지 쌓여있는 가이드 스택(팝업 포함)
		 * guideStack:		가이드 스택 제어 (push - 스택 추가, pop - 스택 제거)
		 * guideDraw:		가이드 상자 그리기
		 */
		guide:{
			guideContents: {},
			guideFnList: [],
			guideStack: {
				push: function(paramSetting) {
					var settings = paramSetting;
					
					//guide 설정 값
					var {open, target, key} = settings;
					
					//target이 있는 경우
					if(target && target.length){
						//가이드 스택 값
						var guideList = $.osl.guide.guideFnList;
						
						var functionName = function() {
							$.osl.alert("현재 페이지의 도움말 내용이 없습니다.", {type: 'info'});
						};
						
						//key값 있는 경우 함수 교체
						if(!$.osl.isNull(key)){
							functionName = function() {
								$.osl.guide.guideDraw(true, target, key);
							};
						}
						
						//가이드 함수 추가
						settings["fn"] = functionName;
						guideList.push(settings);
						
						//스택이 쌓일때 가이드 관리 켜져있으면 제거
						var guideModalTarget = $("#guideModal");
						if(guideModalTarget && guideModalTarget.length){
							guideModalTarget.remove();
						}
					}
				},
				pop : function() {
					//가이드 스택 값
					var guideList = $.osl.guide.guideFnList;
					
					//가이드 제거
					guideList.splice((guideList.length-1),1);
				}
			},
			guideDraw: function() {}
		}
	};
	
	/* osl 추가 메소드 */
	/**
	 *  function 명 	: $.osl.ajaxRequestAction
	 *  function 설명	: AJAX 통신 공통 처리
	 * - ajax통신 옵션은 property에서 배열로 처리
	 * - 로딩 바 기본(통신 완료 퍼센트)
	 * - AJAX통신 중 Background처리가 있는 경우 무조건 async = true(동기) 처리  예) 메일 전송 AJAX
	 * property 옵션
	 * - url
	 * - dataType
	 * - contentType
	 * - async
	 * - cache
	 * - processData
	 * data는 setData로 따로 설정 가능
	 * 예제)
	 * 1. 객체 선언과 동시에 옵션 세팅
	 * var ajaxObj = new $.osl.ajaxRequestAction({
			"url":"<c:url value='/req/req2000/req2000/insertReq2000ReqCommentInfoAjax.do'/>"
			,"contentType":"application/x-www-form-urlencoded; charset=UTF-8"
			,"datatype":"json"
			,"async":false
			,"cache":true
			,"processData":true
			});
	 * 
	 * 2. 객체 선언과 이후 옵션 세팅
	 * //setProperty를 여러번 나누어서 설정해도 상관 없음
	 * var ajaxObj = new $.osl.ajaxRequestAction({
			"url":"<c:url value='/req/req2000/req2000/insertReq2000ReqCommentInfoAjax.do'/>"
			});
		ajaxObj.setProperty({
			"contentType":"application/x-www-form-urlencoded; charset=UTF-8"
			,"datatype":"json"
			,"async":false
			,"cache":true
			,"processData":true
		});
	 * 
	 * 3. data 설정
	 * ajaxObj.setData({"prjId" : prjId, "reqId" : reqId, "reqCmnt" : reqCmnt});
	 * var ajaxObj = new $.osl.ajaxRequestAction({
			"url":"<c:url value='/req/req2000/req2000/insertReq2000ReqCommentInfoAjax.do'/>"
			,"contentType":"application/x-www-form-urlencoded; charset=UTF-8"
			,"datatype":"json"
			,"async":false
			,"cache":true
			,"processData":true}
			,{"prjId" : prjId, "reqId" : reqId, "reqCmnt" : reqCmnt});
	 * 3-1. 객체 선언과 동시에 data 설정
	 * 
	 * 4. AJAX 성공처리 함수 설정
	 * //AJAX 전송 성공 함수
		ajaxObj.setFnSuccess(function(data){
			//코멘트 등록 실패의 경우 리턴
			if(data.saveYN == 'N'){
				$.osl.toastr(data.message);
				return;
			}
			//코멘트 리스트 세팅
			gfnSetData2CommentsArea(data.reqCommentList, "reqCmntListDiv", "BRD");
			//코멘트 입력창 클리어
			$("#reqCmnt").val("");
			$.osl.toastr(data.message);
		});
	 * 
	 * 5. AJAX 에러처리 함수 설정
	 * ajaxObj.fnError(function(xhr, status, err){
	 	
	 	});
	 * 
	 * 6. AJAX 통신 준비, 통신 완료처리 4번과 동일
	 * 
	 * 7. AJAX 통신 시작
	 * ajaxObj.send();
	 * 
	 * 		- 그 외 커스텀 추가 시 내용 삽입 - 
	 * 2016-09-13			최초 작성			진주영
	 * 2016-09-19			수정				진주영
	 */
	$.osl.ajaxRequestAction = function(property,data){
		var deferred= $.Deferred(); //ajax 완료 시점을 알기 위한 지연 변수
		
		//url, data
		this.url = this.data = this.mimeType = "";
		
		// xml, json, script, html
		this.dataType ="json";
		
		//application/x-www-form-urlencoded, multipart/form-data, text/plain
		this.contentType = "application/x-www-form-urlencoded; charset=UTF-8";
		
		//false = 동기, true = 비동기
		this.async = true;
		
		//GET 방식 전달인 경우 IE 캐싱 문제 때문에 false로 설정해야 한다.
		this.cache = "true";
		
		//기본값인 true일 때 객체로 전달된 데이터를 쿼리 문자열로 변환한다. FormData 등 쿼리 문자열 변환이 불가능한 -비 처리된- 데이터를 전달할 때는 false로 설정한다.
		this.processData = "true";
		
		//로딩바 표현 여부
		this.loadingShow = true;
		
		//Success, beforeSend, complete, error에 null값인 경우 빈 Function 삽입
		//$.noop = jQuery에서 제공하는 빈함수 no-op
		this.fnSuccess = this.fnbeforeSend = this.fnComplete = this.fnError = $.noop;

		//함수 setter
		this.setData = function setData(data){
			this.data = data;
		};
		this.setFnSuccess = function setFnSuccess(fnContent){
			this.fnSuccess = fnContent;
		};
		this.setFnBeforeSend = function setFnbeforeSend(fnContent){
			this.fnbeforeSend = fnContent;
		};
		this.setFnComplete = function setFnComplete(fnContent){
			this.fnComplete = fnContent;
		};
		this.setFnError = function setFnError(fnContent){
			this.fnError = fnContent;
		};

		//AJAX 옵션 설정
		this.setProperty = function setProperty(prop){
			if(!$.osl.isNull(prop)){
				this.url = $.osl.isNull(prop['url'])?this.url:prop['url'];
				this.dataType = $.osl.isNull(prop['dataType'])?this.dataType:prop['dataType'];
				this.contentType = $.osl.isNull(prop['contentType'])?this.contentType:prop['contentType'];
				this.async = $.osl.isNull(prop['async'])?this.async:prop['async'];
				this.cache = $.osl.isNull(prop['cache'])?this.cache:prop['cache'];
				this.processData = $.osl.isNull(prop['processData'])?this.processData:prop['processData'];
				this.mimeType = $.osl.isNull(prop['mimeType'])?this.mimeType:prop['mimeType'];
				this.loadingShow = $.osl.isNull(prop['loadingShow'])?true:prop['loadingShow'];
				
				//async 경고
				if($.osl.isNull(prop['async']) && !prop['async']){
					//console.log("async: false를 중단하고 send에서 반환된 객체의 done속성을 사용하세요");
				}
			}
		};

		//생성자
		if(!$.osl.isNull(property)){
			eval(this.setProperty(property));
		}
		if(!$.osl.isNull(data)){
			eval(this.setData(data));
		}
		//AJAX 전송
		this.send = function send(){
			//AJAX 객체 변수
			var obj = this;

			//로딩 show 변수
			var tmp_loadingShow = this.loadingShow;
			
			try{
				//AJAX 호출
				$.ajax({
					type: "POST",
					url: this.url,
					data: this.data,
					contentType: this.contentType,
					async: this.async,
					cache: this.cache,
					processData: this.processData,
					mimeType: this.mimeType,
					beforeSend: function(){
						if(tmp_loadingShow){
							//로딩 게이지 바 출력
							$.osl.showLoadingBar(true);
						}
						
						obj.fnbeforeSend();
					},
					success: function(data, status, xhr) {
						xhr: /*@cc_on false && @*/window.XMLHttpRequest ? 
						function() { return new window.XMLHttpRequest(); } : 
						function() { 
							try { return new window.ActiveXObject("Microsoft.XMLHTTP"); } 
							catch(e) {} 
						}
						try{
							var successFlag = obj.fnSuccess(data, status, xhr);
							if(!$.osl.isNull(successFlag) && !successFlag) {
								return false;
							}
							
							return deferred.resolve(data);
						}catch(e){
							console.log(e);
							console.log("success error: "+e);
							return deferred.reject();
						}
					},
					error: function(xhr, status, err){
						//세션이 만료된 경우
						if(xhr.status == '999'){
							$.osl.alert($.osl.lang("common.error.sessionInvalid"),"error",
									function(){
										document.location.href="/cmm/cmm4000/cmm4000/selectCmm4000View.do?sessionYn=N";
									}
							);
							//3초간 응답 없는경우 강제 redirect
							 setTimeout(function(){
								 document.location.href="/cmm/cmm4000/cmm4000/selectCmm4000View.do?sessionYn=N";
							 },3000);
							return deferred.reject();
						}else if(xhr.status == '998'){
							$.osl.alert($.osl.lang("common.error.nonAuth"),"error");
							if(tmp_loadingShow){
								$.osl.showLoadingBar(false);
							}
							return deferred.reject();
						}else{
							//그 외에 커스텀 에러 처리
							obj.fnError(xhr, status, err);
							if(tmp_loadingShow){
								$.osl.showLoadingBar(false);
							}
							return deferred.reject();
						}
					},
					complete: function(){
						if(tmp_loadingShow){
							$.osl.showLoadingBar(false);
						}
						obj.fnComplete();
					},
				});
			}catch(exception){
				if(tmp_loadingShow){
					$.osl.showLoadingBar(false);
				}
				console.log(exception);
				return deferred.reject();
			}
			
			return deferred.promise();
		};
	};
	
	/**
	 *  function 명 	: $.osl.showLoadingBar
	 *  function 설명	: loading 바를 show/hide 한다.
	 * @param isShow: 로딩바호출 : true , 로딩바숨김 : false
	 * @param config{
	 * 			opacity			: 배경 투명도
	 * 			overlayColor	: 배경 색상
	 * 			type			: v2 (고정)
	 * 			state			: 로딩바 이미지 색상 [brand, metal, light, dark, accent, focus, primary, success, info, waning, danger]
	 * 			message			: 로딩 출력 문구
	 * 			target			: 로딩바 표현 대상 (기본값 = 'page')
	 */
	$.osl.showLoadingBar = function(isShow, paramConfig){
		var defaultConfig = {
				opacity: 0.05,
				overlayColor: '#000000',
				type: 'v2',
				state: 'success',
				message: 'Loading...'
			};
		
		var config = $.extend(defaultConfig, paramConfig);
		
		//target block
		if(!$.osl.isNull(paramConfig) && paramConfig.hasOwnProperty("target") && paramConfig["target"] != "page"){
			//타겟 elem
			var targetObj = $(paramConfig["target"]);
			
			//타겟이 존재하지 않는 경우 전체 block
			if(targetObj.length == 0){
				if(isShow){
					//KTApp.blockPage(config);
				}else{
					setTimeout(function(){
						//KTApp.unblockPage();
					},300);
				}
			}else{
				if(isShow){
					//KTApp.block(paramConfig["target"], config);
				}else{
					setTimeout(function(){
						//KTApp.unblock(paramConfig["target"]);
					},300);
				}
			}
		}else{ //페이지 전체 block
			if(isShow){
				//KTApp.blockPage(config);
			}else{
				setTimeout(function(){
					//KTApp.unblockPage();
				},300);
			}
		}
	};
	
	/**
	 *  function 명 	: $.osl.isNull
	 *  function 설명	:  널 체크
	 * @param sValue
	 * @returns {Boolean}
	 */
	$.osl.isNull = function(sValue)
	{
		//변수 변환에 오류있는 경우 null로 인식
		try{
			if( typeof sValue == "undefined") {
				return true;
			}
			if( String(sValue).valueOf() == "undefined") {
				return true;
			}
			if( sValue == null ){
				return true;
			}
			if( ("x"+sValue == "xNaN") && ( new String(sValue.length).valueOf() == "undefined" ) ){
				return true;
			}
			if( sValue.length == 0 ){
				return true;
			}
			if( sValue == "NaN"){
				return true;
			}
		}catch(e){
			return false;
		}
		return false;
	};
	
	/**
	 *  function 명 	: $.osl.escapeHtml
	 *  function 설명	: &<>'" 문자 치환
	 * @param sValue
	 * @returns {Replace String}
	 */
	$.osl.escapeHtml = function(sValue){
		var rtnValue = sValue;
		//숫자인경우 반환
		if(typeof sValue == "number"){
			return rtnValue;
		}
		try{
			rtnValue =  sValue ? sValue.replace( /[&<>'"]/g,
				function (c, offset, str) {
					if (c === "&") {
						var substr = str.substring(offset, offset + 6);
						if (/&(amp|lt|gt|apos|quot);/.test(substr)) {
							return c;
						}
					}
					return "&" + {
						"&": "amp",
						"<": "lt",
						">": "gt",
						"'": "apos",
						'"': "quot"
					}[c] + ";";
				}
			) : "";
		}catch(error){
			return "";
		}
		
		//br은 태그 복구
		rtnValue = rtnValue.replace(/(&lt;\/br&gt;|&lt;br&gt;|&lt;br\/&gt;|&lt;br \/&gt;)/gi, '<br/>');
		
		return rtnValue;
	};
	
	/**
	 *  function 명 	: $.osl.unEscapeHtml
	 *  function 설명	: (&amp;)|(&lt;)|(&gt;)|(&apos;)|(&quot;)문자 치환 => &<>'" 
	 * @param sValue
	 * @returns {Replace String}
	 */
	$.osl.unEscapeHtml = function(sValue){
		//숫자인경우 반환
		if(typeof sValue == "number"){
			return sValue;
		}
		try{
			return sValue ? sValue.replace( /(&amp;)|(&lt;)|(&gt;)|(&apos;)|(&quot;)]/g,
				function (c, offset, str) {
					return {
						"&amp;": "&",
						"&lt;": "<",
						"&gt;": ">",
						"&apos;": "\"",
						'&quot;': "\'"
					}[c];
				}
			) : "";
		}catch(error){
			return "";
		}
	};

	/**
	 *  function 명 	: $.osl.toastr
	 *  function 설명	: toast 창을 팝업 한다.
	 * @param msg: 내용
	 * @param agument - typeof string: 제목
	 * @param agument - typeof object: 
	 * 					{
	 * 						title: String
	 *  					,type: ['error', 'warning', 'info', 'success'] (default - success)
	 * 					}
	 * 
	 * ex) 단순 내용, 타이틀 toast
	 * $.osl.toastr("message","title");
	 * 
	 * ex) 타입 지정 toast
	 * $.osl.toastr("message",{"title":"title", "type":"warning"});
	 */
	$.osl.toastr = function(msg, agument){
		//기본 타입
		var type = "success";
		//값이 없는 경우 공백
		var title = "";
		var targetConfig = {
				"closeButton": false,
				"debug": false,
				"newestOnTop": false,
				"progressBar": true,
				"positionClass": "osl-toastr-top-right",
				"preventDuplicates": false,
				"onclick": null,
				"showDuration": "300",
				"hideDuration": "1000",
				"timeOut": "2000",
				"extendedTimeOut": "1000",
				"showEasing": "swing",
				"hideEasing": "linear",
				"showMethod": "fadeIn",
				"hideMethod": "fadeOut"
		};
		
		//두번째 인자 type 분기
		if(!$.osl.isNull(agument) && typeof agument == "string"){
			//type string인 경우 title로 사용
			title = agument;
		}
		else if(!$.osl.isNull(agument) && typeof agument == "object"){
			//type object인 경우 json으로 해당 요소 가져오기
			//title 있는지 체크
			if(agument.hasOwnProperty("title")){
				title = agument.title;
			}
			
			//깊은 복사
			targetConfig = $.extend(true, targetConfig, agument, agument);
		}
		
		//type 요소 존재 체크
		if(typeof agument == "object" && agument.hasOwnProperty("type")){
			type = agument.type;
		}
		
		toastr.options = targetConfig;
		switch(type){
			case "info":
				toastr.info(msg, title);
			break;
			case "error":
				toastr.error(msg, title);
			break;
			case "warning":
				toastr.warning(msg, title);
			break;
			case "success":
				toastr.success(msg, title);
			break;
		}
	};
	
	/**
	 *  function 명 	: $.osl.alert
	 *  function 설명	: alert 창을 팝업 한다. (window.alert)
	 * @param title			alert 제목
	 * @param options		alert 옵션
	 * 			text		alert 내용
	 * 			type		경고창 type [error, warning, info, success, question]
	 * 			position	[top, bottom, center, top-right, top-left, bottom-right, bottom-left]
	 * 			showConfirmButton	경고 창 버튼 유무 (defatul-false)
	 * 			timer		자동 close 시간
	 * @param callbackFn	alert ok 버튼 클릭 시 발생하는 이벤트
	 */
	$.osl.alert = function(title, options, callbackFn){
		var defaultConfig = {
			title: title,
			icon: 'info',
			position: 'center',
			showConfirmButton: true,
			timer: 0,
			confirmButtonText: $.osl.lang("label.check"),
			confirmButtonAriaLabel: $.osl.lang("label.check"),
			cancelButtonText:$.osl.lang("common.alert.cancel"),
			cancelButtonAriaLabel: $.osl.lang("common.alert.cancel"),
			customClass:{
				confirmButton: "btn btn-capsule btn-info"
			}
		};
	
		//option에 type 있는 경우 icon에 추가
		//기본 confirmButton도 icon과 통일
		if(options != null && options.hasOwnProperty("type")){
			options["icon"] = options["type"];
			if(options["type"] == "error"){
				options["type"] = "danger";
			}
			if(!options.hasOwnProperty("customClass")){
				options["customClass"] = {};
			}
			options["customClass"]["confirmButton"] = "btn btn-capsule btn-"+options["type"];
			delete options["type"];
		}
		//option에 confirmButton 관련 클래스가 있으면
		if(options != null && options.hasOwnProperty("confirmButton")){
			if(!options.hasOwnProperty("customClass")){
				options["customClass"] = {};
			}
			options["customClass"]["confirmButton"] = options["confirmButton"];
			delete options["confirmButton"];
		}
		
		//options setting
		options = $.extend(true, defaultConfig, options);
		
		swal.fire(options).then(function(result){
			if(typeof callbackFn == "function"){
				callbackFn(result);
			}
		});
		
		//버튼에 focus가 되어있는 경우가 있으므로 해제
		//(스타일 상 자동 focus 되어있으면 버튼이 없는 것처럼 보이는 경우 발생 + 어떨 땐 자동 focus 안된 경우도 있어 통일을 위해)
		$(".swal2-actions button").blur();
	};
	
	/**
	 *  function 명 	: $.osl.confirm
	 *  function 설명	: 버튼이 있는 alert 창을 팝업한다. (window.confirm)
	 * @param msg			alert 내용
	 * @param optoins		alert 옵션
	 * 						-title					팝업 제목
	 * 						-confirmButtonText		팝업 ok 버튼 문구
	 * 						-cancelButtonText		팝업 cancle 버튼 문구
	 * 						-denyButtonText			팝업 deny 버튼 문구
	 * 						-showDenyButton		팝업 deny 버튼 표출 여부
	 * 						-type					경고창 type ['error', 'warning', 'info', 'success', 'question'] (default - warning)
	 * @param callbackFn	
	 */
	$.osl.confirm = function(msg,options,callbackFn){
		//msg가 없는 경우 공백
		if($.osl.isNull(msg)){
			msg = "";
		}
		
		//기본 변수
		var defaultValue = {
				"title": $.osl.lang("common.alert.title")
				,"confirmButtonText": $.osl.lang("label.check")
				,"cancelButtonText": $.osl.lang("common.alert.cancel")
				,"denyButtonText" : $.osl.lang("common.alert.deny")
				,"showDenyButton": false
				,"showCancelButton": true
				,"allowOutsideClick": false
				,"text": msg
				,"icon": 'warning'
				,"customClass" :{ "confirmButton" : "btn btn-capsule btn-primary"
										,"denyButton" : "btn btn-capsule btn-point2"
										,"cancelButton" : "btn btn-capsule btn-secondary"
									}
		}
		
		//options value extend
		if(!$.osl.isNull(options)){
			$.extend(defaultValue, options, defaultValue);
		}

		//option에 html체크 있는경우 추가
		if(options != null && options.hasOwnProperty("html")){
			if(options.html === true){
				defaultValue["html"] = msg;
			}
		}
		
		//option에 type 있는 경우 icon에 추가
		//기본 confirmButton도 icon과 통일
		if(options != null && options.hasOwnProperty("type")){
			defaultValue["icon"] = options["type"];
			if(options["type"] == "error"){
				options["type"] = "danger";
			}
			if(!options.hasOwnProperty("customClass")){
				options["customClass"] = {};
			}
			defaultValue["customClass"]["confirmButton"] = "btn btn-sm m-0 btn-"+options["type"];
		}
		//option에 confirmButton 관련 클래스가 있으면
		if(options != null && options.hasOwnProperty("confirmButton")){
			if(!options.hasOwnProperty("customClass")){
				options["customClass"] = {};
			}
			defaultValue["customClass"]["confirmButton"] = options["confirmButton"];
			delete options["confirmButton"];
		}
		
		//option에 제3 버튼 사용 값이 들어온 경우
		if(options != null && options.hasOwnProperty("showDenyButton")){
			if(options["showDenyButton"] === true){
				defaultValue["showDenyButton"] = true;

				if(options.hasOwnProperty("denyButtonText")){
					defaultValue["denyButtonText"] = options["denyButtonText"];
				}
				/*
				defaultValue.customClass = {
						confirmButton: 'swal2-confirm swal2-styled',
						cancelButton: 'swal2-cancle swal2-styled',
						denyButton: 'swal2-deny swal2-styled',
				}
				*/
			}
		}
		
		//sweet alert action
		swal.fire(defaultValue).then(function(result) {
			if(typeof callbackFn == "function"){
				callbackFn(result);
			}
		});
		
		//버튼에 focus가 되어있는 경우가 있으므로 해제
		//(스타일 상 자동 focus 되어있으면 버튼이 없는 것처럼 보이는 경우 발생 + 어떨 땐 자동 focus 안된 경우도 있어 통일을 위해)
		$(".swal2-actions button").blur();
	};
	
	/**
	 * Date Format Function
	 * @param f
	 * @param type = null or true
	 * 		UTC로 저장된 컬럼인 경우 null
	 * 		그 외 지역 시간으로 저장된 컬럼인 경우 true
	 * @returns
	 */
	//getTime to date
	Date.prototype.format = function(f,type) {
		if (!this.valueOf()) return " ";
		if($.osl.isNull(type)){type = true;}
	 
		var weekName = $.osl.lang("date.datepicker.days");
		var d = this;

		//GMT와 현재 시스템의 지역 시간차를 분으로 나타낸다.
		var gmtOffset = new Date().getTimezoneOffset();
		
		
		//UTC 시간을 구할 경우 GMT 차이를 더해준다.(-9)
		if(!$.osl.isNull(type) && type == 'UTC' && !$.osl.isNull(gmtOffset)){
			//차이값을 빼준다.
			d.setMinutes(d.getMinutes()+(gmtOffset));
		}
		//한국 시 설정인 경우 GMT 차이를 빼준다.(-9)
		else if($.osl.isNull(type) && type != true && !$.osl.isNull(gmtOffset)){
			//차이값을 빼준다.
			d.setMinutes(d.getMinutes()-(gmtOffset));
		}

		return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|ms|a\/p)/gi, function($1) {
			switch ($1) {
				case "yyyy": return d.getFullYear();
				case "yy": return (d.getFullYear() % 1000).zf(2);
				case "MM": return (d.getMonth() + 1).zf(2);
				case "dd": return d.getDate().zf(2);
				case "E": return weekName[d.getDay()];
				case "HH": return d.getHours().zf(2);
				case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
				case "mm": return d.getMinutes().zf(2);
				case "ss": return d.getSeconds().zf(2);
				case "ms": return d.getMilliseconds().zf(3);
				case "a/p": return d.getHours() < 12 ? $.osl.lang("date.moment.relativeTime.am") : $.osl.lang("date.moment.relativeTime.pm");
				default: return $1;
			}
		});
	};
	String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
	String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
	Number.prototype.zf = function(len){return this.toString().zf(len);};
	
	/**
	 * function 명 	: $.osl.showLoading 
	 * function 설명	: Ajax로 트랜잭션시 사용할 loading 바를 show/hide 한다.
	 * @param isShow: 로딩바호출 : true , 로딩바숨김 : false
	 * @param data{
	 * 			targetObj: 대상 $ : body (default)
	 * 	
	 */
	$.osl.showLoading = function(isShow,data){
		//기본 대상 body
		var $targetObj = $("body");
		var message = "";
		var background = "rgba(0, 0, 0, 0.21)";
		var custom = null;
		
		if(!$.osl.isNull(data)){
			//대상 값 세팅
			if(data.hasOwnProperty("target") && !$.osl.isNull(data.target)){
				$targetObj = $(data.target);
			}
			
			//출력 메시지 있는 경우 세팅
			if(data.hasOwnProperty("message") && !$.osl.isNull(data.message)){
				message = data.message;
			}	
			
			//배경색상 세팅
			if(data.hasOwnProperty("background") && !$.osl.isNull(data.background)){
				background = data.background;
			}	
			
			//사용자 정의
			if(data.hasOwnProperty("custom") && !$.osl.isNull(data.custom)){
				custom = data.custom;
			}	
		}
		//false일때 body에 로딩 없는경우 전체 로딩바 닫기
		if(!isShow && !$("body").hasClass("busy-load-active")){
			$(".busy-load-active").busyLoad("hide");
		}
		else if(isShow){
			$targetObj.busyLoad("show", {
				custom:custom,
				image: "/media/etc/loading.gif",
				text: message,
				textPosition:"bottom",
				maxSize:"100px",
				minSize:"60px",
				containerClass:"loading-fixed",
				background:background
			});
		}
		else{
			//해당 객체 로딩 지우기
			$targetObj.busyLoad("hide");
		}
	};
	
	/**
	 *  function 명 	: $.osl.byteCalc
	 *  function 설명	: byte 용량을 받아서 형 변환 후 리턴해주는 함수
	 * @param bytes
	 * @param className
	 * @returns {String} 변환 값
	 */
	$.osl.byteCalc = function(bytes, className){
		if(bytes < 0){
			return 0+" <span class='"+className+"'>bytes</span>";
		}
		var bytes = parseInt(bytes);
		var s = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB'];
		var e = Math.floor(Math.log(bytes)/Math.log(1024));
	   
		if(e == "-Infinity") return "0"+ "<span class='"+className+"'>" + s[0] + "</span>" ; 
		else 
		return (bytes/Math.pow(1024, Math.floor(e))).toFixed(2)+ "<span class='"+className+"'>" + s[e] + "</span>" ; 
	};
	
	/**
	 * 	function 명 	: $.osl.layerPopupOpen
	 *  function 설명	: 레이어 팝업을 호출한다.
	 * @param url		: 모달창 내용 ajax url
	 * @param data		: 모달창 ajax에 전달할 data
	 * @param opt		: 모달창 옵션
	 * @opt
	 * 			modalSize		: 모달 창 크기 [xl, lg, md, sm]
	 * 			backdrop		: 모달 창 영역 외에 클릭으로 모달 창 닫기 여부 [true - default(static), false]
	 * 			keyboard		: 키보드 ESC 버튼으로 모달 창 닫기 여부
	 * 			showLoading		: 모달 창 오픈시 로딩화면 여부
	 * 			closeConfirm	: 모달 창 닫기 클릭 했을때 닫을건지 경고창 여부
	 * 			idKeyDuple		: 같은 모달 창 중복 팝업 여부 (권장 하지 않음, 변수 중복 문제 등)
	 * 			idKey			: 모달 창을 오픈한 객체(같은 모달 중복 팝업 방지) 
	 * 			focus			: open modal auto focusing
	 * 			class			: header, body, footer에 추가 class 선언
	 * @param guideKey	: 모달창 가이드 key (가이드 없는 경우 생략)
	 */
	$.osl.layerPopupOpen = function(url, data, opt, guideKey){
		//모달창 오픈
		return modal_popup(url, data, opt, guideKey);
	};
	
	/**
	 * 	function 명 	: $.osl.layerPopupClose
	 *  function 설명	: 최상위 레이어 팝업을 닫는다.
	 *  param callbackFn : 팝업을 닫은 뒤 실행할 로직
	 */
	$.osl.layerPopupClose = function(callbackFn){
		//모달창 강제 닫기
		modalCloseFlag = true;
		$("div.close:eq(0)").click();
		
		if(typeof callbackFn == "function"){
			callbackFn();
		}
	};
	
	/**
	 * 	function 명 	: $.osl.layerWindowEvtList
	 *  function 설명	: 레이어 팝업이 닫힐 때 제거될 이벤트 타입 및 함수 보관
	 */
	$.osl.layerWindowEvtList = {};
	/**
	 * 	function 명 	: $.layerCreateWindowEvt
	 *  function 설명	: 레이어 팝업이 닫힐 때 제거될 이벤트 타입 및 함수 보관
	 *  parameter modalId : 모달 아이디
	 *  parameter type : 윈도우 이벤트 타입 명
	 *  parameter fn : 이벤트 함수
	 */
	$.osl.layerCreateWindowEvt = function(modalId, type, fn){
		if(!$.osl.layerWindowEvtList.hasOwnProperty(modalId)){
			$.osl.layerWindowEvtList[modalId] = {};
		}
		if(!$.osl.layerWindowEvtList[modalId].hasOwnProperty(type)){
			$.osl.layerWindowEvtList[modalId][type] = [];
		}
		//등록된 함수가 없으면
		if($.osl.layerWindowEvtList[modalId][type].indexOf(fn) == -1){
			$.osl.layerWindowEvtList[modalId][type].push(fn);
		}
	};
	/**
	 * 	function 명 	: $.osl.layerCloseWindowEvt
	 *  function 설명	: 레이어 팝업이 닫힐 때 이벤트 제거
	 *  parameter modalId : 모달 아이디
	 */
	$.osl.layerCloseWindowEvt = function(modalId){
		if(!$.osl.layerWindowEvtList.hasOwnProperty(modalId)){
			return false;
		}
		$.each($.osl.layerWindowEvtList[modalId], function(type, fns){
			$.each(fns, function(num, fn){
				window.removeEventListener(type, fn);
				delete $.osl.layerWindowEvtList[modalId];
			});
		});
	};

	/**
	 * 	function 명 	: $.favoritesEdit
	 *  function 설명	: 즐겨찾기 아이콘 클릭 시 발생 이벤트
	 */
	$.osl.favoritesEdit = function(e, thisObj){
		//링크 이벤트 중지
		e.preventDefault();
		//상위 서브메뉴 닫힘 이벤트 중지
		e.stopPropagation();
		
		//fvr 정보
		var fvrId = $(thisObj).data("fvr-id");
		var fvrType = $(thisObj).data("fvr-type");
		var fvrNm = $(thisObj).siblings("span").text();
		var fvrData1 = $(thisObj).data("fvr-data1");
		var fvrData2 = $(thisObj).data("fvr-data2");
		var fvrData3 = $(thisObj).data("fvr-data3");
		var fvrData4 = $(thisObj).data("fvr-data4");
		var fvrData5 = $(thisObj).data("fvr-data5");
		var fvrData6 = $(thisObj).data("fvr-data6");
		
		//즐겨찾기 추가 유무
		var activeFlag = $(thisObj).hasClass("osl-favorites--active");
		
		//사용처리
		var fvrUseCd = "01";
		
		//즐겨찾기 css toggle
		if(activeFlag){
			$(thisObj).removeClass("osl-favorites--active");
			fvrUseCd = "02";
		}else{
			$(thisObj).addClass("osl-favorites--active");
		}
		
		var paramData = {
				fvrId: fvrId
				,fvrType: fvrType
				,fvrUseCd: fvrUseCd
				,fvrData1: fvrData1
				,fvrData2: fvrData2
				,fvrData3: fvrData3
				,fvrData4: fvrData4
				,fvrData5: fvrData5
				,fvrData6: fvrData6
		};
		
		//AJAX 설정
		var ajaxObj = new $.osl.ajaxRequestAction(
				{"url":"/stm/stm2000/stm2000/saveStm2002FavoriteInfo.do", "loadingShow":true}
				,paramData);
		
		//AJAX 전송 성공 함수
		ajaxObj.setFnSuccess(function(data){
			
			if( data.errorYn == "N" ){
				var fvrId = data.fvrId;
				
				$(thisObj).data("fvr-id",fvrId);
				
				
				//즐겨찾기 css toggle
				if(activeFlag){
					//즐겨찾기 메뉴 제거
					$("ul[id=fvrListType"+fvrType+"] li.kt-menu__item i[data-fvr-id="+fvrId+"]").parent("a").parent("li").remove();
					$(".osl-favorites--active[data-fvr-id="+fvrId+"]").removeClass("osl-favorites--active");
				}else{
					//출력 문구
					var fvrTitleStr = "";
					
					//이동 링크
					var fvrTargetEvt = '';
					
					//type별 title
					if(fvrType == "01"){
						fvrTitleStr = 
							'<div class="text-start">'
								+'<i class="fa fa-layer-group"></i>&nbsp;'
								+$.osl.lang("common.menu.top")+' : '
								+$.osl.escapeHtml(fvrData4)+'<br/>'
								+'<i class="fa fa-layer-group"></i>&nbsp;'
								+$.osl.lang("common.menu.upper")+'　 : '
								+$.osl.escapeHtml(fvrData5)+'<br/>'
								+'<i class="fa fa-layer-group"></i>&nbsp;'
								+$.osl.lang("common.menu.name")+' : '
								+$.osl.escapeHtml(fvrNm)
							'/<div>';
						fvrTargetEvt = '$.osl.goMenu(\''+$.osl.escapeHtml(fvrData2)+'\', \''+$.osl.escapeHtml(fvrData1)+'\', \''+$.osl.escapeHtml(fvrNm)+'\', \''+$.osl.escapeHtml(fvrData3)+'\' )';
					}
					else if(fvrType == "02"){
						fvrTitleStr = 
							'<div class="text-start">'
								+$.osl.escapeHtml(fvrNm)
							'/<div>';
						fvrTargetEvt = '$.osl.goPrjGrp(\''+fvrData1+'\')';
					}
					else if(fvrType == "03"){
						fvrTitleStr = 
							'<div class="text-start">'
								+'<i class="fa fa-layer-group"></i>&nbsp;'
								+$.osl.lang("common.name.prjGrp")+': '
								+$.osl.escapeHtml(fvrData3)+'<br/>'
								+'<i class="fa fa-layer-group"></i>&nbsp;'
								+$.osl.lang("common.name.prj")+': '
								+$.osl.escapeHtml(fvrNm)+'<br/>'
							'/<div>';
						fvrTargetEvt = '$.osl.goPrj(\''+fvrData1+'\',\''+fvrData2+'\')';
					}
					
					var $fvrElem =
						$('<li class="kt-menu__item " aria-haspopup="true" data-toggle="kt-tooltip" data-html="true" data-placement="top" data-skin="brand" title="'+$.osl.escapeHtml(fvrTitleStr)+'">'
						+'	<a href="javascript:'+fvrTargetEvt+'" class="kt-menu__link fvrHoverInfo">'
						+'		<i class="flaticon-star osl-favorites--active" data-fvr-id="'+fvrId+'" data-fvr-data1="'+$.osl.escapeHtml(fvrData1)+'"data-fvr-data2="'+$.osl.escapeHtml(fvrData2)+'"data-fvr-data3="'+$.osl.escapeHtml(fvrData3)+'" data-fvr-data4="'+$.osl.escapeHtml(fvrData4)+'" data-fvr-data5="'+$.osl.escapeHtml(fvrData5)+'" data-fvr-data6="'+$.osl.escapeHtml(fvrData6)+'" data-fvr-type="'+fvrType+'" onclick="$.osl.favoritesEdit(event,this)"></i>'
						+'		<span class="kt-menu__link-text">'+$.osl.escapeHtml(fvrNm)+'</span>'
						+'	</a>' 
						+'</li>');
					
					$("#fvrListType"+fvrType).append($fvrElem);
					
					//KT 툴팁 재 호출
					//KTApp.initTooltips();
					OSLApp.initTooltips();
				}
				
			}else{
				$.osl.toastr(data.message);
			}
		});
		
		//AJAX 전송
		ajaxObj.send();
	};
	
	/**
	 * function명 	: $.osl.getMulticommonCodeDataForm [조회 조건 select Box 용]
	 * function설명	: 트랜잭션을 여러번 날리는게 아닌 단일 트랜잭션으로 콤보 코드를 가지고 오는 용도로 사용, 콤보용 공통 코드 및 공통코드명 가져올때 사용
	 * 				  공통코드 테이블을 참조하여 콤보데이터를 가지고 온다.
	 * 				  Ex>
	 * 					  1. json data 세팅
	 *	 						mstCd: 공통코드 마스터 코드
	 *	 						useYn: 사용구분 저장(Y: 사용중인 코드만, N: 비사용중인 코드만, 그 외: 전체)
	 *	 						comboType: 공통코드 가져와 적용할 콤보타입 객체 배열 ( S:선택, A:전체(코드값 A 세팅한 조회조건용), N:전체, E:공백추가, OS:select 객체에 OS="" 값 설정할경우 값 적용,그 외:없음 )
	 *	 						targetObj: 공통코드 적용할 select 객체 ID(*)
	 *							notCdList: 값을 가져와도 표출하지 않을 코드 리스트
	 * 					  2. 대분류 코드를 세팅할 selectBox 객체를 배열로 대분류 코드 순서와 일치하게 세팅하여 보낸다.
	 * 					  3. 사용여부가 사용인지, 미사용인지 아니면 전체를 다 가지고 올지를 판단. (N: 사용하지 않는 것만, Y: 사용하는 것만, 그외: 전체)
	 *					  4. 콤보타입을 전체, 선택, 일반 바로 선택 가능한 상태에 대한 조건을 순서대로 배열로 보낸다. ["S", "A", "E", "JSON",""] S: 선택, A: 전체, E:공백추가 OS:선택 값 selected , JSON:반환 데이터를 json으로 리턴 , 그 외: 없음  
	 *						OS: 해당 select attr에 OS="01" 등과 같이 입력 -> option elements 생성 후 해당 value의 option을 selected한다.
	 *						JSON: 반환 데이터를 기타 사용 할 수 있도록 JSON OBJECT로 제공 
	 *					5. input box data-osl-value="" 지정 후 값 넣는 경우 해당 option selected
	 * @param commonCodeArr		:	공통코드 조회 필요 데이터
	 * var commonCodeArr = [
			{mstCd: "ADM00003",useYn: "Y",targetObj: "#in_usrPositionCd"},
			{mstCd: "ADM00004",useYn: "Y",targetObj: "#in_usrDutyCd"},
			{mstCd: "CMM00001",useYn: "Y",targetObj: "#in_asideShowCd"},
			{mstCd: "CMM00001",useYn: "Y",targetObj: "#in_useCd"}
		]
		$.osl.getMulticommonCodeDataForm(commonCodeArr , true);
	 * @param isAsyncMode	:	동기, 비동기 모드( true: 비동기식 모드, false: 동기식 모드 )
	 * @param licGrpId : 라이선스 그룹 ID, 비로그인 권한으로 접근할 경우 공통코드 정보 조회를 위해 licGrpId 추가 제공
	 */
	
	$.osl.getMulticommonCodeDataForm = function(commonCodeArr , isAsyncMode, licGrpId){
		//AJAX 설정
		var ajaxObj = new $.osl.ajaxRequestAction(
				{"url":"/stm/stm4000/stm4000/selectStm4000MultiCommonCodeList.do"
					,"async":isAsyncMode,"loadingShow":false}
				,{commonCodeArr: JSON.stringify(commonCodeArr), paramLicGrpId : licGrpId});
		//AJAX 전송 성공 함수
		ajaxObj.setFnSuccess(function(data){
			if(data.ERROR_CODE == '-1'){
				$.osl.toastr(data.ERROR_MSG);
				return;
			}
			
			//공통코드 데이터
			var commonCodeList = data.commonCodeList;
			
			//파라미터 대상 object loop
			$.each(commonCodeArr ,function(idx, map){
				//넘겨받은 jsonData 불러오기
				var subList = commonCodeList[map.targetObj];
				
				//콤보박스 세팅 타입
				var comboType = map.comboType;
				
				//select target object
				var $targetObject = $(map.targetObj);
				
				//target empty
				$targetObject.empty();
				
				//그리지 않을 코드 리스트
				var notCdList = [];
				if(map.hasOwnProperty("notCdList") && !$.osl.isNull(map.notCdList)){
					notCdList = map.notCdList;
				}
				
				//target object empty check
				if(!$targetObject.length || $.osl.isNull(subList)){
					return true;
				}
				
				if(comboType == 'A'){
					//옵션키 A 로 세팅한 전 체(검색조건용)
					$targetObject.append("<option value='A'>"+$.osl.lang("common.name.all")+"</option>");
				}
				else if(comboType == 'N'){
					//전체 한줄 추가
					$targetObject.append("<option value=''>"+$.osl.lang("common.name.all")+"</option>");
				}
				else if(comboType == 'S'){
					//선택 한줄 추가
					$targetObject.append("<option value=''>"+$.osl.lang("common.name.select")+"</option>");
				}
				else if(comboType == 'E'){
					//공백 한줄 추가
					$targetObject.append("<option value=''></option>");
				}
				
				//서브 코드 목록
				$.each(subList, function(idx2, subMap){
					//옵션 제외인 코드인 경우 그리지 않는다.
					if(notCdList.indexOf(subMap.subCd) > -1){
						return;
					}
					
					//공통코드 조회 데이터에 서브값 존재한다면 조회해온 서브값과 일치하는 경우에만 옵션 추가
					//서브값 1 존재하는 경우
					if(!$.osl.isNull(commonCodeArr[0].subCdRef1)){
						//서브값 2 존재하는 경우
						if(!$.osl.isNull(commonCodeArr[0].subCdRef2)){
							//서브값 3 존재하는 경우
							if(!$.osl.isNull(commonCodeArr[0].subCdRef3)){
								//서브값 1,2,3 모두 존재하는 경우 조회된 1,2,3 데이터와 파라미터 서브값 1,2,3 데이터가 모두 일치하는 경우에 옵션추가
								if(commonCodeArr[0].subCdRef1 == subMap.subCdRef1 && commonCodeArr[0].subCdRef2 == subMap.subCdRef2 && commonCodeArr[0].subCdRef3 == subMap.subCdRef3){
									$targetObject.append("<option value='" + subMap.subCd + "' data-sub-cd-ref1='"+subMap.subCdRef1+"' data-sub-cd-ref2='"+subMap.subCdRef2+"' data-sub-cd-ref3='"+subMap.subCdRef3+"'>" + subMap.subCdNm + "</option>");
								}
							}
							//서브값 1, 서브값 2만 존재하는 경우 조회된 서브값 1,2 데이터와 파라미터 서브값 1,2 데이터가 모두 일치하는 경우에만 옵션 추가
							else{
								if(commonCodeArr[0].subCdRef1 == subMap.subCdRef1 && commonCodeArr[0].subCdRef2 == subMap.subCdRef2){
									$targetObject.append("<option value='" + subMap.subCd + "' data-sub-cd-ref1='"+subMap.subCdRef1+"' data-sub-cd-ref2='"+subMap.subCdRef2+"' data-sub-cd-ref3='"+subMap.subCdRef3+"'>" + subMap.subCdNm + "</option>");
								}
							}
						}
						//서브값 1만 존재하는 경우 조회된 서브값 1 데이터와 파라미터 서브값 1 데이터가 일치하는 경우에만 옵션 추가
						else{
							if(commonCodeArr[0].subCdRef1 == subMap.subCdRef1){
								$targetObject.append("<option value='" + subMap.subCd + "' data-sub-cd-ref1='"+subMap.subCdRef1+"' data-sub-cd-ref2='"+subMap.subCdRef2+"' data-sub-cd-ref3='"+subMap.subCdRef3+"'>" + subMap.subCdNm + "</option>");
							}
						}
					}
					//파라미터로 넘어온 서브값 없다면 옵션추가
					else {
						$targetObject.append("<option value='" + subMap.subCd + "' data-sub-cd-ref1='"+subMap.subCdRef1+"' data-sub-cd-ref2='"+subMap.subCdRef2+"' data-sub-cd-ref3='"+subMap.subCdRef3+"'>" + subMap.subCdNm + "</option>");
					}
				});
				
				//comboType이 상관 없이 값이 있으면 selected 지정
				var selVal = $targetObject.data("osl-value");
				//기존 값이 null인경우 선택 안함
				if(!$.osl.isNull(selVal)){
					var $seledObj = $targetObject.children('option[value='+selVal+']');
					
					if($seledObj.length > 0){
						$seledObj.attr('selected','selected');
					}
				}
			});
		});
		
		//AJAX 전송
		return ajaxObj.send();
	}
	
	/**
	 * function 명 	: $.osl.setDataFormElem
	 * function 설명	: json데이터로 온 객체(Json 형식 단건 list 아님)를 키와 FORM 안의 ID값을 찾아
	 * 				  자동으로 데이터를 세팅하는 메서드.
	 * 				  부모 obj 안에 포함되어 있는 폼엘레먼트들도 type을 체크하여 라디오 버튼을 제외하고는 밸류를 세팅한다.
	 * @param json 	: json info(단건)
	 * @param formId : Form ID
	 * @param matchKey (ArrayList) : 해당하는 Key값만 매치해서 값을 세팅한다.
	 * 
	 * 사용 예) $.osl.setDataFormElem($.osl.user.userInfo,"frReq1001", ["usrNm","email","telno","deptName","deptId"])
	 */
	$.osl.setDataFormElem = function(jsonObj, formId, matchKey){
		if(jsonObj != null && Object.keys(jsonObj).length > 0){
			var form = $("#"+formId);
			if(form.length > 0){
				try{
					$.each(jsonObj, function(key, val){
						//해당 폼에서 key값을 가진 element 찾기
						var targetElem = form.find("#"+key);
						if(targetElem.length > 0){
							//matchKey에 내용이 있는 경우 해당 key값만 세팅
							if(!$.osl.isNull(matchKey) && matchKey.length > 0){
								if(matchKey.indexOf(key) == -1){
									return true;
								}
							}
							
							//elemType
							var elemType = targetElem.attr("type");
							//elemTagName
							var elemTagNm = targetElem.prop('tagName').toLowerCase();
							
							 //textarea인경우
							if(elemTagNm == "textarea"){
								if(!$.osl.isNull(val)){
									targetElem.text(val.replace(/(<\/br>|<br>|<br\/>|<br \/>)/gi, '\r\n'));
								}
							}
							else{
								//radio의 경우 child가 배열형태가 되므로, child의 타입을 알수 없다.
								if (typeof elemType == "undefined") {
									elemType = targetElem[0].type;
								}
								
								//radio type도 아닌 경우 내용에 덮어쓰기
								if(typeof elemType == "undefined"){
									targetElem.text(val);
									targetElem.val(val);
								}
								else{
									//타입별로 값을 설정한다.
									switch(elemType) {
										case undefined:
										case "button":
										case "reset":
										case "submit":
											break;
										case "select-one":
											if(!$.osl.isNull(val)){
												targetElem.val(val);
											}
											break;
										case "radio":
										case "checkbox":
											targetElem[0].checked = (val == 1);
											break;
										case "img":
											targetElem.attr("src",$.osl.user.usrImgUrlVal(val));
											break;
										default :
											if(!$.osl.isNull(val)){
												targetElem.val(val);
											}
											break;
									}
								}
							}
						}
					});
				}catch(error){
					//오류 있는 경우 skip
				}
			}
		}
	}
	
	/**
	 * function 명 	: $.osl.editorSetting
	 * function 설명	: targetId Elemenet에 summernote 생성
	 * 
	 * @param	targetId: summernote 사용 Object (#제외)
	 * @param	config: 해당 form에 주입된 validate 등 옵션
	 * 
	 */
	$.osl.editorSetting = function(targetId, config){
		var targetObj = $("#"+targetId);
		var rtnEditObj = {};
		
		if(targetObj.length > 0){
			//target
			var container = targetObj.parents(".modal");
			if(container.length == 0){
				container = targetObj;
			}
			
			var langStr = $.osl.langCd == 'en' ? 'en-US' : 'ko-KR';
			
			var defaultConfig = {
				container: container,
				lang: langStr,
				height: null,
				maxHeight: null,
				minHeight: 150,
				disabledEditor: false,
				disableResizeEditor: true,
				dialogsInBody: true,
				dialogsFade: true,
				airMode:false,
				disableDragAndDrop: true,
				codeviewFilter: true,
				callbacks: {
					onChange: function(contents, $editable) {
						targetObj.val(targetObj.summernote('isEmpty') ? "" : contents);
						if(!$.osl.isNull(config) && config.hasOwnProperty("formValidate") &&  !$.osl.isNull(config.formValidate)){
							if(config.formValidate){
								config.formValidate.elements.targetObj;
							}
						}
					}
				}
			};
			var targetConfig = null;
			
			//toolbar 설정 default 제외 커스터마이징을 위한 로직
			//toolbar 개인설정이 존재하지 않는 경우
			if($.osl.isNull(config.toolbar)){
				targetConfig = $.extend(true, defaultConfig, config);
			//존재할 경우 깊은 복사 후 설정된 toolbar 값을 복사 object에 추가
			}else{
				targetConfig = $.extend(true, defaultConfig, config);
				targetConfig.toolbar = config.toolbar;
			}
			
			//요구사항 내용 editor
			var summernoteObj = targetObj.summernote(targetConfig);
			
			//입력된 값 넣기
			if(!$.osl.isNull(targetObj.val())){
				targetObj.summernote('code',targetObj.val());
			}

			//display:none 제외하고 visibility hidden 처리
			targetObj.show();
			targetObj.css({visibility: "hidden", height: 0});
			
			//에디터 disabled 적용
			if(targetConfig.disabledEditor){
				targetObj.summernote('disable');
			}
			
			//해당 textarea 숨기기
			targetObj.addClass("osl-elem-hide");
			targetObj.attr("editabled",true);
			
			//contextMenu 세팅
			KTMenu.createInstances();
			
			rtnEditObj = {id: targetId, target: summernoteObj, element: targetObj[0], config: targetConfig};
		}
		return rtnEditObj;
	}
	
	/**
	 * function 명 	: $.osl.formDataToJsonArray
	 * function 설명	: 해당 폼에서 자동으로 폼값을 가져와 FormData()에 세팅 (객체 name값을 key값으로 사용, name없는 경우 id값으로 대체)
	 * @attr
	 * - input box -	title -> 항목 명(attribute)
	 *					value -> 항목 값(attribute)
	 *					id	  -> 항목 필드명(attribute)
	 *					type  -> 항목 타입(attribute)
	 *					data-modify-set	-> 01- 이력 저장 항목[기본값], 02- 이력 저장 안함
	 *					data-opt-target	-> 분류 : 01 - 보안티켓, 02 - 기본항목, 03 - 템플릿, 04 - 템플릿 항목 값, 05 - 정보자산, 06 - 보안로그서버, 07 - 보안로그 하위서버
	 *										,08 - 키워드,	09 - 보안로그 ( REQ00016 및 req1000Service, cmm7000Service 수정)
	 *					data-opt-type		-> (-1) - 입력 값 그대로 전송,(REQ00007 참고 및 req6000Service 수정)
	 *												 01 - 기본 , 02- 공통코드(data-cmm-code 속성 값 필요), 
	 *												 03 - 첨부파일, 04 - 사용자(data-opt-type이 요구사항일 때 data-hidden-id로 사용자 id 값 전달 필요), 
	 *												 05 - 분류, 06 - 조직, 07 - 배포계획, 08 - 프로세스
	 *					data-opt-type-sub -> data-opt-type이 04일 때 필수, (REQ00017 참고) 
	 *												00 아이디, 01 이름, 02 연락처, 03 이메일, 04 조직명
	 *												//TODO 
	 *												05 기관 06 이미지
	 *					data-cmm-code	-> 공통코드
	 *					data-opt-flow-Id	-> 작업흐름 Id
	 *					data-opt-lang		-> 항목 명 언어팩 코드
	 *					data-hidden-id 	-> 같이 보낼 hidden 값 id
	 *					data-hidden-value -> 같이 보낼 hidden 값 (data-hidden-id와 같이 사용 불가)
	 *					data-hidden-key -> optNm 대신 Map 조회 key 값(data-opt-target이 요구사항이고 data-opt-type이 사용자가 아닐때 data-hidden-id 사용시 필요)
	 *					data-elem-type	-> 항목 타입(공통코드 FLW00003참고)
	 *												(-1) password 비밀번호
	 *												01 text 텍스트박스 	02 textarea 텍스트영역 	03 checkbox 체크박스
	 *												04 date 날짜		 	05 datetime 일시				06 number 숫자				07 checklist 체크리스트
	 *												//TODO
	 *												08 daterange 기간 	09 alarmset 알림설정 		10 alarmrange 알림기간				11 comcode 공통코드
	 *					data-essential-item -> 양식 아이템 중 서비스 아이템과 관련된 항목
	 *					data-item-code -> 양식 아이템 구분 코드(01~16)
	 *					data-item-cls-code -> 양식 아이템 분류 코드(01 내용아이템, 02 접수아이템)
	 *					data-item-regex-cd -> 양식 유효성 검사 구분
	 * @param formId	값을 가져올 폼 Id
	 * @param use		formData로 사용할지, JSON으로 반환할지 true or false (기본 true로, formData로 받는다)
	 */
	$.osl.formDataToJsonArray = function(formId, use){
		var fd;
		var useFormData = true; //기본
		if(!$.osl.isNull(use)){
			useFormData = use;
		}
		
		if(useFormData){
			fd = new FormData();
		}else{
			fd = {};
		}
		
		var form = $("#"+formId);
		if(form.length > 0){
			try{
				var elements = form.find("input[name][type!=color], select[name], textarea[name], div.osl-evt__template-item[name], div.osl-evt__template-item:has(.osl-evt__template-item--check-item)");
				
				$.each(elements, function(index, element){
					var elemKey = element.name;
					//div 때문에
					if($.osl.isNull(elemKey)){
						elemKey = $(element).attr("name");
					}
					//name값이 없다면 id 값으로 대체
					if($.osl.isNull(elemKey)){
						elemKey = element.id;
					}
					//div 때문에
					if($.osl.isNull(elemKey)){
						elemKey = $(element).attr("id");
					}

					//id값이 없는 경우 skip
					if($.osl.isNull(elemKey)){
						return true;
					}
					
					//항목 작업흐름
					var optFlowId = $(element).data("optFlowId");
					//없을 경우 공백
					if($.osl.isNull(optFlowId)){
						optFlowId = "";
					}
					
					//항목 타겟
					var chgDetailOptTarget = $(element).data("optTarget");
					
					//항목 타겟 없는경우 normal
					if($.osl.isNull(chgDetailOptTarget)){
						chgDetailOptTarget = "00";
					}
					//정보자산 입력인 경우
					if($("#paramTplClsType").val() == "01"){
						chgDetailOptTarget = "05";
					}
					//항목 타입
					var chgDetailOptType = $(element).data("optType");
					
					//항목 타입 없는경우 normal
					if($.osl.isNull(chgDetailOptType)){
						chgDetailOptType = "01";
					}
					
					//항목 서브 코드
					var chgDetailOptSubCd = $(element).data("optTypeSub");
					//항목 서브 코드 없는 경우 normal
					if($.osl.isNull(chgDetailOptSubCd)){
						if(chgDetailOptType == "04" || chgDetailOptType == "06"){
							chgDetailOptSubCd = "00";
						}else{
							chgDetailOptSubCd = "";
						}
					}
					
					//항목 공통코드
					var chgDetailCommonCd = $(element).data("cmmCode");
					
					//항목 공통코드 없는경우 공백
					if($.osl.isNull(chgDetailCommonCd)){
						chgDetailCommonCd = "";
					}
					
					//항목명 언어코드
					var optLangCd = $(element).data("optLang");
					
					//항목명 언어코드가 없을 때
					if($.osl.isNull(optLangCd)){
						//객체 앞 label 태그 안의 span 태그의 data-lang-cd 가져오기
						optLangCd = $(element).siblings("label").find("span[data-lang-cd]").data("langCd");
					
						//그래도 없으면 공백
						if($.osl.isNull(optLangCd)){
							optLangCd = "";
						}
					}
					
					//히든 id가 가진 값
					var optHiddenVal = "";
					if($(element)[0].hasAttribute("data-hidden-id")){
						optHiddenVal = $("#"+$(element).data("hiddenId")).val();
						//없을 경우 //data-hidden-value확인
						if($.osl.isNull(optHiddenVal)){
							optHiddenVal = $(element).data("hiddenValue");
							
							//그래도 없을 경우 공백
							if($.osl.isNull(optHiddenVal)){
								optHiddenVal = "";
							}
						}
					}
					
					if(chgDetailOptType == "01"){
						//입력값 정보만 가져온다고 하면
						optHiddenVal = "";
					}
					
					//히든 key 값
					var optHiddenKey = $(element).data("hiddenKey");
					//없을 경우 elemKey 와 동일 - 단 선택 값 유형이 사용자가 아닐 때
					if($.osl.isNull(optHiddenKey)){
						if(chgDetailOptType != "04"){
							optHiddenKey = elemKey;
						}else{
							optHiddenKey = "";
						}
					}
					//히든값 존재하는 경우
					else{
						//양식은 id로 찾음
						optHiddenVal = $("#"+optHiddenKey).val();
						//기본항목은 name으로 찾음
						if($.osl.isNull(optHiddenVal)){
							optHiddenVal = $("[name="+optHiddenKey+"]").val();
						}
					}
					//그래도 값이 없으면
					if($.osl.isNull(optHiddenVal)){
						optHiddenVal = "";
					}
					if($.osl.isNull(optHiddenKey)){
						optHiddenKey = "";
					}
					
					
					//결과값에 포함시키지 않는 경우 제외
					var modifySetCd = $(element).data("modifySet");
					
					//수정 이력 저장 구분 값 없는경우 01
					if($.osl.isNull(modifySetCd)){
						modifySetCd = "01";
					}
					
					//항목 유형
					var elemType = $(element).data("elemType");
					
					//없는 경우 기본 값 text 텍스트박스로 지정
					if($.osl.isNull(elemType)){
						if(chgDetailOptType == "01" || chgDetailOptType == -1){
							//기본 또는 입력값 그대로 전송일 때에만
							elemType = "text";
						}else{
							elemType = "";
						}
					}
					
					//양식 존재하면 체크 위해 넣어둘 정보 변수
					var itemInfo = null;
					
					//양식 항목인 경우
					if($(element).hasClass("osl-evt__template-item")){
						itemInfo = $.osl.templateForm.data.item($(element), true)["dataList"][0];
					}
					
					//여기서는 itemInfo로 값을 가져오지 않는다.
					//-------------------
					//양식 항목 아이디
					var tplItemId = $(element).attr("id");
					if($.osl.isNull(tplItemId)){
						tplItemId = "";
					}
					//양식 서비스 필수 항목
					var essentialItem = $(element).data("essentialItem");
					//없으면 02
					if($.osl.isNull(essentialItem)){
						essentialItem = "02";
					}
					
					//양식 아이템 구분 코드
					var itemCode = $(element).data("itemCode");
					//없으면
					if($.osl.isNull(itemCode)){
						if($(element).hasClass("osl-evt__template-item--check-list")){
							//체크리스트이므로 강제
							//TPL00003
							itemCode = "08";
						}
						else{
							itemCode = "";
						}
					}else{
						//단순 표출 영역이면
						if(itemCode == "01"){
							itemInfo["itemNm"] = "단순 텍스트 표출";
							optLangCd = "template.item.label.onlyTextPrintArea";
						}
					}
					
					//양식 아이템 분류 코드
					var itemClsCd = $(element).data("itemClsCode");
					//없으면
					if($.osl.isNull(itemClsCd)){
						itemClsCd = "01";
					}
					
					//양식 유효성 검사 코드
					var itemRegexCd = $(element).data("itemRegexCd");
					//없으면
					if($.osl.isNull(itemRegexCd)){
						itemRegexCd = "";
					}
					//-------------------
					
					/* jsonData 세팅 */
					//개체 항목 명 (title)
					var eleTitle = element.title;
					//양식 항목 존재하면
					if(itemInfo != null){
						//eleTitle = $(element).parent().find(".osl-evt__grid-stack-item-label").text().trim();
						eleTitle = itemInfo["itemNm"];
					}
					
					//개체 항목 명 없는경우 id값이 항목 명
					if($.osl.isNull(eleTitle)){
						eleTitle = $(element).siblings("label").find("span[data-lang-cd]").text().trim();
						//값이 없을 때, 부모가 input-group이면,
						if($.osl.isNull(eleTitle) && $(element).parent().hasClass("input-group")){
							eleTitle = $(element).parent().siblings("label").find("span[data-lang-cd]").text().trim();
						}
						
						//data-opt-target이 02(기본항목)일 때만
						if(chgDetailOptTarget == "02"){
							//그래도 없으면 상단에서 찾기
							if($.osl.isNull(eleTitle)){
								eleTitle = $(element).parent().siblings("label").text().trim();
							}
						}
						//그래도 없으면 키값으로 대체
						if($.osl.isNull(eleTitle)){
							eleTitle = elemKey;
						}
					}
					
					//개체 값(value)
					var eleValue = element.value;
					var tplItemOptValListInfo = [];
					var tplReqUsrListInfo = [];
					
					//양식 정보가 존재하면
					if(itemInfo != null){
						if(itemInfo["itemCode"] == "01"){
							eleValue = $(element).html().trim();
						}
						//체크리스트인 경우
						else if(itemInfo["itemCode"] == "08"){
							eleValue = null;
							//값은 없으나, 리스트 만들기
							tplItemOptValListInfo = itemInfo["tplItemOptValListInfo"];
						}
						//서비스 항목의 사용자 정보인 경우
						else if(itemInfo["itemCode"] == "09" && itemInfo["tplEssentialItem"] == "01"){
							//서비스 항목의 기간 정보 찾아오기
							var dateElem = form.find(".osl-evt__grid-stack-item.osl-evt__service-widget[data-item-code='06']").find(".osl-evt__template-item");
							var dateRange = dateElem.val().split(" ~ ");
							
							//리스트로 전달
							tplReqUsrListInfo = itemInfo["tplItemSevUsrListInfo"];
							if(tplReqUsrListInfo.length > 0){
								$.each(tplReqUsrListInfo, function(r, row){
									row["itemStDtm"] = dateRange[0];
									row["itemEdDtm"] = dateRange[1];
								});
							}
							
							//값은 첫번째 값으로 전달
							try{
								eleValue = tplReqUsrListInfo[0]["usrId"];
							}catch(e){
								eleValue = null;
							}
						}
						//첨부파일일 경우
						else if(itemInfo["itemCode"] == "13"){
							if(!$.osl.isNull($.osl.file.list[tplItemId])){
								eleValue = $.osl.file.list[tplItemId].targetUppy.getState().meta.atchFileId;
							}
						}
						else{
							eleValue = eleValue.replace(/\n/gi,'<br/>');
						}
					}
					//양식 정보가 아닐 때
					else{
						//라디오인 경우
						if(element.type == "radio"){
							eleValue = $("#"+formId+" [name='"+elemKey+"']:checked").val();
							//라디오 아무것도 선택된 것이 없으면 undefined
							if($.osl.isNull(eleValue)){
								eleValue = '';
							}
						}
						
						//div 때문에
						if($.osl.isNull(element.value) && element.tagName.toLowerCase() == "div") {
							eleValue = $(element).html();
						}
						
						eleValue = eleValue.replace(/\n/gi,'<br/>');
					}
					
					//체크 박스인경우 checked로 값 판별
					if(element.type == "checkbox" && elemType == "checkbox"){ 
						eleValue = (element.checked)?"01":"02";
					}
					
					var elemTopTitle = "";
					//체크 리스트인경우 checked로 값 판별
					if(element.type == "checkbox" && elemType == "checkList"){
						eleValue = (element.checked)?"01":"02";

						//체크 리스트의 체크박스 이름
						var checkboxNm = $(element).siblings("label").text();
						
						eleTitle = checkboxNm;
						
						//개체 항목 명 없는경우 id값이 항목 명
						if($.osl.isNull(checkboxNm)){
							eleTitle = elemKey;
						}
						
						//체크리스트의 elemKey 는 optChkList으로 사용
						elemKey = "optChkList";
						
						//체크리스트의 기본항목 명
						elemTopTitle = $(element).parents().siblings("label").find("span").text();
						if($.osl.isNull(elemTopTitle)){
							elemTopTitle = "";
						}
					}
					
					//jsonData
					var jsonData = {
						optTopNm : elemTopTitle,
						optNm: eleTitle,
						optVal: eleValue,
						chgDetailOptTarget: chgDetailOptTarget,
						chgDetailOptType: chgDetailOptType, 
						chgDetailOptSubCd: chgDetailOptSubCd, 
						chgDetailCommonCd: chgDetailCommonCd, 
						modifySetCd: modifySetCd, 
						optFlowId: optFlowId, 
						optLang: optLangCd,
						optHiddenVal : optHiddenVal,
						optHiddenKey : optHiddenKey,
						optElemType : elemType,
						tplEssentialItem : essentialItem,
						itemCode : itemCode,
						tplItemClsCd : itemClsCd,
						itemRegexCd : itemRegexCd,
						tplItemId: tplItemId,
						tplItemOptValListInfo: tplItemOptValListInfo,
						tplReqUsrListInfo: tplReqUsrListInfo
					};
					
					if(itemInfo != null){
						//항목의 디바이스인 경우
						if(itemInfo["itemCode"] == "16"){
							jsonData["api01"] = itemInfo["api01"];
							jsonData["api02"] = itemInfo["api02"];
							jsonData["api03"] = itemInfo["api03"];
						}
						
						//최초 생성 시 항목 옵션이 필요하기 때문에
						if(["insert", "update", "copy", "sameTime"].indexOf(itemInfo["configType"]) > -1){
							$.each(Object.keys(itemInfo), function(n, column){
								if(!jsonData.hasOwnProperty(column)){
									jsonData[column] = itemInfo[column];
								}
							});
						}
						
						//항목이 텍스트 영역인 경우
						if(itemInfo["itemCode"] == "03" && typeof(jsonData.itemVal) == "object"){
							jsonData["itemVal"] = jsonData["optVal"];
						}
					}
					
					var rtnVal = JSON.stringify(jsonData);
					//hidden인경우 String, 배포계획, 사용자 제외, optType이 단순 값 전송인경우
					if(chgDetailOptType != "07" && chgDetailOptType != "04" && element.type == "hidden" || chgDetailOptType == -1){
						rtnVal = eleValue;
					}
					
					if(useFormData){
						//라디오인 경우 같은 값이 라디오 수 만큼 들어가므로
						if(element.type == "radio"){
							if(fd.has(elemKey)){
								//이미 존재하면 건너뛰기
								return;
							}
						}
						
						fd.append(elemKey, rtnVal);
					}else{
						//라디오인 경우 같은 값이 라디오 수 만큼 들어가므로
						if(element.type == "radio"){
							if(fd.hasOwnProperty(elemKey)){
								//이미 존재하면 건너뛰기
								return;
							}
						}
						
						if(!fd.hasOwnProperty(elemKey)){
							fd[elemKey] = [];
						}
						
						//hidden인경우 String, 배포계획, 사용자 제외, optType이 단순 값 전송인경우
						if(chgDetailOptType != "07" && chgDetailOptType != "04" && element.type == "hidden" || chgDetailOptType == -1){
							fd[elemKey].push(rtnVal);
						}else{
							fd[elemKey].push(JSON.parse(rtnVal));
						}
					}
					
				});
				
			}catch(error){console.log(error)}
		}
		return fd;
	}
	
	/**
	 * function 명 : $.osl.numberPadding
	 * function 설명 : 지정된 길이만큼 패딩 0 붙여 반환
	 * 
	 * @param number : 숫자
	 * @param size : 패딩 사이즈
	 * @return 패딩 사이즈만큼 0이 붙어 반환된 number 값
	 */
	 $.osl.numberPadding = function (number, size) {
		var numberStr = String(number);
		var returnNumber = numberStr;
		if(numberStr.length < size){
			returnNumber = new Array(size - numberStr.length + 1).join('0') + numberStr;
		}
		
		return returnNumber;
	 }
	
	/**
	 * function 명 	: $.osl.continueStrChk
	 * function 설명	: 입력된 문자열에 연속된 문자(123, abc 등)가 있는지 체크한다.
	 * 
	 * @param	str: 입력 문자열
	 * @param	limit: 연속된 문자열 자리수, 3입력시 123, abc등 3자리 연속된 문자열 체크
	 * @returns 연속된 문자열 체크 결과(boolean)
	 */
	$.osl.continueStrChk = function(str, limit){
		var char1, char2, char3, char4 = 0;

		for (var i = 0; i < str.length; i++) {
			var inputChar = str.charCodeAt(i);

			if (i > 0 && (char3 = char1 - inputChar) > -2 && char3 < 2 && (char4 = char3 == char2 ? char4 + 1 : 0) > limit - 3){
				return false;
			}	
			char2 = char3;
			char1 = inputChar;
		}
		return true;
	}
	
	
	/**
	 * function 명 	: $.osl.datetimeAgo
	 * function 설명	: 현재 시간 기준으로 입력된 시간이 얼마나 경과됬는지를 반환한다.
	 * 
	 * @param	paramDatetime: 입력 문자열
	 * @param	option: 반환 설정 값
	 * 
	 * 	returnTime: 반환 시간 기준 (입력된 기준 시간 값을 반환한다 m - 90분 전, s - 5100초 전)
	 * 			(y - 연도, M - 월, d - 일, h - 시간, m - 분, s - 초)
	 * 			- returnTime 선언시 fullTime 무시
	 * 
	 * 	fullTime: 전체 시간 반환 기준 (입력된 기준 시간이 0보다 큰 경우 전체 시간 값을 반환한다 M이 1개월 이상인경우 "yyyy-MM-dd HH:mm:ss"로 반환)
	 * 			$.osl.datetimeAgo(timestamp, M) -> month : 1인 경우 "yyyy-MM-dd HH:mm:ss"로 반환
	 * 			(y - 연도, M - 월, d - 일, h - 시간, m - 분, s - 초)
	 * 	returnFormat: 시간값 출력 포맷 기준 (기본값: yyyy-MM-dd HH:mm:ss)
	 * @returns 
	 */
	$.osl.datetimeAgo = function(paramDatetime, options){
		var today = new Date();
		var agoTime = new Date() - paramDatetime;
		
		var formatDate = new Date(paramDatetime).format("yyyy-MM-dd HH:mm:ss");
		
		//포맷 타입 설정있는 경우
		if(options.hasOwnProperty("returnFormat")){
			formatDate = new Date(paramDatetime).format(options.returnFormat);
		}
		
		if(!$.osl.isNull(agoTime) && agoTime > 0){
			agoTime = agoTime/1000;
			
			//시간 기준
			var min = 60;
			var hour = (60*min);
			var day = (24*day); 
			
			//경과 초,분,시,일
			var secAgo = parseInt(agoTime);
			var minAgo = Math.floor((agoTime/60));
			var hourAgo = Math.floor((agoTime/(60*60)));
			var dayAgo = Math.floor((agoTime/(60*60*24)));
			
			//몇개월 전
			var agoMonth = new Date(paramDatetime).getMonth();
			var todayMonth = today.getMonth();
			var monthAgo = new Date(new Date().setMonth(todayMonth-agoMonth)).getMonth();
			
			//몇년 전
			var yearAgo = Math.floor(dayAgo/365);
			
			//배열 순서
			var agoTimeStr = ["y","M","d","h","m","s"];
			var agoTimeArr = [yearAgo, monthAgo, dayAgo, hourAgo, minAgo, secAgo];

			//문구 세팅
			var suffixAgo = $.osl.lang("date.agoTime.suffixAgo");
			var agoString = formatDate;
			
			//반환 시간 기준
			if(!$.osl.isNull(options) && options.hasOwnProperty("returnTime")){
				var searchIdx = agoTimeStr.indexOf(options.returnTime);
				if(searchIdx > 0 && agoTimeArr[searchIdx] > 0){
					agoString = $.osl.lang("date.agoTime."+agoTimeStr[searchIdx],agoTimeArr[searchIdx])+" "+suffixAgo;
				}
			}else{
				$.each(agoTimeArr, function(idx, map){
					if(map > 0){
						//전체 시간 반환 기준
						if(!$.osl.isNull(options) && options.hasOwnProperty("fullTime")){
							var searchIdx = agoTimeStr.indexOf(options.fullTime);
							
							//입력 값이 배열에 존재하는지 체크
							if(!$.osl.isNull(searchIdx) && searchIdx >= 0){
								//해당 기준과 큰 값은 전체 출력
								if(searchIdx >= idx){
									agoString = formatDate;
									return false;
								}else{ //작은 값인경우 변환 출력
									agoString = $.osl.lang("date.agoTime."+agoTimeStr[idx],map)+" "+suffixAgo;
									return false;
								}
							}
						}
						//해당 기간 변환
						agoString = $.osl.lang("date.agoTime."+agoTimeStr[idx],map)+" "+suffixAgo;
						return false;
					}
				});
			}
			
			return {
				sec: secAgo,
				min: minAgo,
				hour: hourAgo,
				day: dayAgo,
				month: monthAgo,
				year: yearAgo,
				formatDate: formatDate,
				agoString: agoString
			};
		}
		return {
			sec: 0,
			min: 0,
			hour: 0,
			day: 0,
			month: 0,
			year: 0,
			formatDate: formatDate,
			agoString: formatDate
		};
	};
	
	/*
	* function 명 : setAccounting
	* function 설명 : 회계 처리
	* @param count : 숫자 
	* @param fixed : 소숫점 자리수
	*/
	$.osl.setAccounting = function(count, fixed){
		if($.osl.isNull(fixed)){
			fixed = 0;
		}
		return Number((Number(count)).toFixed(fixed)).toLocaleString("ko-KR");
	};
	
	/*
	* function 명 : getAccounting
	* function 설명 : 회계 처리된 숫자를 재반환
	* @param value 
	*/
	$.osl.getAccounting = function(value){
		return Number(value.replace(/,/gi, ""));
	};
	
	/*
	* function 명 : getFormatAddPlus
	* function 설명 : 최대 자리수 넘어가는 경우 + 붙여서 리턴해주기
	* @param num : 처리할 데이터 
	* @param digits : 최대 표출될 자리 수 
	*/
	$.osl.getFormatAddPlus = function(num, digits) {
		
		//숫자형 캐스팅
		if(typeof num === "string") {
			num = Number(num);
		}
		
		//숫자 아닌경우 빼기
		if (typeof num !== "number" || isNaN(num)) {
			return "";
		}
		
		//자리수 계산 ex) 2자리 수인 경우 99
		var digitsChkNum = Math.pow(10, digits) - 1;
		
		return num > digitsChkNum ? digitsChkNum+'+' : num.toString();
	}
	
	
	/**
	 * function명 	: gfnGetBrowserType
	 * function설명	: 사용자의 브라우저 타입을 체크하여 브라우저 종류를 문자열로 리턴한다.
	 *				브라우저의 체크는 edge, ie, ms계열을 제외한 브라우저(chrome, safari, firefox)로 구분한다.
	 */
	$.osl.getBrowserType = function(){
		// 브라우저 타입
		var browserType = "";
		
		// 사용자가 사용하는 브라우저 정보
		var agent = navigator.userAgent.toLowerCase();
		
		// 브라우저가 엣지일 경우
		if( agent.indexOf("edge") != -1 ){
			browserType = "edge";
		// 브라우저가 크롬, 사파리, 파이어폭스일 경우
		}else if( agent.indexOf("chrome") != -1 || agent.indexOf("safari") != -1 || agent.indexOf("firefox") != -1 ){
			browserType = "notMsBrowser";
		// 브라우저가 IE일경우	
		}else{
			browserType = "ie";
		}
		
		return browserType;
	}
	
	/**
	 * function명 	: storageAvailable
	 * function설명	: 브라우저의 storage 사용이 가능한지 확인한다.
	 * 				  ex) $.osl.storageAvailable('sessionStorage')
	 * 참고			: https://developer.mozilla.org/ko/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
	 */
	$.osl.storageAvailable = function(type){
		var storage;
		try {
			storage = window[type];
			var x = '__storage_test__';
			storage.setItem(x, x);
			storage.removeItem(x);
			return true;
		}
		catch(e) {
			return e instanceof DOMException && (
				// Firefox를 제외한 모든 브라우저
				e.code === 22 ||
				// Firefox
				e.code === 1014 ||
				// Firefox를 제외한 모든 브라우저
				e.name === 'QuotaExceededError' ||
				// Firefox
				e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
				// 이미 저장된 것이있는 경우에만 QuotaExceededError를 확인
				(storage && storage.length !== 0);
		}
		return false;
	};
}));

$(document).ready(function() {
	$.osl.init().done(function(){
		$.osl.isReady = true;
	});
});
