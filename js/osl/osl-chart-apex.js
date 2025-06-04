/**
* function 명 	: OSLApexChartSetting
* function 설명	: apexchart 라이브러리 대한 스크립트 파일
*/
var OSLApexChartSetting = function () {
	
	// 차트 라이브러리 정보
	var libraryInfo = {
			name : "apexChart" 	// 차트 라이브러리 명
		,	version : "3.50.0" 		// 현재 솔루션에서 사용하는 차트 라이브러리 버전
		,	versionDtm : "2024-07" 	// 현재 차트 라이브러리 버전 출시일
		,	license : "MIT"			// 라이브러리 라이선스
	};
	
	// 사용가능 차트 목록
	var supportApexChartType = {
		desc:"차트 생성시 chartType에 지정가능한 타입은 다음과 같다.",
		useChartType : ["bar (막대)", "line (선)", "area (영역)", "area (영역)", "pie (파이)", "donut (도넛)", "mixLineBar (라인+막대 믹스)", "rader (방사형)", "multiRader (멀티 방사형)", "heatmap (히트맵)"]
	};
	
	
	// 차트 초기화 유무
	var isChartInit = true;
	
	/**
	 * function 명 : documentSetting
	 * function 설명 : apex 차트 생성 (private function)
	 * @param publicChartType : 차트 유형 (공통)
	 * @param userConfig : 차트 생성시 정의한 설정 값 (공통 설정 + 차트 생성시 지정한 설정)
	 * @param targetId : 차트 생성 대상 요소 ID (String)
	 */
	var documentSetting = function(publicChartType, userConfig, targetId){
		
		// 내부에서 추가된 chart
		var createdChart = {};
		
		//차트 데이터 chartDataArrays
		var chartDataArrays = {};
		
		// 차트 툴바 설정 (줌, refresh 등)
		var defaultChartToolbarOpt = {
			download: false, 	// 툴바에 차트 다운로드 아이콘 표시
			selection: false, 	// 툴바에 사각형 선택 아이콘 표시
			zoom: false, 		// 줌
			zoomin: false, 		// 줌인 (툴바에 차트 영역 50% 확대 아이콘 표시)
			zoomout: false, 	// 줌아웃 (툴바 차트영역 축 
			pan: false, 		// 도구모음 패닝 아이콘 표시 
			reset: false		// 줌 리셋
		}
		
		// 차트 데이터 키값, x축 및 y축 데이터 키값을 가져온다
		var dataParam = userConfig.data.param;
		
		// 차트 생성시 입력한 차트 유형 검증
		
		// 깊은 복사
		var targetConfig = $.extend(true, {}, userConfig);
		
		// begin:: apex chart 설정
		var apexChartConfig = {
			// 차트 대한 옵션 정의
			chart: {
				width: targetConfig.chart.width,			// 차트 넓이
				height: targetConfig.chart.height,			// 차트 높이
				type: targetConfig.data.param.chartType, 	// 차트 종류 - line, area, bar, heatmap
				toolbar : targetConfig.chart.toolbar,		// 차트 툴바
				// 차트 이벤트 정의
				events:{
					// 차트 초기 에니메이션 완료 시 실행
					animationEnd: targetConfig.actionFn.animationEnd,
					//차트가 그려지기 전 실행
					beforeMount: targetConfig.actionFn.beforeMount,
					// 차트가 그려진 후 실행
					mounted: targetConfig.actionFn.mounted,
					// 차트의 영역을 클릭 시 실행 (영역 클릭 이벤트
					click: function(event, chartContext, opts){
						// 이벤트 전파 중지
						event.stopPropagation();
						var lastResponse = opts.config.lastResponse;
						var pointIdx = opts.dataPointIndex;
						if(pointIdx == -1){
							//데이터가 없는 경우
							return false;
						}
						var xKey = chartContext.data.w.config.data.param.xKey;
						//해당 div의 x축값 가져오기
						var xAxisLabel = "";
						if(xKey != null){
							xAxisLabel = chartContext.data.w.config.lastResponse.chartData[pointIdx][xKey];
						}else if(chartContext.data.w.config.data.param.xKeyArr != null){
							xAxisLabel = chartContext.data.w.config.data.param.xKeyArr[pointIdx];
						}
						var seriesIndex = opts.seriesIndex;
						
						// click action function  
						targetConfig.actionFn.click(xAxisLabel, seriesIndex, pointIdx, lastResponse, event);
					},
				},
				// 언어설정
				locales: [{
					"name": "en",
					"options": {
						// 툴바에 다운로드 부분 문구
						// TODO 배용진 2024-08-22 : 차트 작업후 언어팩 적용 필요
						"toolbar": {
							"exportToCSV": "CSV로 다운로드",
							"exportToSVG": "SVG로 다운로드",
							"exportToPNG": "PNG로 다운로드",
						}
				  }
				}]
			},
			// 차트 영역 내부 x,y축 선 표시
			/*grid:{
				show: false
			},*/
			// 데이터 없을 경우 메시지 정의
			noData:{
				text : $.osl.lang("message.noData"),
				align : "center",
				verticalAlign: "middle",
				offsetX: 0,
				offsetY: 0,
			},
			// 데이터 라벨 설정 - 차트에 숫자 보이는 부분 정의
			dataLabels: targetConfig.chart.dataLabels,
			// 라벨
			labels: targetConfig.chart.labels,
			// 범례
			legend: targetConfig.chart.legend,
			// 차트에 점찍는 것
			markers: targetConfig.chart.markers,
			// 차트 부드러운선 그리기 설정
			stroke: targetConfig.chart.stroke,
			// x축 설정
			xaxis: targetConfig.chart.xaxis,
			// y축 설정
			yaxis: targetConfig.chart.yaxis,
			// 화면에 따른 반응형 사이즈 조정
			responsive: targetConfig.chart.responsive,
			// 사이즈 조정시 새로 그릴 것인지 여부 (true, false)
			redrawOnWindowResize: targetConfig.chart.redrawOnWindowResize,
			// 배경에 그리드 설정하는 것
			grid: targetConfig.chart.grid,
			// 막대 차트 그룹으로 표시 여부 (true:막대 하나에 여러 데이터 표출, flase:stacked 미사용 / 기본값 false)
			stacked:targetConfig.chart.stacked,
			// 막대차트 그룹의 각 데이터를 %로 표시 - 사용시 100%로 지정
			stackType:targetConfig.chart.stackType, 
			// 차트 타이틀
			title: targetConfig.chart.title,
			// 라인, 블럭 컬러
			colors: targetConfig.chart.colors,
			// 툴팁 설정
			tooltip: targetConfig.chart.tooltip,
			// 각 차트별 옵션 지정
			plotOptions:{
				bar: targetConfig.chart.option.bar, // 막대차트
				line: targetConfig.chart.option.line, // 선형차트
				area: targetConfig.chart.option.area, // 영역 차트
				donut: targetConfig.chart.option.donut, // 파이차트 및 도넛차트
				pie: targetConfig.chart.option.pie, // 파이차트 및 도넛차트
				rader: targetConfig.chart.option.rader, // 방사형 차트
				heatmap: targetConfig.chart.option.heatmap, // 히트맵 차트
			},
			//차트 데이터
			series: [],
			// callback 설정
			callback:{
				// 재조회
				reloaded: function(dataArr, targetId){
					
					//차트 데이터 초기화 
					chartDataArrays=[];
					targetConfig.xaxis.categories = [];
					targetConfig.yaxis.categories = [];
					
					// dataType local 아닐 경우
					if($.osl.isNull(targetConfig.data.param.dataType != "local")){
						// ajax 호출 (차트 데이터 조회)
						var ajaxObj = new $.osl.ajaxRequestAction({"url": targetConfig.data.url, "async": false}, targetConfig.data.param);
						//ajax 전송 성공 함수
						ajaxObj.setFnSuccess(function(data){
							// 에러 있을 경우 alert
							if(data.errorYn == "Y"){
								$.osl.alert(data.message,{type: 'error'});
							}
							// 정상 조회 시
							else{
								// 조회된 데이터 추가
								targetConfig.lastResponse = data;
								
								//차트 데이터 초기화 
								chartDataArrays=[];
								targetConfig.xaxis.categories = [];
								
								targetConfig.yaxis.categories = [];
								
								chartTypeDataSetting[targetConfig.data.param.chartType](data.chartData);
								$.osl.chart.list[targetId].targetCt.updateSeries(targetConfig.series);
								targetConfig.callback.ajaxDone(data, data.chartData);
							}
						});
				    	//AJAX 전송
						ajaxObj.send();
					}
					// 로컬 데이터 이용하는 경우
					else{
						chartTypeDataSetting[targetConfig.data.param.chartType](dataArr);
						targetConfig.lastResponse.chartData = targetConfig.data.param.dataArr;
						$.osl.chart.list[targetId].targetCt.updateSeries(targetConfig.series);
					}
				}
			}
		}
		// end:: apex chart config
		
		// apex 차트 config와 차트 생성시 사용자가 지정한 config 값 병합 (깊은 복사)
		targetConfig = $.extend(true, targetConfig, apexChartConfig);
		
		// toolbar 표시유무에 따라 추가
		if( !targetConfig.chart.toolbar.show || $.osl.isNull(targetConfig.chart.toolbar.show)){
			// 툴바 미사용 시 툴바의 각 아이콘 미사용 옵션으로 적용
			targetConfig.chart.toolbar.tools = defaultChartToolbarOpt;
		}
		
		/**
		 * 차트 유형별 데이터 세팅 함수 정의
		 * - 차트 유형 참고(apex 차트 Docs) : https://apexcharts.com/docs/chart-types/area-chart
		 * - 차트 샘플 데모 사이트 : https://apexcharts.com/javascript-chart-demos/ 
		 */
		var chartTypeDataSetting = {
			// 막대차트
			"bar": function(array){
				// 1. 조회한 차트 데이터 가공 (각 키별 데이터 가공한다)
				// 차트에 세팅할 데이터 loop (dataIdx: 순번, value: 조회한 차트 데이터 값으로 json형태로 되어있다)
				$.each(array, function(dataIdx, value){
					// 차트 데이터 가공
					chartDataArrays = fnChartDataProcessing(dataParam, value, chartDataArrays);
					
					// x축 데이터 가공
					if(!$.osl.isNull(dataParam.xKey)){
						// 차트 데이터에 x축 키값 없는 경우
						if(!chartDataArrays.hasOwnProperty(dataParam.xKey)){
							// x축 키값의 빈 배열 추가
							chartDataArrays[dataParam.xKey] = [];
						}
						// x축 차트 데이터 추가
						chartDataArrays[dataParam.xKey].push( value[dataParam.xKey] );
					}
					
					// y축 데이터 가공
					if(!$.osl.isNull(dataParam.yKey)){
						// 차트 데이터에 y축 키값 없는 경우
						if(!chartDataArrays.hasOwnProperty(dataParam.yKey)){
							chartDataArrays[dataParam.yKey] = [];
						}
						// y축 차트 데이터 추가
						chartDataArrays[dataParam.yKey].push( value[dataParam.yKey] );
					}
				});
				
				// 2. 가공한 데이터를 차트에 세팅
				for(var idx = 0; idx < Object.keys(dataParam.key).length ;idx++){
					// 데이터 세팅하기 위해 시리즈 인덱스별 명칭 지정 
					// 시리즈는 {name:이름(String), data:차트에 표시될 데이터(array)} 형태의 json으로 세팅해야 함
					targetConfig.series[idx] = {name:dataParam.keyNm["keyNm"+(idx+1)]};
					
					if(!$.osl.isNull(chartDataArrays[dataParam.key["key"+(idx+1)] ])){
						// 가공한 차트 데이터에 키값 존재시 시리즈에 세팅한다.
						targetConfig.series[idx].data = chartDataArrays[dataParam.key["key"+(idx+1)] ];
					}else{
						// 없을경우 시리즈 데이터 빈 배열로 세팅
						targetConfig.series[idx].data=[];
					}
				}
				
				// 3. x축 categories(라벨) 세팅
				if(!$.osl.isNull(dataParam.xKey)){
					// x축에 표시될 값 (categories) 세팅
					targetConfig.xaxis.categories = chartDataArrays[dataParam.xKey];
				// x축 표시값 배열인 경우 체크
				}else if(!$.osl.isNull(dataParam.xKeyArr)){
					targetConfig.xaxis.categories = dataParam.xKeyArr;
				}
				
				if($.osl.isNull(targetConfig.xaxis.categories)) {
					targetConfig.xaxis.categories = [];
				}
			},
			// 선형 차트
			"line": function(array){
				// 1. 조회한 차트 데이터 가공 (각 키별 데이터 가공한다)
				// 차트에 세팅할 데이터 loop (dataIdx: 순번, value: 조회한 차트 데이터 값으로 json형태로 되어있다)
				$.each(array, function(dataIdx, value){
					
					// 차트 데이터 가공
					chartDataArrays = fnChartDataProcessing(dataParam, value, chartDataArrays);
					
					// x축 데이터 가공
					if(!$.osl.isNull(dataParam.xKey)){
						// 차트 데이터에 x축 키값 없는 경우
						if(!chartDataArrays.hasOwnProperty(dataParam.xKey)){
							// x축 키값의 빈 배열 추가
							chartDataArrays[dataParam.xKey] = [];
						}
						// x축 차트 데이터 추가
						chartDataArrays[dataParam.xKey].push( value[dataParam.xKey] );
					}
					
					// y축 데이터 가공
					if(!$.osl.isNull(dataParam.yKey)){
						// 차트 데이터에 y축 키값 없는 경우
						if(!chartDataArrays.hasOwnProperty(dataParam.yKey)){
							chartDataArrays[dataParam.yKey] = [];
						}
						// y축 차트 데이터 추가
						chartDataArrays[dataParam.yKey].push( value[dataParam.yKey] );
					}
				});
				
				// 2. 가공한 데이터를 차트에 세팅
				for(var idx = 0; idx < Object.keys(dataParam.key).length ;idx++){
					// 데이터 세팅하기 위해 시리즈 인덱스별 명칭 지정 
					// 시리즈는 {name:이름(String), data:차트에 표시될 데이터(array)} 형태의 json으로 세팅해야 함
					targetConfig.series[idx] = {name:dataParam.keyNm["keyNm"+(idx+1)]};
					
					if(!$.osl.isNull(chartDataArrays[dataParam.key["key"+(idx+1)] ])){
						// 가공한 차트 데이터에 키값 존재시 시리즈에 세팅한다.
						targetConfig.series[idx].data = chartDataArrays[dataParam.key["key"+(idx+1)] ];
					}else{
						// 없을경우 시리즈 데이터 빈 배열로 세팅
						targetConfig.series[idx].data=[];
					}
				}
				
				// 3. x축 categories(라벨) 세팅
				if(!$.osl.isNull(dataParam.xKey)){
					// x축에 표시될 값 (categories) 세팅
					targetConfig.xaxis.categories = chartDataArrays[dataParam.xKey];
				// x축 표시값 배열인 경우 체크
				}else if(!$.osl.isNull(dataParam.xKeyArr)){
					targetConfig.xaxis.categories = dataParam.xKeyArr;
				}
				
			},	
			// 영역 차트
			"area": function(array){
				
				// 1. 조회한 차트 데이터 가공 (각 키별 데이터 가공한다)
				// 차트에 세팅할 데이터 loop (dataIdx: 순번, value: 조회한 차트 데이터 값으로 json형태로 되어있다)
				$.each(array, function(dataIdx, value){
					
					// 차트 데이터 가공
					// key값 갯수만큼 loop 돌며 키값에 따라 배열 생성
					chartDataArrays = fnChartDataProcessing(dataParam, value, chartDataArrays);
					
					// x축 데이터 가공
					if(!$.osl.isNull(dataParam.xKey)){
						// 차트 데이터에 x축 키값 없는 경우
						if(!chartDataArrays.hasOwnProperty(dataParam.xKey)){
							// x축 키값의 빈 배열 추가
							chartDataArrays[dataParam.xKey] = [];
						}
						// x축 차트 데이터 추가
						chartDataArrays[dataParam.xKey].push( value[dataParam.xKey] );
					}
					
					// y축 데이터 가공
					if(!$.osl.isNull(dataParam.yKey)){
						// 차트 데이터에 y축 키값 없는 경우
						if(!chartDataArrays.hasOwnProperty(dataParam.yKey)){
							chartDataArrays[dataParam.yKey] = [];
						}
						// y축 차트 데이터 추가
						chartDataArrays[dataParam.yKey].push( value[dataParam.yKey] );
					}
				});
				
				// 2. 가공한 데이터를 차트에 세팅
				for(var idx = 0; idx < Object.keys(dataParam.key).length ;idx++){
					// 데이터 세팅하기 위해 시리즈 인덱스별 명칭 지정 
					// 시리즈는 {name:이름(String), data:차트에 표시될 데이터(array)} 형태의 json으로 세팅해야 함
					targetConfig.series[idx] = {name:dataParam.keyNm["keyNm"+(idx+1)]};
					
					if(!$.osl.isNull(chartDataArrays[dataParam.key["key"+(idx+1)] ])){
						// 가공한 차트 데이터에 키값 존재시 시리즈에 세팅한다.
						targetConfig.series[idx].data = chartDataArrays[dataParam.key["key"+(idx+1)] ];
					}else{
						// 없을경우 시리즈 데이터 빈 배열로 세팅
						targetConfig.series[idx].data=[];
					}
				}
				
				// 3. x축  y축 데이터 셋팅
				if(!$.osl.isNull(dataParam.xKey)){
					// x축에 표시될 값 (categories) 세팅
					targetConfig.xaxis.categories = chartDataArrays[dataParam.xKey];
				// x축 표시값 배열인 경우 체크
				}else if(!$.osl.isNull(dataParam.xKeyArr)){
					targetConfig.xaxis.categories = dataParam.xKeyArr;
				}
				
			},
			// 도넛차트
			"donut": function(array){
				
				// 1. 조회한 차트 데이터 가공 (각 키별 데이터 가공한다)
				// 차트에 세팅할 데이터 loop (dataIdx: 순번, value: 조회한 차트 데이터 값으로 json형태로 되어있다)
				$.each(array, function(dataIdx, value){
					
					// 차트 데이터 가공
					// key값 갯수만큼 loop 돌며 키값에 따라 배열 생성
					chartDataArrays = fnChartDataProcessing(dataParam, value, chartDataArrays);
					
					// 차트 데이터 가공 - 파이차트는 x,y축이 없으므로 대신 차트 생성시 지정한 xKey 값을 기준으로 가공
					if(!$.osl.isNull(dataParam.xKey)){
						// 차트 데이터에 x축 키값 없는 경우
						if(!chartDataArrays.hasOwnProperty(dataParam.xKey)){
							// x축 키값의 빈 배열 추가
							chartDataArrays[dataParam.xKey] = [];
						}
						// x축 차트 데이터 추가
						chartDataArrays[dataParam.xKey].push( value[dataParam.xKey] );
					}
				});
				
				// 2. 가공한 데이터를 차트에 세팅
				for(var idx = 0; idx < Object.keys(dataParam.key).length ;idx++){
					
					if(!$.osl.isNull(chartDataArrays[dataParam.key["key"+(idx+1)] ])){
						// 가공한 차트 데이터에 키값 존재시 시리즈에 세팅한다.
						targetConfig.series = chartDataArrays[dataParam.key["key"+(idx+1)] ];
					}else{
						// 없을경우 시리즈 데이터 빈 배열로 세팅
						targetConfig.series=[];
					}
				}
				
				// 3. 각 도넛 라벨 세팅
				if(!$.osl.isNull(dataParam.xKey)){
					// 각 도넛차트에 표시될 라벨 세팅
					targetConfig.labels = chartDataArrays[dataParam.xKey];
				}
				//2025-02-04 사용자config에 labels를 설정 안한 경우 빈 배열 초기화
				else if($.osl.isNull(targetConfig.labels)){
					// 없을경우 빈 배열로 세팅
					targetConfig.labels=[];
				}
			},
			// 파이차트
			// - 도넛차트 데이터 가공 및 세팅이 파이차트와 동일하므로 같이 사용한다.
			"pie": function(array){
				
				// 1. 조회한 차트 데이터 가공 (각 키별 데이터 가공한다)
				// 차트에 세팅할 데이터 loop (dataIdx: 순번, value: 조회한 차트 데이터 값으로 json형태로 되어있다)
				$.each(array, function(dataIdx, value){
					
					// 차트 데이터 가공
					// key값 갯수만큼 loop 돌며 키값에 따라 배열 생성
					chartDataArrays = fnChartDataProcessing(dataParam, value, chartDataArrays);
					
					// 차트 데이터 가공 - 파이차트는 x,y축이 없으므로 대신 차트 생성시 지정한 xKey 값을 기준으로 가공
					if(!$.osl.isNull(dataParam.xKey)){
						// 차트 데이터에 x축 키값 없는 경우
						if(!chartDataArrays.hasOwnProperty(dataParam.xKey)){
							// x축 키값의 빈 배열 추가
							chartDataArrays[dataParam.xKey] = [];
						}
						// x축 차트 데이터 추가
						chartDataArrays[dataParam.xKey].push( value[dataParam.xKey] );
					}
				});
				
				// 2. 가공한 데이터를 차트에 세팅
				for(var idx = 0; idx < Object.keys(dataParam.key).length ;idx++){
					
					if(!$.osl.isNull(chartDataArrays[dataParam.key["key"+(idx+1)] ])){
						// 가공한 차트 데이터에 키값 존재시 시리즈에 세팅한다.
						targetConfig.series = chartDataArrays[dataParam.key["key"+(idx+1)] ];
					}else{
						// 없을경우 시리즈 데이터 빈 배열로 세팅
						targetConfig.series=[];
					}
				}
				
				// 3. 각 파이 라벨 세팅
				if(!$.osl.isNull(dataParam.xKey)){
					// 각 파이에 표시될 라벨 세팅
					targetConfig.labels = chartDataArrays[dataParam.xKey];
				}
				//2025-02-04 사용자config에 labels를 설정 안한 경우 빈 배열 초기화
				else if($.osl.isNull(targetConfig.labels)){
					// 없을경우 빈 배열로 세팅
					targetConfig.labels=[];
				}
			},
			// 믹스 차트 - 라인, 막대 믹스 차트
			"mixLineBar": function(array){
				
				// 라인 과 막대차트 믹스시에는 apex 차트 유형을 line으로 지정한다.
				targetConfig.chart.type="line";
				
				// 1. 조회한 차트 데이터 가공 (각 키별 데이터 가공한다)
				// 차트에 세팅할 데이터 loop (dataIdx: 순번, value: 조회한 차트 데이터 값으로 json형태로 되어있다)
				$.each(array, function(dataIdx, value){
					
					// 차트 데이터 가공
					chartDataArrays = fnChartDataProcessing(dataParam, value, chartDataArrays);
					
					// x축 데이터 가공
					if(!$.osl.isNull(dataParam.xKey)){
						// 차트 데이터에 x축 키값 없는 경우
						if(!chartDataArrays.hasOwnProperty(dataParam.xKey)){
							// x축 키값의 빈 배열 추가
							chartDataArrays[dataParam.xKey] = [];
						}
						// x축 차트 데이터 추가
						chartDataArrays[dataParam.xKey].push( value[dataParam.xKey] );
					}
					
					// y축 데이터 가공
					if(!$.osl.isNull(dataParam.yKey)){
						// 차트 데이터에 y축 키값 없는 경우
						if(!chartDataArrays.hasOwnProperty(dataParam.yKey)){
							chartDataArrays[dataParam.yKey] = [];
						}
						// y축 차트 데이터 추가
						chartDataArrays[dataParam.yKey].push( value[dataParam.yKey] );
					}
				});
				
				// 2. 가공한 데이터를 차트에 세팅
				for(var idx = 0; idx < Object.keys(dataParam.key).length ;idx++){
					// 데이터 세팅하기 위해 시리즈 인덱스별 명칭 지정 
					// 시리즈는 {name:이름(String), data:차트에 표시될 데이터(array)} 형태의 json으로 세팅해야 함
					targetConfig.series[idx] = {name:dataParam.keyNm["keyNm"+(idx+1)]};
					
					targetConfig.series[idx].type = dataParam.mixType["type"+(idx+1)];
					
					if(!$.osl.isNull(chartDataArrays[dataParam.key["key"+(idx+1)] ])){
						// 가공한 차트 데이터에 키값 존재시 시리즈에 세팅한다.
						targetConfig.series[idx].data = chartDataArrays[dataParam.key["key"+(idx+1)] ];
					}else{
						// 없을경우 시리즈 데이터 빈 배열로 세팅
						targetConfig.series[idx].data=[];
					}
				}
				
				// 3. x축 categories(라벨) 세팅
				if(!$.osl.isNull(dataParam.xKey)){
					// x축에 표시될 값 (categories) 세팅
					targetConfig.xaxis.categories = chartDataArrays[dataParam.xKey];
				// x축 표시값 배열인 경우 체크
				}else if(!$.osl.isNull(dataParam.xKeyArr)){
					targetConfig.xaxis.categories = dataParam.xKeyArr;
				}
				
			},
			// 방사형 차트
			"rader": function(array){
				
				// 레이더 차트는 타입을 문자열로 지정해야 한다.
				// 문자열을 차트 생성부분(JSP)에서 정의한 값을 세팅하는 경우 크롬 개발자모드에서 오류 발생
				targetConfig.chart.type = "radar"
				
				// 1. 조회한 차트 데이터 가공 (각 키별 데이터 가공한다)
				// 차트에 세팅할 데이터 loop (dataIdx: 순번, value: 조회한 차트 데이터 값으로 json형태로 되어있다)
				$.each(array, function(dataIdx, value){
					
					// 차트 데이터 가공
					chartDataArrays = fnChartDataProcessing(dataParam, value, chartDataArrays);
					
					// x축 데이터 가공
					if(!$.osl.isNull(dataParam.xKey)){
						// 차트 데이터에 x축 키값 없는 경우
						if(!chartDataArrays.hasOwnProperty(dataParam.xKey)){
							// x축 키값의 빈 배열 추가
							chartDataArrays[dataParam.xKey] = [];
						}
						// x축 차트 데이터 추가
						chartDataArrays[dataParam.xKey].push( value[dataParam.xKey] );
					}
					
				});
				
				// 2. 가공한 데이터를 차트에 세팅
				// 데이터 세팅하기 위해 시리즈 인덱스별 명칭 지정 
				// 시리즈는 {name:이름(String), data:차트에 표시될 데이터(array)} 형태의 json으로 세팅해야 함
				targetConfig.series[0] = {name:dataParam.keyNm["keyNm1"]};
				
				if(!$.osl.isNull(chartDataArrays[dataParam.key["key1"] ])){
					// 가공한 차트 데이터에 키값 존재시 시리즈에 세팅한다.
					targetConfig.series[0].data = chartDataArrays[dataParam.key["key1"] ];
				}else{
					// 없을경우 시리즈 데이터 빈 배열로 세팅
					targetConfig.series[0].data=[];
				}
				
				// 3. 차트 테두리 categories(라벨) 세팅
				if(!$.osl.isNull(dataParam.xKey)){
					//차트 테두리  표시될 값 (categories) 세팅
					targetConfig.xaxis.categories = chartDataArrays[dataParam.xKey];
				}
			},
			// 멀티 방사형 차트 - 데이터 가공이 단순 레이더 차트와 다르므로 분리
			"multiRader": function(array){
				
				// 레이더 차트는 타입을 문자열로 지정해야 한다.
				// 문자열을 차트 생성부분(JSP)에서 정의한 값을 세팅하는 경우 크롬 개발자모드에서 오류 발생
				targetConfig.chart.type = "radar" // 멀티 레이더 차트 타입은 rader 지정
				
				// 멀티로 차트 그릴 때 데이터 가공 위한 기준 key
				var chartStndKey = dataParam.chartStndKey;
				
				// 1차 가공 데이터 - 차트에 들어가는 데이터만 가공한다.
				var tmpChartData = {};
				
				$.each(array, function(idx, arrayData){
					
					// 데이터 가공 기준 키의 값
					var chartStndKeyVal = arrayData[chartStndKey];
					
					if($.osl.isNull(tmpChartData[arrayData[chartStndKey]])){
						tmpChartData[chartStndKeyVal] = [];
					}
					
					// 데이터 가공 기준 키의 실제 값으로 데이터 분리
					tmpChartData[chartStndKeyVal].push(arrayData);
					
					// 방사형 차트 테두리 데이터는 chartDataArrays 변수에 저장한다.
					if(!$.osl.isNull(dataParam.xKey)){
						// x축 키값(xkey) 없는 경우
						if(!chartDataArrays.hasOwnProperty(dataParam.xKey)){
							// 차트 테두리 표시 데이터에 빈 배열 추가
							chartDataArrays[dataParam.xKey] = [];
						}
						
						// 중복데이터 제외하고 값 가공
						if(chartDataArrays[dataParam.xKey].indexOf( arrayData[dataParam.xKey] ) == -1){
							// 방사형 차트 테두리 표시 데이터 추가
							chartDataArrays[dataParam.xKey].push( arrayData[dataParam.xKey] );
						}
					}
				});
				
				// 기준키 갯수만큼 방사형 차트에 라인이 생성되야 하므로 인덱스 지정
				var raderChartLineIdx = 0;
				// 1차 가공한 데이터 loop
				$.each(tmpChartData, function(stndKey, data){
					
					/*
					 * 1차 가공 데이터는 키:배열로 구성되어 있으며 각 키별 배열로 된 데이터를 loop하면서 가공한다.
					 * 최종 가공된 형태 예시는 다음과 같다.
					 * - 기준키가 userNm 이고 기준키의 값이 김민수, 홍길동인 경우
					 * - (기준키란 차트 생성시 chartStndKey에 지정한 키)
					 * - 기준키가 userNm이고 해당하는 값이 김민수, 홍길동이라면
					 * 
					 *   chartDataArrays = {
					 *   	김민수 : {
					 *   		status:[10,20,30]   // status(key1)은 차트 param에 지정한 key1 이다.
					 *   	},
					 *   	홍길동 : {
					 *   		status:[20,30,40]
					 *   	}
					 *   }
					 */	
					$.each(data, function(idx, map){
						
						// 기준 값으로 데이터 없는 경우
						if(!chartDataArrays.hasOwnProperty(stndKey)){
							chartDataArrays[stndKey] = {};
						}
						
						// 차트 데이터 json에 key값별 데이터가 없는 경우
						if(!chartDataArrays[stndKey].hasOwnProperty(dataParam.key["key1"])){
							//키 인덱스로 빈 배열 생성
							chartDataArrays[stndKey][dataParam.key["key1"]] = [];
						}
						
						// 키가 없을 경우
						if($.osl.isNull(map[dataParam.key["key1"]])){
							// null값 추가
							chartDataArrays[stndKey][dataParam.key["key1"]].push(null);
						// 해당하는 키 있을 경우
						}else{
							// 데이터 추가
							chartDataArrays[stndKey][dataParam.key["key1"]].push( map[dataParam.key["key1"]] );
						}
						
					});
					
					// 각 기준키별 차트 데이터 세팅
					// 시리즈는 {name:이름(String), data:차트에 표시될 데이터(array)} 형태의 json으로 세팅해야 함
					targetConfig.series[raderChartLineIdx] = {name: stndKey};
					
					if(!$.osl.isNull(chartDataArrays[stndKey][dataParam.key["key1"] ])){
						// 가공한 차트 데이터에 키값 존재시 시리즈에 세팅한다.
						targetConfig.series[raderChartLineIdx].data = chartDataArrays[stndKey][dataParam.key["key1"] ];
					}else{
						// 없을경우 시리즈 데이터 빈 배열로 세팅
						targetConfig.series[raderChartLineIdx].data=[];
					}
					
					// 차트 테두리 categories(라벨) 세팅
					if(!$.osl.isNull(dataParam.xKey)){
						//차트 테두리  표시될 값 (categories) 세팅
						targetConfig.xaxis.categories = chartDataArrays[dataParam.xKey];
					}
					
					// 기준키 갯수만큼 방사형 차트에 라인이 생성되야 하므로 인덱스값 증가
					raderChartLineIdx++;
				});
			},
			// 히트맵 차트
			"heatmap": function(array){
				// heatMap 기본 설정 별도 처리
				targetConfig = $.extend(true, targetConfig, {
					dataLabels: {
						enabled: false
					},
					chart: {
						toolbar: {
							show:false
						}
					},
					xaxis:{
						labels:{show:false},
						axisBorder:{show:false},
						axisTicks:{show:false},
						crosshairs:{show:false},
						tooltip: {enabled: false}
					},
					yaxis:{
						labels:{show:true},
						axisBorder:{show:false},
						axisTicks:{show:false},
						crosshairs:{show:false},
						tooltip: {enabled: false}
					},
					legend:{
						position: 'bottom',
						horizontalAlign: 'right'
					},
					plotOptions:{
						heatmap:{
							radius: 0,
							reverseNegativeShade: false,
							enableShades: false,
							useFillColorAsStroke: false
						}
					}
				});
				
				//x:y = 2:1
				var dataSize = (array.length/2);
				if(dataSize < 0){
					dataSize = 1;
				}
				var yCnt = Math.round(Math.sqrt(dataSize));
				var xCnt = Math.round(yCnt*2);
				var yCursor = 0;
				var xCursor = 0;
				
				var series = [];
				var seriesX = [];
				
				//cursor
				var cursor = 0;
				
				//데이터 loop
				$.each(array, function(idx, info){
					//x축 데이터
					seriesX.push({
						x: (xCursor).toString(),
					});
					seriesX[xCursor].y = info[targetConfig.data.param.yKey]; 
					for(var i = 1; i <= Object.keys(targetConfig.data.param.key).length ;i++){
						seriesX[xCursor][targetConfig.data.param.key["key"+i]] = info[targetConfig.data.param.key["key"+i]];
					}
					
					xCursor++;
					
					//x축이 가득 차는경우 초기화
					if(xCursor >= xCnt || idx == (array.length-1)){
						xCursor = 0;
						series.push({
							name: dataParam.keyNm["keyNm"+(yCursor+1)],
							data: seriesX
						});
						yCursor++;
						seriesX = [];
					}
				});
				
				targetConfig.series = series;
			}
			
		};
		// end:: 차트 유형별 데이터 세팅 함수 정의
		
		// 기본 차트 유형에 정의한 차트 유형별 데이터 세팅 함수 병합 (깊은복사)
		var chartTypeDataSet = $.extend(true, {}, publicChartType, chartTypeDataSetting);
		
		// 차트 데이터를 ajax로 조회
		if($.osl.isNull(targetConfig.data.param.dataArr) && !$.osl.isNull(targetConfig.data.url)){
			// 차트 생성시 필요 데이터 조회
			var ajaxObj = new $.osl.ajaxRequestAction({"url": targetConfig.data.url, "async": false}, targetConfig.data.param);
			
			//ajax 전송 성공 함수
	    	ajaxObj.setFnSuccess(function(data){
	    		// 오류 있을 경우 메시지 표기
	    		if(data.errorYn == "Y"){
					$.osl.alert(data.message,{type: 'error'});
				}
	    		// 정상 조회시
	    		else{
					//차트 설정에 마지막 조회 데이터 저장
					targetConfig.lastResponse = data;
					
					var chartData = data.chartData;
					
					// 차트 유형에 따른 데이터 셋팅
					chartTypeDataSet[targetConfig.data.param.chartType](data.chartData);
					
					// ajaxDone callback 
					targetConfig.callback.ajaxDone(data, chartData);
				}
	    	});

	    	//AJAX 전송
			ajaxObj.send();
		}
		// ajax url 정보 없는 경우
		else{
			//차트 데이터가 있는 경우
			targetConfig.lastResponse.chartData = targetConfig.data.param.dataArr;
			chartTypeDataSetting[targetConfig.data.param.chartType](targetConfig.data.param.dataArr);
		}
	
		//차트 생성 전에 이미 만들어진 차트 제거
		if(!$.osl.isNull($.osl.chart.list[targetId])){
			$.osl.chart.list[targetId].targetCt.destroy();
			delete $.osl.chart.list[targetId];
		}
		
		// 조회된 값이 있으면 차트 생성
		var chartsInfo = new ApexCharts(document.querySelector("#"+targetId), targetConfig);
		createdChart = {"config": targetConfig, "targetCt": chartsInfo, "chartType": "apex"};
		
		// 생성된 차트 저장
		$.osl.chart.list[targetId] = createdChart;
		// 차트를 화면에 그리기
		chartsInfo.render();
		
	}
	// end:: documentSetting
	
	/**
	 * function 명 : fnChartDataProcessing
	 * function 설명 : 조회한 데이터를 각 키별, x축, y축 표시값 별로 가공처리
	 * 				  가공한 데이터를 키별로 추출하여 차트에 세팅한다.
	 * @param dataParam : config(차트 옵션)에 정의한 데이터 파라미터 정보
	 * 					  파라미터 정보에 각 키값 정의 되어 있다.
	 * @param value : 차트 데이터 (JSON)
	 * @param chartDataArrays : 가공한 데이터를 저장할 Json
	 */
	var fnChartDataProcessing = function(dataParam, value, chartDataArrays){

		// key값 갯수만큼 loop 돌며 키값에 따라 배열 생성
		for(var idx = 1; idx <= Object.keys(dataParam.key).length; idx++){
			
			// 차트 데이터 json에 key값별 데이터가 없는 경우
			if(!chartDataArrays.hasOwnProperty(dataParam.key["key"+idx])){
				//키 인덱스로 빈 배열 생성
				chartDataArrays[dataParam.key["key"+idx]] = [];
			}
			
			// 키가 없을 경우
			if($.osl.isNull(value[dataParam.key["key"+idx]])){
				// null값 추가
				chartDataArrays[dataParam.key["key"+idx]].push(null);
			// 해당하는 키 있을 경우
			}else{
				// 데이터 추가
				chartDataArrays[dataParam.key["key"+idx]].push( value[dataParam.key["key"+idx]] );
			}
		}
		
		return chartDataArrays;
	};
	
	
	/** begin:: public functions 정의 **/
	return {
		/**
		 * function 명 : OSLApexChartSetting.init
		 * function 설명 : apex 차트 생성
		 * @param publicChartType : 차트 유형 (공통)
		 * @param userConfig : 차트 생성시 정의한 설정 값 (공통 설정 + 차트 생성시 지정한 설정)
		 */
		init: function(publicChartType, config, targetId){
			// 차트 생성
			documentSetting(publicChartType, config, targetId);
		}
		/**
		 * function 명 : OSLApexChartSetting.getApexChartInfo
		 * function 설명 : apex 차트 정보
		 */
		,getApexChartInfo: function(){
			return libraryInfo;
		}
		/**
		 * function 명 : OSLApexChartSetting.getUseChartType
		 * function 설명 : 사용가능한 차트 유형 보기
		 */
		,getUseChartType: function(){
			return supportApexChartType;
		}
	}
	/** end:: public functions 정의 **/
}();