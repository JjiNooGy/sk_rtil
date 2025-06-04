/**
 * OSLCoreWidget
 * 메뉴 별 등록된 위젯 표출 및 이벤트를 세팅
 * (OSLCoreWidgetSetting과 데이터 공유 필요)
 * 대시보드에 그리드 스택을 세팅한다.
 * 
 * @since 2024.02.20
 * @author 안지혜
 * @see
 * ---------------------------------------------------
 * 수정일시		|	수정자	|	내용
 * ---------------------------------------------------
 * 2024.02.20|	안지혜	|	기존 코드 정리 및 구조 변경
 * ---------------------------------------------------
 */
var OSLCoreWidget = function () {
	/* *
	 * Conf0. widgetSize - widgetSize 위젯 크기 목록
	 * Conf1. defaultGridStackOpts - 대시보드 그리드스택 설정 값
	 * Conf2. kindOfWidget - 위젯 종류
	 * Conf3. rangeWidths - 반응형을 위한 default 범위
	 * Conf4. resizeObserver - 대시보드 반응형을 위한 실시간 탐지 객체
	 * 
	 * Params. widgetSettingGridStack - 대시보드 위젯 담아두는 객체
	 * ㄴ key : 대시보드 그리드 스택 영역 id
	 * Params. widgetInfoMap - 위젯 별 정보 보관
	 * ㄴ key : 위젯 id
	 * Params. prevReiszeWidthRange - 반응형 체크를 위해 직전 width 범위 보관
	 * Params. widgetDatas - 위젯 데이터 정보(OSLCoreWidgetSetting에서 전달 받는다)
	 * 
	 * fn00. fnWidgetResize - 대시보드 위젯 반응형 function
	 * fn01. fnWidgetInit - 대시보드 위젯 셋팅
	 * fn02. fnWidgetItemHtml - 위젯 그리기
	 * fn03. fnSetWidgetItem - 위젯 추가(단건)
	 * fn04. fnSetWidgetItems - 위젯 추가(다건)
	 * 
	 * Ajax1. fnGetDshWidgetList 사용 중인 대시보드 위젯 목록 가져오기
	 * */
	
	// Conf0. widgetSize 위젯 크기 목록 - DSH00007
	// DSH00007 동일해야 한다.
	// 가로 X 세로
	const widgetSize = ["2X1", "2X2", "4X1", "4X2", "8X2", "8X4","12X1"];
	
	// Conf1. defaultGridStackOpts - 대시보드 그리드스택 설정 값
	const defaultGridStackOpts = {
			"float" : false,
			animate : true,
			acceptWidgets : false,
			disableOneColumnMode : true,
			oneColumnModeDomSort: false,
			margin: 0,
			marginUnit: "px",
			cellHeight : 225,
			cellHeightThrottle: 100,
			cellHeightUnit : "px",
			disableDrag : true,
			disableResize : true,
			handle : '.osl-widget-handle',
	};
	
	// Conf2. kindOfWidget - 위젯 종류
	// 주의 : content에서 %widgetId%라 되어 있는 부분은 그릴 때 현재 위젯 id로 치환하여 사용
	const kindOfWidget = {
		//key는 관련 메뉴
		//start : 보안행정
		"req1000" : {
			//티켓 생성
			"WGTREQ1000100001" : {
				//size : ["2X1", "4X1", "4X2", "8X2","12X1"],
				size : ["2X1", "4X1"],
				"2X1": {
					//구분자
					callId : "newRequest",
					//boolean default false
					//fullType true이면, 타이틀/새로고침 등 표출 안함
					fullType : true,
					addFullTypeClass : "rounded bg-success",
					//class
					cardClass : "",
					cardBodyClass : "cursor-pointer",
					//string Y, N, D default N, card-title에 wgtGrpNm과 동시 표출 유무
					//Y - 동시 표출, N - wgtGrpNm만 표출, D - label 만 표출
					addLabel: "N",
					//text
					label : `티켓 요청`,
					//class
					icon : ``,
					//html
					toolbar : ``,
					//html
					content : `
					<div class="d-flex flex-stack h-100">
						<div class="my-auto ms-auto">
							<span class="point-label strong text-inverse-success me-4" data-lang-cd="">
								티켓 요청
							</span>
						</div>
					</div>
					`,
					actionFn : function(){
						//위젯
						var widgetId = this.widgetId;
						//대상 위젯
						var thisWidget = $(`.osl-evt__widget-item[gs-id="${widgetId}"]`);
						//위젯 설정 시 이벤트가 호출되면 안되기 때문에 실제 이벤트 지정될 영역
						var targetWidget = thisWidget.find(".osl-evt__widget-card .osl-evt__widget-card-body");
						
						//위젯 세팅 시 정보 바로 보관해두기 위해서
						//현재 요청자
						var usrId = $.osl.user.userInfo.usrId;
						
						//그리드스택
						var gridStackId = thisWidget.closest(".osl-evt__grid-stack-area").attr("id");
						var gridStack = widgetSettingGridStack[gridStackId];
						
						//구분자
						var callId = this.callId;
						
						return {
							//사용하지 않으면 $.noop로 선언
							//위젯 재로드
							reload : $.noop,
							//위젯 추가되고 나서 최초 호출
							init : function(){
								//위젯 자체 클릭 시 티켓 요청 팝업 표출
								targetWidget.off("click").on("click", function(){
									//티켓 요청 팝업
									var data = {
											type : "insert",
											paramTplClsType:"02", //양식 유형 TPL00001 - 01 정보자산, 02 보안, 03 기본항목, 04 보안사고
											paramReqClsType : "01", //티켓 분류 REQ00018 - 01 보안 정책, 02 이상징후, 03 외부, 04 보안사고
											paramTplId : null, //사전 선택 티켓 id
											paramReqUsrId : usrId
									};
									var options = {
											idKey: callId,
											modalTitle: $.osl.lang("tpl1101.title.main.req.insert"),
											modalSize: 'xl',
											closeConfirm: false,
											ftScrollUse: false,
											callback:[{
												targetId: "tpl1101ModalCallbackBtn",
												actionFn: function(thisObj){
													//모든 위젯 초기화
													gridStack.fnRefresh();
												}
											}]
										};
									
									$.osl.layerPopupOpen('/tpl/tpl1000/tpl1100/selectTpl1101View.do',data,options);
								});
							}
						};
					}
				},
				"4X1": {
					//구분자
					callId : "newRequest",
					//class
					cardClass : '', //osl-widget-card--v1
					cardBodyClass : "d-flex flex-row flex-wrap",
					//string Y, N, D default N, card-title에 wgtGrpNm과 동시 표출 유무
					//Y - 동시 표출, N - wgtGrpNm만 표출, D - label 만 표출
					addLabel: "N",
					//text
					label : `티켓 요청`,
					//class
					icon : `far fa-credit-card`,
					//html
					toolbar : ``,
					//html
					content : `
						<div class="d-flex flex-row flex-wrap w-100 align-items-center justify-content-evenly mx-4 my-2 p-2 rounded osl-area-sapphire point-area-hover-g cursor-pointer osl-evt__new-request">
							<i class="point-label weak fas fa-edit osl-me-4"></i>
							<span class="point-label weak" data-lang-cd="">
								신규 신청
							</span>
							<i class="point-label weak fas fa-arrow-right osl-me-4"></i>
							<span class="point-label weak" data-lang-cd="">
								기타 보안 행정 업무 신청
							</span>
						</div>
						<div class="d-table table-layout-fixed w-100 mx-4 osl-evt__ticket--template-area">
							<div class="d-table-cell point-label weak h-100 p-2 text-center">
								<i class="transform-45 fas fa-thumbtack"></i>
								<div class="d-flex flex-wrap align-content-center justify-content-center rounded point-area-hover-g cursor-pointer min-h-85px p-2">
									<span class="" data-lang-cd="">자주 쓰인 양식 4건이 표출됩니다.</span>
								</div>
							</div>
						</div>
					`,
					actionFn : function(){
						//위젯
						var widgetId = this.widgetId;
						
						//대상 위젯
						var thisWidget = $(`.osl-evt__widget-item[gs-id="${widgetId}"]`);
						//위젯 설정 시 이벤트가 호출되면 안되기 때문에 실제 이벤트 지정될 영역
						var targetWidget = thisWidget.find(".osl-evt__widget-card .osl-evt__widget-card-body");
						
						//위젯 세팅 시 정보 바로 보관해두기 위해서
						//현재 요청자
						var usrId = $.osl.user.userInfo.usrId;
						
						//그리드스택
						var gridStackId = thisWidget.closest(".osl-evt__grid-stack-area").attr("id");
						var gridStack = widgetSettingGridStack[gridStackId];
						
						//구분자
						var callId = this.callId;
						
						return {
							//새로고침 버튼 누르면 호출
							reload : function(){
								//가장 많이 사용된 양식 목록 4개 가져오기
								//내가 가장 많이 사용한 것 > 모두가 많이 사용한 것 > 최신 등록 양식
								var topNum = 4;
								//티켓 양식 유형 TPL00001 - 01 정보자산, 02 보안, 03 기본항목, 04 보안성검토, 05 보안 점검
								var tplClsType = "02";
								//티켓 양식 상세 유형 TPL00017 - 01 이상징후, 02 보안 정책
								var tplClsDtlType = "02";
								//티켓 분류 REQ00018 - 01 보안 정책, 02 이상징후, 03 외부
								var reqClsType = "01";
								
								//AJAX 설정
								var ajaxObj = new $.osl.ajaxRequestAction(
										{"url":"/wgt/wgt1000/wgt1100/selectWgt1100GetTplTopListAjax.do", "async":"false"}
										,{"topNum" : topNum, "tplClsType": tplClsType, "tplClsDtlType": tplClsDtlType, "reqClsType": reqClsType});
								//AJAX 전송 성공 함수
								ajaxObj.setFnSuccess(function(data){
									//오류
									if(data.errorYn == "Y"){
										$.osl.alert(data.message,{type: 'error'});
										//모달 창 닫기
										$.osl.layerPopupClose();
									}
									//성공
									else{
										//위젯에서 양식 리스트가 표출될 영역 찾기
										var listArea = thisWidget.find(".osl-evt__ticket--template-area");
										//비우기
										listArea.empty();
										//조회된 양식 목록 넣기
										//양식이 없으면
										if($.osl.isNull(data.tplList)){
											listArea.html(`
												<div class="d-table-row point-label weak h-100 p-2 text-center">
													<i class="transform-45 fas fa-thumbtack"></i>
													<div class="d-flex flex-wrap align-content-center justify-content-center rounded min-h-85px p-2">
														<div class="">
															<span class="" data-lang-cd="">양식이 없습니다.</span>
														</div>
													</div>
												</div>
											`);
										}
										//양식이 있으면
										else{
											$.each(data.tplList, function(rn, info){
												listArea.append(`
													<div class="d-table-cell point-area point-label weak h-100 p-2 text-center">
														<i class="transform-45 fas fa-thumbtack point-area-hover-sibling"></i>
														<div class="d-flex flex-wrap align-content-center justify-content-center rounded point-area-hover-g cursor-pointer min-h-85px p-2 osl-evt__new-request" data-tpl-id="${info.tplId}">
															<div class="">
																<span class="osl-word-break--keep-all">${info.tplNm}</span>
															</div>
														</div>
													</div>
												`);
											});
										}
									}//end 실패/성공
								});
								
								return ajaxObj.send();
							},
							//위젯 추가되고 나서 최초 호출
							init : function(){
								var ajaxObj = this.reload();
								
								//이벤트
								ajaxObj.done(function(){
									//이벤트 추가
									thisWidget.off("click").on("click", ".osl-evt__new-request", function(){
										//티켓 요청 팝업
										var data = {
												type : "insert",
												paramTplClsType:"02", //양식 유형 TPL00001 - 01 정보자산, 02 보안, 03 기본항목, 04 보안사고
												paramReqClsType : "01", //티켓 분류 REQ00018 - 01 보안 정책, 02 이상징후, 03 외부, 04 보안사고
												paramTplId : $(this).data("tpl-id"), //사전 선택 티켓 id
												paramReqUsrId : usrId
										};
										var options = {
												idKey: callId,
												modalTitle: $.osl.lang("tpl1101.title.main.req.insert"),
												modalSize: 'xl',
												closeConfirm: false,
												ftScrollUse: false,
												callback:[{
													targetId: "tpl1101ModalCallbackBtn",
													actionFn: function(thisObj){
														//모든 위젯 초기화
														gridStack.fnRefresh();
													}
												}]
											};
										
										$.osl.layerPopupOpen('/tpl/tpl1000/tpl1100/selectTpl1101View.do',data,options);
									});
								});
								
							}//end init
						};
					}
				},
			},
			//대기
			"WGTREQ1000100002" : {
				size : ["2X1"],
				"2X1": {
					//구분자
					callId : "ticketStay",
					//boolean default false
					fullType : false,
					addFullTypeClass : "",
					//class
					cardClass : '',
					cardBodyClass : '',
					//string Y, N, D default N, card-title에 wgtGrpNm과 동시 표출 유무
					//Y - 동시 표출, N - wgtGrpNm만 표출, D - label 만 표출
					addLabel: "N",
					//text
					label : `접수 대기`,
					//class
					icon : `fas fa-hourglass`,
					//html
					toolbar : ``,
					//html
					content : `
						<div class="h-100 d-flex flex-wrap align-items-center justify-content-end rounded rounded-top-0 osl-area-hover cursor-pointer osl-evt__ticket--explanatory-btn">
							<div class="text-end">
								<div class="point-title me-4 osl-evt__ticket--stay-count">
									999+
								</div>
								<div class="">
									<span class="point-label me-4" data-lang-cd="">
										접수 대기
									</span>
								</div>
							</div>
						</div>
					`,
					actionFn : function(){
						//위젯
						var widgetId = this.widgetId;
						/*
						var refWgtGrpId = this.refWgtGrpId;
						var refWgtId = this.refWgtId;
						var sizeStr = this.sizeStr;
						*/
						var optionKey = this.optionKey;
						console.log(this);
						
						//대상 위젯
						var thisWidget = $(`.osl-evt__widget-item[gs-id="${widgetId}"]`);
						//위젯 설정 시 이벤트가 호출되면 안되기 때문에 실제 이벤트 지정될 영역
						var targetWidget = thisWidget.find(".osl-evt__widget-card .osl-evt__widget-card-body");
						
						//그리드스택
						var gridStackId = thisWidget.closest(".osl-evt__grid-stack-area").attr("id");
						var gridStack = widgetSettingGridStack[gridStackId];
						
						//위젯 세팅 시 정보 바로 보관해두기 위해서
						//현재 요청자
						//var usrId = $.osl.user.userInfo.usrId;
						
						//구분자
						var callId = this.callId;
						
						return {
							//새로고침 버튼 누르면 호출
							reload : function(){
								/**** 검색 조건 ****/
								//대시보드 검색조건 공통
								var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
								
								//위젯의 설정 값 추가
								$.each(optionKey, function(wgtOptKey, map){
									dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
								});
								
								//구분자
								dshSearchParams["callId"] = callId;
								
								/**** 조회 param 합치기 ****/
								dshSearchParams["baseGrp"] = "prjId";
								//dshSearchParams["reqUsrId"] = usrId;
								//REQ00008 01 접수대기 02 처리중 03 반려 04 완료 05 결재반려후 종료 06 중간 종료
								dshSearchParams["reqProType"] = "01";
								//티켓 분류 REQ00018 - 01 보안 정책, 02 이상징후, 03 외부
								dshSearchParams["reqClsType"] = "01";
								//로그 연결 여부 CMM00001 - 01 예, 02 아니오
								dshSearchParams["logLnkCd"] = "02";
								
								/**** 검색 조건 끝 ****/
								
								//AJAX 설정
								var ajaxObj = new $.osl.ajaxRequestAction(
										{"url":"/wgt/wgt1000/wgt1100/selectWgt1100WidgetReloadAjax.do", "async":"false"}
										,dshSearchParams);
								//AJAX 전송 성공 함수
								ajaxObj.setFnSuccess(function(data){
									//오류
									if(data.errorYn == "Y"){
										$.osl.alert(data.message,{type: 'error'});
										//모달 창 닫기
										$.osl.layerPopupClose();
									}
									//성공
									else{
										var ticketStayCnt = data.ticketStayCnt;
										if(Number(ticketStayCnt) > 999){
											ticketStayCnt = "999+";
										}
										
										targetWidget.find(".osl-evt__ticket--stay-count").text(ticketStayCnt);
									}
								});
								
								return ajaxObj.send();
							},
							init : function(){
								//조회
								var ajaxObj = this.reload();
								
								ajaxObj.done(function(){
									//위젯 자체 클릭 시 접수 대기 팝업 표출
									targetWidget.off("click").on("click", function(){
										/**** 검색 조건 ****/
										//대시보드 검색조건 공통
										var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
										
										//위젯의 설정 값 추가
										$.each(optionKey, function(wgtOptKey, map){
											dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
										});
										
										//구분자
										dshSearchParams["callId"] = callId;
										
										/**** 조회 param 합치기 ****/
										dshSearchParams["baseGrp"] = "prjId";
										//dshSearchParams["reqUsrId"] = usrId;
										//REQ00008 01 접수대기 02 처리중 03 반려 04 완료 05 결재반려후 종료 06 중간 종료
										dshSearchParams["reqProType"] = "01";
										//티켓 분류 REQ00018 - 01 보안 정책, 02 이상징후, 03 외부
										dshSearchParams["reqClsType"] = "01";
										//로그 연결 여부 CMM00001 - 01 예, 02 아니오
										dshSearchParams["logLnkCd"] = "02";
										
										/**** 검색 조건 끝 ****/
										
										//공통 팝업 ) 티켓 선택 페이지 호출을 위한 데이터 가공
										/* dataParam = {
											url{} : 데이터 테이블 조회 URL,
											params{} : url 조회 시 params,
											option{} : 데이터 테이블 옵션 설정
														- showBtns[] : 표출할 버튼 목록 (선택사항) 
															["reqDetail"(기본 포함), "reqUpdate", "reqDelete", "reqAccept",
																"reqProcessing", "signApr", "signRjt", "opnRpl", "workEnd", "reqAdd", "reqRemove"]
														- dblClickFnBtn: 더블클릭시 수행할 기능 버튼 (선택사항)
														 -> 없을 시 기본으로 요구사항 관리 메뉴의 더블클릭 로직을 수행 
														 -> showBtns에 입력한 범위 내에서 선태 가능
														- submitBtnCd(T/F) : submit 버튼 표출 유무 (입력 없으면 표출되는것을 기본으로 함)
									} */
										var dataParam = {
												// 데이터 조회 URL
												url : "/wgt/wgt1000/wgt1100/selectWgt1100GetReqListAjax.do",
												//조회 파라미터
												params : dshSearchParams,
												//데이터 테이블 & 팝업 옵션
												option : {
													showBtns : ["reqAccept"],
													submitBtnCd : false, // submit 버튼 표출 유무
												}
										};
										
										var data = {
												type : "list",
												reqType : "01", //티켓
												currentIdKey : callId,
												dataParam : JSON.stringify(dataParam)
										};
										
										var options = {
												idKey: callId,
												modalTitle : "[접수 대기] 보안 티켓 목록",
												closeConfirm: false,
												autoHeight: true,
												modalSize: "xl",
												callback:[{
													targetId : "cmm6206ModalCallbackBtn",
													actionFn : function(thisObj){
														//모든 위젯 초기화
														gridStack.fnRefresh();
													}
												}]
										};
										
										$.osl.layerPopupOpen('/cmm/cmm6000/cmm6200/selectCmm6206View.do',data,options);
									});
								});
							}
						}
					}
				},
			},
			//처리
			"WGTREQ1000100003" : {
				size : ["2X1"],
				"2X1": {
					//구분자
					callId : "ticketProgress",
					//boolean default false
					fullType : false,
					addFullTypeClass : "",
					//class
					cardClass : '',
					cardBodyClass : '',
					//string Y, N, D default N, card-title에 wgtGrpNm과 동시 표출 유무
					//Y - 동시 표출, N - wgtGrpNm만 표출, D - label 만 표출
					addLabel: "N",
					//text
					label : `처리중`,
					//class
					icon : `fas fa-spinner`,
					//html
					toolbar : ``,
					//html
					content : `
						<div class="h-100 d-flex flex-wrap align-items-center justify-content-end rounded rounded-top-0 osl-area-hover cursor-pointer osl-evt__ticket--explanatory-btn">
							<div class="text-end">
								<div class="point-label weak d-flex flex-row flex-wrap gap-2 me-4 osl-evt__ticket--progress-ect-cnt d-none">
									<span class="badge badge-primary p-2 osl-area-not-hover">
										<span class="text-inverse-primary osl-area-not-hover" data-lang-cd="">담당 :</span>
										<span class="text-inverse-primary osl-area-not-hover osl-evt__ticket--progress-usr-cnt">0</span>
									</span>
									<span class="badge badge-navy p-2 osl-area-not-hover">
										<span class="text-inverse-navy osl-area-not-hover" data-lang-cd="">無담당 :</span>
										<span class="text-inverse-navy osl-area-not-hover osl-evt__ticket--progress-non-cnt">0</span>
									</span>
								</div>
								<div class="point-title me-4 osl-evt__ticket--progress-count">
									999+
								</div>
								<div class="">
									<span class="point-label me-4" data-lang-cd="">
										처리중
									</span>
								</div>
							</div>
						</div>
					`,
					actionFn : function(){
						var widgetId = this.widgetId;
						var optionKey = this.optionKey;
						
						//대상 위젯
						var thisWidget = $(`.osl-evt__widget-item[gs-id="${widgetId}"]`);
						//위젯 설정 시 이벤트가 호출되면 안되기 때문에 실제 이벤트 지정될 영역
						var targetWidget = thisWidget.find(".osl-evt__widget-card .osl-evt__widget-card-body");
						
						//그리드스택
						var gridStackId = thisWidget.closest(".osl-evt__grid-stack-area").attr("id");
						var gridStack = widgetSettingGridStack[gridStackId];
						
						//위젯 세팅 시 정보 바로 보관해두기 위해서
						//현재 요청자
						//var usrId = $.osl.user.userInfo.usrId;
						
						//구분자
						var callId = this.callId;
						
						return {
							//새로고침 버튼 누르면 호출
							reload : function(){
								/**** 검색 조건 ****/
								//대시보드 검색조건 공통
								var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
								
								//위젯의 설정 값 추가
								$.each(optionKey, function(wgtOptKey, map){
									dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
								});
								
								//구분자
								dshSearchParams["callId"] = callId;
								
								/**** 조회 param 합치기 ****/
								dshSearchParams["baseGrp"] = "prjId";
								//dshSearchParams["reqUsrId"] = usrId;
								//REQ00008 01 접수대기 02 처리중 03 반려 04 완료 05 결재반려후 종료 06 중간 종료
								dshSearchParams["reqProType"] = "02";
								//티켓 분류 REQ00018 - 01 보안 정책, 02 이상징후, 03 외부
								dshSearchParams["reqClsType"] = "01";
								//로그 연결 여부 CMM00001 - 01 예, 02 아니오
								dshSearchParams["logLnkCd"] = "02";
								
								/**** 검색 조건 끝 ****/
								
								//AJAX 설정
								var ajaxObj = new $.osl.ajaxRequestAction(
										{"url":"/wgt/wgt1000/wgt1100/selectWgt1100WidgetReloadAjax.do", "async":"false"}
										,dshSearchParams);
								//AJAX 전송 성공 함수
								ajaxObj.setFnSuccess(function(data){
									//오류
									if(data.errorYn == "Y"){
										$.osl.alert(data.message,{type: 'error'});
										//모달 창 닫기
										$.osl.layerPopupClose();
									}
									//성공
									else{
										//map으로 전달되며, totalCnt, nonChargerCnt, chargerCnt로 존재
										var ticketIngCnt = data.ticketIngCnt;
										var ticketProgressCnt = ticketIngCnt["totalCnt"];
										if(Number(ticketProgressCnt) > 999){
											ticketProgressCnt = "999+";
										}
										//종합 갯수 표출
										targetWidget.find(".osl-evt__ticket--progress-count").text(ticketProgressCnt);
										//내가 담당인 것과, 처리할 수 있는 미배정 담당자 건수 분리
										targetWidget.find(".osl-evt__ticket--progress-ect-cnt .osl-evt__ticket--progress-usr-cnt").text(ticketIngCnt["chargerCnt"]);
										targetWidget.find(".osl-evt__ticket--progress-ect-cnt .osl-evt__ticket--progress-non-cnt").text(ticketIngCnt["nonChargerCnt"]);
										
										/* *
										 * 2024.03.22 기준 옵션
										 * 1. 내가 요청한 티켓 중 처리중인 티켓 카운트만 보기
										 * ㄴ 아니오이면 요청자 구분 없이 처리중인 티켓 카운트
										 * 2. 내가 처리할 수 있는 요청서만 조회하기
										 * ㄴ 예이면 (1)의 카운트에서 내가 처리할 수 있는 카운트만 표출
										 * 		ㄴ내가 담당인 것과 담당은 아니지만 처리할 수 있는 것 표출
										 * ㄴ 아니오이면 (1)의 카운트와 동일
										 * */
										
										//현재 옵션에 따라 조합 - CMM00001 01 예, 02 아니오
										//authProgressChk : 내가 처리할 수 있는 요청서만 조회하기
										//내가 처리할 수 있는 요청서만 조회한다고 한 경우 - 담당/무담당 카운트 같이 보기
										if(optionKey["authProgressChk"]["wgtOptDefVal"] == "01"){
											targetWidget.find(".osl-evt__ticket--progress-ect-cnt").removeClass("d-none");
										}
										//내가 처리할 수 있는 요청서만 조회하는 것이 아닌 경우 - 담당/무담당 카운트 숨기기
										else{
											targetWidget.find(".osl-evt__ticket--progress-ect-cnt").addClass("d-none");
										}
									}
								});
								
								return ajaxObj.send();
							},
							init : function(){
								//조회
								var ajaxObj = this.reload();
								
								ajaxObj.done(function(){
									//위젯 자체 클릭 시 접수 대기 팝업 표출
									targetWidget.off("click").on("click", function(){
										/**** 검색 조건 ****/
										//대시보드 검색조건 공통
										var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
										
										//위젯의 설정 값 추가
										$.each(optionKey, function(wgtOptKey, map){
											dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
										});
										
										//구분자
										dshSearchParams["callId"] = callId;
										
										/**** 조회 param 합치기 ****/
										dshSearchParams["baseGrp"] = "prjId";
										//dshSearchParams["reqUsrId"] = usrId;
										//REQ00008 01 접수대기 02 처리중 03 반려 04 완료 05 결재반려후 종료 06 중간 종료
										dshSearchParams["reqProType"] = "02";
										//티켓 분류 REQ00018 - 01 보안 정책, 02 이상징후, 03 외부
										dshSearchParams["reqClsType"] = "01";
										//로그 연결 여부 CMM00001 - 01 예, 02 아니오
										dshSearchParams["logLnkCd"] = "02";
										
										/**** 검색 조건 끝 ****/
										
										var dataParam = {
												// 데이터 조회 URL
												url : "/wgt/wgt1000/wgt1100/selectWgt1100GetReqListAjax.do",
												//조회 파라미터
												params : dshSearchParams,
												//데이터 테이블 & 팝업 옵션
												option : {
													showBtns : ["reqProcessing"],
													submitBtnCd : false, // submit 버튼 표출 유무
												}
										};
										
										var data = {
												type : "list",
												reqType : "01", //티켓
												currentIdKey : callId,
												dataParam : JSON.stringify(dataParam)
										};
										
										var options = {
												idKey: callId,
												modalTitle : "[처리중] 보안 티켓 목록",
												closeConfirm: false,
												autoHeight: true,
												modalSize: "xl",
												callback:[{
													targetId : "cmm6206ModalCallbackBtn",
													actionFn : function(thisObj){
														//모든 위젯 초기화
														gridStack.fnRefresh();
													}
												}]
										};
										
										$.osl.layerPopupOpen('/cmm/cmm6000/cmm6200/selectCmm6206View.do',data,options);
									});
								});
							}
						}
					}
				},
			},
			//완료
			"WGTREQ1000100004" : {
				size : ["2X1"],
				"2X1": {
					//구분자
					callId : "ticketSuccess",
					//boolean default false
					fullType : false,
					addFullTypeClass : "",
					//class
					cardClass : '',
					cardBodyClass : '',
					//string Y, N, D default N, card-title에 wgtGrpNm과 동시 표출 유무
					//Y - 동시 표출, N - wgtGrpNm만 표출, D - label 만 표출
					addLabel: "N",
					//text
					label : `처리 완료`,
					//class
					icon : `fas fa-check`,
					//html
					toolbar : ``,
					//html
					content : `
						<div class="h-100 d-flex flex-wrap align-items-center justify-content-end rounded rounded-top-0 osl-area-hover cursor-pointer osl-evt__ticket--explanatory-btn">
							<div class="text-end">
								<div class="point-title me-4 osl-evt__ticket--success-count">
									999+
								</div>
								<div class="">
									<span class="point-label me-4" data-lang-cd="">
										완료
									</span>
								</div>
							</div>
						</div>
					`,
					actionFn : function(){
						var widgetId = this.widgetId;
						var optionKey = this.optionKey;
						
						//대상 위젯
						var thisWidget = $(`.osl-evt__widget-item[gs-id="${widgetId}"]`);
						//위젯 설정 시 이벤트가 호출되면 안되기 때문에 실제 이벤트 지정될 영역
						var targetWidget = thisWidget.find(".osl-evt__widget-card .osl-evt__widget-card-body");
						
						//그리드스택
						var gridStackId = thisWidget.closest(".osl-evt__grid-stack-area").attr("id");
						var gridStack = widgetSettingGridStack[gridStackId];
						
						//위젯 세팅 시 정보 바로 보관해두기 위해서
						//현재 요청자
						//var usrId = $.osl.user.userInfo.usrId;
						
						//구분자
						var callId = this.callId;
						
						return {
							//새로고침 버튼 누르면 호출
							reload : function(){ 
								/**** 검색 조건 ****/
								//대시보드 검색조건 공통
								var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
								
								//위젯의 설정 값 추가
								$.each(optionKey, function(wgtOptKey, map){
									dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
								});
								
								//구분자
								dshSearchParams["callId"] = callId;
								
								/**** 조회 param 합치기 ****/
								dshSearchParams["baseGrp"] = "prjId";
								//dshSearchParams["reqUsrId"] = usrId;
								//REQ00008 01 접수대기 02 처리중 03 반려 04 완료 05 결재반려후 종료 06 중간 종료
								dshSearchParams["reqProType"] = "04";
								//티켓 분류 REQ00018 - 01 보안 정책, 02 이상징후, 03 외부
								dshSearchParams["reqClsType"] = "01";
								//로그 연결 여부 CMM00001 - 01 예, 02 아니오
								dshSearchParams["logLnkCd"] = "02";
								
								/**** 검색 조건 끝 ****/
								
								//AJAX 설정
								var ajaxObj = new $.osl.ajaxRequestAction(
										{"url":"/wgt/wgt1000/wgt1100/selectWgt1100WidgetReloadAjax.do", "async":"false"}
										,dshSearchParams);
								//AJAX 전송 성공 함수
								ajaxObj.setFnSuccess(function(data){
									//오류
									if(data.errorYn == "Y"){
										$.osl.alert(data.message,{type: 'error'});
										//모달 창 닫기
										$.osl.layerPopupClose();
									}
									//성공
									else{
										var ticketSuccessCnt = data.ticketSuccessCnt;
										if(Number(ticketSuccessCnt) > 999){
											ticketSuccessCnt = "999+";
										}
										//갯수 표출
										targetWidget.find(".osl-evt__ticket--success-count").text(ticketSuccessCnt);
									}
								});
								
								return ajaxObj.send();
							},
							init : function(){
								//조회
								var ajaxObj = this.reload();
								
								ajaxObj.done(function(){
									//위젯 자체 클릭 시 완료 팝업 표출
									targetWidget.off("click").on("click", function(){
										/**** 검색 조건 ****/
										//대시보드 검색조건 공통
										var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
										
										//위젯의 설정 값 추가
										$.each(optionKey, function(wgtOptKey, map){
											dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
										});
										
										//구분자
										dshSearchParams["callId"] = callId;
										
										/**** 조회 param 합치기 ****/
										dshSearchParams["baseGrp"] = "prjId";
										//dshSearchParams["reqUsrId"] = usrId;
										//REQ00008 01 접수대기 02 처리중 03 반려 04 완료 05 결재반려후 종료 06 중간 종료
										dshSearchParams["reqProType"] = "04";
										//티켓 분류 REQ00018 - 01 보안 정책, 02 이상징후, 03 외부
										dshSearchParams["reqClsType"] = "01";
										//로그 연결 여부 CMM00001 - 01 예, 02 아니오
										dshSearchParams["logLnkCd"] = "02";
										
										/**** 검색 조건 끝 ****/
										
										var dataParam = {
												// 데이터 조회 URL
												url : "/wgt/wgt1000/wgt1100/selectWgt1100GetReqListAjax.do",
												//조회 파라미터
												params : dshSearchParams,
												//데이터 테이블 & 팝업 옵션
												option : {
													showBtns : ["reqDetail"],
													submitBtnCd : false, // submit 버튼 표출 유무
												}
										};
										
										var data = {
												type : "list",
												reqType : "01", //티켓
												currentIdKey : callId,
												dataParam : JSON.stringify(dataParam)
										};
										
										var options = {
												idKey: callId,
												modalTitle : "[처리 완료] 보안 티켓 목록",
												closeConfirm: false,
												autoHeight: true,
												modalSize: "xl",
												callback:[{
													targetId : "cmm6206ModalCallbackBtn",
													actionFn : function(thisObj){
														//모든 위젯 초기화
														gridStack.fnRefresh();
													}
												}]
										};
										
										$.osl.layerPopupOpen('/cmm/cmm6000/cmm6200/selectCmm6206View.do',data,options);
									});
								});
							}
						}
					}
				},
			},
			//종료
			"WGTREQ1000100005" : {
				size : ["2X1", "4X1"],
				"2X1": {
					//구분자
					callId : "ticketStop",
					//boolean default false
					fullType : false,
					addFullTypeClass : "",
					//class
					cardClass : '',
					cardBodyClass : '',
					//string Y, N, D default N, card-title에 wgtGrpNm과 동시 표출 유무
					//Y - 동시 표출, N - wgtGrpNm만 표출, D - label 만 표출
					addLabel: "N",
					//text
					label : `종료`,
					//class
					icon : `fas fa-stop-circle`,
					//html
					toolbar : ``,
					//html
					content : `
						<div class="h-100 d-flex flex-wrap align-items-center justify-content-end rounded rounded-top-0 osl-area-hover cursor-pointer osl-evt__ticket--explanatory-btn">
							<div class="text-end">
								<div class="point-title me-4 osl-evt__ticket--stop-count">
									999+
								</div>
								<div class="">
									<span class="point-label me-4" data-lang-cd="">
										종료
									</span>
								</div>
							</div>
						</div>
					`,
					actionFn : function(){
						var widgetId = this.widgetId;
						var optionKey = this.optionKey;
						
						//대상 위젯
						var thisWidget = $(`.osl-evt__widget-item[gs-id="${widgetId}"]`);
						//위젯 설정 시 이벤트가 호출되면 안되기 때문에 실제 이벤트 지정될 영역
						var targetWidget = thisWidget.find(".osl-evt__widget-card .osl-evt__widget-card-body");
						
						//그리드스택
						var gridStackId = thisWidget.closest(".osl-evt__grid-stack-area").attr("id");
						var gridStack = widgetSettingGridStack[gridStackId];
						
						//위젯 세팅 시 정보 바로 보관해두기 위해서
						//현재 요청자
						//var usrId = $.osl.user.userInfo.usrId;
						
						//구분자
						var callId = this.callId;
						
						return {
							//새로고침 버튼 누르면 호출
							reload : function(){ 
								/**** 검색 조건 ****/
								//대시보드 검색조건 공통
								var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
								
								//reqProTypeList 만들어 전달
								var reqProTypeList = [];
								
								//위젯의 설정 값 추가
								$.each(optionKey, function(wgtOptKey, map){
									dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
									//reqProTypeList 체크
									//REQ00008 01 접수 요청, 02 처리중, 03 반려, 04 최종 완료, 05 결재 반려 종료, 06 중간 종료
									//접수 반려 표출
									if(wgtOptKey == "reqFinTypeRjtProgress" && map.wgtOptDefVal == "01"){
										reqProTypeList.push("03");
									}
									//결재 반려 후 종료 표출
									if(wgtOptKey == "reqFinTypeSignReject" && map.wgtOptDefVal == "01"){
										reqProTypeList.push("05");
									}
									//중간 종료 표출
									if(wgtOptKey == "reqFinTypeStop" && map.wgtOptDefVal == "01"){
										reqProTypeList.push("06");
									}
								});
								
								//종료 유형
								dshSearchParams["reqProTypeList"] = reqProTypeList;
								
								//구분자
								dshSearchParams["callId"] = callId;
								
								/**** 조회 param 합치기 ****/
								dshSearchParams["baseGrp"] = "prjId";
								//dshSearchParams["reqUsrId"] = usrId;
								//REQ00008 01 접수대기 02 처리중 03 반려 04 완료 05 결재반려후 종료 06 중간 종료
								//end로 입력 시 종료 항목 모두 지정
								dshSearchParams["reqProType"] = "end";
								//티켓 분류 REQ00018 - 01 보안 정책, 02 이상징후, 03 외부
								dshSearchParams["reqClsType"] = "01";
								//로그 연결 여부 CMM00001 - 01 예, 02 아니오
								dshSearchParams["logLnkCd"] = "02";
								
								/**** 검색 조건 끝 ****/
								
								//AJAX 설정
								var ajaxObj = new $.osl.ajaxRequestAction(
										{"url":"/wgt/wgt1000/wgt1100/selectWgt1100WidgetReloadAjax.do", "async":"false"}
										,dshSearchParams);
								//AJAX 전송 성공 함수
								ajaxObj.setFnSuccess(function(data){
									//오류
									if(data.errorYn == "Y"){
										$.osl.alert(data.message,{type: 'error'});
										//모달 창 닫기
										$.osl.layerPopupClose();
									}
									//성공
									else{
										/* *
										 * 2024.03.22 기준 옵션
										 * 1. 접수 반려 종료 표출
										 * ㄴ 아니오이면 접수 반려 종료 카운트 제외
										 * 2. 결재 반려 후 종료 표출
										 * ㄴ 아니오이면 결재 반려 후 종료 카운트 제외
										 * 3. 중간 종료 카운트 표출
										 * ㄴ 아니오이면 중간 종료 카운트 제외
										 * ** 1,2,3 모두 아니오이면 에러 표출
										 * 
										 * 4. 내가 요청한 티켓 중 종료(1,2,3)된 티켓 카운트만 보기
										 * ㄴ 아니오이면 요청자 구분 없이 종료된 티켓 카운트
										 * 5. 내가 종료한 요청서만 조회하기
										 * ㄴ 예이면 (4)의 카운트에서 내가 종료한 요청서 카운트만 표출
										 * ㄴ 아니오이면 (4)와 동일
										 * */
										
										//map으로 전달되며, totalCnt, acceptRejectCnt, signRejectCnt, progressRejectCnt로 전달
										var ticketStopCnt = data.ticketStopCnt;
										var ticketEndCnt = ticketStopCnt["totalCnt"];
										if(Number(ticketEndCnt) > 999){
											ticketEndCnt = "999+";
										}
										//종합 갯수 표출
										targetWidget.find(".osl-evt__ticket--stop-count").text(ticketEndCnt);
									}
								});
								
								return ajaxObj.send();
							},
							init : function(){
								//조회
								var ajaxObj = this.reload();
								
								ajaxObj.done(function(){
									//위젯 자체 클릭 시 종료 팝업 표출
									targetWidget.off("click").on("click", function(){
										/**** 검색 조건 ****/
										//대시보드 검색조건 공통
										var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
										
										//구분자
										dshSearchParams["callId"] = callId;
										
										//reqProTypeList 만들어 전달
										var reqProTypeList = [];
										
										//위젯의 설정 값 추가
										$.each(optionKey, function(wgtOptKey, map){
											dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
											//reqProTypeList 체크
											//REQ00008 01 접수 요청, 02 처리중, 03 반려, 04 최종 완료, 05 결재 반려 종료, 06 중간 종료
											//접수 반려 표출
											if(wgtOptKey == "reqFinTypeRjtProgress" && map.wgtOptDefVal == "01"){
												reqProTypeList.push("03");
											}
											//결재 반려 후 종료 표출
											if(wgtOptKey == "reqFinTypeSignReject" && map.wgtOptDefVal == "01"){
												reqProTypeList.push("05");
											}
											//중간 종료 표출
											if(wgtOptKey == "reqFinTypeStop" && map.wgtOptDefVal == "01"){
												reqProTypeList.push("06");
											}
										});
										
										//종료 유형
										dshSearchParams["reqProTypeList"] = reqProTypeList;
										
										/**** 조회 param 합치기 ****/
										dshSearchParams["baseGrp"] = "prjId";
										//dshSearchParams["reqUsrId"] = usrId;
										//REQ00008 01 접수대기 02 처리중 03 반려 04 완료 05 결재반려후 종료 06 중간 종료
										//end로 입력 시 종료 항목 모두 지정
										dshSearchParams["reqProType"] = "end";
										//티켓 분류 REQ00018 - 01 보안 정책, 02 이상징후, 03 외부
										dshSearchParams["reqClsType"] = "01";
										//로그 연결 여부 CMM00001 - 01 예, 02 아니오
										dshSearchParams["logLnkCd"] = "02";
										
										/**** 검색 조건 끝 ****/
										
										var dataParam = {
												// 데이터 조회 URL
												url : "/wgt/wgt1000/wgt1100/selectWgt1100GetReqListAjax.do",
												//조회 파라미터
												params : dshSearchParams,
												//데이터 테이블 & 팝업 옵션
												option : {
													showBtns : ["reqDetail"],
													submitBtnCd : false, // submit 버튼 표출 유무
												}
										};
										
										var data = {
												type : "list",
												reqType : "01", //티켓
												currentIdKey : callId,
												dataParam : JSON.stringify(dataParam)
										};
										
										var options = {
												idKey: callId,
												modalTitle : "[종료] 보안 티켓 목록",
												closeConfirm: false,
												autoHeight: true,
												modalSize: "xl",
												callback:[{
													targetId : "cmm6206ModalCallbackBtn",
													actionFn : function(thisObj){
														//모든 위젯 초기화
														gridStack.fnRefresh();
													}
												}]
										};
										
										$.osl.layerPopupOpen('/cmm/cmm6000/cmm6200/selectCmm6206View.do',data,options);
									});
								});
							}
						}
					}
				},
				"4X1": {
					//구분자
					callId : "ticketStop",
					//boolean default false
					fullType : false,
					addFullTypeClass : "",
					//class
					cardClass : '',
					cardBodyClass : '',
					//string Y, N, D default N, card-title에 wgtGrpNm과 동시 표출 유무
					//Y - 동시 표출, N - wgtGrpNm만 표출, D - label 만 표출
					addLabel: "N",
					//text
					label : `종료`,
					//class
					icon : `fas fa-stop-circle`,
					//html
					toolbar : ``,
					//html
					content : `
						<div class="d-table table-layout-fixed w-100 h-100">
							<div class="d-table-row">
								<div class="d-table-cell align-middle text-center rounded osl-area-hover cursor-pointer osl-evt__ticket--stop-btn" data-req-pro-type="end">
									<div class="point-title weak osl-evt__ticket--stop-count">
										999+
									</div>
									<div class="">
										<span class="point-label weak" data-lang-cd="">
											Total. 종료
										</span>
									</div>
								</div>
								<div class="d-table-cell align-middle text-center rounded osl-area-hover cursor-pointer osl-evt__ticket--stop-btn" data-req-pro-type="03">
									<div class="point-title weak osl-evt__ticket--stop-accept-reject">
										999+
									</div>
									<div class="">
										<span class="point-label weak" data-lang-cd="">
											접수 반려
										</span>
									</div>
								</div>
							</div>
							<div class="d-table-row">
								<div class="d-table-cell align-middle text-center rounded osl-area-hover cursor-pointer osl-evt__ticket--stop-btn" data-req-pro-type="05">
									<div class="point-title weak osl-evt__ticket--stop-sign-reject">
										999+
									</div>
									<div class="">
										<span class="point-label weak" data-lang-cd="">
											결재 반려 후 종료
										</span>
									</div>
								</div>
								<div class="d-table-cell align-middle text-center rounded osl-area-hover cursor-pointer osl-evt__ticket--stop-btn" data-req-pro-type="06">
									<div class="point-title weak osl-evt__ticket--stop-progress-reject">
										999+
									</div>
									<div class="">
										<span class="point-label weak" data-lang-cd="">
											중간 종료
										</span>
									</div>
								</div>
							</div>
						</div>
					`,
					actionFn : function(){
						var widgetId = this.widgetId;
						var optionKey = this.optionKey;
						
						//대상 위젯
						var thisWidget = $(`.osl-evt__widget-item[gs-id="${widgetId}"]`);
						//위젯 설정 시 이벤트가 호출되면 안되기 때문에 실제 이벤트 지정될 영역
						var targetWidget = thisWidget.find(".osl-evt__widget-card .osl-evt__widget-card-body");
						
						//그리드스택
						var gridStackId = thisWidget.closest(".osl-evt__grid-stack-area").attr("id");
						var gridStack = widgetSettingGridStack[gridStackId];
						
						//위젯 세팅 시 정보 바로 보관해두기 위해서
						//현재 요청자
						//var usrId = $.osl.user.userInfo.usrId;
						
						//구분자
						var callId = this.callId;
						
						return {
							//새로고침 버튼 누르면 호출
							reload : function(){ 
								/**** 검색 조건 ****/
								//대시보드 검색조건 공통
								var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
								
								//reqProTypeList 만들어 전달
								var reqProTypeList = [];
								
								//위젯의 설정 값 추가
								$.each(optionKey, function(wgtOptKey, map){
									dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
									//reqProTypeList 체크
									//REQ00008 01 접수 요청, 02 처리중, 03 반려, 04 최종 완료, 05 결재 반려 종료, 06 중간 종료
									//접수 반려 표출
									if(wgtOptKey == "reqFinTypeRjtProgress" && map.wgtOptDefVal == "01"){
										reqProTypeList.push("03");
									}
									//결재 반려 후 종료 표출
									if(wgtOptKey == "reqFinTypeSignReject" && map.wgtOptDefVal == "01"){
										reqProTypeList.push("05");
									}
									//중간 종료 표출
									if(wgtOptKey == "reqFinTypeStop" && map.wgtOptDefVal == "01"){
										reqProTypeList.push("06");
									}
								});
								
								//종료 유형
								dshSearchParams["reqProTypeList"] = reqProTypeList;
								
								//구분자
								dshSearchParams["callId"] = callId;
								
								/**** 조회 param 합치기 ****/
								dshSearchParams["baseGrp"] = "prjId";
								//dshSearchParams["reqUsrId"] = usrId;
								//REQ00008 01 접수대기 02 처리중 03 반려 04 완료 05 결재반려후 종료 06 중간 종료
								//end로 입력 시 종료 항목 모두 지정
								dshSearchParams["reqProType"] = "end";
								//티켓 분류 REQ00018 - 01 보안 정책, 02 이상징후, 03 외부
								dshSearchParams["reqClsType"] = "01";
								//로그 연결 여부 CMM00001 - 01 예, 02 아니오
								dshSearchParams["logLnkCd"] = "02";
								
								/**** 검색 조건 끝 ****/
								
								//AJAX 설정
								var ajaxObj = new $.osl.ajaxRequestAction(
										{"url":"/wgt/wgt1000/wgt1100/selectWgt1100WidgetReloadAjax.do", "async":"false"}
										,dshSearchParams);
								//AJAX 전송 성공 함수
								ajaxObj.setFnSuccess(function(data){
									//오류
									if(data.errorYn == "Y"){
										$.osl.alert(data.message,{type: 'error'});
										//모달 창 닫기
										$.osl.layerPopupClose();
									}
									//성공
									else{
										/* *
										 * 2024.03.22 기준 옵션
										 * 1. 접수 반려 종료 표출
										 * ㄴ 아니오이면 접수 반려 종료 카운트 제외
										 * 2. 결재 반려 후 종료 표출
										 * ㄴ 아니오이면 결재 반려 후 종료 카운트 제외
										 * 3. 중간 종료 카운트 표출
										 * ㄴ 아니오이면 중간 종료 카운트 제외
										 * ** 1,2,3 모두 아니오이면 에러 표출
										 * 
										 * 4. 내가 요청한 티켓 중 종료(1,2,3)된 티켓 카운트만 보기
										 * ㄴ 아니오이면 요청자 구분 없이 종료된 티켓 카운트
										 * 5. 내가 종료한 요청서만 조회하기
										 * ㄴ 예이면 (4)의 카운트에서 내가 종료한 요청서 카운트만 표출
										 * ㄴ 아니오이면 (4)와 동일
										 * */
										
										//map으로 전달되며, totalCnt, acceptRejectCnt, signRejectCnt, progressRejectCnt로 전달
										var ticketStopCnt = data.ticketStopCnt;
										var ticketEndCnt = ticketStopCnt["totalCnt"];
										if(Number(ticketEndCnt) > 999){
											ticketEndCnt = "999+";
										}
										//종합 갯수 표출
										targetWidget.find(".osl-evt__ticket--stop-count").text(ticketEndCnt);
										//접수 반려, 결재 반려후 종료, 중간 종료 건수 분리
										targetWidget.find(".osl-evt__ticket--stop-accept-reject").text(ticketStopCnt["acceptRejectCnt"]);
										targetWidget.find(".osl-evt__ticket--stop-sign-reject").text(ticketStopCnt["signRejectCnt"]);
										targetWidget.find(".osl-evt__ticket--stop-progress-reject").text(ticketStopCnt["progressRejectCnt"]);
									}
								});
								
								return ajaxObj.send();
							},
							init : function(){
								//조회
								var ajaxObj = this.reload();
								
								ajaxObj.done(function(){
									//위젯 자체 클릭 시 접수 대기 팝업 표출
									targetWidget.off("click").on("click", ".osl-evt__ticket--stop-btn", function(){
										/**** 검색 조건 ****/
										//대시보드 검색조건 공통
										var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
										
										//reqProTypeList 만들rl(end 조건에서만)
										var reqProTypeList = [];
										
										//위젯의 설정 값 추가
										$.each(optionKey, function(wgtOptKey, map){
											dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
											
											//reqProTypeList 체크
											//REQ00008 01 접수 요청, 02 처리중, 03 반려, 04 최종 완료, 05 결재 반려 종료, 06 중간 종료
											//접수 반려 표출
											if(wgtOptKey == "reqFinTypeRjtProgress" && map.wgtOptDefVal == "01"){
												reqProTypeList.push("03");
											}
											//결재 반려 후 종료 표출
											if(wgtOptKey == "reqFinTypeSignReject" && map.wgtOptDefVal == "01"){
												reqProTypeList.push("05");
											}
											//중간 종료 표출
											if(wgtOptKey == "reqFinTypeStop" && map.wgtOptDefVal == "01"){
												reqProTypeList.push("06");
											}
										});
										
										//구분자
										dshSearchParams["callId"] = callId;
										
										//REQ00008
										var reqProType = $(this).data("req-pro-type");
										
										//팝업 타이틀에 추가 및 검색 조건 추가
										var reqProTypeNm = "";
										if(reqProType == "end"){
											reqProTypeNm = "종료";
											
											//종료 유형 전달
											dshSearchParams["reqProTypeList"] = reqProTypeList;
										}else if(reqProType == "03") {
											reqProTypeNm = "접수 반려";
										}else if(reqProType == "05") {
											reqProTypeNm = "결재 반려 후 종료";
										}else if(reqProType == "06") {
											reqProTypeNm = "중간 종료";
										}
										
										/**** 조회 param 합치기 ****/
										dshSearchParams["baseGrp"] = "prjId";
										//dshSearchParams["reqUsrId"] = usrId;
										//REQ00008 01 접수대기 02 처리중 03 반려 04 완료 05 결재반려후 종료 06 중간 종료
										//end로 입력 시 종료 항목 모두 지정
										dshSearchParams["reqProType"] = reqProType;
										//티켓 분류 REQ00018 - 01 보안 정책, 02 이상징후, 03 외부
										dshSearchParams["reqClsType"] = "01";
										//로그 연결 여부 CMM00001 - 01 예, 02 아니오
										dshSearchParams["logLnkCd"] = "02";
										
										/**** 검색 조건 끝 ****/
										
										var dataParam = {
												// 데이터 조회 URL
												url : "/wgt/wgt1000/wgt1100/selectWgt1100GetReqListAjax.do",
												//조회 파라미터
												params : dshSearchParams,
												//데이터 테이블 & 팝업 옵션
												option : {
													showBtns : ["reqDetail"],
													submitBtnCd : false, // submit 버튼 표출 유무
												}
										};
										
										var data = {
												type : "list",
												reqType : "01", //티켓
												currentIdKey : callId,
												dataParam : JSON.stringify(dataParam)
										};
										
										var options = {
												idKey: callId,
												modalTitle : "["+reqProTypeNm+"] 보안 티켓 목록",
												closeConfirm: false,
												autoHeight: true,
												modalSize: "xl",
												callback:[{
													targetId : "cmm6206ModalCallbackBtn",
													actionFn : function(thisObj){
														//모든 위젯 초기화
														gridStack.fnRefresh();
													}
												}]
										};
										
										$.osl.layerPopupOpen('/cmm/cmm6000/cmm6200/selectCmm6206View.do',data,options);
									});
								});
							}
						}
					}
				},
			},
			//전체
			"WGTREQ1000100006" : {
				size : ["2X1", "4X2", "12X1"],
				"2X1": {
					//구분자
					callId : "ticketAll",
					//boolean default false
					fullType : false,
					addFullTypeClass : "",
					//class
					cardClass : '',
					cardBodyClass : '',
					//string Y, N, D default N, card-title에 wgtGrpNm과 동시 표출 유무
					//Y - 동시 표출, N - wgtGrpNm만 표출, D - label 만 표출
					addLabel: "N",
					//text
					label : `전체`,
					//class
					icon : `fas fa-folder-open`,
					//html
					toolbar : ``,
					//html
					content : `
						<div class="h-100 d-flex flex-wrap align-items-center justify-content-end rounded rounded-top-0 osl-area-hover cursor-pointer osl-evt__ticket--explanatory-btn">
							<div class="text-end">
								<div class="point-title me-4 osl-evt__ticket--all-count">
									999+
								</div>
								<div class="">
									<span class="point-label me-4" data-lang-cd="">
										전체
									</span>
								</div>
							</div>
						</div>
					`,
					actionFn : function(){
						var widgetId = this.widgetId;
						var optionKey = this.optionKey;
						
						//대상 위젯
						var thisWidget = $(`.osl-evt__widget-item[gs-id="${widgetId}"]`);
						//위젯 설정 시 이벤트가 호출되면 안되기 때문에 실제 이벤트 지정될 영역
						var targetWidget = thisWidget.find(".osl-evt__widget-card .osl-evt__widget-card-body");
						
						//그리드스택
						var gridStackId = thisWidget.closest(".osl-evt__grid-stack-area").attr("id");
						var gridStack = widgetSettingGridStack[gridStackId];
						
						//위젯 세팅 시 정보 바로 보관해두기 위해서
						//현재 요청자
						//var usrId = $.osl.user.userInfo.usrId;
						
						//구분자
						var callId = this.callId;
						
						return {
							//새로고침 버튼 누르면 호출
							reload : function(){ 
								/**** 검색 조건 ****/
								//대시보드 검색조건 공통
								var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
								
								//위젯의 설정 값 추가
								$.each(optionKey, function(wgtOptKey, map){
									dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
								});
								
								//구분자
								dshSearchParams["callId"] = callId;
								
								
								/**** 조회 param 합치기 ****/
								dshSearchParams["baseGrp"] = "prjId";
								//dshSearchParams["reqUsrId"] = usrId;
								//티켓 분류 REQ00018 - 01 보안 정책, 02 이상징후, 03 외부
								dshSearchParams["reqClsType"] = "01";
								//로그 연결 여부 CMM00001 - 01 예, 02 아니오
								dshSearchParams["logLnkCd"] = "02";
								
								/**** 검색 조건 끝 ****/
								
								//AJAX 설정
								var ajaxObj = new $.osl.ajaxRequestAction(
										{"url":"/wgt/wgt1000/wgt1100/selectWgt1100WidgetReloadAjax.do", "async":"false"}
										,dshSearchParams);
								//AJAX 전송 성공 함수
								ajaxObj.setFnSuccess(function(data){
									//오류
									if(data.errorYn == "Y"){
										$.osl.alert(data.message,{type: 'error'});
										//모달 창 닫기
										$.osl.layerPopupClose();
									}
									//성공
									else{
										//totalCnt, acceptStayCnt, progressIngCnt, acceptRejectCnt, progressEndCnt, signRejectCnt, progressRejectCnt 존재
										var ticketAllCnt = data.ticketAllCnt;
										
										var ticketTotalCnt = ticketAllCnt["totalCnt"];
										if(Number(ticketTotalCnt) > 999){
											ticketTotalCnt = "999+";
										}
										
										//종합 갯수 표출
										targetWidget.find(".osl-evt__ticket--all-count").text(ticketTotalCnt);
									}
								});
								
								return ajaxObj.send();
							},
							init : function(){
								//조회
								var ajaxObj = this.reload();
								
								ajaxObj.done(function(){
									//위젯 자체 클릭 시 전체 팝업 표출
									targetWidget.off("click").on("click", function(){
										/**** 검색 조건 ****/
										//대시보드 검색조건 공통
										var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
										
										//위젯의 설정 값 추가
										$.each(optionKey, function(wgtOptKey, map){
											dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
										});
										
										//구분자
										dshSearchParams["callId"] = callId;
										
										/**** 조회 param 합치기 ****/
										dshSearchParams["baseGrp"] = "prjId";
										//dshSearchParams["reqUsrId"] = usrId;
										//티켓 분류 REQ00018 - 01 보안 정책, 02 이상징후, 03 외부
										dshSearchParams["reqClsType"] = "01";
										//로그 연결 여부 CMM00001 - 01 예, 02 아니오
										dshSearchParams["logLnkCd"] = "02";
										
										/**** 검색 조건 끝 ****/
										
										var dataParam = {
												// 데이터 조회 URL
												url : "/wgt/wgt1000/wgt1100/selectWgt1100GetReqListAjax.do",
												//조회 파라미터
												params : dshSearchParams,
												//데이터 테이블 & 팝업 옵션
												option : {
													showBtns : ["reqDetail"],
													submitBtnCd : false, // submit 버튼 표출 유무
												}
										};
										
										var data = {
												type : "list",
												reqType : "01", //티켓
												currentIdKey : callId,
												dataParam : JSON.stringify(dataParam)
										};
										
										var options = {
												idKey: callId,
												modalTitle : "[전체] 보안 티켓 목록",
												closeConfirm: false,
												autoHeight: true,
												modalSize: "xl",
												callback:[{
													targetId : "cmm6206ModalCallbackBtn",
													actionFn : function(thisObj){
														//모든 위젯 초기화
														gridStack.fnRefresh();
													}
												}]
										};
										
										$.osl.layerPopupOpen('/cmm/cmm6000/cmm6200/selectCmm6206View.do',data,options);
									});
								});
							}
						}
					}
				},
				"4X2" : {
					//구분자
					callId : "ticketAll",
					//boolean default false
					fullType : false,
					addFullTypeClass : "",
					//class
					cardClass : '',
					cardBodyClass : '',
					//string Y, N, D default N, card-title에 wgtGrpNm과 동시 표출 유무
					//Y - 동시 표출, N - wgtGrpNm만 표출, D - label 만 표출
					addLabel: "N",
					//text
					label : `전체`,
					//class
					icon : `fas fa-folder-open`,
					//html
					toolbar : ``,
					//html
					content : `
						<div class="d-table table-layout-fixed w-100 h-100">
							<div class="d-table-row">
								<div class="d-table-cell align-middle text-center rounded osl-area-hover cursor-pointer osl-evt__ticket--all-btn" data-req-pro-type="01">
									<div class="point-title weak text-info osl-evt__ticket--stay-count">
										999+
									</div>
									<div class="d-flex align-items-center justify-content-center h-40px">
										<span class="point-label weak text-info osl-word-break--keep-all" data-lang-cd="">
											접수 대기
										</span>
									</div>
								</div>
								<div class="d-table-cell align-middle text-center rounded osl-area-hover cursor-pointer osl-evt__ticket--all-btn" data-req-pro-type="02">
									<div class="point-title weak text-primary osl-evt__ticket--ing-count">
										999+
									</div>
									<div class="d-flex align-items-center justify-content-center h-40px">
										<span class="point-label weak text-primary osl-word-break--keep-all" data-lang-cd="">
											처리중
										</span>
									</div>
								</div>
							</div>
							<div class="d-table-row">
								<div class="d-table-cell align-middle text-center rounded osl-area-hover cursor-pointer osl-evt__ticket--all-btn" data-req-pro-type="03">
									<div class="point-title weak text-danger osl-evt__ticket--reject-count">
										999+
									</div>
									<div class="d-flex align-items-center justify-content-center h-40px">
										<span class="point-label weak text-danger osl-word-break--keep-all" data-lang-cd="">
											접수 반려
										</span>
									</div>
								</div>
								<div class="d-table-cell align-middle text-center rounded osl-area-hover cursor-pointer osl-evt__ticket--all-btn" data-req-pro-type="04">
									<div class="point-title weak text-success osl-evt__ticket--success-count">
										999+
									</div>
									<div class="d-flex align-items-center justify-content-center h-40px">
										<span class="point-label weak text-success osl-word-break--keep-all" data-lang-cd="">
											처리 완료
										</span>
									</div>
								</div>
							</div>
							<div class="d-table-row">
								<div class="d-table-cell align-middle text-center rounded osl-area-hover cursor-pointer osl-evt__ticket--all-btn" data-req-pro-type="05">
									<div class="point-title weak text-orange osl-evt__ticket--sign-reject-count">
										999+
									</div>
									<div class="d-flex align-items-center justify-content-center h-40px">
										<span class="point-label weak text-orange osl-word-break--keep-all" data-lang-cd="">
											결재 반려 종료
										</span>
									</div>
								</div>
								<div class="d-table-cell align-middle text-center rounded osl-area-hover cursor-pointer osl-evt__ticket--all-btn" data-req-pro-type="06">
									<div class="point-title weak text-manatee osl-evt__ticket--stop-count">
										999+
									</div>
									<div class="d-flex align-items-center justify-content-center h-40px">
										<span class="point-label weak text-manatee osl-word-break--keep-all" data-lang-cd="">
											중간 종료
										</span>
									</div>
								</div>
							</div>
						</div>
					`,
					actionFn : function(){
						var widgetId = this.widgetId;
						var optionKey = this.optionKey;
						
						//대상 위젯
						var thisWidget = $(`.osl-evt__widget-item[gs-id="${widgetId}"]`);
						//위젯 설정 시 이벤트가 호출되면 안되기 때문에 실제 이벤트 지정될 영역
						var targetWidget = thisWidget.find(".osl-evt__widget-card .osl-evt__widget-card-body");
						
						//그리드스택
						var gridStackId = thisWidget.closest(".osl-evt__grid-stack-area").attr("id");
						var gridStack = widgetSettingGridStack[gridStackId];
						
						//위젯 세팅 시 정보 바로 보관해두기 위해서
						//현재 요청자
						//var usrId = $.osl.user.userInfo.usrId;
						
						//구분자
						var callId = this.callId;
						
						return {
							//새로고침 버튼 누르면 호출
							reload : function(){ 
								/**** 검색 조건 ****/
								//대시보드 검색조건 공통
								var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
								
								//위젯의 설정 값 추가
								$.each(optionKey, function(wgtOptKey, map){
									dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
								});
								
								//구분자
								dshSearchParams["callId"] = callId;
								
								
								/**** 조회 param 합치기 ****/
								dshSearchParams["baseGrp"] = "prjId";
								//dshSearchParams["reqUsrId"] = usrId;
								//티켓 분류 REQ00018 - 01 보안 정책, 02 이상징후, 03 외부
								dshSearchParams["reqClsType"] = "01";
								//로그 연결 여부 CMM00001 - 01 예, 02 아니오
								dshSearchParams["logLnkCd"] = "02";
								
								/**** 검색 조건 끝 ****/
								
								//AJAX 설정
								var ajaxObj = new $.osl.ajaxRequestAction(
										{"url":"/wgt/wgt1000/wgt1100/selectWgt1100WidgetReloadAjax.do", "async":"false"}
										,dshSearchParams);
								//AJAX 전송 성공 함수
								ajaxObj.setFnSuccess(function(data){
									//오류
									if(data.errorYn == "Y"){
										$.osl.alert(data.message,{type: 'error'});
										//모달 창 닫기
										$.osl.layerPopupClose();
									}
									//성공
									else{
										//totalCnt, acceptStayCnt, progressIngCnt, acceptRejectCnt, progressEndCnt, signRejectCnt, progressRejectCnt 존재
										var ticketAllCnt = data.ticketAllCnt;
										
										var ticketStayCnt = ticketAllCnt["acceptStayCnt"];
										if(Number(ticketStayCnt) > 999){
											ticketStayCnt = "999+";
										}
										var ticketIngCnt = ticketAllCnt["progressIngCnt"];
										if(Number(ticketIngCnt) > 999){
											ticketIngCnt = "999+";
										}
										var ticketRejectCnt = ticketAllCnt["acceptRejectCnt"];
										if(Number(ticketRejectCnt) > 999){
											ticketRejectCnt = "999+";
										}
										var ticketSuccessCnt = ticketAllCnt["progressEndCnt"];
										if(Number(ticketSuccessCnt) > 999){
											ticketSuccessCnt = "999+";
										}
										var ticketSignRejectCnt = ticketAllCnt["signRejectCnt"];
										if(Number(ticketSignRejectCnt) > 999){
											ticketSignRejectCnt = "999+";
										}
										var ticketStopCnt = ticketAllCnt["progressRejectCnt"];
										if(Number(ticketStopCnt) > 999){
											ticketStopCnt = "999+";
										}
										
										//갯수 표출
										//접수 대기, 처리중, 접수반려, 처리완료, 결재반려 종료, 중간 종료
										targetWidget.find(".osl-evt__ticket--stay-count").text(ticketStayCnt);
										targetWidget.find(".osl-evt__ticket--ing-count").text(ticketIngCnt);
										targetWidget.find(".osl-evt__ticket--reject-count").text(ticketRejectCnt);
										targetWidget.find(".osl-evt__ticket--success-count").text(ticketSuccessCnt);
										targetWidget.find(".osl-evt__ticket--sign-reject-count").text(ticketSignRejectCnt);
										targetWidget.find(".osl-evt__ticket--stop-count").text(ticketStopCnt);
									}
								});
								
								return ajaxObj.send();
							},
							init : function(){
								//조회
								var ajaxObj = this.reload();
								
								ajaxObj.done(function(){
									//위젯 자체 클릭 시 티켓 유형별 팝업 표출
									targetWidget.off("click").on("click", ".osl-evt__ticket--all-btn", function(){
										/**** 검색 조건 ****/
										//대시보드 검색조건 공통
										var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
										
										//위젯의 설정 값 추가
										$.each(optionKey, function(wgtOptKey, map){
											dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
										});
										
										//구분자
										dshSearchParams["callId"] = callId;
										
										//REQ00008
										var reqProType = $(this).data("req-pro-type");
										
										/**** 조회 param 합치기 ****/
										dshSearchParams["baseGrp"] = "prjId";
										//dshSearchParams["reqUsrId"] = usrId;
										//REQ00008 01 접수대기 02 처리중 03 반려 04 완료 05 결재반려후 종료 06 중간 종료
										dshSearchParams["reqProType"] = reqProType;
										//티켓 분류 REQ00018 - 01 보안 정책, 02 이상징후, 03 외부
										dshSearchParams["reqClsType"] = "01";
										//로그 연결 여부 CMM00001 - 01 예, 02 아니오
										dshSearchParams["logLnkCd"] = "02";
										
										/**** 검색 조건 끝 ****/
										
										//팝업 타이틀에 추가
										var reqProTypeNm = "";
										if(reqProType == "01") {
											reqProTypeNm = "접수 대기";
										}else if(reqProType == "02") {
											reqProTypeNm = "처리중";
										}else if(reqProType == "03") {
											reqProTypeNm = "접수 반려";
										}else if(reqProType == "04") {
											reqProTypeNm = "처리 완료";
										}else if(reqProType == "05") {
											reqProTypeNm = "결재 반려 후 종료";
										}else if(reqProType == "06") {
											reqProTypeNm = "중간 종료";
										}
										
										var dataParam = {
												// 데이터 조회 URL
												url : "/wgt/wgt1000/wgt1100/selectWgt1100GetReqListAjax.do",
												//조회 파라미터
												params : dshSearchParams,
												//데이터 테이블 & 팝업 옵션
												option : {
													showBtns : ["reqDetail"],
													submitBtnCd : false, // submit 버튼 표출 유무
												}
										};
										
										var data = {
												type : "list",
												reqType : "01", //티켓
												currentIdKey : callId,
												dataParam : JSON.stringify(dataParam)
										};
										
										var options = {
												idKey: callId,
												modalTitle : "["+reqProTypeNm+"] 보안 티켓 목록",
												closeConfirm: false,
												autoHeight: true,
												modalSize: "xl",
												callback:[{
													targetId : "cmm6206ModalCallbackBtn",
													actionFn : function(thisObj){
														//모든 위젯 초기화
														gridStack.fnRefresh();
													}
												}]
										};
										
										$.osl.layerPopupOpen('/cmm/cmm6000/cmm6200/selectCmm6206View.do',data,options);
									});
								});
							}
						}//end return
					}
				},
				"12X1": {
					//구분자
					callId : "ticketAll",
					//boolean default false
					fullType : false,
					addFullTypeClass : "",
					//class
					cardClass : '',
					cardBodyClass : '',
					//string Y, N, D default N, card-title에 wgtGrpNm과 동시 표출 유무
					//Y - 동시 표출, N - wgtGrpNm만 표출, D - label 만 표출
					addLabel: "N",
					//text
					label : `전체`,
					//class
					icon : `fas fa-folder-open`,
					//html
					toolbar : ``,
					//html
					content : `
						<div class="d-table table-layout-fixed w-100 h-100">
							<div class="d-table-cell align-middle text-center rounded osl-area-hover cursor-pointer osl-evt__ticket--all-btn" data-req-pro-type="01">
								<div class="point-title weak text-info osl-evt__ticket--stay-count">
									999+
								</div>
								<div class="d-flex align-items-center justify-content-center h-40px">
									<span class="point-label weak text-info osl-word-break--keep-all" data-lang-cd="">
										접수 대기
									</span>
								</div>
							</div>
							<div class="d-table-cell align-middle text-center rounded osl-area-hover cursor-pointer osl-evt__ticket--all-btn" data-req-pro-type="02">
								<div class="point-title weak text-primary osl-evt__ticket--ing-count">
									999+
								</div>
								<div class="d-flex align-items-center justify-content-center h-40px">
									<span class="point-label weak text-primary osl-word-break--keep-all" data-lang-cd="">
										처리중
									</span>
								</div>
							</div>
							<div class="d-table-cell align-middle text-center rounded osl-area-hover cursor-pointer osl-evt__ticket--all-btn" data-req-pro-type="03">
								<div class="point-title weak text-danger osl-evt__ticket--reject-count">
									999+
								</div>
								<div class="d-flex align-items-center justify-content-center h-40px">
									<span class="point-label weak text-danger osl-word-break--keep-all" data-lang-cd="">
										접수 반려
									</span>
								</div>
							</div>
							<div class="d-table-cell align-middle text-center rounded osl-area-hover cursor-pointer osl-evt__ticket--all-btn" data-req-pro-type="04">
								<div class="point-title weak text-success osl-evt__ticket--success-count">
									999+
								</div>
								<div class="d-flex align-items-center justify-content-center h-40px">
									<span class="point-label weak text-success osl-word-break--keep-all" data-lang-cd="">
										처리 완료
									</span>
								</div>
							</div>
							<div class="d-table-cell align-middle text-center rounded osl-area-hover cursor-pointer osl-evt__ticket--all-btn" data-req-pro-type="05">
								<div class="point-title weak text-orange osl-evt__ticket--sign-reject-count">
									999+
								</div>
								<div class="d-flex align-items-center justify-content-center h-40px">
									<span class="point-label weak text-orange osl-word-break--keep-all" data-lang-cd="">
										결재 반려 종료
									</span>
								</div>
							</div>
							<div class="d-table-cell align-middle text-center rounded osl-area-hover cursor-pointer osl-evt__ticket--all-btn" data-req-pro-type="06">
								<div class="point-title weak text-manatee osl-evt__ticket--stop-count">
									999+
								</div>
								<div class="d-flex align-items-center justify-content-center h-40px">
									<span class="point-label weak text-manatee osl-word-break--keep-all" data-lang-cd="">
										중간 종료
									</span>
								</div>
							</div>
						</div>
					`,
					actionFn : function(){
						var widgetId = this.widgetId;
						var optionKey = this.optionKey;
						
						//대상 위젯
						var thisWidget = $(`.osl-evt__widget-item[gs-id="${widgetId}"]`);
						//위젯 설정 시 이벤트가 호출되면 안되기 때문에 실제 이벤트 지정될 영역
						var targetWidget = thisWidget.find(".osl-evt__widget-card .osl-evt__widget-card-body");
						
						//그리드스택
						var gridStackId = thisWidget.closest(".osl-evt__grid-stack-area").attr("id");
						var gridStack = widgetSettingGridStack[gridStackId];
						
						//위젯 세팅 시 정보 바로 보관해두기 위해서
						//현재 요청자
						//var usrId = $.osl.user.userInfo.usrId;
						
						//구분자
						var callId = this.callId;
						
						return {
							//새로고침 버튼 누르면 호출
							reload : function(){ 
								/**** 검색 조건 ****/
								//대시보드 검색조건 공통
								var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
								
								//위젯의 설정 값 추가
								$.each(optionKey, function(wgtOptKey, map){
									dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
								});
								
								//구분자
								dshSearchParams["callId"] = callId;
								
								
								/**** 조회 param 합치기 ****/
								dshSearchParams["baseGrp"] = "prjId";
								//dshSearchParams["reqUsrId"] = usrId;
								//티켓 분류 REQ00018 - 01 보안 정책, 02 이상징후, 03 외부
								dshSearchParams["reqClsType"] = "01";
								//로그 연결 여부 CMM00001 - 01 예, 02 아니오
								dshSearchParams["logLnkCd"] = "02";
								
								/**** 검색 조건 끝 ****/
								
								//AJAX 설정
								var ajaxObj = new $.osl.ajaxRequestAction(
										{"url":"/wgt/wgt1000/wgt1100/selectWgt1100WidgetReloadAjax.do", "async":"false"}
										,dshSearchParams);
								//AJAX 전송 성공 함수
								ajaxObj.setFnSuccess(function(data){
									//오류
									if(data.errorYn == "Y"){
										$.osl.alert(data.message,{type: 'error'});
										//모달 창 닫기
										$.osl.layerPopupClose();
									}
									//성공
									else{
										//totalCnt, acceptStayCnt, progressIngCnt, acceptRejectCnt, progressEndCnt, signRejectCnt, progressRejectCnt 존재
										var ticketAllCnt = data.ticketAllCnt;
										
										var ticketStayCnt = ticketAllCnt["acceptStayCnt"];
										if(Number(ticketStayCnt) > 999){
											ticketStayCnt = "999+";
										}
										var ticketIngCnt = ticketAllCnt["progressIngCnt"];
										if(Number(ticketIngCnt) > 999){
											ticketIngCnt = "999+";
										}
										var ticketRejectCnt = ticketAllCnt["acceptRejectCnt"];
										if(Number(ticketRejectCnt) > 999){
											ticketRejectCnt = "999+";
										}
										var ticketSuccessCnt = ticketAllCnt["progressEndCnt"];
										if(Number(ticketSuccessCnt) > 999){
											ticketSuccessCnt = "999+";
										}
										var ticketSignRejectCnt = ticketAllCnt["signRejectCnt"];
										if(Number(ticketSignRejectCnt) > 999){
											ticketSignRejectCnt = "999+";
										}
										var ticketStopCnt = ticketAllCnt["progressRejectCnt"];
										if(Number(ticketStopCnt) > 999){
											ticketStopCnt = "999+";
										}
										
										//갯수 표출
										//접수 대기, 처리중, 접수반려, 처리완료, 결재반려 종료, 중간 종료
										targetWidget.find(".osl-evt__ticket--stay-count").text(ticketStayCnt);
										targetWidget.find(".osl-evt__ticket--ing-count").text(ticketIngCnt);
										targetWidget.find(".osl-evt__ticket--reject-count").text(ticketRejectCnt);
										targetWidget.find(".osl-evt__ticket--success-count").text(ticketSuccessCnt);
										targetWidget.find(".osl-evt__ticket--sign-reject-count").text(ticketSignRejectCnt);
										targetWidget.find(".osl-evt__ticket--stop-count").text(ticketStopCnt);
									}
								});
								
								return ajaxObj.send();
							},
							init : function(){
								//조회
								var ajaxObj = this.reload();
								
								ajaxObj.done(function(){
									//위젯 자체 클릭 시 티켓 유형별 팝업 표출
									targetWidget.off("click").on("click", ".osl-evt__ticket--all-btn", function(){
										/**** 검색 조건 ****/
										//대시보드 검색조건 공통
										var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
										
										//위젯의 설정 값 추가
										$.each(optionKey, function(wgtOptKey, map){
											dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
										});
										
										//구분자
										dshSearchParams["callId"] = callId;
										
										//REQ00008
										var reqProType = $(this).data("req-pro-type");
										
										/**** 조회 param 합치기 ****/
										dshSearchParams["baseGrp"] = "prjId";
										//dshSearchParams["reqUsrId"] = usrId;
										//REQ00008 01 접수대기 02 처리중 03 반려 04 완료 05 결재반려후 종료 06 중간 종료
										dshSearchParams["reqProType"] = reqProType;
										//티켓 분류 REQ00018 - 01 보안 정책, 02 이상징후, 03 외부
										dshSearchParams["reqClsType"] = "01";
										//로그 연결 여부 CMM00001 - 01 예, 02 아니오
										dshSearchParams["logLnkCd"] = "02";
										
										/**** 검색 조건 끝 ****/
										
										//팝업 타이틀에 추가
										var reqProTypeNm = "";
										if(reqProType == "01") {
											reqProTypeNm = "접수 대기";
										}else if(reqProType == "02") {
											reqProTypeNm = "처리중";
										}else if(reqProType == "03") {
											reqProTypeNm = "접수 반려";
										}else if(reqProType == "04") {
											reqProTypeNm = "처리 완료";
										}else if(reqProType == "05") {
											reqProTypeNm = "결재 반려 후 종료";
										}else if(reqProType == "06") {
											reqProTypeNm = "중간 종료";
										}
										
										var dataParam = {
												// 데이터 조회 URL
												url : "/wgt/wgt1000/wgt1100/selectWgt1100GetReqListAjax.do",
												//조회 파라미터
												params : dshSearchParams,
												//데이터 테이블 & 팝업 옵션
												option : {
													showBtns : ["reqDetail"],
													submitBtnCd : false, // submit 버튼 표출 유무
												}
										};
										
										var data = {
												type : "list",
												reqType : "01", //티켓
												currentIdKey : callId,
												dataParam : JSON.stringify(dataParam)
										};
										
										var options = {
												idKey: callId,
												modalTitle : "["+reqProTypeNm+"] 보안 티켓 목록",
												closeConfirm: false,
												autoHeight: true,
												modalSize: "xl",
												callback:[{
													targetId : "cmm6206ModalCallbackBtn",
													actionFn : function(thisObj){
														//모든 위젯 초기화
														gridStack.fnRefresh();
													}
												}]
										};
										
										$.osl.layerPopupOpen('/cmm/cmm6000/cmm6200/selectCmm6206View.do',data,options);
									});
								});
							}
						}//end return
					}
				}
			},
			//처리율
			"WGTREQ1000100007" : {
				size : ["2X1", "2X2", "4X1"],
				"2X1": {
					//구분자
					callId : "ticketAll",
					//boolean default false
					fullType : false,
					addFullTypeClass : "",
					//class
					cardClass : '',
					cardBodyClass : '',
					//string Y, N, D default N, card-title에 wgtGrpNm과 동시 표출 유무
					//Y - 동시 표출, N - wgtGrpNm만 표출, D - label 만 표출
					addLabel: "Y",
					//text
					label : `처리 현황`,
					//class
					icon : `fas fa-percentage`,
					//html
					toolbar : ``,
					//html
					content : `
						<div class="d-flex justify-content-center flex-column h-100">
							<div class="d-flex flex-stack gap-2 mx-4">
								<div class="point-label">
									<span class="osl-word-break--keep-all" data-lang-cd="">
										처리율
									</span>
								</div>
								<div class="point-title osl-evt__ticket--progress-percent">
									99.9%
								</div>
							</div>
							<div class="mx-4">
								<div class="progress bg-light h-10px my-4">
									<div class="progress-bar bg-primary osl-evt__progress-bar" role="progressbar" style="width:40%;"></div>
								</div>
								<div class="point-text strong text-end">
									<span class="osl-evt__ticket--finish-count">Finish</span>
									/
									<span class="osl-evt__ticket--all-count">Total</span>
								</div>
							</div>
						</div>
					`,
					actionFn : function(){
						var widgetId = this.widgetId;
						var optionKey = this.optionKey;
						
						//대상 위젯
						var thisWidget = $(`.osl-evt__widget-item[gs-id="${widgetId}"]`);
						//위젯 설정 시 이벤트가 호출되면 안되기 때문에 실제 이벤트 지정될 영역
						var targetWidget = thisWidget.find(".osl-evt__widget-card .osl-evt__widget-card-body");
						
						//그리드스택
						var gridStackId = thisWidget.closest(".osl-evt__grid-stack-area").attr("id");
						var gridStack = widgetSettingGridStack[gridStackId];
						
						//위젯 세팅 시 정보 바로 보관해두기 위해서
						//현재 요청자
						//var usrId = $.osl.user.userInfo.usrId;
						
						//구분자
						var callId = this.callId;
						
						return {
							//새로고침 버튼 누르면 호출
							reload : function(){ 
								/**** 검색 조건 ****/
								//대시보드 검색조건 공통
								var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
								
								//위젯의 설정 값 추가
								$.each(optionKey, function(wgtOptKey, map){
									dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
								});
								
								//구분자
								dshSearchParams["callId"] = callId;
								
								
								/**** 조회 param 합치기 ****/
								dshSearchParams["baseGrp"] = "prjId";
								//dshSearchParams["reqUsrId"] = usrId;
								//티켓 분류 REQ00018 - 01 보안 정책, 02 이상징후, 03 외부
								dshSearchParams["reqClsType"] = "01";
								//로그 연결 여부 CMM00001 - 01 예, 02 아니오
								dshSearchParams["logLnkCd"] = "02";
								
								/**** 검색 조건 끝 ****/
								
								//AJAX 설정
								var ajaxObj = new $.osl.ajaxRequestAction(
										{"url":"/wgt/wgt1000/wgt1100/selectWgt1100WidgetReloadAjax.do", "async":"false"}
										,dshSearchParams);
								//AJAX 전송 성공 함수
								ajaxObj.setFnSuccess(function(data){
									//오류
									if(data.errorYn == "Y"){
										$.osl.alert(data.message,{type: 'error'});
										//모달 창 닫기
										$.osl.layerPopupClose();
									}
									//성공
									else{
										//totalCnt, acceptStayCnt, progressIngCnt, acceptRejectCnt, progressEndCnt, signRejectCnt, progressRejectCnt 존재
										var ticketAllCnt = data.ticketAllCnt;
										
										//전체 카운트(처리중, 완료)
										var ticketInProgressCnt = Number(ticketAllCnt["progressIngCnt"]) + Number(ticketAllCnt["progressEndCnt"]);
										//처리 완료 카운트
										var ticketEndProgressCnt = Number(ticketAllCnt["progressEndCnt"]);
										
										//비율 계산
										var ticketRatio = 0;
										if(ticketInProgressCnt != 0 && ticketEndProgressCnt != 0){
											ticketRatio = ((ticketEndProgressCnt/ticketInProgressCnt)*100).toFixed(1);
											if(ticketInProgressCnt == ticketEndProgressCnt){
												ticketRatio = 100;
											}
										}
										
										//숫자 넣기
										targetWidget.find(".osl-evt__ticket--progress-percent").text(ticketRatio+"%");
										
										//스타일 넣기
										targetWidget.find(".osl-evt__progress-bar").attr("style", "width:"+ticketRatio+"%;");
										
										//종합 갯수 표출
										targetWidget.find(".osl-evt__ticket--finish-count").text(ticketEndProgressCnt);
										targetWidget.find(".osl-evt__ticket--all-count").text(ticketInProgressCnt);
									}
								});
								
								ajaxObj.send();
							},
							init : function(){
								//조회
								this.reload();
							}
						}
					}
				},
				"2X2": {
					//구분자
					callId : "ticketAllV2",
					//boolean default false
					fullType : false,
					addFullTypeClass : "",
					//class
					cardClass : '',
					cardBodyClass : '',
					//string Y, N, D default N, card-title에 wgtGrpNm과 동시 표출 유무
					//Y - 동시 표출, N - wgtGrpNm만 표출, D - label 만 표출
					addLabel: "Y",
					//text
					label : `처리 현황`,
					//class
					icon : `fas fa-percentage`,
					//html
					toolbar : ``,
					//html
					content : `
						<div class="d-flex flex-column justify-content-around h-100 mx-4">
							<div class="d-flex justify-content-center flex-column">
								<div class="d-flex flex-stack gap-2">
									<div class="point-label">
										<span class="osl-word-break--keep-all" data-lang-cd="">
											처리율
										</span>
									</div>
									<div class="point-title osl-evt__ticket--progress-percent">
										99.9%
									</div>
								</div>
								<div class="">
									<div class="progress bg-light h-10px my-4">
										<div class="progress-bar bg-primary osl-evt__progress-bar" role="progressbar" style="width:40%;"></div>
									</div>
									<div class="point-text strong text-end">
										<span class="osl-evt__ticket--finish-count">Finish</span>
										/
										<span class="osl-evt__ticket--all-count">Total</span>
									</div>
								</div>
							</div>
							<div class="d-flex flex-column justify-content-around w-100 point-label weak position-relative">
								<div class="d-flex flex-wrap point-area-hover--bullet point-area-hover-dark--bullet cursor-pointer mb-2 osl-evt__ticket--ratio-btn" data-req-pro-type="-1">
									<div class="w-50 text-start">
										<span class="ms-4" data-lang-cd="">전체</span>
									</div>
									<div class="w-50 text-end">
										<span class="osl-evt__ticket--all-count me-4">999+</span>
									</div>
								</div>
								<div class="d-flex flex-wrap point-area-hover--bullet point-area-hover-info--bullet cursor-pointer mb-2 osl-evt__ticket--ratio-btn" data-req-pro-type="01">
									<div class="w-50 text-start">
										<span class="ms-4" data-lang-cd="">대기</span>
									</div>
									<div class="w-50 text-end">
										<span class="osl-evt__ticket--stay-count me-4">999+</span>
									</div>
								</div>
								<div class="d-flex flex-wrap point-area-hover--bullet point-area-hover-primary--bullet cursor-pointer mb-2 osl-evt__ticket--ratio-btn" data-req-pro-type="02" data-req-charger="-1">
									<div class="w-50 text-start">
										<span class="ms-4" data-lang-cd="">처리</span>
									</div>
									<div class="w-50 text-end">
										<span class="osl-evt__ticket--progress-count me-4">999+</span>
									</div>
								</div>
								<div class="separator separator-dotted border-dark my-2"></div>
								<div class="bg-light bg-opacity-75 rounded point-label weak text-dark p-2">
									<div class="d-flex flex-wrap rounded osl-area-hover-primary cursor-pointer p-2 osl-evt__ticket--ratio-btn" data-req-pro-type="02" data-req-charger="usr">
										<div class="w-50 text-start">
											<span class="ms-4" data-lang-cd="">담당</span>
										</div>
										<div class="w-50 text-end">
											<span class="osl-evt__ticket--progress-charger-usr-count me-4">999+/999+</span>
										</div>
									</div>
									<div class="d-flex flex-wrap rounded osl-area-hover-primary cursor-pointer p-2 osl-evt__ticket--ratio-btn" data-req-pro-type="02" data-req-charger="none">
										<div class="w-50 text-start">
											<span class="ms-4" data-lang-cd="">無담당</span>
										</div>
										<div class="w-50 text-end">
											<span class="osl-evt__ticket--progress-charger-none-count me-4">999+</span>
										</div>
									</div>
								</div>
								<div class="separator separator-dotted border-dark my-2"></div>
								<div class="d-flex flex-wrap point-area-hover--bullet point-area-hover-success--bullet cursor-pointer mb-2 osl-evt__ticket--ratio-btn" data-req-pro-type="04">
									<div class="w-50 text-start">
										<span class="ms-4" data-lang-cd="">완료</span>
									</div>
									<div class="w-50 text-end">
										<span class="osl-evt__ticket--finish-count me-4">999+</span>
									</div>
								</div>
								<div class="d-flex flex-wrap point-area-hover--bullet point-area-hover-danger--bullet cursor-pointer mb-2 osl-evt__ticket--ratio-btn" data-req-pro-type="end">
									<div class="w-50 text-start">
										<span class="ms-4" data-lang-cd="">종료</span>
									</div>
									<div class="w-50 text-end">
										<span class="osl-evt__ticket--stop-count me-4">999+</span>
									</div>
								</div>
							</div>
						</div>
					`,
					actionFn : function(){
						var widgetId = this.widgetId;
						var optionKey = this.optionKey;
						
						//대상 위젯
						var thisWidget = $(`.osl-evt__widget-item[gs-id="${widgetId}"]`);
						//위젯 설정 시 이벤트가 호출되면 안되기 때문에 실제 이벤트 지정될 영역
						var targetWidget = thisWidget.find(".osl-evt__widget-card .osl-evt__widget-card-body");
						
						//그리드스택
						var gridStackId = thisWidget.closest(".osl-evt__grid-stack-area").attr("id");
						var gridStack = widgetSettingGridStack[gridStackId];
						
						//위젯 세팅 시 정보 바로 보관해두기 위해서
						//현재 요청자
						//var usrId = $.osl.user.userInfo.usrId;
						
						//구분자
						var callId = this.callId;
						
						return {
							//새로고침 버튼 누르면 호출
							reload : function(){ 
								/**** 검색 조건 ****/
								//대시보드 검색조건 공통
								var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
								
								//위젯의 설정 값 추가
								$.each(optionKey, function(wgtOptKey, map){
									dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
								});
								
								//구분자
								dshSearchParams["callId"] = callId;
								
								/**** 조회 param 합치기 ****/
								dshSearchParams["baseGrp"] = "prjId";
								//dshSearchParams["reqUsrId"] = usrId;
								//티켓 분류 REQ00018 - 01 보안 정책, 02 이상징후, 03 외부
								dshSearchParams["reqClsType"] = "01";
								//로그 연결 여부 CMM00001 - 01 예, 02 아니오
								dshSearchParams["logLnkCd"] = "02";
								
								/**** 검색 조건 끝 ****/
								
								//AJAX 설정
								var ajaxObj = new $.osl.ajaxRequestAction(
										{"url":"/wgt/wgt1000/wgt1100/selectWgt1100WidgetReloadAjax.do", "async":"false"}
										,dshSearchParams);
								//AJAX 전송 성공 함수
								ajaxObj.setFnSuccess(function(data){
									//오류
									if(data.errorYn == "Y"){
										$.osl.alert(data.message,{type: 'error'});
										//모달 창 닫기
										$.osl.layerPopupClose();
									}
									//성공
									else{
										//totalCnt, acceptStayCnt, progressIngCnt, acceptRejectCnt, progressEndCnt, signRejectCnt, progressRejectCnt 존재
										var ticketAllCnt = data.ticketAllCnt;
										
										//담당자
										//chargerNoneCnt, chargerDoneCnt, chargerUsrCnt존재
										var ticketInPrsChgCnt = data.ticketInPrsChgCnt;
										
										//전체 카운트(처리중, 완료)
										var ticketInProgressCnt = Number(ticketAllCnt["progressIngCnt"]) + Number(ticketAllCnt["progressEndCnt"]);
										//처리 완료 카운트
										var ticketEndProgressCnt = Number(ticketAllCnt["progressEndCnt"]);
										
										//비율 계산
										var ticketRatio = 0;
										if(ticketInProgressCnt != 0 && ticketEndProgressCnt != 0){
											ticketRatio = ((ticketEndProgressCnt/ticketInProgressCnt)*100).toFixed(1);
											if(ticketInProgressCnt == ticketEndProgressCnt){
												ticketRatio = 100;
											}
										}
										
										//숫자 넣기
										targetWidget.find(".osl-evt__ticket--progress-percent").text(ticketRatio+"%");
										
										//스타일 넣기
										targetWidget.find(".osl-evt__progress-bar").attr("style", "width:"+ticketRatio+"%;");
										
										//처리율 넣기
										targetWidget.find(".osl-evt__progress-circle-bar-num").attr("style", "--value:"+ticketRatio+";");
										targetWidget.find(".osl-evt__progress-circle-bar-num--label").attr("style", "--value:"+ticketRatio+";");
										targetWidget.find(".osl-evt__progress-circle-bar-num--label").text(ticketRatio+"%");
										
										//종합 갯수 표출
										targetWidget.find(".osl-evt__ticket--all-count").text(ticketAllCnt["totalCnt"]);
										targetWidget.find(".osl-evt__ticket--stay-count").text(ticketAllCnt["acceptStayCnt"]);
										targetWidget.find(".osl-evt__ticket--progress-count").text(ticketAllCnt["progressIngCnt"]);
										targetWidget.find(".osl-evt__ticket--progress-charger-usr-count").text(ticketInPrsChgCnt["chargerUsrCnt"] + "/" +ticketInPrsChgCnt["chargerDoneCnt"]);
										targetWidget.find(".osl-evt__ticket--progress-charger-none-count").text(ticketInPrsChgCnt["chargerNoneCnt"]);
										targetWidget.find(".osl-evt__ticket--finish-count").text(ticketAllCnt["progressEndCnt"]);
										targetWidget.find(".osl-evt__ticket--stop-count").text(Number(ticketAllCnt["acceptRejectCnt"])+Number(ticketAllCnt["signRejectCnt"])+Number(ticketAllCnt["progressRejectCnt"]));
									}
								});
								
								return ajaxObj.send();
							},
							init : function(){
								//조회
								var ajaxObj = this.reload();
								
								ajaxObj.done(function(){
									//위젯 처리율 내 유형 클릭 시 팝업 표출
									targetWidget.off("click").on("click", ".osl-evt__ticket--ratio-btn", function(){
										/**** 검색 조건 ****/
										//대시보드 검색조건 공통
										var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
										
										//위젯의 설정 값 추가
										$.each(optionKey, function(wgtOptKey, map){
											dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
										});
										
										//구분자
										dshSearchParams["callId"] = callId;
										
										//REQ00008
										var reqProType = $(this).data("req-pro-type");
										
										//팝업 타이틀에 추가 및 검색 조건 추가
										var reqProTypeNm = "";
										if(reqProType == "-1"){
											reqProTypeNm = "전체";
											reqProType = null;
										}
										else if(reqProType == "01"){
											reqProTypeNm = "접수 대기";
										}
										else if(reqProType == "02"){
											reqProTypeNm = "처리중";
											//담당자 확인
											var chargerType = $(this).data("req-charger");
											
											//-1, usr, none
											//담당자 존재
											if(chargerType == "usr"){
												dshSearchParams["reqChargerNotNull"] = "true";
											}
											//담당자가 없는 것
											else if(chargerType == "none"){
												dshSearchParams["reqChargerNull"] = "true";
											}
											
										}
										else if(reqProType == "04"){
											reqProTypeNm = "처리 완료";
										}
										else if(reqProType == "end"){
											reqProTypeNm = "종료";
											
											//reqProTypeList 만들어 전달
											//REQ00008 01 접수 요청, 02 처리중, 03 반려, 04 최종 완료, 05 결재 반려 종료, 06 중간 종료
											var reqProTypeList = ["03", "05", "06"];
											
											//종료 유형
											dshSearchParams["reqProTypeList"] = reqProTypeList;
										}
										
										/**** 조회 param 합치기 ****/
										dshSearchParams["baseGrp"] = "prjId";
										//dshSearchParams["reqUsrId"] = usrId;
										//REQ00008 01 접수대기 02 처리중 03 반려 04 완료 05 결재반려후 종료 06 중간 종료
										dshSearchParams["reqProType"] = reqProType;
										//티켓 분류 REQ00018 - 01 보안 정책, 02 이상징후, 03 외부
										dshSearchParams["reqClsType"] = "01";
										//로그 연결 여부 CMM00001 - 01 예, 02 아니오
										dshSearchParams["logLnkCd"] = "02";
										
										/**** 검색 조건 끝 ****/
										
										var dataParam = {
												// 데이터 조회 URL
												url : "/wgt/wgt1000/wgt1100/selectWgt1100GetReqListAjax.do",
												//조회 파라미터
												params : dshSearchParams,
												//데이터 테이블 & 팝업 옵션
												option : {
													showBtns : ["reqDetail"],
													submitBtnCd : false, // submit 버튼 표출 유무
												}
										};
										
										var data = {
												type : "list",
												reqType : "01", //티켓
												currentIdKey : callId,
												dataParam : JSON.stringify(dataParam)
										};
										
										var options = {
												idKey: callId,
												modalTitle : "["+reqProTypeNm+"] 보안 티켓 목록",
												closeConfirm: false,
												autoHeight: true,
												modalSize: "xl",
												callback:[{
													targetId : "cmm6206ModalCallbackBtn",
													actionFn : function(thisObj){
														//모든 위젯 초기화
														gridStack.fnRefresh();
													}
												}]
										};
										
										$.osl.layerPopupOpen('/cmm/cmm6000/cmm6200/selectCmm6206View.do',data,options);
									});
								});
							}
						}
					}
				},
				"4X1": {
					//구분자
					callId : "ticketAll",
					//boolean default false
					fullType : false,
					addFullTypeClass : "",
					//class
					cardClass : '',
					cardBodyClass : '',
					//string Y, N, D default N, card-title에 wgtGrpNm과 동시 표출 유무
					//Y - 동시 표출, N - wgtGrpNm만 표출, D - label 만 표출
					addLabel: "Y",
					//text
					label : `처리 현황`,
					//class
					icon : `fas fa-percentage`,
					//html
					toolbar : ``,
					//html
					content : `
						<div class="d-table table-layout-fixed w-100 h-100">
							<div class="d-table-cell align-middle text-center progress-circle-wrap osl-progress-circle--back-light w-50">
								<svg class="progress-circle" viewBox="0 0 140 140" width="150px" height="150px">
									<circle class="progress-circle-frame" cx="70" cy="70" r="60" />
									<circle class="progress-circle-bar osl-evt__progress-circle-bar-num" cx="70" cy="70" r="60" style="--value:35"/>
								</svg>
								<div class="progress-circle-num point-label osl-evt__progress-circle-bar-num--label" style="--value:35">35.0%</div>
								<div class="progress-circle-label point-label weak">처리율</div>
							</div>
							<div class="d-table-cell align-middle">
								<div class="point-label weak ms-4 me-10 position-relative">
									<div class="d-flex flex-wrap point-area-hover--bullet point-area-hover-dark--bullet cursor-pointer mb-2 osl-evt__ticket--ratio-btn" data-req-pro-type="-1">
										<div class="w-50 text-start">
											<span class="ms-4" data-lang-cd="">전체</span>
										</div>
										<div class="w-50 text-end">
											<span class="osl-evt__ticket--all-count me-4">999+</span>
										</div>
									</div>
									<div class="d-flex flex-wrap point-area-hover--bullet point-area-hover-info--bullet cursor-pointer mb-2 osl-evt__ticket--ratio-btn" data-req-pro-type="01">
										<div class="w-50 text-start">
											<span class="ms-4" data-lang-cd="">대기</span>
										</div>
										<div class="w-50 text-end">
											<span class="osl-evt__ticket--stay-count me-4">999+</span>
										</div>
									</div>
									<div class="d-flex flex-wrap point-area-hover--bullet point-area-hover-primary--bullet cursor-pointer mb-2 osl-evt__ticket--ratio-btn" data-req-pro-type="02">
										<div class="w-50 text-start">
											<span class="ms-4" data-lang-cd="">처리</span>
										</div>
										<div class="w-50 text-end">
											<span class="osl-evt__ticket--progress-count me-4">999+</span>
										</div>
									</div>
									<div class="d-flex flex-wrap point-area-hover--bullet point-area-hover-success--bullet cursor-pointer mb-2 osl-evt__ticket--ratio-btn" data-req-pro-type="04">
										<div class="w-50 text-start">
											<span class="ms-4" data-lang-cd="">완료</span>
										</div>
										<div class="w-50 text-end">
											<span class="osl-evt__ticket--finish-count me-4">999+</span>
										</div>
									</div>
									<div class="d-flex flex-wrap point-area-hover--bullet point-area-hover-danger--bullet cursor-pointer mb-2 osl-evt__ticket--ratio-btn" data-req-pro-type="end">
										<div class="w-50 text-start">
											<span class="ms-4" data-lang-cd="">종료</span>
										</div>
										<div class="w-50 text-end">
											<span class="osl-evt__ticket--stop-count me-4">999+</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					`,
					actionFn : function(){
						var widgetId = this.widgetId;
						var optionKey = this.optionKey;
						
						//대상 위젯
						var thisWidget = $(`.osl-evt__widget-item[gs-id="${widgetId}"]`);
						//위젯 설정 시 이벤트가 호출되면 안되기 때문에 실제 이벤트 지정될 영역
						var targetWidget = thisWidget.find(".osl-evt__widget-card .osl-evt__widget-card-body");
						
						//그리드스택
						var gridStackId = thisWidget.closest(".osl-evt__grid-stack-area").attr("id");
						var gridStack = widgetSettingGridStack[gridStackId];
						
						//위젯 세팅 시 정보 바로 보관해두기 위해서
						//현재 요청자
						//var usrId = $.osl.user.userInfo.usrId;
						
						//구분자
						var callId = this.callId;
						
						return {
							//새로고침 버튼 누르면 호출
							reload : function(){ 
								/**** 검색 조건 ****/
								//대시보드 검색조건 공통
								var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
								
								//위젯의 설정 값 추가
								$.each(optionKey, function(wgtOptKey, map){
									dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
								});
								
								//구분자
								dshSearchParams["callId"] = callId;
								
								/**** 조회 param 합치기 ****/
								dshSearchParams["baseGrp"] = "prjId";
								//dshSearchParams["reqUsrId"] = usrId;
								//티켓 분류 REQ00018 - 01 보안 정책, 02 이상징후, 03 외부
								dshSearchParams["reqClsType"] = "01";
								//로그 연결 여부 CMM00001 - 01 예, 02 아니오
								dshSearchParams["logLnkCd"] = "02";
								
								/**** 검색 조건 끝 ****/
								
								//AJAX 설정
								var ajaxObj = new $.osl.ajaxRequestAction(
										{"url":"/wgt/wgt1000/wgt1100/selectWgt1100WidgetReloadAjax.do", "async":"false"}
										,dshSearchParams);
								//AJAX 전송 성공 함수
								ajaxObj.setFnSuccess(function(data){
									//오류
									if(data.errorYn == "Y"){
										$.osl.alert(data.message,{type: 'error'});
										//모달 창 닫기
										$.osl.layerPopupClose();
									}
									//성공
									else{
										//totalCnt, acceptStayCnt, progressIngCnt, acceptRejectCnt, progressEndCnt, signRejectCnt, progressRejectCnt 존재
										var ticketAllCnt = data.ticketAllCnt;
										
										//전체 카운트(처리중, 완료)
										var ticketInProgressCnt = Number(ticketAllCnt["progressIngCnt"]) + Number(ticketAllCnt["progressEndCnt"]);
										//처리 완료 카운트
										var ticketEndProgressCnt = Number(ticketAllCnt["progressEndCnt"]);
										
										//비율 계산
										var ticketRatio = 0;
										if(ticketInProgressCnt != 0 && ticketEndProgressCnt != 0){
											ticketRatio = ((ticketEndProgressCnt/ticketInProgressCnt)*100).toFixed(1);
											if(ticketInProgressCnt == ticketEndProgressCnt){
												ticketRatio = 100;
											}
										}
										
										//처리율 넣기
										targetWidget.find(".osl-evt__progress-circle-bar-num").attr("style", "--value:"+ticketRatio+";");
										targetWidget.find(".osl-evt__progress-circle-bar-num--label").attr("style", "--value:"+ticketRatio+";");
										targetWidget.find(".osl-evt__progress-circle-bar-num--label").text(ticketRatio+"%");
										
										//종합 갯수 표출
										targetWidget.find(".osl-evt__ticket--all-count").text(ticketAllCnt["totalCnt"]);
										targetWidget.find(".osl-evt__ticket--stay-count").text(ticketAllCnt["acceptStayCnt"]);
										targetWidget.find(".osl-evt__ticket--progress-count").text(ticketAllCnt["progressIngCnt"]);
										targetWidget.find(".osl-evt__ticket--finish-count").text(ticketAllCnt["progressEndCnt"]);
										targetWidget.find(".osl-evt__ticket--stop-count").text(Number(ticketAllCnt["acceptRejectCnt"])+Number(ticketAllCnt["signRejectCnt"])+Number(ticketAllCnt["progressRejectCnt"]));
									}
								});
								
								return ajaxObj.send();
							},
							init : function(){
								//조회
								var ajaxObj = this.reload();
								
								ajaxObj.done(function(){
									//위젯 처리율 내 유형 클릭 시 팝업 표출
									targetWidget.off("click").on("click", ".osl-evt__ticket--ratio-btn", function(){
										/**** 검색 조건 ****/
										//대시보드 검색조건 공통
										var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
										
										//위젯의 설정 값 추가
										$.each(optionKey, function(wgtOptKey, map){
											dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
										});
										
										//구분자
										dshSearchParams["callId"] = callId;
										
										//REQ00008
										var reqProType = $(this).data("req-pro-type");
										
										//팝업 타이틀에 추가 및 검색 조건 추가
										var reqProTypeNm = "";
										if(reqProType == "-1"){
											reqProTypeNm = "전체";
											reqProType = null;
										}
										else if(reqProType == "01"){
											reqProTypeNm = "접수 대기";
										}
										else if(reqProType == "02"){
											reqProTypeNm = "처리중";
										}
										else if(reqProType == "04"){
											reqProTypeNm = "처리 완료";
										}
										else if(reqProType == "end"){
											reqProTypeNm = "종료";
											
											//reqProTypeList 만들어 전달
											//REQ00008 01 접수 요청, 02 처리중, 03 반려, 04 최종 완료, 05 결재 반려 종료, 06 중간 종료
											var reqProTypeList = ["03", "05", "06"];
											
											//종료 유형
											dshSearchParams["reqProTypeList"] = reqProTypeList;
										}
										
										/**** 조회 param 합치기 ****/
										dshSearchParams["baseGrp"] = "prjId";
										//dshSearchParams["reqUsrId"] = usrId;
										//REQ00008 01 접수대기 02 처리중 03 반려 04 완료 05 결재반려후 종료 06 중간 종료
										dshSearchParams["reqProType"] = reqProType;
										//티켓 분류 REQ00018 - 01 보안 정책, 02 이상징후, 03 외부
										dshSearchParams["reqClsType"] = "01";
										//로그 연결 여부 CMM00001 - 01 예, 02 아니오
										dshSearchParams["logLnkCd"] = "02";
										
										/**** 검색 조건 끝 ****/
										
										var dataParam = {
												// 데이터 조회 URL
												url : "/wgt/wgt1000/wgt1100/selectWgt1100GetReqListAjax.do",
												//조회 파라미터
												params : dshSearchParams,
												//데이터 테이블 & 팝업 옵션
												option : {
													showBtns : ["reqDetail"],
													submitBtnCd : false, // submit 버튼 표출 유무
												}
										};
										
										var data = {
												type : "list",
												reqType : "01", //티켓
												currentIdKey : callId,
												dataParam : JSON.stringify(dataParam)
										};
										
										var options = {
												idKey: callId,
												modalTitle : "["+reqProTypeNm+"] 보안 티켓 목록",
												closeConfirm: false,
												autoHeight: true,
												modalSize: "xl",
												callback:[{
													targetId : "cmm6206ModalCallbackBtn",
													actionFn : function(thisObj){
														//모든 위젯 초기화
														gridStack.fnRefresh();
													}
												}]
										};
										
										$.osl.layerPopupOpen('/cmm/cmm6000/cmm6200/selectCmm6206View.do',data,options);
									});
								});
							}
						}
					}
				},
			},
			//신호등
			"WGTREQ1000100008" : {
				size : ["2X1", "4X1"],
				"2X1": {
					//구분자
					callId : "ticketTraffic",
					//boolean default false
					fullType : false,
					addFullTypeClass : "",
					//class
					cardClass : '',
					cardBodyClass : '',
					//string Y, N, D default N, card-title에 wgtGrpNm과 동시 표출 유무
					//Y - 동시 표출, N - wgtGrpNm만 표출, D - label 만 표출
					addLabel: "Y",
					//text
					label : `신호등`,
					//class
					icon : `fas fa-traffic-light`,
					//html
					toolbar : ``,
					//html
					content : `
						<div class="d-table table-layout-fixed w-100 h-100">
							<div class="d-table-cell align-middle text-center rounded osl-area-hover cursor-pointer osl-evt__ticket--traffic-btn" data-req-traffic-type="yet">
								<div class="d-flex flex-column align-items-center justify-content-center">
									<div class="d-flex align-items-center justify-content-center w-80px h-80px rounded-circle bg-gray-500">
										<div class="point-label strong mt-auto mb-auto text-dark osl-evt__ticket--yet-count">
											999+
										</div>
									</div>
									<div class="point-label mt-4">
										<span class="" data-lang-cd="">
											미정
										</span>
									</div>
								</div>
							</div>
							<div class="d-table-cell align-middle text-center rounded osl-area-hover cursor-pointer osl-evt__ticket--traffic-btn" data-req-traffic-type="around">
								<div class="d-flex flex-column align-items-center justify-content-center">
									<div class="d-flex align-items-center justify-content-center w-80px h-80px rounded-circle bg-orange">
										<div class="point-label strong mt-auto mb-auto text-dark osl-evt__ticket--around-count">
											999+
										</div>
									</div>
									<div class="point-label mt-4">
										<span class="" data-lang-cd="">
											임박
										</span>
									</div>
								</div>
							</div>
							<div class="d-table-cell align-middle text-center rounded osl-area-hover cursor-pointer osl-evt__ticket--traffic-btn" data-req-traffic-type="over">
								<div class="d-flex flex-column align-items-center justify-content-center">
									<div class="d-flex align-items-center justify-content-center w-80px h-80px rounded-circle bg-danger">
										<div class="point-label strong mt-auto mb-auto text-dark osl-evt__ticket--over-count">
											999+
										</div>
									</div>
									<div class="point-label mt-4">
										<span class="" data-lang-cd="">
											초과
										</span>
									</div>
								</div>
							</div>
						</div>
					`,
					actionFn : function(){
						var widgetId = this.widgetId;
						var optionKey = this.optionKey;
						
						//대상 위젯
						var thisWidget = $(`.osl-evt__widget-item[gs-id="${widgetId}"]`);
						//위젯 설정 시 이벤트가 호출되면 안되기 때문에 실제 이벤트 지정될 영역
						var targetWidget = thisWidget.find(".osl-evt__widget-card .osl-evt__widget-card-body");
						
						//그리드스택
						var gridStackId = thisWidget.closest(".osl-evt__grid-stack-area").attr("id");
						var gridStack = widgetSettingGridStack[gridStackId];
						
						//위젯 세팅 시 정보 바로 보관해두기 위해서
						//현재 요청자
						//var usrId = $.osl.user.userInfo.usrId;
						
						//구분자
						var callId = this.callId;
						
						return {
							//새로고침 버튼 누르면 호출
							reload : function(){ 
								/**** 검색 조건 ****/
								//대시보드 검색조건 공통
								var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
								
								//위젯의 설정 값 추가
								$.each(optionKey, function(wgtOptKey, map){
									dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
								});
								
								//구분자
								dshSearchParams["callId"] = callId;
								
								
								/**** 조회 param 합치기 ****/
								dshSearchParams["baseGrp"] = "prjId";
								//dshSearchParams["reqUsrId"] = usrId;
								//티켓 분류 REQ00018 - 01 보안 정책, 02 이상징후, 03 외부
								dshSearchParams["reqClsType"] = "01";
								//로그 연결 여부 CMM00001 - 01 예, 02 아니오
								dshSearchParams["logLnkCd"] = "02";
								
								/**** 검색 조건 끝 ****/
								
								//AJAX 설정
								var ajaxObj = new $.osl.ajaxRequestAction(
										{"url":"/wgt/wgt1000/wgt1100/selectWgt1100WidgetReloadAjax.do", "async":"false"}
										,dshSearchParams);
								//AJAX 전송 성공 함수
								ajaxObj.setFnSuccess(function(data){
									//오류
									if(data.errorYn == "Y"){
										$.osl.alert(data.message,{type: 'error'});
										//모달 창 닫기
										$.osl.layerPopupClose();
									}
									//성공
									else{
										//totalCnt, reqFreeCnt, reqAroundCnt, reqOverCnt, reqFailCnt, reqSuccessCnt 존재
										var ticketTrafficLightCnt = data.ticketTrafficLightCnt;
										
										//미정 : 접수 후 처리중으로 넘어왔는데, 아무 작업도 안한 경우 업무 시작/종료 예정일이 모두 null
										var reqYetCnt = Number(ticketTrafficLightCnt["reqYetCnt"]);
										if(reqYetCnt > 999) {
											reqYetCnt = "999+";
										}
										/*
										//여유
										var reqFreeCnt = Number(ticketTrafficLightCnt["reqFreeCnt"]);
										if(reqFreeCnt > 999) {
											reqFreeCnt = "999+";
										}
										*/
										//임박
										var reqAroundCnt = Number(ticketTrafficLightCnt["reqAroundCnt"]);
										if(reqAroundCnt > 999) {
											reqAroundCnt = "999+";
										}
										//초과
										var reqOverCnt = Number(ticketTrafficLightCnt["reqOverCnt"]);
										if(reqOverCnt > 999) {
											reqOverCnt = "999+";
										}
										
										//종합 갯수 표출
										targetWidget.find(".osl-evt__ticket--yet-count").text(reqYetCnt);
										targetWidget.find(".osl-evt__ticket--around-count").text(reqAroundCnt);
										targetWidget.find(".osl-evt__ticket--over-count").text(reqOverCnt);
									}
								});
								
								return ajaxObj.send();
							},
							init : function(){
								//조회
								var ajaxObj = this.reload();
								
								ajaxObj.done(function(){
									//이벤트
									targetWidget.off("click").on("click", ".osl-evt__ticket--traffic-btn", function(){
										var trafficType = $(this).data("req-traffic-type");
										
										if($.osl.isNull(trafficType)){
											return;
										}
										//신호등 유형에 따라 팝업 호출
										else {
											
											//추후 언어팩으로 변경 ex) widget.traffic.free
											var trafficTypeNm = "";
											if(trafficType == "yet") {
												trafficTypeNm = "미정";
											}
											if(trafficType == "free") {
												trafficTypeNm = "여유";
											}
											else if(trafficType == "around") {
												trafficTypeNm = "임박";
											}
											else if(trafficType == "over") {
												trafficTypeNm = "초과";
											}
											else if(trafficType == "fail") {
												trafficTypeNm = "실패";
											}
											else if(trafficType == "success") {
												trafficTypeNm = "성공";
											}
											
											
											/**** 검색 조건 ****/
											//대시보드 검색조건 공통
											var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
											
											//위젯의 설정 값 추가
											$.each(optionKey, function(wgtOptKey, map){
												dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
											});
											
											//구분자
											dshSearchParams["callId"] = callId;
											
											/**** 조회 param 합치기 ****/
											dshSearchParams["baseGrp"] = "prjId";
											//dshSearchParams["reqUsrId"] = usrId;
											//티켓 분류 REQ00018 - 01 보안 정책, 02 이상징후, 03 외부
											dshSearchParams["reqClsType"] = "01";
											//로그 연결 여부 CMM00001 - 01 예, 02 아니오
											dshSearchParams["logLnkCd"] = "02";
											//신호등 구분
											dshSearchParams["trafficType"] = trafficType;
											
											/**** 검색 조건 끝 ****/
											
											var dataParam = {
													// 데이터 조회 URL
													url : "/wgt/wgt1000/wgt1100/selectWgt1100GetReqTrafficListAjax.do",
													//조회 파라미터
													params : dshSearchParams,
													//데이터 테이블 & 팝업 옵션
													option : {
														showBtns : ["reqDetail"],
														submitBtnCd : false, // submit 버튼 표출 유무
													}
											};
											
											var data = {
													type : "list",
													reqType : "01", //티켓
													currentIdKey : callId,
													dataParam : JSON.stringify(dataParam)
											};
											
											var options = {
													idKey: callId,
													modalTitle : "["+trafficTypeNm+"] 보안 티켓 목록",
													closeConfirm: false,
													autoHeight: true,
													modalSize: "xl",
													callback:[{
														targetId : "cmm6206ModalCallbackBtn",
														actionFn : function(thisObj){
															//모든 위젯 초기화
															gridStack.fnRefresh();
														}
													}]
											};
											
											$.osl.layerPopupOpen('/cmm/cmm6000/cmm6200/selectCmm6206View.do',data,options);
										}
									});
								});
							}
						}
					}
				},
				"4X1": {
					//구분자
					callId : "ticketTraffic",
					//boolean default false
					fullType : false,
					addFullTypeClass : "",
					//class
					cardClass : '',
					cardBodyClass : '',
					//string Y, N, D default N, card-title에 wgtGrpNm과 동시 표출 유무
					//Y - 동시 표출, N - wgtGrpNm만 표출, D - label 만 표출
					addLabel: "Y",
					//text
					label : `신호등`,
					//class
					icon : `fas fa-traffic-light`,
					//html
					toolbar : ``,
					//html
					content : `
						<div class="d-table table-layout-fixed w-100 h-100">
							<div class="d-table-cell align-middle text-center rounded osl-area-hover cursor-pointer osl-evt__ticket--traffic-btn" data-req-traffic-type="yet">
								<div class="d-flex flex-column align-items-center justify-content-center">
									<div class="d-flex align-items-center justify-content-center w-80px h-80px rounded-circle bg-gray-500">
										<div class="point-label strong mt-auto mb-auto text-dark osl-evt__ticket--yet-count">
											999+
										</div>
									</div>
									<div class="point-label mt-4">
										<span class="" data-lang-cd="">
											미정
										</span>
									</div>
								</div>
							</div>
							<div class="d-table-cell align-middle text-center rounded osl-area-hover cursor-pointer osl-evt__ticket--traffic-btn" data-req-traffic-type="around">
								<div class="d-flex flex-column align-items-center justify-content-center">
									<div class="d-flex align-items-center justify-content-center w-80px h-80px rounded-circle bg-orange">
										<div class="point-label strong mt-auto mb-auto text-dark osl-evt__ticket--around-count">
											999+
										</div>
									</div>
									<div class="point-label mt-4">
										<span class="" data-lang-cd="">
											임박
										</span>
									</div>
								</div>
							</div>
							<div class="d-table-cell align-middle text-center rounded osl-area-hover cursor-pointer osl-evt__ticket--traffic-btn" data-req-traffic-type="over">
								<div class="d-flex flex-column align-items-center justify-content-center">
									<div class="d-flex align-items-center justify-content-center w-80px h-80px rounded-circle bg-danger">
										<div class="point-label strong mt-auto mb-auto text-dark osl-evt__ticket--over-count">
											999+
										</div>
									</div>
									<div class="point-label mt-4">
										<span class="" data-lang-cd="">
											초과
										</span>
									</div>
								</div>
							</div>
							<div class="d-table-cell align-middle text-center rounded osl-area-hover cursor-pointer osl-evt__ticket--traffic-btn" data-req-traffic-type="fail">
								<div class="d-flex flex-column align-items-center justify-content-center">
									<div class="d-flex align-items-center justify-content-center w-80px h-80px rounded-circle bg-primary">
										<div class="point-label strong mt-auto mb-auto text-dark osl-evt__ticket--fail-count">
											999+
										</div>
									</div>
									<div class="point-label mt-4">
										<span class="" data-lang-cd="">
											실패
										</span>
									</div>
								</div>
							</div>
							<div class="d-table-cell align-middle text-center rounded osl-area-hover cursor-pointer osl-evt__ticket--traffic-btn" data-req-traffic-type="success">
								<div class="d-flex flex-column align-items-center justify-content-center">
									<div class="d-flex align-items-center justify-content-center w-80px h-80px rounded-circle bg-success">
										<div class="point-label strong mt-auto mb-auto text-dark osl-evt__ticket--success-count">
											999+
										</div>
									</div>
									<div class="point-label mt-4">
										<span class="" data-lang-cd="">
											성공
										</span>
									</div>
								</div>
							</div>
						</div>
					`,
					actionFn : function(){
						var widgetId = this.widgetId;
						var optionKey = this.optionKey;
						
						//대상 위젯
						var thisWidget = $(`.osl-evt__widget-item[gs-id="${widgetId}"]`);
						//위젯 설정 시 이벤트가 호출되면 안되기 때문에 실제 이벤트 지정될 영역
						var targetWidget = thisWidget.find(".osl-evt__widget-card .osl-evt__widget-card-body");
						
						//그리드스택
						var gridStackId = thisWidget.closest(".osl-evt__grid-stack-area").attr("id");
						var gridStack = widgetSettingGridStack[gridStackId];
						
						//위젯 세팅 시 정보 바로 보관해두기 위해서
						//현재 요청자
						//var usrId = $.osl.user.userInfo.usrId;
						
						//구분자
						var callId = this.callId;
						
						return {
							//새로고침 버튼 누르면 호출
							reload : function(){ 
								/**** 검색 조건 ****/
								//대시보드 검색조건 공통
								var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
								
								//위젯의 설정 값 추가
								$.each(optionKey, function(wgtOptKey, map){
									dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
								});
								
								//구분자
								dshSearchParams["callId"] = callId;
								
								
								/**** 조회 param 합치기 ****/
								dshSearchParams["baseGrp"] = "prjId";
								//dshSearchParams["reqUsrId"] = usrId;
								//티켓 분류 REQ00018 - 01 보안 정책, 02 이상징후, 03 외부
								dshSearchParams["reqClsType"] = "01";
								//로그 연결 여부 CMM00001 - 01 예, 02 아니오
								dshSearchParams["logLnkCd"] = "02";
								
								/**** 검색 조건 끝 ****/
								
								//AJAX 설정
								var ajaxObj = new $.osl.ajaxRequestAction(
										{"url":"/wgt/wgt1000/wgt1100/selectWgt1100WidgetReloadAjax.do", "async":"false"}
										,dshSearchParams);
								//AJAX 전송 성공 함수
								ajaxObj.setFnSuccess(function(data){
									//오류
									if(data.errorYn == "Y"){
										$.osl.alert(data.message,{type: 'error'});
										//모달 창 닫기
										$.osl.layerPopupClose();
									}
									//성공
									else{
										//totalCnt, reqFreeCnt, reqAroundCnt, reqOverCnt, reqFailCnt, reqSuccessCnt 존재
										var ticketTrafficLightCnt = data.ticketTrafficLightCnt;
										
										//미정 : 접수 후 처리중으로 넘어왔는데, 아무 작업도 안한 경우 업무 시작/종료 예정일이 모두 null
										var reqYetCnt = Number(ticketTrafficLightCnt["reqYetCnt"]);
										if(reqYetCnt > 999) {
											reqYetCnt = "999+";
										}
										/*
										//여유
										var reqFreeCnt = Number(ticketTrafficLightCnt["reqFreeCnt"]);
										if(reqFreeCnt > 999) {
											reqFreeCnt = "999+";
										}
										*/
										//임박
										var reqAroundCnt = Number(ticketTrafficLightCnt["reqAroundCnt"]);
										if(reqAroundCnt > 999) {
											reqAroundCnt = "999+";
										}
										//초과
										var reqOverCnt = Number(ticketTrafficLightCnt["reqOverCnt"]);
										if(reqOverCnt > 999) {
											reqOverCnt = "999+";
										}
										//실패
										var reqFailCnt = Number(ticketTrafficLightCnt["reqFailCnt"]);
										if(reqFailCnt > 999) {
											reqFailCnt = "999+";
										}
										//성공
										var reqSuccessCnt = Number(ticketTrafficLightCnt["reqSuccessCnt"]);
										if(reqSuccessCnt > 999) {
											reqSuccessCnt = "999+";
										}
										
										//종합 갯수 표출
										targetWidget.find(".osl-evt__ticket--yet-count").text(reqYetCnt);
										//targetWidget.find(".osl-evt__ticket--free-count").text(reqFreeCnt);
										targetWidget.find(".osl-evt__ticket--around-count").text(reqAroundCnt);
										targetWidget.find(".osl-evt__ticket--over-count").text(reqOverCnt);
										targetWidget.find(".osl-evt__ticket--fail-count").text(reqFailCnt);
										targetWidget.find(".osl-evt__ticket--success-count").text(reqSuccessCnt);
									}
								});
								
								return ajaxObj.send();
							},
							init : function(){
								//조회
								var ajaxObj = this.reload();
								
								ajaxObj.done(function(){
									//이벤트
									targetWidget.off("click").on("click", ".osl-evt__ticket--traffic-btn", function(){
										var trafficType = $(this).data("req-traffic-type");
										
										if($.osl.isNull(trafficType)){
											return;
										}
										//신호등 유형에 따라 팝업 호출
										else {
											
											//추후 언어팩으로 변경 ex) widget.traffic.free
											var trafficTypeNm = "";
											if(trafficType == "yet") {
												trafficTypeNm = "미정";
											}
											if(trafficType == "free") {
												trafficTypeNm = "여유";
											}
											else if(trafficType == "around") {
												trafficTypeNm = "임박";
											}
											else if(trafficType == "over") {
												trafficTypeNm = "초과";
											}
											else if(trafficType == "fail") {
												trafficTypeNm = "실패";
											}
											else if(trafficType == "success") {
												trafficTypeNm = "성공";
											}
											
											
											/**** 검색 조건 ****/
											//대시보드 검색조건 공통
											var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
											
											//위젯의 설정 값 추가
											$.each(optionKey, function(wgtOptKey, map){
												dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
											});
											
											//구분자
											dshSearchParams["callId"] = callId;
											
											/**** 조회 param 합치기 ****/
											dshSearchParams["baseGrp"] = "prjId";
											//dshSearchParams["reqUsrId"] = usrId;
											//티켓 분류 REQ00018 - 01 보안 정책, 02 이상징후, 03 외부
											dshSearchParams["reqClsType"] = "01";
											//로그 연결 여부 CMM00001 - 01 예, 02 아니오
											dshSearchParams["logLnkCd"] = "02";
											//신호등 구분
											dshSearchParams["trafficType"] = trafficType;
											
											/**** 검색 조건 끝 ****/
											
											var dataParam = {
													// 데이터 조회 URL
													url : "/wgt/wgt1000/wgt1100/selectWgt1100GetReqTrafficListAjax.do",
													//조회 파라미터
													params : dshSearchParams,
													//데이터 테이블 & 팝업 옵션
													option : {
														showBtns : ["reqDetail"],
														submitBtnCd : false, // submit 버튼 표출 유무
													}
											};
											
											var data = {
													type : "list",
													reqType : "01", //티켓
													currentIdKey : callId,
													dataParam : JSON.stringify(dataParam)
											};
											
											var options = {
													idKey: callId,
													modalTitle : "["+trafficTypeNm+"] 보안 티켓 목록",
													closeConfirm: false,
													autoHeight: true,
													modalSize: "xl",
													callback:[{
														targetId : "cmm6206ModalCallbackBtn",
														actionFn : function(thisObj){
															//모든 위젯 초기화
															gridStack.fnRefresh();
														}
													}]
											};
											
											$.osl.layerPopupOpen('/cmm/cmm6000/cmm6200/selectCmm6206View.do',data,options);
										}
									});
								});
							}
						}
					}
				}
			},
			//결재 요청 및 대기
			"WGTREQ1000100009" : {
				size: ["4X1"],
				"4X1" : {
					//구분자
					callId : "ticketSign",
					//boolean default false
					fullType : false,
					addFullTypeClass : "",
					//class
					cardClass : '',
					cardBodyClass : '',
					//string Y, N, D default N, card-title에 wgtGrpNm과 동시 표출 유무
					//Y - 동시 표출, N - wgtGrpNm만 표출, D - label 만 표출
					addLabel: "N",
					//text
					label : `결재`,
					//class
					icon : `fas fa-signature`,
					//html
					toolbar : ``,
					//html
					content : `
						<div class="d-table table-layout-fixed w-100 h-100">
							<div class="d-table-row">
								<div class="d-table-cell align-middle text-center rounded osl-area-hover cursor-pointer osl-evt__ticket--sign-btn" data-req-sign-type="ing">
									<div class="point-title weak osl-evt__ticket--sign-ing-count">
										999+
									</div>
									<div class="">
										<span class="point-label weak" data-lang-cd="">
											결재 중
										</span>
									</div>
								</div>
								<div class="d-table-cell align-middle text-center rounded osl-area-hover cursor-pointer osl-evt__ticket--sign-btn" data-req-sign-type="current">
									<div class="point-title weak osl-evt__ticket--sign-current-count">
										999+
									</div>
									<div class="">
										<span class="point-label weak" data-lang-cd="">
											대기
										</span>
									</div>
								</div>
							</div>
							<div class="d-table-row">
								<div class="d-table-cell align-middle text-center rounded osl-area-hover cursor-pointer osl-evt__ticket--sign-btn" data-req-sign-type="success">
									<div class="point-title weak osl-evt__ticket--sign-success-count">
										999+
									</div>
									<div class="">
										<span class="point-label weak" data-lang-cd="">
											승인
										</span>
									</div>
								</div>
								<div class="d-table-cell align-middle text-center rounded osl-area-hover cursor-pointer osl-evt__ticket--sign-btn" data-req-sign-type="reject">
									<div class="point-title weak osl-evt__ticket--sign-reject-count">
										999+
									</div>
									<div class="">
										<span class="point-label weak" data-lang-cd="">
											반려
										</span>
									</div>
								</div>
							</div>
						</div>
					`,
					actionFn : function(){
						var widgetId = this.widgetId;
						var optionKey = this.optionKey;
						
						//대상 위젯
						var thisWidget = $(`.osl-evt__widget-item[gs-id="${widgetId}"]`);
						//위젯 설정 시 이벤트가 호출되면 안되기 때문에 실제 이벤트 지정될 영역
						var targetWidget = thisWidget.find(".osl-evt__widget-card .osl-evt__widget-card-body");
						
						//그리드스택
						var gridStackId = thisWidget.closest(".osl-evt__grid-stack-area").attr("id");
						var gridStack = widgetSettingGridStack[gridStackId];
						
						//위젯 세팅 시 정보 바로 보관해두기 위해서
						//현재 요청자
						//var usrId = $.osl.user.userInfo.usrId;
						
						//구분자
						var callId = this.callId;
						
						return {
							//새로고침 버튼 누르면 호출
							reload : function(){ 
								/**** 검색 조건 ****/
								//대시보드 검색조건 공통
								var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
								
								//위젯의 설정 값 추가
								$.each(optionKey, function(wgtOptKey, map){
									dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
								});
								
								//구분자
								dshSearchParams["callId"] = callId;
								
								/**** 조회 param 합치기 ****/
								dshSearchParams["baseGrp"] = "prjId";
								//dshSearchParams["reqUsrId"] = usrId;
								//티켓 분류 REQ00018 - 01 보안 정책, 02 이상징후, 03 외부
								dshSearchParams["reqClsType"] = "01";
								//로그 연결 여부 CMM00001 - 01 예, 02 아니오
								dshSearchParams["logLnkCd"] = "02";
								
								/**** 검색 조건 끝 ****/
								
								//AJAX 설정
								var ajaxObj = new $.osl.ajaxRequestAction(
										{"url":"/wgt/wgt1000/wgt1100/selectWgt1100WidgetReloadAjax.do", "async":"false"}
										,dshSearchParams);
								//AJAX 전송 성공 함수
								ajaxObj.setFnSuccess(function(data){
									//오류
									if(data.errorYn == "Y"){
										$.osl.alert(data.message,{type: 'error'});
										//모달 창 닫기
										$.osl.layerPopupClose();
									}
									//성공
									else{
										//내가 기안자인 것 중 현재 결재 중인 것, 현재 결재 차례가 나인 것, 내가 기안자인 것 중 결재 승인된 것, 내가 기안자인 것 중 결재 반려된 것
										//signIngCnt, currentSignCnt, successSignCnt, rejectSignCnt 존재
										var ticketDraftingCnt = data.ticketDraftingCnt;
										
										var ticketSignIngCnt = ticketDraftingCnt["signIngCnt"];
										if(Number(ticketSignIngCnt) > 999){
											ticketSignIngCnt = "999+";
										}
										var ticketCurrentSignCnt = ticketDraftingCnt["currentSignCnt"];
										if(Number(ticketCurrentSignCnt) > 999){
											ticketCurrentSignCnt = "999+";
										}
										var ticketSuccessSignCnt = ticketDraftingCnt["successSignCnt"];
										if(Number(ticketSuccessSignCnt) > 999){
											ticketSuccessSignCnt = "999+";
										}
										var ticketRejectSignCnt = ticketDraftingCnt["rejectSignCnt"];
										if(Number(ticketRejectSignCnt) > 999){
											ticketRejectSignCnt = "999+";
										}
										
										//종합 갯수 표출
										targetWidget.find(".osl-evt__ticket--sign-ing-count").text(ticketSignIngCnt);
										targetWidget.find(".osl-evt__ticket--sign-current-count").text(ticketCurrentSignCnt);
										targetWidget.find(".osl-evt__ticket--sign-success-count").text(ticketSuccessSignCnt);
										targetWidget.find(".osl-evt__ticket--sign-reject-count").text(ticketRejectSignCnt);
									}
								});
								
								return ajaxObj.send();
							},
							init : function(){
								//조회
								var ajaxObj = this.reload();
								
								ajaxObj.done(function(){
									//위젯 자체 클릭 시 결재 팝업 표출
									targetWidget.off("click").on("click", ".osl-evt__ticket--sign-btn", function(){
										/**** 검색 조건 ****/
										//대시보드 검색조건 공통
										var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
										
										//위젯의 설정 값 추가
										$.each(optionKey, function(wgtOptKey, map){
											dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
										});
										
										//구분자
										dshSearchParams["callId"] = callId;
										
										/**** 조회 param 합치기 ****/
										dshSearchParams["baseGrp"] = "prjId";
										//dshSearchParams["reqUsrId"] = usrId;
										//티켓 분류 REQ00018 - 01 보안 정책, 02 이상징후, 03 외부
										dshSearchParams["reqClsType"] = "01";
										//로그 연결 여부 CMM00001 - 01 예, 02 아니오
										dshSearchParams["logLnkCd"] = "02";
										
										//선택 값
										var signType = $(this).data("req-sign-type");
										var signTypeNm = "";
										if(signType == "ing"){
											signTypeNm = "결재 중";
										}
										else if(signType == "current"){
											signTypeNm = "결재 대기";
										}
										else if(signType == "success"){
											signTypeNm = "결재 승인";
										}
										else if(signType == "reject"){
											signTypeNm = "결재 반려";
										}
										
										dshSearchParams["signType"] = signType;
										
										/**** 검색 조건 끝 ****/
										
										var dataParam = {
												// 데이터 조회 URL
												url : "/wgt/wgt1000/wgt1100/selectWgt1100GetReqSignListAjax.do",
												//조회 파라미터
												params : dshSearchParams,
												//데이터 테이블 & 팝업 옵션
												option : {
													showBtns : ["reqDetail"],
													submitBtnCd : false, // submit 버튼 표출 유무
												}
										};
										
										var data = {
												type : "list",
												reqType : "01", //티켓
												currentIdKey : callId,
												dataParam : JSON.stringify(dataParam)
										};
										
										var options = {
												idKey: callId,
												modalTitle : "["+signTypeNm+"] 보안 티켓 목록",
												closeConfirm: false,
												autoHeight: true,
												modalSize: "xl",
												callback:[{
													targetId : "cmm6206ModalCallbackBtn",
													actionFn : function(thisObj){
														//모든 위젯 초기화
														gridStack.fnRefresh();
													}
												}]
										};
										
										$.osl.layerPopupOpen('/cmm/cmm6000/cmm6200/selectCmm6206View.do',data,options);
									});
								});
							}
						}
					}
				}
			},
		}// end 보안행정
		//start : 보안이벤트
		,"req2000" : {
			//티켓 생성
			"WGTREQ2000000001" : {
				//size : ["2X1", "4X1", "4X2", "8X2","12X1"],
				size : ["2X1"],
				"2X1": {
					//구분자
					callId : "newRequestEvt",
					//boolean default false
					//fullType true이면, 타이틀/새로고침 등 표출 안함
					fullType : true,
					addFullTypeClass : "rounded bg-orange",
					//class
					cardClass : "osl-widget-card--v1",
					cardBodyClass : "cursor-pointer",
					//string Y, N, D default N, card-title에 wgtGrpNm과 동시 표출 유무
					//Y - 동시 표출, N - wgtGrpNm만 표출, D - label 만 표출
					addLabel: "N",
					//text
					label : `처리 요청`,
					//class
					icon : ``,
					//html
					toolbar : ``,
					//html
					content : `
					<div class="d-flex flex-stack h-100">
						<div class="my-auto ms-auto">
							<div class="text-end">
								<span class="point-text strong text-inverse-orange me-4" data-lang-cd="">
									(로그 목록)
								</span>
							</div>
							<div>
								<span class="point-label strong text-inverse-orange me-4" data-lang-cd="">
									Event 처리 요청
								</span>
							</div>
						</div>
					</div>
					`,
					actionFn : function(){
						//위젯
						var widgetId = this.widgetId;
						var optionKey = this.optionKey;
						
						//대상 위젯
						var thisWidget = $(`.osl-evt__widget-item[gs-id="${widgetId}"]`);
						//위젯 설정 시 이벤트가 호출되면 안되기 때문에 실제 이벤트 지정될 영역
						var targetWidget = thisWidget.find(".osl-evt__widget-card .osl-evt__widget-card-body");
						
						//위젯 세팅 시 정보 바로 보관해두기 위해서
						//현재 요청자
						//var usrId = $.osl.user.userInfo.usrId;
						
						//그리드스택
						var gridStackId = thisWidget.closest(".osl-evt__grid-stack-area").attr("id");
						var gridStack = widgetSettingGridStack[gridStackId];
						
						//구분자
						var callId = this.callId;
						
						return {
							//사용하지 않으면 $.noop로 선언
							//위젯 재로드
							reload : $.noop,
							//위젯 추가되고 나서 최초 호출
							init : function(){
								//위젯 자체 클릭 시 이벤트 로그 목록 팝업 표출
								targetWidget.off("click").on("click", function(){
									/**** 검색 조건 ****/
									//대시보드 검색조건 공통
									var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
									
									//위젯의 설정 값 추가
									$.each(optionKey, function(wgtOptKey, map){
										dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
									});
									
									//구분자
									dshSearchParams["callId"] = callId;
									
									/**** 조회 param 합치기 ****/
									dshSearchParams["baseGrp"] = "prjId";
									//dshSearchParams["reqUsrId"] = usrId;
									//티켓 분류 REQ00018 - 01 보안 정책, 02 이상징후, 03 외부
									dshSearchParams["reqClsType"] = "02";
									//로그 연결 여부 CMM00001 - 01 예, 02 아니오
									dshSearchParams["logLnkCd"] = "01";
									
									/**** 검색 조건 끝 ****/
									
									var dataParam = {
											// 데이터 조회 URL
											url : "/wgt/wgt1000/wgt1100/selectWgt1100GetReqEvtLogListAjax.do",
											//조회 파라미터
											params : dshSearchParams,
											//데이터 테이블 & 팝업 옵션
											option : {
												showBtns : ["logDetail"],
												submitBtnCd : false, // submit 버튼 표출 유무
											}
									};
									
									var data = {
											type : "list",
											reqType : "05", //로그
											currentIdKey : callId,
											dataParam : JSON.stringify(dataParam)
									};
									
									var options = {
											idKey: callId,
											modalTitle : "로그 목록",
											closeConfirm: false,
											autoHeight: true,
											modalSize: "xl",
											callback:[{
												targetId : "cmm6206ModalCallbackBtn",
												actionFn : function(thisObj){
													//모든 위젯 초기화
													gridStack.fnRefresh();
												}
											}]
									};
									
									$.osl.layerPopupOpen('/cmm/cmm6000/cmm6200/selectCmm6206View.do',data,options);
								});
							}
						};
					}
				},
			},
			//대기
			"WGTREQ2000000002" : {
				size : ["2X1"],
				"2X1": {
					//구분자
					callId : "ticketStay",
					//boolean default false
					fullType : false,
					addFullTypeClass : "",
					//class
					cardClass : "osl-widget-card--v1",
					cardBodyClass : '',
					//string Y, N, D default N, card-title에 wgtGrpNm과 동시 표출 유무
					//Y - 동시 표출, N - wgtGrpNm만 표출, D - label 만 표출
					addLabel: "N",
					//text
					label : `접수 대기`,
					//class
					icon : `fas fa-hourglass`,
					//html
					toolbar : ``,
					//html
					content : `
						<div class="h-100 d-flex flex-wrap align-items-center justify-content-end rounded rounded-top-0 osl-area-hover cursor-pointer osl-evt__ticket--explanatory-btn">
							<div class="text-end">
								<div class="point-title me-4 osl-evt__ticket--stay-count">
									999+
								</div>
								<div class="">
									<span class="point-label me-4" data-lang-cd="">
										접수 대기
									</span>
								</div>
							</div>
						</div>
					`,
					actionFn : function(){
						//위젯
						var widgetId = this.widgetId;
						/*
						var refWgtGrpId = this.refWgtGrpId;
						var refWgtId = this.refWgtId;
						var sizeStr = this.sizeStr;
						*/
						var optionKey = this.optionKey;
						
						//대상 위젯
						var thisWidget = $(`.osl-evt__widget-item[gs-id="${widgetId}"]`);
						//위젯 설정 시 이벤트가 호출되면 안되기 때문에 실제 이벤트 지정될 영역
						var targetWidget = thisWidget.find(".osl-evt__widget-card .osl-evt__widget-card-body");
						
						//그리드스택
						var gridStackId = thisWidget.closest(".osl-evt__grid-stack-area").attr("id");
						var gridStack = widgetSettingGridStack[gridStackId];
						
						//위젯 세팅 시 정보 바로 보관해두기 위해서
						//현재 요청자
						//var usrId = $.osl.user.userInfo.usrId;
						
						//구분자
						var callId = this.callId;
						
						return {
							//새로고침 버튼 누르면 호출
							reload : function(){
								/**** 검색 조건 ****/
								//대시보드 검색조건 공통
								var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
								
								//위젯의 설정 값 추가
								$.each(optionKey, function(wgtOptKey, map){
									dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
								});
								
								//구분자
								dshSearchParams["callId"] = callId;
								
								/**** 조회 param 합치기 ****/
								dshSearchParams["baseGrp"] = "prjId";
								//dshSearchParams["reqUsrId"] = usrId;
								//REQ00008 01 접수대기 02 처리중 03 반려 04 완료 05 결재반려후 종료 06 중간 종료
								dshSearchParams["reqProType"] = "01";
								//티켓 분류 REQ00018 - 01 보안 정책, 02 이상징후, 03 외부
								dshSearchParams["reqClsType"] = "02";
								//로그 연결 여부 CMM00001 - 01 예, 02 아니오
								dshSearchParams["logLnkCd"] = "01";
								
								/**** 검색 조건 끝 ****/
								
								//AJAX 설정
								var ajaxObj = new $.osl.ajaxRequestAction(
										{"url":"/wgt/wgt1000/wgt1100/selectWgt1100WidgetReloadAjax.do", "async":"false"}
										,dshSearchParams);
								//AJAX 전송 성공 함수
								ajaxObj.setFnSuccess(function(data){
									//오류
									if(data.errorYn == "Y"){
										$.osl.alert(data.message,{type: 'error'});
										//모달 창 닫기
										$.osl.layerPopupClose();
									}
									//성공
									else{
										var ticketStayCnt = data.ticketStayCnt;
										if(Number(ticketStayCnt) > 999){
											ticketStayCnt = "999+";
										}
										
										targetWidget.find(".osl-evt__ticket--stay-count").text(ticketStayCnt);
									}
								});
								
								return ajaxObj.send();
							},
							init : function(){
								//조회
								var ajaxObj = this.reload();
								
								ajaxObj.done(function(){
									//위젯 자체 클릭 시 접수 대기 팝업 표출
									targetWidget.off("click").on("click", function(){
										/**** 검색 조건 ****/
										//대시보드 검색조건 공통
										var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
										
										//위젯의 설정 값 추가
										$.each(optionKey, function(wgtOptKey, map){
											dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
										});
										
										//구분자
										dshSearchParams["callId"] = callId;
										
										/**** 조회 param 합치기 ****/
										dshSearchParams["baseGrp"] = "prjId";
										//dshSearchParams["reqUsrId"] = usrId;
										//REQ00008 01 접수대기 02 처리중 03 반려 04 완료 05 결재반려후 종료 06 중간 종료
										dshSearchParams["reqProType"] = "01";
										//티켓 분류 REQ00018 - 01 보안 정책, 02 이상징후, 03 외부
										dshSearchParams["reqClsType"] = "02";
										//로그 연결 여부 CMM00001 - 01 예, 02 아니오
										dshSearchParams["logLnkCd"] = "01";
										
										/**** 검색 조건 끝 ****/
										
										var dataParam = {
												// 데이터 조회 URL
												url : "/wgt/wgt1000/wgt1100/selectWgt1100GetReqListAjax.do",
												//조회 파라미터
												params : dshSearchParams,
												//데이터 테이블 & 팝업 옵션
												option : {
													showBtns : ["reqAccept"],
													submitBtnCd : false, // submit 버튼 표출 유무
												}
										};
										
										var data = {
												type : "list",
												reqType : "01", //티켓
												currentIdKey : callId,
												dataParam : JSON.stringify(dataParam)
										};
										
										var options = {
												idKey: callId,
												modalTitle : "[접수 대기] 보안 티켓 목록",
												closeConfirm: false,
												autoHeight: true,
												modalSize: "xl",
												callback:[{
													targetId : "cmm6206ModalCallbackBtn",
													actionFn : function(thisObj){
														//모든 위젯 초기화
														gridStack.fnRefresh();
													}
												}]
										};
										
										$.osl.layerPopupOpen('/cmm/cmm6000/cmm6200/selectCmm6206View.do',data,options);
									});
								});
							}
						}
					}
				},
			}
			//처리
			,"WGTREQ2000000003" : {
				size : ["2X1"],
				"2X1": {
					//구분자
					callId : "ticketProgress",
					//boolean default false
					fullType : false,
					addFullTypeClass : "",
					//class
					cardClass : "osl-widget-card--v1",
					cardBodyClass : '',
					//string Y, N, D default N, card-title에 wgtGrpNm과 동시 표출 유무
					//Y - 동시 표출, N - wgtGrpNm만 표출, D - label 만 표출
					addLabel: "N",
					//text
					label : `처리중`,
					//class
					icon : `fas fa-spinner`,
					//html
					toolbar : ``,
					//html
					content : `
						<div class="h-100 d-flex flex-wrap align-items-center justify-content-end rounded rounded-top-0 osl-area-hover cursor-pointer osl-evt__ticket--explanatory-btn">
							<div class="text-end">
								<div class="point-label weak d-flex flex-row flex-wrap gap-2 me-4 osl-evt__ticket--progress-ect-cnt d-none">
									<span class="badge badge-primary p-2 osl-area-not-hover">
										<span class="text-inverse-primary osl-area-not-hover" data-lang-cd="">담당 :</span>
										<span class="text-inverse-primary osl-area-not-hover osl-evt__ticket--progress-usr-cnt">0</span>
									</span>
									<span class="badge badge-navy p-2 osl-area-not-hover">
										<span class="text-inverse-navy osl-area-not-hover" data-lang-cd="">無담당 :</span>
										<span class="text-inverse-navy osl-area-not-hover osl-evt__ticket--progress-non-cnt">0</span>
									</span>
								</div>
								<div class="point-title me-4 osl-evt__ticket--progress-count">
									999+
								</div>
								<div class="">
									<span class="point-label me-4" data-lang-cd="">
										처리중
									</span>
								</div>
							</div>
						</div>
					`,
					actionFn : function(){
						var widgetId = this.widgetId;
						var optionKey = this.optionKey;
						
						//대상 위젯
						var thisWidget = $(`.osl-evt__widget-item[gs-id="${widgetId}"]`);
						//위젯 설정 시 이벤트가 호출되면 안되기 때문에 실제 이벤트 지정될 영역
						var targetWidget = thisWidget.find(".osl-evt__widget-card .osl-evt__widget-card-body");
						
						//그리드스택
						var gridStackId = thisWidget.closest(".osl-evt__grid-stack-area").attr("id");
						var gridStack = widgetSettingGridStack[gridStackId];
						
						//위젯 세팅 시 정보 바로 보관해두기 위해서
						//현재 요청자
						//var usrId = $.osl.user.userInfo.usrId;
						
						//구분자
						var callId = this.callId;
						
						return {
							//새로고침 버튼 누르면 호출
							reload : function(){
								/**** 검색 조건 ****/
								//대시보드 검색조건 공통
								var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
								
								//위젯의 설정 값 추가
								$.each(optionKey, function(wgtOptKey, map){
									dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
								});
								
								//구분자
								dshSearchParams["callId"] = callId;
								
								/**** 조회 param 합치기 ****/
								dshSearchParams["baseGrp"] = "prjId";
								//dshSearchParams["reqUsrId"] = usrId;
								//REQ00008 01 접수대기 02 처리중 03 반려 04 완료 05 결재반려후 종료 06 중간 종료
								dshSearchParams["reqProType"] = "02";
								//티켓 분류 REQ00018 - 01 보안 정책, 02 이상징후, 03 외부
								dshSearchParams["reqClsType"] = "02";
								//로그 연결 여부 CMM00001 - 01 예, 02 아니오
								dshSearchParams["logLnkCd"] = "01";
								
								/**** 검색 조건 끝 ****/
								
								//AJAX 설정
								var ajaxObj = new $.osl.ajaxRequestAction(
										{"url":"/wgt/wgt1000/wgt1100/selectWgt1100WidgetReloadAjax.do", "async":"false"}
										,dshSearchParams);
								//AJAX 전송 성공 함수
								ajaxObj.setFnSuccess(function(data){
									//오류
									if(data.errorYn == "Y"){
										$.osl.alert(data.message,{type: 'error'});
										//모달 창 닫기
										$.osl.layerPopupClose();
									}
									//성공
									else{
										//map으로 전달되며, totalCnt, nonChargerCnt, chargerCnt로 존재
										var ticketIngCnt = data.ticketIngCnt;
										var ticketProgressCnt = ticketIngCnt["totalCnt"];
										if(Number(ticketProgressCnt) > 999){
											ticketProgressCnt = "999+";
										}
										//종합 갯수 표출
										targetWidget.find(".osl-evt__ticket--progress-count").text(ticketProgressCnt);
										//내가 담당인 것과, 처리할 수 있는 미배정 담당자 건수 분리
										targetWidget.find(".osl-evt__ticket--progress-ect-cnt .osl-evt__ticket--progress-usr-cnt").text(ticketIngCnt["chargerCnt"]);
										targetWidget.find(".osl-evt__ticket--progress-ect-cnt .osl-evt__ticket--progress-non-cnt").text(ticketIngCnt["nonChargerCnt"]);
										
										/* *
										 * 2024.03.22 기준 옵션
										 * 1. 내가 요청한 티켓 중 처리중인 티켓 카운트만 보기
										 * ㄴ 아니오이면 요청자 구분 없이 처리중인 티켓 카운트
										 * 2. 내가 처리할 수 있는 요청서만 조회하기
										 * ㄴ 예이면 (1)의 카운트에서 내가 처리할 수 있는 카운트만 표출
										 * 		ㄴ내가 담당인 것과 담당은 아니지만 처리할 수 있는 것 표출
										 * ㄴ 아니오이면 (1)의 카운트와 동일
										 * */
										
										//현재 옵션에 따라 조합 - CMM00001 01 예, 02 아니오
										//authProgressChk : 내가 처리할 수 있는 요청서만 조회하기
										//내가 처리할 수 있는 요청서만 조회한다고 한 경우 - 담당/무담당 카운트 같이 보기
										if(optionKey["authProgressChk"]["wgtOptDefVal"] == "01"){
											targetWidget.find(".osl-evt__ticket--progress-ect-cnt").removeClass("d-none");
										}
										//내가 처리할 수 있는 요청서만 조회하는 것이 아닌 경우 - 담당/무담당 카운트 숨기기
										else{
											targetWidget.find(".osl-evt__ticket--progress-ect-cnt").addClass("d-none");
										}
									}
								});
								
								return ajaxObj.send();
							},
							init : function(){
								//조회
								var ajaxObj = this.reload();
								
								ajaxObj.done(function(){
									//위젯 자체 클릭 시 접수 대기 팝업 표출
									targetWidget.off("click").on("click", function(){
										/**** 검색 조건 ****/
										//대시보드 검색조건 공통
										var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
										
										//위젯의 설정 값 추가
										$.each(optionKey, function(wgtOptKey, map){
											dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
										});
										
										//구분자
										dshSearchParams["callId"] = callId;
										
										/**** 조회 param 합치기 ****/
										dshSearchParams["baseGrp"] = "prjId";
										//dshSearchParams["reqUsrId"] = usrId;
										//REQ00008 01 접수대기 02 처리중 03 반려 04 완료 05 결재반려후 종료 06 중간 종료
										dshSearchParams["reqProType"] = "02";
										//티켓 분류 REQ00018 - 01 보안 정책, 02 이상징후, 03 외부
										dshSearchParams["reqClsType"] = "02";
										//로그 연결 여부 CMM00001 - 01 예, 02 아니오
										dshSearchParams["logLnkCd"] = "01";
										
										/**** 검색 조건 끝 ****/
										
										var dataParam = {
												// 데이터 조회 URL
												url : "/wgt/wgt1000/wgt1100/selectWgt1100GetReqListAjax.do",
												//조회 파라미터
												params : dshSearchParams,
												//데이터 테이블 & 팝업 옵션
												option : {
													showBtns : ["reqProcessing"],
													submitBtnCd : false, // submit 버튼 표출 유무
												}
										};
										
										var data = {
												type : "list",
												reqType : "01", //티켓
												currentIdKey : callId,
												dataParam : JSON.stringify(dataParam)
										};
										
										var options = {
												idKey: callId,
												modalTitle : "[처리중] 보안 티켓 목록",
												closeConfirm: false,
												autoHeight: true,
												modalSize: "xl",
												callback:[{
													targetId : "cmm6206ModalCallbackBtn",
													actionFn : function(thisObj){
														//모든 위젯 초기화
														gridStack.fnRefresh();
													}
												}]
										};
										
										$.osl.layerPopupOpen('/cmm/cmm6000/cmm6200/selectCmm6206View.do',data,options);
									});
								});
							}
						}
					}
				},
			},
			//완료
			"WGTREQ2000000004" : {
				size : ["2X1"],
				"2X1": {
					//구분자
					callId : "ticketSuccess",
					//boolean default false
					fullType : false,
					addFullTypeClass : "",
					//class
					cardClass : "osl-widget-card--v1",
					cardBodyClass : '',
					//string Y, N, D default N, card-title에 wgtGrpNm과 동시 표출 유무
					//Y - 동시 표출, N - wgtGrpNm만 표출, D - label 만 표출
					addLabel: "N",
					//text
					label : `처리 완료`,
					//class
					icon : `fas fa-check`,
					//html
					toolbar : ``,
					//html
					content : `
						<div class="h-100 d-flex flex-wrap align-items-center justify-content-end rounded rounded-top-0 osl-area-hover cursor-pointer osl-evt__ticket--explanatory-btn">
							<div class="text-end">
								<div class="point-title me-4 osl-evt__ticket--success-count">
									999+
								</div>
								<div class="">
									<span class="point-label me-4" data-lang-cd="">
										완료
									</span>
								</div>
							</div>
						</div>
					`,
					actionFn : function(){
						var widgetId = this.widgetId;
						var optionKey = this.optionKey;
						
						//대상 위젯
						var thisWidget = $(`.osl-evt__widget-item[gs-id="${widgetId}"]`);
						//위젯 설정 시 이벤트가 호출되면 안되기 때문에 실제 이벤트 지정될 영역
						var targetWidget = thisWidget.find(".osl-evt__widget-card .osl-evt__widget-card-body");
						
						//그리드스택
						var gridStackId = thisWidget.closest(".osl-evt__grid-stack-area").attr("id");
						var gridStack = widgetSettingGridStack[gridStackId];
						
						//위젯 세팅 시 정보 바로 보관해두기 위해서
						//현재 요청자
						//var usrId = $.osl.user.userInfo.usrId;
						
						//구분자
						var callId = this.callId;
						
						return {
							//새로고침 버튼 누르면 호출
							reload : function(){ 
								/**** 검색 조건 ****/
								//대시보드 검색조건 공통
								var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
								
								//위젯의 설정 값 추가
								$.each(optionKey, function(wgtOptKey, map){
									dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
								});
								
								//구분자
								dshSearchParams["callId"] = callId;
								
								/**** 조회 param 합치기 ****/
								dshSearchParams["baseGrp"] = "prjId";
								//dshSearchParams["reqUsrId"] = usrId;
								//REQ00008 01 접수대기 02 처리중 03 반려 04 완료 05 결재반려후 종료 06 중간 종료
								dshSearchParams["reqProType"] = "04";
								//티켓 분류 REQ00018 - 01 보안 정책, 02 이상징후, 03 외부
								dshSearchParams["reqClsType"] = "02";
								//로그 연결 여부 CMM00001 - 01 예, 02 아니오
								dshSearchParams["logLnkCd"] = "01";
								
								/**** 검색 조건 끝 ****/
								
								//AJAX 설정
								var ajaxObj = new $.osl.ajaxRequestAction(
										{"url":"/wgt/wgt1000/wgt1100/selectWgt1100WidgetReloadAjax.do", "async":"false"}
										,dshSearchParams);
								//AJAX 전송 성공 함수
								ajaxObj.setFnSuccess(function(data){
									//오류
									if(data.errorYn == "Y"){
										$.osl.alert(data.message,{type: 'error'});
										//모달 창 닫기
										$.osl.layerPopupClose();
									}
									//성공
									else{
										var ticketSuccessCnt = data.ticketSuccessCnt;
										if(Number(ticketSuccessCnt) > 999){
											ticketSuccessCnt = "999+";
										}
										//갯수 표출
										targetWidget.find(".osl-evt__ticket--success-count").text(ticketSuccessCnt);
									}
								});
								
								return ajaxObj.send();
							},
							init : function(){
								//조회
								var ajaxObj = this.reload();
								
								ajaxObj.done(function(){
									//위젯 자체 클릭 시 완료 팝업 표출
									targetWidget.off("click").on("click", function(){
										/**** 검색 조건 ****/
										//대시보드 검색조건 공통
										var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
										
										//위젯의 설정 값 추가
										$.each(optionKey, function(wgtOptKey, map){
											dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
										});
										
										//구분자
										dshSearchParams["callId"] = callId;
										
										/**** 조회 param 합치기 ****/
										dshSearchParams["baseGrp"] = "prjId";
										//dshSearchParams["reqUsrId"] = usrId;
										//REQ00008 01 접수대기 02 처리중 03 반려 04 완료 05 결재반려후 종료 06 중간 종료
										dshSearchParams["reqProType"] = "04";
										//티켓 분류 REQ00018 - 01 보안 정책, 02 이상징후, 03 외부
										dshSearchParams["reqClsType"] = "02";
										//로그 연결 여부 CMM00001 - 01 예, 02 아니오
										dshSearchParams["logLnkCd"] = "01";
										
										/**** 검색 조건 끝 ****/
										
										var dataParam = {
												// 데이터 조회 URL
												url : "/wgt/wgt1000/wgt1100/selectWgt1100GetReqListAjax.do",
												//조회 파라미터
												params : dshSearchParams,
												//데이터 테이블 & 팝업 옵션
												option : {
													showBtns : ["reqDetail"],
													submitBtnCd : false, // submit 버튼 표출 유무
												}
										};
										
										var data = {
												type : "list",
												reqType : "01", //티켓
												currentIdKey : callId,
												dataParam : JSON.stringify(dataParam)
										};
										
										var options = {
												idKey: callId,
												modalTitle : "[처리 완료] 보안 티켓 목록",
												closeConfirm: false,
												autoHeight: true,
												modalSize: "xl",
												callback:[{
													targetId : "cmm6206ModalCallbackBtn",
													actionFn : function(thisObj){
														//모든 위젯 초기화
														gridStack.fnRefresh();
													}
												}]
										};
										
										$.osl.layerPopupOpen('/cmm/cmm6000/cmm6200/selectCmm6206View.do',data,options);
									});
								});
							}
						}
					}
				},
			},
			//종료
			"WGTREQ2000000005" : {
				size : ["2X1", "4X1"],
				"2X1": {
					//구분자
					callId : "ticketStop",
					//boolean default false
					fullType : false,
					addFullTypeClass : "",
					//class
					cardClass : "osl-widget-card--v1",
					cardBodyClass : '',
					//string Y, N, D default N, card-title에 wgtGrpNm과 동시 표출 유무
					//Y - 동시 표출, N - wgtGrpNm만 표출, D - label 만 표출
					addLabel: "N",
					//text
					label : `종료`,
					//class
					icon : `fas fa-stop-circle`,
					//html
					toolbar : ``,
					//html
					content : `
						<div class="h-100 d-flex flex-wrap align-items-center justify-content-end rounded rounded-top-0 osl-area-hover cursor-pointer osl-evt__ticket--explanatory-btn">
							<div class="text-end">
								<div class="point-title me-4 osl-evt__ticket--stop-count">
									999+
								</div>
								<div class="">
									<span class="point-label me-4" data-lang-cd="">
										종료
									</span>
								</div>
							</div>
						</div>
					`,
					actionFn : function(){
						var widgetId = this.widgetId;
						var optionKey = this.optionKey;
						
						//대상 위젯
						var thisWidget = $(`.osl-evt__widget-item[gs-id="${widgetId}"]`);
						//위젯 설정 시 이벤트가 호출되면 안되기 때문에 실제 이벤트 지정될 영역
						var targetWidget = thisWidget.find(".osl-evt__widget-card .osl-evt__widget-card-body");
						
						//그리드스택
						var gridStackId = thisWidget.closest(".osl-evt__grid-stack-area").attr("id");
						var gridStack = widgetSettingGridStack[gridStackId];
						
						//위젯 세팅 시 정보 바로 보관해두기 위해서
						//현재 요청자
						//var usrId = $.osl.user.userInfo.usrId;
						
						//구분자
						var callId = this.callId;
						
						return {
							//새로고침 버튼 누르면 호출
							reload : function(){ 
								/**** 검색 조건 ****/
								//대시보드 검색조건 공통
								var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
								
								//reqProTypeList 만들어 전달
								var reqProTypeList = [];
								
								//위젯의 설정 값 추가
								$.each(optionKey, function(wgtOptKey, map){
									dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
									//reqProTypeList 체크
									//REQ00008 01 접수 요청, 02 처리중, 03 반려, 04 최종 완료, 05 결재 반려 종료, 06 중간 종료
									//접수 반려 표출
									if(wgtOptKey == "reqFinTypeRjtProgress" && map.wgtOptDefVal == "01"){
										reqProTypeList.push("03");
									}
									//결재 반려 후 종료 표출
									if(wgtOptKey == "reqFinTypeSignReject" && map.wgtOptDefVal == "01"){
										reqProTypeList.push("05");
									}
									//중간 종료 표출
									if(wgtOptKey == "reqFinTypeStop" && map.wgtOptDefVal == "01"){
										reqProTypeList.push("06");
									}
								});
								
								//종료 유형
								dshSearchParams["reqProTypeList"] = reqProTypeList;
								
								//구분자
								dshSearchParams["callId"] = callId;
								
								/**** 조회 param 합치기 ****/
								dshSearchParams["baseGrp"] = "prjId";
								//dshSearchParams["reqUsrId"] = usrId;
								//REQ00008 01 접수대기 02 처리중 03 반려 04 완료 05 결재반려후 종료 06 중간 종료
								//end로 입력 시 종료 항목 모두 지정
								dshSearchParams["reqProType"] = "end";
								//티켓 분류 REQ00018 - 01 보안 정책, 02 이상징후, 03 외부
								dshSearchParams["reqClsType"] = "02";
								//로그 연결 여부 CMM00001 - 01 예, 02 아니오
								dshSearchParams["logLnkCd"] = "01";
								
								/**** 검색 조건 끝 ****/
								
								//AJAX 설정
								var ajaxObj = new $.osl.ajaxRequestAction(
										{"url":"/wgt/wgt1000/wgt1100/selectWgt1100WidgetReloadAjax.do", "async":"false"}
										,dshSearchParams);
								//AJAX 전송 성공 함수
								ajaxObj.setFnSuccess(function(data){
									//오류
									if(data.errorYn == "Y"){
										$.osl.alert(data.message,{type: 'error'});
										//모달 창 닫기
										$.osl.layerPopupClose();
									}
									//성공
									else{
										/* *
										 * 2024.03.22 기준 옵션
										 * 1. 접수 반려 종료 표출
										 * ㄴ 아니오이면 접수 반려 종료 카운트 제외
										 * 2. 결재 반려 후 종료 표출
										 * ㄴ 아니오이면 결재 반려 후 종료 카운트 제외
										 * 3. 중간 종료 카운트 표출
										 * ㄴ 아니오이면 중간 종료 카운트 제외
										 * ** 1,2,3 모두 아니오이면 에러 표출
										 * 
										 * 4. 내가 요청한 티켓 중 종료(1,2,3)된 티켓 카운트만 보기
										 * ㄴ 아니오이면 요청자 구분 없이 종료된 티켓 카운트
										 * 5. 내가 종료한 요청서만 조회하기
										 * ㄴ 예이면 (4)의 카운트에서 내가 종료한 요청서 카운트만 표출
										 * ㄴ 아니오이면 (4)와 동일
										 * */
										
										//map으로 전달되며, totalCnt, acceptRejectCnt, signRejectCnt, progressRejectCnt로 전달
										var ticketStopCnt = data.ticketStopCnt;
										var ticketEndCnt = ticketStopCnt["totalCnt"];
										if(Number(ticketEndCnt) > 999){
											ticketEndCnt = "999+";
										}
										//종합 갯수 표출
										targetWidget.find(".osl-evt__ticket--stop-count").text(ticketEndCnt);
									}
								});
								
								return ajaxObj.send();
							},
							init : function(){
								//조회
								var ajaxObj = this.reload();
								
								ajaxObj.done(function(){
									//위젯 자체 클릭 시 종료 팝업 표출
									targetWidget.off("click").on("click", function(){
										/**** 검색 조건 ****/
										//대시보드 검색조건 공통
										var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
										
									
										//구분자
										dshSearchParams["callId"] = callId;
										
										//reqProTypeList 만들어 전달
										var reqProTypeList = [];
										
										//위젯의 설정 값 추가
										$.each(optionKey, function(wgtOptKey, map){
											dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
											//reqProTypeList 체크
											//REQ00008 01 접수 요청, 02 처리중, 03 반려, 04 최종 완료, 05 결재 반려 종료, 06 중간 종료
											//접수 반려 표출
											if(wgtOptKey == "reqFinTypeRjtProgress" && map.wgtOptDefVal == "01"){
												reqProTypeList.push("03");
											}
											//결재 반려 후 종료 표출
											if(wgtOptKey == "reqFinTypeSignReject" && map.wgtOptDefVal == "01"){
												reqProTypeList.push("05");
											}
											//중간 종료 표출
											if(wgtOptKey == "reqFinTypeStop" && map.wgtOptDefVal == "01"){
												reqProTypeList.push("06");
											}
										});
										
										//종료 유형
										dshSearchParams["reqProTypeList"] = reqProTypeList;
										
										/**** 조회 param 합치기 ****/
										dshSearchParams["baseGrp"] = "prjId";
										//dshSearchParams["reqUsrId"] = usrId;
										//REQ00008 01 접수대기 02 처리중 03 반려 04 완료 05 결재반려후 종료 06 중간 종료
										//end로 입력 시 종료 항목 모두 지정
										dshSearchParams["reqProType"] = "end";
										//티켓 분류 REQ00018 - 01 보안 정책, 02 이상징후, 03 외부
										dshSearchParams["reqClsType"] = "02";
										//로그 연결 여부 CMM00001 - 01 예, 02 아니오
										dshSearchParams["logLnkCd"] = "01";
										
										/**** 검색 조건 끝 ****/
										
										var dataParam = {
												// 데이터 조회 URL
												url : "/wgt/wgt1000/wgt1100/selectWgt1100GetReqListAjax.do",
												//조회 파라미터
												params : dshSearchParams,
												//데이터 테이블 & 팝업 옵션
												option : {
													showBtns : ["reqDetail"],
													submitBtnCd : false, // submit 버튼 표출 유무
												}
										};
										
										var data = {
												type : "list",
												reqType : "01", //티켓
												currentIdKey : callId,
												dataParam : JSON.stringify(dataParam)
										};
										
										var options = {
												idKey: callId,
												modalTitle : "[종료] 보안 티켓 목록",
												closeConfirm: false,
												autoHeight: true,
												modalSize: "xl",
												callback:[{
													targetId : "cmm6206ModalCallbackBtn",
													actionFn : function(thisObj){
														//모든 위젯 초기화
														gridStack.fnRefresh();
													}
												}]
										};
										
										$.osl.layerPopupOpen('/cmm/cmm6000/cmm6200/selectCmm6206View.do',data,options);
									});
								});
							}
						}
					}
				},
				"4X1": {
					//구분자
					callId : "ticketStop",
					//boolean default false
					fullType : false,
					addFullTypeClass : "",
					//class
					cardClass : "osl-widget-card--v1",
					cardBodyClass : '',
					//string Y, N, D default N, card-title에 wgtGrpNm과 동시 표출 유무
					//Y - 동시 표출, N - wgtGrpNm만 표출, D - label 만 표출
					addLabel: "N",
					//text
					label : `종료`,
					//class
					icon : `fas fa-stop-circle`,
					//html
					toolbar : ``,
					//html
					content : `
						<div class="d-table table-layout-fixed w-100 h-100">
							<div class="d-table-row">
								<div class="d-table-cell align-middle text-center rounded osl-area-hover cursor-pointer osl-evt__ticket--stop-btn" data-req-pro-type="end">
									<div class="point-title weak osl-evt__ticket--stop-count">
										999+
									</div>
									<div class="">
										<span class="point-label weak" data-lang-cd="">
											Total. 종료
										</span>
									</div>
								</div>
								<div class="d-table-cell align-middle text-center rounded osl-area-hover cursor-pointer osl-evt__ticket--stop-btn" data-req-pro-type="03">
									<div class="point-title weak osl-evt__ticket--stop-accept-reject">
										999+
									</div>
									<div class="">
										<span class="point-label weak" data-lang-cd="">
											접수 반려
										</span>
									</div>
								</div>
							</div>
							<div class="d-table-row">
								<div class="d-table-cell align-middle text-center rounded osl-area-hover cursor-pointer osl-evt__ticket--stop-btn" data-req-pro-type="05">
									<div class="point-title weak osl-evt__ticket--stop-sign-reject">
										999+
									</div>
									<div class="">
										<span class="point-label weak" data-lang-cd="">
											결재 반려 후 종료
										</span>
									</div>
								</div>
								<div class="d-table-cell align-middle text-center rounded osl-area-hover cursor-pointer osl-evt__ticket--stop-btn" data-req-pro-type="06">
									<div class="point-title weak osl-evt__ticket--stop-progress-reject">
										999+
									</div>
									<div class="">
										<span class="point-label weak" data-lang-cd="">
											중간 종료
										</span>
									</div>
								</div>
							</div>
						</div>
					`,
					actionFn : function(){
						var widgetId = this.widgetId;
						var optionKey = this.optionKey;
						
						//대상 위젯
						var thisWidget = $(`.osl-evt__widget-item[gs-id="${widgetId}"]`);
						//위젯 설정 시 이벤트가 호출되면 안되기 때문에 실제 이벤트 지정될 영역
						var targetWidget = thisWidget.find(".osl-evt__widget-card .osl-evt__widget-card-body");
						
						//그리드스택
						var gridStackId = thisWidget.closest(".osl-evt__grid-stack-area").attr("id");
						var gridStack = widgetSettingGridStack[gridStackId];
						
						//위젯 세팅 시 정보 바로 보관해두기 위해서
						//현재 요청자
						//var usrId = $.osl.user.userInfo.usrId;
						
						//구분자
						var callId = this.callId;
						
						return {
							//새로고침 버튼 누르면 호출
							reload : function(){ 
								/**** 검색 조건 ****/
								//대시보드 검색조건 공통
								var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
								
								//reqProTypeList 만들어 전달
								var reqProTypeList = [];
								
								//위젯의 설정 값 추가
								$.each(optionKey, function(wgtOptKey, map){
									dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
									//reqProTypeList 체크
									//REQ00008 01 접수 요청, 02 처리중, 03 반려, 04 최종 완료, 05 결재 반려 종료, 06 중간 종료
									//접수 반려 표출
									if(wgtOptKey == "reqFinTypeRjtProgress" && map.wgtOptDefVal == "01"){
										reqProTypeList.push("03");
									}
									//결재 반려 후 종료 표출
									if(wgtOptKey == "reqFinTypeSignReject" && map.wgtOptDefVal == "01"){
										reqProTypeList.push("05");
									}
									//중간 종료 표출
									if(wgtOptKey == "reqFinTypeStop" && map.wgtOptDefVal == "01"){
										reqProTypeList.push("06");
									}
								});
								
								//종료 유형
								dshSearchParams["reqProTypeList"] = reqProTypeList;
								
								//구분자
								dshSearchParams["callId"] = callId;
								
								/**** 조회 param 합치기 ****/
								dshSearchParams["baseGrp"] = "prjId";
								//dshSearchParams["reqUsrId"] = usrId;
								//REQ00008 01 접수대기 02 처리중 03 반려 04 완료 05 결재반려후 종료 06 중간 종료
								//end로 입력 시 종료 항목 모두 지정
								dshSearchParams["reqProType"] = "end";
								//티켓 분류 REQ00018 - 01 보안 정책, 02 이상징후, 03 외부
								dshSearchParams["reqClsType"] = "02";
								//로그 연결 여부 CMM00001 - 01 예, 02 아니오
								dshSearchParams["logLnkCd"] = "01";
								
								/**** 검색 조건 끝 ****/
								
								//AJAX 설정
								var ajaxObj = new $.osl.ajaxRequestAction(
										{"url":"/wgt/wgt1000/wgt1100/selectWgt1100WidgetReloadAjax.do", "async":"false"}
										,dshSearchParams);
								//AJAX 전송 성공 함수
								ajaxObj.setFnSuccess(function(data){
									//오류
									if(data.errorYn == "Y"){
										$.osl.alert(data.message,{type: 'error'});
										//모달 창 닫기
										$.osl.layerPopupClose();
									}
									//성공
									else{
										/* *
										 * 2024.03.22 기준 옵션
										 * 1. 접수 반려 종료 표출
										 * ㄴ 아니오이면 접수 반려 종료 카운트 제외
										 * 2. 결재 반려 후 종료 표출
										 * ㄴ 아니오이면 결재 반려 후 종료 카운트 제외
										 * 3. 중간 종료 카운트 표출
										 * ㄴ 아니오이면 중간 종료 카운트 제외
										 * ** 1,2,3 모두 아니오이면 에러 표출
										 * 
										 * 4. 내가 요청한 티켓 중 종료(1,2,3)된 티켓 카운트만 보기
										 * ㄴ 아니오이면 요청자 구분 없이 종료된 티켓 카운트
										 * 5. 내가 종료한 요청서만 조회하기
										 * ㄴ 예이면 (4)의 카운트에서 내가 종료한 요청서 카운트만 표출
										 * ㄴ 아니오이면 (4)와 동일
										 * */
										
										//map으로 전달되며, totalCnt, acceptRejectCnt, signRejectCnt, progressRejectCnt로 전달
										var ticketStopCnt = data.ticketStopCnt;
										var ticketEndCnt = ticketStopCnt["totalCnt"];
										if(Number(ticketEndCnt) > 999){
											ticketEndCnt = "999+";
										}
										//종합 갯수 표출
										targetWidget.find(".osl-evt__ticket--stop-count").text(ticketEndCnt);
										//접수 반려, 결재 반려후 종료, 중간 종료 건수 분리
										targetWidget.find(".osl-evt__ticket--stop-accept-reject").text(ticketStopCnt["acceptRejectCnt"]);
										targetWidget.find(".osl-evt__ticket--stop-sign-reject").text(ticketStopCnt["signRejectCnt"]);
										targetWidget.find(".osl-evt__ticket--stop-progress-reject").text(ticketStopCnt["progressRejectCnt"]);
									}
								});
								
								return ajaxObj.send();
							},
							init : function(){
								//조회
								var ajaxObj = this.reload();
								
								ajaxObj.done(function(){
									//위젯 자체 클릭 시 접수 대기 팝업 표출
									targetWidget.off("click").on("click", ".osl-evt__ticket--stop-btn", function(){
										/**** 검색 조건 ****/
										//대시보드 검색조건 공통
										var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
										
										//위젯의 설정 값 추가
										$.each(optionKey, function(wgtOptKey, map){
											dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
										});
										
										//구분자
										dshSearchParams["callId"] = callId;
										
										//REQ00008
										var reqProType = $(this).data("req-pro-type");
										
										//팝업 타이틀에 추가 및 검색 조건 추가
										var reqProTypeNm = "";
										if(reqProType == "end"){
											reqProTypeNm = "종료";
											
											//reqProTypeList 만들어 전달
											var reqProTypeList = [];
											
											//위젯의 설정 값 추가
											$.each(optionKey, function(wgtOptKey, map){
												dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
												//reqProTypeList 체크
												//REQ00008 01 접수 요청, 02 처리중, 03 반려, 04 최종 완료, 05 결재 반려 종료, 06 중간 종료
												//접수 반려 표출
												if(wgtOptKey == "reqFinTypeRjtProgress" && map.wgtOptDefVal == "01"){
													reqProTypeList.push("03");
												}
												//결재 반려 후 종료 표출
												if(wgtOptKey == "reqFinTypeSignReject" && map.wgtOptDefVal == "01"){
													reqProTypeList.push("05");
												}
												//중간 종료 표출
												if(wgtOptKey == "reqFinTypeStop" && map.wgtOptDefVal == "01"){
													reqProTypeList.push("06");
												}
											});
											
											//종료 유형
											dshSearchParams["reqProTypeList"] = reqProTypeList;
										}else if(reqProType == "03") {
											reqProTypeNm = "접수 반려";
										}else if(reqProType == "05") {
											reqProTypeNm = "결재 반려 후 종료";
										}else if(reqProType == "06") {
											reqProTypeNm = "중간 종료";
										}
										
										/**** 조회 param 합치기 ****/
										dshSearchParams["baseGrp"] = "prjId";
										//dshSearchParams["reqUsrId"] = usrId;
										//REQ00008 01 접수대기 02 처리중 03 반려 04 완료 05 결재반려후 종료 06 중간 종료
										//end로 입력 시 종료 항목 모두 지정
										dshSearchParams["reqProType"] = reqProType;
										//티켓 분류 REQ00018 - 01 보안 정책, 02 이상징후, 03 외부
										dshSearchParams["reqClsType"] = "02";
										//로그 연결 여부 CMM00001 - 01 예, 02 아니오
										dshSearchParams["logLnkCd"] = "01";
										
										/**** 검색 조건 끝 ****/
										
										var dataParam = {
												// 데이터 조회 URL
												url : "/wgt/wgt1000/wgt1100/selectWgt1100GetReqListAjax.do",
												//조회 파라미터
												params : dshSearchParams,
												//데이터 테이블 & 팝업 옵션
												option : {
													showBtns : ["reqDetail"],
													submitBtnCd : false, // submit 버튼 표출 유무
												}
										};
										
										var data = {
												type : "list",
												reqType : "01", //티켓
												currentIdKey : callId,
												dataParam : JSON.stringify(dataParam)
										};
										
										var options = {
												idKey: callId,
												modalTitle : "["+reqProTypeNm+"] 보안 티켓 목록",
												closeConfirm: false,
												autoHeight: true,
												modalSize: "xl",
												callback:[{
													targetId : "cmm6206ModalCallbackBtn",
													actionFn : function(thisObj){
														//모든 위젯 초기화
														gridStack.fnRefresh();
													}
												}]
										};
										
										$.osl.layerPopupOpen('/cmm/cmm6000/cmm6200/selectCmm6206View.do',data,options);
									});
								});
							}
						}
					}
				},
			},
			//전체
			"WGTREQ2000000006" : {
				size : ["2X1", "4X2", "12X1"],
				"2X1": {
					//구분자
					callId : "ticketAll",
					//boolean default false
					fullType : false,
					addFullTypeClass : "",
					//class
					cardClass : "osl-widget-card--v1",
					cardBodyClass : '',
					//string Y, N, D default N, card-title에 wgtGrpNm과 동시 표출 유무
					//Y - 동시 표출, N - wgtGrpNm만 표출, D - label 만 표출
					addLabel: "N",
					//text
					label : `전체`,
					//class
					icon : `fas fa-folder-open`,
					//html
					toolbar : ``,
					//html
					content : `
						<div class="h-100 d-flex flex-wrap align-items-center justify-content-end rounded rounded-top-0 osl-area-hover cursor-pointer osl-evt__ticket--explanatory-btn">
							<div class="text-end">
								<div class="point-title me-4 osl-evt__ticket--all-count">
									999+
								</div>
								<div class="">
									<span class="point-label me-4" data-lang-cd="">
										전체
									</span>
								</div>
							</div>
						</div>
					`,
					actionFn : function(){
						var widgetId = this.widgetId;
						var optionKey = this.optionKey;
						
						//대상 위젯
						var thisWidget = $(`.osl-evt__widget-item[gs-id="${widgetId}"]`);
						//위젯 설정 시 이벤트가 호출되면 안되기 때문에 실제 이벤트 지정될 영역
						var targetWidget = thisWidget.find(".osl-evt__widget-card .osl-evt__widget-card-body");
						
						//그리드스택
						var gridStackId = thisWidget.closest(".osl-evt__grid-stack-area").attr("id");
						var gridStack = widgetSettingGridStack[gridStackId];
						
						//위젯 세팅 시 정보 바로 보관해두기 위해서
						//현재 요청자
						//var usrId = $.osl.user.userInfo.usrId;
						
						//구분자
						var callId = this.callId;
						
						return {
							//새로고침 버튼 누르면 호출
							reload : function(){ 
								/**** 검색 조건 ****/
								//대시보드 검색조건 공통
								var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
								
								//위젯의 설정 값 추가
								$.each(optionKey, function(wgtOptKey, map){
									dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
								});
								
								//구분자
								dshSearchParams["callId"] = callId;
								
								
								/**** 조회 param 합치기 ****/
								dshSearchParams["baseGrp"] = "prjId";
								//dshSearchParams["reqUsrId"] = usrId;
								//티켓 분류 REQ00018 - 01 보안 정책, 02 이상징후, 03 외부
								dshSearchParams["reqClsType"] = "02";
								//로그 연결 여부 CMM00001 - 01 예, 02 아니오
								dshSearchParams["logLnkCd"] = "01";
								
								/**** 검색 조건 끝 ****/
								
								//AJAX 설정
								var ajaxObj = new $.osl.ajaxRequestAction(
										{"url":"/wgt/wgt1000/wgt1100/selectWgt1100WidgetReloadAjax.do", "async":"false"}
										,dshSearchParams);
								//AJAX 전송 성공 함수
								ajaxObj.setFnSuccess(function(data){
									//오류
									if(data.errorYn == "Y"){
										$.osl.alert(data.message,{type: 'error'});
										//모달 창 닫기
										$.osl.layerPopupClose();
									}
									//성공
									else{
										//totalCnt, acceptStayCnt, progressIngCnt, acceptRejectCnt, progressEndCnt, signRejectCnt, progressRejectCnt 존재
										var ticketAllCnt = data.ticketAllCnt;
										
										var ticketTotalCnt = ticketAllCnt["totalCnt"];
										if(Number(ticketTotalCnt) > 999){
											ticketTotalCnt = "999+";
										}
										
										//종합 갯수 표출
										targetWidget.find(".osl-evt__ticket--all-count").text(ticketTotalCnt);
									}
								});
								
								return ajaxObj.send();
							},
							init : function(){
								//조회
								var ajaxObj = this.reload();
								
								ajaxObj.done(function(){
									//위젯 자체 클릭 시 전체 팝업 표출
									targetWidget.off("click").on("click", function(){
										/**** 검색 조건 ****/
										//대시보드 검색조건 공통
										var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
										
										//위젯의 설정 값 추가
										$.each(optionKey, function(wgtOptKey, map){
											dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
										});
										
										//구분자
										dshSearchParams["callId"] = callId;
										
										/**** 조회 param 합치기 ****/
										dshSearchParams["baseGrp"] = "prjId";
										//dshSearchParams["reqUsrId"] = usrId;
										//티켓 분류 REQ00018 - 01 보안 정책, 02 이상징후, 03 외부
										dshSearchParams["reqClsType"] = "02";
										//로그 연결 여부 CMM00001 - 01 예, 02 아니오
										dshSearchParams["logLnkCd"] = "01";
										
										/**** 검색 조건 끝 ****/
										
										var dataParam = {
												// 데이터 조회 URL
												url : "/wgt/wgt1000/wgt1100/selectWgt1100GetReqListAjax.do",
												//조회 파라미터
												params : dshSearchParams,
												//데이터 테이블 & 팝업 옵션
												option : {
													showBtns : ["reqDetail"],
													submitBtnCd : false, // submit 버튼 표출 유무
												}
										};
										
										var data = {
												type : "list",
												reqType : "01", //티켓
												currentIdKey : callId,
												dataParam : JSON.stringify(dataParam)
										};
										
										var options = {
												idKey: callId,
												modalTitle : "[전체] 보안 티켓 목록",
												closeConfirm: false,
												autoHeight: true,
												modalSize: "xl",
												callback:[{
													targetId : "cmm6206ModalCallbackBtn",
													actionFn : function(thisObj){
														//모든 위젯 초기화
														gridStack.fnRefresh();
													}
												}]
										};
										
										$.osl.layerPopupOpen('/cmm/cmm6000/cmm6200/selectCmm6206View.do',data,options);
									});
								});
							}
						}
					}
				},
				"4X2" : {
					//구분자
					callId : "ticketAll",
					//boolean default false
					fullType : false,
					addFullTypeClass : "",
					//class
					cardClass : "osl-widget-card--v1",
					cardBodyClass : '',
					//string Y, N, D default N, card-title에 wgtGrpNm과 동시 표출 유무
					//Y - 동시 표출, N - wgtGrpNm만 표출, D - label 만 표출
					addLabel: "N",
					//text
					label : `전체`,
					//class
					icon : `fas fa-folder-open`,
					//html
					toolbar : ``,
					//html
					content : `
						<div class="d-table table-layout-fixed w-100 h-100">
							<div class="d-table-row">
								<div class="d-table-cell align-middle text-center rounded osl-area-hover cursor-pointer osl-evt__ticket--all-btn" data-req-pro-type="01">
									<div class="point-title weak text-info osl-evt__ticket--stay-count">
										999+
									</div>
									<div class="d-flex align-items-center justify-content-center h-40px">
										<span class="point-label weak text-info osl-word-break--keep-all" data-lang-cd="">
											접수 대기
										</span>
									</div>
								</div>
								<div class="d-table-cell align-middle text-center rounded osl-area-hover cursor-pointer osl-evt__ticket--all-btn" data-req-pro-type="02">
									<div class="point-title weak text-primary osl-evt__ticket--ing-count">
										999+
									</div>
									<div class="d-flex align-items-center justify-content-center h-40px">
										<span class="point-label weak text-primary osl-word-break--keep-all" data-lang-cd="">
											처리중
										</span>
									</div>
								</div>
							</div>
							<div class="d-table-row">
								<div class="d-table-cell align-middle text-center rounded osl-area-hover cursor-pointer osl-evt__ticket--all-btn" data-req-pro-type="03">
									<div class="point-title weak text-danger osl-evt__ticket--reject-count">
										999+
									</div>
									<div class="d-flex align-items-center justify-content-center h-40px">
										<span class="point-label weak text-danger osl-word-break--keep-all" data-lang-cd="">
											접수 반려
										</span>
									</div>
								</div>
								<div class="d-table-cell align-middle text-center rounded osl-area-hover cursor-pointer osl-evt__ticket--all-btn" data-req-pro-type="04">
									<div class="point-title weak text-success osl-evt__ticket--success-count">
										999+
									</div>
									<div class="d-flex align-items-center justify-content-center h-40px">
										<span class="point-label weak text-success osl-word-break--keep-all" data-lang-cd="">
											처리 완료
										</span>
									</div>
								</div>
							</div>
							<div class="d-table-row">
								<div class="d-table-cell align-middle text-center rounded osl-area-hover cursor-pointer osl-evt__ticket--all-btn" data-req-pro-type="05">
									<div class="point-title weak text-orange osl-evt__ticket--sign-reject-count">
										999+
									</div>
									<div class="d-flex align-items-center justify-content-center h-40px">
										<span class="point-label weak text-orange osl-word-break--keep-all" data-lang-cd="">
											결재 반려 종료
										</span>
									</div>
								</div>
								<div class="d-table-cell align-middle text-center rounded osl-area-hover cursor-pointer osl-evt__ticket--all-btn" data-req-pro-type="06">
									<div class="point-title weak text-manatee osl-evt__ticket--stop-count">
										999+
									</div>
									<div class="d-flex align-items-center justify-content-center h-40px">
										<span class="point-label weak text-manatee osl-word-break--keep-all" data-lang-cd="">
											중간 종료
										</span>
									</div>
								</div>
							</div>
						</div>
					`,
					actionFn : function(){
						var widgetId = this.widgetId;
						var optionKey = this.optionKey;
						
						//대상 위젯
						var thisWidget = $(`.osl-evt__widget-item[gs-id="${widgetId}"]`);
						//위젯 설정 시 이벤트가 호출되면 안되기 때문에 실제 이벤트 지정될 영역
						var targetWidget = thisWidget.find(".osl-evt__widget-card .osl-evt__widget-card-body");
						
						//그리드스택
						var gridStackId = thisWidget.closest(".osl-evt__grid-stack-area").attr("id");
						var gridStack = widgetSettingGridStack[gridStackId];
						
						//위젯 세팅 시 정보 바로 보관해두기 위해서
						//현재 요청자
						//var usrId = $.osl.user.userInfo.usrId;
						
						//구분자
						var callId = this.callId;
						
						return {
							//새로고침 버튼 누르면 호출
							reload : function(){ 
								/**** 검색 조건 ****/
								//대시보드 검색조건 공통
								var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
								
								//위젯의 설정 값 추가
								$.each(optionKey, function(wgtOptKey, map){
									dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
								});
								
								//구분자
								dshSearchParams["callId"] = callId;
								
								
								/**** 조회 param 합치기 ****/
								dshSearchParams["baseGrp"] = "prjId";
								//dshSearchParams["reqUsrId"] = usrId;
								//티켓 분류 REQ00018 - 01 보안 정책, 02 이상징후, 03 외부
								dshSearchParams["reqClsType"] = "02";
								//로그 연결 여부 CMM00001 - 01 예, 02 아니오
								dshSearchParams["logLnkCd"] = "01";
								
								/**** 검색 조건 끝 ****/
								
								//AJAX 설정
								var ajaxObj = new $.osl.ajaxRequestAction(
										{"url":"/wgt/wgt1000/wgt1100/selectWgt1100WidgetReloadAjax.do", "async":"false"}
										,dshSearchParams);
								//AJAX 전송 성공 함수
								ajaxObj.setFnSuccess(function(data){
									//오류
									if(data.errorYn == "Y"){
										$.osl.alert(data.message,{type: 'error'});
										//모달 창 닫기
										$.osl.layerPopupClose();
									}
									//성공
									else{
										//totalCnt, acceptStayCnt, progressIngCnt, acceptRejectCnt, progressEndCnt, signRejectCnt, progressRejectCnt 존재
										var ticketAllCnt = data.ticketAllCnt;
										
										var ticketStayCnt = ticketAllCnt["acceptStayCnt"];
										if(Number(ticketStayCnt) > 999){
											ticketStayCnt = "999+";
										}
										var ticketIngCnt = ticketAllCnt["progressIngCnt"];
										if(Number(ticketIngCnt) > 999){
											ticketIngCnt = "999+";
										}
										var ticketRejectCnt = ticketAllCnt["acceptRejectCnt"];
										if(Number(ticketRejectCnt) > 999){
											ticketRejectCnt = "999+";
										}
										var ticketSuccessCnt = ticketAllCnt["progressEndCnt"];
										if(Number(ticketSuccessCnt) > 999){
											ticketSuccessCnt = "999+";
										}
										var ticketSignRejectCnt = ticketAllCnt["signRejectCnt"];
										if(Number(ticketSignRejectCnt) > 999){
											ticketSignRejectCnt = "999+";
										}
										var ticketStopCnt = ticketAllCnt["progressRejectCnt"];
										if(Number(ticketStopCnt) > 999){
											ticketStopCnt = "999+";
										}
										
										//갯수 표출
										//접수 대기, 처리중, 접수반려, 처리완료, 결재반려 종료, 중간 종료
										targetWidget.find(".osl-evt__ticket--stay-count").text(ticketStayCnt);
										targetWidget.find(".osl-evt__ticket--ing-count").text(ticketIngCnt);
										targetWidget.find(".osl-evt__ticket--reject-count").text(ticketRejectCnt);
										targetWidget.find(".osl-evt__ticket--success-count").text(ticketSuccessCnt);
										targetWidget.find(".osl-evt__ticket--sign-reject-count").text(ticketSignRejectCnt);
										targetWidget.find(".osl-evt__ticket--stop-count").text(ticketStopCnt);
									}
								});
								
								return ajaxObj.send();
							},
							init : function(){
								//조회
								var ajaxObj = this.reload();
								
								ajaxObj.done(function(){
									//위젯 자체 클릭 시 티켓 유형별 팝업 표출
									targetWidget.off("click").on("click", ".osl-evt__ticket--all-btn", function(){
										/**** 검색 조건 ****/
										//대시보드 검색조건 공통
										var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
										
										//위젯의 설정 값 추가
										$.each(optionKey, function(wgtOptKey, map){
											dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
										});
										
										//구분자
										dshSearchParams["callId"] = callId;
										
										//REQ00008
										var reqProType = $(this).data("req-pro-type");
										
										/**** 조회 param 합치기 ****/
										dshSearchParams["baseGrp"] = "prjId";
										//dshSearchParams["reqUsrId"] = usrId;
										//REQ00008 01 접수대기 02 처리중 03 반려 04 완료 05 결재반려후 종료 06 중간 종료
										dshSearchParams["reqProType"] = reqProType;
										//티켓 분류 REQ00018 - 01 보안 정책, 02 이상징후, 03 외부
										dshSearchParams["reqClsType"] = "02";
										//로그 연결 여부 CMM00001 - 01 예, 02 아니오
										dshSearchParams["logLnkCd"] = "01";
										
										/**** 검색 조건 끝 ****/
										
										//팝업 타이틀에 추가
										var reqProTypeNm = "";
										if(reqProType == "01") {
											reqProTypeNm = "접수 대기";
										}else if(reqProType == "02") {
											reqProTypeNm = "처리중";
										}else if(reqProType == "03") {
											reqProTypeNm = "접수 반려";
										}else if(reqProType == "04") {
											reqProTypeNm = "처리 완료";
										}else if(reqProType == "05") {
											reqProTypeNm = "결재 반려 후 종료";
										}else if(reqProType == "06") {
											reqProTypeNm = "중간 종료";
										}
										
										var dataParam = {
												// 데이터 조회 URL
												url : "/wgt/wgt1000/wgt1100/selectWgt1100GetReqListAjax.do",
												//조회 파라미터
												params : dshSearchParams,
												//데이터 테이블 & 팝업 옵션
												option : {
													showBtns : ["reqDetail"],
													submitBtnCd : false, // submit 버튼 표출 유무
												}
										};
										
										var data = {
												type : "list",
												reqType : "01", //티켓
												currentIdKey : callId,
												dataParam : JSON.stringify(dataParam)
										};
										
										var options = {
												idKey: callId,
												modalTitle : "["+reqProTypeNm+"] 보안 티켓 목록",
												closeConfirm: false,
												autoHeight: true,
												modalSize: "xl",
												callback:[{
													targetId : "cmm6206ModalCallbackBtn",
													actionFn : function(thisObj){
														//모든 위젯 초기화
														gridStack.fnRefresh();
													}
												}]
										};
										
										$.osl.layerPopupOpen('/cmm/cmm6000/cmm6200/selectCmm6206View.do',data,options);
									});
								});
							}
						}//end return
					}
				},
				"12X1": {
					//구분자
					callId : "ticketAll",
					//boolean default false
					fullType : false,
					addFullTypeClass : "",
					//class
					cardClass : "osl-widget-card--v1",
					cardBodyClass : '',
					//string Y, N, D default N, card-title에 wgtGrpNm과 동시 표출 유무
					//Y - 동시 표출, N - wgtGrpNm만 표출, D - label 만 표출
					addLabel: "N",
					//text
					label : `전체`,
					//class
					icon : `fas fa-folder-open`,
					//html
					toolbar : ``,
					//html
					content : `
						<div class="d-table table-layout-fixed w-100 h-100">
							<div class="d-table-cell align-middle text-center rounded osl-area-hover cursor-pointer osl-evt__ticket--all-btn" data-req-pro-type="01">
								<div class="point-title weak text-info osl-evt__ticket--stay-count">
									999+
								</div>
								<div class="d-flex align-items-center justify-content-center h-40px">
									<span class="point-label weak text-info osl-word-break--keep-all" data-lang-cd="">
										접수 대기
									</span>
								</div>
							</div>
							<div class="d-table-cell align-middle text-center rounded osl-area-hover cursor-pointer osl-evt__ticket--all-btn" data-req-pro-type="02">
								<div class="point-title weak text-primary osl-evt__ticket--ing-count">
									999+
								</div>
								<div class="d-flex align-items-center justify-content-center h-40px">
									<span class="point-label weak text-primary osl-word-break--keep-all" data-lang-cd="">
										처리중
									</span>
								</div>
							</div>
							<div class="d-table-cell align-middle text-center rounded osl-area-hover cursor-pointer osl-evt__ticket--all-btn" data-req-pro-type="03">
								<div class="point-title weak text-danger osl-evt__ticket--reject-count">
									999+
								</div>
								<div class="d-flex align-items-center justify-content-center h-40px">
									<span class="point-label weak text-danger osl-word-break--keep-all" data-lang-cd="">
										접수 반려
									</span>
								</div>
							</div>
							<div class="d-table-cell align-middle text-center rounded osl-area-hover cursor-pointer osl-evt__ticket--all-btn" data-req-pro-type="04">
								<div class="point-title weak text-success osl-evt__ticket--success-count">
									999+
								</div>
								<div class="d-flex align-items-center justify-content-center h-40px">
									<span class="point-label weak text-success osl-word-break--keep-all" data-lang-cd="">
										처리 완료
									</span>
								</div>
							</div>
							<div class="d-table-cell align-middle text-center rounded osl-area-hover cursor-pointer osl-evt__ticket--all-btn" data-req-pro-type="05">
								<div class="point-title weak text-orange osl-evt__ticket--sign-reject-count">
									999+
								</div>
								<div class="d-flex align-items-center justify-content-center h-40px">
									<span class="point-label weak text-orange osl-word-break--keep-all" data-lang-cd="">
										결재 반려 종료
									</span>
								</div>
							</div>
							<div class="d-table-cell align-middle text-center rounded osl-area-hover cursor-pointer osl-evt__ticket--all-btn" data-req-pro-type="06">
								<div class="point-title weak text-manatee osl-evt__ticket--stop-count">
									999+
								</div>
								<div class="d-flex align-items-center justify-content-center h-40px">
									<span class="point-label weak text-manatee osl-word-break--keep-all" data-lang-cd="">
										중간 종료
									</span>
								</div>
							</div>
						</div>
					`,
					actionFn : function(){
						var widgetId = this.widgetId;
						var optionKey = this.optionKey;
						
						//대상 위젯
						var thisWidget = $(`.osl-evt__widget-item[gs-id="${widgetId}"]`);
						//위젯 설정 시 이벤트가 호출되면 안되기 때문에 실제 이벤트 지정될 영역
						var targetWidget = thisWidget.find(".osl-evt__widget-card .osl-evt__widget-card-body");
						
						//그리드스택
						var gridStackId = thisWidget.closest(".osl-evt__grid-stack-area").attr("id");
						var gridStack = widgetSettingGridStack[gridStackId];
						
						//위젯 세팅 시 정보 바로 보관해두기 위해서
						//현재 요청자
						//var usrId = $.osl.user.userInfo.usrId;
						
						//구분자
						var callId = this.callId;
						
						return {
							//새로고침 버튼 누르면 호출
							reload : function(){ 
								/**** 검색 조건 ****/
								//대시보드 검색조건 공통
								var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
								
								//위젯의 설정 값 추가
								$.each(optionKey, function(wgtOptKey, map){
									dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
								});
								
								//구분자
								dshSearchParams["callId"] = callId;
								
								
								/**** 조회 param 합치기 ****/
								dshSearchParams["baseGrp"] = "prjId";
								//dshSearchParams["reqUsrId"] = usrId;
								//티켓 분류 REQ00018 - 01 보안 정책, 02 이상징후, 03 외부
								dshSearchParams["reqClsType"] = "02";
								//로그 연결 여부 CMM00001 - 01 예, 02 아니오
								dshSearchParams["logLnkCd"] = "01";
								
								/**** 검색 조건 끝 ****/
								
								//AJAX 설정
								var ajaxObj = new $.osl.ajaxRequestAction(
										{"url":"/wgt/wgt1000/wgt1100/selectWgt1100WidgetReloadAjax.do", "async":"false"}
										,dshSearchParams);
								//AJAX 전송 성공 함수
								ajaxObj.setFnSuccess(function(data){
									//오류
									if(data.errorYn == "Y"){
										$.osl.alert(data.message,{type: 'error'});
										//모달 창 닫기
										$.osl.layerPopupClose();
									}
									//성공
									else{
										//totalCnt, acceptStayCnt, progressIngCnt, acceptRejectCnt, progressEndCnt, signRejectCnt, progressRejectCnt 존재
										var ticketAllCnt = data.ticketAllCnt;
										
										var ticketStayCnt = ticketAllCnt["acceptStayCnt"];
										if(Number(ticketStayCnt) > 999){
											ticketStayCnt = "999+";
										}
										var ticketIngCnt = ticketAllCnt["progressIngCnt"];
										if(Number(ticketIngCnt) > 999){
											ticketIngCnt = "999+";
										}
										var ticketRejectCnt = ticketAllCnt["acceptRejectCnt"];
										if(Number(ticketRejectCnt) > 999){
											ticketRejectCnt = "999+";
										}
										var ticketSuccessCnt = ticketAllCnt["progressEndCnt"];
										if(Number(ticketSuccessCnt) > 999){
											ticketSuccessCnt = "999+";
										}
										var ticketSignRejectCnt = ticketAllCnt["signRejectCnt"];
										if(Number(ticketSignRejectCnt) > 999){
											ticketSignRejectCnt = "999+";
										}
										var ticketStopCnt = ticketAllCnt["progressRejectCnt"];
										if(Number(ticketStopCnt) > 999){
											ticketStopCnt = "999+";
										}
										
										//갯수 표출
										//접수 대기, 처리중, 접수반려, 처리완료, 결재반려 종료, 중간 종료
										targetWidget.find(".osl-evt__ticket--stay-count").text(ticketStayCnt);
										targetWidget.find(".osl-evt__ticket--ing-count").text(ticketIngCnt);
										targetWidget.find(".osl-evt__ticket--reject-count").text(ticketRejectCnt);
										targetWidget.find(".osl-evt__ticket--success-count").text(ticketSuccessCnt);
										targetWidget.find(".osl-evt__ticket--sign-reject-count").text(ticketSignRejectCnt);
										targetWidget.find(".osl-evt__ticket--stop-count").text(ticketStopCnt);
									}
								});
								
								return ajaxObj.send();
							},
							init : function(){
								//조회
								var ajaxObj = this.reload();
								
								ajaxObj.done(function(){
									//위젯 자체 클릭 시 티켓 유형별 팝업 표출
									targetWidget.off("click").on("click", ".osl-evt__ticket--all-btn", function(){
										/**** 검색 조건 ****/
										//대시보드 검색조건 공통
										var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
										
										//위젯의 설정 값 추가
										$.each(optionKey, function(wgtOptKey, map){
											dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
										});
										
										//구분자
										dshSearchParams["callId"] = callId;
										
										//REQ00008
										var reqProType = $(this).data("req-pro-type");
										
										/**** 조회 param 합치기 ****/
										dshSearchParams["baseGrp"] = "prjId";
										//dshSearchParams["reqUsrId"] = usrId;
										//REQ00008 01 접수대기 02 처리중 03 반려 04 완료 05 결재반려후 종료 06 중간 종료
										dshSearchParams["reqProType"] = reqProType;
										//티켓 분류 REQ00018 - 01 보안 정책, 02 이상징후, 03 외부
										dshSearchParams["reqClsType"] = "02";
										//로그 연결 여부 CMM00001 - 01 예, 02 아니오
										dshSearchParams["logLnkCd"] = "01";
										
										/**** 검색 조건 끝 ****/
										
										//팝업 타이틀에 추가
										var reqProTypeNm = "";
										if(reqProType == "01") {
											reqProTypeNm = "접수 대기";
										}else if(reqProType == "02") {
											reqProTypeNm = "처리중";
										}else if(reqProType == "03") {
											reqProTypeNm = "접수 반려";
										}else if(reqProType == "04") {
											reqProTypeNm = "처리 완료";
										}else if(reqProType == "05") {
											reqProTypeNm = "결재 반려 후 종료";
										}else if(reqProType == "06") {
											reqProTypeNm = "중간 종료";
										}
										
										var dataParam = {
												// 데이터 조회 URL
												url : "/wgt/wgt1000/wgt1100/selectWgt1100GetReqListAjax.do",
												//조회 파라미터
												params : dshSearchParams,
												//데이터 테이블 & 팝업 옵션
												option : {
													showBtns : ["reqDetail"],
													submitBtnCd : false, // submit 버튼 표출 유무
												}
										};
										
										var data = {
												type : "list",
												reqType : "01", //티켓
												currentIdKey : callId,
												dataParam : JSON.stringify(dataParam)
										};
										
										var options = {
												idKey: callId,
												modalTitle : "["+reqProTypeNm+"] 보안 티켓 목록",
												closeConfirm: false,
												autoHeight: true,
												modalSize: "xl",
												callback:[{
													targetId : "cmm6206ModalCallbackBtn",
													actionFn : function(thisObj){
														//모든 위젯 초기화
														gridStack.fnRefresh();
													}
												}]
										};
										
										$.osl.layerPopupOpen('/cmm/cmm6000/cmm6200/selectCmm6206View.do',data,options);
									});
								});
							}
						}//end return
					}
				}
			},
			//처리율
			"WGTREQ2000000007" : {
				size : ["2X1", "2X2", "4X1"],
				"2X1": {
					//구분자
					callId : "ticketAll",
					//boolean default false
					fullType : false,
					addFullTypeClass : "",
					//class
					cardClass : "osl-widget-card--v1",
					cardBodyClass : '',
					//string Y, N, D default N, card-title에 wgtGrpNm과 동시 표출 유무
					//Y - 동시 표출, N - wgtGrpNm만 표출, D - label 만 표출
					addLabel: "Y",
					//text
					label : `처리 현황`,
					//class
					icon : `fas fa-percentage`,
					//html
					toolbar : ``,
					//html
					content : `
						<div class="d-flex justify-content-center flex-column h-100">
							<div class="d-flex flex-stack gap-2 mx-4">
								<div class="point-label">
									<span class="osl-word-break--keep-all" data-lang-cd="">
										처리율
									</span>
								</div>
								<div class="point-title osl-evt__ticket--progress-percent">
									99.9%
								</div>
							</div>
							<div class="mx-4">
								<div class="progress bg-light h-10px my-4">
									<div class="progress-bar bg-primary osl-evt__progress-bar" role="progressbar" style="width:40%;"></div>
								</div>
								<div class="point-text strong text-end">
									<span class="osl-evt__ticket--finish-count">Finish</span>
									/
									<span class="osl-evt__ticket--all-count">Total</span>
								</div>
							</div>
						</div>
					`,
					actionFn : function(){
						var widgetId = this.widgetId;
						var optionKey = this.optionKey;
						
						//대상 위젯
						var thisWidget = $(`.osl-evt__widget-item[gs-id="${widgetId}"]`);
						//위젯 설정 시 이벤트가 호출되면 안되기 때문에 실제 이벤트 지정될 영역
						var targetWidget = thisWidget.find(".osl-evt__widget-card .osl-evt__widget-card-body");
						
						//그리드스택
						var gridStackId = thisWidget.closest(".osl-evt__grid-stack-area").attr("id");
						var gridStack = widgetSettingGridStack[gridStackId];
						
						//위젯 세팅 시 정보 바로 보관해두기 위해서
						//현재 요청자
						//var usrId = $.osl.user.userInfo.usrId;
						
						//구분자
						var callId = this.callId;
						
						return {
							//새로고침 버튼 누르면 호출
							reload : function(){ 
								/**** 검색 조건 ****/
								//대시보드 검색조건 공통
								var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
								
								//위젯의 설정 값 추가
								$.each(optionKey, function(wgtOptKey, map){
									dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
								});
								
								//구분자
								dshSearchParams["callId"] = callId;
								
								
								/**** 조회 param 합치기 ****/
								dshSearchParams["baseGrp"] = "prjId";
								//dshSearchParams["reqUsrId"] = usrId;
								//티켓 분류 REQ00018 - 01 보안 정책, 02 이상징후, 03 외부
								dshSearchParams["reqClsType"] = "02";
								//로그 연결 여부 CMM00001 - 01 예, 02 아니오
								dshSearchParams["logLnkCd"] = "01";
								
								/**** 검색 조건 끝 ****/
								
								//AJAX 설정
								var ajaxObj = new $.osl.ajaxRequestAction(
										{"url":"/wgt/wgt1000/wgt1100/selectWgt1100WidgetReloadAjax.do", "async":"false"}
										,dshSearchParams);
								//AJAX 전송 성공 함수
								ajaxObj.setFnSuccess(function(data){
									//오류
									if(data.errorYn == "Y"){
										$.osl.alert(data.message,{type: 'error'});
										//모달 창 닫기
										$.osl.layerPopupClose();
									}
									//성공
									else{
										//totalCnt, acceptStayCnt, progressIngCnt, acceptRejectCnt, progressEndCnt, signRejectCnt, progressRejectCnt 존재
										var ticketAllCnt = data.ticketAllCnt;
										
										//전체 카운트(처리중, 완료)
										var ticketInProgressCnt = Number(ticketAllCnt["progressIngCnt"]) + Number(ticketAllCnt["progressEndCnt"]);
										//처리 완료 카운트
										var ticketEndProgressCnt = Number(ticketAllCnt["progressEndCnt"]);
										
										//비율 계산
										var ticketRatio = 0;
										if(ticketInProgressCnt != 0 && ticketEndProgressCnt != 0){
											ticketRatio = ((ticketEndProgressCnt/ticketInProgressCnt)*100).toFixed(1);
											if(ticketInProgressCnt == ticketEndProgressCnt){
												ticketRatio = 100;
											}
										}
										
										//숫자 넣기
										targetWidget.find(".osl-evt__ticket--progress-percent").text(ticketRatio+"%");
										
										//스타일 넣기
										targetWidget.find(".osl-evt__progress-bar").attr("style", "width:"+ticketRatio+"%;");
										
										//종합 갯수 표출
										targetWidget.find(".osl-evt__ticket--finish-count").text(ticketEndProgressCnt);
										targetWidget.find(".osl-evt__ticket--all-count").text(ticketInProgressCnt);
									}
								});
								
								ajaxObj.send();
							},
							init : function(){
								//조회
								this.reload();
							}
						}
					}
				},
				"2X2": {
					//구분자
					callId : "ticketAllV2",
					//boolean default false
					fullType : false,
					addFullTypeClass : "",
					//class
					cardClass : "osl-widget-card--v1",
					cardBodyClass : '',
					//string Y, N, D default N, card-title에 wgtGrpNm과 동시 표출 유무
					//Y - 동시 표출, N - wgtGrpNm만 표출, D - label 만 표출
					addLabel: "Y",
					//text
					label : `처리 현황`,
					//class
					icon : `fas fa-percentage`,
					//html
					toolbar : ``,
					//html
					content : `
						<div class="d-flex flex-column justify-content-around h-100 mx-4">
							<div class="d-flex justify-content-center flex-column">
								<div class="d-flex flex-stack gap-2">
									<div class="point-label">
										<span class="osl-word-break--keep-all" data-lang-cd="">
											처리율
										</span>
									</div>
									<div class="point-title osl-evt__ticket--progress-percent">
										99.9%
									</div>
								</div>
								<div class="">
									<div class="progress bg-light h-10px my-4">
										<div class="progress-bar bg-primary osl-evt__progress-bar" role="progressbar" style="width:40%;"></div>
									</div>
									<div class="point-text strong text-end">
										<span class="osl-evt__ticket--finish-count">Finish</span>
										/
										<span class="osl-evt__ticket--all-count">Total</span>
									</div>
								</div>
							</div>
							<div class="d-flex flex-column justify-content-around w-100 point-label weak position-relative">
								<div class="d-flex flex-wrap point-area-hover--bullet point-area-hover-dark--bullet cursor-pointer mb-2 osl-evt__ticket--ratio-btn" data-req-pro-type="-1">
									<div class="w-50 text-start">
										<span class="ms-4" data-lang-cd="">전체</span>
									</div>
									<div class="w-50 text-end">
										<span class="osl-evt__ticket--all-count me-4">999+</span>
									</div>
								</div>
								<div class="d-flex flex-wrap point-area-hover--bullet point-area-hover-info--bullet cursor-pointer mb-2 osl-evt__ticket--ratio-btn" data-req-pro-type="01">
									<div class="w-50 text-start">
										<span class="ms-4" data-lang-cd="">대기</span>
									</div>
									<div class="w-50 text-end">
										<span class="osl-evt__ticket--stay-count me-4">999+</span>
									</div>
								</div>
								<div class="d-flex flex-wrap point-area-hover--bullet point-area-hover-primary--bullet cursor-pointer mb-2 osl-evt__ticket--ratio-btn" data-req-pro-type="02" data-req-charger="-1">
									<div class="w-50 text-start">
										<span class="ms-4" data-lang-cd="">처리</span>
									</div>
									<div class="w-50 text-end">
										<span class="osl-evt__ticket--progress-count me-4">999+</span>
									</div>
								</div>
								<div class="separator separator-dotted border-dark my-2"></div>
								<div class="bg-light bg-opacity-50 rounded point-label weak text-dark p-2">
									<div class="d-flex flex-wrap rounded osl-area-hover-primary cursor-pointer p-2 osl-evt__ticket--ratio-btn" data-req-pro-type="02" data-req-charger="usr">
										<div class="w-50 text-start">
											<span class="ms-4" data-lang-cd="">담당</span>
										</div>
										<div class="w-50 text-end">
											<span class="osl-evt__ticket--progress-charger-usr-count me-4">999+/999+</span>
										</div>
									</div>
									<div class="d-flex flex-wrap rounded osl-area-hover-primary cursor-pointer p-2 osl-evt__ticket--ratio-btn" data-req-pro-type="02" data-req-charger="none">
										<div class="w-50 text-start">
											<span class="ms-4" data-lang-cd="">無담당</span>
										</div>
										<div class="w-50 text-end">
											<span class="osl-evt__ticket--progress-charger-none-count me-4">999+</span>
										</div>
									</div>
								</div>
								<div class="separator separator-dotted border-dark my-2"></div>
								<div class="d-flex flex-wrap point-area-hover--bullet point-area-hover-success--bullet cursor-pointer mb-2 osl-evt__ticket--ratio-btn" data-req-pro-type="04">
									<div class="w-50 text-start">
										<span class="ms-4" data-lang-cd="">완료</span>
									</div>
									<div class="w-50 text-end">
										<span class="osl-evt__ticket--finish-count me-4">999+</span>
									</div>
								</div>
								<div class="d-flex flex-wrap point-area-hover--bullet point-area-hover-danger--bullet cursor-pointer mb-2 osl-evt__ticket--ratio-btn" data-req-pro-type="end">
									<div class="w-50 text-start">
										<span class="ms-4" data-lang-cd="">종료</span>
									</div>
									<div class="w-50 text-end">
										<span class="osl-evt__ticket--stop-count me-4">999+</span>
									</div>
								</div>
							</div>
						</div>
					`,
					actionFn : function(){
						var widgetId = this.widgetId;
						var optionKey = this.optionKey;
						
						//대상 위젯
						var thisWidget = $(`.osl-evt__widget-item[gs-id="${widgetId}"]`);
						//위젯 설정 시 이벤트가 호출되면 안되기 때문에 실제 이벤트 지정될 영역
						var targetWidget = thisWidget.find(".osl-evt__widget-card .osl-evt__widget-card-body");
						
						//그리드스택
						var gridStackId = thisWidget.closest(".osl-evt__grid-stack-area").attr("id");
						var gridStack = widgetSettingGridStack[gridStackId];
						
						//위젯 세팅 시 정보 바로 보관해두기 위해서
						//현재 요청자
						//var usrId = $.osl.user.userInfo.usrId;
						
						//구분자
						var callId = this.callId;
						
						return {
							//새로고침 버튼 누르면 호출
							reload : function(){ 
								/**** 검색 조건 ****/
								//대시보드 검색조건 공통
								var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
								
								//위젯의 설정 값 추가
								$.each(optionKey, function(wgtOptKey, map){
									dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
								});
								
								//구분자
								dshSearchParams["callId"] = callId;
								
								/**** 조회 param 합치기 ****/
								dshSearchParams["baseGrp"] = "prjId";
								//dshSearchParams["reqUsrId"] = usrId;
								//티켓 분류 REQ00018 - 01 보안 정책, 02 이상징후, 03 외부
								dshSearchParams["reqClsType"] = "02";
								//로그 연결 여부 CMM00001 - 01 예, 02 아니오
								dshSearchParams["logLnkCd"] = "01";
								
								/**** 검색 조건 끝 ****/
								
								//AJAX 설정
								var ajaxObj = new $.osl.ajaxRequestAction(
										{"url":"/wgt/wgt1000/wgt1100/selectWgt1100WidgetReloadAjax.do", "async":"false"}
										,dshSearchParams);
								//AJAX 전송 성공 함수
								ajaxObj.setFnSuccess(function(data){
									//오류
									if(data.errorYn == "Y"){
										$.osl.alert(data.message,{type: 'error'});
										//모달 창 닫기
										$.osl.layerPopupClose();
									}
									//성공
									else{
										//totalCnt, acceptStayCnt, progressIngCnt, acceptRejectCnt, progressEndCnt, signRejectCnt, progressRejectCnt 존재
										var ticketAllCnt = data.ticketAllCnt;
										
										//담당자
										//chargerNoneCnt, chargerDoneCnt, chargerUsrCnt존재
										var ticketInPrsChgCnt = data.ticketInPrsChgCnt;
										
										//전체 카운트(처리중, 완료)
										var ticketInProgressCnt = Number(ticketAllCnt["progressIngCnt"]) + Number(ticketAllCnt["progressEndCnt"]);
										//처리 완료 카운트
										var ticketEndProgressCnt = Number(ticketAllCnt["progressEndCnt"]);
										
										//비율 계산
										var ticketRatio = 0;
										if(ticketInProgressCnt != 0 && ticketEndProgressCnt != 0){
											ticketRatio = ((ticketEndProgressCnt/ticketInProgressCnt)*100).toFixed(1);
											if(ticketInProgressCnt == ticketEndProgressCnt){
												ticketRatio = 100;
											}
										}
										
										//숫자 넣기
										targetWidget.find(".osl-evt__ticket--progress-percent").text(ticketRatio+"%");
										
										//스타일 넣기
										targetWidget.find(".osl-evt__progress-bar").attr("style", "width:"+ticketRatio+"%;");
										
										//처리율 넣기
										targetWidget.find(".osl-evt__progress-circle-bar-num").attr("style", "--value:"+ticketRatio+";");
										targetWidget.find(".osl-evt__progress-circle-bar-num--label").attr("style", "--value:"+ticketRatio+";");
										targetWidget.find(".osl-evt__progress-circle-bar-num--label").text(ticketRatio+"%");
										
										//종합 갯수 표출
										targetWidget.find(".osl-evt__ticket--all-count").text(ticketAllCnt["totalCnt"]);
										targetWidget.find(".osl-evt__ticket--stay-count").text(ticketAllCnt["acceptStayCnt"]);
										targetWidget.find(".osl-evt__ticket--progress-count").text(ticketAllCnt["progressIngCnt"]);
										targetWidget.find(".osl-evt__ticket--progress-charger-usr-count").text(ticketInPrsChgCnt["chargerUsrCnt"] + "/" +ticketInPrsChgCnt["chargerDoneCnt"]);
										targetWidget.find(".osl-evt__ticket--progress-charger-none-count").text(ticketInPrsChgCnt["chargerNoneCnt"]);
										targetWidget.find(".osl-evt__ticket--finish-count").text(ticketAllCnt["progressEndCnt"]);
										targetWidget.find(".osl-evt__ticket--stop-count").text(Number(ticketAllCnt["acceptRejectCnt"])+Number(ticketAllCnt["signRejectCnt"])+Number(ticketAllCnt["progressRejectCnt"]));
									}
								});
								
								return ajaxObj.send();
							},
							init : function(){
								//조회
								var ajaxObj = this.reload();
								
								ajaxObj.done(function(){
									//위젯 처리율 내 유형 클릭 시 팝업 표출
									targetWidget.off("click").on("click", ".osl-evt__ticket--ratio-btn", function(){
										/**** 검색 조건 ****/
										//대시보드 검색조건 공통
										var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
										
										//위젯의 설정 값 추가
										$.each(optionKey, function(wgtOptKey, map){
											dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
										});
										
										//구분자
										dshSearchParams["callId"] = callId;
										
										//REQ00008
										var reqProType = $(this).data("req-pro-type");
										
										//팝업 타이틀에 추가 및 검색 조건 추가
										var reqProTypeNm = "";
										if(reqProType == "-1"){
											reqProTypeNm = "전체";
											reqProType = null;
										}
										else if(reqProType == "01"){
											reqProTypeNm = "접수 대기";
										}
										else if(reqProType == "02"){
											reqProTypeNm = "처리중";
											//담당자 확인
											var chargerType = $(this).data("req-charger");
											
											//-1, usr, none
											//담당자 존재
											if(chargerType == "usr"){
												dshSearchParams["reqChargerNotNull"] = "true";
											}
											//담당자가 없는 것
											else if(chargerType == "none"){
												dshSearchParams["reqChargerNull"] = "true";
											}
											
										}
										else if(reqProType == "04"){
											reqProTypeNm = "처리 완료";
										}
										else if(reqProType == "end"){
											reqProTypeNm = "종료";
											
											//reqProTypeList 만들어 전달
											//REQ00008 01 접수 요청, 02 처리중, 03 반려, 04 최종 완료, 05 결재 반려 종료, 06 중간 종료
											var reqProTypeList = ["03", "05", "06"];
											
											//종료 유형
											dshSearchParams["reqProTypeList"] = reqProTypeList;
										}
										
										/**** 조회 param 합치기 ****/
										dshSearchParams["baseGrp"] = "prjId";
										//dshSearchParams["reqUsrId"] = usrId;
										//REQ00008 01 접수대기 02 처리중 03 반려 04 완료 05 결재반려후 종료 06 중간 종료
										dshSearchParams["reqProType"] = reqProType;
										//티켓 분류 REQ00018 - 01 보안 정책, 02 이상징후, 03 외부
										dshSearchParams["reqClsType"] = "02";
										//로그 연결 여부 CMM00001 - 01 예, 02 아니오
										dshSearchParams["logLnkCd"] = "01";
										
										/**** 검색 조건 끝 ****/
										
										var dataParam = {
												// 데이터 조회 URL
												url : "/wgt/wgt1000/wgt1100/selectWgt1100GetReqListAjax.do",
												//조회 파라미터
												params : dshSearchParams,
												//데이터 테이블 & 팝업 옵션
												option : {
													showBtns : ["reqDetail"],
													submitBtnCd : false, // submit 버튼 표출 유무
												}
										};
										
										var data = {
												type : "list",
												reqType : "01", //티켓
												currentIdKey : callId,
												dataParam : JSON.stringify(dataParam)
										};
										
										var options = {
												idKey: callId,
												modalTitle : "["+reqProTypeNm+"] 보안 티켓 목록",
												closeConfirm: false,
												autoHeight: true,
												modalSize: "xl",
												callback:[{
													targetId : "cmm6206ModalCallbackBtn",
													actionFn : function(thisObj){
														//모든 위젯 초기화
														gridStack.fnRefresh();
													}
												}]
										};
										
										$.osl.layerPopupOpen('/cmm/cmm6000/cmm6200/selectCmm6206View.do',data,options);
									});
								});
							}
						}
					}
				},
				"4X1": {
					//구분자
					callId : "ticketAll",
					//boolean default false
					fullType : false,
					addFullTypeClass : "",
					//class
					cardClass : "osl-widget-card--v1",
					cardBodyClass : '',
					//string Y, N, D default N, card-title에 wgtGrpNm과 동시 표출 유무
					//Y - 동시 표출, N - wgtGrpNm만 표출, D - label 만 표출
					addLabel: "Y",
					//text
					label : `처리 현황`,
					//class
					icon : `fas fa-percentage`,
					//html
					toolbar : ``,
					//html
					content : `
						<div class="d-table table-layout-fixed w-100 h-100">
							<div class="d-table-cell align-middle text-center progress-circle-wrap osl-progress-circle--back-light w-50">
								<svg class="progress-circle" viewBox="0 0 140 140" width="150px" height="150px">
									<circle class="progress-circle-frame" cx="70" cy="70" r="60" />
									<circle class="progress-circle-bar osl-evt__progress-circle-bar-num" cx="70" cy="70" r="60" style="--value:35"/>
								</svg>
								<div class="progress-circle-num point-label osl-evt__progress-circle-bar-num--label" style="--value:35;">35.0%</div>
								<div class="progress-circle-label point-label weak">처리율</div>
							</div>
							<div class="d-table-cell align-middle text-end">
								<div class="point-label weak ms-4 me-10 position-relative">
									<div class="d-flex flex-wrap point-area-hover--bullet point-area-hover-dark--bullet cursor-pointer mb-2 osl-evt__ticket--ratio-btn" data-req-pro-type="-1">
										<div class="w-50 text-start">
											<span class="ms-4" data-lang-cd="">전체</span>
										</div>
										<div class="w-50 text-end">
											<span class="osl-evt__ticket--all-count me-4">999+</span>
										</div>
									</div>
									<div class="d-flex flex-wrap point-area-hover--bullet point-area-hover-info--bullet cursor-pointer mb-2 osl-evt__ticket--ratio-btn" data-req-pro-type="01">
										<div class="w-50 text-start">
											<span class="ms-4" data-lang-cd="">대기</span>
										</div>
										<div class="w-50 text-end">
											<span class="osl-evt__ticket--stay-count me-4">999+</span>
										</div>
									</div>
									<div class="d-flex flex-wrap point-area-hover--bullet point-area-hover-primary--bullet cursor-pointer mb-2 osl-evt__ticket--ratio-btn" data-req-pro-type="02">
										<div class="w-50 text-start">
											<span class="ms-4" data-lang-cd="">처리</span>
										</div>
										<div class="w-50 text-end">
											<span class="osl-evt__ticket--progress-count me-4">999+</span>
										</div>
									</div>
									<div class="d-flex flex-wrap point-area-hover--bullet point-area-hover-success--bullet cursor-pointer mb-2 osl-evt__ticket--ratio-btn" data-req-pro-type="04">
										<div class="w-50 text-start">
											<span class="ms-4" data-lang-cd="">완료</span>
										</div>
										<div class="w-50 text-end">
											<span class="osl-evt__ticket--finish-count me-4">999+</span>
										</div>
									</div>
									<div class="d-flex flex-wrap point-area-hover--bullet point-area-hover-danger--bullet cursor-pointer mb-2 osl-evt__ticket--ratio-btn" data-req-pro-type="end">
										<div class="w-50 text-start">
											<span class="ms-4" data-lang-cd="">종료</span>
										</div>
										<div class="w-50 text-end">
											<span class="osl-evt__ticket--stop-count me-4">999+</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					`,
					actionFn : function(){
						var widgetId = this.widgetId;
						var optionKey = this.optionKey;
						
						//대상 위젯
						var thisWidget = $(`.osl-evt__widget-item[gs-id="${widgetId}"]`);
						//위젯 설정 시 이벤트가 호출되면 안되기 때문에 실제 이벤트 지정될 영역
						var targetWidget = thisWidget.find(".osl-evt__widget-card .osl-evt__widget-card-body");
						
						//그리드스택
						var gridStackId = thisWidget.closest(".osl-evt__grid-stack-area").attr("id");
						var gridStack = widgetSettingGridStack[gridStackId];
						
						//위젯 세팅 시 정보 바로 보관해두기 위해서
						//현재 요청자
						//var usrId = $.osl.user.userInfo.usrId;
						
						//구분자
						var callId = this.callId;
						
						return {
							//새로고침 버튼 누르면 호출
							reload : function(){ 
								/**** 검색 조건 ****/
								//대시보드 검색조건 공통
								var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
								
								//위젯의 설정 값 추가
								$.each(optionKey, function(wgtOptKey, map){
									dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
								});
								
								//구분자
								dshSearchParams["callId"] = callId;
								
								/**** 조회 param 합치기 ****/
								dshSearchParams["baseGrp"] = "prjId";
								//dshSearchParams["reqUsrId"] = usrId;
								//티켓 분류 REQ00018 - 01 보안 정책, 02 이상징후, 03 외부
								dshSearchParams["reqClsType"] = "02";
								//로그 연결 여부 CMM00001 - 01 예, 02 아니오
								dshSearchParams["logLnkCd"] = "01";
								
								/**** 검색 조건 끝 ****/
								
								//AJAX 설정
								var ajaxObj = new $.osl.ajaxRequestAction(
										{"url":"/wgt/wgt1000/wgt1100/selectWgt1100WidgetReloadAjax.do", "async":"false"}
										,dshSearchParams);
								//AJAX 전송 성공 함수
								ajaxObj.setFnSuccess(function(data){
									//오류
									if(data.errorYn == "Y"){
										$.osl.alert(data.message,{type: 'error'});
										//모달 창 닫기
										$.osl.layerPopupClose();
									}
									//성공
									else{
										//totalCnt, acceptStayCnt, progressIngCnt, acceptRejectCnt, progressEndCnt, signRejectCnt, progressRejectCnt 존재
										var ticketAllCnt = data.ticketAllCnt;
										
										//전체 카운트(처리중, 완료)
										var ticketInProgressCnt = Number(ticketAllCnt["progressIngCnt"]) + Number(ticketAllCnt["progressEndCnt"]);
										//처리 완료 카운트
										var ticketEndProgressCnt = Number(ticketAllCnt["progressEndCnt"]);
										
										//비율 계산
										var ticketRatio = 0;
										if(ticketInProgressCnt != 0 && ticketEndProgressCnt != 0){
											ticketRatio = ((ticketEndProgressCnt/ticketInProgressCnt)*100).toFixed(1);
											if(ticketInProgressCnt == ticketEndProgressCnt){
												ticketRatio = 100;
											}
										}
										
										//처리율 넣기
										targetWidget.find(".osl-evt__progress-circle-bar-num").attr("style", "--value:"+ticketRatio+";");
										targetWidget.find(".osl-evt__progress-circle-bar-num--label").attr("style", "--value:"+ticketRatio+";");
										targetWidget.find(".osl-evt__progress-circle-bar-num--label").text(ticketRatio+"%");
										
										//종합 갯수 표출
										targetWidget.find(".osl-evt__ticket--all-count").text(ticketAllCnt["totalCnt"]);
										targetWidget.find(".osl-evt__ticket--stay-count").text(ticketAllCnt["acceptStayCnt"]);
										targetWidget.find(".osl-evt__ticket--progress-count").text(ticketAllCnt["progressIngCnt"]);
										targetWidget.find(".osl-evt__ticket--finish-count").text(ticketAllCnt["progressEndCnt"]);
										targetWidget.find(".osl-evt__ticket--stop-count").text(Number(ticketAllCnt["acceptRejectCnt"])+Number(ticketAllCnt["signRejectCnt"])+Number(ticketAllCnt["progressRejectCnt"]));
									}
								});
								
								return ajaxObj.send();
							},
							init : function(){
								//조회
								var ajaxObj = this.reload();
								
								ajaxObj.done(function(){
									//위젯 처리율 내 유형 클릭 시 팝업 표출
									targetWidget.off("click").on("click", ".osl-evt__ticket--ratio-btn", function(){
										/**** 검색 조건 ****/
										//대시보드 검색조건 공통
										var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
										
										//위젯의 설정 값 추가
										$.each(optionKey, function(wgtOptKey, map){
											dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
										});
										
										//구분자
										dshSearchParams["callId"] = callId;
										
										//REQ00008
										var reqProType = $(this).data("req-pro-type");
										
										//팝업 타이틀에 추가 및 검색 조건 추가
										var reqProTypeNm = "";
										if(reqProType == "-1"){
											reqProTypeNm = "전체";
											reqProType = null;
										}
										else if(reqProType == "01"){
											reqProTypeNm = "접수 대기";
										}
										else if(reqProType == "02"){
											reqProTypeNm = "처리중";
										}
										else if(reqProType == "04"){
											reqProTypeNm = "처리 완료";
										}
										else if(reqProType == "end"){
											reqProTypeNm = "종료";
											
											//reqProTypeList 만들어 전달
											//REQ00008 01 접수 요청, 02 처리중, 03 반려, 04 최종 완료, 05 결재 반려 종료, 06 중간 종료
											var reqProTypeList = ["03", "05", "06"];
											
											//종료 유형
											dshSearchParams["reqProTypeList"] = reqProTypeList;
										}
										
										/**** 조회 param 합치기 ****/
										dshSearchParams["baseGrp"] = "prjId";
										//dshSearchParams["reqUsrId"] = usrId;
										//REQ00008 01 접수대기 02 처리중 03 반려 04 완료 05 결재반려후 종료 06 중간 종료
										dshSearchParams["reqProType"] = reqProType;
										//티켓 분류 REQ00018 - 01 보안 정책, 02 이상징후, 03 외부
										dshSearchParams["reqClsType"] = "02";
										//로그 연결 여부 CMM00001 - 01 예, 02 아니오
										dshSearchParams["logLnkCd"] = "01";
										
										/**** 검색 조건 끝 ****/
										
										var dataParam = {
												// 데이터 조회 URL
												url : "/wgt/wgt1000/wgt1100/selectWgt1100GetReqListAjax.do",
												//조회 파라미터
												params : dshSearchParams,
												//데이터 테이블 & 팝업 옵션
												option : {
													showBtns : ["reqDetail"],
													submitBtnCd : false, // submit 버튼 표출 유무
												}
										};
										
										var data = {
												type : "list",
												reqType : "01", //티켓
												currentIdKey : callId,
												dataParam : JSON.stringify(dataParam)
										};
										
										var options = {
												idKey: callId,
												modalTitle : "["+reqProTypeNm+"] 보안 티켓 목록",
												closeConfirm: false,
												autoHeight: true,
												modalSize: "xl",
												callback:[{
													targetId : "cmm6206ModalCallbackBtn",
													actionFn : function(thisObj){
														//모든 위젯 초기화
														gridStack.fnRefresh();
													}
												}]
										};
										
										$.osl.layerPopupOpen('/cmm/cmm6000/cmm6200/selectCmm6206View.do',data,options);
									});
								});
							}
						}
					}
				},
			},
			//신호등
			"WGTREQ2000000008" : {
				size : ["2X1", "4X1"],
				"2X1": {
					//구분자
					callId : "ticketTraffic",
					//boolean default false
					fullType : false,
					addFullTypeClass : "",
					//class
					cardClass : "osl-widget-card--v1",
					cardBodyClass : '',
					//string Y, N, D default N, card-title에 wgtGrpNm과 동시 표출 유무
					//Y - 동시 표출, N - wgtGrpNm만 표출, D - label 만 표출
					addLabel: "Y",
					//text
					label : `신호등`,
					//class
					icon : `fas fa-traffic-light`,
					//html
					toolbar : ``,
					//html
					content : `
						<div class="d-table table-layout-fixed w-100 h-100">
							<div class="d-table-cell align-middle text-center rounded osl-area-hover cursor-pointer osl-evt__ticket--traffic-btn" data-req-traffic-type="yet">
								<div class="d-flex flex-column align-items-center justify-content-center">
									<div class="d-flex align-items-center justify-content-center w-80px h-80px rounded-circle bg-gray-500">
										<div class="point-label strong mt-auto mb-auto text-dark osl-evt__ticket--yet-count">
											999+
										</div>
									</div>
									<div class="point-label mt-4">
										<span class="" data-lang-cd="">
											미정
										</span>
									</div>
								</div>
							</div>
							<div class="d-table-cell align-middle text-center rounded osl-area-hover cursor-pointer osl-evt__ticket--traffic-btn" data-req-traffic-type="around">
								<div class="d-flex flex-column align-items-center justify-content-center">
									<div class="d-flex align-items-center justify-content-center w-80px h-80px rounded-circle bg-orange">
										<div class="point-label strong mt-auto mb-auto text-dark osl-evt__ticket--around-count">
											999+
										</div>
									</div>
									<div class="point-label mt-4">
										<span class="" data-lang-cd="">
											임박
										</span>
									</div>
								</div>
							</div>
							<div class="d-table-cell align-middle text-center rounded osl-area-hover cursor-pointer osl-evt__ticket--traffic-btn" data-req-traffic-type="over">
								<div class="d-flex flex-column align-items-center justify-content-center">
									<div class="d-flex align-items-center justify-content-center w-80px h-80px rounded-circle bg-danger">
										<div class="point-label strong mt-auto mb-auto text-dark osl-evt__ticket--over-count">
											999+
										</div>
									</div>
									<div class="point-label mt-4">
										<span class="" data-lang-cd="">
											초과
										</span>
									</div>
								</div>
							</div>
						</div>
					`,
					actionFn : function(){
						var widgetId = this.widgetId;
						var optionKey = this.optionKey;
						
						//대상 위젯
						var thisWidget = $(`.osl-evt__widget-item[gs-id="${widgetId}"]`);
						//위젯 설정 시 이벤트가 호출되면 안되기 때문에 실제 이벤트 지정될 영역
						var targetWidget = thisWidget.find(".osl-evt__widget-card .osl-evt__widget-card-body");
						
						//그리드스택
						var gridStackId = thisWidget.closest(".osl-evt__grid-stack-area").attr("id");
						var gridStack = widgetSettingGridStack[gridStackId];
						
						//위젯 세팅 시 정보 바로 보관해두기 위해서
						//현재 요청자
						//var usrId = $.osl.user.userInfo.usrId;
						
						//구분자
						var callId = this.callId;
						
						return {
							//새로고침 버튼 누르면 호출
							reload : function(){ 
								/**** 검색 조건 ****/
								//대시보드 검색조건 공통
								var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
								
								//위젯의 설정 값 추가
								$.each(optionKey, function(wgtOptKey, map){
									dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
								});
								
								//구분자
								dshSearchParams["callId"] = callId;
								
								
								/**** 조회 param 합치기 ****/
								dshSearchParams["baseGrp"] = "prjId";
								//dshSearchParams["reqUsrId"] = usrId;
								//티켓 분류 REQ00018 - 01 보안 정책, 02 이상징후, 03 외부
								dshSearchParams["reqClsType"] = "02";
								//로그 연결 여부 CMM00001 - 01 예, 02 아니오
								dshSearchParams["logLnkCd"] = "01";
								
								/**** 검색 조건 끝 ****/
								
								//AJAX 설정
								var ajaxObj = new $.osl.ajaxRequestAction(
										{"url":"/wgt/wgt1000/wgt1100/selectWgt1100WidgetReloadAjax.do", "async":"false"}
										,dshSearchParams);
								//AJAX 전송 성공 함수
								ajaxObj.setFnSuccess(function(data){
									//오류
									if(data.errorYn == "Y"){
										$.osl.alert(data.message,{type: 'error'});
										//모달 창 닫기
										$.osl.layerPopupClose();
									}
									//성공
									else{
										//totalCnt, reqFreeCnt, reqAroundCnt, reqOverCnt, reqFailCnt, reqSuccessCnt 존재
										var ticketTrafficLightCnt = data.ticketTrafficLightCnt;
										
										//미정 : 접수 후 처리중으로 넘어왔는데, 아무 작업도 안한 경우 업무 시작/종료 예정일이 모두 null
										var reqYetCnt = Number(ticketTrafficLightCnt["reqYetCnt"]);
										if(reqYetCnt > 999) {
											reqYetCnt = "999+";
										}
										/*
										//여유
										var reqFreeCnt = Number(ticketTrafficLightCnt["reqFreeCnt"]);
										if(reqFreeCnt > 999) {
											reqFreeCnt = "999+";
										}
										*/
										//임박
										var reqAroundCnt = Number(ticketTrafficLightCnt["reqAroundCnt"]);
										if(reqAroundCnt > 999) {
											reqAroundCnt = "999+";
										}
										//초과
										var reqOverCnt = Number(ticketTrafficLightCnt["reqOverCnt"]);
										if(reqOverCnt > 999) {
											reqOverCnt = "999+";
										}
										
										//종합 갯수 표출
										targetWidget.find(".osl-evt__ticket--yet-count").text(reqYetCnt);
										targetWidget.find(".osl-evt__ticket--around-count").text(reqAroundCnt);
										targetWidget.find(".osl-evt__ticket--over-count").text(reqOverCnt);
									}
								});
								
								return ajaxObj.send();
							},
							init : function(){
								//조회
								var ajaxObj = this.reload();
								
								ajaxObj.done(function(){
									//이벤트
									targetWidget.off("click").on("click", ".osl-evt__ticket--traffic-btn", function(){
										var trafficType = $(this).data("req-traffic-type");
										
										if($.osl.isNull(trafficType)){
											return;
										}
										//신호등 유형에 따라 팝업 호출
										else {
											
											//추후 언어팩으로 변경 ex) widget.traffic.free
											var trafficTypeNm = "";
											if(trafficType == "yet") {
												trafficTypeNm = "미정";
											}
											if(trafficType == "free") {
												trafficTypeNm = "여유";
											}
											else if(trafficType == "around") {
												trafficTypeNm = "임박";
											}
											else if(trafficType == "over") {
												trafficTypeNm = "초과";
											}
											else if(trafficType == "fail") {
												trafficTypeNm = "실패";
											}
											else if(trafficType == "success") {
												trafficTypeNm = "성공";
											}
											
											
											/**** 검색 조건 ****/
											//대시보드 검색조건 공통
											var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
											
											//위젯의 설정 값 추가
											$.each(optionKey, function(wgtOptKey, map){
												dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
											});
											
											//구분자
											dshSearchParams["callId"] = callId;
											
											/**** 조회 param 합치기 ****/
											dshSearchParams["baseGrp"] = "prjId";
											//dshSearchParams["reqUsrId"] = usrId;
											//티켓 분류 REQ00018 - 01 보안 정책, 02 이상징후, 03 외부
											dshSearchParams["reqClsType"] = "02";
											//로그 연결 여부 CMM00001 - 01 예, 02 아니오
											dshSearchParams["logLnkCd"] = "01";
											//신호등 구분
											dshSearchParams["trafficType"] = trafficType;
											
											/**** 검색 조건 끝 ****/
											
											var dataParam = {
													// 데이터 조회 URL
													url : "/wgt/wgt1000/wgt1100/selectWgt1100GetReqTrafficListAjax.do",
													//조회 파라미터
													params : dshSearchParams,
													//데이터 테이블 & 팝업 옵션
													option : {
														showBtns : ["reqDetail"],
														submitBtnCd : false, // submit 버튼 표출 유무
													}
											};
											
											var data = {
													type : "list",
													reqType : "01", //티켓
													currentIdKey : callId,
													dataParam : JSON.stringify(dataParam)
											};
											
											var options = {
													idKey: callId,
													modalTitle : "["+trafficTypeNm+"] 보안 티켓 목록",
													closeConfirm: false,
													autoHeight: true,
													modalSize: "xl",
													callback:[{
														targetId : "cmm6206ModalCallbackBtn",
														actionFn : function(thisObj){
															//모든 위젯 초기화
															gridStack.fnRefresh();
														}
													}]
											};
											
											$.osl.layerPopupOpen('/cmm/cmm6000/cmm6200/selectCmm6206View.do',data,options);
										}
									});
								});
							}
						}
					}
				},
				"4X1": {
					//구분자
					callId : "ticketTraffic",
					//boolean default false
					fullType : false,
					addFullTypeClass : "",
					//class
					cardClass : "osl-widget-card--v1",
					cardBodyClass : '',
					//string Y, N, D default N, card-title에 wgtGrpNm과 동시 표출 유무
					//Y - 동시 표출, N - wgtGrpNm만 표출, D - label 만 표출
					addLabel: "Y",
					//text
					label : `신호등`,
					//class
					icon : `fas fa-traffic-light`,
					//html
					toolbar : ``,
					//html
					content : `
						<div class="d-table table-layout-fixed w-100 h-100">
							<div class="d-table-cell align-middle text-center rounded osl-area-hover cursor-pointer osl-evt__ticket--traffic-btn" data-req-traffic-type="yet">
								<div class="d-flex flex-column align-items-center justify-content-center">
									<div class="d-flex align-items-center justify-content-center w-80px h-80px rounded-circle bg-gray-500">
										<div class="point-label strong mt-auto mb-auto text-dark osl-evt__ticket--yet-count">
											999+
										</div>
									</div>
									<div class="point-label mt-4">
										<span class="" data-lang-cd="">
											미정
										</span>
									</div>
								</div>
							</div>
							<div class="d-table-cell align-middle text-center rounded osl-area-hover cursor-pointer osl-evt__ticket--traffic-btn" data-req-traffic-type="around">
								<div class="d-flex flex-column align-items-center justify-content-center">
									<div class="d-flex align-items-center justify-content-center w-80px h-80px rounded-circle bg-orange">
										<div class="point-label strong mt-auto mb-auto text-dark osl-evt__ticket--around-count">
											999+
										</div>
									</div>
									<div class="point-label mt-4">
										<span class="" data-lang-cd="">
											임박
										</span>
									</div>
								</div>
							</div>
							<div class="d-table-cell align-middle text-center rounded osl-area-hover cursor-pointer osl-evt__ticket--traffic-btn" data-req-traffic-type="over">
								<div class="d-flex flex-column align-items-center justify-content-center">
									<div class="d-flex align-items-center justify-content-center w-80px h-80px rounded-circle bg-danger">
										<div class="point-label strong mt-auto mb-auto text-dark osl-evt__ticket--over-count">
											999+
										</div>
									</div>
									<div class="point-label mt-4">
										<span class="" data-lang-cd="">
											초과
										</span>
									</div>
								</div>
							</div>
							<div class="d-table-cell align-middle text-center rounded osl-area-hover cursor-pointer osl-evt__ticket--traffic-btn" data-req-traffic-type="fail">
								<div class="d-flex flex-column align-items-center justify-content-center">
									<div class="d-flex align-items-center justify-content-center w-80px h-80px rounded-circle bg-primary">
										<div class="point-label strong mt-auto mb-auto text-dark osl-evt__ticket--fail-count">
											999+
										</div>
									</div>
									<div class="point-label mt-4">
										<span class="" data-lang-cd="">
											실패
										</span>
									</div>
								</div>
							</div>
							<div class="d-table-cell align-middle text-center rounded osl-area-hover cursor-pointer osl-evt__ticket--traffic-btn" data-req-traffic-type="success">
								<div class="d-flex flex-column align-items-center justify-content-center">
									<div class="d-flex align-items-center justify-content-center w-80px h-80px rounded-circle bg-success">
										<div class="point-label strong mt-auto mb-auto text-dark osl-evt__ticket--success-count">
											999+
										</div>
									</div>
									<div class="point-label mt-4">
										<span class="" data-lang-cd="">
											성공
										</span>
									</div>
								</div>
							</div>
						</div>
					`,
					actionFn : function(){
						var widgetId = this.widgetId;
						var optionKey = this.optionKey;
						
						//대상 위젯
						var thisWidget = $(`.osl-evt__widget-item[gs-id="${widgetId}"]`);
						//위젯 설정 시 이벤트가 호출되면 안되기 때문에 실제 이벤트 지정될 영역
						var targetWidget = thisWidget.find(".osl-evt__widget-card .osl-evt__widget-card-body");
						
						//그리드스택
						var gridStackId = thisWidget.closest(".osl-evt__grid-stack-area").attr("id");
						var gridStack = widgetSettingGridStack[gridStackId];
						
						//위젯 세팅 시 정보 바로 보관해두기 위해서
						//현재 요청자
						//var usrId = $.osl.user.userInfo.usrId;
						
						//구분자
						var callId = this.callId;
						
						return {
							//새로고침 버튼 누르면 호출
							reload : function(){ 
								/**** 검색 조건 ****/
								//대시보드 검색조건 공통
								var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
								
								//위젯의 설정 값 추가
								$.each(optionKey, function(wgtOptKey, map){
									dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
								});
								
								//구분자
								dshSearchParams["callId"] = callId;
								
								
								/**** 조회 param 합치기 ****/
								dshSearchParams["baseGrp"] = "prjId";
								//dshSearchParams["reqUsrId"] = usrId;
								//티켓 분류 REQ00018 - 01 보안 정책, 02 이상징후, 03 외부
								dshSearchParams["reqClsType"] = "02";
								//로그 연결 여부 CMM00001 - 01 예, 02 아니오
								dshSearchParams["logLnkCd"] = "01";
								
								/**** 검색 조건 끝 ****/
								
								//AJAX 설정
								var ajaxObj = new $.osl.ajaxRequestAction(
										{"url":"/wgt/wgt1000/wgt1100/selectWgt1100WidgetReloadAjax.do", "async":"false"}
										,dshSearchParams);
								//AJAX 전송 성공 함수
								ajaxObj.setFnSuccess(function(data){
									//오류
									if(data.errorYn == "Y"){
										$.osl.alert(data.message,{type: 'error'});
										//모달 창 닫기
										$.osl.layerPopupClose();
									}
									//성공
									else{
										//totalCnt, reqFreeCnt, reqAroundCnt, reqOverCnt, reqFailCnt, reqSuccessCnt 존재
										var ticketTrafficLightCnt = data.ticketTrafficLightCnt;
										
										//미정 : 접수 후 처리중으로 넘어왔는데, 아무 작업도 안한 경우 업무 시작/종료 예정일이 모두 null
										var reqYetCnt = Number(ticketTrafficLightCnt["reqYetCnt"]);
										if(reqYetCnt > 999) {
											reqYetCnt = "999+";
										}
										/*
										//여유
										var reqFreeCnt = Number(ticketTrafficLightCnt["reqFreeCnt"]);
										if(reqFreeCnt > 999) {
											reqFreeCnt = "999+";
										}
										*/
										//임박
										var reqAroundCnt = Number(ticketTrafficLightCnt["reqAroundCnt"]);
										if(reqAroundCnt > 999) {
											reqAroundCnt = "999+";
										}
										//초과
										var reqOverCnt = Number(ticketTrafficLightCnt["reqOverCnt"]);
										if(reqOverCnt > 999) {
											reqOverCnt = "999+";
										}
										//실패
										var reqFailCnt = Number(ticketTrafficLightCnt["reqFailCnt"]);
										if(reqFailCnt > 999) {
											reqFailCnt = "999+";
										}
										//성공
										var reqSuccessCnt = Number(ticketTrafficLightCnt["reqSuccessCnt"]);
										if(reqSuccessCnt > 999) {
											reqSuccessCnt = "999+";
										}
										
										//종합 갯수 표출
										targetWidget.find(".osl-evt__ticket--yet-count").text(reqYetCnt);
										//targetWidget.find(".osl-evt__ticket--free-count").text(reqFreeCnt);
										targetWidget.find(".osl-evt__ticket--around-count").text(reqAroundCnt);
										targetWidget.find(".osl-evt__ticket--over-count").text(reqOverCnt);
										targetWidget.find(".osl-evt__ticket--fail-count").text(reqFailCnt);
										targetWidget.find(".osl-evt__ticket--success-count").text(reqSuccessCnt);
									}
								});
								
								return ajaxObj.send();
							},
							init : function(){
								//조회
								var ajaxObj = this.reload();
								
								ajaxObj.done(function(){
									//이벤트
									targetWidget.off("click").on("click", ".osl-evt__ticket--traffic-btn", function(){
										var trafficType = $(this).data("req-traffic-type");
										
										if($.osl.isNull(trafficType)){
											return;
										}
										//신호등 유형에 따라 팝업 호출
										else {
											
											//추후 언어팩으로 변경 ex) widget.traffic.free
											var trafficTypeNm = "";
											if(trafficType == "yet") {
												trafficTypeNm = "미정";
											}
											if(trafficType == "free") {
												trafficTypeNm = "여유";
											}
											else if(trafficType == "around") {
												trafficTypeNm = "임박";
											}
											else if(trafficType == "over") {
												trafficTypeNm = "초과";
											}
											else if(trafficType == "fail") {
												trafficTypeNm = "실패";
											}
											else if(trafficType == "success") {
												trafficTypeNm = "성공";
											}
											
											
											/**** 검색 조건 ****/
											//대시보드 검색조건 공통
											var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
											
											//위젯의 설정 값 추가
											$.each(optionKey, function(wgtOptKey, map){
												dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
											});
											
											//구분자
											dshSearchParams["callId"] = callId;
											
											/**** 조회 param 합치기 ****/
											dshSearchParams["baseGrp"] = "prjId";
											//dshSearchParams["reqUsrId"] = usrId;
											//티켓 분류 REQ00018 - 01 보안 정책, 02 이상징후, 03 외부
											dshSearchParams["reqClsType"] = "02";
											//로그 연결 여부 CMM00001 - 01 예, 02 아니오
											dshSearchParams["logLnkCd"] = "01";
											//신호등 구분
											dshSearchParams["trafficType"] = trafficType;
											
											/**** 검색 조건 끝 ****/
											
											var dataParam = {
													// 데이터 조회 URL
													url : "/wgt/wgt1000/wgt1100/selectWgt1100GetReqTrafficListAjax.do",
													//조회 파라미터
													params : dshSearchParams,
													//데이터 테이블 & 팝업 옵션
													option : {
														showBtns : ["reqDetail"],
														submitBtnCd : false, // submit 버튼 표출 유무
													}
											};
											
											var data = {
													type : "list",
													reqType : "01", //티켓
													currentIdKey : callId,
													dataParam : JSON.stringify(dataParam)
											};
											
											var options = {
													idKey: callId,
													modalTitle : "["+trafficTypeNm+"] 보안 티켓 목록",
													closeConfirm: false,
													autoHeight: true,
													modalSize: "xl",
													callback:[{
														targetId : "cmm6206ModalCallbackBtn",
														actionFn : function(thisObj){
															//모든 위젯 초기화
															gridStack.fnRefresh();
														}
													}]
											};
											
											$.osl.layerPopupOpen('/cmm/cmm6000/cmm6200/selectCmm6206View.do',data,options);
										}
									});
								});
							}
						}
					}
				}
			},
			//결재 요청 및 대기
			"WGTREQ2000000009" : {
				size: ["4X1"],
				"4X1" : {
					//구분자
					callId : "ticketSign",
					//boolean default false
					fullType : false,
					addFullTypeClass : "",
					//class
					cardClass : "osl-widget-card--v1",
					cardBodyClass : '',
					//string Y, N, D default N, card-title에 wgtGrpNm과 동시 표출 유무
					//Y - 동시 표출, N - wgtGrpNm만 표출, D - label 만 표출
					addLabel: "N",
					//text
					label : `결재`,
					//class
					icon : `fas fa-signature`,
					//html
					toolbar : ``,
					//html
					content : `
						<div class="d-table table-layout-fixed w-100 h-100">
							<div class="d-table-row">
								<div class="d-table-cell align-middle text-center rounded osl-area-hover cursor-pointer osl-evt__ticket--sign-btn" data-req-sign-type="ing">
									<div class="point-title weak osl-evt__ticket--sign-ing-count">
										999+
									</div>
									<div class="">
										<span class="point-label weak" data-lang-cd="">
											결재 중
										</span>
									</div>
								</div>
								<div class="d-table-cell align-middle text-center rounded osl-area-hover cursor-pointer osl-evt__ticket--sign-btn" data-req-sign-type="current">
									<div class="point-title weak osl-evt__ticket--sign-current-count">
										999+
									</div>
									<div class="">
										<span class="point-label weak" data-lang-cd="">
											대기
										</span>
									</div>
								</div>
							</div>
							<div class="d-table-row">
								<div class="d-table-cell align-middle text-center rounded osl-area-hover cursor-pointer osl-evt__ticket--sign-btn" data-req-sign-type="success">
									<div class="point-title weak osl-evt__ticket--sign-success-count">
										999+
									</div>
									<div class="">
										<span class="point-label weak" data-lang-cd="">
											승인
										</span>
									</div>
								</div>
								<div class="d-table-cell align-middle text-center rounded osl-area-hover cursor-pointer osl-evt__ticket--sign-btn" data-req-sign-type="reject">
									<div class="point-title weak osl-evt__ticket--sign-reject-count">
										999+
									</div>
									<div class="">
										<span class="point-label weak" data-lang-cd="">
											반려
										</span>
									</div>
								</div>
							</div>
						</div>
					`,
					actionFn : function(){
						var widgetId = this.widgetId;
						var optionKey = this.optionKey;
						
						//대상 위젯
						var thisWidget = $(`.osl-evt__widget-item[gs-id="${widgetId}"]`);
						//위젯 설정 시 이벤트가 호출되면 안되기 때문에 실제 이벤트 지정될 영역
						var targetWidget = thisWidget.find(".osl-evt__widget-card .osl-evt__widget-card-body");
						
						//그리드스택
						var gridStackId = thisWidget.closest(".osl-evt__grid-stack-area").attr("id");
						var gridStack = widgetSettingGridStack[gridStackId];
						
						//위젯 세팅 시 정보 바로 보관해두기 위해서
						//현재 요청자
						//var usrId = $.osl.user.userInfo.usrId;
						
						//구분자
						var callId = this.callId;
						
						return {
							//새로고침 버튼 누르면 호출
							reload : function(){ 
								/**** 검색 조건 ****/
								//대시보드 검색조건 공통
								var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
								
								//위젯의 설정 값 추가
								$.each(optionKey, function(wgtOptKey, map){
									dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
								});
								
								//구분자
								dshSearchParams["callId"] = callId;
								
								/**** 조회 param 합치기 ****/
								dshSearchParams["baseGrp"] = "prjId";
								//dshSearchParams["reqUsrId"] = usrId;
								//티켓 분류 REQ00018 - 01 보안 정책, 02 이상징후, 03 외부
								dshSearchParams["reqClsType"] = "02";
								//로그 연결 여부 CMM00001 - 01 예, 02 아니오
								dshSearchParams["logLnkCd"] = "01";
								
								/**** 검색 조건 끝 ****/
								
								//AJAX 설정
								var ajaxObj = new $.osl.ajaxRequestAction(
										{"url":"/wgt/wgt1000/wgt1100/selectWgt1100WidgetReloadAjax.do", "async":"false"}
										,dshSearchParams);
								//AJAX 전송 성공 함수
								ajaxObj.setFnSuccess(function(data){
									//오류
									if(data.errorYn == "Y"){
										$.osl.alert(data.message,{type: 'error'});
										//모달 창 닫기
										$.osl.layerPopupClose();
									}
									//성공
									else{
										//내가 기안자인 것 중 현재 결재 중인 것, 현재 결재 차례가 나인 것, 내가 기안자인 것 중 결재 승인된 것, 내가 기안자인 것 중 결재 반려된 것
										//signIngCnt, currentSignCnt, successSignCnt, rejectSignCnt 존재
										var ticketDraftingCnt = data.ticketDraftingCnt;
										
										var ticketSignIngCnt = ticketDraftingCnt["signIngCnt"];
										if(Number(ticketSignIngCnt) > 999){
											ticketSignIngCnt = "999+";
										}
										var ticketCurrentSignCnt = ticketDraftingCnt["currentSignCnt"];
										if(Number(ticketCurrentSignCnt) > 999){
											ticketCurrentSignCnt = "999+";
										}
										var ticketSuccessSignCnt = ticketDraftingCnt["successSignCnt"];
										if(Number(ticketSuccessSignCnt) > 999){
											ticketSuccessSignCnt = "999+";
										}
										var ticketRejectSignCnt = ticketDraftingCnt["rejectSignCnt"];
										if(Number(ticketRejectSignCnt) > 999){
											ticketRejectSignCnt = "999+";
										}
										
										//종합 갯수 표출
										targetWidget.find(".osl-evt__ticket--sign-ing-count").text(ticketSignIngCnt);
										targetWidget.find(".osl-evt__ticket--sign-current-count").text(ticketCurrentSignCnt);
										targetWidget.find(".osl-evt__ticket--sign-success-count").text(ticketSuccessSignCnt);
										targetWidget.find(".osl-evt__ticket--sign-reject-count").text(ticketRejectSignCnt);
									}
								});
								
								return ajaxObj.send();
							},
							init : function(){
								//조회
								var ajaxObj = this.reload();
								
								ajaxObj.done(function(){
									//위젯 자체 클릭 시 결재 팝업 표출
									targetWidget.off("click").on("click", ".osl-evt__ticket--sign-btn", function(){
										/**** 검색 조건 ****/
										//대시보드 검색조건 공통
										var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
										
										//위젯의 설정 값 추가
										$.each(optionKey, function(wgtOptKey, map){
											dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
										});
										
										//구분자
										dshSearchParams["callId"] = callId;
										
										/**** 조회 param 합치기 ****/
										dshSearchParams["baseGrp"] = "prjId";
										//dshSearchParams["reqUsrId"] = usrId;
										//티켓 분류 REQ00018 - 01 보안 정책, 02 이상징후, 03 외부
										dshSearchParams["reqClsType"] = "02";
										//로그 연결 여부 CMM00001 - 01 예, 02 아니오
										dshSearchParams["logLnkCd"] = "01";
										
										//선택 값
										var signType = $(this).data("req-sign-type");
										var signTypeNm = "";
										if(signType == "ing"){
											signTypeNm = "결재 중";
										}
										else if(signType == "current"){
											signTypeNm = "결재 대기";
										}
										else if(signType == "success"){
											signTypeNm = "결재 승인";
										}
										else if(signType == "reject"){
											signTypeNm = "결재 반려";
										}
										
										dshSearchParams["signType"] = signType;
										
										/**** 검색 조건 끝 ****/
										
										var dataParam = {
												// 데이터 조회 URL
												url : "/wgt/wgt1000/wgt1100/selectWgt1100GetReqSignListAjax.do",
												//조회 파라미터
												params : dshSearchParams,
												//데이터 테이블 & 팝업 옵션
												option : {
													showBtns : ["reqDetail"],
													submitBtnCd : false, // submit 버튼 표출 유무
												}
										};
										
										var data = {
												type : "list",
												reqType : "01", //티켓
												currentIdKey : callId,
												dataParam : JSON.stringify(dataParam)
										};
										
										var options = {
												idKey: callId,
												modalTitle : "["+signTypeNm+"] 보안 티켓 목록",
												closeConfirm: false,
												autoHeight: true,
												modalSize: "xl",
												callback:[{
													targetId : "cmm6206ModalCallbackBtn",
													actionFn : function(thisObj){
														//모든 위젯 초기화
														gridStack.fnRefresh();
													}
												}]
										};
										
										$.osl.layerPopupOpen('/cmm/cmm6000/cmm6200/selectCmm6206View.do',data,options);
									});
								});
							}
						}
					}
				}
			},
			//위험도별 이상징후 현황
			"WGTREQ2000000010" : {
				size: ["4X1"],
				"4X1" : {
					//구분자
					callId : "ticketThreatScore",
					//boolean default false
					fullType : false,
					addFullTypeClass : "",
					//class
					cardClass : 'osl-widget-card--v1',
					cardBodyClass : '',
					//string Y, N, D default N, card-title에 wgtGrpNm과 동시 표출 유무
					//Y - 동시 표출, N - wgtGrpNm만 표출, D - label 만 표출
					addLabel: "N",
					//text
					label : `위험도별 이상징후 현황`,
					//class
					icon : `fas fa-lightbulb`,
					//html
					toolbar : ``,
					//html
					content : `
						<div class="d-table table-layout-fixed w-100 h-100">
							<div class="d-table-row">
								<div class="d-table-cell">
									<div class="point-label weak mt-4 mx-4 text-center">
										<span data-lang-cd="">현재 이상징후 지수</span>
									</div>
									<div class="d-flex align-items-center justify-content-center m-4">
										<svg class="w-85px osl-evt__ticket-event-siren--img osl-svg-fill osl-svg-fill-primary" viewBox="0 0 113 105" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" version="1.1">
											<path class="opacity-25" d="m19.61,58.27c0,-18.58 16.73,-33.62 37.37,-33.62c20.65,0 37.37,15.05 37.37,33.62l-0.08,29.63l-74.51,-0.15l-0.15,-29.48z"/>
											<path d="m19.25,90.57c24.75,0 49.5,0 75,0c0,3.3 0,6.6 0,10c-24.75,0 -49.5,0 -75,0c0,-3.3 0,-6.6 0,-10z" />
											<path d="m27.1,61.72c0,-16.38 13.26,-29.64 29.62,-29.64c16.37,0 29.62,13.27 29.62,29.64l-0.06,26.12l-59.06,-0.13l-0.12,-25.98z" />
											<path class="osl-svg-fill-inverse" d="m53.73,40.29c0.3,5.24 8.75,2.5 15.25,9.75c6.5,7.25 3.3,7.3 7.38,11.13c4.07,3.82 10,-5.38 -1.25,-16.38c-11.25,-11 -21.67,-9.74 -21.38,-4.5z" />
											<rect height="3.25" transform="matrix(1 0 0 1 0 0) matrix(0.897449 0.441119 -0.441119 0.897449 19.2399 -3.37319)" width="22.25" x="5.07" y="40.08"/>
											<rect height="3.25" transform="matrix(1 0 0 1 0 0) matrix(0.691224 0.72264 -0.72264 0.691224 26.7663 -14.0059)" width="22.25" x="19.37" y="22.66"/>
											<rect height="3.25" transform="matrix(6.12323e-17 1 -1 6.12323e-17 70.5907 -36.9543)" width="22.25" x="42.65" y="11.83"/>
											<rect height="3.25" transform="matrix(1 0 0 1 0 0) rotate(-7.10465 84.7878 24.6676) matrix(-0.733009 0.680218 -0.680218 -0.733009 49.9475 -6.73999)" width="22.25" x="-15.3" y="-48.35"/>
											<rect height="3.25" transform="rotate(2.23887 99.5225 42.0261) matrix(-0.867218 0.497929 -0.497929 -0.867218 201.362 27.4394)" width="22.25" x="84.46" y="36.43"/>
										</svg>
									</div>
									<div class="mx-4">
										<div class="point-text mb-2">
											<span class="text-light" data-lang-cd="">기존 날짜 시각</span>
										</div>
										<div class="point-text weak text-light osl-evt__ticket-event-siren--date">YYYY-MM-DD HH:mm:ss</div>
									</div>
								</div>
								<div class="d-table-cell align-middle">
									<div class="d-flex flex-column justify-content-around w-100 h-100 py-4 point-label weak position-relative">
										<div class="d-flex flex-row flex-nowrap flex-stack py-1 px-2 mx-4 rounded osl-area-hover cursor-pointer osl-evt__ticket-event-siren__type-btn" data-evt-siren-type="normal">
											<div class="">
												<i class="fas fa-lightbulb text-primary osl-me-4 osl-area-not-hover"></i>
												<span data-lang-cd="">정상</span>
											</div>
											<div class="osl-evt__ticket-event-siren__type--normal-count">999+</div>
										</div>
										<div class="d-flex flex-row flex-nowrap flex-stack py-1 px-2 mx-4 rounded osl-area-hover cursor-pointer osl-evt__ticket-event-siren__type-btn" data-evt-siren-type="check">
											<div class="">
												<i class="fas fa-lightbulb text-success osl-me-4 osl-area-not-hover"></i>
												<span data-lang-cd="">관심</span>
											</div>
											<div class="osl-evt__ticket-event-siren__type--check-count">999+</div>
										</div>
										<div class="d-flex flex-row flex-nowrap flex-stack py-1 px-2 mx-4 rounded osl-area-hover cursor-pointer osl-evt__ticket-event-siren__type-btn" data-evt-siren-type="care">
											<div class="">
												<i class="fas fa-lightbulb text-warning osl-me-4 osl-area-not-hover"></i>
												<span data-lang-cd="">주의</span>
											</div>
											<div class="osl-evt__ticket-event-siren__type--care-count">999+</div>
										</div>
										<div class="d-flex flex-row flex-nowrap flex-stack py-1 px-2 mx-4 rounded osl-area-hover cursor-pointer osl-evt__ticket-event-siren__type-btn" data-evt-siren-type="boundary">
											<div class="">
												<i class="fas fa-lightbulb text-orange osl-me-4 osl-area-not-hover"></i>
												<span data-lang-cd="">경계</span>
											</div>
											<div class="osl-evt__ticket-event-siren__type--boundary-count">999+</div>
										</div>
										<div class="d-flex flex-row flex-nowrap flex-stack py-1 px-2 mx-4 rounded osl-area-hover cursor-pointer osl-evt__ticket-event-siren__type-btn" data-evt-siren-type="danger">
											<div class="">
												<i class="fas fa-lightbulb text-danger osl-me-4 osl-area-not-hover"></i>
												<span data-lang-cd="">심각</span>
											</div>
											<div class="osl-evt__ticket-event-siren__type--danger-count">999+</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					`,
					actionFn : function(){
						var widgetId = this.widgetId;
						var optionKey = this.optionKey;
						
						//대상 위젯
						var thisWidget = $(`.osl-evt__widget-item[gs-id="${widgetId}"]`);
						//위젯 설정 시 이벤트가 호출되면 안되기 때문에 실제 이벤트 지정될 영역
						var targetWidget = thisWidget.find(".osl-evt__widget-card .osl-evt__widget-card-body");
						
						//그리드스택
						var gridStackId = thisWidget.closest(".osl-evt__grid-stack-area").attr("id");
						var gridStack = widgetSettingGridStack[gridStackId];
						
						//위젯 세팅 시 정보 바로 보관해두기 위해서
						//현재 요청자
						//var usrId = $.osl.user.userInfo.usrId;
						
						//구분자
						var callId = this.callId;
						
						return {
							//새로고침 버튼 누르면 호출
							reload : function(){
								/**** 검색 조건 ****/
								//대시보드 검색조건 공통
								var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
								
								//위젯의 설정 값 추가
								$.each(optionKey, function(wgtOptKey, map){
									dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
								});
								
								//구분자
								dshSearchParams["callId"] = callId;
								
								/**** 조회 param 합치기 ****/
								dshSearchParams["baseGrp"] = "prjId";
								//dshSearchParams["reqUsrId"] = usrId;
								//티켓 분류 REQ00018 - 01 보안 정책, 02 이상징후, 03 외부
								dshSearchParams["reqClsType"] = "02";
								//연결되지 않은 로그도 체크하기 위해 주석
								/*
								//로그 연결 여부 CMM00001 - 01 예, 02 아니오
								dshSearchParams["logLnkCd"] = "01";
								*/
								
								/**** 검색 조건 끝 ****/
								
								//AJAX 설정
								var ajaxObj = new $.osl.ajaxRequestAction(
										{"url":"/wgt/wgt1000/wgt1100/selectWgt1100WidgetReloadAjax.do", "async":"false"}
										,dshSearchParams);
								//AJAX 전송 성공 함수
								ajaxObj.setFnSuccess(function(data){
									//오류
									if(data.errorYn == "Y"){
										$.osl.alert(data.message,{type: 'error'});
										//모달 창 닫기
										$.osl.layerPopupClose();
									}
									//성공
									else{
										//normalCnt, checkCnt, careCnt, boundaryCnt, dangerCnt 존재
										var ticketThreatScoreCnt = data.ticketThreatScoreCnt;
										
										//카운트
										var normalCnt = ticketThreatScoreCnt["normalCnt"];
										if(Number(normalCnt) > 999){
											normalCnt = "999+";
										}else if($.osl.isNull(normalCnt)){
											normalCnt = 0;
										}
										var checkCnt = ticketThreatScoreCnt["checkCnt"];
										if(Number(checkCnt) > 999){
											checkCnt = "999+";
										}
										else if($.osl.isNull(checkCnt)){
											checkCnt = 0;
										}
										var careCnt = ticketThreatScoreCnt["careCnt"];
										if(Number(careCnt) > 999){
											careCnt = "999+";
										}
										else if($.osl.isNull(careCnt)){
											careCnt = 0;
										}
										var boundaryCnt = ticketThreatScoreCnt["boundaryCnt"];
										if(Number(boundaryCnt) > 999){
											boundaryCnt = "999+";
										}
										else if($.osl.isNull(boundaryCnt)){
											boundaryCnt = 0;
										}
										var dangerCnt = ticketThreatScoreCnt["dangerCnt"];
										if(Number(dangerCnt) > 999){
											dangerCnt = "999+";
										}
										else if($.osl.isNull(dangerCnt)){
											dangerCnt = 0;
										}
										
										//단 한건이라도 존재시 (심각 > 경계 > 주의 > 관심 > 정상) 표출 타입
										var sirenClass = "";
										if(ticketThreatScoreCnt["dangerCnt"] > 0) {
											sirenClass = "danger";
										}
										else if(ticketThreatScoreCnt["boundaryCnt"] > 0) {
											sirenClass = "orange";
										}
										else if(ticketThreatScoreCnt["careCnt"] > 0) {
											sirenClass = "warning";
										}
										else if(ticketThreatScoreCnt["checkCnt"] > 0) {
											sirenClass = "success";
										}
										else {
											sirenClass = "primary";
										}
										
										//갯수 표출
										targetWidget.find(".osl-evt__ticket-event-siren__type--normal-count").text(normalCnt);
										targetWidget.find(".osl-evt__ticket-event-siren__type--check-count").text(checkCnt);
										targetWidget.find(".osl-evt__ticket-event-siren__type--care-count").text(careCnt);
										targetWidget.find(".osl-evt__ticket-event-siren__type--boundary-count").text(boundaryCnt);
										targetWidget.find(".osl-evt__ticket-event-siren__type--danger-count").text(dangerCnt);
										
										//클래스 넣기
										targetWidget.find(".osl-evt__ticket-event-siren--img").removeClass("osl-svg-fill-primary osl-svg-fill-success osl-svg-fill-warning osl-svg-fill-orange osl-svg-fill-danger").addClass("osl-svg-fill-"+sirenClass);
									
										//기준 시간 넣기
										targetWidget.find(".osl-evt__ticket-event-siren--date").text(ticketThreatScoreCnt["currentDtm"]);
									}
								});
								
								return ajaxObj.send();
							},
							init : function(){
								//조회
								var ajaxObj = this.reload();
								
								//이벤트
								ajaxObj.done(function(){
									targetWidget.off("click").on("click", ".osl-evt__ticket-event-siren__type-btn", function(){
										/**** 검색 조건 ****/
										//대시보드 검색조건 공통
										var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
										
										//위젯의 설정 값 추가
										$.each(optionKey, function(wgtOptKey, map){
											dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
										});
										
										//구분자
										dshSearchParams["callId"] = callId;
										
										/**** 조회 param 합치기 ****/
										dshSearchParams["baseGrp"] = "prjId";
										//dshSearchParams["reqUsrId"] = usrId;
										//티켓 분류 REQ00018 - 01 보안 정책, 02 이상징후, 03 외부
										dshSearchParams["reqClsType"] = "02";
										//연결되지 않은 로그도 체크하기 위해 주석
										/*
										//로그 연결 여부 CMM00001 - 01 예, 02 아니오
										dshSearchParams["logLnkCd"] = "01";
										*/
										
										//지수 유형
										var sirenType = $(this).data("evt-siren-type");
										var sirenNm = "";
										if("normal" == sirenType) {
											sirenNm = "정상";
										}
										else if("check" == sirenType) {
											sirenNm = "관심";
										}
										else if("care" == sirenType) {
											sirenNm = "주의";
										}
										else if("boundary" == sirenType) {
											sirenNm = "경계";
										}
										else if("심각" == sirenType) {
											sirenNm = "danger";
										}
										
										dshSearchParams["sirenType"] = sirenType;
										
										/**** 검색 조건 끝 ****/
										
										var dataParam = {
												// 데이터 조회 URL
												url : "/wgt/wgt1000/wgt1100/selectWgt1100GetReqEvtLogByThreatScoreListAjax.do",
												//조회 파라미터
												params : dshSearchParams,
												//데이터 테이블 & 팝업 옵션
												option : {
													showBtns : ["logDetail"],
													submitBtnCd : false, // submit 버튼 표출 유무
												}
										};
										
										var data = {
												type : "list",
												reqType : "05", //로그
												currentIdKey : callId,
												dataParam : JSON.stringify(dataParam)
										};
										
										var options = {
												idKey: callId,
												modalTitle : "["+sirenNm+"] 로그 목록",
												closeConfirm: false,
												autoHeight: true,
												modalSize: "xl",
												callback:[{
													targetId : "cmm6206ModalCallbackBtn",
													actionFn : function(thisObj){
														//모든 위젯 초기화
														gridStack.fnRefresh();
													}
												}]
										};
										
										$.osl.layerPopupOpen('/cmm/cmm6000/cmm6200/selectCmm6206View.do',data,options);
									});
								});
							}
						}
					}
				},
			},
			//서버 별 - 키워드별 이상징후 현황
			"WGTREQ2000000011" : {
				size: ["4X1"],
				"4X1" : {
					//구분자
					callId : "ticketEvtKeyword",
					//boolean default false
					fullType : false,
					addFullTypeClass : "",
					//class
					cardClass : 'osl-widget-card--v1',
					cardBodyClass : '',
					//string Y, N, D default N, card-title에 wgtGrpNm과 동시 표출 유무
					//Y - 동시 표출, N - wgtGrpNm만 표출, D - label 만 표출
					addLabel: "Y",
					//text
					label : `키워드별 이상징후 현황`,
					//class
					icon : `fas fa-spell-check`,
					//html
					toolbar : ``,
					//html
					content : `
						<div class="d-table table-layout-fixed w-100 h-100 py-4">
							<div class="d-table-cell scroll-y w-50 h-160px" id="%widgetId%ServerTopDiv" data-kt-scroll="true" data-kt-scroll-height="{default:'160px'}">
								<div class="d-flex flex-column point-label weak gap-2 h-80px osl-evt__server-list-div">
									<div class="d-flex flex-row flex-nowrap align-items-center py-1 px-2 ms-4">
										<i class="fas fa-server osl-me-4"></i>
										<span data-lang-cd="">Server 목록 표출</span>
									</div>
								</div>
							</div>
							<div class="d-table-cell scroll-y w-50 h-160px" id="%widgetId%KeywordTopDiv" data-kt-scroll="true" data-kt-scroll-height="{default:'160px'}">
								<div class="d-flex flex-column point-label weak gap-2 h-80px pe-1 osl-evt__keyword-list-div">
									<div class="d-flex flex-row flex-nowrap flex-stack py-1 px-2">
										<div class="">
											<i class="fas fa-key osl-me-4"></i>
											<span data-lang-cd="">선택 Server의 키워드 목록 표출</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					`,
					actionFn : function(){
						var widgetId = this.widgetId;
						var optionKey = this.optionKey;
						
						//대상 위젯
						var thisWidget = $(`.osl-evt__widget-item[gs-id="${widgetId}"]`);
						//위젯 설정 시 이벤트가 호출되면 안되기 때문에 실제 이벤트 지정될 영역
						var targetWidget = thisWidget.find(".osl-evt__widget-card .osl-evt__widget-card-body");
						
						//그리드스택
						var gridStackId = thisWidget.closest(".osl-evt__grid-stack-area").attr("id");
						var gridStack = widgetSettingGridStack[gridStackId];
						
						//위젯 세팅 시 정보 바로 보관해두기 위해서
						//현재 요청자
						//var usrId = $.osl.user.userInfo.usrId;
						
						//구분자
						var callId = this.callId;
						
						return {
							//새로고침 버튼 누르면 호출
							reload : function(){
								/**** 검색 조건 ****/
								//대시보드 검색조건 공통
								var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
								
								//위젯의 설정 값 추가
								$.each(optionKey, function(wgtOptKey, map){
									dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
								});
								
								//구분자
								dshSearchParams["callId"] = callId;
								
								/**** 조회 param 합치기 ****/
								dshSearchParams["baseGrp"] = "prjId";
								//dshSearchParams["reqUsrId"] = usrId;
								//티켓 분류 REQ00018 - 01 보안 정책, 02 이상징후, 03 외부
								dshSearchParams["reqClsType"] = "02";
								//연결되지 않은 로그도 체크하기 위해 주석
								/*
								//로그 연결 여부 CMM00001 - 01 예, 02 아니오
								dshSearchParams["logLnkCd"] = "01";
								*/
								
								/**** 검색 조건 끝 ****/
								
								//AJAX 설정
								var ajaxObj = new $.osl.ajaxRequestAction(
										{"url":"/wgt/wgt1000/wgt1100/selectWgt1100WidgetReloadAjax.do", "async":"false"}
										,dshSearchParams);
								//AJAX 전송 성공 함수
								ajaxObj.setFnSuccess(function(data){
									//오류
									if(data.errorYn == "Y"){
										$.osl.alert(data.message,{type: 'error'});
										//모달 창 닫기
										$.osl.layerPopupClose();
									}
									//성공
									else{
										//1. 등록된 모든 서버 목록
										var sevList = data.ticketEvtSevList;
										var sevDivElem = targetWidget.find(".osl-evt__server-list-div");
										sevDivElem.empty();
										
										//첫번째 서버 아이디
										var firstSevId = "";
										
										if(sevList.length > 0) {
											//서버 목록 그리기
											$.each(sevList, function(idx, sevInfo){
												//첫번째 서버 선택 효과 및 서버 아이디 보관
												var selected = "";
												if(idx == 0){
													selected = "active";
													firstSevId = sevInfo["sevId"];
												}
												
												sevDivElem.append(`
													<div class="d-flex flex-row flex-nowrap align-items-center py-1 px-2 ms-4 rounded osl-area-hover cursor-pointer osl-evt__ticket-event-server__select-btn ${selected}" data-sev-id="${sevInfo["sevId"]}">
														<div class="d-flex">
															<i class="fas fa-server osl-me-4"></i>
														</div>
														<div class="text-break text-truncate osl-word-break--keep-all">${sevInfo["sevNm"]}</div>
													</div>
												`);
												
											});
										}
										else{
											sevDivElem.append(`
												<div class="osl-mt-90 p-2 text-center">
													<img class="text-dark" src="/media/osl/no_data_img2.png" />
												</div>
											`);
										}
										
										//2. 조회된 순위별 키워드 목록
										var keywordList = data.ticketEvtKeywordList;
										var keyDivElem = targetWidget.find(".osl-evt__keyword-list-div");
										keyDivElem.empty();
										
										if(keywordList.length > 0) {
											//키워드 목록 그리기
											$.each(keywordList, function(idx, keywordInfo){
												//선택된 서버 아이디가 동일하면 보이고, 아니면 숨기기
												var hide = "";
												if(firstSevId != keywordInfo["sevId"]){
													hide = "d-none";
												}
												//카운트
												var keywordCnt = keywordInfo["cnt"];
												if(Number(keywordCnt) > 999){
													keywordCnt = "999+";
												}
												
												keyDivElem.append(`
													<div class="d-flex flex-row flex-nowrap flex-stack py-1 px-2 rounded osl-area-hover cursor-pointer osl-evt__ticket-event-server__keyword-btn ${hide}" data-sev-id="${keywordInfo["sevId"]}" data-map-id="${keywordInfo["mapId"]}">
														<div class="d-flex align-items-center">
															<i class="fas fa-key osl-me-4"></i>
															<span class="text-break text-truncate osl-word-break--keep-all osl-evt__keyword-name">
																${keywordInfo["alertKey"]}
															</span>
														</div>
														<div class="">${keywordCnt}</div>
													</div>
												`);
											});
										}
										else{
											keyDivElem.append(`
												<div class="osl-mt-90 p-2 text-center">
													<img class="text-dark" src="/media/osl/no_data_img2.png" />
												</div>
											`);
										}
									}
								});
								
								return ajaxObj.send();
							},
							init : function(){
								//조회
								var ajaxObj = this.reload();
								
								//이벤트
								ajaxObj.done(function(){
									targetWidget.off("click");
									//서버 선택 시
									targetWidget.on("click", ".osl-evt__server-list-div .osl-evt__ticket-event-server__select-btn", function(){
										//선택되어 있는 서버 id 가져오기
										var selSevId = targetWidget.find(".osl-evt__server-list-div .osl-evt__ticket-event-server__select-btn.active").data("sev-id");
										//현재 선택한 서버 id 가져오기
										var thisSevId = $(this).data("sev-id");
										
										//둘이 같으면 중지
										if(selSevId == thisSevId){
											return false;
										}
										//다르면
										else {
											//기존 선택 효과 제거, 현재 클릭한 것 활성화
											targetWidget.find(".osl-evt__server-list-div .osl-evt__ticket-event-server__select-btn.active").removeClass("active");
											$(this).addClass("active");
											
											//키워드 목록에서 동일 서버에 대한 키워드만 보이고 그외 숨기기
											targetWidget.find(".osl-evt__keyword-list-div .osl-evt__ticket-event-server__keyword-btn[data-sev-id="+thisSevId+"]").removeClass("d-none");
											targetWidget.find(".osl-evt__keyword-list-div .osl-evt__ticket-event-server__keyword-btn[data-sev-id!="+thisSevId+"]").addClass("d-none");
										}
									});
									
									//키워드 클릭 시 팝업 표출
									targetWidget.on("click", ".osl-evt__keyword-list-div .osl-evt__ticket-event-server__keyword-btn", function(){
										var sevId = $(this).data("sev-id");
										var mapId = $(this).data("map-id");
										var alertKey = $(this).find(".osl-evt__keyword-name").text();
										
										/**** 검색 조건 ****/
										//대시보드 검색조건 공통
										var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
										
										//위젯의 설정 값 추가
										$.each(optionKey, function(wgtOptKey, map){
											dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
										});
										
										//구분자
										dshSearchParams["callId"] = callId;
										
										/**** 조회 param 합치기 ****/
										dshSearchParams["baseGrp"] = "prjId";
										//dshSearchParams["reqUsrId"] = usrId;
										//티켓 분류 REQ00018 - 01 보안 정책, 02 이상징후, 03 외부
										dshSearchParams["reqClsType"] = "02";
										//연결되지 않은 로그도 체크하기 위해 주석
										/*
										//로그 연결 여부 CMM00001 - 01 예, 02 아니오
										dshSearchParams["logLnkCd"] = "01";
										*/
										
										dshSearchParams["sevId"] = sevId;
										dshSearchParams["mapId"] = mapId;
										
										/**** 검색 조건 끝 ****/
										
										var dataParam = {
												// 데이터 조회 URL
												url : "/wgt/wgt1000/wgt1100/selectWgt1100GetReqEvtLogListAjax.do",
												//조회 파라미터
												params : dshSearchParams,
												//데이터 테이블 & 팝업 옵션
												option : {
													showBtns : ["logDetail"],
													submitBtnCd : false, // submit 버튼 표출 유무
												}
										};
										
										var data = {
												type : "list",
												reqType : "05", //로그
												currentIdKey : callId,
												dataParam : JSON.stringify(dataParam)
										};
										
										var options = {
												idKey: callId,
												modalTitle : "["+alertKey+"] 로그 목록",
												closeConfirm: false,
												autoHeight: true,
												modalSize: "xl",
												callback:[{
													targetId : "cmm6206ModalCallbackBtn",
													actionFn : function(thisObj){
														//모든 위젯 초기화
														gridStack.fnRefresh();
													}
												}]
										};
										
										$.osl.layerPopupOpen('/cmm/cmm6000/cmm6200/selectCmm6206View.do',data,options);
									});
								});
							}
						}
					}
				},
			}
		}//end : 보안이벤트
		//start : 보안 행정 + 이벤트
		,"reqA000" : {
			//의견 제시
			"WGTREQA000000001" : {
				size: ["2X1", "2X2"],
				"2X1" : {
					//구분자
					callId : "ticketOpinion",
					//boolean default false
					fullType : false,
					addFullTypeClass : "",
					//class
					cardClass : '',
					cardBodyClass : '',
					//string Y, N, D default N, card-title에 wgtGrpNm과 동시 표출 유무
					//Y - 동시 표출, N - wgtGrpNm만 표출, D - label 만 표출
					addLabel: "Y",
					//text
					label : `의견 제시`,
					//class
					icon : `fas fa-comments`,
					//html
					toolbar : ``,
					//html
					content : `
						<div class="d-flex flex-column justify-content-around p-4 pt-2 w-100 h-100">
							<div class="point-label weak">
								<span data-lang-cd="">의견 제시</span>
							</div>
							<div class="bg-light bg-opacity-75 rounded">
								<div class="d-flex flex-row flex-wrap gap-2 flex-stack point-text strong rounded px-2 py-1 min-h-35px">
									<div class="">
										<span data-lang-cd="">나의 의견</span>
									</div>
									<div class="d-flex flex-row flex-warp flex-grow-1 justify-content-end">
										<div class="badge badge-light-danger px-2 py-1 osl-area-hover-danger cursor-pointer me-2 osl-evt__ticket--opinion-btn" data-opinion-type="myYet">
											<span class="me-2 text-danger" data-lang-cd="">미완료</span>
											<span class="text-danger osl-evt__ticket--opinion-my-yet-count">999+</span>
										</div>
										<div class="badge badge-light-success px-2 py-1 osl-area-hover-success cursor-pointer osl-evt__ticket--opinion-btn" data-opinion-type="myDone">
											<span class="me-2 text-success" data-lang-cd="">완료</span>
											<span class="text-success osl-evt__ticket--opinion-my-done-count">999+</span>
										</div>
									</div>
								</div>
							</div>
							<div class="bg-light bg-opacity-75 rounded">
								<div class="d-flex flex-row flex-stack point-text strong rounded osl-area-hover-primary cursor-pointer px-2 py-1 min-h-35px osl-evt__ticket--opinion-btn" data-opinion-type="replyYet">
									<div class="">
										<span data-lang-cd="">미답변 의견</span>
									</div>
									<div class="">
										<span class="osl-evt__ticket--opinion-reply-yet-count">999+</span>
									</div>
								</div>
							</div>
							<div class="bg-light bg-opacity-75 rounded">
								<div class="d-flex flex-row flex-stack point-text strong rounded osl-area-hover-primary cursor-pointer px-2 py-1 min-h-35px osl-evt__ticket--opinion-btn" data-opinion-type="replyDone">
									<div class="">
										<span data-lang-cd="">답변 의견</span>
									</div>
									<div class="">
										<span class="osl-evt__ticket--opinion-reply-done-count">999+</span>
									</div>
								</div>
							</div>
						</div>
					`,
					actionFn : function(){
						var widgetId = this.widgetId;
						var optionKey = this.optionKey;
						
						//대상 위젯
						var thisWidget = $(`.osl-evt__widget-item[gs-id="${widgetId}"]`);
						//위젯 설정 시 이벤트가 호출되면 안되기 때문에 실제 이벤트 지정될 영역
						var targetWidget = thisWidget.find(".osl-evt__widget-card .osl-evt__widget-card-body");
						
						//그리드스택
						var gridStackId = thisWidget.closest(".osl-evt__grid-stack-area").attr("id");
						var gridStack = widgetSettingGridStack[gridStackId];
						
						//위젯 세팅 시 정보 바로 보관해두기 위해서
						//현재 요청자
						//var usrId = $.osl.user.userInfo.usrId;
						
						//구분자
						var callId = this.callId;
						
						return {
							//새로고침 버튼 누르면 호출
							reload : function(){ 
								/**** 검색 조건 ****/
								//대시보드 검색조건 공통
								var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
								
								//위젯의 설정 값 추가
								$.each(optionKey, function(wgtOptKey, map){
									dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
								});
								
								//구분자
								dshSearchParams["callId"] = callId;
								
								
								/**** 조회 param 합치기 ****/
								dshSearchParams["baseGrp"] = "prjId";
								//dshSearchParams["reqUsrId"] = usrId;
								
								/**** 검색 조건 끝 ****/
								
								//AJAX 설정
								var ajaxObj = new $.osl.ajaxRequestAction(
										{"url":"/wgt/wgt1000/wgt1100/selectWgt1100WidgetReloadAjax.do", "async":"false"}
										,dshSearchParams);
								//AJAX 전송 성공 함수
								ajaxObj.setFnSuccess(function(data){
									//오류
									if(data.errorYn == "Y"){
										$.osl.alert(data.message,{type: 'error'});
										//모달 창 닫기
										$.osl.layerPopupClose();
									}
									//성공
									else{
										//내가 제시한 의견 (답변 미완료 상태, 답변 완료 상태), 내가 답변해야 할 의견 (답변 미완료 상태, 답변 완료 상태)
										//yetOpinionCnt, doneOpinionCnt, yetReplyCnt, doneReplyCnt 존재
										var ticketOpinionCnt = data.ticketOpinionCnt;
										
										var ticketYetOpinionCnt = ticketOpinionCnt["yetOpinionCnt"];
										if(Number(ticketYetOpinionCnt) > 999){
											ticketYetOpinionCnt = "999+";
										}
										var ticketDoneOpinionCnt = ticketOpinionCnt["doneOpinionCnt"];
										if(Number(ticketDoneOpinionCnt) > 999){
											ticketDoneOpinionCnt = "999+";
										}
										var ticketYetReplyCnt = ticketOpinionCnt["yetReplyCnt"];
										if(Number(ticketYetReplyCnt) > 999){
											ticketYetReplyCnt = "999+";
										}
										var ticketDoneReplyCnt = ticketOpinionCnt["doneReplyCnt"];
										if(Number(ticketDoneReplyCnt) > 999){
											ticketDoneReplyCnt = "999+";
										}
										
										//종합 갯수 표출
										targetWidget.find(".osl-evt__ticket--opinion-my-yet-count").text(ticketYetOpinionCnt);
										targetWidget.find(".osl-evt__ticket--opinion-my-done-count").text(ticketDoneOpinionCnt);
										targetWidget.find(".osl-evt__ticket--opinion-reply-yet-count").text(ticketYetReplyCnt);
										targetWidget.find(".osl-evt__ticket--opinion-reply-done-count").text(ticketDoneReplyCnt);
									}
								});
								
								return ajaxObj.send();
							},
							init : function(){
								//조회
								var ajaxObj = this.reload();
								
								ajaxObj.done(function(){
									//위젯 자체 클릭 시 의견 제시 목록 팝업 표출
									targetWidget.off("click").on("click", ".osl-evt__ticket--opinion-btn", function(){
										/**** 검색 조건 ****/
										//대시보드 검색조건 공통
										var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
										
										//위젯의 설정 값 추가
										$.each(optionKey, function(wgtOptKey, map){
											dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
										});
										
										//구분자
										dshSearchParams["callId"] = callId;
										
										/**** 조회 param 합치기 ****/
										//REQ00008 01 접수대기 02 처리중 03 반려 04 완료 05 결재반려후 종료 06 중간 종료
										dshSearchParams["baseGrp"] = "prjId";
										//dshSearchParams["reqUsrId"] = usrId;
										
										//선택 값
										var opinionType = $(this).data("opinion-type");
										var opinionTypeNm = "";
										if(opinionType == "myDone"){
											opinionTypeNm = "나의 의견 완료";
										}
										else if(opinionType == "myYet"){
											opinionTypeNm = "나의 의견 미완료";
										}
										else if(opinionType == "replyYet"){
											opinionTypeNm = "미답변 의견";
										}
										else if(opinionType == "replyDone"){
											opinionTypeNm = "답변 의견";
										}
										
										dshSearchParams["opinionType"] = opinionType;
										
										/**** 검색 조건 끝 ****/
										
										var dataParam = {
												// 데이터 조회 URL
												url : "/wgt/wgt1000/wgt1100/selectWgt1100GetReqOpinionListByOpinionAjax.do",
												//조회 파라미터
												params : dshSearchParams,
												//데이터 테이블 & 팝업 옵션
												option : {
													showBtns : ["reqDetail"],
													submitBtnCd : false, // submit 버튼 표출 유무
												}
										};
										
										var data = {
												type : "list",
												reqType : "04", //의견
												currentIdKey : callId,
												dataParam : JSON.stringify(dataParam)
										};
										
										var options = {
												idKey: callId,
												modalTitle : "["+opinionTypeNm+"] 의견 제시 목록",
												closeConfirm: false,
												autoHeight: true,
												modalSize: "xl",
												callback:[{
													targetId : "cmm6206ModalCallbackBtn",
													actionFn : function(thisObj){
														//모든 위젯 초기화
														gridStack.fnRefresh();
													}
												}]
										};
										
										$.osl.layerPopupOpen('/cmm/cmm6000/cmm6200/selectCmm6206View.do',data,options);
									});
								});
							}
						}
					}
				},
				"2X2" : {
					//구분자
					callId : "ticketOpinionList",
					//boolean default false
					fullType : false,
					addFullTypeClass : "",
					//class
					cardClass : '',
					cardBodyClass : '',
					//string Y, N, D default N, card-title에 wgtGrpNm과 동시 표출 유무
					//Y - 동시 표출, N - wgtGrpNm만 표출, D - label 만 표출
					addLabel: "Y",
					//text
					label : `의견 제시`,
					//class
					icon : `fas fa-comments`,
					//html
					toolbar : ``,
					//html
					content : `
						<div class="d-flex flex-column justify-content-around h-100 mx-4">
							<div class="d-flex flex-row flex-nowrap flex-stack w-100 mt-2">
								<div class="point-label weak">
									<span data-lang-cd="">의견 제시</span>
								</div>
								<div>
									<ul class="osl-nav nav nav-line-tabs nav-line-tabs-2x nav-stretch point-text strong osl-evt__ticket-opinion-nav" id="%widgetId%FirstNav" data-current-active-id="%widgetId%My">
										<li class="nav-item">
											<a class="nav-link text-dark text-active-primary opacity-75 opacity-state-100 active" data-bs-toggle="tab" href="#%widgetId%My" data-init-cd="02">
												<span class="" data-lang-cd="">제시</span>
											</a>
										</li>
										<li class="nav-item">
											<a class="nav-link text-dark text-active-primary opacity-75 opacity-state-100" data-bs-toggle="tab" href="#%widgetId%Reply" data-init-cd="02">
												<span class="" data-lang-cd="">답변</span>
											</a>
										</li>
									</ul>
								</div>
							</div>
							<div class="tab-content flex-grow-1 mt-2">
								<div class="tab-pane fade active show mb-0" id="%widgetId%My">
									<ul class="osl-nav osl-nav-rounded nav nav-line-tabs nav-line-tabs-2x nav-stretch point-text strong osl-evt__ticket-opinion-nav" id="%widgetId%SecondNav1" data-current-active-id="%widgetId%MyDone">
										<li class="nav-item">
											<a class="nav-link text-dark text-active-primary opacity-75 opacity-state-100 active" data-bs-toggle="tab" href="#%widgetId%MyDone" data-init-cd="02">
												<span class="px-2" data-lang-cd="">제시 완료</span>
											</a>
										</li>
										<li class="nav-item">
											<a class="nav-link text-dark text-active-primary opacity-75 opacity-state-100" data-bs-toggle="tab" href="#%widgetId%MyYet" data-init-cd="02">
												<span class="px-2" data-lang-cd="">제시 미완료</span>
											</a>
										</li>
									</ul>
									<div class="tab-content flex-grow-1 mt-4">
										<div class="tab-pane fade active show mb-0 osl-evt__opinion--tab-content" id="%widgetId%MyDone" data-opinion-type="myDone">
											<div class="osl-mt-90 p-2 text-center">
												<img class="text-dark" src="/media/osl/no_data_img2.png" />
											</div>
										</div>
										<div class="tab-pane fade mb-0 osl-evt__opinion--tab-content" id="%widgetId%MyYet" data-opinion-type="myYet">
											<div class="osl-mt-90 p-2 text-center">
												<img class="text-dark" src="/media/osl/no_data_img2.png" />
											</div>
										</div>
									</div>
								</div>
								<div class="tab-pane fade mb-0" id="%widgetId%Reply">
									<ul class="osl-nav osl-nav-rounded nav nav-line-tabs nav-line-tabs-2x nav-stretch point-text strong osl-evt__ticket-opinion-nav" id="%widgetId%SecondNav2" data-current-active-id="%widgetId%ReplyDone">
										<li class="nav-item">
											<a class="nav-link text-dark text-active-primary opacity-75 opacity-state-100 active" data-bs-toggle="tab" href="#%widgetId%ReplyDone" data-init-cd="02">
												<span class="px-2" data-lang-cd="">답변 완료</span>
											</a>
										</li>
										<li class="nav-item">
											<a class="nav-link text-dark text-active-primary opacity-75 opacity-state-100" data-bs-toggle="tab" href="#%widgetId%ReplyYet" data-init-cd="02">
												<span class="px-2" data-lang-cd="">답변 미완료</span>
											</a>
										</li>
									</ul>
									<div class="tab-content flex-grow-1 mt-4">
										<div class="tab-pane fade active show mb-0 osl-evt__opinion--tab-content" id="%widgetId%ReplyDone" data-opinion-type="replyDone">
											<div class="osl-mt-90 p-2 text-center">
												<img class="text-dark" src="/media/osl/no_data_img2.png" />
											</div>
										</div>
										<div class="tab-pane fade mb-0 osl-evt__opinion--tab-content" id="%widgetId%ReplyYet" data-opinion-type="replyYet">
											<div class="osl-mt-90 p-2 text-center">
												<img class="text-dark" src="/media/osl/no_data_img2.png" />
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					`,
					actionFn : function(){
						var widgetId = this.widgetId;
						var optionKey = this.optionKey;
						
						//대상 위젯
						var thisWidget = $(`.osl-evt__widget-item[gs-id="${widgetId}"]`);
						//위젯 설정 시 이벤트가 호출되면 안되기 때문에 실제 이벤트 지정될 영역
						var targetWidget = thisWidget.find(".osl-evt__widget-card .osl-evt__widget-card-body");
						
						//그리드스택
						var gridStackId = thisWidget.closest(".osl-evt__grid-stack-area").attr("id");
						var gridStack = widgetSettingGridStack[gridStackId];
						
						//위젯 세팅 시 정보 바로 보관해두기 위해서
						//현재 요청자
						//var usrId = $.osl.user.userInfo.usrId;
						
						//구분자
						var callId = this.callId;
						
						return {
							//새로고침 버튼 누르면 호출
							reload : function(){ 
								/**** 검색 조건 ****/
								//대시보드 검색조건 공통
								var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
								
								//위젯의 설정 값 추가
								$.each(optionKey, function(wgtOptKey, map){
									dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
								});
								
								//구분자
								dshSearchParams["callId"] = callId;
								
								/**** 조회 param 합치기 ****/
								dshSearchParams["baseGrp"] = "prjId";
								//dshSearchParams["reqUsrId"] = usrId;
								
								/**** 검색 조건 끝 ****/
								
								//AJAX 설정
								var ajaxObj = new $.osl.ajaxRequestAction(
										{"url":"/wgt/wgt1000/wgt1100/selectWgt1100WidgetReloadAjax.do", "async":"false"}
										,dshSearchParams);
								//AJAX 전송 성공 함수
								ajaxObj.setFnSuccess(function(data){
									//오류
									if(data.errorYn == "Y"){
										$.osl.alert(data.message,{type: 'error'});
										//모달 창 닫기
										$.osl.layerPopupClose();
									}
									//성공
									else{
										//데이터
										var opnInfo = data.opnInfo;
										
										//제시 - 완료
										var myDoneCnt = opnInfo["myDoneCnt"];
										var myDoneList = opnInfo["myDoneList"];
										//제시 - 미완료
										var myYetCnt = opnInfo["myYetCnt"];
										var myYetList = opnInfo["myYetList"];
										//답변 - 완료
										var replyDoneCnt = opnInfo["replyDoneCnt"];
										var replyDoneList = opnInfo["replyDoneList"];
										//답변 - 미완료
										var replyYetCnt = opnInfo["replyYetCnt"];
										var replyYetList = opnInfo["replyYetList"];
										
										var moreBtn = '';
										
										//각각 그리기
										//1.제시 - 완료
										//목록이 10개 초과이면
										if(!$.osl.isNull(myDoneCnt) && Number(myDoneCnt) > 10) {
											//more 버튼 표출
											moreBtn = `
												<div class="rounded text-center osl-area-hover cursor-pointer px-2 py-1 mt-2 osl-evt__opinion-more-btn">
													<span class="" data-lang-cd="">more</span>
													<span class="svg-icon svg-icon-5">
														<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
															<rect opacity="0.5" x="18" y="13" width="13" height="2" rx="1" transform="rotate(-180 18 13)" fill="currentColor"></rect>
															<path d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z" fill="currentColor"></path>
														</svg>
													</span>
												</div>
											`;
										}
										
										//목록
										$("#"+widgetId+"MyDone").empty();
										if(!$.osl.isNull(myDoneList) && myDoneList.length > 0) {
											$.each(myDoneList, function(rn, map){
												//내용 - 태그 존재하면 제거
												var opnDesc = map["opnDesc"].replace(/(<([^>]+)>)/ig, '');
												//혹시라도 태그 남아있는 경우를 위해
												opnDesc = $.osl.escapeHtml(opnDesc);
												
												//그리기
												var innerHtml = `
													<div class="d-flex flex-row flex-nowrap flex-stack rounded px-2 py-1 mb-1 bg-light-navy osl-area-hover-navy cursor-pointer osl-evt__opinion-req--view-btn" data-prj-id="${map.prjId}" data-req-id="${map.reqId}" data-process-id="${map.processId}" data-flow-id="${map.flowId}" data-opn-id="${map.opnId}">
														<div class="mw-85">
															<div class="text-break text-truncate osl-word-break--keep-all">
																${opnDesc}
															</div>
														</div>
														<div class="">
															<i class="fa fa-external-link-alt"></i>
														</div>
													</div>
												`;
												
												//내용 넣기
												$("#"+widgetId+"MyDone").append(innerHtml);
											});
											
											//더보기 버튼 넣기
											$("#"+widgetId+"MyDone").append(moreBtn);
										}
										//데이터 없으면
										else {
											$("#"+widgetId+"MyDone").append(`
												<div class="osl-mt-90 p-2 text-center">
													<img class="text-dark" src="/media/osl/no_data_img2.png" />
												</div>
											`);
										}
										
										//2.제시 - 미완료
										//목록이 10개 초과이면
										if(!$.osl.isNull(myYetCnt) && Number(myYetCnt) > 10) {
											//more 버튼 표출
											moreBtn = `
												<div class="rounded text-center osl-area-hover cursor-pointer px-2 py-1 mt-2 osl-evt__opinion-more-btn">
													<span class="" data-lang-cd="">more</span>
													<span class="svg-icon svg-icon-5">
														<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
															<rect opacity="0.5" x="18" y="13" width="13" height="2" rx="1" transform="rotate(-180 18 13)" fill="currentColor"></rect>
															<path d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z" fill="currentColor"></path>
														</svg>
													</span>
												</div>
											`;
										}
										
										//목록
										$("#"+widgetId+"MyYet").empty();
										if(!$.osl.isNull(myYetList) && myYetList.length > 0) {
											$.each(myYetList, function(rn, map){
												//내용 - 태그 존재하면 제거
												var opnDesc = map["opnDesc"].replace(/(<([^>]+)>)/ig, '');
												//혹시라도 태그 남아있는 경우를 위해
												opnDesc = $.osl.escapeHtml(opnDesc);
												
												//그리기
												var innerHtml = `
													<div class="d-flex flex-row flex-nowrap flex-stack rounded px-2 py-1 mb-1 bg-light-navy osl-area-hover-navy cursor-pointer osl-evt__opinion-req--view-btn" data-prj-id="${map.prjId}" data-req-id="${map.reqId}" data-process-id="${map.processId}" data-flow-id="${map.flowId}" data-opn-id="${map.opnId}">
														<div class="mw-85">
															<div class="text-break text-truncate osl-word-break--keep-all">
																${opnDesc}
															</div>
														</div>
														<div class="">
															<i class="fa fa-external-link-alt"></i>
														</div>
													</div>
												`;
												
												//내용 넣기
												$("#"+widgetId+"MyYet").append(innerHtml);
											});
											
											//더보기 버튼 넣기
											$("#"+widgetId+"MyYet").append(moreBtn);
										}
										//데이터 없으면
										else {
											$("#"+widgetId+"MyYet").append(`
												<div class="osl-mt-90 p-2 text-center">
													<img class="text-dark" src="/media/osl/no_data_img2.png" />
												</div>
											`);
										}
										
										//3.답변 - 완료
										//목록이 10개 초과이면
										if(!$.osl.isNull(replyDoneCnt) && Number(replyDoneCnt) > 10) {
											//more 버튼 표출
											moreBtn = `
												<div class="rounded text-center osl-area-hover cursor-pointer px-2 py-1 mt-2 osl-evt__opinion-more-btn">
													<span class="" data-lang-cd="">more</span>
													<span class="svg-icon svg-icon-5">
														<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
															<rect opacity="0.5" x="18" y="13" width="13" height="2" rx="1" transform="rotate(-180 18 13)" fill="currentColor"></rect>
															<path d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z" fill="currentColor"></path>
														</svg>
													</span>
												</div>
											`;
										}
										
										//목록
										$("#"+widgetId+"ReplyDone").empty();
										if(!$.osl.isNull(replyDoneList) && replyDoneList.length > 0) {
											$.each(replyDoneList, function(rn, map){
												//내용 - 태그 존재하면 제거
												var opnDesc = map["opnDesc"].replace(/(<([^>]+)>)/ig, '');
												//혹시라도 태그 남아있는 경우를 위해
												opnDesc = $.osl.escapeHtml(opnDesc);
												
												//그리기
												var innerHtml = `
													<div class="d-flex flex-row flex-nowrap flex-stack rounded px-2 py-1 mb-1 bg-light-navy osl-area-hover-navy cursor-pointer osl-evt__opinion-req--view-btn" data-prj-id="${map.prjId}" data-req-id="${map.reqId}" data-process-id="${map.processId}" data-flow-id="${map.flowId}" data-opn-id="${map.opnId}">
														<div class="mw-85">
															<div class="text-break text-truncate osl-word-break--keep-all">
																${opnDesc}
															</div>
														</div>
														<div class="">
															<i class="fa fa-external-link-alt"></i>
														</div>
													</div>
												`;
												
												//내용 넣기
												$("#"+widgetId+"ReplyDone").append(innerHtml);
											});
											
											//더보기 버튼 넣기
											$("#"+widgetId+"ReplyDone").append(moreBtn);
										}
										//데이터 없으면
										else {
											$("#"+widgetId+"ReplyDone").append(`
												<div class="osl-mt-90 p-2 text-center">
													<img class="text-dark" src="/media/osl/no_data_img2.png" />
												</div>
											`);
										}
										
										//4.답변 - 미완료
										//목록이 10개 초과이면
										if(!$.osl.isNull(replyYetCnt) && Number(replyYetCnt) > 10) {
											//more 버튼 표출
											moreBtn = `
												<div class="rounded text-center osl-area-hover cursor-pointer px-2 py-1 mt-2 osl-evt__opinion-more-btn">
													<span class="" data-lang-cd="">more</span>
													<span class="svg-icon svg-icon-5">
														<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
															<rect opacity="0.5" x="18" y="13" width="13" height="2" rx="1" transform="rotate(-180 18 13)" fill="currentColor"></rect>
															<path d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z" fill="currentColor"></path>
														</svg>
													</span>
												</div>
											`;
										}
										
										//목록
										$("#"+widgetId+"ReplyYet").empty();
										if(!$.osl.isNull(replyYetList) && replyYetList.length > 0) {
											$.each(replyYetList, function(rn, map){
												//내용 - 태그 존재하면 제거
												var opnDesc = map["opnDesc"].replace(/(<([^>]+)>)/ig, '');
												//혹시라도 태그 남아있는 경우를 위해
												opnDesc = $.osl.escapeHtml(opnDesc);
												
												//그리기
												var innerHtml = `
													<div class="d-flex flex-row flex-nowrap flex-stack rounded px-2 py-1 mb-1 bg-light-navy osl-area-hover-navy cursor-pointer osl-evt__opinion-req--view-btn" data-prj-id="${map.prjId}" data-req-id="${map.reqId}" data-process-id="${map.processId}" data-flow-id="${map.flowId}" data-opn-id="${map.opnId}">
														<div class="mw-85">
															<div class="text-break text-truncate osl-word-break--keep-all">
																${opnDesc}
															</div>
														</div>
														<div class="">
															<i class="fa fa-external-link-alt"></i>
														</div>
													</div>
												`;
												
												//내용 넣기
												$("#"+widgetId+"ReplyYet").append(innerHtml);
											});
											
											//더보기 버튼 넣기
											$("#"+widgetId+"ReplyYet").append(moreBtn);
										}
										//데이터 없으면
										else {
											$("#"+widgetId+"ReplyYet").append(`
												<div class="osl-mt-90 p-2 text-center">
													<img class="text-dark" src="/media/osl/no_data_img2.png" />
												</div>
											`);
										}
									}
								});
								
								return ajaxObj.send();
							},
							init : function(){
								//조회 - 목록 그리기
								var ajaxObj = this.reload();
								
								ajaxObj.done(function(){
									targetWidget.off("click");
									//더보기 버튼 클릭 시
									targetWidget.on("click", ".osl-evt__opinion-more-btn", function(){
										/**** 검색 조건 ****/
										//대시보드 검색조건 공통
										var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
										
										//위젯의 설정 값 추가
										$.each(optionKey, function(wgtOptKey, map){
											dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
										});
										
										//구분자
										dshSearchParams["callId"] = callId;
										
										/**** 조회 param 합치기 ****/
										dshSearchParams["baseGrp"] = "prjId";
										//dshSearchParams["reqUsrId"] = usrId;
										
										//타입 가져오기
										var opinionType = $(this).closest(".osl-evt__opinion--tab-content").data("opinion-type");
										var opinionTypeNm = "";
										if(opinionType == "myDone"){
											opinionTypeNm = "제시 완료";
										}
										else if(opinionType == "myYet"){
											opinionTypeNm = "제시 미완료";
										}
										else if(opinionType == "replyDone"){
											opinionTypeNm = "답변 완료";
										}
										else if(opinionType == "replyYet"){
											opinionTypeNm = "답변 미완료";
										}
										
										//해당 타입 넣기
										dshSearchParams["opinionType"] = opinionType;
										
										/**** 검색 조건 끝 ****/
										
										var dataParam = {
												// 데이터 조회 URL
												url : "/wgt/wgt1000/wgt1100/selectWgt1100GetReqOpinionListByOpinionAjax.do",
												//조회 파라미터
												params : dshSearchParams,
												//데이터 테이블 & 팝업 옵션
												option : {
													showBtns : ["reqDetail"],
													submitBtnCd : false, // submit 버튼 표출 유무
												}
										};
										
										var data = {
												type : "list",
												reqType : "04", //의견
												currentIdKey : callId,
												dataParam : JSON.stringify(dataParam)
										};
										
										var options = {
												idKey: callId,
												modalTitle : "["+opinionTypeNm+"] 의견 제시 목록",
												closeConfirm: false,
												autoHeight: true,
												modalSize: "xl",
												callback:[{
													targetId : "cmm6206ModalCallbackBtn",
													actionFn : function(thisObj){
														//모든 위젯 초기화
														gridStack.fnRefresh();
													}
												}]
										};
										
										$.osl.layerPopupOpen('/cmm/cmm6000/cmm6200/selectCmm6206View.do',data,options);
									});
									
									//의견제시 row 클릭 시
									targetWidget.on("click", ".osl-evt__opinion-req--view-btn", function(){
										//해당 티켓 오픈
										var reqId = $(this).data("req-id");
										var processId = $(this).data("process-id");
										var flowId = $(this).data("flow-id");
										var opnId = $(this).data("opn-id");
										var prjId = $(this).data("prj-id");
										
										var data = {
												type:"detail",
												paramTplClsType:"02",
												paramPrjId: prjId,
												paramReqId: reqId,
												paramFlowId: flowId,
												paramProcessId: processId,
												paramOpnId: opnId
											};
										var options = {
												idKey: reqId,
												modalTitle: $.osl.lang("cmm6201.title.main.default"),
												closeConfirm: false,
												autoHeight:false,
												modalSize: 'fs',
												ftScrollUse: false,
											};
										$.osl.layerPopupOpen('/cmm/cmm6000/cmm6200/selectCmm6201View.do', data, options);
									});
								});
							}
						}
					}
				}
			},
			//담당 작업
			"WGTREQA000000002" : {
				size: ["2X1", "2X2"],
				"2X1" : {
					//구분자
					callId : "ticketWork",
					//boolean default false
					fullType : false,
					addFullTypeClass : "",
					//class
					cardClass : '',
					cardBodyClass : '',
					//string Y, N, D default N, card-title에 wgtGrpNm과 동시 표출 유무
					//Y - 동시 표출, N - wgtGrpNm만 표출, D - label 만 표출
					addLabel: "Y",
					//text
					label : `담당 작업`,
					//class
					icon : `fas fa-wrench`,
					//html
					toolbar : ``,
					//html
					content : `
						<div class="d-flex flex-column justify-content-around p-4 pt-2 w-100 h-100">
							<div class="point-label weak">
								<span data-lang-cd="">담당 작업</span>
							</div>
							<div class="bg-light bg-opacity-75 rounded">
								<div class="d-flex flex-row flex-wrap gap-2 flex-stack point-text strong rounded px-2 py-1 min-h-35px">
									<div class="">
										<span data-lang-cd="">나의 작업</span>
									</div>
									<div class="d-flex flex-row flex-warp flex-grow-1 justify-content-end">
										<div class="badge badge-light-danger px-2 py-1 osl-area-hover-danger cursor-pointer me-2 osl-evt__ticket--work-btn" data-work-type="workIng">
											<span class="me-2 text-danger" data-lang-cd="">진행중</span>
											<span class="text-danger osl-evt__ticket--work-ing-count">999+</span>
										</div>
										<div class="badge badge-light-success px-2 py-1 osl-area-hover-success cursor-pointer osl-evt__ticket--work-btn" data-work-type="workEnd">
											<span class="me-2 text-success" data-lang-cd="">종료</span>
											<span class="text-success osl-evt__ticket--work-end-count">999+</span>
										</div>
									</div>
								</div>
							</div>
							<div class="bg-light bg-opacity-75 rounded">
								<div class="d-flex flex-row flex-stack point-text strong rounded osl-area-hover-primary cursor-pointer px-2 py-1 min-h-35px osl-evt__ticket--work-btn" data-work-type="workYet">
									<div class="">
										<span data-lang-cd="">작업 미완료</span>
									</div>
									<div class="">
										<span class="osl-evt__ticket--work-yet-count">999+</span>
									</div>
								</div>
							</div>
							<div class="bg-light bg-opacity-75 rounded">
								<div class="d-flex flex-row flex-stack point-text strong rounded osl-area-hover-primary cursor-pointer px-2 py-1 min-h-35px osl-evt__ticket--work-btn" data-work-type="workDone">
									<div class="">
										<span data-lang-cd="">작업 완료</span>
									</div>
									<div class="">
										<span class="osl-evt__ticket--work-done-count">999+</span>
									</div>
								</div>
							</div>
						</div>
					`,
					actionFn : function(){
						var widgetId = this.widgetId;
						var optionKey = this.optionKey;
						
						//대상 위젯
						var thisWidget = $(`.osl-evt__widget-item[gs-id="${widgetId}"]`);
						//위젯 설정 시 이벤트가 호출되면 안되기 때문에 실제 이벤트 지정될 영역
						var targetWidget = thisWidget.find(".osl-evt__widget-card .osl-evt__widget-card-body");
						
						//그리드스택
						var gridStackId = thisWidget.closest(".osl-evt__grid-stack-area").attr("id");
						var gridStack = widgetSettingGridStack[gridStackId];
						
						//위젯 세팅 시 정보 바로 보관해두기 위해서
						//현재 요청자
						//var usrId = $.osl.user.userInfo.usrId;
						
						//구분자
						var callId = this.callId;
						
						return {
							//새로고침 버튼 누르면 호출
							reload : function(){ 
								/**** 검색 조건 ****/
								//대시보드 검색조건 공통
								var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
								
								//위젯의 설정 값 추가
								$.each(optionKey, function(wgtOptKey, map){
									dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
								});
								
								//구분자
								dshSearchParams["callId"] = callId;
								
								
								/**** 조회 param 합치기 ****/
								//REQ00008 01 접수대기 02 처리중 03 반려 04 완료 05 결재반려후 종료 06 중간 종료
								dshSearchParams["baseGrp"] = "prjId";
								//dshSearchParams["reqUsrId"] = usrId;
								
								/**** 검색 조건 끝 ****/
								
								//AJAX 설정
								var ajaxObj = new $.osl.ajaxRequestAction(
										{"url":"/wgt/wgt1000/wgt1100/selectWgt1100WidgetReloadAjax.do", "async":"false"}
										,dshSearchParams);
								//AJAX 전송 성공 함수
								ajaxObj.setFnSuccess(function(data){
									//오류
									if(data.errorYn == "Y"){
										$.osl.alert(data.message,{type: 'error'});
										//모달 창 닫기
										$.osl.layerPopupClose();
									}
									//성공
									else{
										//내가 분배한 작업 : 진행 중, 종료
										//내가 처리해야 하는 담당 작업 : 완료, 미완료
										//workIngCnt, workEndCnt, workYetCnt, workDoneCnt 존재
										var ticketWorkCnt = data.ticketWorkCnt;
										
										var ticketIngWorkCnt = ticketWorkCnt["workIngCnt"];
										if(Number(ticketIngWorkCnt) > 999){
											ticketIngWorkCnt = "999+";
										}
										var ticketEndWorkCnt = ticketWorkCnt["workEndCnt"];
										if(Number(ticketEndWorkCnt) > 999){
											ticketEndWorkCnt = "999+";
										}
										var ticketYetWorkCnt = ticketWorkCnt["workYetCnt"];
										if(Number(ticketYetWorkCnt) > 999){
											ticketYetWorkCnt = "999+";
										}
										var ticketDoneWorkCnt = ticketWorkCnt["workDoneCnt"];
										if(Number(ticketDoneWorkCnt) > 999){
											ticketDoneWorkCnt = "999+";
										}
										
										//종합 갯수 표출
										targetWidget.find(".osl-evt__ticket--work-ing-count").text(ticketIngWorkCnt);
										targetWidget.find(".osl-evt__ticket--work-end-count").text(ticketEndWorkCnt);
										targetWidget.find(".osl-evt__ticket--work-yet-count").text(ticketYetWorkCnt);
										targetWidget.find(".osl-evt__ticket--work-done-count").text(ticketDoneWorkCnt);
									}
								});
								
								return ajaxObj.send();
							},
							init : function(){
								//조회
								var ajaxObj = this.reload();
								
								ajaxObj.done(function(){
									//위젯 자체 클릭 시 담당 작업 목록 팝업 표출
									targetWidget.off("click").on("click", ".osl-evt__ticket--work-btn", function(){
										/**** 검색 조건 ****/
										//대시보드 검색조건 공통
										var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
										
										//위젯의 설정 값 추가
										$.each(optionKey, function(wgtOptKey, map){
											dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
										});
										
										//구분자
										dshSearchParams["callId"] = callId;
										
										/**** 조회 param 합치기 ****/
										//REQ00008 01 접수대기 02 처리중 03 반려 04 완료 05 결재반려후 종료 06 중간 종료
										dshSearchParams["baseGrp"] = "prjId";
										//dshSearchParams["reqUsrId"] = usrId;
										
										//선택 값
										var workType = $(this).data("work-type");
										var workTypeTitle = "";
										if(workType == "my"){
											workTypeTitle = "작업 지시 목록";
										}
										else if(workType == "workIng"){
											workTypeTitle = "[작업 진행 중] 담당 작업 목록";
										}
										else if(workType == "workEnd"){
											workTypeTitle = "[작업 종료] 담당 작업 목록";
										}
										else if(workType == "workYet"){
											workTypeTitle = "[작업 미완료] 담당 작업 목록";
										}
										else if(workType == "workDone"){
											workTypeTitle = "[작업 완료] 담당 작업 목록";
										}
										
										dshSearchParams["workType"] = workType;
										
										/**** 검색 조건 끝 ****/
										
										var dataParam = {
												// 데이터 조회 URL
												url : "/wgt/wgt1000/wgt1100/selectWgt1100GetReqWorkListByWorkAjax.do",
												//조회 파라미터
												params : dshSearchParams,
												//데이터 테이블 & 팝업 옵션
												option : {
													showBtns : ["reqDetail"],
													submitBtnCd : false, // submit 버튼 표출 유무
												}
										};
										
										var data = {
												type : "list",
												reqType : "03", //작업
												currentIdKey : callId,
												dataParam : JSON.stringify(dataParam)
										};
										
										var options = {
												idKey: callId,
												modalTitle : workTypeTitle,
												closeConfirm: false,
												autoHeight: true,
												modalSize: "xl",
												callback:[{
													targetId : "cmm6206ModalCallbackBtn",
													actionFn : function(thisObj){
														//모든 위젯 초기화
														gridStack.fnRefresh();
													}
												}]
										};
										
										$.osl.layerPopupOpen('/cmm/cmm6000/cmm6200/selectCmm6206View.do',data,options);
									});
								});
							}
						}
					}
				},
				"2X2" : {
					//구분자
					callId : "ticketWorkList",
					//boolean default false
					fullType : false,
					addFullTypeClass : "",
					//class
					cardClass : '',
					cardBodyClass : '',
					//string Y, N, D default N, card-title에 wgtGrpNm과 동시 표출 유무
					//Y - 동시 표출, N - wgtGrpNm만 표출, D - label 만 표출
					addLabel: "Y",
					//text
					label : `담당 작업`,
					//class
					icon : `fas fa-wrench`,
					//html
					toolbar : ``,
					//html
					content : `
						<div class="d-flex flex-column justify-content-around h-100 mx-4">
							<div class="d-flex flex-row flex-nowrap flex-stack w-100 mt-2">
								<div class="point-label weak">
									<span data-lang-cd="">담당 작업</span>
								</div>
								<div>
									<ul class="osl-nav nav nav-line-tabs nav-line-tabs-2x nav-stretch point-text strong osl-evt__ticket-work-nav" id="%widgetId%FirstNav" data-current-active-id="%widgetId%My">
										<li class="nav-item">
											<a class="nav-link text-dark text-active-primary opacity-75 opacity-state-100 active" data-bs-toggle="tab" href="#%widgetId%My" data-init-cd="02">
												<span class="" data-lang-cd="">지시</span>
											</a>
										</li>
										<li class="nav-item">
											<a class="nav-link text-dark text-active-primary opacity-75 opacity-state-100" data-bs-toggle="tab" href="#%widgetId%Work" data-init-cd="02">
												<span class="" data-lang-cd="">담당</span>
											</a>
										</li>
									</ul>
								</div>
							</div>
							<div class="tab-content flex-grow-1 mt-2">
								<div class="tab-pane fade active show mb-0" id="%widgetId%My">
									<ul class="osl-nav osl-nav-rounded nav nav-line-tabs nav-line-tabs-2x nav-stretch point-text strong osl-evt__ticket-work-nav" id="%widgetId%SecondNav1" data-current-active-id="%widgetId%MyDone">
										<li class="nav-item">
											<a class="nav-link text-dark text-active-primary opacity-75 opacity-state-100 active" data-bs-toggle="tab" href="#%widgetId%MyDone" data-init-cd="02">
												<span class="px-2" data-lang-cd="">종료</span>
											</a>
										</li>
										<li class="nav-item">
											<a class="nav-link text-dark text-active-primary opacity-75 opacity-state-100" data-bs-toggle="tab" href="#%widgetId%MyYet" data-init-cd="02">
												<span class="px-2" data-lang-cd="">진행중</span>
											</a>
										</li>
									</ul>
									<div class="tab-content flex-grow-1 mt-4">
										<div class="tab-pane fade active show mb-0 osl-evt__work--tab-content" id="%widgetId%MyDone" data-work-type="workDone">
											<div class="osl-mt-90 p-2 text-center">
												<img class="text-dark" src="/media/osl/no_data_img2.png" />
											</div>
										</div>
										<div class="tab-pane fade mb-0 osl-evt__work--tab-content" id="%widgetId%MyYet" data-work-type="workIng">
											<div class="osl-mt-90 p-2 text-center">
												<img class="text-dark" src="/media/osl/no_data_img2.png" />
											</div>
										</div>
									</div>
								</div>
								<div class="tab-pane fade mb-0" id="%widgetId%Work">
									<ul class="osl-nav osl-nav-rounded nav nav-line-tabs nav-line-tabs-2x nav-stretch point-text strong osl-evt__ticket-work-nav" id="%widgetId%SecondNav2" data-current-active-id="%widgetId%WorkDone">
										<li class="nav-item">
											<a class="nav-link text-dark text-active-primary opacity-75 opacity-state-100 active" data-bs-toggle="tab" href="#%widgetId%WorkDone" data-init-cd="02">
												<span class="px-2" data-lang-cd="">작업 완료</span>
											</a>
										</li>
										<li class="nav-item">
											<a class="nav-link text-dark text-active-primary opacity-75 opacity-state-100" data-bs-toggle="tab" href="#%widgetId%WorkYet" data-init-cd="02">
												<span class="px-2" data-lang-cd="">작업 미완료</span>
											</a>
										</li>
									</ul>
									<div class="tab-content flex-grow-1 mt-4">
										<div class="tab-pane fade active show mb-0 osl-evt__work--tab-content" id="%widgetId%WorkDone" data-work-type="workDone">
											<div class="osl-mt-90 p-2 text-center">
												<img class="text-dark" src="/media/osl/no_data_img2.png" />
											</div>
										</div>
										<div class="tab-pane fade mb-0 osl-evt__work--tab-content" id="%widgetId%WorkYet" data-work-type="workYet">
											<div class="osl-mt-90 p-2 text-center">
												<img class="text-dark" src="/media/osl/no_data_img2.png" />
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					`,
					actionFn : function(){
						var widgetId = this.widgetId;
						var optionKey = this.optionKey;
						
						//대상 위젯
						var thisWidget = $(`.osl-evt__widget-item[gs-id="${widgetId}"]`);
						//위젯 설정 시 이벤트가 호출되면 안되기 때문에 실제 이벤트 지정될 영역
						var targetWidget = thisWidget.find(".osl-evt__widget-card .osl-evt__widget-card-body");
						
						//그리드스택
						var gridStackId = thisWidget.closest(".osl-evt__grid-stack-area").attr("id");
						var gridStack = widgetSettingGridStack[gridStackId];
						
						//위젯 세팅 시 정보 바로 보관해두기 위해서
						//현재 요청자
						//var usrId = $.osl.user.userInfo.usrId;
						
						//구분자
						var callId = this.callId;
						
						return {
							//새로고침 버튼 누르면 호출
							reload : function(){ 
								/**** 검색 조건 ****/
								//대시보드 검색조건 공통
								var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
								
								//위젯의 설정 값 추가
								$.each(optionKey, function(wgtOptKey, map){
									dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
								});
								
								//구분자
								dshSearchParams["callId"] = callId;
								
								
								/**** 조회 param 합치기 ****/
								//REQ00008 01 접수대기 02 처리중 03 반려 04 완료 05 결재반려후 종료 06 중간 종료
								dshSearchParams["baseGrp"] = "prjId";
								//dshSearchParams["reqUsrId"] = usrId;
								
								/**** 검색 조건 끝 ****/
								
								//AJAX 설정
								var ajaxObj = new $.osl.ajaxRequestAction(
										{"url":"/wgt/wgt1000/wgt1100/selectWgt1100WidgetReloadAjax.do", "async":"false"}
										,dshSearchParams);
								//AJAX 전송 성공 함수
								ajaxObj.setFnSuccess(function(data){
									//오류
									if(data.errorYn == "Y"){
										$.osl.alert(data.message,{type: 'error'});
										//모달 창 닫기
										$.osl.layerPopupClose();
									}
									//성공
									else{
										//데이터
										var workInfo = data.workInfo;
										
										//지시 - 완료
										var workEndCnt = workInfo["workEndCnt"];
										var workEndList = workInfo["workEndList"];
										//지시 - 미완료
										var workIngCnt = workInfo["workIngCnt"];
										var workIngList = workInfo["workIngList"];
										//담당 - 완료
										var workDoneCnt = workInfo["workDoneCnt"];
										var workDoneList = workInfo["workDoneList"];
										//담당 - 미완료
										var workYetCnt = workInfo["workYetCnt"];
										var workYetList = workInfo["workYetList"];
										
										var moreBtn = '';
										
										//각각 그리기
										//1. 지시 - 완료
										//목록이 10개 초과이면
										if(!$.osl.isNull(workEndCnt) && Number(workEndCnt) > 10) {
											//more 버튼 표출
											moreBtn = `
												<div class="rounded text-center osl-area-hover cursor-pointer px-2 py-1 mt-2 osl-evt__work-more-btn">
													<span class="" data-lang-cd="">more</span>
													<span class="svg-icon svg-icon-5">
														<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
															<rect opacity="0.5" x="18" y="13" width="13" height="2" rx="1" transform="rotate(-180 18 13)" fill="currentColor"></rect>
															<path d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z" fill="currentColor"></path>
														</svg>
													</span>
												</div>
											`;
										}
										
										//목록
										$("#"+widgetId+"MyDone").empty();
										if(!$.osl.isNull(workEndList) && workEndList.length > 0) {
											$.each(workEndList, function(rn, map){
												//내용 - 태그 존재하면 제거
												var workAdmContent = map["workAdmContent"].replace(/(<([^>]+)>)/ig, '');
												//혹시라도 태그 남아있는 경우를 위해
												workAdmContent = $.osl.escapeHtml(workAdmContent);
												
												//그리기
												var innerHtml = `
													<div class="d-flex flex-row flex-nowrap flex-stack rounded px-2 py-1 mb-1 bg-light-navy osl-area-hover-navy cursor-pointer osl-evt__work-req--view-btn" data-prj-id="${map.prjId}" data-req-id="${map.reqId}" data-process-id="${map.processId}" data-flow-id="${map.flowId}">
														<div class="mw-85">
															<div class="text-break text-truncate osl-word-break--keep-all">
																${workAdmContent}
															</div>
														</div>
														<div class="">
															<i class="fa fa-external-link-alt"></i>
														</div>
													</div>
												`;
												
												//내용 넣기
												$("#"+widgetId+"MyDone").append(innerHtml);
											});
											
											//더보기 버튼 넣기
											$("#"+widgetId+"MyDone").append(moreBtn);
										}
										//데이터 없으면
										else {
											$("#"+widgetId+"MyDone").append(`
												<div class="osl-mt-90 p-2 text-center">
													<img class="text-dark" src="/media/osl/no_data_img2.png" />
												</div>
											`);
										}
										
										//2. 지시 - 미완료
										//목록이 10개 초과이면
										if(!$.osl.isNull(workIngCnt) && Number(workIngCnt) > 10) {
											//more 버튼 표출
											moreBtn = `
												<div class="rounded text-center osl-area-hover cursor-pointer px-2 py-1 mt-2 osl-evt__work-more-btn">
													<span class="" data-lang-cd="">more</span>
													<span class="svg-icon svg-icon-5">
														<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
															<rect opacity="0.5" x="18" y="13" width="13" height="2" rx="1" transform="rotate(-180 18 13)" fill="currentColor"></rect>
															<path d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z" fill="currentColor"></path>
														</svg>
													</span>
												</div>
											`;
										}
										
										//목록
										$("#"+widgetId+"MyYet").empty();
										if(!$.osl.isNull(workIngList) && workIngList.length > 0) {
											$.each(workIngList, function(rn, map){
												//내용 - 태그 존재하면 제거
												var workAdmContent = map["workAdmContent"].replace(/(<([^>]+)>)/ig, '');
												//혹시라도 태그 남아있는 경우를 위해
												workAdmContent = $.osl.escapeHtml(workAdmContent);
												
												//그리기
												var innerHtml = `
													<div class="d-flex flex-row flex-nowrap flex-stack rounded px-2 py-1 mb-1 bg-light-navy osl-area-hover-navy cursor-pointer osl-evt__work-req--view-btn" data-prj-id="${map.prjId}" data-req-id="${map.reqId}" data-process-id="${map.processId}" data-flow-id="${map.flowId}">
														<div class="mw-85">
															<div class="text-break text-truncate osl-word-break--keep-all">
																${workAdmContent}
															</div>
														</div>
														<div class="">
															<i class="fa fa-external-link-alt"></i>
														</div>
													</div>
												`;
												
												//내용 넣기
												$("#"+widgetId+"MyYet").append(innerHtml);
											});
											
											//더보기 버튼 넣기
											$("#"+widgetId+"MyYet").append(moreBtn);
										}
										//데이터 없으면
										else {
											$("#"+widgetId+"MyYet").append(`
												<div class="osl-mt-90 p-2 text-center">
													<img class="text-dark" src="/media/osl/no_data_img2.png" />
												</div>
											`);
										}
										
										//3. 담당 - 완료
										//목록이 10개 초과이면
										if(!$.osl.isNull(workDoneCnt) && Number(workDoneCnt) > 10) {
											//more 버튼 표출
											moreBtn = `
												<div class="rounded text-center osl-area-hover cursor-pointer px-2 py-1 mt-2 osl-evt__work-more-btn">
													<span class="" data-lang-cd="">more</span>
													<span class="svg-icon svg-icon-5">
														<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
															<rect opacity="0.5" x="18" y="13" width="13" height="2" rx="1" transform="rotate(-180 18 13)" fill="currentColor"></rect>
															<path d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z" fill="currentColor"></path>
														</svg>
													</span>
												</div>
											`;
										}
										
										//목록
										$("#"+widgetId+"WorkDone").empty();
										if(!$.osl.isNull(workDoneList) && workDoneList.length > 0) {
											$.each(workDoneList, function(rn, map){
												//내용 - 태그 존재하면 제거
												var workAdmContent = map["workAdmContent"].replace(/(<([^>]+)>)/ig, '');
												//혹시라도 태그 남아있는 경우를 위해
												workAdmContent = $.osl.escapeHtml(workAdmContent);
												
												//그리기
												var innerHtml = `
													<div class="d-flex flex-row flex-nowrap flex-stack rounded px-2 py-1 mb-1 bg-light-navy osl-area-hover-navy cursor-pointer osl-evt__work-req--view-btn" data-prj-id="${map.prjId}" data-req-id="${map.reqId}" data-process-id="${map.processId}" data-flow-id="${map.flowId}">
														<div class="mw-85">
															<div class="text-break text-truncate osl-word-break--keep-all">
																${workAdmContent}
															</div>
														</div>
														<div class="">
															<i class="fa fa-external-link-alt"></i>
														</div>
													</div>
												`;
												
												//내용 넣기
												$("#"+widgetId+"WorkDone").append(innerHtml);
											});
											
											//더보기 버튼 넣기
											$("#"+widgetId+"WorkDone").append(moreBtn);
										}
										//데이터 없으면
										else {
											$("#"+widgetId+"WorkDone").append(`
												<div class="osl-mt-90 p-2 text-center">
													<img class="text-dark" src="/media/osl/no_data_img2.png" />
												</div>
											`);
										}
										
										//4. 담당 - 미완료
										if(!$.osl.isNull(workYetCnt) && Number(workYetCnt) > 10) {
											//more 버튼 표출
											moreBtn = `
												<div class="rounded text-center osl-area-hover cursor-pointer px-2 py-1 mt-2 osl-evt__work-more-btn">
													<span class="" data-lang-cd="">more</span>
													<span class="svg-icon svg-icon-5">
														<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
															<rect opacity="0.5" x="18" y="13" width="13" height="2" rx="1" transform="rotate(-180 18 13)" fill="currentColor"></rect>
															<path d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z" fill="currentColor"></path>
														</svg>
													</span>
												</div>
											`;
										}
										
										//목록
										$("#"+widgetId+"WorkYet").empty();
										if(!$.osl.isNull(workYetList) && workYetList.length > 0) {
											$.each(workYetList, function(rn, map){
												//내용 - 태그 존재하면 제거
												var workAdmContent = map["workAdmContent"].replace(/(<([^>]+)>)/ig, '');
												//혹시라도 태그 남아있는 경우를 위해
												workAdmContent = $.osl.escapeHtml(workAdmContent);
												
												//그리기
												var innerHtml = `
													<div class="d-flex flex-row flex-nowrap flex-stack rounded px-2 py-1 mb-1 bg-light-navy osl-area-hover-navy cursor-pointer osl-evt__work-req--view-btn" data-prj-id="${map.prjId}" data-req-id="${map.reqId}" data-process-id="${map.processId}" data-flow-id="${map.flowId}">
														<div class="mw-85">
															<div class="text-break text-truncate osl-word-break--keep-all">
																${workAdmContent}
															</div>
														</div>
														<div class="">
															<i class="fa fa-external-link-alt"></i>
														</div>
													</div>
												`;
												
												//내용 넣기
												$("#"+widgetId+"WorkYet").append(innerHtml);
											});
											
											//더보기 버튼 넣기
											$("#"+widgetId+"WorkYet").append(moreBtn);
										}
										//데이터 없으면
										else {
											$("#"+widgetId+"WorkYet").append(`
												<div class="osl-mt-90 p-2 text-center">
													<img class="text-dark" src="/media/osl/no_data_img2.png" />
												</div>
											`);
										}
									}
								});
								
								return ajaxObj.send();
							},
							init : function(){
								//조회
								var ajaxObj = this.reload();
								
								ajaxObj.done(function(){
									targetWidget.off("click");
									//더보기 버튼 클릭 시
									targetWidget.on("click", ".osl-evt__work-more-btn", function(){
										/**** 검색 조건 ****/
										//대시보드 검색조건 공통
										var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
										
										//위젯의 설정 값 추가
										$.each(optionKey, function(wgtOptKey, map){
											dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
										});
										
										//구분자
										dshSearchParams["callId"] = callId;
										
										/**** 조회 param 합치기 ****/
										dshSearchParams["baseGrp"] = "prjId";
										//dshSearchParams["reqUsrId"] = usrId;
										
										//타입 가져오기
										var workType = $(this).closest(".osl-evt__work--tab-content").data("work-type");
										var workTypeNm = "";
										if(workType == "workEnd"){
											workTypeNm = "지시 작업 종료";
										}
										else if(workType == "workIng"){
											workTypeNm = "지시 작업 진행중";
										}
										else if(workType == "workDone"){
											workTypeNm = "담당 작업 완료";
										}
										else if(workType == "workYet"){
											workTypeNm = "담당 작업 미완료";
										}
										
										//해당 타입 넣기
										dshSearchParams["workType"] = workType;
										
										/**** 검색 조건 끝 ****/
										
										var dataParam = {
												// 데이터 조회 URL
												url : "/wgt/wgt1000/wgt1100/selectWgt1100GetReqOpinionListByOpinionAjax.do",
												//조회 파라미터
												params : dshSearchParams,
												//데이터 테이블 & 팝업 옵션
												option : {
													showBtns : ["reqDetail"],
													submitBtnCd : false, // submit 버튼 표출 유무
												}
										};
										
										var data = {
												type : "list",
												reqType : "03", //작업
												currentIdKey : callId,
												dataParam : JSON.stringify(dataParam)
										};
										
										var options = {
												idKey: callId,
												modalTitle : "["+workTypeNm+"] 작업 목록",
												closeConfirm: false,
												autoHeight: true,
												modalSize: "xl",
												callback:[{
													targetId : "cmm6206ModalCallbackBtn",
													actionFn : function(thisObj){
														//모든 위젯 초기화
														gridStack.fnRefresh();
													}
												}]
										};
										
										$.osl.layerPopupOpen('/cmm/cmm6000/cmm6200/selectCmm6206View.do',data,options);
									});
									
									//담당 작업 row 클릭 시
									targetWidget.on("click", ".osl-evt__work-req--view-btn", function(){
										//해당 티켓 오픈
										var reqId = $(this).data("req-id");
										var processId = $(this).data("process-id");
										var flowId = $(this).data("flow-id");
										var prjId = $(this).data("prj-id");
										
										var data = {
												type:"detail",
												paramTplClsType:"02",
												paramPrjId: prjId,
												paramReqId: reqId,
												paramFlowId: flowId,
												paramProcessId: processId,
											};
										var options = {
												idKey: reqId,
												modalTitle: $.osl.lang("cmm6201.title.main.default"),
												closeConfirm: false,
												autoHeight:false,
												modalSize: 'fs',
												ftScrollUse: false,
											};
										$.osl.layerPopupOpen('/cmm/cmm6000/cmm6200/selectCmm6201View.do', data, options);
									});
								});
							}
						}
					}
				},
			},
			//소명
			"WGTREQA000000003" : {
				size: ["2X1", "2X2"],
				"2X1" : {
					//구분자
					callId : "ticketExplanatory",
					//boolean default false
					fullType : false,
					addFullTypeClass : "",
					//class
					cardClass : '',
					cardBodyClass : '',
					//string Y, N, D default N, card-title에 wgtGrpNm과 동시 표출 유무
					//Y - 동시 표출, N - wgtGrpNm만 표출, D - label 만 표출
					addLabel: "Y",
					//text
					label : `소명`,
					//class
					icon : `fas fa-exclamation-triangle`,
					//html
					toolbar : ``,
					//html
					content : `
						<div class="d-flex flex-column justify-content-around p-4 pt-2 w-100 h-100">
							<div class="point-label weak">
								<span data-lang-cd="">소명</span>
							</div>
							<div class="bg-light bg-opacity-75 rounded">
								<div class="d-flex flex-row flex-wrap gap-2 flex-stack point-text strong rounded px-2 py-1 min-h-35px">
									<div class="">
										<span data-lang-cd="">소명 요청</span>
									</div>
									<div class="d-flex flex-row flex-warp flex-grow-1 justify-content-end">
										<div class="badge badge-light-primary px-2 py-1 osl-area-hover-primary cursor-pointer me-2 osl-evt__ticket--explanatory-btn" data-explanatory-type="responseIng">
											<span class="me-2 text-primary" data-lang-cd="">대기</span>
											<span class="text-primary osl-evt__ticket--explanatory-ing-count">999+</span>
										</div>
										<div class="badge badge-light-success px-2 py-1 osl-area-hover-success cursor-pointer osl-evt__ticket--explanatory-btn" data-explanatory-type="responseEnd">
											<span class="me-2 text-success" data-lang-cd="">완료</span>
											<span class="text-success osl-evt__ticket--explanatory-end-count">999+</span>
										</div>
									</div>
								</div>
							</div>
							<div class="bg-light bg-opacity-75 rounded">
								<div class="d-flex flex-row flex-stack point-text strong rounded osl-area-hover-primary cursor-pointer px-2 py-1 min-h-35px osl-evt__ticket--explanatory-btn" data-explanatory-type="myExplanatory">
									<div class="">
										<span data-lang-cd="">소명 작성</span>
									</div>
									<div class="">
										<span class="osl-evt__ticket--explanatory-yet-count">999+</span>
									</div>
								</div>
							</div>
							<div class="bg-light bg-opacity-75 rounded">
								<div class="d-flex flex-row flex-wrap gap-2 flex-stack point-text strong rounded px-2 py-1 min-h-35px">
									<div class="">
										<span data-lang-cd="">소명 완료</span>
									</div>
									<div class="d-flex flex-row flex-warp flex-grow-1 justify-content-end">
										<div class="badge badge-light-danger px-2 py-1 osl-area-hover-danger cursor-pointer me-2 osl-evt__ticket--explanatory-btn" data-explanatory-type="explanatoryReject">
											<span class="me-2 text-danger" data-lang-cd="">반려</span>
											<span class="text-danger osl-evt__ticket--explanatory-reject-count">999+</span>
										</div>
										<div class="badge badge-light-success px-2 py-1 osl-area-hover-success cursor-pointer osl-evt__ticket--explanatory-btn" data-explanatory-type="explanatoryApprove">
											<span class="me-2 text-success" data-lang-cd="">승인</span>
											<span class="text-success osl-evt__ticket--explanatory-approve-count">999+</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					`,
					actionFn : function(){
						var widgetId = this.widgetId;
						var optionKey = this.optionKey;
						
						//대상 위젯
						var thisWidget = $(`.osl-evt__widget-item[gs-id="${widgetId}"]`);
						//위젯 설정 시 이벤트가 호출되면 안되기 때문에 실제 이벤트 지정될 영역
						var targetWidget = thisWidget.find(".osl-evt__widget-card .osl-evt__widget-card-body");
						
						//그리드스택
						var gridStackId = thisWidget.closest(".osl-evt__grid-stack-area").attr("id");
						var gridStack = widgetSettingGridStack[gridStackId];
						
						//위젯 세팅 시 정보 바로 보관해두기 위해서
						//현재 요청자
						//var usrId = $.osl.user.userInfo.usrId;
						//현재 요청자의 소명 권한 확인
						var authExpireChk = $.osl.user.usrAuthSet.authExpireChk;
						
						//구분자
						var callId = this.callId;
						
						return {
							//새로고침 버튼 누르면 호출
							reload : function(){ 
								/**** 검색 조건 ****/
								//대시보드 검색조건 공통
								var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
								
								//위젯의 설정 값 추가
								$.each(optionKey, function(wgtOptKey, map){
									dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
								});
								
								//구분자
								dshSearchParams["callId"] = callId;
								
								
								/**** 조회 param 합치기 ****/
								//REQ00008 01 접수대기 02 처리중 03 반려 04 완료 05 결재반려후 종료 06 중간 종료
								dshSearchParams["baseGrp"] = "prjId";
								//dshSearchParams["reqUsrId"] = usrId;
								
								/**** 검색 조건 끝 ****/
								
								//AJAX 설정
								var ajaxObj = new $.osl.ajaxRequestAction(
										{"url":"/wgt/wgt1000/wgt1100/selectWgt1100WidgetReloadAjax.do", "async":"false"}
										,dshSearchParams);
								//AJAX 전송 성공 함수
								ajaxObj.setFnSuccess(function(data){
									//오류
									if(data.errorYn == "Y"){
										$.osl.alert(data.message,{type: 'error'});
										//모달 창 닫기
										$.osl.layerPopupClose();
									}
									//성공
									else{
										//myEptReqCnt, myEptIngCnt, eptStayCnt, eptRejectCnt, eptApproveCnt 존재
										var ticketExplanatoryCnt = data.ticketExplanatoryCnt;
										
										//요청 대기
										var myEptReqCnt = ticketExplanatoryCnt["myEptReqCnt"];
										if(Number(myEptReqCnt) > 999) {
											myEptReqCnt = "999+";
										}else if($.osl.isNull(myEptReqCnt)){
											myEptReqCnt = 0;
										}
										//요청 완료
										var myEptIngCnt = ticketExplanatoryCnt["myEptIngCnt"];
										if(Number(myEptIngCnt) > 999) {
											myEptIngCnt = "999+";
										}
										else if($.osl.isNull(myEptIngCnt)){
											myEptIngCnt = 0;
										}
										//작성
										var eptStayCnt = ticketExplanatoryCnt["eptStayCnt"];
										if(Number(eptStayCnt) > 999) {
											eptStayCnt = "999+";
										}
										else if($.osl.isNull(eptStayCnt)){
											eptStayCnt = 0;
										}
										//반려
										var eptRejectCnt = ticketExplanatoryCnt["eptRejectCnt"];
										if(Number(eptRejectCnt) > 999) {
											eptRejectCnt = "999+";
										}
										else if($.osl.isNull(eptRejectCnt)){
											eptRejectCnt = 0;
										}
										//승인
										var eptApproveCnt = ticketExplanatoryCnt["eptApproveCnt"];
										if(Number(eptApproveCnt) > 999) {
											eptApproveCnt = "999+";
										}
										else if($.osl.isNull(eptApproveCnt)){
											eptApproveCnt = 0;
										}
										
										//값 넣기
										targetWidget.find(".osl-evt__ticket--explanatory-ing-count").text(myEptReqCnt);
										targetWidget.find(".osl-evt__ticket--explanatory-end-count").text(myEptIngCnt);
										targetWidget.find(".osl-evt__ticket--explanatory-yet-count").text(eptStayCnt);
										targetWidget.find(".osl-evt__ticket--explanatory-reject-count").text(eptRejectCnt);
										targetWidget.find(".osl-evt__ticket--explanatory-approve-count").text(eptApproveCnt);
									}
								});
								
								return ajaxObj.send();
							},
							init : function(){
								//조회
								var ajaxObj = this.reload();
								
								ajaxObj.done(function(){
									targetWidget.off("click").on("click", ".osl-evt__ticket--explanatory-btn", function(){
										/**** 검색 조건 ****/
										//대시보드 검색조건 공통
										var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
										
										//위젯의 설정 값 추가
										$.each(optionKey, function(wgtOptKey, map){
											dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
										});
										
										//구분자
										dshSearchParams["callId"] = callId;
										
										/**** 조회 param 합치기 ****/
										dshSearchParams["baseGrp"] = "prjId";
										//dshSearchParams["reqUsrId"] = usrId;
										
										//타입
										var explanatoryType = $(this).data("explanatory-type");
										var explanatoryTypeNm = "";
										if(explanatoryType == "responseIng"){
											explanatoryTypeNm = "소명 요청 대기";
										}
										else if(explanatoryType == "responseEnd"){
											explanatoryTypeNm = "소명 요청 완료";
										}
										else if(explanatoryType == "myExplanatory"){
											explanatoryTypeNm = "소명 작성";
										}
										else if(explanatoryType == "explanatoryReject"){
											explanatoryTypeNm = "소명 반려";
										}
										else if(explanatoryType == "explanatoryApprove"){
											explanatoryTypeNm = "소명 승인";
										}
										
										dshSearchParams["explanatoryType"] = explanatoryType;
										
										/**** 검색 조건 끝 ****/
										var dataParam = {
												// 데이터 조회 URL
												url : "/wgt/wgt1000/wgt1100/selectWgt1100GetExplanatoryListAjax.do",
												//조회 파라미터
												params : dshSearchParams,
												//데이터 테이블 & 팝업 옵션
												option : {
													showBtns : ["eptDetail"],
													submitBtnCd : false, // submit 버튼 표출 유무
												}
										};
										
										var data = {
												type : "list",
												reqType : "06", //소명
												currentIdKey : callId,
												dataParam : JSON.stringify(dataParam)
										};
										
										var options = {
												idKey: callId,
												modalTitle : "["+explanatoryTypeNm+"] 소명 목록",
												closeConfirm: false,
												autoHeight: true,
												modalSize: "xl",
												callback:[{
													targetId : "cmm6206ModalCallbackBtn",
													actionFn : function(thisObj){
														//모든 위젯 초기화
														gridStack.fnRefresh();
													}
												}]
										};
										
										$.osl.layerPopupOpen('/cmm/cmm6000/cmm6200/selectCmm6206View.do',data,options);
									});
								});
							}
						}
					}
				},
				"2X2" : {
					//구분자
					callId : "ticketExplanatoryList",
					//boolean default false
					fullType : false,
					addFullTypeClass : "",
					//class
					cardClass : '',
					cardBodyClass : '',
					//string Y, N, D default N, card-title에 wgtGrpNm과 동시 표출 유무
					//Y - 동시 표출, N - wgtGrpNm만 표출, D - label 만 표출
					addLabel: "Y",
					//text
					label : `소명`,
					//class
					icon : `fas fa-exclamation-triangle`,
					//html
					toolbar : ``,
					//html
					content : `
						<div class="d-flex flex-column justify-content-around h-100 mx-4">
							<div class="d-flex flex-row flex-wrap gap-2 flex-stack w-100 mt-2">
								<div class="point-label weak">
									<span data-lang-cd="">소명 요청</span>
								</div>
								<div class="d-flex flex-row flex-warp flex-grow-1 justify-content-end">
									<div class="badge badge-light-primary px-2 py-1 osl-area-hover-primary cursor-pointer me-2 osl-evt__ticket--explanatory-btn" data-explanatory-type="responseIng">
										<span class="me-2 text-primary" data-lang-cd="">대기</span>
										<span class="text-primary osl-evt__ticket--explanatory-ing-count">999+</span>
									</div>
									<div class="badge badge-light-success px-2 py-1 osl-area-hover-success cursor-pointer osl-evt__ticket--explanatory-btn" data-explanatory-type="responseEnd">
										<span class="me-2 text-success" data-lang-cd="">완료</span>
										<span class="text-success osl-evt__ticket--explanatory-end-count">999+</span>
									</div>
								</div>
							</div>
							<div class="separator pt-2 mb-2 opacity-50"></div>
							<div class="flex-grow-1 osl-evt__explanatory-my-list">
								<div class="p-2 point-text strong text-center">
									<span data-lang-cd="">소명해야할 목록이 표출됩니다.</span>
								</div>
							</div>
						</div>
					`,
					actionFn : function(){
						var widgetId = this.widgetId;
						var optionKey = this.optionKey;
						
						//대상 위젯
						var thisWidget = $(`.osl-evt__widget-item[gs-id="${widgetId}"]`);
						//위젯 설정 시 이벤트가 호출되면 안되기 때문에 실제 이벤트 지정될 영역
						var targetWidget = thisWidget.find(".osl-evt__widget-card .osl-evt__widget-card-body");
						
						//그리드스택
						var gridStackId = thisWidget.closest(".osl-evt__grid-stack-area").attr("id");
						var gridStack = widgetSettingGridStack[gridStackId];
						
						//위젯 세팅 시 정보 바로 보관해두기 위해서
						//현재 요청자
						//var usrId = $.osl.user.userInfo.usrId;
						
						//구분자
						var callId = this.callId;
						
						return {
							//새로고침 버튼 누르면 호출
							reload : function(){ 
								/**** 검색 조건 ****/
								//대시보드 검색조건 공통
								var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
								
								//위젯의 설정 값 추가
								$.each(optionKey, function(wgtOptKey, map){
									dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
								});
								
								//구분자
								dshSearchParams["callId"] = callId;
								
								
								/**** 조회 param 합치기 ****/
								//REQ00008 01 접수대기 02 처리중 03 반려 04 완료 05 결재반려후 종료 06 중간 종료
								dshSearchParams["baseGrp"] = "prjId";
								//dshSearchParams["reqUsrId"] = usrId;
								
								/**** 검색 조건 끝 ****/
								
								//AJAX 설정
								var ajaxObj = new $.osl.ajaxRequestAction(
										{"url":"/wgt/wgt1000/wgt1100/selectWgt1100WidgetReloadAjax.do", "async":"false"}
										,dshSearchParams);
								//AJAX 전송 성공 함수
								ajaxObj.setFnSuccess(function(data){
									//오류
									if(data.errorYn == "Y"){
										$.osl.alert(data.message,{type: 'error'});
										//모달 창 닫기
										$.osl.layerPopupClose();
									}
									//성공
									else{
										//myEptReqCnt, myEptIngCnt, eptStayCnt, eptRejectCnt, eptApproveCnt 존재
										var ticketExplanatoryCnt = data.ticketExplanatoryCnt;
										var eptInfo = data.eptInfo;
										
										//요청 대기
										var myEptReqCnt = ticketExplanatoryCnt["myEptReqCnt"];
										if(Number(myEptReqCnt) > 999) {
											myEptReqCnt = "999+";
										}
										else if($.osl.isNull(myEptReqCnt)){
											myEptReqCnt = 0;
										}
										//요청 완료
										var myEptIngCnt = ticketExplanatoryCnt["myEptIngCnt"];
										if(Number(myEptIngCnt) > 999) {
											myEptIngCnt = "999+";
										}
										else if($.osl.isNull(myEptIngCnt)){
											myEptIngCnt = 0;
										}
										//작성
										var eptStayCnt = ticketExplanatoryCnt["eptStayCnt"];
										if(Number(eptStayCnt) > 999) {
											eptStayCnt = "999+";
										}
										else if($.osl.isNull(eptStayCnt)){
											eptStayCnt = 0;
										}
										
										//값 넣기
										targetWidget.find(".osl-evt__ticket--explanatory-ing-count").text(myEptReqCnt);
										targetWidget.find(".osl-evt__ticket--explanatory-end-count").text(myEptIngCnt);
										
										//목록 그리기
										var list = eptInfo["eptStayList"];
										var listElem = targetWidget.find(".osl-evt__explanatory-my-list");
										listElem.empty();
										
										var moreBtn = '';
										
										//목록이 10개 초과이면
										if(!$.osl.isNull(ticketExplanatoryCnt["eptStayCnt"]) && Number(ticketExplanatoryCnt["eptStayCnt"]) > 10) {
											//more 버튼 표출
											moreBtn = `
												<div class="rounded text-center osl-area-hover cursor-pointer px-2 py-1 mt-2 osl-evt__explanatory-more-btn">
													<span class="" data-lang-cd="">more</span>
													<span class="svg-icon svg-icon-5">
														<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
															<rect opacity="0.5" x="18" y="13" width="13" height="2" rx="1" transform="rotate(-180 18 13)" fill="currentColor"></rect>
															<path d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z" fill="currentColor"></path>
														</svg>
													</span>
												</div>
											`;
										}
										
										//목록
										if(!$.osl.isNull(list) && list.length > 0) {
											$.each(list, function(rn, map){
												//제목 - 태그 존재하면 제거
												var reqEptNm = map["reqEptNm"].replace(/(<([^>]+)>)/ig, '');
												//혹시라도 태그 남아있는 경우를 위해
												reqEptNm = $.osl.escapeHtml(reqEptNm);
												
												//ord, 소명 상태 건지기
												var ords = map["ords"].split(",");
												var eptStsCds = map["eptStsCds"].split(",");
												var eptUsrIds = map["eptUsrIds"].split(",");
												
												//현재 로그인 사용자와 동일한 순번/소명상태 찾기
												var currentUsrIdx = eptUsrIds.indexOf(usrId);
												var currentUsrOrd = ords[currentUsrIdx];
												var currentUsrStsCd = eptStsCds[currentUsrIdx];
												
												//그리기
												var innerHtml = `
													<div class="d-flex flex-row flex-nowrap flex-stack rounded px-2 py-1 mb-1 bg-light-navy osl-area-hover-navy cursor-pointer osl-evt__explanatory--view-btn" data-prj-grp-id="${map.prjGrpId}" data-prj-id="${map.prjId}" data-ept-id="${map.eptId}" data-ord="${currentUsrOrd}" data-ept-sts-cd="${currentUsrStsCd}">
														<div class="mw-85">
															<div class="text-break text-truncate osl-word-break--keep-all">
																${reqEptNm}
															</div>
														</div>
														<div class="">
															<i class="fa fa-external-link-alt"></i>
														</div>
													</div>
												`;
												
												//내용 넣기
												listElem.append(innerHtml);
											});
											
											//더보기 버튼 넣기
											listElem.append(moreBtn);
										}
										//데이터 없으면
										else {
											listElem.append(`
												<div class="osl-mt-90 p-2 text-center">
													<img class="text-dark" src="/media/osl/no_data_img2.png" />
												</div>
											`);
										}
									}
								});
								
								return ajaxObj.send();
							},
							init : function(){
								//조회
								var ajaxObj = this.reload();
								
								ajaxObj.done(function(){
									targetWidget.off("click");
									targetWidget.on("click", ".osl-evt__ticket--explanatory-btn", function(){
										/**** 검색 조건 ****/
										//대시보드 검색조건 공통
										var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
										
										//위젯의 설정 값 추가
										$.each(optionKey, function(wgtOptKey, map){
											dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
										});
										
										//구분자
										dshSearchParams["callId"] = callId;
										
										/**** 조회 param 합치기 ****/
										dshSearchParams["baseGrp"] = "prjId";
										//dshSearchParams["reqUsrId"] = usrId;
										
										//타입
										var explanatoryType = $(this).data("explanatory-type");
										var explanatoryTypeNm = "";
										if(explanatoryType == "responseIng"){
											explanatoryTypeNm = "소명 요청 대기";
										}
										else if(explanatoryType == "responseEnd"){
											explanatoryTypeNm = "소명 요청 완료";
										}
										else if(explanatoryType == "myExplanatory"){
											explanatoryTypeNm = "소명 작성";
										}
										else if(explanatoryType == "explanatoryReject"){
											explanatoryTypeNm = "소명 반려";
										}
										else if(explanatoryType == "explanatoryApprove"){
											explanatoryTypeNm = "소명 승인";
										}
										
										dshSearchParams["explanatoryType"] = explanatoryType;
										
										/**** 검색 조건 끝 ****/
										
										var dataParam = {
												// 데이터 조회 URL
												url : "/wgt/wgt1000/wgt1100/selectWgt1100GetExplanatoryListAjax.do",
												//조회 파라미터
												params : dshSearchParams,
												//데이터 테이블 & 팝업 옵션
												option : {
													showBtns : ["eptDetail"],
													submitBtnCd : false, // submit 버튼 표출 유무
												}
										};
										
										var data = {
												type : "list",
												reqType : "06", //소명
												currentIdKey : callId,
												dataParam : JSON.stringify(dataParam)
										};
										
										var options = {
												idKey: callId,
												modalTitle : "["+explanatoryTypeNm+"] 소명 목록",
												closeConfirm: false,
												autoHeight: true,
												modalSize: "xl",
												callback:[{
													targetId : "cmm6206ModalCallbackBtn",
													actionFn : function(thisObj){
														//모든 위젯 초기화
														gridStack.fnRefresh();
													}
												}]
										};
										
										$.osl.layerPopupOpen('/cmm/cmm6000/cmm6200/selectCmm6206View.do',data,options);
									});
									
									//소명 row 클릭 시
									targetWidget.on("click", ".osl-evt__explanatory--view-btn", function(){
										//해당 티켓 오픈
										var prjGrpId = $(this).data("prj-grp-id");
										var prjId = $(this).data("prj-id");
										var eptId = $(this).data("ept-id");
										var ord = $(this).data("ord");
										var eptStsCd = $(this).data("ept-sts-cd");
										
										//입력 가능한 상태인지
										if(eptStsCd == "01" ){
											var data = {
													type : "update",
													paramPrjGrpId: prjGrpId,
													paramPrjId:prjId,
													paramEptId: eptId,
													paramOrd: ord
											};
											var options = {
													idKey: "prj5001",
													modalTitle: $.osl.lang("req4001.title.main.default"),
													autoHeight: false,
													closeConfirm: false,
													modalSize: 'fs',
													fitScreen:false,
											};
											$.osl.layerPopupOpen('/req/req4000/req4000/selectReq4001View.do',data,options);
										}else {
											var data = {
													type : "detail",
													paramPrjGrpId: prjGrpId,
													paramPrjId: prjId,
													paramEptId: eptId,
													paramOrd: ord
											};
											var options = {
													idKey: "prj5002",
													autoHeight: false,
													modalTitle: $.osl.lang("req4002.title.main.default"),
													closeConfirm: false,
													modalSize: 'fs',
													fitScreen:false,
												};
											$.osl.layerPopupOpen('/req/req4000/req4000/selectReq4002View.do',data,options);
										}
									});
								});
							}
						}
					}
				},
			},
		}
		//end : 보안 행정 + 이벤트
		//start : 소명 관리
		,"ept1000" : {
			//소명 관리
			"WGTEPT1000100001" : {
				size: ["4X1"],
				"4X1" : {
					//구분자
					callId : "ticketInOutExplanatory",
					//boolean default false
					fullType : false,
					addFullTypeClass : "",
					//class
					cardClass : '',
					cardBodyClass : '',
					//string Y, N, D default N, card-title에 wgtGrpNm과 동시 표출 유무
					//Y - 동시 표출, N - wgtGrpNm만 표출, D - label 만 표출
					addLabel: "N",
					//text
					label : `소명`,
					//class
					icon : `fas fa-exclamation-triangle`,
					//html
					toolbar : ``,
					//html
					content : `
						<div class="d-flex flex-column h-100 mx-4">
							<div class="d-flex flex-row flex-wrap flex-stack my-2">
								<div class="point-label weak">
									<span data-lang-cd="">내부 요청</span>
								</div>
								<div class="badge badge-light-primary px-2 py-1 osl-area-hover-primary cursor-pointer me-2 osl-evt__ticket--explanatory-btn" data-inout="in" data-explanatory-type="all">
									<span class="text-primary" data-lang-cd="">전체 보기</span>
								</div>
							</div>
							<div class="d-table table-layout-fixed w-100">
								<div class="d-table-cell align-middle px-2 rounded osl-area-hover cursor-pointer osl-evt__ticket--explanatory-btn" data-inout="in" data-explanatory-type="ing">
									<div class="d-flex flex-column justify-content-center position-relative">
										<div class="text-center mb-1 point-label weak osl-evt__in-explanatory--response-ing-count">
											999+
										</div>
										<div class="text-center position-absolute h-2px bottom-0 end-0 start-0 bg-info translate rounded"></div>
									</div>
									<div class="text-center point-text strong">
										요청
									</div>
								</div>
								<div class="d-table-cell align-middle px-2 rounded osl-area-hover cursor-pointer osl-evt__ticket--explanatory-btn" data-inout="in" data-explanatory-type="end">
									<div class="d-flex flex-column justify-content-center position-relative">
										<div class="text-center mb-1 point-label weak osl-evt__in-explanatory--response-end-count">
											999+
										</div>
										<div class="text-center position-absolute h-2px bottom-0 end-0 start-0 bg-primary translate rounded"></div>
									</div>
									<div class="text-center point-text strong">
										처리
									</div>
								</div>
								<div class="d-table-cell align-middle px-2 rounded osl-area-hover cursor-pointer osl-evt__ticket--explanatory-btn" data-inout="in" data-explanatory-type="over">
									<div class="d-flex flex-column justify-content-center position-relative">
										<div class="text-center mb-1 point-label weak osl-evt__in-explanatory--response-over-count">
											999+
										</div>
										<div class="text-center position-absolute h-2px bottom-0 end-0 start-0 bg-orange translate rounded"></div>
									</div>
									<div class="text-center point-text strong">
										만료
									</div>
								</div>
								<div class="d-table-cell align-middle px-2 rounded osl-area-hover cursor-pointer osl-evt__ticket--explanatory-btn" data-inout="in" data-explanatory-type="reject">
									<div class="d-flex flex-column justify-content-center position-relative">
										<div class="text-center mb-1 point-label weak osl-evt__in-explanatory--reject-count">
											999+
										</div>
										<div class="text-center position-absolute h-2px bottom-0 end-0 start-0 bg-danger translate rounded"></div>
									</div>
									<div class="text-center point-text strong">
										반려
									</div>
								</div>
								<div class="d-table-cell align-middle px-2 rounded osl-area-hover cursor-pointer osl-evt__ticket--explanatory-btn" data-inout="in" data-explanatory-type="approve">
									<div class="d-flex flex-column justify-content-center position-relative">
										<div class="text-center mb-1 point-label weak osl-evt__in-explanatory--approve-count">
											999+
										</div>
										<div class="text-center position-absolute h-2px bottom-0 end-0 start-0 bg-success translate rounded"></div>
									</div>
									<div class="text-center point-text strong">
										승인
									</div>
								</div>
							</div>
							<div class="d-flex flex-row flex-wrap flex-stack my-2">
								<div class="point-label weak">
									<span data-lang-cd="">외부 요청</span>
								</div>
								<div class="badge badge-light-primary px-2 py-1 osl-area-hover-primary cursor-pointer me-2 osl-evt__ticket--explanatory-btn" data-inout="out" data-explanatory-type="all">
									<span class="text-primary" data-lang-cd="">전체 보기</span>
								</div>
							</div>
							<div class="d-table table-layout-fixed w-100">
								<div class="d-table-cell align-middle px-2 rounded osl-area-hover cursor-pointer osl-evt__ticket--explanatory-btn" data-inout="out" data-explanatory-type="ing">
									<div class="d-flex flex-column justify-content-center position-relative">
										<div class="text-center mb-1 point-label weak osl-evt__out-explanatory--response-ing-count">
											999+
										</div>
										<div class="text-center position-absolute h-2px bottom-0 end-0 start-0 bg-info translate rounded"></div>
									</div>
									<div class="text-center point-text strong">
										요청
									</div>
								</div>
								<div class="d-table-cell align-middle px-2 rounded osl-area-hover cursor-pointer osl-evt__ticket--explanatory-btn" data-inout="out" data-explanatory-type="end">
									<div class="d-flex flex-column justify-content-center position-relative">
										<div class="text-center mb-1 point-label weak osl-evt__out-explanatory--response-end-count">
											999+
										</div>
										<div class="text-center position-absolute h-2px bottom-0 end-0 start-0 bg-primary translate rounded"></div>
									</div>
									<div class="text-center point-text strong">
										처리
									</div>
								</div>
								<div class="d-table-cell align-middle px-2 rounded osl-area-hover cursor-pointer osl-evt__ticket--explanatory-btn" data-inout="out" data-explanatory-type="over">
									<div class="d-flex flex-column justify-content-center position-relative">
										<div class="text-center mb-1 point-label weak osl-evt__out-explanatory--response-over-count">
											999+
										</div>
										<div class="text-center position-absolute h-2px bottom-0 end-0 start-0 bg-warning translate rounded"></div>
									</div>
									<div class="text-center point-text strong">
										만료
									</div>
								</div>
								<div class="d-table-cell align-middle px-2 rounded osl-area-hover cursor-pointer osl-evt__ticket--explanatory-btn" data-inout="out" data-explanatory-type="reject">
									<div class="d-flex flex-column justify-content-center position-relative">
										<div class="text-center mb-1 point-label weak osl-evt__out-explanatory--reject-count">
											999+
										</div>
										<div class="text-center position-absolute h-2px bottom-0 end-0 start-0 bg-danger translate rounded"></div>
									</div>
									<div class="text-center point-text strong">
										반려
									</div>
								</div>
								<div class="d-table-cell align-middle px-2 rounded osl-area-hover cursor-pointer osl-evt__ticket--explanatory-btn" data-inout="out" data-explanatory-type="approve">
									<div class="d-flex flex-column justify-content-center position-relative">
										<div class="text-center mb-1 point-label weak osl-evt__out-explanatory--approve-count">
											999+
										</div>
										<div class="text-center position-absolute h-2px bottom-0 end-0 start-0 bg-success translate rounded"></div>
									</div>
									<div class="text-center point-text strong">
										승인
									</div>
								</div>
							</div>
						</div>
					`,
					actionFn : function(){
						var widgetId = this.widgetId;
						var optionKey = this.optionKey;
						
						//대상 위젯
						var thisWidget = $(`.osl-evt__widget-item[gs-id="${widgetId}"]`);
						//위젯 설정 시 이벤트가 호출되면 안되기 때문에 실제 이벤트 지정될 영역
						var targetWidget = thisWidget.find(".osl-evt__widget-card .osl-evt__widget-card-body");
						
						//그리드스택
						var gridStackId = thisWidget.closest(".osl-evt__grid-stack-area").attr("id");
						var gridStack = widgetSettingGridStack[gridStackId];
						
						//위젯 세팅 시 정보 바로 보관해두기 위해서
						//현재 요청자
						//var usrId = $.osl.user.userInfo.usrId;
						
						//구분자
						var callId = this.callId;
						
						return {
							//새로고침 버튼 누르면 호출
							reload : function(){ 
								/**** 검색 조건 ****/
								//대시보드 검색조건 공통
								var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
								
								//위젯의 설정 값 추가
								$.each(optionKey, function(wgtOptKey, map){
									dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
								});
								
								//구분자
								dshSearchParams["callId"] = callId;
								
								
								/**** 조회 param 합치기 ****/
								dshSearchParams["baseGrp"] = "prjId";
								//dshSearchParams["reqUsrId"] = usrId;
								
								/**** 검색 조건 끝 ****/
								
								//AJAX 설정
								var ajaxObj = new $.osl.ajaxRequestAction(
										{"url":"/wgt/wgt1000/wgt1100/selectWgt1100WidgetReloadAjax.do", "async":"false"}
										,dshSearchParams);
								//AJAX 전송 성공 함수
								ajaxObj.setFnSuccess(function(data){
									//오류
									if(data.errorYn == "Y"){
										$.osl.alert(data.message,{type: 'error'});
										//모달 창 닫기
										$.osl.layerPopupClose();
									}
									//성공
									else{
										//inEptReqIngCnt, inEptReqEndCnt, inEptReqOverCnt, inEptRejectCnt, inEptApproveCnt 존재
										//outEptReqIngCnt, outEptReqEndCnt, outEptReqOverCnt, outEptRejectCnt, outEptApproveCnt 존재
										var ticketExplanatoryCnt = data.ticketExplanatoryCnt;
										
										var inEptReqIngCnt = Number(ticketExplanatoryCnt["inEptReqIngCnt"]);
										var inEptReqEndCnt = Number(ticketExplanatoryCnt["inEptReqEndCnt"]);
										var inEptReqOverCnt = Number(ticketExplanatoryCnt["inEptReqOverCnt"]);
										var inEptRejectCnt = Number(ticketExplanatoryCnt["inEptRejectCnt"]);
										var inEptApproveCnt = Number(ticketExplanatoryCnt["inEptApproveCnt"]);
										
										if(inEptReqIngCnt > 999) { 
											inEptReqIngCnt = "999+";
										}
										if(inEptReqEndCnt > 999) { 
											inEptReqEndCnt = "999+";
										}
										if(inEptReqOverCnt > 999) { 
											inEptReqOverCnt = "999+";
										}
										if(inEptRejectCnt > 999) { 
											inEptRejectCnt = "999+";
										}
										if(inEptApproveCnt > 999) { 
											inEptApproveCnt = "999+";
										}
										
										var outEptReqIngCnt = Number(ticketExplanatoryCnt["outEptReqIngCnt"]);
										var outEptReqEndCnt = Number(ticketExplanatoryCnt["outEptReqEndCnt"]);
										var outEptReqOverCnt = Number(ticketExplanatoryCnt["outEptReqOverCnt"]);
										var outEptRejectCnt = Number(ticketExplanatoryCnt["outEptRejectCnt"]);
										var outEptApproveCnt = Number(ticketExplanatoryCnt["outEptApproveCnt"]);
										
										if(outEptReqIngCnt > 999) { 
											outEptReqIngCnt = "999+";
										}
										if(outEptReqEndCnt > 999) { 
											outEptReqEndCnt = "999+";
										}
										if(outEptReqOverCnt > 999) { 
											outEptReqOverCnt = "999+";
										}
										if(outEptRejectCnt > 999) { 
											outEptRejectCnt = "999+";
										}
										if(outEptApproveCnt > 999) { 
											outEptApproveCnt = "999+";
										}
										
										//값 넣기
										targetWidget.find(".osl-evt__in-explanatory--response-ing-count").text(inEptReqIngCnt);
										targetWidget.find(".osl-evt__in-explanatory--response-end-count").text(inEptReqEndCnt);
										targetWidget.find(".osl-evt__in-explanatory--response-over-count").text(inEptReqOverCnt);
										targetWidget.find(".osl-evt__in-explanatory--reject-count").text(inEptRejectCnt);
										targetWidget.find(".osl-evt__in-explanatory--approve-count").text(inEptApproveCnt);
										targetWidget.find(".osl-evt__out-explanatory--response-ing-count").text(outEptReqIngCnt);
										targetWidget.find(".osl-evt__out-explanatory--response-end-count").text(outEptReqEndCnt);
										targetWidget.find(".osl-evt__out-explanatory--response-over-count").text(outEptReqOverCnt);
										targetWidget.find(".osl-evt__out-explanatory--reject-count").text(outEptRejectCnt);
										targetWidget.find(".osl-evt__out-explanatory--approve-count").text(outEptApproveCnt);
									}
								});
								
								return ajaxObj.send();
							},
							init : function(){
								//조회
								var ajaxObj = this.reload();
								
								ajaxObj.done(function(){
									targetWidget.off("click");
									//data-explanatory-type="approve"
									targetWidget.on("click", ".osl-evt__ticket--explanatory-btn", function(){
										/**** 검색 조건 ****/
										//대시보드 검색조건 공통
										var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
										
										//위젯의 설정 값 추가
										$.each(optionKey, function(wgtOptKey, map){
											dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
										});
										
										//구분자
										dshSearchParams["callId"] = callId;
										
										/**** 조회 param 합치기 ****/
										dshSearchParams["baseGrp"] = "prjId";
										//dshSearchParams["reqUsrId"] = usrId;
										
										//내외부 타입(in, out)
										var explanatoryInOut = $(this).data("inout");
										var inoutNm = "";
										if(explanatoryInOut == "in"){
											inoutNm = "내부";
										}
										else{
											inoutNm = "외부";
										}
										//타입(all, ing, end, over, reject, approve)
										var explanatoryType = $(this).data("explanatory-type");
										var explanatoryTypeNm = "";
										if(explanatoryType == "all"){
											explanatoryTypeNm = inoutNm;
										}
										else if(explanatoryType == "ing"){
											explanatoryTypeNm = inoutNm+" - 소명 요청 대기";
										}
										else if(explanatoryType == "end"){
											explanatoryTypeNm = inoutNm+" - 소명 요청 완료";
										}
										else if(explanatoryType == "over"){
											explanatoryTypeNm = inoutNm+" -소명 요청 만료";
										}
										else if(explanatoryType == "reject"){
											explanatoryTypeNm = inoutNm+" - 소명 반려";
										}
										else if(explanatoryType == "approve"){
											explanatoryTypeNm =inoutNm+" - 소명 승인";
										}
										
										dshSearchParams["explanatoryInOut"] = explanatoryInOut;
										dshSearchParams["explanatoryType"] = explanatoryType;
										
										/**** 검색 조건 끝 ****/
										
										var dataParam = {
												// 데이터 조회 URL
												url : "/wgt/wgt1000/wgt1100/selectWgt1100GetInOutExplanatoryListAjax.do",
												//조회 파라미터
												params : dshSearchParams,
												//데이터 테이블 & 팝업 옵션
												option : {
													showBtns : ["eptDetail"],
													submitBtnCd : false, // submit 버튼 표출 유무
												}
										};
										
										var data = {
												type : "list",
												reqType : "06", //소명
												currentIdKey : callId,
												dataParam : JSON.stringify(dataParam)
										};
										
										var options = {
												idKey: callId,
												modalTitle : "["+explanatoryTypeNm+"] 소명 목록",
												closeConfirm: false,
												autoHeight: true,
												modalSize: "xl",
												callback:[{
													targetId : "cmm6206ModalCallbackBtn",
													actionFn : function(thisObj){
														//모든 위젯 초기화
														gridStack.fnRefresh();
													}
												}]
										};
										
										$.osl.layerPopupOpen('/cmm/cmm6000/cmm6200/selectCmm6206View.do',data,options);
									});
								});
							}
						}
					}
				}
			},
			//소명 결재
			"WGTEPT1000100002" : {
				size: ["4X1"],
				"4X1" : {
					//구분자
					callId : "ticketExplanatorySign",
					//boolean default false
					fullType : false,
					addFullTypeClass : "",
					//class
					cardClass : '',
					cardBodyClass : '',
					//string Y, N, D default N, card-title에 wgtGrpNm과 동시 표출 유무
					//Y - 동시 표출, N - wgtGrpNm만 표출, D - label 만 표출
					addLabel: "N",
					//text
					label : `소명 결재`,
					//class
					icon : `fas fa-signature`,
					//html
					toolbar : ``,
					//html
					content : `
						<div class="d-table table-layout-fixed w-100 h-100">
							<div class="d-table-row">
								<div class="d-table-cell align-middle text-center rounded osl-area-hover cursor-pointer osl-evt__explanatory--sign-btn" data-ept-sign-type="ing">
									<div class="point-title weak osl-evt__explanatory--sign-ing-count">
										999+
									</div>
									<div class="">
										<span class="point-label weak" data-lang-cd="">
											결재 중
										</span>
									</div>
								</div>
								<div class="d-table-cell align-middle text-center rounded osl-area-hover cursor-pointer osl-evt__explanatory--sign-btn" data-ept-sign-type="current">
									<div class="point-title weak osl-evt__explanatory--sign-current-count">
										999+
									</div>
									<div class="">
										<span class="point-label weak" data-lang-cd="">
											대기
										</span>
									</div>
								</div>
							</div>
							<div class="d-table-row">
								<div class="d-table-cell align-middle text-center rounded osl-area-hover cursor-pointer osl-evt__explanatory--sign-btn" data-ept-sign-type="success">
									<div class="point-title weak osl-evt__explanatory--sign-success-count">
										999+
									</div>
									<div class="">
										<span class="point-label weak" data-lang-cd="">
											승인
										</span>
									</div>
								</div>
								<div class="d-table-cell align-middle text-center rounded osl-area-hover cursor-pointer osl-evt__explanatory--sign-btn" data-ept-sign-type="reject">
									<div class="point-title weak osl-evt__explanatory--sign-reject-count">
										999+
									</div>
									<div class="">
										<span class="point-label weak" data-lang-cd="">
											반려
										</span>
									</div>
								</div>
							</div>
						</div>
					`,
					actionFn : function(){
						var widgetId = this.widgetId;
						var optionKey = this.optionKey;
						
						//대상 위젯
						var thisWidget = $(`.osl-evt__widget-item[gs-id="${widgetId}"]`);
						//위젯 설정 시 이벤트가 호출되면 안되기 때문에 실제 이벤트 지정될 영역
						var targetWidget = thisWidget.find(".osl-evt__widget-card .osl-evt__widget-card-body");
						
						//그리드스택
						var gridStackId = thisWidget.closest(".osl-evt__grid-stack-area").attr("id");
						var gridStack = widgetSettingGridStack[gridStackId];
						
						//위젯 세팅 시 정보 바로 보관해두기 위해서
						//현재 요청자
						//var usrId = $.osl.user.userInfo.usrId;
						
						//구분자
						var callId = this.callId;
						
						return {
							//새로고침 버튼 누르면 호출
							reload : function(){ 
								/**** 검색 조건 ****/
								//대시보드 검색조건 공통
								var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
								
								//위젯의 설정 값 추가
								$.each(optionKey, function(wgtOptKey, map){
									dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
								});
								
								//구분자
								dshSearchParams["callId"] = callId;
								
								
								/**** 조회 param 합치기 ****/
								dshSearchParams["baseGrp"] = "prjId";
								//dshSearchParams["reqUsrId"] = usrId;
								
								/**** 검색 조건 끝 ****/
								
								//AJAX 설정
								var ajaxObj = new $.osl.ajaxRequestAction(
										{"url":"/wgt/wgt1000/wgt1100/selectWgt1100WidgetReloadAjax.do", "async":"false"}
										,dshSearchParams);
								//AJAX 전송 성공 함수
								ajaxObj.setFnSuccess(function(data){
									//오류
									if(data.errorYn == "Y"){
										$.osl.alert(data.message,{type: 'error'});
										//모달 창 닫기
										$.osl.layerPopupClose();
									}
									//성공
									else{
										//내가 기안자인 것 중 현재 결재 중인 것, 현재 결재 차례가 나인 것, 내가 기안자인 것 중 결재 승인된 것, 내가 기안자인 것 중 결재 반려된 것
										//signIngCnt, currentSignCnt, successSignCnt, rejectSignCnt 존재
										var explanatoryDraftingCnt = data.ticketDraftingCnt;
										
										var explanatorySignIngCnt = explanatoryDraftingCnt["signIngCnt"];
										if(Number(explanatorySignIngCnt) > 999){
											explanatorySignIngCnt = "999+";
										}
										var explanatoryCurrentSignCnt = explanatoryDraftingCnt["currentSignCnt"];
										if(Number(explanatoryCurrentSignCnt) > 999){
											explanatoryCurrentSignCnt = "999+";
										}
										var explanatorySuccessSignCnt = explanatoryDraftingCnt["successSignCnt"];
										if(Number(explanatorySuccessSignCnt) > 999){
											explanatorySuccessSignCnt = "999+";
										}
										var explanatoryRejectSignCnt = explanatoryDraftingCnt["rejectSignCnt"];
										if(Number(explanatoryRejectSignCnt) > 999){
											explanatoryRejectSignCnt = "999+";
										}
										
										//종합 갯수 표출
										targetWidget.find(".osl-evt__explanatory--sign-ing-count").text(explanatorySignIngCnt);
										targetWidget.find(".osl-evt__explanatory--sign-current-count").text(explanatoryCurrentSignCnt);
										targetWidget.find(".osl-evt__explanatory--sign-success-count").text(explanatorySuccessSignCnt);
										targetWidget.find(".osl-evt__explanatory--sign-reject-count").text(explanatoryRejectSignCnt);
									}
								});
								
								return ajaxObj.send();
							},
							init : function(){
								//조회
								var ajaxObj = this.reload();
								
								ajaxObj.done(function(){
									//위젯 자체 클릭 시 결재 팝업 표출
									targetWidget.off("click").on("click", ".osl-evt__explanatory--sign-btn", function(){
										/**** 검색 조건 ****/
										//대시보드 검색조건 공통
										var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
										
										//위젯의 설정 값 추가
										$.each(optionKey, function(wgtOptKey, map){
											dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
										});
										
										//구분자
										dshSearchParams["callId"] = callId;
										
										/**** 조회 param 합치기 ****/
										dshSearchParams["baseGrp"] = "prjId";
										//dshSearchParams["reqUsrId"] = usrId;
										
										//선택 값
										var signType = $(this).data("ept-sign-type");
										var signTypeNm = "";
										if(signType == "ing"){
											signTypeNm = "결재 중";
										}
										else if(signType == "current"){
											signTypeNm = "결재 대기";
										}
										else if(signType == "success"){
											signTypeNm = "결재 승인";
										}
										else if(signType == "reject"){
											signTypeNm = "결재 반려";
										}
										
										dshSearchParams["signType"] = signType;
										
										/**** 검색 조건 끝 ****/
										
										var dataParam = {
												// 데이터 조회 URL
												url : "/wgt/wgt1000/wgt1100/selectWgt1100ExplanatorySignListAjax.do",
												//조회 파라미터
												params : dshSearchParams,
												//데이터 테이블 & 팝업 옵션
												option : {
													showBtns : ["reqDetail"],
													submitBtnCd : false, // submit 버튼 표출 유무
												}
										};
										
										var data = {
												type : "list",
												reqType : "06", //소명
												currentIdKey : callId,
												dataParam : JSON.stringify(dataParam)
										};
										
										var options = {
												idKey: callId,
												modalTitle : "["+signTypeNm+"] 소명 목록",
												closeConfirm: false,
												autoHeight: true,
												modalSize: "xl",
												callback:[{
													targetId : "cmm6206ModalCallbackBtn",
													actionFn : function(thisObj){
														//모든 위젯 초기화
														gridStack.fnRefresh();
													}
												}]
										};
										
										$.osl.layerPopupOpen('/cmm/cmm6000/cmm6200/selectCmm6206View.do',data,options);
									});
								});
							}
						}
					}
				}
			},
		}//end : 소명 관리
		//start : 일정
		,"cld1000" : {
			//일정
			"WGTCLD1000100001" : {
				size: ["8X4"],
				"8X4" : {
					//구분자
					callId : "calendar",
					//boolean default false
					fullType : true,
					addFullTypeClass : "rounded",
					//class
					cardClass : '',
					cardBodyClass : 'p-4',
					//string Y, N, D default N, card-title에 wgtGrpNm과 동시 표출 유무
					//Y - 동시 표출, N - wgtGrpNm만 표출, D - label 만 표출
					addLabel: "N",
					//text
					label : `일정`,
					//class
					icon : `fa fa-calendar-plus`,
					//html
					toolbar : ``,
					//html
					content : `
					<div class="d-flex justify-content-between gap-2 h-100">
						<div class="w-25 rounded bg-light p-2 flex-grow-0">
							<div class="d-flex flex-row flex-wrap justify-content-around gap-2">
								<button type="button" class="btn btn-sm btn-primary flex-grow-1" id="%widgetId%CldRoadBtn" name="%widgetId%CldRoadBtn" title="조회" data-auth-button="select" data-title-lang-cd="usr1000.tooltip.select" data-bs-toggle="tooltip" data-bs-custom-class="tooltip-inverse" data-bs-dismiss="click" data-bs-placement="top">
									<i class="fa fa-list osl-me-4"></i><span data-lang-cd="usr1000.button.select">조회</span>
								</button>
								<button type="button" class="btn btn-sm btn-primary flex-grow-1" id="%widgetId%CldAddBtn" name="%widgetId%CldAddBtn" title="개인 일정 등록" data-auth-button="insert" data-title-lang-cd="usr1000.tooltip.usrCldInsert" data-bs-toggle="tooltip" data-bs-custom-class="tooltip-inverse" data-bs-dismiss="click" data-bs-placement="top" tabindex="2">
									<i class="fa fa-calendar-plus osl-me-4"></i><span data-lang-cd="usr1000.button.usrCldInsert">개인 일정 등록</span>
								</button>
							</div>
							<div class="separator my-2"></div>
							<div class="" id="%widgetId%TargetList"></div>
						</div>
						<div class="rounded bg-light p-2 flex-grow-1">
							<div class="" id="%widgetId%Calendar"></div>
						</div>
					</div>
					`,
					actionFn : function(){
						var widgetId = this.widgetId;
						var optionKey = this.optionKey;
						
						//대상 위젯
						var thisWidget = $(`.osl-evt__widget-item[gs-id="${widgetId}"]`);
						//위젯 설정 시 이벤트가 호출되면 안되기 때문에 실제 이벤트 지정될 영역
						var targetWidget = thisWidget.find(".osl-evt__widget-card .osl-evt__widget-card-body");
						
						//그리드스택
						var gridStackId = thisWidget.closest(".osl-evt__grid-stack-area").attr("id");
						var gridStack = widgetSettingGridStack[gridStackId];
						
						//위젯 세팅 시 정보 바로 보관해두기 위해서
						//현재 요청자
						var usrId = $.osl.user.userInfo.usrId;
						
						//구분자
						var callId = this.callId;
						
						/*** 캘린더 설정 및 이벤트를 위한 변수 선언 ***/
						//위젯에서 사용되는 일정(캘린더) 객체
						var calendarObj = null;
						
						//일정 대상 선택 해제 상태
						var searchCheckList = {};
						//일정 표출 시 show/hide 체크를 위한 hide 타겟
						var hideCheckList = [];
						//조회된 데이터
						var evtDataMap = {};
						
						//최초 - 체크박스 상태값에 맞춰 클릭 이벤트 시작/종료 체크
						var initChkSetting = false;
						
						//일정 목록을 그리기 위한 function
						/**
						 * function 명 : fnDrawCldList
						 * function  설명 : 일정 목록 html 폼을 반환하는 function
						 * @param json data
						 * ㄴ id : 아이디 지정 값
						 * ㄴ evtGrpId : 휴일, 프로젝트, 개인일정과 같은 이벤트 그룹
						 * ㄴ prjId : 대상 프로젝트 id
						 * ㄴ title : 표출 명, 툴팁 표출
						 **/
						var fnDrawCldList = function(data) {
							var id = data["id"];
							var evtGrpId = data["evtGrpId"];
							if($.osl.isNull(id)){
								id = evtGrpId;
							}
							
							//프로젝트 id
							var evtPrjId = data["prjId"];
							
							//그룹 체크박스
							var grpChkOpt = "data-check-type = 'A'";
							
							//휴일(01), 프로젝트(02), 개인일정(03) 으로 지정 (공통코드 아님)
							var evtGrpCd = "";
							var title = data["title"];
							//언어코드
							var titleLangCd = "";
							//아이콘
							var iconClass = "fa fa-calendar-alt";
							//패딩
							var paddingClass = "p-3";
							
							//휴일
							if(evtGrpId == "holiday"){
								evtGrpCd = "01";
								titleLangCd = "widget.cld.tooltip.holiday";
							}
							//프로젝트 아이디
							else if(evtPrjId.indexOf("PRJ") == 0 || evtPrjId.indexOf("GRP") == 0){
								evtGrpCd = "02";
								titleLangCd = "widget.cld.tooltip.project";
								 //프로젝트 그룹이면
								 if(evtPrjId.indexOf("GRP") == 0) {
									 grpChkOpt = "data-check-type = 'G'";
									 iconClass = "fa fa-box";
									 paddingClass = "px-3 py-1";
								 }
								 else {
									 iconClass = "fas fa-project-diagram";
									 paddingClass = "p-3 pt-1";
								 }
							}
							//개인
							else {
								evtGrpCd = "03";
								titleLangCd = "widget.cld.tooltip.usrCld";
							}
							
							if($.osl.isNull(title) && !$.osl.isNull(titleLangCd)){
								title = $.osl.lang(titleLangCd);
								if($.osl.isNull(title)) {
									title = "";
								}
							}
							
							//일정 조회를 위한 타겟 목록 html 생성
							//기본 체크 비활성화
							var innerHtml = `
								<div class="rounded ${paddingClass} mt-2 osl-evt__cld-target-info opacity-50">
									<div class="form-check form-check-custom">
										<input type="checkbox" class="osl-evt__cld-target-info--checkbox d-none" name="${id}" id="${id}" data-event-group-type="${evtGrpCd}" data-event-group-id="${evtGrpId}" data-event-prj-id="${evtPrjId}" ${grpChkOpt}>
										<label class="d-flex align-items-center text-truncate cursor-pointer w-100 osl-evt__cld-target-info--label" for="${id}">
											<i class="fa fa-eye-slash fs-2 osl-me-4 w-25px osl-evt__cld-eye-icon"></i>
											<i class="${iconClass} osl-me-4"></i>
											<span class="text-break text-truncate osl-word-break--keep-all w-100" data-auth-button="select" title="${title}" data-title-lang-cd="${titleLangCd}" data-bs-toggle="tooltip" data-bs-custom-class="tooltip-inverse" data-bs-dismiss="click" data-bs-placement="top">
												${title}
											</span>
										</label>
									</div>
								</div>
							`;
							return innerHtml;
						};
						
						/* *
						 * function 명 : fnInsCldChkList
						 * function 설명 : 일정 관리 조회 목록 체크박스 상태값 저장
						 * */
						var fnInsCldChkList = function(){
							var cldCheckListData = [];
							//모든 체크 리스트에 대한 상태값 확인
							$.each($("#"+widgetId+"TargetList").find(".osl-evt__cld-target-info--checkbox"), function(n, elem){
								cldCheckListData.push({
									cldMgCd : $(elem).data("event-group-type"),
									chkId : elem.id,
									chkCd : $(elem).is(":checked")
								});
							});
							
							var ajaxObj = new $.osl.ajaxRequestAction({
								"url":"/usr/usr1000/usr1000/insertCld1002CldCheckListAjax.do"
							},{
								"cldCheckListData":JSON.stringify(cldCheckListData)
							});
							
							ajaxObj.setFnSuccess(function(data){
								//에러발생
								if(data.errorYn == "Y"){
									$.osl.toastr(data.message);
									event.revert();
									return;
								}
								//성공시
								else{
									//저장 메세지
									//$.osl.toastr(data.message);
								}
							});
							
							//AJAX 전송
							ajaxObj.send();
						};
						
						/* *
						 * function 명 : fnSelCalendarList
						 * function 설명 : 선택된 데이터에 맞는 일정 목록 조회
						 * */
						var fnSelCalendarList = function(){
							var prjChkTF = false;
							var cldPrjSelected = [];
							var selPrjListElems = $(".osl-evt__cld-prj-grp-top:has([id*=GRP][checked]) .osl-evt__cld-prj-grp-content:has([id*=PRJ][checked])");
							if(selPrjListElems.length > 0) {
								prjChkTF = true;
								//선택된 프로젝트 대상 아이디 넣기
								$.each(selPrjListElems, function(n, elem){
									cldPrjSelected.push($(elem).find(".osl-evt__cld-target-info--checkbox").attr("id"));
								});
							}
							
							//하나라도 보이는 값이 존재하면
							if(searchCheckList["holiday"] || searchCheckList["usrCld"] || prjChkTF){
								//ajax 설정
								var ajaxObj = new $.osl.ajaxRequestAction({
									"url":"/usr/usr1000/usr1000/selectUsr1000CldEventListAjax.do"
									,"async": false
									,"cache":false
								}, {
									"holiday" : searchCheckList["holiday"]
									,"usrCld" : searchCheckList["usrCld"]
									,"cldPrjSelected" : cldPrjSelected
								});
								
								//ajax 전송 성공 함수
								ajaxObj.setFnSuccess(function(data){
									//실패
									if(data.errorYn == "Y"){
										$.osl.alert(data.message,{type: 'error'});
									}
									//성공
									else {
										//값 초기화
										//조회된 데이터
										evtDataMap = {};
										
										//휴일 목록
										var holiList = data.holiList;
										//개인 일정 목록 
										var usrCldList = data.usrCldList;
										//티켓 일정 목록
										var usrReqList = data.usrReqList;
										
										//휴일의 연도별 월별 데이터 분리
										if(!$.osl.isNull(holiList) && holiList.length > 0){
											$.each(holiList, function(idx, map){
												//휴일 데이터 연도,월 값
												var holiYearVal = new Date(map.holiStartDate).format("yyyy");
												var holiMonthVal = new Date(map.holiStartDate).format("MM");
												
												//연도 없는 경우 생성
												if(!evtDataMap.hasOwnProperty(holiYearVal)){
													evtDataMap[holiYearVal] = {};
												}
												//월 없는 경우 생성
												if(!evtDataMap[holiYearVal].hasOwnProperty(holiMonthVal)){
													evtDataMap[holiYearVal][holiMonthVal] = [];
												}
												//값 넣기
												evtDataMap[holiYearVal][holiMonthVal].push(map);
											});
										}
										//개인 일정의 연도별 월별 데이터 분리
										if(!$.osl.isNull(usrCldList) && usrCldList.length > 0){
											$.each(usrCldList, function(idx, map){
												//일정 데이터 연도,월 값
												var evtYearVal = new Date(map.evtStartDate).format("yyyy");
												var evtMonthVal = new Date(map.evtStartDate).format("MM");
												
												//연도 없는 경우 생성
												if(!evtDataMap.hasOwnProperty(evtYearVal)){
													evtDataMap[evtYearVal] = {};
												}
												//월 없는 경우 생성
												if(!evtDataMap[evtYearVal].hasOwnProperty(evtMonthVal)){
													evtDataMap[evtYearVal][evtMonthVal] = [];
												}
												//개인 일정 넣기
												evtDataMap[evtYearVal][evtMonthVal].push(map);
											});
										}
										//담당자의 프로젝트별 요구사항 연도별 월별 데이터 분리
										if(!$.osl.isNull(usrReqList) && usrReqList.length > 0){
											$.each(usrReqList, function(idx, map){
												var evtYearVal;
												var evtMonthVal;
												//티켓 수행이 완료되지 않은 경우
												//즉, 작업 종료 일자가 없는 경우
												if(map.reqEdDtm == null){
													//일정 데이터 연도,월 값
													evtYearVal = new Date(map.reqStDuDtm).format("yyyy");
													evtMonthVal = new Date(map.reqStDuDtm).format("MM");
												}
												//티켓 수행완료된 경우
												//즉, 작업 종료 일자가 있는 경우
												else{
													//일정 데이터 연도,월 값
													evtYearVal = new Date(map.reqStDtm).format("yyyy");
													evtMonthVal = new Date(map.reqStDtm).format("MM");
													
												}
												//연도 없는 경우 생성
												if(!evtDataMap.hasOwnProperty(evtYearVal)){
													evtDataMap[evtYearVal] = {};
												}
												//월 없는 경우 생성
												if(!evtDataMap[evtYearVal].hasOwnProperty(evtMonthVal)){
													evtDataMap[evtYearVal][evtMonthVal] = [];
												}
												//티켓 일정 넣기
												evtDataMap[evtYearVal][evtMonthVal].push(map);
											});
										}
									}
								});
								
								ajaxObj.send();
							}
						};
						
						/* *
						 * function 명 : fnEvtdayDataSetting
						 * function 설명 : 조회한 일정 캘린더에 셋팅
						 * */
						var fnEvtdayDataSetting = function(){
							//현재 기준 년도 월에서 -1 ~ +1 범위 데이터 구하기
							var currentDate = calendarObj.getDate();
							
							//전월 연도, 월
							var beforeYear = new Date(currentDate.getFullYear(), (currentDate.getMonth()-1)).format("yyyy");
							var beforeMonth = new Date(currentDate.getFullYear(), (currentDate.getMonth()-1)).format("MM");
							
							//현재 연도, 월
							var currentYear = currentDate.format("yyyy");
							var currentMonth = currentDate.format("MM");
							
							//다음월 연도, 월
							var afterYear = new Date(currentDate.getFullYear(), (currentDate.getMonth()+1)).format("yyyy");
							var afterMonth = new Date(currentDate.getFullYear(), (currentDate.getMonth()+1)).format("MM");

							var evtRangeData = [];
							
							//이미 데이터 추가되있는지 체크
							try{
								if(!$.osl.isNull(evtDataMap[beforeYear][beforeMonth]) ){ 
									//data 추가
									evtRangeData = evtRangeData.concat(evtDataMap[beforeYear][beforeMonth]);
								}
								if(!$.osl.isNull(evtDataMap[currentYear][currentMonth])){
									//data 추가
									evtRangeData = evtRangeData.concat(evtDataMap[currentYear][currentMonth]);
								}
								if(!$.osl.isNull(evtDataMap[afterYear][afterMonth]) ){
									//data 추가
									evtRangeData = evtRangeData.concat(evtDataMap[afterYear][afterMonth]);
								}
							}catch(e){
								//underined 오류 무시
							}
							
							//일정 전체 제거
					  		calendarObj.removeAllEvents();
							//이벤트에 등록될 데이터
							if(evtRangeData.length > 0){
								//티켓 시작 일자
								var reqEvtStartDate;
								//티켓 그룹 배열
								reqArray = {};
								//이벤트 마지막 loop
								var evtidx = evtRangeData.length-1;
								$.each(evtRangeData, function(idx, map){
									//calendar일정 "yyyy-MM-dd HH:mm"
									//시작 일자
									var evtStartFullDate = map.evtStartFullDate;
									//종료 일자
									var evtEndFullDate = map.evtEndFullDate;
									//전일 코드
									var evtAllDayCd = map.evtAllDayCd;
									//클래스명
									var classNames = "osl-common-calendar--not-time-view osl-evt__usr-calendar-event cursor-pointer";
									//이벤트명
									var evtNm = $.osl.escapeHtml(map.evtNm);
									//티켓 id
									var reqId;
									//전일은 기본적으로 false
									var allDay = false;
									//이벤트 배경 색
									var evtBgColor = map.evtBgColor;
									//이벤트 글씨 색
									var evtColor = map.evtColor;
									//이벤트 id
									var prjEvtId = map.prjEvtId;
									//이벤트 타입명
									var eventTypeNm = "event";
									//이벤트 설명
									var evtDesc = $.osl.escapeHtml(map.evtDesc);
									var editable = true;
									//휴일인경우 휴일데이터 변경
									if(map.evtType == "01"){
										evtStartFullDate = map.holiStartFullDate;
										evtEndFullDate = map.holiEndFullDate;
										evtAllDayCd = map.holiAllDayCd;
										classNames = "osl-evt__usr-holiday cursor-pointer";
										evtNm = "["+$.osl.lang("usr1000.label.holiday")+"] "+$.osl.escapeHtml(map.holiNm);
										evtDesc = $.osl.escapeHtml(map.holiDesc);
										evtBgColor = map.holiBgColor;
										evtColor = map.holiColor;
										prjEvtId = map.holiId;
										eventTypeNm = "holiday";
										editable = false;
									}
									
									//allDay인 경우 종료 일자 +1
									if(evtAllDayCd == "01"){
										evtEndFullDate = new Date(evtEndFullDate);
										evtEndFullDate = new Date(evtEndFullDate.setDate(evtEndFullDate.getDate()+1)).format("yyyy-MM-dd HH:mm");
										allDay = true;
									}
									//티켓 데이터인경우 수정 불가능
									if(map.evtType == "04"){
										evtNm = $.osl.escapeHtml(map.evtNm);
										reqId = map.reqId;
										editable = false;
										var start = new Date(evtStartFullDate);
										var end = new Date(evtEndFullDate);
										const dateArray = [];
									  	while (start <= end) {
									  		dateArray.push(start.format("yyyy-MM-dd"));
											start.setDate(start.getDate() + 1);
									 	}
										$.each(dateArray, function(idx, dateRange){
											if(!reqArray.hasOwnProperty(dateRange)){
												reqArray[dateRange] = [];
											}
											reqArray[dateRange].push(map);
											
										});  
									}
									//티켓이 아닌 경우만 calendar 이벤트 추가
									else{
										calendarObj.addEvent({
											title: evtNm
											, start: evtStartFullDate
											, end: evtEndFullDate
											, editable: false //캘린더 옵션 추가시 true로 변경 
											, allDay: allDay
											, classNames: classNames
											, backgroundColor: evtBgColor
											, borderColor: evtBgColor
											, textColor: evtColor
											, eventType: map.evtType
											, eventTypeNm: eventTypeNm
											, id: prjEvtId
											, usrId: map.usrId
											, prjId: map.prjId
											, prjGrpId: map.prjGrpId
											, reqId: reqId
											, evtDesc : evtDesc
										});
									}
									//티켓 그룹을 calendar 이벤트 추가
									//마지막 loop에서 같은 일정의 대표 티켓을 이벤트로 추가
									if(evtidx == idx){
										$.each(Object.getOwnPropertyNames(reqArray), function(idx, map){
											var reqCount = reqArray[map].length;
											evtNm = $.osl.escapeHtml(reqArray[map][0].evtNm);
											reqId = reqArray[map][0].reqId;
											editable = false;
											calendarObj.addEvent({
												title: "보안 티켓 ("+reqCount+")"
												, start: map
												, end: map //티켓은 시작시간과 종료시간을 동일하게 캘린더화 
												, editable: editable
												, allDay: false
												, classNames: "osl-common-calendar--not-time-view osl-evt__usr-calendar-event cursor-pointer"
												, backgroundColor: evtBgColor
												, borderColor: evtBgColor
												, textColor: evtColor
												, eventType: reqArray[map][0].evtType
												, eventTypeNm: "event"
												, id: reqId
												, usrId: reqArray[map][0].usrId
												, prjId: reqArray[map][0].prjId
												, prjGrpId: reqArray[map][0].prjGrpId
												, reqId: reqId
												, evtStartFullDate: reqArray[map][0].evtStartFullDate
											});
										});
									}
								});
							}
						};
						
						
						return {
							//새로고침 버튼 누르면 호출
							reload : function(){ 
								//대시보드 검색조건 공통
								var dshSearchParams = OSLCoreWidget.fnWidgetSearchParam(gridStackId);
								
								//위젯의 설정 값 추가
								$.each(optionKey, function(wgtOptKey, map){
									dshSearchParams[wgtOptKey] = map.wgtOptDefVal;
								});
								
								//구분자
								dshSearchParams["callId"] = callId;
								
								
								/**** 조회 param 합치기 ****/
								dshSearchParams["baseGrp"] = "prjId";
								//dshSearchParams["reqUsrId"] = usrId;
								//일정 관리 유형 CLD00001 01: 프로젝트 일정 관리, 02 마이페이지 개인 일정 관리, 03: 대시보드 개인 일정 관리
								dshSearchParams["cldMgCd"] = "03";
								
								/**** 검색 조건 끝 ****/
								
								//AJAX 설정
								var ajaxObj = new $.osl.ajaxRequestAction(
										{"url":"/wgt/wgt1000/wgt1100/selectWgt1100WidgetReloadAjax.do", "async":"false"}
										,dshSearchParams);
								//AJAX 전송 성공 함수
								ajaxObj.setFnSuccess(function(data){
									//오류
									if(data.errorYn == "Y"){
										$.osl.alert(data.message,{type: 'error'});
										//모달 창 닫기
										$.osl.layerPopupClose();
									}
									//성공
									else{
										//대상 목록 그리기
										$("#"+widgetId+"TargetList").empty();
										
										//일정 조회를 위한 체크 박스 상태 목록
										var cldMgCheckList = data.cldMgCheckList;
										//담당 티켓(처리중/완료)된 티켓이 존재한 프로젝트 목록
										var prjList = data.prjList;
										
										//체크 박스 폼 만들어 가져오기
										var jsonData = {
												id : "holiday",
												evtGrpId : "holiday",
												prjId : "holiday",
												title : "휴일"
										};
										//휴일
										$("#"+widgetId+"TargetList").append(fnDrawCldList(jsonData));
										
										jsonData = {
												id : "usrCld",
												evtGrpId : "usrCld",
												prjId : "usrCld",
												title : "개인 일정"
										};
										//개인 일정
										$("#"+widgetId+"TargetList").append(fnDrawCldList(jsonData));
										
										//프로젝트 그룹 껍데기 먼저 넣기
										var prevPrjGrpId = "";
										$.each(prjList, function(n, value){
											if(prevPrjGrpId != value.prjGrpId) {
												prevPrjGrpId = value.prjGrpId;
												
												jsonData = {
														id : value.prjGrpId,
														evtGrpId : value.prjGrpId,
														prjId : value.prjGrpId,
														title : $.osl.escapeHtml(value.prjGrpNm)
												};
												
												
												$("#"+widgetId+"TargetList").append(`
													<div class="w-100 border border-secondary rounded mh-xl-460px mh-lg-460px mh-md-460px mh-sm-100px overflow-h-scroll osl-evt__cld-prj-grp-top" data-prj-grp-id="${prevPrjGrpId}">
														${fnDrawCldList(jsonData)}
														<div class="separator border-secondary my-2 opacity-50"></div>
														<div class="ps-4 osl-evt__cld-prj-grp-content"></div>
													</div>
												`);
											}
										});
										
										//프로젝트 넣기
										$.each(prjList, function(n, value){
											jsonData = {
													id : value.prjId,
													evtGrpId : value.prjGrpId,
													prjId : value.prjId,
													title : $.osl.escapeHtml(value.prjNm)
											};
											
											$("#"+widgetId+"TargetList").find(".osl-evt__cld-prj-grp-top[data-prj-grp-id="+value.prjGrpId+"] .osl-evt__cld-prj-grp-content").append(fnDrawCldList(jsonData));
										});
										
										//최초 - 체크박스 상태값에 맞춰 클릭 이벤트 시작/종료 체크
										initChkSetting = true;
										
										//위젯의 선택 값 보관
										if(Object.keys(searchCheckList).length == 0){
											//일정에 대한 모든 체크 유무
											$.each(cldMgCheckList, function(n, value){
												//체크 박스 상태 변수
												var checked = false;
												//체크박스 id
												var targetId = value.chkId;
												
												if(value.chkCd == "01"){
													checked = true;
													
													//체크 활성화 상태로 만들기 위해 클릭
													$("#"+widgetId+"TargetList").find("#"+targetId).closest(".osl-evt__cld-target-info").click();
												}
												
												searchCheckList[targetId] = checked;
											});
										}
										
										initChkSetting = false;
										
										if(!initChkSetting) {
											//캘린더 재세팅
											//선택 값에 맞는 일정 목록 조회
											fnSelCalendarList();
											//조회하였으므로, 캘린더에 세팅
											fnEvtdayDataSetting();
										}
									}
								});
								
								return ajaxObj.send();
							},
							init : function(){
								//일정(캘린더) 위젯에서의 조회 버튼 클릭
								$("#"+widgetId+"CldRoadBtn").click(function(){
									
								});
								//일정(캘린더) 위젯에서의 개인 일정 등록 버튼 클릭
								$("#"+widgetId+"CldAddBtn").click(function(){
									
								});
								//일정(캘린더) 위젯에서의 대상 목록 클릭 이벤트
								$("#"+widgetId+"TargetList").off("click", ".osl-evt__cld-target-info").on("click", ".osl-evt__cld-target-info", function(e){
									e.preventDefault();
									
									//아이콘
									var iconElem = $(this).find(".osl-evt__cld-eye-icon");
									//체크박스
									var chkBoxElem = $(this).find(".osl-evt__cld-target-info--checkbox");
									
									//프로젝트 그룹이 체크된 것인지 확인
									var prjGrpChkTF = chkBoxElem.data("check-type") == "G" ? true : false;
									
									//활성화되어 있으면 비활성화로
									if(chkBoxElem.is(":checked")){
										//눈동자 선택 시 눈동자 슬래시로 변경
										iconElem.removeClass("fa fa-eye text-success").addClass("fa fa-eye-slash");
										//연하게 처리
										$(this).addClass('opacity-50');
										//체크 상태 업데이트
										searchCheckList[$(chkBoxElem).attr("id")] = false;
										
										//hide 목록에 추가
										if(hideCheckList.indexOf($(chkBoxElem).attr("id")) == -1){
											hideCheckList.push($(chkBoxElem).attr("id"));
										}
										
										//그룹이 비활성화 된 것이면, 내부 프로젝트 목록 연하게만 처리, hide 목록에 추가
										if(prjGrpChkTF) {
											var underPrjList = $(this).closest(".osl-evt__cld-prj-grp-top").find(".osl-evt__cld-prj-grp-content .osl-evt__cld-target-info");
											$.each(underPrjList, function(n, prjElem){
												var prjElemId = $(prjElem).find(".osl-evt__cld-target-info--checkbox").attr("id");
												if(hideCheckList.indexOf(prjElemId) == -1){
													hideCheckList.push(prjElemId);
												}
												
												//연하게 처리
												$(prjElem).addClass('opacity-50');
											});
										}
									}
									//비활성화되어 있으면 활성화로
									else{
										iconElem.removeClass("fa fa-eye-slash").addClass("fa fa-eye text-success");
										//연하게 처리된 것이 있다면 제거
										$(this).removeClass('opacity-50');
										//체크 상태 업데이트
										searchCheckList[$(chkBoxElem).attr("id")] = true;
										
										//hide 목록에서 제거
										if(hideCheckList.indexOf($(chkBoxElem).attr("id")) > -1){
											//배열 잘라내기
											hideCheckList.splice(hideCheckList.indexOf($(chkBoxElem).attr("id")), 1);
										}
										
										//그룹이 활성화 된 것이면, 내부 프로젝트 목록 연하게 처리한 것 해제, hide 목록에서 제거
										if(prjGrpChkTF) {
											var underPrjList = $(this).closest(".osl-evt__cld-prj-grp-top").find(".osl-evt__cld-prj-grp-content .osl-evt__cld-target-info");
											$.each(underPrjList, function(n, prjElem){
												var prjElemId = $(prjElem).find(".osl-evt__cld-target-info--checkbox").attr("id");
												//그룹 비활성화로 인해 hide 처리되었던 활성화되어 있던 프로젝트만
												if(hideCheckList.indexOf(prjElemId) > -1 && searchCheckList[prjElemId]){
													//배열 잘라내기
													hideCheckList.splice(hideCheckList.indexOf(prjElemId), 1);
													
													//연하게 처리한 것 제거
													$(prjElem).removeClass('opacity-50');
												}
											});
										}
									}
									
									chkBoxElem.attr("checked", searchCheckList[$(chkBoxElem).attr("id")]);
									
									//최초 세팅 이후 클릭 이벤트일 때
									//일정 관리 조회 목록 체크박스 상태 저장
									//체크 활성화 상태에 따라 데이터 표출
									if(!initChkSetting) {
										//일정 관리 조회 목록 체크박스 상태 저장
										fnInsCldChkList();
										
										//캘린더 재세팅
										//선택 값에 맞는 일정 목록 조회
										fnSelCalendarList();
										//조회하였으므로, 캘린더에 세팅
										fnEvtdayDataSetting();
									}
									
								});
								
								//캘린더 세팅
								calendarObj = new FullCalendar.Calendar($("#"+widgetId+"Calendar")[0], {
									//캘린더 상단
									headerToolbar:{
										//왼쪽 버튼 옵션(오늘 / 이전, 다음)
										start : 'today customPrevBtn,customNextBtn',
										//가운데 타이틀 표출
										center : 'title',
										//오른쪽 (월, 주, 일)
										end : 'dayGridMonth', //'dayGridMonth,timeGridWeek,timeGridDay'
									},
									//버튼 아이콘 스타일
									buttonIcons: {
										customPrevBtn:'fc-icon-chevron-left',
										customNextBtn:'fc-icon-chevron-right'
									},
									//캘린더 반응형
									handleWindowResize : true,
									//handleWindowResize 콜백
									windowResize : function(){
										var innerHeight = $(targetWidget).height() - 50;
										calendarObj.setOption('contentHeight', innerHeight);
										
										//크기 즉시 재조정
										calendarObj.updateSize();
										
									}, //반응형 콜백 함수 끝
									//콘텐츠 높이
									contentHeight: $(targetWidget).height() - 50,
									//종횡비
									aspectRatio : 4,
									//default : 오늘 날짜로 선언
									initialDate: new Date(),
									locale : $.osl.langCd,
									//timegrid의 이벤트가 보이는 최대 갯수
									eventMaxStack : 3,
									//일정 수정 가능 여부
									editable: false,
									//일정 출력 최대 개수
									dayMaxEventRows: true,
									//일 번호 클릭 시 타임라인으로
									navLinks: true,
									//드래그 일자 선택
									selectable: true,
									//현재시간표시
									nowIndicator: true,
									//버튼 동작 세팅
									customButtons: {
										//오늘 날짜 클릭 시
										today:{
											text: $.osl.lang("date.moment.calendar.sameDay"),
											click: function(){
												calendarObj.today();
												//이벤트 데이터를 캘린더에 셋팅
												fnEvtdayDataSetting();
											}
										},
										//이전 달 클릭 시
										customPrevBtn:{
											click: function(){
												calendarObj.prev();
												//이벤트 데이터를 캘린더에 셋팅
												fnEvtdayDataSetting();
											}
										},
										//다음 달 클릭 시
										customNextBtn:{
											click: function(){
												calendarObj.next();
												//이벤트 데이터를 캘린더에 셋팅
												fnEvtdayDataSetting();
											}
										},
										//월 클릭 시
										dayGridMonth:{
											text: $.osl.lang("date.range.month"),
											click: function(){
												calendarObj.changeView('dayGridMonth');
											}
										} 
									}, //버튼 동작 세팅 끝
									//view 동작 설정
									views : {
										dayGridMonth: {
											dayMaxEventRows: 3
										}
									}, //view 동작 설정 끝
									//날짜의 빈 공간 클릭 시 개인 일정 등록 팝업 표출
									select : function(info) {
										
									}, // 일정 등록 표출 끝
									//날짜의 일정 클릭 시 일정 정보 표출
									eventClick : function(info) {
										
									}, // 일정 상세 표출 끝
								});
								
								//캘린더 랜더링
								calendarObj.render();
								
								//조회
								var ajaxObj = this.reload();
								/*
								ajaxObj.done(function(){
									
								}); //ajaxDone 끝
								*/
							}
						}
					}
				}
			}
		}
		//end : 일정
		//start : 연동
		//TODO
		/*
		,"apiA000" : {
			
		}
		*/
		//end : 연동
	};
	
	// Params. widgetSettingGridStack - 대시보드 위젯 담아두는 객체
	let widgetSettingGridStack = {};
	
	// Params. widgetInfoMap - 위젯 별 정보 보관
	let widgetInfoMap = {};
	
	// Params. prevReiszeWidthRange - 반응형 체크를 위해 직전 width 범위 보관
	let prevReiszeWidthRange = null;
	
	// Conf3. rangeWidths - 반응형을 위한 default 범위
	const rangeWidths = [500, 783, 1025];
	
	
	// Conf4. resizeObserver - 대시보드 반응형을 위한 실시간 탐지 객체
	const resizeObserver = new ResizeObserver(function(element){
		try{
			var elem = $(element)[0];
			let gridstackId = elem.target.id;
			let gridstack = widgetSettingGridStack[gridstackId];
			
			//대상
			var targetElem = elem.contentRect;
			
			//반응형
			fnWidgetResize(targetElem, gridstack);
		}
		catch (err) {
			//오류 발생시 무시
			//console.log(err);
			return;
		}
	});
	
	// fn00. fnWidgetResize - 대시보드 위젯 반응형 function
	/* *
	 * function 명 : fnWidgetResize
	 * function 설명 : 대시보드 위젯 반응형 function
	 * 최초 호출시에도 사용되어야 하기 때문에 분리
	 * 
	 * params targetElem : 대상 객체
	 * params gridstack : 그리드 스택
	 * 
	 * */
	const fnWidgetResize = function(targetElem, gridstack){
		//해당 영역 너비
		var width = targetElem.width;
		
		//현재 영역 너비 범위
		var currentWidthRange = null;
		if(width >= rangeWidths[rangeWidths.length-1]){
			currentWidthRange = null;
		}else{
			$.each(rangeWidths, function(index, w){
				if(width < w) {
					currentWidthRange = index;
					//each 종료
					return false;
				}
			});
		}
		
		//이전 범위와 현재 범위 동일하면 중지
		if(prevReiszeWidthRange == currentWidthRange) {
			return false;
		}
		//동일하지 않으면 범위 변경
		else {
			var ratio = 1;
			//비율 - 필요시 css 수정 필요
			if (currentWidthRange == 0) {
				$(targetElem).addClass("grid-stack-1").removeClass("grid-stack-6 grid-stack-12");
				gridstack.column(1, "none");
			} else if(currentWidthRange == 1 || currentWidthRange == 2){
				$(targetElem).addClass("grid-stack-6").removeClass("grid-stack-1 grid-stack-12");
				gridstack.column(6, "compact");
			} else {
				$(targetElem).addClass("grid-stack-12").removeClass("grid-stack-1 grid-stack-6");
				gridstack.column(12, "none");
			}
			
			
			//이전 범위 정보 현재 정보로 변경
			prevReiszeWidthRange = currentWidthRange;
		}
	};
	
	
	// fn01. fnWidgetInit - 대시보드 위젯 셋팅
	/* *
	 * function 명 : fnWidgetInit
	 * function 설명 : 대시보드 위젯 셋팅
	 * 대시보드의 그리드 스택 영역 세팅 및 위젯 추가 시 발생되는 이벤트 적용
	 * 해당 영역의 반응형 제어 적용
	 * 
	 * param targetId : 대시보드 위젯이 세팅될 영역 id
	 * param type : view, setting (default view)
	 * */
	const fnWidgetInit = function(targetId, type){
		//이미 위젯이 존재하면 중지
		if(widgetSettingGridStack.hasOwnProperty(targetId)){
			return false;
		}
		
		var option = $.extend({}, defaultGridStackOpts);
		
		if($.osl.isNull(type)){
			type = "view";
		}
		
		//그리드 스택 세팅
		var gridStack = GridStack.init(option, "#"+targetId);
		//지정 옵션이 적용 안되는 경우가 있어 이후에 강제 저장
		$.extend(gridStack.opts, option);

		//설정 값 넣어두기
		gridStack["type"] = type;
		
		if(type != "setting"){
			gridStack.opts["disableResize"] = true;
			//위젯 사이즈 변경 불가
			gridStack.resizable('.osl-evt__widget-item', false);
		}
		
		//그리드 스택 이벤트
		//그리드 스택에 추가/수정되면
		gridStack.on("added change", function(evt, items){
			$.each(items, function(idx, item){
				//현재 아이템 아이디
				var itemId = item.id;
				
				var refWgtGrpId = $(item.el).data("ref-wgt-grp-id");
				var refWgtId = $(item.el).data("ref-wgt-id");
				var sizeStr = $(item.el).find(".osl-evt__widget-item-content").data("osl-widget-size");
				
				//위젯 정보 담아두기
				widgetInfoMap[itemId] = {
						"refWgtGrpId" : refWgtGrpId,
						"refWgtId" : refWgtId,
						"widgetId" : itemId,
						"sizeStr" : sizeStr,
						//옵션 정보 리스트
						"option" : OSLCoreWidgetSetting.fnGetWidgetDatas()["wgtObj"][refWgtId]["option"],
						//옵션 정보 맵 - key : 옵션 키
						"optionKey" : OSLCoreWidgetSetting.fnGetWidgetDatas()["wgtObj"][refWgtId]["optionKey"],
						"actionFn" : function(){
							return {
								init : $.noop,
								reload : $.noop
							}
						}
				};
				widgetInfoMap[itemId] = $.extend({}, widgetInfoMap[itemId], kindOfWidget[refWgtGrpId][refWgtId][sizeStr], kindOfWidget[refWgtGrpId][refWgtId][sizeStr]);
				
				//이벤트 호출
				//init 최초 실행
				widgetInfoMap[itemId].actionFn().init();
				
				//새로고침 연결
				$(item.el).find(".osl-evt__widget-refreah--btn").off("click").on("click", function(){
					widgetInfoMap[itemId].actionFn().reload();
				});
			});
		});
		/*
		//그리드 스택에서 수정되면
		gridStack.on("change", function(evt, items){
			$.each(items, function(idx, item){
				//현재 아이템 아이디
				var itemId = item.id;
				
				var refWgtGrpId = $(item.el).data("ref-wgt-grp-id");
				var refWgtId = $(item.el).data("ref-wgt-id");
				var sizeStr = $(item.el).find(".osl-evt__widget-item-content").data("osl-widget-size");
				
				//기존 위젯 정보 수정(덮어쓰기)
				widgetInfoMap[itemId] = {
						"refWgtGrpId" : refWgtGrpId,
						"refWgtId" : refWgtId,
						"widgetId" : itemId,
						"sizeStr" : sizeStr,
						//옵션 정보 리스트
						"option" : OSLCoreWidgetSetting.fnGetWidgetDatas()["wgtObj"][refWgtId]["option"],
						//옵션 정보 맵 - key : 옵션 키
						"optionKey" : OSLCoreWidgetSetting.fnGetWidgetDatas()["wgtObj"][refWgtId]["optionKey"],
						"actionFn" : function(){
							return {
								init : $.noop,
								reload : $.noop
							}
						}
				};
				widgetInfoMap[itemId] = $.extend({}, widgetInfoMap[itemId], kindOfWidget[refWgtGrpId][refWgtId][sizeStr], kindOfWidget[refWgtGrpId][refWgtId][sizeStr]);
			
			});
		});
		*/
		//그리드 스택에서 제거되면
		gridStack.on("removed", function(evt, items){
			$.each(items, function(idx, item){
				//현재 아이템 아이디
				var itemId = item.id;
				
				//기존 정보 제거
				delete widgetInfoMap[itemId];
			});
		});
		
		//그리드 스택 호출 페이지 명
		gridStack["callCurrentPage"] = $("#"+targetId).data("osl-current-page");
		
		//그리드 스택의 아이템 모두 재조회 function
		gridStack["fnRefresh"] = function(){
			//해당 영역에서 모든 새로고침 버튼 찾아 클릭
			$.each(widgetInfoMap, function(itemId, info){
				widgetInfoMap[itemId].actionFn().reload();
			});
		};

		//넣어두기
		widgetSettingGridStack[targetId] = gridStack;
		OSLCoreWidgetSetting.setDshGridStackObj(gridStack);
		
		//현재 너비 범위 미리 넣어두기
		var prevWidth = $("#"+targetId).width();
		if(prevWidth >= rangeWidths[rangeWidths.length-1]){
			prevReiszeWidthRange = null;
		}else{
			$.each(rangeWidths, function(index, width){
				if(prevWidth < width) {
					prevReiszeWidthRange = index;
					//each 종료
					return false;
				}
			});
		}
		
		if(prevReiszeWidthRange == 1 || prevReiszeWidthRange == 2){
			$("#"+targetId).addClass("grid-stack-6");
			gridStack.column(6, "moveScale");
		}
		
		//반응형을 위한 이벤트 지정
		//대시보드 위젯이 존재할 때만
		if(widgetSettingGridStack.hasOwnProperty(targetId)){
			//없으면 중지
			 if($.osl.isNull($("#"+targetId))){
				 return false;
			 }
			
			//해당 객체에 특정 감지 이벤트 생성
			resizeObserver.observe($("#"+targetId)[0]);
		}
	};
	
	// Params. widgetDatas - 위젯 데이터 정보(OSLCoreWidgetSetting에서 전달 받는다)
	let widgetDatas = OSLCoreWidgetSetting.fnGetWidgetDatas();
	
	
	// fn02. fnWidgetItemHtml - 위젯 그리기
	/* *
	 * function 명 : fnWidgetItemHtml
	 * function 설명 : 위젯 공통 폼 그리기
	 * param data : 위젯을 그리기 위한 정보 - wgtGrpId, wgtId
	 * param size : 그릴 위젯 사이즈(없으면 전체)
	 * return : html
	 * */
	const fnWidgetItemHtml = function(data, size){
		//위젯 정보
		var wgtGrpId = data["wgtGrpId"];
		var wgtId = data["wgtId"];
		var refWgtGrpId = data["refWgtGrpId"];
		var refWgtId = data["refWgtId"];
		if($.osl.isNull(refWgtGrpId)){
			refWgtGrpId = wgtGrpId;
		}
		if($.osl.isNull(refWgtId)){
			refWgtId = wgtId;
		}
		
		//없으면 중지
		if(!kindOfWidget.hasOwnProperty(refWgtGrpId)){
			return;
		}
		if(!kindOfWidget[refWgtGrpId].hasOwnProperty(refWgtId)){
			return;
		}
		
		//매칭
		var info = kindOfWidget[refWgtGrpId][refWgtId];
		
		//그릴 위젯 사이즈 배열로 보관
		var targetSize = [];
		
		//전달 받은 사이즈가 없으면, 모든 사이즈 위젯 그리기
		if($.osl.isNull(size)){
			targetSize = targetSize.concat(targetSize, info["size"]);
		}
		//전달 받은 사이즈가 있으면, 지정 사이즈 위젯 그리기
		else{
			targetSize.push(size);
		}
		
		var widgetItemHtml = '';
		
		$.each(targetSize, function(idx, sizeStr){
			//위젯 종류 값이 없으면 패스
			if(!info.hasOwnProperty(sizeStr)){
				return;
			}
			
			//매칭
			var map = info[sizeStr];
			
			var width = Number(sizeStr.split("X")[0]);
			var height = Number(sizeStr.split("X")[1]);
			//전달 받은 데이터에서 위치 정보 가져오기
			var xPoint = 0;
			var yPoint = 0;
			if(data.hasOwnProperty("wgtXPoint")){
				xPoint = data["wgtXPoint"];
			}
			if(data.hasOwnProperty("wgtYPoint")){
				yPoint = data["wgtYPoint"];
			}
			
			var itemId = wgtId; //위젯 아이디
			
			var fullClass = "";
			var fullType = false;
			if(map["fullType"]){
				fullType = true;
				fullClass = "w-100 h-100";
				
				if(map.hasOwnProperty("addFullTypeClass") && !$.osl.isNull(map["addFullTypeClass"])){
					fullClass += " "+map["addFullTypeClass"];
				}
			}
			
			var cardBodyClass = "";
			if(map.hasOwnProperty("cardBodyClass") && !$.osl.isNull(map["cardBodyClass"])){
				cardBodyClass = map["cardBodyClass"];
			}
			
			var title = widgetDatas["wgtObj"][refWgtId]["wgtGrpNm"];
			var addLabelType = map["addLabel"];
			if($.osl.isNull(addLabelType)){
				addLabelType = "N";
			}
			//동시 표출
			else if(addLabelType == "Y"){
				title += " "+map["label"];
			}
			//label만 표출
			else if(addLabelType == "D"){
				title = map["label"];
			}
			
			var icon = map["icon"];
			var toolbar = map["toolbar"];
			var content = map["content"];
			
			//%widgetId% 라 되어있는 부분 바꿔치기
			content = content.replaceAll("%widgetId%", itemId);
			
			var topHtml = `
				<div class="card-header min-h-35px h-35px align-items-center px-2">
					<div class="card-title fs-8">
						<i class="${icon} me-2"></i>
						<span>${title}</span>
					</div>
					<div class="card-toolbar fs-8">
						${toolbar}
						<i class="fas fa-sync-alt p-2 cursor-pointer text-hover-primary osl-evt__widget-refreah--btn"></i>
					</div>
				</div>
			`;
			
			//fullType이면 콘텐츠 영역만 표출하기 위해
			if(fullType){
				topHtml = "";
			}
			
			widgetItemHtml += `
				<div class="grid-stack-item osl-widget-item osl-evt__widget-item" gs-grp-id="${wgtGrpId}" gs-id="${itemId}" gs-w="${width}" gs-h="${height}" gs-x="${xPoint}" gs-y="${yPoint}" data-ref-wgt-grp-id="${refWgtGrpId}" data-ref-wgt-id="${refWgtId}">
					<div class="grid-stack-item-content osl-widget-item-content osl-evt__widget-item-content osl-p-2 h-100" data-osl-widget-size="${sizeStr}" data-osl-widget-x="${xPoint}" data-osl-widget-y="${yPoint}">
						<div class="card osl-widget-card osl-widget-handle w-100 h-100 m-0 p-0 osl-evt__widget-card osl-evt__widget-handle ${map["cardClass"]}">
							${topHtml}
							<div class="card-body osl-evt__widget-card-body p-0 ${fullClass} ${cardBodyClass}">
								${content}
							</div>
						</div>
					</div> 
				</div> 
			`;
		});
		
		return widgetItemHtml;
	};
	
	
	// fn03. fnSetWidgetItem - 위젯 추가(단건)
	/* *
	 * function 명 : fnSetWidgetItem
	 * function 설명 : 위젯 추가(단건)
	 * param targetId : 대상 그리드 스택 영역 id
	 * param elem : 추가될 위젯 객체
	 * */
	const fnSetWidgetItem = function(targetId, elem){
		//대상 그리드스택 오브젝트
		var gridStack = widgetSettingGridStack[targetId];
		//그리드 스택 적용
		if(!$.osl.isNull(gridStack)){
			var itemId = $(elem).attr("gs-id");
			var width = $(elem).attr("gs-w");
			var height = $(elem).attr("gs-h");
			
			var itemData = {
					id : itemId,
					w : width,
					h : height,
			};
			
			//타입 넣어두기
			//$(elem).data("widget-type", gridStack["type"]);
			
			gridStack.addWidget($(elem)[0], itemData);
		}
	};
	
	
	// fn04. fnSetWidgetItems - 위젯 추가(다건)
	/* *
	 * function 명 : fnSetWidgetItems
	 * function 설명 : 위젯 추가(다건)
	 * param targetId : 대상 그리드 스택 영역 id
	 * */
	const fnSetWidgetItems = function(targetId){
		//대상 그리드스택 오브젝트
		var gridStack = widgetSettingGridStack[targetId];
		//그리드 스택 적용
		if(!$.osl.isNull(gridStack)){
			$.each($("#"+targetId).find(".osl-evt__widget-item"), function(idx, item){
				var itemId = $(item).attr("gs-id");
				var width = $(item).attr("gs-w");
				var height = $(item).attr("gs-h");
				
				var itemData = {
						id : itemId,
						w : width,
						h : height,
				};
				
				//타입 넣어두기
				//$(item).data("widget-type", gridStack["type"]);
				
				gridStack.addWidget(item, itemData);
			});
		}
	};
	
	//Ajax1. fnGetDshWidgetList 사용 중인 대시보드 위젯 목록 가져오기
	/* *
	 * function 명 : fnGetDshWidgetList
	 * function 설명 : 사용 중인 대시보드 위젯 목록 조회
	 * 조회된 위젯을 대시보드에 표출하고, 해당 정보를 보관한다.
	 * param widgetAreaId: 대시보드 그리드 스택 영역 id
	 * param ajaxSuccessCallbackFn: ajax 위젯 조회 성공 후 동작할 function
	 * */
	const fnGetDshWidgetList = function(widgetAreaId, ajaxSuccessCallbackFn){
		//ajax 설정
		var ajaxObj = new $.osl.ajaxRequestAction({
			"url" : "/wgt/wgt1000/wgt1000/selectWgt1000GetDataListForUseWidgetListAjax.do",
			"loadingShow": false,
			"async": false,
		}, {});
		
		ajaxObj.setFnSuccess(function(data){
			if(data.errorYn == "Y"){
				$.osl.alert(data.message,{type: 'error'});
				
				//모달 창 닫기
				$.osl.layerPopupClose();
			}else{
				//세팅
				if(!$.osl.isNull(data.widgetList)){
					$.each(data.widgetList, function(n, info){
						//사이즈
						var sizeStr = info["wgtWidth"]+"X"+info["wgtHeight"];
						//해당 객체 사이즈에 대한 정보가 없으면 건너뛰기
						if(kindOfWidget[info.refWgtGrpId][info.refWgtId]["size"].indexOf(sizeStr) == -1){
							return true;
						}
						
						var html = fnWidgetItemHtml(info, sizeStr);
						
						var elem = $(html);
						var sizeW = Number(info["wgtWidth"]);
						var sizeH = Number(info["wgtHeight"]);
						
						$(elem).data("size", sizeStr);
						
						$("#"+widgetAreaId).append(elem);
						
						//위젯 추가 - 단건
						fnSetWidgetItem(widgetAreaId, $(elem)[0]);
					});
					
					//원본 정보 보관
					OSLCoreWidgetSetting.fnSetOriWidgetList(data.widgetList, data.widgetSettingList);
				}
				
				//콜백 함수 있는 경우 실행
				if(typeof ajaxSuccessCallbackFn == "function"){
					ajaxSuccessCallbackFn(data);
				}
			}
		});
		
		return ajaxObj.send();
	};
	
	return {
		init : function(type){
			//대시보드 위젯 영역 세팅
			var targetList = $("[data-osl-dashboard-widget=true]");
			$.each(targetList, function(idx, targetElem){
				var widgetAreaId = targetElem.id;
				
				if(!widgetSettingGridStack.hasOwnProperty(widgetAreaId)){
					//그리드 스택 세팅
					fnWidgetInit(widgetAreaId, type);
				}
				
				fnSetWidgetItems(widgetAreaId);
			});
		}
		//대시보드 위젯 실제 호출 및 적용 - 대시보드 jsp에서 직접 호출하여야 한다.
		,fnSetDashBoard : function(widgetAreaId){
			var ajaxObj = fnGetDshWidgetList(widgetAreaId);
			
			//반응형 최초 호출
			ajaxObj.done(function(){
				fnWidgetResize($("#"+widgetAreaId)[0], widgetSettingGridStack[widgetAreaId]);
			});
		}
		//호출 페이지에서 공통 검색 조건 값 가져오기
		,fnWidgetSearchParam : function(widgetAreaId){
			//호출 페이지
			var callCurrentPage = widgetSettingGridStack[widgetAreaId]["callCurrentPage"];
			var callCurrentPageFn = eval(callCurrentPage);
			return callCurrentPageFn.fnDeshSearchParam();
		}
		//전체 위젯 사이즈 반환
		,fnGetWidgetSize : function(){
			return widgetSize;
		}
		//지정 위젯의 위젯 사이즈 목록 반환
		,fnGetWidgetSizeList : function(wgtGrpId, wgtId){
			return kindOfWidget[wgtGrpId][wgtId]["size"];
		}
		//위젯 추가(단건)
		,fnSetWidgetItem : function(targetId, elem) {
			fnSetWidgetItem(targetId, elem);
		}
		//해당 위젯의 html 값 가져오기
		,fnGetWidgetItems : function(data, size, wgtId){
			try {
				if($.osl.isNull(data) || Object.keys(data).length == 0){
					data = widgetDatas["wgtObj"][wgtId];
				}
				
				return fnWidgetItemHtml(data, size);
			}
			catch (e) {
				return '';
			}
		}
		//위젯 설정 반환
		,fnGetKindOfWidget : function(){
			return kindOfWidget;
		}
		//TODO test용으로 남겨둠. 추후 제거 - 대시보드 그리드 스택 객체 반환
		,fnGetWidgetSettingGridStack : function(id){
			return widgetSettingGridStack[id];
		}
	};
}();