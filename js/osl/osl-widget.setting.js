/**
 * OSLCoreWidgetSetting
 * 위젯 추가,수정,삭제를 위한 설정 세팅
 * (OSLCoreWidget과 데이터 공유 필요)
 * 위젯 설정 세팅 창은 그리드스택을 사용하지 않는다.
 * 
 * @since 2024.02.20
 * @author 안지혜
 * @see
 * ---------------------------------------------------
 * 수정일시		|	수정자	|	내용
 * ---------------------------------------------------
 * 2024.02.20|	안지혜	|	최초작성
 * ---------------------------------------------------
 */
var OSLCoreWidgetSetting = function () {
	/* *
	 * Conf0. widgetCommonOptions - 공통 설정 정보
	 * Conf1. widgetOptions - 페이지 위젯 별 설정 정보
	 * 
	 * Params. widgetDatas - 위젯 데이터 정보
	 * Params. widgetAreaId - 대시보드 영역 아이디
	 * Params. dshGridStack - 대시보드 그리드 스택
	 * Params. oriDshGridStackItemSave - 위젯 원본 저장
	 * Params. 저장 전까지의 모든 설정 정보
	 * ㄴ oriWidgetList : 원본
	 * ㄴ addWidgetList : 신규
	 * ㄴ updWidgetList : 수정
	 * ㄴ delWidgetList : 삭제
	 * ㄴ allWidgetList : 전체
	 * 
	 * fn01. fnSaveWidgetItems - 현재 위젯 정보 보관
	 * fn02. initWidget - 대시보드 위젯 세팅
	 * fn03. fnFullShowWidgetContentArea - 대시보드 영역 전체화면으로 만들기
	 * fn04. fnShowWidgetSettingArea - 위젯 설정 영역 표출
	 * fn05. fnCmmKindOfWidget - 공통 osl-widget.js에서 항목에 맞춰 html가져오기
	 * fn06. fnSetOverlayInfo - 위젯 수정 시 표출 style
	 * fn07. fnWidgetSettingDatas - 위젯 설정 정보 보관/삭제
	 * fn08. fnGetWidgetSettingInfo - 설정 영역에서 정보 가져오기
	 * fn09. fnSetGridStackType - 대시보드 그리드 스택 타입 변경 및 타입에 따른 이동 상태 변경
	 * 
	 * Ajax1. fnSaveDashboardWidget - 대시보드 위젯 저장
	 * */
	
	// Conf0. widgetCommonOptions - 공통 설정 정보
	const widgetCommonOptions = [
		/*{ wgtSetNm: "위젯 제목", wgtSetDesc: "위젯 제목 설정", wgtOptTypeCd: "01", wgtOptKey: "title", wgtOptDefVal: ""},*/
		/* 
		* 위젯 크기의 wgtOptKey 변경 시 공통코드 타겟 체크 id 조건문 변경 필요
		* 수정 데이터 목록 생성 시 id 변경 필요
		* */
		{ wgtSetNm: "위젯 크기", wgtSetDesc: "위젯 크기 지정", wgtOptTypeCd: "02", wgtOptKey: "size", wgtOptCd: "DSH00007", wgtOptDefVal: ""}
	];
	
	// Conf1. widgetOptions - 페이지 위젯 별 설정 정보
	/* *
	 * TODO - 사용자의 권한에 따라 표출 위젯 제어 필요 - 어떻게 제어할지 설계 필요
	 * TODO - 신호등, 소명 등 일부 위젯에서 일반 사용자가 볼 수 있도록, 옵션 추가 필요(ex_ 내 요청서만 조회, 내가 현재 해야할 것만 조회 등)
	 * */
	let widgetOptions = {
			//위젯 그룹 id
			//보안 행정
			"req1000" : {
				//위젯 그룹 명
				wgtGrpNm : "보안행정",
				widget : [
					//신규 보안행정 신청서 등록 위젯
					{wgtId : "WGTREQ1000100001", wgtNm : "신청"}
					//보안행정 대기 위젯
					,{wgtId : "WGTREQ1000100002", wgtNm : "접수 대기"
						,option : [ //wgtSetId는 자동 생성
							{
								wgtSetNm : "내 요청서만 조회하기",
								wgtSetDesc : "예 : 내 요청서 중 접수 대기인 것만 조회하기<br/>아니오 : 접수 대기중인 모든 요청서 조회하기",
								wgtOptKey : "targetLoginUsr", //개발자 code key - 주의 : 해당 값이 변경되면 제거된 것으로 판단(로직 상 wgtSetId로 수정/삭제 체크 불가하기 때문)
								wgtOptTypeCd : "02", //위젯 설정 유형 코드 DSH00001 01텍스트 02 공통코드
								wgtOptCd : "CMM00001", //위젯 설정 정보 코드 - 공통코드
								wgtOptDefVal: "01", //위젯 설정 기본 값
							}
							,{wgtSetNm : "접수할 수 있는 요청서만 조회하기", wgtSetDesc : "나에게 접수 권한이 있을 때<br/>예 : 접수 대기인 것만 조회하기<br/>아니오 : 접수 대기중인 모든 요청서 조회하기", wgtOptKey : "authAcceptChk", wgtOptTypeCd : "02", wgtOptCd : "CMM00001", wgtOptDefVal: "02"}
						]
					}
					//보안행정 처리 위젯
					,{wgtId : "WGTREQ1000100003", wgtNm : "처리중"
						,option : [
							{wgtSetNm : "내 요청서만 조회하기", wgtSetDesc : "예 : 내 요청서 중 처리중인 것만 조회하기<br/>아니오 : 처리중인 모든 요청서 조회하기", wgtOptKey : "targetLoginUsr", wgtOptTypeCd : "02", wgtOptCd : "CMM00001", wgtOptDefVal: "01"}
							,{wgtSetNm : "처리할 수 있는 요청서만 조회하기", wgtSetDesc : "예 : 내가 처리 가능한 요청서만 조회하기<br/>아니오 : 처리중인 모든 요청서 조회하기", wgtOptKey : "authProgressChk", wgtOptTypeCd : "02", wgtOptCd : "CMM00001", wgtOptDefVal: "02"}
						]
					}
					//보안행정 완료 위젯
					,{wgtId : "WGTREQ1000100004", wgtNm : "완료"
						,option : [
							{wgtSetNm : "내 요청서만 조회하기", wgtSetDesc : "예 : 내 요청서 중 완료된 것만 조회하기<br/>아니오 : 완료된 모든 요청서 조회하기", wgtOptKey : "targetLoginUsr", wgtOptTypeCd : "02", wgtOptCd : "CMM00001", wgtOptDefVal: "01"}
							,{wgtSetNm : "내가 처리 완료한 요청서만 조회하기", wgtSetDesc : "예 : 내가 처리 완료한 요청서만 조회하기<br/>아니오 : 완료된 모든 요청서 조회하기", wgtOptKey : "usrFinTicket", wgtOptTypeCd : "02", wgtOptCd : "CMM00001", wgtOptDefVal: "02"}
						]
					}
					//보안행정 종료 위젯
					,{wgtId : "WGTREQ1000100005", wgtNm : "종료"
						,option : [
							{wgtSetNm : "내 요청서만 조회하기", wgtSetDesc : "예 : 내 요청서 중 종료된 것만 조회하기<br/>아니오 : 종료된 모든 요청서 조회하기", wgtOptKey : "targetLoginUsr", wgtOptTypeCd : "02", wgtOptCd : "CMM00001", wgtOptDefVal: "01"}
							,{wgtSetNm : "내가 종료한 요청서만 조회하기", wgtSetDesc : "예 : 내가 종료한 요청서만 조회하기<br/>아니오 : 종료된 모든 요청서 조회하기", wgtOptKey : "usrEndTicket", wgtOptTypeCd : "02", wgtOptCd : "CMM00001", wgtOptDefVal: "02"}
							,{wgtSetNm : "접수 반려 종료 표출", wgtSetDesc : "접수 반려 카운트 유무", wgtOptKey : "reqFinTypeRjtProgress", wgtOptTypeCd : "02", wgtOptCd : "CMM00001", wgtOptDefVal: "02"}
							,{wgtSetNm : "결재 반려 후 종료 표출", wgtSetDesc : "결재 반려 후 종료 카운트 유무", wgtOptKey : "reqFinTypeSignReject", wgtOptTypeCd : "02", wgtOptCd : "CMM00001", wgtOptDefVal: "01"}
							,{wgtSetNm : "중간 종료 표출", wgtSetDesc : "중간 종료 카운트 유무",wgtOptKey : "reqFinTypeStop", wgtOptTypeCd : "02", wgtOptCd : "CMM00001", wgtOptDefVal: "01"}
						]
					}
					//보안행정 전체 위젯
					,{wgtId : "WGTREQ1000100006", wgtNm : "전체"
						,option : [
							{wgtSetNm : "내 요청서만 조회하기", wgtSetDesc : "예 : 내 요청서만 조회하기<br/>아니오 : 모든 요청서 조회하기", wgtOptKey : "targetLoginUsr", wgtOptTypeCd : "02", wgtOptCd : "CMM00001", wgtOptDefVal: "01"}
						]
					}
					//보안행정 처리율 위젯
					,{wgtId : "WGTREQ1000100007", wgtNm : "처리 현황"
						,option : [
							{wgtSetNm : "내 요청서만 조회하기", wgtSetDesc : "예 : 내 요청서만 조회하기<br/>아니오 : 모든 요청서 조회하기", wgtOptKey : "targetLoginUsr", wgtOptTypeCd : "02", wgtOptCd : "CMM00001", wgtOptDefVal: "01"}
						]
					}
					//보안행정 신호등 위젯
					,{wgtId : "WGTREQ1000100008", wgtNm : "신호등"
						,option : [{wgtSetNm : "내가 처리 진행중/완료한 요청서만 조회하기", wgtSetDesc : "예 : 내가 처리 진행 또는 완료한 요청서만 조회하기<br/>아니오 : 처리 진행 중 또는 완료된 모든 요청서 조회하기", wgtOptKey : "usrChargerTicket", wgtOptTypeCd : "02", wgtOptCd : "CMM00001", wgtOptDefVal: "01"}]
					}
					//보안행정 결재 요청 및 대기
					,{wgtId : "WGTREQ1000100009", wgtNm : "결재 요청 및 대기"
						,option : []
					}
				], //end widget
			}
			/*
			//보안 이벤트
			,"req2000" : {
				//위젯 그룹 명
				wgtGrpNm : "보안이벤트",
				widget : [
					//신규 보안이벤트 신청서 등록 위젯
					{wgtId : "WGTREQ2000000001", wgtNm : "신청"}
					//보안이벤트 대기 위젯
					,{wgtId : "WGTREQ2000000002", wgtNm : "접수 대기"
						,option : [
							{wgtSetNm : "접수할 수 있는 요청서만 조회하기", wgtSetDesc : "나에게 접수 권한이 있을 때<br/>예 : 접수 대기인 것만 조회하기<br/>아니오 : 접수 대기중인 모든 요청서 조회하기", wgtOptKey : "authAcceptChk", wgtOptTypeCd : "02", wgtOptCd : "CMM00001", wgtOptDefVal: "02"}
						]
					}
					//보안이벤트 처리 위젯
					,{wgtId : "WGTREQ2000000003", wgtNm : "처리중"
						,option : [
							{wgtSetNm : "처리할 수 있는 요청서만 조회하기", wgtSetDesc : "예 : 내가 처리 가능한 요청서만 조회하기<br/>아니오 : 처리중인 모든 요청서 조회하기", wgtOptKey : "authProgressChk", wgtOptTypeCd : "02", wgtOptCd : "CMM00001", wgtOptDefVal: "02"}
						]
					}
					//보안이벤트 완료 위젯
					,{wgtId : "WGTREQ2000000004", wgtNm : "완료"
						,option : [
							{wgtSetNm : "내가 처리 완료한 요청서만 조회하기", wgtSetDesc : "예 : 내가 처리 완료한 요청서만 조회하기<br/>아니오 : 완료된 모든 요청서 조회하기", wgtOptKey : "usrFinTicket", wgtOptTypeCd : "02", wgtOptCd : "CMM00001", wgtOptDefVal: "02"}
						]
					}
					//보안이벤트 종료 위젯
					,{wgtId : "WGTREQ2000000005", wgtNm : "종료"
						,option : [
							{wgtSetNm : "내가 종료한 요청서만 조회하기", wgtSetDesc : "예 : 내가 종료한 요청서만 조회하기<br/>아니오 : 종료된 모든 요청서 조회하기", wgtOptKey : "usrEndTicket", wgtOptTypeCd : "02", wgtOptCd : "CMM00001", wgtOptDefVal: "02"}
							,{wgtSetNm : "접수 반려 종료 표출", wgtSetDesc : "접수 반려 카운트 유무", wgtOptKey : "reqFinTypeRjtProgress", wgtOptTypeCd : "02", wgtOptCd : "CMM00001", wgtOptDefVal: "02"}
							,{wgtSetNm : "결재 반려 후 종료 표출", wgtSetDesc : "결재 반려 후 종료 카운트 유무", wgtOptKey : "reqFinTypeSignReject", wgtOptTypeCd : "02", wgtOptCd : "CMM00001", wgtOptDefVal: "01"}
							,{wgtSetNm : "중간 종료 표출", wgtSetDesc : "중간 종료 카운트 유무",wgtOptKey : "reqFinTypeStop", wgtOptTypeCd : "02", wgtOptCd : "CMM00001", wgtOptDefVal: "01"}
						]
					}
					//보안이벤트 전체 위젯
					,{wgtId : "WGTREQ2000000006", wgtNm : "전체"
						,option : []
					}
					//보안이벤트 처리율 위젯
					,{wgtId : "WGTREQ2000000007", wgtNm : "처리 현황"
						,option : []
					}
					//보안이벤트 신호등 위젯
					,{wgtId : "WGTREQ2000000008", wgtNm : "신호등"
						,option : [
							{wgtSetNm : "내가 처리 진행중/완료한 요청서만 조회하기", wgtSetDesc : "예 : 내가 처리 진행 또는 완료한 요청서만 조회하기<br/>아니오 : 처리 진행 중 또는 완료된 모든 요청서 조회하기", wgtOptKey : "usrChargerTicket", wgtOptTypeCd : "02", wgtOptCd : "CMM00001", wgtOptDefVal: "01"}
						]
					}
					//보안이벤트 결재 요청 및 대기
					,{wgtId : "WGTREQ2000000009", wgtNm : "결재 요청 및 대기"
						,option : []
					}
					//보안이벤트 위험도별 이상징후 현황
					,{wgtId : "WGTREQ2000000010", wgtNm : "위험도별 이상징후 현황"
						,option : []
					}
					//보안이벤트 서버별 - 키워드별 이상징후 현황
					,{wgtId : "WGTREQ2000000011", wgtNm : "키워드별 이상징후 현황"
						,option : []
					}
				], //end widget
			}
			*/
			//보안 행정 및 이벤트 공통
			,"reqA000" :{
				//위젯 그룹 명
				wgtGrpNm : "티켓",
				widget : [
					//보안행정 의견 제시
					{wgtId : "WGTREQA000000001", wgtNm : "의견 제시"
						,option : []
					}
					//보안행정 담당 작업
					
					,{wgtId : "WGTREQA000000002", wgtNm : "담당 작업"
						,option : []
					}
					//소명 (업무)
					,{wgtId : "WGTREQA000000003", wgtNm : "소명"
						,option : []
					}
				]
			}
			//소명 관리
			,"ept1000" :{
				//위젯 그룹 명
				wgtGrpNm : "소명 관리",
				widget : [
					//소명 (관리)
					{wgtId : "WGTEPT1000100001", wgtNm : "소명 관리"
						,option : []
					}
					//소명 결재 (관리)
					,{wgtId : "WGTEPT1000100002", wgtNm : "소명 결재"
						,option : []
					}
				]
			}
			//캘린더
			,"cld1000" : {
				//위젯 그룹 명
				wgtGrpNm : "일정",
				widget : [
					//일정
					{wgtId : "WGTCLD1000100001", wgtNm : "일정"
						,option : []
					}
				]
			}
			
			//연동 api1000
	};
	
	//위젯 정보에 공통 값 추가
	$.each(Object.keys(widgetOptions), function(i, wgtGrpId){
		$.each(widgetOptions[wgtGrpId]["widget"], function(j, wgtInfo){
			if(!wgtInfo.hasOwnProperty("option")){
				wgtInfo["option"] = [];
			}
			wgtInfo["option"] = widgetCommonOptions.concat(wgtInfo["option"]);
			
			//순번 같이 넣어두기
			$.each(wgtInfo["option"], function(k, wgtOptInfo){
				wgtOptInfo["ord"] = k;
			});
		});
	});
	
	// Params. widgetDatas - 위젯 데이터 정보(가공되어 사용)
	// 대시보드 위젯 영역이 존재할 때, 해당 데이터가 없으면 가져와 세팅된다.
	let widgetDatas = {
			wgtGrpObj : {},
			wgtObj : {},
	};
	
	// Params. widgetAreaId - 위젯 추가, 저장 시 위젯 정보 전달할 영역 == 대시보드 영역 아이디
	var widgetAreaId = "";
	
	// Params. dshGridStack - 대시보드 그리드 스택
	//단건이라는 가정하에 진행
	var dshGridStack = null;
	
	// Params. oriDshGridStackItemSave - 위젯 원본 저장
	//위젯 저장하기 전까지의 원본 위젯 저장
	var oriDshGridStackItemSave = [];
	
	// fn01. fnSaveWidgetItems - 현재 위젯 정보 보관
	/* *
	 * function 명 : fnSaveWidgetItems
	 * function 설명 : 현재 위젯 정보 보관
	 * */
	const fnSaveWidgetItems = function(){
		oriDshGridStackItemSave = [];
		
		$.each(dshGridStack.getGridItems(), function(i, itemElem){
			oriDshGridStackItemSave.push(itemElem);
		});
	};
	
	// fn02. 대시보드 위젯 세팅
	/* *
	 * function 명 : initWidget
	 * function 설명 : 대시보드 위젯 설정을 위한 세팅
	 * */
	const initWidget = function(){
		//설정 영역이 단건이라는 가정하에 진행
		var dashboardElem = $("[data-osl-widget-setting]");
		
		//없으면 세팅 중지
		if($.osl.isNull(dashboardElem) || dashboardElem.length == 0) {
			//초기화
			dshGridStack = null;
			return;
		}
		
		//이미 세팅되어 있으면 중지
		if(dashboardElem.data("osl-dashboard-init") == true){
			return;
		}
		
		//타이머 관련 버튼
		var timerRefreshBtn = null;
		var timerRefreshBtnId = dashboardElem.data("osl-dashboard-timer-refresh-id");
		if(!$.osl.isNull(timerRefreshBtnId)){
			timerRefreshBtn = $("#"+timerRefreshBtnId);
		}
		var timerStopBtn = null;
		var timerStopBtnId = dashboardElem.data("osl-dashboard-timer-stop-id");
		if(!$.osl.isNull(timerStopBtnId)){
			timerStopBtn = $("#"+timerStopBtnId);
		}
		
		
		//위젯 추가, 저장 시 위젯 정보 전달할 영역 == 대시보드 영역 아이디
		widgetAreaId = dashboardElem.data("osl-widget-area-id");
		
		//설정창 세팅 여부
		var settingAreaTF = dashboardElem.data("osl-widget-setting");
		
		//설정창 동시 세팅일 때
		if(settingAreaTF) {
			//설정 영역 append / prepend
			var addedStr = dashboardElem.data("osl-widget-added-card");
			if($.osl.isNull(addedStr)){
				addedStr = "append";
			}
			
			//설정 토글 버튼
			var toggleBtnElemId = dashboardElem.data("osl-widget-toggle-id");
			var toggleBtnElem = $("#"+toggleBtnElemId);
			//토글 버튼 이벤트 추가
			toggleBtnElem.click(function(){
				if(!$.osl.isNull(timerStopBtn) && timerStopBtn.length > 0){
					//대시보드 타이머 중지
					timerStopBtn.click();
				}
				
				//화면 확장
				fnFullShowWidgetContentArea(true);
				
				//버튼 숨기기
				$(this).addClass("d-none");
				//위젯 세팅 영역 보이기
				$("#oslWidgetSettingForm").removeClass("d-none");
				
				//대시보드 그리드 스택 타입 변경 및 이동 가능
				fnSetGridStackType("update");
				
				//영역에 있는 위젯에도 overlay 적용
				$.each($("#"+widgetAreaId).find(".osl-evt__widget-item"), function(o, elem){
					//위젯 설정, 삭제를 위해 추가
					fnSetOverlayInfo(elem);
				});
			});
			
			
			//표출 class
			var dNoneClass = "d-none";
			if($.osl.isNull(toggleBtnElem) || toggleBtnElem.length == 0){
				dNoneClass = "";
			}
			
			//sticky width
			var stickyWidth = dashboardElem.data("osl-widget-width");
			
			var innerHtml = `
				<div class="card my-3 ${dNoneClass} osl-evt__widget-setting-card-div" id="oslWidgetSettingForm" data-target-id="${widgetAreaId}"
					data-osl-widget-toggle-id="${toggleBtnElemId}"
					data-kt-sticky="true" data-kt-sticky-name="oslWidgetSettingForm"
					data-kt-sticky-offset="{default: '50px'}" data-kt-sticky-width="${stickyWidth}"
					data-kt-sticky-left="auto" data-kt-sticky-top="0px"
					data-kt-sticky-animation="false" data-kt-sticky-zindex="95" >
				<div class="card-header align-items-center min-h-45px px-3">
					<div class="card-title">
						<h4 class="fw-bold">
							<i class="fa fa-th-large osl-me-4"></i>
							<span data-lang-cd="">위젯 목록</span>
						</h4>
						<div class="mx-4">
							<select class="form-select" id="oslWidgetListBox" name="oslWidgetListBox" data-control="select2"></select>
						</div>
					</div>
					<div class="card-toolbar gap-2">
						<button class="btn btn-sm btn-icon collapsible" type="button" data-bs-toggle="collapse" data-bs-target="#oslWidgetSettingFormBody" aria-expanded="false" data-osl-toggle="tooltip" data-bs-custom-class="tooltip-inverse" data-bs-placement="bottom" data-bs-dismiss="click" title="접기/펼치기">
							<i class="osl-icon osl-md osl-icon-chevronDown--black  rotate-180"></i>
						</button>
						<button class="btn btn-primary btn-icon p-2" id="oslWidgetSaveBtn" name="oslWidgetSaveBtn">
							<i class="fa fa-save"></i>
						</button>
						<button class="btn btn-danger btn-icon p-2"  id="oslWidgetCloseBtn" name="oslWidgetCloseBtn">
							<i class="fa fa-times"></i>
						</button>
					</div>
				</div>
				<div class="card-body p-3 collapse show" id="oslWidgetSettingFormBody">
					<div class="row">
						<div class="w-100 h-225px p-2 d-inline-flex align-items-center gap-2 rounded bg-light osl-widget-setting-area scroll-x" id="oslWidgetSettingItems">
							<!-- 가로 스크롤, 위젯 표출 -->
						</div>
						<div class="d-none col-xl-6 col-12" id="widgetSettingDataDiv">
							<div class="d-flex align-items-center justify-content-end gap-2" id="widgetSettingDataBtn">
								<button class="btn btn-primary btn-sm" id="oslWidgetAddBtn" name="oslWidgetAddBtn">
									<i class="fa fa-check osl-me-4"></i><span data-lang-cd="">추가</span>
								</button>
								<button class="btn btn-primary btn-sm d-none" id="oslWidgetRtnBtn" name="oslWidgetRtnBtn">
									<i class="fa fa-check osl-me-4"></i><span data-lang-cd="">반영</span>
								</button>
								<button class="btn btn-outline btn-point1 btn-sm" id="oslWidgetCancleBtn" name="oslWidgetCancleBtn">
									<i class="fa fa-times osl-me-4"></i><span data-lang-cd="">취소</span>
								</button>
							</div>
							<div class="osl-evt__widget-setting-list scroll-y" data-kt-scroll="true" data-kt-scroll-height="{default: '190px'}">
								위젯 클릭 시 설정 화면 표출
							</div>
						</div>
					</div>
				</div>
			</div>
			`;
			
			//넣기 전에 이미 존재하면 제거
			if(dashboardElem.find(".osl-evt__widget-setting-card-div").length > 0){
				dashboardElem.find(".osl-evt__widget-setting-card-div").remove();
			}
			
			//앞에 넣기
			if(addedStr == "prepend"){
				dashboardElem.prepend(innerHtml);
			}
			//뒤에 넣기
			else{
				dashboardElem.append(innerHtml);
			}
			
			//scroll init
			KTScroll.init();
			//sticky init
			KTSticky.init();
			
			//이벤트
			//위젯이 임시 추가 삭제될 때
			//위젯이 그리드스택에 추가된 후 수정(설정 변경) 클릭
			$("#"+widgetAreaId).on("click", ".osl-evt__widget-update-btn", function(){
				//대시보드 위젯 선택 효과 제거를 위해
				$("#"+widgetAreaId).find(".osl-evt__widget-item.active").removeClass("active");
				
				var targetElem = $(this).closest(".osl-evt__widget-item");
				
				var refWgtGrpId = targetElem.data("ref-wgt-grp-id");
				var refWgtId = targetElem.data("ref-wgt-id");
				var wgtGrpId = targetElem.attr("gs-grp-id");
				var wgtId = targetElem.attr("gs-id");
				
				//위젯 목록 select2 변경
				$("#oslWidgetListBox").val(refWgtId).trigger("change");
				
				//위젯 목록에서 동일 위젯 클릭
				var refTargetElem = $("#oslWidgetSettingItems .osl-evt__new-widget-item:not(.osl-evt__new-widget-item-sibling)[gs-grp-id="+refWgtGrpId+"][gs-id="+refWgtId+"]");
				//선택해야 하는 위젯이 아닌 다른 항목이 표출되어 있는 경우
				if(!refTargetElem.hasClass("selected")){
					//설정창 세팅
					fnShowWidgetSettingArea(true);
					//추가 버튼이 아닌 반영 버튼 보이기
					$("#oslWidgetAddBtn").addClass("d-none");
					$("#oslWidgetRtnBtn").removeClass("d-none");
				}
				//해당 위젯 클릭
				refTargetElem.click();
				
				//선택 대시보드 위젯 효과 추가
				targetElem.addClass("active");
				
				//현재 위젯 설정정보로 세팅
				var currentSettingInfo = $.extend({}, allWidgetList[wgtId], allWidgetList[wgtId]);
				
				if(currentSettingInfo.hasOwnProperty("wgtOptKeyList")){
					$.each(currentSettingInfo["wgtOptKeyList"], function(c, wgtOptKey){
						
						var elemTagName = $("#"+wgtOptKey)[0].tagName.toLowerCase();
						var elemVal = currentSettingInfo[wgtOptKey]["wgtOptDefVal"];
						
						if(wgtOptKey == "size"){
							//전체 위젯 사이즈
							var allWgtSizeList = [].concat(OSLCoreWidget.fnGetWidgetSize());
							//원본) 선택 위젯 크기
							var oriSizeStr = targetElem.find(".osl-evt__widget-item-content").data("osl-widget-size");
							var oriIndex = allWgtSizeList.indexOf(oriSizeStr);
							
							//공통코드로 변환
							elemVal = $.osl.numberPadding(oriIndex+1, 2);
						}
						
						if(elemTagName == "input"){
							$(".osl-evt__widget-setting-list #"+wgtOptKey).val(elemVal);
						}
						else if(elemTagName == "select"){
							//공통코드 세팅 후 조회되는 경우가 있기 때문에
							$(".osl-evt__widget-setting-list #"+wgtOptKey).data("osl-value", elemVal);
							$(".osl-evt__widget-setting-list #"+wgtOptKey).val(elemVal).trigger("change");
						}
					});
				}
				
				//설정창이 접기로 표출되어 있는 경우, 다시 펼치기
				if(!$("#oslWidgetSettingFormBody").hasClass("show")){
					$("#oslWidgetSettingForm").find("[data-bs-toggle=collapse]").click();
				}
			});
			
			//위젯이 그리드스택에 추가된 후 삭제 클릭
			$("#"+widgetAreaId).on("click", ".osl-evt__widget-remove-btn", function(){
				var targetElem = $(this).closest(".osl-evt__widget-item");
				
				//수정 활성화 상태에서 삭제 누른 경우
				if(targetElem.hasClass("active")){
					//현재 설정창 닫아야 하므로
					fnShowWidgetSettingArea(false);
				}
				
				//가지고 있는 변경 데이터에서 제거
				var gsId = $(targetElem).attr("gs-id");
				
				fnWidgetSettingDatas("delete", gsId, false);
			
				//그리드 스택에서 해당 위젯 제거
				dshGridStack.removeWidget($(targetElem)[0]);
				//영역에서 해당 객체 제거
				targetElem.remove();
			});
			
			//가로 스크롤 적용
			$("#oslWidgetSettingItems").on("mousewheel", function(e){
				if(this.scrollWidth > $(this).innerWidth()){
					//세로 스크롤로 전파 방지
					e.stopPropagation();
					e.preventDefault();
				}
				
				var wheelDelta = e.originalEvent.wheelDelta;
				if(wheelDelta > 0){
					$(this).scrollLeft(-wheelDelta + $(this).scrollLeft());
				}else{
					$(this).scrollLeft(-wheelDelta + $(this).scrollLeft());
				}
			});
			
			//위젯 추가 저장 버튼 클릭
			$("#oslWidgetSaveBtn").click(function(){
				var parentElem = $(this).closest(".osl-evt__widget-setting-card-div");
				var toggleBtnElem = $("#"+$(parentElem).data("osl-widget-toggle-id"));
				
				$(toggleBtnElem).removeClass("d-none");
				$("#oslWidgetSettingForm").addClass("d-none");
				
				//설정창 되돌리기
				fnShowWidgetSettingArea(false);
				
				//대시보드 그리드 스택 타입 변경 및 이동 불가
				fnSetGridStackType("view");
				
				//대시보드 그리드 스택 영역에서 위젯 설정, 삭제를 위해 추가한 것 제거
				$.each($("#"+widgetAreaId).find(".osl-evt__widget-item"), function(n, elem){
					var contentElem = $(elem).find(".osl-evt__widget-item-content");
					var handleElem = $(contentElem).find(".osl-evt__widget-handle");
					
					//클래스 제거
					$(handleElem).removeClass("overlay overflow-hidden");
					$(handleElem).find(">*:first-child").removeClass("overlay-wrapper");
					
					//객체 제거
					$(handleElem).find(".osl-evt__widget-hover").remove();
				});
				
				//대시보드 위젯을 선택한 것이 있다면 선택 효과 모두 제거
				$("#"+widgetAreaId).find(".osl-evt__widget-item").removeClass("active");
				
				//ajax
				var ajaxDone = fnSaveDashboardWidget(widgetAreaId);
				ajaxDone.done(function(){
					//화면 축소
					fnFullShowWidgetContentArea(false);
				});
			});
			
			//위젯 추가 닫기(취소) 버튼 클릭
			$("#oslWidgetCloseBtn").click(function(){
				var parentElem = $(this).closest(".osl-evt__widget-setting-card-div");
				var toggleBtnElem = $("#"+$(parentElem).data("osl-widget-toggle-id"));
				
				$(toggleBtnElem).removeClass("d-none");
				$("#oslWidgetSettingForm").addClass("d-none");
				
				//현재 위젯 정보로 재로드
				dshGridStack.load(oriDshGridStackItemSave);
				
				//설정창 되돌리기
				fnShowWidgetSettingArea(false);
				
				//대시보드 그리드 스택 타입 변경 및 이동 불가
				fnSetGridStackType("view");
				
				$("#"+widgetAreaId).data("osl-dashboard-type", dshGridStack["type"]);
				$("#"+widgetAreaId).attr("data-osl-dashboard-type", dshGridStack["type"]); //css 제어로 인해 attr로도 추가
				
				//대시보드 그리드 스택 영역에서 위젯 설정, 삭제를 위해 추가한 것 제거
				$.each($("#"+widgetAreaId).find(".osl-evt__widget-item"), function(n, elem){
					var contentElem = $(elem).find(".osl-evt__widget-item-content");
					var handleElem = $(contentElem).find(".osl-evt__widget-handle");
					
					//클래스 제거
					$(handleElem).removeClass("overlay overflow-hidden");
					$(handleElem).find(">*:first-child").removeClass("overlay-wrapper");
					
					//객체 제거
					$(handleElem).find(".osl-evt__widget-hover").remove();
				});
				
				//추가 설정 정보 모두 제거
				//신규 추가할 정보 제거
				fnWidgetSettingDatas("add", null, true);
				//수정된 사항있다면 정보 제거
				fnWidgetSettingDatas("update", null, true);
				//삭제된 사항 있다면 정보 제거
				fnWidgetSettingDatas("delete", null, true);
				
				//대시보드 위젯을 선택한 것이 있다면 선택 효과 모두 제거
				$("#"+widgetAreaId).find(".osl-evt__widget-item").removeClass("active");
				
				//화면 축소
				fnFullShowWidgetContentArea(false);
			});
			
			//위젯 설정의 취소 클릭
			$("#oslWidgetCancleBtn").click(function(){
				//설정창 되돌리기
				fnShowWidgetSettingArea(false);
				
				//위젯 설정의 추가 버튼 표출, 반영 버튼 숨기기
				$("#oslWidgetAddBtn").removeClass("d-none");
				$("#oslWidgetRtnBtn").addClass("d-none");
				
				//대시보드 위젯을 선택한 것이 있다면 선택 효과 모두 제거
				$("#"+widgetAreaId).find(".osl-evt__widget-item").removeClass("active");
			});
			
			//위젯 설정의 반영 클릭
			$("#oslWidgetRtnBtn").click(function(){
				var targetElem = $("#"+widgetAreaId).find(".osl-evt__widget-item.active");
				
				//해당 정보 생성
				var jsonObj = fnGetWidgetSettingInfo(targetElem);
				//원래 있던 정보이므로, 위젯 수정으로 업데이트
				fnWidgetSettingDatas("update", jsonObj, false);
				
				//대시보드 위젯을 선택한 것이 있다면 선택 효과 모두 제거
				targetElem.removeClass("active");
				
				//설정창 원래대로 되돌리기
				fnShowWidgetSettingArea(false);
			});
			
			//위젯 설정의 추가 클릭
			$("#oslWidgetAddBtn").click(function(){
				//현재 설정 정보 보관
				var that = $("#widgetSettingDataDiv .osl-evt__widget-setting-list");
				var wgtGrpId = that.data("wgt-grp-id");
				var wgtId = that.data("wgt-id");
				
				var sizeStr = $(".osl-evt__new-widget-item.selected").data("size");
				
				//위젯 속성
				var jsonObj = fnGetWidgetSettingInfo($(".osl-evt__new-widget-item.selected"));
				//위젯 신규 추가
				fnWidgetSettingDatas("add", jsonObj, false);
				
				//위젯 대시보드에 그리기
				var newWgtSetId = Object.keys(jsonObj)[0];
				
				//위젯 넣을 대상, 정보, 크기
				var data = jsonObj[newWgtSetId];
				
				//위젯 폼 가져오기
				//clone으로 안하고 직접 다시 만들어 가져오는 이유는 미리보기용 위젯과 실제 위젯 크기가 다르기 때문
				var html = OSLCoreWidget.fnGetWidgetItems(data, sizeStr, null);
				var elem =  $(html);
				
				//위젯 설정, 삭제를 위해 추가
				fnSetOverlayInfo(elem);
				
				//위젯 크기
				var sizeW = Number(sizeStr.split("X")[0]);
				var sizeH = Number(sizeStr.split("X")[1]);
				
				//신규 생성이므로 gs-id 변경
				$(elem).attr("gs-id", newWgtSetId);
				$(elem).addClass("osl-evt__new-widget-item");
				$(elem).data("size", sizeStr);
				$("#"+widgetAreaId).append(elem);
				
				//위젯 추가 - 단건
				//OSLCoreWidget.fnSetWidgetItem(widgetAreaId, $(elem)[0]);
				dshGridStack.addWidget($(elem)[0], {
					id : newWgtSetId,
					w : sizeW,
					h : sizeH,
					//빈 위치에 넣기
					autoPosition : true,
				});
				
				//설정창 되돌리기
				fnShowWidgetSettingArea(false);
			});
			
			//위젯 클릭 시
			$("#oslWidgetSettingItems").on("click", ".osl-evt__new-widget-item:not(.selected)", function(){
				//동일 위젯 클릭인지 확인
				if($(this).hasClass("selected")){
					//이미 클릭되어 있던 위젯이면
					return;
				}
				
				//설정창 변경
				fnShowWidgetSettingArea(true, this);
				
			});
		}// 설정창 동시 세팅일 때 끝
		
		
		//조회된 위젯 정보가 없다면
		if(Object.keys(widgetDatas["wgtGrpObj"]).length == 0 && Object.keys(widgetDatas["wgtObj"]).length == 0){
			//위젯 목록 가져오기 - 설정 데이터 조회
			//ajax 설정
			var ajaxObj = new $.osl.ajaxRequestAction({
				"url" : "/wgt/wgt1000/wgt1000/selectWgt1000GetDataListForWidgetSettingAjax.do",
				"loadingShow": false,
				"async": true, //동기
			}, {});
			
			ajaxObj.setFnSuccess(function(data){
				if(data.errorYn == "Y"){
					$.osl.alert(data.message,{type: 'error'});
					
					//모달 창 닫기
					$.osl.layerPopupClose();
				}else{
					//설정 데이터 조회되면
					//위젯 그룹
					var wgtGrpObj = {};
					//위젯
					var wgtObj = {};
					
					//가공
					$.each(data.widgetList, function(idx, wgtInfo){
						//그룹
						if($.osl.isNull(wgtInfo["wgtGrpId"]) || wgtInfo["wgtGrpId"] == wgtInfo["licGrpId"]){
							wgtGrpObj[wgtInfo["wgtId"]] = wgtInfo;
						}
						//위젯 세부
						else {
							wgtObj[wgtInfo["wgtId"]] = wgtInfo;
							wgtObj[wgtInfo["wgtId"]]["option"] = {};
							wgtObj[wgtInfo["wgtId"]]["optionKey"] = {};
						}
					});
					
					//위젯 세부 돌면서 공통으로 사용될 위젯 그룹 명도 넣어주기
					$.each(Object.keys(wgtObj), function(idx, wgtId){
						//위젯 그룹에서 명칭 가져와서 넣기
						wgtObj[wgtId]["wgtGrpNm"] = wgtGrpObj[wgtObj[wgtId]["wgtGrpId"]]["wgtNm"];
					});
					
					$.each(data.widgetSettingList, function(idx, wgtSetInfo){
						wgtObj[wgtSetInfo["wgtId"]]["option"][wgtSetInfo["wgtSetId"]] = wgtSetInfo;
						wgtObj[wgtSetInfo["wgtId"]]["optionKey"][wgtSetInfo["wgtOptKey"]] = wgtSetInfo;
					});
					
					widgetDatas["wgtGrpObj"] = wgtGrpObj;
					widgetDatas["wgtObj"] =  wgtObj;
					
					//osl-widget.js에서 항목에 맞춰 html가져오기
					fnCmmKindOfWidget();
				}
			});
			
			ajaxObj.send();
		}
		//조회된 위젯 정보가 존재하면
		else{
			//osl-widget.js에서 항목에 맞춰 html가져오기
			fnCmmKindOfWidget();
		}
		
		//세팅 후
		dashboardElem.data("osl-dashboard-init", true);
		
	};
	
	// fn03. fnFullShowWidgetContentArea - 대시보드 영역 전체화면으로 만들기
	/* *
	 * function 명 : fnFullShowWidgetContentArea
	 * function 설명 : 대시보드 영역 전체화면으로 만들기
	 * param show : true, false (default true)
	 * */
	var fnFullShowWidgetContentArea = function(show){
		if($.osl.isNull(show)){
			show = true;
		}
		
		//설정 영역이 단건이라는 가정하에 진행
		var dashboardElem = $("[data-osl-widget-setting=true]");
		//타이머 관련 버튼
		var timerRefreshBtn = null;
		var timerRefreshBtnId = dashboardElem.data("osl-dashboard-timer-refresh-id");
		if(!$.osl.isNull(timerRefreshBtnId)){
			timerRefreshBtn = $("#"+timerRefreshBtnId);
		}
		var timerStopBtn = null;
		var timerStopBtnId = dashboardElem.data("osl-dashboard-timer-stop-id");
		if(!$.osl.isNull(timerStopBtnId)){
			timerStopBtn = $("#"+timerStopBtnId);
		}
		
		if(show){
			//현재 위젯정보 보관
			fnSaveWidgetItems();
			
			//1. top, size, footer 숨기기
			$("#kt_app_header").hide();
			$("#kt_app_sidebar").hide();
			$("#oslAppFooter").hide();
			//2. 콘텐츠 영역 확장
			$("#kt_app_wrapper").attr("style","margin : 0px !important;");
			//3. 타이머, 기간, 부서 등 헤더 카드 숨기기
			$(".osl-evt__dsh-card--top").hide();
			//4. 타이머 중지
			if(!$.osl.isNull(timerStopBtn) && timerStopBtn.length > 0){
				//대시보드 타이머 중지
				timerStopBtn.click();
			}
		}else{
			//1. top, size, footer 보이기
			$("#kt_app_header").show();
			$("#kt_app_sidebar").show();
			$("#oslAppFooter").show();
			//2. 콘텐츠 영역 확장
			$("#kt_app_wrapper").removeAttr("style");
			//3. 타이머, 기간, 부서 등 헤더 카드 보이기
			$(".osl-evt__dsh-card--top").show();
			//4. 타이머 재실행
			if(!$.osl.isNull(timerRefreshBtn) && timerRefreshBtn.length > 0){
				//타이머 로직에 새로고침 로직이 있음
				timerRefreshBtn.click();
			}else {
				//새로고침
				dshGridStack.fnRefresh();
			}
		}
	};
	
	// fn04. fnShowWidgetSettingArea - 위젯 설정 영역 표출
	/* *
	 * function 명 : fnShowWidgetSettingArea
	 * function 설명 : show 여부에 따라 위젯의 설정 목록 부분 표출
	 * param show : true, false (default true)
	 * param elem : show가 true일 때 사용 (default 이벤트 호출 타겟)
	 * */
	const fnShowWidgetSettingArea = function(show, elem){
		if($.osl.isNull(show)){
			show = true; 
		}
		//없으면
		if($.osl.isNull(elem)){
			elem = event.target;
		}
		
		//설정 목록 표출
		if(show){
			//현재 클릭한 것 외에 모두 숨기기
			$("#oslWidgetSettingItems").find(".osl-evt__new-widget-item").addClass("d-none");
			$(elem).removeClass("d-none").addClass("selected");
			
			//선택 정보대로 설정창 세팅 osl-evt__widget-setting-list
			var wgtGrpId = $(elem).attr("gs-grp-id");
			var wgtId = $(elem).attr("gs-id");
			
			$("#widgetSettingDataDiv .osl-evt__widget-setting-list").empty();
			$("#widgetSettingDataDiv .osl-evt__widget-setting-list").data("wgt-grp-id", wgtGrpId);
			$("#widgetSettingDataDiv .osl-evt__widget-setting-list").data("wgt-id", wgtId);
			
			//영역 크기 수정
			$("#oslWidgetSettingItems").removeClass("w-100").addClass("col-xl-6 col-12");
			//설정창 열기
			$("#widgetSettingDataDiv").removeClass("d-none");
			
			//위젯 설정 정보에서 해당 정보 가져온다
			if(widgetDatas["wgtObj"].hasOwnProperty(wgtId)){
				if(Object.keys(widgetDatas["wgtObj"][wgtId]["optionKey"]).length == 0){
					$("#widgetSettingDataDiv .osl-evt__widget-setting-list").html(`<span data-lang-cd="">별도의 설정이 없습니다.</span>`);
				}
				else{
					//공통코드 세팅 : 공통코드인 경우 한번에 조회하여 넣기 위해
					var commonArrayList = [];
					
					$.each(Object.keys(widgetDatas["wgtObj"][wgtId]["optionKey"]), function(i, wgtOptKey){
						var optInfo = widgetDatas["wgtObj"][wgtId]["optionKey"][wgtOptKey];
						
						var label = optInfo["wgtSetNm"];
						var wgtOptTypeCd = optInfo["wgtOptTypeCd"]; //DSH00001 01 텍스트, 02 공통코드
						var wgtOptCd = optInfo["wgtOptCd"];
						var wgtOptDefVal = optInfo["wgtOptDefVal"];
						var elemHtml = "";
						var iconClass = "";
						var wgtSetDesc = optInfo["wgtSetDesc"];
						var tooltipElemOpt = "";
						if(!$.osl.isNull(wgtSetDesc)){
							tooltipElemOpt = `<i class="fas fa-info-circle text-hover-primary" data-bs-toggle="tooltip" data-bs-custom-class="tooltip-inverse" data-bs-placement="top" data-bs-dismiss="click" title="${wgtSetDesc}" data-bs-html="true"></i>`;
						}
						
						//텍스트
						if(wgtOptTypeCd == "01"){
							iconClass = "fa fa-edit";
							elemHtml = `
								<input type="text" id="${wgtOptKey}" name="${wgtOptKey}">
							`;
						}
						//공통코드
						else if(wgtOptTypeCd == "02"){
							iconClass = "fas fa-check-square";
							elemHtml = `
								<select class="form-select" id="${wgtOptKey}" name="${wgtOptKey}" data-control="select2" data-hide-search="true" data-cmm-code="${wgtOptCd}" data-osl-value="${wgtOptDefVal}"></select>
							`;
							
							//공통코드
							commonArrayList.push(
									{mstCd: wgtOptCd, useYn: "Y", targetObj: "#"+wgtOptKey, comboType:"OS"}
							);
						}
						
						//설정 표출
						var setHtml = `
							<div class="form-group osl-evt__wgt-set__form-group" data-wgt-grp-id="${wgtGrpId}" data-wgt-id="${wgtId}">
								<label>
									<i class="${iconClass}"></i> ${label}
									${tooltipElemOpt}
								</label>
								${elemHtml}
							</div>
						`;
						
						$("#widgetSettingDataDiv .osl-evt__widget-setting-list").append(setHtml);
					});
					
					//공통코드
					if(commonArrayList.length > 0){
						//공통코드 채우기
						ajaxDone = $.osl.getMulticommonCodeDataForm(commonArrayList , true);
						
						ajaxDone.done(function(){
							$.each(commonArrayList, function(i, map){
								//공통 옵션에서의 위젯 크기 wgtOptKey가 바뀌면 조건문 수정 필요
								if(map["targetObj"] == "#size"){
									//전체 위젯 사이즈
									var allWgtSizeList = [].concat(OSLCoreWidget.fnGetWidgetSize());
									
									var sizeList = OSLCoreWidget.fnGetWidgetSizeList(wgtGrpId, wgtId);
									$.each(sizeList, function(s, wgtSizeStr){
										//사용되는 위젯 크기는 제거
										if(allWgtSizeList.indexOf(wgtSizeStr) > -1) {
											allWgtSizeList.splice(allWgtSizeList.indexOf(wgtSizeStr), 1);
										}
									});
									
									//사용되지 않는 위젯 크기는 옵션에서 제거
									$.each(allWgtSizeList, function(s, wgtSizeStr){
										var chkW = wgtSizeStr.split("X")[0];
										var chkH = wgtSizeStr.split("X")[1];
										$(map.targetObj).find("option[data-sub-cd-ref1="+chkW+"][data-sub-cd-ref2="+chkH+"]").remove();
									});
									
									//공통 설정 이벤트 중 위젯 크기 변경 이벤트 추가
									//위젯 공통 설정 중 size
									$(".osl-evt__widget-setting-list #size").off("change").on("change", function(){
										//동일 위젯에서 해당하는 크기 위젯으로 표출
										var currentViewElem = $("#oslWidgetSettingItems").find(".osl-evt__new-widget-item.selected");
										var refWgetGrpId = currentViewElem.data("ref-wgt-grp-id");
										var refWgetId = currentViewElem.data("ref-wgt-id");
										
										//현재 선택된 사이즈 값
										//가져온 값은 DSH00007
										var changeVal = $(this).val();
										//일치하는 것으로 가져오기
										changeVal = OSLCoreWidget.fnGetWidgetSize()[Number(changeVal)-1];
										
										//변경할 위젯 찾기
										var changeViewElem = null;
										$.each($("#oslWidgetSettingItems").find(`.osl-evt__new-widget-item[data-ref-wgt-grp-id="${refWgetGrpId}"][data-ref-wgt-id="${refWgetId}"]`), function(n, siblingElem){
											//동일한 사이즈 값이 존재하는 위젯 찾기
											var contentElem = $(siblingElem).find(".osl-evt__widget-item-content");
											if(contentElem.data("osl-widget-size") == changeVal){
												changeViewElem = $(siblingElem);
												
												//each 종료
												return false;
											}
										});
										
										//변경할 위젯이 존재하면
										if(!$.osl.isNull(changeViewElem)){
											//해당 위젯으로 표출 변경
											currentViewElem.removeClass("selected").addClass("d-none");
											changeViewElem.removeClass("d-none").addClass("selected");
										}
									});
									
									//사전 선택 값 트리거
									$(".osl-evt__widget-setting-list #size").trigger("change");
								}
								
								//옵션을 모두 만들었으므로, select2 생성
								$(map.targetObj).select2({
									//스크롤 충돌 방지
									ftScrollUse: false,
									//검색창 숨김
									minimumResultsForSearch: "Infinity",
								});
							});
						});
					}//end 공통코드
					
					//툴팁 적용
					OSLApp.initTooltips();
				}
			}
		}
		//설정 목록 표출 안함
		else{
			//설정창을 닫은 이후 현재 위젯 default 위치로 이동하기 위해 타켓 검색
			var toScrollTargetElem = $(".osl-evt__new-widget-item.selected");
			var tempRefWgtId = toScrollTargetElem.data("ref-wgt-id");
			//동일한 위젯의 default로 변경
			if(toScrollTargetElem.hasClass("osl-evt__new-widget-item-sibling")){
				//바꿔치기
				toScrollTargetElem = $(".osl-evt__new-widget-item:not(.osl-evt__new-widget-item-sibling)[data-ref-wgt-id="+tempRefWgtId+"]");
			}
			
			//숨김처리 된 위젯 모두 보이게 처리(default 위젯만 보이기)
			$("#oslWidgetSettingItems .osl-evt__new-widget-item").removeClass("selected").addClass("d-none");
			$("#oslWidgetSettingItems .osl-evt__new-widget-item:not(.osl-evt__new-widget-item-sibling)").removeClass("d-none");
			
			//관련 그룹 위젯만 보이게 하기 위해 아이디 찾기
			var tempRefWgtGrpId = toScrollTargetElem.data("ref-wgt-grp-id");
			//관련 그룹 위젯만 보이게 하기
			$("#oslWidgetSettingItems .osl-evt__new-widget-item:not(.osl-evt__new-widget-item-sibling)[data-ref-wgt-grp-id="+tempRefWgtGrpId+"]").removeClass("d-none");
			$("#oslWidgetSettingItems .osl-evt__new-widget-item[data-ref-wgt-grp-id!="+tempRefWgtGrpId+"]").addClass("d-none");
			$("#oslWidgetSettingItems .osl-evt__new-widget-item").removeClass("selected");
			
			//영역 크기 수정
			$("#oslWidgetSettingItems").addClass("w-100").removeClass("col-xl-6 col-12");
			
			//반영버튼 숨기고 추가버튼으로 표출
			$("#oslWidgetAddBtn").removeClass("d-none");
			$("#oslWidgetRtnBtn").addClass("d-none");
			
			//설정창 닫기
			$("#widgetSettingDataDiv").addClass("d-none");
			$("#widgetSettingDataDiv .osl-evt__widget-setting-list").data("wgt-grp-id", "");
			$("#widgetSettingDataDiv .osl-evt__widget-setting-list").data("wgt-id", "");
			
			try {
				//저장/닫기이면
				if(["oslWidgetSaveBtn","oslWidgetCloseBtn"].indexOf(elem.id) > - 1){
					//최초로 변경
					$("#oslWidgetListBox").val($("#oslWidgetListBox option:first-child").val()).trigger("change");
				}
				//닫기가 아닐 때
				else {
					//현재 위젯 위치로 스크롤 이동
					$("#oslWidgetSettingItems").scrollLeft(toScrollTargetElem[0].offsetLeft);
				}
			}
			//오류 발생 시 강제 닫기
			catch (e) {
				//console.log(e);
				//최초로 변경
				$("#oslWidgetListBox").val($("#oslWidgetListBox option:first-child").val()).trigger("change");
			}
			
			
		}
	};
	
	// fn05. fnCmmKindOfWidget - 공통 osl-widget.js에서 항목에 맞춰 html가져오기
	/* *
	 * function 명 : fnCmmKindOfWidget
	 * function 설명 : 공통 osl-widget.js에서 항목에 맞춰 html가져오기
	 * */
	 const fnCmmKindOfWidget = function(){
		//osl-widget.js에서 항목에 맞춰 html가져오기
		var kindOfWidget = OSLCoreWidget.fnGetKindOfWidget();
		
		$.each(widgetDatas["wgtObj"], function(idx, wgtInfo){
			var wgtGrpId = wgtInfo["wgtGrpId"];
			var wgtId = wgtInfo["wgtId"];
			
			//없으면 건너뛰기
			if(!kindOfWidget[wgtGrpId].hasOwnProperty(wgtId)){
				return true;
			}
			
			//분류 - 그룹-아이템
			if($("#oslWidgetListBox").find("optgroup[value="+wgtGrpId+"]").length == 0){
				$("#oslWidgetListBox").append(`
						<optgroup value="${wgtGrpId}" label="[${widgetOptions[wgtGrpId]["wgtGrpNm"]}]">
						</optgroup>
				`);
			}
			
			$("#oslWidgetListBox optgroup[value="+wgtGrpId+"]").append(`
					<option value="${wgtId}">${wgtInfo["wgtNm"]}</option>
			`);
			
			//아이템
			$.each(kindOfWidget[wgtGrpId][wgtId]["size"], function(n, sizeStr){
				var dNoneClass = "";
				//설정 시 사이즈  첫번째 항목만 default 보이기
				if(n > 0){
					dNoneClass = "d-none osl-evt__new-widget-item-sibling";
				}
				
				var html = OSLCoreWidget.fnGetWidgetItems(wgtInfo, sizeStr, wgtId);
				var elem =  $(html);
				elem.addClass(dNoneClass);
				
				var sizeW = Number(sizeStr.split("X")[0]);
				var sizeH = Number(sizeStr.split("X")[1]);
				
				//H는 200로 고정, W는 최소 125 - col 1 최대 100% - col 12
				//var styleMinWidth = "150";
				var styleWidth = 250/9 * 5 * sizeW;
				var styleHeight = 200 * sizeH;
				var styleHeightStr = "height:"+styleHeight+"px !important;";
				
				var scaleClass = ""; //scale-n2
				//가로가 세로보다 크고, 높이가 2 이상일 때("4X2", "8X2", "8X4") 
				if(sizeW > sizeH && sizeH > 1){
					scaleClass = "position-absolute transform-start scale-n"+sizeH;
					$(elem).addClass(scaleClass);
				}
				//가로가 세로보다 크고, 높이가 1 일 때("2X1", "4X1", "12X1")
				else if(sizeW > sizeH && sizeH == 1){
					//없음
				}
				//그 외("2X2")
				else {
					$(elem).find(".osl-evt__widget-card-body").attr("style", styleHeightStr);
					
					styleHeightStr = "";
					scaleClass = "position-absolute transform-start scale-n"+sizeH;
					$(elem).addClass(scaleClass);
				}
				
				//그리드 스택이 아니여서 사이즈가 일관되지 않으므로
				$(elem).attr("style", "min-width:"+styleWidth+"px; width:"+styleWidth+"px; "+styleHeightStr);
				$(elem).addClass("osl-evt__new-widget-item");
				$(elem).data("size", sizeStr);
				$("#oslWidgetSettingItems").append(elem);
			});
		});
		
		//분류 select2
		$("#oslWidgetListBox").select2({
			dropdownParent: $('#oslWidgetSettingForm'),
			//스크롤 충돌 방지
			ftScrollUse: false,
		});
		
		//변경 시 관련 그룹 위젯만 표출 및 해당 위치로 스크롤 이동
		$("#oslWidgetListBox").change(function(){
			//설정창이 열려 있다면 닫기
			if(!$("#widgetSettingDataDiv").hasClass("d-none")){
				fnShowWidgetSettingArea(false);
				
				//위젯 선택 active 클래스 들어간 위젯이 있다면
				if($("#"+widgetAreaId).find(".osl-evt__widget-item.active").length > 0) {
					$("#"+widgetAreaId).find(".osl-evt__widget-item.active").removeClass("active");
				}
			}
			
			var tempRefWgtId = $(this).val();
			if(!$.osl.isNull(tempRefWgtId)){
				var tempRefWgtGrpId = $("#oslWidgetListBox option[value="+tempRefWgtId+"]").closest("optgroup").attr("value");
				$("#oslWidgetSettingItems .osl-evt__new-widget-item:not(.osl-evt__new-widget-item-sibling)[data-ref-wgt-grp-id="+tempRefWgtGrpId+"]").removeClass("d-none");
				$("#oslWidgetSettingItems .osl-evt__new-widget-item[data-ref-wgt-grp-id!="+tempRefWgtGrpId+"]").addClass("d-none");
				$("#oslWidgetSettingItems .osl-evt__new-widget-item").removeClass("selected");
				
				//현재 위젯 위치로 스크롤 이동
				var toScrollTargetElem = $("#oslWidgetSettingItems .osl-evt__new-widget-item:not(.osl-evt__new-widget-item-sibling)[data-ref-wgt-id="+tempRefWgtId+"]");
				if(toScrollTargetElem.length){
					$("#oslWidgetSettingItems").scrollLeft(toScrollTargetElem[0].offsetLeft);
					
					//현재 위젯 강조 효과(한번만)
					//해당 위치에 클래스 추가
					$(toScrollTargetElem).find(".osl-evt__widget-item-content").addClass("osl-widget-item--animation");
					//애니메이션 효과를 따라 3초뒤 제거
					setTimeout(function(){
						//제거하지 않으면 다른 탭 이동 후 다시 들어왔을 때 애니메이션이 반복되기 때문에
						$(toScrollTargetElem).find(".osl-evt__widget-item-content").removeClass("osl-widget-item--animation");
					}, 3000);
				}
				
				
				//단순 표출 텍스트에 그룹 라벨(분류)도 같이 표출
				var textTargetElem = $("#oslWidgetListBox").siblings("span.select2").find("span[role=textbox]");
				if(textTargetElem.length){
					var textStr = "["+widgetOptions[tempRefWgtGrpId]["wgtGrpNm"]+"]-"+textTargetElem.text();
					textTargetElem.attr("title", textStr);
					textTargetElem.text(textStr);
				}
			}
		});
		
		//최초 설정이므로
		$("#oslWidgetListBox").trigger("change");
	};
	
	// fn06. fnSetOverlayInfo - 위젯 수정 시 표출 style
	/* *
	 * function 명 : fnSetOverlayInfo
	 * function 설명 : 위젯 수정시 overlay 적용
	 * param elem : 위젯 객체
	 * */
	//위젯 수정시 표출에 사용할 overlay
	var fnSetOverlayInfo = function(elem){
		//위젯 설정, 삭제를 위해 추가
		var contentElem = $(elem).find(".osl-evt__widget-item-content");
		var handleElem = $(contentElem).find(".osl-evt__widget-handle");
		
		//필요 클래스 추가
		$(handleElem).addClass("overlay overflow-hidden");
		$(handleElem).find(">*:first-child").addClass("overlay-wrapper");
		
		//설정을 위한 아이콘/삭제를 위한 아이콘 표출
		$(handleElem).append(`
				<div class="osl-evt__widget-hover overlay-layer bg-dark bg-opacity-25 d-flex flex-row flex-wrap gap-2 align-items-center justify-content-center cursor-move">
					<button type="button" class="btn btn-sm btn-icon btn-primary osl-evt__widget-update-btn"><i class="fas fa-wrench"></i></button>
					<button type="button" class="btn btn-sm btn-icon btn-danger osl-evt__widget-remove-btn"><i class="fas fa-trash-alt"></i></button>
				</div>
		`);
	};
	
	// Params. 저장 전까지의 모든 설정 정보
	/* *
	 * key : wgtId
	 * value : { }
	 * */
	//원본
	let oriWidgetList = {};
	//신규 추가
	let addWidgetList = {};
	//수정
	let updWidgetList = {};
	//삭제
	let delWidgetList = {};
	//전체
	let allWidgetList = {};
	
	// fn07. fnWidgetSettingDatas - 위젯 설정 정보 보관/삭제
	/* *
	 * function 명 : fnWidgetSettingDatas
	 * function 설명 : 위젯 설정 정보 보관/삭제
	 * param type : original, add, update, delete (default ariginal)
	 * param data : widgetId를 key로 갖는 json 또는 widgetId
	 * ㄴ 전달 받은 데이터, 또는 원본 정보에서 가져온 데이터를 보관한다.
	 * param removeTF : true, false (default false)
	 * ㄴ true일 때, 지정 정보를 삭제한다.
	 * */
	const fnWidgetSettingDatas = function(type, data, removeTF){
		
		if($.osl.isNull(type)){
			type = "original";
		}
		if($.osl.isNull(removeTF)){
			removeTF = false;
		}
		
		//체크할 키
		var widgetId = "";
		
		//데이터 존재 유무
		var dataIF = !$.osl.isNull(data);
		if(!$.osl.isNull(data) && typeof(data) == "object"){
			if(Object.keys(data).length > 0) {
				dataIF = true;
				//{widgetId : {}} 으로 넘어오기 때문에
				widgetId = Object.keys(data)[0];
			}
		}
		//string만 넘어오는 경우
		else {
			widgetId = data;
			data = {};
			data[widgetId] = $.extend({}, oriWidgetList[widgetId]);
		}
		
		var tempObj = {};
		
		if(type == "original"){
			//깊은 복사
			tempObj = $.extend({}, oriWidgetList, oriWidgetList);
		}
		else if(type == "add") {
			//깊은 복사
			tempObj = $.extend({}, addWidgetList, addWidgetList);
		}
		else if(type == "update") {
			//깊은 복사
			tempObj = $.extend({}, updWidgetList, updWidgetList);
		}
		//delete
		else {
			//깊은 복사
			tempObj = $.extend({}, delWidgetList, delWidgetList);
		}
		
		//데이터가 있을 때, 삭제를 요구한 경우
		if(removeTF && dataIF){
			//일치하는 키 찾아 제거
			if(tempObj.hasOwnProperty(widgetId)){
				delete tempObj[widgetId];
			}
		}
		//데이터가 없을 때, 삭제를 요구한 경우
		else if(removeTF){
			//모두 제거 - 초기화
			tempObj = {};
		}
		//삭제를 요구하지 않은 경우
		else{
			//data가 존재하면 해당 data를 tempObj에 보관
			if(dataIF && typeof(data) == "object"){
				
				//확인
				// 신규 추가일 때
				if(type == "add"){
					//원본 정보에 존재하지 않으면 추가
					if(!oriWidgetList.hasOwnProperty(widgetId)){
						tempObj[widgetId] = data[widgetId];
					}
				}
				// 수정일 때
				else if(type == "update"){
					//변경 대상
					var targetList = "";
					
					//3. 동일 항목이 원본 정보에 존재하면, 수정 정보 수정
					if(oriWidgetList.hasOwnProperty(widgetId)){
						//원본과 수정본을 합쳐서 확인
						targetList = $.extend({}, oriWidgetList, updWidgetList);
					}
					//3. 동일 항목이 추가 정보에 존재하면, 추가 정보 수정
					else if(addWidgetList.hasOwnProperty(widgetId)){
						targetList = addWidgetList;
						//타입을 add로 변경
						type = "add";
					}
					
					//현재 선택한 위젯
					var selWidget = $(".osl-evt__widget-item.active");
					$.each(dshGridStack.getGridItems(), function(n, item){
						if($(item).hasClass("osl-evt__widget-item.active")){
							selWidget = $(item);
							return;
						}
					});
					
					//설정에서 선택된 위젯의 크기
					var sizeStr = $(".osl-evt__new-widget-item.selected").data("size");
					
					//크기가 서로 다르면 위젯 크기 변경
					if(sizeStr != selWidget.find(".osl-evt__widget-item-content").data("osl-widget-size")){
						//위젯 크기
						var sizeW = Number(sizeStr.split("X")[0]);
						var sizeH = Number(sizeStr.split("X")[1]);
						
						//폼 재생성을 위해선 참조 id 필요
						data[widgetId]["refWgtGrpId"] = selWidget.data("ref-wgt-grp-id");
						data[widgetId]["refWgtId"] = selWidget.data("ref-wgt-id");
						
						//위젯 폼 재생성
						var html = OSLCoreWidget.fnGetWidgetItems(data[widgetId], sizeStr, widgetId);
						var elem =  $(html);
						
						//위젯 설정, 삭제를 위해 추가
						fnSetOverlayInfo(elem);
						
						//콘텐츠 영역만 수정되기 때문에, 콘텐츠를 감싼 영역에서의 데이터도 수정해야 한다.
						//이중 유의미한 데이터는 data-osl-widget-size 값이다.
						selWidget.find(".osl-evt__widget-item-content").attr("data-osl-widget-size", sizeStr);
						selWidget.find(".osl-evt__widget-item-content").data("osl-widget-size", sizeStr);
						
						//handel 하위를 변경해야 드래그가 적용되어 item option인 content로 수정하지 않고 직접 content > handel 하위의 html 수정으로 변경
						selWidget.find(".osl-evt__widget-item-content .osl-evt__widget-card").html(
								elem.find(".osl-evt__widget-item-content .osl-evt__widget-card").html()
						);
						
						dshGridStack.update(selWidget[0], {
							id: widgetId
							,w: sizeW
							,h: sizeH
						});
					}
					
					//반영
					tempObj[widgetId] = data[widgetId];
				}
				// 삭제일 때
				else if(type == "delete") {
					//원본 정보에 해당 키가 존재할 때 추가
					if(oriWidgetList.hasOwnProperty(widgetId)){
						tempObj[widgetId] = data[widgetId];
					}
					//원본이 아닌 신규 추가된 항목이면
					else if(addWidgetList.hasOwnProperty(widgetId)){
						//추가 항목에서 제거
						delete addWidgetList[widgetId];
					}
				}
			}
		}// end if 삭제 요구 체크
		
		if(type == "original"){
			oriWidgetList = tempObj;
		}
		else if(type == "add") {
			if(Object.keys(tempObj).length > 0) {
				$.each(Object.keys(tempObj), function(n, widgetIdKey){
					addWidgetList[widgetIdKey] = tempObj[widgetIdKey];
				});
			}
		}
		else if(type == "update") {
			if(Object.keys(tempObj).length > 0) {
				$.each(Object.keys(tempObj), function(n, widgetIdKey){
					updWidgetList[widgetIdKey] = tempObj[widgetIdKey];
				});
			}
		}
		//delete
		else {
			if(Object.keys(tempObj).length > 0) {
				$.each(Object.keys(tempObj), function(n, widgetIdKey){
					delWidgetList[widgetIdKey] = tempObj[widgetIdKey];
				});
			}
		}
		
		//전체 데이터 합치기 - 삭제 항목은 제외
		allWidgetList = $.extend({}, oriWidgetList, updWidgetList, addWidgetList);
	};
	
	
	// fn08. fnGetWidgetSettingInfo - 설정 영역에서 정보 가져오기
	/* *
	 * function 명 : fnGetWidgetSettingInfo
	 * function 설명 : 설정 영역에서 해당 위젯의 설정 정보 가져오기
	 * param addedWgtElem : 추가될 위젯 객체
	 * */
	const fnGetWidgetSettingInfo = function(addedWgtElem){
		var rtnDatas = $.extend({},{});
		
		var refWgtGrpId = $(addedWgtElem).data("ref-wgt-grp-id");
		var refWgtId = $(addedWgtElem).data("ref-wgt-id");
		var wgtGrpId = $(addedWgtElem).attr("gs-grp-id");
		var wgtId = $(addedWgtElem).attr("gs-id");
		
		var targetId = wgtId;
		//위젯 아이디가 같으면 위젯 목록에서 function 호출한 것이므로
		if(refWgtId == wgtId){
			targetId = "NEWWGT"+new Date().format("yyyyMMddmmss");
		}
		
		//default 옵션 설정에서 정보 가져오기
		var tempList = widgetOptions[refWgtGrpId]["widget"];
		if(!$.osl.isNull(tempList) && tempList.length > 0){
			$.each(tempList, function(idx, data){
				//찾은 위젯 정보가 존재하면
				if(data["wgtId"] == refWgtId){
					if(!rtnDatas.hasOwnProperty(targetId)){
						rtnDatas[targetId] = {
								"wgtGrpId" : wgtGrpId,
								"wgtId" : wgtId,
								"refWgtGrpId" : refWgtGrpId,
								"refWgtId" : refWgtId,
								"wgtOptKeyList" : [],
						};
					}
					
					//위젯 설정이 존재하면 default 설정 넣어주기
					if(data.hasOwnProperty("option")){
						$.each(data["option"], function(sub, optInfo){
							rtnDatas[targetId]["wgtOptKeyList"].push(optInfo["wgtOptKey"]);
							rtnDatas[targetId][optInfo["wgtOptKey"]] = optInfo;
						});
					}
					
					//each 종료
					return false;
				}
			});
		}
		
		//wgtOptKey가 아이디인 객체 찾아서 현재 입력된 값 넣기
		$.each(rtnDatas[targetId]["wgtOptKeyList"], function(idx, wgtOptKey){
			var elem = $("#"+wgtOptKey);
			var elemVal = elem.val();
			
			rtnDatas[targetId][wgtOptKey]["wgtOptDefVal"] = elemVal;
		});
		
		//반환
		return rtnDatas;
	};
	
	// fn09. fnSetGridStackType - 대시보드 그리드 스택 타입 변경 및 타입에 따른 이동 상태 변경
	/* *
	 * function 명 : fnSetGridStackType
	 * function 설명 : 대시보드 그리드 스택 타입 변경 및 타입에 따른 이동 상태 변경
	 * param type : 대시보드 그리드 스택 타입 (view, update)
	 * */
	const fnSetGridStackType = function(type){
		if(type == "view"){
			dshGridStack["type"] = type;
			
			//이동 불가
			dshGridStack.opts["disableDrag"] = true;
			dshGridStack.movable('.osl-evt__widget-item', !dshGridStack.opts["disableDrag"]);
		}
		else if(type =="update"){
			dshGridStack["type"] = type;
			
			//이동 가능
			dshGridStack.opts["disableDrag"] = false;
			dshGridStack.movable('.osl-evt__widget-item', !dshGridStack.opts["disableDrag"]);
		}
		
		$("#"+widgetAreaId).data("osl-dashboard-type", dshGridStack["type"]);
		$("#"+widgetAreaId).attr("data-osl-dashboard-type", dshGridStack["type"]); //css 제어로 인해 attr로도 추가

	};
	
	
	//Ajax1. fnSaveDashboardWidget - 대시보드 위젯 저장
	/* *
	 * function 명 : fnSaveDashboardWidget
	 * function 설명 : 대시보드 위젯 저장
	 * 대시보드 저장 버튼 클릭 시 호출되며, 추가, 수정, 삭제된 위젯을 반영 후 대시보드 재로딩한다.
	 * */
	const fnSaveDashboardWidget = function(){
		var menuId = $.osl.selMenuId;
		
		//코어에서 가져온 메뉴 id와 같지 않으면 선택된 메뉴 id 가져오기
		if(menuId != $("#selMenuId").val()){
			menuId = $("#selMenuId").val();
		}
		
		//신규 추가
		var addWgtSetList = [];
		$.each(Object.keys(addWidgetList), function(idx, newWgtSetKey){
			//위젯 영역에서 newWgtSetKey 찾아 정보 가져오기
			var itemElem = $("#"+widgetAreaId).find(".osl-evt__widget-item[gs-id='"+newWgtSetKey+"']");
			var w = $(itemElem).attr("gs-w");
			var h = $(itemElem).attr("gs-h");
			var x = $(itemElem).attr("gs-x");
			var y = $(itemElem).attr("gs-y");
			
			//wgtWidth, wgtHeight, wgtXPoint, wgtYPoint
			addWidgetList[newWgtSetKey]["wgtWidth"] = w;
			addWidgetList[newWgtSetKey]["wgtHeight"] = h;
			addWidgetList[newWgtSetKey]["wgtXPoint"] = x;
			addWidgetList[newWgtSetKey]["wgtYPoint"] = y;
			
			addWgtSetList.push(addWidgetList[newWgtSetKey]);
		});
		
		//수정
		var updWgtSetList = [];
		//전체 위젯 사이즈
		var allWgtSizeList = [].concat(OSLCoreWidget.fnGetWidgetSize());
		
		//현재 남아있는 위젯 위치 모두 확인, 원본 정보에서 위치 수정된 위젯만 별도 분리
		$.each(dshGridStack.getGridItems(), function(n, itemElem){
			var wgtId = $(itemElem).attr("gs-id");
			//신규 생성이면 건너뛰기
			if(wgtId.indexOf("NEWWGT") == 0){
				return true;
			}
			
			//수정여부
			var updateTF = false;
			
			var x = $(itemElem).attr("gs-x");
			var y = $(itemElem).attr("gs-y");
			
			//수정 데이터 목록에 있는지 확인
			if(updWidgetList.hasOwnProperty(wgtId)){
				//원본 정보에서 원래 위치 가져오기
				var oriX = oriWidgetList[wgtId]["wgtXPoint"];
				var oriY = oriWidgetList[wgtId]["wgtYPoint"];
				if(oriX != x || oriY != y) {
					//서로 다르므로 데이터 넣어두기
					updateTF = true;
					updWidgetList[wgtId]["wgtXPoint"] = x;
					updWidgetList[wgtId]["wgtYPoint"] = y;
				}
				//원본 위젯 크기
				var oriSizeStr = oriWidgetList[wgtId]["wgtWidth"]+"X"+oriWidgetList[wgtId]["wgtHeight"];
				var oriIndex = allWgtSizeList.indexOf(oriSizeStr);
				//공통코드로 변환
				oriIndex = $.osl.numberPadding(oriIndex+1, 2);
				//수정 데이터 목록에서 위젯 크기(*공통 옵션이다) 값 가져와 세팅하기
				var chkIndex = updWidgetList[wgtId]["size"]["wgtOptDefVal"];
				
				//값이 다르면
				if(oriIndex != chkIndex){
					//서로 다르므로 데이터 넣어두기
					updateTF = true;
					var sizeStr = allWgtSizeList[Number(chkIndex) -1];
					updWidgetList[wgtId]["wgtWidth"] = Number(sizeStr.split("X")[0]);
					updWidgetList[wgtId]["wgtHeight"] = Number(sizeStr.split("X")[1]);
				}
				
				//수정 정보 넣기
				if(updateTF){
					updWidgetList[wgtId]["updateTF"] = true;
				}
				updWgtSetList.push(updWidgetList[wgtId]);
			}
			//수정 데이터 목록에 없으면, 원본 정보에 있는지 확인
			else if(oriWidgetList.hasOwnProperty(wgtId)){
				//원래 정보 복사
				var addOriUpdateData = $.extend({}, oriWidgetList[wgtId]);
				//속성은 변하지 않았으므로
				delete addOriUpdateData["option"];
				delete addOriUpdateData["optionKey"];
				
				//원본 정보에서 원래 위치 가져오기
				var oriX = addOriUpdateData["wgtXPoint"];
				var oriY = addOriUpdateData["wgtYPoint"];
				if(oriX != x || oriY != y) {
					//서로 다르므로 데이터 넣어두기
					updateTF = true;
					addOriUpdateData["wgtXPoint"] = x;
					addOriUpdateData["wgtYPoint"] = y;
				}
				
				//원본 위젯 크기
				var oriSizeStr = addOriUpdateData["wgtWidth"]+"X"+addOriUpdateData["wgtHeight"];
				//위젯 항목에서 가져온 크기
				var w = $(itemElem).attr("gs-w");
				var h = $(itemElem).attr("gs-h");
				var chkSizeStr = w+"X"+h;
				
				//값이 다르면
				if(oriSizeStr != chkSizeStr){
					//서로 다르므로 데이터 넣어두기
					updateTF = true;
					addOriUpdateData["wgtWidth"] = w;
					addOriUpdateData["wgtHeight"] = h;
				}
				
				if(updateTF){
					//값 넣기
					addOriUpdateData["updateTF"] = updateTF;
					updWgtSetList.push(addOriUpdateData);
				}
			}
		});
		
		//삭제
		var delWgtSetList = [];
		$.each(Object.keys(delWidgetList), function(idx, wgtSetKey){
			delWgtSetList.push(delWidgetList[wgtSetKey]);
		});
		
		var data = {
				menuId : menuId,
				addWgtSetList : JSON.stringify(addWgtSetList),
				updWgtSetList : JSON.stringify(updWgtSetList),
				delWgtSetList : JSON.stringify(delWgtSetList),
		};
		
		//설정 영역이 단건이라는 가정하에 진행
		var dashboardElem = $("[data-osl-widget-setting=true]");
		//타이머 관련 버튼
		var timerRefreshBtn = null;
		var timerRefreshBtnId = dashboardElem.data("osl-dashboard-timer-refresh-id");
		if(!$.osl.isNull(timerRefreshBtnId)){
			timerRefreshBtn = $("#"+timerRefreshBtnId);
		}
		
		//ajax 설정
		var ajaxObj = new $.osl.ajaxRequestAction({
			"url" : "/wgt/wgt1000/wgt1000/saveWgt1000WidgetSettingListAjax.do",
			"loadingShow": false,
			"async": false,
		}, data);
		
		ajaxObj.setFnSuccess(function(data){
			if(data.errorYn == "Y"){
				//실패하였으므로 기존 위젯 정보로 재로드
				dshGridStack.load(oriDshGridStackItemSave);
				
				$.osl.alert(data.message,{type: 'error'});
				
				//모달 창 닫기
				$.osl.layerPopupClose();
			}else{
				//데이터 보관
				fnSaveWidgetItems();
				//TODO error test
				//OSLCoreWidgetSetting.fnSetOriWidgetList(dshGridStack.getGridItems(), allWidgetList);
			}
		});
		
		return ajaxObj.send();
	};
	
	return {
		init: function(){
			initWidget();
		},
		//대시보드 그리드 스택 받기
		setDshGridStackObj : function(gridStack){
			dshGridStack = gridStack;
		},
		//대시보드 그리드 스택 전달
		getDshGridStackObj : function(){
			return dshGridStack;
		},
		fnGetWidgetDatas : function(){
			return widgetDatas;
		},
		//위젯 그룹 목록 DB 저장(등록/수정/삭제) - 기초데이터
		//호출 후 새로고침 필요
		fnSettingWidgetGrpList : function(licGrpType, licGrpId){
			//현재 라이선스 ID 가져오기
			if(licGrpType == "current"){
				licGrpId = $.osl.user.userInfo.licGrpId;
			}
			//직접 입력한 라이선스
			else if(licGrpType == "other") {
				//없으면 현재 라이선스 ID
				if($.osl.isNull(licGrpId)){
					licGrpId = $.osl.user.userInfo.licGrpId;
				}
			}
			//기본은 기초데이터
			else{
				 licGrpId = "ROOTSYSTEM_GRP";
			}
			
			//위젯 그룹 키 목록
			var wgtGrpIdList = Object.keys(widgetOptions);
			//위젯 그룹 정보 리스트
			var wgtGrpInfoListMap = {};
			
			//위젯 그룹 돌기
			$.each(wgtGrpIdList, function(idx, wgtGrpId){
				var wgtGrpInfo = {
						"wgtGrpId" : licGrpId
						,"wgtId" : wgtGrpId
						,"wgtNm" : widgetOptions[wgtGrpId]["wgtGrpNm"]
						,"wgtIdList" : [] //위젯 키 목록
						,"wgtInfoList" : [] //위젯 정보 리스트
				};
				
				//위젯 목록 생성
				$.each(widgetOptions[wgtGrpId]["widget"], function(subIndex, widgetInfo){
					//위젯 키 목록 생성
					wgtGrpInfo["wgtIdList"].push(widgetInfo["wgtId"]);
					
					//위젯 정보
					var wgtInfo = {
							"wgtGrpId" : wgtGrpId
							,"wgtId" : widgetInfo["wgtId"]
							,"wgtNm" : widgetInfo["wgtNm"]
							,"wgtOptKeyList" : [] //위젯 옵션 키 리스트
							,"wgtSetInfoList" : [] //위젯 설정 정보 리스트
					};
					
					//위젯 설정이 존재하면
					if(widgetInfo.hasOwnProperty("option")){
						$.each(widgetInfo["option"], function(underIndex, widgetOptionInfo){
							//위젯 옵션 키 리스트에 추가
							wgtInfo["wgtOptKeyList"].push(widgetOptionInfo["wgtOptKey"]);
						});
						
						//위젯 설정 정보 리스트 넣기
						wgtInfo["wgtSetInfoList"] = wgtInfo["wgtSetInfoList"].concat(widgetInfo["option"]);
					}
					
					//위젯 정보 리스트 추가
					wgtGrpInfo["wgtInfoList"].push(wgtInfo);
				});
				
				//위젯 그룹 정보 리스트 추가
				wgtGrpInfoListMap[wgtGrpId] = wgtGrpInfo;
			});
			
			var data = {
					//라이선스
					licGrpId : licGrpId,
					//위젯 그룹 키 목록
					wgtGrpIdList : JSON.stringify(wgtGrpIdList),
					//위젯 그룹 정보 리스트(key -1depth widget, value - info)
					wgtGrpInfoListMap : JSON.stringify(wgtGrpInfoListMap),
			};
			
			//ajax 전송
			var ajaxObj = new $.osl.ajaxRequestAction(
					{"url":"/wgt/wgt1000/wgt1000/saveWgt1000WidgetGroupListAjax.do", "async": false}, data);
			
			//AJAX 전송 성공 함수
			ajaxObj.setFnSuccess(function(data){
				if(data.errorYn == "Y"){
					$.osl.alert(data.message,{type: 'error'});
				}else{
					$.osl.alert(data.message);
				}
			});
			
			//AJAX 전송
			ajaxObj.send();
		},
		fnSetOriWidgetList : function(dataList, setList){
			$.each(dataList, function(idx, data){
				oriWidgetList[data["wgtId"]] = data;
				oriWidgetList[data["wgtId"]]["option"] = {};
				oriWidgetList[data["wgtId"]]["optionKey"] = {};
				oriWidgetList[data["wgtId"]]["wgtOptKeyList"] = [];
			});
			$.each(setList, function(idx, set){
				oriWidgetList[set["wgtId"]]["option"][set["wgtSetId"]] = set;
				oriWidgetList[set["wgtId"]]["optionKey"][set["wgtOptKey"]] = set;
				//위젯 수정시 원본/신규 위젯에 대한 설정을 위해 동일 폼으로 생성
				oriWidgetList[set["wgtId"]]["wgtOptKeyList"].push(set["wgtOptKey"]);
				oriWidgetList[set["wgtId"]][set["wgtOptKey"]] = set;
			});
			
			//데이터 합치기
			allWidgetList = $.extend({}, allWidgetList, oriWidgetList);
		}
	}
}();