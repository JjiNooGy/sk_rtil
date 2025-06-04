/**
 	* function 명 	: OSLCoreCustomOptionSetting
	* function 설명	: core에서 커스텀 항목을 세팅한다.
*/
var OSLCoreCustomOptionSetting = function () {
	
	var osl_option_setting = function(optList, htmlTargetObj, usrConfig, callbackFn){
		//항목 데이터 목록
		var optList = optList;
		
		//date 세팅 배열
		var optDateDataArr = [];

		//html 출력 값
		var optHtmlData = '';

		//데이트 피커, 데이트 타임피커
		var dateObjList = [];
		var dateTimeObjList = [];
		
		//공통 코드 필요 세팅 값 
		var mstCdStrArr = '';//필요없음 추후 제거
		var selectObjList = [];//공통코드 arr
		var arrComboType = [];

		//수정 불가 첨부파일
		var readonlyFileIdList = [];

		//필수 첨부파일 id리스트
		var fileIdList = [];
		
		//공통 팝업 세팅 값 (사용자, 분류, 조직)
		var commonPopup_charger = [];
		var commonPopup_cls = [];
		var commonPopup_dept = [];
		
		
		//default config value
		var defaultConfig = {
				//화면 타입 default, preview
				"viewType": "default",
				//이전단계 여부
				"prevAt": false,
				//삭제 여부
				"delBtnAt": false,
				//수정 여부
				"updBtnAt": false,
				//수정 여부
				"updBtnAt": false,
				//뱃지 여부
				"badgeAt": false,
				//readOnly 여부
				"readOnly": false,
				//시작 단계 여부
				"startProcess": false,
				//기본항목 타입 insert, update
				"itemType": "insert",
				//이벤트
				"actionFn":{},	
				//ture : .html false:.append
				"htmlAppendType":false,
				//생성되는 항목에 css name 지정
				"classNm":{
					"preview_readonly": "osl-preview-readonly",
					"preview_hide": "osl-preview-hide kt-hide",
					//항목 readonly
					"option_readonly": "option_readonly",
				},
		};
		
		//사용자 선언 설정 값 덮어 씌우기 (깊게)
		var config = $.extend(true,defaultConfig, usrConfig);

		//html 생성 start
		
		//반환 값
		var rtnStrArr = [];
		var rtnStrValue = [];
		
		//데이터 검증
		if(!$.osl.isNull(optList) && optList.length > 0){
			
			// 항목 첨부파일 유무
			//var optAtchFileChk = false;
			
			//첨부파일 drag&drop 이벤트
			//var dragAndDropListTmp = [];
			
			//초기화
			$.each(optList,function(idx, map){
				if(map.hasOwnProperty("continueAt")){
					delete map.continueAt;
				}
			});
			
			//항목 세팅
			$.each(optList,function(idx, map){
				//continueAt == Y 인경우 넘어가기
				if(map.hasOwnProperty("continueAt")){
					return true;
				}
				
				/* 데이터 초기 변수 세팅 */
				//화면 사이즈별 항목 크기
				var optionPcWidthSize = "col-lg-"+map.itemPcRowNum;
				var optionTabletWidthSize = "col-md-"+map.itemTabletRowNum;
				var optionMobileWidthSize = "col-sm-"+map.itemMobileRowNum;
				
				//아이템 타입 insert, updata
				var itemType = config.itemType;
				
				//항목 내용
				var optContentData = '';
				//라벨 내용
				var optContentLabel = '';
				
				var requiredLabelTxt = "";
				var requiredTxt = "";
				var previewReadOnlyClass="";
				var previewHideClass="";
				if(config.viewType=="preview"){
					previewReadOnlyClass = config.classNm.preview_readonly;
					previewHideClass = config.classNm.preview_hide;
				}
				
				if(map.itemEssentialCd=='01'){
					requiredLabelTxt = "required";
					if(config.viewType=="preview"){
						requiredTxt = "";
					}else{
						requiredTxt = "required";
					}
				}
				
				//항목 명
				var itemNm = map.itemNm;
				
				//스크립팅 공격 제거
				itemNm = $.osl.escapeHtml(itemNm);
				
				//항목 값
				var itemValue = '';
				var itemValueNm = '';
				
				//항목 readonly
				var optReadOnlyChk = false;
				var optReadOnly = 'readonly="readonly"';
				var optModifySet = '02';
				var optAddClass = config.classNm.option_readonly;
				var startProcess = false;
				
				/* 읽기 전용 체크 */
				if(config.readOnly){
					optReadOnlyChk = true;
					requiredTxt = "";
				}
				
				//시작 단계 여부 
				if(config.startProcess){
					startProcess = true;
				}
				
				//값 null처리
				if(!$.osl.isNull(map.itemValue)){
					itemValue = map.itemValue;
					//스크립팅 공격 제거
					itemValue = $.osl.escapeHtml(itemValue);
				}
				
				//값 null처리
				if(!$.osl.isNull(map.itemValueNm)){
					itemValueNm = map.itemValueNm;
					
					//스크립팅 공격 제거
					itemValueNm = $.osl.escapeHtml(itemValueNm);
				}
				
				//수정 불가 항목 readonly 처리
				if(itemType == "update"){
					if(map.itemNotModifiedCd == '01'){
						optReadOnlyChk=true;
						requiredTxt = "";
					}
				}
				
				/* 항목 분류에 따른 데이터 내용 처리 */
				if(map.itemCode == "01"){ //기타
					if(map.itemType == "01"){ //text
						if(!optReadOnlyChk){
							//readonly 옵션 제거
							optReadOnly = optAddClass = '';
							optModifySet = '01';
						}
						
						optContentLabel = '<label class="'+requiredLabelTxt+'"><i class="fa fa-edit kt-margin-r-5 osl-me-4"></i><span>'+itemNm+'</span></label>'
						optContentData = '<input type="text" data-elem-type="text" class="form-control '+previewReadOnlyClass+'" title="'+itemNm+'" id="'+map.itemIdTxt+map.itemId+'" name="'+map.itemId+'" maxlength="'+map.itemLength+'" value="'+itemValue+'" '+optReadOnly+' '+requiredTxt+' data-modify-set="'+optModifySet+'" data-opt-target="02" data-opt-type="01"/>';
					}else if(map.itemType == "02"){ //textarea
						if(!optReadOnlyChk){
							//readonly 옵션 제거
							optReadOnly = optAddClass = '';
							optModifySet = '01';
						}
					
						//<br>, <br/>바꾸기
						itemValue = itemValue.replace(/<br>/gi,"\n").replace(/<\/br>/gi,"\n");
						optContentLabel = '<label class="'+requiredLabelTxt+'"><i class="fa fa-edit kt-margin-r-5 osl-me-4"></i><span>'+itemNm+'</span></label>'
						optContentData = '<textarea data-elem-type="textarea" class="form-control min-h-225px resize-none '+previewReadOnlyClass+' '+optAddClass+'" title="'+itemNm+'" id="'+map.itemIdTxt+map.itemId+'" name="'+map.itemId+'" '+optReadOnly+' '+requiredTxt+' data-modify-set="'+optModifySet+'" data-opt-target="02" data-opt-type="01">'+itemValue+'</textarea>';
					}else if(map.itemType == "03"){ //checkbox
						if(!optReadOnlyChk){
							optReadOnly = optAddClass = '';
							optModifySet = '01';
						}else{
							optReadOnly = "disabled";
						}
						var optChkVal = ""
						//체크박스 값 체크
						if(map.itemValue == "01"){
							optChkVal = " checked";
						}
						
						optContentLabel = '<label class="'+requiredLabelTxt+'"><i class="fa fa-edit kt-margin-r-5 osl-me-4"></i><span>'+itemNm+'</span></label>'
						optContentData = 
							'<div><span class="kt-switch kt-switch--icon">'
							+'<label class=""><input type="checkbox" data-elem-type="checkbox" class="'+previewReadOnlyClass+'" value="01" id="'+map.itemIdTxt+map.itemId+'" name="'+map.itemId+'" '+optChkVal+' '+optReadOnly+' '+requiredTxt+' data-modify-set="'+optModifySet+'" data-opt-target="02" data-opt-type="01"/>'
							+'<span></span></label></span></div>';
					}else if(map.itemType == "04"){ //date
						if(!optReadOnlyChk){
							optAddClass = '';
							optModifySet = '01';
							//date 세팅 배열에 추가
							dateObjList.push(""+map.itemIdTxt+map.itemId);
							previewReadOnlyClass="osl-input-readonly-none";
						}
						optContentLabel = '<label class="'+requiredLabelTxt+'"><i class="fa fa-edit kt-margin-r-5 osl-me-4"></i><span>'+itemNm+'</span></label>'
						optContentData = '<input type="text" data-elem-type="date" class="form-control '+previewReadOnlyClass+'" title="'+itemNm+'" id="'+map.itemIdTxt+map.itemId+'" name="'+map.itemId+'" readonly="readonly"  value="'+itemValue+'" '+optReadOnly+' '+requiredTxt+' data-modify-set="'+optModifySet+'" data-opt-target="02" data-opt-type="01"/>';
					}else if(map.itemType == "05"){ //datetime
						if(!optReadOnlyChk){
							optAddClass = '';
							optModifySet = '01';
							//date 세팅 배열에 추가
							dateTimeObjList.push(""+map.itemIdTxt+map.itemId);
							previewReadOnlyClass="osl-input-readonly-none";
						}
						
						optContentLabel = '<label class="'+requiredLabelTxt+'"><i class="fa fa-edit kt-margin-r-5 osl-me-4"></i><span>'+itemNm+'</span></label>'
						optContentData = '<input type="text" data-elem-type="datetime" class="form-control '+previewReadOnlyClass+'" title="'+itemNm+'" id="'+map.itemIdTxt+map.itemId+'" name="'+map.itemId+'" readonly="readonly"  value="'+itemValue+'" '+optReadOnly+' '+requiredTxt+' data-modify-set="'+optModifySet+'" data-opt-target="02" data-opt-type="01"/>';
					}else if(map.itemType == "06"){ //숫자 number
						if(!optReadOnlyChk){
							optReadOnly = optAddClass = '';
							optModifySet = '01';
						}
						
						optContentLabel = '<label class="'+requiredLabelTxt+'"><i class="fa fa-edit kt-margin-r-5 osl-me-4"></i><span>'+itemNm+'</span></label>'
						optContentData = '<input type="number" data-elem-type="number" class="form-control basicItemNumber" placeholder="'+itemNm+'" id="'+map.itemIdTxt+map.itemId+'" name="'+map.itemId+'" min="'+map.itemMinVal+'" max="'+map.itemMaxVal+'" maxlength="11" value="'+itemValue+'" '+optReadOnly+' '+requiredTxt+' data-modify-set="'+optModifySet+'" data-opt-target="02" data-opt-type="01"/>';
					}else if(map.itemType == "07"){ //체크리스트
						var checkListBtn =  
								'<div class="osl-uppy__right badge osl-badge-lightgray d-inline-block kt-margin-l-5 osl-basic-item-badge checkListUpdateBtn">수정</div>'
							+	'<div class="osl-uppy__right badge osl-badge-lightgray d-inline-block kt-margin-l-5 osl-basic-item-badge checkListDeleteBtn">삭제</div>';
						
						if(optReadOnlyChk){
							optReadOnly = 'disabled="disabled"';
							checkListBtn = '';
						}else{
							optReadOnly = optAddClass = '';
							optModifySet = '01';
						}
						
						//체크리스트 항목
						var chkListContent = "";
						//현재 인덱스
						var chkListIdx = idx;
						if(!$.osl.isNull(map.itemValueNm)){
							$.each(optList,function(itemIdx, itemMap){
								if(chkListIdx <= itemIdx){
									if(itemMap.itemId == map.itemId){
										var checkText = "";
										if(optList[itemIdx].itemValue=="01"){
											checkText = 'checked="checked"';
										}
										chkListContent += 
													'<div class="basicItemCheckList">'
											+			'<label class="kt-checkbox kt-checkbox--bold kt-checkbox--success kt-margin-b-0">'
											+			'	<input type="checkbox" data-elem-type="checkList" name="itemVal" class="checkList" value="01" data-ord="'+optList[itemIdx].ord+'" '+optReadOnly+' '+checkText+' data-modify-set="'+optModifySet+'" data-opt-target="02" data-opt-type="01" data-hidden-key="'+map.itemId+'" data-hidden-value="'+optList[itemIdx].ord+'"/>'
											+			'	<input type="hidden" name="itemValNm" value="'+optList[itemIdx].itemValueNm+'"/>'
											+			'	<span></span>'
											+			'	<label class="checkListNm">'+optList[itemIdx].itemValueNm+'</label>'
											+			'</label>'
											+			checkListBtn
											+		'</div>';
										optList[itemIdx].continueAt = 'Y';
									}
								}
							});
						}
						
						optContentLabel = '<label class="'+requiredLabelTxt+'"><i class="fa fa-edit kt-margin-r-5 osl-me-4"></i><span>'+itemNm+'</span></label>'
						optContentData = 
								'<div class="checkListDiv" id="'+map.itemIdTxt+map.itemId+'" data-item-id="'+map.itemId+'">'
							+	'	<div class="progress kt-margin-b-0">'
							+	'		<div class="progress-bar bg-info" role="progressbar" data-transitiongoal="100" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>'
							+	'	</div>'
							+	'	<span>'
							+	'		<small class="checkListPercent"></small>'
							+	'	</span>'
							+	chkListContent
							+	'</div>';
						//optContentData = '<input type="text" class="form-control '+previewReadOnlyClass+'" title="'+itemNm+'" id="'+map.itemId+'" name="'+map.itemId+'" readonly="readonly"  value="'+itemValue+'" '+optReadOnly+' '+requiredTxt+'/>';
					}
				}else if(map.itemCode == "02"){ //공통코드 (selectBox)
					if(optReadOnlyChk){
						optReadOnly = 'disabled="disabled"';
					}else{
						optAddClass = '';
						optModifySet = '01';
					}
					//공통코드 세팅
					selectObjList.push({targetId:""+map.itemIdTxt+map.itemId, commCode : map.itemCommonCode});
					optContentLabel = '<label class="'+requiredLabelTxt+'"><i class="fa fa-edit kt-margin-r-5 osl-me-4"></i><span>'+itemNm+'</span></label>'
					optContentData = '<select class="form-select '+previewReadOnlyClass+'" title="'+itemNm+'" id="'+map.itemIdTxt+map.itemId+'" name="'+map.itemId+'"  data-osl-value="'+itemValue+'" '+optReadOnly+' '+requiredTxt+' data-modify-set="'+optModifySet+'" data-opt-target="02" data-opt-type="02" data-cmm-code="'+map.itemCommonCode+'"></select>';
					
				}else if(map.itemCode == "03"){ //첨부파일
					//읽기 전용인경우 css 추가
					if(optReadOnlyChk || config.prevAt == true){
						optReadOnly = "fileReadonly";
					}

					var fileObj = {
							"targetId" : ""+map.itemIdTxt+map.itemId,
							"fileList" : map.fileList,
							"fileListCnt" : map.fileListCnt,
							"atchFileId" : map.itemValue,
							"optReadOnlyChk" : optReadOnlyChk
					};
					fileIdList.push(fileObj);
					
					optContentLabel = '<label class="'+requiredLabelTxt+'"><i class="fa fa-file-upload kt-margin-r-5 osl-me-4"></i><span>'+itemNm+'</span><button type="button" class="btn btn-sm btn-danger d-none kt-margin-l-10 fileRemoveResetBtn"><span data-lang-cd="button.deleteReset">삭제 초기화</span></button></label>'
					optContentData = 
						 '<div class="kt-uppy '+optReadOnly+'" name="'+map.itemId+'" id="'+map.itemIdTxt+map.itemId+'" '+requiredTxt+'>'
						+	'<div class="kt-uppy__dashboard"></div>'
						+	'<div class="kt-uppy__progress"></div>'
						+'</div>';
				}else if(map.itemCode == "04"){ //담당자
					var popupBtnStr = '';
					if(!optReadOnlyChk){
						optReadOnly = optAddClass = '';
						optModifySet = '01';
						
						//담당자 공통팝업 추가
						commonPopup_charger.push(""+map.itemIdTxt+map.itemId);
					}
					optContentLabel = '<label class="'+requiredLabelTxt+'"><i class="fa fa-edit kt-margin-r-5 osl-me-4"></i><span>'+itemNm+'</span></label>'
					optContentData = 
						'<div class="input-group">'
						+'		<input type="text" class="form-control '+previewReadOnlyClass+'" placeholder="'+itemNm+'" name="'+map.itemId+'Nm" id="'+map.itemIdTxt+map.itemId+'Nm" value="'+itemValueNm+'" '+optReadOnly+' data-modify-set="'+optModifySet+'" data-opt-target="02" data-opt-type="04" data-opt-type-sub="00" data-hidden-id="'+map.itemIdTxt+map.itemId+'" data-hidden-key="'+map.itemId+'" '+requiredTxt+'>'
						+'		<input type="text" class="form-control kt-hide" placeholder="'+itemNm+'" name="'+map.itemId+'" id="'+map.itemIdTxt+map.itemId+'" value="'+itemValue+'" '+optReadOnly+' data-modify-set="'+optModifySet+'" data-opt-target="02" data-opt-type="04">'
						+'		<button type="button" class="btn btn-primary btn-square input-group-append '+previewHideClass+'" id="'+map.itemIdTxt+map.itemId+'Btn" name="'+map.itemId+'Btn"><i class="fa fa-search kt-font-light osl-me-4"></i><span>검색</span></button>'
						+'</div>' ;
				}else if(map.itemCode == "05"){ //분류
					var popupBtnStr = '';
					
					if(!optReadOnlyChk){
						optReadOnly = optAddClass = '';
						optModifySet = '01';
						
						//분류 공통팝업 추가
						commonPopup_cls.push(""+map.itemIdTxt+map.itemId);
						popupBtnStr = '<span class="button_normal2 fl" id="btn_cls_select_'+map.itemId+'"><li class="fa fa-search kt-font-light"></li></span>';
					}
					optContentData = '<input type="text" name="'+map.itemId+'" id="'+map.itemId+'" title="'+itemNm+'" value="'+itemValue+'" style="display:none;" data-modify-set="'+optModifySet+'"/>'
											+'<input type="text" class="'+optAddClass+'" title="'+itemNm+'" name="'+map.itemId+'Nm" id="'+map.itemId+'Nm" value="'+$.trim(map.itemValueNm)+'" readonly="readonly" data-modify-set="'+optModifySet+'" data-opt-target="02" data-opt-type="05" data-hidden-id="'+map.itemId+'" data-hidden-key="'+map.itemId+'" '+requiredTxt+'/>'
											+popupBtnStr;
				}else if(map.itemCode == "06"){ //조직
					var popupBtnStr = '';
					if(!optReadOnlyChk){
						optReadOnly = optAddClass = '';
						optModifySet = '01';
						
						//분류 공통팝업 추가
						commonPopup_dept.push(""+map.itemIdTxt+map.itemId);
					}
					/*<label><i class="fa fa-id-card kt-margin-r-5 osl-me-4"></i>부서</label>
					<input type="text" class="form-control" label="부서" placeholder="부서" id="deptName" name="deptName" readonly="readonly">*/
					
					/*<input type="text" class="form-control" label="부서" placeholder="부서 검색 시 검색결과가 1건일 경우 자동세팅 됩니다." id="deptName" name="deptName" required>
					<div class="input-group-append">
						<button class="btn btn-primary" type="button" id="btn_searchDept">부서검색</button>
					</div>*/
					optContentLabel = '<label class="'+requiredLabelTxt+'"><i class="fa fa-id-card kt-margin-r-5 osl-me-4"></i><span>'+itemNm+'</span></label>';

					optContentData = 
						'<div class="input-group">'
						+'		<input type="text" class="form-control '+previewReadOnlyClass+'" placeholder="'+itemNm+'" name="'+map.itemId+'Nm" id="'+map.itemIdTxt+map.itemId+'Nm" value="'+itemValueNm+'" '+optReadOnly+' data-modify-set="'+optModifySet+'" data-opt-target="02" data-opt-type="06" data-hidden-id="'+map.itemIdTxt+map.itemId+'" data-hidden-key="'+map.itemId+'" '+requiredTxt+'>'
						+'		<input type="text" class="form-control kt-hide" placeholder="'+itemNm+'" name="'+map.itemId+'" id="'+map.itemIdTxt+map.itemId+'" value="'+itemValue+'" '+optReadOnly+' data-modify-set="'+optModifySet+'" data-opt-target="02" data-opt-type="06" >'
						+'		<button type="button" class="btn btn-primary btn-square input-group-append '+previewHideClass+'" id="'+map.itemIdTxt+map.itemId+'Btn" name="'+map.itemId+'Btn"><i class="fa fa-search kt-font-light osl-me-4"></i><span>부서검색</span></button>'
						+'</div>' ;
					
				}
				var addBtn = "";
				var delBtn = "";
				var updBtn = "";
				var optBadge = "";
				var badgeColor = "";
				
				if(map.itemCode == "01"){ //기타
					if(map.itemType == "07"){//체크리스트
						if(config.viewType!="preview"){
							addBtn = "<button type='button' class='osl-uppy__right close kt-margin-r-5 itemCheckListAdd' data-item-id='"+map.itemId+"'><i class='fa fa-plus'></i></button>";
						}
					}
				}
				
				//삭제 여부가 Y인경우만 삭제 버튼 
				if(config.delBtnAt){
					delBtn = "<button type='button' class='osl-uppy__right close itemDelete' data-item-id='"+map.itemId+"'><i class='osl-icon osl-sm osl-icon-closed--black'></i></button>";
				}
				if(config.updBtnAt){
					updBtn = "<button type='button' class='osl-uppy__right close kt-margin-r-5 itemUpdateBtn' data-item-id='"+map.itemId+"'><i class='fa fa-pen-square'></i></button>";
				}
				if(config.badgeAt){
					if(map.itemRequestCd == '01'){
						badgeColor = 'badge-info';
					}else{
						badgeColor = "osl-badge-lightgray";
					}
					optBadge += "<div class='badge "+badgeColor+" d-inline-block kt-margin-l-5 osl-basic-item-badge itemBadgeBtn' data-item-id='"+map.itemId+"' data-target-nm='itemRequestCd'>요청</div>";

					if(map.itemAcceptCd == '01'){
						badgeColor = 'badge-info';
					}else{
						badgeColor = "osl-badge-lightgray";
					}
					optBadge += "<div class='badge "+badgeColor+" d-inline-block kt-margin-l-5 osl-basic-item-badge itemBadgeBtn' data-item-id='"+map.itemId+"' data-target-nm='itemAcceptCd'>접수</div>";
				}
				
				var optCompleData =
							'<div class="'+optionPcWidthSize+' '+optionTabletWidthSize+' '+optionMobileWidthSize+' basicItemDiv">'
							+'	<div class="form-group">'
							+		optContentLabel
							+		optBadge
							+		delBtn
							+		updBtn
							+		addBtn
							+		optContentData
							+'	</div>'
							+'</div>';

				rtnStrValue += optCompleData;
				rtnStrArr.push($(optCompleData));
			});
			
			//생성된 항목 추가
			if(rtnStrArr.length > 0){
				//항목 내용 출력
				if(!config.htmlAppendType){
					$("#"+htmlTargetObj).html(rtnStrValue);
				}else{
					$("#"+htmlTargetObj).append(rtnStrValue);
				}
			}
			
			//숫자 number touchspin 적용
			$.osl.util.initInputNumber(".basicItemNumber");
			
			$(".basicItemDiv").each(function(){
				var $target = $(this);
				checkListAllCnt = $target.find(".checkList").length;
				checkListChkCnt = $target.find(".checkList:checked").length;
				var percent = checkListChkCnt / checkListAllCnt * 100;
				
				//체크리스트가 없으면 100%로 변경
				if(checkListAllCnt==0){
					percent = 100;
				}
				
				$target.find(".progress .progress-bar").attr('data-transitiongoal', percent).progressbar2({
					update: function(a, target) {
						var targetSpan = target.closest(".checkListDiv").find(".checkListPercent");
						targetSpan.html('완료율 : '+percent.toFixed(1)+'%')
					}
				});
			});
			
			//체크리스 버튼 액션 셋팅
			setCheckListBtnAction();
			
			//체크리스트 등록 팝업
			$(".itemCheckListAdd").off();
			$(".itemCheckListAdd").click(function(){
				var targetItem = $(this).data("itemId");
				var $target = $(this).next();
				var checkListAllCnt = 0;
				var checkListChkCnt = 0;
				
				//체크리스트 추가 팝업
				var data = {
						"type": "insert",
						};
				var options = {
						idKey: "prj1206",
						modalTitle: $.osl.lang("prj1206.title.main.insert"),
						modalSize: "md",
						closeConfirm: false,
						autoHeight: false,
						callback: [{
							targetId: "prj1206ModalCallBackBtn",
							actionFn: function(){
								var checkListNm = OSLPrj1206Popup.getItemValNm();
								var checkList = 
										'<div class="basicItemCheckList">'
								+			'<label class="kt-checkbox kt-checkbox--bold kt-checkbox--success kt-margin-b-0">'
								+			'	<input type="checkbox" data-elem-type="checkList" name="itemVal" class="checkList" value="01" data-modify-set="'+optModifySet+'" data-opt-target="02" data-opt-type="01" data-hidden-key="'+targetItem+'"/>'
								+			'	<input type="hidden" name="itemValNm" value="'+checkListNm+'"/>'
								+			'	<span></span>'
								+			'	<label class="checkListNm">'+checkListNm+'</label>'
								+			'</label>'
								+			'<div class="osl-uppy__right badge osl-badge-lightgray d-inline-block kt-margin-l-5 osl-basic-item-badge checkListUpdateBtn">수정</div>'
								+			'<div class="osl-uppy__right badge osl-badge-lightgray d-inline-block kt-margin-l-5 osl-basic-item-badge checkListDeleteBtn">삭제</div>'
								+		'</div>'
								$target.append(checkList);
								checkListAllCnt = $target.find(".checkList").length;
								checkListChkCnt = $target.find(".checkList:checked").length;
								var percent = checkListChkCnt / checkListAllCnt * 100;
								
								$target.find(".progress .progress-bar").attr('data-transitiongoal', percent).progressbar2({
									update: function(a, target) {
										var targetSpan = target.closest(".checkListDiv").find(".checkListPercent");
										targetSpan.html('완료율 : '+percent.toFixed(1)+'%')
									}
								});
								
								//체크리스 버튼 액션 셋팅
								setCheckListBtnAction();
							}
						}]
					};
				
				$.osl.layerPopupOpen('/prj/prj1000/prj1200/selectPrj1206View.do',data,options);
			});
			
			//미리보기 지우기
			$(".itemDelete").off();
			$(".itemDelete").click(function(){
				if(config.actionFn.hasOwnProperty("delete")){
					config.actionFn.delete($(this));
				}else{
					$(this).parents(".basicItemDiv:first").remove();
				}
			});
			
			$(".itemBadgeBtn").off();
			$(".itemBadgeBtn").click(function(){
				if(config.actionFn.hasOwnProperty("update")){
					config.actionFn.update($(this), "01");
				}
			});
			
			$(".itemUpdateBtn").off();
			$(".itemUpdateBtn").click(function(){
				if(config.actionFn.hasOwnProperty("updateBtn")){
					config.actionFn.updateBtn($(this));
				}
			});
			
			//첨부파일 셋팅
			if(!$.osl.isNull(fileIdList)){
				//첨부파일
				$.each(fileIdList,function(idx, map){
					if(config.prevAt == true || config.viewType=="preview" || map.optReadOnlyChk == true){
						var fileUploadObj = $.osl.file.uploadSet(map.targetId,{
				    		meta: {"atchFileId": map.atchFileId, "fileSn": 0},
				    		maxFileSize: "${requestScope.fileSumMaxSize}",
				    		height: 260,
				    		isDraggingOver: false,
				    		fileDownload: true,
				    		fileReadonly: true
						});
						if(!$.osl.isNull(map.fileList)){
					    	//파일 목록 세팅
					    	$.osl.file.fileListSetting(map.fileList, fileUploadObj);
						}
					}else{
						//파일 업로드 세팅
						var fileUploadObj = $.osl.file.uploadSet(map.targetId,{
				    		meta: {"atchFileId": map.atchFileId, "fileSn": 0},
				    		maxFileSize: "${requestScope.fileSumMaxSize}",
				    		maxNumberOfFiles:20,
				    		//파일 화이트리스트 설정
				    		allowedFileTypes: ['.doc','.docx','.hwp','.pdf','.ppt','.pptx','.xls','.xlsx','.zip','.jpg','.jpeg','.png','.gif','.eml','.cell','.show','.txt'],
				    		//uppy에 파일 업로드 할 때
				    		onBeforeFileAdded: function(currentFile, files){
				    			if(currentFile.source != "database" && currentFile.source != "remove") {
									var newNm = new Date().format("ssms")+"_"+currentFile.name;
									currentFile.name = newNm;
									

					    			//fileSn default
					    			var fileSn = fileUploadObj.getState().meta.fileSn;
					    			currentFile.meta.fileSn = fileSn;
					    			fileUploadObj.setMeta({fileSn: (fileSn+1)});
								}
				    		}
						});
						if(!$.osl.isNull(map.fileList)){
							//파일Sn넣기
					    	fileUploadObj.setMeta({fileSn: parseInt(map.fileListCnt)+1});
					    	//파일 목록 세팅
					    	$.osl.file.fileListSetting(map.fileList, fileUploadObj);
						}

				    	//수정 중 삭제한 파일Sn 목록
				    	var uploadRemoveFiles = [];
				    	var $removeResetBtn = $("#"+map.targetId).closest(".basicItemDiv").find(".fileRemoveResetBtn");

				    	//수정  파일 삭제 기록하기
			    	   	fileUploadObj.on('file-removed', function(file) {
			    	   		file["fileSn"] = file.meta.fileSn;
			    	   		file.source = "remove";
			    	   		uploadRemoveFiles.push(file);
			    	   		//삭제 취소 버튼 활성화
			    	   		$removeResetBtn.removeClass("d-none");
			    	   		$.osl.file.list[map.targetId].config.meta.removeFiles = uploadRemoveFiles;
			    		});
			    	   	
			    	   	//삭제 초기화 버튼 클릭 시 삭제한 파일 다시 추가
			    	   	$removeResetBtn.click(function(){
			    	   		$removeResetBtn.addClass("d-none");
			    	   		
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
			    	   		$.osl.file.list[map.targetId].config.meta.removeFiles = uploadRemoveFiles;
			    		});
					}
					
				});
			}
			
			
			//datepicker 세팅
			if(!$.osl.isNull(dateObjList)){
				$.each(dateObjList,function(idx, map){
					$.osl.date.datepicker($("#"+map), {});
				});
			}
			//dateTimepicker 세팅
			if(!$.osl.isNull(dateTimeObjList)){
				$.each(dateTimeObjList,function(idx, map){
					//$("#"+map).val($("#"+map).val + " 12:00");
					$.osl.date.daterangepicker($("#"+map), {
						singleDatePicker: true,
						timePicker: true,
			 			timePicker24Hour:true,
			 			autoUpdateInput:false,
			 		    locale: { 
			 		    	format: 'YYYY-MM-DD hh:mm' 
	 		    		}, 
					},function(defaultConfig, start, end, label){
						$("#"+map).val(new Date(start._d).format('yyyy-MM-dd HH:mm'))
					});
				});
			}
			
			//공통코드가 있는 경우 공통코드 셋팅
			if(!$.osl.isNull(selectObjList)){
				//공통코드 object 세팅
				$.each(selectObjList,function(idx, map){
					var commonCodeArr = [
			 			{mstCd: map.commCode, useYn: "Y",targetObj: "#"+map.targetId, comboType:"OS"},
					];
		   	
					//공통코드 채우기
					$.osl.getMulticommonCodeDataForm(commonCodeArr , false);

					//kt-select2 설정
					$('#'+map.targetId).select2();
				});
			}
			
			
			/* 공통 팝업 세팅 */
			if(!$.osl.isNull(commonPopup_charger)){
				//사용자
				$.each(commonPopup_charger,function(idx, map){

			    	// 사용자 input 엔터키 이벤트
			    	$("#"+map+"Nm").keypress(function(e){
			    		if (e.which === 13){
			    			$("#"+map+"Btn").click();
						}
			    	});
			    	// 사용자 input 포커스 아웃 이벤트
			    	$("#"+map+"Nm").change(function(e){
		    			$("#"+map).val("");
			    	});
			    	
					$("#"+map+"Btn").click(function(){
			    		var data = {
			    				usrNm : $("#"+map+"Nm").val()
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
										var selUsrInfo = OSLCmm6401Popup.getUsrInfo();
										if(!$.osl.isNull(selUsrInfo)){
								        	var usrInfo = JSON.parse(selUsrInfo);
								        	//담당자 명, Id
								        	$("#"+map).val(usrInfo.usrId);
								        	$("#"+map+"Nm").val(usrInfo.usrNm);
									        	
										}
									}
								}]
			    		};
			    		
			    		$.osl.layerPopupOpen('/cmm/cmm6000/cmm6400/selectCmm6401View.do',data,options);
			    	});
					
				});
			}

			//TODO 분류는 아직 기능 개발 전
			/*if(!$.osl.isNull(commonPopup_cls)){
				//분류
				$.each(commonPopup_cls,function(idx, map){
					$("#btn_cls_select_"+map).click(function() {
						gfnCommonClsPopup(function(reqClsId,reqClsNm){
							$('#'+map).val(reqClsId);
							$('#'+map+'Nm').val(reqClsNm);
						}, {prjId: config.prjId});
					});
				});
			}*/
			
			/**
		    * function 명 	: selectDeptInfo
		    * function 설명	: 조직명을 검색하여 조직을 찾는다. 
		    * 				    검색된 조직이 1개일 경우 조직 정보를 화면에 세팅하고, 2개 이상일경우 조직선택 팝업을 오픈한다.
		    * @param targetItem : itemId
		    * @param searchDeptNm : 검색할 조직명
		    */
			var selectDeptInfo = function(targetItem, searchDeptNm){
		    	
			   var ajaxObj = new $.osl.ajaxRequestAction({"url":"/stm/stm6000/stm6000/selectStm6000BeforeCmmDeptList.do", 
					"loadingShow": false}, {"searchDeptNm":$.trim(searchDeptNm)});
				//AJAX 전송 성공 함수
				ajaxObj.setFnSuccess(function(data){
					if(data.errorYn == "Y"){
						$.osl.alert(data.message,{type: 'error'});
					}else{
						var deptList = data.deptList;
						if(deptList.length == 1){
							// 검색된 조직이 1건일 경우 세팅
							var deptId = deptList[0].deptId;
							var deptNm = deptList[0].deptName;
							
							if(!$.osl.isNull(deptId) && !$.osl.isNull(deptNm)){
	                    		$("#"+targetItem).val(deptId);
	                    		$("#"+targetItem+"Nm").val(deptNm);
	                    	}
						}else{
							// 팝업호출
							callCommonDeptPopup(targetItem, searchDeptNm);
						}
					}
				});
				
				//AJAX 전송
				ajaxObj.send();
		    	
		   	};
		   	
		   	/**
		 	* function 명 	: callCommonDeptPopup
			* function 설명	: 조직선택 공통 팝업을 호촐한다.
		    * @param targetItem : itemId
			* @param searchDeptNm : 팝업에서 검색할 조직명
			*/
			var callCommonDeptPopup = function(targetItem, searchDeptNm){
				var data = {deptName:searchDeptNm};
    			var options = {
    					idKey: "cmm6500",
    					modalSize: 'xl',
    					modalTitle:  $.osl.lang("cmm6500.title.main.default"),
    					closeConfirm: false,
    					autoHeight: false,
    					callback:[{
    	                    targetId: "cmm6500ModalCallbackBtn",
    	                    actionFn: function(thisObj){
    	                		var deptId = $(thisObj).data("dept-id");
    	                		var deptNm = $(thisObj).data("dept-nm");

    	                		if(!$.osl.isNull(deptId) && !$.osl.isNull(deptNm)){
    	                    		$("#"+targetItem).val(deptId);
    	                    		$("#"+targetItem+"Nm").val(deptNm);
    	                    	}
    	                    }
    	                 }]
    				};
    			
    			$.osl.layerPopupOpen('/cmm/cmm6000/cmm6500/selectCmm6500View.do',data,options);
			};
			
			if(!$.osl.isNull(commonPopup_dept)){
				//조직
				$.each(commonPopup_dept,function(idx, map){
			    	// 조직명 input 포커스 아웃 이벤트
			    	$("#"+map+"Nm").change(function(e){
		    			$("#"+map).val("");
			    	});
			    	// 조직명 input 엔터키 이벤트
			    	$("#"+map+"Nm").keypress(function(e){
			    		if (e.which === 13){
			    			$("#"+map+"Btn").click();
						}
			    	});
					$("#"+map+"Btn").click(function(){
			    		var searchDeptNm = $.trim($("#"+map+"Nm").val());
			    		if($.osl.isNull(searchDeptNm)){
			    			// 조직선택 팝업 오픈
			    			callCommonDeptPopup(map);  			
			    		}else{
			    			if(searchDeptNm.lastIndexOf(">") > 0){
			    				// 상위조직 명을 제외한 조직명을 검색어로 넘긴다.
			    				searchDeptNm = searchDeptNm.substring(searchDeptNm.lastIndexOf(">")+1);
			    			}
				    		// 조직검색
				    		selectDeptInfo(map, searchDeptNm);
			    		}
			    	});
				});
			}
		}else{
			//데이터 없는 경우
			rtnStrValue = "데이터가 없습니다.";
		}
		
		//콜백 함수 있는 경우 실행
		if(typeof callbackFn == "function"){
			callbackFn();
		}
		
		//추가된 항목 배열로 반환
		return rtnStrArr;
		
		//html 생성 end
	}
	
	var setCheckListBtnAction = function(){
		$(".checkListUpdateBtn").off();
		$(".checkListUpdateBtn").click(function(){
			var $targetLabel = $(this).closest(".basicItemCheckList").find(".checkListNm");
			var $targetInput = $(this).closest(".basicItemCheckList").find("input[name=itemValNm]");
			var data = {
					"type": "update",
					"inputValNm": $targetInput.val()
			};
			var options = {
					idKey: "prj1206",
					modalTitle: $.osl.lang("prj1206.title.main.update"),
					modalSize: "md",
					closeConfirm: false,
					autoHeight: false,
					callback: [{
						targetId: "prj1206ModalCallBackBtn",
						actionFn: function(){
							//체크리스트 항목 명 수정
							var checkListNm = OSLPrj1206Popup.getItemValNm();
							$targetLabel.html(checkListNm);
							$targetInput.val(checkListNm);
						}
					}]
				};
			
			$.osl.layerPopupOpen('/prj/prj1000/prj1200/selectPrj1206View.do',data,options);
		});
		
		$(".checkListDeleteBtn").off();
		$(".checkListDeleteBtn").click(function(){
			var $target = $(this).closest(".checkListDiv");
			var checkListAllCnt = 0;
			var checkListChkCnt = 0;

			//체크리스트 삭제
			$(this).parent("div").remove();
			
			checkListAllCnt = $target.find(".checkList").length;
			checkListChkCnt = $target.find(".checkList:checked").length;
			var percent = checkListChkCnt / checkListAllCnt * 100;
			
			//체크리스트가 없으면 100%로 변경
			if(checkListAllCnt==0){
				percent = 100;
			}
			
			//프로그래스바 퍼센트 변경
			$target.find(".progress .progress-bar").attr('data-transitiongoal', percent).progressbar2({
				update: function(a, target) {
					var targetSpan = target.closest(".checkListDiv").find(".checkListPercent");
					targetSpan.html('완료율 : '+percent.toFixed(1)+'%')
				}
			});
		});
		
		//체크리스트 체크시 프로그래스바 퍼센트 변경
		$(".checkList").off();
		$(".checkList").click(function(){
			var $target = $(this).closest(".checkListDiv");
			var checkListAllCnt = 0;
			var checkListChkCnt = 0;
			
			checkListAllCnt = $target.find(".checkList").length;
			checkListChkCnt = $target.find(".checkList:checked").length;
			var percent = checkListChkCnt / checkListAllCnt * 100;
			
			$target.find(".progress .progress-bar").attr('data-transitiongoal', percent).progressbar2({
				update: function(a, target) {
					var targetSpan = target.closest(".checkListDiv").find(".checkListPercent");
					targetSpan.html('완료율 : '+percent.toFixed(1)+'%')
				}
			});
		});
	}
	
	return {
        // public functions
        init: function() {
        	//core에 커스텀 옵션 세팅
    		$.osl.customOpt.setting = osl_option_setting;
        }
    };
}();