
/**
 * KTDatatable 관련 function 이 제거됨에 따라
 * 필요 Datatable 형태로 가공하는 function 생성
 * 
 * @since 2022.09.06
 * @author 안지혜
 */
var OSLDatatableSetting = function () {
	var pfx = 'osl-';
	
	// 숫자 범위 검색 조건 사용 비교 연산자 명칭
	var compareValList = {
		"number": {
			"more":{"text":"이상", "operator":"&gt;="}
			,"less":{"text":"이하", "operator":"&lt;="}
			,"over":{"text":"초과", "operator":"&gt;"}
			,"under":{"text":"미만", "operator":"&lt;"}
			,"equal":{"text":"동일 값", "operator":"="}
			,"notEqual":{"text":"동일하지 않은 값", "operator":"!="}
		}
		,"numberRange": {
			"more":{"text":"이상", "operator":"&gt;=", "selectTarget":"start"}
			,"less":{"text":"이하", "operator":"&lt;=", "selectTarget":"end"}
			,"over":{"text":"초과", "operator":"&gt;"}
			,"under":{"text":"미만", "operator":"&lt;"}
		}
	};
	
	/**
	 * function 명 : datatableSetting
	 *  function 설명	: targetId div에 datatable를 생성한다.
	 *  @param targetId: datatable 생성 타겟 요소 ID (# 제외) 
	 *  @param config: datatable 설정 값
	 */
	var datatableSetting = function(targetId, config){
		//id값 없는 경우 skip
		if($.osl.isNull(targetId)){
			return true;
		}
		
		//내부에서 추가된 datatable 객체
		var datatables = {};
		var datatable = this;
		
		// global variables
		//데이터 테이블 기본 데이터 셋팅
		var datatablePlugin = {
				stateId: 'meta',
				id: targetId,
				dataSet:[],
				originalDataSet:[],
				API:{
					record:null,
					value:null,
					params:null,
				},
				layout: {
					icons: {
						pagination: {
							next: 'flaticon2-next',
							prev: 'flaticon2-back',
							first: 'flaticon2-fast-back',
							last: 'flaticon2-fast-next',
							more: 'fas fa-ellipsis-v',
						},
						rowDetail: {expand: 'fa fa-caret-down', collapse: 'fa fa-caret-right'},
					}
				},
				//데이터 테이블 리로드
				reload: function(resetPaging){
					//페이지 초기화 여부
					if($.osl.isNull(resetPaging)) {
						resetPaging = true;
					}
					
					var dataSrc = datatable.list[targetId].config.dataType;
					if(dataSrc == "remote") {
						//검색 조건 파라미터로 추가
						var searchTarget = $(".osl-evt__datatable-search__dropdown-btn[data-datatable-id='"+targetId+"'] ~ .osl-evt__datatable-search__dropdown .osl-evt__datatable-search--menu-item.active");
						var searchTargetId = searchTarget.data("field-id");
						var searchTargetType = searchTarget.data("opt-type");
						var searchValue = null;
						if(searchTargetType == "-1"){
							//기존 검색 key 제거
						}else if(searchTargetType == "select"){
							searchValue = $(".osl-evt__datatable-search__dropdown-btn[data-datatable-id='"+targetId+"'] ~ .osl-evt__datatable-search--select").val();
							if(!$.osl.isNull(searchValue)){
								datatable.list[targetId].targetDt.setDataSourceParam("searchTargetId", searchTargetId);
								datatable.list[targetId].targetDt.setDataSourceParam("searchTargetType", searchTargetType);
								datatable.list[targetId].targetDt.setDataSourceParam("searchTargetData", searchValue);
							}
						}else if(searchTargetType == "text") {
							searchValue = $.osl.escapeHtml($(".osl-evt__datatable-search--input-text[data-datatable-id='"+targetId+"']").val());
							if(!$.osl.isNull(searchValue)){
								datatable.list[targetId].targetDt.setDataSourceParam("searchTargetId", searchTargetId);
								datatable.list[targetId].targetDt.setDataSourceParam("searchTargetType", searchTargetType);
								datatable.list[targetId].targetDt.setDataSourceParam("searchTargetData", searchValue);
							}
						}else{
							//date 관련
							var searchStartDt = $(".osl-evt__datatable-search--input-start-date[data-datatable-id='"+targetId+"']").val();
							var searchEndDt = $(".osl-evt__datatable-search--input-end-date[data-datatable-id='"+targetId+"']").val();
							if(!$.osl.isNull(searchStartDt)){
								datatable.list[targetId].targetDt.setDataSourceParam("searchTargetId", searchTargetId);
								datatable.list[targetId].targetDt.setDataSourceParam("searchTargetType", searchTargetType);
								datatable.list[targetId].targetDt.setDataSourceParam("searchStartDt", searchStartDt);
							}
							if(!$.osl.isNull(searchEndDt)){
								datatable.list[targetId].targetDt.setDataSourceParam("searchTargetId", searchTargetId);
								datatable.list[targetId].targetDt.setDataSourceParam("searchTargetType", searchTargetType);
								datatable.list[targetId].targetDt.setDataSourceParam("searchEndDt", searchEndDt);
							}
						}
						
						//조회
						datatable.list[targetId].targetDt.clear();
						datatable.list[targetId].targetDt.ajax.reload(null, resetPaging);
					}else if(dataSrc == "local") {
						var addRow = datatable.list[targetId].targetDt.dataSet || [];
						datatable.list[targetId].targetDt.clear().rows.add(addRow).draw(resetPaging);
					}
				},
				/**
				 * Get default sort column
				 */
				getDefaultSortColumn: function() {
					var result;
					$.each(options.columns, function(i, column) {
						if (typeof column.sortable !== 'undefined'
							&& $.inArray(column.sortable, ['asc', 'desc']) !== -1) {
							result = {sort: column.sortable, field: column.field};
							return false;
						}
					});
					return result;
				},
				//파라미터 변경
				setDataSourceParam: function(param, value, reset){
					if(datatable.list[targetId].config.dataType != "local") {
						datatable.list[targetId].config.ajax.data({[param]: value}, reset);
					}
				},
				//선택된 레코드 조회
				getSelectedRecords: function(){
					datatable.list[targetId].targetDt.API.record = datatable.list[targetId].targetDt.rows({selected:true});
					return datatable.list[targetId].targetDt.API.record;
				},
				/**
				 * Keep state item
				 * @param key
				 * @param value
				 */
				stateKeep: function(key, value) {
					key = datatablePlugin.getTablePrefix(key);
					if (datatablePlugin.getOption('ajax.data.saveState') === false) return;
					if (datatablePlugin.getOption('ajax.data.saveState.webstorage') && localStorage) {
						localStorage.setItem(key, JSON.stringify(value));
					}
					if (datatablePlugin.getOption('ajax.data.saveState.cookie')) {
						Cookies.set(key, JSON.stringify(value));
					}
				},
				/**
				 * Get state item
				 * @param key
				 * @param defValue
				 */
				stateGet: function(key, defValue) {
					key = datatablePlugin.getTablePrefix(key);
					if (datatablePlugin.getOption('ajax.data.saveState') === false) return;
					var value = null;
					if (datatablePlugin.getOption('ajax.data.saveState.webstorage') && localStorage) {
						value = localStorage.getItem(key);
					} else {
						value = Cookies.get(key);
					}
					if (typeof value !== 'undefined' && value !== null) {
						return JSON.parse(value);
					}
				},
				/**
				 * Get table prefix with depth number
				 */
				getTablePrefix: function(suffix) {
					if (typeof suffix !== 'undefined') suffix = '-' + suffix;
					return datatablePlugin.getTableId() + '-' + datatablePlugin.getDepth() + suffix;
				},
				/**
				 * Get current table depth of sub table
				 * @returns {number}
				 */
				getDepth: function() {
					var depth = 0;
					var table = datatable.list[targetId].targetDt.table();
					do {
						table = $(table).parents('.' + pfx + 'datatable__table');
						depth++;
					} while ($(table).length > 0);
					return depth;
				},
				/**
				 * Get column options by field
				 * @param field
				 * @returns {boolean}
				 */
				getColumnByField: function(field) {
					if (typeof field === 'undefined') return;
					var options= datatable.list[targetId].config;
					var result;
					$.each(options.columns, function(i, column) {
						if (field === column.fieldId) {
							result = column;
							return false;
						}
					});
					return result;
				},
				/**
				 * Get table unique ID
				 * Note: table unique change each time refreshed
				 * @param suffix
				 * @returns {*}
				 */
				getTableId: function(suffix) {
					/*
					if (typeof suffix === 'undefined') suffix = '';
					var id = $(datatable.list[targetId].targetDt).attr('id');
					if (typeof id === 'undefined') {
						id = $(datatable.list[targetId].targetDt).attr('class').split(' ')[0];
					}
					*/
					if (typeof suffix === 'undefined') suffix = '';
					var id = datatable.list[targetId].targetDt.id;
					if (typeof id === 'undefined') {
						id = $("#"+targetId).attr('class').split(' ')[0];
					}
					return id + suffix;
				},
				//체크박스 선택
				setActive: function(cell){
					if($.osl.isNull(cell)){
						return;
					}
					
					if (typeof cell === 'string') {
						// set by checkbox id
						cell = $(datatable.list[targetId].targetDt.table().body()).find('.' + pfx + 'checkbox--single[value="' + cell + '"]').closest(".osl-datatable__row");
					} else if(typeof cell === 'number') {
						cell = $(datatable.list[targetId].targetDt.row(cell).node());
					}else if(typeof cell === 'object') {
						try {
							cell = cell.rows({selected:true}).nodes();
							//cell = cell.rows(".osl-datatable__row--selected").nodes();
						}catch(e){
							//element
							cell = $(cell).closest("tr"); 
						}
					}
					
					var ids = [];
					$(cell).each(function(i, tr) {
						var chkEl = $(tr).find('td input[type="checkbox"].osl-evt__datatable-checkbox');
						$(chkEl).prop('checked', true).change();
						
						var rowIdx = chkEl.data('row');
						datatable.list[targetId].targetDt.row(rowIdx).select();
						
						//체크박스 클릭시에는 selected 효과를 숨기기 위해
						$(tr).addClass("not-selected-color");
						
						var id = chkEl.attr('value');
						if (typeof id !== 'undefined') {
							ids.push(id);
						}
					});
					
					//$(datatable).trigger(pfx + 'datatable--on-check', [ids]);
				},
				//체크박스 선택 해제
				setInactive: function(cell){
					if($.osl.isNull(cell)){
						return;
					}
					
					if (typeof cell === 'string') {
						// set by checkbox id
						cell = $(datatable.list[targetId].targetDt.table().body()).find('.' + pfx + 'checkbox--single[value="' + cell + '"]').closest(".osl-datatable__row");;
					} else if(typeof cell === 'number') {
						cell = $(datatable.list[targetId].targetDt.row(cell).node());
					} else if(typeof cell === 'object') {
						try {
							cell = cell.rows({selected:true}).nodes();
							//cell = cell.rows(".osl-datatable__row--selected").nodes();
						}catch(e){
							//element
							cell = $(cell).closest("tr"); 
						}
					}

					//$(cell).prop('checked', false);
					
					var ids = [];
					$(cell).each(function(i, tr) {
						var chkEl = $(tr).find('td input[type="checkbox"].osl-evt__datatable-checkbox');
						$(chkEl).prop('checked', false);
						
						var rowIdx = chkEl.data('row');
						datatable.list[targetId].targetDt.row(rowIdx).deselect();
						
						//체크박스 클릭시에는 selected 효과를 숨기기 위해 적용한 클래스 제거
						$(tr).removeClass("not-selected-color");
						
						var id = chkEl.attr('value');
						if (typeof id !== 'undefined') {
							ids.push(id);
						}
					});

					//$(datatable).trigger(pfx + 'datatable--on-uncheck', [ids]);
				},
				//체크박스 전체 선택/선택 해제
				setActiveAll: function(active) {
					
					//데이터 테이블 헤더 객체 가져오기 
					var tableHead = $.osl.datatable.list[targetId].targetDt.tableHead;
					var tableHeadEl = $(tableHead);
					
					//전체 선택 체크박스
					var allChkEl = tableHeadEl.find(".osl-evt__all-checkbox");
					
					//true -> 전체 선택
					if (active) {
						allChkEl.prop('checked', true).change();
					} 
					//false -> 전체 해제
					else {
						allChkEl.prop('checked', false).change();
					}
				},
				/**
				 * Get options by dots notation path
				 * @param path String Dot notation path in string
				 * @returns {*}
				 */
				getOption: function(path) {
					return datatablePlugin.getObject(path, options);
				},
				/**
				 * Get value by dot notation path string and to prevent undefined
				 * errors
				 * @param path String Dot notation path in string
				 * @param object Object to iterate
				 * @returns {*}
				 */
				getObject: function(path, object) {
					return path.split('.').reduce(function(obj, i) {
						return obj !== null && typeof obj[i] !== 'undefined' ? obj[i] : null;
					}, object);
				},

				/**
				 * Get datasource params
				 * @param param
				 */
				getDataSourceParam: function(param) {
					datatable.list[targetId].targetDt.API.params = $.extend({}, {
						pagination: {page: 1, perpage: datatable.list[targetId].targetDt.ajax.params().pagination.perpage},
						sort: datatable.list[targetId].targetDt.ajax.params().order,
						query: {},
					}, datatable.list[targetId].targetDt.API.params, datatable.list[targetId].targetDt.lastResponse.meta);

					if (typeof param === 'string') {
						return datatablePlugin.getObject(param, datatable.list[targetId].targetDt.ajax.params());
					}
					
					return datatable.list[targetId].targetDt.API.params;
				},

				/**
				 * Shortcode to datatable.getDataSourceParam('query');
				 * @returns {*}
				 */
				getDataSourceQuery: function() {
					return datatablePlugin.getDataSourceParam('query') || {};
				},

				/**
				 * Shortcode to datatable.setDataSourceParam('query', query);
				 * @param query
				 */
				setDataSourceQuery: function(query) {
					datatablePlugin.setDataSourceParam('query', query);
				},
				
				/**
				 * function 명 	: getGridColumns
				 * function 설명	: 엑셀 다운로드에 사용될 엑셀 해더값 가져오는 함수 fieldId, title, excelYn, template 함수
				 * @return : 엑셀다운로드에 사용될 헤더 값 및 template(사용자 정의 함수)
				 */
				getGridColumns: function(){
					//엑셀 다운로드에 사용될 컬럼 초기 값
					var listObject = [];
					//데이터 테이블 초기 세팅 데이터 중 field, title, excelYn 값만 세팅
					$.each(config.columns, function(idx, map){
						if(map.hasOwnProperty("field") || map.hasOwnProperty("title") || map.hasOwnProperty("excelYn") || map.hasOwnProperty("template") || map.hasOwnProperty("tmplExcelYn")){
							//엑셀 다운로드시 헤더에 표출안되는 컬럼인 경우 기본값 false 세팅
							if($.osl.isNull(map["excelYn"])){
								map["excelYn"] = false;
							}
							//엑셀 다운로드시 template함수 사용하지 않는 경우 기본값 false 세팅
							if($.osl.isNull(map["tmplExcelYn"])){
								map["tmplExcelYn"] = false;
							}
							listObject.push({"fieldId" : map["field"], "title" : map["title"], "excelYn" : map["excelYn"], "template" : map["template"], "tmplExcelYn" : map["tmplExcelYn"]});
						}
					});
					
					return listObject;
				},
				
				/**
				 * Extend object
				 * @param obj
				 * @param path
				 * @param value
				 * @returns {*}
				 */
				extendObj: function(obj, path, value) {
					var levels = path.split('.'),
						i = 0;

					function createLevel(child) {
						var name = levels[i++];
						if (typeof child[name] !== 'undefined' && child[name] !== null) {
							if (typeof child[name] !== 'object' &&
								typeof child[name] !== 'function') {
								child[name] = {};
							}
						} else {
							child[name] = {};
						}
						if (i === levels.length) {
							child[name] = value;
						} else {
							createLevel(child[name]);
						}
					}

					createLevel(obj);
					return obj;
				},
				insertData: function(){
					var addRow = datatable.list[targetId].targetDt.dataSet || [];
					datatable.list[targetId].targetDt.clear().rows.add(addRow).draw();
				},
				localSearch: function(value, filedNm){
					if($.osl.isNull(value)){
						datatable.list[targetId].targetDt.columns('').search('').draw();
					}else{
						var targetTableId = datatable.list[targetId].targetDt.id;
						var searchValue = value;
						var searchTypeTarget = $(".osl-evt__datatable-search__dropdown[data-datatable-id="+targetTableId+"] > .menu-item.active")
						var searchType = searchTypeTarget.data("opt-type");
						
						if(searchType == "select"){
							// 셀렉트 박스인 경우 코드 검색 추가
							searchValue = $("#searchSelect_"+targetTableId + " option[value="+value+"]").html();
						}
						// 이전 검색 조건 초기화
						datatable.list[targetId].targetDt.columns('').search('').draw();
						// 필드 인덱스 값 찾기
						var filedIdx = datatable.list[targetId].targetDt.getColumnIndex(filedNm);
						datatable.list[targetId].targetDt.columns(filedIdx).search(searchValue).draw();
					}
				},
		};
		
		//기능 동작 버튼 제어
		var btnEvt = {
			//데이터 테이블 외부에 있는 버튼 이벤트 대입
			list: function(){
				//각 버튼에 이벤트 걸기
				if($("[data-datatable-id="+targetId+"][data-datatable-action]").length > 0){
					$.each($("[data-datatable-id="+targetId+"][data-datatable-action]"), function(idx, map){
						var btnDatatableId = $(map).data("datatable-id");
						var btnAction = $(map).data("datatable-action");
						
						//action별 동작 호출
						if(btnEvt.action.hasOwnProperty(btnAction)){
							btnEvt.action[btnAction](this, btnDatatableId, "list");
						}else{
							//action 없는경우 사용자 설정 값에 해당 함수 있는지 체크
							if(targetConfig.actionFn.hasOwnProperty(btnAction)){
								$(this).off("click");
								$(this).click(function(event){
									//중복 이벤트 중지
									event.cancelable = true;
									event.stopPropagation();
									event.preventDefault();
									event.returnValue = false;
									
									var rowData = [];
									
									//선택 레코드 수
									var selRecords = datatables.targetDt.getSelectedRecords();
									$.each(selRecords.data("row"), function(idx, map){
										rowData.push(map);
									});
									
									targetConfig.actionFn[btnAction](rowData, btnDatatableId, "list", rowData.length, this, event);
								});
							}
						}
					});
				}
			},
			//데이터 테이블 내부의 row에 추가된 active 버튼 이벤트 대입
			info: function(){
				//$("#"+targetId).find("[data-datatable-id="+targetId+"][data-datatable-action]").off("click");
				$("#"+targetId).off("click","[data-datatable-id="+targetId+"][data-datatable-action]");
				$("#"+targetId).on("click","[data-datatable-id="+targetId+"][data-datatable-action]", function(){
					var targetActionBtn = $(this);
					
					//row data 구하기
					var row = $(this).parents("tr.osl-datatable__row[data-row]");
					var btnRowNum;
					
					//detail 부분에서 버튼 동작한 경우 
					if($.osl.isNull(row)){
						row = $(this).parents("ul.dtr-details[data-dtr-index]");
						
						btnRowNum = row.data("dtr-index");
						//detail에서도 못찾는 경우 오류
						if($.osl.isNull(row)){
							$.osl.alert("데이터 조회중 오류가 발생했습니다.");
							return false;
						}
					//데이터테이블 로우에서 버튼 동작한 경우
					}else {
						btnRowNum = row.data("row");
					}
					
					//action button data
					var btnDatatableId = targetActionBtn.data("datatable-id");
					var btnAction = targetActionBtn.data("datatable-action");
					
					//action별 동작 호출
					if(btnEvt.action.hasOwnProperty(btnAction)){
						btnEvt.action[btnAction](this, btnDatatableId, "info", btnRowNum, row);
						this.click();
					}else{
						//action 없는경우 사용자 설정 값에 해당 함수 있는지 체크
						if(targetConfig.actionFn.hasOwnProperty(btnAction)){ 
							//중복 이벤트 중지
							/*
							event.cancelable = true;
							event.stopPropagation();
							event.preventDefault();
							event.returnValue = false;
							*/
							var tmp_rowData = datatables.targetDt.data("row")[btnRowNum];

							targetConfig.actionFn[btnAction](tmp_rowData, btnDatatableId, "info", btnRowNum, this);
						}
					}
				});
				
				//tooltip 세팅
				//KTApp.initTooltips();
			},
			/**
			 * 해당되는 버튼 동작 함수 - 사전 데이터 가공 작업
			 * select -> 해당 datatable 페이지 1로 복귀하고 데이터 재 조회
			 * insert -> config에 선언된 insert 함수 호출 (페이지 제어) 
			 * update,delete -> config에 선언된 insert 함수 호출 (페이지 제어)
			 * 				-> 선택된 데이터 Json 파라미터 값으로 전달
			 */
			action: {
				"select": function(elem, datatableId, bubleFlag) {
					$(elem).off("click");
					$(elem).click(function(event){
						if(bubleFlag != false){
							//중복 이벤트 중지
							event.cancelable = true;
							event.stopPropagation();
							event.preventDefault();
							event.returnValue = false;
						}
						
						//사용자 정의함수에 select가 있는 경우 함수 호출
						if(datatables.config.actionFn.hasOwnProperty("select")){
							//해당 datatable select 로직 가져오기
							datatables.config.actionFn["select"](datatableId, elem, datatables.targetDt);
						}
						//select없는 경우 데이터테이블 기본 조회 동작
						else{
							datatables.targetDt.reload();
						}
					});
				},
				"insert": function(elem, datatableId, type, rowNum, bubleFlag) {
					$(elem).off("click");
					$(elem).click(function(event){
						if(bubleFlag != false){
							//중복 이벤트 중지
							event.cancelable = true;
							event.stopPropagation();
							event.preventDefault();
							event.returnValue = false;
						}
						
						//해당 datatable insert 로직 가져오기
						datatables.config.actionFn["insert"](datatableId, type, rowNum,elem);
					});
				},
				"update": function(elem, datatableId, type, rowNum, bubleFlag) {
					$(elem).off("click");
					$(elem).click(function(event){
						if(bubleFlag != false){
							//중복 이벤트 중지
							event.cancelable = true;
							event.stopPropagation();
							event.preventDefault();
							event.returnValue = false;
						}
						
						var rowData;
						//외부 버튼 클릭 시 (체크박스 데이터 연동)
						if(type == "list"){
							//선택 레코드 수
							var selRecords = datatables.targetDt.getSelectedRecords();
							
							//선택 레코드 없는 경우
							if(selRecords[0].length == 0){
								$.osl.alert($.osl.lang("datatable.action.update.nonSelect"));
								return true;
							}
							//선택 레코드 2개이상인경우 alert 띄우기
							else if(selRecords[0].length > 1){
								$.osl.alert($.osl.lang("datatable.action.update.manySelect",selRecords[0].length));
								return true;
							}
							else{
								var selRow = datatables.targetDt.getSelectedRecords().data("row");
								
								rowData = selRow[0];
							}
						}
						//레코드 내부 Action 버튼 클릭 시
						else if(type == "info"){
							rowData = datatables.targetDt.row(rowNum).data();
						}
						
						//해당 datatable update 로직 가져오기
						datatables.config.actionFn["update"](rowData, datatableId, type, rowNum, elem);
						
					});
				},
				"delete": function(elem, datatableId, type, rowNum, bubleFlag) {
					$(elem).off("click");
					$(elem).click(function(event){
						if(bubleFlag != false){
							//중복 이벤트 중지
							event.cancelable = true;
							event.stopPropagation();
							event.preventDefault();
							event.returnValue = false;
						}
						
						var rowData = [];
						//외부 버튼 클릭 시 (체크박스 데이터 연동)
						if(type == "list"){
							//선택 레코드 수
							var selRecords = datatables.targetDt.getSelectedRecords();
							
							//선택 레코드 없는 경우
							if(selRecords[0].length == 0){
								$.osl.alert($.osl.lang("datatable.action.delete.nonSelect"));
								return true;
							}
							else{
								$.each(selRecords.data("row"), function(idx, map){
									rowData.push(map);
								});
							}
						}
						//레코드 내부 Action 버튼 클릭 시
						else if(type == "info"){
							rowData.push(datatables.targetDt.row(rowNum).data());
						}
						
						$.osl.confirm($.osl.lang("datatable.action.delete.confirm",rowData.length),null, function(result){
							if (result.value) {
								//해당 datatable delete 로직 가져오기
								datatables.config.actionFn["delete"](rowData, datatableId, type, rowNum, elem);
							}
						});
						
					});
				},
				"click": function(elem, datatableId, type, rowNum, row, bubleFlag){
					//action btn click evt
					$(elem).off("click");
					$(elem).click(function(event){
						if(bubleFlag != false){
							//중복 이벤트 중지
							event.cancelable = true;
							event.stopPropagation();
							event.preventDefault();
							event.returnValue = false;
						}
						
						//기존 선택된 체크박스 전체 해제
						var selNodes = datatables.targetDt.getSelectedRecords();
						datatables.targetDt.setInactive(selNodes);
						
						var targetElem = $(row).find("input.osl-evt__datatable-checkbox");
						
						//$("#"+datatableId +" .osl-datatable__row--selected").removeClass("osl-datatable__row--active");
						
						//선택된것처럼 row 컬러가 그대로 남아있으므로
						//$(row).removeClass("osl-datatable__row--selected");
						
						//체크박스 옵션 있는 경우에만 체크
						if(targetConfig.hasOwnProperty("rows") && targetConfig.rows.hasOwnProperty("clickCheckbox")){
							//row click에 check 변동 true인경우
							if(targetConfig.rows.clickCheckbox == true){
								//선택 row active
								datatables.targetDt.setActive(targetElem);
								
								selNodes.find("input.osl-evt__datatable-checkbox").prop("checked", false);
								targetElem.prop("checked", true);
								
								//카드형 동기화
								if(!$.osl.isNull(targetConfig.cardUiTarget)){
									//기존 체크 항목 모두 해제
									var cardAllChkbox = targetConfig.cardUiTarget.find("input[type=checkbox][data-datatable-id="+datatableId+"]");
									$.each(cardAllChkbox, function(idx, chkboxElem){
										$(chkboxElem).prop("checked", false);
									});
									
									//row 선택한 체크 항목만 선택
									targetConfig.cardUiTarget.find("input[type=checkbox][data-datatable-id="+datatableId+"][value="+index+"]").prop("checked", true);
								}
							}
							
						}
						
						//테이블 선택 효과
						//$(".osl-datatable[id="+datatableId+"] tr.osl-datatable__row.osl-datatable__row--selected").removeClass("osl-datatable__row--selected");
						//$(".osl-datatable[id="+datatableId+"] tr.osl-datatable__row[data-row="+$(row).data("row")+"]").addClass("osl-datatable__row--selected");
						$(".osl-datatable[id="+datatableId+"] tr.osl-datatable__row.osl-datatable__row--selected .osl-evt__datatable-checkbox:not(:checked)").partents("tr").removeClass("osl-datatable__row--selected");
						$(".osl-datatable[id="+datatableId+"] tr.osl-datatable__row.osl-datatable__row--selected .osl-evt__datatable-checkbox:checked").partents("tr").addClass("osl-datatable__row--selected");
						
						var rowData = datatables.targetDt.row(rowNum).data();
						
						//해당 datatable click 로직 가져오기
						datatables.config.actionFn["click"](rowData, datatableId, type, rowNum, elem);
					});
				},
				"dblClick": function(elem, datatableId, type, rowNum, row, bubleFlag){
					$(elem).off("click");
					$(elem).click(function(event){
						if(bubleFlag != false){
							//중복 이벤트 중지
							event.cancelable = true;
							event.stopPropagation();
							event.preventDefault();
							event.returnValue = false;
						}
						
						var rowData;
						
						//외부 버튼 클릭 시 (체크박스 데이터 연동)
						if(type == "list"){
							//선택 레코드 수
							var selRecords = datatables.targetDt.getSelectedRecords();
							
							//선택 레코드 없는 경우
							if(selRecords[0].length == 0){
								$.osl.alert($.osl.lang("datatable.action.dblClick.nonSelect"));
								return true;
							}
							//선택 레코드 2개이상인경우 alert 띄우기
							else if(selRecords[0].length > 1){
								$.osl.alert($.osl.lang("datatable.action.update.manySelect",selRecords[0].length));
								return true;
							}
							else{
								var selRow = datatables.targetDt.getSelectedRecords().data("row");
								
								rowData = selRow[0];
							}
						}
						//레코드 내부 Action 버튼 클릭 시
						else if(type == "info"){
							rowData = datatables.targetDt.row(rowNum).data();
						}
						
						//해당 datatable dblClick 로직 가져오기
						datatables.config.actionFn["dblClick"](rowData, datatableId, type, rowNum, elem );
					});
				}
			}
		};
		
		/**
		 * 검색 영역 세팅
		 * @desc 페이지 내에서 datatable config - columns 세팅 시 사용 값
		 * search: true (검색 기능 사용 유무)
		 * searchType:"select" (검색 종류 [select, date, daterange, datetime, datetimerange, text])
		 * searchCd: "REQ00008" (검색 종류가 select인 경우 사용되는 공통 코드 마스터 코드 값)
		 * searchField:"reqProTypeCd" (DB 조회 시 실제 검색 되는 컬럼 명)
		 */
		var searchEvt = {
			init: function(elemId, searchColumns){
				//search div target
				var searchTarget = $(".osl-datatable-search[data-datatable-id="+elemId+"]");
				//2024-12-30 최호현 CLASS 제어 (퍼블리싱 과장님 요청)
				searchTarget.addClass("osl-view__disabled");
				searchTarget.empty();
				
				if(searchTarget.length > 0){
					//버튼 타이틀 출력 여부
					var btnTitle = "";
					if(!searchTarget.hasClass("osl-datatable-search__btn-title--none")){
						btnTitle = '<span class=""><span data-lang-cd"datatable.search.title">'+$.osl.lang("datatable.search.title")+'</span></span>';
					}
					
					//버튼 style 값
					var btnStyle = searchTarget.data("search-style");
					//기본 값
					var btnStyleStr = "btn-point3";
					
					if(!$.osl.isNull(btnStyle)){
						btnStyleStr = "btn-"+btnStyle;
					}
					
					//데이터테이블 layout theme class 가져오기
					if(targetConfig.hasOwnProperty("layout") && targetConfig["layout"].hasOwnProperty("class")){
						searchTarget.addClass(targetConfig["layout"]["class"]);
					}
					
					//2025.02.12 lg 반응형 제거로 인해 중지처리
					var inputGrpClass = "";
					var inputGrpBtnClass = "";
					var inputGrpElemClass = "";
					/*
					//검색바 반응형을 위한 클래스 적용 로직
					//현재 검색바 영역 너비 확인
					var searchBarWidth = $($(searchTarget).parents("div.row")[0]).width();
					var searchBarParent = $($(searchTarget).parents("div.row")[0]);
					if($.osl.isNull(searchBarWidth) || searchBarWidth == 0){
						searchBarWidth = $(searchTarget).parent().width();
						searchBarParent =  $(searchTarget).parent();
						
						$.each($(searchTarget).parents(), function(num, el){
							searchBarWidth = $(el).width();
							if(!$.osl.isNull(searchBarWidth) && searchBarWidth > 0){
								return;
							}
						});
					}
					//영역이 350 이하일 때 적용할 클래스
					var inputGrpClass = "d-block";
					var inputGrpBtnClass = "rounded w-100";
					var inputGrpElemClass = "rounded w-100 my-2";
					
					if(searchBarWidth > 350){
						//xl, lg, md 이면
						inputGrpClass = "";
						inputGrpBtnClass = "";
						inputGrpElemClass = "rounded-0";
						//상위 row에 대하여 m-0 w-100 제거
						$(searchBarParent).removeClass("m-0 w-100");
						//바로 위 div에 대하여
						$(searchTarget).parent().removeClass("w-100");
					}else{
						//상위 row에 대하여 m-0 w-100 지정
						$(searchBarParent).addClass("m-0 w-100");
						//바로 위 div에 대하여
						$(searchTarget).parent().addClass("w-100");
					}
					//검색바 반응형을 위한 클래스 적용 로직 끝
					*/
					//div target frame setting
					var searchTargetHtml = 
						//'<div class="form-group">'
							'<div class="input-group '+inputGrpClass+'">'
								+'<button type="button" class="btn btn-sm btn-light justify-content-between border rotate '+inputGrpBtnClass+' osl-evt__datatable-search__dropdown-btn" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-start" data-datatable-id="'+elemId+'"><span class="osl-evt__datatable-search__droupdown-btn-text">'+$.osl.lang("datatable.search.allTitle")+'</span><span class="osl-icon osl-icon-chevronDown--gray1 rotate-180"></span></button>'
								+'<div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-semibold w-auto m-0 osl-evt__datatable-search__dropdown" data-kt-menu="true" data-datatable-id="'+elemId+'">'
									+'<div class="menu-item px-3 active osl-evt__datatable-search--menu-item" data-field-id="-1" data-opt-type="all"><a class="menu-link px-3" href="javascript:void(0);">'+$.osl.lang("datatable.search.allTitle")+'</a></div>'
								+'</div>'
								
								// 공통코드 콤보박스 세팅
								+'<select class="form-select osl-datatable-search__select osl-evt__datatable-search--select osl-evt__exclude-item '+inputGrpElemClass+'" id="searchSelect_'+elemId+'" name="searchSelect" aria-hidden="true" data-datatable-id='+elemId+'>'
								+'</select>'

								// datepicker input 세팅
								+'<div class="d-flex position-relative align-items-center osl-datatable-search__input osl-evt__datatable-search--input-div" data-datatable-id="'+elemId+'">'
									+'<input type="text" class="form-control osl-evt__datatable-search--input-text osl-evt__exclude-item '+inputGrpElemClass+'" aria-label="'+$.osl.lang("datatable.search.placeholder")+'" disabled="disabled" name="searchData_'+elemId+'" id="searchData_'+elemId+'" data-datatable-id="'+elemId+'">'
									+'<input type="hidden" class="form-control osl-evt__datatable-search--input-text osl-evt__exclude-item '+inputGrpElemClass+'" disabled="disabled" name="searchHiddenData_'+elemId+'" id="searchHiddenData_'+elemId+'" data-datatable-id="'+elemId+'">'
									+'<span class="position-absolute translate-middle-y top-50 osl-r10">'
										+'<span><i class="la"></i></span>'
									+'</span>'
									+'<input type="hidden" class="osl-evt__datatable-search--input-start-date osl-evt__exclude-item" name="searchStartDt" id="searchStartDt_'+elemId+'" data-datatable-id="'+elemId+'">'
									+'<input type="hidden" class="osl-evt__datatable-search--input-end-date osl-evt__exclude-item" name="searchEndDt" id="searchEndDt_'+elemId+'" data-datatable-id="'+elemId+'">'
								+'</div>'
								
								//항목 검색을 위한 input 세팅
								+'<input type="hidden" class="osl-evt__exclude-item" name="searchTargetCd" id="searchTargetCd_'+elemId+'" data-datatable-id="'+elemId+'">'
								+'<input type="hidden" class="osl-evt__exclude-item" name="searchItemCode" id="searchItemCode_'+elemId+'" data-datatable-id="'+elemId+'">'
								+'<input type="hidden" class="osl-evt__exclude-item" name="searchTplId" id="searchTplId_'+elemId+'" data-datatable-id="'+elemId+'">'
								+'<input type="hidden" class="osl-evt__exclude-item" name="searchTplItemId" id="searchTplItemId_'+elemId+'" data-datatable-id="'+elemId+'">'
								+'<input type="hidden" class="osl-evt__exclude-item" name="searchProcessId" id="searchProcessId_'+elemId+'" data-datatable-id="'+elemId+'">'
								+'<input type="hidden" class="osl-evt__exclude-item" name="searchFlowId" id="searchFlowId_'+elemId+'" data-datatable-id="'+elemId+'">'
								
								// 숫자 범위 검색 input, select 세팅
								+'<input type="number" class="form-control osl-evt__datatable-search--input-start-number" name="searchStartNum" id="searchStartNum_'+elemId+'" data-datatable-id="'+elemId+'">'
								+'<select class="form-select osl-datatable-search__select osl-evt__datatable-search--select osl-evt__exclude-item '+inputGrpElemClass+'" id="searchStartIneq_'+elemId+'" name="searchStartIneq" aria-hidden="true" data-datatable-id='+elemId+'>'
								+'</select>'
								+'<input type="number" class="form-control osl-evt__datatable-search--input-end-number" name="searchEndNum" id="searchEndNum_'+elemId+'" data-datatable-id="'+elemId+'">'
								+'<select class="form-select osl-datatable-search__select osl-evt__datatable-search--select osl-evt__exclude-item '+inputGrpElemClass+'" id="searchEndIneq_'+elemId+'" name="searchEndIneq" aria-hidden="true" data-datatable-id='+elemId+'>'
								+'</select>'
								
								/* 기존주석
								+'<input type="text" class="form-control osl-datatable-search__input '+inputGrpElemClass+'" data-datatable-id="'+elemId+'" aria-label="'+$.osl.lang("datatable.search.placeholder")+'" disabled="disabled" name="searchData_'+elemId+'" id="searchData_'+elemId+'">'
								+'<span class="input-group-text">'
									+'<span><i class="la"></i></span>'
								+'</span>'
								+'<input type="hidden" name="searchStartDt" id="searchStartDt_'+elemId+'" data-datatable-id="'+elemId+'">'
								+'<input type="hidden" name="searchEndDt" id="searchEndDt_'+elemId+'" data-datatable-id="'+elemId+'">'
								*/
								
								// 검색 버튼 세팅
								+'<button class="btn btn-square '+btnStyleStr+' osl-datatable-search__button '+inputGrpBtnClass+'" type="button" data-datatable-id="'+elemId+'">'
									+'<i class="fa fa-search osl-me-4 text-light"></i>'+btnTitle
								+'</button>'
							//+'</div>'
						+'</div>';
					
					//target append
					searchTarget.html(searchTargetHtml);
					
					//option 목록
					var selectOptList = [];
					
					//검색 변수 세팅
					$.each(searchColumns, function(idx, map){
						var field = map.fieldId;
						
						//검색 대체 필드 ID 있는 경우 교체
						if(map.hasOwnProperty("searchField")){
							field = map.searchField;
						}
						
						//select 처리
						if(map.hasOwnProperty("searchType")){
							if(map.searchType == "select"){
								//common mstCd
								if(!map.hasOwnProperty("searchCd")){
									return true;
								}
								var subCdRef1 = "";
								if(map.hasOwnProperty("subCdRef1")){
									subCdRef1 =  map.subCdRef1;
								}
								var subCdRef2 = "";
								if(map.hasOwnProperty("subCdRef2")){
									subCdRef2 =  map.subCdRef2;
								}
								var subCdRef3 = "";
								if(map.hasOwnProperty("subCdRef3")){
									subCdRef3 =  map.subCdRef3;
								}
								$(".osl-evt__datatable-search__dropdown[data-datatable-id="+elemId+"]").append('<div class="menu-item px-3 osl-evt__datatable-search--menu-item" data-field-id="'+field+'" data-opt-type="select" data-opt-mst-cd="'+map.searchCd+'" data-opt-sub-ref1="'+subCdRef1+'" data-opt-sub-ref2="'+subCdRef2+'" data-opt-sub-ref3="'+subCdRef3+'"><a class="menu-link px-3" href="javascript:void(0);">'+$.osl.escapeHtml(map.title)+ '</a></div>');
							}
							else if(map.searchType == "date"){
								$(".osl-evt__datatable-search__dropdown[data-datatable-id="+elemId+"]").append('<div class="menu-item px-3 osl-evt__datatable-search--menu-item" data-field-id="'+field+'" data-opt-type="date"><a class="menu-link px-3" href="javascript:void(0);">'+$.osl.escapeHtml(map.title)+'</a></div>');
							}
							else if(map.searchType == "daterange"){
								$(".osl-evt__datatable-search__dropdown[data-datatable-id="+elemId+"]").append('<div class="menu-item px-3 osl-evt__datatable-search--menu-item" data-field-id="'+field+'" data-opt-type="daterange"><a class="menu-link px-3" href="javascript:void(0);">'+$.osl.escapeHtml(map.title)+'</a></div>');
							}
							else if(map.searchType == "datetime"){
								$(".osl-evt__datatable-search__dropdown[data-datatable-id="+elemId+"]").append('<div class="menu-item px-3 osl-evt__datatable-search--menu-item" data-field-id="'+field+'" data-opt-type="datetime"><a class="menu-link px-3" href="javascript:void(0);">'+$.osl.escapeHtml(map.title)+'</a></div>');
							}
							else if(map.searchType == "datetimerange"){
								$(".osl-evt__datatable-search__dropdown[data-datatable-id="+elemId+"]").append('<div class="menu-item px-3 osl-evt__datatable-search--menu-item" data-field-id="'+field+'" data-opt-type="datetimerange"><a class="menu-link px-3" href="javascript:void(0);">'+$.osl.escapeHtml(map.title)+'</a></div>');
							}
							else if(map.searchType == "number"){
								// 숫자 범위 검색 컬럼 세팅 시 기본값
								// 기본값을 컬럼에 지정해두면, 검색 콤보박스에서 숫자 범위검색 되는 컬럼 선택했을 경우 검색 input에 기본값을 세팅해준다. 
								var defaultStNum = "";
								// 숫자 범위 검색 - 시작 기본값
								if(map.hasOwnProperty("searchDefaultStNum")){
									defaultStNum = map.searchDefaultStNum;
								}
								
								$(".osl-evt__datatable-search__dropdown[data-datatable-id="+elemId+"]").append('<div class="menu-item px-3 osl-evt__datatable-search--menu-item" data-field-id="'+field+'" data-opt-type="number" data-def-st-num="'+defaultStNum+'"><a class="menu-link px-3" href="javascript:void(0);">'+$.osl.escapeHtml(map.title)+'</a></div>');
							}
							else if(map.searchType == "numberrange"){
								// 숫자 범위 검색 컬럼 세팅 시 기본값
								// 기본값을 컬럼에 지정해두면, 검색 콤보박스에서 숫자 범위검색 되는 컬럼 선택했을 경우 검색 input에 기본값을 세팅해준다. 
								var defaultStNum = "";
								var defaultEdNum = "";
								// 숫자 범위 검색 - 시작 기본값
								if(map.hasOwnProperty("searchDefaultStNum")){
									defaultStNum = map.searchDefaultStNum;
								}
								// 숫자 범위 검색 - 종료 기본값
								if(map.hasOwnProperty("searchDefaultEdNum")){
									defaultEdNum = map.searchDefaultEdNum;
								}
								
								$(".osl-evt__datatable-search__dropdown[data-datatable-id="+elemId+"]").append('<div class="menu-item px-3 osl-evt__datatable-search--menu-item" data-field-id="'+field+'" data-opt-type="numberrange" data-def-st-num="'+defaultStNum+'" data-def-ed-num="'+defaultEdNum+'"><a class="menu-link px-3" href="javascript:void(0);">'+$.osl.escapeHtml(map.title)+'</a></div>');
							}
							else if(map.searchType == "dept") {
								$(".osl-evt__datatable-search__dropdown[data-datatable-id="+elemId+"]").append('<div class="menu-item px-3 osl-evt__datatable-search--menu-item" data-field-id="'+field+'" data-opt-type="dept"><a class="menu-link px-3" href="javascript:void(0);">'+$.osl.escapeHtml(map.title)+'</a></div>');
							}
							else if(map.searchType == "tplItem") {
								var tplClsType = "";
								if(map.hasOwnProperty("tplClsType")){
									tplClsType =  map.tplClsType;
								}
								var adminCheckCd = "02";
								if(map.hasOwnProperty("adminCheckCd")){
									adminCheckCd =  map.adminCheckCd;
								}
								
								$(".osl-evt__datatable-search__dropdown[data-datatable-id="+elemId+"]").append('<div class="menu-item px-3 osl-evt__datatable-search--menu-item" data-field-id="'+field+'" data-opt-type="tplItem" data-tpl-cls-type="'+tplClsType+'" data-admin-check-cd="'+adminCheckCd+'"><a class="menu-link px-3" href="javascript:void(0);">'+$.osl.escapeHtml(map.title)+'</a></div>');
							}
							else{ //일반 text 입력
								$(".osl-evt__datatable-search__dropdown[data-datatable-id="+elemId+"]").append('<div class="menu-item px-3 osl-evt__datatable-search--menu-item" data-field-id="'+field+'" data-opt-type="text"><a class="menu-link px-3" href="javascript:void(0);">'+$.osl.escapeHtml(map.title)+'</a></div>');
							}
						}else{ //일반 text 입력
							$(".osl-evt__datatable-search__dropdown[data-datatable-id="+elemId+"]").append('<div class="menu-item px-3 osl-evt__datatable-search--menu-item" data-field-id="'+field+'" data-opt-type="text"><a class="menu-link px-3" href="javascript:void(0);">'+$.osl.escapeHtml(map.title)+'</a></div>');
						}
					});

					//dropdown append event 
					$(".osl-evt__datatable-search__dropdown[data-datatable-id="+elemId+"] .osl-evt__datatable-search--menu-item").click(function(){
						$(".osl-evt__datatable-search__dropdown[data-datatable-id="+elemId+"] .osl-evt__datatable-search--menu-item.active").removeClass("active");
						$(this).addClass("active");
						$(".osl-evt__datatable-search__dropdown[data-datatable-id="+elemId+"]").siblings(".osl-evt__datatable-search__dropdown-btn").find(".osl-evt__datatable-search__droupdown-btn-text").text($(this).text());
						
						var searchFieldId = $(this).data("field-id");
						var searchType = $(this).data("opt-type");
						var searchCd = $(this).data("opt-mst-cd");
						
						var datas = $(this).data();
						
						searchEvt.inputHandle(elemId, searchFieldId, searchType, searchCd, datas);
					});
				}
				$(".osl-evt__datatable-search--select[data-datatable-id="+elemId+"]").hide();
				$(".osl-evt__datatable-search--input-start-number[data-datatable-id="+elemId+"]").addClass("osl-datatable-search--hide");
				$(".osl-evt__datatable-search--input-end-number[data-datatable-id="+elemId+"]").addClass("osl-datatable-search--hide");
				$(".osl-evt__datatable-search--input-div[data-datatable-id="+elemId+"]").show();
				
				//팝업 풋터에 가려지는 부분이 있어 z-index 수정
				//parents + 7 (모달의 경우 10단위, 모달의 풋터에 +5 만큼 더 주기 때문에 로 z-index를 주기 때문)
				var searchParentDiv = searchTarget.find(".osl-evt__datatable-search__dropdown").closest(".modal");
				
				//모달에 있으면
				if(!$.osl.isNull(searchParentDiv) && searchParentDiv.length > 0){
					var zIndex = Number(searchParentDiv.css('z-index'));
					//드롭다운 생성
					new KTMenu(searchTarget.find(".osl-evt__datatable-search__dropdown")[0], {"dropdown":{"zindex": zIndex+7}});
				}
				else {
					//드롭다운 생성
					KTMenu.createInstances();
				}
			},
			/* resize를 위한 코드(검색바 반응형)*/
			resize: function(){
				//2025.02.12 lg 반응형 제거로 인해 중지처리
				/*
				$.each(document.querySelectorAll(".osl-datatable-search"), function(idx, searchBarElem){
					//검색 바 영역 너비
					var searchBarWidth = $($(searchBarElem).parents("div.row")[0]).width();
					var searchBarParent = $($(searchBarElem).parents("div.row")[0]);
					if($.osl.isNull(searchBarWidth) || searchBarWidth == 0){
						searchBarWidth = $(searchBarElem).parent().width();
						searchBarParent =  $(searchBarElem).parent();
						
						$.each($(searchBarElem).parents(), function(num, el){
							searchBarWidth = $(el).width();
							if(!$.osl.isNull(searchBarWidth) && searchBarWidth > 0){
								return;
							}
						});
					}
					//영역이 350 이하일 때 적용할 클래스
					var inputGrpClass = "d-block";
					var inputGrpBtnClass = "rounded w-100";
					var inputGrpElemClass = "rounded w-100 my-2";
					
					if(searchBarWidth <= 350){
						//sm이면
						$(searchBarElem).find(".input-group").addClass("d-block");
						$(searchBarElem).find(".input-group .btn").addClass("rounded w-100");
						$(searchBarElem).find(".input-group input").addClass("rounded w-100 my-2");
						$(searchBarElem).find(".input-group input").removeClass("rounded-0");
						$(searchBarElem).find(".input-group select").addClass("rounded w-100 my-2");
						$(searchBarElem).find(".input-group select").removeClass("rounded-0");
						//상위 row에 대하여 m-0 w-100 지정
						$(searchBarParent).addClass("m-0 w-100");
					}else{
						//xl, lg, md 이면
						$(searchBarElem).find(".input-group").removeClass("d-block");
						$(searchBarElem).find(".input-group .btn").removeClass("rounded w-100");
						$(searchBarElem).find(".input-group input").removeClass("rounded w-100 my-2");
						$(searchBarElem).find(".input-group input").addClass("rounded-0");
						$(searchBarElem).find(".input-group select").removeClass("rounded w-100 my-2");
						$(searchBarElem).find(".input-group select").addClass("rounded-0");
						//상위 row에 대하여 m-0 w-100 제거
						$(searchBarParent).removeClass("m-0 w-100");
					}
				});
				*/
			},
			/* 실제 동작 코드 */
			action: {
				"select":function(){
					//사용자 함수 실행
					targetConfig.callback.beforeSelect(datatableInfo, targetId);
					
					//사용자 정의함수에 select가 있는 경우 함수 호출
					if(datatables.config.actionFn.hasOwnProperty("select")){
						//해당 datatable select 로직 가져오기
						datatables.config.actionFn["select"](datatables.targetDt.id, datatables.targetDt, datatables.targetDt);
					}
					//select없는 경우 데이터테이블 기본 조회 동작
					else{
						//datatables.targetDt.setDataSourceParam("pagination.page",1);
						datatables.targetDt.reload();
					}
				},
				"select-input":function(targetObj){
					//사용자 함수 실행
					targetConfig.callback.beforeSelect(datatableInfo, targetId);
					
					//조회 load 효과
					$(targetObj).addClass("kt-spinner kt-spinner--v2 kt-spinner--sm kt-spinner--brand");
					
					//조회 동작
					searchEvt.action.select();

					setTimeout(function(){
						$(targetObj).removeClass("kt-spinner kt-spinner--v2 kt-spinner--sm kt-spinner--brand");
					},300);
					
				},
				"select-button":function(targetObj){
					//사용자 함수 실행
					targetConfig.callback.beforeSelect(datatableInfo, targetId);
					
					//조회 load 효과
					$(targetObj).children("span").hide();
					$(targetObj).addClass("spinner-border spinner-border-sm");
					
					//조회 동작
					searchEvt.action.select();
					
					setTimeout(function(){
						$(targetObj).removeClass("spinner-border spinner-border-sm");
						$(targetObj).children("span").show();
					},300);
				},
				"select-block":function(targetId){
					//사용자 함수 실행
					targetConfig.callback.beforeSelect(datatableInfo, targetId);
					
					$.osl.showLoadingBar(true,{target: targetId,message: ""});
					//조회 동작
					searchEvt.action.select();
					
					setTimeout(function(){
						$.osl.showLoadingBar(false,{target: targetId});
					},300);
				},
				/**
				 * 검색 드롭다운 메뉴 변경 시 타입에 따라 input, select 세팅
				 * @param type: [input, select]
				 * @param disabled: 입력 상자 disabled 유무 (select 해당 없음)
				 * @param readonly: 입력 상자 readonly 유무 (select 해당 없음)
				 */
				"layout-clean": function(elemId, type, disabled, readonly, laIcon){
					//select인 경우
					if(type == "select"){
						$(".osl-evt__datatable-search--select[data-datatable-id="+elemId+"]~span").removeClass("osl-datatable-search--hide");
						$(".osl-evt__datatable-search--input-div[data-datatable-id="+elemId+"]").addClass("osl-datatable-search--hide");
						$(".osl-evt__datatable-search--input-div[data-datatable-id="+elemId+"] > input#searchData_"+elemId+"").attr("disabled",false);
						$("input#searchStartNum_"+elemId+"").addClass("osl-datatable-search--hide");
						$("input#searchEndNum_"+elemId+"").addClass("osl-datatable-search--hide");
						
						$("#searchStartIneq_"+elemId+"~span").addClass("osl-datatable-search--hide");
						$("#searchEndIneq_"+elemId+"~span").addClass("osl-datatable-search--hide");
						$("select#searchStartIneq_"+elemId+"").addClass("osl-datatable-search--hide");
						$("select#searchEndIneq_"+elemId+"").addClass("osl-datatable-search--hide");
						
						return true;
					}
					// 숫자 검색인 경우
					else if(type == "number"){
						$(".osl-evt__datatable-search--select[data-datatable-id="+elemId+"]~span").addClass("osl-datatable-search--hide");
						$(".osl-evt__datatable-search--input-div[data-datatable-id="+elemId+"]").addClass("osl-datatable-search--hide");
						
						// 비교값 연산자 select box 보이기
						$("input#searchStartNum_"+elemId+"").removeClass("osl-datatable-search--hide");
						$("select#searchStartIneq_"+elemId+"").removeClass("osl-datatable-search--hide");
						$("select#searchStartIneq_"+elemId+"").show();
						
						// 검색 대상
						var searchTypeTarget = $(".osl-evt__datatable-search__dropdown[data-datatable-id="+elemId+"] > .menu-item.active")
						// 숫자범위 검색- 시작/종료 기본 값
						var defStNum = searchTypeTarget.data("def-st-num");
						
						// 시작 기본값 있는경우 숫자범위 시작값 입력 input 세팅
						if(!$.osl.isNull(defStNum)){
							$("input#searchStartNum_"+elemId+"").val(defStNum);
						}else{
							// 입력 값으로 초기화
							$("input#searchStartNum_"+elemId+"").val("");
						}
					}
					// 숫자 범위 검색인경우
					else if(type == "numberrange"){
						$(".osl-evt__datatable-search--select[data-datatable-id="+elemId+"]~span").addClass("osl-datatable-search--hide");
						$(".osl-evt__datatable-search--input-div[data-datatable-id="+elemId+"]").addClass("osl-datatable-search--hide");
						
						$("input#searchStartNum_"+elemId+"").removeClass("osl-datatable-search--hide");
						$("select#searchStartIneq_"+elemId+"").removeClass("osl-datatable-search--hide");
						$("input#searchEndNum_"+elemId+"").removeClass("osl-datatable-search--hide");
						$("select#searchEndIneq_"+elemId+"").removeClass("osl-datatable-search--hide");
						
						// 비교값 연산자 select box 보이기
						$("select#searchStartIneq_"+elemId+"").show();
						$("select#searchEndIneq_"+elemId+"").show();
						
						// 검색 대상
						var searchTypeTarget = $(".osl-evt__datatable-search__dropdown[data-datatable-id="+elemId+"] > .menu-item.active")
						// 숫자범위 검색- 시작/종료 기본 값
						var defStNum = searchTypeTarget.data("def-st-num");
						var defEdNum = searchTypeTarget.data("def-ed-num");
						
						// 시작 기본값 있는경우 숫자범위 시작값 입력 input 세팅
						if(!$.osl.isNull(defStNum)){
							$("input#searchStartNum_"+elemId+"").val(defStNum);
						}else{
							// 입력 값으로 초기화
							$("input#searchStartNum_"+elemId+"").val("");
						}
						// 종료 기본값 있는경우 숫자범위 종료값 입력 input 세팅
						if(!$.osl.isNull(defEdNum)){
							$("input#searchEndNum_"+elemId+"").val(defEdNum);
						}else{
							// 입력 값으로 초기화
							$("input#searchEndNum_"+elemId+"").val("");
						}
					}
					// 조직인 경우
					else if(type == "dept") {
						$(".osl-evt__datatable-search--select[data-datatable-id="+elemId+"]~span").addClass("osl-datatable-search--hide");
						$(".osl-evt__datatable-search--input-div[data-datatable-id="+elemId+"]").removeClass("osl-datatable-search--hide");
						$(".osl-evt__datatable-search--input-div[data-datatable-id="+elemId+"] > input#searchData_"+elemId+"[data-datatable-id="+elemId+"]").addClass("cursor-pointer");
						$("input#searchStartNum_"+elemId+"").addClass("osl-datatable-search--hide");
						$("select#searchStartIneq_"+elemId+"").addClass("osl-datatable-search--hide");
						$("input#searchEndNum_"+elemId+"").addClass("osl-datatable-search--hide");
						$("select#searchEndIneq_"+elemId+"").addClass("osl-datatable-search--hide");
					}
					//항목인 경우
					else if(type == "tplItem"){
						$(".osl-evt__datatable-search--select[data-datatable-id="+elemId+"]~span").addClass("osl-datatable-search--hide");
						$(".osl-evt__datatable-search--input-div[data-datatable-id="+elemId+"]").removeClass("osl-datatable-search--hide");
						$(".osl-evt__datatable-search--input-div[data-datatable-id="+elemId+"] > input#searchData_"+elemId+"[data-datatable-id="+elemId+"]").addClass("cursor-pointer");
						$("input#searchStartNum_"+elemId+"").addClass("osl-datatable-search--hide");
						$("select#searchStartIneq_"+elemId+"").addClass("osl-datatable-search--hide");
						$("input#searchEndNum_"+elemId+"").addClass("osl-datatable-search--hide");
						$("select#searchEndIneq_"+elemId+"").addClass("osl-datatable-search--hide");
					}
					//default 'input'
					else{
						//기본 input 상자 보이기
						$(".osl-evt__datatable-search--select[data-datatable-id="+elemId+"]~span").addClass("osl-datatable-search--hide");
						$(".osl-evt__datatable-search--input-div[data-datatable-id="+elemId+"]").removeClass("osl-datatable-search--hide");
						$("input#searchStartNum_"+elemId+"").addClass("osl-datatable-search--hide");
						$("select#searchStartIneq_"+elemId+"").addClass("osl-datatable-search--hide");
						$("input#searchEndNum_"+elemId+"").addClass("osl-datatable-search--hide");
						$("select#searchEndIneq_"+elemId+"").addClass("osl-datatable-search--hide");
						
						//input icon 변경
						$(".osl-evt__datatable-search--input-div[data-datatable-id="+elemId+"] > span i.la").removeClass("la-calendar");
						if(!$.osl.isNull(laIcon)){
							$(".osl-evt__datatable-search--input-div[data-datatable-id="+elemId+"] > span i.la").addClass(laIcon);
						}
					}
					$(".osl-evt__datatable-search--input-div[data-datatable-id="+elemId+"] > input#searchData_"+elemId+"").attr("disabled",disabled);
					$(".osl-evt__datatable-search--input-div[data-datatable-id="+elemId+"] > input#searchData_"+elemId+"").attr("readonly",readonly);
				}
			},
			//dropdown 선택시 type에 맞게 select, input ,date, daterange, datetimerange 제어
			inputHandle: function(elemId, searchFieldId, searchType, searchCd, datas){
				//input target
				var searchDataTarget = $(".osl-evt__datatable-search--input-div[data-datatable-id="+elemId+"] > input#searchData_"+elemId+"[data-datatable-id="+elemId+"]");
				//input clear
				searchDataTarget.val('');
				//datepicker clear
				$.osl.date.datepicker(searchDataTarget,"destroy");
				//daterangepicker clear
				$.osl.date.daterangepicker(searchDataTarget,"destroy");
				//dept clear
				$(".osl-evt__datatable-search--input-div[data-datatable-id="+elemId+"]").off("click");
				$(".osl-evt__datatable-search--input-div[data-datatable-id="+elemId+"] > input#searchHiddenData_"+elemId+"[data-datatable-id="+elemId+"]").val('');
				searchDataTarget.removeClass("cursor-pointer");
				//tplItem clear
				$("input#searchTargetCd_"+elemId+"[data-datatable-id="+elemId+"]").val("");
				$("input#searchProcessId_"+elemId+"[data-datatable-id="+elemId+"]").val("");
				$("input#searchFlowId_"+elemId+"[data-datatable-id="+elemId+"]").val("");
				$("input#searchItemCode_"+elemId+"[data-datatable-id="+elemId+"]").val("");
				$("input#searchTplId_"+elemId+"[data-datatable-id="+elemId+"]").val("");
				$("input#searchTplItemId_"+elemId+"[data-datatable-id="+elemId+"]").val("");
				//searchStartDt,searchEndDt clear
				$(".osl-evt__datatable-search--input-div[data-datatable-id="+elemId+"] .osl-evt__datatable-search--input-start-date#searchStartDt_"+elemId+"[data-datatable-id="+elemId+"]").val('');
				$(".osl-evt__datatable-search--input-div[data-datatable-id="+elemId+"] .osl-evt__datatable-search--input-end-date#searchEndDt_"+elemId+"[data-datatable-id="+elemId+"]").val('');
				//keypress event off
				searchDataTarget.off('keypress');
				
				//2024-12-30 최호현 CLASS 제어 (퍼블리싱 과장님 요청)
				if(searchType == "all"){
					$(".osl-datatable-search[data-datatable-id="+elemId+"]").addClass("osl-view__disabled");
				} else {
					$(".osl-datatable-search[data-datatable-id="+elemId+"]").removeClass("osl-view__disabled");
				}

				if(searchType == "select"){
					//공통코드로 select 세팅하기
					var commonCodeArr ;
					
					//서브 정보 넘어온 값 있으면 함께 세팅하기
					var commonCodeMap = {mstCd: searchCd, useYn: "Y",targetObj: "#searchSelect_"+elemId+"[data-datatable-id="+elemId+"]", comboType:"N"}; 
					if(!$.osl.isNull(datas.subCdRef1)){
						commonCodeMap.subCdRef1 = datas.subCdRef1;
					} 
					if(!$.osl.isNull(datas.subCdRef2)){
						commonCodeMap.subCdRef2 = datas.subCdRef2;
					} 
					if(!$.osl.isNull(datas.subCdRef3)){
						commonCodeMap.subCdRef3 = datas.subCdRef3;
					}
					//공통코드 select 세팅정보
					commonCodeArr = [
						commonCodeMap
						];

	        		//공통코드 채우기
        			var ajaxDone = $.osl.getMulticommonCodeDataForm(commonCodeArr , true);
        			
        			//공통코드 완료 되면 검색
        			ajaxDone.done(function(){
        				
	        			//select box show
	        			searchEvt.action["layout-clean"](elemId,searchType);
						//select2 init
						$("#searchSelect_"+elemId+"[data-datatable-id="+elemId+"]").select2({width: '100%'});
							
						/*//최초 데이터 로드
						searchEvt.action["select-block"]("#searchSelect_"+elemId+"[data-datatable-id="+elemId+"]+span");
						
						$("#searchSelect_"+elemId+"[data-datatable-id="+elemId+"]").off("select2:select");
						$("#searchSelect_"+elemId+"[data-datatable-id="+elemId+"]").on("select2:select", function(e) {
							searchEvt.action["select-block"]("#searchSelect_"+elemId+"[data-datatable-id="+elemId+"]+span");
						});*/
        			})
				}
				
				else if(searchType == "all"){
					//input 상자 제어
					searchEvt.action["layout-clean"](elemId,searchType,true,false);
					//조회 동작
					searchEvt.action["select-input"]($(".osl-evt__datatable-search--input-div[data-datatable-id="+elemId+"] > span i.la"));
				}
				else if(searchType == "date"){
					//input 상자 제어
					searchEvt.action["layout-clean"](elemId,searchType,false,true,"la-calendar");
					
					//datepicker 세팅
					$.osl.date.datepicker(searchDataTarget, {}, function(defaultConfig, selected){
						var minDate = new Date(selected.date).format("yyyy-MM-dd 00:00:00");
						var maxDate = new Date(selected.date).format("yyyy-MM-dd 23:59:59");
						
						//날짜 범위 입력
						$(".osl-evt__datatable-search--input-div[data-datatable-id="+elemId+"] .osl-evt__datatable-search--input-start-date#searchStartDt_"+elemId+"[data-datatable-id="+elemId+"]").val(minDate);
						$(".osl-evt__datatable-search--input-div[data-datatable-id="+elemId+"] .osl-evt__datatable-search--input-end-date#searchEndDt_"+elemId+"[data-datatable-id="+elemId+"]").val(maxDate);
						
						//조회 동작
						searchEvt.action["select-input"]($(".osl-evt__datatable-search--input-div[data-datatable-id="+elemId+"] > span i.la"));
					});
					
				}
				else if(searchType == "daterange"){
					//input 상자 제어
					searchEvt.action["layout-clean"](elemId,searchType,false,true,"la-calendar");
					// 현재 날짜
					var currentDate = new Date();
					var oneMonthAgo = new Date();
					oneMonthAgo.setMonth(currentDate.getMonth() - 1);// 날짜 포맷 설정
					var minDate = oneMonthAgo.format("yyyy-MM-dd 00:00:00");
					var maxDate = currentDate.format("yyyy-MM-dd 23:59:59");

					//날짜 범위 입력
					$(".osl-evt__datatable-search--input-div[data-datatable-id="+elemId+"] .osl-evt__datatable-search--input-start-date#searchStartDt_"+elemId+"[data-datatable-id="+elemId+"]").val(minDate);
					$(".osl-evt__datatable-search--input-div[data-datatable-id="+elemId+"] .osl-evt__datatable-search--input-end-date#searchEndDt_"+elemId+"[data-datatable-id="+elemId+"]").val(maxDate);

					//datepicker 세팅
					$.osl.date.daterangepicker(searchDataTarget, {startDate: minDate, endDate: maxDate}, function(defaultConfig, start, end, label){
						
						var minDate = new Date(start).format("yyyy-MM-dd 00:00:00");
						var maxDate = new Date(end).format("yyyy-MM-dd 23:59:59");
						
						//날짜 범위 입력
						$(".osl-evt__datatable-search--input-div[data-datatable-id="+elemId+"] .osl-evt__datatable-search--input-start-date#searchStartDt_"+elemId+"[data-datatable-id="+elemId+"]").val(minDate);
						$(".osl-evt__datatable-search--input-div[data-datatable-id="+elemId+"] .osl-evt__datatable-search--input-end-date#searchEndDt_"+elemId+"[data-datatable-id="+elemId+"]").val(maxDate);
						
						//조회 동작
						searchEvt.action["select-input"]($(".osl-evt__datatable-search--input-div[data-datatable-id="+elemId+"] > span i.la"));
					});
					
				}
				else if(searchType == "datetime"){
					//input 상자 제어
					searchEvt.action["layout-clean"](elemId,searchType,false,true,"la-calendar");
					
					//datepicker 세팅
					$.osl.date.daterangepicker(
							searchDataTarget, 
							{
								todayHighlight: true,
								singleDatePicker: true,
								timePicker: true,
								timePicker24Hour: true,
								timePickerSeconds: false,
								locale:{
									format : 'YYYY-MM-DD HH:mm',
								}
							},
							function(defaultConfig, start, end, label){
								
								var minDate = new Date(start).format("yyyy-MM-dd 00:00:00");
								var maxDate = new Date(end).format("yyyy-MM-dd 23:59:59");
								
								//날짜 범위 입력
								$(".osl-evt__datatable-search--input-div[data-datatable-id="+elemId+"] .osl-evt__datatable-search--input-start-date#searchStartDt_"+elemId+"[data-datatable-id="+elemId+"]").val(minDate);
								$(".osl-evt__datatable-search--input-div[data-datatable-id="+elemId+"] .osl-evt__datatable-search--input-end-date#searchEndDt_"+elemId+"[data-datatable-id="+elemId+"]").val(maxDate);
								
								//조회 동작
								searchEvt.action["select-input"]($(".osl-evt__datatable-search--input-div[data-datatable-id="+elemId+"] > span i.la"));
							});
				}
				else if(searchType == "datetimerange"){
					//input 상자 제어
					searchEvt.action["layout-clean"](elemId,searchType,false,true,"la-calendar");
					
					//datepicker 세팅
					$.osl.date.daterangepicker(
							searchDataTarget, 
							{
								timePicker: true,
								timePicker24Hour: true,
								timePickerSeconds: false,
								locale:{
									format : 'YYYY-MM-DD HH:mm',
									applyLabel: $.osl.lang("date.datepicker.apply"), //적용
									cancelLabel: $.osl.lang("date.datepicker.cancle"), //취소
								}
							},
							function(defaultConfig, start, end, label){
						
						var minDate = new Date(start).format("yyyy-MM-dd 00:00:00");
						var maxDate = new Date(end).format("yyyy-MM-dd 23:59:59");
						
						//날짜 범위 입력
						$(".osl-evt__datatable-search--input-div[data-datatable-id="+elemId+"] .osl-evt__datatable-search--input-start-date#searchStartDt_"+elemId+"[data-datatable-id="+elemId+"]").val(minDate);
						$(".osl-evt__datatable-search--input-div[data-datatable-id="+elemId+"] .osl-evt__datatable-search--input-end-date#searchEndDt_"+elemId+"[data-datatable-id="+elemId+"]").val(maxDate);
						
						//조회 동작
						searchEvt.action["select-input"]($(".osl-evt__datatable-search--input-div[data-datatable-id="+elemId+"] > span i.la"));
					});
				}
				// 검색유형 숫자형인 경우
				else if(searchType == "number"){
					
        			//input 상자 layout 제어
					searchEvt.action["layout-clean"](elemId,searchType,false,false);
        			
					// 비교값 연산자 select 요소
					var $targetObject = $("#searchStartIneq_"+elemId+"[data-datatable-id="+elemId+"]");
					// select 옵션 추가
					$.each(compareValList["number"], function(idx, map){
						$targetObject.append("<option value='" + map.operator + "'>"+map.text+"</option>");
					});
					
					//select2 세팅
					$("select#searchStartIneq_"+elemId+"[data-datatable-id="+elemId+"]").select2({width: '100%'});
				}
				// 검색유형 숫자 범위형인 경우
				else if(searchType == "numberrange"){
					//input 상자 제어
					searchEvt.action["layout-clean"](elemId,searchType,false,false);
					
					// 숫자범위 시작값 비교 연산자 select 요소
					var $stTargetObject = $("#searchStartIneq_"+elemId+"[data-datatable-id="+elemId+"]");
					// 숫자범위 종료값 비교 연산자 select 요소
					var $edTargetObject = $("#searchEndIneq_"+elemId+"[data-datatable-id="+elemId+"]");
					// select 옵션 추가
					$.each(compareValList["numberRange"], function(operaEngNm, map){
						
						$stTargetObject.append("<option data-opera-eng='"+ operaEngNm +"' value='" + map.operator + "'>"+map.text+"</option>");
						$edTargetObject.append("<option data-opera-eng='"+ operaEngNm +"' value='" + map.operator + "'>"+map.text+"</option>");
						
						// 숫자범위 시작 값 선택여부 옵션 있는 경우 해당 요소 선택
						if(map.selectTarget == "start"){
							$stTargetObject.find("option[data-opera-eng='"+ operaEngNm +"']").attr("selected", "selected");
						}
						// 숫자범위 종료 값 선택여부 옵션 있는 경우 해당 요소 선택
						else if(map.selectTarget == "end"){
							$edTargetObject.find("option[data-opera-eng='"+ operaEngNm +"']").attr("selected", "selected");
						}
					});
					
					//select2 세팅
					$("select#searchStartIneq_"+elemId+"[data-datatable-id="+elemId+"]").select2({width: '100%'});
					$("select#searchEndIneq_"+elemId+"[data-datatable-id="+elemId+"]").select2({width: '100%'});
				}
				//검색유형 조직인 경우
				else if (searchType == "dept") {
					//input 상자 제어
					searchEvt.action["layout-clean"](elemId,searchType,false,true);
					
					$(".osl-evt__datatable-search--input-div[data-datatable-id="+elemId+"]").off("click");
					$(".osl-evt__datatable-search--input-div[data-datatable-id="+elemId+"]").on("click", function(e){
						var deptId = $(".osl-evt__datatable-search--input-div[data-datatable-id="+elemId+"] > input#searchHiddenData_"+elemId+"[data-datatable-id="+elemId+"]").val();
						var data = {deptId:deptId};
						var options = {
								idKey: "cmm6500",
								modalSize: 'xl',
								modalTitle: $.osl.lang("cmm6500.title.main.default"),
								closeConfirm: false,
								autoHeight: true,
								callback:[{
				                    targetId: "cmm6500ModalCallbackBtn",
				                    actionFn: function(thisObj){
				                    	// thisObj에서 조직명과 조직아이디를 가져와서 세팅한다.
				                		var deptId = $(thisObj).data("dept-id");
				                		var deptNm = $(thisObj).data("dept-nm");
				                		
				                		$(".osl-evt__datatable-search--input-div[data-datatable-id="+elemId+"] > input#searchHiddenData_"+elemId+"[data-datatable-id="+elemId+"]").val(deptId);
				                		$(".osl-evt__datatable-search--input-div[data-datatable-id="+elemId+"] > input#searchData_"+elemId+"[data-datatable-id="+elemId+"]").val(deptNm);
				                		
				                		//조회 동작
										searchEvt.action["select-input"]($(".osl-evt__datatable-search--input-div[data-datatable-id="+elemId+"] > span i.la"));
				                    }
				                 }]
							};
						
						$.osl.layerPopupOpen('/cmm/cmm6000/cmm6500/selectCmm6500View.do',data,options);
					});
				}
				//항목인 경우
				else if (searchType == "tplItem") {
					//input 상자 제어
					searchEvt.action["layout-clean"](elemId,searchType,false,true);
					
					$(".osl-evt__datatable-search--input-div[data-datatable-id="+elemId+"]").off("click");
					$(".osl-evt__datatable-search--input-div[data-datatable-id="+elemId+"]").on("click", function(e){
						var deptId = $(".osl-evt__datatable-search--input-div[data-datatable-id="+elemId+"] > input#searchHiddenData_"+elemId+"[data-datatable-id="+elemId+"]").val();

						var searchTargetCd = $("input#searchTargetCd_"+elemId+"[data-datatable-id="+elemId+"]").val();
						var processId = $("input#searchProcessId_"+elemId+"[data-datatable-id="+elemId+"]").val();
						var flowId = $("input#searchFlowId_"+elemId+"[data-datatable-id="+elemId+"]").val();
						var itemCode = $("input#searchItemCode_"+elemId+"[data-datatable-id="+elemId+"]").val();
						var tplId = $("input#searchTplId_"+elemId+"[data-datatable-id="+elemId+"]").val();
						var tplItemId = $("input#searchTplItemId_"+elemId+"[data-datatable-id="+elemId+"]").val();
						var searchSelectVal = $(".osl-evt__datatable-search--input-div[data-datatable-id="+elemId+"] > input#searchHiddenData_"+elemId+"[data-datatable-id="+elemId+"]").val();
						var searchData = $(".osl-evt__datatable-search--input-div[data-datatable-id="+elemId+"] > input#searchData_"+elemId+"[data-datatable-id="+elemId+"]").val();
						var searchStartDt = $(".osl-evt__datatable-search--input-div[data-datatable-id="+elemId+"] .osl-evt__datatable-search--input-start-date#searchStartDt_"+elemId+"[data-datatable-id="+elemId+"]").val();
						var searchEndDt = $(".osl-evt__datatable-search--input-div[data-datatable-id="+elemId+"] .osl-evt__datatable-search--input-end-date#searchEndDt_"+elemId+"[data-datatable-id="+elemId+"]").val();
						
						var data = {
								paramTplClsType: datas.tplClsType,
								adminCheckCd : datas.adminCheckCd,
								paramSearchTargetCd : searchTargetCd,
								paramProcessId : processId,
								paramFlowId : flowId,
								paramItemCode : itemCode,
								paramTplId : tplId,
								paramTplItemId : tplItemId,
								paramSearchSelectVal : searchSelectVal,
								paramSearchData : searchData,
								paramSearchStartDt : searchStartDt,
								paramSearchEndDt : searchEndDt
							};
						
						var options = {
								idKey: "reqFormDownload",
								closeConfirm: false,
								modalSize: "lg",
								modalTitle:$.osl.lang("tpl1108.title.main.default"),
								callback:[{
				                    targetId: "tpl1108ModalCallbackBtn",
				                    actionFn: function(thisObj){
										var rtnData = OSLTpl1108Popup.returnDatas();
				                		
										//항목 검색을 위한 input 세팅
										$("input#searchTargetCd_"+elemId+"[data-datatable-id="+elemId+"]").val(rtnData.searchTargetCd);
										$("input#searchProcessId_"+elemId+"[data-datatable-id="+elemId+"]").val(rtnData.processId);
										$("input#searchFlowId_"+elemId+"[data-datatable-id="+elemId+"]").val(rtnData.flowId);
										$("input#searchItemCode_"+elemId+"[data-datatable-id="+elemId+"]").val(rtnData.itemCode);
				                		$("input#searchTplId_"+elemId+"[data-datatable-id="+elemId+"]").val(rtnData.tplId);
				                		$("input#searchTplItemId_"+elemId+"[data-datatable-id="+elemId+"]").val(rtnData.tplItemId);
				                		$(".osl-evt__datatable-search--input-div[data-datatable-id="+elemId+"] > input#searchHiddenData_"+elemId+"[data-datatable-id="+elemId+"]").val(rtnData.searchSelectVal);
										$(".osl-evt__datatable-search--input-div[data-datatable-id="+elemId+"] .osl-evt__datatable-search--input-start-date#searchStartDt_"+elemId+"[data-datatable-id="+elemId+"]").val(rtnData.searchStartDt);
										$(".osl-evt__datatable-search--input-div[data-datatable-id="+elemId+"] .osl-evt__datatable-search--input-end-date#searchEndDt_"+elemId+"[data-datatable-id="+elemId+"]").val(rtnData.searchEndDt);
						
										//기관이거나 공통코드인 경우 코드명 표출
										if(rtnData.itemCode == "10" || rtnData.itemCode == "12") {
					                		$(".osl-evt__datatable-search--input-div[data-datatable-id="+elemId+"] > input#searchData_"+elemId+"[data-datatable-id="+elemId+"]").val(rtnData.searchSelectNm);
										} else {
					                		$(".osl-evt__datatable-search--input-div[data-datatable-id="+elemId+"] > input#searchData_"+elemId+"[data-datatable-id="+elemId+"]").val(rtnData.searchData);
										}
				                		//조회 동작
										searchEvt.action["select-input"]($(".osl-evt__datatable-search--input-div[data-datatable-id="+elemId+"] > span i.la"));
				                    }
				                 }]
							};
						
						$.osl.layerPopupOpen('/tpl/tpl1000/tpl1100/selectTpl1108View.do',data,options);
					});
				}
				else{
					//input 상자 제어
					searchEvt.action["layout-clean"](elemId,searchType,false,false);
					
					//field id, data
					var fieldId = $(".osl-evt__datatable-search__dropdown[data-datatable-id="+elemId+"] > .menu-item.active").data("field-id");
					var fieldData = datatableInfo.getColumnByField(fieldId);
					
					//keyCode 13 enter인경우 기본 검색 동작 안함
					var enterKeyPressFlag = true;
					
					//컬럼에 없는 경우 searchColumns에서 검색
					if($.osl.isNull(fieldData)){
						if(targetConfig.hasOwnProperty("searchColumns") && targetConfig.searchColumns.length > 0){
							$.each(targetConfig.searchColumns, function(idx, map){
								if(fieldId == map.field){
									fieldData = map;
									return false;
								}
							});
						}
					}
					if(!$.osl.isNull(fieldData)){
						//key 이벤트 있는지 체크
						if(fieldData.hasOwnProperty("searchKeyCode") && fieldData.hasOwnProperty("searchKeyEvt")){
							var keyCode = fieldData["searchKeyCode"];
							var keyEvt = fieldData["searchKeyEvt"];
							
							//keyCode null이 아닌경우, 13엔터키인경우 기본 검색 동작 중지
							if(!$.osl.isNull(keyCode) && typeof keyEvt == "function"){
								//Enter인경우 기본 동작 안함
								if(keyCode == 13){
									enterKeyPressFlag = false;
								}
								//input 박스 엔터키 이벤트 걸기
								searchDataTarget.on('keypress', function(e) {
									if (e.which == keyCode){
										var thisObj = $(this);
										var thisObjIcon = thisObj.siblings("span").find("i.la");
										
										keyEvt(e, datatableInfo, searchDataTarget, function(){searchEvt.action["select-input"](thisObjIcon)});
									}
									//-1인경우 모든 키에 반응
									else if(keyCode == -1){
										var thisObj = $(this);
										var thisObjIcon = thisObj.siblings("span").find("i.la");
										
										keyEvt(e, datatableInfo, searchDataTarget, function(){searchEvt.action["select-input"](thisObjIcon)});
									}
								});
							}
						}
					}
					if(enterKeyPressFlag){
						//input 박스 엔터키 이벤트 걸기
						searchDataTarget.on('keypress', function(e) {
							if (e.which === 13){
								var thisObj = $(this);
								var thisObjIcon = thisObj.siblings("span").find("i.la");
								
								//조회 동작
								searchEvt.action["select-input"](thisObjIcon);
								
								event.cancelable = true;
								event.stopPropagation();
								event.returnValue = false;
								
							}
						});
					}
				}
			}
		};
		
		//datatable을 그릴 table 생성
		$("#"+targetId).empty();
		var ktDatatableTargetId = targetId+"_table";
		$("#"+targetId).html(
				'<table class="table align-middle table-row-dashed fs-6 gy-5" id="'+ktDatatableTargetId+'">'
				+'</table>'
		);
		
		var ktDatatableTarget = $("#"+ktDatatableTargetId);
		if(ktDatatableTarget.length > 0){
			/* datatable 기본 설정 값 */
			
		    var datable_lang = {
		        "decimal" : $.osl.lang("new_datatable.decimal"),
		        "emptyTable" : $.osl.lang("new_datatable.emptyTable"),
		        "info" : $.osl.lang("new_datatable.info"),
		        "infoEmpty" : $.osl.lang("new_datatable.infoEmpty"),
		        "infoFiltered" : $.osl.lang("new_datatable.infoFiltered"),
		        "infoPostFix" : $.osl.lang("new_datatable.infoPostFix"),
		        "thousands" : $.osl.lang("new_datatable.thousands"),
		        "lengthMenu" : $.osl.lang("new_datatable.lengthMenu"),
		        "processing" : $.osl.lang("new_datatable.processing"),
		        "search" : $.osl.lang("new_datatable.search"),
		        "zeroRecords" : $.osl.lang("new_datatable.zeroRecords"),
		        "paginate" : {
		            "first" : $.osl.lang("new_datatable.paginate.first"),
		            "last" : $.osl.lang("new_datatable.paginate.last"),
		            "next" : $.osl.lang("new_datatable.paginate.next"),
		            "previous" : $.osl.lang("new_datatable.paginate.previous"),
		        },
		        "aria" : {
		            "sortAscending" : $.osl.lang("new_datatable.aria.sortAscending"),
		            "sortDescending" : $.osl.lang("new_datatable.aria.sortDescending"),
		        }
		    };
		    
		    
			/* datatable 기본 설정 값 */
			/*datatable 구조*/
			var options = {
					searchDelay: 500,
					buttons: true,
		            processing: true,
		            serverSide: true, 
		            stateSave: false,
		            //검색 및 정렬
		            searching : true,
		            ordering : true,
		            //order: [[2, 'asc']],//1
		            //스크롤
		            //scrollX: true, //가로 스크롤
		            //scrollY: "500px", //세로 스크롤 높이 지정
		            //scrollCollapse: true,
		            info: true,
		            //페이징
		            paging: true,
					//2025.01.20기준 확인한 페이지 타입
					//numbers(페이지 숫자만 표출), simple(이전, 다음만 표출), simple_numbers(이전, 다음, 페이지 숫자만 표출)
					//full(맨 앞, 이전, 다음, 맨 뒤만 표출), full_numbers(모든 버튼 + 페이지 숫자 표출)
					//input(맨 앞, 이전, input, 다음, 맨 뒤) - TODO input 타입에 대한 css가 없음
		            pagingType: $(window).width() < 768 ? "input" : "full_numbers",
		            lengthChange : true,          // 페이지 조회 시 row를 변경할 것인지
		            lengthMenu : [ 10, 20, 50, 100 ],  // lengthChange가 true인 경우 선택할 수 있는 값 설정
	                //pageLength : 10,           // lengthChange가 false인 경우 조회 row 수
		            //고정 컬럼
		            /*
		            fixedColumns: { left: 1},
	            	*/
	            	//반응형(+/-)
	            	responsive: true,
	            	//row 클릭 시
	            	select : true, //단일 선택으로 클릭 시 row 선택 표시
					searchColumns: [],
	            	// 그리드 그려지기 전 콜백
	            	preDrawCallback: function (setting){
					},
					// 그리드 그려진 후 콜백
					drawCallback: function(setting){},
					// 헤더 생성 콜백
					headerCallback: function(thead, data, start, end, display){},
					// 로우 생성 콜백
					createdRow: function(row, data, dataIndex, cells){},
		            //ajax 연결 url
		            ajax: {
		                url: "",
		                type: "POST",
		                dataType: "json",
		                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		                data: {},
		            },
		            // 데이터 테이블 언어 셋팅
		            language: datable_lang,
		            //표출 컬럼
		            columns: [
		            	/*
		                { data: 'recordId' },
		                { data: null }, //action 버튼 표출
		            	 */
		            ],
		            //버튼 권한 넣기 위해 추가
		            authBtn : {
		            	"select" : "select",
		            	"insert" : "insert",
		            	"update" : "update",
		            	"delete" : "delete",
		            	"print" : "print",
		            	"excel" : "excel",
		            	"click" : "select",
		            	"dblClick" :"select"
		            },
					actionBtn:{
						"autoHide": true,
						"title": "Actions",
						"width": false,
						"lastPush": true,
						"update": true,
						"delete": true,
						"click": false,
						"dblClick": false
					},
					actionFn:{
						"insert":$.noop,
						"update":$.noop,
						"delete":$.noop,
						"click":$.noop,
						"dblClick":$.noop
					},
					actionTooltip:{
						"update": null,
						"delete": null,
						"click": null,
						"dblClick": null
					},
		            columnDefs: [
		            	/*
		            	//체크박스
		                {
		                    targets: 0,
		                    responsibePriority: 1, //우선순위
		                    orderable: false,
		                    render: function (data) {
		                        return `
		                            <div class="form-check form-check-sm form-check-custom form-check-solid">
		                                <input class="form-check-input  osl-checkbox osl-checkbox--single" type="checkbox" value="${data}" />
		                                
		                            </div>`;
		                    }
		                },
		                */
	                ],
					theme: {
						actionBtn:{
							"update": "",
							"delete": "",
							"click": "",
							"dblClick": ""
						},
						actionBtnIcon:{
							"update": "fa fa-edit",
							"delete": "far fa-trash-alt",
							"click": "fa fa-check-square",
							"dblClick": "fa fa-external-link-alt"
						}
					},
					callback:{
						/* datatable 호출 완료 후 */
						initComplete: $.noop,
						/* datatable 호출 complete 동작 후 */
						afterInitComplete: $.noop,
						/* datatable 내부 ajax 호출 성공 시 */
						ajaxDone: $.noop,
						/* datatable prevReload */
						prevReloaded: $.noop,
						/* datatable nextReload  */
						nextReloaded: $.noop,
						/* datatable sort*/
						sort: $.noop,
						/* datatable page size change*/
						perpage: $.noop,
						/* datatable page number change*/
						gotoPage: $.noop,
						/* datatable row checked */
						onCheck: $.noop,
						/* datatable row unCheck */
						unCheck: $.noop,
						/* datatable before select (조회 동작 전 )*/
						beforeSelect: $.noop
					}
			};
			
			/* datatable 세팅 */
			//config 깊은 복사
			var targetConfig = $.extend(true, {}, options);
			var columnsConfig = [];
			var columnDefs = [];
			//깊은 복사
			//targetConfig = $.extend(true, targetConfig, config, config);
			targetConfig = $.extend(true, targetConfig, config);
			
			$.each(config.columns, function(idx, value){
				var map = $.extend(true, {}, value);
				
				var column ={};
				var columnDef ={};
				
				//첫번째 컬럼에 빈값 넣기(+-)
				if(idx == 0){
					column ={
							data : 'rn',
							title : '',
							fieldId : 'rn',
							className : "osl-datatable__cell osl-evt__datatable-folding-btn",
							width: '5',
					};
					if(map["field"] != "checkbox"){
						column.data = map["field"];
						column.fieldId = map["field"];
					};
					columnsConfig.push(column);
					
					columnDef = {
		                    targets: 0,
		                    orderable: false,
		                    render: function (data, type, row, meta) {
		                        return '';
		                    }
	                };
					columnDefs.push(columnDef);
					//등록 후 초기화
					column = {}
					columnDef = {}
				}
				
				// selector 가 존재하고 true이면 체크박스로 사용
				if(map.hasOwnProperty("selector") && map["selector"]){
					var allChkHtml = '<div class="form-check form-check-sm form-check-custom form-check-solid">'
												+'<input class="form-check-input osl-checkbox osl-evt__all-checkbox osl-evt__exclude-item" type="checkbox" data-check-target="#'+ktDatatableTargetId+' .osl-checkbox--single">'
											+'</div>';

					// selector 가 존재하면 첫번째 셀은 체크박스 변경
					// map["field"] 가 데이터에 있으면 셋팅 없으면 rn 값 추가
					var chkVal = "rn";
					
					if(map["field"] != "checkbox"){
						chkVal = map["field"];
					};
					
					column ={
							data : chkVal,
							title : allChkHtml,
							fieldId : chkVal,
							className : "osl-datatable__cell",
					};
					
					columnDef = {
		                    targets: 1, //0
		                    orderable: false,
		                    render: function (data, type, row, meta) {
		                    	var chkHtml ='<div class="form-check form-check-sm form-check-custom form-check-solid">'
						                            	+'<input class="form-check-input osl-checkbox osl-checkbox--single osl-evt__datatable-checkbox osl-evt__exclude-item" type="checkbox" data-row="'+meta.row+'" value="'+data+'" />'
						                            +'</div>';
		                        return chkHtml;
		                    }
	                };

					columnDefs.push(columnDef);
				}else{
					column ={
							data : map["field"],
							title : map["title"],
							fieldId : map["field"],
							className : "osl-datatable__cell"
					};
				}
				
				if(map.hasOwnProperty("className")){
					column["className"] = " " + column["className"]+ " " + map.className;
				}
				
				var textClass = "text-";
				var justifyClass = "justify-content-";
				if(map.hasOwnProperty("textAlign")){
					if(map["textAlign"]=="left"){
						textClass = textClass+"start";
						justifyClass = justifyClass+"start";
					}else if(map["textAlign"]=="center"){
						textClass = textClass+"center";
						justifyClass = justifyClass+"center";
					}else{
						textClass = textClass+"end";
						justifyClass = justifyClass+"end";
					}
				}else{
					textClass = textClass+"start";
					justifyClass = justifyClass+"start";
				}
				
				column["divAlignClass"] = justifyClass;
				
				if(column.hasOwnProperty("className")){
					column["className"] = column["className"] + " " + textClass + " " + justifyClass;
				}
				
				if(map.hasOwnProperty("width")){
					column["width"] = map["width"];
				}else{
					column["width"] = "20%";
				}
				
				if(map.hasOwnProperty("search")){
					column["search"] = map["search"];
				}else{
					column["search"] = false;
				}
				
				if(map.hasOwnProperty("searchType")){
					column["searchType"] = map["searchType"];
				}else{
					column["searchType"] = "";
				}
				
				if(map.hasOwnProperty("searchCd")){
					column["searchCd"] = map["searchCd"];
				}else{
					column["searchCd"] = "";
				}
				
				if(map.hasOwnProperty("searchField")){
					column["searchField"] = map["searchField"];
				}
				
				if(map.hasOwnProperty("autoHide")){
					column["autoHide"] = map["autoHide"];
				}else{
					column["autoHide"] = "";
				}
				
				if(map.hasOwnProperty("sortField")){
					column["sortField"] = map["sortField"];
				}else{
					column["sortField"] = "";
				}
				
				if(map.hasOwnProperty("sortField")){
					column["sortField"] = map["sortField"];
				}else{
					column["sortField"] = "";
				}
				
				// 숫자범위 검색 시작숫자 기본값 - 지정하는 경우 숫자 범위 시작 input에 자동 세팅
				if(map.hasOwnProperty("searchDefaultStNum")){
					column["searchDefaultStNum"] = map["searchDefaultStNum"];
				}
				
				// 숫자범위 검색 종료숫자 기본값 - 지정하는 경우 숫자 범위 종료 input에 자동 세팅
				if(map.hasOwnProperty("searchDefaultEdNum")){
					column["searchDefaultEdNum"] = map["searchDefaultEdNum"];
				}
				
				
				if(map.hasOwnProperty("sortable")){
					column["orderable"] = map["sortable"];
				}else{
					column["orderable"] = true;
				}
				
				//datatable setting 시 column에 넣는 옵션 excelYn(true/false): 엑셀 다운로드에 사용할 컬럼인지 체크. 기본값 false
				if(map.hasOwnProperty("excelYn")){
					column["excelYn"] = map["excelYn"];
				}else{
					column["excelYn"] = false;
				}
				
				/*datatable setting 시 column에 넣는 옵션 tmplExcelYn(true/false): 엑셀 다운로드에 사용할 컴럼 데이터가 template의 function을
				 *사용해 데이터가 표출되어야할 경우 사용. 기본값 false
				 */
				if(map.hasOwnProperty("tmplExcelYn")){
					column["tmplExcelYn"] = map["tmplExcelYn"];
				}else{
					column["tmplExcelYn"] = false;
				}
				
				//datatable setting 시 column에 넣는 옵션 hide(true/false) : 컬럼 표출 여부. 기본값 false
				if(map.hasOwnProperty("hide")){
					column["hide"] = map["hide"];
				}else{
					column["hide"] = false;
				}
				
				/*if(map.hasOwnProperty("autoHide")){
					column["sortable"] = map["sortable"];
				}else{
					column["sortable"] = true;
				}*/

				//template 사용할 때
				if(map.hasOwnProperty("template")){
					column["data"] = map["template"];
				}else if(map["field"] != "checkbox"){
					//field가 checkbox가 아닐때
					//template를 사용하지 않을 때 text로 표출
					column["render"] = $.fn.dataTable.render.text()
				}
				
				//onclick 사용할 때
				if(map.hasOwnProperty("onclick")){
					column["onclick"] = map["onclick"];
				}
				
				columnsConfig.push(column);
				
				//체크박스 사용할 때
				if(map["field"] == "checkbox" && idx != 0){
					targetConfig["select"] = {
		            	//체크박스로 다중 선택 가능
		                style: 'multi',
		                selector: 'tr',
		                className: 'osl-datatable__row--selected'
		            };
				}
			});
			
			targetConfig.columns = columnsConfig;
			targetConfig.columnDefs = columnDefs;
			
			// 하단 툴바영역 - 한페이지 row 표출 건 수 콤보박스 세팅 
			if(targetConfig.hasOwnProperty("toolbar")){
				if(targetConfig.toolbar.hasOwnProperty("items")){
					if(targetConfig.toolbar.items.hasOwnProperty("info")){
						targetConfig.info = targetConfig.toolbar.items.info;
					}
					if(targetConfig.toolbar.items.hasOwnProperty("pagination")){
						if(targetConfig.toolbar.items.pagination.hasOwnProperty("pageSizeSelect")){
							targetConfig.lengthMenu = targetConfig.toolbar.items.pagination.pageSizeSelect;
						}
					}
				}
			}
			
			//헤더 생성 콜백
			targetConfig["headerCallback"] = function(thead, data, start, end, display){
				$.each($(thead).find("th"), function(number, cellTarget){
					//숨김 옵션 있는경우 컬럼 숨김
					if(columnsConfig[number]["hide"]) {
						$(cellTarget).hide();
						return true;
					}
					
					if(number == 0){
						//+-
						var sWidth = columnsConfig[number]["sWidth"];
						$(cellTarget)[0].style.setProperty("max-width", sWidth + "px", "important");
						$(cellTarget)[0].style.setProperty("width", sWidth + "px", "important");
						$(cellTarget)[0].style.setProperty("min-width", sWidth + "px", "important");
						//첫번째 컬럼
						
						//각 셀 별 data-field
						cellTarget = cellTarget.nextElementSibling;
					}
					
					if(cellTarget.hasAttribute("data-field")){
						return;
					}
					//각 셀 별 data-field
					cellTarget.setAttribute("data-field", columnsConfig[number]["fieldId"]);
					//sorting이 아닌 것만 한번 더 감싸기
					if(!$(cellTarget).hasClass("sorting")){
						$(cellTarget).html('<div class="osl-evt__datatable__cell-div d-flex align-items-center '+columnsConfig[number]["divAlignClass"]+'">'+$(cellTarget).html()+'</div>');
					}
				});
			};
			// 그리드 Row 그려진 후 콜백
			targetConfig["createdRow"] = function(row, data, dataIndex, cells){
				$(row).attr("data-row", dataIndex);
				$(row).addClass("osl-datatable__row");
				
				if(dataIndex%2 == 1){
					$(row).addClass("osl-datatable__row--even");
				}
				//사용자 정의 beforeTemplate 있는 경우
				if(config.hasOwnProperty("rows") && config.rows.hasOwnProperty("beforeTemplate")) {
					config.rows.beforeTemplate($(row), data, dataIndex);
				}
				
				//cell 안에 div 넣은 후 그 안에 내용들을 넣을 수 있도록
				var innerHtml = '';
				
				//셀 가공
				$.each(cells, function(number, cellTarget){
					//숨김 옵션 있는경우 컬럼 숨김
					if(columnsConfig[number]["hide"]) {
						$(cellTarget).hide();
						return true;
					}
					
					//각 셀 별 data-field이 있으면 건너뛰기
					if(cellTarget.hasAttribute("data-field")){
						return;
					}
					cellTarget.setAttribute("data-field", columnsConfig[number]["fieldId"]);
					
					//지정 width가 있으면, 해당 값을 min-width로 style 값 넣어두기
					//TODO
					var sWidth = columnsConfig[number]["sWidth"];
					if(!$.osl.isNull(sWidth)){
						$(cellTarget)[0].style.setProperty("min-width", sWidth + "px", "important");
					}
					//+- 이면 최소가 아니라 고정
					if( number == 0 ){
						$(cellTarget)[0].style.setProperty("max-width", sWidth + "px", "important");
						$(cellTarget)[0].style.setProperty("width", sWidth + "px", "important");
						$(cellTarget)[0].style.setProperty("min-width", sWidth + "px", "important");
						
						//field 제거 : 생성 시 첫번째 컬럼 정보와 동일하게 만든 뒤, 폴딩으로만 사용하기 때문
						$(cellTarget).removeAttr("data-field");
						return;
					}
					
					//체크박스, 기능 버튼은 말줄임 안하고 커버만 씌움
					if( $(cellTarget).find("input[type='checkbox']").length>0 || columnsConfig[number]["fieldId"] == "actions"){
						//cell 안에 div 넣은 후 그 안에 내용들을 넣을 수 있도록
						//공통 커버
						$(cellTarget).html('<div class="osl-evt__datatable__cell-div d-flex align-items-center '+columnsConfig[number]["divAlignClass"]+'">'+$(cellTarget).html()+'</div>');
						
						return;
					}
					//말줄임
					//컬럼 내 template 선언으로 name을 지정한 경우 name이 oslResizeColumn3이면 3줄까지 표출
					if($(cellTarget).find("[name='oslResizeColumn3']").length > 0){
						//3줄 클래스 추가
						$(cellTarget).find("[name='oslResizeColumn3']").addClass("osl-word-break--line-3");
					}
					//컬럼 내 template 선언으로 name을 지정한 경우 name이 oslResizeColumn2이면 2줄까지 표출
					else if($(cellTarget).find("[name='oslResizeColumn2']").length > 0){
						//2줄 클래스 추가
						$(cellTarget).find("[name='oslResizeColumn2']").addClass("osl-word-break--line-2");
					}
					//컬럼 내 template 선언으로 name을 지정한 경우 name이 oslResizeColumn1이면 1줄까지 표출
					else if($(cellTarget).find("[name='oslResizeColumn1']").length > 0){
						//2줄 클래스 추가
						$(cellTarget).find("[name='oslResizeColumn1']").addClass("osl-word-break--line-1");
					}
					//기본 1줄(div 전체 영역)
					else{
						//컬럼 내 template 선언이 없거나, span 등으로 내용을 감싼 oslResizeColumn*이 없는 경우가 있으므로
						//cell 안에 div 넣은 후 그 안에 내용들을 넣을 수 있도록
						innerHtml = $(cellTarget).html();
						//기본 말 줄임 1줄
						$(cellTarget).html('<div class="osl-word-break--line-1">'+innerHtml+'</div>');
					}
					
					//cell 안에 div 넣은 후 그 안에 내용들을 넣을 수 있도록
					innerHtml = $(cellTarget).html();
					
					//툴팁 적용
					//var tooltipTitle = $.osl.escapeHtml($(cellTarget).text().trim().replace(/[\s\t\n]/gim,''));
					//var dataOpt = 'data-bs-toggle="tooltip" data-bs-custom-class="tooltip-inverse" data-bs-dismiss="click" data-bs-placement="top" title="'+tooltipTitle+'"';
					var dataOpt = '';
					
					//공통 커버
					$(cellTarget).html('<div class="osl-evt__datatable__cell-div d-flex align-items-center '+columnsConfig[number]["divAlignClass"]+'" '+dataOpt+'>'+innerHtml+'</div>');
				});
				

				//사용자 정의 afterTemplate 있는 경우
				if(config.hasOwnProperty("rows") && config.rows.hasOwnProperty("afterTemplate")) {
					config.rows.afterTemplate(row, data, dataIndex);
				}
			};
			
			//drawCallback 재 정의
			targetConfig["drawCallback"] = function(setting){
				var api = this.api();

				//접근 권한에 따른 버튼 제어
				$.osl.btnAuthSetting();

				//전체 버튼 이벤트 대입
				// TODO remote 조회시 카드형 컨텍스트 매뉴 로우데이터 정상적으로 조회해오지 못해서 롤백
				// local 조회시 동작 확인 필요 
				//btnEvt.list();
				//데이터 테이블 aciton에 이벤트 걸기
				btnEvt["info"]();
				
				//datatable all-check에 이벤트 걸기
				var datatableHead = api.table().header();
				var datatableChkbox = $(datatableHead).find("input.osl-checkbox.osl-evt__all-checkbox");
				
				// 표출 row 카운트 벨러데이터 제외
				$(api.table().container()).find(".dataTables_length select").addClass("osl-evt__exclude-item");
				
				// 전체 체크 이벤트
				datatableChkbox.change(function(){
					var allChkTarget = $(this).data("check-target");
					
					var targetElem = $(allChkTarget);
					
					if(targetElem.length > 0){
						if($(this).is(":checked") == true){
							targetElem.prop("checked", true);
							datatableInfo.rows({ page: 'current' }).select();
							
							//체크박스 클릭시에는 selected 효과를 숨기기 위해
							$.each(datatableInfo.rows({selected:true}).nodes(), function(r, tr){
								$(tr).addClass("not-selected-color");
							});
							
						}else{
							targetElem.prop("checked", false);
							datatableInfo.rows({ page: 'current' }).deselect();
							
							//체크박스 클릭시에는 selected 효과를 숨기기 위해 적용한 클래스 제거
							$.each(datatableInfo.rows().nodes(), function(r, tr){
								$(tr).removeClass("not-selected-color");
							});
						}
					}
				});
				
				//row 옵션 가져오기
				if(targetConfig.hasOwnProperty("rows")){
					//row minHeight null이 아닌 경우
					if(targetConfig.rows.hasOwnProperty("minHeight")){
						var minHeight = targetConfig.rows.minHeight;
						
						//number 체크
						if(!$.osl.isNull(minHeight) && $.isNumeric(minHeight)){
							$(row).css({"min-height": parseInt(minHeight)+"px"});
						}
					}
				}
				
				//사용자 지정 컬럼 클릭 이벤트
				var datatableBody = api.table().body();
				$.each(targetConfig.columns, function(num, column){
					//셀의 onclick가 있을 때
					if(column.hasOwnProperty("onclick")){
						if(typeof column.onclick == "function"){
							$(datatableBody.querySelectorAll("[data-field='"+column.fieldId+"']")).off("click").on("click", function(event){
								//전파 방지
								event.stopPropagation();
								event.preventDefault();
								var targetVal = $(this);
								var rowNum = targetVal.closest("tr").data("row");
								var rowData = api.data()[rowNum];
								column.onclick(rowData);
							});

							//현재 셀 
							var targetColumn = $(datatableBody).find("[data-field='"+column.fieldId+"']:first");
							
							//셀의 인덱스
							var colIdx = api.column(targetColumn).index();
							
							//현재 셀의 인덱스로 상세보기 셀에 이벤트 걸어주기
							$(datatableBody).on("click", "li.osl-datatable__cell[data-dt-column='"+colIdx+"']", function(event){
								//전파 방지
								event.stopPropagation();
								event.preventDefault();
								event.stopImmediatePropagation();
								
								var targetVal = $(this);
								var rowNum = targetVal.data("dt-row");
								var rowData = api.data()[rowNum];
								column.onclick(rowData);
							})
						}
					}
				});
				//클릭
				if(targetConfig.actionBtn.hasOwnProperty("click") && targetConfig.actionFn.hasOwnProperty("click")){
					api.$('tr').off("click");
					//row click evt
					api.$('tr').on('click', function (event) {
						var btnRowNum = $(this).data("row");
						var rowData = datatables.targetDt.data("row")[btnRowNum];
						
						//+- 클릭이면
						if($(event.target).hasClass("osl-evt__datatable-folding-btn")){
							return true;
						}
						//체크박스 클릭이면
						else if($(event.target).hasClass("osl-evt__datatable-checkbox")){
							var checkTarget = datatableInfo[ "row" ]( btnRowNum ).nodes().to$().find('td input[type="checkbox"].osl-evt__datatable-checkbox');
							if($(event.target).is(":checked")){
								checkTarget.prop("checked",true).change();
								//$(checkTarget).parents("tr").addClass("osl-datatable__row--selected");
								datatableInfo.setActive(checkTarget);
								
							}else{
								checkTarget.prop("checked",false).change();
								//$(checkTarget).parents("tr").removeClass("osl-datatable__row--selected");
								datatableInfo.setInactive(checkTarget);
							}
							
							event.stopPropagation();
						}
						//row 내 action 버튼 클릭이면
						else if($(event.target).parent()[0].tagName.toLowerCase() == "button"){
							var actionFnNm = $(event.target).parent().data("datatable-action");
							
							//해당 action 버튼 실행
							datatables.config.actionFn[actionFnNm](rowData, targetId, "info", btnRowNum, this );
							
							event.stopPropagation();
						}
						//단순 row클릭이면
						else{
							var checkTarget = datatableInfo[ "row" ]( btnRowNum ).nodes().to$().find('td input[type="checkbox"].osl-evt__datatable-checkbox');
							
							//체크박스가 없는 경우
							if($.osl.isNull(checkTarget)){
								//현재 row만 selected 시키기 위해
								datatableInfo.rows().deselect();
								datatableInfo.row(btnRowNum).select(checkTarget);
							}
							//체크박스가 있는 경우
							else {
								//체크되어 있지 않으면 체크
								if(!checkTarget.is(":checked")){
									checkTarget.prop("checked",true);
									//$(checkTarget).parents("tr").addClass("osl-datatable__row--selected");
									datatableInfo.setActive(checkTarget);
									
									//해당 row에만 클래스 selected 효과
									if($(datatableInfo.tableBody).find("tr.selected").length > 0){
										//$(datatableInfo.tableBody).find("tr.selected").removeClass("selected");
										$(datatableInfo.tableBody).find("tr.selected").addClass("not-selected-color");
									}
									$(this).removeClass("not-selected-color");
								}
								//이미 체크 되어 있으면 해제
								else {
									checkTarget.prop("checked",false);
									datatableInfo.setInactive(checkTarget);
									$(this).removeClass("not-selected-color");
								}
							}
							
							//해당 datatable click 로직 가져오기
							datatables.config.actionFn["click"](rowData, targetId, "info", btnRowNum, this );
							
							//단순 row 클릭일 때 체크박스클릭하는 로직을 태우고나면, 체크박스 setAcitve 이후에 플러그인 로직을 타면서 row 선택 효과가 사라지기 때문에 이벤트 중단을 위해 선언
							event.stopPropagation();
						}
					});
				}
				//더블클릭
				if(targetConfig.actionBtn.hasOwnProperty("dblClick") && targetConfig.actionFn.hasOwnProperty("dblClick")){
					//row double click evt
					api.$('tr').off("dblclick");
					api.$('tr').on('dblclick long-press', function (event) {
						//더블클릭이 체크박스가 아니면
						if($(event.target).parents(".osl-evt__datatable-checkbox").length == 0){
							//중복 이벤트 중지
							event.cancelable = true;
							event.stopPropagation();
							event.preventDefault();
							event.returnValue = false;
							
							var btnRowNum = $(this).data("row");
							var rowData = datatables.targetDt.data("row")[btnRowNum];
							
							//해당 datatable click 로직 가져오기
							datatables.config.actionFn["dblClick"](rowData, targetId, "info", btnRowNum, this );
						}
					});
				}
			};
			
			
			//width 계산
			var actionWidth = 0;
			
			//action 버튼 세팅
			if(targetConfig.hasOwnProperty("actionBtn")){
				var actionBtnStr = '';
				var actionBtnFlag = false;
				
				//actionBtn 제외 버튼
				var ignoreActionBtn = ["autoHide", "title", "width", "lastPush", "select", "insert"];
				
				//actionBtn loop
				$.each(targetConfig.actionBtn, function(actionBtnNm, actionData){
					//해당 버튼이 true인경우
					if(actionData === true && ignoreActionBtn.indexOf(actionBtnNm) == -1){
						//theme와 tooltip에서 데이터 가져오기
						actionBtnFlag = true;
						actionWidth += 40;
						
						//action 추가 class
						var actionClass = "";
						if(!$.osl.isNull(targetConfig.theme.actionBtn[actionBtnNm])){
							actionClass = "btn-"+$.osl.escapeHtml(targetConfig.theme.actionBtn[actionBtnNm]);
						}
						//lg - 데이터테이블 row 별 기능버튼 사용 안함으로 주석처리
						/*
						//action button tooltip
						var actionTooltip = "";
						if(!$.osl.isNull(targetConfig.actionTooltip[actionBtnNm])){
							actionTooltip = ' data-bs-toggle="tooltip" data-bs-custom-class="tooltip-inverse" data-bs-placement="top" data-bs-dismiss="click" title="'+targetConfig.actionTooltip[actionBtnNm]+'"';
						}
						
						//버튼 권한 가져오기
						//데이터테이블 옵션 authBtn 에서 가져와 넣기
						var authBtnStr = targetConfig.authBtn[actionBtnNm];
						if($.osl.isNull(authBtnStr)){
							//없으면 버튼에 선언되어 있는 값 찾아 가져오기
							authBtnStr = $("button[data-datatable-id="+targetId+"][data-datatable-action="+actionBtnNm+"]").data("auth-button");
						}
						//그래도 설정된 값이 없을 경우 기본 select
						if($.osl.isNull(authBtnStr)){
							authBtnStr = "select";
						}
						
						actionBtnStr += '<button type="button" class="btn btn-sm btn-icon '+actionClass+'" data-datatable-id="'+targetId+'" data-datatable-action="'+actionBtnNm+'"'+actionTooltip+' data-auth-button="'+authBtnStr+'"><span class="'+targetConfig.theme.actionBtnIcon[actionBtnNm]+'"></span></button>';
						*/
					}
				});
				
			}
			
			//lg 데이터테이블 기능 버튼 제거 - 강제 false 처리
			actionBtnFlag = false;
			//action btn있는 경우 컬럼에 추가
			if(actionBtnFlag){
				//action column title
				var actionBtnTitle = targetConfig.actionBtn.title;
				//텍스트가 아닌 경우 기본 값으로
				if(typeof actionBtnTitle != "string"){
					actionBtnTitle = "Actions";
				}
				
				//actoin column width
				var actionBtnWidth = targetConfig.actionBtn.width;
				if(actionBtnWidth != null && actionBtnWidth === false){
					actionBtnWidth = actionWidth;
				}
				
				// TODO 기능버튼 -- 이전 소스 삭제 예정
				/*var addJson = {
						field: 'actions',
	                    width: actionBtnWidth,
	                    title: actionBtnTitle,
	                    sortable: false,
	                    textAlign: 'center',
	                    overflow: 'visible',
	                    autoHide: targetConfig.actionBtn.autoHide,
	                    template: function (row) {
	                    	return actionBtnStr;
	                    }
					};*/
				column ={
						data : null,
						title: actionBtnTitle,
	                    width: actionBtnWidth,
						fieldId : 'actions',
	                    textAlign: 'center',
	                    overflow: 'visible',
	                    autoHide: targetConfig.actionBtn.autoHide,
	                    className : 'osl-datatable__cell text-center justify-content-center',
	                    divAlignClass : 'justify-content-center'
				};
				columnDef = {
						targets: -1,
						orderable: false,
						render: function (data, type, row, meta) {
							return actionBtnStr;
					    }
					}
				//맨 마지막 컬럼 추가
				if(targetConfig.actionBtn["lastPush"]){
					targetConfig.columns.push(column);
					columnDef.targets = -1;
				}
				//맨 앞 컬럼 추가(+- 때문에 1부터)
				else{
					targetConfig.columns.unshift(column);
					columnDef.targets = 1; //0
					
					// 기존 컬럼들 하나씩 뒤로 밀기
					$.each(targetConfig.columnDefs, function(idx, map){
						if(map.targets == 0){
							return;
						}
						map.targets = map.targets + 1;//2//1
					})

					targetConfig.order = [[3, 'asc']]; //2
				}
				
				targetConfig.columnDefs.push(columnDef);
			}
			
			//search Columns
			var searchColumns = [];
			//추가된 컬럼 필드 ID (중복 방지)
			var searchAddList = [];
			
			//컬럼 XSS 공격 막기 + search 대상 컬럼 찾기 + onclick
			$.each(targetConfig.columns, function(idx, map){
				//기존 template 선언 없는 경우 제어
				if(!map.hasOwnProperty("template")){
					var fieldId = map.field;
					
					map.template = function(row){
						return $.osl.escapeHtml(row[fieldId]);
					}
				}
				
				//언어팩 적용
				var fieldLangTitle = $.osl.lang("datatable."+targetId+"."+map.field);
				if(!$.osl.isNull(fieldLangTitle)){
					map.title = fieldLangTitle;
				}
				
				//search 찾기
				if(map.hasOwnProperty("search")){
					if(map.search){
						searchColumns.push(map);
						searchAddList.push(map.fieldId);
					}
				}
			});
			 
			//추가 검색 필드
			if(targetConfig.searchColumns.length > 0){
				$.each(targetConfig.searchColumns, function(idx, map){
					//기존 추가된 필드가 아닌경우에만 추가
					if(searchAddList.indexOf(map.fieldId) == -1){
						//필드 명
						if(!map.hasOwnProperty("fieldId")){
							map.fieldId = map.field;
							if(map.hasOwnProperty("searchField")){
								map.fieldId = map.searchField;
							}
						}
						//언어팩 적용
						var fieldLangTitle = $.osl.lang("datatable."+targetId+"."+map.field);
						if(!$.osl.isNull(fieldLangTitle)){
							map.title = fieldLangTitle;
						}
						
						//ord값 있는 경우 해당 ord에 추가
						if(map.hasOwnProperty("searchOrd")){
							var searchOrd = map.searchOrd;
							//ord가 이미 추가된 검색 필드 수보다 큰 경우 그냥 push
							if(searchOrd < 0 && searchOrd >= searchColumns.length){
								searchColumns.push(map);
							}else{
								//해당 인덱스 위치에 추가
								searchColumns.splice(searchOrd,0,map);
							}
							
						}else{
							searchColumns.push(map);
						}
					}
				});
			}
			
			//data type이 local이 아닌경우
			if(targetConfig.data.type != 'local'){
				//검색 내용 파라미터 전달
				targetConfig.ajax.url = targetConfig.data.source.read.url;
				targetConfig.dataType = "remote";
				targetConfig.ajax.data = function(d, r){
					//r : reset true or false
					if(r != null && r != "" && r){
						//reset
						if(!config.data.source.read.hasOwnProperty("params") || config.data.source.read.params == null){
							config.data.source.read.params = {};
						}
						targetConfig.data.source.read.params = config.data.source.read.params;
					}
					
					d = $.extend(true, targetConfig.data.source.read.params, d, {
							//프로젝트 그룹, 프로젝트 기본 정보
							dtParamPrjGrpId: $.osl.selPrjGrpId,
							dtParamPrjId: $.osl.selPrjId,
							//검색 대상 Id
							searchTargetId: function(){
								return $(".osl-evt__datatable-search__dropdown[data-datatable-id="+targetId+"] > .menu-item.active").data("field-id");
							},
							//검색 대상 타입
							searchTargetType: function(){
								return $(".osl-evt__datatable-search__dropdown[data-datatable-id="+targetId+"] > .menu-item.active").data("opt-type");
							},
							//검색 입력 데이터
							searchTargetData: function(){
								var searchTargetType = $(".osl-evt__datatable-search__dropdown[data-datatable-id="+targetId+"] > .menu-item.active").data("opt-type");
								var searchTargetData;
								if(searchTargetType == "select"){
									searchTargetData = $(".osl-evt__datatable-search--select[data-datatable-id="+targetId+"]").val();
								}
								else if(searchTargetType == "all"){ //전체 검색
									searchTargetData = null;
								}
								else if(searchTargetType == "dept") { //조직 검색
									searchTargetData = $(".osl-evt__datatable-search--input-div[data-datatable-id="+targetId+"] > input#searchHiddenData_"+targetId).val();
								}
								else if(searchTargetType == "tplItem") { //항목 
									var itemCode = $("#searchItemCode_"+targetId).val();
									
									//공통코드/ 기관인 경우
									if(itemCode == "10" || itemCode == "12") {
										searchTargetData = $(".osl-evt__datatable-search--input-div[data-datatable-id="+targetId+"] > input#searchHiddenData_"+targetId).val();
									} else {
										searchTargetData = $(".osl-evt__datatable-search--input-div[data-datatable-id="+targetId+"] > input#searchData_"+targetId).val();
									}
								}
								else{
									searchTargetData = $(".osl-evt__datatable-search--input-div[data-datatable-id="+targetId+"] > input#searchData_"+targetId).val();
								}
								
								return searchTargetData;
							},
							//기간 데이터 시작일
							searchStartDt: function(){
								return $(".osl-evt__datatable-search--input-div[data-datatable-id="+targetId+"] .osl-evt__datatable-search--input-start-date#searchStartDt_"+targetId+"").val();
							},
							//기간 데이터 종료일
							searchEndDt: function(){
								return $(".osl-evt__datatable-search--input-div[data-datatable-id="+targetId+"] .osl-evt__datatable-search--input-end-date#searchEndDt_"+targetId+"").val();
							},
							// 숫자 범위 시작값
							searchStartNumRange: function(){
								var stNum = $(".osl-evt__datatable-search--input-start-number#searchStartNum_"+targetId).val();
								return stNum;
							},
							// 숫자 범위 시작 연산자
							searchStartNumOperator: function(){
								return $(".osl-evt__datatable-search--select#searchStartIneq_"+targetId).val();
							},
							// 숫자 범위 종료값
							searchEndNumRange: function(){
								var edNum = $(".osl-evt__datatable-search--input-end-number#searchEndNum_"+targetId).val();
								return edNum;
							},
							// 숫자 범위 종료 연산자
							searchEndNumOperator: function(){
								return $(".osl-evt__datatable-search--select#searchEndIneq_"+targetId).val();
							},
							searchItemCode : function(){
								return $("input#searchItemCode_"+targetId).val();
							},
							searchTplId : function() {
								return $("input#searchTplId_"+targetId).val();
							},
							searchTplItemId : function() {
								return $("input#searchTplItemId_"+targetId).val();
							},
							pagination: {
								page: (d.start / d.length) +1,
								perpage: d.length
							}
					});
					
					
					return d;
				};
			}else{
				targetConfig.dataSet = config.data.source;
				targetConfig.originalDataSet = config.data.source;
				targetConfig.data = config.data.source;
				targetConfig.dataType = config.data.type;
				targetConfig.ordering = config.data.serverSorting;
				targetConfig.serverSide = config.data.serverPaging;
				delete targetConfig.ajax;
			}

			//search 세팅함수 호출
			if(searchColumns.length > 0){
				searchEvt.init(targetId, searchColumns);
				
				//검색 버튼 클릭 이벤트 걸기
				$(".osl-datatable-search__button[data-datatable-id="+targetId+"]").click(function(){
					var thisObj = $(this);
					var thisObjIcon = thisObj.children("span");
					
					//조회 동작 
					searchEvt.action["select-button"](thisObjIcon);
				});

				//window resize시 osl-datatable-search 너비에 따라
				window.addEventListener('resize', function(){
					searchEvt.resize();
				});
			}
		
			//datatable 생성
			var datatableInfo = $(ktDatatableTarget).DataTable(targetConfig);
			
			// create table head element
			if(!datatableInfo.hasOwnProperty("tableHead")) {
				datatableInfo.tableHead = datatableInfo.table().header();
			}
			// create table body element
			if(!datatableInfo.hasOwnProperty("tableBody")) {
				datatableInfo.tableBody = datatableInfo.table().body();
			}
			
			datatableInfo = $.extend(true, datatableInfo, datatablePlugin);
			
			//data type이 local인 경우 dataSet 및 originalDataSet 세팅
			if(config.data.type == 'local') {
				datatableInfo.dataSet = config.data.source;
				datatableInfo.originalDataSet = config.data.source;
			}
			
			//contextmenu
			if(!$.osl.isNull(targetConfig.contextMenu)){
				//메뉴 구조
				if(targetConfig.contextMenu.hasOwnProperty("menu")){
					var menuTree = targetConfig.contextMenu["menu"];
					var paramSelect = $.noop;
					
					//선택 함수
					if(targetConfig.contextMenu.hasOwnProperty("select")){
						paramSelect = targetConfig.contextMenu["select"];
					}
					
					//실행 함수 정의
					var selectFunction = function(event, ui){
						//버튼 권한
						var btnAuthVal = $.osl.btnAuthVal;
						var authBtn = "select";
						if(ui.item.data().hasOwnProperty("authButton")){
							authBtn = ui.item.data().authButton;
						}
						
						var authBtnStr = authBtn[0].toUpperCase() + authBtn.substring(1);
						if(btnAuthVal["btnAuth"+authBtnStr+"Yn"] != "Y"){
							//버튼에 대한 권한이 없으면
							$.osl.alert($.osl.lang("common.error.nonAuth"));
							return false;
						}
						
						var cmdId = ui.cmd;
						var targetRow = ui.target.parents("tr.osl-datatable__row");
						
						//자기 자신인경우
						if(ui.target.hasClass("tr.osl-datatable__row")){
							targetRow = ui.target;
						}
						
						var rowNum = targetRow.data("row");
						var rowData = null;
						try{
							rowData = datatableInfo.data()[rowNum];
						}catch(e){
							//error skip
							console.log(e);
						}
						
						paramSelect(cmdId, rowData, rowNum, ui.target, Object.keys(targetConfig.actionFn)
							,function(actionFnName){
								var targetFn = targetConfig.actionFn[actionFnName];
								//함수 있는지 체크
								if(targetConfig.actionFn.hasOwnProperty(actionFnName) && typeof targetFn == "function"){
									return targetFn(rowData, targetId, "info",rowNum, ui.target);
								}
								return false;
							}
						);
					};
					
					$("#"+targetId).contextmenu({
						delegate: ".osl-datatable__row",
						menu: menuTree,
						select: selectFunction,
						//열리기 전에 이벤트 제어
						beforeOpen: function(event, ui){
							//header인 경우 중지
							if(ui.target.parents("thead.osl-datatable__head").length > 0){
								return false;
							}
							
							//열릴때 row 클릭
							var targetRow = ui.target.parents("tr.osl-datatable__row");
							var targetElem = targetRow.find("input.osl-evt__datatable-checkbox");
							var rowNum = targetRow.data("row");
							
							// 기존 선택된 체크박스 전체 해제
							var selNodes = datatables.targetDt.getSelectedRecords();
							datatables.targetDt.setInactive(selNodes);
							
							//$("#"+targetId +" .osl-datatable__row--selected").removeClass("osl-datatable__row--active");
							
							//선택된것처럼 row 컬러가 그대로 남아있으므로
							//targetRow.removeClass("osl-datatable__row--selected");
							
							//체크박스 옵션 있는 경우에만 체크
							if(targetConfig.hasOwnProperty("rows") && targetConfig.rows.hasOwnProperty("clickCheckbox")){
								//row click에 check 변동 true인경우
								if(targetConfig.rows.clickCheckbox == true){
									//선택 row active
									datatables.targetDt.setActive(targetElem);
									
									selNodes.find("input.osl-evt__datatable-checkbox").prop("checked", false);
									targetElem.prop("checked", true);
									
									//카드형 동기화
									if(!$.osl.isNull(targetConfig.cardUiTarget)){
										//기존 체크 항목 모두 해제
										var cardAllChkbox = targetConfig.cardUiTarget.find("input[type=checkbox][data-datatable-id="+targetId+"]");
										$.each(cardAllChkbox, function(idx, chkboxElem){
											$(chkboxElem).prop("checked", false);
										});
										//row 선택한 체크 항목만 선택
										targetConfig.cardUiTarget.find("input[type=checkbox][data-datatable-id="+targetId+"][value="+rowNum+"]").prop("checked", true);
									}
								}
							}
						},
					});
				}
			}else{
				//우측 메뉴 지정 없는 경우 우측 메뉴 막기
				$(ktDatatableTarget).on("contextmenu", function(){
					return false;
				});
			}
			
			//type: remote - ajax complete
			$(ktDatatableTarget).on("xhr.dt",function(evt, setting, json){
				
				if($.osl.isNull(json)){
					return;
				}
				
				// 마지막 조회 데이터
				datatableInfo.lastResponse = json;
				if(targetConfig.paging){
					//페이징 처리
					json.recordsFiltered = json.meta.total;
					json.recordsTotal = json.meta.total;
				}
				
				//사용자 함수 실행
				targetConfig.callback.ajaxDone(evt.target, json.data, datatableInfo);
				
			});

			//ajax 요청전 처리
			$(ktDatatableTarget).on("preXhr.dt",function(evt,config,ajaxData){
				//order 정보가 있는 경우 데이터 셋팅
				var orderList = ajaxData.order;
				if(orderList.length > 0){
					var orderObj = {};
					orderObj = orderList[0];
					if(config.aoColumns[orderObj.column].orderable){
						//기본값 searchField 옵션 값 세팅, 데이터 테이블 세팅시 colomns에 searchField: "" 옵션 추가 필요
						var sortFieldId = config.aoColumns[orderObj.column].searchField;
						//searchField가 없는 경우
						if($.osl.isNull(sortFieldId)){
							//fielId값 세팅
							sortFieldId = config.aoColumns[orderObj.column].fieldId;
						}
						ajaxData.sortDirection = orderObj.dir;
						ajaxData.sortFieldId = sortFieldId;
					}
				}
			});

			//datatable init
			$(ktDatatableTarget).on("init.dt",function(evt,config,json){
				targetConfig.callback.initComplete(evt.target, config, datatableInfo);
				
				// create table head element
				datatableInfo.tableHead = datatableInfo.table().header();
				// create table body element
				datatableInfo.tableBody = datatableInfo.table().body();
				
				//lengthChange 없는 경우 col-md조정
				if(!targetConfig.lengthChange){
					//테이블 row 정보
					var infoElem = $("#"+targetId+"_table_info").parent("div");
					infoElem.removeClass("col-md-5");
					infoElem.addClass("col-md-4");
					
					//페이지네이션
					var paginateElem = $("#"+targetId+"_table_paginate").parent("div");
					paginateElem.removeClass("col-md-7");
					paginateElem.addClass("col-md-8");
				}
				
				//카드형 UI 대상이 있는 경우 체크박스 제어하기
				if(!$.osl.isNull(targetConfig.cardUiTarget)){
					
					//데이터테이블 UI 타입 
					var currentViewType = $.osl.user.usrOptData.OPT00005;
					
					//테이블타입이라면 action 교체 및 테이블 노출
					if(!$.osl.isNull(currentViewType) && currentViewType.value == '02'){
						//카드 UI 노출
						//데이터 테이블 영역만 숨김 처리
						//$("#"+targetId+" .dataTables_wrapper").css({visibility: "hidden", height: 0});
						$("#"+targetId+" .dataTables_wrapper .table-responsive").addClass("d-none");
						targetConfig.cardUiTarget.show();
						
						//선택 메뉴 active
						var tableBtn = $(".osl-evt__btn-view-type[data-view-type=01]");
						var cardBtn = $(".osl-evt__btn-view-type[data-view-type=02]");
						cardBtn.addClass("active");
						tableBtn.removeClass("active");
					}
					
					//datatable checkbox에 이벤트 걸기
					var datatableBody = datatableInfo.tableBody;
					var datatableChkbox = $(datatableBody).find("input.osl-evt__datatable-checkbox");
					
					//체크박스가 있는경우
					if(datatableChkbox.length > 0){
						datatableChkbox.change(function(){
							var rowNum = $(this).parents("tr.osl-datatable__row").data("row");
							var targetElem = targetConfig.cardUiTarget.find("input[type=checkbox][data-datatable-id="+targetId+"][value="+rowNum+"]");
							if(targetElem.length > 0){
								if($(this).is(":checked")){
									targetElem.prop("checked", true);
								}else{
									targetElem.prop("checked", false);
								}
							}
						});
					}
					
					//datatable all-check에 이벤트 걸기
					var datatableHead = datatableInfo.tableHead;
					var datatableChkbox = $(datatableHead).find("input.osl-checkbox.osl-evt__all-checkbox");
					
					//카드 전체선택
					datatableChkbox.change(function(){
						var targetElem = targetConfig.cardUiTarget.find("input[type=checkbox][data-datatable-id="+targetId+"]");
						/*
						if(targetElem.length > 0){
							if($(this).is(":checked") == true){
								targetElem.prop("checked", true);
							}else{
								targetElem.prop("checked", false);
							}
						}
						*/
						if(targetElem.length > 0){
							if($(this).is(":checked") == true){
								targetElem.prop("checked", true);
								datatableInfo.rows().select();
								
								//체크박스 클릭시에는 selected 효과를 숨기기 위해
								$.each(datatableInfo.rows({selected:true}).nodes(), function(r, tr){
									$(tr).addClass("not-selected-color");
								});
								
							}else{
								targetElem.prop("checked", false);
								datatableInfo.rows().deselect();
								
								//체크박스 클릭시에는 selected 효과를 숨기기 위해 적용한 클래스 제거
								$.each(datatableInfo.rows().nodes(), function(r, tr){
									$(tr).removeClass("not-selected-color");
								});
							}
						}
					});
				}
				
				//모든 init행동이 완료된 이후
				targetConfig.callback.afterInitComplete(evt.target, config, datatableInfo);
			});
			
			//datatable preDraw
			datatableInfo.on("preDraw",function(evt,config){
				if(targetConfig.callback.hasOwnProperty("preDrawCallback")){
					targetConfig.callback.preDrawCallback(evt, config, datatableInfo);
				}
			});
			
			//datatable reloaded
			datatableInfo.on("draw.dt",function(evt,config){
				
				//페이징 안한다고 했으면
				if(!targetConfig.paging){
					$(evt.target).parent().siblings().remove();
				}
				
				//사용자 지정
				targetConfig.callback.prevReloaded(evt.target, config, datatableInfo);
				
				//2025.02.12 lg 반응형 제거로 인해 중지처리
				//검색바 반응형을 위해 재적용
				//searchEvt.resize();
				
				//reload되면서 클래스가 제거되는 경우 발생하여 추가
				$.each($(evt.target).find("tbody td"),function(number, cellTarget){
					if(cellTarget.className.indexOf("osl-datatable__cell") < 0){
						$(cellTarget).addClass("osl-datatable__cell");
					}
				});
				
				//tooltip 적용
				OSLApp.initTooltips();
				//열린 툴팁 모두 닫기
   				OSLApp.fnCloseTooltips();
				
				//해당 버튼이 화면에서 안보일 때 열린 contextMenu, tooltip 등 있으면 숨기기
				OSLApp.initObserver();
				
				//카드 UI 대상 있는 경우 해당 UI제어 동작
				if(!$.osl.isNull(targetConfig.cardUiTarget)){
					var targetUIs = targetConfig.cardUiTarget;
					if(targetUIs.length > 0){
						//loop돌면서 대상 UI에 모든 동작 적용 - (단일 UI대상이 아닌경우 속도 저하 우려 있음)
						$.each(targetUIs, function(idx, targetUI){
							//dropdown item list
							var dropdownItems = $(targetUI).find(".menu-item[data-datatable-id="+targetId+"][data-datatable-expans=dropdown]");
							$.each(dropdownItems, function(itemIdx, item){
								//대상 action타입 가져오기
								var btnAction = $(this).data("datatable-action");
								
								//대상 rownum 가져오기
								var rownum = $(this).data("datatable-rownum");
								
								//rownum 값이 없는경우 dropdown-menu에서 찾음
								if($.osl.isNull(rownum)){
									rownum = $(this).parent(".menu[data-kt-menu='true']").data("datatable-rownum");
								}
								
								//부모에서 rownum 값이 없는경우 상위에서 datatable-rownum 찾음
								if($.osl.isNull(rownum)){
									rownum = $(this).parents("[data-datatable-rownum]").data("datatable-rownum");
								}
								
								//그래도 없으면 동작 중지
								if($.osl.isNull(rownum)){
									return true;
								}
								
								//action이 있는경우
								if(!$.osl.isNull(btnAction)){
									//action별 동작 호출
									if(btnEvt.action.hasOwnProperty(btnAction)){
										var rowData = datatables.targetDt.data("row")[rownum];
										$(this).click(function(event){
											targetConfig.actionFn[btnAction](rowData, targetId, "info", rownum, false);
										});
									}else{
										//action 없는경우 사용자 설정 값에 해당 함수 있는지 체크
										if(targetConfig.actionFn.hasOwnProperty(btnAction)){
											$(this).off("click");
											$(this).click(function(event){
												//중복 이벤트 중지
												event.cancelable = true;
												event.stopPropagation();
												event.preventDefault();
												event.returnValue = false;
												
												var rowData = datatables.targetDt.data("row")[rownum];
												var rowDatas = [];
												rowDatas.push(rowData);
												
												targetConfig.actionFn[btnAction](rowDatas, targetId, "list", rowDatas.length ,this);
											});
										}
									}
								}
							});
							
							//카드형 UI 체크박스 선택 시 데이터테이블 체크박스 선택
							$(targetUI).find("input[type=checkbox][data-datatable-id="+targetId+"]").click(function(){
								var rowNum = this.value;
								var targetRow = $(datatableInfo.table().body()).find("[data-row="+rowNum+"]");
								
								var targetElem = targetRow.find("input.osl-evt__datatable-checkbox");
								
								if(targetElem.length > 0){
									if(targetElem.is(":checked") == true){
										targetElem.prop("checked", false);
										
										datatableInfo.setInactive(targetElem);
										//선택된것처럼 row 컬러가 그대로 남아있으므로
										targetRow.removeClass("osl-datatable__row--selected");
										targetRow.addClass("osl-datatable__row--even");
									}else{
										targetElem.prop("checked", true);
										datatableInfo.setActive(targetElem);
									}
								}
							});
							
							// .osl-evt__datatable--card에 onclick 이벤트 걸기
							$(targetUI).find(".osl-evt__datatable--card").click(function(){
								//카드형의 more 버튼 클릭이면 중지, 또는 드랍다운 버튼 클릭인경우 중지
								if($(event.target).closest("[data-kt-menu-trigger]").length > 0 || $(event.target).closest(".osl-menu").length > 0) {
									return;
								}
								var rowNum = $(this).data("datatable-rownum");
								var rowData = datatables.targetDt.row(rowNum).data();
								
								//해당 datatable click 로직 가져오기
								datatables.config.actionFn["click"](rowData, targetId, "card", rowNum, this );
							});
							
						});
					}
				}
				
				//접근 권한에 따른 버튼 제어
				$.osl.btnAuthSetting();
				
				//사용자 지정
				targetConfig.callback.nextReloaded(evt.target, config, datatableInfo);
			});
			
			// TODO 이벤트 및 콜백 처리
			/*
			//페이지 내 레코드 수 변경 이벤트
			$(ktDatatableTarget).on("osl-datatable--on-update-perpage",function(evt,args){
				targetConfig.callback.perpage(evt.target, args, datatableInfo);
				//접근 권한에 따른 버튼 제어
				$.osl.btnAuthSetting();
			});
			
			//페이지 강제 이동 이벤트
			$(ktDatatableTarget).on("osl-datatable--on-goto-page",function(evt,args){
				targetConfig.callback.gotoPage(evt.target, args, datatableInfo);
				//접근 권한에 따른 버튼 제어
				$.osl.btnAuthSetting();
			});
			//데이터 체크박스 체크 이벤트
			$(ktDatatableTarget).on("osl-datatable--on-check",function(evt,ids){
				targetConfig.callback.onCheck(evt.target, ids, datatableInfo);
			});
			//데이터 체크박스 체크해제 이벤트
			$(ktDatatableTarget).on("osl-datatable--on-uncheck",function(evt,ids){
				targetConfig.callback.unCheck(evt.target, ids, datatableInfo);
			});
			//datatable column sort
			$(ktDatatableTarget).on("osl-datatable--on-sort",function(evt,data){
				//필드ID 검증
				if($.osl.isNull(datatableInfo.getColumnByField(data.field))){
					$.osl.alert($.osl.lang("datatable.sort.fieldNotMatch"));
				}else{
					 
					 * sort 해당 컬럼에 sortField 있는지 체크, 있다면 대체
					 * sort정보 데이터 테이블 파라미터에 대입 
					 * 페이지 재 조회
					 * 
					var field = data.field;
					var columnTarget = datatableInfo.getColumnByField(data.field);
					if(columnTarget.hasOwnProperty("sortField")){
						field = columnTarget.sortField;
					}
					datatableInfo.setDataSourceParam("sortFieldId",field);
					datatableInfo.setDataSourceParam("sortDirection",data.sort);
					
					//데이터 테이블 재 조회
					datatableInfo.reload();
					
					//테이블 정렬 callback 실행
					targetConfig.callback.sort(evt.target, data, datatableInfo);
				}
			});
			
			//레이아웃 업데이트시 (화면 비율 변경) 이벤트
			$(ktDatatableTarget).on("osl-datatable--on-layout-updated",function(evt,config){
				var targetFieldStr = '';
				var targetFieldFn = {};
				
				//컬럼 이벤트 대입
				$.each(targetConfig.columns, function(idx, map){
					//onclick
					if(map.hasOwnProperty("onclick")){
						//함수일때만 실행
						if(typeof map.onclick == "function"){
							if(!$.osl.isNull(targetFieldStr)){
								targetFieldStr += ',';
							}
							targetFieldStr += "td.osl-datatable__cell[data-field="+map.field+"] ";
							targetFieldFn[map.field] = map.onclick;
						}
					}
				});
				var targetObj = $("#"+targetId);
				
				if(!$.osl.isNull(targetFieldStr)){
					//click event 대입
					targetObj.off("click",targetFieldStr);
					targetObj.on("click",targetFieldStr, function(event){
						//중복 이벤트 중지
						event.cancelable = true;
						event.stopPropagation();
						event.preventDefault();
						event.returnValue = false;
						
						//fieldId
						var fieldId = $(this).data("field");
						
						//로우 데이터 조회
						var rowNum = $(this).parent("tr").data("row");
						
						//클릭 대상이 detail 요소인경우
						var detailElem = $(this).parents(".osl-datatable__row-detail");
						if(detailElem.length > 0){
							rowNum = $(this).parents(".osl-datatable__row-detail").prev(".osl-datatable__row").data("row");
						}
						
						var rowData = null;
						try{
							rowData = datatableInfo.getDataSet()[rowNum];
						}catch(e){
							//error skip
							console.log(e);
						}
						
						//설정에 걸려있는 onclick 이벤트 실행
						if(targetFieldFn.hasOwnProperty(fieldId)){
							targetFieldFn[fieldId](rowData, event);
						}
						//map.onclick(rowData, event);
					});
				}
				
				//카드형 UI 대상이 있는 경우 체크박스 제어하기
				if(!$.osl.isNull(targetConfig.cardUiTarget)){
					var targetElem = targetConfig.cardUiTarget.find("input[type=checkbox]:checked");
					
					//체크 해제
					$.each(targetElem, function(idx, map){
						map.checked = false;
					});
				}
				
				//접근 권한에 따른 버튼 제어
				$.osl.btnAuthSetting();
			});*/
			
			//폴딩되었을 때
			datatableInfo.on("responsive-display",function(evt, datatable, row, showHide, update, columns){
				//어디선가 클릭과 같이 row 색상 변경하므로
				event.stopPropagation();
				event.preventDefault();
				
				//툴팁 세팅
				OSLApp.initTooltips();
				
				//해당 버튼이 화면에서 안보일 때 열린 contextMenu, tooltip 등 있으면 숨기기
				OSLApp.initObserver();
			});
			
			//데이터테이블 크기 조정으로 인해 표시되는 열이 변경될 경우 이벤트 발생
			datatableInfo.on("responsive-resize",function(evt, datatable, columns){
				var targetFieldStr = '';
				var targetFieldFn = {};
				
				//컬럼 이벤트 대입
				$.each(targetConfig.columns, function(idx, map){
					//onclick
					if(map.hasOwnProperty("onclick")){
						//함수일때만 실행
						if(typeof map.onclick == "function"){
							if(!$.osl.isNull(targetFieldStr)){
								targetFieldStr += ',';
							}
							targetFieldStr += "td.osl-datatable__cell[data-field="+map.fieldId+"] ";
							targetFieldFn[map.fieldId] = map.onclick;
						}
					}
				});
				var targetObj = $("#"+targetId);
				
				if(!$.osl.isNull(targetFieldStr)){
					//click event 대입
					targetObj.off("click",targetFieldStr);
					targetObj.on("click",targetFieldStr, function(event){
						//중복 이벤트 중지
						event.cancelable = true;
						event.stopPropagation();
						event.preventDefault();
						event.returnValue = false;
						
						//fieldId
						var fieldId = $(this).data("field");
						
						//로우 데이터 조회
						var rowNum = $(this).parent("tr").data("row");
						
						//클릭 대상이 detail 요소인경우
						var detailElem = $(this).parents(".osl-datatable__row-detail");
						if(detailElem.length > 0){
							rowNum = $(this).parents(".osl-datatable__row-detail").prev(".osl-datatable__row").data("row");
						}
						
						var rowData = null;
						try{
							rowData = datatableInfo.dataSet[rowNum];
						}catch(e){
							//error skip
							console.log(e);
						}
						
						//설정에 걸려있는 onclick 이벤트 실행
						if(targetFieldFn.hasOwnProperty(fieldId)){
							targetFieldFn[fieldId](rowData, event);
						}
						//map.onclick(rowData, event);
					});
				}
				
				// begin:: 2024-08-14 데이터테이블 카드형 UI 사용중일 때 브라우저 사이즈 줄이면 체크박스 체크해제 처리 로직 주석
				// 해당 코드에 대한 설명이 없어 우선 주석처리로 커밋
				/*
				//카드형 UI 대상이 있는 경우 체크박스 제어하기
				if(!$.osl.isNull(targetConfig.cardUiTarget)){
					var targetElem = targetConfig.cardUiTarget.find("input[type=checkbox]:checked");
					
					//체크 해제
					$.each(targetElem, function(idx, map){
						map.checked = false;
					});
				}*/
				// end:: 2024-08-14 데이터테이블 카드형 UI 사용중일 때 브라우저 사이즈 줄이면 체크박스 체크해제 처리 로직 주석
				
				//접근 권한에 따른 버튼 제어
				$.osl.btnAuthSetting();
			}); //화면 변경 렌더링 끝

			//전체 버튼 이벤트 대입
			btnEvt.list();
			datatables = {"config": targetConfig, "targetDt": datatableInfo};
			
			//생성된 데이터 저장
			$.osl.datatable.list[targetId] = datatables;
		}
		
		return datatables;
	};
	
	return {
        // public functions
        init: function() {
        	//core에 커스텀 옵션 세팅
    		$.osl.datatable.setting = datatableSetting;
        },
        /*
    	* function 명 : fnSearchReset
    	* function 설명 : 검색 바 초기화
    	* param datatableId : 초기화 대상 데이터테이블 아이디
    	*/
    	fnSearchReset : function (datatableId){
    		//드롭다운 메뉴 선택 활성화 취소 및 재선택
    		$(".osl-evt__datatable-search__dropdown[data-datatable-id="+datatableId+"] .osl-evt__datatable-search--menu-item").removeClass("active");
    		$(".osl-evt__datatable-search__dropdown[data-datatable-id="+datatableId+"] .osl-evt__datatable-search--menu-item[data-field-id=-1]").addClass("active");
    		
    		//검색 메뉴 명 가져오기
    		var searchBarMenuStr = $(".osl-evt__datatable-search__dropdown[data-datatable-id="+datatableId+"] .osl-evt__datatable-search--menu-item[data-field-id=-1]").text();
    		//검색 메뉴 버튼 text 변경
    		$(".osl-evt__datatable-search__dropdown-btn[data-datatable-id='"+datatableId+"'] .osl-evt__datatable-search__droupdown-btn-text").text(searchBarMenuStr);
    		
    		//검색 메뉴 버튼 변경
    		$(".osl-evt__datatable-search__dropdown[data-datatable-id="+datatableId+"]").parent().children(".btn.dropdown-toggle").text(searchBarMenuStr);
    		
    		//select 감추기
    		$(".osl-evt__datatable-search--select[data-datatable-id='"+datatableId+"']").hide();
    		$("#select2-searchSelect_"+datatableId+"-results").attr("aria-hidden", "true");
    		
    		//input 보이기
    		$(".osl-evt__datatable-search--input-div[data-datatable-id='"+datatableId+"']").show();
    		$(".osl-evt__datatable-search--input-text[data-datatable-id='"+datatableId+"']").removeAttr("readonly");
    		$(".osl-evt__datatable-search--input-text[data-datatable-id='"+datatableId+"']").attr("disabled",true);
    		//그려진 캘린터 아이콘이 있는 경우 지우기
    		$(".osl-evt__datatable-search--input-div[data-datatable-id='"+datatableId+"'] i").removeClass("la-calendar");
    		
    		//input에 검색 값 비우기
    		$(".osl-evt__datatable-search--input-text#searchData_"+datatableId).val("");
    		$(".osl-evt__datatable-search--input-text#searchHiddenData_"+datatableId).val("");
    	},
    };
}();