					<!--begin::sidebar-->
					<div id="kt_app_sidebar" class="app-sidebar flex-column" data-kt-drawer="true" data-kt-drawer-name="app-sidebar" data-kt-drawer-activate="{default: true, lg: false}" data-kt-drawer-overlay="true" data-kt-drawer-width="225px" data-kt-drawer-direction="start" data-kt-drawer-toggle="#kt_app_sidebar_mobile_toggle">
						<!--begin::Logo-->
						<div class="app-sidebar-logo px-6" id="kt_app_sidebar_logo">
							<!--begin::Logo image-->
							<a href="javascript:$.osl.goAuthGrp('${sessionScope.selPrjGrpId}', '${sessionScope.selPrjId}','${sessionScope.selAuthGrpId}');">
								<img alt="Logo" src="/media/logos/logo_S_osl.png" class="h-25px app-sidebar-logo-default" />
								<img alt="Logo" src="/media/logos/logo_collapse_osl.png" class="h-15px app-sidebar-logo-minimize "/>
							</a>
							<!--end::Logo image-->
							<!-- 좌측 메뉴 접기/펼치기 -->
							<!--begin::Sidebar toggle-->
							<div id="kt_app_sidebar_toggle" class="app-sidebar-toggle btn btn-icon btn-shadow btn-sm btn-color-muted btn-active-color-primary body-bg h-30px w-30px position-absolute top-50 start-100 translate-middle rotate" data-kt-toggle="true" data-kt-toggle-state="active" data-kt-toggle-target="body" data-kt-toggle-name="app-sidebar-minimize">
								<i class="fas fa-angle-double-left rotate-180"></i>
								<!--end::Svg Icon-->
							</div>
							<!--end::Sidebar toggle-->
							<!-- 좌측 메뉴 접기/펼치기 끝 -->
						</div>
						<!--end::Logo-->
						<!--begin::sidebar menu(메뉴 표출)-->
						<div class="app-sidebar-menu overflow-hidden flex-column-fluid">
							<!--begin::Menu wrapper-->
							<div id="kt_app_sidebar_menu_wrapper" class="app-sidebar-wrapper my-5">
								<!-- begin::메뉴 검색 영역 -->
								<!--begin::Search toggle-->
								<div class="align-items-center px-5 pb-4 osl-app-sidebar-search-icon">
									<div class="btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px w-md-40px h-md-40px">
										<!--begin::Svg Icon | path: icons/duotune/general/gen021.svg-->
										<span class="svg-icon svg-icon-1">
											<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
												<rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1" transform="rotate(45 17.0365 15.1223)" fill="currentColor" />
												<path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="currentColor" />
											</svg>
										</span>
										<!--end::Svg Icon-->
									</div>
								</div>
								<!--end::Search toggle-->	
								<div class="px-5 osl-sidebar-search-default" id="kt_aside_menu_search" data-kt-search-keypress="true" data-kt-search-min-length="2" data-kt-search-enter="enter" data-kt-search-layout="menu" data-kt-menu-trigger="auto" data-kt-menu-overflow="false" data-kt-menu-permanent="true" data-kt-menu-placement="bottom-end">
									<form data-kt-search-element="form" class="w-100 position-relative d-flex d-inline-flex align-items-center" autocomplete="off" id="menuSearchForm" name="menuSearchForm">
										<!--begin::Icon-->
										<!--begin::Svg Icon | path: icons/duotune/general/gen021.svg-->
										<span class="svg-icon svg-icon-2 svg-icon-lg-1 svg-icon-gray-500 position-absolute top-50 translate-middle-y ms-0">
											<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
												<rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1" transform="rotate(45 17.0365 15.1223)" fill="currentColor" />
												<path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="currentColor" />
											</svg>
										</span>
										<!--end::Svg Icon-->
										<!--end::Icon-->
										<!--begin::Input-->
										<input type="text" class="search-input form-control form-control-flush ps-10 py-2" id="menuSearchInput" name="menuSearchInput" value="" placeholder="메뉴 검색" data-kt-search-element="input" />
										<!--end::Input-->
										<!--begin::Spinner-->
										<span class="d-flex d-inline-flex align-items-center d-none" data-kt-search-element="spinner">
											<span class="spinner-border h-15px w-15px align-middle text-gray-400"></span>
										</span>
										<!--end::Spinner-->
										<!--begin::Reset-->
										<span class="btn btn-flush btn-active-color-primary d-flex d-inline-flex align-items-center d-none" data-kt-search-element="clear">
											<!--begin::Svg Icon | path: icons/duotune/arrows/arr061.svg-->
											<span class="svg-icon svg-icon-2 svg-icon-lg-1 me-0">
												<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
													<rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="currentColor" />
													<rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="currentColor" />
												</svg>
											</span>
											<!--end::Svg Icon-->
										</span>
										<!--end::Reset-->
										<!--begin::Favorite-->
										<span class="d-flex d-inline-flex align-items-center ms-2 cursor-pointer" id="showOnlyFvrMenu">
											<i class="fa-regular fa-star fa-lg" data-fvr-cd="02"></i>
										</span>
										<!--end::Favorite-->
									</form>
									<!--begin::Menu-->
									<div data-kt-search-element="content" class="menu menu-sub menu-sub-dropdown border border-dark w-200px w-md-225px py-3 px-3 me-5 mt-n2 overflow-hidden">
										<!--begin::Wrapper-->
										<div data-kt-search-element="wrapper">
											<!--begin::Search results-->
											<div data-kt-search-element="results" class="d-none">
												<div class="mh-185px scroll-y" id="menuSearchResult">
												
												</div>
											</div>
											<!--end::Search results-->
								
											<!--begin::Empty search-->
											<div data-kt-search-element="empty" class="text-center">
												<!--begin::Icon-->
												<div class="pt-10 pb-5">
													<!--begin::Svg Icon | path: icons/duotune/files/fil024.svg-->
													<span class="svg-icon svg-icon-4x opacity-50">
														<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
															<path opacity="0.3" d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" fill="currentColor"></path>
															<path d="M20 8L14 2V6C14 7.10457 14.8954 8 16 8H20Z" fill="currentColor"></path>
															<rect x="13.6993" y="13.6656" width="4.42828" height="1.73089" rx="0.865447" transform="rotate(45 13.6993 13.6656)" fill="currentColor"></rect>
															<path d="M15 12C15 14.2 13.2 16 11 16C8.8 16 7 14.2 7 12C7 9.8 8.8 8 11 8C13.2 8 15 9.8 15 12ZM11 9.6C9.68 9.6 8.6 10.68 8.6 12C8.6 13.32 9.68 14.4 11 14.4C12.32 14.4 13.4 13.32 13.4 12C13.4 10.68 12.32 9.6 11 9.6Z" fill="currentColor"></path>
														</svg>
													</span>
													<!--end::Svg Icon-->
												</div>
												<!--end::Icon-->
												<!--begin::Message-->
												<div class="pb-15 fw-semibold">
													<h3 class="text-gray-600 fs-5 mb-2"><span data-lang-cd="message.noData">데이터가 없습니다.</span></h3>
												</div>
												<!--end::Message-->
											</div>
											<!--end::Empty search-->
										</div>
										<!--end::Wrapper-->
									</div>
									<!--end::Menu-->
									<div class="separator pt-2 mb-2 opacity-50"></div>
								</div>
								<!-- end::메뉴 검색 영역-->
								<!--begin::Menu-->
								<div class="hover-scroll-overlay-y" id="kt_app_sidebar_menu_box" data-kt-scroll="true" data-kt-scroll-height="auto" data-kt-scroll-wrappers="#kt_app_sidebar_menu" data-kt-scroll-dependencies="#kt_aside_menu_search, #kt_app_sidebar_logo, #oslAppFooter" data-kt-scroll-save-state="true">
									<div class="menu menu-column menu-rounded menu-sub-indention pe-3 scroll-y hover-scroll-overlay-y" id="kt_app_sidebar_menu" data-kt-menu="true" data-kt-menu-expand="false">
										<!-- osl-core에서 세팅 -->
									</div>
								</div>
								<!--end::Menu-->
							</div>
							<!--end::Menu wrapper-->
						</div>
						<!--end::sidebar menu-->
					</div>
					<!--end::sidebar-->
					<!-- begin::Main(Content 영역) -->
					<div class="app-main flex-column flex-row-fluid" id="kt_app_main">
						<!--begin::Content wrapper -->
						<div class="d-flex flex-column flex-column-fluid">
							<!--begin::Content(실제 콘텐츠 영역) -->
							<div class="app-content flex-column-fluid pt-5 pb-0 osl-main-scroll " id="kt_app_content" data-kt-scroll="true" data-kt-scroll-height="auto" data-kt-scroll-wrappers="#kt_app_content_container" data-kt-scroll-dependencies="#kt_app_header, #oslAppFooter" data-kt-scroll-offset="100px">
								<!--begin::Content container-->
								<div class="app-container container-fluid" id="kt_app_content_container">
									<!--begin::Row -->
									<div class="row justify-content-center g-5 g-xl-10">
									
