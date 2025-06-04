	</head>
	<!-- end::Head -->
	
	<!-- begin::Body -->
	<body class="app-default" id="kt_app_body" 
	data-kt-app-layout="dark-sidebar"
	data-kt-app-header-fixed="true" data-kt-app-sidebar-enabled="true" data-kt-app-sidebar-fixed="true" data-kt-app-sidebar-hoverable="true"
	data-kt-app-sidebar-push-header="true"	data-kt-app-sidebar-push-toolbar="true" data-kt-app-sidebar-push-footer="true" data-kt-app-toolbar-enabled="true" >
		<form name="hideAuthForm" method="post">
			<input type="hidden" name="url">
			<input type="hidden" name="prjId">
			<input type="hidden" name="authGrpId">
		</form>
		<form name="hideMoveForm" method="post">
			<input type="hidden" name="menuUrl">
			<input type="hidden" name="menuId">
			<input type="hidden" name="menuNm">
			<input type="hidden" name="prjGrpId">
			<input type="hidden" name="prjId">
			<input type="hidden" name="authGrpId">
			<input type="hidden" name="moveType">
		</form>
		<input type="hidden" name="selMenuId" id="selMenuId" value="${sessionScope.selMenuId}">
		<!-- begin:: App -->
		<div class="d-flex flex-column flex-root app-root" id="kt_app_root">
			<!--begin::Page-->
			<div class="app-page flex-column flex-column-fluid" id="kt_app_page">
				<!--begin::Header-->
				<div class="app-header" id="kt_app_header">
					<!--begin::Header container-->
					<div class="app-container container-fluid d-flex align-items-stretch justify-content-between" id="kt_app_header_container">
						<!--begin::sidebar mobile toggle-->
						<div class="d-flex align-items-center d-lg-none ms-n2 me-2" title="Show menu">
							<div class="btn btn-icon btn-active-color-primary w-35px h-35px" id="kt_app_sidebar_mobile_toggle">
								<!--begin::Svg Icon | path: icons/duotune/abstract/abs015.svg-->
								<span class="svg-icon svg-icon-1">
									<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M21 7H3C2.4 7 2 6.6 2 6V4C2 3.4 2.4 3 3 3H21C21.6 3 22 3.4 22 4V6C22 6.6 21.6 7 21 7Z" fill="currentColor" />
										<path opacity="0.3" d="M21 14H3C2.4 14 2 13.6 2 13V11C2 10.4 2.4 10 3 10H21C21.6 10 22 10.4 22 11V13C22 13.6 21.6 14 21 14ZM22 20V18C22 17.4 21.6 17 21 17H3C2.4 17 2 17.4 2 18V20C2 20.6 2.4 21 3 21H21C21.6 21 22 20.6 22 20Z" fill="currentColor" />
									</svg>
								</span>
								<!--end::Svg Icon-->
							</div>
						</div>
						<!--end::sidebar mobile toggle-->
						<!--begin::Header wrapper-->
						<div class="d-flex align-items-stretch justify-content-between flex-lg-grow-1" id="kt_app_header_wrapper">
							<!--begin::Menu wrapper-->
							<div class="app-header-menu app-header-mobile-drawer align-items-stretch" 
							data-kt-drawer="true" data-kt-drawer-name="app-header-menu" data-kt-drawer-activate="{default: true, lg: false}" 
							data-kt-drawer-overlay="true" data-kt-drawer-width="225px" data-kt-drawer-direction="end" data-kt-drawer-toggle="#kt_app_header_menu_toggle" 
							data-kt-swapper="true" data-kt-swapper-mode="{default: 'append', lg: 'prepend'}" data-kt-swapper-parent="{default: '#kt_app_body', lg: '#kt_app_header_wrapper'}">
								<!--begin::Top Menu-->
								<div class="menu menu-rounded menu-column menu-lg-row my-5 my-lg-0 align-items-stretch fw-semibold px-2 px-lg-0" id="kt_app_header_menu" data-kt-menu="true">
									<!--begin::Menu item-->
									<div class="menu-item here show menu-lg-down-accordion menu-here-bg me-0 me-lg-2">
										<!--begin::Page title-->
										<div class="page-title d-flex flex-column justify-content-center flex-wrap me-3">
											<!--begin::Title-->
											<h1 class="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0" title="<c:out value="${sessionScope.selMenuNm}"/>" alt="<c:out value="${sessionScope.selMenuNm}"/>"><c:out value="${sessionScope.selMenuNm}"/></h1>
											<!--end::Title-->
											<!--begin::Menu-->
											<div class="menu menu-column" data-kt-menu="true">
												<!--begin::Menu item-->
    											<div class="menu-item menu-accordion" data-kt-menu-trigger="hover" data-kt-menu-placement="top-start">
													<!--begin::Breadcrumb-->
													<ul class="menu-link breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 py-1 px-0">
														<!-- 메뉴 경로 표출 -->
														<!--begin::Item-->
														<li class="breadcrumb-item text-muted" title="<c:out value="${sessionScope.strUpupMenuNm}"/>" alt="<c:out value="${sessionScope.strUpupMenuNm}"/>"><c:out value="${sessionScope.strUpupMenuNm}"/></li>
														<li class="breadcrumb-item"><span class="bullet bg-gray-400 w-5px h-2px"></span></li>
														<li class="breadcrumb-item text-muted" title="<c:out value="${sessionScope.strUpMenuNm}"/>" alt="<c:out value="${sessionScope.strUpMenuNm}"/>"><c:out value="${sessionScope.strUpMenuNm}"/></li>
														<li class="breadcrumb-item"><span class="bullet bg-gray-400 w-5px h-2px"></span></li>
														<li class="breadcrumb-item text-muted" title="<c:out value="${sessionScope.selMenuNm}"/>" alt="<c:out value="${sessionScope.selMenuNm}"/>"><c:out value="${sessionScope.selMenuNm}"/></li>
														<!--end::Item-->
													</ul>
													<!--end::Breadcrumb-->
													<!--begin::Menu sub-->
		       										<div class="menu-sub menu-sub-dropdown" id="oslRctMenuList">
		       										</div>
		       										<!--end::Menu sub-->
												</div>
												<!--end::Menu item-->
											</div>
											<!--end::Menu-->
										</div>
										<!--end::Page title-->
										<%--
										<!--begin::Menu link (1depth) -->
										<span class="menu-link">
											<span class="menu-title">1Depth 명</span>
											<span class="menu-arrow d-lg-none"></span>
										</span>
										<!--end::Menu link (1depth)-->
										<!--begin::Menu sub-->
										<div class="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown p-0 w-100 w-lg-850px">
											<!--begin::sub menu (2depth)-->
											<div class="menu-state-bg menu-extended" data-kt-menu-dismiss="true">
												<div class="row">
													<!--begin::2Depth 하위 메뉴 반복 영역 -->
													<div class="col-lg-6 mb-3">
														<!--begin:Heading-->
														<h4 class="fs-6 fs-lg-4 text-gray-800 fw-bold mt-3 mb-3 ms-4">2Depth 명</h4>
														<!--end:Heading-->
														<!--begin::3Depth 하위 메뉴 반복 영역 -->
														<!--begin:Menu item-->
														<div class="menu-item p-0 m-0">
															<!--begin:Menu link-->
															<span class="menu-link">
																<span class="menu-bullet">
																	<span class="bullet bullet-dot bg-gray-300i h-6px w-6px"></span>
																</span>
																<span class="menu-title">3Depth 명</span>
															</span>
															<!--end:Menu link-->
														</div>
														<!--end:Menu item-->
														<!--end::3Depth 하위 메뉴 반복 영역 -->
													</div>
													<!--end::2Depth 하위 메뉴 반복 영역 -->
												</div>
											</div>
											<!--begin::sub menu (2depth)-->
										</div>
										<!--end::Menu sub-->
										 --%>
									</div>
									<!--end::Menu item-->
								</div>
								<!--end::Top Menu-->
							</div>
							<!--end::Menu wrapper-->
							<!--begin::Navbar-->
							<div class="app-navbar flex-shrink-0">
								<div class="app-navbar-item align-items-stretch ms-1 ms-lg-3">
									<%--
									<!--begin::Search(통합 검색 넣기)-->
									<div class="header-search d-flex align-items-stretch" id="kt_header_search" data-kt-search-keypress="true" data-kt-search-min-length="2" data-kt-search-enter="enter" data-kt-search-layout="menu" data-kt-menu-trigger="auto" data-kt-menu-overflow="false" data-kt-menu-permanent="true" data-kt-menu-placement="bottom-end">
										<!--begin::Search toggle-->
										<div class="d-flex align-items-center" data-kt-search-element="toggle" id="kt_header_search_toggle">
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
										<!--begin::Menu-->
										<div data-kt-search-element="content" class="menu menu-sub menu-sub-dropdown p-7 w-325px w-md-375px">
											<!--begin::Wrapper-->
											<div data-kt-search-element="wrapper">
												<!--begin::Form-->
												<form data-kt-search-element="form" class="w-100 position-relative mb-3" autocomplete="off">
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
													<input type="text" class="search-input form-control form-control-flush ps-10" name="search" value="" placeholder="Search..." data-kt-search-element="input" />
													<!--end::Input-->
													<!--begin::Spinner-->
													<span class="position-absolute top-50 end-0 translate-middle-y lh-0 d-none me-1" data-kt-search-element="spinner">
														<span class="spinner-border h-15px w-15px align-middle text-gray-400"></span>
													</span>
													<!--end::Spinner-->
													<!--begin::Reset-->
													<span class="btn btn-flush btn-active-color-primary position-absolute top-50 end-0 translate-middle-y lh-0 d-none" data-kt-search-element="clear">
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
													<!--begin::Toolbar-->
													<div class="position-absolute top-50 end-0 translate-middle-y" data-kt-search-element="toolbar">
														<!--begin::Preferences toggle-->
														<div data-kt-search-element="preferences-show" class="btn btn-icon w-20px btn-sm btn-active-color-primary me-1" data-bs-toggle="tooltip" title="Show search preferences">
															<!--begin::Svg Icon | path: icons/duotune/coding/cod001.svg-->
															<span class="svg-icon svg-icon-1">
																<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																	<path opacity="0.3" d="M22.1 11.5V12.6C22.1 13.2 21.7 13.6 21.2 13.7L19.9 13.9C19.7 14.7 19.4 15.5 18.9 16.2L19.7 17.2999C20 17.6999 20 18.3999 19.6 18.7999L18.8 19.6C18.4 20 17.8 20 17.3 19.7L16.2 18.9C15.5 19.3 14.7 19.7 13.9 19.9L13.7 21.2C13.6 21.7 13.1 22.1 12.6 22.1H11.5C10.9 22.1 10.5 21.7 10.4 21.2L10.2 19.9C9.4 19.7 8.6 19.4 7.9 18.9L6.8 19.7C6.4 20 5.7 20 5.3 19.6L4.5 18.7999C4.1 18.3999 4.1 17.7999 4.4 17.2999L5.2 16.2C4.8 15.5 4.4 14.7 4.2 13.9L2.9 13.7C2.4 13.6 2 13.1 2 12.6V11.5C2 10.9 2.4 10.5 2.9 10.4L4.2 10.2C4.4 9.39995 4.7 8.60002 5.2 7.90002L4.4 6.79993C4.1 6.39993 4.1 5.69993 4.5 5.29993L5.3 4.5C5.7 4.1 6.3 4.10002 6.8 4.40002L7.9 5.19995C8.6 4.79995 9.4 4.39995 10.2 4.19995L10.4 2.90002C10.5 2.40002 11 2 11.5 2H12.6C13.2 2 13.6 2.40002 13.7 2.90002L13.9 4.19995C14.7 4.39995 15.5 4.69995 16.2 5.19995L17.3 4.40002C17.7 4.10002 18.4 4.1 18.8 4.5L19.6 5.29993C20 5.69993 20 6.29993 19.7 6.79993L18.9 7.90002C19.3 8.60002 19.7 9.39995 19.9 10.2L21.2 10.4C21.7 10.5 22.1 11 22.1 11.5ZM12.1 8.59998C10.2 8.59998 8.6 10.2 8.6 12.1C8.6 14 10.2 15.6 12.1 15.6C14 15.6 15.6 14 15.6 12.1C15.6 10.2 14 8.59998 12.1 8.59998Z" fill="currentColor" />
																	<path d="M17.1 12.1C17.1 14.9 14.9 17.1 12.1 17.1C9.30001 17.1 7.10001 14.9 7.10001 12.1C7.10001 9.29998 9.30001 7.09998 12.1 7.09998C14.9 7.09998 17.1 9.29998 17.1 12.1ZM12.1 10.1C11 10.1 10.1 11 10.1 12.1C10.1 13.2 11 14.1 12.1 14.1C13.2 14.1 14.1 13.2 14.1 12.1C14.1 11 13.2 10.1 12.1 10.1Z" fill="currentColor" />
																</svg>
															</span>
															<!--end::Svg Icon-->
														</div>
														<!--end::Preferences toggle-->
														<!--begin::Advanced search toggle-->
														<div data-kt-search-element="advanced-options-form-show" class="btn btn-icon w-20px btn-sm btn-active-color-primary" data-bs-toggle="tooltip" title="Show more search options">
															<!--begin::Svg Icon | path: icons/duotune/arrows/arr072.svg-->
															<span class="svg-icon svg-icon-2">
																<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																	<path d="M11.4343 12.7344L7.25 8.55005C6.83579 8.13583 6.16421 8.13584 5.75 8.55005C5.33579 8.96426 5.33579 9.63583 5.75 10.05L11.2929 15.5929C11.6834 15.9835 12.3166 15.9835 12.7071 15.5929L18.25 10.05C18.6642 9.63584 18.6642 8.96426 18.25 8.55005C17.8358 8.13584 17.1642 8.13584 16.75 8.55005L12.5657 12.7344C12.2533 13.0468 11.7467 13.0468 11.4343 12.7344Z" fill="currentColor" />
																</svg>
															</span>
															<!--end::Svg Icon-->
														</div>
														<!--end::Advanced search toggle-->
													</div>
													<!--end::Toolbar-->
												</form>
												<!--end::Form-->
												<!--begin::Separator-->
												<div class="separator border-gray-200 mb-6"></div>
												<!--end::Separator-->
												<!--begin::Recently viewed-->
												<div data-kt-search-element="results" class="d-none">
													<!--begin::Items-->
													<div class="scroll-y mh-200px mh-lg-350px">
														<!--begin::Category title-->
														<h3 class="fs-5 text-muted m-0 pb-5" data-kt-search-element="category-title">Users</h3>
														<!--end::Category title-->
														<!--begin::Item-->
														<a href="#" class="d-flex text-dark text-hover-primary align-items-center mb-5">
															<!--begin::Symbol-->
															<div class="symbol symbol-40px me-4">
																<span class="symbol-label bg-light">
																	<!--begin::Svg Icon | path: icons/duotune/communication/com006.svg-->
																	<span class="svg-icon svg-icon-2 svg-icon-primary">
																		<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
																			<path opacity="0.3" d="M16.5 9C16.5 13.125 13.125 16.5 9 16.5C4.875 16.5 1.5 13.125 1.5 9C1.5 4.875 4.875 1.5 9 1.5C13.125 1.5 16.5 4.875 16.5 9Z" fill="currentColor" />
																			<path d="M9 16.5C10.95 16.5 12.75 15.75 14.025 14.55C13.425 12.675 11.4 11.25 9 11.25C6.6 11.25 4.57499 12.675 3.97499 14.55C5.24999 15.75 7.05 16.5 9 16.5Z" fill="currentColor" />
																			<rect x="7" y="6" width="4" height="4" rx="2" fill="currentColor" />
																		</svg>
																	</span>
																	<!--end::Svg Icon-->
																</span>
															</div>
															<!--end::Symbol-->
															<!--begin::Title-->
															<div class="d-flex flex-column">
																<span class="fs-6 fw-semibold">Dashboard Analitics Launch</span>
																<span class="fs-7 fw-semibold text-muted">#34560</span>
															</div>
															<!--end::Title-->
														</a>
														<!--end::Item-->
													</div>
													<!--end::Items-->
												</div>
												<!--end::Recently viewed-->
												<!--begin::Recently viewed-->
												<!-- 기본 검색 창 -->
												<div class="mb-5" data-kt-search-element="main">
													<!--begin::Heading-->
													<div class="d-flex flex-stack fw-semibold mb-4">
														<!--begin::Label-->
														<span class="text-muted fs-6 me-2" data-lang-cd="top1.label.rcntSearch">Recently Searched:</span>
														<!--end::Label-->
													</div>
													<!--end::Heading-->
													<!--begin::Items-->
													<div class="scroll-y mh-200px mh-lg-325px">
														<!--begin::Item-->
														<div class="d-flex align-items-center mb-5">
															<!--begin::Symbol-->
															<div class="symbol symbol-40px me-4">
																<span class="symbol-label bg-light">
																	<!--begin::Svg Icon | path: icons/duotune/graphs/gra002.svg-->
																	<span class="svg-icon svg-icon-2 svg-icon-primary">
																		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																			<path opacity="0.3" d="M20 8L12.5 5L5 14V19H20V8Z" fill="currentColor" />
																			<path d="M21 18H6V3C6 2.4 5.6 2 5 2C4.4 2 4 2.4 4 3V18H3C2.4 18 2 18.4 2 19C2 19.6 2.4 20 3 20H4V21C4 21.6 4.4 22 5 22C5.6 22 6 21.6 6 21V20H21C21.6 20 22 19.6 22 19C22 18.4 21.6 18 21 18Z" fill="currentColor" />
																		</svg>
																	</span>
																	<!--end::Svg Icon-->
																</span>
															</div>
															<!--end::Symbol-->
															<!--begin::Title-->
															<div class="d-flex flex-column">
																<a href="#" class="fs-6 text-gray-800 text-hover-primary fw-semibold">"Landing UI Design" Launch</a>
																<span class="fs-7 text-muted fw-semibold">#24005</span>
															</div>
															<!--end::Title-->
														</div>
														<!--end::Item-->
													</div>
													<!--end::Items-->
												</div>
												<!--end::Recently viewed-->
												<!--begin::Empty-->
												<div data-kt-search-element="empty" class="text-center d-none">
													<!--begin::Icon-->
													<div class="pt-10 pb-10">
														<!--begin::Svg Icon | path: icons/duotune/files/fil024.svg-->
														<span class="svg-icon svg-icon-4x opacity-50">
															<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																<path opacity="0.3" d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" fill="currentColor" />
																<path d="M20 8L14 2V6C14 7.10457 14.8954 8 16 8H20Z" fill="currentColor" />
																<rect x="13.6993" y="13.6656" width="4.42828" height="1.73089" rx="0.865447" transform="rotate(45 13.6993 13.6656)" fill="currentColor" />
																<path d="M15 12C15 14.2 13.2 16 11 16C8.8 16 7 14.2 7 12C7 9.8 8.8 8 11 8C13.2 8 15 9.8 15 12ZM11 9.6C9.68 9.6 8.6 10.68 8.6 12C8.6 13.32 9.68 14.4 11 14.4C12.32 14.4 13.4 13.32 13.4 12C13.4 10.68 12.32 9.6 11 9.6Z" fill="currentColor" />
															</svg>
														</span>
														<!--end::Svg Icon-->
													</div>
													<!--end::Icon-->
													<!--begin::Message-->
													<div class="pb-15 fw-semibold">
														<h3 class="text-gray-600 fs-5 mb-2" data-lang-cd="top1.message.content.noResult">No result found</h3>
														<div class="text-muted fs-7" data-lang-cd="top1.message.content.tryAgain">Please try again with a different query</div>
													</div>
													<!--end::Message-->
												</div>
												<!--end::Empty-->
											</div>
											<!--end::Wrapper-->
											<!--begin::Preferences-->
											<!-- 상세 검색 옵션 -->
											<form data-kt-search-element="advanced-options-form" class="pt-1 d-none">
												<!--begin::Heading-->
												<h3 class="fw-semibold text-dark mb-7">Advanced Search</h3>
												<!--end::Heading-->
												<!--begin::Input group-->
												<div class="mb-5">
													<input type="text" class="form-control form-control-sm form-control-solid" placeholder="Contains the word" name="query" />
												</div>
												<!--end::Input group-->
												<!--begin::Input group-->
												<div class="mb-5">
													<!--begin::Radio group-->
													<div class="nav-group nav-group-fluid">
														<!--begin::Option-->
														<label>
															<input type="radio" class="btn-check" name="type" value="has" checked="checked" />
															<span class="btn btn-sm btn-color-muted btn-active btn-active-primary">All</span>
														</label>
														<!--end::Option-->
														<!--begin::Option-->
														<label>
															<input type="radio" class="btn-check" name="type" value="users" />
															<span class="btn btn-sm btn-color-muted btn-active btn-active-primary px-4">Users</span>
														</label>
														<!--end::Option-->
														<!--begin::Option-->
														<label>
															<input type="radio" class="btn-check" name="type" value="orders" />
															<span class="btn btn-sm btn-color-muted btn-active btn-active-primary px-4">Orders</span>
														</label>
														<!--end::Option-->
														<!--begin::Option-->
														<label>
															<input type="radio" class="btn-check" name="type" value="projects" />
															<span class="btn btn-sm btn-color-muted btn-active btn-active-primary px-4">Projects</span>
														</label>
														<!--end::Option-->
													</div>
													<!--end::Radio group-->
												</div>
												<!--end::Input group-->
												<!--begin::Input group-->
												<div class="mb-5">
													<input type="text" name="assignedto" class="form-control form-control-sm form-control-solid" placeholder="Assigned to" value="" />
												</div>
												<!--end::Input group-->
												<!--begin::Input group-->
												<div class="mb-5">
													<input type="text" name="collaborators" class="form-control form-control-sm form-control-solid" placeholder="Collaborators" value="" />
												</div>
												<!--end::Input group-->
												<!--begin::Input group-->
												<div class="mb-5">
													<!--begin::Radio group-->
													<div class="nav-group nav-group-fluid">
														<!--begin::Option-->
														<label>
															<input type="radio" class="btn-check" name="attachment" value="has" checked="checked" />
															<span class="btn btn-sm btn-color-muted btn-active btn-active-primary">Has attachment</span>
														</label>
														<!--end::Option-->
														<!--begin::Option-->
														<label>
															<input type="radio" class="btn-check" name="attachment" value="any" />
															<span class="btn btn-sm btn-color-muted btn-active btn-active-primary px-4">Any</span>
														</label>
														<!--end::Option-->
													</div>
													<!--end::Radio group-->
												</div>
												<!--end::Input group-->
												<!--begin::Input group-->
												<div class="mb-5">
													<select name="timezone" aria-label="Select a Timezone" data-control="select2" data-placeholder="date_period" class="form-select form-select-sm form-select-solid">
														<option value="next">Within the next</option>
														<option value="last">Within the last</option>
														<option value="between">Between</option>
														<option value="on">On</option>
													</select>
												</div>
												<!--end::Input group-->
												<!--begin::Input group-->
												<div class="row mb-8">
													<!--begin::Col-->
													<div class="col-6">
														<input type="number" name="date_number" class="form-control form-control-sm form-control-solid" placeholder="Lenght" value="" />
													</div>
													<!--end::Col-->
													<!--begin::Col-->
													<div class="col-6">
														<select name="date_typer" aria-label="Select a Timezone" data-control="select2" data-placeholder="Period" class="form-select form-select-sm form-select-solid">
															<option value="days">Days</option>
															<option value="weeks">Weeks</option>
															<option value="months">Months</option>
															<option value="years">Years</option>
														</select>
													</div>
													<!--end::Col-->
												</div>
												<!--end::Input group-->
												<!--begin::Actions-->
												<div class="d-flex justify-content-end">
													<button type="reset" class="btn btn-sm btn-light fw-bold btn-active-light-primary me-2" data-kt-search-element="advanced-options-form-cancel">Cancel</button>
													<a href="../../demo1/dist/pages/search/horizontal.html" class="btn btn-sm fw-bold btn-primary" data-kt-search-element="advanced-options-form-search">Search</a>
												</div>
												<!--end::Actions-->
											</form>
											<!--end::Preferences-->
											<!--begin::Preferences-->
											<!-- 설정 -->
											<form data-kt-search-element="preferences" class="pt-1 d-none">
												<!--begin::Heading-->
												<h3 class="fw-semibold text-dark mb-7">Search Preferences</h3>
												<!--end::Heading-->
												<!--begin::Input group-->
												<div class="pb-4 border-bottom">
													<label class="form-check form-check form-switch form-check form-switch-sm form-check-custom form-check-solid flex-stack">
														<span class="form-check-label text-gray-700 fs-6 fw-semibold ms-0 me-2">Projects</span>
														<input class="form-check-input" type="checkbox" value="1" checked="checked" />
													</label>
												</div>
												<!--end::Input group-->
												<!--begin::Input group-->
												<div class="py-4 border-bottom">
													<label class="form-check form-check form-switch form-check form-switch-sm form-check-custom form-check-solid flex-stack">
														<span class="form-check-label text-gray-700 fs-6 fw-semibold ms-0 me-2">Targets</span>
														<input class="form-check-input" type="checkbox" value="1" checked="checked" />
													</label>
												</div>
												<!--end::Input group-->
												<!--begin::Input group-->
												<div class="py-4 border-bottom">
													<label class="form-check form-check form-switch form-check form-switch-sm form-check-custom form-check-solid flex-stack">
														<span class="form-check-label text-gray-700 fs-6 fw-semibold ms-0 me-2">Affiliate Programs</span>
														<input class="form-check-input" type="checkbox" value="1" />
													</label>
												</div>
												<!--end::Input group-->
												<!--begin::Input group-->
												<div class="py-4 border-bottom">
													<label class="form-check form-check form-switch form-check form-switch-sm form-check-custom form-check-solid flex-stack">
														<span class="form-check-label text-gray-700 fs-6 fw-semibold ms-0 me-2">Referrals</span>
														<input class="form-check-input" type="checkbox" value="1" checked="checked" />
													</label>
												</div>
												<!--end::Input group-->
												<!--begin::Input group-->
												<div class="py-4 border-bottom">
													<label class="form-check form-check form-switch form-check form-switch-sm form-check-custom form-check-solid flex-stack">
														<span class="form-check-label text-gray-700 fs-6 fw-semibold ms-0 me-2">Users</span>
														<input class="form-check-input" type="checkbox" value="1" />
													</label>
												</div>
												<!--end::Input group-->
												<!--begin::Actions-->
												<div class="d-flex justify-content-end pt-7">
													<button type="reset" class="btn btn-sm btn-light fw-bold btn-active-light-primary me-2" data-kt-search-element="preferences-dismiss">Cancel</button>
													<button type="submit" class="btn btn-sm fw-bold btn-primary">Save Changes</button>
												</div>
												<!--end::Actions-->
											</form>
											<!--end::Preferences-->
										</div>
										<!--end::Menu-->
									</div>
									<!--end::Search-->
									--%>
									<!--begin::Notifications(알림 넣기)-->
									<div class="app-navbar-item ms-1 ms-lg-3">
										<!--begin::alarm toggle-->
										<div class="btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px w-md-40px h-md-40px position-relative" id="oslTopNotificationsBtn">
											<!--begin::Svg Icon | path: icons/duotune/general/gen022.svg-->
											<span class="svg-icon svg-icon-1">
												<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M11.2929 2.70711C11.6834 2.31658 12.3166 2.31658 12.7071 2.70711L15.2929 5.29289C15.6834 5.68342 15.6834 6.31658 15.2929 6.70711L12.7071 9.29289C12.3166 9.68342 11.6834 9.68342 11.2929 9.29289L8.70711 6.70711C8.31658 6.31658 8.31658 5.68342 8.70711 5.29289L11.2929 2.70711Z" fill="currentColor" />
													<path d="M11.2929 14.7071C11.6834 14.3166 12.3166 14.3166 12.7071 14.7071L15.2929 17.2929C15.6834 17.6834 15.6834 18.3166 15.2929 18.7071L12.7071 21.2929C12.3166 21.6834 11.6834 21.6834 11.2929 21.2929L8.70711 18.7071C8.31658 18.3166 8.31658 17.6834 8.70711 17.2929L11.2929 14.7071Z" fill="currentColor" />
													<path opacity="0.3" d="M5.29289 8.70711C5.68342 8.31658 6.31658 8.31658 6.70711 8.70711L9.29289 11.2929C9.68342 11.6834 9.68342 12.3166 9.29289 12.7071L6.70711 15.2929C6.31658 15.6834 5.68342 15.6834 5.29289 15.2929L2.70711 12.7071C2.31658 12.3166 2.31658 11.6834 2.70711 11.2929L5.29289 8.70711Z" fill="currentColor" />
													<path opacity="0.3" d="M17.2929 8.70711C17.6834 8.31658 18.3166 8.31658 18.7071 8.70711L21.2929 11.2929C21.6834 11.6834 21.6834 12.3166 21.2929 12.7071L18.7071 15.2929C18.3166 15.6834 17.6834 15.6834 17.2929 15.2929L14.7071 12.7071C14.3166 12.3166 14.3166 11.6834 14.7071 11.2929L17.2929 8.70711Z" fill="currentColor" />
												</svg>
											</span>
											<!--end::Svg Icon-->
											<!-- 신규 알림 발생 시 깜박이 표현 - 고정으로 변경 위해 animation-blink 클래스 제거-->
											<span class="bullet bullet-dot bg-success h-6px w-6px position-absolute translate-middle top-0 start-50 d-none"></span>
										</div>
										<!--end::alarm toggle-->
									</div>
									<!--end::Notifications-->
									<!--begin::Message/Chat(메시지 넣기)-->
									<div class="app-navbar-item ms-1 ms-lg-3">
										<!--begin::Menu wrapper-->
										<div class="btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px w-md-40px h-md-40px position-relative" id="oslTopMessageBtn">
											<!--begin::Svg Icon | path: icons/duotune/communication/com012.svg-->
											<span class="svg-icon svg-icon-1">
												<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path opacity="0.3" d="M20 3H4C2.89543 3 2 3.89543 2 5V16C2 17.1046 2.89543 18 4 18H4.5C5.05228 18 5.5 18.4477 5.5 19V21.5052C5.5 22.1441 6.21212 22.5253 6.74376 22.1708L11.4885 19.0077C12.4741 18.3506 13.6321 18 14.8167 18H20C21.1046 18 22 17.1046 22 16V5C22 3.89543 21.1046 3 20 3Z" fill="currentColor" />
													<rect x="6" y="12" width="7" height="2" rx="1" fill="currentColor" />
													<rect x="6" y="7" width="12" height="2" rx="1" fill="currentColor" />
												</svg>
											</span>
											<!--end::Svg Icon-->
											<!-- 신규 알림 발생 시 깜박이 표현 - 고정위해 animation-blink 클래스 제거-->
											<span class="bullet bullet-dot bg-success h-6px w-6px position-absolute translate-middle top-0 start-50 d-none"></span>
										</div>
										<!--end::Menu wrapper-->
									</div>
									<!--end::Message/Chat-->
									<!--begin::Quick links(담당 요구사항 넣기)-->
									<div class="app-navbar-item ms-1 ms-lg-3">
										<!--begin::Menu wrapper-->
										<div class="btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px w-md-40px h-md-40px" id="oslTopMyTicketBtn" data-kt-menu-trigger="click" data-kt-menu-attach="parent" data-kt-menu-placement="bottom-end">
											<!--begin::Svg Icon | path: icons/duotune/general/gen025.svg-->
											<span class="svg-icon svg-icon-1">
												<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
													<rect x="2" y="2" width="9" height="9" rx="2" fill="currentColor" />
													<rect opacity="0.3" x="13" y="2" width="9" height="9" rx="2" fill="currentColor" />
													<rect opacity="0.3" x="13" y="13" width="9" height="9" rx="2" fill="currentColor" />
													<rect opacity="0.3" x="2" y="13" width="9" height="9" rx="2" fill="currentColor" />
												</svg>
											</span>
											<!--end::Svg Icon-->
										</div>
										<!--end::Menu wrapper-->
										<!--begin::Menu(하위 드롭)-->
										<div class="menu menu-sub menu-sub-dropdown menu-column mw-425px mw-lg-600px" id="oslChgMenu" data-kt-menu="true">
											<!--begin::Heading-->
											<div class="d-flex flex-column bgi-no-repeat rounded-top osl-chg-req-list-bg-blue">
												<!--begin::Title-->
												<h3 class="text-white fw-semibold px-3 mt-6 mb-6"><span title="담당 티켓" data-lang-cd="top1.title.reqMy">담당 티켓</span></h3>
												<!--end::Title-->
												<!--begin::Tabs-->
												<ul class="osl-active-trigger nav nav-line-tabs nav-line-tabs-2x nav-stretch fw-semibold px-3">
													<!-- 사용자가 요청한 보안 행정 티켓 -->
													<li class="nav-item" name="oslTopMyTicketTabItem" id="oslTopMyTicketUsrReqTab">
														<a class="nav-link text-white opacity-75 opacity-state-100 pb-4 mx-2 ms-0 mx-lg-3 ms-lg-0" data-bs-toggle="tab" href="#oslTopMyTicketMenuTab1">
															<span class="osl-trigger-show osl-sm-trigger-show reverse osl-trigger-active-hide me-1" title="요청 티켓" data-title-lang-cd="top1.tooltip.reqRequest" data-bs-toggle="tooltip" data-bs-custom-class="tooltip-inverse" data-bs-dismiss="click" data-bs-placement="bottom">
																<!--begin::Svg Icon | path: /var/www/preview.keenthemes.com/kt-products/docs/keen/html/releases/2023-02-02-051933/core/html/src/media/icons/duotune/communication/com013.svg-->
																<span class="svg-icon svg-icon-white svg-icon-4"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																<path d="M6.28548 15.0861C7.34369 13.1814 9.35142 12 11.5304 12H12.4696C14.6486 12 16.6563 13.1814 17.7145 15.0861L19.3493 18.0287C20.0899 19.3618 19.1259 21 17.601 21H6.39903C4.87406 21 3.91012 19.3618 4.65071 18.0287L6.28548 15.0861Z" fill="currentColor"/>
																<rect opacity="0.3" x="8" y="3" width="8" height="8" rx="4" fill="currentColor"/>
																</svg>
																</span>
																<!--end::Svg Icon-->
															</span>
															<span class="mw-65px osl-trigger-show osl-sm-trigger-show osl-word__break" data-lang-cd="top1.tab.reqRequest">요청 티켓</span>
															(<span class="fs-8 opacity-75" name="oslChgCnt" id="oslChgUsrCnt"></span>)
														</a>
													</li>
													<!-- 접수 대기 -->
													<li class="nav-item" name="oslTopMyTicketTabItem" id="oslTopMyTicketWatReqTab">
														<a class="nav-link text-white opacity-75 opacity-state-100 pb-4 mx-2 ms-0 mx-lg-3 ms-lg-0" data-bs-toggle="tab" href="#oslTopMyTicketMenuTab2">
															<span class="osl-trigger-show osl-sm-trigger-show reverse osl-trigger-active-hide me-1" title="접수대기" data-title-lang-cd="top1.tooltip.reqStay" data-bs-toggle="tooltip" data-bs-custom-class="tooltip-inverse" data-bs-dismiss="click" data-bs-placement="bottom">
																<!--begin::Svg Icon | path: /var/www/preview.keenthemes.com/kt-products/docs/keen/html/releases/2022-10-18-124209/core/html/src/media/icons/duotune/ecommerce/ecm010.svg-->
																<span class="svg-icon svg-icon-white svg-icon-4">
																	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																		<path opacity="0.3" d="M3 6C2.4 6 2 5.6 2 5V3C2 2.4 2.4 2 3 2H5C5.6 2 6 2.4 6 3C6 3.6 5.6 4 5 4H4V5C4 5.6 3.6 6 3 6ZM22 5V3C22 2.4 21.6 2 21 2H19C18.4 2 18 2.4 18 3C18 3.6 18.4 4 19 4H20V5C20 5.6 20.4 6 21 6C21.6 6 22 5.6 22 5ZM6 21C6 20.4 5.6 20 5 20H4V19C4 18.4 3.6 18 3 18C2.4 18 2 18.4 2 19V21C2 21.6 2.4 22 3 22H5C5.6 22 6 21.6 6 21ZM22 21V19C22 18.4 21.6 18 21 18C20.4 18 20 18.4 20 19V20H19C18.4 20 18 20.4 18 21C18 21.6 18.4 22 19 22H21C21.6 22 22 21.6 22 21Z" fill="currentColor"/>
																		<path d="M3 16C2.4 16 2 15.6 2 15V9C2 8.4 2.4 8 3 8C3.6 8 4 8.4 4 9V15C4 15.6 3.6 16 3 16ZM13 15V9C13 8.4 12.6 8 12 8C11.4 8 11 8.4 11 9V15C11 15.6 11.4 16 12 16C12.6 16 13 15.6 13 15ZM17 15V9C17 8.4 16.6 8 16 8C15.4 8 15 8.4 15 9V15C15 15.6 15.4 16 16 16C16.6 16 17 15.6 17 15ZM9 15V9C9 8.4 8.6 8 8 8H7C6.4 8 6 8.4 6 9V15C6 15.6 6.4 16 7 16H8C8.6 16 9 15.6 9 15ZM22 15V9C22 8.4 21.6 8 21 8H20C19.4 8 19 8.4 19 9V15C19 15.6 19.4 16 20 16H21C21.6 16 22 15.6 22 15Z" fill="currentColor"/>
																	</svg>
																</span>
																<!--end::Svg Icon-->
															</span>
															<span class="mw-65px osl-trigger-show osl-sm-trigger-show osl-word__break" data-lang-cd="top1.tab.reqStay">접수 대기</span>
															(<span class="fs-8 opacity-75" name="oslChgCnt" id="oslWatReqCnt"></span>)
														</a>
													</li>
													<!-- 보안 정책 -->
													<li class="nav-item" name="oslTopMyTicketTabItem" id="oslTopMyTicketChgReqTab">
														<a class="nav-link text-white opacity-75 opacity-state-100 pb-4 mx-2 ms-0 mx-lg-3 ms-lg-0 active" data-bs-toggle="tab" href="#oslTopMyTicketMenuTab3">
															<span class="osl-trigger-show osl-sm-trigger-show reverse osl-trigger-active-hide text-white me-1" title="보안정책" data-title-lang-cd="top1.tooltip.secPolicy" data-bs-toggle="tooltip" data-bs-custom-class="tooltip-inverse" data-bs-dismiss="click" data-bs-placement="bottom">
																<!--begin::Svg Icon | path: /var/www/preview.keenthemes.com/kt-products/docs/keen/html/releases/2022-10-18-124209/core/html/src/media/icons/duotune/general/gen005.svg-->
																<span class="svg-icon svg-icon-white svg-icon-4">
																	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																		<path opacity="0.3" d="M19 22H5C4.4 22 4 21.6 4 21V3C4 2.4 4.4 2 5 2H14L20 8V21C20 21.6 19.6 22 19 22ZM12.5 18C12.5 17.4 12.6 17.5 12 17.5H8.5C7.9 17.5 8 17.4 8 18C8 18.6 7.9 18.5 8.5 18.5L12 18C12.6 18 12.5 18.6 12.5 18ZM16.5 13C16.5 12.4 16.6 12.5 16 12.5H8.5C7.9 12.5 8 12.4 8 13C8 13.6 7.9 13.5 8.5 13.5H15.5C16.1 13.5 16.5 13.6 16.5 13ZM12.5 8C12.5 7.4 12.6 7.5 12 7.5H8C7.4 7.5 7.5 7.4 7.5 8C7.5 8.6 7.4 8.5 8 8.5H12C12.6 8.5 12.5 8.6 12.5 8Z" fill="currentColor"/>
																			<rect x="7" y="17" width="6" height="2" rx="1" fill="currentColor"/>
																			<rect x="7" y="12" width="10" height="2" rx="1" fill="currentColor"/>
																			<rect x="7" y="7" width="6" height="2" rx="1" fill="currentColor"/>
																		<path d="M15 8H20L14 2V7C14 7.6 14.4 8 15 8Z" fill="currentColor"/>
																	</svg>
																</span>
																<!--end::Svg Icon-->
															</span>
															<span class="mw-65px osl-trigger-show osl-sm-trigger-show osl-word__break" data-lang-cd="top1.tab.secPolicy">보안정책</span>
															(<span class="fs-8 opacity-75" name="oslChgCnt" id="oslChgReqCnt"></span>)
														</a>
													</li>
													<!-- 보안 이벤트 -->
													<li class="nav-item" name="oslTopMyTicketTabItem" id="oslTopMyTicketChgEvtReqTab">
														<a class="nav-link text-white opacity-75 opacity-state-100 pb-4 mx-2 ms-0 mx-lg-3 ms-lg-0" data-bs-toggle="tab" href="#oslTopMyTicketMenuTab4">
															<span class="osl-trigger-show osl-sm-trigger-show reverse osl-trigger-active-hide text-white me-1" title="이상징후" data-title-lang-cd="top1.tooltip.anomaly" data-bs-toggle="tooltip" data-bs-custom-class="tooltip-inverse" data-bs-dismiss="click" data-bs-placement="bottom">
																<!--begin::Svg Icon | path: /var/www/preview.keenthemes.com/kt-products/docs/keen/html/releases/2022-10-18-124209/core/html/src/media/icons/duotune/general/gen044.svg-->
																<span class="svg-icon svg-icon-white svg-icon-4">
																	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																		<rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="currentColor"/>
																		<rect x="11" y="14" width="7" height="2" rx="1" transform="rotate(-90 11 14)" fill="currentColor"/>
																		<rect x="11" y="17" width="2" height="2" rx="1" transform="rotate(-90 11 17)" fill="currentColor"/>
																	</svg>
																</span>
																<!--end::Svg Icon-->
															</span>
															<span class="mw-65px osl-trigger-show osl-sm-trigger-show osl-word__break" data-lang-cd="top1.tab.anomaly">이상징후</span>
															(<span class="fs-8 opacity-75" name="oslChgCnt" id="oslChgEvtCnt"></span>)
														</a>
													</li>
													<!-- 결재 -->
													<li class="nav-item" name="oslTopMyTicketTabItem" id="oslTopMyTicketSigReqTab">
														<a class="nav-link text-white opacity-75 opacity-state-100 pb-4 mx-2 ms-0 mx-lg-3 ms-lg-0" data-bs-toggle="tab" href="#oslTopMyTicketMenuTab5">
															<span class="osl-trigger-show osl-sm-trigger-show reverse osl-trigger-active-hide me-1" title="결재" data-title-lang-cd="top1.tooltip.sign" data-bs-toggle="tooltip" data-bs-custom-class="tooltip-inverse" data-bs-dismiss="click" data-bs-placement="bottom">
																<!--begin::Svg Icon | path: /var/www/preview.keenthemes.com/kt-products/docs/keen/html/releases/2022-10-18-124209/core/html/src/media/icons/duotune/technology/teh004.svg-->
																<span class="svg-icon svg-icon-white svg-icon-4">
																	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																		<path opacity="0.3" d="M21 10.7192H3C2.4 10.7192 2 11.1192 2 11.7192C2 12.3192 2.4 12.7192 3 12.7192H6V14.7192C6 18.0192 8.7 20.7192 12 20.7192C15.3 20.7192 18 18.0192 18 14.7192V12.7192H21C21.6 12.7192 22 12.3192 22 11.7192C22 11.1192 21.6 10.7192 21 10.7192Z" fill="currentColor"/>
																		<path d="M11.6 21.9192C11.4 21.9192 11.2 21.8192 11 21.7192C10.6 21.4192 10.5 20.7191 10.8 20.3191C11.7 19.1191 12.3 17.8191 12.7 16.3191C12.8 15.8191 13.4 15.4192 13.9 15.6192C14.4 15.7192 14.8 16.3191 14.6 16.8191C14.2 18.5191 13.4 20.1192 12.4 21.5192C12.2 21.7192 11.9 21.9192 11.6 21.9192ZM8.7 19.7192C10.2 18.1192 11 15.9192 11 13.7192V8.71917C11 8.11917 11.4 7.71917 12 7.71917C12.6 7.71917 13 8.11917 13 8.71917V13.0192C13 13.6192 13.4 14.0192 14 14.0192C14.6 14.0192 15 13.6192 15 13.0192V8.71917C15 7.01917 13.7 5.71917 12 5.71917C10.3 5.71917 9 7.01917 9 8.71917V13.7192C9 15.4192 8.4 17.1191 7.2 18.3191C6.8 18.7191 6.9 19.3192 7.3 19.7192C7.5 19.9192 7.7 20.0192 8 20.0192C8.3 20.0192 8.5 19.9192 8.7 19.7192ZM6 16.7192C6.5 16.7192 7 16.2192 7 15.7192V8.71917C7 8.11917 7.1 7.51918 7.3 6.91918C7.5 6.41918 7.2 5.8192 6.7 5.6192C6.2 5.4192 5.59999 5.71917 5.39999 6.21917C5.09999 7.01917 5 7.81917 5 8.71917V15.7192V15.8191C5 16.3191 5.5 16.7192 6 16.7192ZM9 4.71917C9.5 4.31917 10.1 4.11918 10.7 3.91918C11.2 3.81918 11.5 3.21917 11.4 2.71917C11.3 2.21917 10.7 1.91916 10.2 2.01916C9.4 2.21916 8.59999 2.6192 7.89999 3.1192C7.49999 3.4192 7.4 4.11916 7.7 4.51916C7.9 4.81916 8.2 4.91918 8.5 4.91918C8.6 4.91918 8.8 4.81917 9 4.71917ZM18.2 18.9192C18.7 17.2192 19 15.5192 19 13.7192V8.71917C19 5.71917 17.1 3.1192 14.3 2.1192C13.8 1.9192 13.2 2.21917 13 2.71917C12.8 3.21917 13.1 3.81916 13.6 4.01916C15.6 4.71916 17 6.61917 17 8.71917V13.7192C17 15.3192 16.8 16.8191 16.3 18.3191C16.1 18.8191 16.4 19.4192 16.9 19.6192C17 19.6192 17.1 19.6192 17.2 19.6192C17.7 19.6192 18 19.3192 18.2 18.9192Z" fill="currentColor"/>
																	</svg>
																</span>
																<!--end::Svg Icon-->
															</span>
															<span class="mw-65px osl-trigger-show osl-sm-trigger-show osl-word__break" data-lang-cd="top1.tab.sign">결재</span>
															(<span class="fs-8 opacity-75" name="oslChgCnt" id="oslChgSigCnt"></span>)
														</a>
													</li>
													<!-- 기타 -->
													<li class="nav-item" name="oslTopMyTicketTabItem" id="oslTopMyTicketEtcReqTab">
														<a class="nav-link text-white opacity-75 opacity-state-100 pb-4 mx-2 ms-0 mx-lg-3 ms-lg-0" data-bs-toggle="tab" href="#oslTopMyTicketMenuTab6">
															<span class="osl-trigger-show osl-sm-trigger-show reverse osl-trigger-active-hide svg-icon-white me-1" title="기타" data-title-lang-cd="top1.tooltip.others" data-bs-toggle="tooltip" data-bs-custom-class="tooltip-inverse" data-bs-dismiss="click" data-bs-placement="bottom">
																<!--begin::Svg Icon | path: /var/www/preview.keenthemes.com/kt-products/docs/keen/html/releases/2022-10-18-124209/core/html/src/media/icons/duotune/general/gen023.svg-->
																<span class="svg-icon svg-icon-white svg-icon-4">
																	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																		<rect opacity="0.3" x="2" y="2" width="20" height="20" rx="4" fill="currentColor"/>
																		<rect x="11" y="11" width="2.6" height="2.6" rx="1.3" fill="currentColor"/>
																		<rect x="15" y="11" width="2.6" height="2.6" rx="1.3" fill="currentColor"/>
																		<rect x="7" y="11" width="2.6" height="2.6" rx="1.3" fill="currentColor"/>
																	</svg>
																</span>
																<!--end::Svg Icon-->
															</span>
															<span class="mw-65px osl-trigger-show osl-sm-trigger-show osl-word__break" data-lang-cd="top1.tab.others">기타</span>
															(<span class="fs-8 opacity-75" name="oslChgCnt" id="oslChgEtcCnt">0</span>)
														</a>
													</li>
												</ul>
												<!--end::Tabs-->
											</div>
											<!--end::Heading-->
											<!--begin::Tab content-->
											<!-- Tab별 콘텐츠 -->
											<div class="tab-content">
												<!-- 사용자가 요청한 보안 행정 티켓 -->
												<!-- begin:: Tab 1 Content-->
												<div class="tab-pane fade" id="oslTopMyTicketMenuTab1" role="tabpanel">
													<!-- 목록 표출되는 스크롤 영역 -->
													<!--begin::Items-->
													<div class="scroll-y mh-325px my-5 px-6" name="oslChgListDiv" id="oslUsrReqListDiv">
														<!-- 접수 대기 목록-->
													</div>
													<!--end::Items-->
													<!--begin::Empty search-->
										            <div class="text-center" name="oslChgNoListDiv" data-kt-search-element="empty">
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
															<h3 class="text-gray-600 fs-5 mb-2"><span data-lang-cd="top1.message.content.noResult">No result found</span></h3>
															<div class="text-muted fs-7"><span data-lang-cd="top1.message.content.tryAgain">Please try again with a different query</span></div>
														</div>
														<!--end::Message-->
													</div>
										            <!--end::Empty search-->
													<!-- 더보기를 위한 하단 영역 -->
													<!--begin::View more-->
													<div class="py-3 text-center border-top">
														<a class="btn btn-color-gray-600 btn-active-color-primary" name="viewAllBtn" href="#oslUsrReqListDiv">View All
															<!--begin::Svg Icon | path: icons/duotune/arrows/arr064.svg-->
															<span class="svg-icon svg-icon-5">
																<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																	<rect opacity="0.5" x="18" y="13" width="13" height="2" rx="1" transform="rotate(-180 18 13)" fill="currentColor"></rect>
																	<path d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z" fill="currentColor"></path>
																</svg>
															</span>
															<!--end::Svg Icon-->
														</a>
													</div>
													<!--end::View more-->
												</div>
												<!-- end:: Tab 1 Content-->
												<!-- 접수 대기 -->
												<!-- begin:: Tab 1 Content-->
												<div class="tab-pane fade" id="oslTopMyTicketMenuTab2" role="tabpanel">
													<!-- 목록 표출되는 스크롤 영역 -->
													<!--begin::Items-->
													<div class="scroll-y mh-325px my-5 px-6" name="oslChgListDiv" id="oslWatReqListDiv">
														<!-- 접수 대기 목록-->
													</div>
													<!--end::Items-->
													<!--begin::Empty search-->
										            <div class="text-center" name="oslChgNoListDiv" data-kt-search-element="empty">
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
															<h3 class="text-gray-600 fs-5 mb-2"><span data-lang-cd="top1.message.content.noResult">No result found</span></h3>
															<div class="text-muted fs-7"><span data-lang-cd="top1.message.content.tryAgain">Please try again with a different query</span></div>
														</div>
														<!--end::Message-->
													</div>
										            <!--end::Empty search-->
													<!-- 더보기를 위한 하단 영역 -->
													<!--begin::View more-->
													<div class="py-3 text-center border-top">
														<a class="btn btn-color-gray-600 btn-active-color-primary" name="viewAllBtn" href="#oslWatReqListDiv">View All
															<!--begin::Svg Icon | path: icons/duotune/arrows/arr064.svg-->
															<span class="svg-icon svg-icon-5">
																<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																	<rect opacity="0.5" x="18" y="13" width="13" height="2" rx="1" transform="rotate(-180 18 13)" fill="currentColor"></rect>
																	<path d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z" fill="currentColor"></path>
																</svg>
															</span>
															<!--end::Svg Icon-->
														</a>
													</div>
													<!--end::View more-->
												</div>
												<!-- end:: Tab 1 Content-->
												<!-- 보안 정책 -->
												<!-- begin:: Tab 3 Content-->
												<div class="tab-pane fade active show" id="oslTopMyTicketMenuTab3" role="tabpanel">
													<!-- 목록 표출되는 스크롤 영역 -->
													<!--begin::Items-->
													<div class="scroll-y mh-325px my-5 px-6" name="oslChgListDiv" id="oslChgReqListDiv">
														<!-- 보안 정책 목록-->
													</div>
													<!--end::Items-->
													<!--begin::Empty search-->
										            <div class="text-center" name="oslChgNoListDiv" data-kt-search-element="empty">
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
															<h3 class="text-gray-600 fs-5 mb-2"><span data-lang-cd="top1.message.content.noResult">No result found</span></h3>
															<div class="text-muted fs-7"><span data-lang-cd="top1.message.content.tryAgain">Please try again with a different query</span></div>
														</div>
														<!--end::Message-->
													</div>
										            <!--end::Empty search-->
													<!-- 더보기를 위한 하단 영역 -->
													<!--begin::View more-->
													<div class="py-3 text-center border-top">
														<a class="btn btn-color-gray-600 btn-active-color-primary" name="viewAllBtn" href="#oslChgReqListDiv">View All
															<!--begin::Svg Icon | path: icons/duotune/arrows/arr064.svg-->
															<span class="svg-icon svg-icon-5">
																<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																	<rect opacity="0.5" x="18" y="13" width="13" height="2" rx="1" transform="rotate(-180 18 13)" fill="currentColor"></rect>
																	<path d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z" fill="currentColor"></path>
																</svg>
															</span>
															<!--end::Svg Icon-->
														</a>
													</div>
													<!--end::View more-->
												</div>
												<!-- end:: Tab 3 Content-->
												<!-- 보안 이벤트 -->
												<!-- begin:: Tab 4 Content-->
												<div class="tab-pane fade" id="oslTopMyTicketMenuTab4" role="tabpanel">
													<!-- 목록 표출되는 스크롤 영역 -->
													<!--begin::Items-->
													<div class="scroll-y mh-325px my-5 px-6" name="oslChgListDiv" id="oslChgEvtListDiv">
														<!-- 보안 이벤트 목록 -->
													</div>
													<!--end::Items-->
													<!--begin::Empty search-->
										            <div class="text-center" name="oslChgNoListDiv" data-kt-search-element="empty">
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
															<h3 class="text-gray-600 fs-5 mb-2"><span data-lang-cd="top1.message.content.noResult">No result found</span></h3>
															<div class="text-muted fs-7"><span data-lang-cd="top1.message.content.tryAgain">Please try again with a different query</span></div>
														</div>
														<!--end::Message-->
													</div>
										            <!--end::Empty search-->
										            <!-- 더보기를 위한 하단 영역 -->
													<!--begin::View more-->
													<div class="py-3 text-center border-top">
														<a class="btn btn-color-gray-600 btn-active-color-primary" name="viewAllBtn" href="#oslChgEvtListDiv">View All
															<!--begin::Svg Icon | path: icons/duotune/arrows/arr064.svg-->
															<span class="svg-icon svg-icon-5">
																<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																	<rect opacity="0.5" x="18" y="13" width="13" height="2" rx="1" transform="rotate(-180 18 13)" fill="currentColor"></rect>
																	<path d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z" fill="currentColor"></path>
																</svg>
															</span>
															<!--end::Svg Icon-->
														</a>
													</div>
													<!--end::View more-->
												</div>
												<!-- end:: Tab 4 Content-->
												<!-- 결재 -->
												<!-- begin:: Tab 5 Content-->
												<div class="tab-pane fade" id="oslTopMyTicketMenuTab5" role="tabpanel">
													<!-- 목록 표출되는 스크롤 영역 -->
													<!--begin::Items-->
													<div class="scroll-y mh-325px my-5 px-6" name="oslChgListDiv" id="oslChgSigListDiv">
														<!-- 결재 목록 -->
													</div>
													<!--end::Items-->
													<!--begin::Empty search-->
										            <div class="text-center" name="oslChgNoListDiv" data-kt-search-element="empty">
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
															<h3 class="text-gray-600 fs-5 mb-2"><span data-lang-cd="top1.message.content.noResult">No result found</span></h3>
															<div class="text-muted fs-7"><span data-lang-cd="top1.message.content.tryAgain">Please try again with a different query</span></div>
														</div>
														<!--end::Message-->
													</div>
										            <!--end::Empty search-->
										            <!-- 더보기를 위한 하단 영역 -->
													<!--begin::View more-->
													<div class="py-3 text-center border-top">
														<a class="btn btn-color-gray-600 btn-active-color-primary" name="viewAllBtn" href="#oslChgSigListDiv">View All
															<!--begin::Svg Icon | path: icons/duotune/arrows/arr064.svg-->
															<span class="svg-icon svg-icon-5">
																<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																	<rect opacity="0.5" x="18" y="13" width="13" height="2" rx="1" transform="rotate(-180 18 13)" fill="currentColor"></rect>
																	<path d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z" fill="currentColor"></path>
																</svg>
															</span>
															<!--end::Svg Icon-->
														</a>
													</div>
													<!--end::View more-->
												</div>
												<!-- end:: Tab 5 Content-->
												<!-- 기타 -->
												<!-- begin:: Tab 6 Content-->
												<div class="tab-pane fade" id="oslTopMyTicketMenuTab6" role="tabpanel">
													<!-- 목록 표출되는 스크롤 영역 -->
													<!--begin::Items-->
													<div class="scroll-y mh-325px my-5 px-6" name="oslChgListDiv" id="oslChgEtcListDiv">
														<!-- 기타 목록 -->
													</div>
													<!--end::Items-->
													<!--begin::Empty search-->
										            <div class="text-center" name="oslChgNoListDiv" data-kt-search-element="empty">
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
															<h3 class="text-gray-600 fs-5 mb-2"><span data-lang-cd="top1.message.content.noResult">No result found</span></h3>
															<div class="text-muted fs-7"><span data-lang-cd="top1.message.content.tryAgain">Please try again with a different query</span></div>
														</div>
														<!--end::Message-->
													</div>
										            <!--end::Empty search-->
										            <!-- 더보기를 위한 하단 영역 -->
													<!--begin::View more-->
													<div class="py-3 text-center border-top">
														<a href="javascript:void(0);" class="btn btn-color-gray-600 btn-active-color-primary">View All
															<!--begin::Svg Icon | path: icons/duotune/arrows/arr064.svg-->
															<span class="svg-icon svg-icon-5">
																<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																	<rect opacity="0.5" x="18" y="13" width="13" height="2" rx="1" transform="rotate(-180 18 13)" fill="currentColor"></rect>
																	<path d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z" fill="currentColor"></path>
																</svg>
															</span>
															<!--end::Svg Icon-->
														</a>
													</div>
													<!--end::View more-->
												</div>
												<!-- end:: Tab 6 Content-->
											</div>
											<!--end::Tab content-->
										</div>
										<!--end::Menu(하위 드롭)-->
									</div>
									<!--end::Quick links-->
									
									<!--begin::Theme mode(모드 변경)-->
									<%-- LG U+ 모드 변경 미사용으로 주석 :: start --%>
									 <%-- <div class="app-navbar-item ms-1 ms-lg-3">
										<!--begin::Menu toggle-->
										<div class="btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px w-md-40px h-md-40px" data-kt-menu-trigger="click" data-kt-menu-attach="parent" data-kt-menu-placement="bottom-end">
											<!--begin::Svg Icon | path: icons/duotune/general/gen060.svg-->
											<span class="svg-icon theme-light-show svg-icon-2">
												<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M11.9905 5.62598C10.7293 5.62574 9.49646 5.9995 8.44775 6.69997C7.39903 7.40045 6.58159 8.39619 6.09881 9.56126C5.61603 10.7263 5.48958 12.0084 5.73547 13.2453C5.98135 14.4823 6.58852 15.6185 7.48019 16.5104C8.37186 17.4022 9.50798 18.0096 10.7449 18.2557C11.9818 18.5019 13.2639 18.3757 14.429 17.8931C15.5942 17.4106 16.5901 16.5933 17.2908 15.5448C17.9915 14.4962 18.3655 13.2634 18.3655 12.0023C18.3637 10.3119 17.6916 8.69129 16.4964 7.49593C15.3013 6.30056 13.6808 5.62806 11.9905 5.62598Z" fill="currentColor" />
													<path d="M22.1258 10.8771H20.627C20.3286 10.8771 20.0424 10.9956 19.8314 11.2066C19.6204 11.4176 19.5018 11.7038 19.5018 12.0023C19.5018 12.3007 19.6204 12.5869 19.8314 12.7979C20.0424 13.0089 20.3286 13.1274 20.627 13.1274H22.1258C22.4242 13.1274 22.7104 13.0089 22.9214 12.7979C23.1324 12.5869 23.2509 12.3007 23.2509 12.0023C23.2509 11.7038 23.1324 11.4176 22.9214 11.2066C22.7104 10.9956 22.4242 10.8771 22.1258 10.8771Z" fill="currentColor" />
													<path d="M11.9905 19.4995C11.6923 19.5 11.4064 19.6187 11.1956 19.8296C10.9848 20.0405 10.8663 20.3265 10.866 20.6247V22.1249C10.866 22.4231 10.9845 22.7091 11.1953 22.9199C11.4062 23.1308 11.6922 23.2492 11.9904 23.2492C12.2886 23.2492 12.5746 23.1308 12.7854 22.9199C12.9963 22.7091 13.1147 22.4231 13.1147 22.1249V20.6247C13.1145 20.3265 12.996 20.0406 12.7853 19.8296C12.5745 19.6187 12.2887 19.5 11.9905 19.4995Z" fill="currentColor" />
													<path d="M4.49743 12.0023C4.49718 11.704 4.37865 11.4181 4.16785 11.2072C3.95705 10.9962 3.67119 10.8775 3.37298 10.8771H1.87445C1.57603 10.8771 1.28984 10.9956 1.07883 11.2066C0.867812 11.4176 0.749266 11.7038 0.749266 12.0023C0.749266 12.3007 0.867812 12.5869 1.07883 12.7979C1.28984 13.0089 1.57603 13.1274 1.87445 13.1274H3.37299C3.6712 13.127 3.95706 13.0083 4.16785 12.7973C4.37865 12.5864 4.49718 12.3005 4.49743 12.0023Z" fill="currentColor" />
													<path d="M11.9905 4.50058C12.2887 4.50012 12.5745 4.38141 12.7853 4.17048C12.9961 3.95954 13.1147 3.67361 13.1149 3.3754V1.87521C13.1149 1.57701 12.9965 1.29103 12.7856 1.08017C12.5748 0.869313 12.2888 0.750854 11.9906 0.750854C11.6924 0.750854 11.4064 0.869313 11.1955 1.08017C10.9847 1.29103 10.8662 1.57701 10.8662 1.87521V3.3754C10.8664 3.67359 10.9849 3.95952 11.1957 4.17046C11.4065 4.3814 11.6923 4.50012 11.9905 4.50058Z" fill="currentColor" />
													<path d="M18.8857 6.6972L19.9465 5.63642C20.0512 5.53209 20.1343 5.40813 20.1911 5.27163C20.2479 5.13513 20.2772 4.98877 20.2774 4.84093C20.2775 4.69309 20.2485 4.54667 20.192 4.41006C20.1355 4.27344 20.0526 4.14932 19.948 4.04478C19.8435 3.94024 19.7194 3.85734 19.5828 3.80083C19.4462 3.74432 19.2997 3.71531 19.1519 3.71545C19.0041 3.7156 18.8577 3.7449 18.7212 3.80167C18.5847 3.85845 18.4607 3.94159 18.3564 4.04633L17.2956 5.10714C17.1909 5.21147 17.1077 5.33543 17.0509 5.47194C16.9942 5.60844 16.9649 5.7548 16.9647 5.90264C16.9646 6.05048 16.9936 6.19689 17.0501 6.33351C17.1066 6.47012 17.1895 6.59425 17.294 6.69878C17.3986 6.80332 17.5227 6.88621 17.6593 6.94272C17.7959 6.99923 17.9424 7.02824 18.0902 7.02809C18.238 7.02795 18.3844 6.99865 18.5209 6.94187C18.6574 6.88509 18.7814 6.80195 18.8857 6.6972Z" fill="currentColor" />
													<path d="M18.8855 17.3073C18.7812 17.2026 18.6572 17.1195 18.5207 17.0627C18.3843 17.006 18.2379 16.9767 18.0901 16.9766C17.9423 16.9764 17.7959 17.0055 17.6593 17.062C17.5227 17.1185 17.3986 17.2014 17.2941 17.3059C17.1895 17.4104 17.1067 17.5345 17.0501 17.6711C16.9936 17.8077 16.9646 17.9541 16.9648 18.1019C16.9649 18.2497 16.9942 18.3961 17.0509 18.5326C17.1077 18.6691 17.1908 18.793 17.2955 18.8974L18.3563 19.9582C18.4606 20.0629 18.5846 20.146 18.721 20.2027C18.8575 20.2595 19.0039 20.2887 19.1517 20.2889C19.2995 20.289 19.4459 20.26 19.5825 20.2035C19.7191 20.147 19.8432 20.0641 19.9477 19.9595C20.0523 19.855 20.1351 19.7309 20.1916 19.5943C20.2482 19.4577 20.2772 19.3113 20.277 19.1635C20.2769 19.0157 20.2476 18.8694 20.1909 18.7329C20.1341 18.5964 20.051 18.4724 19.9463 18.3681L18.8855 17.3073Z" fill="currentColor" />
													<path d="M5.09528 17.3072L4.0345 18.368C3.92972 18.4723 3.84655 18.5963 3.78974 18.7328C3.73294 18.8693 3.70362 19.0156 3.70346 19.1635C3.7033 19.3114 3.7323 19.4578 3.78881 19.5944C3.84532 19.7311 3.92822 19.8552 4.03277 19.9598C4.13732 20.0643 4.26147 20.1472 4.3981 20.2037C4.53473 20.2602 4.68117 20.2892 4.82902 20.2891C4.97688 20.2889 5.12325 20.2596 5.25976 20.2028C5.39627 20.146 5.52024 20.0628 5.62456 19.958L6.68536 18.8973C6.79007 18.7929 6.87318 18.6689 6.92993 18.5325C6.98667 18.396 7.01595 18.2496 7.01608 18.1018C7.01621 17.954 6.98719 17.8076 6.93068 17.671C6.87417 17.5344 6.79129 17.4103 6.68676 17.3058C6.58224 17.2012 6.45813 17.1183 6.32153 17.0618C6.18494 17.0053 6.03855 16.9763 5.89073 16.9764C5.74291 16.9766 5.59657 17.0058 5.46007 17.0626C5.32358 17.1193 5.19962 17.2024 5.09528 17.3072Z" fill="currentColor" />
													<path d="M5.09541 6.69715C5.19979 6.8017 5.32374 6.88466 5.4602 6.94128C5.59665 6.9979 5.74292 7.02708 5.89065 7.02714C6.03839 7.0272 6.18469 6.99815 6.32119 6.94164C6.45769 6.88514 6.58171 6.80228 6.68618 6.69782C6.79064 6.59336 6.87349 6.46933 6.93 6.33283C6.9865 6.19633 7.01556 6.05003 7.01549 5.9023C7.01543 5.75457 6.98625 5.60829 6.92963 5.47184C6.87301 5.33539 6.79005 5.21143 6.6855 5.10706L5.6247 4.04626C5.5204 3.94137 5.39643 3.8581 5.25989 3.80121C5.12335 3.74432 4.97692 3.71493 4.82901 3.71472C4.68109 3.71452 4.53458 3.7435 4.39789 3.80001C4.26119 3.85652 4.13699 3.93945 4.03239 4.04404C3.9278 4.14864 3.84487 4.27284 3.78836 4.40954C3.73185 4.54624 3.70287 4.69274 3.70308 4.84066C3.70329 4.98858 3.73268 5.135 3.78957 5.27154C3.84646 5.40808 3.92974 5.53205 4.03462 5.63635L5.09541 6.69715Z" fill="currentColor" />
												</svg>
											</span>
											<!--end::Svg Icon-->
											<!--begin::Svg Icon | path: icons/duotune/general/gen061.svg-->
											<span class="svg-icon theme-dark-show svg-icon-2">
												<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M19.0647 5.43757C19.3421 5.43757 19.567 5.21271 19.567 4.93534C19.567 4.65796 19.3421 4.43311 19.0647 4.43311C18.7874 4.43311 18.5625 4.65796 18.5625 4.93534C18.5625 5.21271 18.7874 5.43757 19.0647 5.43757Z" fill="currentColor" />
													<path d="M20.0692 9.48884C20.3466 9.48884 20.5714 9.26398 20.5714 8.98661C20.5714 8.70923 20.3466 8.48438 20.0692 8.48438C19.7918 8.48438 19.567 8.70923 19.567 8.98661C19.567 9.26398 19.7918 9.48884 20.0692 9.48884Z" fill="currentColor" />
													<path d="M12.0335 20.5714C15.6943 20.5714 18.9426 18.2053 20.1168 14.7338C20.1884 14.5225 20.1114 14.289 19.9284 14.161C19.746 14.034 19.5003 14.0418 19.3257 14.1821C18.2432 15.0546 16.9371 15.5156 15.5491 15.5156C12.2257 15.5156 9.48884 12.8122 9.48884 9.48886C9.48884 7.41079 10.5773 5.47137 12.3449 4.35752C12.5342 4.23832 12.6 4.00733 12.5377 3.79251C12.4759 3.57768 12.2571 3.42859 12.0335 3.42859C7.32556 3.42859 3.42857 7.29209 3.42857 12C3.42857 16.7079 7.32556 20.5714 12.0335 20.5714Z" fill="currentColor" />
													<path d="M13.0379 7.47998C13.8688 7.47998 14.5446 8.15585 14.5446 8.98668C14.5446 9.26428 14.7693 9.48891 15.0469 9.48891C15.3245 9.48891 15.5491 9.26428 15.5491 8.98668C15.5491 8.15585 16.225 7.47998 17.0558 7.47998C17.3334 7.47998 17.558 7.25535 17.558 6.97775C17.558 6.70015 17.3334 6.47552 17.0558 6.47552C16.225 6.47552 15.5491 5.76616 15.5491 4.93534C15.5491 4.65774 15.3245 4.43311 15.0469 4.43311C14.7693 4.43311 14.5446 4.65774 14.5446 4.93534C14.5446 5.76616 13.8688 6.47552 13.0379 6.47552C12.7603 6.47552 12.5357 6.70015 12.5357 6.97775C12.5357 7.25535 12.7603 7.47998 13.0379 7.47998Z" fill="currentColor" />
												</svg>
											</span>
											<!--end::Svg Icon-->
										</div>
										<!--end::Menu toggle-->
										<!--begin::Menu(하위 드롭)-->
										<div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-title-gray-700 menu-icon-muted menu-active-bg menu-state-color fw-semibold py-4 fs-base w-175px" data-kt-menu="true" data-kt-element="theme-mode-menu" style="">
											<select class="d-none" id="usrOpt_OPT00006" name="usrOpt" data-osl-value="" data-mst-cd="OPT00006"></select>
											<!--begin::Menu item-->
											<div class="menu-item px-3 my-0">
												<span class="menu-link px-3 py-2 active osl-evt__mode-btn" data-kt-element="mode" data-kt-value="light" data-osl-value="01">
													<span class="menu-icon" data-kt-element="icon">
														<!--begin::Svg Icon | path: icons/duotune/general/gen060.svg-->
														<span class="svg-icon svg-icon-3">
															<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																<path d="M11.9905 5.62598C10.7293 5.62574 9.49646 5.9995 8.44775 6.69997C7.39903 7.40045 6.58159 8.39619 6.09881 9.56126C5.61603 10.7263 5.48958 12.0084 5.73547 13.2453C5.98135 14.4823 6.58852 15.6185 7.48019 16.5104C8.37186 17.4022 9.50798 18.0096 10.7449 18.2557C11.9818 18.5019 13.2639 18.3757 14.429 17.8931C15.5942 17.4106 16.5901 16.5933 17.2908 15.5448C17.9915 14.4962 18.3655 13.2634 18.3655 12.0023C18.3637 10.3119 17.6916 8.69129 16.4964 7.49593C15.3013 6.30056 13.6808 5.62806 11.9905 5.62598Z" fill="currentColor"></path>
																<path d="M22.1258 10.8771H20.627C20.3286 10.8771 20.0424 10.9956 19.8314 11.2066C19.6204 11.4176 19.5018 11.7038 19.5018 12.0023C19.5018 12.3007 19.6204 12.5869 19.8314 12.7979C20.0424 13.0089 20.3286 13.1274 20.627 13.1274H22.1258C22.4242 13.1274 22.7104 13.0089 22.9214 12.7979C23.1324 12.5869 23.2509 12.3007 23.2509 12.0023C23.2509 11.7038 23.1324 11.4176 22.9214 11.2066C22.7104 10.9956 22.4242 10.8771 22.1258 10.8771Z" fill="currentColor"></path>
																<path d="M11.9905 19.4995C11.6923 19.5 11.4064 19.6187 11.1956 19.8296C10.9848 20.0405 10.8663 20.3265 10.866 20.6247V22.1249C10.866 22.4231 10.9845 22.7091 11.1953 22.9199C11.4062 23.1308 11.6922 23.2492 11.9904 23.2492C12.2886 23.2492 12.5746 23.1308 12.7854 22.9199C12.9963 22.7091 13.1147 22.4231 13.1147 22.1249V20.6247C13.1145 20.3265 12.996 20.0406 12.7853 19.8296C12.5745 19.6187 12.2887 19.5 11.9905 19.4995Z" fill="currentColor"></path>
																<path d="M4.49743 12.0023C4.49718 11.704 4.37865 11.4181 4.16785 11.2072C3.95705 10.9962 3.67119 10.8775 3.37298 10.8771H1.87445C1.57603 10.8771 1.28984 10.9956 1.07883 11.2066C0.867812 11.4176 0.749266 11.7038 0.749266 12.0023C0.749266 12.3007 0.867812 12.5869 1.07883 12.7979C1.28984 13.0089 1.57603 13.1274 1.87445 13.1274H3.37299C3.6712 13.127 3.95706 13.0083 4.16785 12.7973C4.37865 12.5864 4.49718 12.3005 4.49743 12.0023Z" fill="currentColor"></path>
																<path d="M11.9905 4.50058C12.2887 4.50012 12.5745 4.38141 12.7853 4.17048C12.9961 3.95954 13.1147 3.67361 13.1149 3.3754V1.87521C13.1149 1.57701 12.9965 1.29103 12.7856 1.08017C12.5748 0.869313 12.2888 0.750854 11.9906 0.750854C11.6924 0.750854 11.4064 0.869313 11.1955 1.08017C10.9847 1.29103 10.8662 1.57701 10.8662 1.87521V3.3754C10.8664 3.67359 10.9849 3.95952 11.1957 4.17046C11.4065 4.3814 11.6923 4.50012 11.9905 4.50058Z" fill="currentColor"></path>
																<path d="M18.8857 6.6972L19.9465 5.63642C20.0512 5.53209 20.1343 5.40813 20.1911 5.27163C20.2479 5.13513 20.2772 4.98877 20.2774 4.84093C20.2775 4.69309 20.2485 4.54667 20.192 4.41006C20.1355 4.27344 20.0526 4.14932 19.948 4.04478C19.8435 3.94024 19.7194 3.85734 19.5828 3.80083C19.4462 3.74432 19.2997 3.71531 19.1519 3.71545C19.0041 3.7156 18.8577 3.7449 18.7212 3.80167C18.5847 3.85845 18.4607 3.94159 18.3564 4.04633L17.2956 5.10714C17.1909 5.21147 17.1077 5.33543 17.0509 5.47194C16.9942 5.60844 16.9649 5.7548 16.9647 5.90264C16.9646 6.05048 16.9936 6.19689 17.0501 6.33351C17.1066 6.47012 17.1895 6.59425 17.294 6.69878C17.3986 6.80332 17.5227 6.88621 17.6593 6.94272C17.7959 6.99923 17.9424 7.02824 18.0902 7.02809C18.238 7.02795 18.3844 6.99865 18.5209 6.94187C18.6574 6.88509 18.7814 6.80195 18.8857 6.6972Z" fill="currentColor"></path>
																<path d="M18.8855 17.3073C18.7812 17.2026 18.6572 17.1195 18.5207 17.0627C18.3843 17.006 18.2379 16.9767 18.0901 16.9766C17.9423 16.9764 17.7959 17.0055 17.6593 17.062C17.5227 17.1185 17.3986 17.2014 17.2941 17.3059C17.1895 17.4104 17.1067 17.5345 17.0501 17.6711C16.9936 17.8077 16.9646 17.9541 16.9648 18.1019C16.9649 18.2497 16.9942 18.3961 17.0509 18.5326C17.1077 18.6691 17.1908 18.793 17.2955 18.8974L18.3563 19.9582C18.4606 20.0629 18.5846 20.146 18.721 20.2027C18.8575 20.2595 19.0039 20.2887 19.1517 20.2889C19.2995 20.289 19.4459 20.26 19.5825 20.2035C19.7191 20.147 19.8432 20.0641 19.9477 19.9595C20.0523 19.855 20.1351 19.7309 20.1916 19.5943C20.2482 19.4577 20.2772 19.3113 20.277 19.1635C20.2769 19.0157 20.2476 18.8694 20.1909 18.7329C20.1341 18.5964 20.051 18.4724 19.9463 18.3681L18.8855 17.3073Z" fill="currentColor"></path>
																<path d="M5.09528 17.3072L4.0345 18.368C3.92972 18.4723 3.84655 18.5963 3.78974 18.7328C3.73294 18.8693 3.70362 19.0156 3.70346 19.1635C3.7033 19.3114 3.7323 19.4578 3.78881 19.5944C3.84532 19.7311 3.92822 19.8552 4.03277 19.9598C4.13732 20.0643 4.26147 20.1472 4.3981 20.2037C4.53473 20.2602 4.68117 20.2892 4.82902 20.2891C4.97688 20.2889 5.12325 20.2596 5.25976 20.2028C5.39627 20.146 5.52024 20.0628 5.62456 19.958L6.68536 18.8973C6.79007 18.7929 6.87318 18.6689 6.92993 18.5325C6.98667 18.396 7.01595 18.2496 7.01608 18.1018C7.01621 17.954 6.98719 17.8076 6.93068 17.671C6.87417 17.5344 6.79129 17.4103 6.68676 17.3058C6.58224 17.2012 6.45813 17.1183 6.32153 17.0618C6.18494 17.0053 6.03855 16.9763 5.89073 16.9764C5.74291 16.9766 5.59657 17.0058 5.46007 17.0626C5.32358 17.1193 5.19962 17.2024 5.09528 17.3072Z" fill="currentColor"></path>
																<path d="M5.09541 6.69715C5.19979 6.8017 5.32374 6.88466 5.4602 6.94128C5.59665 6.9979 5.74292 7.02708 5.89065 7.02714C6.03839 7.0272 6.18469 6.99815 6.32119 6.94164C6.45769 6.88514 6.58171 6.80228 6.68618 6.69782C6.79064 6.59336 6.87349 6.46933 6.93 6.33283C6.9865 6.19633 7.01556 6.05003 7.01549 5.9023C7.01543 5.75457 6.98625 5.60829 6.92963 5.47184C6.87301 5.33539 6.79005 5.21143 6.6855 5.10706L5.6247 4.04626C5.5204 3.94137 5.39643 3.8581 5.25989 3.80121C5.12335 3.74432 4.97692 3.71493 4.82901 3.71472C4.68109 3.71452 4.53458 3.7435 4.39789 3.80001C4.26119 3.85652 4.13699 3.93945 4.03239 4.04404C3.9278 4.14864 3.84487 4.27284 3.78836 4.40954C3.73185 4.54624 3.70287 4.69274 3.70308 4.84066C3.70329 4.98858 3.73268 5.135 3.78957 5.27154C3.84646 5.40808 3.92974 5.53205 4.03462 5.63635L5.09541 6.69715Z" fill="currentColor"></path>
															</svg>
														</span>
														<!--end::Svg Icon-->
													</span>
													<span class="menu-title">Light</span>
												</span>
											</div>
											<!--end::Menu item-->
											<!--begin::Menu item-->
											<div class="menu-item px-3 my-0">
												<span class="menu-link px-3 py-2 osl-evt__mode-btn" data-kt-element="mode" data-kt-value="dark" data-osl-value="02">
													<span class="menu-icon" data-kt-element="icon">
														<!--begin::Svg Icon | path: icons/duotune/general/gen061.svg-->
														<span class="svg-icon svg-icon-3">
															<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																<path d="M19.0647 5.43757C19.3421 5.43757 19.567 5.21271 19.567 4.93534C19.567 4.65796 19.3421 4.43311 19.0647 4.43311C18.7874 4.43311 18.5625 4.65796 18.5625 4.93534C18.5625 5.21271 18.7874 5.43757 19.0647 5.43757Z" fill="currentColor"></path>
																<path d="M20.0692 9.48884C20.3466 9.48884 20.5714 9.26398 20.5714 8.98661C20.5714 8.70923 20.3466 8.48438 20.0692 8.48438C19.7918 8.48438 19.567 8.70923 19.567 8.98661C19.567 9.26398 19.7918 9.48884 20.0692 9.48884Z" fill="currentColor"></path>
																<path d="M12.0335 20.5714C15.6943 20.5714 18.9426 18.2053 20.1168 14.7338C20.1884 14.5225 20.1114 14.289 19.9284 14.161C19.746 14.034 19.5003 14.0418 19.3257 14.1821C18.2432 15.0546 16.9371 15.5156 15.5491 15.5156C12.2257 15.5156 9.48884 12.8122 9.48884 9.48886C9.48884 7.41079 10.5773 5.47137 12.3449 4.35752C12.5342 4.23832 12.6 4.00733 12.5377 3.79251C12.4759 3.57768 12.2571 3.42859 12.0335 3.42859C7.32556 3.42859 3.42857 7.29209 3.42857 12C3.42857 16.7079 7.32556 20.5714 12.0335 20.5714Z" fill="currentColor"></path>
																<path d="M13.0379 7.47998C13.8688 7.47998 14.5446 8.15585 14.5446 8.98668C14.5446 9.26428 14.7693 9.48891 15.0469 9.48891C15.3245 9.48891 15.5491 9.26428 15.5491 8.98668C15.5491 8.15585 16.225 7.47998 17.0558 7.47998C17.3334 7.47998 17.558 7.25535 17.558 6.97775C17.558 6.70015 17.3334 6.47552 17.0558 6.47552C16.225 6.47552 15.5491 5.76616 15.5491 4.93534C15.5491 4.65774 15.3245 4.43311 15.0469 4.43311C14.7693 4.43311 14.5446 4.65774 14.5446 4.93534C14.5446 5.76616 13.8688 6.47552 13.0379 6.47552C12.7603 6.47552 12.5357 6.70015 12.5357 6.97775C12.5357 7.25535 12.7603 7.47998 13.0379 7.47998Z" fill="currentColor"></path>
															</svg>
														</span>
														<!--end::Svg Icon-->
													</span>
													<span class="menu-title">Dark</span>
												</span>
											</div>
											<!--end::Menu item-->
											
											<!--begin::Menu item-->
											<div class="menu-item px-3 my-0">
												<span class="menu-link px-3 py-2" data-kt-element="mode" data-kt-value="system">
													<span class="menu-icon" data-kt-element="icon">
														<!--begin::Svg Icon | path: icons/duotune/general/gen062.svg-->
														<span class="svg-icon svg-icon-3">
															<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																<path fill-rule="evenodd" clip-rule="evenodd" d="M1.34375 3.9463V15.2178C1.34375 16.119 2.08105 16.8563 2.98219 16.8563H8.65093V19.4594H6.15702C5.38853 19.4594 4.75981 19.9617 4.75981 20.5757V21.6921H19.2403V20.5757C19.2403 19.9617 18.6116 19.4594 17.8431 19.4594H15.3492V16.8563H21.0179C21.919 16.8563 22.6562 16.119 22.6562 15.2178V3.9463C22.6562 3.04516 21.9189 2.30786 21.0179 2.30786H2.98219C2.08105 2.30786 1.34375 3.04516 1.34375 3.9463ZM12.9034 9.9016C13.241 9.98792 13.5597 10.1216 13.852 10.2949L15.0393 9.4353L15.9893 10.3853L15.1297 11.5727C15.303 11.865 15.4366 12.1837 15.523 12.5212L16.97 12.7528V13.4089H13.9851C13.9766 12.3198 13.0912 11.4394 12 11.4394C10.9089 11.4394 10.0235 12.3198 10.015 13.4089H7.03006V12.7528L8.47712 12.5211C8.56345 12.1836 8.69703 11.8649 8.87037 11.5727L8.0107 10.3853L8.96078 9.4353L10.148 10.2949C10.4404 10.1215 10.759 9.98788 11.0966 9.9016L11.3282 8.45467H12.6718L12.9034 9.9016ZM16.1353 7.93758C15.6779 7.93758 15.3071 7.56681 15.3071 7.1094C15.3071 6.652 15.6779 6.28122 16.1353 6.28122C16.5926 6.28122 16.9634 6.652 16.9634 7.1094C16.9634 7.56681 16.5926 7.93758 16.1353 7.93758ZM2.71385 14.0964V3.90518C2.71385 3.78023 2.81612 3.67796 2.94107 3.67796H21.0589C21.1839 3.67796 21.2861 3.78023 21.2861 3.90518V14.0964C15.0954 14.0964 8.90462 14.0964 2.71385 14.0964Z" fill="currentColor"></path>
															</svg>
														</span>
														<!--end::Svg Icon-->
													</span>
													<span class="menu-title">System</span>
												</span>
											</div>
											<!--end::Menu item-->
											
										</div>
										<!--end::Menu(하위 드롭)-->
									</div> --%>
									<%-- LG U+ 모드 변경 미사용으로 주석 :: end --%>
									<!--end::Theme mode-->
									
									<!--begin::User menu(사용자-설정, 마이페이지 넣기)-->
									<div class="app-navbar-item ms-1 ms-lg-3" id="oslHeaderUserMenuToggleBtn">
										<!--begin::Menu wrapper-->
										<div class="cursor-pointer symbol symbol-35px symbol-md-40px" data-kt-menu-trigger="click" data-kt-menu-attach="parent" data-kt-menu-placement="bottom-end">
											<c:choose>
												<c:when test="${sessionScope.loginVO.usrImgId ne null}">
													<img src="<c:url value="/cmm/fms/getImage.do?fileSn=0&atchFileId=${sessionScope.loginVO.usrImgId}" />" class="user_img" />
												</c:when>
												<c:otherwise>
													<img alt="<c:url value="${sessionScope.loginVO.usrNm}" /> 사진" src="/media/users/default.jpg" class="user_img">
												</c:otherwise>
											</c:choose>
										</div>
										<!--end::Menu wrapper-->
										<!--begin::Menu(하위 드롭)-->
										<div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-color fw-semibold py-4 fs-6 w-275px" data-kt-menu="true">
											<!--begin::Menu item-->
											<div class="menu-item px-3">
												<div class="menu-content d-flex align-items-center px-3">
													<!--begin::Avatar-->
													<div class="symbol symbol-50px me-5">
														<c:choose>
															<c:when test="${sessionScope.loginVO.usrImgId ne null}">
																<img src="<c:url value="/cmm/fms/getImage.do?fileSn=0&atchFileId=${sessionScope.loginVO.usrImgId}" />" class="user_img" />
															</c:when>
															<c:otherwise>
																<img alt="<c:url value="${sessionScope.loginVO.usrNm}" /> 사진" src="/media/users/default.jpg" class="user_img">
															</c:otherwise>
														</c:choose>
													</div>
													<!--end::Avatar-->
													<!--begin::Username-->
													<div class="d-flex flex-column">
														<div class="fw-bold d-flex align-items-center fs-5">
															${sessionScope.loginVO.usrNm}
															<span class="badge badge-light-success fw-bold fs-8 px-2 py-1 ms-2" id="oslUsrPositionAndDuty">직책/직급</span>
														</div>
														<!-- 권한 그룹 -->
														<div class="menu-item fw-semibold text-muted text-hover-primary fs-7 mt-1 osl-menu-link-click" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-start">
															<div class="menu-title position-relative menu-link" id="oslUsrSelAuthGrpId">권한 그룹 명</div>
															<!--begin::Menu sub(하위 드롭)-->
															<div class="menu-sub menu-sub-dropdown w-175px py-4" id="oslUsrSelAuthGrpIdList">
															</div>
															<!--end::Menu sub(하위 드롭)-->
														</div>
													</div>
													<!--end::Username-->
												</div>
											</div>
											<!--end::Menu item-->
											<%--줄긋기--%>
											<div class="separator my-2"></div>
											<!--begin::Menu item-->
											<div class="menu-item px-5" id="usrInfoPageBtn" onclick="$.osl.user.usrMyPagePopUp('${sessionScope.loginVO.usrId}');">
												<span class="menu-link px-5" data-lang-cd="top1.title.myPage">마이페이지</span>
											</div>
											<!--end::Menu item-->
											<!--begin::Menu item-->
											<div class="menu-item px-5" name="myPageItem" id="usrWorkListBtn">
												<span class="menu-link px-5">
													<span class="menu-text" data-lang-cd="top1.title.myWork">담당 작업</span>
													<span class="menu-badge">
														<span class="badge badge-light-danger fw-bold fs-7 mw-100px"><span data-lang-cd="top1.label.incmplCnt">미완료 수</span>(<span class="" id="oslWorkCnt"></span>)</span>
													</span>
												</span>
											</div>
											<!--end::Menu item-->
											<!--begin::Menu item-->
											<div class="menu-item px-5" name="myPageItem" id="usrRepOpnListBtn">
												<span class="menu-link px-5">
													<span class="menu-text" data-lang-cd="top1.title.opinion">의견 제시</span>
													<span class="menu-badge">
														<span class="badge badge-light-danger fw-bold fs-7 mw-100px"><span data-lang-cd="top1.label.unansrCnt">미답변 수</span>(<span class="" id="oslOpnCnt"></span>)</span>
													</span>
												</span>
											</div>
											<!--end::Menu item-->
											<!--begin::Menu item-->
											<div class="menu-item px-5" id="oslTopQuickActionsBtn">
												<span class="menu-link px-5" data-lang-cd="top1.title.userSetting">사용자 설정</span>
											</div>
											<!--end::Menu item-->
											<%--줄긋기--%>
											<div class="separator my-2"></div>
											
											<!--begin::Menu item(언어팩)-->
											<div class="menu-item px-5" data-kt-menu-trigger="{default: 'click', lg: 'hover'}" data-kt-menu-placement="left-start">
												<%-- LG U+ 영문 언어팩 미사용 주석 :: start  --%>
												<%-- <span class="menu-link px-5" id="usrCurrentLangCd" >
													<span class="menu-title position-relative">Language
														<span class="fs-8 rounded bg-light px-3 position-absolute translate-middle-y top-50 end-0">
															<span id="selLangNm">English</span>
															<img class="w-25px h-25-px rounded-1 ms-2" src="<c:url value='/media/flags/united-states.svg'/>" alt="" />
														</span>
													</span>
												</span>
												<!--begin::Menu sub(하위 드롭)-->
												<div id="usrLangCdList" class="menu-sub menu-sub-dropdown w-175px py-4">
													<!-- 언어 종류별 아이템 추가 -->
													<!--begin::Menu item-->
													<div class="menu-item px-3">
														<span class="menu-link d-flex px-5 active" value="02" id="usrLangCd_en" data-mst-cd="OPT00004" data-sub-cd="en" data-sub-cd-ref1="English" data-sub-cd-ref2="226-united-states.svg" data-title-lang-cd="top1.tooltip.english" onclick="$.osl.user.usrOptLangChg(this);">
															<span class="symbol symbol-25px me-4">
																<img class="rounded-1" src="<c:url value='/media/flags/226-united-states.svg'/>" alt="" />
															</span>
															English
														</span>
													</div>
													<!--end::Menu item-->
													<!--begin::Menu item-->
													<div class="menu-item px-3">
														<span class="menu-link d-flex px-5" value="01" id="usrLangCd_ko" data-mst-cd="OPT00004" data-sub-cd="ko" data-sub-cd-ref1="한국어" data-sub-cd-ref2="094-south-korea.svg" data-title-lang-cd="top1.tooltip.korean" onclick="$.osl.user.usrOptLangChg(this);">
															<span class="symbol symbol-25px me-4">
																<img class="rounded-1" src="<c:url value='/media/flags/094-south-korea.svg'/>" alt="">
															</span>
															Korean
														</span>
													</div>
													<!--end::Menu item-->
												</div> --%>
												<%-- LG U+ 영문 언어팩 미사용 주석 :: end  --%>
												<!--end::Menu sub(하위 드롭)-->
											</div>
											<!--end::Menu item-->
											<!--begin::Menu item(로그아웃)-->
											<div class="menu-item px-5">
												<span class="menu-link px-5" aria-haspopup="true" aria-expanded="false" onclick="$.osl.user.logout();" >
													Sign Out
												</span>
											</div>
											<!--end::Menu item-->
										</div>
										<!--end::Menu-->
									</div>
									<!--end::User menu-->
								</div>
							</div>
							<!--end::Navbar-->
						</div>
						<!--end::Header wrapper-->
					</div>
					<!--end::Header container-->
					<!-- end:: Header -->
					<!-- begin::Offcanvas Toolbar Quick Actions -->
				</div>
				<!--end::Header-->
