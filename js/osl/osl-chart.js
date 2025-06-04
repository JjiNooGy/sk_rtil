	/**
 	* function 명 	: OSLCoreChartSetting
	* function 설명	: core에서 사용되는 차트 데이터를 세팅한다.
	*/
var OSLCoreChartSetting = function () {
	
	var chartSetting = $.noop;
	
	// 차트 라이브러리별 실행 함수
	var chartLibrary = {
		// apex 차트
		"apex" : function(config, chartType, targetId){
			return OSLApexChartSetting.init(config, chartType, targetId);
		}
	}
	
	/**
	 *  function 명 	: chartSetting
	 *  function 설명	: targetId div에 chart를 생성한다.
	 *  @param chartLibName: chart lib 설정 값(apx, jquery 등)
	 *  @param targetId: chart 생성 타겟 요소 ID (# 제외) 
	 *  @param config: chart 설정 값
	 **/
	var chartSetting = function(chartLibName, targetId, config){
		
		// 내부에서 추가된 charts 목록
		//var charts = {};
		// chart 생성 타겟 오브젝트
		var targetObj = $("#"+targetId);
		
		// chart 생성 타겟 id값 없는 경우 skip
		if($.osl.isNull(targetId)){
			return true;
		}
		
		// chart 라이브러리 명 없는 경우 apex로 기본 설정
		if($.osl.isNull(chartLibName)){
			chartLibName = "apex";
		}
		
		//기본 config
		var defaultConfig = {
			data: {
				url:"",
				param:{
					xkey:"",
					ykey:"",
					key:{
						//key1:""  // key1,2 ... 지정
						//key2:""
					},
					keyNm:{
						// keyNm1:""
						// keyNm2:""
					},
					keyType:{
						// 예)
						// keyType1:""
						// keyType2:""
					},
					chartType: "",
					// 데이터 arr - 데이터만 전달시
					dataArr:[],
					//x축 데이터
					xKeyArr:[],
				},
				type: "remote"
			},
			chart:{
				width:"100%",
				height:360,
				//툴바
				toolbar : {
					show: false,	// 툴바 기본 표출하지 않음
					offsetX: 0,
					offsetY: 0,
					tools: {
						download: true,
						selection: true,
						zoom: false,
						zoomin: '<i class="fa fa-plus-circle scale-1"></i>',
						zoomout: '<i class="fa fa-minus-circle scale-1"></i>',
						pan: '<i class="fas fa-arrows-alt scale-1"></i>',
						reset: '<i class="fa fa-redo scale-1></i>',
						customIcons: [
							/* 
							{
								icon: '<i class="fas fa-ellipsis-v"></i>',
								index: 4,
								title: 'tooltip of the icon',
								class: 'custom-icon',
								click: function (chart, options, e) {
								  	console.log("clicked custom-icon")
								}
							}
							*/
						]
					}
				},
				//블록 색상
				colors:[],
				//라벨
				labels:{},
				//범례 설정 여부 show:false
				legend:{},
				//차트 타이틀
				title:{},
				//x축설정
				xaxis:{
					show: true,	// x축 표시여부
					tooltip: {
						enabled: false // x축 툴팁 표시여부
					}
				},
				//y축설정
				yaxis:{
					show: false, // y축 표시여부
					min:0 		 // 최소값
				},
				option:{
					// 차트 유형별 옵션지정
					bar:{},		// 막대차트
					line:{},	// 선형차트
					area:{},	// 영역차트
					heatmap:{},	// 히트맵 차트
					colum:{},	// 컬럼차트
				}
			},
			callback:{
				/* chart 내부 ajax 호출 성공 시 */
				ajaxDone: $.noop,
				/* chart reload */
				reloaded: $.noop
			},
			actionFn:{
				//차트 애니메이션이 끝났을때
				animationEnd: $.noop,
				//차트가 그려지기 전 실행
				beforeMount: $.noop,
				//차트가 그려진 후 실행
				mounted: $.noop,
				//차크의 영역을 클릭하면 실행
				click: $.noop
			},
			//마지막 데이터
			lastResponse:{},
		}
		//기본 config end
		
		//버튼 이벤트
		var btnEvt = {
			list : function(){
				//각 버튼에 이벤트 걸기
				if($("[data-chart-id="+targetId+"][data-chart-action]").length > 0){
					$.each($("[data-chart-id="+targetId+"][data-chart-action]"), function(idx, map){
						var btnChartId = $(map).data("chart-id");
						var btnAction = $(map).data("chart-action");
						
						//action별 동작 호출
						if(btnEvt.action.hasOwnProperty(btnAction)){
							btnEvt.action[btnAction](this, btnChartId, "list");
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
									
									targetConfig.actionFn[btnAction](this, btnChartId, "list");
								});
							}
						}
					});
				}
			},
			action: {
				"select": function(elem, chartId, bubleFlag){
					$(elem).off("click");
					$(elem).click(function(event){
						if(bubleFlag != false){
							//중복 이벤트 중지
							event.cancelable = true;
							event.stopPropagation();
							event.preventDefault();
							event.returnValue = false;
						}
						
						//사용자 정의함수에 select가 있는 경우 함수 호출 - url이 없는 경우 재정의 해서 사용해야함
						if(charts.config.actionFn.hasOwnProperty("select")){
							//해당 chart select 로직 가져오기
							charts.config.actionFn["select"](elem, chartId, charts.targetCt);
						}
						//select없는 경우 데이터테이블 기본 조회 동작 - url이 있는 경우만 ajax로 reload
						else{
							//url 호출이 아닌 경우 select 재정의 
							var targetConfig = $.osl.chart.list[chartId].config;
							if($.osl.isNull(targetConfig.data.type != "local")){
								targetConfig.callback.reloaded();
							}
						}
					});
				},
			}
		}
		//버튼 이벤트 END
		
		// 차트 타입 별 데이터 가공 함수 정의
		var publicChartType = {
			"bar": $.noop,		// 막대차트 
			"line": $.noop,		// 선형 차트
			"area": $.noop,		// 영역 차트
			"pie": $.noop,		// 파이차트 (도넛차트도 같이 사용한다.)
			"mix": $.noop,		// 믹스차트 (예 - 라인 + bar)
			"rader":$.noop,		// 방사형 차트
			"multiRader":$.noop,// 방사형 차트 (멀티)
			"heatmap": $.noop,	// 히트맵 차트
		}

		//차트 작성
		if(targetObj.length > 0){
			//차트 라이브러리 종류에 따라 함수 실행
			if( chartLibrary.hasOwnProperty(chartLibName) ){
				// 설정정보 병합 (깊은 복사)
				var targetConfig = $.extend(true, {}, defaultConfig);
				targetConfig = $.extend(true, targetConfig, config);
				
				//차트 생성 전에 이미 만들어진 차트 제거
				if(!$.osl.isNull($.osl.chart.list[targetId])){
					$.osl.chart.list[targetId].targetCt.destroy();
					delete $.osl.chart.list[targetId];
				}
				
				// 차트 생성
				chartLibrary[chartLibName](publicChartType, targetConfig, targetId);
				
			}else{
				$.osl.alert("지원하지 않는 차트 라이브러리입니다.", {type: "error"});
			}
		}
	}
	// end:: 차트 세팅 
	
	return {
		// public functions
		init: function() {
			/* chart.js 라이브러리 부분 주석처리
			// 차트 위에 데이터 라벨링 하기
			Chart.plugins.register({
				afterDatasetsDraw: function(chart) {
					var ctx = chart.ctx;
					
					chart.data.datasets.forEach(function(dataset, i) {
						//미처리 건수 제외
						if(!$.osl.isNull(dataset.valueShow) && !dataset.valueShow){
							return true;
						}
						var meta = chart.getDatasetMeta(i);
						if (!meta.hidden) {
							meta.data.forEach(function(element, index) {
								if(dataset.data[index] > 0){
									//글씨 스타일
									ctx.fillStyle = 'rgb(255, 255, 255)';
									
									var fontSize = 12;
									var fontStyle = 'normal';
									var fontFamily = 'Helvetica Neue';
									ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
									
									//출력 값 구하기
									var eleValue = dataset.data[index];
									
									//최종 값
									var dataString = parseInt(eleValue);
									
									//추가 문자열 체크
									if(!$.osl.isNull(dataset.valueShowStr)){
										dataString += dataset.valueShowStr;
									}
									//위치 조정
									ctx.textAlign = 'center';
									ctx.textBaseline = 'middle';
									
									var position = element.tooltipPosition();
									
									//Left값
									var chartX = position.x
									//Top값
									var chartY = position.y
									
									//세로축 표시
									if(dataset.valueShow == "barY"){
										chartY = position.y-((position.y-element._model.base)/2.3);
									}
									//가로축 표시
									else if(dataset.valueShow == "barX"){
										chartX = position.x-((position.x-element._model.base)/2.3);
									}
									
									//중앙 자리에 string이 위치하도록
									ctx.fillText(dataString, chartX, chartY);
								}
							});
						}
					});
				}
			});
			// end::Chart.plugins.register
			*/
			
			//core에 차트 세팅
			$.osl.chart.setting = chartSetting;
			
			// 출력 전 후 판단 하여 차트 라이브러리 별 다른 처리 진행
			// 출력 전
			window.onbeforeprint = function(event){
				
				// 현재 화면에 존재하는 전체 차트 목록 가져오기
				var chartList = $.osl.chart.list;
				
				if(!$.osl.isNull(chartList)){
					// 차트 목록 루프
					for (var id in chartList) {
						//차트를 이미지로 변환
						let instance = chartList[id];
						let chartType = instance.chartType;
						// apex 차트의 경우
						if(chartType == "apex"){
							instance.targetCt.dataURI().then(function(imgURI){
								let parent = instance.el;
								let i = new Image();
								i.style.maxWidth = "100%";
								i.src = imgURI.imgURI;
								$(parent).html(i);
								$(parent).css("min-height","0");
								var start = new Date().getTime();
								while (new Date().getTime() < start + 100);
							});
							// 사이즈 변경 트리거 제거
							$(".resizeTrigger").remove();
						}
						//chartJs의 경우
						else if(chartType == "chartJs2" || chartType == "chartJs"){
							let parent = instance.targetCt.canvas;
							let i = new Image();
							i.src = parent.toDataURL("image/png");
							$('#'+id).html(i);
							$('#'+id).css("min-height","0");
							var start = new Date().getTime();
							while (new Date().getTime() < start + 100);
						}
					}
				}
			};
			// end:: window.onbeforeprint
			
			// 차트 출력 후
			window.onafterprint = function(event){
				
				// 현재 화면에 존재하는 전체 차트 목록 가져오기
				var chartList = $.osl.chart.list;
				
				if(!$.osl.isNull(chartList)){
					//이미지로 변환했던 것 제거하기
					for (var id in chartList) {
						let instance = chartList[id];
						let chartType = chartList[id].chartType;
						
						// apex 차트의 경우
						if(chartType == "apex"){
							if(instance.tempImage) {
								let parent = instance.targetCt.el;
								delete instance.oldDisplay;
								delete instance.tempImage;
							}
						}
						// chartJS인 경우
						else if(chartType == "chartJs2" || chartType == "chartJs"){
							// canvas추가
							$("#"+id).html(instance.targetCt.canvas);
							// 차트 새로 그리기
							instance.targetCt.draw();
						}
					}
				}
			};
			// end:: window.onafterprint
		}
	};
}();