<script>
"use strict";
var OSLAside = function () {
	var menu;
	var menuList;
	
	var menuSearchElements;
	var searchObject;
	
	var preEvent;
	
	//현재 진입 메뉴 정보
	var selMenuInfo;
	//사용자 설정 메뉴 타입
	//01: 전체 펼치기 / 02: 단계별 펼치기
	var topMenuType;
	
	//메뉴 검색 중 여부
	var isSearchingMenu = false;

	//메뉴 이벤트 버블링 확인 변수
	var menuStopBubbling = false;
	
	var documentSetting = function(){
		//sidebar 메뉴 객체 생성
		var menuElement = document.querySelector("#kt_app_sidebar_menu");
		menu = KTMenu.getInstance(menuElement);
		
		$("#menuSearchForm #menuSearchInput").attr("placeholder", $.osl.lang("aside.placeholder.menuSearch"));
		
		//메뉴 리스트 조회
		menuList = $("#kt_app_sidebar_menu .osl-evt__aside-menu-link");
		
		// Elements
		menuSearchElements = document.querySelector("#kt_aside_menu_search");

		if (!menuSearchElements) {
			return;
		}
		
		// Initialize search handler
		searchObject = new KTSearch(menuSearchElements);
		
		// Search handler
		searchObject.on("kt.search.process", fnMenuSearch);
		
		// Clear handler
		//searchObject.on("kt.search.clear", fnMenuSearchclear);
		
		// 메뉴 검색 엔터 기능 재정의 
		fnSearchMenuEnter();
		
		//현재 진입 메뉴 정보
		selMenuInfo = $.osl.selMenuInfo;
		
		//사용자 설정 메뉴 타입
		//01: 전체 펼치기 / 02: 단계별 펼치기
		topMenuType = $.osl.user.usrOptData["OPT00001"].value;
		
		//대메뉴, 중메뉴 클릭 시
		$("#kt_app_sidebar_menu .osl-evt__menu-item-show").click(function(e){
			//클릭 이벤트 전파 방지를 위한 flag 값이 true일 경우 return
			if(menuStopBubbling){
				//상태 변경
				menuStopBubbling = false;
				return;
			}
		
			//클릭한 메뉴 레벨
			var menuLev = $(this).find(".osl-evt__aside-menu-link").data("osl-menu-lvl");
			//대메뉴인 경우
			if(menuLev == "first"){
				//검색 중이 아닐 경우(직접 메뉴 클릭 시)
				if(!isSearchingMenu){
					//메뉴 클릭시 다른 메뉴 접히는 기능 원복
					$("#kt_app_sidebar_menu").attr("data-kt-menu-expand", "false");
				}
				//메뉴 펼침 여부
				var openYN = $(this).hasClass("show");
				
				//펼친 상태인 경우
				if(openYN){
					//아이콘 접기 상태로 변경
					$(this).find(".osl-evt__aside-menu-link").addClass("collapsed");
					$(this).find(".osl-evt__2depth-menu-item").addClass("collapsed");
					$(this).find(".osl-evt__menu-item-show").removeClass("here active");
				}
				//접힌 상태인 경우
				else {
					//사용자 메뉴 설정 타입이 전체 펼치기인 경우
					if(topMenuType == "01"){
						//클릭한 대메뉴의 중메뉴 펼치기
						$(this).find(".osl-evt__menu-item-show .osl-evt__aside-3depth-menu-link").slideDown();
						//클릭한 대메뉴 하위의 중메뉴 아이콘 펼치기
						$(this).find(".osl-evt__2depth-menu-item").removeClass("collapsed");
						$(this).find(".osl-evt__menu-item-show").addClass("show");
					}//사용자 메뉴 설정 타입이 전체 펼치기인 경우 end
					
					//검색 중이 아닐 경우(직접 메뉴 클릭 시)
					if(!isSearchingMenu){
						//전체 메뉴 active 해제
						$("#kt_app_sidebar_menu .osl-evt__menu-item-show.show").removeClass("here");
						$("#kt_app_sidebar_menu .osl-evt__aside-menu-link").removeClass("hover active");
						
						//펼쳐진 메뉴 아이콘 접기
						var targetMenu = $(this).find(".osl-evt__aside-menu-link");
						$("#kt_app_sidebar_menu .osl-evt__aside-menu-link[data-osl-menu-lvl='first']:not(.collapsed)").not(targetMenu).addClass("collapsed");
					}//검색 중이 아닐 경우(직접 메뉴 클릭 시) end
				}//접힌 상태인 경우 end
				
			}//대메뉴인 경우
			//중메뉴이고 사용자 메뉴 설정 타입이 전체 펼치기인 경우
			else if(menuLev == "second" && topMenuType == "01"){
				//클릭 이벤트 전파 방지를 위한 flag
				menuStopBubbling = true;
				//메뉴 클릭시 다른 메뉴 접히는 기능 방지
				$("#kt_app_sidebar_menu").attr("data-kt-menu-expand", "true");
			}//중메뉴이고 사용자 메뉴 설정 타입이 전체 펼치기인 경우
		});//대메뉴, 중메뉴 클릭 시 end

		//검색어 삭제 버튼 클릭 이벤트
		$('span[data-kt-search-element="clear"]').click(function(){
			fnMenuSearchclear();
		});//검색어 삭제 버튼 클릭 이벤트 end
		
		//즐겨찾기 메뉴만 보기 활성화일 경우 즐겨찾기 메뉴 세팅
		var fvrCd = sessionStorage.getItem('showOnlyFvrMenuYN');
		if(!$.osl.isNull(fvrCd) && fvrCd == "01"){
			var fvrOnlyBtn = $("#kt_app_sidebar #showOnlyFvrMenu i");
			$(fvrOnlyBtn).attr("data-fvr-cd", "01");
			$(fvrOnlyBtn).addClass("fa-solid");
			$(fvrOnlyBtn).removeClass("fa-regular");
			
			//즐겨찾기 메뉴만 표출
			setOnlyFvrMenu();
		}//즐겨찾기 메뉴만 보기 활성화일 경우 즐겨찾기 메뉴 세팅 end
		
		//즐겨찾기만 보기 버튼 클릭 이벤트
		$("#kt_app_sidebar #showOnlyFvrMenu").off("click").on("click", function(e){
			//즐겨찾기 버튼
			var fvrBtn = $(e.target);
			
			//즐겨찾기 버튼 상태 변경
			fnSetFvrBtn(fvrBtn);
			
			//세션에 즐겨찾기 활성화 여부 저장
			fvrCd = $(fvrBtn).attr("data-fvr-cd");
			sessionStorage.setItem('showOnlyFvrMenuYN', fvrCd);
			
			//즐겨찾기 메뉴 세팅
			setOnlyFvrMenu();
		});//즐겨찾기 버튼 클릭 이벤트 end
		
		//메뉴별 즐겨찾기 버튼 클릭 이벤트
		$("#kt_app_sidebar [name=fvrMenuBtn]").on("click", function(e){
			//링크 이동 제어
			e.preventDefault();
			//이벤트 버블링 제어
			e.stopPropagation();
			
			//즐겨찾기 버튼
			var fvrBtn = $(e.target);
			//즐겨찾기 활성화 여부
			var fvrCd = $(e.target).attr("data-fvr-cd");
			//클릭한 메뉴 id
			var menuId = $(fvrBtn).closest(".osl-evt__3depth-menu-item").find(".osl-evt__aside-menu-link").attr("id");
			
			//즐겨찾기 활성화 상태인 경우
			if(fvrCd == "01"){
				//즐겨찾기 정보 삭제
				var data = {
						fvrType: "01"
						,fvrData1: menuId
				};
				//AJAX 설정
				var ajaxObj = new $.osl.ajaxRequestAction(
						{"url":"/stm/stm2000/stm2000/deleteStm2002FavoriteInfo.do", "async" : false}
						,data);
				//AJAX 전송 성공 함수
				ajaxObj.setFnSuccess(function(data){
					//실패 시
					if(data.errorYn == "Y"){
						$.osl.alert(data.message,{type: 'error'});
					}
					//성공 시
					else{
						//즐겨찾기 버튼 상태 변경
						fnSetFvrBtn(fvrBtn);
						
						//즐겨찾기 메뉴 세팅
						setOnlyFvrMenu();
					}
				});//AJAX 전송 성공 함수 end
				
				//AJAX 전송
				ajaxObj.send();
			}
			//즐겨찾기 비활성화 상태인 경우
			else {
				//즐겨찾기 정보 추가
				var data = {
						fvrType: "01"
						,fvrData1: menuId
				};
				//AJAX 설정
				var ajaxObj = new $.osl.ajaxRequestAction(
						{"url":"/stm/stm2000/stm2000/insertStm2002FavoriteInfo.do", "async" : false}
						,data);
				
				//AJAX 전송 성공 함수
				ajaxObj.setFnSuccess(function(data){
					//실패 시
					if(data.errorYn == "Y"){
						$.osl.alert(data.message,{type: 'error'});
					}
					//성공 시
					else{
						//즐겨찾기 버튼 상태 변경
						fnSetFvrBtn(fvrBtn);
					}
				});//AJAX 전송 성공 함수 end
				
				//AJAX 전송
				ajaxObj.send();
			}//즐겨찾기 비활성화 상태인 경우 end
		});//메뉴별 즐겨찾기 버튼 클릭 이벤트 end
	};//documentSetting end
	
	/*********************************
		begin:: 함수 정의 시작
	*********************************/
	
	/**
	* function 명 : fnMenuSearch
	* function 설명 : 메뉴 검색 기능
	**/
	var fnMenuSearch = function(search){
	
		// 검색 단어 정보
		var searchValStr = $("#menuSearchInput").val();
		if(!$.osl.isNull(searchValStr)){
			searchValStr = searchValStr.replaceAll(" ","");
		}
		
		//기존 검색으로 인한 메뉴 표출 스타일 초기화
		$.each($(".osl-evt__search-active-title"), function(idx, elem){
			// 메뉴명 정보 - 바로 상위 osl-evt__aside-menu-link
			var menuTitleTarget = $(elem).parent();
			var oriTitle = menuTitleTarget.data("ori-title");
			//해당 정보로 다시 원복
			$(elem).html(oriTitle);
		});
		
		// 검색 결과 div 초기화
		$("#menuSearchResult").empty();
		
		// 메뉴 리스트에서 검색 단어가 있는 메뉴만 검색 결과에 넣기(단 클릭이 가능한 3depth만)
		$.each(menuList, function(idx, item){
			// 메뉴명 정보
			var searchItem = $(item).find(".osl-evt__aside-menu-title").text().replaceAll(" ","");
			var searchItemId = $(item).attr("id");
			
			// 메뉴가 있고, 검색 결과와 일치하는 메뉴명이 있을 경우,
			if (!$.osl.isNull(searchItem) && searchItem.indexOf(searchValStr) >= 0){
				//3depth만 보이게 하기 위해서
				var viewClass = "";
				if($(item).data("osl-menu-lvl") != "third"){
					viewClass = "d-none";
				}
				
				var resultStr = '<div class="d-flex align-items-center p-2 rounded-3 border-hover text-hover-primary border border-dashed border-gray-300 cursor-pointer mb-1 '+viewClass+'" name="searchMenuItem" id="'+ searchItemId +'">'
											+'<div>'
												+ searchItem.replace(searchValStr,"<span class='text-primary fw-bold'>" + $.osl.escapeHtml(searchValStr) + "</span>") 
											+'</div>'
										+'</div>';
				
				// 메뉴 결과 영역에 넣기
				$("#menuSearchResult").append(resultStr);
			}
		});
		
		// 메뉴 결과영역에 생성된 결과가 있는지 확인
		var resultItemList = $("#menuSearchResult").find("[name=searchMenuItem]");
		
		// 메뉴 결과 영역에 생성된 결과가 있을 경우,
		if(resultItemList.length > 0){
			// 결과 영역 표출
			$('div[data-kt-search-element="results"]').removeClass("d-none");
			$('div[data-kt-search-element="empty"]').addClass("d-none");
			
			// 검색 결과의 메뉴 클릭 이벤트
			$("[name=searchMenuItem]").on("click",function(){
				//전파방지
				event.stopPropagation();
				
				// 메뉴 검색 엔터로 메뉴 클릭 이벤트 실행하지 않을 경우(=메뉴 결과 개별 클릭했을 경우)
				if(event.key != 'Enter'){
					// 3depth메뉴 선택 Class 초기화
					$("#kt_app_sidebar_menu a.osl-evt__aside-menu-link").parent().removeClass("hover");
					
					// 이전에 메뉴 검색 엔터로 하위 메뉴 여러개 열었을 경우,
					if(preEvent == 'Enter'){
						//모든 메뉴 일단 접기(초기화)
						var menuItemList = $("#kt_app_sidebar_menu .menu-item");
						
						$.each(menuItemList, function(idx, item){
							menu.hide(item);
						});
					}
				}
				
				//이전 이벤트 정보에 등록
				preEvent = event.key;
				
				//메뉴 검색 결과에서 선택한 메뉴ID
				var selMenuId = $(this).attr("id");
				
				//메뉴 리스트에서 일치하는 메뉴 정보
				var targetMenuLink = $(".osl-evt__aside-menu-link[id="+selMenuId+"]");
				var targetMenuItem = targetMenuLink.parent();
				
				//해당 메뉴가 3depth인지 확인
				var is3depth = targetMenuLink.is("a");
				
				//다건 검색이 아니라, 메뉴 1건 클릭 이벤트면서 3depth 메뉴라면 해당 메뉴로 이동
				if(is3depth && event.key != 'Enter'){
					targetMenuLink[0].click();
					return;
				}
				
				//해당 메뉴의 상위 메뉴 리스트
				var targetParentsMenuList = menu.getItemParentElements(targetMenuItem);
				
				// 상위 메뉴 리스트 안 열려 있으면 클릭
				$.each(targetParentsMenuList, function(idx, item){
					//상위 메뉴 리스트가(menu-itme)이면,
					if(!$.osl.isNull(item) && $(item).hasClass("menu-item")){
						// 상위 메뉴가 이미 열려있는지 확인
						var isShow = menu.isItemSubShown(item[0]);
						// 열려있지 않다면,
						if(!isShow){
							//상위 메뉴 열기
							$(item).children(".osl-evt__aside-menu-link").click();
						}
					}
				});
				
				//3depth라면 해당 메뉴 CSS만 선택 표시
				targetMenuLink.parent().addClass("hover");

				//검색된 첫번째 메뉴로 스크롤 이동
				targetMenuLink[0].scrollIntoView({behavior:'smooth'});
			});
		}
		// 메뉴 결과 영역에 생성된 결과 없을 경우,
		else{
			// 검색 결과 div 초기화
			$("#menuSearchResult").empty();
			
			// 결과 없음 표출
			$('div[data-kt-search-element="results"]').addClass("d-none");
			$('div[data-kt-search-element="empty"]').removeClass("d-none");
		}
		
		$('div[data-kt-search-element="content"]').removeClass("d-none");
		
		// Complete search
		search.complete();
	};
		
	/**
	* function 명 : fnMenuSearchclear
	* function 설명 : 메뉴 검색 창 닫기
	**/
	var fnMenuSearchclear = function(){
		// Hide results
		$('div[data-kt-search-element="content"]').addClass("d-none");
		
		//검색이 모두 초기화 되었으므로 기존에 검색으로 인해 타이틀 명이 변경된 것이 있으면 원복
		//기존 검색으로 인한 메뉴 표출 스타일 초기화
		$.each($(".osl-evt__search-active-title"), function(idx, elem){
			// 메뉴명 정보 - 바로 상위 osl-evt__aside-menu-link
			var menuTitleTarget = $(elem).parent();
			var oriTitle = menuTitleTarget.data("ori-title");
			//해당 정보로 다시 원복
			$(elem).html(oriTitle);
			
			//상위 메뉴 선택 효과 초기화
			$(elem).parents(".menu-item").find(".osl-evt__aside-menu-link.active").click();
			$(elem).parents(".menu-item").find("[data-osl-menu-lvl='first'].active").click();
			$(elem).parents(".osl-evt__menu-item-show").removeClass("show here hover");
		});
		
		//현재 진입 메뉴 펼치기
		$("#menuLvl3_"+selMenuInfo.upperMenuId).parents(".osl-evt__menu-item-show").addClass("show here");
		$("#"+selMenuInfo.menuId+".osl-evt__aside-menu-link").addClass("active");
		
		//사용자 메뉴 설정이 전체 펼치기인 경우
		if(topMenuType == "01"){
			//현재 진입한 대메뉴
			var selOneLvlMenu = $("#"+selMenuInfo.twoUpperMenuId);
			//클릭한 대메뉴의 중메뉴 펼치기
			$(selOneLvlMenu).closest(".osl-evt__menu-item-show").find(".osl-evt__aside-3depth-menu-link").slideDown();
			
			//클릭한 대메뉴 하위의 중메뉴 아이콘 펼치기
			$(selOneLvlMenu).closest(".osl-evt__menu-item-show").find(".osl-evt__menu-item-show:not(.here.show)").addClass("here show");
		}//사용자 메뉴 설정이 전체 펼치기인 경우 end
	}//fnMenuSearchclear end
	
	/**
	* function 명 : fnSearchMenuEnter
	* function 설명 : 메뉴 검색 엔터 기능
	**/
	var fnSearchMenuEnter = function(){
		// Select input field
		var inputField = $("#menuSearchInput");
		
		// Handle keyboard press event
		$(inputField).on("keydown", function(e){
			// Only apply action to Enter key press
			if(e.key === "Enter"){
				e.preventDefault();

				//메뉴 접기 및 메뉴 선택 효과 초기화 
				$("#kt_app_sidebar_menu .osl-evt__aside-menu-link.active").addClass("collapsed");
				$("#kt_app_sidebar_menu .osl-evt__aside-menu-link").removeClass("active");
				$("#kt_app_sidebar_menu .show").removeClass("show");
				$("#kt_app_sidebar_menu .hover").removeClass("hover");

				//현재 메뉴에는 선택 처리
				$("#"+selMenuInfo.twoUpperMenuId+".osl-evt__aside-menu-link").addClass("active");
				$("#"+selMenuInfo.menuId+".osl-evt__aside-menu-link").addClass("active");
				
				// 메뉴 검색 결과 리스트
				var resultMenuList = $("#menuSearchResult").find("[name=searchMenuItem]");
				
				var inputFieldtxt = inputField.val().trim();
				
				//검색어 없을 경우
				if($.osl.isNull(inputFieldtxt)){
					
					//영역 초기화
					$.osl.initHeaderClear();
					//헤더 다시 불러오기
					$.osl.initHeader();
					
					//메뉴 검색 입력창 초기화
					inputField.val("");
				}
				//검색어 있을 경우
				else{
					//메뉴 검색중 상태로 변경
					isSearchingMenu = true;
					
					//메뉴 클릭시 다른 메뉴 접히는 기능 방지
					menu.element.setAttribute('data-kt-menu-expand', 'true');
					
					// 메뉴 검색 결과 메뉴에 적용
					$.each(resultMenuList, function(idx, item){

						var menuId = item.id;
						var target = $("#"+menuId+".osl-evt__aside-menu-link");
						var menuLvl = target.data("osl-menu-lvl");
						
						if(menuLvl == "first"){
							if(!target.hasClass("active")){
								target.click();
							}
						}
						else if(menuLvl == "second"){
							var firstMenu = target.closest(".osl-evt__aside-2depth-menu-link").siblings("[data-osl-menu-lvl='first']");
							if(!firstMenu.hasClass("active")){
								firstMenu.click();
							}
							if(!target.parent().hasClass("show")){
								target.click();
							}
						}
						else if(menuLvl == "third"){
							var firstMenu =  target.closest(".osl-evt__aside-2depth-menu-link").siblings("[data-osl-menu-lvl='first']");
							if(!firstMenu.hasClass("active")){
								firstMenu.click();
							}
							var secondMenu = target.closest(".osl-evt__aside-3depth-menu-link").siblings("[data-osl-menu-lvl='second']");
							if(!secondMenu.parent().hasClass("show")){
								secondMenu.click();
							}
						}
						
						//강조
						// 메뉴명 정보
						var menuTitleTarget = target.find(".osl-evt__aside-menu-title");
						var menuTitle = menuTitleTarget.text();
						
						// 검색 단어 정보
						var searchValStr = $("#menuSearchInput").val().replaceAll(" ","");
						
						menuTitleTarget.html(
							'<div class="osl-evt__search-active-title">'+ fnSearchHighlightWord(menuTitle, searchValStr) +'</div>'
						);
					});
					
					//메뉴 클릭시 다른 메뉴 접히는 기능 원복
					menu.element.setAttribute('data-kt-menu-expand', 'false');
					
					//메뉴 검색중 상태 변경
					isSearchingMenu = false;
				}//검색어 있을 경우 end
			}//엔터키 입력 시 end

		});//메뉴 검색 영역 키 입력 이벤트 end
	};//fnSearchMenuEnter end
	
	var fnSearchHighlightWord = function (targetText, searchWord) {
		// 검색 단어의 정규 표현식 버전을 생성. 공백 포함
		var searchRegex = new RegExp(searchWord.split('').join('\\s*'), 'gi');
		
		// 타겟 텍스트에서 검색 단어를 찾아 <span> 태그로 감싸 강조
		return targetText.replace(searchRegex, function(match) {
				return "<span class='text-primary fw-bold'>"+$.osl.escapeHtml(match)+"</span>";
		});
	};
	
	/**
	* function 명 : fnSetFvrBtn
	* function 설명 : 즐겨찾기 버튼 상태 변경
	* @param fvrBtn : 상태 변경할 즐겨찾기 버튼
	**/
	var fnSetFvrBtn = function(fvrBtn){
		//즐겨찾기 활성화 여부
		var fvrCd = $(fvrBtn).attr("data-fvr-cd");
		
		//즐겨찾기 활성화 상태인 경우
		if(fvrCd == "01"){
			//비활성화 처리
			$(fvrBtn).addClass("fa-regular");
			$(fvrBtn).removeClass("fa-solid");
			$(fvrBtn).attr("data-fvr-cd", "02");
		}
		//즐겨찾기 비활성화 상태인 경우
		else {
			//활성화 처리
			$(fvrBtn).addClass("fa-solid");
			$(fvrBtn).removeClass("fa-regular");
			$(fvrBtn).attr("data-fvr-cd", "01");
		}//즐겨찾기 비활성화 상태인 경우 end
	}//fnSetFvrBtn end
	
	/**
	* function 명 : setOnlyFvrMenu
	* function 설명 : 즐겨찾기 메뉴 세팅
	**/
	var setOnlyFvrMenu = function(){
		//즐겨찾기 활성화 여부
		var fvrCd = $("#kt_app_sidebar #showOnlyFvrMenu i").attr("data-fvr-cd");
		
		//즐겨찾기 활성화 상태인 경우
		if(fvrCd == "01"){
			//즐겨찾기 비활성화 메뉴 숨기기
			var hideMenu = $("#kt_app_sidebar .osl-evt__3depth-menu-item [name='fvrMenuBtn'] [data-fvr-cd='02']").closest(".osl-evt__3depth-menu-item");
			//즐겨찾기 비활성화 메뉴 숨김 처리
			$(hideMenu).addClass("d-none");
			
			//즐겨찾기 활성화된 3dep 메뉴 없을 경우 2dep 메뉴 숨김 처리
			var threeDepMenu = $("#kt_app_sidebar .osl-evt__aside-3depth-menu-link");
			$.each(threeDepMenu, function(idx, map){
				var threeDepLen = $(map).find("[name='fvrMenuBtn']").children("[data-fvr-cd='01']").length;
				if(threeDepLen == 0){
					$(map).closest(".osl-evt__menu-item-show").addClass("d-none");
				}
			})//즐겨찾기 활성화된 3dep 메뉴 없을 경우 2dep 메뉴 숨김 처리 end
			
			//즐겨찾기 활성화된 3dep 메뉴 없을 경우 1dep 메뉴 숨김 처리
			var twoDepMenu = $("#kt_app_sidebar .osl-evt__aside-2depth-menu-link");
			$.each(twoDepMenu, function(idx, map){
				//
				var twoDepLen = $(map).find("[name='fvrMenuBtn']").children("[data-fvr-cd='01']").length;
				if(twoDepLen == 0){
					$(map).siblings(".osl-evt__aside-menu-link").addClass("d-none");
				}
			})//즐겨찾기 활성화된 3dep 메뉴 없을 경우 1dep 메뉴 숨김 처리 end
		}
		//즐겨찾기 비활성화 상태인 경우
		else {
			//전체 메뉴 표출
			$("#kt_app_sidebar .osl-evt__3depth-menu-item [name=fvrMenuBtn] [data-fvr-cd='02']").closest(".osl-evt__3depth-menu-item").removeClass("d-none");
			$("#kt_app_sidebar .osl-evt__menu-item-show.d-none").removeClass("d-none");
			$("#kt_app_sidebar .osl-evt__aside-menu-link.d-none").removeClass("d-none");
		}//즐겨찾기 비활성화 상태인 경우 end
	}//setOnlyFvrMenu end
	
	/*********************************
		end:: 함수 정의 끝
	*********************************/
	
	return {
		// public functions
		init: function() {
			documentSetting();
		}
	};
}();

$.osl.ready(function(){
	OSLAside.init();
});
</script>	
