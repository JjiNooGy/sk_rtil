/**
 * OSLCoreRegexSetting
 * 설명 : validator, 정규식 관련 모음
 * 
 * @since 2021.09.23
 * @author 안지혜
 * @see
 * ----------------------------------------------
 * 수정일		|	수정자	|	내용
 * ----------------------------------------------
 * 2022.09.15		안지혜		keen테마 버전 변경에 따라 formValidate function 추가	
 * ----------------------------------------------
 */
var OSLCoreRegexSetting = function () {
	
	/**
	* function 명 : getRegexStr
	* function 설명 : 정규식 코드에 맞는 regexstr, regexerrorstr 반환
	* (양식 구성 시 사용자 지정 정규식(공통코드 TPL00012)에 따라 유효성 검사 반환)
	* 
	* param : itemRegexCd
	* -1 hidenId가 필수
	* (공통코드 TPL00012 참고)
	* 01 텍스트
	* 02 텍스트(영문자만)
	* 03 텍스트(한글만)
	* 04 숫자
	* 05 이메일
	* 06 연락처(전화번호)
	* 07 연락처(휴대폰)
	* 08 주민등록번호
	* 09 IP4
	* 10 IP6
	*
	* 신규 추가
	* 11 IP4(172.28.*.* 제외)
	* 12 Mac
	*/
	var getRegexStr = function(itemRegexCd){
		itemRegexCd = String(itemRegexCd);
		//혹시라도 전달 받은 itemRegexCd가 없으면 default 01로 지정
		if($.osl.isNull(itemRegexCd)){
			itemRegexCd = "01";
		}
		
		var regexStr = "";
		var regexErrorStr = ""; //TODO 언어팩 넣기
		
		if(itemRegexCd == "-1"){ 
			//hidenId가 필수
			regexStr = '[^\\s]';
			regexErrorStr = '연결된 값이 존재해야 합니다.';
			
		}else if(itemRegexCd == "01"){ 
			//텍스트
			regexStr = '';
			regexErrorStr = '';
			
		}else if(itemRegexCd == "02"){ 
			//텍스트(영문자만)
			regexStr = '^[a-zA-Z]+[a-zA-Z\\s]+[a-zA-Z]+$';
			regexErrorStr = '영문자만 입력해야 합니다.(공백은 사이 띄어쓰기만 가능)';
			
		}else if(itemRegexCd == "03"){ 
			//텍스트(한글만_사이 띄어쓰기만 가능)
			regexStr = '^[ㄱ-ㅎㅏ-ㅣ가-힣]+[ㄱ-ㅎㅏ-ㅣ가-힣\\s]+[ㄱ-ㅎㅏ-ㅣ가-힣]+$';
			regexErrorStr = '한글만 입력해야 합니다.(공백은 사이 띄어쓰기만 가능)';
			
		}else if(itemRegexCd == "04"){ 
			//숫자(부호, 숫자(정수, 소수) 구성. 0000~불가)
			regexStr = '^[\+\-]?(0(?![0-9])(\.[0-9]+)?|[1-9](([0-9]+)?)+(\.[0-9]+)?)$';
			regexErrorStr = '유효한 숫자만 입력해야 합니다.';
			
		}else if(itemRegexCd == "05"){ 
			//이메일
			regexStr = '^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$';
			regexErrorStr = '이메일 형식에 맞지 않습니다.';
			
		}else if(itemRegexCd == "06"){ 
			//연락처(전화번호)
			regexStr = '^(02|0[3-9]{1}[0-9]{1})[0-9]{3,4}[0-9]{4}$';
			regexErrorStr = '연락처(전화번호) 형식에 맞지 않습니다.(숫자만 입력하세요.)';
			
		}else if(itemRegexCd == "07"){ 
			//연락처(휴대폰)
			regexStr = '^01[016789]{1}[0-9]{4}[0-9]{4}$';
			regexErrorStr = '연락처(휴대폰) 형식에 맞지 않습니다.(숫자만 입력하세요.)';
			
		}else if(itemRegexCd == "08"){ 
			//주민등록번호
			regexStr = '^([0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[1,2][0-9]|3[0,1]))\-[1-4][0-9]{6}$';
			regexErrorStr = '주민등록번호(6자리 숫자-7자리 숫자) 형식에 맞지 않습니다.';
		
		}else if(itemRegexCd == "09"){ 
			//IP4
			regexStr = '^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|\\*)\\.){3}(25[0-5]|2[0-4][0-9]|[01*]?[0-9][0-9]?|\\*)$';
			regexErrorStr = 'IP4 형식에 맞지 않습니다.(구분점(.) 입력 필요)';
		
		}else if(itemRegexCd == "10"){ 
			//IP6
			regexStr = '^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$';
			regexErrorStr = 'IP6 형식에 맞지 않습니다.(구분점(:) 입력 필요)';
			
		}else if(itemRegexCd == "11"){
			//IP4(172.28.*.* 제외)
			regexStr = '^(?!172\.28\.)\\b(?:\\d{1,3}\.){3}\\d{1,3}\\b$';
			regexErrorStr = 'IP4 형식에 맞지 않습니다.(172.28.*.*는 입력 할 수 없습니다.)';
			
		}else if(itemRegexCd == "12"){
			//MAC
			regexStr = '^([0-9A-F]{2}[:-]){5}([0-9A-F]{2})$';
			regexErrorStr = 'Mac 주소 형식을 맞춰주세요.(구분점(:) 입력 필요)';
		}
		return [regexStr, regexErrorStr];
	};
	
	/**
	* function 명 : fnCreateValid
	* function 설명 : 정규식에 맞춰 유효성 추가
	* param : tplItemId와 itemRegexCd가 들어가 있는 json 리스트
	*/
	var fnCreateValid = function(dataList){
		$.each(dataList, function(idx, data){
			//정규식 추가
			var itemId = data.tplItemId;
			var itemRegexCd = data.itemRegexCd;
			//0 regexstr, 1 regexerrorstr
			var returnValues = getRegexStr(itemRegexCd);
			var itemRegexStr = returnValues[0];
			var itemRegexErrorStr = returnValues[1];
			
			//regex 주입
			$("#"+itemId).attr("regexstr", itemRegexStr);
			$("#"+itemId).attr("regexerrorstr", itemRegexErrorStr);
			if(itemRegexCd == "-1"){
				//hidden id에도 임시 주입
				//$("#"+itemId+"_hide").attr("regexstr", itemRegexStr);
				//$("#"+itemId+"_hide").attr("regexerrorstr", itemRegexErrorStr);
			}
		});
	};
	
	/**
	 * function 명 : lastCheckValidate
	 * function 설명 : 
	 * 1. validate로 적용할 수 없는 기본항목의 숨겨진 사용자, 조직정보, 체크리스트 체크 - 첨부파일, 체크박스, summernote
	 * 2. tag와 같이 div 영역 안의 콘텐츠가 필수인 경우(통합-객체 존재 유무로 확인)
	 * 		예시) <div data-label="라벨명" data-label-lang-cd="라벨명 언어코드" required></div>
	 * param : formId(#제외) - 폼 아이디 
	 * param : targetDivId(#제외) - 기본항목이 생성된 영역 
	 */
	var lastCheckValidate = function(formId, targetDivId){
		var findId = "";
		if(!$.osl.isNull(formId)){
			findId = "#"+formId+ " ";
		}
		if(!$.osl.isNull(targetDivId)){
			findId += "#"+targetDivId;
		}

		var otherValidateElems = $(findId).find("textarea[data-editabled=true], input[data-hidden-id], input.d-none, input.osl-evt__template-hide-item, input.osl-evt__template-item[data-item-code=16], div.osl-evt__template-item--check-list, div[required]");

		var back = false;
		var alertMessage = "";
		$.each(otherValidateElems, function(idx, elem){
			if(["input", "textarea", "div"].indexOf(elem.tagName.toLowerCase()) == -1){
				return;
			}
			if($(elem).hasClass("osl-evt__exclude-item")){
				return;
			}
			if($(elem).hasClass("note-btn")){
				return;
			}
			
			//양식 항목에 대한 검사일 때, 서비스 항목-사용자-인 경우 타입에 따라 건너뛰기
			if($(elem).closest(".osl-evt__grid-stack-item").length > 0){
				var tempTopElem = $(elem).closest(".osl-evt__grid-stack-item");
				var datas = $.osl.templateForm.data.item(tempTopElem.find(".osl-evt__grid-stack-item-content"), false)['dataList'][0];
				//TPL00003
				if(datas["itemCode"] == "09" && datas["tplEssentialItem"] == "01"){
					if(["drawItem", "drawForm", "detail"].indexOf(datas["configType"]) > -1){
						return;
					}
				}
			}
			
			//태그와 같이 div 영역 안에 값이 필수로 있어야 하는 항목 - 단, 체크리스트/사용자 목록는 제외
			if(elem.tagName.toLowerCase() == "div" && elem.hasAttribute("required") && !$(elem).hasClass("osl-evt__template-item--check-list") && $(elem).find(".osl-evt__template-item--user-list").length == 0){
				var childrenElFalg = false;
				
				//자식 element중에 osl-evt__no-data, osl-evt__no-check 클래스 가지고 있는지 확인
				//단일일때
				if($(elem).children().length == 1) {
					//자식 element 가져오기
					var childrenEl = $(elem).children()[0];
					
					//osl-evt__no-check는 데이터가 없지만 필수 항목이 아니다.
					if($(childrenEl).hasClass('osl-evt__no-data') || $(childrenEl).hasClass("osl-evt__no-check")){
						childrenElFalg = true;
					}
				} 
				
				//하위 element 존재 시 osl-evt__no-data이거나 하위 값이 없으면
				if(childrenElFalg || $(elem).children().length == 0){
					//라벨명 언어코드로 가져오기
					var labelStr = $.osl.lang(elem.getAttribute("data-label-lang-cd"));
					//없으면 라벨명으로 대체
					if($.osl.isNull(labelStr)){
						labelStr = elem.getAttribute("data-label");
					}
					
					//그래도 없으면
					if($.osl.isNull(labelStr)){
						alertMessage = $.osl.lang("formValidate.messages.missRequired");
					}else{
						alertMessage = $.osl.lang("tplValidate.message.required", labelStr);
					}
					back = true;
					return false;
				}
			}
			//체크리스트
			else if(elem.tagName.toLowerCase() == "div" && $(elem).hasClass("osl-evt__template-item--check-list")){ 
				//체크리스트 가져오기
				var chkList = $(elem).find(".osl-evt__template-item--check-item");
				//체크리스트 없으면
				if(chkList.length == 0){
					alertMessage = $.osl.lang("itemValidate.message.checkList",$.osl.escapeHtml($(elem).siblings("label").text().trim().replace(/\.+/g,".")));
					back = true;
					return false;
				}
				//체크리스트 목록이 존재하면
				else {
					$.each(chkList, function(c, chkItem){
						var optTxt = $(chkItem).siblings(".osl-evt__grid-stack-item--opt-label").text().trim().replace(/\.+/g,".");
						//입력되어 있는 옵션 명이 없으면
						if($.osl.isNull(optTxt)){
							alertMessage = $.osl.lang("itemValidate.message.checkList",$.osl.escapeHtml($(elem).siblings("label").text().trim().replace(/\.+/g,".")));
							back = true;
							return false;
						}
					});
					if(back){
						return false;
					}
					
					//기본 조건 만족시
					//항목 정보 가져오기
					var itemInfo = $.osl.templateForm.data.item($(elem), true)["dataList"][0];
					//입력 상태일 때만 체크
					if(["sameTime", "insert", "update", "copy"].indexOf(itemInfo["configType"]) > -1){
						//1. 항목 개별 필수 체크 확인
						$.each(itemInfo["tplItemOptValListInfo"], function(c, chkItem){
							//옵션 자체가 필수인 경우, 해당 항목 무조건 선택되어 있는지 확인
							//필수인데 체크되어 있지 않으면
							if(chkItem["optEssentialCd"] == "01" && chkItem["itemVal"] != "01"){
								alertMessage = $.osl.lang("tplValidate.message.check",$.osl.escapeHtml(itemInfo["itemNm"])+" - "+$.osl.escapeHtml(chkItem["itemNm"]));
								back = true;
								return false;
							}
						});
						
						//2. 항목이 필수이면 -그룹-
						if(itemInfo["itemEssentialCd"] == "01"){
							//체크된 값이 없다면
							if($(elem).find(".osl-evt__template-item--check-item:checked").length == 0){
								alertMessage = $.osl.lang("tplValidate.message.check",$.osl.escapeHtml(itemInfo["itemNm"]));
								back = true;
								return false;
							}
						}
						
						//체크되어야 하는 최소/최대 갯수
						var minChkCnt = 0;
						var maxChkCnt = 0;
						//최소/최대 같은지
						var singleCnt = false;
						
						//항목이 다중이면
						if(itemInfo["itemMultiSelCd"] == "01"){
							//최솟값
							minChkCnt = itemInfo["itemMinVal"];
							//최댓값
							maxChkCnt = itemInfo["itemMaxVal"];
							
							if(minChkCnt == maxChkCnt) {
								singleCnt = true;
							}
							
							//체크 값 가져오기
							var selChkCnt = $(elem).find(".osl-evt__template-item--check-item:checked").length;
							//범위 넘어간 경우
							if(selChkCnt < minChkCnt || selChkCnt > maxChkCnt){
								if(singleCnt){
									alertMessage = $.osl.lang("tplValidate.message.checkRange1",$.osl.escapeHtml($(elem).siblings("label").text().trim().replace(/\.+/g,".")), minChkCnt);
								}else{
									alertMessage = $.osl.lang("tplValidate.message.checkRange2",$.osl.escapeHtml($(elem).siblings("label").text().trim().replace(/\.+/g,".")), minChkCnt, maxChkCnt);
								}
								back = true;
								return false;
							}
						}
					}
				}
			}
			//서비스 항목 - 사용자 리스트
			else if(elem.tagName.toLowerCase() == "div" && $(elem).find(".osl-evt__template-item--user-list").length > 0){
				//사용자 리스트 가져오기
				var usrList = $(elem).find(".osl-evt__template-item--user-list").data("user-list");
				if($.osl.isNull(usrList)){
					usrList = {};
				}
				else{
					usrList = JSON.parse(usrList);
				}
				//사용자 목록 없으면
				if($.osl.isNull(usrList) || Object.keys(usrList).length == 0){
					alertMessage = $.osl.lang("tplValidate.message.required",$.osl.escapeHtml($(elem).siblings("label").text().trim().replace(/\.+/g,".")));
					back = true;
					return false;
				}
				
				//최대 선택 수 체크
				var tempTopElem = $(elem).closest(".osl-evt__grid-stack-item");
				var itemInfo = $.osl.templateForm.data.item(tempTopElem.find(".osl-evt__grid-stack-item-content"), false)['dataList'][0];
				var itemSelUsrMaxVal = itemInfo["itemSelUsrMaxVal"];
				if(itemSelUsrMaxVal < Object.keys(usrList).length){
					alertMessage = $.osl.lang("tplValidate.message.userRange",$.osl.escapeHtml(itemInfo["itemNm"]), itemSelUsrMaxVal);
					back = true;
					return false;
				}
			}
			//디바이스 항목
			else if($(elem).data("itemCode") == "16"){
				//연결된 디바이스가 있는지 확인
				var tempTopElem = $(elem).closest(".osl-evt__grid-stack-item");
				var itemInfo = $.osl.templateForm.data.item(tempTopElem.find(".osl-evt__grid-stack-item-content"), false)['dataList'][0];
				
				//값이 하나라도 없으면
				if($.osl.isNull(itemInfo["api01"]) || $.osl.isNull(itemInfo["api02"]) || $.osl.isNull(itemInfo["api03"])){
					alertMessage = $.osl.lang("tplValidate.message.alertJamfCheck",$.osl.escapeHtml(itemInfo["itemNm"]));
					back = true;
					return false;
				}
			}
			//summernote
			else if($(elem)[0].hasAttribute("editabled") && $(elem).attr("editabled") == "true"){
				var tempTopElem = $(elem).closest(".osl-evt__grid-stack-item");
				if(tempTopElem.length > 0){
					var itemInfo = $.osl.templateForm.data.item(tempTopElem.find(".osl-evt__grid-stack-item-content"), false)['dataList'][0];
					
					if(itemInfo["itemEssentialCd"] == "01"){
						var txt = $(elem).summernote("code");
									
						//null이 아닐경우 태그 제거
						if(!$.osl.isNull(txt)){
							txt = txt.replace(/(\n)/gi, "");
							txt = txt.replace(/(<\/br>)|(<br>)|(<br\/>)/gi, "");
							txt = txt.replace(/(<\/p>)|(<p>)/gi, "");
						}
					
						//태그 제외한 값이 존재하는지 확인
						if($.osl.isNull(txt) || !new RegExp("[^\\s]").test(txt) || $(elem).summernote('isEmpty')){
							alertMessage = $.osl.lang("tplValidate.message.required",$.osl.escapeHtml(itemInfo["itemNm"])) + "&nbsp;" + $.osl.lang("formValidate.messages.notSpace");
							back = true;
							return false;
						}
					}
				}
				else {
					var txt = $(elem).summernote("code");
									
					//null이 아닐경우 태그 제거
					if(!$.osl.isNull(txt)){
						txt = txt.replace(/(\n)/gi, "");
						txt = txt.replace(/(<\/br>)|(<br>)|(<br\/>)/gi, "");
						txt = txt.replace(/(<\/p>)|(<p>)/gi, "");
					}
					
					if($(elem)[0].hasAttribute("required") || ($(elem).siblings("label").length > 0 && $(elem).siblings("label").hasClass("required"))){
						if($.osl.isNull(txt) || !new RegExp("[^\\s]").test(txt) || $(elem).summernote('isEmpty')){
							alertMessage = $.osl.lang("tplValidate.message.required",$.osl.escapeHtml(itemInfo["itemNm"])) + "&nbsp;" + $.osl.lang("formValidate.messages.notSpace");
							back = true;
							return false;
						}
					}
				}
			}
			//라벨에 필수가 있는 숨김 항목들
			else if($(elem).siblings("label").hasClass("required") || $(elem).closest(".fv-row, .form-group").find("label").hasClass("required")){
				//양식 항목 아이디 가져오기
				var targetId = $(elem).siblings(".osl-template-item").attr("id");
				if($.osl.isNull(targetId)){
					//없으면 단순 항목 아이디 가져오기
					targetId = elem.id;
				}
				//양식 항목 코드값 가져오기
				var targetItemCode = String($(elem).parents("div.grid-stack-item").data("itemCode"));
				if($.osl.isNull(targetItemCode)){
					//없으면
					targetItemCode = "-1";
				}
				//양식
				if(targetItemCode == "09" || targetItemCode == "11"){
					//선택된 ID
					var hiddenElemId = $(elem).data("hiddenKey");
					
					//숨겨진 사용자, 조직 아이디 값이 없으면
					if(!$.osl.isNull($("#"+hiddenElemId)) && $.osl.isNull($("#"+hiddenElemId).val())){
						alertMessage = $.osl.lang("tplValidate.message.select", $.osl.escapeHtml($(elem).closest(".fv-row, .form-group").find("label").text().trim().replace(/\.+/g,".")));
						back = true;
						return false;
					}
				}
				//기본항목
				else if($(elem).hasClass("d-none") &&  ($(elem).data("optType")=="04" || $(elem).data("optType")=="06")){
					//숨겨진 사용자, 조직 아이디 값이 없으면
					if($.osl.isNull($(elem).val())){
						alertMessage = $.osl.lang("itemValidate.message.select", $.osl.escapeHtml($(elem).parents("div").siblings("label").children("span").text().trim().replace(/\.+/g,".")));
						back = true;
						return false;
					}
				}
				//일반 작성 항목
				else if(!$.osl.isNull($(elem).data("hidden-id")) && !$.osl.isNull($("#"+$(elem).data("hidden-id")))){
					//숨겨진 객체가 필수값이므로
					var checkValue = $("#"+$(elem).data("hidden-id")).val();
					if($.osl.isNull(checkValue)){
						alertMessage = $.osl.lang("validateAlert.message.select", $.osl.escapeHtml($(elem).parents("div").siblings("label").children("span").text().trim().replace(/\.+/g,".")));
						back = true;
						return false;
					}
				}
				/*
				else if($(elem).hasClass("kt-uppy")){
					//첨부파일
					var filesCnt = $(elem).find(".uppy-Dashboard-Item").length;
					if($.osl.isNull(filesCnt) || filesCnt == 0){
						//alertMessage = $.osl.lang("itemValidate.message.required", $.osl.escapeHtml($(elem).siblings("label").children("span").text().trim().replace(/\.+/g,".")));
						back = true;
						return false;
					}
				}else if($(elem).data("elemType")=="checkbox"){
					//체크박스
					if($(findId+ " #"+targetId).is(":checked") == false){
						//alertMessage = $.osl.lang("itemValidate.message.check", $.osl.escapeHtml($(elem).parents("div").siblings("label").text().trim().replace(/\.+/g,".")));
						back = true;
						return false;
					}
				}
				*/
			}
		});

		return [back, alertMessage];
	};
	
	/**
	 * function 명 : settingValidate
	 * function  설명 : validate 구조 생성 및 세팅
	 * param : formId 폼 태그의 아이디
	 */
	var settingValidate = function(formId){
		//form 태그의 클래스에는 form이 있어야 한다.
		//validate가 체크되어야 하는 영역을 감싸는 div 클래스에는 fv-row, form-group가 있어야 한다.
		var form = document.getElementById(formId);
		
		//기존에 만들어진 validator가 있으면
		if(!$.osl.isNull($.osl.validate.list[formId])){
			try{
				$.osl.validate.list[formId].destroy();
				delete $.osl.validate.list[formId];
			}
			catch(e){
				//console.log("validate destory error : ", e);
			}
			
			//메시지 컨테이너
			//기존에 표출되어 있는 message container가 있으면 제거한다.(상위까지)
			var msgContainers = $(form).find("div.osl-evt__form-message-container");
			if(msgContainers.length > 0){
				$.each(msgContainers, function(i, elem){
					var msgContainersParent = $(elem).parent();
					if(!$.osl.isNull(msgContainersParent) && msgContainersParent.hasClass("fv-plugins-message-container")){
						msgContainersParent.remove();
					}else{
						$(elem).remove();
					}
				});
			}
		}//end 기존에 만들어진 validator가 있으면
		
		
		//fields에 넣어야하는 input, textarea, select, div 찾기
		var elements = [];
		var tempElements = form.querySelectorAll(".fv-row input, .fv-row select, .fv-row textarea, .fv-row div.kt-uppy, .form-group input, .form-group select, .form-group textarea, .form-group div.kt-uppy");
		/*
		var tempElements = form.querySelectorAll(
					".fv-row input:not(.osl-evt__template-hide-item, .osl-evt__exclude-item, .note-btn, .uppy-Dashboard-input, [readonly], [disabled])"
					+ ",.fv-row select:not(.osl-evt__template-hide-item, .osl-evt__exclude-item, [readonly], [disabled])"
					+ ",.fv-row textarea:not(.note-codable, .osl-evt__template-hide-item, .osl-evt__exclude-item, [readonly], [disabled])" 
					+ ",.fv-row div.kt-uppy:not(.osl-evt__template-hide-item, .osl-evt__exclude-item, [readonly], [disabled])"
				+ ",.form-group input:not(.osl-evt__template-hide-item, .osl-evt__exclude-item, .note-btn, .uppy-Dashboard-input, [readonly], [disabled])"
					+ ",.form-group select:not(.osl-evt__template-hide-item, .osl-evt__exclude-item, [readonly], [disabled])"
					+ ",.form-group textarea:not(.note-codable, .osl-evt__template-hide-item, .osl-evt__exclude-item, [readonly], [disabled])"
					+ ",.form-group div.kt-uppy:not(.osl-evt__template-hide-item, .osl-evt__exclude-item, [readonly], [disabled])"
		);
		*/
		
		//중복 발생을 방지하기 위해 검사한 name 담아두기
		var chkNmList = [];
		
		tempElements.forEach(function(elem){
			if($(elem).hasClass("osl-evt__template-hide-item")
				|| $(elem).hasClass("osl-evt__exclude-item")
				|| $(elem).hasClass("uppy-Dashboard-input")
				|| $(elem).hasClass("note-btn")
				|| $(elem).hasClass("note-codable")
				|| ($(elem).hasClass("osl-evt__template-item--check-item") && !elem.hasAttribute("required"))
				|| elem.hasAttribute("readonly")
				|| elem.hasAttribute("disabled")){
					//건너뛰기
					return true;
			}
			
			var chkNm = elem.name;
			if($.osl.isNull(chkNm)){
				chkNm = elem.id;
			}
			
			if(chkNmList.indexOf(chkNm) > -1){
				//건너뛰기
				return true;
			}
			
			elements.push(elem);
			chkNmList.push(chkNm);
		});
		
		//데이터
		var fields = {};
		elements.forEach(function(elem){
			var keyName = elem.name;
			//name이 없으면 id를 name으로 대체
			if($.osl.isNull(keyName)){
				keyName = elem.id;
			}
			//그래도 없으면 건너뛰기
			if($.osl.isNull(keyName)){
				return;
			}
			//없으면 만들고 이미 존재하면 건너뛰기
			if(!fields.hasOwnProperty(keyName)){
				fields[keyName] = {};
			}else{
				return;
			}
			
			var fvRow = elem.closest(".fv-row");
			if($.osl.isNull(fvRow)){
				fvRow = elem.closest(".form-group");
				if($.osl.isNull(fvRow)){
					return false;
				}
			}
			
			//라벨
			var labelElem = fvRow.querySelector("label");
			//라벨 텍스트
			var labelText = "";
			if($.osl.isNull(labelElem)){
				//라벨이 없으면 자기 자신으로 대체
				labelElem = elem;
			}else{
				//라벨이 있을 때
				labelText = labelElem.innerText.trim();
			}
			if($.osl.isNull(labelText)){
				//라벨이 없으면 속성 중 label 찾기
				labelText = elem.getAttribute("label");
				if($.osl.isNull(labelText)){
					//없으면 title 값으로 대체
					labelText = elem.title;
					if(!$.osl.isNull(elem.getAttribute("data-title-lang-cd"))){
						labelText = $.osl.lang(elem.getAttribute("data-title-lang-cd"));
					}
				}
				if($.osl.isNull(labelText)){
					//그래도 없으면 id 값으로 대체
					labelText = elem.id;
				}
			}
			
			//객체 태그 명
			var elemTagName = elem.tagName.toLowerCase();
			var type = "";
			if("input" == elemTagName){
				//input 객체일 때 타입 지정
				//elem.type으로 안하는 이유는 bootstrap에서 지정하지 않은 타입의 경우 text로 넘어오기 때문
				type = $(elem).attr("type");
				
				if((type == "hidden" && !elem.classList.contains("summernote")) || (elem.classList.contains("note-editable") && !$.osl.isNull(elem.contenteditable)) || elem.itemRegexCd == "-1"){
					//숨겨진 경우이거나 항목의 정규식 코드가 -1이면 무시
					return false;
				}else if(type == "text"){
					//텍스트이면 name이 telno, email이면 name을 type으로 변경
					if(elem.name == "telno" || elem.name == "email"){
						type = elem.name;
					}else{
						//아니라면 type을 default로 지정 - 언어팩 호출 시 default로 불러오기 위해
						type = "default";
					}
				}else if(type == "date" || type == "datetime"){
					type = "date";
				}else if(type == "radio" || type == "checkbox"){
					type = "check";
				}
			} else if(elemTagName == "div"){
				//div 이면
				type = "file";
			} else{
				//select, textarea이면
				type = elemTagName;
			}
			
			if(!fields[keyName].hasOwnProperty("validators")){
				fields[keyName]["validators"] = {};
			}
			
			//필수 항목과 summernote 항목인지 확인
			var requiredElem = false;
			//입력 검사해야하는 summernote인지 확인
			var summernoteElem = elem.hasAttribute("data-editabled");
			var summernoteCheck = false;
			if(summernoteElem){
				summernoteCheck = $(elem).data("editabled");
			} 
			
			//1. 필수항목인지 확인
			//.fv-row 안 라벨에 required가 있는지 확인(checkbox 같은 건 해당 element에 required가 없으므로)
			//또는 자기 자신에게 required가 있는지 확인
			if(labelElem.classList.contains("required") || elem.classList.contains("required") || elem.hasAttribute("required")){
				//필수이면
				requiredElem = true;
				
				
				//첨부파일이면
				if(type == "file"){
					if(elemTagName == "div"){
						//formValide에 file체크하는 field 구조가 있으나, 확장자 및 파일 용량등의 체크는 uppy에서 우선 체크하므로
						//callback을 사용하여 첨부파일 제출 여부만 확인한다.
						if(!fields[keyName]["validators"].hasOwnProperty("callback")){
							fields[keyName]["validators"]["callback"] = {
									message :  $.osl.lang("formValidate.messages.required"),
									callback : function(input){
										var elem = input.element;
										//첨부파일
										//var filesCnt = $(elem).find(".uppy-Dashboard-Item").length;
										var filesCnt = $.osl.file.list[keyName]["targetUppy"].getFiles();
										if($.osl.isNull(filesCnt) || filesCnt == 0){
											return false;
										}else{
											return true;
										}
									}
							}
						}
					}else{
						//input type=file
						if(!fields[keyName]["validators"].hasOwnProperty("file")){
							fields[keyName]["validators"]["file"] = {
									extension : elem.getAttribute("accept"),
									message : $.osl.lang("formValidate.messages.default")
							};
						}

						//가능 범위
						if($.osl.isNull(elem.getAttribute("accept"))){
							//제한 범위가 설정되어 있지 않으면 제거
							delete fields[keyName]["validators"]["file"]["extension"];
							//메시지도 필수로 변경
							fields[keyName]["validators"]["file"]["message"] = $.osl.lang("formValidate.messages.required");
						}
					}
					
					//아래는 진행하지 않음. 첨부파일은 필수만 체크
					//나머지 조건은 uppy에서 체크
					return;
				}
			}
			
			//필수일 때
			if(requiredElem){
				//파일 및 summernote 제외(summernote는 건너뛰기. callback으로 처리해야 한다.)
				if(!summernoteCheck){
					if(!fields[keyName]["validators"].hasOwnProperty("notEmpty")){
						fields[keyName]["validators"]["notEmpty"] = {
								message : $.osl.lang("formValidate.messages.required")
						};
					}
				}
				
				//regexalert가 있으면 필수 메시지 대체해야 하므로
				var alertLangStr = elem.getAttribute("regexalert");
				//전달 받은 값이 없으면
				if($.osl.isNull(alertLangStr)){
					//체크박스, 라디오, summernote 아니면
					if(type != "check" && !summernoteCheck){
						fields[keyName]["validators"]["notEmpty"]["message"] = $.osl.lang("formValidate.messages.required") + "&nbsp;"+$.osl.lang("formValidate.messages.notSpace");
					}
				}
				//전달 받은 값이 있고 summernote아니면
				else if(!$.osl.isNull(alertLangStr) && !summernoteCheck){
					//언어팩으로 확인
					var regexalert = $.osl.lang(alertLangStr);
					if($.osl.isNull(regexalert)){
						//언어팩에 없으면 그냥 넣기
						regexalert = alertLangStr;
					}
					//필수 항목에 대한 메시지이므로
					fields[keyName]["validators"]["notEmpty"]["message"] = $.osl.lang("formValidate.messages.required") + "("+regexalert+")";
				}
			}
			
			//regexstr 커스텀 정규식
			var regexstr = elem.getAttribute("regexstr");
			
			//2. 정규식 확인
			//개발자 지정 정규식이 있으면
			if(!$.osl.isNull(regexstr)){
				if(!regexstr instanceof RegExp){
					regexstr = regexstr.toString();
				}
				
				if(!fields[keyName]["validators"].hasOwnProperty("regexp")){
					fields[keyName]["validators"]["regexp"] = {};
				}
				
				fields[keyName]["validators"]["regexp"]["regexp"] = new RegExp(regexstr);
				
				//패스워드면
				if(type == "password"){
					//password 확인용
					if(!$.osl.isNull(elem.getAttribute("equalTo"))){
						//비교 대상 가져오기(# 포함)
						var compareId = elem.getAttribute("equalTo");
						
						if(!fields[keyName]["validators"].hasOwnProperty("identical")){
							fields[keyName]["validators"]["identical"] = {
									compare : function(){
										return form.querySelector(compareId).value;
									},
									message : $.osl.lang("formValidate.messages.equalTo")
							};
						}
					}
				}
				
				//regexerrorstr 커스텀 정규식 문구
				var errorLangStr = elem.getAttribute("regexerrorstr");
				//정규식 메시지가 없으면
				if($.osl.isNull(errorLangStr)){
					//필수 항목이면
					if(requiredElem){
						fields[keyName]["validators"]["regexp"]["message"] = fields[keyName]["validators"]["notEmpty"]["message"];
					}
					//필수가 아니면
					else{
						//기본 설정일 때만 변경, 지정된 커스텀 정규식이 있으므로
						if(type == "default"){
							type = "regexstr";
						}
						fields[keyName]["validators"]["regexp"]["message"] = $.osl.lang("formValidate.messages."+type);
					}
				}
				//정규식 메시지도 있으면
				else{
					//언어팩으로 확인
					var regexerrorstr = $.osl.lang(errorLangStr);
					if($.osl.isNull(regexerrorstr)){
						//언어팩에 없으면 그냥 넣기
						regexerrorstr = errorLangStr;
					}
					
					//커스텀 정규식에 대한 메시지이므로
					fields[keyName]["validators"]["regexp"]["message"] = regexerrorstr;
				}
			}
			//개발자 지정 정규식이 없으면
			else{
				//3. 지정된 정규식이 없으면 type에 따라 체크
				if((type == "check" || type == "radio" || type == "password") && !requiredElem){
					//필수가 아닌 체크박스, 라디오, 패스워드는 건너뛰기
					return;
				}
				//입력 검사해야하는 summernote인지 확인
				else if(type == "textarea" && summernoteCheck){
					//필수가 아닐 때 callback validators로 사용
					if(!fields[keyName]["validators"].hasOwnProperty("callback") && (!fields[keyName]["validators"].hasOwnProperty("notEmpty") || !fields[keyName]["validators"]["notEmpty"].hasOwnProperty("regexp"))){
						fields[keyName]["validators"]["callback"] = {
								message : $.osl.lang("tplValidate.message.reCheck"),
								callback: function(input){
									var elem = input.element;
									/*
									//상위 객체
									var chkTopElem = elem.parentNode;
									//내에 있는 summernote 영역
									var chkElem = chkTopElem.querySelector("div.note-editable[contenteditable=true]");
									var txt = chkElem.innerText.trim().replace(/(<([^>]+)>)/ig, '');
									*/
									var txt = $(elem).summernote("code");
									
									//null이 아닐경우 태그 제거
									if(!$.osl.isNull(txt)){
										txt = txt.replace(/(\n)/gi, "");
										txt = txt.replace(/(<\/br>)|(<br>)|(<br\/>)/gi, "");
										txt = txt.replace(/(<\/p>)|(<p>)/gi, "");
									}
									
									//정규식 체크
									var rtnVal;
									//필수 항목이면
									if(requiredElem) {
										rtnVal = new RegExp("[^\\s]").test(txt);
										
										if($.osl.isNull(txt) || !rtnVal ||$(elem).summernote('isEmpty')){
											rtnVal = false;
										}
									}
									//필수가 아니면
									else {
										rtnVal = true;
									}
									
									return rtnVal;
								}
						};
					}
				}
				//해당 조건이 아닐 때(단순 input text, select, textarea, file, check), summernote의 color
				else if(["default", "select", "textarea", "file", "check", "color"].indexOf(type) == -1){
					if(!fields[keyName]["validators"].hasOwnProperty("regexp") && type != "password"){
						fields[keyName]["validators"]["regexp"] = {
								message : $.osl.lang("formValidate.messages."+type)
						};
					}
					
					//기본 정규식 사용하지 않는 경우 해당 input에 passRegex attribute 추가
					if(elem.hasAttribute("passregex")) {
						return false;
					}
					
					//타입에 따라 넣기
					//연락처 정규식
					else if(type == "telno"){
						regexstr = new RegExp(/^(01[016789]{1}[0-9]{4}[0-9]{4})|((02|0[3-9]{1}[0-9]{1})[0-9]{3,4}[0-9]{4})$/);
					}
					//이메일 정규식
					else if(type == "email"){
						regexstr = new RegExp(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/);
					}
					//숫자 정규식
					else if(type == "number"){
						regexstr = new RegExp(/^[\+\-]?(0(?![0-9])(\.[0-9]+)?|[1-9](([0-9]+)?)+(\.[0-9]+)?)$/);
						//min, max 확인
						var minNum = elem.getAttribute("min");
						var maxNum = elem.getAttribute("max");
						if(!$.osl.isNull(minNum) || !$.osl.isNull(maxNum)){
							if($.osl.isNull(minNum)){
								minNum = "1";
							}
							if($.osl.isNull(maxNum)){
								maxNum = "99999999";
							}
							
							if(!fields[keyName]["validators"].hasOwnProperty("between")){
								fields[keyName]["validators"]["between"] = {
									min : parseInt(minNum)
									,max : parseInt(maxNum)
									,message : $.osl.lang("formValidate.messages.range", minNum, maxNum)
								}
							}
						}
					}
					//날짜 정규식
					else if(type == "date"){
						regexstr = new RegExp(/^(19|20)[0-9]{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);
					}
					//비밀번호 정규식(일반용) - 필수인데 정규식이 없는 경우
					else if(type == "password"){
						
						regexstr = new RegExp("/^[a-zA-Z0-9\!\-_+@\#$%&\=\/]$/");
						//필수 정규식이 빠져있으므로
						fields[keyName]["validators"]["notEmpty"]["regexp"] = regexstr;
						
						//password 확인용
						if(!$.osl.isNull(elem.getAttribute("equalTo"))){
							//비교 대상 가져오기(# 포함)
							var compareId = elem.getAttribute("equalTo");
							
							if(!fields[keyName]["validators"].hasOwnProperty("identical")){
								fields[keyName]["validators"]["identical"] = {
										compare : function(){
											return form.querySelector(compareId).value;
										},
										message : $.osl.lang("formValidate.messages.equalTo")
								};
							}
						}
					}
					
					if(type != "password"){
						//정규식 등록
						fields[keyName]["validators"]["regexp"]["regexp"] = regexstr;
					}
				}
				//필수인 체크인 경우
				else if(type == "check"){
					var optLabelNm = $.osl.escapeHtml($(elem).siblings("label").text().trim().replace(/\.+/g,"."));
					if(!fields[keyName]["validators"].hasOwnProperty("notEmpty")){
						fields[keyName]["validators"]["notEmpty"] = {};
					}
					fields[keyName]["validators"]["notEmpty"]["message"] = $.osl.lang("tplValidate.message.check", optLabelNm);
				}
			}
			//4. 글자 수 제한이 있는지 확인
			//단 regexp가 없을 때만
			if(!fields[keyName]["validators"].hasOwnProperty("regexp")){
				//최소 글자수 있으면
				if(!$.osl.isNull(elem.getAttribute("minlength"))){
					if(!fields[keyName]["validators"].hasOwnProperty("stringLength")){
						fields[keyName]["validators"]["stringLength"] = {};
					}
					fields[keyName]["validators"]["stringLength"]["min"] = parseInt(elem.getAttribute("minlength"));
				}
				//최소 글자 수 없을 때
				else{
					//필수항목이면
					if(requiredElem){
						//최소 글자수 1로 변경
						if(!fields[keyName]["validators"].hasOwnProperty("stringLength")){
							fields[keyName]["validators"]["stringLength"] = {};
						}
						fields[keyName]["validators"]["stringLength"]["min"] = 1;
					}
				}
				//최대 글자수 있으면
				if(!$.osl.isNull(elem.getAttribute("maxlength"))){
					if(!fields[keyName]["validators"].hasOwnProperty("stringLength")){
						fields[keyName]["validators"]["stringLength"] = {};
					}
					fields[keyName]["validators"]["stringLength"]["max"] = parseInt(elem.getAttribute("maxlength"));
				}
			}
		});
		
		//기본 플러그인
		var plugins = {
				trigger: new FormValidation.plugins.Trigger(),
				exclude: new FormValidation.plugins.Excluded({
					excluded : function(field, element, elements){
						// field is the field name
						// element is the field element
						// elements is the list of field elements in case
						// we have multiple elements with the same name
						//제외할 것 : .osl-evt__exclude-item, UsrImgId이거나, 숨겨져있거나, 선택 불가, 읽기 전용인 경우, summernote의 toolbar에 속한 경우
						if($(element).hasClass("osl-evt__exclude-item") || field.indexOf("UsrImgId") > -1 || $(element).attr("type") == "hidden" || $(element).is(":disabled") || "readonly" == $(element).attr("readonly") || !$(element).is(":visible") || $(element).closest(".note-toolbar").length > 0){
							return true;
						}else{
							return false;
						}
					}
				}),
				bootstrap: new FormValidation.plugins.Bootstrap5({
					rowSelector: '.fv-row, .form-group',
					eleInvalidClass: '',
					eleValidClass: '',
					defaultMessageContainer: false, //true : when message plugin not used
				}),
				message: new FormValidation.plugins.Message({
					clazz: 'osl-evt__form-message-container fv-plugins-message-container invalid-feedback',
					container : function(field, element){
						//osl-evt__exclude-item 이면
						if($(element).hasClass("osl-evt__exclude-item")){
							//빈 객체 전달
							return new DocumentFragment();
						}
						//input-group에 속해있으면
						else if($(element).closest(".input-group").length > 0){
							//input-group 하단에 붙이기
							return $(element).closest(".input-group").parent()[0];
						}
						//체크박스여서 form-check 안에 있으면
						else if($(element).closest(".form-check").length > 0){
							$(element).closest(".form-check").addClass("ddddddddddd");
							//form-check 하단에 붙이기
							return $(element).closest(".form-check").parent()[0];
						}
						//현재 객체 하단에 붙이기
						else {
							return $(element).parent()[0];
						}
					}
				}),
		};
		
		//참고 : https://formvalidation.io/guide/api/
		//validator 생성
		let validator = FormValidation.formValidation(
								form,
								{
									//validate 검사할 field의 name에 따라 validators 세팅
									fields: fields,
									plugins: plugins,
								}
							);
		//메시지 컨테이너
		//동일 메시지는 하나만 표출하기 위해(2024.06.20 기준, 필수 텍스트박스-정규식:텍스트-, 필수 체크박스인 경우 : 필수 메시지가 다중 발생하는 문제있어 해결하기 위함)
		//메시지 플러그인이 오류 표시한 이후 트리거
		validator.on('plugins.message.displayed', function(e) {
			/* *
			 * This event is triggered after the Message plugin displays the error
			 *  e.element: The field element
			 *  e.field: The field name
			 *  e.message: The error
			 *  e.messageElement: The message element
			 *  e.meta: The meta data returned by validation result if available
			 *  e.validator: The validator name
			 * */
			//이미 표출된 것이 존재하면
			//같은 대상에 동일한 message 컨테이너 존재할 때
			if($("[data-field="+e.field+"][data-validator="+e.validator+"]").length > 1){
				$(e.messageElement).remove();
			}
			//피카츄
			//같은 대상 영역에 유형이 같은 message 컨테이너 존재할 때
			if($(e.messageElement).closest(".fv-plugins-icon-container").find(".fv-plugins-message-container [data-validator="+e.validator+"]").length > 1){
				var first = true;
				$.each($(e.messageElement).closest(".fv-plugins-icon-container").find(".fv-plugins-message-container"), function(idx, elem){
					if($(elem).find("div").data("validator") == e.validator){
						if(first){
							first = false;
							return;
						}
						
						$(elem).remove();
					}
				});
			}
		});
		//메시지 플러그인 설정 이후 트리거
		validator.on('plugins.message.placed', function(e) {
			/* *
			 * This event is triggered after the Message plugin prepares the message elements for all fields
			 *  e.element: The field element
			 *  e.field: The field name
			 *  e.messageElement: The message element
			 * */
		});
		
		//validate 리스트에 추가
		$.osl.validate.list[formId] = validator;
		
		return validator;
	};
	
	//valid
	/**
	 * function 명 : setValid
	 * function 설명 : 지정 객체 내에 있는 input, select, textarea에 대하여 validate를 확인한다.
	 * param successsFn : validate 성공 후 실행할 callback
	 * param failFn : validate 실패 후 실행할 callback
	 * param finallyFn : validate 마지막에 실행할 callback
	 */
	var setValid = function (successFn, failFn, finallyFn){
		//1. 지정 객체의 아이디를 가져온다
		var targetId = this.attr("id");
		
		//2. 해당 validator를 생성한다.
		//기존 validator 생성 유무를 판단하지 않는 이유는 동일 name으로 인해 체크가 제대로 되지 않는 경우가 발생하기 때문
		var validator = settingValidate(targetId);
		
		//4. valid 체크하여 반환한다.
		return fnValidThen(validator, targetId, successFn, failFn, finallyFn);
	};
	
	/**
	 * function 명 : fnValidThen
	 * function 설명 : 객체 검사 시 연결 항목(담당자 id, 조직 id, 정보자산 id 등) 확인
	 * param validator : validator 객체
	 * param targetId : 지정 객체의 아이디
	 * param successsFn : validate 성공 후 실행할 callback
	 * param failFn : validate 실패 후 실행할 callback
	 * param finallyFn : validate 마지막에 실행할 callback
	 */
	var fnValidThen = function (validator, targetId, successFn, failFn, finallyFn){
		return validator.validate().then(function (status){
			if(status == "Valid"){
				//단순 확인 성공하면 숨겨진 항목도 검사
				var returnVal = lastCheckValidate(targetId);
				if(returnVal[0]){
					//숨겨진 항목에 대한 valid message 표출
					$.osl.alert(returnVal[1]);
					return Promise.reject(returnVal[1]);
				}else{
					//모두 다 통과
					return Promise.resolve("Valid");
				}
			}
		}).then(function (status){
			if(status == "Valid"){
				//통과
				if(typeof successFn == "function"){
					successFn();
				}
			}else{
				//실패
				if(typeof failFn == "function"){
					failFn();
				}
			}
		}).catch(function(message){
			//실패
			if(typeof failFn == "function"){
				failFn(message);
			}
		}).finally(function(){
			//최종
			if(typeof finallyFn == "function"){
				finallyFn();
			}
		});
	};
	
	return {
		// public functions
		init: function() {
			//core에 커스텀 옵션 세팅
			$.osl.templateForm.regex.setting = fnCreateValid;
			
			$.osl.validate.setting = settingValidate;
			$.prototype.valid = setValid;
		},
		fnValidThen : function(validator, targetId, successFn, failFn){
			fnValidThen(validator, targetId, successFn, failFn);
		}
	};
}();
