/**
 * @since 2022.09.08
 * @author 안지혜
 * 
 * scripts.bundle.js에서 필요 function이 제거됨에 따라 
 * 별도 생성 및 동일 로직을 다른 명칭으로 추가 생성 
 * @see
 * --------------------------------------------------------------------------------------
 * 작성자	|	작성일		|	plugin 명			| plugin 설명		
 * --------------------------------------------------------------------------------------
 * 안지혜	|	2022.09.08 |						| 최초 작성
 * --------------------------------------------------------------------------------------
 * 
 */
"use strict";
var OSLApp = function(){
	
	//툴팁 전체 세팅
	var initTooltips = function () {
		//KTApp createBootstrapTooltips 참고
		var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));

		var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
			//접기/펼치기 때, 툴팁의 위치가 틀어지므로 클릭 시 툴팁이 닫히도록 하기 위해 옵션 추가 한다.
			tooltipTriggerEl.setAttribute("data-bs-dismiss", "click");

			//tooltip toggle 옵션이 default : hover, focus인데, 버튼일 때 클릭하면 focus가 되어
			//alert, confirm등 동작 후엔 focus로 인해 tooltip이 다시 나타나게 되므로
			//script.bundle.js 수정- click 이벤트 (2023.01.10)
			
			//툴팁 생성
			KTApp.createBootstrapTooltip(tooltipTriggerEl, {});
		});
		
		//접기/펼치기의 경우 data-bs-toogle="collapse"이므로, data-osl-toggle로 검색
		tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-osl-toggle="tooltip"]'));

		tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
			//접기/펼치기 때, 툴팁의 위치가 틀어지므로 클릭 시 툴팁이 닫히도록 하기 위해 옵션 추가 한다.
			tooltipTriggerEl.setAttribute("data-bs-dismiss", "click");
			
			//tooltip toggle 옵션이 default : hover, focus인데, 버튼일 때 클릭하면 focus가 되어
			//alert, confirm등 동작 후엔 focus로 인해 tooltip이 다시 나타나게 되므로
			//script.bundle.js 수정- click 이벤트 (2023.01.10)
			
			//툴팁 생성
			KTApp.createBootstrapTooltip(tooltipTriggerEl, {});
		});
	};
	
	/*
	 * function 명 : fnUpdateTooltipTitle
	 * function 설명 : 툴팁 단건 업데이트
	 * parameter selector : 객체 선택자
	 * parameter title : 변경될 툴팁 내용
	 */
	var fnUpdateTooltipTitle = function(selector, title){
		var elem = document.querySelector(selector);
		if(elem == null || elem.length == 0){
			//객체 없으면 중지
			return false;
		}
		
		//선택 타이틀에 값 넣기
		//변경될 타이틀 값이 없으면 취소
		if(title == null || title == ""){
			return false;
		}
		//타이틀 세팅
		elem.setAttribute("title", title);
		
		//툴팁 정보 있는지 확인
		var tp =  bootstrap.Tooltip.getInstance(elem);
		if(tp != null){
			//툴팁정보가 있으면
			// 파괴하고 다시 세팅
			tp.dispose();
			elem.removeAttribute("data-kt-initialized");
			
			return KTApp.createBootstrapTooltip(elem, {});
		}else{
			return false;
		}
	};
	
	/*
	 * function 명 : fnUpdateTooltipTitleAll
	 * function 설명 : 툴팁 다중 업데이트
	 * parameter selector : 객체 선택자
	 */
	var fnUpdateTooltipTitleAll = function(selector){
		var elemList = [].slice.call(document.querySelectorAll(selector));
		
		if(elemList == null || elemList.length == 0){
			//객체 없으면 중지
			return false;
		}
		
		var updateTooltipElemList = elemList.map(function (elem) {
			var title = $(elem).attr("title");
			//변경될 타이틀 값이 없으면 취소
			if(title == null || title == ""){
				return false;
			}
			
			//툴팁 정보 있는지 확인
			var tp =  bootstrap.Tooltip.getInstance(elem);
			if(tp != null){
				//툴팁정보가 있으면
				// 파괴하고 다시 세팅
				tp.dispose();
				elem.removeAttribute("data-kt-initialized");
				
				return KTApp.createBootstrapTooltip(elem, {});
			}
		});
	};
	
	//열린 툴팁 모두 닫기
	var fnCloseTooltips = function(){
		//열린 툴팁이 있다면 모두 숨기기
		$("[data-toggle='tooltip']").tooltip('hide');
		$("[data-osl-toggle='tooltip']").tooltip('hide');
		
		//혹시라도 툴팁이 남아있으면 제거하기
		$("div.tooltip.show").remove();
	};
	
	//모든 popover 세팅
	var initPopovers = function(){
		//KTApp createBootstrapPopovers 참고
		var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
		 
		var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
			var popover = KTApp.createBootstrapPopover(popoverTriggerEl, {});
		});
	};
	
	//툴팁, 메뉴, 팝오버와 같이 화면 스크롤 될 때 숨겨져야 하는 항목 제어 호출
	var initObserver = function(){
		
		if(OSLApp.observer == null){
			OSLApp.observer = new IntersectionObserver(function(elements){
				if(elements == null || elements.length == 0){
					return false;
				}
				
				$.each(elements, function(idx, elem){
					var targetElem = elem.target;
					//객체가 화면에서 안보일 때
					if(!$(elem).is(":visible")){
						//메뉴(트리거되는 버튼 기준)
						if(targetElem.getAttribute("data-kt-menu-trigger") != null && targetElem.getAttribute("data-kt-menu-trigger") != ""){
							if(!$(targetElem).hasClass("osl-evt__menu-item-show") && !$(targetElem).hasClass("show")){
								var menu = KTMenu.getInstance(targetElem);
								if(menu != null){
									menu.hide(targetElem);
								}
							}
						}
						//툴팁2 - 접기 펼치기에는 osl-toggle이 있기 때문에 먼저 검사
						else if(targetElem.getAttribute("data-osl-toggle") != null && targetElem.getAttribute("data-osl-toggle") != ""){
							var toggle = targetElem.getAttribute("data-osl-toggle");
							if(toggle == "tooltip"){
								var tooltip = bootstrap.Tooltip.getInstance(targetElem);
								if(tooltip != null){
									tooltip.hide();
								}
							}
						}
						//툴팁1, 팝오버 (:접기/펼치기는 제외)
						else if(targetElem.getAttribute("data-bs-toggle") != null && targetElem.getAttribute("data-bs-toggle") != ""){
							var toggle = targetElem.getAttribute("data-bs-toggle");
							if(toggle == "tooltip"){
								var tooltip = bootstrap.Tooltip.getInstance(targetElem);
								if(tooltip != null){
									tooltip.hide();
								}
							}else if(toggle == "popover"){
								var popover = bootstrap.Popover.getInstance(targetElem);
								if(popover != null){
									popover.hide();
								}
							}
						}
					}
				});
			});
		}else{
			//전체 해제
			OSLApp.observer.disconnect();
		}
		
		//검사 대상 지정
		//메뉴 트리거 대상, 툴팁, 팝오버
		var targetElems =[].slice.call( document.querySelectorAll('[data-kt-menu-trigger], [data-bs-toggle="tooltip"], [data-bs-toggle="popover"], [data-osl-toggle="tooltip"]'));
		var targetElem = targetElems.map(function (targetItem){
			OSLApp.observer.observe(targetItem);
		});
	};
	
	//스크롤 이동(탭과 같이 적용 시 동작 안되는 문제가 있어서 별도 선언)
	var fnScrollMove = function(){
		var scrollMoveList = [].slice.call(document.querySelectorAll('a[data-osl-scroll-toggle][href*="#"]'));

		var smoothScroll = scrollMoveList.map(function (elem) {
			elem.addEventListener("click", function(){
				document.querySelector(elem.getAttribute("href")).scrollIntoView({behavior:'smooth'});
			});
		});
	};
	
	//drawer를 지정된 크기 이하에서만 보이도록 설정
	var setResponsiveDrawer = function(element, size){
		//min 기준 작성
		var defaultResponsiveSize = {
				sm : "576",
				md : "778",
				lg : "992",
				xl : "1200"
		};
		
		var defaultOptions = {
				width : parseInt(defaultResponsiveSize.sm),
		};
		
		if(!$.osl.isNull(size)){
			defaultOptions.width = defaultResponsiveSize[size];
		}
		
		//현재 창 크기 가져오기
		var currentWidth = $("#kt_app_content").width();
		var currentHeight = $("#kt_app_content").height();
		
		//현재 설정
		if(defaultOptions.width < currentWidth){
			//기준보다 크면
			//스타일 제거
			$(element)[0].style.removeProperty("width");
			//클래스 추가
			$(element).addClass("osl-drawer_responsive");
			//높이 고정
			//높이에서 top, bottom, etc 높이 제거 후 고정
			currentHeight = currentHeight - parseInt($("#kt_app_content").css("padding-top")) - parseInt($("#kt_app_content").css("padding-bottom")) - parseInt("20px");
			$(element)[0].style.setProperty("height", currentHeight + "px", "important");
			
			//옵션 변경
			$(element).attr("data-kt-drawer", "false");
			//만약 drawer가 열린 상태에서 화면 resize가 되는 경우 마스크가 있으므로
			if($(".drawer-overlay").length > 0){
				$(".drawer-overlay").remove();
			}
			
			//연결된 토글 버튼 show/hide
			var btnSelector = $(element).data("kt-drawer-toggle");
			if(!$.osl.isNull(btnSelector)){
				var btn = document.querySelector(btnSelector);
				$(btn).addClass("d-none");
			}
			
		}else{
			//기준보다 작거나 같으면
			//스타일 다시 추가
			var dataWidth = "";
			if($.osl.isNull($(element).data("kt-drawer-width"))){
				dataWidth = "400px";
			}else{
				//화면 크기에 따라
				var viewSize = "";
				if(parseInt(defaultResponsiveSize.xl) <= currentWidth){
					viewSize = "xl";
				}else if(parseInt(defaultResponsiveSize.lg) <= currentWidth){
					viewSize = "lg";
				}else if(parseInt(defaultResponsiveSize.md) < currentWidth){
					viewSize = "md";
				}else if(parseInt(defaultResponsiveSize.sm) < currentWidth){
					viewSize = "sm";
				}else{
					viewSize = "sm";
				}
				
				dataWidth = $(element).data("kt-drawer-width")[viewSize];
				if($.osl.isNull(dataWidth)){
					dataWidth = $(element).data("kt-drawer-width")["default"];
				}
				if($.osl.isNull(dataWidth)){
					dataWidth = "400px";
				}
			}

			$(element)[0].style.setProperty("width", dataWidth);
			//클래스 제거
			$(element).removeClass("osl-drawer_responsive");
			//높이 고정 제거
			$(element)[0].style.removeProperty("height");
			//옵션 변경
			$(element).attr("data-kt-drawer", "true");
			
			//연결된 토글 버튼 show/hide
			var btnSelector = $(element).data("kt-drawer-toggle");
			if(!$.osl.isNull(btnSelector)){
				var btn = document.querySelector(btnSelector);
				$(btn).removeClass("d-none");
			}
		}
	};
	
	//drawer 반응형 설정
	var setDrawerResize = function(element, size){
		window.addEventListener('resize', function(){
			setResponsiveDrawer(element, size);
		});
	};
	
	//darawer 설정
	var initDrawer = function(element, size){
		//drawer 설정
		setResponsiveDrawer(element, size);
		//반응형 설정
		setDrawerResize(element, size);
	}
	
	//tabs 설정
	var initTab = function(el){
		if(el.hasAttribute("data-osl-tabs-init") && el.getAttribute("data-osl-tabs-init") == "1"){
			return false;
		}
		
		var tabObj = new bootstrap.Tab(el);
		
		el.setAttribute("data-osl-tabs-init", "1");
		
		return tabObj;
	};
	
	//callbackFn에는 Tab 최초 설정 시 추가 적용할 function(hide, hidden, show, shown 선언한다)
	var initTabs = function(el, callbackFn){
		var tabsTriggerList = [].slice.call(el.querySelectorAll('[data-bs-toggle="tab"]'));
		var tabsList = tabsTriggerList.map(function (tabEl) {
			var tabObj = initTab(tabEl);
			
			//적용할 함수 있는 경우 실행
			if(callbackFn != null && callbackFn != {}){
				if(callbackFn.hasOwnProperty("hide") && typeof callbackFn["hide"] == "function"){
					tabEl.addEventListener("hide.bs.tab", function(event){
						callbackFn["hide"]();
					})
				}
				if(callbackFn.hasOwnProperty("hidden") && typeof callbackFn["hidden"] == "function"){
					tabEl.addEventListener("hidden.bs.tab", function(event){
						callbackFn["hidden"]();
					})
				}
				if(callbackFn.hasOwnProperty("show") && typeof callbackFn["show"] == "function"){
					tabEl.addEventListener("show.bs.tab", function(event){
						callbackFn["show"]();
					})
				}
				if(callbackFn.hasOwnProperty("shown") && typeof callbackFn["shown"] == "function"){
					tabEl.addEventListener("shown.bs.tab", function(event){
						callbackFn["shown"]();
					})
				}
			}
			if(typeof callbackFn == "function"){
				callbackFn();
			}
		});
		el.setAttribute("data-osl-tabs-init", "1");
	};
	
	//반응형 클래스 제어를 위한 스크립트
	var fnContentAreaCss = function(){
		//콘텐츠 영역
		var contentArea = $(".app-main .app-content")[0];
		//콘텐츠 영역의 현재 크기
		var contentAreaWidth = $(contentArea).width();
		var contentAreaHeight = $(contentArea).height() - parseInt($(contentArea).css("padding-top")) - parseInt($(contentArea).css("padding-bottom")) - parseInt("20px");

		//반응형 css 가능 % : style.osl.css 참고
		var range = ["100", "75", "50"];
		
		/* osl-w-body-{} 제어 */
		if($("[class*=osl-w-body]") != null){
			$.each($("[class*=osl-w-body]"), function(idx, elem){
				//현재 객체가 존재하는 창 크기(modal, page)
				if($(elem).closest(".modal").length > 0) {
					//modal이면
					contentAreaWidth = $(elem).closest(".modal").width();
				}
				
				//객체가 가지고 있는 css
				var classList = elem.classList;
				$.each(classList, function(num, classNm){
					if(classNm.indexOf("osl-w-body") > -1){
						var widthPercent = classNm.substring(classNm.lastIndexOf("-")+1);
						
						if(range.indexOf(widthPercent) == -1){
							//가장 가까운 값으로 변경
							var diffVal = 0;
							$.each(range, function(idx, value){
								if(idx == 0){
									diffVal = widthPercent;
								}
								if(Math.abs(value-parseInt(widthPercent)) <= Math.abs(value-parseInt(diffVal))){
									diffVal = value;
								}
								if(Math.abs(value-parseInt(widthPercent)) == 0) {
									return false;
								}
							});
							widthPercent = diffVal;
						}
						
						//객체에 최소 너비 크기 추가
						//창 크기 기준
						elem.style.setProperty("min-width", parseInt(contentAreaWidth) * parseInt(widthPercent)/100 + "px", "important");
						//osl-w-body-fix 있으면
						if($(elem).hasClass("osl-w-body-fix")){
							elem.style.setProperty("width", elem.style.minWidth, "important");
						}
						return false;
					}
				});
			});
		}
		
		/* osl-h-body-{} 제어 */
		if($("[class*=osl-h-body]") != null){
			$.each($("[class*=osl-h-body]"), function(idx, elem){
				//현재 객체가 존재하는 창 크기(modal, page)
				if($(elem).closest(".modal").length > 0) {
					//modal이면
					contentAreaHeight = $(elem).closest(".modal").height() - parseInt($(elem).closest(".modal").find(".modal-body").css("padding")) - parseInt($(elem).closest(".modal").find(".modal-header").height()) - parseInt($(elem).closest(".modal").find(".modal-footer").height());
				}
				
				//객체가 가지고 있는 css
				var classList = elem.classList;
				$.each(classList, function(num, classNm){
					if(classNm.indexOf("osl-h-body") > -1){
						var heightPercent = classNm.substring(classNm.lastIndexOf("-")+1);
						
						if(range.indexOf(heightPercent) == -1){
							//가장 가까운 값으로 변경
							var diffVal = 0;

							$.each(range, function(idx, value){
								if(idx == 0){
									diffVal = heightPercent;
								}
								if(Math.abs(value-parseInt(heightPercent)) <= Math.abs(value-parseInt(diffVal))){
									diffVal = value;
									if(Math.abs(value-parseInt(heightPercent)) == 0) {
										return false;
									}
								}
							});
							heightPercent = diffVal;
						}
						//객체에 최소 높이 크기 추가
						//창 높이 기준
						elem.style.setProperty("min-height", parseInt(contentAreaHeight) * parseInt(heightPercent)/100 + "px", "important");
						//osl-h-body-fix 있으면
						if($(elem).hasClass("osl-h-body-fix")){
							elem.style.setProperty("height", elem.style.minHeight, "important");
						}
						return false;
					}
				});
			});
		}
	};
	
	//반응형 클래스
	var fnContentAreaResponsiveCss = function(){
		window.addEventListener('resize', function(){
			fnContentAreaCss();
		});
	};
	
	//그리드스텍, 데이터테이블, 트리, 툴팁 일괄 해제
	//targetId : 모달 아이디
	var allDestroy = function(targetId){
		var that = document.querySelector("#"+targetId);
		
		//이벤트 제거
		//레이어 팝업이 닫힐 때 이벤트 제거
		$.osl.layerCloseWindowEvt(targetId);
		//팝업 내 그리드 스택 설정 관련 정보 제거
		var gridSettingData = OSLCoreTemplateFormSetting.fnGetSettingParams();
		//깊은 복사
		var notRemoveTargetData = $.extend({}, gridSettingData);
		
		if(Object.keys(gridSettingData["settingOptionList"]["baseSettingArea"]).length > 0){
			$.each(Object.keys(gridSettingData["settingOptionList"]["baseSettingArea"]), function(s, settingArea){
				if($(that).find("#"+settingArea).length > 0){
					var tempData = gridSettingData["settingOptionList"]["baseSettingArea"][settingArea];
					
					delete notRemoveTargetData["settingOptionList"]["baseTargetClickArea"][tempData.targetClickArea];
					delete notRemoveTargetData["settingOptionList"]["baseCloseSettingBtn"][tempData.closeSettingBtn];
					
					//세팅 영역이 존재하면 세팅 관련 에디터가 존재하므로 별도 체크 안함
					delete notRemoveTargetData["settingEditor"][settingArea];

					delete notRemoveTargetData["settingOptionList"]["baseSettingArea"][settingArea];
				}
			});
			
			//다시 넣기
			OSLCoreTemplateFormSetting.fnSettingParams(notRemoveTargetData["settingOptionList"], notRemoveTargetData["settingEditor"]);
		}
		//팝업 내 그리드 스택 정보 해제
		var layerInGridStackList = $(that).find(".grid-stack");
		$.each(layerInGridStackList, function(idx, grid){
			$.each($.osl.templateForm.gridStack.list, function(key, data){
				if($(grid).attr("id") == key){
					data.destroy();
					delete $.osl.templateForm.gridStack.list[key];
				}
			});
		});
		//팝업 내 데이터테이블 정보 해제
		var layerInDatatableList = $(that).find(".osl-datatable");
		$.each(layerInDatatableList, function(idx, table){
			$.each($.osl.datatable.list, function(key, data){
				if($(table).attr("id") == key){
					data.targetDt.destroy();
					delete $.osl.datatable.list[key];
				}
			});
		});
		//팝업 내 트리 정보 해제
		var layerInTreeList = $(that).find(".jstree");
		$.each(layerInTreeList, function(idx, tree){
			$.each($.osl.tree.list, function(key, data){
				if($(tree).attr("id") == key){
					$(tree).jstree("destroy");
					delete $.osl.datatable.list[key];
				}
			});
		});
		
		
		//팝업 내 툴팁 제거
		/*
		 * 20230302 tpl1100 닫힐 때 오류로 임시 주석 TODO
		var tooltipTriggerList = [].slice.call(that.querySelectorAll('[data-bs-toggle="tooltip"],[data-osl-toggle="tooltip"]'));
		var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
			//툴팁 정보 있는지 확인
			var tp =  bootstrap.Tooltip.getInstance(tooltipTriggerEl);
			if(tp != null){
				//툴팁정보가 있으면 파괴
				tp.dispose();
				tooltipTriggerEl.removeAttribute("data-kt-initialized");
			}
		});
		*/
	};//일괄 해제
	
	/*
	 * function 명 : fnSliderCreate
	 * function 설명 : 슬라이더 생성
	 * param selector : 선택자
	 * param option : 옵션
	 * 
	 * 참고 : https://refreshless.com/nouislider/
	 */
	var fnSliderCreate = function(selector, option){
		//슬라이더 생성 시 default 옵션  - single
		var defaultConfig = {
			start: [100], //슬라이더 핸들이 최초 위치할 값
			step: 1,
			orientation: 'horizontal', //수직으로 해야할 경우 : 'vertical'
			direction: 'ltr',//오른쪽으로 갈 수록 작아질 때 :'rtl'
			connect: 'lower', //왼쪽 영역을 색칠, 간격으로 진행되는 경우 true인 구간이 색칠
			range: { //비선형 range를 원할 경우, "10%": 20, "30%":50, "50%":80 이런 식으로 사이 값 추가
				min: 0
				,max: 100
			},
			tooltips:[true], //해당 슬라이더 핸들에 툴팁 표출 여부
			format:{
				to: function (value) {
					//소수점 없이, 3자리마다 , 표출(default 100까지여서 나오지는 않는다.)
					return Number(value.toFixed(0)).toLocaleString("ko-KR");
				},
				from: function (value) {
					//, 제거
					return Number(value.replace(/,/gi, ""));
				}
			}
		};
		
		//지정된 selector가 없는 경우
		if($.osl.isNull(selector)){
			selector = "div[data-osl-slider='true']";
		}
		//옵션 합치기
		if($.osl.isNull(option)){
			option = {};
		}
		var targetConfig = $.extend({}, defaultConfig, option);
		
		var targetElems =[].slice.call( document.querySelectorAll(selector));
		var targetElem = targetElems.map(function (targetItem){
			
			//존재하면 생성하지 않음
			if(!$.osl.isNull(targetItem.noUiSlider)){
				return;
			}
			
			noUiSlider.create(targetItem, targetConfig);
			
			//툴팁 병합 이벤트
			fnSliderMergeTooltips(targetItem);
		});
	};// end fnSliderCreate
	
	/*
	 * function 명 : fnSliderMergeTooltips
	 * function 설명 : 슬라이더의 툴팁 병합
	 */
	var fnSliderMergeTooltips = function(slider){
		var threshold = 15; //툴팁 병합을 위한 최소 근접성(백분율)
		var separator = ' ~ '; //툴팁 병합 시 연결 텍스트
		
		var textIsRtl = getComputedStyle(slider).direction === 'rtl';
		var isRtl = slider.noUiSlider.options.direction === 'rtl';
		var isVertical = slider.noUiSlider.options.orientation === 'vertical';
		var tooltips = slider.noUiSlider.getTooltips();
		var origins = slider.noUiSlider.getOrigins();

		// 도구 설명을 원본 요소로 이동합니다. 기본 스타일시트가 이를 처리합니다.
		tooltips.forEach(function (tooltip, index) {
			if (tooltip) {
				origins[index].appendChild(tooltip);
			}
		});
		
		//이벤트 참고 : 실행 순서
		//'start'> 'slide'> 'drag'> 'update'> 'change'> 'set'>'end'
		slider.noUiSlider.on('update', function (values, handle, unencoded, tap, positions) {
			var pools = [[]];
			var poolPositions = [[]];
			var poolValues = [[]];
			var atPool = 0;
	
			// 도구 설명이 구성된 경우 첫 번째 도구 설명을 첫 번째 풀에 할당합니다.
			if (tooltips[0]) {
				pools[0][0] = 0;
				poolPositions[0][0] = positions[0];
				poolValues[0][0] = values[0];
			}
	
			for (var i = 1; i < positions.length; i++) {
				if (!tooltips[i] || (positions[i] - positions[i - 1]) > threshold) {
					atPool++;
					pools[atPool] = [];
					poolValues[atPool] = [];
					poolPositions[atPool] = [];
				}
	
				if (tooltips[i]) {
					pools[atPool].push(i);
					poolValues[atPool].push(values[i]);
					poolPositions[atPool].push(positions[i]);
				}
			}
	
			pools.forEach(function (pool, poolIndex) {
				var handlesInPool = pool.length;
	
				for (var j = 0; j < handlesInPool; j++) {
					var handleNumber = pool[j];
	
					if (j === handlesInPool - 1) {
						var offset = 0;
	
						poolPositions[poolIndex].forEach(function (value) {
							offset += 1000 - value;
						});
	
						var direction = isVertical ? 'bottom' : 'right';
						var last = isRtl ? 0 : handlesInPool - 1;
						var lastOffset = 1000 - poolPositions[poolIndex][last];
						offset = (textIsRtl && !isVertical ? 100 : 0) + (offset / handlesInPool) - lastOffset;
	
						// 영향을 받은 핸들 위에 이 툴팁 중앙을 맞춥니다.
						tooltips[handleNumber].innerHTML = poolValues[poolIndex].join(separator);
						
						// 툴팁과 관련된 핸들에 noUi-active가 있을 때만 보이기
						var noUiHandle = $(tooltips[handleNumber]).siblings(".noUi-handle.noUi-active");
						if(!$.osl.isNull(noUiHandle)){
							tooltips[handleNumber].style.display = 'block';
						}
						//없으면 숨기기
						else{
							tooltips[handleNumber].style.display = 'none';
						}
						
						tooltips[handleNumber].style[direction] = offset + '%';
						
					} else {
						// 툴팁 숨기기
						tooltips[handleNumber].style.display = 'none';
					}
				}
			});
		});
		
		// 슬라이더 드래그가 끝나면 툴팁도 숨김 처리 하기 위해서
		slider.noUiSlider.on('end', function (values, handle, unencoded, tap, positions) {
			var pools = [[]];
			var atPool = 0;
	
			// 도구 설명이 구성된 경우 첫 번째 도구 설명을 첫 번째 풀에 할당합니다.
			if (tooltips[0]) {
				pools[0][0] = 0;
			}
	
			for (var i = 1; i < positions.length; i++) {
				if (!tooltips[i] || (positions[i] - positions[i - 1]) > threshold) {
					atPool++;
					pools[atPool] = [];
				}
	
				if (tooltips[i]) {
					pools[atPool].push(i);
				}
			}
	
			pools.forEach(function (pool, poolIndex) {
				var handlesInPool = pool.length;
				
				for (var j = 0; j < handlesInPool; j++) {
					var handleNumber = pool[j];
	
					if (j === handlesInPool - 1) {
						var offset = 0;
						
						// 툴팁과 관련된 핸들에 noUi-active가 있을 때만 보이기
						var noUiHandle = $(tooltips[handleNumber]).siblings(".noUi-handle.noUi-active");
						if(!$.osl.isNull(noUiHandle)){
							tooltips[handleNumber].style.display = 'block';
						}
						//없으면 숨기기
						else{
							tooltips[handleNumber].style.display = 'none';
						}
					} else {
						// 툴팁 숨기기
						tooltips[handleNumber].style.display = 'none';
					}
				}
			});
		});
	};
	
	//최초 설정
	var documentSetting = function(){
		
	};//최초 설정 documentSetting end
	
	return {
		observer : null,
		init : function(){
			documentSetting();
			
			//툴팁 세팅
			initTooltips();
			/*스크롤 시 툴팁 등 닫기를 위한 검사*/
			initObserver();
			
			/* css 반응형 설정 */
			fnContentAreaCss();
			fnContentAreaResponsiveCss();
		},
		initTooltips : function(){
			initTooltips();
		},
		fnUpdateTooltipTitle : function(selector, title) {
			fnUpdateTooltipTitle(selector, title);
		},
		fnUpdateTooltipTitleAll : function(selector) {
			fnUpdateTooltipTitleAll(selector);
		},
		fnCloseTooltips  : function(){
			fnCloseTooltips();
		},
		initPopovers : function(){
			initPopovers();
		},
		initObserver : function(){
			initObserver();
		},
		initSmoothScroll : function(){
			fnScrollMove();
		},
		initDrawer : function(element, size){
			initDrawer(element, size);
		},
		initTabs : function(element, callbackFn){
			initTabs(element, callbackFn);
		},
		allDestroy : function(targetId){
			allDestroy(targetId);
		},
		initSlider : function(selector, option){
			fnSliderCreate(selector, option);
		},
		
	}
}();

//바로 세팅 후 footer에서 summernote-ko-KR를 적용하기 위해
OSLApp.init();