<script>
"use strict";

/* 화면 모드 전환 */
var defaultThemeMode = "dark";
var themeMode;
if ( document.documentElement ) { 
	if ( document.documentElement.hasAttribute("data-theme-mode")) { 
		themeMode = document.documentElement.getAttribute("data-theme-mode"); 
	} else { 
		if ( localStorage.getItem("data-theme") !== null ) { 
			themeMode = localStorage.getItem("data-theme"); 
		} else { 
			themeMode = defaultThemeMode; 
		} 
	} 
	
	document.documentElement.setAttribute("data-theme", themeMode); 
}

var OSLTop = function () {
	//사용자 권한
	var usrAuthSet;
	//비밀 요구사항인 경우 접근 권한 확인하기 위한 변수
	var reqAuth = false;
	// 로그인 사용자가 비밀번호가 초기화되었을 시 해당 passInit 값에 Y값 들어가 있음.
	var passInit = '<c:out value="${sessionScope.passInit}"/>';
	// 로그인 사용자의 Id
	var usrId = '<c:out value="${loginVO.usrId}"/>';
	// 로그인 사용자의 라이선스 그룹ID
	var licGrpId = '<c:out value="${loginVO.licGrpId}"/>';
	
	var documentSetting = function() {
		//값이 있을 때 
		if(!$.osl.isNull(passInit) && !$.osl.isNull(usrId) && !$.osl.isNull(licGrpId)) {
			var data = {
				"usrId" 	: usrId
				,"iniYn"	: "Y"
				,"licGrpId"	: licGrpId 
			};
			var options = {
					idKey: "iniPw",
					modalTitle: $.osl.lang("cmm4002.title.main.default"),
					autoHeight: false,
				};
			$.osl.layerPopupOpen('/cmm/cmm4000/cmm4000/selectCmm4002View.do', data , options);
		}
		//최근 5개 메뉴 정보 조회 및 표출
		fnRctMenuPathDataAjax();
		
		//미확인 알림 갯수 조회
		fnNotificationsCountLoadAjax();
		
		//미확인 메시지 갯수 조회
		fnMessageLoadAjax();
		
		//로그인 기간 중 단 한번만 공지팝업 표출
		if($.osl.user.isCookie("isNoticed") == false) {
			//로그인 기간동안 유지되는 쿠키로 공지팝업이 단 한번만 표출되도록 하기 위함
			document.cookie = 'isNoticed=true; path=/;';
			fnNtcPopupAjax();
		}
		
		//담당 티켓 영역 정보 조회
		$("#oslTopMyTicketBtn").off("click").on("click", function(){
			fnChgReqDataAjax();
		});
		
		//마이페이지 내 담당 업무/미답변 의견 갯수 세팅
		$("#oslHeaderUserMenuToggleBtn").off("click").on("click", function(){
			fnSetReqDataCnt();
		});
		
		//최근 5개 메뉴 클릭 이벤트
		$("#oslRctMenuList").on("click", "[name=oslRctMenuItem]", function(){
			var menuId = $(this).attr("id");
			var menuUrl = $(this).data("menuUrl");
			var menuNm = $(this).data("menuNm");
			var menuTypeCd = $(this).data("menuTypeCd");
			
			// 클릭 메뉴로 이동
			$.osl.goMenu(menuUrl,menuId,menuNm,menuTypeCd);
		});
		
		//모드 변경 이벤트
		// LG U+ 미사용으로 주석 :: start
		/* $(".osl-evt__mode-btn").click(function(){
			//모드 옵션 select 가져오기
			var targetSelect = $("select#usrOpt_OPT00006");
			
			//선택한 모드
			var selMode = KTThemeMode.getMode();
			
			var selOptVal = $("[data-kt-element=mode][data-kt-value="+selMode+"]").data("osl-value");
			
			//값 변경
			$(targetSelect).data("osl-value",selOptVal);
			$(targetSelect).val(selOptVal);
		    
			// 선택 모드 값으로 사용자 설정 변경
			$.osl.user.usrOptChg(targetSelect[0]);
		}); */
		// LG U+ 미사용으로 주석 :: end
		
		//담당 티켓 요구사항 클릭 이벤트
		$("#oslChgMenu").on("click", "[name=chgListItem]", function(){
			var prjId = $(this).data("prjId");
			var reqId = $(this).data("reqId");
			var reqNm = $(this).find(".osl-evt-req-nm").text();
			var reqUsrId = $(this).data("reqUsrId");
			var reqGrpId = $(this).data("reqGrpId");
			var reqProType = $(this).data("reqProType");
			var processId = $(this).data("processId");
			var processNm = $(this).data("processNm");
			var tplId = $(this).data("tplId");
			
			if($.osl.isNull(reqGrpId)){
				reqGrpId = "";
			}
			
			var data = {
					type:"detail",
					paramTplClsType:"02",
					paramPrjId: prjId,
					paramReqId: reqId,
					paramReqUsrId: reqUsrId,
					paramReqGrpId: reqGrpId,
				};
			var options = {
					idKey: reqId,
					modalTitle: reqNm,
					closeConfirm: false,
					autoHeight:false,
					modalSize : "fs",
					ftScrollUse: false
				};
			
			//요구사항 '접수 대기'중이면,
			if(reqProType == "01"){
				var rowData = {
						"prjId" : prjId
						,"reqId" : reqId
						,"reqNm" : reqNm
						,"tplId" : tplId
				}
				data.paramSelReqInfoList = JSON.stringify([rowData]);
				data.modalIdKey = "req1100ReqTable";
				data.action = "dblClick";
				
				options.idKey = "req1100ReqTable";
				options.modalSize = "fs";
				options.fitScreen = false; //약간 작은 풀스크린으로 열기 위해
				options.modalTitle =  $.osl.lang("cmm6200.title.main.default");
				
				//프로세스 고정된 요구사항 존재 유무
				var fixedProcessId = "";
				var fixedProcessNm = "";
				
				//저장된 프로세스 ID 없을 경우 양식에 연결된 프로세스 사용
				if($.osl.isNull(processId)){
					fixedProcessId = $(this).data("tplConnectionProcessId");
					fixedProcessNm = $(this).data("tplConnectionProcessNm");
				}else{
					fixedProcessId = processId;
					fixedProcessNm = processNm;
				}
				
				data.fixedProcessId = fixedProcessId;
				data.fixedProcessNm = fixedProcessNm;
				
				//요구사항 접수 팝업 호출
				$.osl.layerPopupOpen('/cmm/cmm6000/cmm6200/selectCmm6200View.do',data,options);
			}
			//요구사항 임시 저장인 경우
			else if(reqProType == "07"){
				var data = {
						type:"detail",
						paramTplClsType:"02",
						paramPrjId: prjId,
						paramReqId: reqId,
						paramReqUsrId: reqUsrId,
						paramReqGrpId: reqGrpId,
					};
				var options = {
						idKey: reqId,
						modalTitle: $.osl.lang("tpl1102.title.main.default"),
						closeConfirm: false
					};
				
				$.osl.layerPopupOpen('/tpl/tpl1000/tpl1100/selectTpl1102View.do',data,options);
			}
			//요구사항 '처리중'이면(접수 대기 외)
			else{
				//요구사항 처리 팝업 호출
				$.osl.layerPopupOpen('/cmm/cmm6000/cmm6200/selectCmm6201View.do',data,options);
			}
		});
		
		//담당 티켓 viewAll 버튼 클릭 이벤트
		$("#oslChgMenu").on("click", "[name=viewAllBtn]", function(){
			// 담당 티켓 탭 ID 조회
			var targetId = $(this).attr("href")
			
			var dataParam = {};
			
			var reqType = "01";
			
			//사용자 요청 보안행정 탭 viewAll
			if(targetId == "#oslUsrReqListDiv"){
				//티켓 유형(01: 티켓 / 02: 결재 / 03: 작업 / 04: 의견)
				reqType = "01";
				
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
						url : "/req/req1000/req1000/selectReq1000ListAjaxView.do",
						//조회 파라미터
					params : {
						"baseGrp": "prjId",
						"reqUsrId": $.osl.user.userInfo.usrId,
					},
					//데이터 테이블 & 팝업 옵션
					option : {
						showBtns : ["reqUpdate", "reqDelete"],
						submitBtnCd : false, // submit 버튼 표출 유무
					}
				};
			}
			// 접수 대기 탭의 viewAll
			else if(targetId == "#oslWatReqListDiv"){
				//티켓 유형(01: 티켓 / 02: 결재 / 03: 작업 / 04: 의견)
				reqType = "01";
				
				//공통 팝업 ) 티켓 선택 페이지 호출을 위한 데이터 가공
				dataParam = {
					// 데이터 조회 URL
					url : "/req/req1000/req1100/selectReq1000ChgWatReqList.do",
					param : {
						"reqClsType": "01",
					},
					//데이터 테이블 & 팝업 옵션
					option : {
						showBtns : ["reqAccept"],
						submitBtnCd : false, // submit 버튼 표출 유무
					}
				};
			}
			// 보안 정책 탭의 viewAll
			else if(targetId == "#oslChgReqListDiv"){
				//티켓 유형(01: 티켓 / 02: 결재 / 03: 작업 / 04: 의견)
				reqType = "01";
				
				//공통 팝업 ) 티켓 선택 페이지 호출을 위한 데이터 가공
				dataParam = {
					// 데이터 조회 URL
					url : "/req/req1000/req1100/selectReq1100ChargeReqListAjax.do",
					//조회 파라미터
					params : {
						"reqClsType": "01"
						,"paramReqProType": "02"	
					},
					//데이터 테이블 & 팝업 옵션
					option : {
						showBtns : ["reqProcessing"],
						submitBtnCd : false, // submit 버튼 표출 유무
					}
				};
			}
			// 이상징후 탭의 viewAll
			else if(targetId == "#oslChgEvtListDiv"){
				//티켓 유형(01: 티켓 / 02: 결재 / 03: 작업 / 04: 의견)
				reqType = "01";
				
				//공통 팝업 ) 티켓 선택 페이지 호출을 위한 데이터 가공
				dataParam = {
					// 데이터 조회 URL
					url : "/req/req1000/req1100/selectReq1100ChargeReqListAjax.do",
					//조회 파라미터
					params : {
						"reqClsType": "02"
						,"paramReqProType": "02"	
					},
					//데이터 테이블 & 팝업 옵션
					option : {
						showBtns : ["reqProcessing"],
						submitBtnCd : false, // submit 버튼 표출 유무
					}
				};
			}
			// 결재 탭의 viewAll
			else if(targetId == "#oslChgSigListDiv"){
				//티켓 유형(01: 티켓 / 02: 결재 / 03: 작업 / 04: 의견)
				reqType = "02";
				
				//공통 팝업 ) 티켓 선택 페이지 호출을 위한 데이터 가공
				dataParam = {
					// 데이터 조회 URL
					url : "/req/req5000/req5100/selectReq5100UsrSignListAjax.do",
					//조회 파라미터
					params : {
						"targetCd": "01"
						,"usrId": $.osl.user.userInfo.usrId,
					},
					//데이터 테이블 & 팝업 옵션
					option : {
						showBtns : ["signApr", "signRjt"],
						submitBtnCd : false, // submit 버튼 표출 유무
					}
				};
			}
			
			var data = {
				type : "select",
				reqType : reqType,
				currentIdKey : "topMyTicket",
				dataParam : JSON.stringify(dataParam)
			};
			
			var options = {
				idKey: "topMyTicketSelectReqList",
				modalTitle : $.osl.lang("cmm6206.title.main." + data.type),
				closeConfirm: false,
				autoHeight: true,
				modalSize: "xl",
			};
			
			$.osl.layerPopupOpen('/cmm/cmm6000/cmm6200/selectCmm6206View.do',data,options);
		});
		
		//담당 작업 목록 팝업
		$("#oslHeaderUserMenuToggleBtn").on("click", "[name=myPageItem]", function(){
			var targetId = $(this).attr("id");
			
			var dataParam = {};
			
			var reqType = "";
			
			//담당 작업
			if(targetId == "usrWorkListBtn"){
				//티켓 유형(01: 티켓 / 02: 결재 / 03: 작업 / 04: 의견)
				reqType = "03";
				
				//공통 팝업 ) 티켓 선택 페이지 호출을 위한 데이터 가공
				dataParam = {
					// 데이터 조회 URL
					url : "/req/req1000/req1100/selectReq1001ChargerWorkListAjax.do",
					//조회 파라미터
					params : {
						"usrId": $.osl.user.userInfo.usrId
						,"paramWorkStatusCd": "01"
					},
					//데이터 테이블 & 팝업 옵션
					option : {
						showBtns : ["workEnd"],
						submitBtnCd : false, // submit 버튼 표출 유무
					}
				};
			}
			//미답변 의견
			else{
				//티켓 유형(01: 티켓 / 02: 결재 / 03: 작업 / 04: 의견)
				reqType = "04";
				
				//공통 팝업 ) 티켓 선택 페이지 호출을 위한 데이터 가공
				dataParam = {
					// 데이터 조회 URL
					url : "/req/req1000/req1100/selectOpn1000RplOpnListAjax.do",
					//조회 파라미터
					params : {
						"usrId": $.osl.user.userInfo.usrId
					},
					//데이터 테이블 & 팝업 옵션
					option : {
						showBtns : ["opnRpl"],
						submitBtnCd : false, // submit 버튼 표출 유무
					}
				};
			}
			
			var data = {
					type : "select",
					reqType : reqType,
					currentIdKey : "oslTopReqList",
					dataParam : JSON.stringify(dataParam)
			};
			
			var options = {
					idKey: "oslTopReqList",
					modalTitle : $.osl.lang("cmm6206.title.main." + data.type),
					closeConfirm: false,
					autoHeight: true,
					modalSize: "xl",
			};
			
			$.osl.layerPopupOpen('/cmm/cmm6000/cmm6200/selectCmm6206View.do',data,options);
		});
	};
	
	/*********************************
		begin:: 함수 정의 시작
	*********************************/
	
	/**
	* function 명 : fnRctMenuPathDataAjax
	* function 설명 : 최근 5개 메뉴 정보 조회 및 표출 기능
	**/
	var fnRctMenuPathDataAjax = function(){
		//ajax 설정
    	var ajaxObj = new $.osl.ajaxRequestAction(
    			{"url":"<c:url value='/cmm/cmm9000/cmm9000/selectLog1001RctMenuPathListAjax.do'/>"});
    	//ajax 전송 성공 함수
    	ajaxObj.setFnSuccess(function(data){
    		if(data.errorYn == "Y"){
				$.osl.alert(data.message,{type: 'error'});
			}else{
				//최근 5개 메뉴 정보
				var rctMenuPathList = data.rctMenuPathList;
				
				var rctMenuPathStr = '<span class="menu-link disabled cursor-default" data-lang-cd="top1.title.rcntAccess5">'+$.osl.lang("top1.title.rcntAccess5")+'</span>'
								   + '<div class="separator border-gray-200 mb-3"></div>';
								   
				// 최근 5개 메뉴 정보 표출
				$.each(rctMenuPathList, function(idx, item){
					var upupMenuNm = item.upupMenuNm;
					var upMenuNm = item.upMenuNm;
					var menuNm = item.menuNm;
					
					rctMenuPathStr += '<!--begin::Breadcrumb-->'
									+ '<ul class="menu-link breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1" name="oslRctMenuItem" id="'+item.menuId+'" data-menu-url="'+item.menuUrl+'" data-menu-nm="'+item.menuNm+'" data-menu-type="'+item.menuTypeCd+'">'
									+ 	'<!-- 최근 메뉴 경로 표출 -->'
									+ 	'<!--begin::Item-->'
									+ 	'<li class="breadcrumb-item text-muted" title="'+ upupMenuNm +'" alt="'+ upupMenuNm +'" data-title-lang-cd="'+ upupMenuNm +'"><span class="bullet bullet-vertical me-5"></span><span data-lang-cd="">'+ $.osl.escapeHtml(upupMenuNm) +'</span></li>'
									+ 	'<li class="breadcrumb-item"><span class="bullet bg-gray-400 w-5px h-2px"></span></li>'
									+	'<li class="breadcrumb-item text-muted" title="'+ upMenuNm +'" alt="'+ upMenuNm +'" data-title-lang-cd="'+ upMenuNm +'"><span data-lang-cd="">'+ $.osl.escapeHtml(upMenuNm) +'</span></li>'
									+	'<li class="breadcrumb-item"><span class="bullet bg-gray-400 w-5px h-2px"></span></li>'
									+	'<li class="breadcrumb-item text-muted" title="'+ menuNm +'" alt="'+ menuNm +'" data-title-lang-cd="'+ menuNm +'"><span data-lang-cd="">'+ $.osl.escapeHtml(menuNm) +'</span></li>'
									+ 	'<!--end::Item-->'
									+ '</ul>'
									+ '<!--end::Breadcrumb-->';
				});
				
				$("#oslRctMenuList").html(rctMenuPathStr);
			}
    	});
    	ajaxObj.send();
	};
	
	/**
	* function 명 : fnNotificationsCountLoadAjax
	* function 설명 : 미확인 알림 갯수 조회
	**/
	var fnNotificationsCountLoadAjax = function(){
		//TODO 알림
		/* 
		//ajax 설정
		var ajaxObj = new $.osl.ajaxRequestAction(
    			{"url":"/arm/arm1000/arm1100/selectArm1100NtfNotReadCntAjax.do", "loadingShow":false}, {"usrId": $.osl.user.userInfo.usrId});
		//ajax 전송 성공 함수
		ajaxObj.setFnSuccess(function(data){
    		if(data.errorYn == "Y"){
				$.osl.alert(data.message,{type: 'error'});
				//모달 창 닫기
				$.osl.layerPopupClose();
			}else{
				var notRead = data.notRead;
		*/
				var notRead = 0;
				
				//미확인 알림이 있으면
				if(notRead.notReadCnt>0){
					$("#oslTopNotificationsBtn").find(".bullet").removeClass("d-none");
				}else{
					$("#oslTopNotificationsBtn").find(".bullet").addClass("d-none");
				}
				
				//클릭 이벤트 생성
				$("#oslTopNotificationsBtn").off("click").on("click", function(){
					fnNotificationsLoadAjax();
				});
		/*
			}
    	});
		//ajax 전송
    	ajaxObj.send();
		*/
	};
	
	/**
	* function 명 : fnNotificationsLoadAjax
	* function 설명 : 알림 조회
	**/
	var fnNotificationsLoadAjax = function(){
		//미확인 알림을 위한 파람
		var notReadNtfParam = {};
		
		//TODO 알림
		/* 
		//알림 리스트
		var notificationsTable = $.osl.datatable.setting("oslNotificationsTable",{
			cardUiTarget: $("#oslNotificationsCard"),
			data: {
				pageSize: 8,
				source: {
					read: {
						url: "/arm/arm1000/arm1100/selectArm1100NtfListAjax.do",
						params:{
							whkRange: "SYSTEM",
						}
					}
				}
			},
			columns: [
				{field: 'checkbox', title: '#', textAlign: 'center', width: 20, selector: true, sortable: false, autoHide: false},
				//데이터테이블 sort 오류로 임시 추가
				{field: 'ntfId', title: '알림ID', textAlign: 'center', width: 20, autoHide: false}
			],
			actionBtn:{
				"update": false,
				"delete" : false,
			},
			toolbar:{
				//layout: ['pagination'],
				items:{
					pagination:{
						pageSizeSelect : [8 ,10, 20, 30, 50, 100],
						pages:{
							desktop: {
								layout: 'compact',
							},
							tablet: {
								layout: 'compact'
							},
						}
					},
					//info: false
				}
			},
			callback:{
				initComplete: function(evt,config){
					$("#oslNotificationsTable .dataTables_wrapper .table-responsive").removeClass("h-auto").addClass("d-none");
					$("#oslNotificationsCardTable").show();
					
					//알림 조회 타입
					var armTypeMap = {};
					
					//AJAX 설정
			   		var ajaxObj = new $.osl.ajaxRequestAction({"url":"/arm1000/arm1100/arm1100/selectArm1100ArmTypeList.do", "loadingShow": false}, {});

			   		//AJAX 전송 성공 함수
			   		ajaxObj.setFnSuccess(function(data){
			   			if(data.errorYn == "Y"){
			   				$.osl.alert(data.message,{type: 'error'});
			   			}else{
							//알림 타입에 프로젝트 외부연결 및 사용자 외부연결 추가 
					    	var armTypeList = data.armTypeList;
					    	
					    	if(!$.osl.isNull(armTypeList) && armTypeList.length > 0){
					    		$.each(armTypeList, function(idx, map){
					    			$("#oslTopNotificationsArmType").append('<option value="'+map.webhookId+'" data-arm-target-cd="'+map.armTargetCd+'">'+$.osl.escapeHtml(map.webhookNm)+'</option>');
					    		});
					    	}
					    	
					    	//select2 다시 세팅(옵션 추가되기 전에 생성되어 목록은 표출되나 변경 동작이 되지 않아 다시 세팅)
					    	$('#oslTopNotificationsArmType').select2({minimumResultsForSearch: "Infinity"});
			   			}
			   		});
			   		
			   		//AJAX 전송
			   		ajaxObj.send();
			   		
			   		//알림 조회 타입 변경 이벤트
			   		$("#oslTopNotificationsArmType").off("change").on("change", function(){
			   			//변경된 옵션
			   			var selOption = $(this).children("option:selected");
			   			//변경 웹훅 ID 저장
			   			var whkId = selOption.val();
			   			//사용자 알림인지 프로젝트 알림인지
			   			var armTargetCd = selOption.data("arm-target-cd");
			   			
			   			//알림 메시지 파라미터 세팅
			   			$.osl.datatable.list["oslNotificationsTable"].targetDt.setDataSourceParam("whkRange", whkId);
			   			$.osl.datatable.list["oslNotificationsTable"].targetDt.setDataSourceParam("dataRange", armTargetCd);
			   			
			   			//알림 목록 재조회
			   			$.osl.datatable.list["oslNotificationsTable"].targetDt.reload();
			   			
			   			//미확인 알림 세팅을 위한 파라미터 세팅
			   			notReadNtfParam["whkRange"] = whkId;
			   			notReadNtfParam["dataRange"] = armTargetCd;
			   			
						//미확인 알림 확인 처리 ajax 설정
						fnNotificationsCheckAjax(notReadNtfParam);
			   		});
			   		
			   		//알림 버튼 클릭시 재표출
					$("#oslTopNotificationsBtn").off("click").on("click", function(){
						//만들어진 데이터 테이블이 있으면
						if($.osl.datatable.list.hasOwnProperty("oslNotificationsTable")){
							$.osl.datatable.list.oslNotificationsTable.targetDt.reload();
						}
					});
				},
				ajaxDone: function(evt, list){
					//새로운 알림 건수 표출
					var newNtfMsg = $.osl.lang("common.alarm.newAlarm", $.osl.datatable.list.oslNotificationsTable.targetDt.lastResponse.notRead.get);
					$("#oslTopNotificationsNewNtfMsg").html(newNtfMsg);
					
					var ntfStr = '';
					var cardMsg = '';
					$.each(list, function(idx, map){
 						//알림 전송 일시
 						var paramDatetime = new Date(map.sendDtm);
		                var agoTimeStr = $.osl.datetimeAgo(paramDatetime, {fullTime: "d", returnFormat: "yyyy-MM-dd HH:mm:ss"});
		                var chgDtm = agoTimeStr.agoString;
		                
						//알림 유형에 따른 색상 변경
						var cardUi = map.armSendTypeNm;
						//지정 아이콘 없을 경우
						if($.osl.isNull(cardUi)){
							cardUi = 'fa fa-bell';
						}
						//색상
						cardUi += ' bg-success text-inverse-success';
						
						//미확인 알림 백그라운드 색 변경
						var cardStat = '';
						if(map.checkCd=='02'){
							cardStat = 'osl-notifications-info--not-read';
						}
						
						//알림 분류 타입(알림 공개 범위)
						if(map.armTypeCd == '01'){ 
							//프로젝트 그룹 명
							cardMsg = $.osl.lang("common.alarm.type.prjGrp") + $.osl.escapeHtml(map.prjGrpNm);
						}else if(map.armTypeCd == '02'){
							//프로젝트 명
							cardMsg = $.osl.lang("common.alarm.type.prj") + $.osl.escapeHtml(map.prjNm);
						}else if(map.armTypeCd == '03'){
							//권한 그룹 명
							cardMsg = $.osl.lang("common.alarm.type.authGrp") + $.osl.escapeHtml(map.authGrpNm);
						}else if(map.armTypeCd == '04'){
							//사용자 명
							if(!$.osl.isNull(map.sendUsrId)){
								//사용자 명, 사용자 이메일
								cardMsg = $.osl.lang("common.alarm.type.user", $.osl.escapeHtml(map.sendUsrNm), $.osl.escapeHtml(map.sendUsrEmail));
							}else{
								//프로젝트 명
								cardMsg = $.osl.lang("common.alarm.type.prj") + $.osl.escapeHtml(map.prjNm);
							}
						}

						//카드 UI
						ntfStr += '<div class="osl-evt__nofifications-info-item osl-notifications-info p-3 '+cardStat+'" data-send-type="'+map.armSendTypeCd+'" data-class-type="'+map.armClsType+'" data-type="'+map.armTypeCd+'" data-prj-grp-id="'+map.prjGrpId+'" data-prj-id="'+map.prjId+'" data-link-grp-id="'+map.armLnkGrpId+'" data-link-id="'+map.armLnkId+'" data-link-type="'+map.armLnkType+'"  data-link-ord="'+map.armLnkOrd+'">'
										+'<div class="d-flex align-items-center">'
											+'<div class="symbol symbol-50px">'
												+'<div class="symbol-label fs-2 fw-semibold rounded '+cardUi+'"></div>'
											+'</div>'
											+'<div class="ms-5 w-100">'
												+'<div class="fw-bold fs-4">'
													+ $.osl.escapeHtml(map.armTitle)
												+'</div>'
												+'<div class="fs-6">'
													+$.osl.escapeHtml(map.armContent)
												+'</div>'
											+'</div>'
										+'</div>'
										+'<div class="fs-7 osl-pt-5 text-end">'
											+'<i class="fa fa-clock me-2"></i>'
											+chgDtm
										+'</div>'
									+'</div>';
					});
					
					//로드된 데이터 CARD형식으로 추가
					$("#oslNotificationsCardTable").html(ntfStr);
					
					//클릭 이벤트 적용 - 변경 시 osl-widget.js도 수정
					$(".osl-evt__nofifications-info-item").off("click").click(function(){
						//알림 분류
						var armClsType = $(this).data("classType");
						//알림 타입
						var armSendType = $(this).data("sendType");
						//연결 아이디 상위
						var armLnkGrpId = $(this).data("linkGrpId");
						//연결 아이디
						var armLnkId = $(this).data("linkId");
						//알림 대상
						var armType = $(this).data("type");
						//알림 프로젝트 그룹
						var armPrjGrpId = $(this).data("prjGrpId");
						//알림 프로젝트
						var armPrjId = $(this).data("prjId");
						//알림 하위 순번
						var armLnkOrd = $(this).data("linkOrd");
						//알림 열람 분류(ARM00012)
						var armLnkType = $(this).data("linkType");
						
						//armLnkType 값에 따라 열람
						if(!$.osl.isNull(armLnkType)){
							if(armLnkType == "01"){//프로젝트 그룹 생성 관리 화면
								//단일 프로젝트로 진행되기 때문에 관리 메뉴를 만들어주지 않는다. 따라서 관련 내용 주석처리
								//$.osl.goMenu("/prj/prj1000/prj1000/selectPrj1000View.do", "000200010001", "보안 사업 그룹 생성 관리", "02");
							}else if(armLnkType == "02"){//프로젝트 생성 관리 화면
								//단일 프로젝트로 진행되기 때문에 관리 메뉴를 만들어주지 않는다. 따라서 관련 내용 주석처리
								//$.osl.goMenu("/prj/prj1000/prj1100/selectPrj1100View.do", "000200010002", "보안 사업 생성 관리", "02");
							}else if(armLnkType == "03"){//프로젝트 일정 상세 팝업
								//연결 값이 있으면 일정 등록 또는 수정이므로
								var data = {
										type : "view",
										paramPrjId : armPrjId,
										paramPrjEvtId : armLnkId,
										evtType : '02',
								};
								var options = {
										idKey : armLnkId,
										modalTitle: $.osl.lang("prj5001.title.main." + data.type),
										closeConfirm: false,
										autoHeight: false,
										modalSize: 'md'
								};
								$.osl.layerPopupOpen('/prj/prj5000/prj5000/selectPrj5001View.do',data,options);
							}else if(armLnkType == "04"){//프로젝트 일정 관리 화면
								$.osl.goMenu("/prj/prj5000/prj5000/selectPrj5000View.do", "000200020007", "일정 관리", "02");
							}else if(armLnkType == "05"){//요청 요구사항 상세 팝업
								var data = {
										type:"update",
										paramPrjId: armPrjId,
										paramReqId: armLnkId,
										paramReqUsrId: $.osl.user.userInfo.usrId,
										paramReqGrpId: armLnkGrpId,
									};
								var options = {
										idKey: armLnkId,
										//TODO req1002 없음
										modalTitle: $.osl.lang("req1002.title.main"),
										closeConfirm: false,
										autoHeight:false,
										modalSize: 'lg',
										ftScrollUse: false
									};
								$.osl.layerPopupOpen('/req/req1000/req1000/selectReq1002View.do',data,options);
							}else if(armLnkType == "06"){//요구사항 상세 팝업
								var data = {
										paramPrjId: armPrjId,
										paramReqId: armLnkId,
										paramReqUsrId: $.osl.user.userInfo.usrId,
										paramReqGrpId: armLnkGrpId,
									};
								var options = {
										idKey: armLnkId,
										modalTitle: $.osl.lang("cmm6203.title.main.default"),
										closeConfirm: false,
										autoHeight:false,
										modalSize: 'xl',
										ftScrollUse: false
									};
								$.osl.layerPopupOpen('/cmm/cmm6000/cmm6200/selectCmm6203View.do',data,options);
							}else if(armLnkType == "07"){//요구사항 업무처리 팝업
								var data = {
										paramPrjGrpId: armPrjGrpId,
										paramPrjId: armPrjId,
										paramReqId: armLnkId
								};
								var options = {
									modalSize: "fs",
									idKey: "req1000ReqTable",
									modalTitle: $.osl.lang("cmm6201.title.main.default"),
									closeConfirm: false,
								};
								$.osl.layerPopupOpen('/cmm/cmm6000/cmm6200/selectCmm6201View.do',data,options);
							}else if(armLnkType == "08"){//개인정보 수정 팝업
								$("#usrInfoPageBtn").click();
							}else if(armLnkType == "09"){//게시글 삭제 사유 팝업
								var data = {
										menuId : armLnkGrpId,
										badId : armLnkId,
										readOnly : "Y"
									};
								var options = {
										idKey: "bad1004_"+armLnkId,
										modalTitle: $.osl.lang("bad1004.title.main.default"),
										closeConfirm: false,
										autoHeight: true,
									};
								
								$.osl.layerPopupOpen('/bad/bad1000/bad1000/deleteBad1004View.do', data, options);
							}else if(armLnkType == "10"){//메시지 팝업
								var data = {
										armMenuType : "get",
										armId : armLnkId
								};
								var options = {
										idKey: armLnkId,
										modalTitle: $.osl.lang("arm1002.title.main.default"),
										closeConfirm: true,
										autoHeight:false,
										ftScrollUse: false,
								};
								
								$.osl.layerPopupOpen('/arm/arm1000/arm1000/selectArm1002View.do',data,options);
							}else if(armLnkType == "11"){//연장/회수 목록 팝업
								var data = {
										type : "self",
									};
								var options = {
										idKey: "selfReqXtnList",
										modalTitle: $.osl.lang("cmm6212.title.main.default"),
										modalSize : "xl",
										autoHeight:false,
										closeConfirm: false
									};
								
								$.osl.layerPopupOpen('/cmm/cmm6000/cmm6200/selectCmm6212View.do',data,options);
							}else if(armLnkType == "12"){//정보자산 상세 팝업
								var data = {
										cfgRutId : armLnkId
								};
								var options = {
										idKey : "cps1002CpsDetail", //osl-template.js 일치
										modalTitle:  $.osl.lang("cps1000.title.main.detail"),
										autoHeight:false,
										closeConfirm: false,
										modalSize: "fs",
								};
								$.osl.layerPopupOpen('/cps/cps1000/cps1000/selectCps1002View.do',data,options);
							}else if(armLnkType == "13"){//소명 상세 팝업
								var data = {
										type : "detail",
										paramPrjGrpId: armPrjGrpId,
										paramPrjId: armPrjId,
										paramEptId: armLnkId,
										paramOrd: armLnkOrd
								};
								var options = {
										idKey : armLnkId+armLnkOrd,
										autoHeight: false,
										modalTitle: $.osl.lang("req4002.title.main.default"),
										closeConfirm: false,
										modalSize: 'fs',
										fitScreen:false,
								};
								$.osl.layerPopupOpen('/req/req4000/req4000/selectReq4002View.do',data,options);
							}
						}
					});
					
					//알림 창이 오픈되었으므로 알림 확인 처리
					var data = {
							whkRange : $("#oslTopNotificationsArmType").val(),
							dataRange : "02"
					};
					fnNotificationsCheckAjax(data);
				}
			}
		});
		*/
	}; //fnNotificationsLoadAjax 끝
	
	/**
	* function 명 : fnNotificationsCheckAjax
	* function 설명 : 알림 확인 처리
	* parameter data : 전달 값
	**/
	var fnNotificationsCheckAjax = function(data){
		//TODO 알림
		/* 
		//미확인 알림 확인 처리 ajax 설정
		var ajaxObj = new $.osl.ajaxRequestAction({"url":"/arm/arm1000/arm1100/insertArm1101NtfInfoAjax.do" , "loadingShow": false}
				,data);
		//ajax 전송 성공 함수
		ajaxObj.setFnSuccess(function(data){
    		if(data.errorYn == "Y"){
				$.osl.alert(data.message,{type: 'error'});
			}
    	});
		//미확인 알림 확인 처리 ajax 전송
		ajaxObj.send();
		 */
	};
	
	/**
	* function 명 : fnMessageLoadAjax
	* function 설명 : 미확인 메시지 갯수 조회
	**/
	var fnMessageLoadAjax = function(){
		//ajax 설정
		var ajaxObj = new $.osl.ajaxRequestAction(
    			{"url":"/arm/arm1000/arm1000/selectArm1000AlarmNotReadCntAjax.do", "loadingShow":false}, {"alramYn": "Y"});
		//ajax 전송 성공 함수
		ajaxObj.setFnSuccess(function(data){
    		if(data.errorYn == "Y"){
				$.osl.alert(data.message,{type: 'error'});
				//모달 창 닫기
				$.osl.layerPopupClose();
			}else{
				var notRead = data.notRead;
				//미확인 메시지가 있으면
				if(notRead.get>0){
					$("#oslTopMessageBtn").find(".bullet").removeClass("d-none");
				}else{
					$("#oslTopMessageBtn").find(".bullet").addClass("d-none");
				}
				
				//클릭 이벤트 생성
				$("#oslTopMessageBtn").off("click").on("click", function(){
					$.osl.layerPopupOpen('/arm/arm1000/arm1000/selectArm1000View.do', null
							,{
								idKey:'message'
								, modalSize:'xl'
								, modalTitle:$.osl.lang("arm1000.title.main.default")
								,autoHeight: false
							}
					);
				});
			}
    	});
		//ajax 전송
    	ajaxObj.send();
	};
	
	/**
	* function 명 : fnNtcPopupAjax
	* function 설명 : 공지 팝업 표출, 전체 닫기 이벤트, z-index 처리 이벤트 생성 
	**/
	var fnNtcPopupAjax = function(){
		//ajax 설정
		var ajaxObj = new $.osl.ajaxRequestAction(
    			{"url":"/bad/bad1000/bad1000/selectBad1000NoticePopupListAjax.do", "loadingShow":false},);
		
		//ajax 전송 성공 함수
		ajaxObj.setFnSuccess(function(data){
    		if(data.errorYn == "Y"){
				$.osl.alert(data.message,{type: 'error'});
			}else{
				//공지팝업 list 가지고 오기
				var ntcPopupList = data.ntcPopupList;
				
				//오늘하루 그만보기 안한 공지팝업 목록 추출
				var selNoticeList = ntcPopupList.filter(function(ntcPopup) {
				    return !$.osl.user.isCookie(usrId + ntcPopup.badId + ntcPopup.menuId);  // 조건을 만족하는 항목 제외
				});
				
				//추출된 공지팝업 데이터가 있는 경우 팝업 표출
				if(!$.osl.isNull(selNoticeList)) {
					//공지팝업들의 z-index 중 가장 큰 값
					var lastZIndex = 130;
					
					//공지팝업 개수
					var selNoticeListCnt = selNoticeList.length;
					
					//마스크를 먼저 씌움
					$('body').prepend('<div id="noticePopupMask" class="modal-backdrop show modal-stack" style="z-index: 119;"></div>');
					//공지 팝업창이 담기는 영역
					$('body').prepend('<div id="noticePopupParent" class="modal show" style="display:block; z-index: '+lastZIndex+'"></div>');
					
					//공지팝업 표출 -> data list 넘겨서 JSON parser 처리하고 표출(해당 팝업은 ajax 비동기 false 처리, 팝업 형식은 ITGC처럼 갈 것)
					$.each(selNoticeList, function(idx, map){
						//modal id 생성
						var modalId = map.badId + map.menuId;
						
						//전달할 공지팝업 정보 넘기기
						var data = {'modalId' : modalId, 'noticeInfo' : JSON.stringify(map)};
						
						//AJAX 설정
						var ajaxObj = new $.osl.ajaxRequestAction(
								{"url":"<c:url value='/bad/bad1000/bad1000/selectBad1006View.do'/>", "async":"false"}
								, data);
						
						//AJAX 전송 성공 함수
						ajaxObj.setFnSuccess(function(data){
							if(data.errorYn != "Y"){
								//화면에 그리기
								$('#noticePopupParent').prepend('<div id="'+ modalId +'" class="osl-evt__cntNtcModalPopup modal-content modal-dialog modal-l position-absolute" role="document">'+data+'</div>');
								
								//z-index처리
								$("#" + modalId).css('z-index', ++lastZIndex);
								
								//팝업이 1개일 때
								if(selNoticeListCnt == 1){
									$("#" + modalId).removeClass('position-absolute');
								}
								//팝업이 여러개일 때
								else {
									//해당 팝업이 위치 지정
									var locationInfo = fnSetNoticePopupLocate(idx, selNoticeListCnt);
									//css 적용
									$("#" + modalId).css({ top: locationInfo.top, left: locationInfo.left });
								}
								
								//함수 동작 시키기 <- .ready 후 동작 시, 동일한 jsp여서 변수가 덮임 처리되는 현상 방지 목적
								OSLBad1006Popup.init();
								
								//공지팝업 클릭 시 z-index 올려주기
								$("#" + modalId).click(function(event) {
									$("#" + modalId).css('z-index', ++lastZIndex);
								});
							}
						});
						
						//AJAX 전송
						ajaxObj.send();
					})
				}
				//esc 이벤트
				$('body').off('keydown').on('keydown', function(e) {
					if(event.keycode == 27 || event.which == 27) {
						$.osl.confirm($.osl.lang("bad1006.message.confirm.closeAllNoticePopup"),{"html" : true}, function(result) {
							if (result.value) {
								//공지팝업들을 가지는 부모 요소 지우기
								$('#noticePopupParent').remove();
								//공지팝업 mask 지우기
								$('#noticePopupMask').remove();
								//ESC 키 이벤트 제거
								$('body').off('keydown');
							}
						})
					}
				});
				
				//공지팝업 외 영역 클릭 시 이벤트
				$('#noticePopupParent').click(function(event) {
					// 클릭된 대상이 팝업 내부가 아니라면
					if (!$(event.target).closest('.osl-evt__cntNtcModalPopup').length) {
						$.osl.confirm($.osl.lang("bad1006.message.confirm.closeAllNoticePopup"),{"html" : true}, function(result) {
							if (result.value) {
								//공지팝업들을 가지는 부모 요소 지우기
								$('#noticePopupParent').remove();
								//공지팝업 mask 지우기
								$('#noticePopupMask').remove();
								//ESC 키 이벤트 제거
								$('body').off('keydown');
								//클릭 이벤트 제거
								$('#noticePopupParent').off('click');
							}
						})
					}
				});
			}
    	});
		
		//ajax 전송
    	ajaxObj.send();
	};
	
	/**
	 * function 명 : fnSetNoticePopupLocate
	 * function 설명 : 여러개의 윈도우 팝업이 표출 될 경우 계단식으로 내려온다.
	 * @params seq : 현재 팝업 순번
	 * @params popupCnt : 전체 팝업 개수
	 */
	function fnSetNoticePopupLocate(seq, popupCnt) {
		// 기본 위치가 담긴 정보, 초기값은 0으로 둔다.
		var locationInfo = {
				'top' : 20,
				'left' : 0,
		}
		
		/* 별도로 팝업창이 1 ~ 4 개일 경우 브라우저에서 다 표출 될 수 있도록 수행 */
 			
		// 250 : 팝업창 가로 width의 절반 
		var popupHalfWidth = 250;
		
		// 팝업창이 1개에서 3개일 경우 width 가운데 정렬
		if (popupCnt < 4) {
			//각 팝업이 이동해야되는 거리 구하기
			var moveLeftPx = (Math.floor(window.screen.width / popupCnt) - popupHalfWidth * 2) / 2;
			//팝업이 실제 위치해야하는 길이 구하기
			setLeft = Math.floor(window.screen.width / popupCnt) * seq + moveLeftPx;
			
		} 
		// 팝업창이 4개일 경우 가운데 정렬 (if문의 방식대로 동일하게하면 화면 밖으로 나와서 간격을 더 줄여서 위치시킴)
		else if (popupCnt == 4) {
			// 화면을 8등분하고 1,3,5,7 영역에 팝업창을 위치시킨다.
			setLeft = (Math.floor(window.screen.width / 8) * (2 * seq + 1) - popupHalfWidth);
			
		}
		// 그외의 모든 팝업 개수
		else {
			/* 공지사항 팝업 개수에 따라 동적으로 가로, 세로 위치를 지정하기 위한 기본 세팅 정보 */

			// 공지사항 팝업창 표출 위치 기준이 되는 가로 길이, 팝업창이 브라우저 화면 밖으로 나가지 않게 하기 위해서  브라우저 가로 길이의 2/3 까지만 사용한다.
			var screenWidth = window.screen.width - (window.screen.width / 3);
			
			// 공지사항 팝업창 표출 위치 기준이 되는 세로 길이, 팝업창이 브라우저 화면 밖으로 나가지 않게 하기 위해서  브라우저 세로 길이의 1/3 까지만 사용한다.
			var screenHeight = window.screen.height / 3;
			
			// 팝업창이 5개 이상부터 묶음 단위로 표출이 되는데 묶음 기준을 지정한다.
			var popupCntInOneGroup = 5;
			
			// 가로 길이에 최대로 들어갈 수 있는 그룹의 개수
			var maxGroupCntInWidth = 6;
			
			// 가로 한줄에 최대 팝업창 개수
			var maxPopupCntInOneRow = popupCntInOneGroup * maxGroupCntInWidth;
			
			// 총 생성되는 세로열의 개수
			var groupRowCnt = Math.round(popupCnt / maxPopupCntInOneRow);
			
			// 총 생성되는 그룹의 개수
			var totalGroupCnt = Math.round(popupCnt / popupCntInOneGroup);

			// 총 생성되는 그룹의 개수가 4그룹 미만일 경우, 임의로 3개의 그룹이 있다고 가정한다. (표출하는 로직에서 그룹간의 간격이 너무 벌어지기 때문에 최소값으로 3그룹이 있다고 가정)
			if (totalGroupCnt < 4) {
				totalGroupCnt = 3;
 			}
				
			// 동적으로 설정되는 left 간격
 			var moveWidth = 0;
 			
 			// 그룹 count가 maxGroupCntInWidth개가 넘어갈 경우 width를 나누는 것을 최대를 maxGroupCntInWidth로 잡는다.
 			if (totalGroupCnt > maxGroupCntInWidth) {
	 			moveWidth = screenWidth / maxGroupCntInWidth;
 			} 
 			// 이외의 그룹카운트는 totalGroupCnt 로 screenWidth를 나눈다.
 			else {
 				moveWidth = screenWidth / totalGroupCnt;
 			}
 			
 			// 동적으로 설정되는 top 간격
 			var moveHeight = 0;
 			
 			// 총 생성되는 세로열의 개수가 0 이상일 경우 생성되는 동적 top 간격을 계산한다.
 			if (groupRowCnt > 0) {
 				moveHeight = screenHeight / groupRowCnt;
 			}
  			
 			// 상단으로 부터 떨어지는 간격 : row 별 간격 + 그룹내 계단식 간격
 			var setTop = (50 + moveHeight * Math.floor(seq / maxPopupCntInOneRow)) + (60 * (seq % popupCntInOneGroup));
 			
 			// 하나의 row에서 다음 row로 넘어가기 위해서 seq를 계산 
			seq = seq - (maxPopupCntInOneRow * Math.floor(seq / maxPopupCntInOneRow));
			
 			// 상단으로 부터 떨어지는 간격 : 그룹간 간격 + 그룹내 계단식 간격
 			var setLeft = (50 + moveWidth * Math.floor(seq / popupCntInOneGroup)) + (15 * (seq % popupCntInOneGroup));
		}
		
		/* 최종 세팅된 팝업 위치 정보를 locationInfo에 담는다. */
		// setTop가 정상적인 number로 정의되었을 경우 값을 변경한다.
		if (typeof setTop === 'number') {
  			locationInfo.top = setTop;
		}
		
		// setLeft가 정상적인 number로 정의되었을 경우 값을 변경한다.
		if (typeof setLeft === 'number') {
  			locationInfo.left = setLeft;
		}
 			
		// 위치에 관한 정보를 반환한다.
		return locationInfo;
	}
	
	/**
	* function 명 : fnChgReqDataAjax
	* function 설명 : 담당 티켓 데이터 조회
	**/
	var fnChgReqDataAjax = function(){
		//TODO => 사용자가 표출 갯수 선택 가능하도록 수정 예정
		var lastIndex = "5";
		
		//ajax 설정
    	var ajaxObj = new $.osl.ajaxRequestAction(
    			{"url":"<c:url value='/cmm/cmm9000/cmm9000/selectReq1000DataAjax.do'/>"},
    			{"lastIndex": lastIndex}
    		);
    	//ajax 전송 성공 함수
    	ajaxObj.setFnSuccess(function(data){
    		if(data.errorYn == "Y"){
				$.osl.alert(data.message,{type: 'error'});
			}else{
				//사용자 접수권한 여부
				usrAuthSet = data.usrAuthSet;
				
				var myTicketTabListMap = {};
				
				// 담당 결재 정보
				myTicketTabListMap["chgSigList"] = data.chgSigList;
				var chgSigCnt = data.chgSigCnt;
				//999개를 초과했을 경우 '+999'로 표출
				chgSigCnt = chgSigCnt < 1000 ? chgSigCnt : '+999';
				
				// 사용자가 요청한 보안 행정 티켓 목록
				myTicketTabListMap["usrReqList"] = data.usrReqList;
				var usrReqCnt = data.usrReqCnt;
				//999개를 초과했을 경우 '+999'로 표출
				usrReqCnt = usrReqCnt < 1000 ? usrReqCnt : '+999';
				
				//접수 권한이 있다면,
				if(usrAuthSet.authAcceptChk){
					// 접수 대기 목록
					myTicketTabListMap["usrReqWatList"] = data.watReqList;
					var usrReqWatCnt = data.watReqCnt;
					//접수 대기 목록이 999개를 초과했을 경우 '+999'로 표출
					usrReqWatCnt = usrReqWatCnt < 1000 ? usrReqWatCnt : '+999';
				}
				
				//업무 처리 권한이 있다면,
				if(usrAuthSet.authPrograssChk){
					// 담당 보안 행정 정보
					myTicketTabListMap["chgReqList"] = data.chgReqList;
					var chgReqCnt = data.chgReqCnt;
					//요구사항이 999개를 초과했을 경우 '+999'로 표출
					chgReqCnt = chgReqCnt < 1000 ? chgReqCnt : '+999';
					
					// 이벤트 요구사항 정보
					myTicketTabListMap["chgEvtReqList"] = data.chgEvtReqList;
					var chgEvtReqCnt = data.chgEvtReqCnt;
					//요구사항이 999개를 초과했을 경우 '+999'로 표출
					chgEvtReqCnt = chgEvtReqCnt < 1000 ? chgEvtReqCnt : '+999';
				}
				
				//영역 비우기
				$("[name='oslChgListDiv']").empty();
				
				$.each(myTicketTabListMap, function(key,map){
					//티켓 정보 표출할 tab ID
					var targetId;
					//탭별 표출 색
					var color;
					
					//결재 탭
					if(key == "chgSigList"){
						targetId = "oslChgSigListDiv";
						color = "success";
						
						//결재 탭에 갯수 추가
						$("#oslChgSigCnt").text(chgSigCnt);
					}
					//사용자 요청 보안 행정 티켓 탭
					else if(key == "usrReqList"){
						targetId = "oslUsrReqListDiv";
						color = "warning";
						
						//결재 탭에 갯수 추가
						$("#oslChgUsrCnt").text(usrReqCnt);
					}
					//접수 대기 탭
					else if(key == "usrReqWatList"){
						targetId = "oslWatReqListDiv";
						color = "info";
						
						//접수 대기 탭에 갯수 추가
						$("#oslWatReqCnt").text(usrReqWatCnt);
					}
					//보안 행정 탭
					else if(key == "chgReqList"){
						// 일반 탭에 표출
						targetId = "oslChgReqListDiv";
						color = "primary";
						
						//보안행정 탭에 갯수 추가
						$("#oslChgReqCnt").text(chgReqCnt);
					}
					//이상징후 탭
					else if(key == "chgEvtReqList"){
						// 이벤트 탭에 표출
						targetId = "oslChgEvtListDiv";
						color = "navy";
						
						//이상징후 탭에 갯수 추가
						$("#oslChgEvtCnt").text(chgEvtReqCnt);
					}
					
					$.each(map, function(idx, item){
						//티켓 하단 내용str
						var subStr = '<div class="text-gray-400 fs-7 h-20px">'
									+ 	'<span class="osl-word__break w-auto mw-40">'+ $.osl.escapeHtml(item.processNm) +'</span>'
									+ 	'<span class="osl-word__break w-auto mw-50"><i class="fa-solid fa-caret-right text-gray-400"></i>'+ $.osl.escapeHtml(item.flowNm) +'</span>'
									+ '</div>';

						//신청서등록일 기본값
						var dataDtm = $.osl.escapeHtml(item.reqDtm);
						//표출 명
						var targetNm = $.osl.escapeHtml(item.reqId);
						
						//접수 대기
						if(key == "usrReqWatList"){
							// 접수 대기는 '프로세스명/단계명' => '요구사항 타입/요청자명(요청자 이메일)'로 변경하여 표출
							subStr = '<div class="text-gray-400 fs-7 h-20px">'
									+ '<span class="osl-word__break w-auto mw-40">'+ $.osl.escapeHtml(item.reqClsTypeNm) +'</span>'
									+ '<span class="osl-word__break w-auto mw-50"> <i class="fa-solid fa-caret-right text-gray-400"></i> '+ $.osl.escapeHtml(item.reqUsrNm) +'('+ $.osl.escapeHtml(item.reqUsrEmail) +')</span>'
									+ '</div>'
						}
						//사용자 요청 보안 행정 티켓
						else if(key== "usrReqList"){
							// 접수 대기는 '프로세스명/단계명' => '요구사항 처리 유형/처리자명(처리자 이메일)'로 변경하여 표출
							subStr = '<div class="text-gray-400 fs-7 h-20px">'
									+ '<span class="osl-word__break w-auto mw-40">'+ $.osl.escapeHtml(item.reqProTypeNm) +'</span>';
							if(item.reqProType != "01" && item.reqProType != "03"){
								subStr += '<span class="osl-word__break w-auto mw-50"> <i class="fa-solid fa-caret-right text-gray-400"></i> '+ $.osl.escapeHtml(item.reqChargerNm) +'('+ $.osl.escapeHtml(item.reqChargerEmail) +')</span>';
							} 
							subStr += '</div>';
						}
						//담당 결재
						else if(key == "chgSigList") {
							// 담당 결재는 '프로세스명/단계명' => '결재 대상 유형(CMM00009)/결재 요청자(email)'로 변경하여 표출
							subStr = '<div class="text-gray-400 fs-7 h-20px">'
									+ '<span class="osl-word__break w-auto mw-40">'+ $.osl.escapeHtml(item.targetCdNm) +'</span>'
									+ '<span class="osl-word__break w-auto mw-50"> <i class="fa-solid fa-caret-right text-gray-400"></i> '+ $.osl.escapeHtml(item.signDrfUsrNm) +'('+ $.osl.escapeHtml(item.signDrfUsrEmail) +')</span>'
									+ '</div>'
							
							dataDtm = $.osl.escapeHtml(item.signDtm);
							
							targetNm = $.osl.escapeHtml(item.targetNm);
						}
						
						//데이터 날짜 세팅
						var paramDateTime = new Date(dataDtm);
		                var agoTimeStr = $.osl.datetimeAgo(dataDtm, {fullTime: "d", returnFormat: "yyyy-MM-dd"});
		                dataDtm = agoTimeStr.agoString;
						
						var chgReqStr = '<!--begin::Item 예시-->'
									  + '<div class="btn btn-outline btn-outline-dashed osl-btn-outline-transparent osl-btn-outline-hover-'+ color +' d-block py-2 px-2" name="chgListItem"'
									  +   'data-prj-id="'+ item.prjId +'" data-req-id="'+ item.reqId +'" data-req-usr-id="'+ item.reqUsrId +'" data-req-pro-type="'+ item.reqProType +'"' 
									  +	  'data-process-id="'+ item.processId +'" data-process-nm="'+ item.processNm +'" data-tpl-id="'+ item.tplId +'" data-tpl-connection-process-id="'+ item.tplConnectionProcessId +'" data-tpl-connection-process-nm="'+ item.tplConnectionProcessNm +'">'
									  +		'<!--begin::Section-->'
									  +		'<div class="d-flex align-items-center">'
									  +			'<!--begin::Symbol-->'
									  +			'<div class="symbol symbol-40px me-4">'
									  +				'<span class="symbol-label bg-light-'+ color +'">'
									  +					'<!--begin::Svg Icon | path: icons/duotune/technology/teh008.svg-->'
									  +					'<i class="fas fa-external-link-alt text-'+ color +' osl-p-2"></i>'
									  +					'<!--end::Svg Icon-->'
									  +				'</span>'
									  +			'</div>'
									  +			'<!--end::Symbol-->'
									  +			'<!--begin::Title-->'
									  +			'<div class="osl-w-calc--60px mb-0 me-2 text-start">'
									  +				'<div class="h-25px">'
									  +					'<a href="javascript:void(0);" class="fs-6 text-gray-800 fw-bold w-75 osl-word__break osl-evt-req-nm">'+ targetNm +'</a>'
									  +					'<span class="badge badge-light opacity-75 fs-8 float-end">'+ dataDtm +'</span>'
									  +				'</div>'
									  +			subStr	
									  +			'</div>'
									  +			'<!--end::Title-->'
									  +		'</div>'
									  +		'<!--end::Section-->'
									  +	'</div>'
									  + '<!--end::Item 예시-->';
									  
						$("#"+targetId).append(chgReqStr);
					});
				});
				
				if(!usrAuthSet.authAcceptChk){
					//접수 대기 탭 숨기기
					$("#oslTopMyTicketWatReqTab").addClass("d-none");
				}
				
				if(!usrAuthSet.authPrograssChk){
					//이상징후 탭 숨기기
					$("#oslTopMyTicketChgEvtReqTab").addClass("d-none");
					//요청 보안정책 탭 숨기기
					$("#oslTopMyTicketChgReqTab").addClass("d-none");
				}
				
				//탭 컨텐츠 영역
				var chgListDivList = $("[name=oslChgListDiv]");
				
				//탭별 컨텐츠 영역에 요구사항 존재하는지 확인
				$.each(chgListDivList, function(idx,item){
					//탭별 컨텐츠 영역의 요구사항 갯수
					var chgListItemCnt = $(item).find("[name=chgListItem]").length;
					
					//요구사항이 없을 경우,
					if(chgListItemCnt == 0){
						// 요구사항 표출 영역 숨김
						$(item).hide();
						// no-data 표출
						$(item).next("[name=oslChgNoListDiv]").show();
					}
					//요구사항이 있을 경우,
					else{
						//no-data 숨김
						$(item).next("[name=oslChgNoListDiv]").hide();
					}
				});
			}
    	});
    	ajaxObj.send();
	}
	
	/**
	* function 명 : fnSetReqDataCnt
	* function 설명 : 마이페이지 팝업 내 담당 업무 & 미답변 의견 갯수 세팅
	**/
	var fnSetReqDataCnt = function(){
		//ajax 설정
    	var ajaxObj = new $.osl.ajaxRequestAction(
    			{"url":"<c:url value='/cmm/cmm9000/cmm9000/selectReqCntDataListAjax.do'/>"});
    	//ajax 전송 성공 함수
    	ajaxObj.setFnSuccess(function(data){
    		if(data.errorYn == "Y"){
				$.osl.alert(data.message,{type: 'error'});
			}else{
				var workCnt = data.usrWorkCnt;
				var opnCnt = data.usrRplOpnCnt;
				
				//담당적업/미답변 의견이 999초과일 경우, +999로 고정 표출
				workCnt = workCnt < 1000 ? workCnt : '+999'; 
				opnCnt = opnCnt < 1000 ? opnCnt : '+999'; 
				
				$("#oslWorkCnt").html(workCnt);
				$("#oslOpnCnt").html(opnCnt);
			}
    	});
    	ajaxObj.send();
	};
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
	OSLTop.init();
});
</script>

				<!--TOP 제외 영역 시작-->
				<!--begin::Wrapper-->
				<div class="app-wrapper flex-column flex-row-fluid" id="kt_app_wrapper">