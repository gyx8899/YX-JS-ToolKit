$(function(){
  var testId, subjectCode, isFree;;
  var url = port.api + '/cms/lanmu/loadUriBySjCode.do';
  Kino.ajax(url, function (resp) {
      if (resp.resultCode == "SUCCESS") {
        var str = resp.model.data
        if (resp.model.data.substr(0,3)=='/rk') {
          $(".graySpan").html("<a target='_blank' href="+port.netDomain+resp.model.data+">查看更多资讯</a>")
          $(".zixun").attr("href",port.netDomain+resp.model.data)
        }else if(str.split('/').length==5){
          var arr = str.split('/')
          $(".graySpan").html("<a target='_blank' href="+port.netDomain+"/"+arr[1]+"/"+arr[3]+">查看更多资讯</a>")
          $(".zixun").attr("href",port.netDomain+"/"+arr[1]+"/"+arr[3]+"/index.html")
        }else {
          $(".graySpan").html("<a target='_blank' href="+port.netDomain+resp.model.data+">查看更多资讯</a>")
          $(".zixun").attr("href",port.netDomain+resp.model.data)
        }
      }
  }, {
      type: "POST",
      data: {
          subjectCode: subcode
      }
  });
  //考试模式
  $('#paperDetailWrap').on('click', '.examModeSpan', function () {
    Kino.ajax("/api/course/paper/loadInfoByPK.do", function (resp) {
        subjectCode = resp.model.subjectCode;
        var isfreeUrl =port.api_port + "/user/checkIsFree.do"
        // Kino.ajax(isfreeUrl, function (respt) {
              // if(resp.resultCode=="SUCCESS"){
                // var isFree = respt.model;
                // if(isFree=="Y"){
                  var startExamUrl = port.api_port + '/uc/paper/startExam.do'; //开始考试
                  Kino.ajax(startExamUrl, function (resp) {
                      testId = resp.model.data;
                      location.href = '/tiku/examinationModeCopy.html?mode=exam&&testId=' + testId + '&&subjectCode=' + subjectCode + '&&sjId=' + id;
                  }, {
                      data: {
                          "tcId": resp.model.id,
                          "model":"Exam"
                      }
                  });
                // }else if (isFree=="N") {
                //     swal({title: "您还不是学员，请先购买",
                //     button: {
                //       text: "关闭",
                //     }});
                // }else {
                //     swal({title: "资源暂不存在",
                //     button: {
                //       text: "关闭",
                //     }});
                // }
              // }else {
              //   isFree = respt.resultMsg
              // }
        // }, {
        //     data: {
        //         "accessId": resp.model.accessId
        //     }
        // });
    }, {
        data: {
            "pk": id
        }
    });

  });
  //练习模式
  $('#paperDetailWrap').on('click', '.exeModeSpan', function () {
    Kino.ajax("/api/course/paper/loadInfoByPK.do", function (resp) {
        subjectCode = resp.model.subjectCode;
        var isfreeUrl =port.api_port + "/user/checkIsFree.do"
        Kino.ajax(isfreeUrl, function (respt) {
              if(respt.resultCode=="SUCCESS"){
                isFree = respt.model;
                if(isFree=="Y" || isFree=="N"){
                  var startExamUrl = port.api_port + '/uc/paper/startExam.do'; //开始考试
                  Kino.ajax(startExamUrl, function (resp) {
                      testId = resp.model.data;
                      location.href = '/tiku/examinationModeCopy.html?mode=exe&&testId=' + testId + '&&subjectCode=' + subjectCode + '&&sjId=' + id;
                  }, {
                      data: {
                          "tcId": resp.model.id,
                          "model":"Exercise"
                      }
                  });
                }else {
                    swal({title: "资源暂不存在",
                    button: {
                      text: "关闭",
                    }});
                }
              }else {
                isFree = respt.resultMsg
              }
        }, {
            data: {
                "accessId": resp.model.accessId
            }
        });
    }, {
        data: {
            "pk": id
        }
    });
  });
  //立即购买
  $('#paperDetailWrap').on('click', '.buyNow', function () {
    var tcId=$(this).attr("data-id")
    var vdetailBuyUrl = port.api_port + '/uc/paper/genPaperOrder.do';
    Kino.ajax(vdetailBuyUrl, function (resp) {
            if (resp.resultCode == "SUCCESS") {
                window.location.href = "/courseCenter/cusOrdPayment.html?id="+resp.model.data;
            }else{
              swal({title: resp.resultMsg,
                    button: {
                      text: "关闭",
                    }});
            }
        }, {
            type: "POST",
            data: {
                tcId:tcId
            }
        });
  });
  //检查是否免费
  Kino.ajax("/ucapi//user/checkIsFree.do",function(resp) {
      // if (resp.resultCode == "SUCCESS") {
        // if(resp.model=="Y"){
          $(".buyNow").hide()
          $(".zhuanyong").hide()
        // }else if (resp.model=='N') {
        //   $(".buyNow").show()
        //   $(".zhuanyong").show()
        //   $(".examModeSpan,.exeModeSpan").hide()
        // }
      // }
      // if (resp.resultCode != "SUCCESS") {
      //   swal({
      //       title: resp.resultMsg,
      //       closeOnClickOutside: false,
      //       button: {text: "关闭",}
      //   }).then(function(){
      //       if(document.referrer == ''){
      //           closeCurrentPage();
      //       }else{
      //           window.history.go(-1);
      //       }
      //   });
      // }
  },{
    type:'POST',
    data:{
      accessId:accessId
    }
  })
});


/*关闭当前页*/
function closeCurrentPage() {
    var userAgent = navigator.userAgent;
    if (userAgent.indexOf("Firefox") != -1 || userAgent.indexOf("Chrome") !=-1) {
        window.location.href="about:blank";
        window.close();
    } else {
        window.opener = null;
        window.open("", "_self");
        window.close();
    }
}
