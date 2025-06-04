
/**
 * function 명 : OSLCoreLangSetting function 설명 : core에서 사용되는 언어 데이터를 세팅한다.
 */
const OSLCoreGuideSetting = function () {
	//F1 도움말 사용 가능한지 체크
	let isGuideActionFlag = true;
	//F2 도움말 관리 사용 가능한지 체크
	let isGuideMngActionFlag = true;
	//화살표 기본 색상
	const defaultArrowcolor = '#ff5643';
	/*
	 * 가이드 내용 데이터
	 * pageId:
	 * [
	 *	{
	 *		target(Element data-guide="target-key"): "",
	 *		title: "",
	 *		top: 0,
	 *		left: 0,
	 *		arrow:
	 *		{
	 *			start: "" (top, left, right, bottom),
	 *			end: "" (top, left, right, bottom)
	 *		},
	 *		curve: true (true, false)	,
	 *		contents:
	 *		[
	 *			{
	 *				title: "",
	 *				content: ""
	 *			}
	 *		]
	 *	}
	 * ]
	 *@desc
	 * pageId: 화면 ID
	 * [
	 *	{
	 *		target: 가이드 대상 요소 (data-giude에 입력된 key 값)
	 *		title: 가이드 상자 제목
	 *		top: 가이드 상자 위치 - 세로
	 *		left: 가이드 상자 위치 - 가로
	 *		arrow: 화살표 설정
	 *		{
	 *			start: 화살표 시작 위치 (가이드 대상 요소에서 시작)
	 *			end: 화살표 끝 위치 (가이드 상자 요소에서 종료)
	 *		},
	 *		curve: 화살표 곡선 유무
	 *		contents: 가이드 상자 상세 내용
	 *		[
	 *			{
	 *				title: 상세 내용 제목
	 *				content: 상세 내용
	 *			}
	 *		]
	 *	}
	 * ]
	 * */
	// 가이드 내용 데이터
	let guideContents;
	
	//가이드 초기화
	const guideInit = () => {
		//가이드 기능 작업 중
		$(window).bind('keydown', function(e) {
			const keyCode = e.keyCode || e.which;
			if(!(event.altKey ||event.ctrlKey || event.shiftKey || event.metaKey)){
				//F1키 가이드 출력
				if((keyCode == 112 || e.key == 'F1')){
					e.cancelable = true;
					e.stopPropagation();
					e.preventDefault();
					e.returnValue = false;

					//가이드 내용 출력
					guideContentShow();
				}
				//F2키 가이드 세팅
				else if((keyCode == 113 || e.key == 'F2')){
					e.cancelable = true;
					e.stopPropagation();
					e.preventDefault();
					e.returnValue = false;
					
					//가이드 세팅 기능 동작
					guideSetting();
				}
			}
		});
		//가이드 화면 그리기 넣기
		$.osl.guide.guideDraw = guideDraw;
	};
	
	//가이드 내용 출력
	const guideContentShow = () => {
		//도움말 사용 가능한지 체크
		if(!isGuideActionFlag){
			//$.osl.lang("guide.message.alert.dontHelpTool")
			$.osl.alert("현재 도움말 기능을 사용 할 수 없습니다. <br/>작업중인 기능을 종료하고 다시 시도해주세요.", {type: 'info'});
			return false;
		}
		
		//가이드 스택 값
		const guideList = $.osl.guide.guideFnList;
		
		//F1키 누를시 가이드 상자 표시
		if(guideList.length){
			try{
				//스택 마지막 가이드 호출
				guideList[guideList.length-1]["fn"]();
			}catch(e){
				console.error(e);
				//가이드 호출 오류
				//$.osl.lang("guide.message.alert.error")
				$.osl.alert("도움말 내용을 불러오는 도중 오류가 발생했습니다.", {type: 'error'});
			}
		}else{
			//가이드 내용 없는 경우 alert 표시 (TODO 언어팩 작업 해야 함.)
			//$.osl.lang("guide.message.alert.pageNoContent")
			$.osl.alert("현재 페이지의 도움말 내용이 없습니다.", {type: 'info'});
		}
	}
	
	/**
	 * 사용자 정의 가이드 데이터
	 * get: 사용자가 편집중인 가이드 데이터 반환
	 * set: 사용자가 편집, 입력한 데이터 저장 
	 *  - 브라우저 sessionStorage 사용 가능 일 때 편집중 데이터와 직전 데이터 보관
	 **/
	const customGuideData = function() {
		let data = {};
		
		//getter, setter 정의
		return {
			get: (key) => {
				if(data[key]){
					return data[key];
				}else{
					return {};
				}
			},
			set: (key, paramData) => {
				data[key] = paramData;
				
				//json data 출력
				let pageGuideData = {};
				pageGuideData[key] = paramData;
				
				//내용 text
				const guideText = JSON.stringify(pageGuideData, null, '\t');
				$("#guideModal #guideDataJsonView").val(guideText);
				
				//session storage 사용 가능한 경우 적재하기
				if($.osl.storageAvailable('sessionStorage')){
					//이전 데이터 백업
					sessionStorage.setItem("rtnCustomGuideData_"+key, sessionStorage.getItem("customGuideData_"+key));
					
					sessionStorage.setItem("customGuideData_"+key, JSON.stringify(paramData));
				}
			}
		}
	}();
	
	//가이드 이벤트 선언
	const guideBoxEventSetting = (paramPageId) => {
		const eventHandler = {
			//가이드 메인 상자 추가 이벤트
			fnMainAdd: function(){
				//가이드 메인 요소 추가 영역
				const mainBoxFrame = $("#guideModalBody #guideMainBoxFrame");
				//가이드 메인 요소의 row-idx 가져오기
				const lastMainBox = $("div[name=guideMainBox]:last-child");
				let lastIdx = 0;
				
				//요소 있는 경우
				if(lastMainBox && lastMainBox.length){
					lastIdx = (lastMainBox.data("row-idx")+1);
				}
				
				//내용 영역 추가하기
				const addMainBox = 
				$(`
					<div class="row mb-3" name="guideMainBox" data-row-idx="${lastIdx}">
						<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
							<div class="card bg-light shadow-sm">
								<div class="card-header flex-row-reverse">
							        <div class="card-toolbar">
										<div class="btn btn-sm btn-icon btn-active-color-dark close" name="guideBoxMoveBtn" data-row-idx="${lastIdx}"><i class="fas fa-arrows-up-down-left-right fs-2 fw-bolder"></i></div>
							            <div class="btn btn-sm btn-icon btn-active-color-dark close" name="guideMainDeleteBtn" data-row-idx="${lastIdx}"><i class="fas fa-times fs-2 fw-bolder"></i></div>
							        </div>
							    </div>
							    <div class="card-body" name="guideInfoBox">
							    	<div class="row">
							    		<div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
							    			<div class="form-floating">
											    <input type="text" class="form-control guide" placeholder="가이드 대상 요소 key(data-guide)" value="" data-type="target" data-input-target="main" data-row-idx="${lastIdx}"/>
											    <label>가이드 대상 요소 key</label>
											</div>
							    		</div>
							    		<div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6">
							    			<div class="form-floating">
											    <input type="number" class="form-control" placeholder="00 px" value="0" data-type="top" data-row-idx="${lastIdx}" data-input-target="main"/>
											    <label>Top</label>
											</div>
							    		</div>
										<div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6">
											<div class="form-floating">
												<input type="number" class="form-control" placeholder="00 px" value="0" data-type="left" data-row-idx="${lastIdx}" data-input-target="main"/>
												<label>Left</label>
											</div>
										</div>
							    	</div>
						    		<div class="row">
								    	<div class="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
								    		<div class="form-floating">
											   <select class="form-select py-1" data-type="start" data-row-idx="${lastIdx}" data-input-target="main">
											        <option value="left">좌측 (Left)</option>
											        <option value="top">상단 (Top)</option>
													<option value="bottom">하단 (Bottom)</option>
													<option value="right">우측 (Right)</option>
											    </select>
											    <label>Arrow Start</label>
											</div>
								    	</div>
								    	<div class="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
								    		<div class="form-floating">
											    <select class="form-select py-1" data-type="end" data-row-idx="${lastIdx}" data-input-target="main">
											        <option value="center">중앙 (Center)</option>
											        <option value="left">좌측 (Left)</option>
											        <option value="top">상단 (Top)</option>
													<option value="bottom">하단 (Bottom)</option>
													<option value="right">우측 (Right)</option>
											    </select>
											    <label>Arrow End</label>
											</div>
								    	</div>
								    	<div class="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
								    		<div class="form-floating">
											   <select class="form-select py-1" data-type="curve" data-row-idx="${lastIdx}" data-input-target="main">
											        <option value="true">사용</option>
											        <option value="false">미 사용</option>
											    </select>
											    <label>곡선 유무</label>
											</div>
								    	</div>
								    </div>
								    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" name="guideDetailInputBox" data-row-idx="${lastIdx}">
						    			<div class="form-floating">
										    <input type="text" class="form-control" placeholder="title" data-type="title" data-row-idx="${lastIdx}" data-input-target="main"/>
										    <label>가이드 제목</label>
										</div>
										<div class="alert bg-light-primary border border-primary border-dashed p-2 text-center cursor-pointer opacity-state-50 m-2" name="guideDetailAddBtn" data-row-idx="${lastIdx}">
											<span>상세 내용 추가</span>
										</div>
						    		</div>
							    </div>
							</div>
						</div>
					</div>	
				`);
				
				//메인 정보 이벤트 선언
				//addMainBox.find("select[data-input-target=main]").on("change", eventHandler.fnMainSelectModify);
				//addMainBox.find("input[data-input-target=main]").on("blur", eventHandler.fnMainInputModify);
				
				//삭제 버튼 이벤트
				//addMainBox.children("button[name=guideDetailDelBtn]").on("click", eventHandler.fnDetailDelete);
				
				mainBoxFrame.append(addMainBox);
				
				//가이드 데이터 불러오기
				let guideData = customGuideData.get(paramPageId);
				//page data 없는 경우
				if(!Object.keys(guideData).length){
					guideData = [];
				}
				
				//데이터 교체
				guideData[lastIdx] = 
				{
					target: "",					title: "",
					top: 0,						left: 0,
					arrow:
					{
						start: "left",			end: "center"
					},
					curve: true,
					contents:[]
				};
				customGuideData.set(paramPageId, guideData);
			},
			//가이드 메인 상자 제거
			fnMainDelete: function(){
				//main index
				const mainIdx = $(this).data("row-idx");
				
				//가이드 데이터 불러오기
				const guideData = customGuideData.get(paramPageId);
				try{
					//메인 제거
					guideData.splice(mainIdx, 1);
					
					//데이터 교체
					customGuideData.set(paramPageId, guideData);
					
					//html 제거
					$(`#guideMainBoxFrame div[name=guideMainBox][data-row-idx=${mainIdx}]`).remove();

					//순번 다시 정하기
					const guideMainBoxs = $(`div[name=guideMainBox]`);
					$.each(guideMainBoxs, function(idx, map){
						//현재 메인 순번
						const targetIdx = $(map).data("row-idx");
						
						//삭제된 순번보다 높으면 -1씩
						if(targetIdx > mainIdx){
							//현재 대상 -1
							$(map).data("row-idx", (targetIdx-1));
							$(map).attr("data-row-idx", (targetIdx-1));
							
							const targetElem = $(map).find(`[data-row-idx=${targetIdx}]`);
							$.each(targetElem, function(subIdx, subMap){
								$(subMap).data("row-idx", (targetIdx-1));
								$(subMap).attr("data-row-idx", (targetIdx-1));
							});
						}
					});
				}catch(e){
					console.error(e);
				}
			},
			//페이지 Id 수정 이벤트
			fnPageIdModify: function(){
				//TODO 페이지ID변경 작업
				return true;
				//가이드 스택 값
				const guideList = $.osl.guide.guideFnList;
				
				//가이드 데이터 불러오기
				const guideData = customGuideData.get(paramPageId);
				
				//원래 현재 페이지 ID
				let pageId = (guideList[guideList.length-1])?guideList[guideList.length-1]["key"]:"";
				
				//변경 값
				const value = $(this).val();
				
				//원래 현재 페이지 ID값과 다른 경우
				//변경된 페이지 ID에 이미 값이 있는 경우
				if(pageId != value && guideContents[value] && guideContents[value].length){
					//$.osl.lang("guide.message.confirm.areadyHelpPageId")
					$.osl.confirm("이미 도움말 데이터가 존재하는 페이지ID입니다.<br/>현재 데이터를 초기화하시겠습니까?<br/>확인을 누르면 입력된 페이지ID에 해당하는 도움말 데이터를 불러옵니다.<br/>취소를 누르면 현재 입력된 데이터를 유지합니다.",{ html : true }, function(result){
						if(result.value){
							
						}	
					});
				}else{
					//key값 교체
					customGuideData.set(value, guideData);
				}
			},
			//상세 내용 수정 이벤트
			fnDetailModify: function(){
				//main index
				const mainIdx = $(this).data("row-idx");
				//sub index
				const subIdx = $(this).data("row-sub-idx");
				//수정 대상 타입
				const type = $(this).data("type");
				//변경 값
				const value = $(this).val();
				
				//가이드 데이터 불러오기
				const guideData = customGuideData.get(paramPageId);
				
				//데이터 교체
				guideData[mainIdx]["contents"][subIdx][type] = value;
				customGuideData.set(paramPageId, guideData);
			},
			//상세 내용 제거 이벤트
			fnDetailDelete: function(){
				//main index
				const mainIdx = $(this).data("row-idx");
				//sub index
				const subIdx = $(this).data("row-sub-idx");
				
				//가이드 데이터 불러오기
				const guideData = customGuideData.get(paramPageId);
				try{
					//상세 내역 제거
					guideData[mainIdx]["contents"].splice(subIdx, 1);
					
					//데이터 교체
					customGuideData.set(paramPageId, guideData);
					
					//html 제거
					$(this).parent(".input-group").remove();
					
					//순번 다시 정하기
					const guideDetailMainBoxs = $(`div[name=guideDetailMainBox][data-row-idx=${mainIdx}] button[name=guideDetailDelBtn]`);
					$.each(guideDetailMainBoxs, function(idx, map){
						//현재 detail 순번
						const targetSubIdx = $(map).data("row-sub-idx");
						
						//삭제된 순번보다 높으면 -1씩
						if(targetSubIdx > subIdx){
							const targetElem = $(`button[name=guideDetailDelBtn][data-row-idx=${mainIdx}][data-row-sub-idx=${targetSubIdx}]`);
							targetElem.data("row-sub-idx", (targetSubIdx-1));
							targetElem.attr("data-row-sub-idx", (targetSubIdx-1));
						}
					});
					
				}catch(e){
					console.error(e);
				}
			},
			//가이드 메인 정보 select 변경 이벤트
			fnMainInputModify: function(){
				//main index
				const mainIdx = $(this).data("row-idx");
				
				//수정 대상 타입
				const type = $(this).data("type");
				
				//변경 값
				let value = $(this).val();
				
				//가이드 데이터 불러오기
				const guideData = customGuideData.get(paramPageId);
				
				/* 타입에 따라 값 수정 */
				//arrow.start, arrow.end
				if(type == "start" || type == "end"){
					guideData[mainIdx]["arrow"][type] = value;
				}
				//top, left 숫자 변형
				else if(type == "top" || type == "left"){
					//숫자 아닌 경우 제거
					if(!isNaN(value)){
						value = value.replace(/[^0-9]/gi,"");
						$(this).val(value);
					}
					
					guideData[mainIdx][type] = parseInt(value);
				}
				//첫문자는 영문 알파벳
				else if(type == "target"){
					if(value){
						//첫글자 가져오기
						const firstString = value.substring(0,1);
						
						//첫글자가 알파벳인지 체크
						var regex = new RegExp(/^[a-zA-Z]*$/);
						if(!regex.test(firstString)){
							//$.osl.lang("guide.message.toastr.engKey")
							$.osl.toastr("대상 Key는 영문으로 시작해야합니다.");
							//value값에 string 추가
							value = "key_"+value;
							$(this).val(value);
						}
					}
					guideData[mainIdx][type] = value;
				}
				else{
					guideData[mainIdx][type] = value;
				}
				//데이터 교체
				customGuideData.set(paramPageId, guideData);
			},
			//가이드 메인 정보 select 변경 이벤트
			fnMainSelectModify: function(){
				//main index
				const mainIdx = $(this).data("row-idx");
				
				//수정 대상 타입
				const type = $(this).data("type");
				
				//변경 값
				const value = $(this).val();
				
				//가이드 데이터 불러오기
				const guideData = customGuideData.get(paramPageId);
				
				//데이터 교체
				if(type == "start" || type == "end"){
					guideData[mainIdx]["arrow"][type] = value;
				}
				else if(type == "curve"){
					
					guideData[mainIdx][type] = (value=="true")?true:false;
				}
				else{
					guideData[mainIdx][type] = value;
				}
				customGuideData.set(paramPageId, guideData);
			},
			//상세내용 추가 버튼 이벤트
			fnMainDetailAdd: function(){
				//main index
				const mainIdx = $(this).data("row-idx");
				
				//상세 요소 추가 영역
				const detailBoxFrame = $(`div[name=guideDetailInputBox][data-row-idx=${mainIdx}]`);
				//상세 마지막 요소의 sub-idx 가져오기
				const lastDetailBox = $(`div[name=guideDetailInputBox][data-row-idx=${mainIdx}] div[name=guideDetailMainBox]:last-child`);
				let lastSubIdx = 0;
				
				//요소 있는 경우
				if(lastDetailBox && lastDetailBox.length){
					lastSubIdx = (lastDetailBox.data("row-sub-idx")+1);
				}
				
				//상세 내용 영역 추가하기
				const addDetailBox = 
				$(`
					<div class="input-group" name="guideDetailMainBox" data-row-idx="${mainIdx}" data-row-sub-idx="${lastSubIdx}">
						<button class="input-group-text cursor-pointer opacity-state-50" name="guideDetailDelBtn" data-row-idx="${mainIdx}" data-row-sub-idx="${lastSubIdx}"><i class="fa-sharp fa-solid fa-circle-minus svg-icon svg-icon-danger"></i></button>
					    <input type="text" class="form-control" placeholder="상세 제목" aria-label="상세 제목" value="" data-type="title" data-row-idx="${mainIdx}" data-row-sub-idx="${lastSubIdx}"/>
					    <input type="text" class="form-control" placeholder="상세 내용" aria-label="상세 내용" value="" data-type="content" data-row-idx="${mainIdx}" data-row-sub-idx="${lastSubIdx}"/>
					</div>
				`);
				detailBoxFrame.append(addDetailBox);
				
				//가이드 데이터 불러오기
				const guideData = customGuideData.get(paramPageId);
				//데이터 교체
				guideData[mainIdx]["contents"][lastSubIdx] = {title: '', content: ''};
				customGuideData.set(paramPageId, guideData);
			},
			//가이드 데이터 초기화 이벤트
			fnGuideDataReset: function(){
				//가이드 영역 제거
				$("#guideModal").remove();
				//가이드 영역 다시 세팅
				guideSetting();
				//$.osl.lang("guide.message.toastr.resetData")
				$.osl.toastr("데이터를 초기화했습니다.");
			},
			//가이드 데이터 이전 복구 이벤트
			fnGuideDataBack: function(){
				//가이드 영역 제거
				$("#guideModal").remove();
				//가이드 영역 다시 세팅
				guideSetting("undo");
				//$.osl.lang("guide.message.toastr.restoreData")
				$.osl.toastr("이전 데이터로 복구했습니다.");
			},
			//가이드 박스 위치 확인 버튼
			fnGuideBoxMngShow: function(){
				//main index
				const mainIdx = $(this).data("row-idx");
				
				//가이드 데이터 불러오기
				const guideData = customGuideData.get(paramPageId);
				
				const guideBoxData = guideData[mainIdx];
				
				//target값 있는지 체크
				if(!guideBoxData || $.osl.isNull(guideBoxData.target)){
					//$.osl.lang("guide.message.alert.guideItemKey")
					$.osl.alert("가이드 대상 요소 key는 필수 값입니다.", {type: 'info'});
					return;
				}
				
				guideSetting();
				
				//main guide 영역 제거
				$("#guideMainBox").remove();
				
				//가이드 스택 값
				const guideList = $.osl.guide.guideFnList;
				
				//main layer target
				const mainLayerTarget = (guideList[guideList.length-1])?guideList[guideList.length-1]["target"]:$("body");
				
				//가이드 상자 그리기
				mngGuideDraw(mainLayerTarget, guideBoxData, mainIdx, paramPageId);
				
				//가이드 출력 제어
				isGuideActionFlag = false;
				
				//종료 문구 alert 추가
				$("body").append(
				`
					<div class="alert alert-primary d-flex align-items-center p-5" id="guideMngCloseAlert">
					    <div class="d-flex flex-column">
					        <h4 class="mb-1 text-dark">도움말 상자 이동 설정</h4>
					        <span>도움말 상자 이동 설정을 중지하려면 아래 버튼을 클릭하세요.</span>
					        <div class="d-flex flex-center flex-wrap">
					            <a href="#" class="btn btn-dark m-2">설정 중지</a>
					        </div>
					    </div>
					</div>
				`		
				);
				
				//중지 버튼 제어
				$("#guideMngCloseAlert").click(eventHandler.fnGuideBoxMngClose);
			},
			//위젯 이동 중지
			fnGuideBoxMngClose: function(){
				//가이드 출력 제어
				isGuideMngActionFlag = true;
				
				//main guide 영역 제거
				$("#guideMainBox").remove();
				
				//alert 제거
				$("#guideMngCloseAlert").remove();
				
				//가이드 설정창 복구
				guideSetting();
				
			},
			//가이드 데이터 복사 이벤트
			fnGuideDataCopy: function(){
				//json 영역 선택
				$("#guideDataJsonView").select();
				
				//클립보드 복사
				document.execCommand('copy');
				
				//선택 해제
				const selection = window.getSelection ? window.getSelection() : document.selection;
				if (selection) {
					if (selection.removeAllRanges) {
						selection.removeAllRanges();
					} else if (selection.empty) {
						selection.empty();
					}
				}
				//$.osl.lang("guide.message.toastr.copyJsonData")
				$.osl.toastr("JSON 데이터를 복사했습니다.");
			}
		};
		//페이지Id변경
		//$("#guideMainBoxFrame #guidePageId").on("blur", eventHandler.fnPageIdModify);
		
		//가이드상자 추가 버튼 이벤트
		$("#guideModal #guideMainAddBtn").click(eventHandler.fnMainAdd);
		
		//가이드 데이터 이전 복구 이벤트
		$("#guideModal #guideMainReturnBtn").click(eventHandler.fnGuideDataBack);
		
		//가이드 데이터 복사 버튼 이벤트
		$("#guideModal #guideDataCopyBtn").click(eventHandler.fnGuideDataCopy);
		
		//가이드 데이터 초기화 이벤트
		$("#guideModal #guideDataReset").click(eventHandler.fnGuideDataReset);
		
		//상세내용 추가 버튼 이벤트
		$("#guideModalBody").on("click","div[name=guideDetailAddBtn]",eventHandler.fnMainDetailAdd);
		
		//가이드 정보 select 변경 이벤트 선언
		$("#guideModalBody").on("change", "div[name=guideInfoBox] select[data-input-target=main]", eventHandler.fnMainSelectModify);
		
		//가이드 정보 input 변경 이벤트 선언
		$("#guideModalBody").on("blur", "div[name=guideInfoBox] input[data-input-target=main]", eventHandler.fnMainInputModify);
		
		//상세 내용 수정 이벤트 선언
		$("#guideModalBody").on("blur", "div[name=guideDetailMainBox] > input", eventHandler.fnDetailModify);
		
		//상세 내용 제거 버튼 이벤트 선언
		$("#guideModalBody").on("click", "button[name=guideDetailDelBtn]", eventHandler.fnDetailDelete);
		
		//가이드 메인 요소 제거 버튼
		$("#guideModal").on("click", ".card-toolbar div[name=guideMainDeleteBtn]", eventHandler.fnMainDelete);
		
		//가이드 박스 위치 확인 버튼
		$("#guideModal").on("click", ".card-toolbar div[name=guideBoxMoveBtn]", eventHandler.fnGuideBoxMngShow);
		
	};
	
	
	//가이드 박스 UI 세팅
	const guideBoxUiSetting = (guideData) => {
		//반환 UI
		let rtnGuideBoxHtml = "";
		
		if(!guideData || !guideData.length){
			return rtnGuideBoxHtml;
		}
		let index = 0;
		for(const data of guideData){
			try{
				//guideData 변수 선언
				const {curve, left, top, target, title, contents} = data;
				const {start, end} = data["arrow"];
				let detailHtml = "";
				
				let detailIndex = 0;
				//contents 개수에 따라 상세내용 세팅
				for(const detailInfo of contents){
					const {title, content} = detailInfo;
					detailHtml +=
					`
						<div class="input-group" name="guideDetailMainBox" data-row-idx="${index}" data-row-sub-idx="${detailIndex}">
							<button class="input-group-text cursor-pointer opacity-state-50" name="guideDetailDelBtn" data-row-idx="${index}" data-row-sub-idx="${detailIndex}"><i class="fa-sharp fa-solid fa-circle-minus svg-icon svg-icon-danger"></i></button>
						    <input type="text" class="form-control" placeholder="상세 제목" aria-label="상세 제목" value="${title}" data-type="title" data-row-idx="${index}" data-row-sub-idx="${detailIndex}"/>
						    <input type="text" class="form-control" placeholder="상세 내용" aria-label="상세 내용" value="${content}" data-type="content" data-row-idx="${index}" data-row-sub-idx="${detailIndex}"/>
						</div>
					`;
					detailIndex++;
				}
				
				const defaultBoxUi = 
					`
						<div class="row mb-3" name="guideMainBox" data-row-idx="${index}">
							<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
								<div class="card bg-light shadow-sm">
									<div class="card-header flex-row-reverse">
								        <div class="card-toolbar">
											<div class="btn btn-sm btn-icon btn-active-color-dark close" name="guideBoxMoveBtn" data-row-idx="${index}"><i class="fas fa-arrows-up-down-left-right fs-2 fw-bolder"></i></div>
							            	<div class="btn btn-sm btn-icon btn-active-color-dark close" name="guideMainDeleteBtn" data-row-idx="${index}"><i class="fas fa-times fs-2 fw-bolder"></i></div>
								        </div>
								    </div>
								    <div class="card-body" name="guideInfoBox">
								    	<div class="row">
								    		<div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
								    			<div class="form-floating">
												    <input type="text" class="form-control guide" placeholder="가이드 대상 요소 key(data-guide)" value="${target}" data-type="target" data-input-target="main" data-row-idx="${index}"/>
												    <label>가이드 대상 요소 key</label>
												</div>
								    		</div>
								    		<div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6">
								    			<div class="form-floating">
												    <input type="number" class="form-control" placeholder="00 px" value="${top}" data-type="top" data-row-idx="${index}" data-input-target="main"/>
												    <label>Top</label>
												</div>
								    		</div>
											<div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6">
												<div class="form-floating">
													<input type="number" class="form-control" placeholder="00 px" value="${left}" data-type="left" data-row-idx="${index}" data-input-target="main"/>
													<label>Left</label>
												</div>
											</div>
								    	</div>
							    		<div class="row">
									    	<div class="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
									    		<div class="form-floating">
												   <select class="form-select py-1" data-type="start" data-row-idx="${index}" data-input-target="main">
												        <option value="left">좌측 (Left)</option>
												        <option value="top" ${(start == 'top')?"selected":''}>상단 (Top)</option>
														<option value="bottom" ${(start == 'bottom')?"selected":''}>하단 (Bottom)</option>
														<option value="right" ${(start == 'right')?"selected":''}>우측 (Right)</option>
												    </select>
												    <label>Arrow Start</label>
												</div>
									    	</div>
									    	<div class="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
									    		<div class="form-floating">
												    <select class="form-select py-1" data-type="end" data-row-idx="${index}" data-input-target="main">
												        <option value="center">중앙 (Center)</option>
												        <option value="left" ${(end == 'left')?"selected":''}>좌측 (Left)</option>
												        <option value="top" ${(end == 'top')?"selected":''}>상단 (Top)</option>
														<option value="bottom" ${(end == 'bottom')?"selected":''}>하단 (Bottom)</option>
														<option value="right" ${(end == 'right')?"selected":''}>우측 (Right)</option>
												    </select>
												    <label>Arrow End</label>
												</div>
									    	</div>
									    	<div class="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
									    		<div class="form-floating">
												   <select class="form-select py-1" data-type="curve" data-row-idx="${index}" data-input-target="main">
												        <option value="true">사용</option>
												        <option value="false" ${(!curve)?"selected":''}>미 사용</option>
												    </select>
												    <label>곡선 유무</label>
												</div>
									    	</div>
									    </div>
									    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" name="guideDetailInputBox" data-row-idx="${index}">
							    			<div class="form-floating">
											    <input type="text" class="form-control" placeholder="title" value="${title}" data-type="title" data-row-idx="${index}" data-input-target="main"/>
											    <label>가이드 제목</label>
											</div>
											<div class="alert bg-light-primary border border-primary border-dashed p-2 text-center cursor-pointer opacity-state-50 m-2" name="guideDetailAddBtn" data-row-idx="${index}">
												<span>상세 내용 추가</span>
											</div>
											${detailHtml}
							    		</div>
								    </div>
								</div>
							</div>
						</div>	
					`;
				
				rtnGuideBoxHtml += defaultBoxUi;
				index++;
			}catch(e){
				console.error(e);
			}
			
		}
		
		return rtnGuideBoxHtml;
	};
	
	//가이드 세팅 기능 동작
	const guideSetting = (handleType) => {
		if(!isGuideMngActionFlag){
			//$.osl.lang("guide.message.alert.dontHelpTool")
			$.osl.alert("현재 도움말 관리 기능을 사용 할 수 없습니다. <br/>작업중인 기능을 종료하고 다시 시도해주세요.", {type: 'info'});
			return false;
		}
		
		//guide 있는지 체크
		const guideTarget = document.getElementById("guideModal");
		if(guideTarget){
			//대상 요소 class list
			const classList = guideTarget.classList;
			
			//show -> 감추기
			if(classList.contains("show")){
				//감추기 동작
				classList.remove("show");
				classList.add("hide");
				guideTarget.style.display = "none";
				
				//도움말 사용 제어
				isGuideActionFlag = true;
			}
			//hide -> 보이기
			else if(classList.contains("hide")){
				//스택 pageId와 현재 pageId 비교
				//가이드 스택 값
				const guideList = $.osl.guide.guideFnList;
				
				//스택 페이지 ID
				let stackPageId = (guideList[guideList.length-1])?guideList[guideList.length-1]["key"]:"";
				
				//input 페이지 ID
				let inputPageId = $("#guidePageId").val();
				
				//pageId 다른 경우 새로 불러오기
				if(inputPageId != stackPageId){
					//가이드 영역 제거
					$("#guideModal").remove();
					//가이드 영역 다시 세팅
					guideSetting("refresh");
				}else{
					//보이기 동작
					classList.remove("hide");
					classList.add("show");
					guideTarget.style.display = "block";
					
					//도움말 사용 제어
					isGuideActionFlag = false;
				}
			}
		}else{
			//도움말 사용 제어
			isGuideActionFlag = false;
			
			//가이드 스택 값
			const guideList = $.osl.guide.guideFnList;
			
			//main layer target
			const mainLayerTarget = (guideList[guideList.length-1])?guideList[guideList.length-1]["target"]:"";
			
			//현재 페이지 ID
			let pageId = (guideList[guideList.length-1])?guideList[guideList.length-1]["key"]:"";
			
			//내용 text
			let guideText = "";
			//가이드 상자 html
			let guideBoxText = "";
			
			//현재 페이지 가이드 내용 불러오기
			if(pageId){
				//가이드 내용 깊은복사
				let pageGuideContent = structuredClone(guideContents[pageId]);
				
				if(handleType && $.osl.storageAvailable('sessionStorage')){
					//handleType이 "undo"인 경우 세션에서 이전 값 가져오기
					if(handleType == "undo"){
						const sessionData = sessionStorage.getItem("rtnCustomGuideData_"+pageId);
						if(!$.osl.isNull(sessionData)){
							pageGuideContent = JSON.parse(sessionStorage.getItem("rtnCustomGuideData_"+pageId));
						}
					}
					//"refresh"인 경우 세션에서 현재 페이지 값 가져오기
					else if(handleType == "refresh"){
						const sessionData = sessionStorage.getItem("customGuideData_"+pageId);
						if(!$.osl.isNull(sessionData)){
							pageGuideContent = JSON.parse(sessionStorage.getItem("customGuideData_"+pageId));
						}
					}
				}
				
				//현재 가이드 내용 저장하기
				customGuideData.set(pageId, pageGuideContent);
				
				//key 포함 가이드 내용
				let pageGuideData = {};
				pageGuideData[pageId] = pageGuideContent;
				
				//내용 text
				guideText = JSON.stringify(pageGuideData, null, '\t');
				
				//가이드 내용을 가이드 상자로 변환
				guideBoxText = guideBoxUiSetting(pageGuideContent);
			}
			
			//가이드 설정 Div
			const guideSettingBox =
			`
				<div class="modal show modal-guide" id="guideModal" role="dialog" tabindex="-1" data-backdrop="static" data-keyboard="false" aria-labelledby="guideModal" style="display: block; z-index: 1059;">
					<div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-xl" role="document" style="z-index: 1058;">
						<div class="modal-content ">
							<div class="modal-header h-60px" style="touch-action: none; z-index: 125;">
								<h3 class="modal-title fw-bolder ">가이드 내용 등록</h3>
								<div class="btn btn-sm btn-icon btn-active-color-dark close " data-bs-dismiss="modal"><i class="fas fa-times fs-2 fw-bolder"></i></div>
							</div>
							<div class="modal-body bg-secondary p-5 " id="guideModalBody">
								<div class="row">
									<div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
										<div class="row guide-box-h--100">
											<div class="form-group">
												<label><i class="fa fa-align-left osl-me-4"></i><span>페이지 가이드 데이터 JSON</span></label>
												<textarea id="guideDataJsonView" class="form-control textarea-giude guide-box-h--100" aria-label="guide contents JSON" readonly="readonly">${guideText}</textarea>
											</div> 
										</div>
									</div>
									<div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12" id="guideMainBoxFrame">
										<div class="row">
											<div class="form-group">
												<label><i class="fa fa-align-left osl-me-4"></i><span>페이지 ID</span></label>
												<input type="text" data-elem-type="text" class="form-control" placeholder="페이지 ID" name="guidePageId" id="guidePageId" value="${pageId}" readonly="readonly">
											</div>
										</div>
										${guideBoxText}
									</div>
								</div>
							</div>
							<div class="modal-footer px-5 py-3" style="z-index: 125;">
								<button type="button" class="btn btn-sm btn-dark" id="guideDataCopyBtn"><i class="fa fa-copy osl-me-4"></i><span>JSON 복사</span></button>
								<button type="button" class="btn btn-sm btn-dark" id="guideMainReturnBtn"><i class="fa fa-undo osl-me-4"></i><span>이전</span></button>
								<button type="button" class="btn btn-sm btn-primary" id="guideMainAddBtn"><i class="fa fa-plus osl-me-4"></i><span>가이드 상자 추가</span></button>
								<button type="button" class="btn btn-sm btn-danger" id="guideDataReset"><i class="osl-icon osl-md osl-icon-save--white osl-me-4"></i><span>초기화</span></button>
								<button type="button" class="btn btn-sm btn-light-dark" id="guideModalClose"><i class="osl-icon osl-md osl-icon-closed--black osl-me-4"></i><span>닫기</span></button>
							</div>
						</div>
					</div>
					<div class="modal-backdrop show modal-stack" style="z-index: 119;"></div>
				</div>
			`;
			
			//body에 guide box 추가
			$("body").prepend(guideSettingBox);
			
			$('#guideModal').modal({
				  keyboard: false
				});
			//모달 창 오픈
			$("#guideModal").modal('show');
			//backdrop 제거
			$("body > .modal-backdrop.show:last-child").remove();
			//guide event 주입 
			guideBoxEventSetting(pageId);
			
			//닫기 버튼 이벤트 넣기
			$("body #guideModal .modal-footer #guideModalClose").click(() => {
				//show 상태이기 때문에 재 호출로 닫기.
				guideSetting();
			});
		}
		return true;
	};
	
	/**
	 * 가이드 내용 화면에 그리기 (사용자용)
	 * @param
	 * 	type:			true - 가이드 상자 열기, false - 가이드 상자 닫기 (boolean)
	 * 	$mainFrame:		가이드 상자가 열리는 부모 객체 (object)
	 * 	guideBoxKey:	가이드 상자 데이터 key
	 **/
	const guideDraw = (type, mainFrame, guideBoxKey) => {
		const guideBoxData = guideContents[guideBoxKey];
		
		//가이드 상자 제거
		if(!type || !$.osl.isNull($("#guideMainBox"))){
			$("#guideMainBox").remove();
			
			//도움말 관리 제어
			isGuideMngActionFlag = true;
			return false;
		}
		//도움말 관리 제어
		isGuideMngActionFlag = false;
		
		//브라우저 실제 w,h
		browserWidth = "100%";
		browserHeight = "100%";
		/*
		if (window.screen) { //document.body.clientWidth
			browserWidth = $(document).outerWidth()+"px";
			browserHeight = $(document).outerHeight()+"px";
		}*/
		
		//가이드 메인 박스
		const guideMainBox = $('<div class="guideMainBox" id="guideMainBox"></div>');
		
		//guideBox 생성
		guideMainBox.css({position: "absolute",width: browserWidth,height: browserHeight,top: 0,left: 0,"z-index": 1059,"background-color":"rgba(0, 0, 0, 0.5)"});
		
		//guideBox 화면에 추가
		mainFrame.append(guideMainBox);
		
		//mainFrame에 relative 속성 추가
		mainFrame.css({position:"relative"});
		
		//guide box append
		$.each(guideBoxData,function(idx, map){			
			//화살표 색상
			let arrowColor = map.arrowColor;
			
			//값 없는경우 기본값
			if($.osl.isNull(arrowColor)){
				arrowColor = defaultArrowcolor;
			}
			let targetDiv;
			if(!$.osl.isNull(map.target)){
				targetDiv = $(`[data-guide=${map.target}]`);
			}
			
			//타겟 대상 없는경우 가이드 상자 안만듬
			if($.osl.isNull(targetDiv) || (!$.osl.isNull(targetDiv) && (targetDiv.css("display") == "none" || $.osl.isNull(targetDiv.html())))){
				return true;
			}
			
			//guide 상세 내용
			let guideDetail = '';
			$.each(map.contents,function(idx2, map2){
				guideDetail += 
				`
					<span class="d-flex flex-column">
			            <span class="fw-bold fs-6">${map2.title}</span>
			            <span class="fs-7 text-muted">${map2.content}</span>
			        </span>
				`;
			});
			
			//guide 상자
			let guideBox = 
			`
				<div class="guideBox card px-2" id="${map.target}" data-row-idx="${idx}">
					<div class="card-header align-items-center min-h-30px px-3">
						<div class="card-title fw-bold fs-6">${map.title}</div>
					</div>
					<div class="card-body p-0 min-h-100px px-2 py-2">
						${guideDetail}
					</div>
				</div>
			`;
			
			guideMainBox.append($(guideBox).css({top:map.top, left:map.left}));
			
			//화살표 그리기
			guideArrowDraw(targetDiv, $(".guideBox#"+map.target), map.curve, map.arrow, arrowColor, map.target);
		});
	}
	
	/**
	 * 가이드 내용 화면에 그리기 (관리용)
	 * @param
	 * 	$mainFrame:		가이드 상자가 열리는 부모 객체 (object)
	 * 	paramGuideData:	가이드 상자 단건 데이터
	 **/
	const mngGuideDraw = (mainFrame, paramGuideData, targetGuideIdx, paramPageId) => {
		//가이드 데이터
		const guideBoxData = paramGuideData;
		
		//가이드 상자 제거
		if(!$.osl.isNull($("#guideMainBox"))){
			$("#guideMainBox").remove();
			
			//도움말 관리 제어
			isGuideMngActionFlag = true;
			return false;
		}
		//도움말 관리 제어
		isGuideMngActionFlag = false;
		
		//브라우저 실제 w,h
		browserWidth = "100%";
		browserHeight = "100%";
		
		//가이드 메인 박스
		const guideMainBox = $('<div class="guideMainBox" id="guideMainBox"></div>');
		
		//guideBox 생성
		guideMainBox.css({position: "absolute",width: browserWidth,height: browserHeight,top: 0,left: 0,"z-index": 1059,"background-color":"rgba(0, 0, 0, 0.5)"});
		
		//guideBox 화면에 추가
		mainFrame.append(guideMainBox);
		
		//mainFrame에 relative 속성 추가
		mainFrame.css({position:"relative"});
		
		try{
			//화살표 색상
			let arrowColor = guideBoxData.arrowColor;
			
			//값 없는경우 기본값
			if($.osl.isNull(arrowColor)){
				arrowColor = defaultArrowcolor;
			}
			
			//guide 상세 내용
			let guideDetail = '';
			$.each(guideBoxData.contents,function(idx2, map2){
				guideDetail += 
				`
					<span class="d-flex flex-column">
			            <span class="fw-bold fs-6">${map2.title}</span>
			            <span class="fs-7 text-muted">${map2.content}</span>
			        </span>
				`;
			});
			
			//guide 상자
			let guideBox = 
			`
				<div class="guideBox card px-2" id="${guideBoxData.target}" data-row-idx="${targetGuideIdx}">
					<div class="card-header align-items-center min-h-30px px-3 cursor-move">
						<div class="card-title fw-bold fs-6">${guideBoxData.title}</div>
					</div>
					<div class="card-body p-0 min-h-100px px-2 py-2">
						${guideDetail}
					</div>
				</div>
			`;
			
			guideMainBox.append($(guideBox).css({top:guideBoxData.top, left:guideBoxData.left}));
			
			//대상 요소
			let targetDiv;
			
			if(!$.osl.isNull(guideBoxData.target)){
				targetDiv = $(`[data-guide=${guideBoxData.target}]`);
			}
			
			var dragObj = new Draggabilly( `#${guideBoxData.target}`, {
				handle: '.card-header'
			});
			
			$(`.guideBox#${guideBoxData.target}`).data('draggabilly', dragObj);
			
			//drag end event
			dragObj.on( 'dragEnd', function(event, pointer){
				const top = (pointer.y-pointer.layerY);
				const left = (pointer.x-pointer.layerX);
				
				//input data
				$(`#guideMainBoxFrame input[data-type=top][data-row-idx=${targetGuideIdx}]`).val(top);
				$(`#guideMainBoxFrame input[data-type=left][data-row-idx=${targetGuideIdx}]`).val(left);
				
				//가이드 데이터 불러오기
				const guideData = customGuideData.get(paramPageId);
				
				//guide data
				guideData[targetGuideIdx]["top"] = top;
				guideData[targetGuideIdx]["left"] = left;
				
				//데이터 교체
				customGuideData.set(paramPageId, guideData);
				
				//타겟 대상 없는경우 화살표 안그림
				if($.osl.isNull(targetDiv) || (!$.osl.isNull(targetDiv) && (targetDiv.css("display") == "none" || $.osl.isNull(targetDiv.html())))){
					return true;
				}
				//화살표 제거
				$("#guideArrow_"+guideBoxData.target).remove();
				
				//화살표 그리기
				guideArrowDraw(targetDiv, $(".guideBox#"+guideBoxData.target), guideBoxData.curve, guideBoxData.arrow, arrowColor, guideBoxData.target);
			});
			
			//타겟 대상 없는경우 화살표 안그림
			if($.osl.isNull(targetDiv) || (!$.osl.isNull(targetDiv) && (targetDiv.css("display") == "none" || $.osl.isNull(targetDiv.html())))){
				return true;
			}
			
			//화살표 그리기
			guideArrowDraw(targetDiv, $(".guideBox#"+guideBoxData.target), guideBoxData.curve, guideBoxData.arrow, arrowColor, guideBoxData.target);
		}catch(e){
			//$.osl.lang("guide.message.alert.problemGuideData")
			$.osl.alert("가이드 데이터에 문제가 있습니다.", {type: 'info'});
			console.error(e);
		}
		
	}
	
	//가이드상자 화살표 그리기
	const guideArrowDraw = (targetElem, guideBoxElem, curve, arrow, arrowColor, arrowId) => {
		const guideMainBox = $("#guideMainBox");
		
		//가이드상자 실제 좌표 구하기 = 기초좌표
		const frameOffset = {x:guideMainBox.offset().left,y:guideMainBox.offset().top};
		
		//화살표 시작, 종료 값
		const {start, end} = arrow;
		
		//시작점 객체
		const eleOffset_st = {x:targetElem.offset().left,y:targetElem.offset().top};
		const eleSize_st = {w:targetElem.outerWidth(), h:targetElem.outerHeight()};
		
		//도착점 객체
		const eleOffset_ed = {x:guideBoxElem.offset().left,y:guideBoxElem.offset().top};
		const eleSize_ed = {w:guideBoxElem.outerWidth(), h:guideBoxElem.outerHeight()};
		
		//시작점
		let p0x = (eleOffset_st.x - frameOffset.x) + eleSize_st.w / 2;
	    let p0y = (eleOffset_st.y - frameOffset.y) + eleSize_st.h / 2;
	    
	    //중간지점 (곡선 사용 유무)
	    let p1x = (!$.osl.isNull(curve) && !curve) ? p0x : (eleOffset_st.x - frameOffset.x) + eleSize_st.w / 2;
	    let p1y = (!$.osl.isNull(curve) && !curve) ? p0y : eleOffset_st.y - frameOffset.y;
	    
	    //도착점
	    let p2x = eleOffset_ed.x - frameOffset.x;
	    let p2y = (eleOffset_ed.y - frameOffset.y) + eleSize_ed.h / 2;
	    
		//화살표 도착점 설정(기본 좌측)
		//우측
		if(end == "right"){
			p2x += eleSize_ed.w;
		}
		//하단
		else if(end == "bottom"){
			p2x += eleSize_ed.w/2;
			p2y += eleSize_ed.h/2;
		}
		//상단
		else if(end == "top"){
			p2x += eleSize_ed.w/2;
			p2y -= eleSize_ed.h/2;
		}
		
		//화살표 시작점 설정(기본 중앙)
		if(start == "top"){
			p0y -= eleSize_st.h/2;
			p1y -= eleSize_st.h/2
		}
		else if(start == "right"){
			p0x += eleSize_st.w/2;
			p1x += eleSize_st.w/2;
		}
		else if(start == "bottom"){
			p0y += eleSize_st.h/2;
			p1y += eleSize_st.h/2;
		}
		else if(start == "left"){
			p0x -= eleSize_st.w/2;
			p1x -= eleSize_st.w/2;
		}
		
		//시작점 객체 박스 씌우기
		const canvas = document.createElement('canvas');
		canvas.style.position = 'absolute';
		canvas.style.top = (eleOffset_st.y-frameOffset.y)+'px';
		canvas.style.left = (eleOffset_st.x-frameOffset.x)+'px';
		canvas.width = eleSize_st.w+1;
		canvas.height = eleSize_st.h+1;
		
		const ctx = canvas.getContext('2d');
		ctx.strokeStyle = arrowColor;
		ctx.lineWidth = 3;
		ctx.strokeRect(0, 0, eleSize_st.w+1, eleSize_st.h+1); 
		
		//canvas 넣기
		guideMainBox.append(canvas);
		
		$(canvas).addClass('guideBox_targetLayer');
		
		//화살표 그리기
		guideMainBox.curvedArrow({
            p0x: p0x,
            p0y: p0y,
            p1x: p1x,
            p1y: p1y,
            p2x: p2x,
            p2y: p2y,
			lineWidth:3,
			strokeStyle: arrowColor,
			id: "guideArrow_"+arrowId
        });
	}
	
    return {
        // public functions
        init: () => {
        	guideInit();
        	
        	//guide data 있는 경우
        	if(!$.osl.isNull(OSLCoreGuideData)){
        		guideContents = OSLCoreGuideData.get();
        		
        		//가이드 내용 core에 넣기
        		$.osl.guide.guideContents = guideContents;
        	}
        	//없으면 OSLCoreGuideData에서 넣어줌.
        },
        isData: () => {
        	return $.osl.isNull(guideContents);
        },
        setData: (guideData) => {
        	guideContents = guideData;
        	
        	//가이드 내용 core에 넣기
        	$.osl.guide.guideContents = guideContents;
        }
    };
}();