$(document).ready(function() {


   
        // select2


        $.each($(".form-select"), function(idx, elem){
            $(elem).select2({
                // dropdownParent: $(".form-group"),
                minimumResultsForSearch: "Infinity",
                //스크롤 충돌 방지
			    ftScrollUse: false,
            });
            // console.log("select2222");
            // if($(".form-select").length <= 1) {
            //     console.log("modal");
            //     $(elem).select2({
            //         minimumResultsForSearch: "Infinity",
            //     });
                    
            // } else if($(".modal-body .form-select").length <= 1) {
            //     console.log("mother");
            //     $(elem).select2({
            //         dropdownParent: $(".form-group"),
            //         minimumResultsForSearch: "Infinity",
            //     });
            // }
        });
   



});