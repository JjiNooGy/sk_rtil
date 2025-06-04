/**
 * @since 2021.09.02
 * @author 안지혜
 * @see
 * ---------------------------------------------------
 * 수정일시		|	수정자	|	내용
 * ---------------------------------------------------
 * 2023.03.16	|	안지혜	|	기존 코드 정리
 * 2023.07.12	|	안지혜	|	log 정보가 들어옴에 따라 기존 코드 오류 발생 -> 코드 재정리
 * 2024.11.14	|	안지혜	|	사용자 정보 연결 항목 별도 생성
 * 2024.11.18	|	안지혜	|	알림 항목이 아닌, 기간에 대한 옵션으로 변경됨에 따라 로직 수정
 * 2024.12.18	|	안지혜	|	접수 항목일 때 표출하지 않는 항목 제어
 * 2024.12.20	|	안지혜	|	자료관리 유형 추가
 * 2024.12.24	|	안지혜	|	서비스 항목 - 사용자 추가 시 최근 교육 미이수자 등록 불가 추가
 * ---------------------------------------------------
 * gridStack 세팅 시 cellHeight - 대부분 106으로 잡으면 됨.
 * lg - 디자인 시안
 * 항목 높이가 기본 88, 그리드스택 영역 내 패딩 값 지정(osl-py-8 : 8px *2)로 높이 104
 * 항목 구성 영역에서는 강제 패딩값 5px *2 로 인해 최소 높이 114
 * 그 외 영역에서는 강제 패딩값이 없으므로 최소 높이 104
 * ㄴ validate message 표출(최소 메시지 높이 21)이 있는 경우 최소 높이 125 //osl-py-8을 이때 제거하면 높이 106
 */

/* *
 * function 설명 : 그리드스택 반응형 적용
 * */
window.addEventListener('resize', function(){
	$.osl.templateForm.gridStack.resize();
});

//양식 세팅
var OSLCoreTemplateFormSetting = function () {
	/* *
	 * Conf0. config 기본 옵션
	 * Conf1. itemSettingOption 메인 및 서브
	 * Conf2. optionCallItem 호출 아이템
	 * Conf2-1. tplTypeViewItem 양식별 표출 가능한 아이템 선언
	 * Conf2-2. tplTypeServiceItemView 양식별 서비스 항목 표출 여부
	 * Conf2-3. acceptItemView 양식 항목 분류 중 접수 항목 구성 시 사용 가능한 항목 정의
	 * Conf3. serviceRequiredItems 서비스 필수 항목
	 * Conf4. modifyOptMap 객체에 수정 관련 옵션 정보 저장 시 data 매칭을 위한 변수
	 * Conf5. modifyLogOpts 이력 등록을 위한 값
	 * Conf6. modifyLogOptsStr 이력 등록을 위한 값 - 타입에 따라 합친 것
	 * Conf7. confCheckOpt item data-* 옵션 명칭 또는 그리드스택 관련 명칭을 맞추기 위한 map
	 * Conf8. confCheckOptPosition 항목 그릴 때 사용될 옵션 지정 위치
	 * Conf9. itemIcons 항목 별 아이콘 TPL00003
	 * Conf10. defaultGridStackOpts 그리드스택 기본 옵션
	 * 
	 * param. settingOptionList 항목 별 설정을 위한 옵션 세팅된 리스트
	 * param. settingEditor 설정창 에디터 세팅
	 * param. templateReactType 반응형 적용을 하고 있는지 체크하기 위한 변수
	 * 
	 * Ajax01. fnGetFormData 폼 그리기를 위한 항목 조회
	 * Ajax02. fnGetFormDataValues 입력 값 조회
	 * 
	 * Fn01. fnExtendConfig 옵션 합쳐 반환하는 함수
	 * Fn02. fnSettingOption 항목 별 설정을 위한 옵션 세팅
	 * Fn03. fnSetForm 전달 받은 데이터를 기준으로 폼 그리기
	 * Fn04. fnItemHtml 항목 그리기
	 * Fn04-1. fnCheckItemHtml 항목 그리기 ** 체크리스트 gridStack item이 그려져 있다는 가정하에 호출
	 * Fn04-2. fnCheckItemHtmlStr 항목 그리기 위한 html 반환
	 * Fn04-3. fnLogKeyMappingHtmlStr 키 맵핑을 위한 html 반환
	 * Fn04-4. fnServiceUsrListItemHtmlStr 항목 그리기 위한 html 반환
	 * Fn05. fnSetItemValues 항목 값 가져와(또는 전달 받아) 값 넣기
	 * Fn06. fnCreatItemAfter 후처리(양식 그린 후 처리될 동작)
	 * Fn07. fnSetItemOptValue 객체에 정보 저장
	 * Fn08. fnSetItemModifyOptValue 객체에 수정 관련 옵션 정보 저장
	 * Fn09. fnGetItemModifyOptValue 객체에 수정 관련 옵션 정보 가져오기
	 * Fn10. fnSetOptValue 단순 객체에 옵션 정보 저장
	 * Fn11. fnGetItemValues 객체로부터 정보 추출하여 반환
	 * Fn12. fnGetItemValuesByForm 지정 영역에서 아이템을 찾아 정보 추출하여 반환
	 * Fn13. fnFindKey jsonObj value에 해당하는 key 값 찾아 반환
	 * Fn14. fnFindConfCheckOpt confCheckOpt에서 value 가져오기
	 * Fn15. fnFindConfCheckOptVal confCheckOpt에서 value 찾아 객체에서 값 가져오기
	 * Fn16. fnGetItemInputValuesByForm 지정 영역에서 아이템을 찾아 입력 값 가져오기
	 * Fn17. fnSetTemplate 양식 항목 폼 그리고 항목 값 넣기(Fn03, Fn04, Fn05)
	 * Fn18. fnGridStackInit (단건)그리드 스택 세팅 및 이벤트 핸들러 적용
	 * Fn19. fnGridStackInitAll (다건)그리드 스택 세팅 및 이벤트 핸들러 적용
	 * Fn20. fnResetTabIndex 양식을 모두 그린 후에 탭인덱스 다시 설정
	 * Fn21. fnItemHeightSize 아이템 생성 후 표출 영역 높이 계산
	 * Fn22. fnCimItemHeightSize 정보자산 태그 표출 영역 높이 계산
	 * Fn23. summernoteHeightSize summernote 텍스트 영역 높이 계산
	 * Fn24. optionHeightSize 옵션 리스트 영역 높이 계산
	 * Fn25. gridStackEvt 그리드 스택 자체 이벤트
	 * 
	 * Handler01. fnTemplateEventSetting 그리드 스택 영역 설정 후 해당 영역에 지정된 이벤트 핸들러
	 * 
	 * */
	
	//Conf0. config 기본 옵션
	/*
	* { 
	* *********외부 사용자 접근 시 필요***********
	* paramLicGrpId : 해당 정보로 외부 접근인지 확인한다.
	* paramPrjId
	* ********************************************
	* baseGrp : "licGrpId" / "prjId" (라이선스 기반 조회(정보자산, 보안 티켓(양식관리)) : "licGrpId" , 프로젝트 기반 조회(보안 티켓(프로젝트관리)) : "prjId")
	* tplId
	* tplClsType : 양식 구분  TPL00001 01 정보자산, 02 보안티켓, 03 기본항목, 04 보안사고, 05 자료관리 등
	* tplItemClsCd : 01 내용, 02 접수 (TPL00014 양식 구성 정보 중 해당하는 아이템만 들고오기 default 01)
	* targetId : 단건 조회 - 보안 티켓 아이디, 정보자산 아이디 등
	* targetCd : 수정 이력 등록에 필요. 01 정보자산, 02 보안티켓, 03 기본항목 등(TPL00001) 
	* getDataType : 01 양식 정보 기준으로 그리기(default), 02 입력값 기준으로 그리기(targetId 필수)
	* useCd : 01 사용 중인 양식 아이템, 02 삭제된 양식 아이템 (양식 입력값 정보 기준인 경우 useCd 제거)
	* ㄴ 필요시 페이지별 설정에서 넣어서 사용 
	* type : "drawItem", "drawForm" / "insert", "update", "detail", "copy" / "sameTime"
	* noData : 데이터가 없을 때 표출할 문구(default : 데이터가 없습니다.)
	* getItemEssential : true 필수인 양식 아이템만 가져오기,  false 필수가 아닌 양식 아이템만 가져오기, null 모두 가져오기 (default null)
	* ********************************************
	* gridStack : {
	* 		createNewId : tplItemId를 기존 ID가 아닌 newTplId로 만들때 사용 ( 01 : 예, 02 : 아니오)
	* 		subId : id 뒤에 붙는 문자열(보안 티켓의 간이 정보 표출 - cmm6202.jsp, cmm6203.jsp / 팝업으로 인해 하위에 영향이 갈 경우 - cmm6004.jsp )
	* 		handle : handle 사용 유무
	* 		defaultHandleClassNm : handle 클래스 명(default)
	* 		handleClassNm : handle 클래스 명
	* 		defaultFirstClassNm : osl-evt__grid-stack-item(default)
	* 		firstClassNm : .osl-evt__grid-stack-item 과 같이 넣을 클래스 명
	* 		essAddClassNm : 필수 항목에 추가할 클래스.osl-evt__grid-stack-item 라인에 적용
	*		nonEssAddClassNm : 비필수 항목에 추가할 클래스 .osl-evt__grid-stack-item 라인에 적용
	*		addDivId : 추가 영역 div id
	*		removeDivId : 삭제 영역 div id
	*		btnRemove : 삭제/추가 버튼 표출 유무
	*		addBtnStr : 추가버튼 html
	*		removeBtnStr : 삭제버튼 html
	*		linkKeyEvt : 이상징후 매칭 key path 이벤트 생성 유무(default false)
	*		showLinkKeyBtn : 이상징후 매칭 key path를 위한 버튼 표출 유무
	*		sevId : (showLinkKeyBtn true일 때) 이상징후 서버 아이디
	*		mapId : (showLinkKeyBtn true일 때) 이상징후 서버의 맵핑 아이디
	*		mapItemId : (showLinkKeyBtn true일 때) 이상징후 서버의 맵핑 항목 아이디 - 유니크
	*		keyPath : (showLinkKeyBtn true일 때) 이상징후 서버의 매핑 key path
	*		selectMstCd : 항목 생성 시 공통코드의 기본 default mstCd 지정
	* 	}
	* ********************************************
	* callback : {
	* 		beforeHtmlDraw : html 그리기 전 동작
	* 		afterHtmlDraw : html 그린 후 동작
	* 		afterLastHtmlDraw : html 그린 후 후처리 이후에 동작
	* 		afterSetValue : 값을 넣은 후 동작
	* 		ajaxDone : 데이터 가져온 후 동작(시작)
	* 		afterLast : 데이터 가져온 후 동작(끝)
	* }
	*/
	const config = {
		paramLicGrpId : "",
		paramPrjId : "",
		baseGrp : "prjId",
		tplId : "",
		tplClsType : "",
		tplItemClsCd : "01",
		targetId : "",
		targetCd : "",
		getDataType : "01",
		type : "detail",
		noData : "조회된 입력 폼 데이터가 없습니다.",
		getItemEssential : null,
		gridStack : {
			createNewId : "02",
			subId : "",
			handle : true,
			defaultHandleClassNm : "osl-template-handle",
			handleClassNm : "",
			defaultFirstClassNm : "osl-evt__grid-stack-item",
			firstClassNm : "",
			essAddClassNm : "", 
			nonEssAddClassNm : "", 
			addDivId : "", 
			removeDivId: "",
			btnRemove : false,
			addBtnStr : "<span class='osl-evt__grid-stack-plus-icon grid-stack-plus-icon'><i class='osl-icon osl-icon-plus-btn'></i></span>",
			removeBtnStr : "<span class='osl-evt__grid-stack-trash-icon grid-stack-trash-icon'><i class='osl-icon osl-icon-minus-btn'></i></span>",
			linkKeyEvt : false,
			showLinkKeyBtn : false,
			sevId : "",
			mapId : "",
			mapItemId : "",
			keyPath : "",
			selectMstCd : "CMM00001",
		},
		callback : {
			beforeHtmlDraw : $.noop, //html 세팅 전
			afterHtmlDraw : $.noop, //html 세팅 후
			afterLastHtmlDraw : $.noop, //html 세팅 후 후처리 이벤트까지 모두 적용된 후
			ajaxDone : $.noop, //항목 데이터 가져온 후 동작(시작)
			afterSetValue : $.noop, //항목 값 세팅 후
			afterLast : $.noop, //데이터 가져온 후 동작(끝)
		}
	};
	
	//Conf1. itemSettingOption 메인 및 서브
	const itemSettingOption = {
			"main" : {
				"EDITOR_INPUT" : {
					"icon" : "fa fa-edit",
					"tooltip" : "",
					"type" : "textarea",
					"label" : "template.setting.label.itemOptionVal", //표출 내용
					"field" : "itemOptionVal",
					"name" : "itemOptionVal",
					"default" : null,
					"required" : "true",
					"subOption" : [],
					"event" : function(targetId, mainOptNm, tplItemId, settingConfig){
						var field = itemSettingOption["main"][mainOptNm]["field"];
						var name = itemSettingOption["main"][mainOptNm]["name"];
						
						var optNm = fnFindConfCheckOpt("itemId"); //ex_ gs-id
						var targetElem = $(`.osl-evt__grid-stack-item[${optNm}="${tplItemId}"] .osl-evt__grid-stack-item-content.active`);
						var topElem = targetElem.closest(".osl-evt__grid-stack-item");
						
						//설정창 에디터
						var editElem = $("#"+field);
						var innerHtml = editElem.val();
						
						//osl-evt__template-item
						var itemElem = topElem.find(".osl-evt__template-item");
						
						//설정창 값이 비어있는 경우
						if("" == innerHtml.trim() || editElem.hasClass("invalid-feedback")){ //일반 텍스트
							$.osl.confirm($.osl.lang("template.message.confirm.getItemOptionVal"), {html: true}, function(result){
								if(result.value){
									//원래 정보에서 데이터가져오기
									var txtStr = itemElem.html();
									editElem.val($.osl.escapeHtml(txtStr));
									//summernote 내용 변경
									editElem.summernote("code", txtStr);
								}else{
									itemElem.html($.osl.lang("template.item.label.onlyTextPrintArea"));
								}
							});
						}
						//비어있지 않으면
						else{
							//설정창에서 가져온 값을 선택 아이템에 넣기
							itemElem.html(innerHtml);
						}
						
						//반영하면 단순 텍스트 영역 경고표시 감추기
						targetElem.removeClass("danger");
						
						//해당 옵션 설정값 변경
						var selVal = targetElem.val();
						fnSetItemOptValue(itemElem, name, selVal);
					},
				},
				"LABEL_TEXT" : {
					"icon" : "fa fa-edit",
					"tooltip" : "",
					"type" : "text",
					"label" : "template.setting.label.itemNm", //표출 명
					"field" : "itemNm",
					"name" : "itemNm",
					"placeholder" : "template.setting.placeholder.itemNm", //항목 명을 입력하세요.
					"default" : null,
					"required" : "true",
					"subOption" : [],
					"max" : 30,
					"min" : 0,
					"event" : function(targetId, mainOptNm, tplItemId, settingConfig){
						//osl-evt__grid-stack-item 옵션 지정 명 가져오기
						var optNm = fnFindConfCheckOpt("itemId");
						//라벨 명 가져오기
						var inputVal = $($(`.osl-evt__grid-stack-item[${optNm}="${tplItemId}"] .osl-evt__grid-stack-item-content.active .osl-evt__grid-stack-item-label > span`)[0]).text();
						//설정창 input에 넣기
						$("#"+ itemSettingOption["main"][mainOptNm]["field"]).val(inputVal);
					},
				},
				"REQUIRED_ITEM" : {
					"icon" : "fa fa-edit",
					"tooltip" : "",
					"type" : "checkbox",
					"label" : "template.setting.label.itemEssentialCd", //필수유무
					"field" : "itemEssentialCd",
					"name" : "itemEssentialCd",
					"default" : "02",
					"required" : "false",
					"mstCd" : "CMM00001",
					"notCdList":[],
					"subOption" : [],
					"event" : function(targetId, mainOptNm, tplItemId, settingConfig){
						var field = itemSettingOption["main"][mainOptNm]["field"];
						var name = itemSettingOption["main"][mainOptNm]["name"];
						
						var optNm = fnFindConfCheckOpt("itemId"); //ex_ gs-id
						var targetElem = $(`.osl-evt__grid-stack-item[${optNm}="${tplItemId}"] .osl-evt__grid-stack-item-content.active`);
						var topElem = targetElem.closest(".osl-evt__grid-stack-item");
						
						//현재 아이템 설정 값 가져오기
						var selItemInfo = fnGetItemValues(topElem, true);
						
						var checked = false;
						if(selItemInfo[name] == "01"){
							checked = true;
						}
						
						//서비스 항목 또는 디바이스이면 무조건 필수
						if(String(selItemInfo["itemCode"]) == "16" || (selItemInfo["tplEssentialItem"] == "01")){
							checked = true;
						}
						
						//체크되어 있으면
						if(checked){
							//* 표출
							$(targetElem).find(".osl-evt__grid-stack-item-label").addClass("required");
							$(targetElem).find(".osl-evt__template-item").attr("required");
						}
						//체크 해제되어 있으면
						else {
							//* 표출 제거
							$(targetElem).find(".osl-evt__grid-stack-item-label").removeClass("required");
							$(targetElem).find(".osl-evt__template-item").removeAttr("required");
						}
						
						//설정 상태값 적용
						$("#"+field)[0].checked = checked;
						
						//해당 항목이 체크리스트일 때
						if(String(selItemInfo["itemCode"]) == "08") {
							//체크 해제이면
							if(!checked){
								//다중선택 활성화 상태일 때
								if(selItemInfo["itemMultiSelCd"] == "01"){
									var minValField = itemSettingOption["sub"]["MIN_VAL"]["field"];
									var minVal = $("#"+minValField).val();
									
									if(minVal > 0) {
										//최솟 값이 변경됨을 공지
										//항목 필수가 해제되어 다중 선택 최솟 값은 0이 됩니다.
										$.osl.alert($.osl.lang("template.message.alert.clearRequiredOptMinVal"));
										//체크리스트에서 최솟 값은 해당 갯수만큼은 필수로 체크해야 함을 의미
										//최소 선택 개수를 0으로 변경
										$("#"+minValField).attr("min", 0);
										$("#"+minValField).val(0).trigger("input");
									}
								}
							}
						}
					},
				},
				"REGEX_CHK" : {
					"icon" : "fa fa-edit",
					"tooltip" : "",
					"type" : "select",
					"label" : "template.setting.label.validation", //유효성 검사
					"field" : "validationSelect",
					"name" : "itemRegexCd",
					"default" : "01",
					"required" : "false",
					"mstCd" : "TPL00012", 
					"notCdList":[],
					"subOption" : [],
					"event" : function(targetId, mainOptNm, tplItemId, settingConfig){
						//세팅된 값으로 변경
						var field = itemSettingOption["main"][mainOptNm]["field"];
						var name = itemSettingOption["main"][mainOptNm]["name"];
						var optNm = fnFindConfCheckOpt("itemId"); //ex_ gs-id
						
						var targetElem = $(`.osl-evt__grid-stack-item[${optNm}="${tplItemId}"] .osl-evt__grid-stack-item-content.active`);
						var mainElem = targetElem.find(".osl-evt__template-item");
						
						//유효성 쉽게 확인하기 위해
						mainElem.attr("placeholder", $("#"+field+"~span.select2").text());
					},
				},
				"COMMON_CD" : {
					"icon" : "fa fa-edit",
					"tooltip" : "",
					"type" : "select",
					"label" : "template.setting.label.cmmCodeSelect", //공통코드 선택
					"field" : "cmmCodeSelect",
					"name" : "itemOptionVal",
					"default" : "CMM00001",
					"required" : "false",
					"mstCd" : null, 
					"notCdList":[],
					"subOption" : [],
					"event" : function(targetId, mainOptNm, tplItemId, settingConfig){
						//세팅된 값으로 변경
						var field = itemSettingOption["main"][mainOptNm]["field"];
						var name = itemSettingOption["main"][mainOptNm]["name"];
						var optNm = fnFindConfCheckOpt("itemId"); //ex_ gs-id
						
						var targetElem = $(`.osl-evt__grid-stack-item[${optNm}="${tplItemId}"] .osl-evt__grid-stack-item-content.active`);
						//osl-evt__grid-stack-item
						var topElem = targetElem.parent();
						var mainElem = targetElem.find(".osl-evt__template-item");
						
						var itemId = topElem.attr(optNm);
						
						//현재 아이템 설정 값 가져오기
						var selItemInfo = fnGetItemValues(topElem, true);
						
						//선택된 공통코드의 세부 공통코드 가져오기
						var commonCodeArr = [
							{mstCd: selItemInfo["itemOptionVal"], useYn: "Y", targetObj: "#"+itemId}
						];
						
						var ajaxDoneSub = $.osl.getMulticommonCodeDataForm(commonCodeArr , true);
						//data 넣기
						ajaxDoneSub.done(function(){
							var itemInfo = fnGetItemValues(topElem, true);
							
							if(["drawItem", "drawForm", "detail"].indexOf(itemInfo["configType"]) == -1){
								//disabled 해제
								mainElem.prop("disabled", false);
								
								//보기용으로 만들어진 항목 제거
								mainElem.siblings("span.select2").remove();
							}
							
							//데이터 갱신
							fnSetItemOptValue(topElem, "itemOptionVal", selItemInfo["itemOptionVal"]);
							fnSetItemOptValue(topElem, "mstCd", selItemInfo["itemOptionVal"]);
							
							fnSetItemOptValue(mainElem, "mstCd", selItemInfo["itemOptionVal"]);
							
							//다시 생성
							$("#"+itemInfo["itemId"]).select2({
								//드롭다운 위치 지정
								dropdownParent: $(this).closest(".modal").length > 0 ? $(this).closest(".modal") : $("#kt_app_content"),
								//스크롤 충돌 방지
								ftScrollUse: false,
								//검색창 숨김
								minimumResultsForSearch: "Infinity",
							});
						});
					},
				},
				"UPDATE_ABLED" : { //사용 안함
					"icon" : "fa fa-edit",
					"tooltip" : "",
					"type" : "checkbox",
					"label" : "template.setting.label.itemModifyCd", //수정 가능
					"field" : "itemModifyCd",
					"name" : "itemModifyCd",
					"default" : "02",
					"required" : "false",
					"mstCd" : "CMM00001",
					"notCdList":[],
					"subOption" : [],
					"event" : function(targetId, mainOptNm, tplItemId, settingConfig){
					},
				},
				"ALARM_USE" : {
					"icon" : "fa fa-edit",
					"tooltip" : "",
					"type" : "checkbox",
					"label" : "template.setting.label.alarmUseCd", //알람 기능 연결
					"field" : "alarmOutDiv",
					"name" : "itemAlarmUseCd",
					"default" : "02",
					"required" : "false",
					"mstCd" : "CMM00001",
					"notCdList":[],
					"subOption" : ["ALARM_RANGE"],
					"event" : function(targetId, mainOptNm, tplItemId, settingConfig){
						//연결된 그리드 스택
						var gridStackId = $("#"+tplItemId).closest(".grid-stack").attr("id");
						var gridStack = $.osl.templateForm.gridStack.list[gridStackId];
						
						var field = itemSettingOption["main"][mainOptNm]["field"];
						var name = itemSettingOption["main"][mainOptNm]["name"];
						
						var optNm = fnFindConfCheckOpt("itemId"); //ex_ gs-id
						var targetElem = $(`.osl-evt__grid-stack-item[${optNm}="${tplItemId}"] .osl-evt__grid-stack-item-content.active`);
						var topElem = targetElem.closest(".osl-evt__grid-stack-item");
						var itemElem = targetElem.find(".osl-evt__template-item");
						
						//현재 아이템 설정 값 가져오기
						var selItemInfo = fnGetItemValues(topElem, true);
						
						//기존에 연동되어 있는 기간이 있는지 확인
						var alreadyAlarmUsed = false; //다른 기간 항목에 알림이 연결되었는지
						var alreadyAlarmUsedMe = false; //자기 자신에게 알림이 연결되었는지
						var alreadyAlarmUsedElement; //알림이 연결된 기간 항목 객체
						var alarmUsrElem; //알림이 연결된 사용자 항목 객체
						
						/* *
						 * 서비스-템플릿 유형 항목(기간)에서의 알람 연결이면, 서비스항목에 대해서만 알림 설정 가능 - 1순위
						 * 일반 항목(기간)에서의 알람 연결이면, 기존 연결된 알람 확인하여 연결정보 변경 - 2순위
						 * */
						var serviceWidget = false;
						//서비스 항목이 존재하는지 확인
						if($("#"+settingConfig["targetClickArea"]).find(".osl-evt__grid-stack-item.osl-evt__service-widget").length > 0 ){
							serviceWidget = true;
						}
						
						//알림 설정 변경 가능 여부
						var changeAlarm = true;
						//불가능 : 서비스 항목이 존재할 때, 현재 항목이 일반 기간 항목이면 알림 설정 불가
						if(serviceWidget && selItemInfo["tplEssentialItem"] == "02"){
							changeAlarm = false;
						}
						
						//기간 항목 모두 가져오기
						if($(`#${gridStackId} .osl-evt__grid-stack-item[${fnFindConfCheckOpt("itemCode")}='06']`).length > 0){
							$.each($(`#${gridStackId} .osl-evt__grid-stack-item[${fnFindConfCheckOpt("itemCode")}='06']`), function(n, dateRangeElem){
								var itemId = fnFindConfCheckOptVal($(dateRangeElem), "itemId");
								var alarmUseCd = "02";
								if($(dateRangeElem).find(".osl-evt__grid-stack-item-label > i").data("alarm-use-elem") == "true"){
									alarmUseCd = "01";
								}
								//1. 자기 자신과 연결된 알람이 있는지 확인 >> 기간 아이콘에서 데이터로 확인한다.
								if(itemId == tplItemId && alarmUseCd == "01"){
									alreadyAlarmUsedMe = true;
									alreadyAlarmUsedElement = $(dateRangeElem);
									return;
								}
								//2. 다른 기간과 연결된 알람이 있는지 확인
								if(itemId != tplItemId && alarmUseCd == "01"){
									alreadyAlarmUsed = true;
									alreadyAlarmUsedElement = $(dateRangeElem);
									return;
								}
							});
						}
						
						//연결된 사용자 항목 가져오기
						if($(`#${gridStackId} .osl-evt__grid-stack-item[${fnFindConfCheckOpt("itemCode")}='09']`).length > 0){
							$.each($(`#${gridStackId} .osl-evt__grid-stack-item[${fnFindConfCheckOpt("itemCode")}='09']`), function(n, usrElem){
								//서비스 항목이 존재하는 경우
								if(serviceWidget){
									//서비스 항목이 나올때까지 건너뛰기
									if(fnFindConfCheckOptVal($(usrElem), "tplEssentialItem") == "02"){
										return true;
									}
								}
								
								if($(usrElem).find(".osl-evt__grid-stack-item-label > i").data("alarm-use-elem") == "true"){
									alarmUsrElem = $(usrElem);
									return;
								}
							});
						}
						
						var checked = false;
						if(selItemInfo[name] == "01"){
							checked = true;
						}
						
						//1차 세부 옵션에 대한 접기/펼치기
						//체크되어 있으면
						if(checked){
							//세부 옵션
							if(itemSettingOption["main"][mainOptNm].hasOwnProperty("subOption") && itemSettingOption["main"][mainOptNm]["subOption"].length > 0){
								$.each(itemSettingOption["main"][mainOptNm]["subOption"], function(idx, subOptNm){
									var subField = itemSettingOption["sub"][subOptNm]["field"];
									
									//valid를 위해 해당 항목에 osl-evt__exclude-item 제거
									$("#"+subField).removeClass("osl-evt__exclude-item");
								});
							}
							
							//세부 옵션의 경우 collapse로 표출 제어하기 때문에 클래스 변경
							$("#"+field).removeClass("collapsed").addClass("active");
							$("#"+mainOptNm+"Div").addClass("show");
						}
						//체크 해제되어 있으면
						else {
							//세부 옵션
							if(itemSettingOption["main"][mainOptNm].hasOwnProperty("subOption") && itemSettingOption["main"][mainOptNm]["subOption"].length > 0){
								$.each(itemSettingOption["main"][mainOptNm]["subOption"], function(idx, subOptNm){
									var subField = itemSettingOption["sub"][subOptNm]["field"];
									
									//valid 제외를 위해 해당 항목에 osl-evt__exclude-item 추가
									$("#"+subField).addClass("osl-evt__exclude-item");
								});
							}
							
							//세부 옵션의 경우 collapse로 표출 제어하기 때문에 클래스 변경
							$("#"+field).removeClass("active").addClass("collapsed");
							$("#"+mainOptNm+"Div").removeClass("show");
						}
						//1차 세부 옵션에 대한 접기/펼치기 끝
						
						//1차 세부 이벤트 실행
						//세부 항목이 있으면 이벤트 실행
						if(itemSettingOption["main"][mainOptNm].hasOwnProperty("subOption") && itemSettingOption["main"][mainOptNm]["subOption"].length > 0){
							$.each(itemSettingOption["main"][mainOptNm]["subOption"], function(idx, subOptNm){
								if(itemSettingOption["sub"][subOptNm].hasOwnProperty("event") && typeof itemSettingOption["sub"][subOptNm]["event"]== "function"){
									//param : 설정 객체 id, 메인 옵션명, 선택 객체 id, settingConfig
									//tplItemId로 안하고 itemId로 하는 이유는 신규 추가되는 항목의 경우 tplItemId는 모두 루트 아이템으로 지정되어 있기 때문
									itemSettingOption["sub"][subOptNm]["event"](targetId, subOptNm, tplItemId, settingConfig);
								}
							});
						}
						
						//알림 아이콘
						var armIconHtml01 = `
							<span class="osl-evt__alarm-setting-icon cursor-pointer osl-me-4 fs-7 position-absolute end-0 top-0" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="tooltip-inverse" data-bs-dismiss="click" title="${$.osl.lang("template.item.tooltip.settingAlarm")}" data-title-lang-cd="template.item.tooltip.settingAlarm">
								<i class="osl-icon osl-icon-notifications"></i>
							</span>
						`;
						var armIconHtml02 = `
							<span class="osl-evt__alarm-setting-icon cursor-pointer osl-me-4 fs-7 position-absolute end-0 top-0" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="tooltip-inverse" data-bs-dismiss="click" title="${$.osl.lang("template.item.tooltip.alarmUsr")}" data-title-lang-cd="template.item.tooltip.alarmUsr">
								<i class="osl-icon osl-icon-notifications"></i>
							</span>
						`;
						
						//1.알림 해제
						if(!checked){
							//현재 항목이 알림 사용 중이었을 때
							if(alreadyAlarmUsedMe){
								//기간 아이콘 색상 변경 및 알람과 연결된 기간입니다라고 표출되는 툴팁 원복
								var dateRangeIcon = topElem.find(".osl-evt__grid-stack-item-label > i");
								/*
								//TODO 알림과 연결된 기간인지 구분이 현재 안감. 디자이너/퍼블리셔와 얘기하여 수정 필요
								dateRangeIcon.removeClass("text-primary");
								dateRangeIcon.removeAttr("data-bs-toggle", "data-bs-placement", "data-bs-custom-class", "data-bs-dismiss", "title", "data-title-lang-cd");
								*/
								//아이콘에 있는 데이터 옵션 변경 - 단순 제거로는 data 값을 호출 시 제거 전 값이 반환되기 때문
								fnSetOptValue(dateRangeIcon, "data-alarm-use-elem", "false");
								/*
								//만들어져 있는 툴팁 제거
								var tp = bootstrap.Tooltip.getInstance(dateRangeIcon[0]);
								if(!$.osl.isNull(tp)){
									tp.dispose();
								}
								*/
								//2025.01.07 - 기간 항목에 알림 아이콘 제거
								$(topElem).find(".osl-evt__alarm-setting-icon").remove();
								
								//연결 사용자 항목 제거 - 서비스 항목은 제거 불가
								if(alarmUsrElem.hasClass("osl-evt__service-widget") || fnFindConfCheckOpt("tplEssentialItem") == "01"){
									//제거 불가 - 아이콘 색상만 원복
									//사용자 아이콘 색상 변경 및 알림 받을 사용자입니다라고 표출되는 툴팁 원복
									var usrRangeIcon = alarmUsrElem.find(".osl-evt__grid-stack-item-label > i");
									alarmUsrElem.find(".osl-evt__alarm-setting-icon").remove();
									/*
									//TODO 알림과 연결된 사용자인지 구분이 현재 안감. 디자이너/퍼블리셔와 얘기하여 수정 필요
									usrRangeIcon.removeClass("text-primary");
									usrRangeIcon.removeAttr("data-bs-toggle", "data-bs-placement", "data-bs-custom-class", "data-bs-dismiss", "title", "data-title-lang-cd");
									*/
									
									//아이콘에 있는 데이터 옵션 변경 - 단순 제거로는 data 값을 호출 시 제거 전 값이 반환되기 때문
									fnSetOptValue(usrRangeIcon, "data-alarm-use-elem", "false");
									/*
									//만들어져 있는 툴팁 제거
									tp = bootstrap.Tooltip.getInstance(usrRangeIcon[0]);
									if(!$.osl.isNull(tp)){
										tp.dispose();
									}
									*/
									//2025.01.07 - 사용자 항목에 알림 아이콘 제거
									$(alarmUsrElem).find(".osl-evt__alarm-setting-icon").remove();
								}
								else{
									gridStack.removeWidget(alarmUsrElem[0]);
									alarmUsrElem.remove();
								}
							}
							
							//confirm으로 인해 이후 로직이 있으면 안됨
						}
						//2.알림 연결
						else{
							//알림 연결 불가능한 경우-서비스 항목이 존재할 때, 일반 기간 항목에 알림을 연결하려고 할 때-
							if(!changeAlarm){
								//설정 상태값 적용
								$("#"+field)[0].checked = !checked;
								fnSetItemOptValue(topElem, "itemAlarmUseCd", "02");
								
								//현재 양식은 알림 항목 설정을 변경할 수 없습니다.
								//현재 양식에서는 알림 항목 설정은 서비스 항목 기간에 대해서만 변경할 수 있습니다.
								$.osl.alert($.osl.lang("template.item.message.alarmServiceNotChange"), null, function(){
									//2차 세부 옵션에 대한 접기/펼치기 - 접기
									if(itemSettingOption["main"][mainOptNm].hasOwnProperty("subOption") && itemSettingOption["main"][mainOptNm]["subOption"].length > 0){
										$.each(itemSettingOption["main"][mainOptNm]["subOption"], function(idx, subOptNm){
											var subField = itemSettingOption["sub"][subOptNm]["field"];
											
											//valid 제외를 위해 해당 항목에 osl-evt__exclude-item 추가
											$("#"+subField).addClass("osl-evt__exclude-item");
										});
									}
									
									//세부 옵션의 경우 collapse로 표출 제어하기 때문에 클래스 변경
									$("#"+field).removeClass("active").addClass("collapsed");
									$("#"+mainOptNm+"Div").removeClass("show");
									
									//2차 세부 이벤트 실행
									//세부 항목이 있으면 이벤트 실행
									if(itemSettingOption["main"][mainOptNm].hasOwnProperty("subOption") && itemSettingOption["main"][mainOptNm]["subOption"].length > 0){
										$.each(itemSettingOption["main"][mainOptNm]["subOption"], function(idx, subOptNm){
											if(itemSettingOption["sub"][subOptNm].hasOwnProperty("event") && typeof itemSettingOption["sub"][subOptNm]["event"]== "function"){
												//param : 설정 객체 id, 메인 옵션명, 선택 객체 id, settingConfig
												//tplItemId로 안하고 itemId로 하는 이유는 신규 추가되는 항목의 경우 tplItemId는 모두 루트 아이템으로 지정되어 있기 때문
												itemSettingOption["sub"][subOptNm]["event"](targetId, subOptNm, tplItemId, settingConfig);
											}
										});
									}
								});
							}
							//알림 연결 가능할 때
							else {
								//이미 알림과 연결된 기간(!= 자신)이 존재하는 경우
								if(alreadyAlarmUsed){
									//변경을 진행할지 confirm
									$.osl.confirm($.osl.lang("template.message.confirm.assignAlarm"),{"html" : true},function(result) {
										//변경 예
										if (result.value) {
											//기존에 연결된 알람 연결 해제
											fnSetItemOptValue($(alreadyAlarmUsedElement), "itemAlarmUseCd", "02");
											//2025.01.07 - 기간 항목에 알림 아이콘 제거
											$(alreadyAlarmUsedElement).find(".osl-evt__alarm-setting-icon").remove();
											//알람과 연결된 기간입니다라고 표출되는 문구 제거
											//$(alreadyAlarmUsedElement).find(".osl-evt__template-item").prev().remove();
											
											/*
											//기간 아이콘 색상 변경 및 알람과 연결된 기간입니다라고 표출되는 툴팁 원복
											var dateRangeIcon = alreadyAlarmUsedElement.find(".osl-evt__grid-stack-item-label > i");
											//TODO 알림과 연결된 기간인지 구분이 현재 안감. 디자이너/퍼블리셔와 얘기하여 수정 필요
											dateRangeIcon.removeClass("text-primary");
											dateRangeIcon.removeAttr("data-bs-toggle", "data-bs-placement", "data-bs-custom-class", "data-bs-dismiss", "title", "data-title-lang-cd");
											*/
											//아이콘에 있는 데이터 옵션 변경 - 단순 제거로는 data 값을 호출 시 제거 전 값이 반환되기 때문
											fnSetOptValue(dateRangeIcon, "data-alarm-use-elem", "false");
											/*
											//만들어져 있는 툴팁 제거
											var tp = bootstrap.Tooltip.getInstance(dateRangeIcon[0]);
											if(!$.osl.isNull(tp)){
												tp.dispose();
											}
											*/
											//알람 연결
											fnSetItemOptValue(topElem, "itemAlarmUseCd", "01");
											//2025.01.07 - 기간 항목에 알림 아이콘 삽입
											$(armIconHtml01).insertBefore(topElem.find(".osl-evt__template-item"));
											
											//현재 기간 아이콘 색상 변경 및 알람과 연결된 기간입니다라고 표출되는 툴팁 추가
											dateRangeIcon = topElem.find(".osl-evt__grid-stack-item-label > i");
											/*
											//TODO 알림과 연결된 기간인지 구분이 현재 안감. 디자이너/퍼블리셔와 얘기하여 수정 필요
											dateRangeIcon.addClass("text-primary");
											fnSetOptValue(dateRangeIcon, "data-bs-toggle", "tooltip");
											fnSetOptValue(dateRangeIcon, "data-bs-placement", "top");
											fnSetOptValue(dateRangeIcon, "data-bs-custom-class", "tooltip-inverse");
											fnSetOptValue(dateRangeIcon, "data-bs-dismiss", "click");
											fnSetOptValue(dateRangeIcon, "title", $.osl.lang("template.item.tooltip.settingAlarm"));
											fnSetOptValue(dateRangeIcon, "data-title-lang-cd", "template.item.tooltip.settingAlarm");
											*/
											//아이콘에 데이터 옵션 추가 
											fnSetOptValue(dateRangeIcon, "data-alarm-use-elem", "true");
											/*
											//툴팁 세팅
											OSLApp.initTooltips();
											*/
											//설정 상태값 적용
											$("#"+field)[0].checked = checked;
											
											//2차 세부 이벤트 실행
											//세부 항목이 있으면 이벤트 실행
											if(itemSettingOption["main"][mainOptNm].hasOwnProperty("subOption") && itemSettingOption["main"][mainOptNm]["subOption"].length > 0){
												$.each(itemSettingOption["main"][mainOptNm]["subOption"], function(idx, subOptNm){
													if(itemSettingOption["sub"][subOptNm].hasOwnProperty("event") && typeof itemSettingOption["sub"][subOptNm]["event"]== "function"){
														//param : 설정 객체 id, 메인 옵션명, 선택 객체 id, settingConfig
														//tplItemId로 안하고 itemId로 하는 이유는 신규 추가되는 항목의 경우 tplItemId는 모두 루트 아이템으로 지정되어 있기 때문
														itemSettingOption["sub"][subOptNm]["event"](targetId, subOptNm, tplItemId, settingConfig);
													}
												});
											}
										}
										//변경 아니오
										else {
											//취소할 경우 현재 클릭 취소. 알림 연결 안함 - 체크 해제
											fnSetItemOptValue(topElem, "itemAlarmUseCd", "02");
											
											//설정 상태값 적용
											$("#"+field)[0].checked = !checked;
											
											//2차 세부 옵션에 대한 접기/펼치기 - 접기
											if(itemSettingOption["main"][mainOptNm].hasOwnProperty("subOption") && itemSettingOption["main"][mainOptNm]["subOption"].length > 0){
												$.each(itemSettingOption["main"][mainOptNm]["subOption"], function(idx, subOptNm){
													var subField = itemSettingOption["sub"][subOptNm]["field"];
													
													//valid 제외를 위해 해당 항목에 osl-evt__exclude-item 추가
													$("#"+subField).addClass("osl-evt__exclude-item");
												});
											}
											
											//세부 옵션의 경우 collapse로 표출 제어하기 때문에 클래스 변경
											$("#"+field).removeClass("active").addClass("collapsed");
											$("#"+mainOptNm+"Div").removeClass("show");
											
											//2차 세부 이벤트 실행
											//세부 항목이 있으면 이벤트 실행
											if(itemSettingOption["main"][mainOptNm].hasOwnProperty("subOption") && itemSettingOption["main"][mainOptNm]["subOption"].length > 0){
												$.each(itemSettingOption["main"][mainOptNm]["subOption"], function(idx, subOptNm){
													if(itemSettingOption["sub"][subOptNm].hasOwnProperty("event") && typeof itemSettingOption["sub"][subOptNm]["event"]== "function"){
														//param : 설정 객체 id, 메인 옵션명, 선택 객체 id, settingConfig
														//tplItemId로 안하고 itemId로 하는 이유는 신규 추가되는 항목의 경우 tplItemId는 모두 루트 아이템으로 지정되어 있기 때문
														itemSettingOption["sub"][subOptNm]["event"](targetId, subOptNm, tplItemId, settingConfig);
													}
												});
											}
										}
									});
								}
								//이미 자기 자신과 연결된 알림이 존재하는 경우
								else if(alreadyAlarmUsedMe && selItemInfo["itemAlarmUseCd"] == "01"){
									//설정 상태값 적용
									$("#"+field)[0].checked = checked;
									
									//2025.01.07 - 기간 항목에 알림 아이콘 삽입
									$(armIconHtml01).insertBefore(topElem.find(".osl-evt__template-item"));
									
									return;
								}
								//그 외 - 알림과 연결된 기간이 없거나, 자신과 연결되어야 하는데 알림 항목이 아직 만들어진 것이 없다면
								else {
									//알림과 연결된 사용자 항목이 없으면 신규 생성
									if($.osl.isNull(alarmUsrElem) ||  alarmUsrElem.length == 0){
										//추가된 사용자 위젯
										var addedAlarmUsrElem;
										
										//서비스 항목이 존재하면
										if(serviceWidget){
											addedAlarmUsrElem = $(`#${gridStackId} .osl-evt__grid-stack-item.osl-evt__service-widget[${fnFindConfCheckOpt("itemCode")}="09"]`);
											
											//2025.01.07 - 사용자 항목에 알림 아이콘 삽입
											$(armIconHtml02).insertBefore($(addedAlarmUsrElem.find(".osl-evt__template-item")));
										}
										//서비스 항목이 존재하지 않는 경우
										else {
											var alarmUsrItem = $("#"+settingConfig["tergetDrawItemArea"]).find(".osl-evt__grid-stack-item["+fnFindConfCheckOpt("itemCode")+"='09']");
											var cloneItem = alarmUsrItem[0].cloneNode(true);
											//추가/삭제 버튼 제거
											$(cloneItem).find("span.osl-evt__grid-stack-plus-icon, span.osl-evt__grid-stack-trash-icon").remove();
											
											//추가된 대상을 바로 찾기 위해
											$(cloneItem).addClass("osl-evt__added-clone-item");
											
											gridStack.addWidget(cloneItem);
											
											//추가된 사용자 항목
											addedAlarmUsrElem = $(`#${gridStackId} .osl-evt__grid-stack-item.osl-evt__added-clone-item[${fnFindConfCheckOpt("itemCode")}="09"]`);
											
											//2025.01.07 - 사용자 항목에 알림 아이콘 삽입
											$(armIconHtml02).insertBefore($(addedAlarmUsrElem.find(".osl-evt__template-item").parent()));
											//추가된 대상 찾기 위한 클래스 제거
											addedAlarmUsrElem.removeClass("osl-evt__added-clone-item");
										}
										
										//알림과 연결된 정보로 추가
										fnSetItemOptValue(addedAlarmUsrElem, "itemAlarmUseCd", "01", true);
										
										//사용자 아이콘 색상 변경 및 알람과 연결된 사용자입니다라고 표출되는 툴팁 추가
										var usrRangeIcon = addedAlarmUsrElem.find(".osl-evt__grid-stack-item-label > i");
										/*
										//TODO 알림과 연결된 사용자인지 구분이 현재 안감. 디자이너/퍼블리셔와 얘기하여 수정 필요
										usrRangeIcon.addClass("text-primary");
										fnSetOptValue(usrRangeIcon, "data-bs-toggle", "tooltip");
										fnSetOptValue(usrRangeIcon, "data-bs-placement", "top");
										fnSetOptValue(usrRangeIcon, "data-bs-custom-class", "tooltip-inverse");
										fnSetOptValue(usrRangeIcon, "data-bs-dismiss", "click");
										fnSetOptValue(usrRangeIcon, "title", $.osl.lang("template.item.tooltip.alarmUsr"));
										fnSetOptValue(usrRangeIcon, "data-title-lang-cd", "template.item.tooltip.alarmUsr");
										*/
										//아이콘에 데이터 옵션 추가 
										fnSetOptValue(usrRangeIcon, "data-alarm-use-elem", "true");
										/*
										//툴팁 세팅
										OSLApp.initTooltips();
										*/
									}
									
									//기간 항목 알람 연결
									fnSetItemOptValue(topElem, "itemAlarmUseCd", "01");
									//2025.01.07 - 기간 항목에 알림 아이콘 삽입
									$(armIconHtml01).insertBefore(topElem.find(".osl-evt__template-item"));
									
									//현재 기간 아이콘 색상 변경 및 알람과 연결된 기간입니다라고 표출되는 툴팁 추가
									dateRangeIcon = topElem.find(".osl-evt__grid-stack-item-label > i");
									/*
									//TODO 알림과 연결된 기간인지 구분이 현재 안감. 디자이너/퍼블리셔와 얘기하여 수정 필요
									dateRangeIcon.addClass("text-primary");
									fnSetOptValue(dateRangeIcon, "data-bs-toggle", "tooltip");
									fnSetOptValue(dateRangeIcon, "data-bs-placement", "top");
									fnSetOptValue(dateRangeIcon, "data-bs-custom-class", "tooltip-inverse");
									fnSetOptValue(dateRangeIcon, "data-bs-dismiss", "click");
									fnSetOptValue(dateRangeIcon, "title", $.osl.lang("template.item.tooltip.settingAlarm"));
									fnSetOptValue(dateRangeIcon, "data-title-lang-cd", "template.item.tooltip.settingAlarm");
									*/
									//아이콘에 데이터 옵션 추가 
									fnSetOptValue(dateRangeIcon, "data-alarm-use-elem", "true");
									/*
									//툴팁 세팅
									OSLApp.initTooltips();
									*/
									//설정 상태값 적용
									$("#"+field)[0].checked = checked;
								}
							}
							//confirm으로 인해 이후 로직이 있으면 안됨
						}
						//confirm으로 인해 이후 로직이 있으면 안됨
					},
				},
				"TIME_LIMIT" : {
					"icon" : "fa fa-edit",
					"tooltip" : "",
					"type" : "checkbox",
					"label" : "template.setting.label.timeLimitUseCd", //기간 제한 설정 유무
					"field" : "timeLimitUseCd",
					"name" : "itemTimeLimitUseCd",
					"default" : "02",
					"required" : "false",
					"mstCd" : "CMM00001",
					"notCdList":[],
					"subOption" : ["MAX_TIME_LIMIT"],
					"event" : function(targetId, mainOptNm, tplItemId, settingConfig){
						var field = itemSettingOption["main"][mainOptNm]["field"];
						var name = itemSettingOption["main"][mainOptNm]["name"];
						
						var optNm = fnFindConfCheckOpt("itemId"); //ex_ gs-id
						var targetElem = $(`.osl-evt__grid-stack-item[${optNm}="${tplItemId}"] .osl-evt__grid-stack-item-content.active`);
						var topElem = targetElem.closest(".osl-evt__grid-stack-item");
						var itemElem = targetElem.find(".osl-evt__template-item");
						
						//현재 아이템 설정 값 가져오기
						var selItemInfo = fnGetItemValues(topElem, true);
						
						var checked = false;
						if(selItemInfo[name] == "01"){
							checked = true;
						}
						
						//체크되어 있으면
						if(checked){
							//세부 옵션
							if(itemSettingOption["main"][mainOptNm].hasOwnProperty("subOption") && itemSettingOption["main"][mainOptNm]["subOption"].length > 0){
								$.each(itemSettingOption["main"][mainOptNm]["subOption"], function(idx, subOptNm){
									var subField = itemSettingOption["sub"][subOptNm]["field"];
									
									//valid를 위해 해당 항목에 osl-evt__exclude-item 제거
									$("#"+subField).removeClass("osl-evt__exclude-item");
								});
							}
							
							//세부 옵션의 경우 collapse로 표출 제어하기 때문에 클래스 변경
							$("#"+field).removeClass("collapsed").addClass("active");
							$("#"+mainOptNm+"Div").addClass("show");
						}
						//체크 해제되어 있으면
						else {
							//세부 옵션
							if(itemSettingOption["main"][mainOptNm].hasOwnProperty("subOption") && itemSettingOption["main"][mainOptNm]["subOption"].length > 0){
								$.each(itemSettingOption["main"][mainOptNm]["subOption"], function(idx, subOptNm){
									var subField = itemSettingOption["sub"][subOptNm]["field"];
									
									//valid 제외를 위해 해당 항목에 osl-evt__exclude-item 추가
									$("#"+subField).addClass("osl-evt__exclude-item");
								});
							}
							
							//세부 옵션의 경우 collapse로 표출 제어하기 때문에 클래스 변경
							$("#"+field).removeClass("active").addClass("collapsed");
							$("#"+mainOptNm+"Div").removeClass("show");
						}
						
						//설정 상태값 적용
						$("#"+field)[0].checked = checked;
						
						//해당 옵션 설정값 변경
						fnSetItemOptValue(itemElem, name, checked? "01" : "02");
						
						//세부 항목이 있으면 이벤트 실행
						if(itemSettingOption["main"][mainOptNm].hasOwnProperty("subOption") && itemSettingOption["main"][mainOptNm]["subOption"].length > 0){
							$.each(itemSettingOption["main"][mainOptNm]["subOption"], function(idx, subOptNm){
								if(itemSettingOption["sub"][subOptNm].hasOwnProperty("event") && typeof itemSettingOption["sub"][subOptNm]["event"]== "function"){
									//param : 설정 객체 id, 메인 옵션명, 선택 객체 id, settingConfig
									//tplItemId로 안하고 itemId로 하는 이유는 신규 추가되는 항목의 경우 tplItemId는 모두 루트 아이템으로 지정되어 있기 때문
									itemSettingOption["sub"][subOptNm]["event"](targetId, subOptNm, tplItemId, settingConfig);
								}
							});
						}
					},
				},
				"PRE_CONNECTION_TEXT" : {
					"icon" : "fa fa-edit",
					"tooltip" : "",
					"type" : "checkbox",
					"label" : "template.setting.label.connectionUseCd", //선행 지식 처리를 위한 옵션 여부
					"field" : "connectionUseCd",
					"name" : "itemConnectionUseCd",
					"default" : "02",
					"required" : "false",
					"mstCd" : "CMM00001",
					"notCdList":[],
					"subOption" : [],
					"event" : function(targetId, mainOptNm, tplItemId, settingConfig){
					},
				},
				"OPTION_ADD_DEL" : { //체크박스에서만 사용
					"icon" : "fa fa-edit",
					"tooltip" : "",
					"type" : "checklist-item",
					"label" : "template.setting.label.optionAddNDel", //옵션 갯수
					"field" : "itemSubOptionList",
					"name" : "itemSubOptionList",
					"default" : "2",
					"required" : "false",
					"min" : 1,
					"max" : 30,
					"mstCd" : null,
					"notCdList":[],
					"subOption" : [],
					"event" : function(targetId, mainOptNm, tplItemId, settingConfig){
						var field = itemSettingOption["main"][mainOptNm]["field"];
						var name = itemSettingOption["main"][mainOptNm]["name"];
						
						var optNm = fnFindConfCheckOpt("itemId"); //ex_ gs-id
						var targetElem = $(`.osl-evt__grid-stack-item[${optNm}="${tplItemId}"] .osl-evt__grid-stack-item-content.active`);
						//var topElem = targetElem.closest(".osl-evt__grid-stack-item");
						var topElem = targetElem.closest(".osl-evt__grid-stack-item");
						
						//현재 아이템 설정 값 가져오기
						var selItemInfo = fnGetItemValues(topElem, true);
						
						//세부 항목이 있으면 이벤트 실행 - 해당 로직에서 옵션 추가/삭제
						if(itemSettingOption["main"][mainOptNm].hasOwnProperty("subOption") && itemSettingOption["main"][mainOptNm]["subOption"].length > 0){
							$.each(itemSettingOption["main"][mainOptNm]["subOption"], function(idx, subOptNm){
								if(itemSettingOption["sub"][subOptNm].hasOwnProperty("event") && typeof itemSettingOption["sub"][subOptNm]["event"]== "function"){
									//param : 설정 객체 id, 메인 옵션명, 선택 객체 id, settingConfig
									//tplItemId로 안하고 itemId로 하는 이유는 신규 추가되는 항목의 경우 tplItemId는 모두 루트 아이템으로 지정되어 있기 때문
									itemSettingOption["sub"][subOptNm]["event"](targetId, subOptNm, tplItemId, settingConfig);
								}
							});
						}
						
						//다중 선택일 때
						if(selItemInfo["itemMultiSelCd"] == "01"){
							//MIN_VAL, MAX_VAL과 연관되어 있음
							//param : 설정 객체 id, 메인 옵션명, 선택 객체 id, settingConfig
							itemSettingOption["sub"]["MIN_VAL"]["event"](targetId ,"MIN_VAL", tplItemId, settingConfig);
							//param : 설정 객체 id, 메인 옵션명, 선택 객체 id, settingConfig
							itemSettingOption["sub"]["MAX_VAL"]["event"](targetId ,"MAX_VAL", tplItemId, settingConfig);
						}
					},
				},
				"MULTI_SELECT" : { //MULTI_TAG_SELECT와 동시 사용 금지
					"icon" : "fa fa-edit",
					"tooltip" : "",
					"type" : "checkbox",
					"label" : "template.setting.label.multiSelCd", //다중 선택 가능 여부
					"field" : "itemMultiSelCd",
					"name" : "itemMultiSelCd",
					"default" : "02",
					"required" : "false",
					"mstCd" : "CMM00001",
					"notCdList":[],
					"subOption" : ["MIN_VAL", "MAX_VAL"],
					"event" : function(targetId, mainOptNm, tplItemId, settingConfig){
						var field = itemSettingOption["main"][mainOptNm]["field"];
						var name = itemSettingOption["main"][mainOptNm]["name"];
						
						var optNm = fnFindConfCheckOpt("itemId"); //ex_ gs-id
						var targetElem = $(`.osl-evt__grid-stack-item[${optNm}="${tplItemId}"] .osl-evt__grid-stack-item-content.active`);
						//osl-evt__grid-stack-item;
						var topElem = targetElem.parent();
						var itemElem = targetElem.find(".osl-evt__template-item");
						
						//현재 아이템 설정 값 가져오기
						var selItemInfo = fnGetItemValues(targetElem, true);
						
						var checked = false;
						if(selItemInfo[name] == "01"){
							checked = true;
						}
						
						//하위 모든 체크리스트 옵션
						var chkListDiv = topElem.find(".osl-evt__template-item.osl-evt__template-item--check-list");
						var chkList = chkListDiv.find(".osl-evt__template-item--check-item");
						
						//타입(checkbox, radio)
						var changeType = "radio";
						if(checked){
							changeType = "checkbox";
						}
						
						var itemMinCnt = 0;
						//체크박스이면 최소 1개 그려져 있어야 한다 **단순 확인 용도로 체크를 위한 경우가 있기 때문에 1개까지 지정 가능해야 한다.
						if(changeType == "checkbox") {
							itemMinCnt = 1;
						}
						//라디오박스이면 최소 2개 그려져 있어야 한다
						else{
							itemMinCnt = 2;
						}
						
						//OPTION_ADD_DEL과도 연관 있음
						var repeaterArea = $(".osl-evt__grid-stack-setting-item#OPTION_ADD_DEL #"+itemSettingOption["main"]["OPTION_ADD_DEL"]["field"]);
						
						//항목 갯수 체크 - 최소 갯수 미만이면
						if(chkList.length <= itemMinCnt) {
							if(chkList.length < itemMinCnt) {
								//var targetListElem = topElem.find(".osl-evt__template-item.osl-evt__template-item--check-list");
								//옵션 추가 그리기(모자라는 만큼만)
								for(var c=0; c < itemMinCnt-chkList.length; c++) {
									//fnCheckItemHtml(targetListElem);
									//옵션 추가 버튼 클릭
									$(".osl-evt__grid-stack-setting-item#OPTION_ADD_DEL").find(".osl-evt__repeater-add-btn").click();
								}
							}
							//최소갯수 이하 제거 불가능하도록 삭제버튼 미표출
							repeaterArea.find(".osl-evt__repeater-item .osl-evt__repeater-delete-btn").prop("disabled", true).addClass("d-none");
							repeaterArea.find(".osl-evt__repeater-item .osl-evt__repeater-delete-btn").siblings(".osl-evt__repeater-text-input").addClass("rounded-end");
						}
						//최소 갯수 초과 존재하면 삭제버튼 표출
						//다중선택에서 단순 선택(체크박스->라디오)이 되면 최소 갯수 이상이 되기 때문에
						else {
							repeaterArea.find(".osl-evt__repeater-item .osl-evt__repeater-delete-btn").prop("disabled", false).removeClass("d-none");
							repeaterArea.find(".osl-evt__repeater-item .osl-evt__repeater-delete-btn").siblings(".osl-evt__repeater-text-input").removeClass("rounded-end");
						}
						
						//현재 옵션 개별 필수가 있는지 확인
						var currentOptRequiredCnt = chkListDiv.find(".osl-evt__template-item--check-item["+fnFindConfCheckOpt("optEssentialCd")+"=01]").length;
						//라디오이면 옵션 세부 필수도 하나
						if(changeType == "radio"){
							if(currentOptRequiredCnt > 1){
								//옵션 영역에서 필수 체크 모두 해제
								repeaterArea.find(".osl-evt__item--required-check-item").prop("checked", false);
								
								//모두 제거되었으므로 옵션별 data도 수정
								$.each(chkList, function(c, chkElem){
									//대상에 필수 제거
									fnSetOptValue(chkElem, fnFindConfCheckOpt("optEssentialCd"), "02");
									$(chkElem).removeAttr("required");
									$(chkElem).siblings(".osl-evt__grid-stack-item--opt-label").removeClass("required");
								});
								
								//"필수 옵션은 1개만 선택 가능합니다.<br/><br/>기존 선택된 필수 옵션은 모두 해제됩니다."
								$.osl.alert($.osl.lang("template.message.alert.requiredOneOpt")+"<br/><br/>"+$.osl.lang("template.message.alert.unSelectedRequired"));
							}
						}
						
						//그리드 스택
						var keyPathBtnShow = false;
						var keyPathBtnEvt = false;
						if(targetElem.closest(".grid-stack").length > 0){
							var gridStackElem = targetElem.closest(".grid-stack");
							var gridStackObj = $.osl.templateForm.gridStack.list[gridStackElem.attr("id")];
							if(!$.osl.isNull(gridStackObj)){
								keyPathBtnShow = gridStackObj["showLinkKeyBtn"];
								if($.osl.isNull(keyPathBtnShow)){
									keyPathBtnShow = false;
								}
								keyPathBtnEvt = gridStackObj["linkKeyEvt"];
								if($.osl.isNull(keyPathBtnEvt)){
									keyPathBtnEvt = false;
								}
							}
							//키 맵핑 연결일 때
							if(keyPathBtnEvt){
								targetElem.find(".osl-evt__grid-stack-keypath-icon").removeClass("cursor-pointer");
							}
							//키 맵핑 버튼 보여야 할 때
							if(keyPathBtnShow){
								//체크 상태에 따라 항목의 매핑 최상위(항목 키맵핑) show/hide
								//다중 선택이므로(체크박스)
								if(checked){
									//항목의 키맵핑 영역은 안보이기
									targetElem.find(".osl-evt__grid-stack-keypath-header").addClass("d-none").hide();
									targetElem.find(".osl-evt__grid-stack-keypath-icon:not(.osl-evt__grid-stack-keypath-header) > i").removeClass("fa-filter").addClass("fa-key");
								}
								//다중 선택이 아니므로(라디오박스)
								else{
									//항목의 키맵핑 영역 보이기
									targetElem.find(".osl-evt__grid-stack-keypath-header").removeClass("d-none").show();
									targetElem.find(".osl-evt__grid-stack-keypath-icon:not(.osl-evt__grid-stack-keypath-header) > i").removeClass("fa-key").addClass("fa-filter");
								}
							}
							else{
								targetElem.find(".osl-evt__grid-stack-keypath-icon").addClass("d-none").hide();
							}
						}
						
						if(checked){
							$.each(chkList, function(c, chkItem){
								chkItem.type = "checkbox";
								//name은 옵션 id 따라가기
								chkItem.name = chkItem.id;
							});
							
							//세부 옵션
							if(itemSettingOption["main"][mainOptNm].hasOwnProperty("subOption") && itemSettingOption["main"][mainOptNm]["subOption"].length > 0){
								$.each(itemSettingOption["main"][mainOptNm]["subOption"], function(idx, subOptNm){
									var subField = itemSettingOption["sub"][subOptNm]["field"];
									
									//valid를 위해 해당 항목에 osl-evt__exclude-item 제거
									$("#"+subField).removeClass("osl-evt__exclude-item");
								});
							}
							
							//세부 옵션의 경우 collapse로 표출 제어하기 때문에 클래스 변경
							$("#"+field).removeClass("collapsed").addClass("active");
							$("#"+mainOptNm+"Div").addClass("show");
							
						}else{
							$.each(chkList, function(c, chkItem){
								chkItem.type = "radio";
								//name은 항목 id 따라가기
								chkItem.name = topElem.find(".osl-evt__template-item.osl-evt__template-item--check-list").attr("id");
							});
							
							//세부 옵션
							if(itemSettingOption["main"][mainOptNm].hasOwnProperty("subOption") && itemSettingOption["main"][mainOptNm]["subOption"].length > 0){
								$.each(itemSettingOption["main"][mainOptNm]["subOption"], function(idx, subOptNm){
									var subField = itemSettingOption["sub"][subOptNm]["field"];
									
									//valid 제외를 위해 해당 항목에 osl-evt__exclude-item 추가
									$("#"+subField).addClass("osl-evt__exclude-item");
								});
							}
							
							//세부 옵션의 경우 collapse로 표출 제어하기 때문에 클래스 변경
							$("#"+field).removeClass("active").addClass("collapsed");
							$("#"+mainOptNm+"Div").removeClass("show");
						}
						
						//설정 상태값 적용
						$("#"+field)[0].checked = checked;
						
						//해당 옵션 설정값 변경
						fnSetItemOptValue(itemElem, name, checked? "01" : "02");
						
						//세부 항목이 있으면 이벤트 실행
						if(itemSettingOption["main"][mainOptNm].hasOwnProperty("subOption") && itemSettingOption["main"][mainOptNm]["subOption"].length > 0){
							$.each(itemSettingOption["main"][mainOptNm]["subOption"], function(idx, subOptNm){
								if(itemSettingOption["sub"][subOptNm].hasOwnProperty("event") && typeof itemSettingOption["sub"][subOptNm]["event"]== "function"){
									//param : 설정 객체 id, 메인 옵션명, 선택 객체 id, settingConfig
									//tplItemId로 안하고 itemId로 하는 이유는 신규 추가되는 항목의 경우 tplItemId는 모두 루트 아이템으로 지정되어 있기 때문
									itemSettingOption["sub"][subOptNm]["event"](targetId, subOptNm, tplItemId, settingConfig);
								}
							});
						}
						
						//문구 표출
						if(checked){
							targetElem.find(".osl-evt__grid-stack-item-multi-message").removeClass("d-none");
						}
						else {
							targetElem.find(".osl-evt__grid-stack-item-multi-message").addClass("d-none");
						}
					}
				},
				"MULTI_TAG_SELECT" : { //MULTI_SELECT와 동시 사용 금지
					"icon" : "fa fa-edit",
					"tooltip" : "",
					"type" : "checkbox",
					"label" : "template.setting.label.multiSelCd", //다중 선택 가능 여부
					"field" : "itemMultiTagSelCd",
					"name" : "itemMultiSelCd",
					"default" : "02",
					"required" : "false",
					"mstCd" : "CMM00001",
					"notCdList":[],
					"subOption" : [],
					"event" : function(targetId, mainOptNm, tplItemId, settingConfig){
						var field = itemSettingOption["main"][mainOptNm]["field"];
						var name = itemSettingOption["main"][mainOptNm]["name"];
						
						var optNm = fnFindConfCheckOpt("itemId"); //ex_ gs-id
						var targetElem = $(`.osl-evt__grid-stack-item[${optNm}="${tplItemId}"] .osl-evt__grid-stack-item-content.active`);
						//osl-evt__grid-stack-item;
						var topElem = targetElem.parent();
						var itemElem = targetElem.find(".osl-evt__template-item");
						
						//현재 아이템 설정 값 가져오기
						var selItemInfo = fnGetItemValues(targetElem, true);
						
						var checked = false;
						if(selItemInfo[name] == "01"){
							checked = true;
						}
						
						//TPL00001 양식 분류 : 01정보자산 02보안 03기본항목 04보안사고 05 자료관리
						if(selItemInfo["tplClsType"] == "02" || selItemInfo["tplClsType"] == "03"){
							//보안 또는 기본항목인 경우 무조건 다중 선택이어야 한다.
							if(!checked){
								//다시 설정 변경
								fnSetItemOptValue(topElem, "itemMultiSelCd", "01");
								checked = true;
								
								//경고 문구 표출
								$.osl.alert($.osl.lang("template.message.alert.onlyUsedMultiSelCfg"));
							}
						}
						
						//체크되어 있으면
						if(checked){
							//osl-evt__tag-form 표출
							$(targetElem).find(".osl-evt__tag-form").removeClass("d-none");
						}
						//체크 해제되어 있으면
						else {
							//osl-evt__tag-form 표출 제거
							$(targetElem).find(".osl-evt__tag-form").addClass("d-none");
						}
						
						//현재 아이템이 존재하는 그리드 스텍 영역이 있다면
						var currentGridStack = $(targetElem).closest(".grid-stack")[0].gridstack;
						
						if(!$.osl.isNull(currentGridStack)){
							//아이템 사이즈 반영
							//체크되어 있으면
							if(checked){
								currentGridStack.update(topElem[0], {h:2});
								
								//높이 조절
								fnItemHeightSize(topElem, currentGridStack["opts"]["cellHeight"]);
							}
							//체크 해제되어 있으면
							else{
								currentGridStack.update(topElem[0], {h:1});
							}
						}
						
						//설정 상태값 적용
						$("#"+field)[0].checked = checked;
						
						//해당 옵션 설정값 변경
						fnSetItemOptValue(itemElem, name, checked? "01" : "02");
					}
				},
				"SELECT_MAX_USER" : {
					"icon" : "fa fa-edit",
					"tooltip" : "",
					"type" : "number",
					"label" : "template.setting.label.selectedMaxUser", //최대 사용자 수
					"field" : "itemSelUsrMaxVal",
					"name" : "itemSelUsrMaxVal",
					"default" : "1",
					"required" : "true",
					"mstCd" : null,
					"notCdList":[],
					"min" : 1,
					"max" : 200,
					"subOption" : [],
					"event" : function(targetId, mainOptNm, tplItemId, settingConfig){
						var field = itemSettingOption["main"][mainOptNm]["field"];
						var name = itemSettingOption["main"][mainOptNm]["name"];
						
						var optNm = fnFindConfCheckOpt("itemId"); //ex_ gs-id
						var targetElem = $(`.osl-evt__grid-stack-item[${optNm}="${tplItemId}"] .osl-evt__grid-stack-item-content.active`);
						//osl-evt__grid-stack-item;
						var topElem = targetElem.parent();
						var itemElem = targetElem.find(".osl-evt__template-item");
						
						//현재 아이템 설정 값 가져오기
						var selItemInfo = fnGetItemValues(targetElem, true);
						
						//입력 값
						var optVal = $("#"+field).val();
						//현재 항목이 서비스 항목의 사용자 항목이 아니면
						if(!(selItemInfo["tplEssentialItem"] == "01" && String(selItemInfo["itemCode"]) == "09")){
							optVal = 0;
						}
						else {
							//최대 최소 값
							var optFieldMax = itemSettingOption["main"][mainOptNm]["max"];
							var optFieldMin = itemSettingOption["main"][mainOptNm]["min"];
							
							if(optVal > optFieldMax){
								optVal = optFieldMax;
							}else if(optVal < optFieldMin){
								optVal = optFieldMin;
							}
							
							//뱃지 변경
							var badgeElem = $(topElem).find(".osl-evt__grid-stack-item-label .osl-evt__multi-usr-cnt");
							if(badgeElem.length == 0){
								//뱃지 추가
								$(topElem).find(".osl-evt__grid-stack-item-label").append(`
									<span class="ms-2 p-2 badge badge-sm badge-gray osl-evt__multi-usr-cnt">
										0 / ${optVal}
									</span>
								`);
							}
							else{
								//텍스트만 변경
								var cntTxt = '0 / '+ optVal;
								badgeElem.text(cntTxt);
							}
						}
						
						$("#"+field).val(optVal);
							
						//선택 항목에 정보 업데이트
						fnSetItemOptValue(topElem, name, optVal);
					}
				},
				/*
				"JIRA_FIELD_CD" : {
					"icon" : "fa fa-edit",
					"tooltip" : "",
					"type" : "checkbox",
					"label" : "template.setting.label.jiraFieldCd", //JIRA Custom Field 연결
					"field" : "jiraFieldCd",
					"name" : "jiraFieldCd",
					"default" : "02",
					"required" : "false",
					"mstCd" : "CMM00001",
					"notCdList":[],
					"subOption" : ["JIRA_FIELD"],
					"event" : function(targetId, mainOptNm, tplItemId, settingConfig) {
						$("[data-sub-option-name='JIRA_FIELD']").html('<div class="min-h-350px"></div>');
					}
				}
				*/
				"SEARCH_CD" : {
					"icon" : "fa fa-edit",
					"tooltip" : "",
					"type" : "checkbox",
					"label" : "template.setting.label.searchCd", //검색 항목 지정
					"field" : "itemSearchCd",
					"name" : "itemSearchCd", 
					"defualt" : "02",
					"required" : "false", 
					"mstCd" : "CMM00001",
					"notCdList":[],
					"subOption" : [],
					//"subOption" : ["SEARCH_CLASS"],
					"event" : function(targetId, mainOptNm, tplItemId, settingConfig) {
						var field = itemSettingOption["main"][mainOptNm]["field"];
						var name = itemSettingOption["main"][mainOptNm]["name"];
						
						var optNm = fnFindConfCheckOpt("itemId"); //ex_ gs-id
						var targetElem = $(`.osl-evt__grid-stack-item[${optNm}="${tplItemId}"] .osl-evt__grid-stack-item-content.active`);
						var topElem = targetElem.closest(".osl-evt__grid-stack-item");
						var itemElem = targetElem.find(".osl-evt__template-item");
						
						//현재 아이템 설정 값 가져오기
						var selItemInfo = fnGetItemValues(topElem, true);
						
						//만약 다건 선택이면
						if(selItemInfo["itemMultiSelCd"] == "01"){
							$("#"+field)[0].checked = false;
							//해당 옵션 설정값 변경
							fnSetItemOptValue(itemElem, name, "02");
						
							//검색 항목 숨김처리
							$("#"+mainOptNm).addClass("d-none");
							return;
						}
						
						
						var checked = false;
						if(selItemInfo[name] == "01"){
							checked = true;
						}
						
						//체크되어 있으면
						if(checked){
							//세부 옵션
							if(itemSettingOption["main"][mainOptNm].hasOwnProperty("subOption") && itemSettingOption["main"][mainOptNm]["subOption"].length > 0){
								$.each(itemSettingOption["main"][mainOptNm]["subOption"], function(idx, subOptNm){
									var subField = itemSettingOption["sub"][subOptNm]["field"];
									
									//valid를 위해 해당 항목에 osl-evt__exclude-item 제거
									$("#"+subField).removeClass("osl-evt__exclude-item");
								});
							}
							
							//세부 옵션의 경우 collapse로 표출 제어하기 때문에 클래스 변경
							$("#"+field).removeClass("collapsed").addClass("active");
							$("#"+mainOptNm+"Div").addClass("show");
						}
						//체크 해제되어 있으면
						else {
							//세부 옵션
							if(itemSettingOption["main"][mainOptNm].hasOwnProperty("subOption") && itemSettingOption["main"][mainOptNm]["subOption"].length > 0){
								$.each(itemSettingOption["main"][mainOptNm]["subOption"], function(idx, subOptNm){
									var subField = itemSettingOption["sub"][subOptNm]["field"];
									
									//valid 제외를 위해 해당 항목에 osl-evt__exclude-item 추가
									$("#"+subField).addClass("osl-evt__exclude-item");
								});
							}
							
							//세부 옵션의 경우 collapse로 표출 제어하기 때문에 클래스 변경
							$("#"+field).removeClass("active").addClass("collapsed");
							$("#"+mainOptNm+"Div").removeClass("show");
						}
						
						//설정 상태값 적용
						$("#"+field)[0].checked = checked;
						
						//해당 옵션 설정값 변경
						fnSetItemOptValue(itemElem, name, checked? "01" : "02");
						
						//세부 항목이 있으면 이벤트 실행
						if(itemSettingOption["main"][mainOptNm].hasOwnProperty("subOption") && itemSettingOption["main"][mainOptNm]["subOption"].length > 0){
							$.each(itemSettingOption["main"][mainOptNm]["subOption"], function(idx, subOptNm){
								if(itemSettingOption["sub"][subOptNm].hasOwnProperty("event") && typeof itemSettingOption["sub"][subOptNm]["event"]== "function"){
									//param : 설정 객체 id, 메인 옵션명, 선택 객체 id, settingConfig
									//tplItemId로 안하고 itemId로 하는 이유는 신규 추가되는 항목의 경우 tplItemId는 모두 루트 아이템으로 지정되어 있기 때문
									itemSettingOption["sub"][subOptNm]["event"](targetId, subOptNm, tplItemId, settingConfig);
								}
							});
						}
					}
				},
				"ITEM_ITLCK_CD" : {
					"icon" : "fa fa-edit",
					"tooltip" : "",
					"type" : "checkbox",
					"label" : "template.setting.label.itemItlckCd", //연동 항목 여부
					"field" : "itemItlckCd",
					"name" : "itemItlckCd",
					"default" : "02",
					"required" : "false",
					"mstCd" : "CMM00001",
					"notCdList":[],
					"subOption" : [],
					"event" : function(targetId, mainOptNm, tplItemId, settingConfig) {
						var field = itemSettingOption["main"][mainOptNm]["field"];
						var name = itemSettingOption["main"][mainOptNm]["name"];
						
						var optNm = fnFindConfCheckOpt("itemId"); //ex_ gs-id
						var targetElem = $(`.osl-evt__grid-stack-item[${optNm}="${tplItemId}"] .osl-evt__grid-stack-item-content.active`);
						var topElem = targetElem.closest(".osl-evt__grid-stack-item");
						var itemElem = targetElem.find(".osl-evt__template-item");
						
						//현재 아이템 설정 값 가져오기
						var selItemInfo = fnGetItemValues(topElem, true);
						
						//체크 상태
						var checked = true;
						
						//TPL00003 디바이스 항목(16)이면
						if(String(selItemInfo["itemCode"]) == "16"){
							//무조건 체크
							$("#"+field)[0].checked = checked;
							//필수
							var requiredField = itemSettingOption["main"]["REQUIRED_ITEM"]["field"];
						}
						//그 외 무조건 체크 해제
						else{
							checked != checked;
							$("#"+field)[0].checked = checked;
						}
						
						//해당 옵션 설정값 변경
						fnSetItemOptValue(itemElem, name, checked? "01" : "02");
						//적용
						$("#"+requiredField).prop("checked", checked).trigger("change");
					}
				}
			},
			"sub" : {
				"MAX_TIME_LIMIT" : {
					"icon" : "fa fa-edit",
					"tooltip" : "",
					"type" : "select",
					"label" : "template.setting.label.maxDaterangeSelect", //최대 기간 지정
					"field" : "maxDaterangeSelect",
					"name" : "itemOptionVal",
					"default" : "01",
					"required" : "false",
					"mstCd" : "TPL00004",
					"notCdList":["06"],
					"subOption" : [],
					"event" : function(targetId, subOptNm, tplItemId, settingConfig){
						var field = itemSettingOption["sub"][subOptNm]["field"];
						var name = itemSettingOption["sub"][subOptNm]["name"];
						
						var optNm = fnFindConfCheckOpt("itemId"); //ex_ gs-id
						var targetElem = $(`.osl-evt__grid-stack-item[${optNm}="${tplItemId}"] .osl-evt__grid-stack-item-content.active`);
						var topElem = targetElem.closest(".osl-evt__grid-stack-item");
						var itemElem = targetElem.find(".osl-evt__template-item");
						
						//현재 아이템 설정 값 가져오기
						var selItemInfo = fnGetItemValues(topElem, true);
						
						//selectbox 바꾸기
						if($("#"+field).length > 0){
							if( String($("#"+field).val()) != String(selItemInfo["subMstCd"])){
								$("#"+field).val(selItemInfo["subMstCd"]).change();
							}
						}
						
						//미리 보기를 위해 값 넣어두기
						//현재 선택된 최대 기간 값 가져오기
						//TPL00004 01 최대 1주일, 02 최대 2주일, 03 최대 1개월, 04 최대 3개월, 05 최대 6개월, 06 최대 1년
						//만약, 최대 기간 공통코드(TPL00004)가 변경될 경우, 이 부분도 수정되어야 한다.
						var subCode = selItemInfo["subMstCd"];
						var previewDate;
						var previewDateStr;
						
						//1주
						if(subCode == "01"){
							previewDate = new Date().getTime() + ( 7 * 24 * 60 * 60 * 1000);
							previewDateStr = new Date(previewDate).format("yyyy-MM-dd");
						}
						//2주
						else if(subCode == "02"){
							previewDate = new Date().getTime() + ( 2 * 7 * 24 * 60 * 60 * 1000);
							previewDateStr = new Date(previewDate).format("yyyy-MM-dd");
						}
						//1개월
						else if(subCode == "03"){
							previewDate = new Date().setMonth(new Date().getMonth()+1);
							previewDateStr = new Date(previewDate).format("yyyy-MM-dd");
						}
						//3개월
						else if(subCode == "04"){
							previewDate = new Date().setMonth(new Date().getMonth()+3);
							previewDateStr = new Date(previewDate).format("yyyy-MM-dd");
						}
						//6개월
						else if(subCode == "05"){
							previewDate = new Date().setMonth(new Date().getMonth()+6);
							previewDateStr = new Date(previewDate).format("yyyy-MM-dd");
						}
						//1년
						else if(subCode == "06"){
							previewDate = new Date().setMonth(new Date().getFullYear()+1);
							previewDateStr = new Date(previewDate).format("yyyy-MM-dd");
						}
						//값이 없으면 기간 제한을 하지 않았으므로
						else {
							//기본 오늘 날짜로 지정
							previewDate = new Date();
							previewDateStr = new Date(previewDate).format("yyyy-MM-dd");
						}
						
						var sampleDate = new Date().format("yyyy-MM-dd") + " ~ " + previewDateStr;
						itemElem.val(sampleDate);
						//미리 보기 용 데이터 끝
						
						//데이터 피커 제한걸기
						//daterangepicker
						var dateRangeHandle = topElem.find(".osl-evt__template-item").data("daterangepicker");
						
						if($.osl.isNull(dateRangeHandle)){
							return;
						}
						
						//오늘 자정까지
						var edDtmStr = new Date().format("yyyy-MM-dd 23:59:59");
						var edDtm = new Date(edDtmStr);
						
						//자신의 부모 설정이 체크되어 있는지 확인
						var mainOptNm = $("#"+field).closest(".osl-evt__grid-stack-setting-item").attr("id");
						var parentField = itemSettingOption["main"][mainOptNm]["field"];
						//체크되어 있으면
						if($("#"+parentField).is(":checked")){
							//기간 제한되었으므로 daterangepicker 옵션 제한
							//1주
							if(subCode == "01"){
								var oneWeekEndTime = edDtm.getTime() + ( 7 * 24 * 60 * 60 * 1000);
								edDtmStr = new Date(oneWeekEndTime).format("yyyy-MM-dd 23:59:59");
							}
							//2주
							else if(subCode == "02"){
								var twoWeekEndTime = edDtm.getTime() + ( 2 * 7 * 24 * 60 * 60 * 1000);
								edDtmStr = new Date(twoWeekEndTime).format("yyyy-MM-dd 23:59:59");
							}
							//1개월
							else if(subCode == "03"){
								var oneMonthEndTime = edDtm.setMonth(edDtm.getMonth()+1);
								edDtmStr = new Date(oneMonthEndTime).format("yyyy-MM-dd HH:mm:ss");
							}
							//3개월
							else if(subCode == "04"){
								var quarterMonthEndTime = edDtm.setMonth(edDtm.getMonth()+3);
								edDtmStr = new Date(quarterMonthEndTime).format("yyyy-MM-dd HH:mm:ss");
							}
							//6개월
							else if(subCode == "05"){
								var halfMonthEndTime = edDtm.setMonth(edDtm.getMonth()+6);
								edDtmStr = new Date(halfMonthEndTime).format("yyyy-MM-dd HH:mm:ss");
							}
							//1년
							else if(subCode == "06"){
								var oneYearEndTime = edDtm.setFullYear(edDtm.getFullYear()()+1);
								edDtmStr = new Date(oneYearEndTime).format("yyyy-MM-dd HH:mm:ss");
							}
							
							//선택된 기간 제한 값
							dateRangeHandle.maxDate = moment(edDtmStr, "YYYY-MM-DD");
							
							//만약 동시 세팅 및 입력이라면
							if(selItemInfo["configType"] == "sameTime"){
								//입력 값이 최대 기간을 넘어갈 경우 마지막 날로 변경
								//현재 입력 값
								var currentInputVal = itemElem.val();
								var rangeTime = currentInputVal.split(" ~ ");
								if(new Date(rangeTime[1]).getTime() > edDtm.getTime()){
									currentInputVal = rangeTime[0] + " ~ " + edDtm.format("yyyy-MM-dd");
									itemElem.val(currentInputVal);
								}
							}
						}
						//체크 해제되어 있으면
						else{
							//기간 제한 해제되었으므로 daterangepicker 옵션 제한 해제 -> maxDate를 10년 후로 변경
							var tenYearEndTime = edDtm.setFullYear(edDtm.getFullYear()+10);
							edDtmStr = new Date(tenYearEndTime).format("yyyy-MM-dd HH:mm:ss");
							
							dateRangeHandle.maxDate = moment(edDtmStr, "YYYY-MM-DD");
						}
						
						//해당 옵션 설정값 변경
						fnSetItemOptValue(itemElem, name, $("#"+field).val());
					},
				},
				"MIN_VAL" :{
					"icon" : "fa fa-edit",
					"tooltip" : "",
					"type" : "number",
					"label" : "template.setting.label.minVal", //최솟 값
					"field" : "itemMinVal",
					"name" : "itemMinVal",
					"default" : "0",
					"required" : "false",
					"min" : 0,
					"max" : 99999,
					"mstCd" : null,
					"notCdList":[],
					"subOption" : [],
					"event" : function(targetId, subOptNm, tplItemId, settingConfig){
						var field = itemSettingOption["sub"][subOptNm]["field"];
						var name = itemSettingOption["sub"][subOptNm]["name"];
						
						var optNm = fnFindConfCheckOpt("itemId"); //ex_ gs-id
						var targetElem = $(`.osl-evt__grid-stack-item[${optNm}="${tplItemId}"] .osl-evt__grid-stack-item-content.active`);
						var topElem = targetElem.closest(".osl-evt__grid-stack-item");
						var itemElem = targetElem.find(".osl-evt__template-item");
						
						//현재 아이템 설정 값 가져오기
						var selItemInfo = fnGetItemValues(topElem, true);
						
						var alertMessage = "";
						
						//최솟 값은 옵션 갯수를 넘길 수 없다.
						var optField = itemSettingOption["main"]["OPTION_ADD_DEL"]["field"];
						var optLength = $("#"+optField).find(".osl-evt__repeater-item").length;
						$("#"+field).attr("max", optLength);
						
						if(optLength < $("#"+field).val()) {
							if(alertMessage != ""){
								alertMessage += "<br/><br/>";
							}
							//선택 최솟 값은 옵션의 갯수를 초과할 수 없습니다.
							alertMessage += $.osl.lang("template.message.alert.overMinValOptCount");
							$("#"+field).val(optLength);
						}
						
						//최솟 값은 최댓 값을 넘길 수 없다.
						var maxValField = itemSettingOption["sub"]["MAX_VAL"]["field"];
						var maxVal = $("#"+maxValField).val();
						if(maxVal < $("#"+field).val()) {
							if(alertMessage != ""){
								alertMessage += "<br/><br/>";
							}
							//선택 최솟 값은 최댓 값을 초과할 수 없습니다.
							alertMessage += $.osl.lang("template.message.alert.overMinValMaxVal");
							$("#"+field).val(maxVal);
						}
						
						//필수이면 최솟 값 1
						if(selItemInfo["itemEssentialCd"] == "01") {
							$("#"+field).attr("min",1);
							//만약 현재 값이 1보다 작으면
							if($("#"+field).val() < 1){
								//강제로 1 지정
								$("#"+field).val(1);
							}
						}
						//필수가 아니면
						else {
							//현재 값이 0보다 크면 해당 항목을 필수로 변경 공지
							//체크리스트(다중 선택)에서 최솟 값은 해당 갯수만큼은 필수로 체크해야 함을 의미
							//sameTime에서는 필수 제외 - 옵션에서 표출하지 않으므로
							if(0 <$("#"+field).val() && selItemInfo["configType"] != "sameTime" && selItemInfo["itemMultiSelCd"] == "01"){
								if(alertMessage != ""){
									alertMessage += "<br/><br/>";
								}
								//최소 선택 수가 지정되어 해당 항목이 필수로 변경됩니다.
								alertMessage += "<span class='text-danger'>"+$.osl.lang("template.message.alert.changeRequiredMinVal")+"</span>";
								var requiredField = itemSettingOption["main"]["REQUIRED_ITEM"]["field"];
								//활성화
								$("#"+requiredField).prop("checked", true).trigger("change");
							}
						}
						
						if(alertMessage != ""){
							$.osl.alert(alertMessage);
						}
						
						//이벤트 모두 돌고 난 후에 해당 옵션 설정값 변경 - 이벤트 돌면서 해당 값이 변경되기 때문에 나중에 적용
						//선택 항목에 정보 업데이트
						fnSetItemOptValue(topElem, name, $("#"+field).val());
						
						//문구 표출
						var minVal = $("#"+field).val();
						
						var subLabelTxt = "";
						//최소 최대 같으면
						if(minVal == maxVal){
							//(maxVal)개를 선택해야 합니다.
							subLabelTxt = $.osl.lang("template.message.alert.selectOptCount",maxVal);
						}
						//같지 않으면
						else{
							//(최소 minVal개에서 최대 maxVal개 선택이 가능합니다.
							subLabelTxt = $.osl.lang("template.message.alert.selectOptCountRange", minVal, maxVal);
						}
						targetElem.find(".osl-evt__grid-stack-item-multi-message").text(subLabelTxt);
						
						//해당 옵션 설정값 변경
						fnSetItemOptValue(itemElem, name, minVal);
					},
				},
				"MAX_VAL" : {
					"icon" : "fa fa-edit",
					"tooltip" : "",
					"type" : "number",
					"label" : "template.setting.label.maxVal", //최댓 값
					"field" : "itemMaxVal",
					"name" : "itemMaxVal",
					"default" : "2",
					"required" : "false",
					"min" : 0,
					"max" : 99999,
					"mstCd" : null,
					"notCdList":[],
					"subOption" : [],
					"event" : function(targetId, subOptNm, tplItemId, settingConfig){
						var field = itemSettingOption["sub"][subOptNm]["field"];
						var name = itemSettingOption["sub"][subOptNm]["name"];
						
						var optNm = fnFindConfCheckOpt("itemId"); //ex_ gs-id
						var targetElem = $(`.osl-evt__grid-stack-item[${optNm}="${tplItemId}"] .osl-evt__grid-stack-item-content.active`);
						var topElem = targetElem.closest(".osl-evt__grid-stack-item");
						var itemElem = targetElem.find(".osl-evt__template-item");
						
						//현재 아이템 설정 값 가져오기
						var selItemInfo = fnGetItemValues(topElem, true);
						
						var alertMessage = "";
						
						//최댓 값은 옵션 갯수를 넘길 수 없다.
						var optField = itemSettingOption["main"]["OPTION_ADD_DEL"]["field"];
						var optLength = $("#"+optField).find(".osl-evt__repeater-item").length;
						
						$("#"+field).attr("max", optLength);
						
						if($("#"+field).val() > optLength) {
							//선택 최댓 값은 옵션의 갯수를 초과할 수 없습니다.
							alertMessage += $.osl.lang("template.message.alert.overMaxValOptCount");
							$("#"+field).val(optLength);
						}
						
						//최댓 값은 최솟 값보다 작으면 안된다.
						var minValField = itemSettingOption["sub"]["MIN_VAL"]["field"];
						var minVal = $("#"+minValField).val();
						$("#"+field).attr("min", minVal);
						
						if($("#"+field).val() < minVal) {
							if(alertMessage != ""){
								alertMessage += "<br/><br/>";
							}
							//최댓 값은 최솟 값보다 작을 수 없습니다.<br/>최솟 값으로 변경됩니다.
							alertMessage += $.osl.lang("template.message.alert.underMaxValMinVal");
							$("#"+field).val(minVal);
						}
						
						if(alertMessage != ""){
							$.osl.alert(alertMessage);
						}
						
						//이벤트 모두 돌고 난 후에 해당 옵션 설정값 변경 - 이벤트 돌면서 해당 값이 변경되기 때문에 나중에 적용
						//선택 항목에 정보 업데이트
						fnSetItemOptValue(topElem, name, $("#"+field).val());
						
						//문구 표출
						var maxVal = $("#"+field).val();
						
						var subLabelTxt = "";
						//최소 최대 같으면
						if(minVal == maxVal){
							subLabelTxt = "("+maxVal+"개를 선택해야 합니다.)";
						}
						//같지 않으면
						else{
							subLabelTxt = "(최소 "+minVal+"개에서 최대 "+maxVal+"개 선택이 가능합니다.)";
						}
						targetElem.find(".osl-evt__grid-stack-item-multi-message").text(subLabelTxt);
						
						//해당 옵션 설정값 변경
						fnSetItemOptValue(itemElem, name, maxVal);
					},
				},
				"ALARM_RANGE" : {
					"icon" : "fa fa-edit",
					"tooltip" : "",
					"type" : "select",
					"label" : "template.setting.label.alreadyAlarm", //미리 알림
					"field" : "alarmRangeSelect",
					"name" : "itemAlarmRangeCd",
					"default" : "01",
					"required" : "false",
					"mstCd" : "TPL00005",
					"notCdList":[],
					"subOption" : [],
					"event" : function(targetId, subOptNm, tplItemId, settingConfig){
						var field = itemSettingOption["sub"][subOptNm]["field"];
						var name = itemSettingOption["sub"][subOptNm]["name"];
						
						var optNm = fnFindConfCheckOpt("itemId"); //ex_ gs-id
						var targetElem = $(`.osl-evt__grid-stack-item[${optNm}="${tplItemId}"] .osl-evt__grid-stack-item-content.active`);
						var topElem = targetElem.closest(".osl-evt__grid-stack-item");
						var itemElem = targetElem.find(".osl-evt__template-item");
						
						//현재 아이템 설정 값 가져오기
						var selItemInfo = fnGetItemValues(topElem, true);
						
						//selectbox 바꾸기
						if($("#"+field).length > 0){
							if( String($("#"+field).val()) != String(selItemInfo["itemAlarmRangeCd"])){
								$("#"+field).val(selItemInfo["itemAlarmRangeCd"]).change();
							}
						}
						
						//해당 옵션 설정값 변경
						fnSetItemOptValue(itemElem, name, $("#"+field).val());
					}
				}
				/*
				"JIRA_FIELD" : {
					"icon" : "fa fa-edit",
					"tooltip" : "",
					"type" : null,
					"label" : "template.setting.label.jiraFieldType", //JIRA Custom Field
					"field" : "jiraFieldType",
					"name" : "jiraFieldType",
					"default" : null,
					"required" : "false",
					"mstCd" : null,
					"notCdList":[],
					"subOption" : [],
					"event" : function(targetId, subOptNm, tplItemId, settingConfig){
						
					}
				}
				*/
				/*
				"SEARCH_CLASS" : {
					"icon" : "fa fa-edit",
					"tooltip" : "",
					"type" : "select",
					"label" : "template.setting.label.searchSelect", //검색 항목 분류 선택
					"field" : "itemSearchClsCd",
					"name" : "itemSearchClsCd",
					"default" : "01",
					"required" : "false",
					"mstCd" : "TPL00018",
					"notCdList":[],
					"subOption" : [],
					"event" : function(targetId, subOptNm, tplItemId, settingConfig){
						var field = itemSettingOption["sub"][subOptNm]["field"];
						var name = itemSettingOption["sub"][subOptNm]["name"];
						
						var optNm = fnFindConfCheckOpt("itemId"); //ex_ gs-id
						var targetElem = $(`.osl-evt__grid-stack-item[${optNm}="${tplItemId}"] .osl-evt__grid-stack-item-content.active`);
						var topElem = targetElem.closest(".osl-evt__grid-stack-item");
						var itemElem = targetElem.find(".osl-evt__template-item");
						
						//현재 아이템 설정 값 가져오기
						var selItemInfo = fnGetItemValues(topElem, true);
						//현재 설정 값 동일하면 변경 안함
						if(selItemInfo[name] == $("#"+field).val()){
							return;
						}
						
						//자기 값으로 변경
						$("#"+field).val(selItemInfo[name]).trigger("change");
						
						//해당 옵션 설정값 변경
						fnSetItemOptValue(itemElem, name, $("#"+field).val());
					}
				}
				*/
			}
	};
	
	//Conf2. optionCallItem 호출 아이템
	//TPL00003
	/* *
	 * 01 단순 텍스트 영역		02 텍스트 박스			03 텍스트 영역
	 * 04 날짜							05 일시						06 기간
	 * 07 숫자							08 체크박스				09 사용자
	 * 10 기관							11 조직						12 공통코드
	 * 13 첨부파일					14 알림						15 정보자산		16 디바이스
	 * */
	const optionCallItem = {
			//all : 모든 아이템
			"EDITOR_INPUT" : ["01"],
			"LABEL_TEXT" : ["02","03","04","05","06","07","08","09","10","11","12","13","15","16"],
			"REGEX_CHK" : ["02"],
			"COMMON_CD" : ["12"],
			"REQUIRED_ITEM" : ["02","03","04","05","06","07","08","09","10","11","12","13","14","15","16"],
			/*"UPDATE_ABLED" : ["02","03","04","05","06","07","08","09","10","11","12","13","14","15","16"],*/
			"UPDATE_ABLED" : [],
			"ALARM_USE" : ["06"],
			"TIME_LIMIT" : ["06"],
			/*"PRE_CONNECTION_TEXT" : ["02", "03"],*/
			"PRE_CONNECTION_TEXT" : [],
			"OPTION_ADD_DEL" : ["08"],
			"MULTI_SELECT" : ["08"], //MULTI_TAG_SELECT와 동시 사용 금지
			"MULTI_TAG_SELECT" : ["15"], //MULTI_SELECT와 동시 사용 금지
			"SELECT_MAX_USER" : ["09"], //서비스 항목의 사용자 항목만 사용
			/*"JIRA_FIELD_CD" : ["all"], */
			"SEARCH_CD" : ["02","03","04","05","07","09","10","11","12","13","15","16"],
			"ITEM_ITLCK_CD" : ["16"],
	};
	
	//Conf2-1. tplTypeViewItem 양식별 표출 가능한 아이템 선언
	//TPL00001 양식 유형 - 01 정보자산, 02 보안, 03 기본항목, 04 보안사고, 05 자료관리
	//TPL00003
	/* *
	 * 01 단순 텍스트 영역		02 텍스트 박스			03 텍스트 영역
	 * 04 날짜							05 일시						06 기간
	 * 07 숫자							08 체크박스				09 사용자
	 * 10 기관							11 조직						12 공통코드
	 * 13 첨부파일					14 알림						15 정보자산		16 디바이스
	 * */
	//lg 기준 기관 내/외 항목 제외
	const tplTypeViewItem = {
		//TPL00001
		/*
		"01" : ["01","02","03","04","05","06","07","08","09","10","11","12","13"],
		"02" : ["01","02","03","04","05","06","07","08","09","10","11","12","13","16"],
		"03" : ["01","02","03","04","05","06","07","08","09","10","11","12","13"],
		"04" : ["01","02","03","04","05","06","07","08","09","10","11","12","13"],
		"05" : ["01","02","03","04","05","06","07","08","09","10","11","12","13"],
		*/
		"01" : ["01","02","03","04","05","06","07","08","09","11","12","13"],
		"02" : ["01","02","03","04","05","06","07","08","09","11","12","13","16"],
		"03" : ["01","02","03","04","05","06","07","08","09","11","12","13"],
		"04" : ["01","02","03","04","05","06","07","08","09","11","12","13"],
		"05" : ["01","02","03","04","05","06","07","08","09","11","12","13"],
	};
	
	//Conf2-2. tplTypeServiceItemView 양식별 서비스 항목 표출 여부
	//TPL00001 양식 유형 - 01 정보자산, 02 보안, 03 기본항목, 04 보안사고
	const tplTypeServiceItemView = {
		//TPL00001
		"01" : false,
		"02" : true,
		"03" : false,
		"04" : false,
		"05" : false,
	};
	
	//Conf2-3. acceptItemView 양식 항목 분류 중 접수 항목 구성 시 사용 가능한 항목 정의
	//서비스 항목은 접수 항목 구성에 불가능하다.
	//lg 기준 기관 내/외 항목 제외
	//const acceptItemView = ["01","02","03","04","05","06","07","08","09","10","11","12","13"];
	const acceptItemView = ["01","02","03","04","05","06","07","08","09","11","12","13"];
	
	//Conf3. serviceRequiredItems 서비스 필수 항목
	//licGrpId, prjId, tplId, tplTypeCd, tplClsType, tplItemClsCd는 서비스 필수 항목을 만들 때 값을 넣는다.
	const serviceRequiredItems = {
			"ROOTSYSTEM_ITEM_S01" : {
				"itemCode" : "09", "itemSeq" : 1, "itemWidth" : 6, "itemHeight" : 1, "itemXpoint" : 0, "itemYpoint" : 0, "itemNm" : "요청자 명"
				,"itemEssentialCd" : "01", "itemModifyCd" : "01", "useCd" : "01", "itemAlarmUseCd" : "02", "tplEssentialItem" : "01", "itemSearchCd" : "01", "itemSearchClsCd" : "08"
				,"itemVal" : "", "itemOptionVal" : "", "itemSelUsrMaxVal" : "200"
			}
			,"ROOTSYSTEM_ITEM_S02" : {
				"itemCode" : "10", "itemSeq" : 1, "itemWidth" : 6, "itemHeight" : 1, "itemXpoint" : 6, "itemYpoint" : 0, "itemNm" : "기관 내/외"
				,"itemEssentialCd" : "01", "itemModifyCd" : "01", "useCd" : "01", "itemAlarmUseCd" : "02", "tplEssentialItem" : "01", "itemSearchCd" : "01", "itemSearchClsCd" : "10"
				,"itemVal" : "01", "itemOptionVal" : ""
			}
			,"ROOTSYSTEM_ITEM_S03" : {
				"itemCode" : "11", "itemSeq" : 1, "itemWidth" : 6, "itemHeight" : 1, "itemXpoint" : 0, "itemYpoint" : 1, "itemNm" : "소속/부서"
				,"itemEssentialCd" : "01", "itemModifyCd" : "01", "useCd" : "01", "itemAlarmUseCd" : "02", "tplEssentialItem" : "01", "itemSearchCd" : "01", "itemSearchClsCd" : "09"
				,"itemVal" : "", "itemOptionVal" : ""
			}
			,"ROOTSYSTEM_ITEM_S04" : {
				"itemCode" : "02", "itemSeq" : 1, "itemWidth" : 6, "itemHeight" : 1, "itemXpoint" : 6, "itemYpoint" : 1, "itemNm" : "이메일", "itemRegexCd" : "05"
				,"itemEssentialCd" : "01", "itemModifyCd" : "01", "useCd" : "01", "itemAlarmUseCd" : "02", "tplEssentialItem" : "01", "itemSearchCd" : "01", "itemSearchClsCd" : "03"
				,"itemVal" : "", "itemOptionVal" : ""
			}
			,"ROOTSYSTEM_ITEM_S05" : {
				"itemCode" : "02", "itemSeq" : 1, "itemWidth" : 6, "itemHeight" : 1, "itemXpoint" : 0, "itemYpoint" : 2, "itemNm" : "연락처", "itemRegexCd" : "07"
				,"itemEssentialCd" : "01", "itemModifyCd" : "01", "useCd" : "01", "itemAlarmUseCd" : "02", "tplEssentialItem" : "01", "itemSearchCd" : "01", "itemSearchClsCd" : "04"
				,"itemVal" : "", "itemOptionVal" : ""
			}
			,"ROOTSYSTEM_ITEM_S06" : {
				"itemCode" : "06", "itemSeq" : 1, "itemWidth" : 6, "itemHeight" : 1, "itemXpoint" : 6, "itemYpoint" : 2, "itemNm" : "기간"
				,"itemEssentialCd" : "01", "itemModifyCd" : "01", "useCd" : "01", "itemAlarmUseCd" : "02", "tplEssentialItem" : "01", "itemSearchCd" : "01", "itemSearchClsCd" : "11"
				,"itemVal" : "", "itemOptionVal" : "-1"
			}
	};
	
	//Conf4. modifyOptMap 객체에 수정 관련 옵션 정보 저장 시 data 매칭을 위한 변수
	const modifyOptMap = {
			modifySetCd : "modify-set",
			optTarget : "opt-target",
			optType : "opt-type",
			optTypeSub : "opt-type-sub",
			elemType : "elem-type",
			/* 연결 정보를 위한 data  - 수정 정보와도 관련이 있어 여기에도 추가 */
			hiddenId : "hidden-id",
			hiddenKey : "hidden-key",
	};
	
	//Conf5. modifyLogOpts 이력 등록을 위한 값
	const modifyLogOpts = {
			//$.osl.formDataToJsonArray 옵션 참고
			modifySet01 : "data-modify-set='01' ",
			modifySet02 : "data-modify-set='02' ",
			optTarget00 : "data-opt-target='00' ",
			optTarget01 : "data-opt-target='01' ",
			optTarget02 : "data-opt-target='02' ",
			optTarget03 : "data-opt-target='03' ",
			optTarget04 : "data-opt-target='04' ",
			optTarget05 : "data-opt-target='05' ",
			optTarget06 : "data-opt-target='06' ",
			optTarget07 : "data-opt-target='07' ",
			optTarget08 : "data-opt-target='08' ",
			optTarget09 : "data-opt-target='09' ",
			optTarget10 : "data-opt-target='10' ",
			optTarget11 : "data-opt-target='11' ",
			optTarget12 : "data-opt-target='12' ",
			optTarget13 : "data-opt-target='13' ",
			optType_1 : "data-opt-type='-1' ",
			optType01 : "data-opt-type='01' ",
			optType02 : "data-opt-type='02' ",
			optType03 : "data-opt-type='03' ",
			optType04 : "data-opt-type='04' ",
			optType05 : "data-opt-type='05' ",
			optType06 : "data-opt-type='06' ",
			optType07 : "data-opt-type='07' ",
			optType08 : "data-opt-type='08' ",
			optTypeSub00 : "data-opt-type-sub='00' ",
			optTypeSub01 : "data-opt-type-sub='01' ",
			optTypeSub02 : "data-opt-type-sub='02' ",
			optTypeSub03 : "data-opt-type-sub='03' ",
			optTypeSub04 : "data-opt-type-sub='04' ",
			optTypeSub05 : "data-opt-type-sub='05' ",
			optTypeSub06 : "data-opt-type-sub='06' ",
			elemType_1 : "data-elem-type='password' ",
			elemType01 : "data-elem-type='text' ",
			elemType02 : "data-elem-type='textarea' ",
			elemType03 : "data-elem-type='checkbox' ",
			elemType04 : "data-elem-type='date' ",
			elemType05 : "data-elem-type='datetime' ",
			elemType06 : "data-elem-type='number' ",
			elemType07 : "data-elem-type='checklist' ",//사용 안함
			elemType08 : "data-elem-type='daterange' ",
			elemType09 : "data-elem-type='alarmset' ",
			elemType10 : "data-elem-type='alarmrange' ",
	};
	
	//Conf6. modifyLogOptsStr 이력 등록을 위한 값 - 타입에 따라 합친 것
	//TPL00001에 따라 (01 정보자산, 02 보안 티켓, 03 기본항목 등) 세팅 필요
	const modifyLogOptsStr = {
		//빈 껍데기 용도
		"-1" : {
			"01" : '', "02" : '', "03" : '',
			"04" : '', "05" : '', "06" :'',
			"07" : '', "08" : '', "09" : '', "09Img" : '',
			"10" : '', "11" : '', "12" : '',
			"13" : '', "14" : '', "14Sub" : '',
			"15" : '', "16" : '',
		},
		//TPL00001 - targetCd
		//정보자산
		"01" : {
			//TPL00003 itemCode 별
			"01" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget05 + modifyLogOpts.optType01 + modifyLogOpts.elemType02,
			"02" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget05 + modifyLogOpts.optType01 + modifyLogOpts.elemType01,
			"03" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget05 + modifyLogOpts.optType01 + modifyLogOpts.elemType02,
			"04" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget05 + modifyLogOpts.optType01 + modifyLogOpts.elemType04,
			"05" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget05 + modifyLogOpts.optType01 + modifyLogOpts.elemType05,
			"06" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget05 + modifyLogOpts.optType01 + modifyLogOpts.elemType08,
			"07" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget05 + modifyLogOpts.optType01 + modifyLogOpts.elemType06,
			"08" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget05 + modifyLogOpts.optType01 + modifyLogOpts.elemType03,
			"09" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget05 + modifyLogOpts.optType04 + modifyLogOpts.elemType01 + modifyLogOpts.optTypeSub01,
			"09Img" : modifyLogOpts.modifySet02+ modifyLogOpts.optTarget05 + modifyLogOpts.optType04 + modifyLogOpts.elemType05 + modifyLogOpts.optTypeSub06,
			"10" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget05 + modifyLogOpts.optType04 + modifyLogOpts.elemType01 + modifyLogOpts.optTypeSub05,
			"11" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget05 + modifyLogOpts.optType04 + modifyLogOpts.elemType01 + modifyLogOpts.optTypeSub04,
			"12" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget05 + modifyLogOpts.optType02 + modifyLogOpts.elemType01,
			"13" : '',
			"14" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget05 + modifyLogOpts.optType05 + modifyLogOpts.elemType09,
			"14Sub" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget05 + modifyLogOpts.optType05 + modifyLogOpts.elemType10,
			"15" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget05 + modifyLogOpts.optType05 + modifyLogOpts.elemType01,
		},
		//TPL00001 - targetCd
		//보안티켓
		"02" : {
			//TPL00003 itemCode 별
			"01" : '',
			"02" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget04 + modifyLogOpts.optType01 + modifyLogOpts.elemType01,
			"03" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget04 + modifyLogOpts.optType01 + modifyLogOpts.elemType02,
			"04" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget04 + modifyLogOpts.optType01 + modifyLogOpts.elemType04,
			"05" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget04 + modifyLogOpts.optType01 + modifyLogOpts.elemType05,
			"06" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget04 + modifyLogOpts.optType01 + modifyLogOpts.elemType08,
			"07" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget04 + modifyLogOpts.optType01 + modifyLogOpts.elemType06,
			"08" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget04 + modifyLogOpts.optType01 + modifyLogOpts.elemType03,
			"09" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget04 + modifyLogOpts.optType04 + modifyLogOpts.elemType01 + modifyLogOpts.optTypeSub01,
			"09Img" : modifyLogOpts.modifySet02+ modifyLogOpts.optTarget04 + modifyLogOpts.optType04 + modifyLogOpts.elemType06 + modifyLogOpts.optTypeSub06,
			"10" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget04 + modifyLogOpts.optType04 + modifyLogOpts.elemType01 + modifyLogOpts.optTypeSub05,
			"11" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget04 + modifyLogOpts.optType04 + modifyLogOpts.elemType01 + modifyLogOpts.optTypeSub04,
			"12" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget04 + modifyLogOpts.optType02 + modifyLogOpts.elemType01,
			"13" : '',
			"14" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget04 + modifyLogOpts.optType05 + modifyLogOpts.elemType09,
			"14Sub" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget04 + modifyLogOpts.optType05 + modifyLogOpts.elemType10,
			"15" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget04 + modifyLogOpts.optType05 + modifyLogOpts.elemType01,
			"16" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget04 + modifyLogOpts.optType01 + modifyLogOpts.elemType01,
		},
		//TPL00001 - targetCd
		//기본항목
		"03" : {
			//TPL00003 itemCode 별
			"01" : '',
			"02" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget02 + modifyLogOpts.optType01 + modifyLogOpts.elemType01,
			"03" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget02 + modifyLogOpts.optType01 + modifyLogOpts.elemType02,
			"04" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget02 + modifyLogOpts.optType01 + modifyLogOpts.elemType04,
			"05" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget02 + modifyLogOpts.optType01 + modifyLogOpts.elemType05,
			"06" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget02 + modifyLogOpts.optType01 + modifyLogOpts.elemType08,
			"07" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget02 + modifyLogOpts.optType01 + modifyLogOpts.elemType06,
			"08" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget02 + modifyLogOpts.optType01 + modifyLogOpts.elemType03,
			"09" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget02 + modifyLogOpts.optType04 + modifyLogOpts.elemType01 + modifyLogOpts.optTypeSub01,
			"09Img" : modifyLogOpts.modifySet02+ modifyLogOpts.optTarget02 + modifyLogOpts.optType04 + modifyLogOpts.elemType06 + modifyLogOpts.optTypeSub06,
			"10" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget02 + modifyLogOpts.optType04 + modifyLogOpts.elemType01 + modifyLogOpts.optTypeSub05,
			"11" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget02 + modifyLogOpts.optType04 + modifyLogOpts.elemType01 + modifyLogOpts.optTypeSub04,
			"12" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget02 + modifyLogOpts.optType02 + modifyLogOpts.elemType01,
			"13" : '',
			"14" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget02 + modifyLogOpts.optType05 + modifyLogOpts.elemType09,
			"14Sub" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget02 + modifyLogOpts.optType05 + modifyLogOpts.elemType10,
			"15" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget02 + modifyLogOpts.optType05 + modifyLogOpts.elemType01,
		},
		//TPL00001 - targetCd
		//보안사고
		"04" : {
			//TPL00003 itemCode 별
			"01" : '',
			"02" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget04 + modifyLogOpts.optType01 + modifyLogOpts.elemType01,
			"03" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget04 + modifyLogOpts.optType01 + modifyLogOpts.elemType02,
			"04" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget04 + modifyLogOpts.optType01 + modifyLogOpts.elemType04,
			"05" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget04 + modifyLogOpts.optType01 + modifyLogOpts.elemType05,
			"06" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget04 + modifyLogOpts.optType01 + modifyLogOpts.elemType08,
			"07" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget04 + modifyLogOpts.optType01 + modifyLogOpts.elemType06,
			"08" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget04 + modifyLogOpts.optType01 + modifyLogOpts.elemType03,
			"09" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget04 + modifyLogOpts.optType04 + modifyLogOpts.elemType01 + modifyLogOpts.optTypeSub01,
			"09Img" : modifyLogOpts.modifySet02+ modifyLogOpts.optTarget04 + modifyLogOpts.optType04 + modifyLogOpts.elemType06 + modifyLogOpts.optTypeSub06,
			"10" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget04 + modifyLogOpts.optType04 + modifyLogOpts.elemType01 + modifyLogOpts.optTypeSub05,
			"11" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget04 + modifyLogOpts.optType04 + modifyLogOpts.elemType01 + modifyLogOpts.optTypeSub04,
			"12" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget04 + modifyLogOpts.optType02 + modifyLogOpts.elemType01,
			"13" : '',
			"14" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget04 + modifyLogOpts.optType05 + modifyLogOpts.elemType09,
			"14Sub" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget04 + modifyLogOpts.optType05 + modifyLogOpts.elemType10,
			"15" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget04 + modifyLogOpts.optType05 + modifyLogOpts.elemType01,
		},
		//TPL00001 - targetCd
		//자료관리
		"05" : {
			//TPL00003 itemCode 별
			"01" : '',
			"02" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget04 + modifyLogOpts.optType01 + modifyLogOpts.elemType01,
			"03" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget04 + modifyLogOpts.optType01 + modifyLogOpts.elemType02,
			"04" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget04 + modifyLogOpts.optType01 + modifyLogOpts.elemType04,
			"05" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget04 + modifyLogOpts.optType01 + modifyLogOpts.elemType05,
			"06" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget04 + modifyLogOpts.optType01 + modifyLogOpts.elemType08,
			"07" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget04 + modifyLogOpts.optType01 + modifyLogOpts.elemType06,
			"08" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget04 + modifyLogOpts.optType01 + modifyLogOpts.elemType03,
			"09" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget04 + modifyLogOpts.optType04 + modifyLogOpts.elemType01 + modifyLogOpts.optTypeSub01,
			"09Img" : modifyLogOpts.modifySet02+ modifyLogOpts.optTarget04 + modifyLogOpts.optType04 + modifyLogOpts.elemType06 + modifyLogOpts.optTypeSub06,
			"10" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget04 + modifyLogOpts.optType04 + modifyLogOpts.elemType01 + modifyLogOpts.optTypeSub05,
			"11" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget04 + modifyLogOpts.optType04 + modifyLogOpts.elemType01 + modifyLogOpts.optTypeSub04,
			"12" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget04 + modifyLogOpts.optType02 + modifyLogOpts.elemType01,
			"13" : '',
			"14" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget04 + modifyLogOpts.optType05 + modifyLogOpts.elemType09,
			"14Sub" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget04 + modifyLogOpts.optType05 + modifyLogOpts.elemType10,
			"15" : modifyLogOpts.modifySet01+ modifyLogOpts.optTarget04 + modifyLogOpts.optType05 + modifyLogOpts.elemType01,
		},
	};
	
	//Conf7. confCheckOpt item data-* 옵션 명칭 또는 그리드스택 관련 명칭을 맞추기 위한 map
	const confCheckOpt = {
		nomal :{
			"itemViewOrd" : "tabindex",
			"itemNm" : "title",
		},
		data : {
			"licGrpId" : "lic-grp-id",
			"prjId" : "prj-id",
			"tplId" : "template",
			"tplItemId" : "tpl-item-id",
			"itemCode" : "item-code",
			"tplItemClsCd" : "item-cls-code",
			"tplClsType" : "tpl-cls-type",
			"tplTypeCd" : "tpl-type-cd",
			"tplEssentialItem" : "essential-item",
			"itemSelUsrMaxVal" : "select-usr-count",
			"itemEssentialCd" : "essential-cd",
			"itemAlarmUseCd" : "alarm-use-cd",
			"itemAlarmRangeCd" : "already-alarm-cd",
			"itemConnectionUseCd" : "connection-use-cd",
			"itemTimeLimitUseCd" : "time-limit-use-cd",
			"itemMultiSelCd" : "multi-sel-cd",
			"itemSearchCd" : "search-cd",
			"itemSearchClsCd" : "search-class-cd",
			"itemMinVal" : "min-val",
			"itemMaxVal" : "max-val",
			"itemModifyCd" : "modify-cd",
			"itemRegexCd" : "item-regex-cd",
			"itemItlckCd" : "item-interlock-cd",
			"useCd" : "item-use-cd",
			"sevId" : "sever",
			"mapId" : "map-id",
			"mapItemId" : "map-item-id",
			"keyPath" : "key-path",
			"mstCd": "cmm-code",
			"subMstCd": "cmm-sub-code",
			"alarmUsr" : "elem-type",
			"itemOptionVal" : "item-opt-val",
			"optEssentialCd" : "item-opt-required",
			"configType" :"content-type",
			"hiddenId" : "hidden-id",
			"hiddenKey" : "hidden-key",
			//jamf
			"api01" : "device-param-first",
			"api02" : "device-param-second",
			"api03" : "device-param-third",
		},
		grid : {
			"itemId" : "gs-id",
			"itemWidth" : "gs-w",
			"itemHeight" : "gs-h",
			"itemXpoint" : "gs-x",
			"itemYpoint" : "gs-y",
		}
	};
	
	//Conf8. confCheckOptPosition 항목 그릴 때 사용될 옵션 지정 위치
	const confCheckOptPosition = {
			//osl-evt__grid-stack-item : 변경된 값들 보관하기
			top : ["tplItemId"						, "itemId"						, "itemCode"
					, "itemWidth"						, "itemHeight"				, "itemXpoint"				, "itemYpoint"
					, "itemViewOrd"				, "tplClsType"						, "tplTypeCd"					, "tplItemClsCd"			, "itemRegexCd"
					, "tplEssentialItem"		, "itemSelUsrMaxVal"			, "itemEssentialCd"		, "itemAlarmUseCd"		,"itemAlarmRangeCd"			, "alarmUsr"
					, "itemConnectionUseCd", "itemMultiSelCd"		, "itemSearchCd"			,"itemModifyCd"
					, "subMstCd"						, "itemTimeLimitUseCd"	, "itemOptionVal"		, "itemSearchClsCd"
					, "itemMinVal"					, "itemMaxVal"], 
			//데이터 보관을 위한 옵션 지정 위치 : osl-evt__grid-stack-item-content에 넣어두기
			dbColumn : ["licGrpId"							, "prjId"							, "tplId"				,"tplItemId"					, "itemId"						, "itemCode"
								, "itemWidth"					, "itemHeight"				, "itemXpoint"				, "itemYpoint"
								, "itemViewOrd"				, "tplClsType"					, "tplTypeCd"				, "tplItemClsCd"			, "itemRegexCd"			,"itemItlckCd"
								, "tplEssentialItem"		, "itemSelUsrMaxVal"			, "itemEssentialCd"		, "itemAlarmUseCd"			,"itemAlarmRangeCd"
								, "itemConnectionUseCd", "itemMultiSelCd"		, "itemSearchCd"			, "itemModifyCd"
								, "itemTimeLimitUseCd"	, "itemOptionVal"			, "itemSearchClsCd"
								, "itemMinVal"					, "itemMaxVal"
								, "sevId"						, "mapId"			,"mapItemId"					, "keyPath"						, "useCd"
								, "configType"],
			//osl-evt__template-item
			main : ["itemCode"					, "itemId"								, "itemViewOrd"					, "tplItemClsCd"
						, "itemRegexCd"			, "tplEssentialItem"		, "itemSelUsrMaxVal"				, "itemEssentialCd"
						, "itemAlarmUseCd"		,"itemAlarmRangeCd"					, "alarmUsr"							, "itemConnectionUseCd"			,"itemItlckCd"
						, "itemMultiSelCd"		, "itemSearchCd"					, "itemModifyCd"
						, "itemSearchClsCd"		, "itemMinVal"						, "itemMaxVal"
						, "sevId"				, "mapId"								,"mapItemId"							, "keyPath"
						,"api01"				,"api02"						,"api03"],
			//osl-evt__template-sub-item
			sub : ["itemCode"					, "itemId"								, "itemViewOrd"					, "tplItemClsCd"
					, "itemRegexCd"			, "tplEssentialItem"		, "itemSelUsrMaxVal"				, "itemEssentialCd"
					, "itemAlarmUseCd"		,"itemAlarmRangeCd"					,"itemAlarmRangeCd"					, "alarmUsr"							, "itemConnectionUseCd"
					, "itemMultiSelCd"		, "itemSearchCd"					, "itemModifyCd"
					, "itemSearchClsCd"		, "itemMinVal"						, "itemMaxVal"
					, "sevId"				, "mapId"							,"mapItemId"								, "keyPath"],
			//osl-evt__template-hide-item
			hide : ["hiddenId"					,"hiddenKey"],
			//osl-evt__grid-stack-keypath-icon
			keyBtn : ["mapItemId"			, "tplItemId"			, "sevId"				, "mapId"				, "keyPath"],
	};
	
	//Conf9. itemIcons 항목 별 아이콘 TPL00003
	const itemIcons = {
			"01" : 'osl-icon osl-icon-text',
			"02" : 'osl-icon osl-icon-text',
			"03" : 'osl-icon osl-icon-text',
			"04" : 'osl-icon osl-icon-calendar',
			"05" : 'osl-icon osl-icon-calendar',
			"06" : 'osl-icon osl-icon-calendar',
			"07" : 'osl-icon osl-icon-digit',
			"08" : 'osl-icon osl-icon-select-box',
			"09" : 'osl-icon osl-icon-person-add',
			"09Sub" : '',
			"10" : 'osl-icon osl-icon-group',
			"11" : 'osl-icon osl-icon-group',
			"12" : 'osl-icon osl-icon-select-box',
			"13" : 'osl-icon osl-icon-attach-file',
			"14" : 'osl-icon osl-icon-select-box',
			"14Sub" : 'osl-icon osl-icon-calendar',
			"15" : 'fas fa-hashtag',
			"16" : 'osl-icon osl-icon-pin',
	};
	
	//Conf10. defaultGridStackOpts 그리드스택 기본 옵션
	const defaultGridStackOpts = {
			"float" : true, //false 향후 반응형을 위해서라도 여백은 허용하지 말아야 한다.
			animate : true,
			acceptWidgets : false,
			disableOneColumnMode : true,
			oneColumnModeDomSort: false,
			margin: 0,
			marginUnit: "px",
			cellHeight : 106,
			cellHeightThrottle: 100,
			cellHeightUnit : "px",
			disableDrag : true,
			disableResize : true,
			handle : '.osl-template-handle',
			//*****function(evt, items)*****//
			added : $.noop, //form으로 추가되었을 때
			change : $.noop, //변경 중/완료
			resizestart : $.noop, //사이즈 변경 시작
			resizestop : $.noop, //사이즈 변경 중지
			dragstart : $.noop, //드래그 시작
			dragstop : $.noop, //드래그 중지
			removed : $.noop, //form으로 나갔을 때
			custom : {}
	};
	
	//param. settingOptionList 항목 별 설정을 위한 옵션 세팅된 리스트
	let settingOptionList = { //value - usrConfig
			baseSettingArea : {}, //key - setting area
			baseTargetClickArea : {}, //key - targetClickArea
			baseCloseSettingBtn : {}, // key - closeSettingBtn
	};
	//param. settingEditor 설정창 에디터 세팅
	let settingEditor = {}; //key - setting area
	//param. templateReactType 반응형 적용을 하고 있는지 체크하기 위한 변수
	let templateReactType = false;
	
	//Ajax01. fnGetFormData 폼 그리기를 위한 항목 조회
	/* *
	 * function 명 : fnGetFormData
	 * function 설명 : 폼 그리기를 위한 항목 조회 - 양식 폼 가져오기
	 * param datas : 옵션
	 * param ajaxSuccessCallbackFn: ajax 항목 조회 성공 후 동작할 function
	 * */
	const fnGetFormData = function(datas, ajaxSuccessCallbackFn){
		let targetConfig = fnExtendConfig(datas);
		
		//ajax 설정
		var ajaxObj = new $.osl.ajaxRequestAction({
			"url" : "/tpl/tpl1000/tpl1100/selectTpl1100TplInfoAjax.do",
			"loadingShow": false,
			"async": false,
		}, targetConfig);
		
		//AJAX 전송 성공 함수
		ajaxObj.setFnSuccess(function(data){
			if(data.errorYn == "Y"){
				$.osl.alert(data.message,{type: 'error'});
				
				//모달 창 닫기
				$.osl.layerPopupClose();
			}else{
				//콜백 함수 있는 경우 실행
				if(typeof ajaxSuccessCallbackFn == "function"){
					ajaxSuccessCallbackFn(data);
				}
			}
		});
		
		return ajaxObj.send();
	};
	
	//Ajax02. fnGetFormDataValues 입력 값 조회
	/*
	 * function 명 : fnGetFormDataValues
	 * function 설명 : 양식 폼 구성 입력 데이터 가져오기
	 * param datas : 옵션
	 * param ajax 항목 조회 성공 후 동작할 function
	 */
	const fnGetFormDataValues = function(datas, ajaxSuccessCallbackFn){
		let targetConfig = fnExtendConfig(datas);
		
		//ajax 설정
		var ajaxObj = new $.osl.ajaxRequestAction({
			"url" : "/tpl/tpl1000/tpl1100/selectTpl1101TplListAjax.do",
			"loadingShow": false,
			"async": false,
		}, targetConfig);
		
		//AJAX 전송 성공 함수
		ajaxObj.setFnSuccess(function(data){
			if(data.errorYn == "Y"){
				$.osl.alert(data.message,{type: 'error'});
				
				//모달 창 닫기
				$.osl.layerPopupClose();
			}else{
				//콜백 함수 있는 경우 실행
				if(typeof ajaxSuccessCallbackFn == "function"){
					ajaxSuccessCallbackFn(data);
				}
			}
		});
		
		return ajaxObj.send();
	};
	
	//Fn01. fnExtendConfig 옵션 합쳐 반환하는 함수
	/* *
	 * function : fnExtendConfig
	 * function 설명 : 옵션 합치기
	 * param : usrConfig
	 * */
	const fnExtendConfig = function(usrConfig){ 
		//단순 key-value 합치기
		let targetConfig = $.extend({}, config, usrConfig);
		
		//내부 그리드스택 옵션 합치기
		let gridStackOpt = $.extend({}, config["gridStack"], usrConfig["gridStack"]);
		
		//그리드 스택 옵션에 sevId, mapId, mapItemId가 있으면
		if(gridStackOpt.hasOwnProperty("sevId")){
			targetConfig["sevId"] = gridStackOpt["sevId"];
		}
		if(gridStackOpt.hasOwnProperty("mapId")){
			targetConfig["mapId"] = gridStackOpt["mapId"];
		}
		if(gridStackOpt.hasOwnProperty("mapItemId")){
			targetConfig["mapItemId"] = gridStackOpt["mapItemId"];
		}
		
		//그리드 스택 옵션에 addDivId가 있으면 appendDivId에 넣기
		if(gridStackOpt.hasOwnProperty("addDivId")){
			gridStackOpt["appendDivId"] = gridStackOpt["addDivId"];
		}
		
		/**확인 후 제거 필요 컬럼 시작**/
		//useCd 값이 있는데 null이면
		if(targetConfig.hasOwnProperty("useCd") && $.osl.isNull(targetConfig["useCd"])){
			delete targetConfig["useCd"];
		}
		//itemEssentialCd 값이 있는데 01, 02가 아니면
		if(gridStackOpt.hasOwnProperty("itemEssentialCd") && ($.osl.isNull(gridStackOpt["itemEssentialCd"]) || ("01" != gridStackOpt["itemEssentialCd"] && "02" != gridStackOpt["itemEssentialCd"]))){
			delete gridStackOpt["itemEssentialCd"];
		}
		/**확인 후 제거 필요 컬럼 끝**/
		
		//내부 그리드스택 옵션 합치기(덮어쓰기)
		targetConfig["gridStack"] = gridStackOpt;
		
		//사용자 지정 함수 합치기
		$.each(Object.keys(targetConfig["callback"]), function(idx, key){
			if(usrConfig.hasOwnProperty("callback") && usrConfig["callback"].hasOwnProperty(key) && typeof usrConfig["callback"][key] == "function"){
				targetConfig["callback"][key] = usrConfig["callback"][key];
			}
		});
		
		return targetConfig;
	};
	
	//Fn02. fnSettingOption 항목 별 설정을 위한 옵션 세팅
	/* *
	 * function 명 : fnSettingOption
	 * function 설명 : 항목 별 설정을 위한 옵션 세팅
	 * param appendId : 옵션 세팅이 될 영역 id(# 제외)
	 * param usrConfig : 옵션 설정에 필요한 json data 전달
	 * {
	 * 		targetClickArea : id(#제외, 클릭 시 설정창 변경을 위한 아이템 생성 영역)
	 * 		tergetDrawItemArea : id(#제외, 폼 그리기에 사용되는 아이템 생성 영역)
	 * 		closeSettingBtn : 설정창 닫기 버튼 id(#제외)
	 * 		settingArea : appendId - 설정창 세팅 영역(#제외)
	 * }
	 * param sameTimeTF : 설정 및 입력 동시 세팅 여부(default false)- boolean
	 * */
	const fnSettingOption = function(appendId, usrConfig, sameTimeTF){
		//아이템 설정창과 연결된 영역이 없으면
		if(!usrConfig.hasOwnProperty("targetClickArea") || $.osl.isNull(usrConfig["targetClickArea"]) || $("#"+usrConfig["targetClickArea"]).length == 0){
			//항목 별 설정을 위한 옵션 세팅을 할 수 없습니다.<br/>항목 생성 영역을 확인해주세요.
			$.osl.alert($.osl.lang("template.message.alert.error.createAreaCheck"), {type:"error"});
			return;
		}
		//그리기용 아이템 영역이 없으면
		if(!usrConfig.hasOwnProperty("tergetDrawItemArea") || $.osl.isNull(usrConfig["tergetDrawItemArea"]) || $("#"+usrConfig["tergetDrawItemArea"]).length == 0){
			//항목 별 설정을 위한 옵션 세팅을 할 수 없습니다.<br/>그리기 항목 생성 영역을 확인해주세요.
			$.osl.alert($.osl.lang("template.message.alert.error.drawAreaCheck"), {type:"error"});
			return;
		}
		//동시 설정 여부
		if($.osl.isNull(sameTimeTF) || String(sameTimeTF) != "true"){
			sameTimeTF = false;
		}else {
			sameTimeTF = true;
		}
		
		usrConfig["settingArea"] = appendId;
		let settingConfig =  fnExtendConfig(usrConfig);
		
		//이미 설정창 세팅되어 있으면 건너뛰기
		if(settingOptionList["baseSettingArea"].hasOwnProperty(appendId)){
			return;
		}
		
		//공통코드 세팅
		var commonArrayList = [];
		//지정타켓 : 기본 코드
		var commonArrayListNull = {};
		
		//메인 - 설정 옵션 그리기
		$.each(Object.keys(itemSettingOption["main"]), function(idx, mainOptionNm){
			
			let data = itemSettingOption["main"][mainOptionNm];
			let type= data.type;

			let mainHtml = '';
			let mainTypeHtml = '';
			let subHtml = '';
			let subTypeHtml = '';
			
			let mainIcon = '';
			//퍼블리싱 적용후 아이콘 사라짐 2025-01-09
			/*if(data.hasOwnProperty("icon") && !$.osl.isNull(data["icon"])){
				mainIcon = `<i class="${data.icon} osl-me-4"></i>`;
			}*/
			let mainTooltip = '';
			if(data.hasOwnProperty("tooltip") && !$.osl.isNull(data["tooltip"])){
				var mainTooltipStr = $.osl.lang(data.tooltip);
				if($.osl.isNull(mainTooltipStr)){
					if($.osl.isNull(mainIcon)){
						//툴팁은 존재하는데 아이콘이 없으면
						//퍼블리싱 적용후 아이콘 사라짐 2025-01-09
						//mainIcon = `<i class="fas fa-exclamation-circle osl-me-4"></i>`;
					}
					mainTooltip = `
						<span class="cursor-pointer fs-7" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="tooltip-inverse" data-bs-dismiss="click" data-title-lang-cd="${data.tooltip}" aria-label="${mainTooltipStr}">
							${mainIcon}
						</span>
					`;
				}
			}
			//툴팁은 없는데, 아이콘은 존재하면
			else if(!$.osl.isNull(mainIcon)){
				mainTooltip = mainIcon;
			}
			
			if(data.hasOwnProperty("subOption") && data["subOption"].length > 0){
				//서브 목록
				$.each(data["subOption"], function(num, subOptionNm){
					//서브
					let subData = itemSettingOption["sub"][subOptionNm];
					let subType = subData.type;
					
					let subIcon = '';
					//퍼블리싱 적용후 아이콘 사라짐 2025-01-09
					/*if(subData.hasOwnProperty("icon") && !$.osl.isNull(subData["icon"])){
						subIcon = `<i class="${subData.icon}"></i>`;
					}*/
					let subTooltip = '';
					if(subData.hasOwnProperty("tooltip") && !$.osl.isNull(subData["tooltip"])){
						var subTooltipStr = $.osl.lang(subData.tooltip);
						if($.osl.isNull(subTooltipStr)){
							if($.osl.isNull(subIcon)){
								//툴팁은 존재하는데 아이콘이 없으면
								//퍼블리싱 적용후 아이콘 사라짐 2025-01-09
								//subIcon = `<i class="fas fa-exclamation-circle osl-me-4"></i>`;
							}
							subTooltip = `
								<span class="cursor-pointer fs-7" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="tooltip-inverse" data-bs-dismiss="click" data-title-lang-cd="${subData.tooltip}" aria-label="${subTooltipStr}">
									${subIcon}
								</span>
							`;
						}
					}
					//툴팁은 없는데, 아이콘은 존재하면
					else if(!$.osl.isNull(subIcon)){
						subTooltip = subIcon;
					}
					
					let subRequiredItem = itemSettingOption["sub"][subOptionNm]["required"];
					let subRequired = ""; //class, option 둘다 사용
					
					if(subRequiredItem == "true"){
						subRequired = "required";
					}
					
					//숫자 박스 그리기
					if(subType == "number"){
						subTypeHtml = `
							<input type="${subType}" class="form-control osl-evt__option-items--sub osl-evt__exclude-item" id="${subData.field}" name="${subData.field}" ${subData.placeholder} min="${subData.min}" max="${subData.max}" ${modifyLogOpts.modifySet01} ${modifyLogOpts.optTarget04} data-opt-type="-1" ${modifyLogOpts.elemType06} data-opt-lang="${subData.label}" ${subRequired} value="${subData.default}" />
						`;
					}
					//선택 박스 그리기
					else if(subType == "select"){
						//공통코드
						let subMstCd = subData["mstCd"];
						let subDefaultSubCd = subData["default"];
						
						//전체 마스터 코드를 가져올 경우 null로 되어있어서
						if($.osl.isNull(subMstCd)){
							
							if($.osl.isNull(subDefaultSubCd)){
								//마스터 코드 전체 가져올 때 지정 값이 없으면 강제 지정을 위해
								subDefaultSubCd = settingConfig["gridStack"]["selectMstCd"];
							}
							subMstCd = subDefaultSubCd;
							//마스터 코드의 서브 코드로 변환
							subDefaultSubCd = "01";
							
							commonArrayListNull[data["field"]] = subMstCd;
						}
						else{
							if($.osl.isNull(subDefaultSubCd)){
								subDefaultSubCd = "01";
							}
							
							commonArrayList.push(
									{mstCd: subMstCd, useYn: "Y", targetObj: "#"+appendId+" #"+subData["field"], comboType:"OS", notCdList: subData["notCdList"]}
							);
						}
						
						
						subTypeHtml = `
							<select class="form-select osl-evt__option-items--sub osl-evt__exclude-item" id="${subData.field}" name="${data.field}" data-control="select2" data-hide-search="true" ${modifyLogOpts.modifySet01} ${modifyLogOpts.optTarget04} ${modifyLogOpts.optType02} data-osl-value="${subDefaultSubCd}" data-cmm-code="${subMstCd}" data-opt-lang="${subData.label}" ${subRequired}></select>
						`; 
					}
					//체크박스 그리기 - 스타일 : 스위치
					else if(subType == "checkbox"){
						subTypeHtml = `
							<span class="form-check form-switch form-check-custom form-check-solid form-check-navy float-end">
								<input type="${subType}" class="form-check-input osl-sm osl-evt__option-items--sub osl-evt__exclude-item" id="${subData.field}" name="${subData.name}" placeholder="${subData.placeholder}" ${modifyLogOpts.modifySet01} ${modifyLogOpts.optTarget04} data-opt-type="" ${modifyLogOpts.elemType03} data-opt-lang="${subData.label}" ${subRequired} />
							</span>
						`; 
					}
					//아무 타입도 없으면 그리지 않기
					else if(subType == null){
						subTypeHtml = ``;
					}
					else{
						return true;
					}
					
					subHtml += `
						<div class="form-group mt-2 osl-evt__grid-stack-setting-item--sub" data-sub-option-name="${subOptionNm}">
							<label class="osl-evt__grid-stack-setting-item--sub-label osl-word__break ${subRequired}">
								${subTooltip}
								<span data-lang-cd="${subData.label}">${$.osl.lang(subData.label)}</span>
							</label>
							${subTypeHtml}
						</div>
					`;
				});
			}//end subOptions
			
			let mainRequiredItem = itemSettingOption["main"][mainOptionNm]["required"];
			let mainRequired = ""; //class, option 둘다 사용
			
			if(mainRequiredItem == "true"){
				mainRequired = "required";
			}
			
			var placeholder = "";
			if(data.hasOwnProperty("placeholder")){
				placeholder = 'placeholder = "'+$.osl.lang(data["placeholder"])+'"';
			}
			
			//텍스트 영역 그리기 (summernote 및 반영 버튼)
			if(type == "textarea"){
				//에디터 세팅을 위해
				mainTypeHtml = `
					<button type="button" class="btn btn-sm btn-primary btn-bold float-end osl-mt-n5" id="textPrintBtn" title="${$.osl.lang("template.setting.tooltip.textPrint")}" data-title-lang-cd="template.setting.tooltip.textPrint" data-bs-toggle="tooltip" data-bs-custom-class="tooltip-inverse" data-bs-dismiss="click" data-bs-placement="bottom" data-auth-button="update" tabindex="1">
						<span data-lang-cd="template.setting.button.textPrint">${$.osl.lang("template.setting.button.textPrint")}</span>
					</button>
					<textarea class="osl-evt__option-items--main osl-evt__exclude-item" id="${data.field}" name="${data.field}" autocomplete="off" required ${modifyLogOpts.modifySet01} ${modifyLogOpts.optTarget04} data-opt-type="" ${modifyLogOpts.elemType02} data-opt-lang="${data.label}" ${mainRequired}></textarea>
				`;
			}
			//텍스트 박스 그리기
			else if(type == "text"){
				mainTypeHtml = `
					<input type="${type}" class="form-control osl-evt__option-items--main osl-evt__exclude-item" id="${data.field}" name="${data.field}" ${placeholder} maxlength="${data.max}" ${modifyLogOpts.modifySet01} ${modifyLogOpts.optTarget04} data-opt-type="" ${modifyLogOpts.elemType01} data-opt-lang="${data.label}" ${mainRequired} />
				`;
			}
			//숫자 박스 그리기
			else if(type == "number"){
				mainTypeHtml = `
					<input type="${type}" class="form-control osl-evt__option-items--main osl-evt__exclude-item" id="${data.field}" name="${data.field}" ${placeholder} min="${data.min}" max="${data.max}" ${modifyLogOpts.modifySet01} ${modifyLogOpts.optTarget04} data-opt-type="-1" ${modifyLogOpts.elemType06} data-opt-lang="${data.label}" ${mainRequired} value = "${data.default}"/>
				`;
			}
			//선택 박스 그리기
			else if(type == "select"){
				//공통코드
				let mainMstCd = data["mstCd"];
				let mainDefaultSubCd = data["default"];
				
				//전체 마스터 코드를 가져올 경우 null로 되어있어서
				if($.osl.isNull(mainMstCd)){
					if($.osl.isNull(mainDefaultSubCd)){
						//마스터 코드 전체 가져올 때 지정 값이 없으면 강제 지정을 위해
						mainDefaultSubCd = settingConfig["gridStack"]["selectMstCd"];
					}
					mainMstCd = mainDefaultSubCd;
					//마스터 코드의 서브 코드로 변환
					mainDefaultSubCd = "01";
					
					commonArrayListNull[data["field"]] = mainMstCd;
				}
				else{
					if($.osl.isNull(mainDefaultSubCd)){
						mainDefaultSubCd = "01";
					}
					
					commonArrayList.push(
							{mstCd: mainMstCd, useYn: "Y", targetObj: "#"+appendId+" #"+data["field"], comboType:"OS", notCdList: data["notCdList"]}
					);
				}
				
				mainTypeHtml = `
					<select class="form-select osl-evt__option-items--main osl-evt__exclude-item" id="${data.field}" name="${data.field}" data-control="select2" data-hide-search="true" ${modifyLogOpts.modifySet01} ${modifyLogOpts.optTarget04} ${modifyLogOpts.optType02} data-osl-value="${mainDefaultSubCd}" data-cmm-code="${mainMstCd}" data-opt-lang="${data.label}" ${mainRequired}>
					</select>
				`;
			}
			//체크박스 그리기 - 스타일 : 스위치
			else if(type == "checkbox"){
				var collapseClass = "";
				var collapseOptions = "";
				
				if(!$.osl.isNull(subHtml)){
					collapseClass = "collapsible collapsed";
					collapseOptions = `data-bs-toggle="collapse" data-bs-target="#${mainOptionNm}Div" aria-expanded="false"`;
				}
				mainTypeHtml = `
					<span class="form-check form-switch form-check-custom form-check-solid form-check-navy float-end">
						<input type="${type}" class="form-check-input osl-sm osl-evt__option-items--main osl-evt__exclude-item ${collapseClass}" id="${data.field}" name="${data.field}" ${placeholder} ${modifyLogOpts.modifySet01} ${modifyLogOpts.optTarget04} data-opt-type="" ${modifyLogOpts.elemType03} data-opt-lang="${data.label}" ${collapseOptions} ${mainRequired}/>
					</span>
				`;
			}
			//체크박스 리스트 그리기
			else if(type == "checklist-item") {
				var repeaterItem = "";
				//반복 - 메인 옵션에서의 default 기준
				for(var num=0; num<data["default"]; num++){
					repeaterItem += `
						<div class="form-group d-flex gap-2 w-100 mb-2 osl-evt__repeater-item fv-plugins-icon-container">
							<div class="form-check form-check-custom form-check-success form-check-solid py-2">
								<input type="checkbox" class="form-check-input osl-evt__item--required-check-item osl-evt__exclude-item osl-evt__repeater-opt-required-btn">
							</div>
							<div class="input-group">
								<span class="input-group-text osl-evt__repeater-text-num osl-py-4 border-0 osl-bg-light-gray">${num+1}</span>
								<input type="text" class="form-control osl-evt__repeater-text-input border osl-border-s-1 osl-bg-light-gray osl-radius-end-8px" id="repeaterTextInput${num+1}" name="repeaterTextInput${num+1}" placeholder="${$.osl.lang("template.item.placeholder.optNm")}" required />
								<button type="button" class="btn osl-btn-delete osl-evt__repeater-delete-btn osl-h-43">
									 <span class="osl-blind" data-lang-cd="button.delete">${$.osl.lang("button.delete")}</span>
								</button>
							</div>
						</div>
					`;
				}
				mainTypeHtml = `
					<div class="osl-evt__repeater-setting-area" id="${data.field}">
						${repeaterItem}
					</div>
					<div class="form-group mt-4">
						<button type="button" class="btn btn-link w-100 osl-evt__repeater-add-btn" data-repeater-target="${data.field}">
							<i class="osl-icon osl-icon-sm osl-icon-plus--blue"></i>
							<span class="osl-fc-point-blue" data-lang-cd="button.add">${$.osl.lang("button.add")}</span>
						</button>
					</div>
				`;
			}
			
			//타입에 따라 추가적으로 더 그려야 하는 파트 시작
			//세부 옵션이 있는 체크박스이면
			if(type == "checkbox" && !$.osl.isNull(subHtml)){
				mainHtml = `
					<div class="osl-evt__grid-stack-setting-item osl-stack-edit-item" id="${mainOptionNm}">
						<div class="fv-row d-flex flow-row flex-nowrap flex-stack">
							<label class="osl-word__break ${mainRequired}">
								${mainTooltip}
								<span data-lang-cd="${data.label}">${$.osl.lang(data.label)}</span>
							</label>
							<div class="d-flex flex-row flex-nowrap align-items-center">
								${mainTypeHtml}
							</div>
						</div>
						<div class="collapse border-top p-2 osl-mt-12" id="${mainOptionNm}Div">
							${subHtml}
						</div>
					</div>
				`;
			}
			//세부 옵션이 없는 체크박스이면
			else if(type == "checkbox"){
				mainHtml = `
					<div class="osl-evt__grid-stack-setting-item osl-stack-edit-item" id="${mainOptionNm}">
						<div class="fv-row d-flex flow-row flex-nowrap flex-stack">
							<label class="osl-word__break ${mainRequired}">
								${mainTooltip}
								<span data-lang-cd="${data.label}">${$.osl.lang(data.label)}</span>
							</label>
							${mainTypeHtml}
						</div>
					</div>
				`;
			}
			//체크박스가 아니면
			else{
				mainHtml = `
					<div class="osl-evt__grid-stack-setting-item osl-stack-edit-item" id="${mainOptionNm}">
						<div class="fv-row">
							<label class="osl-evt__grid-stack-setting-item--main-label osl-word__break mb-2 ${mainRequired}">
								${mainTooltip}
								<span data-lang-cd="${data.label}">${$.osl.lang(data.label)}</span>
							</label>
							${mainTypeHtml}
							${subHtml}
						</div>
					</div>
				`;
			}
			
			$("#"+appendId).append(mainHtml);
			
			//에디터이면
			if(type == "textarea"){
				//버튼 영역으로 인해 label에 클래스 추가
				$("#"+appendId).find("#"+mainOptionNm+" .osl-evt__grid-stack-setting-item--main-label").addClass("w-auto");
			}
		}); //end 메인 옵션
		
		//반복 옵션 - 메인옵션
		var repeaterList = $("#"+appendId+" .osl-evt__repeater-setting-area");
		if(repeaterList.length > 0){
			//input 입력
			$("#"+appendId+" .osl-evt__repeater-setting-area").on("propertychange change keyup paste input blur", ".osl-evt__repeater-text-input", function(){
				var tempConfig = settingOptionList["baseSettingArea"][appendId];
				
				//선택된 항목
				var targetElem = $("#"+tempConfig["targetClickArea"]+" .osl-evt__grid-stack-item-content.active");
				//osl-evt__grid-stack-item
				var topElem = $(targetElem).parent();
				
				//해당 옵션 - 동일 순번에 해당하는 것
				var itemViewOrd = parseInt($(this).siblings(".osl-evt__repeater-text-num").text());
				var optionNmElem = $(topElem.find(".osl-evt__template-item--check-item")[itemViewOrd-1]).parent().find(".osl-evt__grid-stack-item--opt-label");
				
				//입력 값
				optionNmElem.text($(this).val());
			});
			
			//해당 영역에 존재하는 추가/삭제 이벤트 생성
			//추가 이벤트
			$("#"+appendId+" .osl-evt__repeater-add-btn").click(function(){
				var repeaterTargetId = $(this).data("repeater-target");
				var repeaterArea = $(".osl-evt__repeater-setting-area#"+repeaterTargetId);
				
				//옵션 정보를 가져오기 위해
				var repeaterTargetOptNm = $(this).closest(".osl-evt__grid-stack-setting-item").attr("id");
				var repeaterOption =  itemSettingOption["main"][repeaterTargetOptNm];
				if(repeaterOption == null) {
					return;
				}
				
				//반복 영역으로 변경
				repeaterArea = $(".osl-evt__repeater-setting-area#"+repeaterOption["field"]);
				
				//해당 영역내에 존재하는 반복 아이템
				var repeaterItem = repeaterArea.find(".osl-evt__repeater-item");
				//복제하여 추가
				var cloneItem = repeaterItem[0].cloneNode(true);
				repeaterArea.append(cloneItem);
				var itemCnt = repeaterArea.find(".osl-evt__repeater-item").length;
				repeaterArea.find(".osl-evt__repeater-item:last-child .osl-evt__repeater-text-num").text(itemCnt);
				repeaterArea.find(".osl-evt__repeater-item:last-child .osl-evt__repeater-text-input").val($.osl.lang("template.item.placeholder.optNm"));
				//id, name 재적용
				repeaterArea.find(".osl-evt__repeater-item:last-child .osl-evt__repeater-text-input").attr({
					"id" : "repeaterTextInput"+itemCnt,
					"name" : "repeaterTextInput"+itemCnt
				});
				
				//필수 체크가 되어있다면 해제
				repeaterArea.find(".osl-evt__repeater-item:last-child .osl-evt__item--required-check-item").prop("checked", false);
				
				var tempConfig = settingOptionList["baseSettingArea"][appendId];
				//선택된 항목
				var targetElem = $("#"+tempConfig["targetClickArea"]+" .osl-evt__grid-stack-item-content.active");
				var topElem = targetElem.closest(".osl-evt__grid-stack-item");
				
				//현재 선택 아이템 설정 값 가져오기
				var selItemInfo = fnGetItemValues(topElem, true);
				
				//현재 타입이 뭔지 - 현재는 checklist-item만 있지만 추후 더 생길 수 있으므로
				var currentType = repeaterOption["type"];
				//타입이 checklist-item 이면
				if(currentType == "checklist-item"){
					//현재 라디오인지 체크박스인지 확인
					var elemType = "radio";
					//다중 선택 활성화이면
					if(selItemInfo["itemMultiSelCd"] == "01"){
						elemType = "checkbox";
					}
					
					//현재 남아있는 옵션 갯수 확인
					var currentOptCnt = repeaterArea.find(".osl-evt__repeater-item").length;
					//현재 라디오이면 - 최소 2개 유지해야 함
					var defaultOptCnt = 2;
					//현재 체크박스이면 - 최소 1개 유지해야 함
					if(elemType == "checkbox") {
						defaultOptCnt = 1;
					}
					
					//최소갯수 이상이면 삭제버튼 활성화
					if(currentOptCnt > defaultOptCnt){
						repeaterArea.find(".osl-evt__repeater-item .osl-evt__repeater-delete-btn").prop("disabled", false).removeClass("d-none");
						repeaterArea.find(".osl-evt__repeater-item .osl-evt__repeater-delete-btn").siblings(".osl-evt__repeater-text-input").removeClass("rounded-end");
					}
				}
				
				//체크리스트 영역
				var chkListDiv = topElem.find(".osl-evt__template-item--check-list");
				//체크리스트 아이템
				var chkList = chkListDiv.find(".osl-evt__template-item--check-item");
				
				//반복 영역에 존재하는 옵션 갯수
				var repeaterItemCnt = repeaterArea.find(".osl-evt__repeater-item").length;
				//모자라는 옵션 갯수만큼 체크리스트에 추가
				//항목에 옵션 추가(그리기)
				for(var c=0; c < repeaterItemCnt-chkList.length; c++) {
					fnCheckItemHtml(chkListDiv);
				}
				
				//이벤트 호출
				if(repeaterOption.hasOwnProperty("event") && typeof repeaterOption["event"] == "function"){
					//param : 설정 객체 id, 메인 옵션명, 선택 객체 id, settingConfig
					repeaterOption["event"](repeaterOption["field"], repeaterTargetOptNm, selItemInfo["itemId"], tempConfig);
				}
				
				//validate 다시 세팅
				var fv = $.osl.validate.setting(appendId);
			});
			
			//옵션별 필수 지정 이벤트
			$("#"+appendId+" .osl-evt__repeater-setting-area").on("click", ".osl-evt__repeater-opt-required-btn", function(){
				var repeaterArea = $(this).closest(".osl-evt__repeater-setting-area");
				//옵션 정보를 가져오기 위해
				var repeaterTargetOptNm = repeaterArea.closest(".osl-evt__grid-stack-setting-item").attr("id");
				var repeaterOption = itemSettingOption["main"][repeaterTargetOptNm];
				
				if(repeaterOption == null) {
					return;
				}
				
				var tempConfig = settingOptionList["baseSettingArea"][appendId];
				//선택된 항목
				var targetElem = $("#"+tempConfig["targetClickArea"]+" .osl-evt__grid-stack-item-content.active");
				var topElem = targetElem.closest(".osl-evt__grid-stack-item");
				
				//현재 선택 아이템 설정 값 가져오기
				var selItemInfo = fnGetItemValues(topElem, true);
				
				//현재 타입이 뭔지 - 현재는 checklist-item만 있지만 추후 더 생길 수 있으므로
				var currentType = repeaterOption["type"];
				
				//옵션 별 필수 지정가능한 최대 갯수
				var optMaxRequiredCnt = 1;
				//현재 라디오인지 체크박스인지 확인
				var elemType = "radio";
				
				//타입이 checklist-item 이면
				if(currentType == "checklist-item"){
					//다중 선택 활성화이면
					if(selItemInfo["itemMultiSelCd"] == "01"){
						elemType = "checkbox";
					}
					
					//체크박스이면 최대 선택 갯수 가져오기
					if(elemType == "checkbox"){
						var maxValField = itemSettingOption["sub"]["MAX_VAL"]["field"];
						optMaxRequiredCnt = $("#"+maxValField).val();
					}
				}
				
				//선택한 아이템 순번
				var selItemNum = $(this).closest(".osl-evt__repeater-item").find(".osl-evt__repeater-text-num").text();
				
				//체크리스트 영역
				var chkListDiv = topElem.find(".osl-evt__template-item--check-list");
				//체크리스트에서 선택 순번에 해당하는 아이템 - input
				var targetOptElem = $(chkListDiv.find(".osl-evt__template-item--check-item")[selItemNum-1]);
				var checked = this.checked? true : false;
				if(checked){
					//현재 클릭한 항목 변경 전, 필수 지정되어있는 개별 옵션 갯수 확인
					var currentOptRequiredCnt = chkListDiv.find(".osl-evt__template-item--check-item["+fnFindConfCheckOpt("optEssentialCd")+"=01]").length;
					
					//체크박스이면
					if(elemType == "checkbox"){
						//현재 클릭한 항목도 포함되어야 하므로
						if(currentOptRequiredCnt+1 > optMaxRequiredCnt){
							//다중 선택의 최대 갯수 강제 증가
							var maxValField = itemSettingOption["sub"]["MAX_VAL"]["field"];
							$("#"+maxValField).val(currentOptRequiredCnt+1).trigger("input");
						}
						
						//대상에 필수 추가
						fnSetOptValue(targetOptElem, fnFindConfCheckOpt("optEssentialCd"), "01");
						targetOptElem.attr("required");
						targetOptElem.siblings(".osl-evt__grid-stack-item--opt-label").addClass("required");
					}
					//라디오이면
					else {
						//필수 갯수가 2개 이상이면
						if(currentOptRequiredCnt+1 >= 2){
							//옵션 영역에서 필수 체크 모두 해제
							repeaterArea.find(".osl-evt__item--required-check-item").prop("checked", false);
							
							//모두 제거되었으므로 옵션별 data도 수정
							$.each(chkListDiv.find(".osl-evt__template-item--check-item"), function(c, chkElem){
								//대상에 필수 제거
								fnSetOptValue(chkElem, fnFindConfCheckOpt("optEssentialCd"), "02");
								$(chkElem).removeAttr("required");
								$(chkElem).siblings(".osl-evt__grid-stack-item--opt-label").removeClass("required");
							});
							
							//현재 항목 체크로 변경
							$(this)[0].checked = true;
							//대상에 필수 추가
							fnSetOptValue(targetOptElem, fnFindConfCheckOpt("optEssentialCd"), "01");
							targetOptElem.attr("required");
							targetOptElem.siblings(".osl-evt__grid-stack-item--opt-label").addClass("required");
							
							//"필수 옵션은 1개만 선택 가능합니다.<br/><br/>기존 선택된 필수 옵션은 모두 해제됩니다."
							$.osl.alert($.osl.lang("template.message.alert.requiredOneOpt")+"<br/><br/>"+$.osl.lang("template.message.alert.unSelectedRequired"));
						}
						//1개만 선택한 경우
						else {
							//대상에 필수 추가
							fnSetOptValue(targetOptElem, fnFindConfCheckOpt("optEssentialCd"), "01");
							targetOptElem.attr("required");
							targetOptElem.siblings(".osl-evt__grid-stack-item--opt-label").addClass("required");
						}
					}
				}
				else{
					//대상에 필수 제거
					fnSetOptValue(targetOptElem, fnFindConfCheckOpt("optEssentialCd"), "02");
					targetOptElem.removeAttr("required");
					targetOptElem.siblings(".osl-evt__grid-stack-item--opt-label").removeClass("required");
				}
			});
			
			//삭제 이벤트
			$("#"+appendId+" .osl-evt__repeater-setting-area").on("click", ".osl-evt__repeater-delete-btn", function(){
				var repeaterArea = $(this).closest(".osl-evt__repeater-setting-area");
				//옵션 정보를 가져오기 위해
				var repeaterTargetOptNm = repeaterArea.closest(".osl-evt__grid-stack-setting-item").attr("id");
				var repeaterOption =  itemSettingOption["main"][repeaterTargetOptNm];
				if(repeaterOption == null) {
					return;
				}
				
				var tempConfig = settingOptionList["baseSettingArea"][appendId];
				//선택된 항목
				var targetElem = $("#"+tempConfig["targetClickArea"]+" .osl-evt__grid-stack-item-content.active");
				var topElem = targetElem.closest(".osl-evt__grid-stack-item");
				
				//현재 선택 아이템 설정 값 가져오기
				var selItemInfo = fnGetItemValues(topElem, true);
				
				//현재 타입이 뭔지 - 현재는 checklist-item만 있지만 추후 더 생길 수 있으므로
				var currentType = repeaterOption["type"];
				//타입이 checklist-item 이면
				if(currentType == "checklist-item"){
					//현재 라디오인지 체크박스인지 확인
					var elemType = "radio";
					//다중 선택 활성화이면
					if(selItemInfo["itemMultiSelCd"] == "01"){
						elemType = "checkbox";
					}
					
					//현재 남아있는 옵션 갯수 확인
					var currentOptCnt = repeaterArea.find(".osl-evt__repeater-item").length;
					//현재 라디오이면 - 최소 2개 유지해야 함
					var defaultOptCnt = 2;
					//현재 체크박스이면 - 최소 1개 유지해야 함
					if(elemType == "checkbox") {
						defaultOptCnt = 1;
					}
					
					//최소갯수 이하 제거 불가
					if(currentOptCnt <= defaultOptCnt){
						repeaterArea.find(".osl-evt__repeater-item .osl-evt__repeater-delete-btn").prop("disabled", true).addClass("d-none");
						repeaterArea.find(".osl-evt__repeater-item .osl-evt__repeater-delete-btn").siblings(".osl-evt__repeater-text-input").addClass("rounded-end");
						//alert
						//defaultOptCnt +"개 옵션은 필수입니다.<br/>삭제할 수 없습니다."
						$.osl.alert($.osl.lang("tempalte.message.alert.minOptionNotDel", defaultOptCnt));
						//중지
						return;
					}
					//마지막 한개 제거할 땐, 버튼 desabled 처리
					else if(currentOptCnt == defaultOptCnt + 1){
						repeaterArea.find(".osl-evt__repeater-item .osl-evt__repeater-delete-btn").prop("disabled", true).addClass("d-none");
						repeaterArea.find(".osl-evt__repeater-item .osl-evt__repeater-delete-btn").siblings(".osl-evt__repeater-text-input").addClass("rounded-end");
					}
				}
				
				//선택한 아이템 순번
				var delItemNum = $(this).siblings(".osl-evt__repeater-text-num").text();
				
				//체크리스트 영역
				var chkListDiv = topElem.find(".osl-evt__template-item--check-list");
				//체크리스트에서 삭제 순번에 해당하는 아이템 제거
				$(chkListDiv.find(".osl-evt__template-item--check-item")[delItemNum-1]).parent().remove();
				//자기 앞에 있는 keyPath 영역 제거
				$(chkListDiv.find(".osl-evt__grid-stack-keypath-icon:not(.osl-evt__grid-stack-keypath-header)")[delItemNum-1]).remove();
				
				//선택한 아이템 제거
				$(this).closest(".osl-evt__repeater-item").remove();
				
				//아이템 모두 찾아 순번 다시 적용
				$.each(repeaterArea.find(".osl-evt__repeater-item"), function(r, repeaterItem){
					$(repeaterItem).find(".osl-evt__repeater-text-num").text(r+1);
					//id, name 재적용
					$(repeaterItem).find(".osl-evt__repeater-text-input").attr({
						"id" : "repeaterTextInput"+(r+1),
						"name" : "repeaterTextInput"+(r+1)
					});
				});
				
				//이벤트 호출
				if(repeaterOption.hasOwnProperty("event") && typeof repeaterOption["event"] == "function"){
					//param : 설정 객체 id, 메인 옵션명, 선택 객체 id, settingConfig
					repeaterOption["event"](repeaterOption["field"], repeaterTargetOptNm, selItemInfo["itemId"], tempConfig);
				}
				
				//validate 다시 세팅
				$.osl.validate.setting(appendId);
			});
		}// 반복 옵션 이벤트 끝
		
		//공통
		const fnItemValidAfter = function(appendId, targetElem, selItemInfo){
			//선택 효과
			$("#"+settingConfig["targetClickArea"]).find(".osl-evt__grid-stack-item-content.active").removeClass("active");
			$(targetElem).addClass("active");
			
			//데이터 세팅을 안한 항목의 경우 들어가 있는 클래스 제거
			$(targetElem).removeClass("danger");
			
			var itemCode= String(selItemInfo["itemCode"]);
			
			//설정창 타이틀
			$("#itemLabelOutPrint").text($.osl.lang("template.item.label.itemTypeNm"+itemCode));
			
			//만약, 서비스 항목 표출 상태가 나와있는 경우
			if($("#tplEssentialItemCd").length > 0){
				//표출되어 있는 경우는 해당 신청서로 양식이 발행되었는지(tpl1100.jsp - param.tplLinkTargetYn)에 따라
				//만약 표출되어 있을 때, 양식 유형별 서비스 항목이 표출되어야 하는지도 한번 더 체크하여 표출되면 안될때 제거
				//표출 안함이면
				if(!tplTypeServiceItemView[selItemInfo["tplClsType"]]){
					//제거
					$("#tplEssentialItemCd").parent().remove();
				}
			}
			
			//해당 정보로부터 설정창 변경
			$.each(Object.keys(optionCallItem), function(idx, mainOptNm){
				var field = itemSettingOption["main"][mainOptNm]["field"];
				var name = itemSettingOption["main"][mainOptNm]["name"];
				
				//해당 옵션이 항목에 해당되면
				if(optionCallItem[mainOptNm].indexOf(itemCode) > -1 || optionCallItem[mainOptNm].indexOf("all") > -1){
					$(`#${appendId} .osl-evt__grid-stack-setting-item[id="${mainOptNm}"]`).removeClass("d-none");
					
					//서비스 항목의 사용자 항목이 아니면 보이지 않게 하기
					if(mainOptNm == "SELECT_MAX_USER"){
						if(!(selItemInfo["tplEssentialItem"] == "01" && itemCode == "09")){
							//옵션 숨기기
							$(`#${appendId} .osl-evt__grid-stack-setting-item[id="${mainOptNm}"]`).addClass("d-none");
							//valid를 위해 해당 항목에 osl-evt__exclude-item 추가
							$(`#${appendId} #${field}`).addClass("osl-evt__exclude-item");
						}
					}
					
					//알림 설정 방지
					if(mainOptNm == "ALARM_USE") {
						//TPL00014 01 내용 항목이 아닌 경우 알림 기능 연결 보이지 않게 하기
						//TPL00001 03 단계, 05 자료관리인 경우 알림 기능 연결 보이지 않게 하기
						if(selItemInfo["tplItemClsCd"] != "01" || selItemInfo["tplClsType"] == "03" || selItemInfo["tplClsType"] == "05"){
							//옵션 숨기기
							$(`#${appendId} .osl-evt__grid-stack-setting-item[id="${mainOptNm}"]`).addClass("d-none");
							//valid를 위해 해당 항목에 osl-evt__exclude-item 추가
							$(`#${appendId} #${field}`).addClass("osl-evt__exclude-item");
						}
					}
					
					//단 정보자산 입력창(양식 미사용 - 바로 생성)일 경우 필수유무, 수정가능 옵션 보이지 않게 하기
					if(sameTimeTF){
						/*mainOptNm == "REQUIRED_ITEM" || mainOptNm == "UPDATE_ABLED"*/
						if(mainOptNm == "REQUIRED_ITEM"){
							//옵션 숨기기
							$(`#${appendId} .osl-evt__grid-stack-setting-item[id="${mainOptNm}"]`).addClass("d-none");
							//valid를 위해 해당 항목에 osl-evt__exclude-item 추가
							$(`#${appendId} #${field}`).addClass("osl-evt__exclude-item");
						}
					}
					
					//valid를 위해 해당 항목에 osl-evt__exclude-item 제거
					$(`#${appendId} #${field}`).removeClass("osl-evt__exclude-item");
					
					//현재 항목 정보 유형에 따라 세팅
					//텍스트 영역(summernote)
					if(itemSettingOption["main"][mainOptNm]["type"] == "textarea"){
						$(`#${appendId} #${field}`).val(selItemInfo[name]);
						$(`#${appendId} #${field}`).summernote("code", selItemInfo[name]);
					}
					//텍스트 박스
					else if(itemSettingOption["main"][mainOptNm]["type"] == "text"){
						$(`#${appendId} #${field}`).val(selItemInfo[name]);
					}
					//숫자
					else if(itemSettingOption["main"][mainOptNm]["type"] == "number"){
						$(`#${appendId} #${field}`).val(selItemInfo[name]);
					}
					//체크박스 - 스타일 : 스위치
					else if(itemSettingOption["main"][mainOptNm]["type"] == "checkbox"){
						if(selItemInfo[name] == "01"){
							//$(`#${appendId} #${field}`)[0].checked = true;
							$(`#${appendId} #${field}`).prop("checked", true).trigger("change");
						}else{
							//$(`#${appendId} #${field}`)[0].checked = false;
							$(`#${appendId} #${field}`).prop("checked", false).trigger("change");
						}
					}
					//체크리스트 - 체크박스 항목에서 사용
					else if(itemSettingOption["main"][mainOptNm]["type"] == "checklist-item"){
						if(itemCode == "08"){
							//체크 리스트 목록 갯수
							var chkListLength = selItemInfo["tplItemOptValListInfo"].length;
							
							var repeaterArea = $(`#${appendId} #${field}`);
							
							//반복 옵션의 첫 옵션만 두고 모두 제거
							repeaterArea.find(".osl-evt__repeater-item:not(:first-child)").remove();
							//체크 리스트 목록만큼 다시 옵션 그리기
							for(var c=0; c <chkListLength; c++){
								if(c > 0){
									//복제
									var cloneItem = repeaterArea.find(".osl-evt__repeater-item")[0].cloneNode(true);
									//옵션 단순 복사 - 필수 체크 여부 모두 제외
									repeaterArea.append(cloneItem);
								}
								
								var chkItem = selItemInfo["tplItemOptValListInfo"][c];
								
								//복사된 옵션 순번 및 내용 변경
								var cloneTarget = repeaterArea.find(".osl-evt__repeater-item:last-child");
								cloneTarget.find(".osl-evt__repeater-text-num").text(c+1);
								cloneTarget.find(".osl-evt__repeater-text-input").val(chkItem["itemNm"]);
								
								//복사된 옵션 필수 체크 해제
								cloneTarget.find(".osl-evt__item--required-check-item")[0].checked = false;
								fnSetOptValue(cloneTarget.find(".osl-evt__item--required-check-item"), "optEssentialCd", "02");
							
								//id, name 재적용
								repeaterArea.find(".osl-evt__repeater-item:last-child .osl-evt__repeater-text-input").attr({
									"id" : "repeaterTextInput"+(c+1),
									"name" : "repeaterTextInput"+(c+1)
								});
							}
							
							//라디오이면 - 최소 2개
							var defaultOptCnt = 2;
							//체크박스이면 최소 1개
							if(selItemInfo["itemMultiSelCd"] == "01"){
								defaultOptCnt = 1;
							}
							
							//최소갯수 이하 제거 불가하도록 삭제버튼 미표출
							if(chkListLength <= defaultOptCnt){
								repeaterArea.find(".osl-evt__repeater-item .osl-evt__repeater-delete-btn").prop("disabled", true).addClass("d-none");
								repeaterArea.find(".osl-evt__repeater-item .osl-evt__repeater-delete-btn").siblings(".osl-evt__repeater-text-input").addClass("rounded-end");
							}
							//아니라면
							else {
								repeaterArea.find(".osl-evt__repeater-item .osl-evt__repeater-delete-btn").prop("disabled", false).removeClass("d-none");
								repeaterArea.find(".osl-evt__repeater-item .osl-evt__repeater-delete-btn").siblings(".osl-evt__repeater-text-input").removeClass("rounded-end");
							}
							
							//옵션 개별 필수 여부
							$.each(selItemInfo["tplItemOptValListInfo"], function(o, optMap){
								var optEssentialCd = optMap["optEssentialCd"];
								if(optEssentialCd != "01"){
									optEssentialCd = "02";
								}
								
								var optChecked = false;
								if(optEssentialCd == "01"){
									optChecked = true;
								}
								
								//옵션에 체크
								$(repeaterArea.find(".osl-evt__repeater-item")[optMap["itemViewOrd"]-1]).find(".osl-evt__item--required-check-item")[0].checked = optChecked;
							});
							
						}
					}
					//선택 박스
					else if(itemSettingOption["main"][mainOptNm]["type"] == "select"){
						$(`#${appendId} #${field}`).val(selItemInfo[name]).change();
					}
					
					$(`#${appendId} .osl-evt__grid-stack-setting-item[id="${mainOptNm}"]`).find("input").removeClass(".osl-evt__exclude-item");
				}
				//해당 옵션을 숨겨야 하면
				else{
					$(`#${appendId} .osl-evt__grid-stack-setting-item[id="${mainOptNm}"]`).addClass("d-none");
					$(`#${appendId} .osl-evt__grid-stack-setting-item[id="${mainOptNm}"]`).find("input").addClass(".osl-evt__exclude-item");
					
					//valid를 위해 해당 항목에 osl-evt__exclude-item 추가
					$(`#${appendId} #${field}`).addClass("osl-evt__exclude-item");
				}
			});
			
			//validate 다시 세팅
			$.osl.validate.setting(appendId);
			
		};
		
		//항목에 대한 설정 상태 변경을 위한 이벤트 생성
		$("#"+settingConfig["targetClickArea"]).on("click", ".osl-evt__grid-stack-item-content:not(.active)", function(){
			var tempConfig = settingOptionList["baseTargetClickArea"][settingConfig["targetClickArea"]];
			var appendId = tempConfig["settingArea"];
			//클릭한 정보로부터 최신 설정 정보 가져오기
			var targetElem = $(this);
			var selItemInfo = fnGetItemValues(targetElem, true);
			
			var beforeItemInfo = {};
			if($(".osl-evt__grid-stack-item-content.active").length > 0){
				beforeItemInfo = fnGetItemValues($(".osl-evt__grid-stack-item-content.active"), true);
			}
			//이전에 선택된 값이 없었다면 동일하게
			if($.osl.isNull(beforeItemInfo)){
				beforeItemInfo = selItemInfo;
			}
			
			//설정창이 열려있지 않은 경우
			if($("#"+appendId).closest(".osl-evt__items-setting-div").hasClass("d-none")){
				$("#"+tempConfig["tergetDrawItemArea"]).closest(".osl-evt__items-div").addClass("d-none");
				$("#"+appendId).closest(".osl-evt__items-setting-div").removeClass("d-none");
				
				fnItemValidAfter(appendId, targetElem, selItemInfo);
			}
			//열려있던 경우
			else {
				//필수 반영 정보 모두 기입되었는지 확인하여 계속 진행
				var form = $("#"+appendId);
				form.valid(function(){
					//성공
					//가지고 있던 옵션들의 반영을 위해 한번 이벤트 실행
					$.each($(".osl-evt__grid-stack-setting-item:not(.d-none)"), function(s, optElem){
						var mainOptNm = optElem.id;
						var field = itemSettingOption["main"][mainOptNm]["field"];
						var name = itemSettingOption["main"][mainOptNm]["name"];
						
						//해당 옵션이 항목에 해당되면
						if(optionCallItem[mainOptNm].indexOf(String(beforeItemInfo["itemCode"])) > -1 || optionCallItem[mainOptNm].indexOf("all") > -1){
							//가진 이벤트 있으면 실행
							if(itemSettingOption["main"][mainOptNm].hasOwnProperty("event") && typeof itemSettingOption["main"][mainOptNm]["event"]== "function"){
								//param : 설정 객체 id, 메인 옵션명, 선택 객체 id, settingConfig
								//tplItemId로 안하고 itemId로 하는 이유는 신규 추가되는 항목의 경우 tplItemId는 모두 루트 아이템으로 지정되어 있기 때문
								itemSettingOption["main"][mainOptNm]["event"](itemSettingOption["main"][mainOptNm]["field"], mainOptNm, beforeItemInfo["itemId"], tempConfig);
							}
						}
					});
					
					fnItemValidAfter(appendId, targetElem, selItemInfo);
				}, function(){
					//실패
					//창 닫기 불가
					$.osl.alert($.osl.lang("template.message.alert.requiredError"));
				});
			}
		});
		
		//메인 설정 이벤트 생성
		//input 입력
		$("#"+appendId).on("propertychange change keyup paste input blur", ".osl-evt__grid-stack-setting-item:not(.d-none) input[type='text'].osl-evt__option-items--main", function(){
			var tempConfig = settingOptionList["baseSettingArea"][appendId];
			
			var mainOptNm = $(this).closest(".osl-evt__grid-stack-setting-item").attr("id");
			
			if(itemSettingOption["main"][mainOptNm].hasOwnProperty("event")){
				//선택된 항목
				var targetElem = $("#"+tempConfig["targetClickArea"]+" .osl-evt__grid-stack-item-content.active");
				//osl-evt__grid-stack-item
				var topTargetElem = $(targetElem).parent();
				
				//라벨 명 변경
				var inputVal = $("#"+ itemSettingOption["main"][mainOptNm]["field"]).val();
				$(topTargetElem.find(".osl-evt__grid-stack-item-label > span")[0]).text(inputVal);
				
				//osl-evt__grid-stack-item 옵션 지정 명 가져오기
				var itemId = fnFindConfCheckOptVal(topTargetElem, "itemId");
				//param : 설정 객체 id, 메인 옵션명, 선택 객체 id, settingConfig
				itemSettingOption["main"][mainOptNm]["event"](itemSettingOption["main"][mainOptNm]["field"] ,mainOptNm, itemId, tempConfig);
			}
		});
		//input 입력 - 숫자 변경
		$("#"+appendId).on("keyup paste input", ".osl-evt__grid-stack-setting-item:not(.d-none) input[type='number'].osl-evt__option-items--main", function(){
			var tempConfig = settingOptionList["baseSettingArea"][appendId];
			
			var mainOptNm = $(this).closest(".osl-evt__grid-stack-setting-item").attr("id");
			
			if(itemSettingOption["main"][mainOptNm].hasOwnProperty("event")){
				//선택된 항목
				var targetElem = $("#"+tempConfig["targetClickArea"]+" .osl-evt__grid-stack-item-content.active");
				//osl-evt__grid-stack-item
				var topTargetElem = $(targetElem).parent();
				
				//osl-evt__grid-stack-item 옵션 지정 명 가져오기
				var itemId = fnFindConfCheckOptVal(topTargetElem, "itemId");
				
				//param : 설정 객체 id, 메인 옵션명, 선택 객체 id, settingConfig
				itemSettingOption["main"][mainOptNm]["event"](itemSettingOption["main"][mainOptNm]["field"] ,mainOptNm, itemId, tempConfig);
			}
		});
		//select 변경
		$("#"+appendId).on("change", ".osl-evt__grid-stack-setting-item:not(.d-none) select.osl-evt__option-items--main", function(){
			var tempConfig = settingOptionList["baseSettingArea"][appendId];
			
			var mainOptNm = $(this).closest(".osl-evt__grid-stack-setting-item").attr("id");
			
			if(itemSettingOption["main"][mainOptNm].hasOwnProperty("event")){
				//선택된 항목
				var targetElem = $("#"+tempConfig["targetClickArea"]+" .osl-evt__grid-stack-item-content.active");
				//osl-evt__grid-stack-item
				var topTargetElem = $(targetElem).parent();
				
				//osl-evt__grid-stack-item 옵션 지정 명 가져오기
				var itemId = fnFindConfCheckOptVal(topTargetElem, "itemId");
				var field = itemSettingOption["main"][mainOptNm]["field"];
				var name = itemSettingOption["main"][mainOptNm]["name"];
				
				//해당 옵션 설정값 변경
				var selVal = $("#"+field).val();
				if($.osl.isNull(selVal)){
					selVal = $("#"+field).find("option[selected]").attr("value");
					$("#"+field).val(selVal).change();
				}
				var optNm = fnFindConfCheckOpt("mstCd");
				fnSetOptValue($("#"+field), optNm);
				
				//선택 항목에 정보 업데이트
				fnSetItemOptValue(topTargetElem, name, selVal);
				
				//param : 설정 객체 id, 메인 옵션명, 선택 객체 id, settingConfig
				itemSettingOption["main"][mainOptNm]["event"](itemSettingOption["main"][mainOptNm]["field"] ,mainOptNm, itemId, tempConfig);
			}
		});
		
		//체크박스
		$("#"+appendId).on("change", ".osl-evt__grid-stack-setting-item:not(.d-none) input[type='checkbox'].osl-evt__option-items--main", function(){
			var tempConfig = settingOptionList["baseSettingArea"][appendId];
			
			var mainOptNm = $(this).closest(".osl-evt__grid-stack-setting-item").attr("id");
			
			if(itemSettingOption["main"][mainOptNm].hasOwnProperty("event")){
				//선택된 항목
				var targetElem = $("#"+tempConfig["targetClickArea"]+" .osl-evt__grid-stack-item-content.active");
				//osl-evt__grid-stack-item
				var topTargetElem = $(targetElem).parent();
				
				//osl-evt__grid-stack-item 옵션 지정 명 가져오기
				var itemId = fnFindConfCheckOptVal(topTargetElem, "itemId");
				var field = itemSettingOption["main"][mainOptNm]["field"];
				var name = itemSettingOption["main"][mainOptNm]["name"];
				
				//체크 상태 값 변경
				if($("#"+field).is(":checked")){
					fnSetItemOptValue(topTargetElem, name, "01");
				}else{
					fnSetItemOptValue(topTargetElem, name, "02");
				}
				
				//param : 설정 객체 id, 메인 옵션명, 선택 객체 id, settingConfig
				itemSettingOption["main"][mainOptNm]["event"](itemSettingOption["main"][mainOptNm]["field"] ,mainOptNm, itemId, tempConfig);
			}
		});
		
		//세부
		/*
		//input 입력
		$("#"+appendId).on("propertychange change keyup paste input blur", ".osl-evt__grid-stack-setting-item:not(.d-none) input[type='text'].osl-evt__option-items--sub", function(){
			//TODO
		});
		*/
		//input 입력 - 숫자 변경
		$("#"+appendId).on("keyup paste input", ".osl-evt__grid-stack-setting-item:not(.d-none) input[type='number'].osl-evt__option-items--sub", function(){
			var tempConfig = settingOptionList["baseSettingArea"][appendId];
			
			var subOptNm = $(this).closest(".osl-evt__grid-stack-setting-item--sub").data("sub-option-name");
			
			if(itemSettingOption["sub"][subOptNm].hasOwnProperty("event")){
				//선택된 항목
				var targetElem = $("#"+tempConfig["targetClickArea"]+" .osl-evt__grid-stack-item-content.active");
				//osl-evt__grid-stack-item
				var topTargetElem = $(targetElem).parent();
				
				//osl-evt__grid-stack-item 옵션 지정 명 가져오기
				var itemId = fnFindConfCheckOptVal(topTargetElem, "itemId");
				
				//param : 설정 객체 id, 메인 옵션명, 선택 객체 id, settingConfig
				itemSettingOption["sub"][subOptNm]["event"](itemSettingOption["sub"][subOptNm]["field"] ,subOptNm, itemId, tempConfig);
			}
		});
		//select 변경
		$("#"+appendId).on("change", ".osl-evt__grid-stack-setting-item:not(.d-none) select.osl-evt__option-items--sub", function(){
			var tempConfig = settingOptionList["baseSettingArea"][appendId];
			
			var subOptNm = $(this).closest(".osl-evt__grid-stack-setting-item--sub").data("sub-option-name");
			
			if(itemSettingOption["sub"][subOptNm].hasOwnProperty("event")){
				//선택된 항목
				var targetElem = $("#"+tempConfig["targetClickArea"]+" .osl-evt__grid-stack-item-content.active");
				//osl-evt__grid-stack-item
				var topTargetElem = $(targetElem).parent();
				
				//osl-evt__grid-stack-item 옵션 지정 명 가져오기
				var itemId = fnFindConfCheckOptVal(topTargetElem, "itemId");
				var field = itemSettingOption["sub"][subOptNm]["field"];
				var name = itemSettingOption["sub"][subOptNm]["name"];
				
				var mainElem = $(targetElem).find(".osl-evt__template-item");
				//해당 옵션 설정값 변경
				var selVal = $("#"+field).val();
				if($.osl.isNull(selVal)){
					selVal = $("#"+field).find("option[selected]").attr("value");
					$("#"+field).val(selVal).change();
				}
				fnSetItemOptValue(mainElem, name, selVal);
				
				//param : 설정 객체 id, 서브 옵션명, 선택 객체 id, settingConfig
				itemSettingOption["sub"][subOptNm]["event"](itemSettingOption["sub"][subOptNm]["field"], subOptNm, itemId, tempConfig);
			}
		});
		/*
		//체크박스
		$("#"+appendId).on("change", ".osl-evt__grid-stack-setting-item:not(.d-none) input[type='checkbox'].osl-evt__option-items--sub", function(){
			//TODO
		});
		*/
		
		//설정창 닫기 정보가 있는 경우
		if(settingConfig.hasOwnProperty("closeSettingBtn") && !$.osl.isNull(settingConfig["closeSettingBtn"])){
			$("#"+ settingConfig["closeSettingBtn"]).click(function(){
				var tempConfig = settingOptionList["baseCloseSettingBtn"][settingConfig["closeSettingBtn"]];
				
				//클릭한 정보로부터 최신 설정 정보 가져오기
				var targetElem = $(".osl-evt__grid-stack-item-content.active");
				var selItemInfo = fnGetItemValues(targetElem, true);
				
				//필수 반영 정보 모두 기입되었는지 확인하여 계속 진행
				var form = $("#"+appendId);
				form.valid(function(){
					//성공
					//가지고 있던 옵션들의 반영을 위해 한번 이벤트 실행
					$.each($(".osl-evt__grid-stack-setting-item:not(.d-none)"), function(s, optElem){
						var mainOptNm = optElem.id;
						var field = itemSettingOption["main"][mainOptNm]["field"];
						var name = itemSettingOption["main"][mainOptNm]["name"];
						
						//해당 옵션이 항목에 해당되면
						if(optionCallItem[mainOptNm].indexOf(String(selItemInfo["itemCode"])) > -1 || optionCallItem[mainOptNm].indexOf("all") > -1){
							//가진 이벤트 있으면 실행
							if(itemSettingOption["main"][mainOptNm].hasOwnProperty("event") && typeof itemSettingOption["main"][mainOptNm]["event"]== "function"){
								//param : 설정 객체 id, 메인 옵션명, 선택 객체 id, settingConfig
								//tplItemId로 안하고 itemId로 하는 이유는 신규 추가되는 항목의 경우 tplItemId는 모두 루트 아이템으로 지정되어 있기 때문
								itemSettingOption["main"][mainOptNm]["event"](itemSettingOption["main"][mainOptNm]["field"], mainOptNm, selItemInfo["itemId"], tempConfig);
							}
						}
					});
					
					$("#"+tempConfig["tergetDrawItemArea"]).closest(".osl-evt__items-div").removeClass("d-none");
					$("#"+appendId).closest(".osl-evt__items-setting-div").addClass("d-none");
					
					//창을 닫았으므로 active 제거
					$("#"+tempConfig["targetClickArea"]+" .osl-evt__grid-stack-item-content.active").removeClass("active");
				}, function(){
					//실패
					//창 닫기 불가
					$.osl.alert($.osl.lang("template.message.alert.requiredError"));
				});
			});
		}
		
		
		var ajaxDone;
		//다 그렸으면, 해당 영역에서 추가 세팅 필요한 항목 가져와 세팅
		let editConfig = {
			formValidate: null,
			disableResizeEditor: false, 
			//'minHeight': 190,
			disableDragAndDrop: true
		};
		
		//설정창 에디터 세팅
		settingEditor[appendId] = $.osl.editorSetting(itemSettingOption["main"]["EDITOR_INPUT"]["field"], editConfig);
		$("#"+itemSettingOption["main"]["EDITOR_INPUT"]["field"]).summernote("code", "");
		
		//반영 버튼 이벤트 생성
		$("#"+appendId+" #textPrintBtn").click(function(){
			//이벤트 동일
			//선택된 항목
			var targetElem = $("#"+settingConfig["targetClickArea"]+" .osl-evt__grid-stack-item-content.active");
			//osl-evt__grid-stack-item
			var topTargetElem = $(targetElem).parent();
			
			//osl-evt__grid-stack-item 옵션 지정 명 가져오기
			var tplItemId = fnFindConfCheckOptVal(topTargetElem, "itemId");
			
			//param : 설정 객체 id, 메인 옵션명, 선택 객체 id, settingConfig
			itemSettingOption["main"]["EDITOR_INPUT"]["event"](itemSettingOption["main"]["EDITOR_INPUT"]["field"],"EDITOR_INPUT", tplItemId, settingConfig);
		});
		
		//공통코드
		if(commonArrayList.length > 0){
			//공통코드 채우기
			ajaxDone = $.osl.getMulticommonCodeDataForm(commonArrayList , true);
			$.each(commonArrayList, function(idx, map){
				$(map.targetObj).select2({
					//드롭다운 위치 지정
					//dropdownParent: $("#"+appendId),
					//드롭다운 위치 지정
					dropdownParent: $(this).closest(".modal").length > 0 ? $(this).closest(".modal") : $("#kt_app_content"),
					//스크롤 충돌 방지
					ftScrollUse: false,
					//검색창 숨김
					//minimumResultsForSearch: "Infinity",
				});
			});
		}
		
		//마스터 전체 가져오기 위한 공통코드인 경우
		if(!$.osl.isNull(commonArrayListNull)){
			var ajaxObj = new $.osl.ajaxRequestAction(
					{"url":"/prj/prj1000/prj1200/selectStm3000CommonCodeListAjax.do", "async": false},{});
			//AJAX 전송 성공 함수
			ajaxObj.setFnSuccess(function(data){
				if(data.errorYn == "Y"){
					$.osl.alert(data.message,{type: 'error'});
				}else{
					var codeList = data.commonCodeList;
					var codeHtml ="";
					
					var itemCodeOptNm = fnFindConfCheckOpt("itemCode");
					var item = $("#"+settingConfig["tergetDrawItemArea"]).find("select.osl-evt__template-item["+itemCodeOptNm+"=12]");
					$.each(Object.keys(commonArrayListNull), function(n, targetSelectElemId){
						var selectMstCd = commonArrayListNull[targetSelectElemId];
						if($.osl.isNull(selectMstCd)){
							selectMstCd = settingConfig["gridStack"]["selectMstCd"];
						}
						$.each(codeList, function(idx, code){
							var selected = "";
							
							if(selectMstCd === code.mstCd){
								selected = "selected";
							}
							codeHtml="<option value='"+$.osl.escapeHtml(code.mstCd)+"' "+selected+">"+$.osl.escapeHtml(code.mstCdNm)+"</option>";
							
							$("#"+targetSelectElemId).append(codeHtml);
						});
						
						//공통코드 선택 목록 중 selected인 mstCd를 신규 항목 중 공통코드에 넣어두기(default 값 지정을 위해)
						fnSetItemOptValue(item, "mstCd", selectMstCd);
						
						//사전 선택 값 트리거
						$("#"+targetSelectElemId).select2({
							//드롭다운 위치 지정
							//dropdownParent: $("#"+appendId),
							//드롭다운 위치 지정
							dropdownParent: $(this).closest(".modal").length > 0 ? $(this).closest(".modal") : $("#kt_app_content"),
							//스크롤 충돌 방지
							ftScrollUse: false,
							//검색창 숨김
							//minimumResultsForSearch: "Infinity",
						});
					});
				}
			});
			
			//AJAX 전송
			ajaxDone = ajaxObj.send();
		}
		
		//설정창 세팅이 완료 되었으므로
		settingOptionList["baseSettingArea"][appendId] = usrConfig;
		settingOptionList["baseTargetClickArea"][usrConfig["targetClickArea"]] = usrConfig;
		settingOptionList["baseCloseSettingBtn"][usrConfig["closeSettingBtn"]] = usrConfig;
		
		return ajaxDone;
	};
	
	//Fn03. fnSetForm 전달 받은 데이터를 기준으로 폼 그리기
	/* *
	* function 명 : fnSetForm
	* function 설명 : 전달 받은 데이터를 기준으로 폼 그리기
	* 		단, 항목 그리기용인 경우 - 전달 받은데이터와 상관 없음
	* 		1. 이미 전달 받은 데이터가 있다면 해당 정보대로 그린다.
	* 		2. 전달받은 데이터가 없다면
	* 			getDataType 01이면 양식 정보 기준으로, 02이면 입력 정보 기준 데이터를 가져와 그린다.
	* param datas : 데이터
	* datas = {
	* 	tplFormListInfo : [], //양식 정보
	* 	tplItemValListInfo : [], //값
	* 	ㄴ tplItemOptValListInfo : [], //체크리스트 값 - 목록도 값처럼 넣어 양식 정보, 양식 값 리스트에 넣어져서 들어옴
	* 	ㄴ tplItemSevUsrListInfo : [], //서비스 항목 사용자 목록 값 - 목록도 값처럼 넣어 양식 정보, 양식 값 리스트에 넣어져서 들어옴
	* 	tplItemValUnderListInfo : [], //태그
	* 	fileList*tplItemId* : [], //첨부파일 리스트
	* 	fileListCnt*tplItemId* : 0, //첨부파일 시리얼 넘버
	* };
	* param usrConfig : 옵션
	* */
	const fnSetForm = function (datas, usrConfig){ 
		let targetConfig = fnExtendConfig(usrConfig);
		
		//전달 받은 양식 폼 구성 데이터가 json 이 아니고 배열이면
		if(Array.isArray(datas)){
			//json으로 변경(양식 정보대로 그리는 것으로 간주한다)
			datas = {
					//양식 정보
					"tplFormListInfo" : datas
			};
		}
		
		//전달 받은 양식 폼 구성 데이터가 없으면
		if($.osl.isNull(datas) || Object.keys(datas).length == 0 ){
			let ajaxDone;
			let resultDatas;
			
			//ajax 수신 성공하면, 해당 정보를 그리기 위한 콜백
			let ajaxDoneSuccessCallbcakFn = function(resultData){
				resultDatas = resultData;
				
				//양식 항목 없으면
				if($.osl.isNull(resultData["tplFormListInfo"]) || resultData["tplFormListInfo"].length == 0){
					//사용자 지정 콜백 함수 있는 경우 실행
					if(targetConfig["callback"].hasOwnProperty("ajaxDone") && typeof targetConfig["callback"]["ajaxDone"] == "function"){
						targetConfig["callback"]["ajaxDone"](resultData);
					}

					//항목이 그려진 영역 타겟
					if(!$.osl.isNull(targetConfig.gridStack.addDivId)){
						//fnTemplateEventSetting("#"+targetConfig["gridStack"]["addDivId"], targetConfig).afterCreateHtml("#"+targetConfig["gridStack"]["addDivId"], targetConfig);
						
						//데이터 없음 표출
						$("#"+targetConfig["gridStack"]["addDivId"]).html('<div class="text-center osl-evt__template-no-items my-5">'+targetConfig["noData"]+'</div>');
					}
					//사용자 지정 콜백 함수 있는 경우 실행
					if(targetConfig["callback"].hasOwnProperty("afterLast") && typeof targetConfig["callback"]["afterLast"] == "function"){
						targetConfig["callback"]["afterLast"](resultDatas);
					}
					
					//데이터가 없으므로 중지
					return false;
				}
				
				//양식 정보 기준으로 조회
				if(targetConfig["getDataType"] == "01"){
					//항목 그리기
					fnItemHtml(resultData["tplFormListInfo"], targetConfig);
					
					//값 조회
					fnGetFormDataValues(targetConfig, function(returnData){
						resultDatas = resultData;
						
						//사용자 지정 콜백 함수 있는 경우 실행
						if(targetConfig["callback"].hasOwnProperty("ajaxDone") && typeof targetConfig["callback"]["ajaxDone"] == "function"){
							targetConfig["callback"]["ajaxDone"](resultData);
						}
						
						if(returnData.hasOwnProperty("tplItemValListInfo")){
							fnSetItemValues(returnData, targetConfig);
						}
						
						//사용자 지정 콜백 함수 있는 경우 실행
						if(targetConfig["callback"].hasOwnProperty("afterLast") && typeof targetConfig["callback"]["afterLast"] == "function"){
							targetConfig["callback"]["afterLast"](resultDatas);
						}
					});
				}
				//입력 정보 기준으로 조회
				else{
					//항목 그리기
					fnItemHtml(resultData["tplItemValListInfo"], targetConfig);
					
					//사용자 지정 콜백 함수 있는 경우 실행
					if(targetConfig["callback"].hasOwnProperty("ajaxDone") && typeof targetConfig["callback"]["ajaxDone"] == "function"){
						targetConfig["callback"]["ajaxDone"](resultData);
					}
					
					if(returnData.hasOwnProperty("tplItemValListInfo")){
						fnSetItemValues(returnData, targetConfig);
					}
					
					//사용자 지정 콜백 함수 있는 경우 실행
					if(targetConfig["callback"].hasOwnProperty("afterLast") && typeof targetConfig["callback"]["afterLast"] == "function"){
						targetConfig["callback"]["afterLast"](resultDatas);
					}
				}
			}; //end ajaxDoneSuccessCallbcakFn
			
			//항목 그리기용인 경우 - 전달 받은데이터와 상관 없음
			if(targetConfig["type"] == "drawItem"){
				var rootItems= new $.osl.ajaxRequestAction(
						{"url":"/tpl/tpl1000/tpl1100/selectTpl1100RootTplItemsListAjax.do", "async": false},{});
				//AJAX 전송 성공 함수
				rootItems.setFnSuccess(function(data){
					if(data.errorYn == "Y"){
						$.osl.alert(data.message,{type: 'error'});
					}else{
						resultDatas = data;
						
						//항목 그리기
						fnItemHtml(data["tplBasicList"], targetConfig);
					}
				});
				
				//AJAX 전송
				ajaxDone = rootItems.send();
				return ajaxDone
			}
			//항목 그리기용이 아닐 때
			else {
				//양식 정보 기준으로 조회
				if(targetConfig["getDataType"] == "01"){
					//양식 정보를 이미 가지고 있으면
					if(datas.hasOwnproperty("tplFormListInfo")){
						ajaxDoneSuccessCallbcakFn(datas["tplFormListInfo"]);
					}
					//없으면
					else{
						//양식 폼 가져오기
						ajaxDone = fnGetFormData(targetConfig, ajaxDoneSuccessCallbcakFn);
					}
				}
				//입력 정보 기준으로 조회
				else{
					//입력 정보를 이미 가지고 있으면
					if(datas.hasOwnproperty("tplItemValListInfo")){
						ajaxDoneSuccessCallbcakFn(datas["tplItemValListInfo"]);
					}
					//없으면
					else{
						//입력 정보 가져오기
						ajaxDone = fnGetFormDataValues(targetConfig, ajaxDoneSuccessCallbcakFn);
					}
				}
				
				ajaxDone["returnDatas"] = resultDatas;
				
				return ajaxDone;
			}
		}
		//전달 받은 데이터가 이미 존재하면
		else{
			//항목 그리기
			fnItemHtml(datas["tplFormListInfo"], targetConfig);
			//사용자 지정 콜백 함수 있는 경우 실행
			if(targetConfig["callback"].hasOwnProperty("ajaxDone") && typeof targetConfig["callback"]["ajaxDone"] == "function"){
				targetConfig["callback"]["ajaxDone"](datas);
			}
			
			if(datas.hasOwnProperty("tplItemValListInfo")){
				fnSetItemValues(datas, targetConfig);
			}
			
			//사용자 지정 콜백 함수 있는 경우 실행
			if(targetConfig["callback"].hasOwnProperty("afterLast") && typeof targetConfig["callback"]["afterLast"] == "function"){
				targetConfig["callback"]["afterLast"](datas);
			}
			
			//ajaxDone 반환 없음
		}
	};
	
	//Fn04. fnItemHtml 항목 그리기
	/* *
	 * function 명 : fnItemHtml
	 * function 설명 : 전달 받은 값을 바탕으로 항목 html 그린다.
	 * param datas : html을 그리기 위한 값
	 * param usrConfig : 옵션
	 * 
	 * 주의 : 옵션 및 html, param 변경 시 fnCheckItemHtml도 확인 필요(앞 로직을 동일하게 사용해야 하기 때문)
	 * */
	const fnItemHtml = function(datas, usrConfig) {
		let targetConfig = fnExtendConfig(usrConfig);
		let gridStackOptDefault = targetConfig["gridStack"];
		
		//아이템 추가/삭제 버튼 - 세팅용
		gridStackOptDefault["appendBtnStr"] = gridStackOptDefault["removeBtnStr"];
		
		if($.osl.isNull(targetConfig["targetCd"])){
			targetConfig["targetCd"] = targetConfig["tplClsType"];
		}
		
		//양식 생성이 아닐 때에만 이력 정보를 저장하기 위해
		let concatStr = $.extend({}, modifyLogOptsStr["-1"]);
		if(targetConfig["type"].indexOf("draw") == -1){
			concatStr = $.extend(concatStr,modifyLogOptsStr[targetConfig["targetCd"]]);
		}
		
		//외부 사용자 접근인지 확인(paramLicGrpId 값 유무)
		let outside = false;
		if(!$.osl.isNull(targetConfig["paramLicGrpId"])){
			outside = true;
		}
		
		//gridStack handle 제어
		if(targetConfig["type"].indexOf("draw") == -1 && targetConfig["type"] != "sameTime"){
			//상세조회이면 핸들러 제외(마우스 오버시 이동포인터 나타나기 때문에)
			gridStackOptDefault["defaultHandleClassNm"] = "";
		}
		if( gridStackOptDefault.hasOwnProperty("handle") && !$.osl.isNull(gridStackOptDefault["handle"]) && gridStackOptDefault["handle"] == true ){
			//전달 받은 옵션 값 중 handle이 있으면
			if(gridStackOptDefault.hasOwnProperty("handleClassNm") && !$.osl.isNull(gridStackOptDefault["handleClassNm"])){
				
				let handleClassList = gridStackOptDefault["defaultHandleClassNm"].split(" ");
				if(handleClassList.indexOf(config["gridStack"]["defaultHandleClassNm"]) == -1){
					handleClassList.push(config["gridStack"]["defaultHandleClassNm"]);
				}
				if(handleClassList.indexOf(gridStackOptDefault["handleClassNm"]) == -1){
					handleClassList.push(gridStackOptDefault["handleClassNm"]);
				}
				
				gridStackOptDefault["defaultHandleClassNm"] = handleClassList.join(" ");
			}
			
			//핸들 사용일 때, 추가/제거 버튼도 표출되어야 하면, 알림과 같은 아이템의 경우 우측 아이콘이 가리기 때문에
			//추가/제거 버튼 표출
			if(!gridStackOptDefault["btnRemove"]){
				gridStackOptDefault["defaultHandleClassNm"] += " me-1";
			}
		}else{
			gridStackOptDefault["defaultHandleClassNm"] = "";
		}
		
		//혹시라도 배열로 안들어 오면
		if(!Array.isArray(datas)){
			datas = [datas];
		}
		
		//추가 대상에 양식 타입 추가
		if(!$.osl.isNull(gridStackOptDefault["addDivId"])){
			$("#"+gridStackOptDefault["addDivId"]).data("type", targetConfig["type"]);
		}
		if(!$.osl.isNull(gridStackOptDefault["removeDivId"])){
			$("#"+gridStackOptDefault["removeDivId"]).data("type", targetConfig["type"]);
		}
		
		//항목을 그리기 전 사용자 지정 콜백이 있으면
		if(targetConfig.hasOwnProperty("callback") && targetConfig["callback"].hasOwnProperty("beforeHtmlDraw") && typeof targetConfig["callback"]["beforeHtmlDraw"] == "function"){
			targetConfig["callback"]["beforeHtmlDraw"]();
		}
		
		//그리고 나서 추가하기 전, 기존에 이미 추가되어 있는 위젯은 추가되면 안되므로
		//그리는 영역과 가까운 그리드 스택 찾기
		var addGridStackObj = null;
		var addGridItems = null;
		if(!$.osl.isNull(gridStackOptDefault["addDivId"])){
			if($("#"+gridStackOptDefault["addDivId"]).closest(".grid-stack").length > 0){
				var gridStackElem = $("#"+gridStackOptDefault["addDivId"]).closest(".grid-stack");
				addGridStackObj = $.osl.templateForm.gridStack.list[gridStackElem.attr("id")];
			
				if(!$.osl.isNull(addGridStackObj)){
					//기존 그리드 스택 항목
					addGridItems = addGridStackObj.getGridItems();
				}
			}
		}
		var removeGridStackObj = null;
		var removeGridItems = null;
		if(!$.osl.isNull(gridStackOptDefault["removeDivId"])){
			if($("#"+gridStackOptDefault["removeDivId"]).closest(".grid-stack").length > 0){
				var gridStackElem = $("#"+gridStackOptDefault["removeDivId"]).closest(".grid-stack");
				removeGridStackObj = $.osl.templateForm.gridStack.list[gridStackElem.attr("id")];
			
				if(!$.osl.isNull(removeGridStackObj)){
					//기존 그리드 스택 항목
					removeGridItems = removeGridStackObj.getGridItems();
				}
			}
		}
		
		//그리기 시작
		$.each(datas, function(rn, itemMap){
			if(Object.keys(itemMap).length == 0){
				//데이터가 없으면 건너뛰기
				return;
			}
			
			//주어진 양식 폼 대로 그린다고 했을 때
			if(targetConfig["getDataType"] == "01"){
				//양식별 표출 가능한 아이템만 그리기
				if(tplTypeViewItem[targetConfig["tplClsType"]].indexOf(String(itemMap["itemCode"])) == -1){
					//그리기 가능한 항목이 아니면 건너뛰기
					return;
				}
				//TPL00014 01 내용 02 접수 : 양식 항목 분류에 따라 그리기
				//항목 분류가 내용이 아닐 때
				if("01" != targetConfig["tplItemClsCd"]){
					if(acceptItemView.indexOf(String(itemMap["itemCode"])) == -1){
						//그리기 가능한 항목이 아니면 건너뛰기
						return;
					}
				}
			}
			
			//초기화
			let gridStackOpt = $.extend({}, gridStackOptDefault, gridStackOptDefault);
			
			//true 필수인 양식 아이템만 가져오기,  false 필수가 아닌 양식 아이템만 가져오기, null 모두 가져오기 (default null)
			if(targetConfig.hasOwnProperty("getItemEssential") && targetConfig["getItemEssential"] != null){
				//필수인 항목만 그리기 위해
				if(targetConfig["getItemEssential"]){
					//필수가 아니면
					if(itemMap["itemEssentialCd"] != "01"){
						//건너뛰기
						return true;
					}
				}
				//필수가 아닌 항목만 그리기 위해
				else{
					//필수이면
					if(itemMap["itemEssentialCd"] == "01"){
						//건너뛰기
						return true;
					}
				}
			}
			
			//start :: 1차 데이터 가공
			//타입 저장
			if(!itemMap.hasOwnProperty("configType")){
				itemMap["configType"]= targetConfig["type"];
			}
			//이미 생성된 값으로 id 넘어온 경우
			if(itemMap.hasOwnProperty("gsId") && !$.osl.isNull(itemMap["gsId"])){
				itemMap["itemId"] = itemMap["gsId"];
			}
			//itemId 신규 생성인 경우 가져온 항목 ID 초기화(fnSetPlugin 쪽도 같이 확인)
			else if(gridStackOpt["createNewId"] == "01"){
				itemMap["itemId"] = "newTplItem" + rn + new Date().format("ssms");
			}else if(itemMap["configType"] == 'drawItem'){
				itemMap["itemId"] = itemMap["tplItemId"] + itemMap["itemCode"];
				
				if(gridStackOpt.hasOwnProperty("subId") && !$.osl.isNull(gridStackOpt["subId"])){
					itemMap["itemId"] += gridStackOpt["subId"];
				}
			}else{
				itemMap["itemId"] = itemMap["tplItemId"];
				
				if(gridStackOpt.hasOwnProperty("subId") && !$.osl.isNull(gridStackOpt["subId"])){
					itemMap["itemId"] += gridStackOpt["subId"];
				}
			}
			
			//TPL00001 양식 구분 추가
			itemMap["tplClsType"] = targetConfig["tplClsType"];
			//TPL00002 양식 유형양식 유형 추가(없으면 default 01 일반)
			if($.osl.isNull(itemMap["tplTypeCd"])){
				itemMap["tplTypeCd"] = "01";
			}
			
			//서비스 필수 관련 항목(없으면 02)
			if($.osl.isNull(itemMap["tplEssentialItem"])){
				itemMap["tplEssentialItem"] = "02";
				//서비스 항목이 아니면
				itemMap["itemSelUsrMaxVal"] = "0";
			}
			//서비스 항목이고 사용자 항목이면
			if(itemMap["tplEssentialItem"] == "01" && String(itemMap["itemCode"]) == "09"){
				//최소 사용자 수 없으면
				if($.osl.isNull(itemMap["itemSelUsrMaxVal"]) || itemMap["itemSelUsrMaxVal"] == 0){
					//기본 최대 값으로 지정
					itemMap["itemSelUsrMaxVal"] = itemSettingOption["main"]["SELECT_MAX_USER"]["max"];
				}
			}
			//일반 필수항목인지 확인 -서비스 항목인 경우 필수항목으로 체크-
			if((!$.osl.isNull(itemMap["itemEssentialCd"]) && itemMap["itemEssentialCd"] == "01") || (!$.osl.isNull(itemMap["tplEssentialItem"]) && itemMap["tplEssentialItem"] == "01")){
				itemMap["itemEssentialCd"] = "01";
			}else{//비필수
				itemMap["itemEssentialCd"] = "02";
			}
			
			//선행 지식 관련 항목(없으면 02)
			if($.osl.isNull(itemMap["itemConnectionUseCd"])){
				itemMap["itemConnectionUseCd"] = "02";
			}
			
			//다중 선택 관련 항목(없으면 02)
			if($.osl.isNull(itemMap["itemMultiSelCd"])){
				itemMap["itemMultiSelCd"] = "02";
			}
			//만약 drawItem이고 정보자산인 경우 default itemMultiSelCd를 02로 변경 - db에는 default 01로 들어가 있기 때문
			//tplClsType : TPL00001 (01 정보자산, 02 보안, 03 기본항목)
			if(itemMap["configType"] == "drawItem" && String(itemMap["itemCode"]) == "15" && targetConfig["tplClsType"] == "01"){
				itemMap["itemMultiSelCd"] = "02";
			}
			
			//수정 가능 관련 항목(없으면 01)
			if($.osl.isNull(itemMap["itemModifyCd"])){
				itemMap["itemModifyCd"] = "01";
			}
			
			//옵션 값
			if($.osl.isNull(itemMap["itemOptionVal"])){
				itemMap["itemOptionVal"] = "";
			}
			//검색 옵션 값
			if($.osl.isNull(itemMap["itemSearchClsCd"])){
				itemMap["itemSearchClsCd"] = "";
			}

			//검색 관련 항목(없으면 02)
			if($.osl.isNull(itemMap["itemSearchCd"])){
				itemMap["itemSearchCd"] = "02";
			}
			
			//연동으로 값이 지정되는 항목(없으면 02)
			if($.osl.isNull(itemMap["itemItlckCd"])){
				itemMap["itemItlckCd"] = "02";
			}
			//디바이스이면 강제 연동 처리, 필수 처리 
			if(String(itemMap["itemCode"]) == "16"){
				itemMap["itemItlckCd"] = "01";
				itemMap["itemEssentialCd"] = "01";
			}
			
			//기간 가공
			if(String(itemMap["itemCode"]) == "06"){
				itemMap["subMstCd"] = itemMap["itemOptionVal"];
			}
			//공통코드 가공
			else if(String(itemMap["itemCode"]) == "12"){
				//공통코드 값이 없으면
				if($.osl.isNull(itemMap["itemOptionVal"])){
					itemMap["itemOptionVal"] = gridStackOpt["selectMstCd"];
				}
				
				itemMap["mstCd"] = itemMap["itemOptionVal"];
			}
			//텍스트 박스 혹은 숫자
			else if(String(itemMap["itemCode"]) == "02" || String(itemMap["itemCode"]) =="07" ){
				if($.osl.isNull(itemMap["itemOptionVal"])){
					itemMap["itemOptionVal"] = "01";
				}
			}
			
			// 알람 유무
			if(!$.osl.isNull(itemMap["itemAlarmUseCd"]) && itemMap["itemAlarmUseCd"] == "01"){
				//아이템 알람 받을 사용자이면
				if(String(itemMap["itemCode"]) == "09"){
					itemMap["alarmUsr"] = "alarmusr";
				}
			}
			
			//정규 표현식
			//값이 없을 때
			if($.osl.isNull(itemMap["itemRegexCd"])){
				//텍스트 박스이면
				if(String(itemMap["itemCode"]) == "02"){
					itemMap["itemRegexCd"] = "01";
				}
				//숫자이면 
				else if(String(itemMap["itemCode"]) == "07"){
					itemMap["itemRegexCd"] = "04";
				}
			}
			
			//항목이 사용자, 조직, 정보자산, 디바이스이면 정규식 체크 안함
			if(String(itemMap["itemCode"]) == "09" || String(itemMap["itemCode"]) == "11" || String(itemMap["itemCode"]) == "15" || String(itemMap["itemCode"]) == "16"){
				itemMap["itemRegexCd"] = "-1";
			}
			
			//항목 표출 순번 없으면 1로 강제
			if($.osl.isNull(itemMap["itemViewOrd"])){
				itemMap["itemViewOrd"] = "1";
			}
			
			//사이즈
			//저장된 값에 따라 폼 형성(너비, 높이, 위치 담기)
			if($.osl.isNull(itemMap["itemWidth"])){
				itemMap["itemWidth"]= 6;
			}
			if($.osl.isNull(itemMap["itemHeight"])){
				itemMap["itemHeight"]= 1;
			}
			//위치는 값이 있는 경우에만 추가 - 자동 적용을 위해 기존 컬럼 제거
			if($.osl.isNull(itemMap["itemXpoint"])){
				delete itemMap["itemXpoint"];
			}
			if($.osl.isNull(itemMap["itemYpoint"])){
				delete itemMap["itemYpoint"];
			}
			//항목 그리기용인 경우
			if(itemMap["configType"] == "drawItem"){
				//위치 x는 0, y는 순번대로 지정
				itemMap["itemXpoint"] = 0;
				//코드를 순번화
				itemMap["itemYpoint"] = parseInt(itemMap["itemCode"]);
			}
			
			//아이템 추가/삭제 버튼 - 세팅용
			//사용 유무에 따라 변경
			//사용 안함이면
			if($.osl.isNull(itemMap["useCd"]) || itemMap["useCd"] == "02" ){
				//삭제된 항목 표시 대상 지정되어 있으면
				if(!$.osl.isNull(gridStackOpt["removeDivId"])) {
					gridStackOpt["appendDivId"] = gridStackOpt["removeDivId"];
				} else {
					return false;
				}
				
				//삭제된 항목은 삭제 리스트로 전달
				if(!$.osl.isNull(gridStackOpt["removeDivId"]) && (itemMap["configType"].indexOf("draw") > -1 || itemMap["configType"] == "sameTime")){
					//버튼 추가버튼으로 수정
					gridStackOpt["appendBtnStr"] = gridStackOpt["addBtnStr"];
					
					//너비와 높이 강제
					itemMap["itemWidth"] = 1;
					itemMap["itemHeight"] = 1;
				}
			}
			//drawItem이면
			if(itemMap["configType"] == "drawItem"){
				//버튼 추가버튼으로 수정
				gridStackOpt["appendBtnStr"] = gridStackOpt["addBtnStr"];
			}
			
			//검색 버튼(사용자, 조직, 정보자산, 디바이스)에 대한 버튼 표출 조건(실제 조건은 아이템 별 조건에 따라 적용되어야 하기 때문에 밑에서 체크)
			var viewBtnBoolean = true;
			//서비스 항목에서의 버튼
			var sevViewBtnBoolean = false;
			let sevViewBtnClass = "";
			let sevViewBtnHtml = "";
			
			//외부 사용자 접근인 경우 유형 상관 없이 버튼 표출 안함
			if(outside){
				viewBtnBoolean = false;
			}
			//서비스 항목의 사용자 항목이면
			else if(itemMap["tplEssentialItem"] == "01" && String(itemMap["itemCode"]) == "09"){
				if(["drawItem", "detail"].indexOf(itemMap["configType"]) == -1){
					//서비스 필수 항목이면 검색 버튼 표출 안함
					viewBtnBoolean = false;
					//서비스 항목 내 버튼 표출
					sevViewBtnBoolean = true;
					sevViewBtnClass = "osl-evt__template-item-usr-service-button--add";
					//별도 추가 항목이 있으므로
					//그리기 용일 땐 버튼 효과 무시 적용
					if(itemMap["configType"].indexOf("draw") > -1 && sevViewBtnClass != ""){
						sevViewBtnClass += " cursor-default";
					}
					
					if(sevViewBtnBoolean){
						sevViewBtnHtml = `
							<div class="mt-2 d-flex flex-row justify-content-center">
								<div class="btn btn-sm btn-point3 w-50 ${sevViewBtnClass}">
									<span data-lang-cd="button.add">${$.osl.lang("button.add")}</span>
								</div>
							</div>
						`;
					}
				}
			}
			else if(itemMap["configType"] == "update"){
				//수정일 때, 수정 불가능 항목이면
				if(itemMap["itemModifyCd"] == "02"){
					viewBtnBoolean = false;
				}
			}
			else if(itemMap["configType"] == "detail"){
				//상세 조회이면 버튼 표출 안함
				viewBtnBoolean = false;
				
				//정보자산 상세조회이면 버튼 표출 => 검색버튼 아닌 상세조회 버튼(하단에서 type으로 분기)
				if(String(itemMap["itemCode"]) == "15"){
					viewBtnBoolean = true;
				}
			}
			
			//정보 표출을 위한 클래스
			let infoBtnClass = "";
			//검색 버튼
			let searchBtnClass = "";
			let searchBtnHtml = "";
			if(viewBtnBoolean){
				searchBtnClass = "input-group";
				
				//아이템 타입에 따라 버튼에 추가될 클래스
				let viewBtnClass = "";
				//사용자
				if(String(itemMap["itemCode"]) == "09"){
					viewBtnClass = "osl-evt__template-item-usr-button cursor-default";
				}
				//조직
				else if(String(itemMap["itemCode"]) == "11"){
					viewBtnClass = "osl-evt__template-item-dept-button cursor-default";
				}
				//정보자산
				else if(String(itemMap["itemCode"]) == "15"){
					viewBtnClass = "osl-evt__template-item-cfg-button";
				}
				//디바이스 - jamf
				else if(String(itemMap["itemCode"]) == "16"){
					viewBtnClass = "osl-evt__template-item-dvc-button cursor-default";
				}
				
				//그리기 용일 땐 버튼 효과 무시
				if(itemMap["configType"].indexOf("draw") > -1 && viewBtnClass != ""){
					viewBtnClass += " cursor-default";
				}
				
				//정보자산 상세조회이면 버튼 표출 => 검색버튼 아닌 상세조회 버튼
				if(String(itemMap["itemCode"]) == "15" && itemMap["configType"] == "detail"){
					/*
					searchBtnHtml = `
						<button type="button" class="btn btn-point3 ${viewBtnClass}">
							<i class="fa fa-search text-light osl-me-4"></i>
							<span data-lang-cd="button.detail">
								${$.osl.lang("button.detail")}
							</span>
						</button>
					`;
					*/
				}
				//디바이스일 때
				else if(String(itemMap["itemCode"]) == "16"){
					//확인 버튼 - 연동 대상
					searchBtnHtml = `
						<button type="button" class="btn btn-point2 btn-square osl-border-en ${viewBtnClass}">
							<span data-lang-cd="button.check">
								${$.osl.lang("button.check")}
							</span>
						</button>
					`;
				}
				//그 외 일반 검색 버튼
				else{
					searchBtnHtml = `
						<button type="button" class="btn btn-search ${viewBtnClass}">
							<i class="osl-icon osl-icon-search-2"></i>
							<span data-lang-cd="button.search" class="osl-blind">
								${$.osl.lang("button.search")}
							</span>
						</button>
					`;
				}
			}
			//검색 버튼 표출이 아닐 때
			else{
				//사용자
				if(String(itemMap["itemCode"]) == "09"){
					//서비스 항목이 아니면
					if($.osl.isNull(itemMap["tplEssentialItem"]) || itemMap["tplEssentialItem"] == "02"){
						//검색 버튼과 상관 없이
						searchBtnClass = "input-group";
						//버튼이 없고 hidden이 다음에 있으므로 스타일 수정 적용을 위해
						infoBtnClass = "osl-evt__usr-info-pop rounded-end";
					}
				}
				//정보자산(단건일 때만)
				else if(String(itemMap["itemCode"]) == "15" && itemMap["itemMultiSelCd"] == "02"){
					infoBtnClass = "osl-evt__cfg-info-pop";
				}
				//디바이스
				else if(String(itemMap["itemCode"]) == "16"){
					//확인 버튼과 상관 없이
					searchBtnClass = "input-group";
					//버튼이 없고 hidden이 다음에 있으므로 스타일 수정 적용을 위해
					infoBtnClass = "rounded-end";
				}
			}
			
			//신규등록이 아닌 기존 양식 항목 수정일 때 서비스 항목은 버튼 제거
			if(gridStackOpt["btnRemove"] || itemMap["tplEssentialItem"] == "01"){
				//지우라고 전달 받았거나, 서비스 유형일 때의 필수 항목인 경우
				gridStackOpt["appendBtnStr"] = '';
			}
			
			//알림으로 연결된 사용자 항목, 알림 항목이면 버튼 제거
			if((String(itemMap["itemCode"]) == "09" && itemMap["itemAlarmUseCd"] == "01") || String(itemMap["itemCode"]) == "14"){
				gridStackOpt["appendBtnStr"] = "";
			}
			
			//필수인 경우 사용될 class, option에 넣어질 변수 선언 - 단, 상세일 경우 제외
			var itemRequired = "";
			if(itemMap["itemEssentialCd"] == "01" && itemMap["configType"] != "detail"){
				itemRequired = "required";
			}
			//end :: 1차 데이터 가공
			
			//1. item에 들어갈 옵션 생성
			let itemOption = {};
			$.each(Object.keys(confCheckOpt["nomal"]), function(k, key){
				//값이 존재하면
				if(itemMap.hasOwnProperty(key) && !$.osl.isNull(itemMap[key])){
					itemOption[key] = `${confCheckOpt["nomal"][key]}="${itemMap[key]}"`;
					
					//itemOptionVal escapeHtml 처리 --해당 부분이 option으로 들어가게 되므로
					if(key == "itemOptionVal"){
						itemOption[key] = `${confCheckOpt["nomal"][key]}="${String($.osl.escapeHtml(itemMap[key])).trim()}"`;
					}
				}
			});
			$.each(Object.keys(confCheckOpt["data"]), function(k, key){
				//값이 존재하면
				if(itemMap.hasOwnProperty(key) && !$.osl.isNull(itemMap[key])){
					itemOption[key] = `data-${confCheckOpt["data"][key]}="${itemMap[key]}"`;
					
					//itemOptionVal escapeHtml 처리 --해당 부분이 option으로 들어가게 되므로
					if(key == "itemOptionVal"){
						itemOption[key] = `data-${confCheckOpt["data"][key]}="${String($.osl.escapeHtml(itemMap[key])).trim()}"`;
					}
				}
			});
			$.each(Object.keys(confCheckOpt["grid"]), function(k, key){
				//값이 존재하면
				if(itemMap.hasOwnProperty(key) && !$.osl.isNull(itemMap[key])){
					itemOption[key] = `${confCheckOpt["grid"][key]}="${itemMap[key]}"`;
					
					//itemOptionVal escapeHtml 처리 --해당 부분이 option으로 들어가게 되므로
					if(key == "itemOptionVal"){
						itemOption[key] = `${confCheckOpt["grid"][key]}="${String($.osl.escapeHtml(itemMap[key])).trim()}"`;
					}
				}
			});
			
			//2. 각 위치에 들어갈 옵션 생성
			let topOption = {
				class : config["gridStack"]["defaultFirstClassNm"] + " " + gridStackOpt["firstClassNm"] + " " + gridStackOpt["essAddClassNm"] + " " + gridStackOpt["nonEssAddClassNm"],
				option : ""
			};
			
			let middleOpt = {
				class: ""
			};
			
			//sub 아이템도 mainOption 사용 중이여서 subOption 은 만들지 않음
			let mainOption = {
				class : "",
				option : {}, //마지막에 attr로 한번에 추가하기 위해 json 폼으로 지정
				modify : modifyLogOptsStr[targetConfig["targetCd"]][String(itemMap["itemCode"])],
				subModify : modifyLogOptsStr[targetConfig["targetCd"]][String(itemMap["itemCode"])+"Sub"], //알림에서
				imgModify : modifyLogOptsStr[targetConfig["targetCd"]][String(itemMap["itemCode"])+"Img"], //사용자 이미지에서
			};
			//체크리스트의 경우 별도 옵션 사용
			let optOption = {
				class : "",
				option : {}, //마지막에 attr로 한번에 추가하기 위해 json 폼으로 지정
				modify : modifyLogOptsStr[targetConfig["targetCd"]][String(itemMap["itemCode"])],
			};
			
			let dbColumnOpt = {
				option : ""
			};
			
			let hideOption = {
				option : ""
			};
			
			//이상징후 매칭 key osl-evt__grid-stack-keypath-icon
			let keyPathOption = {
					option : ""
			};
			
			//topOption - class : osl-evt__grid-stack-item 선상에 "추가"
			//서비스 필수항목이면 서비스 위젯이라고 같이 추가
			if(itemMap["tplEssentialItem"] == "01"){
				topOption["class"] += " service-widget osl-evt__service-widget";
			}
			//알림 항목이고 항목 추가 쪽에 그리는 경우 hide 처리를 위해 추가
			if(itemMap["configType"] == "drawItem" && String(itemMap["itemCode"]) == "14"){
				topOption["class"] += " d-none";
			}
			
			//topOption - option 생성
			$.each(confCheckOptPosition["top"], function (n, key){
				if(!$.osl.isNull(itemOption[key])){
					topOption["option"] += " " + itemOption[key];
				}
			});
			
			//middleOpt - class : osl-evt__template-handle 선상에 "추가"
			var oslPaddingClass = "";
			if(itemMap["configType"].indexOf("draw") > -1){
				oslPaddingClass = "osl-py-8";
			}
			//유형에 따라 클래스 추가
			//단순 텍스트 표출
			if(String(itemMap["itemCode"]) == "01"){
				//middleOpt["class"] = 'min-h-50px overflow-auto p-2 mb-1 osl-h-calc--35px';
				middleOpt["class"] = 'min-h-90px overflow-auto p-2 '+oslPaddingClass;
			}
			//텍스트 영역
			else if(String(itemMap["itemCode"]) == "03"){
				//middleOpt["class"] = 'form-group resize-none py-0 px-2 osl-h-calc--35px';
				middleOpt["class"] = 'resize-none '+oslPaddingClass;
			}
			//첨부파일
			else if(String(itemMap["itemCode"]) == "13"){
				//middleOpt["class"]= 'form-group px-2 osl-h-calc--50px';
				middleOpt["class"]= oslPaddingClass;
			}
			/* TODO 2024-12-26 삭제 예정 레이아웃 변경으로 인한 주석 처리
			//체크박스
			else if(String(itemMap["itemCode"]) == "08"){
				//middleOpt["class"] = 'form-group px-2';
			}
			//기관 및 공통코드, 알림
			else if(String(itemMap["itemCode"]) == "10" || String(itemMap["itemCode"]) == "12" || String(itemMap["itemCode"]) == "14"){
				//middleOpt["class"]= 'form-group px-2';
			}*/
			//그 외
			else{
				//middleOpt["class"] = 'form-group px-2';
				middleOpt["class"] = oslPaddingClass;
			}
			
			//mainOption - class : osl-evt__template-item 선상에 "추가"
			//optOption - 체크리스트일때 사용
			//단순 구성 항목 그리기일 때
			if(itemMap["configType"] == "drawItem"){
				//아이템이 체크박스, select일 때
				if( ["08", "10", "12", "14"].indexOf(String(itemMap["itemCode"])) > -1){
					mainOption["option"]["disabled"] = true;
					optOption["option"]["disabled"] = true;
				}
				//아이템이 input/textarea일 때
				else {
					mainOption["option"]["readonly"] = "readonly";
				}
			}
			//폼 그리기, /*폼 입력 수정일 때 해당 항목이 수정 불가일 때*/, 상세보기일 때
			/*itemMap["configType"] == "drawForm" || (itemMap["configType"] =="update" && itemMap["itemModifyCd"] == "02") || itemMap["configType"] == "detail"*/
			else if(itemMap["configType"] == "drawForm" || itemMap["configType"] == "detail"){
				//아이템이 체크박스, select일 때
				if( ["08", "10", "12", "14"].indexOf(String(itemMap["itemCode"])) > -1){
					mainOption["option"]["disabled"] = true;
					optOption["option"]["disabled"] = true;
				}
				//아이템이 input/textarea일 때
				else{
					mainOption["option"]["readonly"] = "readonly";
				}
				/*
				//폼 입력 수정일 때 수정 가능한 항목이 아니면
				if(itemMap["configType"] =="update" && itemMap["itemModifyCd"] == "02"){
					mainOption["class"] += " template-item-readonly";
				}
				*/
			}
			
			//아이템이 필수 항목일 때
			if((!$.osl.isNull(itemMap["itemEssentialCd"]) && itemMap["itemEssentialCd"] == "01") || (!$.osl.isNull(itemMap["tplEssentialItem"]) && itemMap["tplEssentialItem"] == "01")){
				//상세보기가 아닌 경우
				if(itemMap["configType"] != "detail"){
					//mainOption["class"] += " required";
					mainOption["option"]["required"] = "required";
				}
				
				//사용자가 전달한 필수항목에 들어갈 클래스가 있다면
				if(!$.osl.isNull(gridStackOpt["essAddClassNm"])){
					mainOption["class"] += " "+gridStackOpt["essAddClassNm"];
				}
			}
			//비필수 일 때
			else{
				//사용자가 전달한 비필수항목에 들어갈 클래스가 있다면
				if(!$.osl.isNull(gridStackOpt["nonEssAddClassNm"])){
					mainOption["class"] += " "+gridStackOpt["nonEssAddClassNm"];
				}
			}
			
			//mainOption - option 생성
			$.each(confCheckOptPosition["main"], function (n, key){
				if(!$.osl.isNull(itemOption[key])){
					var optionKey = "";
					if(confCheckOpt["nomal"].hasOwnProperty(key)){
						optionKey = confCheckOpt["nomal"][key];
					}else if(confCheckOpt["data"].hasOwnProperty(key)){
						optionKey = "data-"+confCheckOpt["data"][key];
					}else if(confCheckOpt["grid"].hasOwnProperty(key)){
						optionKey = confCheckOpt["grid"][key];
					}else{
						optionKey = key;
					}
					
					mainOption["option"][optionKey] = itemMap[key];
					optOption["option"][optionKey] = itemMap[key];
				}
			});
			
			//placehodler가 필요한 경우
			if(itemMap["configType"] == "insert" || itemMap["configType"] == "update" || itemMap["configType"] == "copy" || itemMap["configType"] == "sameTime"){
				mainOption["option"]["placeholder"] = $.osl.escapeHtml(itemMap.itemNm);
			}
			
			//dbColumnOpt : db 컬럼 정보 우선 보관을 위해 osl-evt__grid-stack-item-content에 추가
			$.each(confCheckOptPosition["dbColumn"], function (n, key){
				if(!$.osl.isNull(itemOption[key])){
					dbColumnOpt["option"] += " " + itemOption[key];
				}
			});
			
			//hideOption
			$.each(confCheckOptPosition["hide"], function (n, key){
				if(!$.osl.isNull(itemOption[key])){
					hideOption["option"] += " " + itemOption[key];
				}
			});
			
			//keyPathOption
			$.each(confCheckOptPosition["keyBtn"], function (n, key){
				if(!$.osl.isNull(itemOption[key])){
					keyPathOption["option"] += " " + itemOption[key];
				}
			});
			
			//이상징후 매칭 key path를 위한 버튼 html show - 체크리스트에서 사용하기 위함
			var keyPathBtnShow = false;
			
			//키 맵핑 건너뛸 아이템 코드
			//tpl1101.jsp에도 동일한 부분 있으니 변경 시 확인 바람
			//TPL00003 체크리스트 아니면 - 체크리스트는 별도로 생성관리
			var passKeyMapCode = ["01", "06", "09", "10", "11", "12", "13", "14", "15"];
			if(passKeyMapCode.indexOf(String(itemMap["itemCode"])) == -1){
				var keyPathAddClass = 'osl-evt__grid-stack-keypath-header';
				//삭제/추가 버튼이 있으면 간격 조절되어야 하므로 클래스 추가
				if(!$.osl.isNull(gridStackOpt["appendBtnStr"]) && gridStackOpt["appendBtnStr"] != ""){
					keyPathAddClass += ' osl-w-calc--35px';
				}
				
				//이상징후 매칭 key path를 위한 버튼 html
				var keyPathBtn = fnLogKeyMappingHtmlStr(gridStackOpt["showLinkKeyBtn"], gridStackOpt["linkKeyEvt"], keyPathAddClass, keyPathOption["option"], itemMap["keyPath"]);
				
				gridStackOpt["appendBtnStr"] += keyPathBtn;
			}
			
			//알림이면 클래스 추가
			var alarmClass = "";
			if(String(itemMap["itemCode"]) == "14"){
				alarmClass = "osl-grid-stack-item-alarm osl-evt__grid-stack-item-alarm";
			}
			
			
			/* * 대략적인 구조 - 항목에 따라 osl-evt__template-handle 내부가 조금씩 달라지지만 구조는 비슷하다.
			 * (1)<div osl-evt__grid-stack-item>
			 * (2)	<div osl-evt__grid-stack-item-content>
			 * (3)		addBtn/removeBtn/keyBtn etc
			 * (4)		<div osl-evt__template-handle>
			 * (5)			<div form-group px-2(osl-px-6) / mb-4 px-2(osl-px-6)>
			 * (6)				<label osl-evt__grid-stack-item-label></label>
			 * (7)				alert message/icon etc.
			 * (8)				<div>
			 * (9)					elem[osl-evt__template-item]
			 * 					</div>
			 * 				</div>
			 * 			</div>
			 * 		</div>
			 * 	</div>
			 * */
			
			/* *
			 * itemCode : TPL00003
			 * 1. 단순 html 생성 (단, 구분을 위해 id=tplId+tplItemId 임시추가, 마지막에 제거) 
			 * 2. 추가 항목 html 생성 (단, 구분을 위해 id=middle+[tplId+tplItemId] 임시추가, 마지막에 제거)
			 * 3. 클래스, 필요 데이터 추가/제거
			 * */
			//큰 껍데기 생성
			var itemHtml= "";
			
			var tempDivId = itemMap["tplId"] + itemMap["tplItemId"];
			//(1)(2)(3)(4)
			itemHtml = `
				<div class="grid-stack-item osl-evt__grid-stack-item ${topOption.class}" data-temp-id="${tempDivId}" ${topOption.option}>
					<div class="grid-stack-item-content osl-evt__grid-stack-item-content" ${dbColumnOpt.option}>
						${gridStackOpt.appendBtnStr}
						<div class="osl-evt__template-handle ${gridStackOpt.defaultHandleClassNm} ${middleOpt.class} ${alarmClass}">
						</div>
					</div>
				</div>
			`;
			
			//정보자산일 땐 앞에 표출, 나머지는 뒤에 표출
			if(String(itemMap["itemCode"]) == "15" && targetConfig["tplClsType"] == "01"){
				$("#"+gridStackOpt["appendDivId"]).prepend(itemHtml);
			}else{
				$("#"+gridStackOpt["appendDivId"]).append(itemHtml);
			}
			
			//그 외 미리 만들어둔 큰 껍데기의 content영역에 midde id 추가해두기
			$("#"+gridStackOpt["appendDivId"]).find("[data-temp-id='"+tempDivId+"'] .osl-evt__template-handle").attr("data-temp-id", "middle"+tempDivId);
			
			//(9)
			//유형에 따라 서브 정보를 넣어야 하는 항목에 대하여
			var subItemHtml="";
			//유형에 따라
			if(itemMap["configType"] == "drawItem"){
				//단순 텍스트일 때
				if(String(itemMap["itemCode"]) == "01"){
					subItemHtml = `<span class="osl-evt__not-item-value">` + $.osl.lang("template.item.label.onlyTextPrintArea") + `</span>`;
				}
				//그 외
				else{
					subItemHtml = `
						<span class="" data-lang-cd="template.item.label.itemTypeNm${itemMap.itemCode}">
					`
						+ $.osl.lang("template.item.label.itemTypeNm"+itemMap["itemCode"])
					+`
						</span>
					`;
				}
			}
			//유형이 단순 항목 그리기 외일 때(drawForm, insert, update, copy, detail, sameTime)
			else{
				subItemHtml= `<span class="osl-stack-item-title osl-fs-14">${itemMap.itemNm}</span>`;
				
				//단순 텍스트일 때
				if(String(itemMap["itemCode"]) == "01"){
					subItemHtml = itemMap["itemOptionVal"];
				}
				//알림일 때
				else if(String(itemMap["itemCode"]) == "14"){
					subItemHtml = `
						<span data-lang-cd="template.item.label.itemTypeNm${itemMap.itemCode}">
					`
						+ $.osl.lang("template.item.label.itemTypeNm"+itemMap["itemCode"])
					+`
						</span>
					`;
				}
			}
			
			//(6)(7)(8)(9) 실제 아이템 생성
			itemHtml="";
			//단순 텍스트
			if(String(itemMap["itemCode"]) == "01"){
				itemHtml = `
					<div class="osl-evt__template-item osl-template-item" id="${itemMap.itemId}" name="${itemMap.itemId}">
						${subItemHtml}
					</div>
				`;
			}
			//체크박스/라디오 - 스위치 박스
			else if(String(itemMap["itemCode"]) == "08"){
				var chkItems = '';
				if(itemMap.hasOwnProperty("tplItemOptValListInfo") && itemMap["tplItemOptValListInfo"].length > 0){
					$.each(itemMap["tplItemOptValListInfo"], function(c, chkItem){
						var itemOptionId = chkItem["itemOptionId"];
						var itemOptNm = chkItem["itemNm"];
						
						if(itemMap["itemMultiSelCd"] == "01"){
							itemOptionName = itemOptionId;
						}
						
						chkItems += fnCheckItemHtmlStr(itemMap, chkItem, mainOption["modify"], keyPathOption["option"], gridStackOpt["appendDivId"]);
					});
				}
				//체크리스트가 존재하지 않으면
				else {
					//최초 그리기 - 라디오박스이므로 최소 2개 = OPTION_ADD_DEL의 default 값
					for(var c = 0; c < itemSettingOption["main"]["OPTION_ADD_DEL"]["default"]; c++) {
						var itemOptionId = itemMap["itemId"]+"_OPT"+c;
						var itemOptNm = "옵션명";
						
						var chkItem = {
								"itemOptionId" : itemOptionId,
								"itemNm" : itemOptNm,
								"optEssentialCd" : "02",
						};
						
						chkItems += fnCheckItemHtmlStr(itemMap, chkItem, mainOption["modify"], keyPathOption["option"], gridStackOpt["appendDivId"]);
					}
				}
				
				//다중선택 가능한 경우
				var multiMessageShow = "d-none";
				var multiMessage = "";
				if(itemMap["itemMultiSelCd"] == "01"){
					multiMessageShow = "";
					//최솟값
					var minVal = itemMap["itemMinVal"];
					//최댓값
					var maxVal = itemMap["itemMaxVal"];
					//최소 최대 같으면
					if(minVal == maxVal){
						//(N개를 선택해야 합니다.)
						multiMessage = $.osl.lang("template.item.message.selectOptCount", maxVal);
					}
					//같지 않으면
					else{
						//(최소 n개에서 최대 N개 선택이 가능합니다.)
						multiMessage = $.osl.lang("template.item.message.selectOptCountRange", minVal, maxVal);
					}
				}
				
				//formDataToJsonArray에서 수정이력 등을 체크하는데, 체크리스트도 공통으로 해당 elem에서 가져오게 하기위해 div에도 ${mainOption.modify} 넣음
				itemHtml = `
					<label class="osl-evt__grid-stack-item-label d-flex align-items-center  ${itemRequired}">
						<i class="${itemIcons[itemMap.itemCode]} osl-me-4"></i>
						${subItemHtml}
					</label>
					<div class="osl-evt__template-item--check-list osl-evt__template-item osl-template-item rounded border p-2" ${itemRequired} id="${itemMap.itemId}" ${mainOption.modify}>
						<div class="osl-evt__grid-stack-item-multi-message ${multiMessageShow} fs-8 text-danger text-decoration-underline text-end text-break text-truncate osl-word-break--keep-all">${multiMessage}</div>
						${chkItems}
					</div>
				`;
			}
			//서비스 항목의 사용자
			else if(String(itemMap["itemCode"]) == "09" && itemMap["tplEssentialItem"] == "01"){
				var delColumnHtml = "";
				var column1Class = "";
				var column2Class = "";
				var column3Class = "";
				//삭제 버튼 표출
				if(itemMap["configType"].indexOf("draw") == -1 && itemMap["configType"] != "detail"){
					column1Class = "w-30";
					column2Class = "w-50";
					column3Class = "w-20";
					//삭제 버튼 표출 컬럼
					delColumnHtml = `
						<div class="border bg-light-primary py-2 text-center ${column3Class}">
							<span class="osl-fs-12 text-mute" data-lang-cd="button.delete">${$.osl.lang("button.delete")}</span>
						</div>
					`;
				}
				//상세 조회일 때
				else if(itemMap["configType"] == "detail"){
					column1Class = "w-30";
					column2Class = "w-50";
					column3Class = "w-20";
					
					//삭제버튼 영역에 적용 여부 지정
					delColumnHtml = `
						<div class="border bg-light-primary py-2 text-center ${column3Class}">
							<span class="osl-fs-12 text-mute" data-lang-cd="label.apply">${$.osl.lang("label.apply")}</span>
						</div>
					`;
				}
				//마지막 컬럼 없음
				else{
					//삭제 버튼도 없고 컬럼 길이도 변경되어야 하므로
					column1Class = "w-40";
					column2Class = "w-60";
				}
				
				//가져온 연결 사용자 목록이 있는지
				if(!itemMap.hasOwnProperty("tplItemSevUsrListInfo")){
					itemMap["tplItemSevUsrListInfo"] = [];
				}
				
				//begin : 나중에 집어넣기 애매하여 여기서 추가
				var alarmInnerHtml = '';
				//알림 기능 연결된 경우
				if(!$.osl.isNull(itemMap["itemAlarmUseCd"]) && itemMap["itemAlarmUseCd"] == "01"){
					//TODO 알림 기능 연결 디자인/퍼블 이후 적용 필요 - far fa-bell text-primary 부분
					alarmInnerHtml += `
						<span class="osl-evt__alarm-setting-icon cursor-pointer osl-me-4 fs-7 position-absolute end-0 top-0" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="tooltip-inverse" data-bs-dismiss="click" title="${$.osl.lang("template.item.tooltip.alarmUsr")}" data-title-lang-cd="template.item.tooltip.alarmUsr">
							<i class="osl-icon osl-icon-notifications"></i>
						</span>
					`;
				}
				//end : 나중에 집어넣기 애매하여 여기서 추가
				
				var underBorderClass = '';
				//추가 버튼이 존재하면 경계를 위해 보더 추가
				if(sevViewBtnBoolean){
					underBorderClass = 'border-bottom';
				}
				
				itemHtml = `
					<label class="osl-evt__grid-stack-item-label d-flex align-items-center ${itemRequired}">
						<i class="${itemIcons[itemMap.itemCode]} osl-me-4"></i>
						${subItemHtml}
						<span class="ms-2 p-2 badge badge-sm badge-gray osl-evt__multi-usr-cnt">
							${itemMap["tplItemSevUsrListInfo"].length} / ${itemMap["itemSelUsrMaxVal"]}
						</span>
					</label>
					${alarmInnerHtml}
					<div class="osl-evt__template-item osl-template-item" id="${itemMap.itemId}" name="${itemMap.itemId}" ${mainOption.modify}>
						<div class="d-flex flex-row flex-nowrap">
							<div class="border bg-light-primary py-2 text-center ${column1Class}">
								<span data-lang-cd="label.usr">${$.osl.lang("label.usr")}</span>
							</div>
							<div class="border bg-light-primary py-2 text-center ${column2Class}">
								<span data-lang-cd="label.dept">${$.osl.lang("label.dept")}</span>
							</div>
							${delColumnHtml}
						</div>
						<div class="osl-evt__template-item--user-list min-h-45px ${underBorderClass} hover-scroll-overlay-y" data-kt-scroll="true">
						</div>
						${sevViewBtnHtml}
					</div>
				`;
			}
			else {
				itemHtml = `
					<label class="osl-evt__grid-stack-item-label d-flex align-items-center ${itemRequired}">
						<i class="${itemIcons[itemMap.itemCode]} osl-me-4"></i>
						${subItemHtml}
					</label>
				`;
				
				//텍스트 박스
				if(String(itemMap["itemCode"]) == "02"){
					itemHtml += `<input type="text" class="form-control osl-evt__template-item osl-template-item" id="${itemMap.itemId}" name="${itemMap.itemId}" ${mainOption.modify} ${itemRequired}/>`;
				}
				//텍스트 영역
				else if(String(itemMap["itemCode"]) == "03"){
					itemHtml += `<textarea class="form-control osl-evt__template-item osl-template-item" data-editabled="false" id="${itemMap.itemId}" name="${itemMap.itemId}" ${mainOption.modify} ${itemRequired}></textarea>`;
				}
				//날짜
				else if(String(itemMap["itemCode"]) == "04"){
					itemHtml += `<input type="text" class="form-control osl-evt__template-item osl-template-item" id="${itemMap.itemId}" name="${itemMap.itemId}" ${mainOption.modify} ${itemRequired}/>`;
				}
				//일시
				else if(String(itemMap["itemCode"]) == "05"){
					itemHtml += `<input type="text" class="form-control osl-evt__template-item osl-template-item" id="${itemMap.itemId}" name="${itemMap.itemId}" ${mainOption.modify} ${itemRequired}/>`;
				}
				//기간
				else if(String(itemMap["itemCode"]) == "06"){
					//begin : 나중에 집어넣기 애매하여 여기서 추가
					/*
					//서비스 기간인 경우 해당 타입일 경우에만 ! 서비스 사용 기간 지정을 위한 항목입니다. 라는 메시지 표출을 위해
					if(itemMap["tplEssentialItem"] == "01" && (itemMap["configType"] == "drawItem" || itemMap["configType"] == "drawForm")){
						itemHtml +=`
							<span class="cursor-pointer mx-1 position-absolute osl-start-80px top-0" name="serviceRangeAlertBtn">
								<i class="osl-icon osl-icon-sm osl-icon-info osl-me-4"></i>
							</span>
							<span class="osl-tpl-date-range-alert" name="serviceRangeAlert" data-lang-cd="template.item.message.serviceDateRange">
								${$.osl.lang("template.item.message.serviceDateRange")}
							</span>
						`;
					}
					*/
					//알림 기능이 연결되어 있는 경우
					if(!$.osl.isNull(itemMap["itemAlarmUseCd"]) && itemMap["itemAlarmUseCd"] == "01"){
						//TODO 알림 기능 연결 디자인/퍼블 이후 적용 필요 - far fa-bell text-primary 부분
						itemHtml +=`
							<span class="osl-evt__alarm-setting-icon cursor-pointer osl-me-4 fs-7 position-absolute end-0 top-0" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="tooltip-inverse" data-bs-dismiss="click" title="${$.osl.lang("template.item.tooltip.settingAlarm")}" data-title-lang-cd="template.item.tooltip.settingAlarm">
								<i class="osl-icon osl-icon-notifications"></i>
							</span>
						`;
					}
					//end : 나중에 집어넣기 애매하여 여기서 추가
					
					itemHtml +=`<input type="text" class="form-control osl-evt__template-item osl-template-item" id="${itemMap.itemId}" name="${itemMap.itemId}" ${mainOption.modify} ${itemRequired}/>`;
				}
				//숫자
				else if(String(itemMap["itemCode"]) == "07"){
					itemHtml += `<input type="number" class="form-control osl-evt__template-item osl-template-item" id="${itemMap.itemId}" name="${itemMap.itemId}" ${mainOption.modify} ${itemRequired}/>`;
				}
				//사용자
				else if(String(itemMap["itemCode"]) == "09"){
					//begin : 나중에 집어넣기 애매하여 여기서 추가
					//알림 기능 연결된 경우
					if(!$.osl.isNull(itemMap["itemAlarmUseCd"]) && itemMap["itemAlarmUseCd"] == "01"){
						//TODO 알림 기능 연결 디자인/퍼블 이후 적용 필요 - far fa-bell text-primary 부분
						itemHtml += `
							<span class="osl-evt__alarm-setting-icon cursor-pointer osl-me-4 fs-7 position-absolute end-0 top-0" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="tooltip-inverse" data-bs-dismiss="click" title="${$.osl.lang("template.item.tooltip.alarmUsr")}" data-title-lang-cd="template.item.tooltip.alarmUsr">
								<i class="osl-icon osl-icon-notifications"></i>
							</span>
						`;
					}
					//end : 나중에 집어넣기 애매하여 여기서 추가
					
					/*
						<div class="${searchBtnClass}">
							<span class-"input-group-text p-0">
								<span class="symbol symbol-45px symbol-fixed">
									<input type="text" class="osl-elem-hide osl-evt__exclude-item" id="${itemMap.itemId}UsrImgId" name="${itemMap.itemId}UsrImgId" ${mainOption.imgModify}/>
									<img type="img" class="h-45px rounded-end-0" id="${itemMap.itemId}UsrImg" src="${$.osl.user.usrImgUrlVal()}"/>
								</span>
							</span>
							<input type="text" class="form-control osl-evt__template-item osl-template-item ${infoBtnClass}" id="${itemMap.itemId}" name="${itemMap.itemId}" data-hidden-id="${itemMap.itemId}-hide" data-hidden-key="${itemMap.itemId}-hide" ${mainOption.modify}/>
							<input type="hidden" class="form-control osl-evt__template-hide-item" id="${itemMap.itemId}-hide" name="${itemMap.itemId}-hide" ${hideOption.option} ${itemRequired}/>
							${searchBtnHtml}
						</div>
					 */
					itemHtml += `
						<div class="${searchBtnClass} osl-search-type-002">
							<span class="search-img"><i class="osl-icon osl-icon-user-search"></i></span>
							<input type="text" class="form-control osl-evt__template-item osl-template-item ${infoBtnClass}" id="${itemMap.itemId}" name="${itemMap.itemId}" data-hidden-id="${itemMap.itemId}-hide" data-hidden-key="${itemMap.itemId}-hide" ${mainOption.modify}/>
							<input type="hidden" class="form-control osl-evt__template-hide-item" id="${itemMap.itemId}-hide" name="${itemMap.itemId}-hide" ${hideOption.option} ${itemRequired}/>
							${searchBtnHtml}
						</div>
					`;
				}
				//기관
				else if(String(itemMap["itemCode"]) == "10"){
					itemHtml += `
						<select data-control="select2" data-hide-search="true" class="form-select osl-evt__template-item osl-template-item" id="${itemMap.itemId}" name="${itemMap.itemId}" ${mainOption.modify} ${itemRequired}></select>
					`;
				}
				//조직
				else if(String(itemMap["itemCode"]) == "11"){
					var tempPlaceHolder = $.osl.lang("template.item.placeholder.deptNm");
					//검색 버튼이 존재하면
					if(!$.osl.isNull(searchBtnHtml.trim())){
						tempPlaeHolder= $.osl.lang("template.item.placeholder.deptNmSearch");
					}
					
					itemHtml += `
						<div class="${searchBtnClass} osl-search-type-002">
							<input type="text" class="form-control osl-evt__template-item osl-template-item" id="${itemMap.itemId}" name="${itemMap.itemId}" placeholder="${tempPlaceHolder}" data-hidden-id = "${itemMap.itemId}-hide" data-hidden-key = "deptId" ${mainOption.modify} />
							<input type="hidden" class="form-control osl-evt__template-hide-item" id="${itemMap.itemId}-hide" name="${itemMap.itemId}-hide" ${hideOption.option} ${itemRequired}/>
							${searchBtnHtml}
						</div>
					`;
				}
				//공통코드
				else if(String(itemMap["itemCode"]) == "12"){
					itemHtml += `<select data-control="select2" data-hide-search="true" class="form-select osl-evt__template-item osl-template-item" id="${itemMap.itemId}" name="${itemMap.itemId}" ${mainOption.modify} ${itemRequired}></select>`;
				}
				//첨부파일
				else if(String(itemMap["itemCode"]) == "13"){
					//begin : 나중에 집어넣기 애매하여 여기서 추가
					if(itemMap["configType"] != "detail"){
						//삭제 초기화 버튼 추가
						itemHtml += `
							<button type="button" class="btn btn-link px-2 py-1 osl-ms-4 position-absolute d-none" id="fileRemoveResetBtn_${itemMap.itemId}" style="top:0.25rem; right:1.75rem">
								<i class="osl-icon osl-icon-sm osl-icon-change"></i>
								<span data-lang-cd="button.deleteReset">
									${$.osl.lang("button.deleteReset")}
								</span>
							</button>
						`;
					}
					//end : 나중에 집어넣기 애매하여 여기서 추가
					
					//옵션에 따라 그려지는 타입이 완전히 달라져 여기서 분기로 html 생성
					if(itemMap["configType"] =="drawItem" || itemMap["configType"] =="drawForm"){
						itemHtml += `
							<div class="tpl-uppy-view osl-evt__template-item osl-template-item" id="${itemMap.itemId}" name="${itemMap.itemId}" ${mainOption.modify} ${itemRequired}>
								<div class="tpl-uppy-view-inner flex-row flex-wrap">
								</div>
							</div>
						`;
					}
					else {
						itemHtml += `
							<div class="kt-uppy h-100 osl-file-list-view osl-file-list-sm osl-evt__template-item osl-template-item" id="${itemMap.itemId}" name="${itemMap.itemId}" ${mainOption.modify} ${itemRequired}>
								<div class="kt-uppy__dashboard"></div>
								<div class="kt-uppy__progress"></div>
							</div>
						`;
					}
				}
				//알림
				else if(String(itemMap["itemCode"]) == "14"){
					//알림 설정만 여기서 추가(알림 기간 select는 나중에 추가 - 해당 영역 다음에 추가되어야 하기 때문)
					itemHtml += `
						<select data-control="select2" data-hide-search="true"class="form-select osl-evt__template-item osl-template-item" id="${itemMap.itemId}" name="${itemMap.itemId}" data-hidden-id="${itemMap.itemId}-sub" ${mainOption.subModify} ${itemRequired}></select>
					`;
					
					//알림 기간과 정렬하기 위해 div로 감싸기
					itemHtml = `<div class="form-group osl-evt__alarm-set">${itemHtml}</div>`;
				}
				//정보자산
				else if(String(itemMap["itemCode"]) == "15"){
					//상세보기이면서 다중 선택 가능한 경우 태그만 표출하기 위해
					//그 외에는 input 그린다.
					if(!(itemMap["configType"] == "detail" && itemMap["itemMultiSelCd"] == "01")){
						//상세인 경우
						var inputRoundedEndClass = "";
						if(itemMap["configType"] == "detail"){
							//상세이면서 단건 선택일 때
							//검색 버튼이 없으므로 라운드 처리를 위한 클래스 추가, 상세 클릭을 위한 클래스 추가
							inputRoundedEndClass = "rounded-end osl-evt__cfg-info-pop";
						}
						
						itemHtml += `
							<div class="${searchBtnClass}">
								<input type="text" class="form-control osl-evt__template-item osl-template-item  ${infoBtnClass} ${inputRoundedEndClass}" id="${itemMap.itemId}" name="${itemMap.itemId}" placeholder="${$.osl.lang("template.item.placeholder.cimRuteNm")}" data-hidden-id = "${itemMap.itemId}-hide" data-hidden-key = "cfgId" ${mainOption.modify} />
								<input type="hidden" class="form-control osl-evt__template-hide-item" id="${itemMap.itemId}-hide" name="${itemMap.itemId}-hide" ${hideOption.option} ${itemRequired}/>
								${searchBtnHtml}
							</div>
						`;
					}
					
					var cimTagAreaMsg = "";
					 
					if(itemMap["configType"].indexOf("draw") > -1){
						cimTagAreaMsg = '<span class="osl-evt__tag-label" data-lang-cd="template.item.message.showSelCfg">'+$.osl.lang("template.item.message.showSelCfg")+'</span>';
					}
					
					var viewTagDivClass = "";
					//다중 선택이 아니면 숨기기 위해
					if(itemMap["itemMultiSelCd"] == "02"){
						viewTagDivClass = "d-none";
					}
					//다중 선택일 때 그릴 태그 div
					//정보자산에서 호출한 정보자산 항목이 아닌 경우 선택 다건 태그 표출을 위한 div
					itemHtml += `
						<div class="osl-evt__tag-form osl-cim-tag-form osl-cim-tag-form-${targetConfig.type} ${viewTagDivClass} scroll-y" data-kt-scroll="true" id="${itemMap.itemId}_cimTagDiv" ${itemMap.itemViewOrd}>
							${cimTagAreaMsg}
						</div>
					`;
				}
				//디바이스 - jamf 연동
				else if(String(itemMap["itemCode"]) == "16"){
					itemHtml += `
						<div class="${searchBtnClass}">
							<input type="text" class="form-control osl-evt__template-item osl-template-item ${infoBtnClass}" id="${itemMap.itemId}" name="${itemMap.itemId}" ${mainOption.modify}/>
							${searchBtnHtml}
						</div>
					`;
				}
			}
			
			//(5) 감싸기 위해
			//px-2 => osl-px-6
			//단순 텍스트 표출이면
			if(String(itemMap["itemCode"]) == "01"){
				itemHtml = '<div class="mb-4 osl-px-6">' + itemHtml + '</div>';
			}
			//알림이면
			else if(String(itemMap["itemCode"]) == "14"){
				//내부 item 별 form-group을 지어야 하고 여기서는 상단만 감싸므로
				itemHtml = '<div>' + itemHtml + '</div>';
			}
			//첨부파일이면
			else if(String(itemMap["itemCode"]) == "13"){
				itemHtml = '<div class="form-group osl-px-6 h-100">' + itemHtml + '</div>';
			}
			//그 외
			else{
				itemHtml = '<div class="form-group osl-px-6">' + itemHtml + '</div>';
			}
			
			//미리 만들어둔 콘텐츠 영역에 넣기
			$("#"+gridStackOpt["appendDivId"]).find("[data-temp-id='middle"+tempDivId+"']").append(itemHtml);
			
			//(9) 추가 항목 넣기
			itemHtml = "";
			//알림
			if(String(itemMap["itemCode"]) == "14"){
				var tempItemCode = String(itemMap["itemCode"])+"Sub";
				itemHtml = `
					<div class="form-group osl-evt__alarm-range">
						<label class="">
							<i class="${itemIcons[tempItemCode]} osl-me-4"></i>
							<span data-lang-cd="template.item.label.itemTypeNm${tempItemCode}">
					`
						+ $.osl.lang("template.item.label.itemTypeNm"+tempItemCode)
					+`
							</span>
						</label>
						<select data-control="select2" data-hide-search="true" class="form-select osl-evt__template-item osl-template-item osl-evt__template-sub-item osl-evt__exclude-item" id="${itemMap.itemId}-sub" name="${itemMap.itemId}-sub" ${mainOption.subModify}></select>
					</div>
				`;
			}
			
			//미리 만들어둔 콘텐츠 영역에 추가
			$("#"+gridStackOpt["appendDivId"]).find("[data-temp-id='middle"+tempDivId+"']").append(itemHtml);
			
			//osl-evt__template-item에 클래스, 옵션 추가
			$("#"+gridStackOpt["appendDivId"] +" [data-temp-id='middle"+tempDivId+"'] .osl-evt__template-item:not(.osl-evt__template-sub-item, .osl-evt__template-item--check-list)").addClass(mainOption["class"]).attr(mainOption["option"]);
			
			//osl-evt__template-sub-item에 옵션 추가
			$("#"+gridStackOpt["appendDivId"] +" [data-temp-id='middle"+tempDivId+"'] .osl-evt__template-sub-item").addClass(mainOption["class"]).attr(mainOption["option"]);
			
			//osl-evt__template-item--check-item > osl-evt__template-item--check-item에 옵션 추가
			//$("#"+gridStackOpt["appendDivId"] +" [data-temp-id='middle"+tempDivId+"'] .osl-evt__template-item--check-list .osl-evt__template-item--check-item").addClass(mainOption["class"]).attr(mainOption["option"]);
			$("#"+gridStackOpt["appendDivId"] +" [data-temp-id='middle"+tempDivId+"'] .osl-evt__template-item--check-list .osl-evt__template-item--check-item").addClass(optOption["class"]).attr(optOption["option"]);
			
			//알림과 연결된 항목인 경우
			if(["06","09", "10"].indexOf(String(itemMap["itemCode"])) > -1 && itemMap["itemAlarmUseCd"] == "01"){
				//라벨 아이콘에 클래스 및 data option 추가
				var labelIcon = $("#"+gridStackOpt["appendDivId"]).find("[data-temp-id='middle"+tempDivId+"']").closest(".osl-evt__grid-stack-item").find(".osl-evt__grid-stack-item-label > i");
				/*
				labelIcon.addClass("text-primary"); //TODO 알림과 연결된 기간/사용자인지 구분이 현재 안감. 디자이너/퍼블리셔와 얘기하여 수정 필요
				fnSetOptValue(labelIcon, "data-bs-toggle", "tooltip");
				fnSetOptValue(labelIcon, "data-bs-placement", "top");
				fnSetOptValue(labelIcon, "data-bs-custom-class", "tooltip-inverse");
				fnSetOptValue(labelIcon, "data-bs-dismiss", "click");
				*/
				//기간
				if(String(itemMap["itemCode"]) == "06"){
					fnSetOptValue(labelIcon, "title", $.osl.lang("template.item.tooltip.settingAlarm"));
					fnSetOptValue(labelIcon, "data-title-lang-cd", "template.item.tooltip.settingAlarm");
				}
				//사용자
				else if(String(itemMap["itemCode"]) == "09"){
					fnSetOptValue(labelIcon, "title", $.osl.lang("template.item.tooltip.alarmUsr"));
					fnSetOptValue(labelIcon, "data-title-lang-cd", "template.item.tooltip.alarmUsr");
				}
				//기관 내/외
				else if(String(itemMap["itemCode"]) == "10"){
					fnSetOptValue(labelIcon, "title", $.osl.lang("template.item.tooltip.alarmUsrInOut"));
					fnSetOptValue(labelIcon, "data-title-lang-cd", "template.item.tooltip.alarmUsrInOut");
				}
				//아이콘에 데이터 옵션 추가 
				fnSetOptValue(labelIcon, "data-alarm-use-elem", "true");
			}
			
			//단순 항목을 그리는 경우, 그리드 스택에 추가되는 것이 아니므로
			if(itemMap["configType"] == "drawItem"){
				//플러그인 적용을 여기서 진행
				//param selector는 그리드 스택 영역이어야 하는데, 여기서는 drawItem이 그려지는 영역
				fnTemplateEventSetting("#"+gridStackOpt["appendDivId"], targetConfig).fnSetPlugin($("#"+gridStackOpt["appendDivId"]).find("[data-temp-id='middle"+tempDivId+"'] .osl-evt__template-item"));
			}
			
			//temp 관련 제거
			$.each($("#"+gridStackOpt["appendDivId"]).find("[data-temp-id]"), function (num, elem){
				$(elem).removeAttr("data-temp-id");
			});
		});
		//그리기 종료
		
		//항목을 그린 후 사용자 지정 콜백이 있으면
		if(targetConfig.hasOwnProperty("callback") && targetConfig["callback"].hasOwnProperty("afterHtmlDraw") && typeof targetConfig["callback"]["afterHtmlDraw"] == "function"){
			targetConfig["callback"]["afterHtmlDraw"]();
		}
		
		//그리드 스택 찾기
		if(!$.osl.isNull(gridStackOptDefault["addDivId"])){
			if($("#"+gridStackOptDefault["addDivId"]).closest(".grid-stack").length > 0){
				if(!$.osl.isNull(addGridStackObj)){
					//그리드 스택 추가 영역에 항목 addWidget
					$.each($("#"+gridStackOptDefault["addDivId"]).find(".osl-evt__grid-stack-item-content"), function (num, item){
						var itemInfo = fnGetItemValues($(item), false);
						
						if(addGridItems.length > 0){
							//존재하면 건너뛰기
							if($(addGridItems).find("#"+itemInfo["itemId"]).length > 0){
								return;
							}
						}
						
						var itemData = {
								x: parseInt(itemInfo["itemXpoint"]),
								y: parseInt(itemInfo["itemYpoint"]),
								w: parseInt(itemInfo["itemWidth"]),
								h: parseInt(itemInfo["itemHeight"]),
								id : itemInfo["itemId"],
								//content : $(item).html(),
						};
						
						//osl-evt__grid-stack-item
						addGridStackObj.addWidget($(item).parent()[0], itemData);
					});
				}else{
					console.log("not find gridStackObj. Plz checking grid-stack id");
				}
			}
			
			//해당 영역에 그려진 항목이 없으면
			if($("#"+gridStackOptDefault["addDivId"]).find(".osl-evt__grid-stack-item").length == 0){
				//데이터 없음 표출
				$("#"+gridStackOptDefault["addDivId"]).html('<div class="text-center osl-evt__template-no-items my-5">'+targetConfig["noData"]+'</div>');
			}else{
				$("#"+gridStackOptDefault["addDivId"]).find('.osl-evt__template-no-items').remove();
			}
		}
		if(!$.osl.isNull(gridStackOptDefault["removeDivId"])){
			if($("#"+gridStackOptDefault["removeDivId"]).closest(".grid-stack").length > 0){
				if(!$.osl.isNull(removeGridStackObj)){
					//그리드 스택 추가 영역에 항목 addWidget
					$.each($("#"+gridStackOptDefault["removeDivId"]).find(".osl-evt__grid-stack-item-content"), function (num, item){
						var itemInfo = fnGetItemValues($(item), true);
						
						//존재하면 건너뛰기
						if($(removeGridItems).find("#"+itemInfo["itemId"]).length > 0){
							return;
						}
						
						var itemData = {
								x: parseInt(itemInfo["itemXpoint"]),
								y: parseInt(itemInfo["itemYpoint"]),
								w: parseInt(itemInfo["itemWidth"]),
								h: parseInt(itemInfo["itemHeight"]),
								id : itemInfo["itemId"],
								//content : $(item).html()
						};
						
						//osl-evt__grid-stack-item
						removeGridStackObj.addWidget($(item).parent()[0], itemData);
					});
				}else{
					console.log("not find gridStackObj. Plz checking grid-stack id");
				}
			}
			//해당 영역에 그려진 항목이 없으면
			if($("#"+gridStackOptDefault["removeDivId"]).find(".osl-evt__grid-stack-item").length == 0){
				//데이터 없음 표출
				$("#"+gridStackOptDefault["removeDivId"]).html('<div class="text-center osl-evt__template-no-items my-5">'+targetConfig["noData"]+'</div>');
			}
			else{
				$("#"+gridStackOptDefault["removeDivId"]).find('.osl-evt__template-no-items').remove();
			}
		}

		// 후처리 호출
		fnCreatItemAfter(usrConfig);
		/*
		// 이벤트 적용
		if(!$.osl.isNull(gridStackOpt["addDivId"])){
			fnTemplateEventSetting("#"+gridStackOpt["addDivId"], targetConfig).afterCreateHtml("#"+gridStackOpt["addDivId"], targetConfig);
		}
		if(!$.osl.isNull(gridStackOpt["removeDivId"])){
			fnTemplateEventSetting("#"+gridStackOpt["removeDivId"], targetConfig).afterCreateHtml("#"+gridStackOpt["removeDivId"], targetConfig);
		}
		*/
		// 후처리까지 모두 한 후(이벤트도 적용된 후여야지 첨부파일 등 넣을 때 객체 생성된 이후 값을 넣는다.)
		//사용자 지정 콜백이 있으면
		if(targetConfig.hasOwnProperty("callback") && targetConfig["callback"].hasOwnProperty("afterLastHtmlDraw") && typeof targetConfig["callback"]["afterLastHtmlDraw"] == "function"){
			targetConfig["callback"]["afterLastHtmlDraw"](datas, usrConfig);
		}
	};
	
	//Fn04-1. fnCheckItemHtml 항목 그리기
	/* *
	 * function 명 : fnCheckItemHtml
	 * function 설명 : 전달 받은 값을 바탕으로 체크리스트의 옵션 html 그린다.
	 * param chkListElem - 체크 리스트 목록이 그려지는 영역 객체
	 * 
	 * 주의 : fnItemHtml과 앞 로직 참고, 체크리스트 그리드스택 아이템이 그려져있다는 가정하에 호출 필요
	 * */
	const fnCheckItemHtml = function(chkListElem){
		//osl-evt__template-item--check-list에서 id와 각종 option을 모두 복제
		var itemMap = fnGetItemValues(chkListElem, true);
		
		//체크 항목이 아니면 중지
		//TPL00003 08
		if(String(itemMap["itemCode"]) != "08"){
			return;
		}
		
		//타입
		var type = "radio";
		if(itemMap["itemMultiSelCd"] == "01"){
			type = "checkbox";
		}
		
		//체크리스트 옵션이므로, 해당 아이템에서 갯수 확인하여 지정
		var chkListLength = $(chkListElem).find(".osl-evt__template-item--check-item").length;
		
		//단건 반환
		//그리기 시작 - 옵션이 없어서 그리는 것이므로
		let current = new Date().format("ssms");
		let elemId = itemMap["tplId"] + '-' + current;
		let itemOptionId = "";
		let itemOptionName = "";
		let optEssentialCd = "02";
		if(itemMap.hasOwnProperty("optEssentialCd") && !$.osl.isNull(itemMap["optEssentialCd"])){
			optEssentialCd = itemMap["optEssentialCd"];
		}
		
		//체크박스 id : tpl1100.jsp 참고
		if(itemMap["configType"] == "sameTime"){
			itemOptionId = "newOptItem" + current + chkListLength;
		}else {
			itemOptionId = elemId + "_OPT" + chkListLength;
		}
		//체크박스 name - 라디오면 모든 옵션 네임 동일
		if(type == "radio"){
			//기본 이름
			itemOptionName = elemId;
			//기존에 존재하는 객체가 있으면 동일하게 적용
			if(chkListLength > 0){
				itemOptionName = $($(chkListElem).find(".osl-evt__template-item--check-item")[0]).attr("name");
			}
		}
		//체크박스이면 - 옵션 네임 아이디와 동일
		else{
			itemOptionName = itemOptionId;
		}
		
		//체크리스트 옵션 명
		let itemOptNm = "";
		if(itemMap.hasOwnProperty("tplItemOptValListInfo")){
			//동일 순번에 있는 값으로 확인
			var itemOptInfo = itemMap["tplItemOptValListInfo"][itemMap["itemViewOrd"]+chkListLength];
			if(!$.osl.isNull(itemOptInfo)){
				itemOptNm = itemOptInfo["itemNm"];
			}
			//없으면 신규 생성
			else {
				itemOptNm = "옵션명" ;
			}
		}
		
		//1. item에 들어갈 옵션 생성
		let itemOption = {};
		$.each(Object.keys(confCheckOpt["nomal"]), function(k, key){
			//값이 존재하면
			if(itemMap.hasOwnProperty(key) && !$.osl.isNull(itemMap[key])){
				itemOption[key] = `${confCheckOpt["nomal"][key]}="${itemMap[key]}"`;
				
				//itemOptionVal escapeHtml 처리 --해당 부분이 option으로 들어가게 되므로
				if(key == "itemOptionVal"){
					itemOption[key] = `${confCheckOpt["nomal"][key]}="${String($.osl.escapeHtml(itemMap[key])).trim()}"`;
				}
			}
		});
		$.each(Object.keys(confCheckOpt["data"]), function(k, key){
			//값이 존재하면
			if(itemMap.hasOwnProperty(key) && !$.osl.isNull(itemMap[key])){
				itemOption[key] = `data-${confCheckOpt["data"][key]}="${itemMap[key]}"`;
				
				//itemOptionVal escapeHtml 처리 --해당 부분이 option으로 들어가게 되므로
				if(key == "itemOptionVal"){
					itemOption[key] = `data-${confCheckOpt["data"][key]}="${String($.osl.escapeHtml(itemMap[key])).trim()}"`;
				}
			}
		});
		$.each(Object.keys(confCheckOpt["grid"]), function(k, key){
			//값이 존재하면
			if(itemMap.hasOwnProperty(key) && !$.osl.isNull(itemMap[key])){
				itemOption[key] = `${confCheckOpt["grid"][key]}="${itemMap[key]}"`;
				
				//itemOptionVal escapeHtml 처리 --해당 부분이 option으로 들어가게 되므로
				if(key == "itemOptionVal"){
					itemOption[key] = `${confCheckOpt["grid"][key]}="${String($.osl.escapeHtml(itemMap[key])).trim()}"`;
				}
			}
		});
		
		//체크리스트 옵션
		let mainOption = {
			class : "",
			option : {}, //마지막에 attr로 한번에 추가하기 위해 json 폼으로 지정
			modify : modifyLogOptsStr[itemMap["tplClsType"]]["08"],
		};
		
		//이상징후 매칭 key osl-evt__grid-stack-keypath-icon
		let keyPathOption = {
				option : ""
		};
		
		//mainOption - class : osl-evt__template-item 선상에 "추가" > 해당 로직에서는 osl-evt__template-item--check-item 선상에 "추가"
		//단순 구성 항목 그리기, 폼 그리기, /*폼 입력 수정일 때 해당 항목이 수정 불가일 때*/, 상세보기일 때
		if(itemMap["configType"] == "drawItem" || itemMap["configType"] == "drawForm" /*&|| (itemMap["configType"] =="update" & itemMap["itemModifyCd"] == "02")*/ || itemMap["configType"] == "detail"){
			mainOption["option"]["disabled"] = true;
			/*
			//폼 입력 수정일 때 수정 가능한 항목이 아니면
			//옵션은 리스트에 통채로 지정되므로
			if(itemMap["configType"] =="update" && itemMap["itemModifyCd"] == "02"){
				mainOption["class"] += " template-item-readonly";
			}
			*/
		}
		
		//mainOption - option 생성
		$.each(confCheckOptPosition["main"], function (n, key){
			if(!$.osl.isNull(itemOption[key])){
				var optionKey = "";
				if(confCheckOpt["nomal"].hasOwnProperty(key)){
					optionKey = confCheckOpt["nomal"][key];
				}else if(confCheckOpt["data"].hasOwnProperty(key)){
					optionKey = "data-"+confCheckOpt["data"][key];
				}else if(confCheckOpt["grid"].hasOwnProperty(key)){
					optionKey = confCheckOpt["grid"][key];
				}else{
					optionKey = key;
				}
				
				mainOption["option"][optionKey] = itemMap[key];
			}
		});
		
		//keyPathOption
		$.each(confCheckOptPosition["keyBtn"], function (n, key){
			if(!$.osl.isNull(itemOption[key])){
				keyPathOption["option"] += " " + itemOption[key];
			}
		});
		
		//옵션 html
		var chkItem = {
				"itemOptionId" : itemOptionId,
				"itemNm" : itemOptNm,
				"optEssentialCd" : optEssentialCd,
		};
		
		//체크리스트 영역이 존재하는 그리드스택 아이디 찾기
		var gridStackId = '';
		if(chkListElem.closest(".grid-stack").length > 0){
			gridStackId = chkListElem.closest(".grid-stack")[0].id;
		}
		
		var optionHtml = fnCheckItemHtmlStr(itemMap, chkItem, mainOption["modify"], keyPathOption["option"], gridStackId);
		
		//객체로 변환
		var optElem = $(optionHtml);
		//신규 객체에 osl-evt__template-item--check-item에 옵션 추가
		optElem.find(".osl-evt__template-item--check-item").addClass(mainOption["class"]).attr(mainOption["option"]);
		
		//리스트에 추가
		$(chkListElem).append(optElem);
	};
	
	//Fn04-2. fnCheckItemHtmlStr 항목 그리기 위한 html 반환
	/* *
	 * function 명 : fnCheckItemHtmlStr
	 * function 설명 : 전달 받은 값을 바탕으로 체크리스트의 옵션 html 그린다.
	 * param elemType, itemOptionId, itemOptionName, itemOptNm, optEssentialCd, modifyOption, keyPathOption, gridStackId
	 * */
	const fnCheckItemHtmlStr = function(itemMap, chkItem, modifyOption, keyPathOption, gridStackId) {
		//이상징후 매칭 key path를 위한 버튼 html
		var keyPathBtn = '';
		
		var keyPathBtnShow = false;
		var keyPathBtnEvt = false;
		
		//호출 그리드 스택 찾기
		var gridStack = $.osl.templateForm.gridStack.list[gridStackId];
		if(!$.osl.isNull(gridStack)){
			keyPathBtnShow = gridStack["showLinkKeyBtn"];
			if($.osl.isNull(keyPathBtnShow)){
				keyPathBtnShow = false;
			}
			keyPathBtnEvt = gridStack["linkKeyEvt"];
			if($.osl.isNull(keyPathBtnEvt)){
				keyPathBtnEvt = false;
			}
		}
		
		//1. item에 들어갈 옵션 생성
		let itemOption = {};
		$.each(Object.keys(confCheckOpt["nomal"]), function(k, key){
			//값이 존재하면
			if(chkItem.hasOwnProperty(key) && !$.osl.isNull(chkItem[key])){
				itemOption[key] = `${confCheckOpt["nomal"][key]}="${chkItem[key]}"`;
				
				//itemOptionVal escapeHtml 처리 --해당 부분이 option으로 들어가게 되므로
				if(key == "itemOptionVal"){
					itemOption[key] = `${confCheckOpt["nomal"][key]}="${$.osl.escapeHtml(chkItem[key]).trim()}"`;
				}
			}
		});
		$.each(Object.keys(confCheckOpt["data"]), function(k, key){
			//값이 존재하면
			if(chkItem.hasOwnProperty(key) && !$.osl.isNull(chkItem[key])){
				itemOption[key] = `data-${confCheckOpt["data"][key]}="${chkItem[key]}"`;
				
				//itemOptionVal escapeHtml 처리 --해당 부분이 option으로 들어가게 되므로
				if(key == "itemOptionVal"){
					itemOption[key] = `data-${confCheckOpt["data"][key]}="${$.osl.escapeHtml(chkItem[key]).trim()}"`;
				}
			}
		});
		$.each(Object.keys(confCheckOpt["grid"]), function(k, key){
			//값이 존재하면
			if(chkItem.hasOwnProperty(key) && !$.osl.isNull(chkItem[key])){
				itemOption[key] = `${confCheckOpt["grid"][key]}="${chkItem[key]}"`;
				
				//itemOptionVal escapeHtml 처리 --해당 부분이 option으로 들어가게 되므로
				if(key == "itemOptionVal"){
					itemOption[key] = `${confCheckOpt["grid"][key]}="${$.osl.escapeHtml(chkItem[key]).trim()}"`;
				}
			}
		});
		
		//이상징후 매칭 key osl-evt__grid-stack-keypath-icon
		keyPathOption = {
				option : ""
		};
		
		//keyPathOption
		$.each(confCheckOptPosition["keyBtn"], function (n, key){
			if(!$.osl.isNull(itemOption[key])){
				keyPathOption["option"] += " " + itemOption[key];
			}
		});
		
		//이상징후 매칭 key path를 위한 버튼 html
		keyPathBtn = fnLogKeyMappingHtmlStr(keyPathBtnShow, keyPathBtnEvt, '', keyPathOption["option"], chkItem["keyPath"], chkItem["itemOptionId"]);
		
		var elemType = "radio";
		var itemOptionId = chkItem["itemOptionId"];
		var itemOptionName = itemMap["itemId"];
		var itemOptNm = chkItem["itemNm"];
		var optEssentialCd = chkItem["optEssentialCd"];
		var optRequiredClass = "";
		
		if(optEssentialCd == "01" && itemMap["configType"] != "detail"){
			optRequiredClass = "required";
		}
		else{
			//강제
			optEssentialCd = "02";
		}
		
		if(itemMap.hasOwnProperty("itemMultiSelCd") && itemMap["itemMultiSelCd"]== "01"){
			elemType = "checkbox";
			itemOptionName = itemOptionId;
		}
		
		return `
			${keyPathBtn}
			<div class="form-check form-check-custom form-check-success form-check-solid py-2">
				<input type="${elemType}" class="form-check-input osl-evt__template-item--check-item" id="${itemOptionId}" name="${itemOptionName}" data-item-opt-required="${optEssentialCd}" ${optRequiredClass} ${modifyOption}/>
				<label class="form-check-label osl-evt__grid-stack-item--opt-label ${optRequiredClass}" for="${itemOptionId}">
					${itemOptNm}
				</label>
			</div>
		`;
	};
	
	//Fn04-3. fnLogKeyMappingHtmlStr 키 맵핑을 위한 html 반환
	/* *
	 * function 명 : fnLogKeyMappingHtmlStr
	 * function 설명 : 키 맵핑을 위한 html 반환
	 * param showLinkKeyBtn, linkKeyEvt, keyPathAddClass, keyPathOption, keyPath, chkItemOptionId
	 * */
	const fnLogKeyMappingHtmlStr = function(showLinkKeyBtn, linkKeyEvt, keyPathAddClass, keyPathOption, keyPath, chkItemOptionId) {
		if($.osl.isNull(showLinkKeyBtn)){
			showLinkKeyBtn = false;
		}
		if($.osl.isNull(linkKeyEvt)){
			linkKeyEvt = false;
		}
		if($.osl.isNull(keyPathAddClass)){
			keyPathAddClass = '';
		}
		if($.osl.isNull(keyPath)){
			keyPath = '';
		}
		var icon = "fas fa-key";
		var chkOptionData = "";
		if(!$.osl.isNull(chkItemOptionId)){
			chkOptionData = `data-item-option-id="${chkItemOptionId}"`;
			icon = "fas fa-filter";
		}
		
		var cursorPointerClass = "";
		//키 맵핑 영역 표출일 때
		if(showLinkKeyBtn){
			//키 맵핑을 위한 이벤트 지정일 때
			if(linkKeyEvt){
				cursorPointerClass = "cursor-pointer";
			}
		}
		//영역 표출 아닐 때 숨기기
		else {
			keyPathAddClass += " d-none";
		}
		
		return `
			<div class="osl-evt__grid-stack-keypath-icon grid-stack-keypath-icon ${keyPathAddClass} ${cursorPointerClass}" ${keyPathOption} ${chkOptionData}>
				<i class="${icon} osl-me-4"></i>
				<span class="osl-evt__key-path-text text-break text-truncate osl-word-break--keep-all" data-bs-toggle="tooltip" data-bs-custom-class="tooltip-inverse" data-bs-placement="top" data-bs-dismiss="click" title="${$.osl.escapeHtml(keyPath)}">
					${$.osl.escapeHtml(keyPath)}
				</span>
			</div>
		`;
	};
	
	//Fn04-4. fnServiceUsrListItemHtmlStr 항목 그리기 위한 html 반환
	/* *
	 * function 명 : fnServiceUsrListItemHtmlStr
	 * function 설명 : 전달 받은 값을 바탕으로 서비스 항목 사용자의 목록 row html 그린다.
	 * */
	const fnServiceUsrListItemHtmlStr = function(configType, usrMap) {
		var rowHtml = "";
		
		var delBtnHtml = "";
		var column1Class = "";
		var column2Class = "";
		var column3Class = "";
		//삭제 버튼 표출
		if(configType.indexOf("draw") == -1 && configType != "detail"){
			column1Class = "w-30";
			column2Class = "w-50";
			column3Class = "w-20";
			
			delBtnHtml = `<div class="border p-2 text-center align-content-center ${column3Class} osl-evt__template-item--user-list--column3">
							<div class="btn btn-sm btn-outline btn-point1 w-50 osl-evt__template-item-usr-service-button--del">
								<i class="fa fa-trash-alt osl-me-4"></i>
								<span data-lang-cd="button.delete">${$.osl.lang("button.delete")}</span>
							<div>
						</div>`;
						
			//값이 없으면 -- 단, 등록, 수정, 복사인 경우에만
			if($.osl.isNull(usrMap) || !usrMap.hasOwnProperty("usrId")){
				//단, 최근 교육 이수한 경우에만
				if($.osl.user.userInfo.currEduFinCd == "01"){
					//로그인 사용자 정보 넣어두기
					usrMap = $.osl.user.userInfo;
				}
			}
		}
		//상세 조회일 때
		else if(configType == "detail"){
			column1Class = "w-30";
			column2Class = "w-50";
			column3Class = "w-20";
			
			//삭제버튼 영역에 적용 여부 지정(REQ00020)
			//성공
			if(usrMap["applyCd"] == "03"){
				delBtnHtml = `<div class="border p-2 text-center align-content-center ${column3Class} osl-evt__template-item--user-list--column3">
							<div class="">
								<i class="osl-icon osl-icon-check"></i>
							<div>
						</div>`;
			}
			//실패
			else if(usrMap["applyCd"] == "04"){
				delBtnHtml = `<div class="border p-2 text-center align-content-center ${column3Class} osl-evt__template-item--user-list--column3">
							<div class="">
								<i class="osl-icon osl-icon-reject"></i>
							<div>
						</div>`;
			}
			//그 외
			else {
				delBtnHtml = `<div class="border p-2 text-center align-content-center ${column3Class} osl-evt__template-item--user-list--column3">
							<div class="">
								-
							<div>
						</div>`;
			}
			
		}
		//마지막 컬럼 없음
		else{
			//삭제 버튼도 없고 컬럼 길이도 변경되어야 하므로
			column1Class = "w-40";
			column2Class = "w-60";
		}
		
		//로그인 사용자가 최근 교육 이수를 하지 않으면 데이터가 없음.
		if($.osl.isNull(usrMap)){
			return '';
		}
		
		//보안 리스크가 존재하는 사용자인 경우(부서이동 확인 불가, 사직원 여부만 체크)
		var usrRiskIcon = '';
		if(!$.osl.isNull(usrMap.retireYn) && usrMap.retireYn == "Y"){
			var paramRisk = {
				paramType : "user",
				chgDeptYn : "N",
				retireYn : usrMap.retireYn,
			};
			usrRiskIcon = $.osl.getUsrRiskLabel(paramRisk);
		}
		//없으면 간격 맞추기 위해
		if($.osl.isNull(usrRiskIcon)){
			usrRiskIcon = `<span class="mx-1">
							<i class="osl-icon osl-sm"></i>
						</span>`;
		}
		
		return `
				<div class="d-flex flex-row flex-nowrap osl-evt__template-item--user-list--row">
					<div class="border p-2 d-flex align-content-center ${column1Class} osl-evt__template-item--user-list--column1">
						${usrRiskIcon}
						<span>${usrMap.usrNm}</span>
					</div>
					<div class="border p-2 d-flex align-content-center ${column2Class} osl-evt__template-item--user-list--column2">
						<span>${usrMap.deptName}</span>
					</div>
					${delBtnHtml}
				</div>
		`;
	};
	
	//Fn05. fnSetItemValues 항목 값 가져와(또는 전달 받아) 값 넣기
	/* *
	* function 명 : fnSetItemValues
	* function 설명 : 항목 값 가져와(또는 전달 받아) 값 넣기
	* param datas : 항목 값 리스트
	* datas = {
	* 	tplFormListInfo : [], //양식 정보
	* 	tplItemValListInfo : [], //값
	* 		ㄴ 양식 정보 및 값 안에 체크리스트가 있으면 List tplItemOptValListInfo 존재
	* 		ㄴ tplItemSevUsrListInfo : [], //서비스 항목 사용자 목록 값 - 목록도 값처럼 넣어 양식 정보, 양식 값 리스트에 넣어져서 들어옴
	* 	tplItemValUnderListInfo : [], //태그
	* 	fileListCnt*tplItemId* : 0, //첨부파일 시리얼 넘버
	* 	fileList*tplItemId* : [], //첨부파일 리스트
	* };
	* param usrConfig
	* */
	const fnSetItemValues = function(datas, usrConfig){
		let targetConfig = fnExtendConfig(usrConfig);
		let gridStackOpt = targetConfig["gridStack"];
		
		//전달 받은 양식 폼 구성 데이터가 json 이 아니고 배열이면
		if(Array.isArray(datas)){
			//json으로 변경(입력 정보대로 그리는 것으로 간주한다)
			datas = {
					//입력 정보
					"tplItemValListInfo" : datas
			};
		}
		
		//값 없으면
		if($.osl.isNull(datas["tplItemValListInfo"])) {
			//항목이 그려진 영역 타겟
			if(!$.osl.isNull(targetConfig.gridStack.addDivId)){
				//데이터 없음 표출
				//$("#"+gridStackOpt["addDivId"]).html('<div class="text-center osl-evt__template-no-items my-5">'+targetConfig["noData"]+'</div>');
			}
		}
		//값 있으면
		else {
			//값 넣기(메인)
			$.each(datas.tplItemValListInfo, function(idx, map){
				var itemVal = map["itemVal"];
				
				//항목아이디
				var tplItemId = map["tplItemId"];
				if(!$.osl.isNull(gridStackOpt["subId"])){
					tplItemId = tplItemId + gridStackOpt["subId"];
				}
				
				var itemCode = String(map["itemCode"]);
				
				//단순 표출이면 html로 표출
				if(itemCode == "01"){
					//단순 표출인 경우 사용자 입력 값 itemVal이 없지만, db에서 가져올 때 itemOptionVal을 itemVal로 넣어서 가져온다
					$("#"+gridStackOpt["addDivId"]+" #"+tplItemId).html(itemVal);
				}
				//텍스트 영역이면 clob으로 표출
				else if(itemCode == "03"){
					$("#"+gridStackOpt["addDivId"]+" #"+tplItemId).val(itemVal);
					//summernote 적용
					if(!$.osl.isNull($("#"+gridStackOpt["addDivId"]+" #"+tplItemId).summernote())){
						$("#"+gridStackOpt["addDivId"]+" #"+tplItemId).summernote("code", itemVal);
					}
					//해당 textarea 숨기기
					$("#"+gridStackOpt["addDivId"]+" #"+tplItemId).addClass("osl-elem-hide");
				}
				//날짜, 일시, 기간인 경우
				else if(itemCode == "04"|| itemCode == "05" || itemCode == "06"){
					//수정, 복사, 상세에서만 DB 조회 값으로 넣는다.
					if(targetConfig["type"] == "update" || targetConfig["type"] == "copy" || targetConfig["type"] == "detail"){
						$("#"+gridStackOpt["addDivId"]+" #"+tplItemId).val(itemVal);
					}
					//나머지는 전달 받은 값이 있을 때 넣는다.
					//(default 오늘 날짜로 지정되어있기 때문)
					else if(!$.osl.isNull(itemVal)){
						$("#"+gridStackOpt["addDivId"]+" #"+tplItemId).val(itemVal);
					}
					//(default 오늘 날짜로 지정되어있기 때문)
					else {
						//기간이면 최대 기간 맞춰서 넣기
						if(itemCode == "06"){
							//미리 보기를 위해 값 넣어두기
							//현재 선택된 최대 기간 값 가져오기
							//TPL00004 01 최대 1주일, 02 최대 2주일, 03 최대 1개월, 04 최대 3개월, 05 최대 6개월, 06 최대 1년
							//만약, 최대 기간 공통코드(TPL00004)가 변경될 경우, 이 부분도 수정되어야 한다.
							var subCode = fnGetItemValues($("#"+gridStackOpt["addDivId"]+" #"+tplItemId), true)["subMstCd"];
							var previewDate;
							var previewDateStr;
							
							//1주
							if(subCode == "01"){
								previewDate = new Date().getTime() + ( 7 * 24 * 60 * 60 * 1000);
								previewDateStr = new Date(previewDate).format("yyyy-MM-dd");
							}
							//2주
							else if(subCode == "02"){
								previewDate = new Date().getTime() + ( 2 * 7 * 24 * 60 * 60 * 1000);
								previewDateStr = new Date(previewDate).format("yyyy-MM-dd");
							}
							//1개월
							else if(subCode == "03"){
								previewDate = new Date().setMonth(new Date().getMonth()+1);
								previewDateStr = new Date(previewDate).format("yyyy-MM-dd");
							}
							//3개월
							else if(subCode == "04"){
								previewDate = new Date().setMonth(new Date().getMonth()+3);
								previewDateStr = new Date(previewDate).format("yyyy-MM-dd");
							}
							//6개월
							else if(subCode == "05"){
								previewDate = new Date().setMonth(new Date().getMonth()+6);
								previewDateStr = new Date(previewDate).format("yyyy-MM-dd");
							}
							//1년
							else if(subCode == "06"){
								previewDate = new Date().setMonth(new Date().getFullYear()+1);
								previewDateStr = new Date(previewDate).format("yyyy-MM-dd");
							}
							//값이 없으면 기간 제한을 하지 않았으므로
							else {
								//기본 오늘 날짜로 지정
								previewDate = new Date();
								previewDateStr = new Date(previewDate).format("yyyy-MM-dd");
							}
							
							var sampleDate = new Date().format("yyyy-MM-dd") + " ~ " + previewDateStr;
							$("#"+gridStackOpt["addDivId"]+" #"+tplItemId).val(sampleDate);
							//미리 보기 용 데이터 끝
						}
					}
				}
				//체크박스인 경우
				else if(itemCode == "08"){
					//목록 tplItemOptValListInfo 존재
					if(map.hasOwnProperty("tplItemOptValListInfo") && !$.osl.isNull(map["tplItemOptValListInfo"])){
						$.each(map["tplItemOptValListInfo"], function(o, optMap){
							var optVal = optMap["itemVal"];
							if(optVal == "01" || optVal == "true"){
								$("#"+gridStackOpt["addDivId"]+" #"+optMap["itemOptionId"]).attr("checked", true);
							}
						});
					}
				}
				//사용자이면
				else if(itemCode == "09"){
					//사용자 입력값 구분
					//서비스 항목이면
					if(map.tplEssentialItem == "01"){
						//목록 tplItemSevUsrListInfo 존재
						if(map.hasOwnProperty("tplItemSevUsrListInfo") && !$.osl.isNull(map["tplItemSevUsrListInfo"])){
							//서비스 항목 - 사용자 리스트 표출 영역
							var multiUsrListDiv = $("#"+gridStackOpt["addDivId"]+" #"+tplItemId).find(".osl-evt__template-item--user-list");
							var multiUsrList = multiUsrListDiv.data("user-list");
							if(!$.osl.isNull(multiUsrList)){
								multiUsrList = JSON.parse(multiUsrList);
							}else{
								multiUsrList = {};
							}
							
							//기존 목록
							var oriUsrListMap = {};
							oriUsrListMap = $.extend({}, oriUsrListMap, multiUsrListDiv.data("user-list"));
							
							//같은 서비스 항목의 기간 항목 찾아오기
							var linkedDaterangeItem = $("#"+gridStackOpt["addDivId"]).find(".osl-evt__grid-stack-item.osl-evt__service-widget[data-item-code='06']");
							var daterangeVal = fnGetItemValues(linkedDaterangeItem, true)["itemVal"];
							var itemStDtm = null;
							var itemEdDtm = null;
							if(!$.osl.isNull(daterangeVal)){
								itemStDtm = daterangeVal.split(" ~ ")[0];
								itemEdDtm = daterangeVal.split(" ~ ")[1];
							}
							
							
							$.each(map["tplItemSevUsrListInfo"], function(u, usrMap){
								//이미 그려져 있으면 건너뛰기
								if(oriUsrListMap.hasOwnProperty(usrMap["usrId"])){
									return;
								}
								
								//목록 추가
								var rowHtml = fnServiceUsrListItemHtmlStr(targetConfig["type"], usrMap);
								
								var rowElem = $(rowHtml);
								rowElem.data("usr-id", usrMap["usrId"]);
								rowElem.data("usr-name", usrMap["usrNm"]);
								rowElem.data("dept-id", usrMap["deptId"]);
								rowElem.data("dept-name", usrMap["deptName"]);
								rowElem.data("chg-dept", usrMap["chgDeptYn"]);
								rowElem.data("retire", usrMap["retireYn"]);
								rowElem.data("apply", usrMap["applyCd"]);
								multiUsrListDiv.append(rowElem);
								
								if(!oriUsrListMap.hasOwnProperty(usrMap["usrId"])){
									usrMap["itemStDtm"] = itemStDtm;
									usrMap["itemEdDtm"] = itemEdDtm;
									oriUsrListMap[usrMap["usrId"]] = usrMap;
								}
							});
							
							multiUsrListDiv.data("user-list", JSON.stringify(oriUsrListMap));
							
							//사용자 수 뱃지 표출
							//if(Object.keys(oriUsrListMap).length > 0){
								var middleElem = $("#"+gridStackOpt["addDivId"]+" #"+tplItemId).closest(".osl-evt__grid-stack-item-content");
								var badgeElem = $(middleElem).find(".osl-evt__grid-stack-item-label .osl-evt__multi-usr-cnt");
								
								if(badgeElem.length == 0){
									//뱃지 추가
									$(middleElem).find(".osl-evt__grid-stack-item-label").append(`
										<span class="ms-2 p-2 badge badge-sm badge-gray osl-evt__multi-usr-cnt">
											${Object.keys(oriUsrListMap).length} / ${map["itemSelUsrMaxVal"]}
										</span>
									`);
								}
								else{
									//텍스트만 변경
									var cntTxt = Object.keys(oriUsrListMap).length + ' / '+ map["itemSelUsrMaxVal"];
									badgeElem.text(cntTxt);
								}
							//}
						}
					}
					//서비스 항목이 아니면
					else{
						//if(map.itemSubCd == "01"){
							//이름이면
							$("#"+gridStackOpt["addDivId"]+" #"+tplItemId).val(itemVal);
							//itemHiddenVal이 있으면(아이디 넣기)
							if(!$.osl.isNull(map["itemHiddenVal"])){
								if($("#"+gridStackOpt["addDivId"]+" #"+tplItemId+"-hide").length > 0){
									$("#"+gridStackOpt["addDivId"]+" #"+tplItemId+"-hide").val(map["itemHiddenVal"]);
								}
							}
							//이미지
							var itemImgId = map.itemImgId;
							var targetUsrImgId = $.osl.user.usrImgUrlVal(itemImgId);
							$("#"+gridStackOpt["addDivId"]+" #"+tplItemId+"UsrImgId").val(itemImgId);
							$("#"+gridStackOpt["addDivId"]+" #"+tplItemId+"UsrImg").attr("src", targetUsrImgId);
						//}
					}
				}
				// 기관
				else if(itemCode =="10"){
					if(!$.osl.isNull(itemVal)){
						fnSetOptValue($("#"+gridStackOpt["addDivId"]+" #"+tplItemId),"data-cmm-code", map["itemOptionVal"]);
						fnSetOptValue($("#"+gridStackOpt["addDivId"]+" #"+tplItemId),"data-osl-value", itemVal);
					}
					
					//외부 사용자 접근인 경우
					if(targetConfig.hasOwnProperty("paramLicGrpId") && !$.osl.isNull(targetConfig["paramLicGrpId"])){
						//기관 정보 외부로 고정 및 disabled
						fnSetOptValue($("#"+gridStackOpt["addDivId"]+" #"+tplItemId), "data-osl-value", "02");
						$("#"+gridStackOpt["addDivId"]+" #"+tplItemId).prop("disabled", true);
					}
				}
				//소속/부서이면
				else if(itemCode == "11"){
					$("#"+gridStackOpt["addDivId"]+" #"+tplItemId).val(itemVal);
					//itemHiddenVal이 있으면(아이디 넣기)
					if(!$.osl.isNull(map["itemHiddenVal"])){
						if($("#"+gridStackOpt["addDivId"]+" #"+tplItemId+"-hide").length > 0){
							$("#"+gridStackOpt["addDivId"]+" #"+tplItemId+"-hide").val(map["itemHiddenVal"]);
						}
					}
				}
				// 공통 코드 정보 입력
				else if(itemCode =="12"){
					if(!$.osl.isNull(itemVal)){
						fnSetOptValue($("#"+gridStackOpt["addDivId"]+" #"+tplItemId),"data-cmm-code", map["itemOptionVal"]);
						fnSetOptValue($("#"+gridStackOpt["addDivId"]+" #"+tplItemId),"data-osl-value", itemVal);
					}
				}
				//첨부파일이면
				else if(itemCode == "13"){
					if(!$.osl.isNull($.osl.file.list[tplItemId])){
						var fileUploadObj = $.osl.file.list[tplItemId].targetUppy;
						//파일atchFileId, Sn넣기
						fileUploadObj.setMeta({atchFileId: itemVal, fileSn: parseInt(datas['fileListCnt'+map["tplItemId"]])+1});
						//파일 목록 세팅
						if(datas.hasOwnProperty('fileList'+map["tplItemId"]) && !$.osl.isNull(datas['fileList'+map["tplItemId"]]) && datas['fileList'+map["tplItemId"]].length > 0){
							//파일 목록 중, DB 조회 폼과 이미 조회된 이후 폼으로 구분한다.
							var dbFormFile = [];
							$.each(datas['fileList'+map["tplItemId"]], function(num, fileInfo){
								if(fileInfo.hasOwnProperty("source")){
									fileUploadObj.addFile(fileInfo);
								}else{
									dbFormFile.push(fileInfo);
								}
							});
							
							if(dbFormFile.length != 0){
								$.osl.file.fileListSetting(dbFormFile, fileUploadObj);
							}
						}
					}
				}
				//알림이면
				else if(itemCode == "14"){
					var alarmSettingVal = "";
					var alarmRangeVal = "";
					//값이 있을 때
					if(!$.osl.isNull(itemVal)){
						//값을 두자리씩 나눠서 설정, 기간으로 넣기
						try{
							alarmSettingVal = itemVal.substring(0, 2);
						}catch(e){
							alarmSettingVal = "01";
						}
						try{
							alarmRangeVal = itemVal.substring(2);
						}catch(e){
							alarmRangeVal = "01";
						}
					}
					//값이 없으면
					else{
						alarmSettingVal = "01";
						alarmRangeVal = "01";
					}
					
					//아니오 일 경우
					if(alarmSettingVal == "02"){
						$("#"+gridStackOpt["addDivId"]+" #"+tplItemId+"-sub").parents("div.form-group:last-child").addClass("d-none");
					}

					fnSetOptValue($("#"+gridStackOpt["addDivId"]+" #"+tplItemId),"data-cmm-code", map["itemOptionVal"]);
					fnSetOptValue($("#"+gridStackOpt["addDivId"]+" #"+tplItemId+"-sub"),"data-cmm-code", map["itemOptionVal"]);
					
					fnSetOptValue($("#"+gridStackOpt["addDivId"]+" #"+tplItemId),"data-osl-value", alarmSettingVal);
					fnSetOptValue($("#"+gridStackOpt["addDivId"]+" #"+tplItemId+"-sub"),"data-osl-value", alarmRangeVal);
				}
				//정보자산
				else if(itemCode == "15"){
					//중복 선택 유무 값 없는 경우 기본값 02 (아니오) 세팅
					if($.osl.isNull(map["itemMultiSelCd"])) {
						map["itemMultiSelCd"] = "02";
					}
					
					//정보자산이고 다중선택 유무 아니오인 경우 입력값 안넣기
					if(targetConfig["tplClsType"] != "01" || map["itemMultiSelCd"] == "02"){
						$("#"+gridStackOpt["addDivId"]+" #"+tplItemId).val(itemVal);
					}
					
					//itemHiddenVal이 있으면(아이디 넣기)
					if(!$.osl.isNull(map["itemHiddenVal"])){
						if($("#"+gridStackOpt["addDivId"]+" #"+tplItemId+"-hide").length > 0){
							$("#"+gridStackOpt["addDivId"]+" #"+tplItemId+"-hide").val(map["itemHiddenVal"]);
						}
					}
				}
				//디바이스
				else if(itemCode == "16"){
					$("#"+gridStackOpt["addDivId"]+" #"+tplItemId).val(itemVal);
					fnSetOptValue($("#"+gridStackOpt["addDivId"]+" #"+tplItemId), fnFindConfCheckOpt("api01"), map["api01"]);
					fnSetOptValue($("#"+gridStackOpt["addDivId"]+" #"+tplItemId), fnFindConfCheckOpt("api02"), map["api02"]);
					fnSetOptValue($("#"+gridStackOpt["addDivId"]+" #"+tplItemId), fnFindConfCheckOpt("api03"), map["api03"]);
				}
				//그 외
				else{
					$("#"+gridStackOpt["addDivId"]+" #"+tplItemId).val(itemVal);
				}
				
				//keyPath가 존재하면
				if(map.hasOwnProperty("keyPath") && !$.osl.isNull(map["keyPath"])){
					var target = $("#"+gridStackOpt["addDivId"]+" #"+tplItemId).closest(".osl-evt__grid-stack-item-content").find(".osl-evt__grid-stack-keypath-header .osl-evt__key-path-text");
					target.text(map["keyPath"]);
				}
				
				//TPL00003 체크리스트이면
				if(itemCode == "08"){
					//옵션별로 항목 체크
					//목록 tplItemOptValListInfo 존재
					if(map.hasOwnProperty("tplItemOptValListInfo") && !$.osl.isNull(map["tplItemOptValListInfo"])){
						$.each(map["tplItemOptValListInfo"], function(o, optMap){
							//keyPath가 존재하면
							if(optMap.hasOwnProperty("keyPath") && !$.osl.isNull(optMap["keyPath"])){
								var target = $("#"+gridStackOpt["addDivId"]+" #"+tplItemId).closest(".osl-evt__grid-stack-item-content").find(".osl-evt__grid-stack-keypath-icon[data-item-option-id="+optMap["itemOptionId"]+"] .osl-evt__key-path-text");
								target.text(optMap["keyPath"]);
							}
						});
					}
				}
			}); // end 값 넣기(메인)
		}
		
		//정보자산 태그가 있는 경우
		if(!$.osl.isNull(datas["tplItemValUnderListInfo"])) {
			//값 넣기(하위) - 정보자산 하위 정보(태그)
			$.each(datas["tplItemValUnderListInfo"], function(idx, map){
				var itemVal = $.osl.escapeHtml(map["itemVal"]);
				
				//값이 없으면
				if($.osl.isNull(itemVal)){
					//태그는 그리지 않기
					return true;
				}
				
				//다중 선택이 아니면 넘기기(정보자산이 아닐 때는 모두 다중 선택)
				var itemMultiSelCd = $("#"+gridStackOpt["addDivId"]+" #"+map["tplItemId"]).data("multi-sel-cd");
				if(targetConfig["tplClsType"] == "01" && itemMultiSelCd == "02"){
					return true;
				}
				
				//항목아이디
				var tplItemId = map["tplItemId"];
				if(!$.osl.isNull(gridStackOpt["subId"])){
					tplItemId = tplItemId + gridStackOpt["subId"];
				}
				
				//태그 있는경우 원본데이터 추가 (underItemOrd가 1인 경우는 껍데기 값이므로 제거)
				if(!$.osl.isNull($.osl.tag.list[tplItemId]) && map["underItemOrd"] != 1) {
					//태그 원본 데이터 값 추가
					$.osl.tag.list[tplItemId].oriTags.push(map);
				}
				
				if(String(map["itemCode"]) == "15"){
					//(단, 정보자산 명이 null이 아닐 때, map.itemHiddenVal이 존재할 때)
					//정보자산 명, 정보자산 id 둘다 존재할 때
					if(itemVal != null && itemVal != "" && map.itemHiddenVal != null && map.itemHiddenVal != ""){
						var xBtn = "";
						//상세가 아닐 땐 태그 제거 버튼 표출
						if(targetConfig["type"] != "detail"){
							xBtn = `<x class="osl-evt__template-cim-item__tag__remove-btn tagify__tag__removeBtn osl-me-4" role="button" aria-label="remove tag"></x>`;
						}
						
						var tagHtml = `
							<tag class="tagify__tag tagify--noAnim m-1 p-1 d-inline-flex cursor-pointer" role="tag" title="${itemVal}" contenteditable="false" spellcheck="false" ${fnFindConfCheckOpt("tplItemId")}="${tplItemId}" value="${map.itemHiddenVal}" data-item-value="${itemVal}" data-under-item-ord="${map.underItemOrd}" data-bs-toggle="tooltip" data-bs-custom-class="tooltip-inverse" data-bs-placement="bottom" data-bs-dismiss="click" title="${itemVal}" >
								${xBtn}
								<div class="tagify__tag-text ms-1 osl-me-4 osl-evt__cfg-info-pop" >
									${itemVal}
								</div>
							</tag>
						`;
						
						//추가
						$("#"+tplItemId+"_cimTagDiv").append(tagHtml);
					}
				}
			});
			
			//상세 조회일 때
			if(targetConfig["type"]=="detail"){
				var itemCodeOptNm = fnFindConfCheckOpt("itemCode");
				$.each($("#"+gridStackOpt["addDivId"]).find(".osl-evt__grid-stack-item["+itemCodeOptNm+"=15]"), function(i, cfgItem){
					//값이 존재한다고 하였으나, 태그가 존재하지 않는 경우
					if($(cfgItem).find(".osl-evt__tag-form tag").length == 0){
						//데이터 없음 표출
						$(cfgItem).find(".osl-evt__tag-form").html('<div class="text-center osl-evt__template-no-items my-5">'+targetConfig["noData"]+'</div>');
						//가운데 정렬
						$(cfgItem).find(".osl-evt__tag-form").addClass("justify-content-center");
					}
				});
			}
		}
		
		//툴팁 세팅
		OSLApp.initTooltips();
		
		//값을 넣은 후
		//사용자 지정 콜백이 있으면
		if(targetConfig.hasOwnProperty("callback") && targetConfig["callback"].hasOwnProperty("afterSetValue") && typeof targetConfig["callback"]["afterSetValue"] == "function"){
			targetConfig["callback"]["afterSetValue"](datas, targetConfig);
		}
		
	};
	
	//Fn06. fnCreatItemAfter 후처리(양식 그린 후 처리될 동작)
	/* *
	* function 명 : fnCreatItemAfter
	* function 설명 : 양식 항목 모두 그린 후 동작
	* (정규식, 서비스 항목에 로그인 사용자 삽입, 수정 옵션 수정, 탭인덱스 재적용)
	* param usrConfig
	* */
	const fnCreatItemAfter = function(usrConfig){
		let targetConfig = fnExtendConfig(usrConfig);
		
		let gridStackOpt = targetConfig["gridStack"];
		try{
			var appendDivIdList = [];
			//항목이 그려진 영역 타겟
			if(!$.osl.isNull(gridStackOpt["addDivId"]) && appendDivIdList.indexOf(gridStackOpt["addDivId"]) == -1){
				appendDivIdList.push(gridStackOpt["addDivId"]);
			}
			//항목이 그려진 영역 타겟
			if(!$.osl.isNull(gridStackOpt["removeDivId"]) && appendDivIdList.indexOf(gridStackOpt["removeDivId"]) == -1){
				appendDivIdList.push(gridStackOpt["removeDivId"]);
			}
			
			var firstClassNm = "";
			if(!$.osl.isNull(gridStackOpt["firstClassNm"])){
				firstClassNm = gridStackOpt["firstClassNm"];
				firstClassNm = "."+firstClassNm.trim().replace(/\.+/g,".");
			}
			
			//그리드 스택 영역
			$.each(appendDivIdList, function(idx, gridStackAreaId){
				//항목 조회
				var targetDivs = $("#"+gridStackAreaId).find(".osl-evt__grid-stack-item"+firstClassNm);
				
				//항목으로부터 값 가져오기- 갱신된 값으로
				var dataLists = fnGetItemValuesByForm(gridStackAreaId, true);
				
				//항목을 돌면서 기능 연결 및 생성
				$.each(targetDivs, function(index, target){
					var itemMap = dataLists["dataListMap"][fnFindConfCheckOptVal($(target), "itemId")];
					/*
					itemMap["itemId"] = $(target).attr("gs-id");
					*/
					//텍스트 항목일 때
					if(String(itemMap["itemCode"]) == "02"){
						//TPL00012
						var textPlaceHolder = "";
						if(!$.osl.isNull(itemMap["itemRegexCd"]) && itemMap["itemRegexCd"] != "-1"){
							textPlaceHolder = $.osl.lang("commonCode.TPL00012.subCode"+itemMap["itemRegexCd"]);
						}
						
						if(!$.osl.isNull(textPlaceHolder)){
							//placeholder
							fnSetOptValue($("#"+itemMap["itemId"]), "placeholder", textPlaceHolder);
						}
						
						//서비스 항목이고 type이 insert일 때 정규식 코드로 구분
						if(!$.osl.isNull(itemMap["tplEssentialItem"]) && itemMap["tplEssentialItem"] == "01" && targetConfig["type"] == "insert"){
							//이메일
							if(itemMap["itemRegexCd"] == "05"){
								$("#"+itemMap["itemId"]).val($.osl.user.userInfo.email);
							}
							//연락처
							else if(itemMap["itemRegexCd"] == "07"){
								$("#"+itemMap["itemId"]).val($.osl.user.userInfo.telno);
							}
						}
					}
					//사용자, 조직, 정보자산
					else if(String(itemMap["itemCode"]) == "09" || String(itemMap["itemCode"]) == "11" || String(itemMap["itemCode"]) == "15"){
						//외부 사용자 접근인 경우
						if(targetConfig.hasOwnProperty("paramLicGrpId") && !$.osl.isNull(targetConfig["paramLicGrpId"])){
							//입력 값 정보 : 기본으로 변경
							//사용자
							fnSetItemModifyOptValue($(target).find(".osl-evt__template-item"), "optType", "01");
							//이름
							fnSetItemModifyOptValue($("#"+itemMap["itemId"]), "optType", "01");
						}
						//내부 사용자 접근인 경우
						else{
							//숨겨진 value와 연결
							fnSetItemModifyOptValue($("#"+itemMap["itemId"]), "hiddenId", itemMap["itemId"]+"-hide");
							fnSetItemModifyOptValue($("#"+itemMap["itemId"]), "hiddenKey", itemMap["itemId"]+"-hide");
							
							//구분을 위한 서브코드 삽입
							fnSetItemModifyOptValue($("#"+itemMap["itemId"]+"-hide"), "optTypeSub", "00");
							
							//세부 구분
							//사용자
							if(String(itemMap["itemCode"]) == "09"){
								//사용자
								fnSetItemModifyOptValue($(target).find(".osl-evt__template-item"), "optType", "04");
								//이름
								fnSetItemModifyOptValue($("#"+itemMap["itemId"]), "optTypeSub", "01");
								
								//서비스 항목이고 type이 insert이면
								if(!$.osl.isNull(itemMap["tplEssentialItem"]) && itemMap["tplEssentialItem"] == "01" && targetConfig["type"] == "insert"){
									//로그인한 사용자 정보 넣기(default)
									$("#"+itemMap["itemId"]+"-hide").val($.osl.user.userInfo.usrId);
									$("#"+itemMap["itemId"]).val($.osl.user.userInfo.usrNm);
									$("#"+itemMap["itemId"]+"UsrImg").attr("src",$.osl.user.usrImgUrlVal($.osl.user.userInfo.usrImgId));
									$("#"+itemMap["itemId"]+"UsrImgId").val($.osl.user.userInfo.usrImgId);
								}
							}
							//조직
							else if(String(itemMap["itemCode"]) == "11"){
								//분류
								fnSetItemModifyOptValue($(target).find(".osl-evt__template-item"), "optType", "05");
								//조직명
								fnSetItemModifyOptValue($("#"+itemMap["itemId"]), "optTypeSub", "04");
								
								//서비스 항목이고 type이 insert이면
								if(!$.osl.isNull(itemMap["tplEssentialItem"]) && itemMap["tplEssentialItem"] == "01" && targetConfig["type"] == "insert"){
									//로그인한 사용자 정보 넣기(default)
									$("#"+itemMap["itemId"]).val($.osl.user.userInfo.deptName);
									$("#"+itemMap["itemId"]+"-hide").val($.osl.user.userInfo.deptId);
								}
							}
							//정보자산
							else {
								//분류
								fnSetItemModifyOptValue($(target).find(".osl-evt__template-item"), "optType", "05");
							}
						}
					}
					
					//정규식 세팅
					if(targetConfig["type"].indexOf("draw") == -1 && !$.osl.isNull(itemMap["itemRegexCd"])){
						$.osl.templateForm.regex.setting([{"tplItemId" : itemMap["itemId"], "itemRegexCd" : String(itemMap["itemRegexCd"])}]);
					}
				}); //기능 연결 및 생성 끝
				
				// 탭인덱스 재적용
				fnResetTabIndex();
				
				// 반응형 적용
				fnTemplateEventSetting("#"+gridStackAreaId, targetConfig).fnTemplateFormResize(gridStackAreaId);
				
			}); //end 그리드 스택 영역 돌기
			
			//툴팁 적용
			OSLApp.initTooltips();
		}catch (e) {
			console.log(e);
		}
	};
	
	//Fn07. fnSetItemOptValue 객체에 정보 저장
	/* *
	 * function 명 : fnSetItemOptValue
	 * function 설명 : 객체에 정보 저장
	 * param elem 그리드 스택 아이템
	 * param optNm 항목 데이터 명
	 * param optVal 항목 데이터
	 * param oriChange 아이템 데이터 직접 수정(default false)
	 * 
	 * osl-evt__grid-stack-item : 변경 정보 위치
	 * oriChange true인 경우 osl-evt__grid-stack-item-content, osl-evt__template-item : 변경
	 * */
	const fnSetItemOptValue = function (elem, optNm, optVal, oriChange){
		if($.osl.isNull(oriChange) || String(oriChange) != "true"){
			oriChange = false;
		}
		
		//옵션 명 가져오기
		let elemOptNm = fnFindConfCheckOpt(optNm);
		
		let topElem = $(elem).closest(".osl-evt__grid-stack-item");
		
		//만약 항목이 기간, 공통코드 일 때, itemOptionVal/mstCd/subMstCd가 넘어온 경우
		let topInfo = {};
		if(!$.osl.isNull(topElem)){
			topInfo = fnGetItemValues(topElem, true);
		}
		//itemOptionVal인 경우 연관된 데이터도 같이 갱신하기 위해
		let subOptNm;
		let autherHasOptTF = false;
		if(String(topInfo["itemCode"]) == "06" || String(topInfo["itemCode"]) == "12"){
			autherHasOptTF = true;
			//기간
			if(String(topInfo["itemCode"]) == "06"){ 
				if(optNm == "itemOptionVal"){
					//subMstCd에도 반영해야 한다.
					subOptNm = fnFindConfCheckOpt("subMstCd");
				}
				else if(optNm == "subMstCd"){
					//itemOptionVal에도 반영해야 한다.
					subOptNm = fnFindConfCheckOpt("itemOptionVal");
				}
			}
			//공통코드
			else if(String(topInfo["itemCode"]) == "12"){
				if(optNm == "itemOptionVal"){
					//mstCd에도 반영해야 한다.
					subOptNm = fnFindConfCheckOpt("mstCd");
				}
				else if(optNm == "mstCd"){
					//itemOptionVal에도 반영해야 한다.
					subOptNm = fnFindConfCheckOpt("itemOptionVal");
				}
			}
			
			if($.osl.isNull(subOptNm)){
				autherHasOptTF = false;
			}
		}
		
		//1. 최상단 반영 - 지정 옵션이 존재할 경우에만
		if(confCheckOptPosition["top"].indexOf(optNm) > -1){
			topElem.attr(elemOptNm, optVal);
			//data option인 경우 attr로 반영이 안되는 경우가 있기 때문에
			if(elemOptNm.indexOf("data-") == 0){
				topElem.data(elemOptNm.replace("data-",""), optVal);
			}
			
			if(autherHasOptTF){
				topElem.attr(subOptNm, optVal);
				//data option인 경우 attr로 반영이 안되는 경우가 있기 때문에
				if(subOptNm.indexOf("data-") == 0){
					topElem.data(subOptNm.replace("data-",""), optVal);
				}
			}
		}
		
		//원본 값에 저장한다고 한 경우, osl-evt__grid-stack-item-content, osl-evt__template-item에도 정보 반영해야하기 때문에
		if(oriChange){
			$.each(topElem.find(".osl-evt__grid-stack-item-content"), function(n, dbElem){
				//지정 옵션이 존재할 경우에만
				if(confCheckOptPosition["dbColumn"].indexOf(optNm) > -1){
					//반영
					$(dbElem).attr(elemOptNm, optVal);
					//data option인 경우 attr로 반영이 안되는 경우가 있기 때문에
					if(elemOptNm.indexOf("data-") == 0){
						$(dbElem).data(elemOptNm.replace("data-",""), optVal);
					}
					
					if(autherHasOptTF){
						$(dbElem).attr(subOptNm, optVal);
						//data option인 경우 attr로 반영이 안되는 경우가 있기 때문에
						if(subOptNm.indexOf("data-") == 0){
							$(dbElem).data(subOptNm.replace("data-",""), optVal);
						}
					}
				}
			});
			$.each(topElem.find(".osl-evt__template-item"), function(n, mainElem){
				//지정 옵션이 존재할 경우에만
				if(confCheckOptPosition["main"].indexOf(optNm) > -1){
					//반영
					$(mainElem).attr(elemOptNm, optVal);
					//data option인 경우 attr로 반영이 안되는 경우가 있기 때문에
					if(elemOptNm.indexOf("data-") == 0){
						$(mainElem).data(elemOptNm.replace("data-",""), optVal);
					}
					
					if(autherHasOptTF){
						$(mainElem).attr(subOptNm, optVal);
						//data option인 경우 attr로 반영이 안되는 경우가 있기 때문에
						if(subOptNm.indexOf("data-") == 0){
							$(mainElem).data(subOptNm.replace("data-",""), optVal);
						}
					}
				}
			});
		}
		
		//.osl-evt__grid-stack-item, .osl-evt__grid-stack-item-content, .osl-evt__template-item:not(.osl-evt__template-hide-item, .osl-evt__template-sub-item)은 중지
		if($(elem).hasClass("osl-evt__grid-stack-item") || $(elem).hasClass("osl-evt__grid-stack-item-content")){
			return;
		}
		if($(elem).hasClass("osl-evt__template-item") && !($(elem).hasClass("osl-evt__template-hide-item") || $(elem).hasClass("osl-evt__template-sub-item"))){
			return;
		}
		
		//전달 받은 자기 자신에게도 저장(hide, sub 객체가 넘어오는 경우가 있으며, 자기 자신에게 없는 키에 대한 값도 저장하기 위해서)
		//옵션과 가진 상태와 상관 없이 반영
		//반환된 값이 없으면
		if($.osl.isNull(elemOptNm)){
			elemOptNm = optNm;
		}
		$(elem).attr(elemOptNm, optVal);
		//data option인 경우 attr로 반영이 안되는 경우가 있기 때문에
		if(elemOptNm.indexOf("data-") == 0){
			$(elem).data(elemOptNm.replace("data-",""), optVal);
		}
		
		if(autherHasOptTF){
			$(elem).attr(subOptNm, optVal);
			//data option인 경우 attr로 반영이 안되는 경우가 있기 때문에
			if(subOptNm.indexOf("data-") == 0){
				$(elem).data(subOptNm.replace("data-",""), optVal);
			}
		}
	};
	
	
	//Fn08. fnSetItemModifyOptValue 객체에 수정 관련 옵션 정보 저장
	/* *
	 * function 명 : fnSetItemModifyOptValue
	 * function 설명 : 객체에 수정 관련 옵션 정보 저장
	 * param elem 대상 객체
	 * param optNm 항목 데이터 명
	 * param optVal 항목 데이터
	 * */
	const fnSetItemModifyOptValue = function (elem, optNm, optVal){
		//옵션 명 가져오기
		let elemOptNm = "data-"+modifyOptMap[optNm];
		
		let targetElem = $(elem);
		//반영
		targetElem.attr(elemOptNm, optVal);
		//data option인 경우 attr로 반영이 안되는 경우가 있기 때문에
		targetElem.data(elemOptNm.replace("data-",""), optVal);
	};
	
	//Fn09. fnGetItemModifyOptValue 객체에 수정 관련 옵션 정보 가져오기
	/* *
	 * function 명 : fnGetItemModifyOptValue
	 * function 설명 : 객체에 수정 관련 옵션 정보 가져오기
	 * param elem 대상 객체
	 * param optNm 항목 데이터 명
	 * */
	const fnGetItemModifyOptValue = function (elem, optNm){
		return $(elem).data(modifyOptMap[optNm]);
	};
	
	//Fn10. fnSetOptValue 단순 객체에 옵션 정보 저장
	/* *
	 * function 명 : fnSetOptValue
	 * function 설명 : 단순 객체에 옵션 정보 저장
	 * param elem 대상 객체
	 * param optNm 항목 데이터 명
	 * param optVal 항목 데이터
	 * */
	const fnSetOptValue = function (elem, optNm, optVal){
		//반영
		$(elem).attr(optNm, optVal);
		if(optNm.indexOf("data-") == 0){
			//data option인 경우 attr로 반영이 안되는 경우가 있기 때문에
			$(elem).data(optNm.replace("data-",""), optVal);
		}
	};
	
	//Fn11. fnGetItemValues 객체로부터 정보 추출하여 반환
	/* *
	 * function 명 : fnGetItemValues
	 * function 설명 : 객체로부터 정보 추출하여 반환
	 * param elem 그리드 스택 아이템
	 * param updateFlag 항목 데이터 최신화 여부(boolean, 기본값 - false)
	 * 
	 * osl-evt__grid-stack-item : 변경 정보 반영된 위치
	 * osl-evt__grid-stack-item-content : db에서 가져왔던 정보대로 세팅하기 위한 위치
	 * */
	const fnGetItemValues = function (elem, updateFlag){
		if($.osl.isNull(elem)){
			return {};
		}
		
		//최신화 여부 없는 경우 기본값 false- 단, 타입이 sameTime이 아닐 때에만
		if($.osl.isNull(updateFlag)) {
			updateFlag = false;
		}
		
		var targetElem;
		
		//전달 받은 항목에 클래스 osl-evt__grid-stack-item-content가 존재하면
		if($(elem).hasClass("osl-evt__grid-stack-item-content")){
			targetElem = $(elem);
		}
		//전달 받은 항목에 클래스 osl-evt__grid-stack-item-content가 없으면 가장 근처에 있는 값으로 가져오기
		else {
			//1차 하위로 찾기
			targetElem = $(elem).find(".osl-evt__grid-stack-item-content");
			
			//없으면 2차 가까운 상위로 찾기
			if($.osl.isNull(targetElem) || targetElem.length == 0){
				targetElem = $(elem).closest(".osl-evt__grid-stack-item-content");
			}
		}
		
		var itemElem = $(targetElem).find(".osl-evt__template-item");
		
		//속성 - 넘어오는 객체 폼이 다른 경우가 있어서 한번 감싼이후 처리
		var attrs = $(targetElem)[0].getAttributeNames();
		var modifyAttrs = [];
		//정보자산이 단순 태그 그려질 경우 osl-evt__template-item이 없어서
		if(!$.osl.isNull(itemElem) && itemElem.length > 0){
			modifyAttrs = itemElem[0].getAttributeNames();
		}
		
		//분류
		var nomalList = [];
		var dataList = [];
		var gridList = [];
		
		//수정 분류
		var modifyList = [];
		
		$.each(attrs, function(n, attrStr){
			//confCheckOpt["data"]
			if(attrStr.indexOf("data-") == 0){
				if(dataList.indexOf(attrStr.replace("data-", "")) == -1){
					dataList.push(attrStr.replace("data-", ""));
				}
			}
			//confCheckOpt["grid"]
			else if(attrStr.indexOf("gs-") == 0){
				if(gridList.indexOf(attrStr) == -1){
					gridList.push(attrStr);
				}
			}
			//confCheckOpt["nomal"]
			else{
				if(nomalList.indexOf(attrStr) == -1){
					nomalList.push(attrStr);
				}
			}
		});
		
		$.each(modifyAttrs, function(n, modifyStr){
			//modifyOptMap
			if(modifyStr.indexOf("data-") == 0){
				if(modifyList.indexOf(modifyStr.replace("data-", "")) == -1){
					modifyList.push(modifyStr.replace("data-", ""));
				}
			}
		});
		
		var data = {};
		//분류에 따라 데이터 확인
		//해당 값은 value에 해당하므로, key를 찾아야 한다.
		$.each(dataList, function(n, optNm){
			//confCheckOpt에서 일치하는 값
			var colunmNm = fnFindKey(confCheckOpt["data"], optNm);
			if(!$.osl.isNull(colunmNm)){
				data[colunmNm] = $(targetElem).data(optNm);
			}
		});
		$.each(gridList, function(n, optNm){
			var colunmNm = fnFindKey(confCheckOpt["grid"], optNm);
			if(!$.osl.isNull(colunmNm)){
				data[colunmNm] = $(targetElem).attr(optNm);
			}
		});
		$.each(nomalList, function(n, optNm){
			var colunmNm = fnFindKey(confCheckOpt["nomal"], optNm);
			if(!$.osl.isNull(colunmNm)){
				data[colunmNm] = $(targetElem).attr(optNm);
			}
		});
		//수정
		$.each(modifyList, function(n, optNm){
			//modifyOptMap에서 일치하는 값 - 실제 아이템 기준
			colunmNm = fnFindKey(modifyOptMap, optNm);
			if(!$.osl.isNull(colunmNm) && !$.osl.isNull(itemElem) && itemElem.length > 0){
				data[colunmNm] = itemElem.data(optNm);
			}
		});
		
		//이상징후
		var targetSiemElem = $(targetElem).find(".osl-evt__grid-stack-keypath-header.osl-evt__grid-stack-keypath-icon");
		//이상징후 서버
		data["sevId"] = fnFindConfCheckOptVal(targetSiemElem, "sevId");
		//이상징후 맵
		data["mapId"] = fnFindConfCheckOptVal(targetSiemElem, "mapId");
		//이상징후 맵 항목 유니크 키
		data["mapItemId"] = fnFindConfCheckOptVal(targetSiemElem, "mapItemId");
		//이상징후 맵핑 키
		data["keyPath"] = fnFindConfCheckOptVal(targetSiemElem, "keyPath");
		
		//기본 옵션이 아닌 영역에서 가져와야 하는 항목들 - updateFlag와 상관 없다.
		//명칭
		//항목명- 줄바꿈과 탭이 모두 들어가게 되어 trim 필수
		data["itemNm"] = $(targetElem.find(".osl-evt__grid-stack-item-label > span")[0]).text().trim();
		//단순 텍스트 표출인 경우
		if(String(data["itemCode"]) == "01"){
			data["itemNm"] = "단순 텍스트 표출";
		}
		//알림인 경우
		else if(String(data["itemCode"]) == "14"){
			//라벨 명은 '알림 설정/알림 기간'으로 통일
			data["itemNm"] += "/" + $(targetElem.find(".osl-evt__grid-stack-item-label > span")[1]).text().trim();
		}
		//체크리스트인 경우 - 최신화 여부와 상관 없다.
		else if(String(data["itemCode"]) == "08"){
			//다중 선택(체크박스)이면
			if(data["itemMultiSelCd"] == "01"){
				data["keyPath"] = '';
			}
			
			//list로 넣어야 함
			data["tplItemOptValListInfo"] = [];
			//체크리스트 영역
			var chkListDiv = $(targetElem.find(".osl-evt__template-item--check-list"));
			var chkList = chkListDiv.find(".osl-evt__template-item--check-item");
			if(chkList.length > 0) {
				$.each(chkList, function (c, chkItem){
					var chkItemData = {};
					//항목 아이디
					chkItemData["itemOptionId"] = chkItem.id;
					//항목 명
					chkItemData["itemNm"] =  $(chkItem).siblings(".osl-evt__grid-stack-item--opt-label").text().trim();
					//값
					chkItemData["itemVal"] =  chkItem.checked?"01":"02";
					//표출 순서
					chkItemData["itemViewOrd"] = c+1;
					//옵션 필수 여부
					chkItemData["optEssentialCd"] = $(chkItem).data("item-opt-required");
					if(chkItemData["optEssentialCd"] != "01"){
						chkItemData["optEssentialCd"] = "02";
					}
					
					//이상징후 맵 항목 유니크 키
					chkItemData["mapItemId"] = fnFindConfCheckOptVal($(chkItem).parent().prev(), "mapItemId");
					
					//키 맵핑 값 - 최신화 여부와 상관 없음(무조건 최신 정보)
					chkItemData["keyPath"] = $(chkItem).parent().prev().find(".osl-evt__key-path-text").text().trim();
					
					data["tplItemOptValListInfo"].push(chkItemData);
				});
			}
		}
		//서비스 항목 사용자(다건)인 경우 - 최신화 여부와 상관 없음
		else if(String(data["itemCode"]) == "09" && itemElem.find(".osl-evt__template-item--user-list").length > 0) {
			//같은 서비스 항목의 기간 항목 찾아오기
			var linkedDaterangeItem = $(targetElem).closest(".grid-stack").find(".osl-evt__grid-stack-item.osl-evt__service-widget[data-item-code='06']");
			var daterangeVal = fnGetItemValues(linkedDaterangeItem, true)["itemVal"];
			var itemStDtm = null;
			var itemEdDtm = null;
			if(!$.osl.isNull(daterangeVal)){
				itemStDtm = daterangeVal.split(" ~ ")[0];
				itemEdDtm = daterangeVal.split(" ~ ")[1];
			}
			
			//list로 넣어야 함
			data["tplItemSevUsrListInfo"] = [];
			//서비스 항목 - 사용자 리스트 표출 영역
			var multiUsrListDiv = itemElem.find(".osl-evt__template-item--user-list");
			//row
			var rowElems = multiUsrListDiv.find(".osl-evt__template-item--user-list--row");
			$.each(rowElems, function(r, rowElem){
				var usrMap = {
					usrId :$(rowElem).data("usr-id"), 
					usrNm :$(rowElem).data("usr-name"), 
					deptId :$(rowElem).data("dept-id"), 
					deptNm :$(rowElem).data("dept-name"),
					itemStDtm : itemStDtm,
					itemEdDtm : itemEdDtm,
				};
				
				data["tplItemSevUsrListInfo"].push(usrMap);
			});
		}
		//디바이스
		else if(String(data["itemCode"]) == "16"){
			data["api01"] = fnFindConfCheckOptVal($(itemElem), "api01");
			data["api02"] = fnFindConfCheckOptVal($(itemElem), "api02");
			data["api03"] = fnFindConfCheckOptVal($(itemElem), "api03");
		}
		
		//최신화 여부 true인 경우 정보 최신화
		targetElem= $(targetElem).closest(".osl-evt__grid-stack-item");
		//지정 위치에서 해당 정보 가져온다.
		if(updateFlag){
			if(!$.osl.isNull(targetElem)){
				// 항목 아이디
				data["itemId"] = fnFindConfCheckOptVal(targetElem, "itemId");
				
				// 항목 X 좌표
				data["itemXpoint"] = fnFindConfCheckOptVal(targetElem, "itemXpoint");
				
				// 항목 Y 좌표
				data["itemYpoint"] = fnFindConfCheckOptVal(targetElem, "itemYpoint");
				
				// 항목 높이
				data["itemHeight"] = fnFindConfCheckOptVal(targetElem, "itemHeight");
				
				// 항목 가로 길이
				data["itemWidth"] = fnFindConfCheckOptVal(targetElem, "itemWidth");
				
				// 유효성 검사
				//텍스트 박스 혹은 숫자인 경우에만 확인
				if(String(data["itemCode"]) == "02" || String(data["itemCode"]) == "07") {
					data["itemRegexCd"] = fnFindConfCheckOptVal(targetElem, "itemRegexCd");
				}
				
				// 항목명- 줄바꿈과 탭이 모두 들어가게 되어 trim 필수
				data["itemNm"] = $(targetElem.find(".osl-evt__grid-stack-item-label > span")[0]).text().trim();
				
				//단순 텍스트 표출인 경우
				if(String(data["itemCode"]) == "01"){
					data["itemNm"] = "단순 텍스트 표출";
				}
				//알림인 경우
				else if(String(data["itemCode"]) == "14"){
					//라벨 명은 '알림 설정/알림 기간'으로 통일
					data["itemNm"] += "/" + $(targetElem.find(".osl-evt__grid-stack-item-label > span")[1]).text().trim();
				}
				
				// 표출 내용
				//단순 텍스트 표출인 경우 해당 내용 확인
				if(String(data["itemCode"]) == "01"){
					data["itemOptionVal"] = targetElem.find(".osl-evt__template-item").html();
					if(targetElem.find(".osl-evt__template-item .osl-evt__not-item-value").length > 0){
						data["itemOptionVal"] = "";
					}
				}
				//기간인 경우 최대 기간 확인
				else if(String(data["itemCode"]) == "06"){
					data["subMstCd"] = fnFindConfCheckOptVal(targetElem, "subMstCd");
					data["itemOptionVal"] = fnFindConfCheckOptVal(targetElem, "itemOptionVal");
					if($.osl.isNull(data["itemOptionVal"])){
						data["itemOptionVal"] = data["subMstCd"];
					}
					
					//기간 제한 여부
					data["itemTimeLimitUseCd"] = fnFindConfCheckOptVal(targetElem, "itemTimeLimitUseCd");
					//알림 사용 여부
					data["itemAlarmUseCd"] = fnFindConfCheckOptVal(targetElem, "itemAlarmUseCd");
					//미리 알림 기간 코드
					data["itemAlarmRangeCd"] = fnFindConfCheckOptVal(targetElem, "itemAlarmRangeCd");
				
					//기간 제한 사용하는 경우
					if(data["itemTimeLimitUseCd"] == "01"){
						data["itemOptionVal"] = data["subMstCd"];
					}
					//사용하지 않는 경우
					else{
						data["itemOptionVal"] = "-1";
					}
				}
				//공통코드인 경우 공통코드 값 확인
				else if(String(data["itemCode"]) == "12"){
					data["itemOptionVal"] = fnFindConfCheckOptVal(targetElem, "itemOptionVal");
					data["mstCd"] = data["itemOptionVal"];
				}
				
				//필수 항목 여부
				//서비스 항목 유무
				var tplEssentialItem = fnFindConfCheckOptVal($(targetElem), "tplEssentialItem");
					
				//알람 유무
				var alarmUseCd = fnFindConfCheckOptVal($(targetElem), "itemAlarmUseCd");
				
				//단순텍스트 표출 아니고, 서비스항목도 아니고, 알림과 연결된 사용자도 아닌경우에만 확인 
				if(["01", "16"].indexOf(String(data["itemCode"])) == -1 && tplEssentialItem != "01" && !(String(data["itemCode"]) == "09" && alarmUseCd == "01")) {
					data["itemEssentialCd"] = fnFindConfCheckOptVal(targetElem, "itemEssentialCd");
				}
				
				//수정 가능 여부
				//단순 텍스트 표출 아닌 경우에만 확인
				if(String(data["itemCode"]) != "01"){
					data["itemModifyCd"] = fnFindConfCheckOptVal(targetElem, "itemModifyCd");
				}
				
				//선행지식 연결 여부
				// 텍스트영역인 경우에만 확인
				if(String(data["itemCode"]) == "03") {
					data["itemConnectionUseCd"] = fnFindConfCheckOptVal(targetElem, "itemConnectionUseCd");
				}
				
				//다중 선택 가능 여부
				data["itemMultiSelCd"] = fnFindConfCheckOptVal(targetElem, "itemMultiSelCd");
				
				//최솟값, 최댓값
				data["itemMinVal"] = fnFindConfCheckOptVal(targetElem, "itemMinVal");
				data["itemMaxVal"] = fnFindConfCheckOptVal(targetElem, "itemMaxVal");
				
				//검색
				data["itemSearchCd"] = fnFindConfCheckOptVal(targetElem, "itemSearchCd");
				data["itemSearchClsCd"] = fnFindConfCheckOptVal(targetElem, "itemSearchClsCd");
				
				//서비스 항목-사용자 항목-의 최대 선택 수
				data["itemSelUsrMaxVal"]  = fnFindConfCheckOptVal(targetElem, "itemSelUsrMaxVal");
			}
			
			if(!$.osl.isNull(targetSiemElem)){
				//이상징후 키 맵핑 값 - 항목의 최상위 키 맵핑 값
				//키 맵핑 값
				data["keyPath"] = targetElem.find(".osl-evt__grid-stack-keypath-header .osl-evt__key-path-text").text().trim();
				//체크리스트의 다중 선택인 경우(체크박스)
				if(data["itemMultiSelCd"] == "01" && String(data["itemCode"]) == "08"){
					//항목의 키 맵핑 값은 제거
					data["keyPath"] = '';
				}
			}
		}
		
		//item DB 타입이므로, 이력과도 매칭을 위해 formData 와 동일한 키 값을 가지도록 일부 데이터 가공
		data["optNm"] = data["itemNm"];
		//등록할 때에는 기본 default 값을 가지고 있기 위해
		if(data["configType"] == "insert"){
			//단순 텍스트 표출
			if(String(data["itemCode"]) == "01"){
				//itemOptionVal을 itemVal 동일하게
				data["itemVal"] = String($(elem).find(".osl-evt__template-item").html());
			}
			//텍스트 영역이면
			else if(String(data["itemCode"]) == "03"){
				data["itemVal"] =$(elem).find(".osl-evt__template-item").summernote("code");
			}
			//체크박스이면
			else if(String(data["itemCode"]) == "08"){
				if($(elem).find(".osl-evt__template-item").is(":checked")){
					data["itemVal"] = "01";
				}else{
					data["itemVal"] = "02";
				}
			}
			//사용자이면
			else if(String(data["itemCode"]) == "09"){
				data["itemVal"] = $(elem).find(".osl-evt__template-item").val();
				data["itemHiddenVal"] = $("#"+$(elem).find(".osl-evt__template-item").data("hidden-id")).val();
				data["itemImgId"] = $("#"+$(elem).find(".osl-evt__template-item").attr("id")+"UsrImgId").val();
			}
			//조직이면
			else if(String(data["itemCode"]) == "11"){
				data["itemVal"] = $(elem).find(".osl-evt__template-item").val();
				data["itemHiddenVal"] = $("#"+$(elem).find(".osl-evt__template-item").data("hidden-id")).val();
			}
			//그 외
			else {
				data["itemVal"] = $(elem).find(".osl-evt__template-item").val();
			}
		}
		data["optVal"] = data["itemVal"];
		
		data["chgDetailOptTarget"] = data["optTarget"];
		data["chgDetailOptType"] = data["optType"];
		data["chgDetailOptSubCd"] = data["optTypeSub"];
		data["chgDetailCommonCd"] = data["mstCd"];
		
		data["optHiddenKey"] = data["hiddenKey"];
		
		//히든 id가 가진 값
		data["optHiddenVal"] = itemElem.data("hidden-value");
		//없을 경우 hiddenId 확인
		if($.osl.isNull(data["optHiddenVal"])){
			if($("#"+data["hiddenId"]).length > 0){
				data["optHiddenVal"] = $("#"+data["hiddenId"]).val();
			}
			else if($("[name="+data["hiddenId"]+"]").length > 0){
				data["optHiddenVal"] = $("[name="+data["hiddenId"]+"]").val();
			}
			else{
				data["optHiddenVal"] = "";
			}
		}
		
		data["optElemType"] = data["elemType"];
		/*
		let datas = {
				dataList: [], //DB에서 전달하는 폼과 같은 형태
				dataListMap : {}, //항목 생성 아이디(DB에서 조회된 항목 id와 다를 수 있다.) 기준으로 DB 정보 폼 조회 위해
		};
		
		datas["dataList"] = [data];
		datas["dataListMap"][data["itemId"]] = data;
		*/
		return data;
	};
	
	//Fn12. fnGetItemValuesByForm 지정 영역에서 아이템을 찾아 정보 추출하여 반환
	/* *
	 * function 명 : fnGetItemValuesByForm
	 * function 설명 : 지정 영역에서 아이템을 찾아
	 * DB에서 값을 보내주는 형태와 동일하게 만든다.
	 * param formId : grid-stack 항목 추출을 위한 영역 id 값(# 제외하고 보낸다)
	 * param updateFlag : 항목 데이터 변경된 경우 최신화 여부 (boolean, 기본값 -false)
	 * */
	const fnGetItemValuesByForm = function(formId, updateFlag){
		//최신화 여부 없는 경우 기본값 false
		if($.osl.isNull(updateFlag)) {
			updateFlag = false;
		}
		
		//지정 영역에서 item 가져오기
		let gridStackItems = $("#"+formId).find(".osl-evt__grid-stack-item-content");
		
		let datas = {
				dataList: [], //DB에서 전달하는 폼과 같은 형태
				dataListMap : {}, //항목 생성 아이디(DB에서 조회된 항목 id와 다를 수 있다.) 기준으로 DB 정보 폼 조회 위해
		};
		
		$.each(gridStackItems, function(idx, elem){
			var data = fnGetItemValues(elem, updateFlag); //dataList, dataListMap
			
			datas["dataList"].push(data);
			datas["dataListMap"][data["itemId"]] = data;
			//datas["dataList"] = datas["dataList"].concat(data["dataList"]);
			//datas["dataListMap"] = $.extend({}, datas["dataListMap"], data["dataListMap"]);
		});
		
		return datas;
	};
	
	//Fn13. fnFindKey jsonObj value에 해당하는 key 값 찾아 반환
	/* *
	 * function 명 : fnFindKey
	 * function 설명 : value에 해당하는 key 값 찾아 반환
	 * param : jsonObj - 1 depth에서만 찾는다.
	 * param : value
	 * */
	const fnFindKey = function(jsonObj, value){
		let rtnVal = ""; //key
		$.each(Object.keys(jsonObj), function (idx, key){
			if(jsonObj[key] == value){
				rtnVal = key;
				return false; //종료
			}
		});
		
		return rtnVal;
	};
	
	//Fn14. fnFindConfCheckOpt confCheckOpt에서 value 가져오기
	/* *
	 * function 명 : fnFindConfCheckOpt
	 * function 설명 : confCheckOpt에서 value 가져오기
	 * param : key
	 * */
	const fnFindConfCheckOpt = function(key){
		let rtnVal = ""; //key
		
		//nomal, data, grid와 같은 1depth
		$.each(Object.keys(confCheckOpt), function (idx, type){
			if(confCheckOpt[type].hasOwnProperty(key)){
				if(type == "data"){
					rtnVal = "data-"+confCheckOpt[type][key];
				}else{
					rtnVal = confCheckOpt[type][key];
				}
				
				//each 종료
				return false;
			}
		});

		return rtnVal;
	};
	
	//Fn15. fnFindConfCheckOptVal confCheckOpt에서 value 찾아 객체에서 값 가져오기
	/* *
	 * function 명 : fnFindConfCheckOptVal
	 * function 설명 : confCheckOpt에서 value 찾아 객체에서 값 가져오기
	 * param : targetElem
	 * param : key
	 * */
	const fnFindConfCheckOptVal = function(targetElem, key){
		let dataVal = "";
		let optNm = fnFindConfCheckOpt(key);

		return $(targetElem).attr(optNm);
	};
	
	
	//Fn16. fnGetItemInputValuesByForm 지정 영역에서 아이템을 찾아 입력 값 가져오기
	/* *
	 * function 명 : fnGetItemInputValuesByForm
	 * function 설명 : 지정 영역에서 아이템을 찾아 입력 값 가져오기
	 * param formId : grid-stack 항목 추출을위한 영역 id 값(# 제외)
	 * */
	const fnGetItemInputValuesByForm = function (formId) {
		//지정 영역에서 item 가져오기
		var gridStackItems = $("#"+formId).find(".osl-evt__grid-stack-item");
		
		/* 만들어야 하는 폼
		datas = {
			tplItemValListInfo : [], //값
			tplItemValUnderListInfo : [], //태그
			fileListCnt*tplItemId* : 0, //첨부파일 시리얼 넘버
			fileList*tplItemId* : [], //첨부파일 리스트
		};
		*/
		var datas = {
				tplItemValListInfo: [],
				tplItemValUnderListInfo: [],
		};
		
		$.each(gridStackItems, function(idx, elem){
			//1차로 설정 값 가져오기
			var data = $.extend({}, fnGetItemValues(elem, false));
			
			//순차적으로 입력값 가져오기
			var itemCode = String(data["itemCode"]);
			//단순 텍스트 표출
			if(itemCode == "01"){
				//itemOptionVal을 itemVal 동일하게
				data["itemVal"] = String($(elem).find(".osl-evt__template-item").html());
			}
			//텍스트 영역이면
			else if(itemCode == "03"){
				data["itemVal"] =$(elem).find(".osl-evt__template-item").summernote("code");
			}
			//체크박스이면
			else if(itemCode == "08"){
				if($(elem).find(".osl-evt__template-item").is(":checked")){
					data["itemVal"] = "01";
				}else{
					data["itemVal"] = "02";
				}
			}
			//사용자이면
			else if(itemCode == "09"){
				data["itemVal"] = $(elem).find(".osl-evt__template-item").val();
				data["itemHiddenVal"] = $("#"+$(elem).find(".osl-evt__template-item").data("hidden-id")).val();
				data["itemImgId"] = $("#"+$(elem).find(".osl-evt__template-item").attr("id")+"UsrImgId").val();
			}
			//조직이면
			else if(itemCode == "11"){
				data["itemVal"] = $(elem).find(".osl-evt__template-item").val();
				data["itemHiddenVal"] = $("#"+$(elem).find(".osl-evt__template-item").data("hidden-id")).val();
			}
			//그 외
			else {
				data["itemVal"] = $(elem).find(".osl-evt__template-item").val();
			}
			
			//1. 값에 넣기
			datas["tplItemValListInfo"].push(data);
			
			//2. 정보자산이면 태그 데이터 추가
			if(itemCode == "15"){
				$.each($(elem).find(".osl-evt__tag-form tag"), function(num, tag){
					//깊은 복사 위해
					var tagData = $.extend({}, data, data);
					
					tagData["itemVal"] = $(tag).data("item-value");
					tagData["itemHiddenVal"] = $(tag).attr("value");
					tagData["underItemOrd"] = $(tag).data("under-item-ord");
					//태그 정보 추가
					datas["tplItemValUnderListInfo"].push(tagData);
				});
			}
		});
		
		return datas;
	};
	
	//Fn17. fnSetTemplate 양식 항목 폼 그리고 항목 값 넣기(Fn03, Fn04, Fn05)
	/* *
	 * function 명 : fnSetTemplate
	 * function 설명 : 양식 항목 폼 그리고 항목 값 넣기
	 * param usrConfig
	 * */
	const fnSetTemplate = function (usrConfig){
		let targetConfig = fnExtendConfig(usrConfig);
		var callbackMap = $.extend({},targetConfig.callback);
		delete targetConfig.callback;
		
		var ajaxDone;
		var resultDatas;
		
		//타겟 아이디 값 저장
		if(!$.osl.isNull(targetConfig["gridStack"]["addDivId"])){
			$("#"+targetConfig["gridStack"]["addDivId"]).data("target-id", targetConfig["targetId"]);
		}
		if(!$.osl.isNull(targetConfig["gridStack"]["removeDivId"])){
			$("#"+targetConfig["gridStack"]["removeDivId"]).data("target-id", targetConfig["targetId"]);
		}
		//그린 유형
		if(!$.osl.isNull(targetConfig["gridStack"]["addDivId"])){
			$("#"+targetConfig["gridStack"]["addDivId"]).data("type", targetConfig["type"]);
		}
		if(!$.osl.isNull(targetConfig["gridStack"]["removeDivId"])){
			$("#"+targetConfig["gridStack"]["removeDivId"]).data("type", targetConfig["type"]);
		}
		
		//전달 받은 targetId가 없거나 양식 정보 기준으로 조회한다고 한 경우,양식 정보 기준으로 조회
		if(!targetConfig.hasOwnProperty("targetId") || $.osl.isNull(targetConfig["targetId"]) || (targetConfig.hasOwnProperty("getDataType") && targetConfig["getDataType"] == "01")){
			//양식 폼 가져오기
			ajaxDone = fnGetFormData(targetConfig, function(resultData){
				resultDatas = resultData;
				
				if($.osl.isNull(resultData["tplFormListInfo"]) || resultData["tplFormListInfo"].length == 0){
					//사용자 지정 콜백 함수 있는 경우 실행
					if(callbackMap.hasOwnProperty("ajaxDone") && typeof callbackMap["ajaxDone"] == "function"){
						callbackMap["ajaxDone"](resultData);
					}
					
					//항목이 그려진 영역 타겟
					if(!$.osl.isNull(targetConfig["gridStack"]["addDivId"])){
						//fnTemplateEventSetting("#"+targetConfig["gridStack"]["addDivId"], targetConfig).afterCreateHtml("#"+targetConfig["gridStack"]["addDivId"], targetConfig);
						
						//데이터 없음 표출
						$("#"+targetConfig["gridStack"]["addDivId"]).html('<div class="text-center osl-evt__template-no-items my-5">'+targetConfig["noData"]+'</div>');
					}
					//사용자 지정 콜백 함수 있는 경우 실행
					if(callbackMap.hasOwnProperty("afterLast") && typeof callbackMap["afterLast"] == "function"){
						callbackMap["afterLast"](resultDatas);
					}
					
					return false;
				}
				
				//전달 받은 targetId가 없거나 양식 정보 기준으로 조회한다고 한 경우,양식 정보 기준으로 조회
				//그리기 시작
				fnSetForm(resultDatas, targetConfig);
				
				//값 조회
				fnGetFormDataValues(targetConfig, function(returnData){
					resultDatas = resultData;
					
					//사용자 지정 콜백 함수 있는 경우 실행
					if(callbackMap.hasOwnProperty("ajaxDone") && typeof callbackMap["ajaxDone"] == "function"){
						callbackMap["ajaxDone"](resultData);
					}
					
					//값 넣기
					fnSetItemValues(returnData, targetConfig);
					
					//사용자 지정 콜백 함수 있는 경우 실행
					if(callbackMap.hasOwnProperty("afterLast") && typeof callbackMap["afterLast"] == "function"){
						callbackMap["afterLast"](resultDatas);
					}
				});
			});
		}
		//입력 정보 기준으로 조회
		else{
			//양식 폼+값 가져오기 - 입력 값 기준
			ajaxDone = fnGetFormDataValues(targetConfig, function(resultData){
				resultDatas = resultData;
				
				if($.osl.isNull(resultData["tplItemValListInfo"]) || resultData["tplItemValListInfo"].length == 0){
					//사용자 지정 콜백 함수 있는 경우 실행
					if(callbackMap.hasOwnProperty("ajaxDone") && typeof callbackMap["ajaxDone"] == "function"){
						callbackMap["ajaxDone"](resultData);
					}
					
					//항목이 그려진 영역 타겟
					if(!$.osl.isNull(targetConfig["gridStack"]["addDivId"])){
						//데이터 없음 표출
						$("#"+targetConfig["gridStack"]["addDivId"]).html('<div class="text-center osl-evt__template-no-items my-5">'+targetConfig["noData"]+'</div>');
					}
					//사용자 지정 콜백 함수 있는 경우 실행
					if(callbackMap.hasOwnProperty("afterLast") && typeof callbackMap["afterLast"] == "function"){
						callbackMap["afterLast"](resultDatas);
					}
					return false;
				}
				
				//그리기 시작
				fnItemHtml(resultData["tplItemValListInfo"], targetConfig);
				
				//사용자 지정 콜백 함수 있는 경우 실행
				if(callbackMap.hasOwnProperty("ajaxDone") && typeof callbackMap["ajaxDone"] == "function"){
					callbackMap["ajaxDone"](resultData);
				}
				
				//값 넣기
				fnSetItemValues(resultData, targetConfig);
				
				//사용자 지정 콜백 함수 있는 경우 실행
				if(callbackMap.hasOwnProperty("afterLast") && typeof callbackMap["afterLast"] == "function"){
					callbackMap["afterLast"](resultDatas);
				}
			});
		}
		ajaxDone["returnDatas"] = resultDatas;
		
		return ajaxDone;
	};
	
	//Fn18. fnGridStackInit (단건)그리드 스택 세팅 및 이벤트 핸들러 적용
	/* *
	 * function 명 : fnGridStackInit
	 * function 설명 : 그리드 스택 세팅 및 이벤트 지정
	 * param gridStackConfig : 그리드 스택 옵션
	 * param selector
	 * */
	const fnGridStackInit = function(gridStackConfig, selector){
		var options = $.extend({}, defaultGridStackOpts, gridStackConfig);
		
		//그리드 스택 세팅
		var rtnObject = GridStack.init(options, selector);
		//그리드 스택 아이디
		var gridStackId = rtnObject.el.id;
		//반응형을 위한 보관
		if(!$.osl.templateForm.gridStack.list.hasOwnProperty(gridStackId)){
			$.osl.templateForm.gridStack.list[gridStackId] = rtnObject;
		}
		gridStackEvt(rtnObject, options).init();
		
		//selector 기준 해당 영역에 이벤트 지정
		fnTemplateEventSetting(selector, options).fnCreateDefatultItemEvt();
		
		return rtnObject;
	};
	
	//Fn19. fnGridStackInitAll (다건)그리드 스택 세팅 및 이벤트 핸들러 적용
	/* *
	 * function 명 : fnGridStackInitAll
	 * function 설명 : 그리드 스택 세팅 및 이벤트 지정
	 * param gridStackConfig : 그리드 스택 옵션
	 * param selector
	 * */
	const fnGridStackInitAll = function(gridStackConfig, selector){
		var options = $.extend({}, defaultGridStackOpts, gridStackConfig);
		
		//그리드 스택 세팅
		var rtnObjects = GridStack.initAll(options, selector);
		
		$.each(rtnObjects, function(idx, rtnObject){
			//그리드 스택 아이디
			var gridStackId = rtnObject.el.id;
			
			//반응형을 위한 보관
			if(!$.osl.templateForm.gridStack.list.hasOwnProperty(gridStackId)){
				$.osl.templateForm.gridStack.list[gridStackId] = rtnObject;
			}
			gridStackEvt(rtnObject, options).init();
		});
		
		//selector 기준 해당 영역에 이벤트 지정
		fnTemplateEventSetting(selector, options).fnCreateDefatultItemEvt();
		
		return rtnObjects;
	};
	
	//Fn20. fnResetTabIndex 양식을 모두 그린 후에 탭인덱스 다시 설정
	/* *
	 * function 명 : fnResetTabIndex
	 * function 설명 : 양식을 모두 그린 후에 탭인덱스 다시 설정
	 * param formId : 탭인덱스 다시 지정할 formId
	 * */
	const fnResetTabIndex = function(formId){
		if($.osl.isNull(formId)){
			//전달 받은 formId가 없으면 
			var targetElem;
			// 1. popup
			if($(".modal.show").length > 0){
				//현재 열려있는 화면 중 최 상단에 있는 popup 찾기
				targetElem = $($(".modal.show")[0]);
			}else{
				// 2. backpage
				targetElem = $(".kt-content");
			}
			formId = targetElem.attr("id");
		}
		
		//탭인덱스 지정할 객체 찾기
		var elems = $("#"+formId).find("input:not(:hidden,.d-none,.osl-elem-hide,.osl-tree),div.osl-tab,.card-header>.card-toolbar>button,.note-editable>p");
		
		//순차적으로 탭인덱스 지정
		$.each(elems, function(idx, elem) { 
			//$(elem).attr('tabindex', idx + 1); 
			$(elem).attr('tabindex', 0); 
		});
	};
	
	//Fn21. fnItemHeightSize 아이템 생성 후 표출 영역 높이 계산
	/* *
	 * function 명 : fnItemHeightSize
	 * function 설명 : 아이템 생성 후 표출 영역 높이 계산
	 * param target : osl-evt__grid-stack-item
	 * param optHeight : grid stack setting시 설정한 cellHeight 값
	 * */
	const fnItemHeightSize = function(target, optHeight){
		var itemCode = String(fnFindConfCheckOptVal($(target), "itemCode"));
		//텍스트 영역 summernote
		if(itemCode == "03"){
			summernoteHeightSize(target, optHeight);
		}
		//체크 리스트
		else if(itemCode == "08"){
			optionHeightSize(target, optHeight);
		}
		//사용자 항목 - 서비스 항목이면 높이 조절 필요
		else if(itemCode == "09"){
			fnServiceItemHeightSize(target, optHeight);
		}
		//정보자산(태그 영역만 존재하는 경우가 있어서)
		else if(itemCode == "15"){
			//TPL00001 양식 분류 : 01정보자산 02보안 03기본항목 04보안사고 05자료관리
			var tplClsType = String(fnFindConfCheckOptVal(target, "tplClsType"));
			
			//다중선택 가능 여부
			var multiSelCd = fnFindConfCheckOptVal(target, "itemMultiSelCd");
			
			if("02" == tplClsType || "03" == tplClsType || ("01" == tplClsType && "01" == multiSelCd)){
				//정보자산 태그
				fnCimItemHeightSize(target, optHeight);
			}
		}
	};
	
	//Fn22. fnCimItemHeightSize 정보자산 태그 표출 영역 높이 계산
	/* *
	 * function 명 : fnCimItemHeightSize
	 * function 설명 : 정보자산 태그 표출 영역 높이 계산
	 * param target : item 부모인 grid stack
	 * param optHeight : grid stack setting시 설정한 cellHeight 값
	 * */
	const fnCimItemHeightSize = function(target, optHeight){
		var elem = $(target).find(".osl-evt__grid-stack-item-content .osl-evt__tag-form");
		var targetInfo = fnGetItemValues($(target), true);
		if(elem.length>0){
			//정보자산의 단건 항목이 아닌 모든 유형의 detail일 때
			if(targetInfo["configType"] == "detail" && !(targetInfo["tplClsType"] == "01" && targetInfo["itemMultiSelCd"] == "02")){
				elem[0].style.height = (parseInt(targetInfo["itemHeight"])*optHeight-55)+"px";
				elem.attr("data-kt-scroll-height", "{default:'"+(parseInt(targetInfo["itemHeight"])*optHeight-55)+"px'}");
			}
			else{
				elem[0].style.height = (parseInt(targetInfo["itemHeight"])*optHeight-110)+"px";
				elem.attr("data-kt-scroll-height", "{default:'"+(parseInt(targetInfo["itemHeight"])*optHeight-110)+"px'}");
			}
		}
	};
	
	//Fn22-01. fnServiceItemHeightSize 서비스 항목 - 사용자 리스트 표출 영역 높이 계산
	/* *
	 * function 명 : fnServiceItemHeightSize
	 * function 설명 : 사용자 리스트 표출 영역 높이 계산
	 * param target : item 부모인 grid stack
	 * param optHeight : grid stack setting시 설정한 cellHeight 값
	 * */
	const fnServiceItemHeightSize = function(target, optHeight){
		var elem = $(target).find(".osl-evt__grid-stack-item-content .osl-evt__template-item--user-list");
		var targetInfo = fnGetItemValues($(target), true);
		if(elem.length>0){
			//서비스 항목이면
			if(targetInfo["tplEssentialItem"] == "01" && targetInfo["itemMultiSelCd"] == "01"){
				//모든 유형의 detail일 때 - 추가 버튼 없음
				if(targetInfo["configType"] == "detail"){
					elem[0].style.height = (parseInt(targetInfo["itemHeight"])*optHeight-80)+"px";
					elem.attr("data-kt-scroll-height", "{default:'"+(parseInt(targetInfo["itemHeight"])*optHeight-80)+"px'}");
				}
				else{
					elem[0].style.height = (parseInt(targetInfo["itemHeight"])*optHeight-140)+"px";
					elem.attr("data-kt-scroll-height", "{default:'"+(parseInt(targetInfo["itemHeight"])*optHeight-140)+"px'}");
				}
			}
		}
	};
	
	//Fn23. summernoteHeightSize summernote 텍스트 영역 높이 계산
	/* *
	 * function 명 : summernoteHeightSize
	 * function 설명 : summernote 텍스트 영역 height 계산
	 * param target : summernote 대상 부모인 grid stack
	 * param optHeight : grid stack setting시 설정한 cellHeight 값
	 * */
	const summernoteHeightSize= function (target, optHeight){
		//해당 grid stack 내부에 있는 summernote 내용 영역
		var heightTarget = $(target).find('.note-editable');
		//grid stack의 gs-h 값과 cell의 높이값을 곱해 사용자가 지정한 높이값을 계산 ( height만 가져오면 사용자 설정값 이전 초기 세팅값이 찍힘 )
		var targetGridStackHeight = parseInt($(target).attr('gs-h')) * (optHeight-10);
		//해당 grid stack 내부에 있는 summernote toolabr height값 ( 반응형으로 인해toolbar height가 계속 변동 )
		var targetToolbarHeight = $(target).find('.note-toolbar').outerHeight();
		if($.osl.isNull(targetToolbarHeight) || targetToolbarHeight == 0){
			//toolbar가 있는데 조회 당시 높이가 0으로 측정되는 경우
			//width에 따라 지정(오차가 있으나 평균 값으로 지정)
			var itemWidth = 0;
			$.each($(target).parents(), function(idx, elem){
				if($(elem).outerWidth() != 0){
					itemWidth = $(elem).outerWidth();
					return false;
				}
			});
			if(itemWidth >= 691){
				targetToolbarHeight = 54;
			}else if(itemWidth >= 423){
				targetToolbarHeight = 88;
			}else {
				targetToolbarHeight = 125;
			}
		}
		//사용자가 읽기전용으로 toolbar를 표출하지 않았을 경우 높이 변경
		if($.osl.isNull(targetToolbarHeight)||$(target).find('.note-toolbar').length == 0||$(target).find('.note-toolbar').css('display')=='none'){
			targetToolbarHeight = -35;
		}
		//내용 영역에 (전체 높이 - 툴바 높이 - 여백,라벨,valid massge,오차범위-90-) 값을 넣어줌
		$(heightTarget).outerHeight(targetGridStackHeight - targetToolbarHeight - 75);
	};
	
	//Fn24. optionHeightSize 옵션 리스트 영역 높이 계산
	/* *
	 * function 명 : optionHeightSize
	 * function 설명 : 옵션 리스트 영역 높이 계산
	 * param target : item 부모인 grid stack
	 * param optHeight : grid stack setting시 설정한 cellHeight 값
	 * */
	const optionHeightSize = function (target, optHeight){
		var elem = $(target).find(".osl-evt__grid-stack-item-content .osl-evt__template-item--check-list");
		var targetInfo = fnGetItemValues($(target), true);
		if(elem.length>0){
			//모든 유형의 detail일 때
			if(targetInfo["configType"] == "detail"){
				elem[0].style.minHeight = (parseInt(targetInfo["itemHeight"])*optHeight-55)+"px";
				elem.attr("data-kt-scroll-height", "{default:'"+(parseInt(targetInfo["itemHeight"])*optHeight-55)+"px'}");
			}
			else if(targetInfo["configType"].indexOf("draw") == -1){
				elem[0].style.minHeight = (parseInt(targetInfo["itemHeight"])*optHeight-58)+"px";
				elem.attr("data-kt-scroll-height", "{default:'"+(parseInt(targetInfo["itemHeight"])*optHeight-58)+"px'}");
			}
			else{
				elem[0].style.minHeight = (parseInt(targetInfo["itemHeight"])*optHeight-66)+"px";
				elem.attr("data-kt-scroll-height", "{default:'"+(parseInt(targetInfo["itemHeight"])*optHeight-66)+"px'}");
			}
		}
	};
	
	//Fn25. gridStackEvt 그리드 스택 자체 이벤트
	//그리드 스택 이벤트 제어 추가
	const gridStackEvt = function(gridStack, options){
		//지정 영역에 들어오고, 변경되었을 때
		const fnInGridStack = function(gridStack, options){
			//function list
			const fnList = ["added", "change", "resizestart", "resizestop", "dragstart", "dragstop", "removed"];
			const customList = Object.keys(options["custom"]);
			
			$.each(fnList, function(idx, fnCallNm){
				//빈 function이 아닐 때
				if(options.hasOwnProperty(fnCallNm) && typeof options[fnCallNm] == "function" && options[fnCallNm] != $.noop){
					gridStack.on(fnCallNm, options[fnCallNm]);
				}
			});
			$.each(customList, function(idx, fnCallNm){
				//빈 function이 아닐 때
				if(typeof options["custom"][fnCallNm] == "function" && options["custom"][fnCallNm] != $.noop){
					gridStack.on(fnCallNm, options["custom"][fnCallNm]);
				}
			});
			
			//자체 실행
			gridStack.on("added", function(evt, items){
				//해당 영역에 그려진 있으면 제거
				if($(gridStack.el).find(".osl-evt__grid-stack-item").length == 0){
					//데이터 없음 표출
					$(gridStack.el).html('<div class="text-center osl-evt__template-no-items my-5">'+config["noData"]+'</div>');
				}
				else{
					//데이터 없음 표출 제거
					$(gridStack.el).find(".osl-evt__template-no-items").remove();
				}
				
				//console.log("자체실행 added",options);
				$.each(items, function(idx, item){
					var itemInfo = fnGetItemValues($("#"+item.id), false);
					
					//상태 상관 없이
					//TPL00012
					//텍스트 항목의 경우
					if(String(itemInfo["itemCode"]) == "02"){
						var textPlaceHolder = "";
						if(!$.osl.isNull(itemInfo["itemRegexCd"]) && itemInfo["itemRegexCd"] != "-1"){
							textPlaceHolder = $.osl.lang("commonCode.TPL00012.subCode"+itemInfo["itemRegexCd"]);
						}
						
						if(!$.osl.isNull(textPlaceHolder)){
							//placeholder
							fnSetOptValue($("#"+itemInfo["itemId"]), "placeholder", textPlaceHolder);
						}
					}
					
					
					//입력 가능한 상태
					if(["drawItem", "drawForm", "detail"].indexOf(itemInfo["configType"]) == -1 ){
						//수정이력에 포함시키기 위해
						if(itemInfo.hasOwnProperty("modifySetCd")){
							fnSetItemModifyOptValue($("#"+item.id), "modifySetCd", "01");
							//알림이면
							if(String(itemInfo["itemCode"]) == "14"){
								fnSetItemModifyOptValue($("#"+item.id+"-sub"), "modifySetCd", "01");
							}
						}
						
						//서비스 항목인 경우
						if(itemInfo["tplEssentialItem"] == "01"){
							//등록인 경우에만 사용자 정보 default 넣어두기
							if(itemInfo["configType"] == "insert"){
								var currentUsrInfo = null;
								try{
									currentUsrInfo = $.osl.user.userInfo;
									//외부 사용자는 정보가 없으므로
									if($.osl.isNull(currentUsrInfo.usrId)){
										currentUsrInfo = null;
									}
								}catch(e){}
								
								
								//서비스 항목 - 사용자 리스트 표출 영역
								var multiUsrListDiv = $("#"+item.id).find(".osl-evt__template-item--user-list");
								
								//로그인 사용자 기본 정보 추가
								if(!$.osl.isNull(currentUsrInfo) && String(itemInfo["itemCode"]) == "09"){
									//단, 최근 교육 이수한 경우에만
									if(currentUsrInfo["currEduFinCd"] == "01"){
										var usrMap = {
											"usrId" : currentUsrInfo.usrId
											,"usrNm" : currentUsrInfo.usrNm
											,"deptId" : currentUsrInfo.deptId
											,"deptName" : currentUsrInfo.deptName
											,"retireYn" : currentUsrInfo.retireYn
										};
										
										//항목 반환
										var rowHtml = fnServiceUsrListItemHtmlStr(itemInfo["configType"], usrMap);
										
										var rowElem = $(rowHtml);
										rowElem.data("usr-id", usrMap["usrId"]);
										rowElem.data("usr-name", usrMap["usrNm"]);
										rowElem.data("dept-id", usrMap["deptId"]);
										rowElem.data("dept-name", usrMap["deptName"]);
										rowElem.data("chg-dept", usrMap["chgDeptYn"]);
										rowElem.data("retire", usrMap["retireYn"]);
										rowElem.data("apply", usrMap["applyCd"]);
										multiUsrListDiv.append(rowElem);
										var usrListMap = {};
										usrListMap[usrMap["usrId"]] = usrMap;
										multiUsrListDiv.data("user-list", JSON.stringify(usrListMap));
										
										var badgeElem = $("#"+item.id).siblings(".osl-evt__grid-stack-item-label").find(".osl-evt__multi-usr-cnt");
										//사용자 수 뱃지 표출
										badgeElem.text(`
											1 / ${fnFindConfCheckOptVal($("#"+item.id).closest(".osl-evt__grid-stack-item-content"), "itemSelUsrMaxVal")}
										`);
									}
									else{
										var badgeElem = $("#"+item.id).siblings(".osl-evt__grid-stack-item-label").find(".osl-evt__multi-usr-cnt");
										//사용자 수 뱃지 표출
										badgeElem.text(`
											0 / ${fnFindConfCheckOptVal($("#"+item.id).closest(".osl-evt__grid-stack-item-content"), "itemSelUsrMaxVal")}
										`);
									}
								}
							}
						}//서비스 항목인 경우 끝
						
						//유효성 체크에 추가하기 위해
						//모든 항목에 osl-evt__exclude-item 제거
						$("#"+item.id).closest(".osl-evt__grid-stack-item").find("input,select,textarea").removeClass("osl-evt__exclude-item");
						
						//텍스트 영역
						if(String(itemInfo["itemCode"]) == "03"){
							//필수인 경우에만 validate 체크
							if(itemInfo["itemEssentialCd"] == "01"){
								fnSetOptValue($("#"+itemInfo["itemId"]), "data-editabled", "true");
							}
							else{
								fnSetOptValue($("#"+itemInfo["itemId"]), "data-editabled", "false");
							}
						}
						//체크박스일때
						else if(String(itemInfo["itemCode"]) == "08"){
							//체크 해제
							if($("#"+item.id).find(".osl-evt__template-item--check-item").length > 0){
								$("#"+item.id).find(".osl-evt__template-item--check-item[disabled]").prop("disabled", false);
							}
							
							//체크가 될 때마다 필수, 최솟값, 최댓값 확인하기
							$("#"+item.id).off("change", ".osl-evt__template-item--check-item").on("change", ".osl-evt__template-item--check-item", function(){
								var chkItemInfo = fnGetItemValues($(this).closest(".osl-evt__grid-stack-item"), true);
								//다중 체크인 경우
								if(chkItemInfo["itemMultiSelCd"] == "01"){
									//현재 체크 상태
									var checked = this.checked? true : false;
									if(checked){
										//현재 체크된 전체 갯수
										var totChecked = $(this).closest(".osl-evt__grid-stack-item").find(".osl-evt__template-item--check-item:checked").length;
										
										//항목이 선택 가능한 최대 갯수를 넘기면
										if(totChecked > chkItemInfo["itemMaxVal"]){
											//최대 N개까지만 선택이 가능합니다.
											$.osl.alert($.osl.lang("template.message.alert.selectMaxCount", chkItemInfo["itemMaxVal"]));
											//선택 되돌리기
											this.checked = !checked;
										}
									}
								}
								//다중이 아니면
								else{
									//무시
								}
							});
						}
						//아이템이 select일 때
						else if( ["10", "12"].indexOf(String(itemInfo["itemCode"])) > -1){
							$("#"+item.id).attr("disabled", false);
							
							//select2 제거하고 undisabled된 select2로 재생성
							var selectSpan = $("#"+item.id).closest(".osl-evt__grid-stack-item").find("select~span.select2");
							$(selectSpan).remove();
							
							//select2 적용
							$("#"+item.id).select2({
								//드롭다운 위치 지정
								dropdownParent: $(this).closest(".modal").length > 0 ? $(this).closest(".modal") : $("#kt_app_content"),
								//스크롤 충돌 방지
								ftScrollUse: false,
								//검색창 숨김
								minimumResultsForSearch: "Infinity",
							});
						}
						//첨부파일일 때
						else if(String(itemInfo["itemCode"]) == "13"){
							var fileUploadId = item.id;
							
							//만약 들어올 때 kt-uppy가 아닌 tpl-uppy-view가 있을수 있으므로
							if(!$("#"+fileUploadId).hasClass("kt-uppy")){
								//그리기 폼 교체
								$("#"+fileUploadId).removeClass("tpl-uppy-view").addClass("kt-uppy h-100 osl-file-list-view osl-file-list-sm");
								$("#"+fileUploadId).html(`
											<div class="kt-uppy__dashboard"></div>
											<div class="kt-uppy__progress"></div>
										`
								);
							}
						}
						//알림일 때
						else if(String(itemInfo["itemCode"]) == "14"){
							$("#"+item.id).attr("disabled", false);
							$("#"+item.id+"-sub").attr("disabled", false);
							
							//select2 제거하고 undisabled된 select2로 재생성
							var selectSpan = $("#"+item.id).closest(".osl-evt__grid-stack-item").find("select~span.select2");
							$(selectSpan).remove();
							
							//select2 적용
							$("#"+item.id).select2({
								//드롭다운 위치 지정
								dropdownParent: $(this).closest(".modal").length > 0 ? $(this).closest(".modal") : $("#kt_app_content"),
								//스크롤 충돌 방지
								ftScrollUse: false,
								//검색창 숨김
								minimumResultsForSearch: "Infinity",
							});
							
							selectSpan = $("#"+item.id+"-sub").closest(".osl-evt__grid-stack-item").find("select~span.select2");
							$(selectSpan).remove();
							
							//select2 적용
							$("#"+item.id+"-sub").select2({
								//드롭다운 위치 지정
								dropdownParent: $(this).closest(".modal").length > 0 ? $(this).closest(".modal") : $("#kt_app_content"),
								//스크롤 충돌 방지
								ftScrollUse: false,
								//검색창 숨김
								minimumResultsForSearch: "Infinity",
							});
						}
					}
					//입력 불가능한 상태
					else{
						//수정이력에서 제외하기 위해
						if(itemInfo.hasOwnProperty("modifySetCd")){
							fnSetItemModifyOptValue($("#"+item.id), "modifySetCd", "02");
							//알림이면
							if(String(itemInfo["itemCode"]) == "14"){
								fnSetItemModifyOptValue($("#"+item.id+"-sub"), "modifySetCd", "02");
							}
						}
						
						//유효성 체크에서 제외하기 위해
						//모든 항목에 osl-evt__exclude-item 추가
						$("#"+item.id).closest(".osl-evt__grid-stack-item").find("input,select,textarea").addClass("osl-evt__exclude-item");
						
						//TPL00012
						//텍스트 영역
						if(String(itemInfo["itemCode"]) == "03"){
							fnSetOptValue($("#"+item.id), "data-editabled", "false");
						}
						//체크박스일때
						else if(String(itemInfo["itemCode"]) == "08"){
							//체크 불가
							$("#"+item.id).attr("disabled", true);
						}
						//아이템이 select일 때
						else if( ["10", "12"].indexOf(String(itemInfo["itemCode"])) > -1){
							$("#"+item.id).attr("disabled", true);
							
							//select2 제거하고 disabled된 select2로 재생성
							var selectSpan = $("#"+item.id).closest(".osl-evt__grid-stack-item").find("select~span.select2");
							$(selectSpan).remove();
							
							//select2 적용
							$("#"+item.id).select2({
								//드롭다운 위치 지정
								dropdownParent: $(this).closest(".modal").length > 0 ? $(this).closest(".modal") : $("#kt_app_content"),
								//스크롤 충돌 방지
								ftScrollUse: false,
								//검색창 숨김
								minimumResultsForSearch: "Infinity",
							});
						}
						//첨부파일일 때
						else if(String(itemInfo["itemCode"]) == "13"){
							var fileUploadId = item.id;
							
							//상세 조회
							if("detail" == itemInfo["configType"]){
								$("#"+fileUploadId).removeClass("tpl-uppy-view").addClass("kt-uppy h-100 osl-file-list-view osl-file-list-sm");

								//단순 폼 그리기
								$("#"+fileUploadId).html(`
										<div class="kt-uppy__dashboard"></div>
										<div class="kt-uppy__progress"></div>
									`);
							}
							//아이템 및 폼 그리기
							else{
								if(!$.osl.isNull($.osl.file.list[fileUploadId])){
									var fileUploadObj = $.osl.file.list[fileUploadId]["targetUppy"];
									
									//가진 이벤트들 제거
									fileUploadObj.off("file-removed");
									$("#fileRemoveResetBtn_"+fileUploadId).off("click");
									
									//가진 목록에서 제거
									delete $.osl.file.list[fileUploadId];
									//파괴
									fileUploadObj.close();
								}
								
								$("#"+fileUploadId).addClass("tpl-uppy-view").removeClass("kt-uppy h-100 osl-file-list-view osl-file-list-sm");
								
								//단순 폼 그리기
								$("#"+fileUploadId).html(
									'<div class="tpl-uppy-view-inner flex-row flex-wrap">'
									+'</div>'
								);
							}
						}
						//알림일 때
						else if(String(itemInfo["itemCode"]) == "14"){
							$("#"+item.id).attr("disabled", true);
							$("#"+item.id+"-sub").attr("disabled", true);
							
							//select2 제거하고 disabled된 select2로 재생성
							var selectSpan = $("#"+item.id).closest(".osl-evt__grid-stack-item").find("select~span.select2");
							$(selectSpan).remove();
							
							//select2 적용
							$("#"+item.id).select2({
								//드롭다운 위치 지정
								dropdownParent: $(this).closest(".modal").length > 0 ? $(this).closest(".modal") : $("#kt_app_content"),
								//스크롤 충돌 방지
								ftScrollUse: false,
								//검색창 숨김
								minimumResultsForSearch: "Infinity",
							});
							
							
							selectSpan = $("#"+item.id+"-sub").closest(".osl-evt__grid-stack-item").find("select~span.select2");
							$(selectSpan).remove();
							
							//select2 적용
							$("#"+item.id+"-sub").select2({
								//드롭다운 위치 지정
								dropdownParent: $(this).closest(".modal").length > 0 ? $(this).closest(".modal") : $("#kt_app_content"),
								//스크롤 충돌 방지
								ftScrollUse: false,
								//검색창 숨김
								minimumResultsForSearch: "Infinity",
							});
						}
					}
					
					//키 맵핑 연결이면
					var keyPathBtnShow = $.osl.templateForm.gridStack.list[gridStack.el.id]["showLinkKeyBtn"];
					var keyPathBtnEvt = $.osl.templateForm.gridStack.list[gridStack.el.id]["linkKeyEvt"];
					if(keyPathBtnEvt){
						$("#"+item.id).closest(".osl-evt__grid-stack-item").find(".osl-evt__grid-stack-keypath-icon").removeClass("cursor-pointer");
					}
					if(keyPathBtnShow){
						//체크박스일 때
						if(String(itemInfo["itemCode"]) == "08"){
							//다중 선택이면(체크박스)
							if(itemInfo["itemMultiSelCd"] == "01"){
								//항목의 키맵핑 영역은 안보이기
								$("#"+item.id).closest(".osl-evt__grid-stack-item").find(".osl-evt__grid-stack-keypath-header").addClass("d-none").hide();
								$("#"+item.id).closest(".osl-evt__grid-stack-item").find(".osl-evt__grid-stack-keypath-icon:not(.osl-evt__grid-stack-keypath-header) > i").removeClass("fa-filter").addClass("fa-key");
							}
							//다중 선택이 아니면(라디오박스)
							else{
								//항목의 키맵핑 영역 보이기
								$("#"+item.id).closest(".osl-evt__grid-stack-item").find(".osl-evt__grid-stack-keypath-header").removeClass("d-none").show();
								$("#"+item.id).closest(".osl-evt__grid-stack-item").find(".osl-evt__grid-stack-keypath-icon:not(.osl-evt__grid-stack-keypath-header) > i").removeClass("fa-key").addClass("fa-filter");
							}
							
							//옵션에 대한 keyPath 영역만 보이기
							$("#"+item.id).closest(".osl-evt__grid-stack-item").find(".osl-evt__grid-stack-keypath-icon:not(.osl-evt__grid-stack-keypath-header)").removeClass("d-none").show();
						}
						//체크박스가 아닐 때
						else{
							$("#"+item.id).closest(".osl-evt__grid-stack-item").find(".osl-evt__grid-stack-keypath-icon").removeClass("d-none").show();
						}
						
						if(keyPathBtnEvt){
							$("#"+item.id).closest(".osl-evt__grid-stack-item").find(".osl-evt__grid-stack-keypath-icon").addClass("cursor-pointer");
						}
					}
					else{
						$("#"+item.id).closest(".osl-evt__grid-stack-item").find(".osl-evt__grid-stack-keypath-icon").addClass("d-none").hide();
					}
					
					//추가된 것은 플러그인 적용
					fnTemplateEventSetting("#"+gridStack.el.id, options).fnSetPlugin($("#"+item.id));
					//높이 조절
					fnItemHeightSize($("#"+item.id).closest(".osl-evt__grid-stack-item"), options["cellHeight"]);
					
					//항목 순번 재적용
					fnSetItemOptValue($("#"+item.id), "itemViewOrd", idx + 1);
				});
				
				//validate 적용
				var form = $("#"+gridStack.el.id).find("form");
				//form이 없으면
				if($.osl.isNull(form)){
					//그리드 스택 영역을 잡는다.
					form = $("#"+gridStack.el.id);
				}
				
				var formId = form.attr("id");
				//validate 생성
				$.osl.validate.setting(formId);
				
				//validate 적용시 fv-plugins-icon-container 클래스 자동 추가로 쓰레기통 아이콘 클릭이 안되기 때문에 해당 클래스 제거
				form.find(".osl-evt__template-handle, .osl-evt__template-handle > .form-group").removeClass("fv-plugins-icon-container");
				
			});
			gridStack.on("change", function(evt, items){
				//console.log("자체실행 change");
				$.each(items, function(idx, item){
					if(item.hasOwnProperty("_updating") && item["_updating"]){
						//높이 조절
						fnItemHeightSize($(item.el), options["cellHeight"]);
					
						//기본 업데이트
						fnSetItemOptValue($(item.el), "itemXpoint", String(item.x));
						fnSetItemOptValue($(item.el), "itemYpoint", String(item.y));
						fnSetItemOptValue($(item.el), "itemWidth", String(item.w));
						fnSetItemOptValue($(item.el), "itemHeight", String(item.h));
					}
					else{
						//db 기준 정보 조회
						var itemInfo = fnGetItemValues($("#"+item.id), false);
						
						//기본 업데이트
						fnSetItemOptValue($(item.el), "itemXpoint", String(itemInfo["itemXpoint"]));
						fnSetItemOptValue($(item.el), "itemYpoint", String(itemInfo["itemYpoint"]));
						fnSetItemOptValue($(item.el), "itemWidth", String(itemInfo["itemWidth"]));
						fnSetItemOptValue($(item.el), "itemHeight", String(itemInfo["itemHeight"]));
					}
				});
			});
			gridStack.on("resize", function(evt, items){
				//console.log("자체실행 resize - 크기 조절");
			});
			gridStack.on("resizestart", function(evt, items){
				//console.log("자체실행 resizestart");
			});
			gridStack.on("resizestop", function(evt, items){
				//console.log("자체실행 resizestop");
				//.osl-evt__grid-stack-item-content
				var target = $(items);
				var itemInfo = fnGetItemValues(target, true);
				
				if(itemInfo["configType"] != "drawItem" && gridStack.getColumn() != 1){
					var itemCode = String(itemInfo["itemCode"]);
					var w = parseInt(itemInfo["itemWidth"]);
					var h = parseInt(itemInfo["itemHeight"]);
					
					//단순 텍스트 영역
					if(itemCode == "01"){
						//너비 최소 4 고정
						if(w < 4){
							w = 4;
						}
					}
					//높이 조절 가능
					//텍스트 영역
					else if(itemCode == "03"){
						//너비 최소 4 고정
						if(w < 4){
							w = 4;
						}
						//높이 최소 4 고정
						if(h < 4){
							h = 4;
						}
					}
					//체크박스
					else if(itemCode == "08"){
						//너비 최소 3 고정
						if(w < 3){
							w = 3;
						}
						//높이 최소 2 고정
						if(h < 2){
							h = 2;
						}
					}
					//첨부파일
					else if(itemCode == "13"){
						//너비 최소 4 고정
						if(w < 4){
							w = 4;
						}
						//높이 최소 2 고정
						if(h < 2){
							h = 2;
						}
					}
					//정보자산의 경우, 단건 아닌 다건일 땐 최소 높이 2로
					//정보자산 유형이 아닌 다른 유형에서의 정보자산 아이템으면 무조건 다건이므로 최소 높이 2로
					else if (itemCode == "15" && !(itemInfo["tplClsType"] == '01' && $(target).parents(".osl-evt__grid-stack-item").data("multi-sel-cd") == '02')){
						//너비 최소 4 고정
						if(w < 4){
							w = 4;
						}
						
						//높이 최소 2 고정
						if(h < 2){
							h = 2;
						}
					}
					//그 외
					else{
						//너비 최소 4 고정
						if(w < 4 && itemCode != "14"){
							w = 4;
						}
						else if(w < 6 && itemCode == "14"){
							w = 6;
						}
						
						//반응형으로 인해 최소 화면일 땐 컬럼이 1로 강제 고정되어 있으므로
						//알림 설정의 경우 높이 조절 최대 2로 가능해야 함
						if(gridStack.getColumn() != 1 && itemCode == "14"){
							//최대 높이 2
							if(h > 2){
								h = 2;
							}
							
							//알림 기간이 숨겨져 있으면
							if(target.find(".osl-evt__grid-stack-item-alarm div.d-none").length > 0){
								//최대 높이 1
								if(h > 1){
									h = 1;
								}
							}
						}
						//서비스 항목 - 사용자 다건 추가일 때
						else if(itemInfo["tplEssentialItem"] == "01" && itemInfo["itemMultiSelCd"] == "01"){
							//사용자이면
							if(itemCode == "09"){
								//너비 최소 6 고정
								if(w < 6){
									w = 6;
								}
								
								//높이 최소 3 고정
								if(h < 3){
									h = 3;
								}
							}
							//기간이면
							else if(itemCode == "06"){
								//너비 최소 4 고정
								if(w < 4){
									w = 4;
								}
								
								//높이 최대 1 고정
								if(h > 1){
									h = 1;
								}
							}
						}
						//그 외 해당되지 않을 때
						else {
							//높이 최대 1 고정
							if(h > 1){
								h = 1;
							}
						}
					}
					
					//기본 업데이트
					fnSetItemOptValue(target, "itemWidth", String(w));
					fnSetItemOptValue(target, "itemHeight", String(h));
					gridStack.update(target[0], {w:w, h:h});
					
					//아이템 높이 설정(summernote, 정보자산 태그 목록영역)
					$.osl.templateForm.ItemHeightSize(target, options["cellHeight"]);
					
					gridStack.save();
					//여백 없이 재정렬
					//gridStack.compact();
				}
			});
			gridStack.on("dragstart", function(evt, items){
				//console.log("자체실행 dragstart");
			});
			gridStack.on("dragstop", function(evt, item){
				//console.log("자체실행 dragstop", item);
			});
			gridStack.on("removed", function(evt, items){
				//console.log("자체실행 removed"); 
				/*
				 * 만약 A그리드에서 B그리드로 이동 될 경우
				 * B그리드의 added 다음에 A그리드의 removed가 실행된다.
				 */
				$.each(items, function(idx, item){
					//완전 삭제되어 후처리 될 아이템이 없는 경우
					if($("#"+item.id).length == 0){
						//건너뛰기
						return;
					}
					
					var itemInfo = fnGetItemValues($("#"+item.id).closest(".osl-evt__grid-stack-item"), true);
					
					//알림과 연결된 기간 삭제시
					if(String(itemInfo["itemCode"]) == "06" && itemInfo["itemAlarmUseCd"] == "01"){
						//알림, 사용자 위젯도 제거
						var alarmElem = $(`#${gridStack.el.id} .osl-evt__grid-stack-item[${fnFindConfCheckOpt("itemCode")}='14']`);
						var alarmUsrElem = $(`#${gridStack.el.id} .osl-evt__grid-stack-item[${fnFindConfCheckOpt("itemCode")}='09'][${fnFindConfCheckOpt("itemAlarmUseCd")}='01']`);
						
						if(!$.osl.isNull(alarmElem) && alarmElem.length > 0 ){
							gridStack.removeWidget(alarmElem[0]);
							alarmElem.remove();
						}
						if(!$.osl.isNull(alarmUsrElem) && alarmUsrElem.length > 0 ){
							gridStack.removeWidget(alarmUsrElem[0]);
							alarmUsrElem.remove();
						}
					}
					//알림은 아래 로직에 해당되지 않으므로 건너뛰기
					if(String(itemInfo["itemCode"]) == "14"){
						return;
					}
					if(["09", "10"].indexOf(String(itemInfo["itemCode"]))>-1 && itemInfo["itemAlarmUseCd"] == "01"){
						//연결되어 제거된 알림, 사용자, 기간 내/외 인경우 아래 로직에 해당되지 않으므로 건너뛰기
						return;
					}
					
					//항목의 유형을 수정 불가를 위해 drawItem으로 변경
					fnSetItemOptValue($("#"+item.id).closest(".osl-evt__grid-stack-item"), "configType", "drawItem");
					itemInfo["configType"] = "drawItem";
					
					//입력 불가능한 상태이어야 하므로 들어온 항목 유형에 따라 이벤트 처리
					if(["drawItem", "drawForm", "detail"].indexOf(itemInfo["configType"]) > -1 ){
						//아이템이 체크박스일 때
						if(String(itemInfo["itemCode"]) == "08"){
							$("#"+item.id).attr("disabled", true);
						}
						//아이템이 select일 때
						if( ["10", "12"].indexOf(String(itemInfo["itemCode"])) > -1){
							$("#"+item.id).attr("disabled", true);
							
							//select2 제거하고 disabled된 select2로 재생성
							var selectSpan = $("#"+item.id).closest(".osl-evt__grid-stack-item").find("select~span.select2");
							$(selectSpan).remove();
							
							//select2 적용
							$("#"+item.id).select2({
								//드롭다운 위치 지정
								dropdownParent: $(this).closest(".modal").length > 0 ? $(this).closest(".modal") : $("#kt_app_content"),
								//스크롤 충돌 방지
								ftScrollUse: false,
								//검색창 숨김
								minimumResultsForSearch: "Infinity",
							});
						}
						//첨부파일일 때
						else if(String(itemInfo["itemCode"]) == "13"){
							var fileUploadId = item.id;
							
							if(!$.osl.isNull($.osl.file.list[fileUploadId])){
								var fileUploadObj = $.osl.file.list[fileUploadId]["targetUppy"];
								
								//가진 이벤트들 제거
								fileUploadObj.off("file-removed");
								$("#fileRemoveResetBtn_"+fileUploadId).off("click");
								
								//가진 목록에서 제거
								delete $.osl.file.list[fileUploadId];
								//파괴
								fileUploadObj.close();
							}
							
							//그리기 폼 교체
							$("#"+fileUploadId).addClass("tpl-uppy-view").removeClass("kt-uppy h-100 osl-file-list-view osl-file-list-sm");
							$("#"+fileUploadId).html(
										'<div class="tpl-uppy-view-inner flex-row flex-wrap">'
										+'</div>'
							);
						}
						//아이템이 input/textarea일 때
						else {
							$("#"+item.id).attr("readonly", "readonly");
							
							//텍스트 영역일 때 summernote 해제
							if(String(itemInfo["itemCode"]) == "03"){
								if($("#"+item.id+"~.note-editor").length > 0){
									$("#"+item.id).summernote("destroy");
									$("#"+item.id).removeAttr("style");
									
									//note-editor도 제거
									$("#"+item.id+"~.note-editor").remove();
								}
								
								//해당 textarea 보이기
								$("#"+item.id).removeClass("osl-elem-hide");
							}
						}
					}
					
					//항목 순번 재적용
					fnSetItemOptValue($("#"+item.id), "itemViewOrd", idx + 1);
				});
				
				//validate 적용
				var form = $("#"+gridStack.el.id).find("form");
				//form이 없으면
				if($.osl.isNull(form)){
					//그리드 스택 영역을 잡는다.
					form = $("#"+gridStack.el.id);
				}
				var formId = form.attr("id");
				//validate 생성
				$.osl.validate.setting(formId);
				
				//해당 영역에 그려진 데이터 없으면
				if($(gridStack.el).find(".osl-evt__grid-stack-item").length == 0){
					//데이터 없음 표출
					$(gridStack.el).html('<div class="text-center osl-evt__template-no-items my-5">'+config["noData"]+'</div>');
				}else{
					//데이터 없음 표출 제거
					$(gridStack.el).find(".osl-evt__template-no-items").remove();
				}
			});
		};
		
		return {
			init: function(){
				fnInGridStack(gridStack, options);
			}
		};
	};
	
	//Handler01. fnTemplateEventSetting 그리드 스택 영역 설정 후 해당 영역에 지정된 이벤트 핸들러
	/* *
	 * function 명 : fnTemplateEventSetting
	 * function 설명 : 그리드 스택 영역 설정 후 해당 영역에 이벤트 지정
	 * param selector
	 * param options
	 * */
	const fnTemplateEventSetting = function(selector, options){
		//이벤트 제어
		const eventHandler = {
			//반응형 이벤트
			fnTemplateFormResize : function(appendDivId){
				templateReactType = true;
				let grids = $.osl.templateForm.gridStack.list;
				//1. 현재 영역 너비
				let width;
				let targetElem;
				//default 범위
				let rangeWidths = [500, 1025];
				
				$.each(grids, function(idx, grid){
					//해당 그리드 스택만 동작 해야할 경우
					if(!$.osl.isNull(appendDivId) && appendDivId != $(grid.el).attr("id")){
						return;
					}
					
					//그리드 영역에 osl-evt__tpl-non-resize-area 선언되어있으면 건너뛰기
					if($(grid.el).hasClass("osl-evt__tpl-non-resize-area")){
						return;
					}
					
					//2025.02.11 lg 반응형 없앰에 따라 임시 return 처리
					return;
					
					
					//2. 해당 영역 너비
					width = $(grid.el).width();
					if(width == 0){
						//숨겨져있어서 너비가 0으로 되면
						//부모 크기로 확인
						$.each($(grid.el).parents(), function(idx, parentElem){
							if($(parentElem).width() > 0){
								//숨겨져있지 않은 부모까지 올라감
								width = $(parentElem).width();
								return;
							}
						});
					}
					//팝업에서의 그리드스택 영역이면
					if($(grid.el).parents(".modal").length > 0){
						//모달 크기가 fullSize이면
						if($(grid.el).parents(".modal").find(".modal-dialog").hasClass("modal-fullscreen")){
							rangeWidths = [500, 992, 1025];
						}
						//모달 크기가 fullSize가 아니면
						else{
							rangeWidths = [500, 783, 1025];
						}
					}else{
						//팝업이 아니면
						rangeWidths = [500, 992, 1025];
					}
					
					//그리드 스택의 원본 cellHeight
					if(!grid["opts"].hasOwnProperty("oriCellHeight")){
						//없으면 넣어두기
						grid["opts"]["oriCellHeight"] = grid.opts.cellHeight;
					}

					//사이즈 변경
					if (width < rangeWidths[0]) {
						grid.column(1, "moveScale").cellHeight(grid["opts"]["oriCellHeight"]);
					} else if(width < rangeWidths[1]){
						//알림항목 droup 경계
						grid.column(12, "moveScale").cellHeight(grid["opts"]["oriCellHeight"]);
					} else {
						grid.column(12, "moveScale").cellHeight(grid["opts"]["oriCellHeight"]);
					}
					
					//아이템 중 알람과 사용자 항목에 대하여 자동
					$.each(grid.getGridItems(), function(idx, item){
						//아이템 정보
						var itemInfo = fnGetItemValues($(item), true);
						
						//아이템 너비
						//var itemWidth = width / parseInt(itemInfo["itemWidth"]);
						var itemWidth = $(item).closest(".osl-evt__grid-stack-item").width();
						//아직 표출되기 전이라면
						if(itemWidth == 0){
							itemWidth = width/grid.getColumn() * parseInt(itemInfo["itemWidth"]);
						}
						
						//알람인 경우 높이 조절해야 하므로
						if(String(itemInfo["itemCode"])== "14"){
							var alarmElem = $(item).find(".osl-evt__grid-stack-item-alarm");
							if(itemWidth <= rangeWidths[0]){
								alarmElem.closest(".osl-evt__grid-stack-item-content").addClass("resize");
								alarmElem.addClass("resize");
								
								//높이 2로 변경
								fnSetItemOptValue($(item), "itemHeight", "2");
								grid.update(item, {h:2});
							}else{
								alarmElem.closest(".osl-evt__grid-stack-item-content").removeClass("resize");
								alarmElem.removeClass("resize");
								
								//높이 1로 변경
								fnSetItemOptValue($(item), "itemHeight", "1");
								grid.update(item, {h:1});
							}
						}
						/*
						else if(String(itemInfo["itemCode"]) =="09"){
							//사용자 이미지 표출 유무
							//자기 자신 아이템 크기 기준
							if(itemWidth <= 300){
								$(item.el).find(".osl-evt__grid-stack-item-user").addClass("d-none");
							}else{
								$(item.el).find(".osl-evt__grid-stack-item-user").removeClass("d-none");
							}
						}
						*/
					});
					
					grid.save();
					//grid.compact();
					
					//summernote, 정보자산 태그 영역의 높이 적용
					$.each(grid.getGridItems(), function(idx, item){
						fnItemHeightSize(item, parseInt(grid.opts.cellHeight));
					});
				});
				templateReactType = false;
			},
			//항목에 맞춰 데이트피커, 공통코드, 에디터, 첨부파일 등 세팅 - 아이템 단건
			fnSetPlugin : function(item) {
				if($(item).data("osl-template-init") == "true"){
					//이미 셋팅된 것은 건너뛰기
					return true;
				}
				
				let topElem = $(item).closest(".osl-evt__grid-stack-item");
				let dbElem;
				//addWidget시 아직 껍데기가 만들어지기 전이라면
				if($.osl.isNull(topElem)){
					topElem = $(item);
					dbElem = $(item);
				}else{
					dbElem = topElem.find(".osl-evt__grid-stack-item-content");
				}
				let targetElem = topElem.find(".osl-evt__template-item");
				
				
				
				//아이템의 최신 데이터 정보 가져오기
				let itemMap = fnGetItemValues(topElem, true);
				var type = itemMap["configType"];
				
				//아이템 추가 후 항목별 세팅
				//아이템 생성 시 임시로 사용하기 위해
				var currentDay = new Date().format("yyyy-MM-dd");
				var currentDayTime = new Date().format("yyyy-MM-dd HH:mm");
				
				//텍스트 영역
				if(String(itemMap["itemCode"]) == "03"){ 
					//등록, 수정, 복사인 경우
					if( ["insert", "update", "copy", "sameTime"].indexOf(type) > -1){
						//summernote edit 세팅
						$.osl.editorSetting(itemMap["itemId"], {
							formValidate: $.osl.validate.setting(itemMap["itemId"]), 
							disableDragAndDrop: true,
							disableResizeEditor: false, 
							disabledEditor: false,
							height: '100%'
						});
					}
					//폼 그리기, 상세인 경우
					else if(type == "drawForm" || type == "detail"){
						$.osl.editorSetting(itemMap["itemId"], {
							formValidate: null, //강제
							toolbar: false,
							disableDragAndDrop: true,
							disableResizeEditor: false, 
							disabledEditor: true,
							height: '100%'
						});
					}
				}
				//날짜
				else if(String(itemMap["itemCode"]) == "04"){
					//등록, 수정, 복사인 경우 datepicker 설정 추가
					if( ["insert", "update", "copy", "sameTime"].indexOf(type) > -1){
						if(itemMap["itemModifyCd"] == "01"){
							// datepicker 세팅
							$.osl.date.datepicker(targetElem, {
									parentEl:"body"
								},
								function(defaultConfig, selected){
									let inputVal = new Date(selected.date).format('yyyy-MM-dd');
									
									targetElem.val(inputVal);
								}
							);
						}
					}
					targetElem.val(currentDay);
				}
				//일시
				else if(String(itemMap["itemCode"]) == "05"){
					//등록, 수정, 복사인 경우 datepicker 설정 추가
					if( ["insert", "update", "copy", "sameTime"].indexOf(type) > -1){
						if(itemMap["itemModifyCd"] == "01"){
							// datepicker 세팅
							$.osl.date.daterangepicker(targetElem, {
								singleDatePicker: true,
								timePicker: true,
								timePicker24Hour:true,
								autoUpdateInput:true,
								locale: { 
									format: 'YYYY-MM-DD HH:mm' 
								},
								parentEl:"body",
							});
						}
					}
					targetElem.val(currentDayTime);
				}
				//기간
				else if(String(itemMap["itemCode"]) == "06"){
					// 서비스기간 정보 표출
					targetElem.siblings('span[name="serviceRangeAlertBtn"]').hover(function(){
						var locationInfo = $(this)[0].getBoundingClientRect();
						$(this).next().css("top", locationInfo.y - 5);
						$(this).next().css("left", locationInfo.x + 20);
						$(this).next().css('display','block');
					},function(){
						$(this).next().css('display','none');
					});
					
					// 등록 수정 복사일 때 수정 가능 항목에 대해서만 datepicker 설정 추가
					if( ["insert", "copy", "sameTime"].indexOf(type) > -1 || (type == "update" && itemMap["itemModifyCd"] == "01")){
						var maxSpan = false;
						// 최대기간 설정값이 있을 경우
						if(!$.osl.isNull(itemMap.itemOptionVal) && itemMap.itemOptionVal != "-1"){
							// 선택된 공통코드의 세부 공통코드 가져오기
							var commonCodeArr = [
								{mstCd: "TPL00004", useYn: "Y", targetObj: "#"+itemMap["itemId"], comboType:"OS", notCdList:["06"]}
							];
							// AJAX 설정
							var ajaxObj = new $.osl.ajaxRequestAction(
									{"url":"/stm/stm4000/stm4000/selectStm4000MultiCommonCodeList.do"
										,"async":false,"loadingShow":false}
									,{commonCodeArr: JSON.stringify(commonCodeArr)});
							// AJAX 전송 성공 함수
							ajaxObj.setFnSuccess(function(data){
								if(data.ERROR_CODE == '-1'){
									$.osl.toastr(data.ERROR_MSG);
									return;
								}
								// 공통코드 데이터
								var commonCodeList = data.commonCodeList["#"+itemMap["itemId"]];
								$.each(commonCodeList, function(idx, data){
									if(data["subCd"] == "06"){
										return;
									}
									if(itemMap["itemOptionVal"] == data["subCd"]){
										var rangeStr = data["subCdNm"].split(" ")[1];
										// 수
										var quantity = parseInt(rangeStr.replace(/[^0-9]/g,""));
										// 단위
										var unit = rangeStr.replace(/[0-9]/g,"");
										if(unit == "주일"){
											unit = "weeks";
										}else if(unit == "개월"){
											unit = "months";
										}else if(unit == "년"){
											unit = "years";
										}else if(unit == "일"){
											unit = "days";
										}
										maxSpan = {};
										// 최대범위 설정
										maxSpan[unit] = quantity;
										return false;
									}
								});
							});
							// 조회 시작
							ajaxObj.send();
						}
						
						// datepicker 세팅
						$.osl.date.daterangepicker(targetElem, {
								timePicker: false, 
								timePicker24Hour: false,
								minDate: new Date(),
								locale: {
									format: 'YYYY-MM-DD',
									separator : " ~ ",
								},
								maxSpan:maxSpan,
								parentEl:$(selector),
								autoUpdateInput:true,
								autoApply:true,
								itemId:itemMap["itemId"],
						},function(defaultConfig, start, end, label){
							let startDate = new Date(start._d).format('yyyy-MM-dd');
							let endDate = new Date(end._d).format('yyyy-MM-dd');
							let inputVal = startDate + " ~ " + endDate;
							
							targetElem.val(inputVal);
						});
					}
					targetElem.val(currentDay + " ~ " + currentDay);
				}
				//기관
				else if(String(itemMap["itemCode"]) == "10"){
					//최초 선택된 공통코드의 세부 공통코드 가져오기
					var commonCodeArr = [
						{mstCd: "TPL00011", useYn: "Y", targetObj: "#"+itemMap["itemId"], comboType:"OS"}
					];
					var ajaxDone = $.osl.getMulticommonCodeDataForm(commonCodeArr , true, itemMap["licGrpId"]);
					ajaxDone.done(function(){
						//select2 적용
						$("#"+itemMap["itemId"]).select2({
							//드롭다운 위치 지정
							//dropdownParent: $(selector),
							//드롭다운 위치 지정
							dropdownParent: $(this).closest(".modal").length > 0 ? $(this).closest(".modal") : $("#kt_app_content"),
							//스크롤 충돌 방지
							ftScrollUse: false,
							//검색창 숨김
							minimumResultsForSearch: "Infinity",
						});
					});
				}
				//공통코드
				else if(String(itemMap["itemCode"]) == "12"){
					//최초 선택된 공통코드의 세부 공통코드 가져오기
					if($.osl.isNull(itemMap.itemOptionVal)){
						itemMap.itemOptionVal = config.gridStack.selectMstCd;
					}
					var commonCodeArr = [
						{mstCd: itemMap["itemOptionVal"], useYn: "Y", targetObj: "#"+itemMap["itemId"], comboType:"OS"}
					];
					
					var ajaxDone = $.osl.getMulticommonCodeDataForm(commonCodeArr , true, itemMap["licGrpId"]);
					ajaxDone.done(function(){
						//select2 적용
						$("#"+itemMap["itemId"]).select2({
							//드롭다운 위치 지정
							//dropdownParent: $(selector),
							//드롭다운 위치 지정
							dropdownParent: $(this).closest(".modal").length > 0 ? $(this).closest(".modal") : $("#kt_app_content"),
							//스크롤 충돌 방지
							ftScrollUse: false,
							//검색창 숨김
							minimumResultsForSearch: "Infinity",
						});
					});
				}
				//첨부파일
				else if(String(itemMap["itemCode"]) == "13"){ 
					// 추가, 수정, 복사, 상세일경우만 uppy 설정
					if( ["insert", "update", "copy", "detail", "sameTime"].indexOf(type) > -1){
						var fileUploadOpt = {
								maxFileSize: "${requestScope.fileSumMaxSize}",
								meta: {"atchFileId": "", "fileSn": 0},
								maxNumberOfFiles:20,
								height : $.osl.templateForm.gridStack.list[$(item).closest(".grid-stack")[0].id].getCellHeight() * itemMap["itemHeight"] - 55
							};
						
						//uppy 상세일 경우, 수정유무 아니오인 경우 readOnly
						if(type == "detail" || (type == "update" && itemMap["itemModifyCd"] == "02")){
							targetElem.addClass("fileReadonly");
							fileUploadOpt.isDraggingOver = false;
							fileUploadOpt.fileDownload = true;
							fileUploadOpt.fileReadonly = true;
						}
						
						//복사인 경우
						if(type == "copy"){
							fileUploadOpt.onBeforeFileAdded = function(currentFile, files){
								//복사할 때 불러온 파일인 경우 (삭제되지 않은 데이터 베이스 파일)
								if(currentFile.source == "database" && currentFile.source != "remove"){
									currentFile.meta.atchFileId = "";
									
									if(currentFile.source == "Dashboard"){
										//fileSn default
										var fileSn = fileUploadObj.getState().meta.fileSn;
										fileUploadObj.setMeta({fileSn: (fileSn + 1)});
									}
								}else if(currentFile.source != "database" && currentFile.source != "remove"){
									//새롭게 추가된 파일인 경우 기존 규칙대로 파일명 생성
									var newNm = new Date().format("ssms")+"_"+currentFile.name;
									currentFile.name = newNm;
									currentFile.meta.name = newNm;
									currentFile.meta.atchFileId = "";
									
									//fileSn default
									var fileSn = fileUploadObj.getState().meta.fileSn;
									currentFile.meta.fileSn = fileSn;
									fileUploadObj.setMeta({fileSn: (fileSn+1)});
								}
							};
						}
						// 추가/수정으로 들어온 경우
						else {
							//파일 업로드 시 건당 발생 함수
							fileUploadOpt.onBeforeFileAdded = function(currentFile, files){
								if(currentFile.source != "database" && currentFile.source != "remove"){
									var newNm = new Date().format("ssms")+"_"+currentFile.name;
									currentFile.name = newNm;
									
									//fileSn default
									var fileSn = fileUploadObj.getState().meta.fileSn;
								
									currentFile.meta.fileSn = fileSn;
									fileUploadObj.setMeta({fileSn: (fileSn+1)});
								}
							};
						}
						
						var fileUploadObj = $.osl.file.uploadSet(itemMap["itemId"], fileUploadOpt);
						//현재 fileUploadObj에 등록된 첨부파일 개수 및 용량 가져오기
						//현재 가지고 있는 파일의 용량
						var oriFilesCnt = 0;
						var oriFilesStrg = 0;
						$.each(fileUploadObj.getFiles(), function(idx, file){
							oriFilesCnt++;
							oriFilesStrg += file.size;
						});
						
						//수정 중 삭제한 파일Sn 목록
						var uploadRemoveFiles = [];
						//수정, 복사인 경우 파일 삭제 기록하기
						fileUploadObj.on('file-removed', function(file) {
							file["fileSn"] = file.meta.fileSn;
							file.source = "remove";
							uploadRemoveFiles.push(file);
							
							//삭제 취소 버튼 활성화
							$("#fileRemoveResetBtn_"+itemMap["itemId"]).removeClass("d-none");
							$.osl.file.list[itemMap["itemId"]].config.meta.removeFiles = uploadRemoveFiles;
						});
						
						//삭제 초기화 버튼 클릭 시 삭제한 파일 다시 추가
						$("#fileRemoveResetBtn_"+itemMap["itemId"]).click(function(){
							$("#fileRemoveResetBtn_"+itemMap["itemId"]).addClass("d-none");
							
							$.each(uploadRemoveFiles, function(idx, map){
								fileUploadObj.addFile({
									name: map.name,
									type: map.type,
									source: 'database',
									meta: {
										atchFileId: map.meta.atchFileId,
										fileSn: map.meta.fileSn
									},
									data: map.data,
								});
							});
							
							//삭제 파일의 용량
							var removeFilesSize = 0;
							$.each(uploadRemoveFiles, function(idx, file){
								removeFilesSize += file.size;
							});
							
							//현재 가지고 있는 파일의 용량
							var currentFilesSize = 0;
							$.each(fileUploadObj.getFiles(), function(idx, file){
								currentFilesSize += file.size;
							});
							
							//삭제 파일 + 등록된 파일이 게시글이 가지고 있던 최대 파일 개수를 넘어간다면, 또는 용량이 넘어간다면
							if((uploadRemoveFiles.length + fileUploadObj.getFiles().length > fileUploadObj.opts.restrictions.maxNumberOfFiles)
									|| ( removeFilesSize + currentFilesSize > fileUploadObj.opts.restrictions.maxFileSize*(1024*1024))){
								//목록 완전 초기화
								fileUploadObj.reset();
								$.osl.file.fileListSetting(fileUploadObj["originalFileEvt"].getOriFileList(), fileUploadObj);
								//알림창 발생
								$.osl.alert($.osl.lang("message.overFile"));
							}else{
								//삭제한 첨부파일 재추가
								/*
								$.each(uploadRemoveFiles, function(idx, map){
									fileUploadObj.setFileState(map.id);
								});
								*/
								$.each(uploadRemoveFiles, function(idx, map){
									fileUploadObj.addFile({
										name: map.name,
										type: map.type,
										source: 'database',
										meta: {
											atchFileId: map.meta.atchFileId,
											fileSn: map.meta.fileSn
										},
										data: map.data,
					 				});
								});
							}
							
							//파일 valid 다시 체크
							$.each($.osl.validate.list, function(formId){
								if($.osl.validate.list[formId]["fields"].hasOwnProperty(itemMap["itemId"])){
									$.osl.validate.list[formId].revalidateField(itemMap["itemId"]);
									return false;
								}
							});
							
							setTimeout(function(){
								//파일 preview에 click 이벤트 걸기
								$.each(fileUploadObj.getFiles(), function(idx, map){
									//database에 등록된 파일만 다운로드 가능
									if(map.source == "database"){
										var target = $("#uppy_"+$.escapeSelector(map.id)+" > .uppy-DashboardItem-preview");
										target.addClass("cursor-pointer");
										target.off("click");
										target.click(function(){
											$.osl.file.fileDownload(map.meta.atchFileId, map.meta.fileSn);
										});
									}
								});
							},2000);
							
							uploadRemoveFiles = [];
							$.osl.file.list[itemMap["itemId"]].config.meta.removeFiles = uploadRemoveFiles;
						});
					}
				}
				//알림
				else if(String(itemMap["itemCode"]) == "14"){
					//최초 선택된 공통코드의 세부 공통코드 가져오기
			 		var commonCodeArr = [
			 			{mstCd: "CMM00001", useYn: "Y", targetObj: "#"+itemMap["itemId"], comboType:"OS"},
			 			{mstCd: "TPL00005", useYn: "Y", targetObj: "#"+itemMap["itemId"]+"-sub", comboType:"OS"}
					];
					
					var ajaxDone = $.osl.getMulticommonCodeDataForm(commonCodeArr , true, itemMap.licGrpId);
					ajaxDone.done(function(){
						//select2 적용
						$("#"+itemMap["itemId"]).select2({
							//드롭다운 위치 지정
							//dropdownParent: $(selector),
							//드롭다운 위치 지정
							dropdownParent: $(this).closest(".modal").length > 0 ? $(this).closest(".modal") : $("#kt_app_content"),
							//스크롤 충돌 방지
							ftScrollUse: false,
							//검색창 숨김
							minimumResultsForSearch: "Infinity",
						});
						$("#"+itemMap["itemId"]+"-sub").select2({
							//드롭다운 위치 지정
				 			//dropdownParent: $(selector),
							//드롭다운 위치 지정
							dropdownParent: $(this).closest(".modal").length > 0 ? $(this).closest(".modal") : $("#kt_app_content"),
							//스크롤 충돌 방지
							ftScrollUse: false,
							//검색창 숨김
							minimumResultsForSearch: "Infinity",
						});
					});
				}
				//정보자산
				else if(String(itemMap["itemCode"]) == "15"){
					if( ["insert", "update", "sameTime"].indexOf(type) > -1){
						//항목이 다중 선택이 가능한 경우
						if(itemMap["itemMultiSelCd"] == "01"){
							//태그 유형
							var tagType = "cfg";
							//이력 대상
							var targetCd = "04";
							if(itemMap["tplClsType"] == "01") {
								//정보자산인 경우 05
								targetCd = "05";
							}
							
							var option = {
									tagType : tagType,
									itemNm : itemMap["itemNm"],
									targetCd : targetCd
							};
							
							$.osl.tag.setting(itemMap["itemId"], option);
						}
					}
				}
				
				//아이템의 설정 후
				fnSetOptValue($(item), "data-osl-template-init", "true");
			},
			//항목에 맞춰 데이트피커, 공통코드, 에디터, 첨부파일 등 세팅 - 여러건
			fnSetPlugins : function() {
				var items = $(selector).find(".osl-evt__grid-stack-item");
				
				$.each(items, function(idx, item){
					eventHandler.fnSetPlugin(item);
				});
			},
			//사용자 명 입력 이벤트
			fnKeyPressInUsrItem : function(){
				$(selector).on("propertychange change keyup paste input", "input.osl-evt__template-item["+fnFindConfCheckOpt("itemCode")+"='09']", function(e){
					e.stopPropagation();
					
					var topElem = $(this).closest(".osl-evt__grid-stack-item");
					var middleElem = $(this).closest(".osl-evt__grid-stack-item-content");
					var mainElem = $(this);
					
					var type = fnFindConfCheckOptVal(middleElem, "configType");
					if(type.indexOf("draw") > -1 || type == "detail"){
						return false;
					}

					//사용자 명은 특수문자 입력 불가(자동 제거)
					var usrNmInputRegex = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
					var thisVal = mainElem.val();
					if(usrNmInputRegex.test(thisVal)){
						thisVal = thisVal.replace(usrNmInputRegex, "");
						//다시 넣기
						$(this).val(thisVal);
					}
					
					var itemId = fnFindConfCheckOptVal(topElem, "itemId");
					
					if(e.keyCode=='13'){
						//해당 값으로 검색화면 띄우기
						topElem.find("button").click();
					}
					//입력이 들어오면 아이디 초기화
					$(selector+ " #"+itemId+"-hide").val("");
					
					//사용자 이미지 정보 변경
					$(selector+ " #"+itemId).parents("div.osl-evt__grid-stack-item-content").find("img").attr("src", $.osl.user.usrImgUrlVal());
					
					//기본 유형으로 변경
					fnSetItemModifyOptValue($(selector+ " #"+itemId), "optType", "01");
				});
			},
			//조직(부서/소속) 명 입력 이벤트
			fnKeyPressInDeptItem : function(){
				$(selector).on("propertychange change keyup paste input", "input.osl-evt__template-item["+fnFindConfCheckOpt("itemCode")+"='11']", function(e){
					e.stopPropagation();
					
					var topElem = $(this).closest(".osl-evt__grid-stack-item");
					var middleElem = $(this).closest(".osl-evt__grid-stack-item-content");
					var mainElem = $(this);
					
					var type = fnFindConfCheckOptVal(middleElem, "configType");
					
					//조직(소속/부서) 명은 특수문자 입력 불가(자동 제거, 단 > 가능)
					var deptNmInputRegex = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<@\#$%&\\\=\(\'\"]/gi;
					var thisVal = mainElem.val();
					if(deptNmInputRegex.test(thisVal)){
						thisVal = thisVal.replace(deptNmInputRegex, "");
						//다시 넣기
						$(this).val(thisVal);
					}
					
					var itemId = fnFindConfCheckOptVal(topElem, "itemId");
					
					if(e.keyCode=='13'){
						//해당 값으로 검색화면 띄우기
						topElem.find("button").click();
					}
					//입력이 들어오면 아이디 초기화
					$(selector+ " #"+itemId+"-hide").val("");
					
					//기본 유형으로 변경
					fnSetItemModifyOptValue($(selector+ " #"+itemId), "optType", "01");
				});
			},
			//정보자산 명 입력 이벤트
			fnKeyPressInCfgItem : function(){
				$(selector).on("propertychange change keyup paste input", "input.osl-evt__template-item["+fnFindConfCheckOpt("itemCode")+"='15']", function(e){
					e.stopPropagation();
					
					var topElem = $(this).closest(".osl-evt__grid-stack-item");
					var middleElem = $(this).closest(".osl-evt__grid-stack-item-content");
					var mainElem = $(this);
					
					var type = fnFindConfCheckOptVal(middleElem, "configType");
					
					var itemId = fnFindConfCheckOptVal(topElem, "itemId");
					
					if(e.keyCode=='13'){
						//해당 값으로 검색화면 띄우기
						topElem.find("button").click();
					}
					//입력이 들어오면 아이디 초기화
					$(selector+ " #"+itemId+"-hide").val("");
					
					//기본 유형으로 변경
					fnSetItemModifyOptValue($(selector+ " #"+itemId), "optType", "01");
				});
			},
			//디바이스(jamf) 입력 이벤트
			fnKeyPressInDvcItem : function(){
				$(selector).on("propertychange change keyup paste input", "input.osl-evt__template-item["+fnFindConfCheckOpt("itemCode")+"='16']", function(e){
					e.stopPropagation();
					
					var topElem = $(this).closest(".osl-evt__grid-stack-item");
					var middleElem = $(this).closest(".osl-evt__grid-stack-item-content");
					var mainElem = $(this);
					
					var type = fnFindConfCheckOptVal(middleElem, "configType");
					if(type.indexOf("draw") > -1 || type == "detail"){
						return false;
					}

					//디바이스
					var thisVal = mainElem.val().trim().replace(/\.+/g,".");
					mainElem.val(thisVal);
					
					var itemId = fnFindConfCheckOptVal(topElem, "itemId");
					
					//입력이 들어오면 연동 데이터 초기화
					fnSetOptValue(mainElem, fnFindConfCheckOpt("api01"), "");
					fnSetOptValue(mainElem, fnFindConfCheckOpt("api02"), "");
					fnSetOptValue(mainElem, fnFindConfCheckOpt("api03"), "");
					
					if(e.keyCode=='13'){
						//해당 값으로 api 확인하기
						topElem.find("button").click();
					}
				});
			},
			//변경 이벤트
			fnChangeInItem : function(){
				//영역에 알림 변경 이벤트 추가
				$(selector).on("change", ".osl-evt__alarm-set select.osl-evt__template-item", function(){
					var alarmUseCd = $(this).val();
					var alarmRangeElem = $("select["+modifyLogOpts.elemType10+"]").parents("div.osl-evt__alarm-range");
					
					//CMM00001 알림 설정 예
					if(alarmUseCd == "01"){
						//알림 기간 설정 보이기
						alarmRangeElem.removeClass("d-none");
					}
					//아니오
					else{
						//알림 기간 설정 숨기기
						alarmRangeElem.addClass("d-none");
					}
				});
			},
			//정보자산 태그 삭제 이벤트
			fnDelectCfgTags : function(){
				$(selector).on("click", ".osl-evt__template-cim-item__tag__remove-btn", function(e){
					//태그
					var tagEl = $(this).parent();
					
					//해당 태그의 template Item Id 가져오기
					var tplItemId = fnFindConfCheckOptVal(tagEl, "tplItemId");
					
					//태그 값 가져오기
					var itemHiddenVal = tagEl.attr("value");
					var itemVal = tagEl.data("item-value");
					var underItemOrd = tagEl.data("under-item-ord");
					
					//태그 정보
					var tagObj = $.osl.tag.list[tplItemId];
					
					//원본 데이터에 있던 것인지 확인 
					//원본 데이터에 있던 태그가 삭제되었을 경우 removeTags에 추가
					var oriTagFlag = false;
					//원본 데이터에 있는지 확인
					$.each(tagObj.oriTags, function(idx, map){
						if(map.itemHiddenVal == itemHiddenVal) {
							oriTagFlag = true;
							return false;
						}
					});
					
					//원본데이터에 있는 경우 삭제 데이터 추가
					if(oriTagFlag) {
						tagObj.removeTags.push({"optHiddenVal" : itemHiddenVal, "optVal" : itemVal, "underItemOrd":underItemOrd});
						
					//원본 데이터에 있는 경우 추가 데이터에 있는지 확인
					}else {
						//추가 데이터에 있는지 확인
						$.each(tagObj.addTags, function(idx, map){
							//추가 데이터에 있다면 제외
							if(map.optHiddenVal == itemHiddenVal) {
								tagObj.addTags.splice(idx, 1);
								return false;
							}
						});
					}
					 
					//태그 지우기
					$(this).parent().remove();
				});
			},
			//이상징후 키 세팅 클릭 이벤트
			fnSeverKeyPathSetting : function(){
				if($.osl.isNull(options) || options.hasOwnProperty("gridStack") && !options["gridStack"]["linkKeyEvt"]){
					return false;
				}

				$(selector).off("click", ".osl-evt__grid-stack-keypath-icon").on("click", ".osl-evt__grid-stack-keypath-icon", function(e){
					e.stopPropagation();
					
					//포인터 클래스 없으면 중지
					if(!$(this).hasClass("cursor-pointer")){
						return;
					}

					var topElem = $(this).closest(".osl-evt__grid-stack-item");
					var middleElem = topElem.find(".osl-evt__grid-stack-item-content");
					var keyBtnElem = $(this);
					
					//drawForm이 아니면 이벤트 중지
					var type = fnFindConfCheckOptVal(middleElem, "configType");
					if(type != "drawForm"){
						return false;
					}
					
					//객체 정보 가져오기
					var elemOriInfo = fnGetItemValues(middleElem);
					var elemCurrentInfo = fnGetItemValues(middleElem, true);
					
					//양식, 서버, 맵핑 아이디 가져오기
					var tplId = elemOriInfo["tplId"];
					var tplItemId = elemOriInfo["itemId"]; //gs-id
					var itemCode = String(elemOriInfo["itemCode"]);
					var tplClsType = elemOriInfo["tplClsType"];
					var oriSevId = elemOriInfo["sevId"];
					var oriMapId = elemOriInfo["mapId"];
					var oriMapItemId = elemOriInfo["mapItemId"];
					var sevId = elemCurrentInfo["sevId"];
					var mapId = elemCurrentInfo["mapId"];
					var mapItemId = elemCurrentInfo["mapItemId"];
					var keyPath = keyBtnElem.find(".osl-evt__key-path-text").text().trim();
					
					if($.osl.isNull(tplId) || $.osl.isNull(tplClsType) || $.osl.isNull(tplItemId) || $.osl.isNull(itemCode)){
						return;
					}
					
					type = "insert";
					//맵핑된 아이디가 없으면 insert, 있으면 update
					if(!$.osl.isNull(oriMapId) && oriMapId != "undifind" && oriMapId != "null"){
						type = "update";
					}
					
					//키 맵핑을 위한 팝업 호출
					var data = {
							type : type,
							paramTplId : tplId,
							paramTplClsType : tplClsType,
							paramOriSevId : oriSevId,
							paramOriMapId : oriMapId,
							paramSevId : sevId,
							paramMapId : mapId,
							paramMapItemId : mapItemId,
							paramKeyPath : keyPath,
							paramTplItemId : tplItemId,
							paramItemCode : itemCode,
							paramItemData : JSON.stringify(fnGetItemValues(middleElem, false)), //지정 아이템 정보 가져오기
							paramDirectSave : false, //직접 저장안함(콜백시 받아서 처리하기 위해)
					};
					
					//TPL00003 체크리스트이면
					if(itemCode == "08"){
						//다중 선택이 아니면(라디오박스)
						if(elemCurrentInfo["itemMultiSelCd"] == "02"){
							data["paramOptId"] = keyBtnElem.data("item-option-id");
						}
					}
					
					var options = {
							idKey: "cmm6100",
							modalTitle: "키 맵핑",
							closeConfirm: true,
							autoHeight:false,
							modalSize: "xl",
							callback:[{
								targetId: "cmm6100ModalCallbackBtn",
								actionFn: function(thisOSLCmm6100PopupObj){
									var temp = JSON.parse(OSLCmm6100Popup.getKeyPathInfo());
									
									//해당 정보에서 서버, 맵핑 정보로 변경
									//관련 항목 전부
									$.each($(".osl-evt__grid-stack-keypath-icon["+fnFindConfCheckOpt("tplId")+"='"+tplId+"']"), function(idx, elem){
										//직접 저장일 때에만
										if(data.paramDirectSave){
											//db 컬럼 영역 변경
											fnSetOptValue($(elem).closest(".osl-evt__grid-item-content"), fnFindConfCheckOpt("sevId"), temp["sevId"]);
											fnSetOptValue($(elem).closest(".osl-evt__grid-item-content"), fnFindConfCheckOpt("mapId"), temp["mapId"]);
											fnSetOptValue($(elem).closest(".osl-evt__grid-item-content"), fnFindConfCheckOpt("mapItemId"), temp["mapItemId"]);
										}
										
										//객체에 단순 저장
										fnSetOptValue($(elem), fnFindConfCheckOpt("sevId"), temp["sevId"]);
										fnSetOptValue($(elem), fnFindConfCheckOpt("mapId"), temp["mapId"]);
										fnSetOptValue($(elem), fnFindConfCheckOpt("mapItemId"), temp["mapItemId"]);
									});
									
									//경로는 현재꺼 변경
									keyBtnElem.find(".osl-evt__key-path-text").text($.osl.escapeHtml(temp["keyPath"]));
								}
							}]
						};
						$.osl.layerPopupOpen('/cmm/cmm6000/cmm6100/selectCmm6100View.do',data,options);
				});
			},
			//사용자 선택 팝업 호출 이벤트 생성(서비스 항목 - 다건 사용자 추가)
			fnSelSevUsrPopup : function(){
				$(selector).on("click", ".osl-evt__template-item-usr-service-button--add", function(e){
					e.stopPropagation();
					
					var topElem= $(this).closest(".osl-evt__grid-stack-item");
					var middleElem = topElem.find(".osl-evt__grid-stack-item-content");
					var mainElem = middleElem.find(".osl-evt__template-item");
					
					var type = fnFindConfCheckOptVal(middleElem, "configType");
					var itemModifyCd = fnFindConfCheckOptVal(topElem, "itemModifyCd");
					var tplEssentialItem = fnFindConfCheckOptVal(topElem, "tplEssentialItem");
					
					//drawItem, drawForm, detail이면 이벤트 중지
					if(type.indexOf("draw") > -1 || type == "detail"){
						return false;
					}
					
					//서비스 항목이 아니면 중지
					if(tplEssentialItem != "01"){
						return false;
					}
					
					var multiUsrList = $(mainElem).find(".osl-evt__template-item--user-list").data("user-list");
					if(!$.osl.isNull(multiUsrList)){
						multiUsrList = JSON.parse(multiUsrList);
					}else{
						multiUsrList = {};
					}
					//기존 목록
					var oriUsrListMap = {};
					oriUsrListMap = $.extend({}, oriUsrListMap, multiUsrList);
					
					var data = {
						returnType : "multiple",
						currEduFin : true,
					};
					
					//사전 전달을 위해 list형태로 변환
					if(Object.keys(oriUsrListMap).length > 0){
						var selectUsrList = [];
						$.each(Object.keys(oriUsrListMap), function(o, usrId){
							selectUsrList.push(usrId);
						});
						
						data["selectUsrList"] = JSON.stringify(selectUsrList);
					}
					
					var options = {
							idKey: "searchUsr",
							modalTitle: $.osl.lang("cmm6401.title.main.default"),
							closeConfirm: true,
							autoHeight:false,
							modalSize: "xl",
							callback:[{
								targetId: "cmm6401ModalCallback",
								actionFn: function(thisObj){
									var temp = OSLCmm6401Popup.getUsrInfo();
									if(!$.osl.isNull(temp)){
										//권한 부여 대상자 - 최근 교육 이수자만 반환됩니다.
										$.osl.toastr($.osl.lang("cmm6401.message.toastr.currEduFinSuccess")
											, {
												"title":$.osl.lang("cmm6401.message.toastr.serviceUsrList")
												, "type":"info"
											}
										);
										
										//사용자 정보 입력
										var parseTemp = JSON.parse(temp);
										
										//기존 데이터 제거
										$(mainElem).find(".osl-evt__template-item--user-list").empty();
										
										if(parseTemp.length > 0){
											$.each(parseTemp, function(t, usrMap){
												//항목 반환
												var rowHtml = fnServiceUsrListItemHtmlStr(type, usrMap);
												
												var rowElem = $(rowHtml);
												rowElem.data("usr-id", usrMap["usrId"]);
												rowElem.data("usr-name", usrMap["usrNm"]);
												rowElem.data("dept-id", usrMap["deptId"]);
												rowElem.data("dept-name", usrMap["deptName"]);
												rowElem.data("chg-dept", usrMap["chgDeptYn"]);
												rowElem.data("retire", usrMap["retireYn"]);
												rowElem.data("apply", usrMap["applyCd"]);
												$(mainElem).find(".osl-evt__template-item--user-list").append(rowElem);
												
												if(!oriUsrListMap.hasOwnProperty(usrMap["usrId"])){
													oriUsrListMap[usrMap["usrId"]] = usrMap;
												}
											});
											
											$(mainElem).find(".osl-evt__template-item--user-list").data("user-list", JSON.stringify(oriUsrListMap));
										}
										
										//사용자 수 뱃지 표출
										//if(Object.keys(oriUsrListMap).length > 0){
											var badgeElem = $(middleElem).find(".osl-evt__grid-stack-item-label .osl-evt__multi-usr-cnt");
											
											if(badgeElem.length == 0){
												//뱃지 추가
												$(middleElem).find(".osl-evt__grid-stack-item-label").append(`
													<span class="ms-2 p-2 badge badge-sm badge-gray osl-evt__multi-usr-cnt">
														${Object.keys(oriUsrListMap).length} / ${fnFindConfCheckOptVal(mainElem, "itemSelUsrMaxVal")}
													</span>
												`);
											}
											else{
												//텍스트만 변경
												var cntTxt = Object.keys(oriUsrListMap).length + ' / '+ fnFindConfCheckOptVal(mainElem, "itemSelUsrMaxVal");
												badgeElem.text(cntTxt);
											}
										//}
									}
								}
							}]
						};
					$.osl.layerPopupOpen('/cmm/cmm6000/cmm6400/selectCmm6401View.do',data,options);
				});
				//목록에서 제거
				$(selector).on("click", ".osl-evt__template-item-usr-service-button--del", function(e){
					e.stopPropagation();
					
					var topElem= $(this).closest(".osl-evt__grid-stack-item");
					var middleElem = topElem.find(".osl-evt__grid-stack-item-content");
					var mainElem = middleElem.find(".osl-evt__template-item");
					
					var type = fnFindConfCheckOptVal(middleElem, "configType");
					var itemModifyCd = fnFindConfCheckOptVal(topElem, "itemModifyCd");
					var tplEssentialItem = fnFindConfCheckOptVal(topElem, "tplEssentialItem");
					
					//drawItem, drawForm, detail이면 이벤트 중지
					if(type.indexOf("draw") > -1 || type == "detail"){
						return false;
					}
					
					//서비스 항목이 아니면 중지
					if(tplEssentialItem != "01"){
						return false;
					}
					
					var multiUsrList = $(mainElem).find(".osl-evt__template-item--user-list").data("user-list");
					if(!$.osl.isNull(multiUsrList)){
						multiUsrList = JSON.parse(multiUsrList);
					}else{
						multiUsrList = {};
					}
					
					//기존 목록
					var oriUsrListMap = {};
					oriUsrListMap = $.extend({}, oriUsrListMap, multiUsrList);
					
					//클릭한 row의 usrId 찾기
					var targetUsrId = $(this).closest(".osl-evt__template-item--user-list--row").data("usr-id");
					//목록에서 제거
					delete oriUsrListMap[targetUsrId];
					//갱신
					$(mainElem).find(".osl-evt__template-item--user-list").data("user-list", JSON.stringify(oriUsrListMap));
					//row 제거
					$(this).closest(".osl-evt__template-item--user-list--row").remove();
					
					//사용자 수 뱃지 표출
					var badgeElem = $(middleElem).find(".osl-evt__grid-stack-item-label .osl-evt__multi-usr-cnt");
					if(Object.keys(oriUsrListMap).length > 0){
						//텍스트만 변경
						badgeElem.text(Object.keys(oriUsrListMap).length + " / " + fnFindConfCheckOptVal(middleElem, "itemSelUsrMaxVal"));
					}
					else{
						badgeElem.text("0 / "+ fnFindConfCheckOptVal(middleElem, "itemSelUsrMaxVal"));
					}
				});
			},
			//사용자 선택 팝업 호출 이벤트 생성(단건)
			fnSelUsrPopup : function(){
				$(selector).on("click", ".osl-evt__template-item-usr-button", function(e){
					e.stopPropagation();
					
					//사용자일 때
					var topElem= $(this).closest(".osl-evt__grid-stack-item");
					var middleElem = topElem.find(".osl-evt__grid-stack-item-content");
					var mainElem = middleElem.find(".osl-evt__template-item");
					
					var type = fnFindConfCheckOptVal(middleElem, "configType");
					var itemModifyCd = fnFindConfCheckOptVal(topElem, "itemModifyCd");
					var tplEssentialItem = fnFindConfCheckOptVal(topElem, "tplEssentialItem");
					
					//drawItem, drawForm이면 이벤트 중지
					if(type.indexOf("draw") > -1){
						return false;
					}
					
					//상세 조회, 수정시 수정 불가 항목이 아니면 
					if(type != "detail" && !(type == "update" && !$.osl.isNull(itemModifyCd) && itemModifyCd == "02")){
						var data = {
								usrNm : mainElem.val()
						};
						var options = {
								idKey: "searchUsr",
								modalTitle: $.osl.lang("cmm6401.title.main.default"),
								closeConfirm: true,
								autoHeight:false,
								modalSize: "xl",
								callback:[{
									targetId: "cmm6401ModalCallback",
									actionFn: function(thisObj){
										var temp = OSLCmm6401Popup.getUsrInfo();
										if(!$.osl.isNull(temp)){
											//사용자 정보 입력
											var parseTemp = JSON.parse(temp);
											
											var modifyElem = middleElem.find("button").parents("div.input-group").find(".osl-evt__template-item");
											var modifyHideElem = middleElem.find("button").parents("div.input-group").find(".osl-evt__template-hide-item");
											$(modifyElem).val(parseTemp[0].usrNm);
											$(modifyHideElem).val(parseTemp[0].usrId);
											
											//사용자 유형으로 변경
											fnSetItemModifyOptValue(modifyElem, "optType", "04");
											
											//사용자 이미지 정보 변경
											var usrImgElem = middleElem.find("button").parents("div.osl-evt__grid-stack-item-content").find("img");
											var targetUsrImgId = $.osl.user.usrImgUrlVal(parseTemp[0].usrImgId);
											usrImgElem.attr("src", targetUsrImgId);
											usrImgElem.siblings("input").val(parseTemp[0].usrImgId);
											
											//양식 서비스 항목이 분리되어 동작 필요 없으나, 단건일 때 사용자 정보가 연관된 것이 있어 제어해야 할 때를 위해 남겨둠
											/*
											//양식 서비스 아이템이면 추가 동작
											if(!$.osl.isNull(tplEssentialItem) && tplEssentialItem == "01"){
												//조직 정보
												var deptTargetElem = topElem.siblings(".osl-evt__grid-stack-item["+fnFindConfCheckOpt("itemCode")+"='11']["+fnFindConfCheckOpt("tplEssentialItem")+"='01']");
												deptTargetElem.find(".osl-evt__template-item").val(parseTemp[0].deptName);
												deptTargetElem.find(".osl-evt__template-hide-item").val(parseTemp[0].deptId);
												
												//사용자 유형으로 변경(조직 : 소속/부서)
												fnSetItemModifyOptValue(deptTargetElem.find(".osl-evt__template-item"), "optType", "04");
												
												//정규식 코드로 구분
												//텍스트 아이템 가져오기
												$.each(topElem.siblings(".osl-evt__grid-stack-item["+fnFindConfCheckOpt("itemCode")+"='02']["+fnFindConfCheckOpt("tplEssentialItem")+"='01']").find(".osl-evt__template-item"), function(idx, elem){
													var itemRegexCd = $(elem).attr(fnFindConfCheckOpt("itemRegexCd"));
													
													//TPL00012
													//이메일
													if(itemRegexCd == "05"){
														$(elem).val(parseTemp[0].email);
														//사용자 유형으로 변경
														fnSetItemModifyOptValue($(elem), "optType", "04");
													}
													//연락처
													else if(itemRegexCd == "07"){
														$(elem).val(parseTemp[0].telno);
														//사용자 유형으로 변경
														fnSetItemModifyOptValue($(elem), "optType", "04");
													}
												});
												
												//사용자 이미지 정보 변경
												var targetUsrImgId = $.osl.user.usrImgUrlVal(parseTemp[0].usrImgId);
												usrImgElem.attr("src", targetUsrImgId);
												usrImgElem.siblings("input").val(parseTemp[0].usrImgId);
											}
											*/
										}
									}
								}]
							};
						$.osl.layerPopupOpen('/cmm/cmm6000/cmm6400/selectCmm6401View.do',data,options);
					}
				});
			},
			//사용자 상세 팝업 호출 이벤트 생성
			fnUsrInfoPopup : function(){
				$(selector).on("click", ".osl-evt__usr-info-pop", function(e){
					e.stopPropagation();
					
					var topElem= $(this).closest(".osl-evt__grid-stack-item");
					var middleElem = topElem.find(".osl-evt__grid-stack-item-content");
					var mainElem = middleElem.find(".osl-evt__template-item"); // == this
					
					var type = fnFindConfCheckOptVal(middleElem, "configType");
					
					//등록, 수정, 동시 생성 아닌 경우 이벤트 넣어주기
					if(type != "insert" && type != "update" && type != "copy" && type != "sameTime") {
						try{
							var usrId = $(selector + " #"+fnFindConfCheckOptVal(mainElem, "hiddenId")).val();
							if($.osl.isNull(usrId)){
								mainElem.removeClass("cursor-pointer");
								//"사용자 정보가 없습니다."
								$.osl.alert($.osl.lang("template.message.alert.notUsrId"));
								return false;
							}
							
							$.osl.user.usrInfoPopup(usrId);
						}catch(e){
							mainElem.removeClass("cursor-pointer");
							//"사용자 정보가 없습니다."
							$.osl.alert($.osl.lang("template.message.alert.notUsrId"));
							return false;
						}
					}
				});
			},
			//조직 선택 팝업 호출 이벤트 생성
			fnSelDeptPopup : function(){
				$(selector).on("click", ".osl-evt__template-item-dept-button", function(e){
					e.stopPropagation();
					
					//부서/소속일 때
					var topElem= $(this).closest(".osl-evt__grid-stack-item");
					var middleElem = topElem.find(".osl-evt__grid-stack-item-content");
					var mainElem = middleElem.find(".osl-evt__template-item");
					
					var type = fnFindConfCheckOptVal(middleElem, "configType");
					
					var itemModifyCd = fnFindConfCheckOptVal(topElem, "itemModifyCd");
					var tplEssentialItem = fnFindConfCheckOptVal(topElem, "tplEssentialItem");
					
					//drawItem, drawForm이면 이벤트 중지
					if(type.indexOf("draw") > -1){
						return false;
					}
					
					//상세 조회, 수정시 수정 불가 항목이 아니면 
					if(type != "detail" && !(type == "update" && !$.osl.isNull(itemModifyCd) && itemModifyCd == "02")){
						var searchDeptNm = mainElem.val().trim();
						
						// 상위조직 명을 제외한 조직명을 검색어로 넘긴다.
						searchDeptNm = searchDeptNm.substring(searchDeptNm.lastIndexOf(">")+1);
						var data = {
								deptName : searchDeptNm
						};
						
						var options = {
								idKey: "cmm6500",
								modalSize: 'xl',
								modalTitle:$.osl.lang("cmm6500.title.main.default"),
								closeConfirm: false,
								autoHeight: false,
								callback:[{
									targetId: "cmm6500ModalCallbackBtn",
									actionFn: function(thisObj){
										var deptId = $(thisObj).data("dept-id");
										var deptNm = $(thisObj).data("dept-nm");
										
										if(!$.osl.isNull(deptId) && !$.osl.isNull(deptNm)){
											mainElem.val(deptNm);
											middleElem.find(".osl-evt__template-hide-item").val(deptId);
											
											//분류 유형으로 변경
											fnSetItemModifyOptValue(mainElem, "optType", "05");
										}
									}
								}]
							};
						
						$.osl.layerPopupOpen('/cmm/cmm6000/cmm6500/selectCmm6500View.do',data,options);
					}
				});
			},
			//정보자산 선택 팝업 호출 이벤트 생성
			fnSelCimPopup : function(){
				$(selector).on("click", ".osl-evt__template-item-cfg-button", function(e){
					e.stopPropagation();
					
					//클릭 객체
					var obj = $(this);
					
					//정보자산일 때
					//상세조회, 수정(수정 불가)가 아니면
					var targetId = obj.closest(".grid-stack").data("targetId");
					
					var middleElem = obj.parents(".osl-evt__grid-stack-item-content");
					var topElem = middleElem.closest(".osl-evt__grid-stack-item");
					var mainElem = topElem.find(".osl-evt__template-item");
					
					var type = fnFindConfCheckOptVal(middleElem, "configType");
					
					var itemModifyCd = fnFindConfCheckOptVal(topElem, "itemModifyCd");
					
					//선택 정보 자산의 템플릿 항목 ID
					var tplItemId = mainElem.attr("id");
					
					if(type != "detail" && !(type == "update" && !$.osl.isNull(itemModifyCd) && itemModifyCd == "02")){
						//drawItem, drawForm이면 이벤트 중지
						if(type.indexOf("draw") > -1){
							return false;
						}
						
						var cfgNm = mainElem.val().trim();
						// 정보자산명을 검색어로 넘긴다.
						cfgNm = cfgNm.substring(cfgNm.lastIndexOf(">")+1);
						var data = {
								type : "select",
								paramTplClsType:"01",
								cfgNm : cfgNm,
								cfgId : targetId
						};
						var options = {
								idKey: "cim1000",
								modalSize: 'lg',
								modalTitle:$.osl.lang("cim1003.title.main.select"),
								closeConfirm: false,
								callback:[{
									targetId: "cim1003ModalCallbackBtn",
									actionFn: function(thisObj){
										var cfgId = $(thisObj).data("cfg-id");
										var cfgNm = $(thisObj).data("cfg-nm");
										
										if($.osl.isNull(cfgId)){
											//선택된 정보자산이 없습니다.
											$.osl.alert($.osl.lang("template.message.alert.notSelectCim"));
											return false;
										}
										
										if(!$.osl.isNull(cfgId) && !$.osl.isNull(cfgNm)){
											mainElem.val(cfgNm);
											mainElem.siblings(".osl-evt__template-hide-item").val(cfgId);
											//분류 유형으로 변경
											fnSetItemModifyOptValue(mainElem, "optType", "05");
										}
										
										//양식 구분 : 01 정보자산, 02 보안 티켓(TPL00001)
										var tplClsType = fnFindConfCheckOptVal(topElem, "tplClsType");
										/*
										 * TODO TPL00017 사용하는 곳이 없어보임. jsp에서도 없는 듯. 한번 더 확인한 뒤 제거하기 - db 공통코드에서도 제거 필요
										//양식 세부 구분 : 01 이상징후, 02 보안 정책(TPL00017)
										var tplClsDtlType = obj.parents(".osl-evt__grid-stack-item").data("tpl-cls-dtl-type");
										*/
										
										//중복 선택 가능 여부
										var multiSelCd = fnFindConfCheckOptVal(topElem, "itemMultiSelCd");
										
										//양식 유형이 정보자산이 아니거나 정보자산이고 다중 선택 허용인 경우
										if("01" != tplClsType || ("01" == tplClsType && "01" == multiSelCd)){
											var cfgTagDiv = middleElem.find(".osl-evt__tag-form");
											
											//태그폼 라벨
											var tagLabel = cfgTagDiv.find(".osl-evt__tag-label");
											
											if(tagLabel.length > 0) {
												tagLabel.remove();
											}
											
											//중복 검사
											var tags = [];
											//maxUnderItemOrd;
											var maxUnderItemOrd = 1;
											$.each(cfgTagDiv.find("tag"), function(idx, elem){
												tags.push($(elem).attr("value"));
												if($(elem)[0].hasAttribute("data-under-item-ord") && $(elem).data("under-item-ord") > maxUnderItemOrd){
													maxUnderItemOrd = $(elem).data("under-item-ord");
												}
											});
											
											// 같은 태그가 있는지 검사한다. 있다면 해당값이 array 로 return 된다.
											var result = Object.values(tags).filter(function (word) {
												return word == cfgId;
											});
											
											// 태그 중복 검사
											if (result.length == 0) { 
												//태그 객체
												var tagObj = $.osl.tag.list[tplItemId];
												//없는경우 생성해주기
												if($.osl.isNull(tagObj)) {
													$.osl.tag.setting(tplItemId, {});
													tagObj = $.osl.tag.list[tplItemId];
												}
												
												//원본 데이터에 해당 태그값 있는지 확인
												var oriTagFlag = false;
												$.each(tagObj.oriTags, function(idx, map){
													//동일 값 있다면 중복
													if(map.itemHiddenVal == cfgId) {
														oriTagFlag = true;
														return false;
													}
												});
												//원본데이터에 태그값 없는경우 추가
												if(!oriTagFlag) {
													tagObj.addTags.push({"optHiddenVal" : cfgId, "optVal" : cfgNm, "underItemOrd":maxUnderItemOrd+1});
													
													//원본 데이터에 있는 경우 삭제 데이터 확인
												}else {
													//삭제 데이터에 있는지 확인
													$.each(tagObj.removeTags, function(idx, map){
														//삭제 데이터에 있다면 제외
														if(map.itemHiddenVal == cfgId) {
															tagObj.removeTags.splice(idx, 1);
															return false;
														}
													});
												}
												
												var xBtn = `<x class="osl-evt__template-cim-item__tag__remove-btn tagify__tag__removeBtn osl-me-4" role="button" aria-label="remove tag"></x>`;;
												
												//선택된 정보 태그로 표출
												var tagHtml = `
													<tag class="tagify__tag tagify--noAnim m-1 p-1 d-inline-flex cursor-pointer" role="tag" title="${$.osl.escapeHtml(cfgNm)}" contenteditable="false" spellcheck="false" ${fnFindConfCheckOpt("tplItemId")}="${tplItemId}" value="${cfgId}" data-item-value="${$.osl.escapeHtml(cfgNm)}" data-under-item-ord="${maxUnderItemOrd+1}" data-bs-toggle="tooltip" data-bs-custom-class="tooltip-inverse" data-bs-placement="bottom" data-bs-dismiss="click" title="${$.osl.escapeHtml(cfgNm)}">
														${xBtn}
														<div class="tagify__tag-text ms-1 osl-me-4 osl-evt__cfg-info-pop">
															${$.osl.escapeHtml(cfgNm)}
														</div>
													</tag>
												`;
												
												//추가
												cfgTagDiv.append(tagHtml);
											}else{
												//중복된 항목 있으므로 건너뛰기
												//동일한 정보자산이 존재합니다.
												$.osl.alert($.osl.lang("template.message.alert.sameSelectCim"));
											}
										}
										
										//툴팁 세팅
										OSLApp.initTooltips();
									}
								}]
							};
						
						$.osl.layerPopupOpen('/cim/cim1000/cim1000/selectCim1003View.do',data,options);
					}
				});
			},
			//정보자산 상세 팝업 호출 이벤트 생성
			fnSelCimDetailPopup : function(e){
				$(selector).on("click", ".osl-evt__cfg-info-pop", function(e){
					e.stopPropagation();
					
					//정보자산일 때
					//상세조회, 수정(수정 불가)가 아니면
					var target;
					var targetCfgId;
					
					//클릭한 항목이 태그이면
					if($(this).hasClass("tagify__tag-text")){
						target = $(this).parents("tag");
						targetCfgId = target.attr("value");
					}else{
						//태그가 아니면
						target = $(this).parents(".osl-evt__grid-stack-item-content");
						targetCfgId = target.find(".osl-evt__template-hide-item").val();
					}
					
					if($.osl.isNull(targetCfgId)){
						//정보자산 ID가 없으면 상세조회 안함
						//"등록된 정보자산이 아닙니다."
						$.osl.alert($.osl.lang("template.message.alert.notInsertCim"));
						return false;
					}
					
					// 상세 팝업 호출
					var data = {
							cfgId : targetCfgId
					};
					var options = {
							idKey: "cim1002CimDetail", //cim1002.jsp 일치
							modalTitle:$.osl.lang("cim1002.title.main.default"),
							autoHeight:false,
							closeConfirm: false,
							modalSize: "fs",
							autoHeight: false
					};
					
					if($(document).find(".modal.show[data-idkey="+options.idKey+"]").length > 0){
						// 기존에 열린 팝업이 있으면
						var modalElem;
						var modalFormId;
						$.each($("#modalId, #pageId"), function(idx, elem){
							if(options.idKey = $(elem).val()){
								modalElem = $(elem);
								modalFormId = $(elem).closest("form").attr("id");
								return false;
							}
						});
						
						//해당 팝업으로부터 정보자산 트리 찾기
						var treeId = $("#"+modalFormId).find(".osl-tree.jstree").attr("id");
						//트리선택 노드 아이디로 찾기
						var treeData = $("#"+treeId).jstree(true).get_json('#', {flat:true});
						
						$.each(treeData, function(idx, id){
							var chkNode = $("#"+treeId).jstree().get_node(id);
							var cfgId = chkNode.original.cfgId;
							if(targetCfgId == cfgId){
								var strTreeId = chkNode.id;
								
								//기존 노드 선택 해제, 해당 노드 선택
								$("#"+treeId).jstree("deselect_all");
								$("#"+treeId).jstree("select_node", $("#"+treeId).jstree().get_node(strTreeId));
								
								return false;
							}
						});
					}else{
						// 기존에 열린 팝업이 없으면 팝업 호출
						$.osl.layerPopupOpen('/cim/cim1000/cim1000/selectCim1002View.do',data,options);
					}
				});
			},
			//디바이스(jamf) 연동 - 입력 값 기준으로 연동 체크
			fnChkDevicePopup : function(){
				$(selector).on("click", ".osl-evt__template-item-dvc-button", function(e){
					e.stopPropagation();
					
					//클릭 객체
					var obj = $(this);
					
					var targetId = obj.closest(".grid-stack").data("targetId");
					
					var middleElem = obj.parents(".osl-evt__grid-stack-item-content");
					var topElem = middleElem.closest(".osl-evt__grid-stack-item");
					var mainElem = topElem.find(".osl-evt__template-item");
					
					var type = fnFindConfCheckOptVal(middleElem, "configType");
					var itemModifyCd = fnFindConfCheckOptVal(topElem, "itemModifyCd");
					
					//선택 항목의 템플릿 항목 ID
					var tplItemId = mainElem.attr("id");
					
					//상세조회, 수정(수정 불가)이면 동작 없음
					//그 외 (상세조회 아니고 수정 가능이면)
					if(type != "detail" && !(type == "update" && !$.osl.isNull(itemModifyCd) && itemModifyCd == "02")){
						//drawItem, drawForm이면 이벤트 중지
						if(type.indexOf("draw") > -1){
							return false;
						}
						
						//입력 값
						var inputVal = mainElem.val().trim().replace(/\.+/g,".");
						mainElem.val(inputVal);
						
						//입력 값이 없으면 중지
						if($.osl.isNull(inputVal)){
							//입력된 값이 없습니다.
							$.osl.alert($.osl.lang("validateAlert.message.notInput"));
							return;
						}
						
						//TODO - jamf 디바이스 연동 체크
						//ajax 설정
						var ajaxObj = new $.osl.ajaxRequestAction({
							"url" : "/tpl/tpl1000/tpl1100/selectCheckDeviceIdByJamfApiAjax.do",
							"loadingShow": true,
							"async": false,
						}, {"inputVal" : inputVal});
						
						//AJAX 전송 성공 함수
						ajaxObj.setFnSuccess(function(data){
							if(data.errorYn == "Y"){
								$.osl.alert(data.message,{type: 'error'});
								
								//모달 창 닫기
								$.osl.layerPopupClose();
							}else{
								//버튼 중복 클릭 방지 위해 disabled 한 것 해제
								obj.prop("disabled", false);
								
								//전달 받은 값 확인
								var returnData = data.return;
								var result = returnData["result"];
								
								//false이면 튕기기
								if(!result){
									$.osl.alert($.osl.lang("tplValidate.message.jamfCheckFail"), returnData["message"]);
									return false;
								}
								
								//값이 존재하면 data로 보관
								var api01 = returnData["jssId"];
								var api02 = returnData["bootId"];
								var api03 = returnData["mngtId"];
								
								//해당 값 변경
								fnSetOptValue(mainElem, fnFindConfCheckOpt("api01"), api01);
								fnSetOptValue(mainElem, fnFindConfCheckOpt("api02"), api02);
								fnSetOptValue(mainElem, fnFindConfCheckOpt("api03"), api03);
								
								//확인되었습니다.
								$.osl.alert($.osl.lang("message.alert.okConfirm"));
							}
						});
						
						//버튼 중복 클릭 방지 위해 disabled
						obj.prop("disabled", true);
						
						//ajax 전송
						ajaxObj.send();
					}
				});
			}
			
		};
		
		return {
			init: function(selector, options){
				//그리드 스택 세팅 후 부를 function
				//show-hide 이벤트 생성 : show일 때 반응형 적용을 위한 호출 이벤트
				$(selector).on("show", function(){
					var gridStackAreaId = this.id;
					eventHandler.fnTemplateFormResize(gridStackAreaId);
				});
			},
			//그리드 스택 생성 후 이벤트 생성
			fnCreateDefatultItemEvt : function(){
				//2. 항목 중 입력 이벤트 생성
				eventHandler.fnKeyPressInUsrItem();
				eventHandler.fnKeyPressInDeptItem();
				eventHandler.fnKeyPressInCfgItem();
				eventHandler.fnKeyPressInDvcItem();
				//3. 클릭 이벤트 생성
				eventHandler.fnDelectCfgTags();
				eventHandler.fnSeverKeyPathSetting();
				eventHandler.fnSelSevUsrPopup();
				eventHandler.fnSelUsrPopup();
				eventHandler.fnUsrInfoPopup();
				eventHandler.fnSelDeptPopup();
				eventHandler.fnSelCimPopup();
				eventHandler.fnSelCimDetailPopup();
				eventHandler.fnChkDevicePopup();
				//4. 항목 중 변경 이벤트 생성
				eventHandler.fnChangeInItem();
			},
			afterCreateHtml : function(gridStackAreaId, options){
			},
			//반응형 호출이 필요한 경우
			fnTemplateFormResize : function(gridStackAreaId){
				eventHandler.fnTemplateFormResize(gridStackAreaId);
			},
			//html만 그린 후 별도 호출해야 하는 경우 - 단건
			fnSetPlugin : function(item){
				//항목 생성 후 호출할 function
				//1. 항목에 맞춰 플러그인 세팅
				eventHandler.fnSetPlugin(item);
			},
			//html만 그린 후 별도 호출해야 하는 경우
			fnSetPlugins : function(){
				//항목 생성 후 호출할 function
				//1. 항목에 맞춰 플러그인 세팅
				eventHandler.fnSetPlugins();
			}
		}
	};
	
	return {
		init: function(){
			//osl-core에 옵션 세팅
			//그리드 스택 세팅
			$.osl.templateForm.gridStack.init = fnGridStackInit;
			$.osl.templateForm.gridStack.initAll = fnGridStackInitAll;
			$.osl.templateForm.gridStack.resize = fnTemplateEventSetting().fnTemplateFormResize;
			
			//이벤트 핸들러
			$.osl.templateForm.gridStack.handler = fnTemplateEventSetting;
			
			//아이템으로부터 DB 조회 값 가져오기
			$.osl.templateForm.data.items = fnGetItemValuesByForm;
			//아이템으로부터 DB 조회 값 가져오기
			//$.osl.templateForm.data.item = fnGetItemValues;
			$.osl.templateForm.data.item = function(targetElem, updateFlag){
				var map = fnGetItemValues(targetElem, updateFlag);
				
				let datas = {
						dataList: [], //DB에서 전달하는 폼과 같은 형태
						dataListMap : {}, //항목 생성 아이디(DB에서 조회된 항목 id와 다를 수 있다.) 기준으로 DB 정보 폼 조회 위해
				};
				
				datas["dataList"] = [map];
				datas["dataListMap"][map["itemId"]] = map;
				
				return datas;
			};
			
			//아이템으로부터 fnGetFormData 입력 값 가져오기
			$.osl.templateForm.data.itemValues = fnGetItemInputValuesByForm;
			
			//탭인덱스 다시 설정하기
			$.osl.templateForm.reTabIndex = fnResetTabIndex;
			//아이템 위치조절
			$.osl.templateForm.ItemHeightSize = fnItemHeightSize;
			
			//항목 html 그리기
			$.osl.templateForm.data.html = fnItemHtml;
			//양식 항목 폼만 가져오기
			$.osl.templateForm.data.getForm = fnGetFormData;
			//값 가져오기
			$.osl.templateForm.data.getFormValue = fnGetFormDataValues;
			//데이터를 바탕으로 폼 그리기
			$.osl.templateForm.data.setting = fnSetForm;
			//값 넣기
			$.osl.templateForm.data.setFormValue = fnSetItemValues;
			//양식 항목 폼 그리고 항목 값 넣기
			$.osl.templateForm.setting = fnSetTemplate;
		},
		// public functions
		fnSettingOption: function(appendId, config, sameTimeTF){
			fnSettingOption(appendId, config, sameTimeTF);
		},
		fnSetItemOptValue: function(elem, optNm, optVal, oriChange){
			fnSetItemOptValue(elem, optNm, optVal, oriChange);
		},
		fnFindConfCheckOpt: function(key){
			return fnFindConfCheckOpt(key);
		},
		fnFindConfCheckOptVal: function(elem, key){
			return fnFindConfCheckOptVal(elem, key);
		},
		fnSetItemModifyOptValue: function(elem, key, value){
			fnSetItemModifyOptValue(elem, key, value);
		},
		//modalPopup 닫을 때  osl-script.bundle에서 사용
		fnGetSettingParams : function(){
			var returnData = {
					"settingOptionList" : settingOptionList,
					"settingEditor" : settingEditor,
			};
			return returnData;
		},
		//modalPopup 닫을 때  osl-script.bundle에서 사용
		fnSettingParams : function(optList, editorList){
			if(optList != null){
				settingOptionList = optList;
			}
			if(editorList != null){
				settingEditor = editorList;
			}
		},
		templateReactType : function(){
			return templateReactType;
		},
		//osl-core.js의 formDataToJsonArray  참고
		//양식의 항목이 추가되거나 컬럼이 추가될 때마다 수정 필요
		/* *
		 * function 명 : formDataToJsonArray
		 * function 설명 : 선택 항목을 기존 formDataToJsonArray 포맷으로 만들어 전달 + 양식 항목 별 옵션 값
		 * param : 데이터 추출할 객체, 사용 유무(강제)
		 * 
		 * tpl1100, tpl1105.jsp에서만 사용
		 * 항목 추가/제거 동적 할당으로 인해 분리
		 * */
		formDataToJsonArray : function(elem, useCd){
			var element = $(elem)[0];
			var elemKey =element.id;

			//항목 작업흐름
			var optFlowId = $(element).data("opt-flow-id");
			//없을 경우 공백
			if($.osl.isNull(optFlowId)){
				optFlowId = "";
			}
			
			//항목 타겟
			var chgDetailOptTarget = fnGetItemModifyOptValue($(element), "optTarget");
				
			//항목 타겟 없는경우 normal
			if($.osl.isNull(chgDetailOptTarget)){
				chgDetailOptTarget = "00";
			}
			
			//항목 타입
			var chgDetailOptType = fnGetItemModifyOptValue($(element), "optType");
			
			//항목 타입 없는경우 normal
			if($.osl.isNull(chgDetailOptType)){
				chgDetailOptType = "01";
			}
			
			//항목 서브 코드
			var chgDetailOptSubCd = fnGetItemModifyOptValue($(element), "optTypeSub");
			
			//항목 서브 코드 없는 경우 normal
			if($.osl.isNull(chgDetailOptSubCd)){
				if(chgDetailOptType == "04" || chgDetailOptType == "06"){
					chgDetailOptSubCd = "00";
				}else{
					chgDetailOptSubCd = "";
				}
			}
			
			//항목의 현재 정보
			var itemInfo = fnGetItemValues($(element), true);
			
			//항목 공통코드
			var chgDetailCommonCd = itemInfo["mstCd"];
			
			//항목 공통코드 없는경우 공백
			if($.osl.isNull(chgDetailCommonCd)){
				chgDetailCommonCd = "";
			}
			
			//항목명 언어코드
			var optLangCd = $(element).data("opt-lang");
			
			//항목명 언어코드가 없을 때
			if($.osl.isNull(optLangCd)){
				//객체 앞 label 태그 안의 span 태그의 data-lang-cd 가져오기
				optLangCd = $(element).siblings("label").find("span[data-lang-cd]").data("lang-cd");
			
				//그래도 없으면 공백
				if($.osl.isNull(optLangCd)){
					optLangCd = "";
				}
			}
			
			//히든 id가 가진 값
			var optHiddenVal = $("#"+fnFindConfCheckOptVal($(element), "hiddenId")).val();
			//없을 경우 //data-hidden-value확인
			if($.osl.isNull(optHiddenVal)){
				optHiddenVal = $(element).data("hidden-value");
				
				//그래도 없을 경우 공백
				if($.osl.isNull(optHiddenVal)){
					optHiddenVal = "";
				}
			}
			
			//히든 key 값
			var optHiddenKey = fnFindConfCheckOptVal($(element), "hiddenKey");
			//없을 경우 elemKey 와 동일 - 단 선택 값 유형이 사용자가 아닐 때
			if($.osl.isNull(optHiddenKey)){
				if(chgDetailOptType != "04"){
					optHiddenKey = elemKey;
				}else{
					optHiddenKey = "";
				}
			}
			
			//결과값에 포함시키지 않는 경우 제외
			var modifySetCd = fnGetItemModifyOptValue($(element), "modifySetCd");
			
			//수정 이력 저장 구분 값 없는경우 01
			if($.osl.isNull(modifySetCd)){
				modifySetCd = "01";
			}
			
			//항목 유형
			var elemType = fnGetItemModifyOptValue($(element), "elemType");
			
			//없는 경우 기본 값 text 텍스트박스로 지정
			if($.osl.isNull(elemType)){
				if(chgDetailOptType == "01" || chgDetailOptType == -1){
					//기본 또는 입력값 그대로 전송일 때에만
					elemType = "text";
				}else{
					elemType = "";
				}
			}
			
			/* jsonData 세팅 */
			//개체 항목 명 (title)
			var eleTitle = element.title;
			//양식 항목 - 그리드 스택이면
			if($(element).hasClass("osl-evt__template-item")){
				//eleTitle = $(element).parent().find(".osl-evt__grid-stack-item-label").text().trim();
				eleTitle = itemInfo["itemNm"];
			}
			
			//개체 항목 명 없는경우 id값이 항목 명
			if($.osl.isNull(eleTitle)){
				
				eleTitle = $(element).siblings("label").find("span[data-lang-cd]").text().trim();
				
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
			
			var tplItemId = $(element).attr("id");
			
			//개체 값(value)
			var eleValue;
			if(String(itemInfo["itemCode"]) == "01"){
				eleValue = $(element).html().trim();
			}
			//체크리스트인 경우
			else if(String(itemInfo["itemCode"]) == "08"){
				eleValue = null;
			}
			//첨부파일일 경우
			else if(String(itemInfo["itemCode"]) == "13"){
				if(!$.osl.isNull($.osl.file.list[tplItemId])){
					eleValue = $.osl.file.list[tplItemId].targetUppy.getState().meta.atchFileId;
				}
			}else{
				eleValue = $(element).val().replace(/\n/gi,'<br/>');
			}
			
			//일반 체크 박스인경우 checked로 값 판별
			if(element.type == "checkbox" && elemType == "checkbox"){
				eleValue = (element.checked)?"01":"02";
			}
			
			//양식 항목 옵션 가져와 넣기 ---------------------------------------
			//id에 sub가 있으면 건너뛰기
			if(tplItemId.indexOf("sub") > -1){
				return false;
			}
			//항목 상위 객체
			var itemParent = $(element).parents(".osl-evt__grid-stack-item");
			//항목 분류(TPL00003)
			var itemCode = String(itemInfo["itemCode"]);
			//항목 옵션 입력 값
			var itemOptionVal = itemInfo["itemOptionVal"];
			//항목 표출 타입
			var configType = itemInfo["configType"];
			
			//이상징후 키 맵핑 값
			var itemKeyPath = itemInfo["keyPath"];
			//이상징후 키 맵핑 아이템 아이디(유니크)
			var mapItemId = itemInfo["mapItemId"];

			if(itemCode == "01"){ //단순 텍스트이면
				//단순 텍스트 영역일 경우 라벨명 고정
				eleTitle = "단순 텍스트 표출";
				optLangCd = "template.item.label.onlyTextPrintArea";
			}
			
			//단순 표출 또는 공통코드일 때
			if(itemCode == "01" || itemCode == "12"){
				//값이 없으면 return
				if($.osl.isNull(itemOptionVal)){
					//현재 객체에 경고 표시
					$(element).parents(".osl-evt__grid-stack-item-content").addClass("danger");
				}
			}
			//체크 리스트일 때
			else if(itemCode == "08") {
				//div로 잡혀 타입이 없으므로
				elemType = "checkbox";
				//다중 선택이면
				if(itemInfo["itemMultiSelCd"] == "01"){
					itemKeyPath = '';
					mapItemId = '';
				}
			}
			
			// 정보자산 입력, 수정인 경우 타겟 정보자산으로 변경
			// 정보자산 아닌경우 항목으로 변경
			if(itemInfo["configType"] == "sameTime"){
				chgDetailOptTarget = "05";
			}else{
				chgDetailOptTarget = "03";
			}
			
			//--------------------------------------------------------------------
			var jsonDataObj = $.extend({},itemInfo,{
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
				//tplItemOptValListInfo : itemOptionList,
				//-----------
				useCd : useCd,
				//-----------
			});
			
			//jsonData
			var rtnVal = JSON.stringify(jsonDataObj);
			
			//hidden인경우 String, 배포계획, 사용자 제외, optType이 단순 값 전송인경우
			if(chgDetailOptType != "07" && chgDetailOptType != "04" && element.type == "hidden" || chgDetailOptType == -1){
				return eleValue;
			}else{
				return JSON.parse(rtnVal);
			}
		},
		/* *
		 * function 명 : getTagDivList
		 * function 설명 : 저장 시 필요한 태그 아이템 가져오기
		 * param gridStackAreaId 태그가 그려진 양식 영역 아이디(# 제외)
		 * */
		getTagDivList : function(gridStackAreaId){
			//태그 아이템 가져오기
			var tagDivList = $("#"+gridStackAreaId).find(".osl-evt__tag-form");
			//태그 아이템 있는 경우 전체 태그 아이템 확인 
			if(!$.osl.isNull(tagDivList) && tagDivList.length > 0){
				var tagList = {};
				
				//전체 태그 돌며 tplItemId 별 태그 정보 저장
				$.each(tagDivList, function(idx, map){
					
					//항목 ID 가져오기
					var tplItemId = $(this).closest(".osl-evt__grid-stack-item").attr("gs-id");
					
					//태그 정보 가져오기
					var tagObj = $.osl.tag.list[tplItemId];
					
					//태그 정보 저장
					tagList[tplItemId] = tagObj;
				});
				
				return JSON.stringify(tagList);
			}
			//조회된 태그 아이템이 없으면
			else{
				return null;
			}
		},
		/* *
		 * function 명 : getFileList
		 * function 설명 : 저장 시 필요한 첨부파일 정보 가져오기
		 * param gridStackAreaId 첨부파일 항목이 그려진 양식 영역 아이디(# 제외)
		 * param tplClsType : tplClsType TPL00001 양식 구분 ) 01 정보자산, 02 보안티켓, 03 기본항목 default 02
		 * */
		getFileList : function(gridStackAreaId, tplClsType){
			if($.osl.isNull(tplClsType)){
				tplClsType = "02";
			}
			
			//양식 파일정보 [{file info}]
			var fileAllList = [];
			
			//파일 목록 추가하기 {itemId : {file info}}
			var uploadFileJson = {};
			//파일 목록 추가하기 (수정이력 관리) [{file info}]
			var uploadFileList = [];
			//삭제파일 리스트 [{file info}]
			var removeFiles = [];
			
			var itemCodeOptNm = fnFindConfCheckOpt("itemCode");
			//첨부파일 항목
			var tplFileItem = $("#"+gridStackAreaId).find(".osl-evt__grid-stack-item["+itemCodeOptNm+"=13]");
			
			//첨부파일 항목이 있는 경우에만
			if(tplFileItem.length > 0){
				$.each(tplFileItem, function(idx, elem){
					//항목 정보
					var itemInfo = fnGetItemValues(elem, true);
					//첨부파일 id 찾기
					var addFileItemId = itemInfo["tplItemId"];
					if($.osl.isNull($.osl.file.list[addFileItemId])){
						return;
					}
					var fileUploadObj = $.osl.file.list[addFileItemId].targetUppy;
					var optVal = fileUploadObj.getState().meta.atchFileId;

					var fromFile = "tpl";
					//kTPL00001
					if(tplClsType == "01"){
						fromFile = "cfg";
					}
					else {
						//현재 입력 가능 상태일 때
						if(["drawItem", "drawForm", "detail"].indexOf(itemInfo["configType"]) == -1 ){
							if(tplClsType == "02" || tplClsType == "04") {
								fromFile = "req";
							}
							else if(tplClsType == "03") {
								fromFile = "item";
							}
							else if(tplClsType == "05") {
								fromFile = "acdt";
							}
						}
						//입력 가능한 상태가 아니면 fromFile 을 tpl로 유지
					}
					
					
					var meta = $.osl.file.list[addFileItemId].config.meta;
					//양식 항목 정보 넣기(첨부파일인 경우 formDataToJsonArray로 생성되지 않으므로)
					var addFileItemInfo = {
							"fromFile": fromFile,
							"itemCode" : "13",
							"optVal" : optVal,
							"optHiddenVal" : "",
							"chgDetailOptSubCd" : "",
							"tplItemId": addFileItemId,
					};
					uploadFileJson[addFileItemId] = JSON.stringify(addFileItemInfo);
					
					//파일명 뒤에 ms 붙이기, 새로 추가된 파일 목록 추가
					$.each(fileUploadObj.getFiles(), function(idx, tplFileMap){
						if(!tplFileMap.hasOwnProperty("source") || tplFileMap.source == "database"){
							//복사되는 항목은 이름만 전달
							uploadFileList.push({"source":"database", "name": tplFileMap.name, "tplItemId": addFileItemId});
							return true;
						}
						
						//항목이 다른 첨부파일에 각각 파일이 들어감에 따라 구분하기 위해서 추가
						tplFileMap["tplItemId"] = addFileItemId;
						
						//수정이력 등록(req6000)을 위한 값 설정
						var map = {
							"fromFile" : fromFile,
							"source" : tplFileMap.source,
							"fileNm" : tplFileMap.name,
							"itemNm" : $(elem).find(".osl-evt__grid-stack-item-label").text().trim(),
							"itemNmCd" : "",
							"tplItemId" : addFileItemId,
						};
						
						fileAllList.push(map);
						uploadFileList.push(tplFileMap);
					});
					
					//제거된 파일
					if(!$.osl.isNull(meta.removeFiles)){
						removeFiles = removeFiles.concat(meta.removeFiles);
						$.each(meta.removeFiles, function(idx, tplFileMap){
							var map = {
									"fromFile" : fromFile,
									"source" : tplFileMap.source,
									"fileNm" : tplFileMap.name,
									"itemNm" : $(elem).find(".osl-evt__grid-stack-item-label").text().trim(),
									"itemNmCd" : "",
									"tplItemId" : addFileItemId,
							};
							fileAllList.push(map);
						});
					}
				});
			}
			/*
			if($.osl.isNull(uploadFileList) || uploadFileList.length ==0 ){
				//JSONArray로 변환을 위해 빈 값 {}을 넣어둔다
				uploadFileList.push({});
			}
			if($.osl.isNull(removeFiles) || removeFiles.length ==0 ){
				//JSONArray로 변환을 위해 빈 값 {}을 넣어둔다
				removeFiles.push({});
			}
			if($.osl.isNull(fileAllList) || fileAllList.length ==0 ){
				//JSONArray로 변환을 위해 빈 값 {}을 넣어둔다
				fileAllList.push({});
			}
			*/
			//추가 파일 itemId 기준 json, 추가 파일 리스트, 제거 파일 리스트, 전체 리스트
			//[{}, [], [], []]
			return [uploadFileJson, uploadFileList, removeFiles, fileAllList];
		}
	};
}();
