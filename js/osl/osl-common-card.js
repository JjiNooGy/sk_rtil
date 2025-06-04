/**
* @since 2024.12.30
* @auther 안지혜
* @see
* ---------------------------------------------------
* 수정일시		|	수정자	|	내용
* ---------------------------------------------------
* 2024.12.30|	안지혜	|	공통으로 사용될 이력 카드 스크립트 분리
* ---------------------------------------------------
**/

var OSLCmmCard = function(){
	/*
	* function 명 : fnCmmTagCard
	* - 사용자, 조직, 권한, 결재, 이력 등 공통 카드 태그 폼 그리기 위한 객체
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
	*		-----아래 조건은 사용자 다건일 때 사용
	*		targetUsrCnt : //사용자 수 - 존재하면, 리스크 카운트에 따라 뱃지 표출
	*		retireCnt : //사직원 수
	*		chgDeptUsrCnt : //부서이동 수
	* 	},
	* }
	* @param areaElem : 넣을 영역 객체
	* return : html 반환
	*/
	const fnCmmTagCard = function(config, data){
		//기본 config
		var defaultConfig = {
			size : "md", //카드 크기 lg, md, sm
			checkboxView : false,//체크박스
			checkbox: {
				class: "", // 체크박스 클래스
				disabled: false, // disabled 여부
				checked: false, // checked 여부
			},
			removeBtnView : true, //삭제 버튼
			prevBadgeView : false, //아이콘 앞 뱃지 표출
			nextBadgeView : false, //사용자 명 뒤에 뱃지 표출
			iconView : false, //아이콘
			subLabelView : false, //예시_사용자 카드 표출 일 때 직급/직책 표출
			subDescView : false, //예시_사용자 카드 표출 일 때 부서명 표출
			useSelect : false, //카드에 select box 사용 여부
			select : { //useSelect 옵션 true인 경우 select box 관련 옵션 사용
				data : [], //select box에 사용 될 데이터 리스트 (getMulticommonCodeDataForm 가 가져오는 데이터 기준)
				selData : "", //select 세팅 시 기본적으로 선택된 상태로 표출할 데이터
				useDefaultOpt : false, // 전체, 선택 등 데이터를 제외한 기본 옵션 표출 여부 
				defaultOptStr : "", // 전체, 선택 등 기본 옵션 표출 명
			},
			html : {
				iconType : "user", //user, dept, auth, other
				otherIconClass : "", //iconType other일 때만 적용 가능 - 아이콘 클래스 전달
				iconBorder : true, //아이콘 부분에 회색 라운드처리
				changeRiskIcon : false, //아이콘 표출 부분을 리스크 아이콘으로 변경. -- 기본 표출은 뱃지이며, true일 땐 뱃지가 아닌 아이콘에 표출된다.
				contentHtml : "", //iconType other일 때만 직접 콘텐츠를 만들어서 넣을 경우 -- 이력 내용 영역
				prevBadgeType : "badge", //아이콘 앞 뱃지 표출 타입 : badge, other
				prevBadgeClass : "", //아이콘 앞 뱃지 클래스
				prevBadgeTxt : "", //아이콘 앞 뱃지 텍스트
				prevBadgeHtml : "", //prevBadgeType other일 때만 직접 콘텐츠 넣는다.
				nextBadgeType : "badge", //target 표출 뒤 뱃지 표출 타입 : badge, other
				nextBadgeClass : "", //target 표출 뒤 뱃지 클래스
				nextBadgeIcon : "", //target 표출 뒤 뱃지 아이콘
				nextBadgeTxt : "", //target 표출 뒤 뱃지 텍스트
				nextBadgeHtml : "", //nextBadgeType other일 때만 직접 콘텐츠 넣는다.
			},
			targetKey : "usrId", //매칭 키 값 지정
			targetCd : "01", //PRJ00018 01 사용자, 02 권한 그룹, 03 조직, -1 그 외
			cardClass : "",
			removeBtnClass : "", //삭제버튼 사용 시 필요한 클래스 전달
			dataOptStr : "",
			currentTarget : false,//카드 타이틀에 현재 배지 표출 여부 지정
		};
		
		config = $.extend({}, defaultConfig, defaultConfig, config);
		
		//undefind 없게 하기 위해
		$.each(Object.keys(defaultConfig["html"]), function(n, key){
			//병합 시 데이터 해당 키가 없거나 전달 받은 값이 없으면 초기화
			if($.osl.isNull(config["html"][key])){
				if(key=="iconType"){
					config["html"][key] = "user";
				}else if(key=="iconBorder"){
					config["html"][key] = true;
				}else if(key=="changeRiskIcon"){
					config["html"][key] = false;
				}else if(key=="prevBadgeType"){
					config["html"][key] = "badge";
				}else if(key=="nextBadgeType"){
					config["html"][key] = "badge";
				}else{
					config["html"][key] = "";
				}
			}
		});
		$.each(Object.keys(config), function(n, key){
			if(key == "html"){
				return true;
			}
			else if($.osl.isNull(config[key])){
				config[key] = "";
			}
		});
		
		//1. 타입 확인
		var detailType = "other"; //user, dept, auth, other
		var otherKey = ""; //targetCd가 -1일 때 구분을 위한 키 전달용
		if(config["targetCd"] == "01"){
			detailType = "user";
		}
		else if(config["targetCd"] == "02"){
			detailType = "dept";
		}
		else if(config["targetCd"] == "03"){
			detailType = "auth";
		}
		else {
			detailType = "other";
			otherKey = 'data-target-key-name= "'+config["targetKey"]+'"';
		}
		
		//2. 체크박스 표출 여부
		var checkboxHtml = '';
		if(config["checkboxView"]){
			
			//disabled 옵션 
			var disabled = "";
			if(config["checkbox"]["disabled"]) {
				disabled = "disabled";
			}
			//checked 옵션
			var checked = "";
			if(config["checkbox"]["checked"]) {
				checked = "checked";
			}
			
			checkboxHtml = `<div class="form-check form-check-custom p-2">
								<input class="form-check-input osl-evt__card-checkbox ${config["checkbox"]["class"]}" type="checkbox" id="cmmTagCheck_${data[config["targetKey"]]}" name="cmmTagCheck_${data[config["targetKey"]]}" ${disabled} ${checked}>
							</div>`;
		}
		
		//2. 아이콘 앞 뱃지 표출 여부
		var prevBadgeHtml = '';
		if(config["prevBadgeView"]){
			var paramHtml = config["html"];
			var badgeType = paramHtml["prevBadgeType"];
			var badgeClass = paramHtml["prevBadgeClass"];
			var badgeTxt = $.osl.escapeHtml(paramHtml["prevBadgeTxt"]);
			
			if(badgeType == "badge"){
				prevBadgeHtml = `
					<span class="badge badge-circle badge-${config["size"]} osl-ms-8 ${badgeClass}">${badgeTxt}</span>
				`;
			}
			else if(badgeType == "other"){
				prevBadgeHtml = paramHtml["prevBadgeHtml"];
			}
		}
		
		//2. target data 표출 뒤 뱃지 표출 여부
		var nextBadgeHtml = '';
		if(config["nextBadgeView"]){
			var paramHtml = config["html"];
			var badgeType = paramHtml["nextBadgeType"];
			var badgeClass = paramHtml["nextBadgeClass"];
			var badgeIcon = paramHtml["nextBadgeIcon"];
			var badgeTxt = $.osl.escapeHtml(paramHtml["nextBadgeTxt"]);
			
			if(badgeType == "badge"){
				nextBadgeHtml = `
					<span class="badge osl-mx-8 ${badgeClass}">
						<i class="osl-icon osl-sm osl-me-4 ${badgeIcon}"></i>
						${badgeTxt}
					</span>
				`;
			}
			else if(badgeType == "other"){
				nextBadgeHtml = paramHtml["nextBadgeHtml"];
			}
		}
		
		//2. 아이콘 표출일 때 타입에 따라 아이콘 지정
		var iconHtml = '';
		if(config["iconView"]){
			var paramHtml = config["html"];
			var iconType = paramHtml["iconType"];
			var iconBgClass = 'osl-border-circle osl-bg-gray-004';
			if(!paramHtml["iconBorder"]){
				iconBgClass = '';
			}
			
			//아이콘 타입
			if($.osl.isNull(iconType) || ["user", "dept", "auth", "other"].indexOf(iconType) == -1){
				iconType = "user";
				config["html"]["iconType"] = iconType;
			}
			
			//지정된 아이콘 넣어주기
			if(iconType == "user"){
				iconHtml = `
					<div class="d-flex align-items-center justify-content-center osl-ms-8 ${iconBgClass}">
						<i class="osl-icon osl-${config["size"]} osl-icon-user"></i>
					</div>
				`;
				
				//보안 리스크 뱃지로 변경이면
				if(paramHtml["changeRiskIcon"]){
					//리스크 여부에 따라 아이콘 변경
					if(data.hasOwnProperty("risk")){
						//우선 순위 : 퇴사자 > 사직원 > 부서이동
						if(data["risk"]["chgDel"] == "Y" || data["risk"]["chgDel"] == true){
							iconHtml = `
								<div class="d-flex align-items-center justify-content-center osl-ms-8 ${iconBgClass}">
									<i class="osl-icon osl-${config["size"]} osl-icon-person-off-gray"></i>
								</div>
							`;
						}
						else if(data["risk"]["chgYet"] == "Y" || data["risk"]["chgYet"] == true){
							iconHtml = `
								<div class="d-flex align-items-center justify-content-center osl-ms-8 ${iconBgClass}">
									<i class="osl-icon osl-${config["size"]} osl-icon-person-off"></i>
								</div>
							`;
						}
						else if(data["risk"]["chgDept"] == "Y" || data["risk"]["chgDept"] == true){
							iconHtml = `
								<div class="d-flex align-items-center justify-content-center osl-ms-8 ${iconBgClass}">
									<i class="osl-icon osl-${config["size"]} osl-icon-swap"></i>
								</div>
							`;
						}
					}
				}
			}
			else if(iconType == "dept"){
				iconHtml = `
					<div class="d-flex align-items-center justify-content-center osl-ms-8 ${iconBgClass}">
						<i class="osl-icon osl-${config["size"]} osl-icon-group--black"></i>
					</div>
				`;
			}
			else if(iconType == "auth"){
				iconHtml = `
					<div class="d-flex align-items-center justify-content-center osl-ms-8 ${iconBgClass}">
						<i class="osl-icon osl-${config["size"]} osl-icon-groupPeople--black"></i>
					</div>
				`;
			}
			//기타
			else {
				var otherIconClass = paramHtml["otherIconClass"];
				//없으면 대체
				if($.osl.isNull(otherIconClass)){
					otherIconClass = "osl-icon-group-people";
				}
				
				iconHtml = `
					<div class="d-flex align-items-center justify-content-center osl-ms-8 ${iconBgClass}">
						<i class="osl-icon osl-${config["size"]} ${otherIconClass}"></i>
					</div>
				`;
			}
		}
		
		//보안 리스크 표출 html
		var riskBadgeHtml = '';
		
		//3. 보안 리스크 적용 - 존재 시 단일 표출 또는 다건으로 인한 툴팁 내용 표출
		if(data.hasOwnProperty("risk")){
			var paramRisk = data["risk"];
			//사용자 수 범위 데이터가 존재하면
			if(paramRisk.hasOwnProperty("targetUsrCnt")){
				//다건 카드를 그리는 것으로 판단하여 리스크 뱃지는 카운트가 표출되는 툴팁으로 반환
				riskBadgeHtml = $.osl.getReqRisksLabel(paramRisk);
			}
			//단건으로 판단하여 해당 사용자의 리스크 정보 뱃지로 반환
			else{
				riskBadgeHtml = $.osl.getUsrRiskLabel(paramRisk);
			}
		}
		
		//4. 타겟 키, 코드 지정
		var targetKeyOpt = 'data-target-key="'+data[config["targetKey"]]+'" data-target-cd="'+config["targetCd"]+'" ' + otherKey;
		//옵션으로 들어온 데이터 옵션 추가
		if(!$.osl.isNull(config["dataOptStr"])){
			targetKeyOpt += " "+config["dataOptStr"];
		}
		
		//5. 삭제 버튼 표출 유무에 따라
		var removeBtnStr = '';
		if(config["removeBtnView"]){
			/*
			removeBtnStr = `
				<div>
					<x class="tagify__tag__removeBtn p-4 rounded order-0 fs-1 osl-evt__tag-remove-btn" role="button" aria-label="remove button"></x>
				</div>
			`;
			*/
			removeBtnStr = `
				<button type="button" class="btn p-2 osl-evt__tag-remove-btn ${config["removeBtnClass"]}">
					<i class="osl-icon osl-sm osl-icon-closed--black"></i>
				</button>
			`;
		}
		
		
		//6. 데이터 가공
		var title = '';
		var subLabel = '';
		var subDesc = '';
		var contentHtml = config["html"]["contentHtml"];

		//서브 라벨 표출
		if(config["subLabelView"]){
			subLabel = $.osl.escapeHtml(data["subLabel"]);
			subLabel = `
				<span class="osl-evt__search-active d-flex flex-column-auto w-100 osl-fc-gray-006 osl-fs-11" data-txt="${subLabel}">
					${subLabel}
				</span>
			`;
		}
		//서브 내용 표출
		if(config["subDescView"]){
			subDesc = $.osl.escapeHtml(data["subDesc"]);
			if($.osl.isNull(subDesc)){
				subDesc = ''; //전달되는 데이터 중 직접적으로 undifined 가 들어오는 경우가 있어서 추가
			}
			subDesc = `
				<div class="osl-evt__search-active osl-fs-11 osl-w--fit-content text-muted text-break text-truncate osl-word-break--keep-all" data-txt="${subDesc}">
					${subDesc}
				</div>
			`;
		}
		
		//7. SELECT 세팅 
		var selectHtml = '';
		if(config["useSelect"]) {
			
			var optionsStr = "";

			//기본 옵션 있는 경우 추가
			if(config["select"]["useDefaultOpt"]) {
				optionsStr += `<option value="">${config["select"]["defaultOptStr"]}</option>`;
			}
			//옵션 데이터 추가
			$.each(config["select"]["data"], function(idx, subMap){
				
				var selected = "";
				if(subMap.subCd == config["select"]["selData"]) {
					selected = "selected";
				}
				
				optionsStr += `<option value='${subMap.subCd}' data-sub-cd-ref1='${subMap.subCdRef1}' data-sub-cd-ref2='${subMap.subCdRef2}' data-sub-cd-ref3='${subMap.subCdRef3}' ${selected}>${subMap.subCdNm}</option>`; 
			});
			
			//selectKey 특정을 위한 ID,Name
			var selectKey = `cmmTagSelect_${data[config["targetKey"]]}`;
			//넘어온 키값 있는경우 세팅
			if(!$.osl.isNull(config["select"]["selectKey"])) {
				selectKey = config["select"]["selectKey"];
			}
			
			selectHtml += `
					<div class="position-absolute osl-end-12px osl-bottom-8px">
						<select class="form-select osl-select-bar osl-evt__card-select" data-control="select2" id="${selectKey}" name="${selectKey}" tabindex="0" aria-hidden="false" data-kt-initialized="1">
							${optionsStr}
						</select>
					</div>
			`;
		}
		
		//폰트 크기
		var fsClass = "osl-fs-13";
		if(config["size"] == "sm"){
			fsClass = "osl-fs-11";
		}
		
		//타이틀
		title = $.osl.escapeHtml(data["title"]);
		title = `<span class="osl-evt__target--name osl-evt__search-active text-truncate ${fsClass} osl-me-4" data-txt="${title}">${title}</span>`;
		title = `
			<div class="d-flex flex-column osl-word-break--line-1">
				<div class="d-flex flex-wrap align-items-end">
					${riskBadgeHtml}${title}${subLabel}
				</div>
				${subDesc}
			</div>
		`;
		
		//실제 콘텐츠. 기타 유형이 아니면 위에서 가공한 html로 전달,
		//기타 유형이면 옵션으로 전달한 html을 직접 넣는다.
		if($.osl.isNull(config["html"]["contentHtml"])){
			//콘텐츠
			contentHtml = title;
		}else{
			//콘텐츠
			contentHtml = config["html"]["contentHtml"];
		}
		
		//반환할 html
		var rtnHtml = '';
		
		if(!$.osl.isNull(nextBadgeHtml)){
			nextBadgeHtml = `<div>${nextBadgeHtml}</div>`;
			rtnHtml = `
				<div class="osl-px-4 d-flex flex-stack osl-bg-hover-gray2 cursor-pointer rounded ${config["cardClass"]} osl-evt__cmm--target-card" ${targetKeyOpt}>
					<div class="osl-target--info-box osl-${config["size"]} d-flex align-items-center">
						${checkboxHtml}
						${removeBtnStr}
						${prevBadgeHtml}
						<div class="d-flex gap-2 flex-row-fluid align-items-center px-0">
							${iconHtml}
							${contentHtml}
						</div>
						${selectHtml}
					</div>
					<div>
						${nextBadgeHtml}
					</div>
				</div>
			`;
		}
		else{
			rtnHtml = `
				<div class="osl-target--info-box osl-${config["size"]} osl-p-4 d-flex align-items-center osl-bg-hover-gray2 cursor-pointer rounded osl-evt__cmm--target-card ${config["cardClass"]}" ${targetKeyOpt}>
					${checkboxHtml}
					${removeBtnStr}
					${prevBadgeHtml}
					<div class="d-flex gap-2 flex-row-fluid align-items-center px-0">
						${iconHtml}
						${contentHtml}
					</div>
					${selectHtml}
				</div>
			`;
		}
		return rtnHtml;
	};
	
	/*
	* function 명 : fnCmmTagCardDatas
	* function 설명 : 해당 영역에 있는 카드 데이터 가져오기
	* @param elem : 지정 영역 객체
	*/
	const fnCmmTagCardDatas = function(elem){
		var rtnList = {};
		var targetKeyList = [];
		var targetObjList = []; //json
		
		//선택 객체에서 osl-evt__cmm--target-card 찾기
		var elemList = $(elem).find(".osl-evt__cmm--target-card");
		
		if(elemList.length > 0){
			$.each(elemList, function(e, target){
				var targetId = $(target).data("target-key");
				var targetCd = $(target).data("target-cd");
				var targetNm = $(target).find(".osl-evt__target--name").text().trim();
				
				var targetObj = {
					"targetId" : targetId,
					"targetNm" : targetNm,
					"targetCd" : targetCd
				};
				
				if(targetKeyList.indexOf(targetId) == -1){
					targetKeyList.push(targetId);
					targetObjList.push(targetObj);
				}
			});
		}
		
		rtnList["idList"] = targetKeyList;
		rtnList["objList"] = targetObjList;
		
		return rtnList;
	};
	
	/*
	* 이력 카드 기본 구조
	* main일 때
	* (1) <div class="timeline-item ${oslEvtClassHeadStr}--timeline d-flex w-100"> -- 이력 유형에 따른 타임라인 구조
	* (2)	<div class="timeline-line w-24px osl-history-bar"> -- 타임라인 바
	* (3)		<div class="timeline-icon badge badge-circle badge-sm badge-gray"> -- 이력 유형 아이콘
	* (4)			<div class="symbol-label ${symbolColor}"> -- 이력 최상단의 것만 색상 표출해야할 경우 해당 영역에 클래스 삽입
	* (#)				<i class="osl-icon osl-icon-sm osl-icon-w-change"> -- 이력 유형에 따라 아이콘 변경
	* (5)			<div class="mt-2 badge"> -- 유형
	* (#)				<span class="osl-fs-11" data-lang-cd="${logTypeNmCd}">
	* (6)	<div class="timeline-content osl-pb-40 flex-row-fluid"> -- 실제 이력 표출 영역을 위한 박스
	* (7)		<div class="osl-fs-11 text-muted osl-mb-4"> -- 이력 시간 표출 영역
	* (8)			<i class="osl-icon osl-icon-sm osl-icon-history--black osl-me-4">
	* (8)		<div class="osl-card-status osl-card-ticket-wrap"> -- 이력 카드 영역
	* (9)			<div class="osl-card-ticket-header"> -- 이력 카드 헤더 : 이력 등록자 표출, 결재선 상세보기 표출, 프로세스명 표출, 단계명 표출 등
	* (0)				<div> -- 이력 등록자
	* (1)				<div> -- 결재선 상세, 프로세스명, 단계명 등
	* (2)			<div class="osl-card-ticket-body"> -- 실제 이력 표출 영역
	* (#)				-- 실제 이력 카드 그리기 --
	* (3)				<div class="px-2 w-50 ${oslEvtClassHeadStr}--detail-content" ${config["html"]["cardDataOpts"]}> -- 수정이력일 때 표출될 영역
	* (#)				<div class="d-none d-inline-flex ${oslEvtClassHeadStr}--detail-content--diff" data-log-id="${chgDetailId}"> -- 수정이력일 때 표출될 영역 (diff)
	* (#)					<div class="d-flex flex-wrap h-300px w-50 bg-pink rounded justify-content-center align-content-start"> -- 변경 전
	* (#)					<div class="d-flex flex-wrap h-300px w-50 bg-teal rounded justify-content-center align-content-start"> -- 변경 후
	* (#)				<div class="d-none px-2 ${oslEvtClassHeadStr}--detail-content--message" data-log-id="${chgDetailId}"> -- 수정이력일 때 표출될 영역 (첨부파일 목록)
	*
	*
	* main 아닐 때 - 실제 이력 카드
	* (1) <div class="osl-evt__log_block"> -- 화살표와 이력 카드를 한 세트로 묶기 위한 영역
	* (2)	<div class="osl-status-status"> -- 실제 카드 영역
	* (3)		<div class="osl-status-header"> -- a.상단 상태 정보 : b.프로세스/단계 스타일 활성화 시 해당 부분 적용
	*												(상태 클래스 : status-blue, status-green, status-red, status-gray, status-light-gray, 흰색은 없음)
	* (4)			<div class="d-flex justify-content-between"> -- 프로세스 스타일 활성화일 때
	* (#)				<div>프로세스명
	* (#)				<div>버튼
	* (4)			<div class="osl-status-title"> -- 프로세스 스타일 비활성화일 때
	* (#)				<span class="label-status">현재 --현재 info와 관련된 이력일 때의 라벨 표출
	* (#)				<span class="status-title">제목
	* (5)		<div class="osl-status-container"> -- 실제 내용 (하위에 osl-status-content 존재)
	* (6)		<div class="osl-status-footer"> -- 풋터
	*/
	
	/*
	* function 명 : fnCmmHisCard
	* function 설명 : 받은 데이터로 영역에 이력 카드 그리기
	* @param config : 옵션
	* @param data : 데이터
	* return : html 반환
	*/
	const fnCmmHisCard = function(config, data){
		//data : {}, //이력 데이터(json)
		
		//기본 config
		var defaultConfig = {
			main : false, //수정/변경/결재/연결/삭제 이력 구분을 위한 그룹핑 여부
			type : "update", //update, change, sign, link, delete
			title : "", //이력 카드 상단 표출명
			content : "", //이력 카드 바디 표출 내용
			rtnArrow : false, //화살표 반환
			rtnArrowDirection : "up", //바깥 화살표 방향 - up, down, left, right
			rtnArrowAppend : "front", //바깥 화살표 붙이는 순서(front, back)
			rtnInArrow : false, //내부 화살표 반환
			rtnInArrowDirection : "up", //내부 화살표 방향 - up, down, left, right
			forceStyleProcess : true, //강제로 프로세스 폼으로 표출되어야 하는 이력의 스타일 막을 때 사용 (true이면 원래 적용대로, false이면 무시하고 표출 안함)
			signLineView : false, //결재 이력에서만 사용 (true, false)
			currentLable : false, //현재 info와 같은 이력인지 표출해야하는 경우 true/false
			html :{
				blockClass: "", //블럭(카드+바깥 화살표)에 들어갈 클래스
				blockDataOpts : "", //블럭(카드+바깥 화살표)에 들어갈 데이터 옵션
				cardClass: "", //카드에 들어갈 클래스
				cardDataOpts : "", //카드에 들어갈 데이터 옵션
				headerClass: "", //헤더 영역에 들어갈 클래스
				headerDataOpts : "", //헤더 영역에 들어갈 데이터 옵션
				titleClass: "", //타이틀 영역에 들어갈 클래스
				toolbarClass: "", //툴바 영역에 들어갈 클래스
				bodyClass: "", //바디 영역에 들어갈 클래스
				bodyDataOpts :"", //바디 영역에 들어갈 데이터 옵션
				footerClass: "", //풋터 영역에 들어갈 클래스 -- main일 땐 불가
				footerDataOpts :"", //풋터 영역에 들어갈 데이터 옵션 -- main 일 땐 불가
				toolbarContent: "", //html 툴바 영역에 들어갈 html
			},
			flowFuncDataList : [], //단계 기능 목록
			eptTargetInfo : {}, //소명 대상자 정보
		};
		
		config = $.extend({}, defaultConfig, config);
		
		//undefind 없게 하기 위해
		$.each(Object.keys(defaultConfig["html"]), function(n, key){
			//병합 시 데이터 해당 키가 없거나 전달 받은 값이 없으면 초기화
			if($.osl.isNull(config["html"][key])){
				config["html"][key] = "";
			}
		});
		$.each(Object.keys(config), function(n, key){
			if(key == "html"){
				return true;
			}
			else if(key == "flowFuncDataList"){
				if($.osl.isNull(config[key]) || config[key].length == 0){
					config[key] = [];
				}
			}
			else if(key == "eptTargetInfo"){
				return true;
			}
			else if($.osl.isNull(config[key])){
				config[key] = "";
			}
		});
		
		//전달 받은 이력 유형(HIS00001) - 01 티켓, 02 양식, 03 정보자산, 04 소명, 05 이상징후, 06 권한 설정, 07 특수권한
		var hisTargetCd = data["hisTargetCd"];
		//보조 대상 - HIS00002 - 01 변경, 02 수정, 03 결재, 04 연결, 05 삭제
		var subTargetId = data["subTargetId"];
		var subTargetCd = data["subTargetCd"];
		var chgDetailId = data["chgDetailId"];
		var chgDetailNum = data["chgDetailNum"];
		var chgDetailType = String(data["chgDetailType"]); //코드가 간혹 int형으로 체크되는 경우 있기 때문에.
		
		//이력을 그려야 하는데, 전달 받은 옵션 유형(change, update, sign, link, delete)과 다르면 중지
		//변경이력 그리라고 했을 때
		if(config["type"] == "change"){
			if(subTargetCd != "01") {
				//변경이력이 아니면 중지
				return;
			}
		}
		//수정이력 그리라고 했을 때
		else if(config["type"] == "update"){
			if(subTargetCd != "02") {
				//수정이력이 아니면 중지
				return;
			}
		}
		//결재이력 그리라고 했을 때
		else if(config["type"] == "sign"){
			if(subTargetCd != "03") {
				//결재이력이 아니면 중지
				return;
			}
		}
		//연결이력 그리라고 했을 때
		else if(config["type"] == "link"){
			if(subTargetCd != "04") {
				//연결이력이 아니면 중지
				return;
			}
		}
		//삭제이력 그리라고 했을 때
		else if(config["type"] == "delete"){
			if(subTargetCd != "05") {
				//삭제이력이 아니면 중지
				return;
			}
		}
		//없으면 중지
		else {
			return;
		}
		
		//이력 서브 HIS00003
		var comSubCd = data["comSubCd"];
		
		//선택자 클래스
		var oslEvtClassHeadStr = "osl-evt__history-card";
		var oslEvtMainClassStr = `${oslEvtClassHeadStr} ${oslEvtClassHeadStr}--${config["type"]}`;
		var oslEvtDetailClassStr = `osl-evt__${config["type"]}-log-item`;
		
		//화살표
		//바깥 화살표
		var arrowHtml = '';
		//지정
		var betweenArrowHtml = '';
		var arrowHtmlUp = `<div class="${oslEvtClassHeadStr}--arrow d-flex align-items-center justify-content-center"><i class="osl-icon osl-icon-upward m-2"></i></div>`;
		var arrowHtmlDown = `<div class="${oslEvtClassHeadStr}--arrow d-flex align-items-center justify-content-center"><i class="osl-icon osl-icon-downward m-2"></i></div>`;
		var arrowHtmlLeft = `<div class="${oslEvtClassHeadStr}--arrow d-flex align-items-center justify-content-center"><i class="osl-icon osl-icon-backward m-2"></i></div>`;
		var arrowHtmlRight = `<div class="${oslEvtClassHeadStr}--arrow d-flex align-items-center justify-content-center"><i class="osl-icon osl-icon-forward m-2"></i></div>`;
		//바깥 화살표
		if(config["rtnArrow"]){
			//화살표 방향이 위쪽
			if(config["rtnArrowDirection"] == "up"){
				arrowHtml = arrowHtmlUp;
			}
			//화살표 방향이 아래쪽
			else if(config["rtnArrowDirection"] == "down"){
				arrowHtml = arrowHtmlDown;
			}
			//화살표 방향이 왼쪽
			else if(config["rtnArrowDirection"] == "left"){
				arrowHtml = arrowHtmlLeft;
			}
			//화살표 방향이 오른쪽
			else{
				arrowHtml = arrowHtmlRight;
			}
		}
		//안쪽 화살표
		if(config["rtnInArrow"]){
			if(config["rtnInArrowDirection"] == "up"){
				betweenArrowHtml = arrowHtmlUp;
			}
			//화살표 방향이 아래쪽
			else if(config["rtnInArrowDirection"] == "down"){
				betweenArrowHtml = arrowHtmlDown;
			}
			//화살표 방향이 왼쪽
			else if(config["rtnInArrowDirection"] == "left"){
				betweenArrowHtml = arrowHtmlLeft;
			}
			//화살표 방향이 오른쪽
			else{
				betweenArrowHtml = arrowHtmlRight;
			}
		}
		
		//최종 이력 반환
		var rtnHtml = '';
		//내부 로그
		var innerHtml = '';
		//이력등록자 카드
		var regUsrCardOpt = {
			size : "sm",
			removeBtnView : false,
			iconView: true,
			html : {
				iconType : "other",
				iconBorder : false,
				otherIconClass : "osl-icon-sm osl-icon-user--black osl-me-4",
			},
			cardClass : "osl-fs-11 text-muted",
			targetKey : "usrId",
			targetCd : "01", //PRJ00018 01 사용자, 02 권한 그룹, 03 조직
		};
		var regUsrData = {
			usrId : data["regUsrId"],
			title : $.osl.escapeHtml(data["regUsrNm"]),
		};
		//이력등록자 카드
		var regUsrCardHtml = fnCmmTagCard(regUsrCardOpt, regUsrData);
		//이력 등록 일시
		var paramDatetime = new Date(parseInt(data["regDtm"]));
		var agoTimeStr = $.osl.datetimeAgo(paramDatetime, {fullTime: "d", returnFormat: "yyyy-MM-dd HH:mm:ss"}).agoString;
		var regDtmHtml = `<span class="osl-fs-11 text-muted osl-mt-8 text-start osl-px-8">
							<i class="osl-icon osl-icon-sm osl-icon-history--black osl-me-4"></i>
							${agoTimeStr}
						</span>
						`;
					
					
		//이전 데이터
		var prev = {
			bgColor : data["preFlowTitleBgColor"],
			color : data["preFlowTitleColor"],
			sytle : "",
		};
		//다음 데이터
		var next = {
			bgColor : data["chgFlowTitleBgColor"],
			color : data["chgFlowTitleColor"],
			sytle : "",
		};
		
		//색상 값이 없으면
		if($.osl.isNull(next["bgColor"])){
			next["bgColor"] = $.osl.color("light");
		}
		if($.osl.isNull(next["color"])){
			next["color"] = $.osl.color("dark");
		}
		if($.osl.isNull(prev["bgColor"])){
			prev["bgColor"] = next["bgColor"];
		}
		if($.osl.isNull(prev["color"])){
			prev["color"] = next["color"];
		}
		
		//색상
		//색상이 흰색에 가까워 안보일 때를 대비한 border 색상
		var logBorderColor = $.osl.colorCalculateColor(next["bgColor"]);
		//이전-다음 프로세스 단계 색상 : 색상의 최소화를 위해 주석처리
		//prev["style"] = "background-color:"+prev["bgColor"]+" !important;color:"+prev["color"]+" !important;border:1px solid "+logBorderColor+" !important;";
		//next["style"] = "background-color:"+next["bgColor"]+" !important;color:"+next["color"]+" !important;border:1px solid "+logBorderColor+" !important;";
		prev["style"] = "";
		next["style"] = "";
		var defaultStyle = "background-color:"+data["flowTitleBgColor"]+" !important;color:"+data["flowTitleColor"]+" !important;border:1px solid "+logBorderColor+" !important;";
		
		//비교 변수
		var preDetailVal = data["preDetailVal"];
		var chgDetailVal = data["chgDetailVal"];
		//indexOf 체크하는 것이 있기 때문에 null 방지
		if($.osl.isNull(preDetailVal)){
			preDetailVal = "";
		}
		if($.osl.isNull(chgDetailVal)){
			chgDetailVal = "";
		}
		//참조 변수
		var preDetailSubId = data["preDetailSubId"];
		var chgDetailSubId = data["chgDetailSubId"];
		
		//이력 대상 항목 명
		var chgDetailNm = data["chgDetailNm"];
		var chgDetailLng = data["chgDetailLng"];
		//이력 대상 항목 서브 라벨명(ex_체크리스트 옵션 명)
		var chgDetailSubNm = data["chgDetailSubNm"];
		//이력 항목 공통코드
		var chgDetailCommonCd = data["chgDetailCommonCd"];
		
		//.osl-status-header 에 해당
		//상단 상태 정보에 따른 클래스 (status-blue, status-green, status-red, status-gray, status-light-gray, 흰색은 없음)
		var statusHeaderClass = 'status-light-gray';
		
		//헤더 부분을 프로세스 형식으로 표출인지
		var styleProcess = false;
		//프로세스 형식일 때, 헤더에 넣을 html
		var processHeadrHtml = '';
		var headerToolbar = ''; //기능 버튼 관련
		//단계 최종 종료 상태 값
		var flowDoneCd = "02";
		//이력의 단계 최종 종료 상태 값
		if(!$.osl.isNull(data["chgFlowDoneCd"])){
			flowDoneCd = data["chgFlowDoneCd"];
		}
		//기능 버튼 클릭 시 표출된 1, 2depth 기능 메뉴
		var fnDatasDropdown = '';
		
		//프로세스 형식이 아닐 때, 해더에 넣을 html
		var defaultHeaderHtml = '';
		//프로세스 형식과 상관 없이 헤더의 firstElem / secondElem
		//현재 info와 관련된 이력일 때의 라벨 표출을 해야하는 경우
		var currentLableHtml = '';
		if(config["currentLable"]){
			currentLableHtml = `
					<span class="label-status" data-lang-cd="history.badge.title.current">${$.osl.lang("history.badge.title.current")}</span>
				`;
		}
		//기본 타이틀
		var headerTitle = $.osl.lang("history.comSub"+comSubCd);
		var notChangeHeaderTitle = false; //존재하면 바꾸지 않음
		//전달 받은 title 존재 시 default 선언
		if(!$.osl.isNull(config["title"])){
			notChangeHeaderTitle = true;
			headerTitle = $.osl.escapeHtml(config["title"]);
		}
		//main 표출일 때, 헤더의 우측에 존재할 서브 값
		var subHeaderTitleHtml = '';
		
		//.osl-status-container에 들어갈 content 선언
		var logContentHtml = '';
		//content 구분 클래스
		var logContentClass = 'd-flex osl-py-12i'; //osl-status-content 에 들어갈 클래스
		//메인이 아니거나 수정이력이면
		if(!config["main"] || subTargetCd == "02"){
			logContentClass += ' flex-column';
			
			if(subTargetCd == "02"){
				logContentClass += ' align-items-start';
			}else{
				logContentClass += ' align-items-center justify-content-center';
			}
		}
		else{
			logContentClass += ' align-items-center';
		}
		
		//기본
		//logContentHtml에 넣기 전
		var bodyHtml = '';
		//수정 이력에서 사용될 서브 contentHtml
		var subBodyHtml = '';
		
		//결재선 정보 표출 - 결재 이력에서만 사용!
		var signLineHtml = '';
		
		//결재 등 사유란 - 유형과 상관 없음
		var chgComment = data["chgComment"];
		
		var chgCommentHtml = '';
		var chgCommentFileHtml = '';
		//사유 존재 시
		if(!$.osl.isNull(chgComment)){
			//줄바꿈의 경우 메인 여부에 따라 지정 - 여기서 해야함
			var reasonDetailClass = 'osl-word-break--line-2';
			//메인이거나 결재이력이면 줄바꿈 없음
			if(config["main"] || subTargetCd == "03"){
				//줄바꿈 없음
				reasonDetailClass = '';
			}
			
			//사유에 대한 첨부파일 존재 시
			if(!$.osl.isNull(chgDetailSubId) && chgDetailSubId.indexOf("FILE_") == 0){
				chgCommentFileHtml = `
						<div class="reason-detail osl-mt-8 ">
							<div class="osl-word-break--line-2 osl-fs-11 osl-lh-n osl-evt__file-popup cursor-pointer" data-atchFileId="${chgDetailSubId}">
								${$.osl.lang("history.label.atchFile")}
							</div>
						</div>
					`;
			}
			
			//사유 content
			chgCommentHtml = `
					<div class="osl-status-content reason">
						<i class="osl-icon osl-icon-sm osl-icon-warning osl-me-8"></i>
						<span data-lang-cd="history.sign.label.comment">${$.osl.lang("history.sign.label.comment")}</span>
						<div class="reason-detail osl-mt-8 ">
							<div class="osl-fs-11 osl-lh-n ${reasonDetailClass}">
								${chgComment}
					 		</div>
						</div>
						${chgCommentFileHtml}
					</div>
			`;
			
			//신청서 별도 - 수정 이력의 항목이 사용자, 디바이스이면, 사유는 usrInfoMap, jamf Id와 부트스트랩 토큰을 보관하고 있어 표출하지 않는다.
			if(subTargetCd == "02" && hisTargetCd == "01" && (chgDetailType == "09" || chgDetailType == "16")){
				//사유 제거
				chgCommentHtml = '';
			}
		}
		
		//전달 받은 이력 타입에 따라 가공 시작
		/**********************************************/
		//변경이력
		if(subTargetCd == "01"){
			//변경 이력에서의 기본 타이틀
			if(!notChangeHeaderTitle){
				headerTitle = $.osl.lang("history.change.comSub"+comSubCd);
				//없으면 기본 라벨로 우선 세팅
				if($.osl.isNull(headerTitle)){
					headerTitle = $.osl.lang("history.comSub"+comSubCd);
				}
			}
			
			//이력 대상(HIS00001 - hisTargetCd)
			//이력 유형 별 세팅(HIS00003 - comSubCd)
			//타이틀 변경되어야 하는 것만 분기 처리
			if(hisTargetCd == "01" && ["09", "12", "13", "17", "20", "21", "26", "27", "28"].indexOf(comSubCd) > -1){
				//티켓 적용 요청(적용 대기 상태), 접수 승인, 접수 반려, 티켓 종료, 프로세스 이관, 단계 변경, 티켓 처리 완료, 적용 성공, 적용 실패
				//만약, 09 요청이 적용 대기 상태 외에 다른 것이 발생되면, chgDetailType 값이 12, chgDetailCommonCd가 REQ00020 인 것이 적용 대기로, 해당 값으로 구분 되어야 한다.
				if(!notChangeHeaderTitle){
					headerTitle = $.osl.lang("history.change.target01.comSub"+comSubCd);
				}
			}
			else if(hisTargetCd == "04" && ["09", "10", "11", "13", "14", "22", "24", "25", "26", "29", "30", "31"].indexOf(comSubCd) > -1){
				//소명 요청, 소명 회수, 소명 반려, 소명 건너뛰기, 요청자 변경, 대상자 변경, 소명 답변, 소명 완료, 예외처리 승인, 예외처리 미승인 위험도 변경
				if(!notChangeHeaderTitle){
					//이의제기인 경우
					if(data["eptTypeCd"] == "02" && ["09", "11", "25", "26"].indexOf(comSubCd) > -1){
						headerTitle = $.osl.lang("history.change.target04.sckEpt.comSub"+comSubCd);
					}
					//그 외
					else{
						headerTitle = $.osl.lang("history.change.target04.comSub"+comSubCd);
					}
				}
			}
			else if(hisTargetCd == "07" && ["22", "24"].indexOf(comSubCd) > -1){
				//특수권한 처리자(담당자), 권한부여 대상자(요청자)
				if(!notChangeHeaderTitle){
					headerTitle = $.osl.lang("history.change.target07.comSub"+comSubCd);
				}
			}
			
			//**내용**/
			//입력일 때, chgDetailVal 값이 결재선이면
			if(comSubCd == "01" && chgDetailVal.indexOf("SIG") == 0){
				//명칭 수정
				if(!notChangeHeaderTitle){
					//결재선 등록으로 표출 - 사전 결재선일 때 발생
					headerTitle = $.osl.lang("history.change.comSub"+comSubCd+"Sign");
				}
				
				styleProcess = true;
				//프로세스 형식 표출 강제 false인 경우
				if(!config["forceStyleProcess"]){
					styleProcess = false;
					bodyTitle = $.osl.lang("history.change.comSub23");
				}
				
				//결재선 표출
				var tempOpt = {
					removeBtnView :false,
					iconView : true,
					html : {
						iconType : "other",
						iconClass : "osl-icon-list",
					},
					targetKey : "signLineId",
					targetCd : "-1"
				};
				
				var tempData = {
						signLineId : chgDetailVal,
						title : $.osl.lang("history.sign.label.detailSignLine"),//결재선 상세 보기
					};
				
				bodyHtml = fnCmmTagCard(tempOpt, tempData);
			}
			//소명 - 요청/재요청
			else if(hisTargetCd == "04" && comSubCd == "09"){
				var eptTargetInfo = config["eptTargetInfo"];
				//소명 대상자
				//옵션
				var tempOpt = {
					removeBtnView :false,
					iconView : true,
					html : {
						iconType : "user"
					},
					targetKey : "eptUsrId",
					targetCd : "01",
					subDescView : true, //예시_사용자 카드 표출 일 때 부서명 표출
				};
				
				var personHtml01 = '';
				var personHtml02 = '';
				//1. 일반 대상자
				var tempData = {
					eptUsrId : eptTargetInfo["eptUsrId"],
					title: eptTargetInfo["eptUsrNm"],
					subDesc: eptTargetInfo["eptDeptNm"],
				};
				personHtml01 = `<div class="d-flex align-items-center"><span class="w-50px">${$.osl.lang("history.label.eptUsr")}</span> ${fnCmmTagCard(tempOpt, tempData)} </div>`;
				//2. 팀장
				if(!$.osl.isNull(eptTargetInfo["voltLeaderId"])){
					tempOpt["targetKey"] = "voltLeaderId";
					tempData = {
						voltLeaderId : eptTargetInfo["voltLeaderId"],
						title: eptTargetInfo["voltLeaderNm"],
						subDesc: eptTargetInfo["voltLeaderDeptNm"],
					};
					//팀장까지 있는 경우 정렬
					logContentClass = 'd-flex osl-py-12i flex-column justify-content-center';
					personHtml02 = `<div class="d-flex align-items-center"><span class="w-50px">${$.osl.lang("history.label.leader")}</span> ${fnCmmTagCard(tempOpt, tempData)} </div>`
				}
				
				bodyHtml = personHtml01 + personHtml02;
			}
			//소명 - 등록
			else if(hisTargetCd == "04" && comSubCd == "25"){
				bodyHtml = `
						<div class="osl-fs-12 text-center">
							${$.osl.lang("history.messageTitle04v01v"+data["eptTypeCd"], $.osl.escapeHtml(data["regUsrNm"]))}
						</div>
					`;
			}
			//소명 - 완료
			else if(hisTargetCd == "04" && comSubCd == "26"){
				var eptTargetInfo = config["eptTargetInfo"];
				bodyHtml = `
						<div class="osl-fs-12 text-center">
							${$.osl.lang("history.messageTitle04v02v"+data["eptTypeCd"], $.osl.escapeHtml(eptTargetInfo["eptUsrNm"]))}
						</div>
					`;
			}
			//티켓 - 프로세스 이관
			else if(hisTargetCd == "01" && comSubCd == "20"){
				var preTargetCardHtml = '';
				if(!$.osl.isNull(preDetailVal)){
					preTargetCardHtml = `
						<div class="d-flex align-items-center justify-content-center w-100 osl-py-8 osl-px-16 osl-radius-10px text-white osl-bg-gray-002">
							${$.osl.escapeHtml(data["preDetailValTitle"])}
						</div>
					`;
				}
				var chgTargetCardHtml = '';
				if(!$.osl.isNull(chgDetailVal)){
					chgTargetCardHtml = `
						<div class="d-flex align-items-center justify-content-center w-100 osl-py-8 osl-px-16 osl-radius-10px text-white osl-bg-gray-001">
							${$.osl.escapeHtml(data["chgDetailValTitle"])}
						</div>
					`;
				}
				
				//둘다 존재할 때
				if(!$.osl.isNull(preTargetCardHtml) && !$.osl.isNull(chgTargetCardHtml)){
					//내부 화살표 값 존재 시
					if(config["rtnInArrow"]){
						//바디
						if(config["rtnInArrowDirection"] == "up" || config["rtnInArrowDirection"] == "left"){
							bodyHtml = chgTargetCardHtml + betweenArrowHtml + preTargetCardHtml;
						}
						else{
							bodyHtml = preTargetCardHtml + betweenArrowHtml + chgTargetCardHtml;
						}
					}
					//존재하지 않으면
					else {
						//단순 반환
						bodyHtml = preTargetCardHtml + chgTargetCardHtml;
					}
					
				}
				//하나라도 존재할 때
				else if(!$.osl.isNull(preTargetCardHtml) || !$.osl.isNull(chgTargetCardHtml)){
					bodyHtml = preTargetCardHtml + chgTargetCardHtml;
				}
			}//티켓 - 프로세스 이관
			//티켓 - 단계 변경
			else if(hisTargetCd == "01" && comSubCd == "21"){
				//기본 프로세스 헤더 스타일
				styleProcess = true;
				//프로세스 형식 표출 강제 false인 경우
				if(!config["forceStyleProcess"]){
					styleProcess = false;
				}
				
				var preTargetCardHtml = '';
				if(!$.osl.isNull(preDetailVal)){
					preTargetCardHtml = `
						<div class="d-flex align-items-center justify-content-center w-100 osl-py-8 osl-px-16 osl-radius-10px text-white osl-bg-gray-002" style="${prev["style"]}">
							${$.osl.escapeHtml(data["preDetailValTitle"])}
						</div>
					`;
				}
				var chgTargetCardHtml = '';
				if(!$.osl.isNull(chgDetailVal)){
					chgTargetCardHtml = `
						<div class="d-flex align-items-center justify-content-center w-100 osl-py-8 osl-px-16 osl-radius-10px text-white osl-bg-gray-001" style="${next["style"]}">
							${$.osl.escapeHtml(data["chgDetailValTitle"])}
						</div>
					`;
				}
				
				//둘다 존재할 때
				if(!$.osl.isNull(preTargetCardHtml) && !$.osl.isNull(chgTargetCardHtml)){
					//내부 화살표 값 존재 시
					if(config["rtnInArrow"]){
						//바디
						if(config["rtnInArrowDirection"] == "up" || config["rtnInArrowDirection"] == "left"){
							bodyHtml = chgTargetCardHtml + betweenArrowHtml + preTargetCardHtml;
						}
						else{
							bodyHtml = preTargetCardHtml + betweenArrowHtml + chgTargetCardHtml;
						}
					}
					//존재하지 않으면 단순 반환
					else {
						bodyHtml = preTargetCardHtml + chgTargetCardHtml;
					}
				}
				//하나라도 존재할 때
				else if(!$.osl.isNull(preTargetCardHtml) || !$.osl.isNull(chgTargetCardHtml)){
					bodyHtml = preTargetCardHtml + chgTargetCardHtml;
				}
			}//티켓 - 단계 변경
			//공통 - 담당자 변경
			else if(comSubCd == "22"){
				styleProcess = true;
				//프로세스 형식 표출 강제 false인 경우
				if(!config["forceStyleProcess"]){
					styleProcess = false;
				}
				
				var preTargetCardHtml = '';
				var chgTargetCardHtml = '';
				
				var preTempOpt = {
					removeBtnView :false,
					iconView : true,
				};
				var chgTempOpt = {
					removeBtnView :false,
					iconView : true,
				};
				//이전
				if(!$.osl.isNull(preDetailSubId) && !$.osl.isNull(preDetailVal) && preDetailSubId != preDetailVal){
					//둘 다 존재 시 단일 담당자 지정되어 있음
					preTempOpt["targetKey"] = "usrId";
					preTempOpt["targetCd"] = "01";
					var preTempData = {
						usrId : preDetailVal,
						title : data["preDetailValTitle"],
					};
					
					preTargetCardHtml = fnCmmTagCard(preTempOpt, preTempData);
				}
				else if(!$.osl.isNull(preDetailSubId)){
					preTempOpt["html"] = {
						"iconType" : "other"
					};
					preTempOpt["targetKey"] = "targetGrpId";
					preTempOpt["targetCd"] = "-1";
					
					var preTempData = {
						targetGrpId : preDetailSubId,
						title : $.osl.lang("history.change.label.chargerRange"), //담당 범위
					};
					
					preTargetCardHtml = fnCmmTagCard(preTempOpt, preTempData);
				}
				//이전 preDetailSubId가 없거나, 최종적으로 서로 같으면
				else if(!$.osl.isNull(preDetailVal) || preDetailSubId == preDetailVal){
					//둘 다 존재 시 단일 담당자 지정되어 있음
					preTempOpt["targetKey"] = "usrId";
					preTempOpt["targetCd"] = "01";
					var preTempData = {
						usrId : preDetailVal,
						title : data["preDetailValTitle"],
					};
					
					preTargetCardHtml = fnCmmTagCard(preTempOpt, preTempData);
				}
				
				//변경
				if(!$.osl.isNull(chgDetailSubId) && !$.osl.isNull(chgDetailVal) && chgDetailSubId != chgDetailVal){
					//둘 다 존재 시 단일 담당자 지정되어 있음
					chgTempOpt["targetKey"] = "usrId";
					chgTempOpt["targetCd"] = "01";
					var chgTempData = {
						usrId : chgDetailVal,
						title : data["chgDetailValTitle"],
					};
					
					chgTargetCardHtml = fnCmmTagCard(chgTempOpt, chgTempData);
				}
				else if(!$.osl.isNull(chgDetailSubId)){
					chgTempOpt["html"] = {
						"iconType" : "other"
					};
					chgTempOpt["targetKey"] = "targetGrpId";
					chgTempOpt["targetCd"] = "-1";
					
					var chgTempData = {
						targetGrpId : chgDetailSubId,
						title : $.osl.lang("history.change.label.chargerRange"), //담당 범위
					};
					
					chgTargetCardHtml = fnCmmTagCard(chgTempOpt, chgTempData);
				}
				//이전 chgDetailSubId가 없거나, 최종적으로 서로 같으면
				else if(!$.osl.isNull(chgDetailVal) || chgDetailSubId == chgDetailVal){
					//둘 다 존재 시 단일 담당자 지정되어 있음
					chgTempOpt["targetKey"] = "usrId";
					chgTempOpt["targetCd"] = "01";
					var chgTempData = {
						usrId : chgDetailVal,
						title : data["chgDetailValTitle"],
					};
					
					chgTargetCardHtml = fnCmmTagCard(chgTempOpt, chgTempData);
				}
				
				//내부 화살표 값 존재하고 이전 값 존재하면 화살표 같이 그리기
				if(config["rtnInArrow"] && !$.osl.isNull(preTargetCardHtml)){
					//바디
					if(config["rtnInArrowDirection"] == "up" || config["rtnInArrowDirection"] == "left"){
						bodyHtml = chgTargetCardHtml + betweenArrowHtml + preTargetCardHtml;
					}
					else{
						bodyHtml = preTargetCardHtml + betweenArrowHtml + chgTargetCardHtml;
					}
				}
				//존재하지 않으면 단순 반환
				else {
					bodyHtml = preTargetCardHtml + chgTargetCardHtml;
				}
			}//공통 - 담당자 변경
			//공통 - 결재선 변경
			else if(comSubCd == "23"){
				styleProcess = true;
				//프로세스 형식 표출 강제 false인 경우
				if(!config["forceStyleProcess"]){
					styleProcess = false;
					bodyTitle = $.osl.lang("history.change.comSub23");
				}
				
				var preTargetCardHtml = '';
				var chgTargetCardHtml = '';
				
				var tempOpt = {
					removeBtnView :false,
					iconView : true,
					html : {
						iconType : "other",
						iconClass : "osl-icon-list",
					},
					targetKey : "signLineId",
					targetCd : "-1"
				};
				
				var tempData = {
						signLineId : preDetailVal,
						title : $.osl.lang("history.change.label.prevSignLine"), //이전 결재선
					};
					
				preTargetCardHtml = fnCmmTagCard(tempOpt, tempData);
				
				tempData = {
						signLineId : chgDetailVal,
						title : $.osl.lang("history.change.label.nextSignLine"), //변경 결재선
					};
					
				chgTargetCardHtml = fnCmmTagCard(tempOpt, tempData);
				
				//내부 화살표 값 존재 시
				if(config["rtnInArrow"]){
					//바디
					if(config["rtnInArrowDirection"] == "up" || config["rtnInArrowDirection"] == "left"){
						bodyHtml = chgTargetCardHtml + betweenArrowHtml + preTargetCardHtml;
					}
					else{
						bodyHtml = preTargetCardHtml + betweenArrowHtml + chgTargetCardHtml;
					}
				}
				//존재하지 않으면 단순 반환
				else {
					bodyHtml = preTargetCardHtml + chgTargetCardHtml;
				}
			}//공통 - 결재선 변경
			//소명 - 소명 대상자 변경
			else if(hisTargetCd == "04" && comSubCd == "24"){
				//default 대상자
				var targetType = "eptTarget";
				//팀장일 경우 변경
				if(data.chgDetailNm == "voltLeaderNm"){
					targetType = "eptTargetLeader";
				}
				
				bodyHtml = `
						<div class="osl-fs-12 text-center">
							${$.osl.lang("history.change.target04.message."+targetType, preDetailVal, chgDetailVal)}
						</div>
					`;
			}//소명 - 대상자(소명 대상자) 변경
			//특수권한 - 요청자(권한부여 대상자) 변경
			else if(hisTargetCd == "07" && comSubCd == "24"){
				styleProcess = true;
				//프로세스 형식 표출 강제 false인 경우
				if(!config["forceStyleProcess"]){
					styleProcess = false;
				}
				
				var preTargetCardHtml = '';
				var chgTargetCardHtml = '';
				
				var preTempOpt = {
					removeBtnView :false,
					iconView : true,
				};
				var chgTempOpt = {
					removeBtnView :false,
					iconView : true,
				};
				
				//이전 요청자 범위
				preTempOpt["html"] = {
					"iconType" : "other"
				};
				preTempOpt["targetKey"] = "targetGrpId";
				preTempOpt["targetCd"] = "-1";
				
				var preTempData = {
					targetGrpId : preDetailSubId,
					title : $.osl.lang("history.change.label.chargerRange"), //담당 범위
				};
				
				preTargetCardHtml = fnCmmTagCard(preTempOpt, preTempData);
				
				//변경 요청자 범위
				chgTempOpt["html"] = {
					"iconType" : "other"
				};
				chgTempOpt["targetKey"] = "targetGrpId";
				chgTempOpt["targetCd"] = "-1";
				
				var chgTempData = {
					targetGrpId : chgDetailSubId,
					title : $.osl.lang("history.change.label.chargerRange"), //담당 범위
				};
				
				chgTargetCardHtml = fnCmmTagCard(chgTempOpt, chgTempData);
				
				//내부 화살표 값 존재하고 이전 값 존재하면 화살표 같이 그리기
				if(config["rtnInArrow"] && !$.osl.isNull(preTargetCardHtml)){
					//바디
					if(config["rtnInArrowDirection"] == "up" || config["rtnInArrowDirection"] == "left"){
						bodyHtml = chgTargetCardHtml + betweenArrowHtml + preTargetCardHtml;
					}
					else{
						bodyHtml = preTargetCardHtml + betweenArrowHtml + chgTargetCardHtml;
					}
				}
				//존재하지 않으면 단순 반환
				else {
					bodyHtml = preTargetCardHtml + chgTargetCardHtml;
				}
			}
			//소명 - 위험도 변경
			else if(hisTargetCd == "04" && comSubCd == "31"){
				//위험도 마스터 공통코드(EPT00005) : 01(대기), 04(종결), 05(상),06(중), 07(하)
				var preVal = $.osl.lang("history.change.target04.eptProSt.eptProSt" + preDetailVal);
				var chgVal = $.osl.lang("history.change.target04.eptProSt.eptProSt" + chgDetailVal);
				
				bodyHtml = `
						<div class="osl-fs-12 text-center">
							${$.osl.lang("history.change.target04.message.eptProSt", preVal, chgVal)}
						</div>
					`;
			}//소명 위험도 변경
			//**내용 끝**/
		}
		//수정이력
		else if(subTargetCd == "02"){
			//수정이력일 때 프로세스 및 단계 아이디 존재하면
			if(!$.osl.isNull(data["processId"]) && !$.osl.isNull(data["flowId"])){
				styleProcess = true;
			}
			//프로세스 형식 표출 강제 false인 경우
			if(!config["forceStyleProcess"]){
				styleProcess = false;
			}
			
			
			var subLog = data["sub"];
			
			if(!$.osl.isNull(subLog)){
				$.each(subLog, function(n, map){
					//서브 이력 또한 수정이력에 대한 것이 아니면 다음 진행
					if(map.subTargetCd != "02"){
						//(동시 이력으로 인해 수정 이력 이후 연결 이력등 다른 이력 유형이 들어가는 경우가 있기 때문에)
						return true;
					}
					
					var chgDetailNm = $.osl.escapeHtml(map.chgDetailNm);
					if(!$.osl.isNull(map.chgDetailLng) && !$.osl.isNull($.osl.lang(map.chgDetailLng))){
						chgDetailNm = $.osl.lang(map.chgDetailLng);
					}
					
					bodyHtml += `
						<div class="${oslEvtDetailClassStr} osl-py-4 osl-radius-4px osl-bg-active-hover" data-log-id="${map.chgDetailId}" data-log-ord="${map.chgDetailNum}">
							<i class="osl-icon osl-icon-sm osl-icon-edit osl-me-4"></i>
							<span class="osl-fs-12">
								${$.osl.lang("common.history.updateMsg", chgDetailNm)}
							</span>
						</div>
					`;
				});
			}
			
			subBodyHtml = `
				<div class="px-2 w-50 ${oslEvtClassHeadStr}--detail-content" ${config["html"]["cardDataOpts"]}>
					<div class="d-none d-flex align-items-stretch osl-p-8 osl-edit-group w-100 ${oslEvtClassHeadStr}--detail-content--diff" data-log-id="${chgDetailId}">
						<div class="osl-card-status status-light-gray h-300px mw-50">
							<div class="osl-status-container">
								<div class="osl-status-title status-light-gray">
									<span class="status-title">${$.osl.lang("history.update.label.prev")}</span>
								</div>
								<div class="osl-status-content scroll-y h-300px osl-evt__diff-card--content-prev" data-kt-scroll="true" data-kt-scroll-height="{default: 300px}">
								</div>
							</div>
						</div>
						<div class="osl-card-status status-gray h-300px mw-50">
							<div class="osl-status-container">
								<div class="osl-status-title status-gray">
									<span class="status-title">${$.osl.lang("history.update.label.next")}</span>
								</div>
								<div class="osl-status-content scroll-y h-300px osl-evt__diff-card--content-next" data-kt-scroll="true" data-kt-scroll-height="{default: 300px}">
								</div>
							</div>
						</div>
					</div>
					<div class="d-none osl-p-8 ${oslEvtClassHeadStr}--detail-content--message" data-log-id="${chgDetailId}">
						<div class="p-3 rounded scroll-y osl-border-gray2 scroll-y mh-300px osl-evt__massage-card--area" data-kt-scroll="true" data-kt-scroll-height="{default: 300px}">
						</div>
					</div>
				</div>
					
			`;
		}
		//결재이력
		else if(subTargetCd == "03"){
			//결재이력일 때 프로세스 및 단계 아이디 존재하면
			if(!$.osl.isNull(data["processId"]) && !$.osl.isNull(data["flowId"])){
				styleProcess = true;
			}
			//프로세스 형식 표출 강제 false인 경우
			if(!config["forceStyleProcess"]){
				styleProcess = false;
			}
			
			var tempOpt = {
				removeBtnView :false,
				iconView : true,
				targetKey : "signLineId",
				targetCd : "-1",
				html :{
					iconType :"other",
					iconClass : "osl-icon-list",
				}
			};
			
			var tempData = {
				signLineId : data["chgDetailSubId"],
				title : $.osl.lang("history.sign.label.detailSignLine"),//결재선 상세 보기
			};
			
			if(config["signLineView"]){
				signLineHtml = fnCmmTagCard(tempOpt, tempData);
			}
			
			//subTargetId가 regUsrId와 다르면, 부서 결재/대결 이므로
			var subTempTitle = "";
			var oriSignUsrId = data["subTargetId"];
			var signUsrId = data["regUsrId"];
			
			if(signUsrId != oriSignUsrId){
				//부서 결재 - 결재자와 부서 동일하므로
				if(!$.osl.isNull(oriSignUsrId) && oriSignUsrId.indexOf("DPT") == 0){
					subTempTitle = $.osl.escapeHtml(data.regUsrDeptNm);
				}
				//대결
				else {
					subTempTitle = $.osl.escapeHtml(data.regUsrNm);
					signTypeNm += $.osl.lang("sign.label.confrontation")+" ";
				}
			}
			
			//유형명
			var signTypeNm = '';
			//기안
			if(comSubCd == "16"){
				signTypeNm += $.osl.lang("sign.label.draft");
			}
			//회수
			else if(comSubCd == "10"){
				signTypeNm += $.osl.lang("sign.label.revertRes");
			}
			//승인
			else if(comSubCd == "12"){
				signTypeNm += $.osl.lang("sign.label.signApprove");
			}
			//반려
			else if(comSubCd == "13"){
				signTypeNm += $.osl.lang("sign.label.signReject");
				
			}
			
			if(!notChangeHeaderTitle){
				if($.osl.isNull(subTempTitle)){
					headerTitle = signTypeNm;
				}
				//그 외 (기안/회수 제외)
				else if(comSubCd != "16" && comSubCd != "10"){
					headerTitle = subTempTitle +" "+ signTypeNm;
				}
			}
			
			bodyHtml = signLineHtml;
			
			//만약 메인 표출이라면 기존 타이틀 대신 메시지로 표출하기 위해 강제 변경
			if(config["main"] && !notChangeHeaderTitle){
				if(!$.osl.isNull(subTempTitle)){
					headerTitle = $.osl.lang("history.messageTitle03v02", subTempTitle, signTypeNm);
				}else{
					headerTitle = $.osl.lang("history.messageTitle03v01", signTypeNm);
				}
				
			}
		}
		//연결이력
		else if(subTargetCd == "04"){
			
		}
		//삭제이력
		else {
			
		}
		/**********************************************/
		//전달 받은 이력 타입에 따라 가공 종료
		
		//조립 시작
		//공통 - 헤더 컬러 지정 유형
		/*
		* 티켓 - 처리 완료, 종료, 정책 적용 성공/실패
		* 소명 - 처리 완료, 이의제기 승인/미승인, 종결, 위험도
		* 결재 - 반려
		* 그 외 모두 무채색
		*/
		//티켓 처리 완료
		if(hisTargetCd == "01" && comSubCd == "26"){
			statusHeaderClass = "status-blue";
		}
		//티켓 종료
		else if(hisTargetCd == "01" && comSubCd == "17"){
			statusHeaderClass = "status-red";
		}
		//티켓 정책 적용 성공
		else if(hisTargetCd == "01" && comSubCd == "27"){
			statusHeaderClass = "status-green";
		}
		//티켓 정책 적용 실패
		else if(hisTargetCd == "01" && comSubCd == "28"){
			statusHeaderClass = "status-red";
		}
		//소명 반려
		else if(hisTargetCd == "04" && comSubCd == "13"){
			statusHeaderClass = "status-red";
		}
		//소명 처리 완료
		else if(hisTargetCd == "04" && comSubCd == "26"){
			statusHeaderClass = "status-blue";
		}
		//소명 이의제기 승인, 종결
		else if(hisTargetCd == "04" && comSubCd == "29"){
			statusHeaderClass = "status-green";
		}
		//소명 이의제기 미승인
		else if(hisTargetCd == "04" && comSubCd == "30"){
			statusHeaderClass = "status-red";
		}
		//소명 위험도
		else if(hisTargetCd == "04" && comSubCd == "31"){
			statusHeaderClass = "status-red";
		}
		//결재 반려
		else if(subTargetCd == "03" && comSubCd == "13"){
			statusHeaderClass = "status-red";
		}
		
		//메인 여부, 상단 프로세스 형태와 상관 없이
		var processFlowDataOpt = '';
		if(!$.osl.isNull(data["processId"])){
			processFlowDataOpt += `data-process-id="${data["processId"]}"`;
		}
		if(!$.osl.isNull(data["flowId"])){
			processFlowDataOpt += ` data-flow-id="${data["flowId"]}"`;
		}
		
		//메인 옵션일 때
		if(config["main"]){
			if(!$.osl.isNull(signLineHtml)){
				subHeaderTitleHtml += signLineHtml;
			}
			if(!$.osl.isNull(data["processNm"])){
				/*
				subHeaderTitleHtml += `
					<div data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="tooltip-inverse" data-bs-dismiss="click" title="${$.osl.escapeHtml(data["processNm"])}">
						<span class="osl-px-8 osl-py-3 osl-radius-8px osl-bg-gray-006 text-muted osl-fs-11">
							${$.osl.escapeHtml(data["processNm"])}
						</span>
					</div>
				`;
				*/
				subHeaderTitleHtml = `
					<span class="osl-px-8 osl-py-3 osl-radius-8px osl-bg-gray-006 text-muted osl-fs-11 osl-me-12">
						${$.osl.escapeHtml(data["processNm"])}
					</span>
				`;
			}
			if(!$.osl.isNull(data["flowNm"])){
				/*
				subHeaderTitleHtml += `
					<div data-bs-placement="top" data-bs-custom-class="tooltip-inverse" data-bs-dismiss="click" title="${$.osl.escapeHtml(data["flowNm"])}">
						<span class="osl-px-8 osl-py-3 osl-radius-8px osl-bg-gray-006 text-muted osl-fs-11" style="${defaultStyle}">
							${$.osl.escapeHtml(data["flowNm"])}
						</span>
					</div>
				`;
				*/
				
				subHeaderTitleHtml += `
					<div class="osl-fc-green osl-fs-11 fw-bolder osl-line-height-p200 d-inline-flex align-items-center">
						<span class="osl-fs-4 osl-me-4 osl-line-height-p200">●</span>
						${$.osl.escapeHtml(data["flowNm"])}
					</div>
				`;
			}
			
			if(!$.osl.isNull(subHeaderTitleHtml)){
				/*
				subHeaderTitleHtml = `
					<div class="d-flex flex-row align-items-center gap-1">
						${subHeaderTitleHtml}
					</div>
				`;
				*/
				subHeaderTitleHtml = `
					<div class="d-inline-flex align-items-center">
						${subHeaderTitleHtml}
					</div>
				`;
			}
		}
		
		//상단 프로세스 형태인 경우
		if(styleProcess){
			//기능 버튼
			fnDatasDropdown = $.osl.flow.flowToolbarHtml(data["processId"], data["flowId"], config["flowFuncDataList"], "auto");
			headerToolbar = `
				<div class="osl-ticket-log-card--toolbar ${config["html"]["toolbarClass"]}">
					<button type="button" class="btn btn-sm btn-icon border-0 h-27px ${oslEvtClassHeadStr}__not-click" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">
						<i class="osl-icon osl-sm osl-icon-more"></i>
					</button>
					${fnDatasDropdown}
				</div>
			`;
			
			processHeadrHtml = `
				<div class="osl-status-header osl-ticket-log-card--header align-items-center ${oslEvtClassHeadStr}--header ${config["html"]["headerClass"]}" ${config["html"]["headerDataOpts"]}>
					<div class="osl-ticket-log-card--title ${config["html"]["titleClass"]}" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="tooltip-inverse" data-bs-dismiss="click" title="${$.osl.escapeHtml(data["processNm"])}">
						<div class="osl-fs-12">
							${$.osl.escapeHtml(data["processNm"])}
						</div>
					</div>
					${headerToolbar}
				</div>
			`;
		}//프로세스 형태이면
		
		//전달 받은 툴바 형태가 있다면
		if(!$.osl.isNull(config["html"]["toolbarClass"])){
			defaultHeaderHtml = `
				<div class="d-flex flex-row flex-stack ${oslEvtClassHeadStr}--header ${config["html"]["headerClass"]}" ${config["html"]["headerDataOpts"]}>
					<div class="${config["html"]["titleClass"]}">
						${headerTitle}
					</div>
					<div class="${config["html"]["toolbarClass"]}">
						${config["html"]["toolbarContent"]}
					</div>
				</div>
			`;
		}
		//없으면
		else{
			defaultHeaderHtml = `
				<div class="${oslEvtClassHeadStr}--header ${config["html"]["headerClass"]}" ${config["html"]["headerDataOpts"]}>
					<div class="osl-status-title w-100 ${statusHeaderClass} ${config["html"]["titleClass"]}">
						${currentLableHtml}
						<span class="status-title">
							${headerTitle}
						</span>
					</div>
				</div>
			`;
		}
		
		//내용 영역
		if(!$.osl.isNull(bodyHtml)){
			//수정이력이면 영역에 최대 높이 고정
			if(subTargetCd == "02"){
				logContentHtml = `
					${chgCommentHtml}
					<div class="osl-status-content ${logContentClass} mh-325px scroll-y">
						${bodyHtml}
					</div>
				`;
			}
			else{
				logContentHtml = `
					${chgCommentHtml}
					<div class="osl-status-content ${logContentClass}">
						${bodyHtml}
					</div>
				`;
			}
		}
		//내용이 없으면
		else{
			logContentHtml = chgCommentHtml;
		}
		
		//mainHtml
		//메인 표출일 때
		if(config["main"]){
			//내부 로그
			/*
			innerHtml = `
				<div class="osl-card-status align-items-center mt-0 min-w-550px mw-50 ${oslEvtMainClassStr} ${config["html"]["cardClass"]}" ${config["html"]["classDataOpts"]} data-osl-his-id="${chgDetailId}" data-his-card="${config["type"]}" data-his-code="${comSubCd}" ${processFlowDataOpt}>
					${processHeadrHtml}
					<div class="osl-status-container ${config["html"]["bodyClass"]}" ${config["html"]["bodyDataOpts"]}>
						${defaultHeaderHtml}
						${logContentHtml}
						${subBodyHtml}
					</div>
				</div>
			`;
			*/
			
			//메인 이력에 표출인 경우, 헤더 표출을 하지 않으므로 문구 추가
			var messageHtml = '';
			//변경 이력일 때
			if(subTargetCd == "01"){
				messageHtml = `
					<div class="osl-status-content osl-py-20i">
						<div class="osl-fs-12 text-start">
							${$.osl.lang("history.messageTitle01", headerTitle)}
						</div>
					</div>
				`;
			}
			//결재 이력이면
			else if(subTargetCd == "03"){
				//변경되는 해당 정보는 위에서 변경
				messageHtml = `
					<div class="osl-status-content osl-py-20i">
						<div class="osl-fs-12 text-start">
							${headerTitle}
						</div>
					</div>
				`;
			}
			
			innerHtml = `
				<div class="osl-card-status border-0 align-items-center mt-0 mw-50 ${oslEvtMainClassStr} ${config["html"]["cardClass"]}" ${config["html"]["classDataOpts"]} data-osl-his-id="${chgDetailId}" data-his-card="${config["type"]}" data-his-code="${comSubCd}" ${processFlowDataOpt}>
					<div class="osl-status-container ${config["html"]["bodyClass"]}" ${config["html"]["bodyDataOpts"]}>
						${messageHtml}
						${logContentHtml}
					</div>
				</div>
				${subBodyHtml}
			`;
			
			//메인 표출일 때 외부 화살표 적용 없음
		}
		//메인 표출이 아닐 때
		else{
			//내부 로그
			innerHtml = `
				<div class="osl-card-status ${oslEvtMainClassStr} ${config["html"]["cardClass"]}" ${config["html"]["classDataOpts"]} data-osl-his-id="${chgDetailId}" data-his-card="${config["type"]}" data-his-code="${comSubCd}" ${processFlowDataOpt}>
					${processHeadrHtml}
					<div class="osl-status-container ${config["html"]["bodyClass"]}" ${config["html"]["bodyDataOpts"]}>
						${defaultHeaderHtml}
						${logContentHtml}
					</div>
					<div class="osl-status-footer ${config["html"]["footerClass"]}" ${config["html"]["footerDataOpts"]}>
						${regUsrCardHtml}
						${regDtmHtml}
					</div>
				</div>
			`;
			
			//외부 화살표
			if(config["rtnArrow"]){
				//붙이는 방향이 front이면
				if(config["rtnArrowAppend"] == "front"){
					innerHtml = arrowHtml + innerHtml;
				}
				//뒤에 붙이면
				else{
					innerHtml = innerHtml + arrowHtml;
				}
			}
			
			//내부 로그
			innerHtml = `
				<div class="osl-evt__log_block ${config["html"]["blockClass"]}" ${config["html"]["blockDataOpts"]}>
					${innerHtml}
				</div>
			`;
		}
		
		//rtnHtml
		//메인일 때
		if(config["main"]){
			//타임라인 아이콘
			var symbolColor = '';
			var symbolColorInverse = '';
			var logTypeNmCd = "history.subTarget"+subTargetCd;
			var logTypeNm = $.osl.lang(logTypeNmCd);
			var symbolIcon = '';
			
			//변경
			if(subTargetCd == "01"){
				symbolColor = 'badge-gray';
				symbolColorInverse = '';
				symbolIcon = 'osl-icon-w-change';
			}
			//수정
			else if(subTargetCd == "02"){
				symbolColor = 'badge-gray';
				symbolColorInverse = '';
				symbolIcon = 'osl-icon-w-edit';
			}
			//결재
			else if(subTargetCd == "03"){
				symbolColor = 'badge-gray';
				symbolColorInverse = '';
				symbolIcon = 'osl-icon-w-signature';
			}
			//연결
			else if(subTargetCd == "04"){
				symbolColor = 'badge-gray';
				symbolColorInverse = '';
				symbolIcon = 'osl-icon-w-link';
			}
			//삭제
			else if(subTargetCd == "05"){
				symbolColor = 'badge-gray';
				symbolColorInverse = '';
				symbolIcon = 'osl-icon-w-delete';
			}
			
			rtnHtml = `
				<div class="row flex-nowrap mx-0 ${oslEvtClassHeadStr}--timeline">
					<div class="d-inline-flex flex-column p-0 w-36px osl-pe-6">
						<span class="osl-fs-11" data-lang-cd="${logTypeNmCd}">
							${logTypeNm}
						</span>
						<div>
							<span class="badge badge-circle badge-sm ${symbolColor}">
								<i class="osl-icon osl-icon-sm ${symbolIcon}"></i>
							</span>
						</div>
						<div class="osl-history-bar blue"></div>
					</div>
					<div class="osl-pb-40 flex-row-fluid">
						<div class="osl-fs-11 text-muted osl-mb-4">
							<i class="osl-icon osl-icon-sm osl-icon-history--black osl-me-4"></i>
							${agoTimeStr}
						</div>
						<div class="osl-card-ticket-wrap">
							<div class="osl-card-ticket-header">
								${regUsrCardHtml}
								${subHeaderTitleHtml}
							</div>
							<div class="osl-card-ticket-body osl-p-8 d-flex">
								${innerHtml}
							</div>
						</div>
					</div>
				</div>
			`;
		}
		//메인 아닐 때
		else{
			rtnHtml = innerHtml;
		}
		
		return rtnHtml;
	};
	
	/*
	* function 명 : fnCmmSignCard
	* - 결재선 정보 및 결재 사유를 표출하는 카드를 그리기 위한 객체
	* function 설명 : 받은 데이터로 영역에 카드 그리기
	* @param config : 옵션
	* @param data : 데이터
	* ㄴ 예시
	* data = {
		signDatas: 결자자 및 결재선 통합 정보
		signTargetList: 결재선 list
		lastOrd: 마지막 결재자 번호
	* }
	* @param areaElem : 넣을 영역 객체
	* return : html 반환
	*/
	const fnCmmSignCard = function(config, data){
		//기본 config
		var defaultConfig = {
			sigTargetCd : "01", // 01(결재), 02(참조)
			footerClass : "", // footerClass
		};
		
		config = $.extend({}, defaultConfig, config);
		
		//결재자 및 결재선 정보
		var signDatas = data.signDatas;
		//결재선 목록
		var signTargetList = data.signTargetList;
		//결재선 마지막 번호
		var lastOrd = data.lastOrd;
		
		//화살표
		var arrowHtml = '<i class="osl-icon osl-icon-sm osl-icon-forward osl-mx-12 my-auto"></i>';
		
		//기안, 결재 순번, 최종 결재 등 문구 표출
		var cardTitleStr = "";
		//결재 상태에 따른 색상	컬러별 class명종류: .status-blue .status-green .status-red .status-gray .status-light-gray
		var cardTitleBgColor = "status-light-gray";
		
		//반환할 html
		var signOrdListStr = '';
		
		//결재선 카드 그리기
		$.each(signTargetList, function(idx, signTargetInfo){
			//기안, 결재 순번, 최종 결재 등 문구 표출
			var cardTitleStr = "";
			//결재 상태에 따른 색상 컬러별 class명종류: .status-blue .status-green .status-red .status-gray .status-light-gray
			var cardTitleBgColor = "status-light-gray";
			//현재 결재차례일 때
			var currentBadge = "";
			//사유 유무
			var reasonClass = "d-none";
			var reasonIcon = "osl-icon-check";
			var reasonTitle = $.osl.lang("sign.label.signApprove");
			if(!$.osl.isNull(signTargetInfo.signRes)){
				reasonClass = '';
			}
			//카드 크기 css
			var minWidthClass = 'min-w-185px';
			
			//등록 일시
			var paramDatetime = new Date(parseInt(signTargetInfo.regDtm));
			var agoTimeStr = $.osl.datetimeAgo(paramDatetime, {fullTime: "d", returnFormat: "yyyy-MM-dd HH:mm:ss"}).agoString;
			
			//결재,합의,전결 결재선 타이틀
			if(config.sigTargetCd == "01"){
				//기안
				if(String(signTargetInfo.ord) == "0"){
					cardTitleStr = $.osl.lang("sign.label.draft");
				}
				//결재 순번이 최종 결재인 경우
				else if(signTargetInfo.ord == lastOrd){
					cardTitleStr = $.osl.lang("sign.label.finalSign") + "(" + $.osl.lang("sign.label.ords", lastOrd, lastOrd) + ")";
					cardTitleBgColor = "status-red";
				}
				//그 외 단순 순번 표출
				else {
					cardTitleStr = $.osl.lang("sign.label.signer")  + "(" + $.osl.lang("sign.label.ords", signTargetInfo.ord, lastOrd) + ")";
				}
				
				//전결인 경우 문구 추가
				if(signTargetInfo.signAuthCd == "03") {
					cardTitleStr = "["+$.osl.lang("sign.label.signAll")+"]"+cardTitleStr;
				}
				//합의인 경우 문구 추가
				else if(signTargetInfo.signAuthCd == "05") {
					cardTitleStr = "["+$.osl.lang("sign.label.signAgree")+"] "+cardTitleStr;
				}
			}
			//참조 결재선 타이틀
			else{
				cardTitleStr = $.osl.lang("sign.label.referrer") + "(" + $.osl.lang("sign.label.ords", parseInt(idx+1), lastOrd) + ")";
			}
			
			//사용중인 결재선
			if(!$.osl.isNull(signDatas)){
				//CMM00008 : 01 기안, 02 대기, 03 승인, 04 반려, 05 회수
				if (signDatas["signTypeCd"] == "01" || signDatas["signTypeCd"] == "02") {
					//현재 기안상태 또는 결재 대기 상태일 때
					//현재 결재자 표시(보안 티켓과 달리 기안자가 소명 대상자이므로 다음 순번으로 체크)
					if(signTargetInfo.ord == signDatas["currentSignUsrInfo"].nextOrd){
						cardTitleBgColor = "status-blue";
						currentBadge = '<span class="label-status">'+$.osl.lang("sign.label.now")+'</span>';
					}
					//기안자가 아니고 현재 결재자보다 순번이 적은 경우, 이미 결재 승인을 한 것이므로
					else if(String(signTargetInfo.ord) != "0" && signTargetInfo.ord < signDatas["currentSignUsrInfo"].nextOrd){
						cardTitleBgColor = "status-green";
					}
				}
				
				//결재 사유 추가 정보
				//반려
				else if(signTargetInfo["signTypeCd"] == "04"){
					reasonIcon = "osl-icon-reject";
					reasonTitle = $.osl.lang("sign.label.signReject");
				}
				
			} 
			
			//현재 결재선이고 타이틀이 길어질 경우 카드 사이즈 변경
			if(!$.osl.isNull(currentBadge) && cardTitleStr.length > 14){
				 minWidthClass = 'min-w-230px';
			}
			
			//사용자 카드 그리기 :: Start
			//default 카드 옵션
			var cardOpt = {
					subDescView : true,
					targetKey : "usrId",
					targetCd : signTargetInfo["signUsrTypeCd"], //PRJ00018 01 사용자, 02 권한 그룹, 03 조직
					iconView: true,
					removeBtnView : false,
					html : {
						iconType : "user"
					},
				};
			
			//사용자,조직,권한그룹명
			var targetNm = "";
			//사용자의 조직명
			var subDescNm = "";
			//결재 권한
			var signAuthCd = signTargetInfo.signAuthCd;
			
			//조직인 경우
			if("01" == signTargetInfo.signUsrTypeCd) {
				targetNm = $.osl.escapeHtml(signTargetInfo.deptName);
				cardOpt["subDescView"] = false;
				cardOpt["html"]["iconType"] = "dept";
			}
			//사용자인 경우
			else if("02" == signTargetInfo.signUsrTypeCd) {
				targetNm = $.osl.escapeHtml(signTargetInfo.usrNm);
				subDescNm = signTargetInfo.deptName;
				cardOpt["html"]["iconType"] = "user";
				
			}
			//권한 그룹
			else if("03" == signTargetInfo.signUsrTypeCd) {
				targetNm = $.osl.escapeHtml(signTargetInfo.authGrpNm);
				cardOpt["subDescView"] = false;
				cardOpt["html"]["iconType"] = "auth";
			}
			//결재자 자동 옵션
			else if("04" == signTargetInfo.signUsrTypeCd) {
				targetNm = $.osl.escapeHtml(signTargetInfo.targetNm);
			}
			
			//카드 그리기 위해서는 title을 넣어야 한다.
			signTargetInfo["title"] = targetNm;
			//subDescView true로 인해 subDesc을 넣어야 한다.
			signTargetInfo["subDesc"] = subDescNm;
			
			//결재자 정보에 따른 카드
			var usrCard = fnCmmTagCard(cardOpt, signTargetInfo);
			
			//사용자 카드 그리기 :: end
			
			var returnHtml = `<div class="osl-card-status mt-0 ${minWidthClass}"><!-- 퍼블수정 - 카드헤더 사용안할시 m-0  혹은 mt-0 필수! -->
								<div class="osl-status-container">
									<!-- begin::상단상태정보 -->
									<!-- 퍼블수정 - osl-status-header 에서 osl-status-title 로 변경 -->
									<div class="osl-status-title ${cardTitleBgColor}"><!-- 컬러별 class명종류: .status-blue .status-green .status-red .status-gray .status-light-gray  / 흰색은 표기 안함. -->
										${currentBadge}
										<span class="status-title">${cardTitleStr}</span>
									</div>
									<!-- end::상단상태정보 -->
									
									<!-- begin::사용자정보 -->
									<div class="osl-status-content d-flex osl-py-12i flex-column align-items-center justify-content-center">
										${usrCard}
									</div>
									<!-- end::사용자정보 -->
									
									<!-- begin::사유 -->
									<div class="osl-status-content reason ${reasonClass}">
										<span class=""><i class="osl-icon osl-icon-sm ${reasonIcon} osl-me-8"></i>${reasonTitle}</span>
										<div class="reason-detail osl-mt-8 ">
											<div class="osl-word-break--line-2 osl-fs-11 osl-lh-n">
												${signTargetInfo.signRes}
											</div>
										</div>
									</div>
									<!-- end::사유 -->
								</div>
								
								<!-- begin:: footer -->
								<div class="osl-status-footer ${config["footerClass"]}">
									<!-- begin::결재정보 -->
									<span class="osl-fs-11 text-muted"><i class="osl-icon osl-icon-sm osl-icon-history--black osl-me-4"></i>${agoTimeStr}</span>
									<!-- end::결재정보 -->
								</div>
								<!-- begin:: footer -->
							  </div>
			`;
			
			//이전 결재 권한
			var preSignAuthCd = null;
			if(idx != 0) {
				//이전 결재 권한
				preSignAuthCd = signTargetList[idx-1].signAuthCd;
			}
			
			//첫번쨰 순번, 연속된 합의 결재 아닌 경우 카드 앞에 화살표 추가
			if(idx != 0 && config.sigTargetCd == "01" && (preSignAuthCd != "05" || signAuthCd != "05")){
				returnHtml = arrowHtml + returnHtml;
			}
			signOrdListStr += returnHtml;
			
		});
		
		return signOrdListStr;
	};
	
	return {
		init: function(){
			$.osl.cmmTagCard.setting = fnCmmTagCard;
			$.osl.cmmTagCard.getList = fnCmmTagCardDatas;
			$.osl.cmmHisCard.setting = fnCmmHisCard;
			$.osl.cmmSignCard.setting = fnCmmSignCard;
		},
	}
}();