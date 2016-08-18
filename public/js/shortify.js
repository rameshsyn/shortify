function main() {

  // valid url checker
  function validUrlChecker() {
    var url = $("#uglyUrl").val();
    var validUrl = url.match(/((https?\:\/\/[www\.]?)|([www\.]))\w+\.\w+(\.\w+\/)?(\/)?([\w\.\?#=]+)?/g);
    if(validUrl) {
      $(".shortify-area input").css("border-color","transparent");
      $(".shortify-area button").removeAttr("disabled").css("background","green");
    }
    else {
      $(".shortify-area input").css("border-color","red");
      $(".shortify-area button").attr("disabled","disabled").css("background","#094009");
    }
  }

  // ajax request to save url
  function saveUrl(e) {
    var url = $("#uglyUrl").val();
    $(".shorten-area").removeClass("zoomIn");
    e.preventDefault();
    validUrlChecker();
    // checks if url contiains `http`
    if(url.substring(0,4) != "http") {
      // assigns http to url
      url = "http://"+ url;
    }
    // sending ajax post request
    $.ajax({
      url: "/",
      type: "post",
      data: {
        url: url
      },
      success: function(data) {
        $(".shorten-area").show().addClass("zoomIn");
        $("#shorten-url").text(data);
      }
    });
  }
  // copies shorten url to clipboard
  function copyShortenUrl() {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($("#shorten-url").text()).select();
    document.execCommand("copy");
    $temp.remove();
  }
  $("#copy").click(copyShortenUrl);
  $("#shortifyBtn").submit(saveUrl);
  $("form").on("keyup keydown paste", "#uglyUrl", validUrlChecker);
}
$(document).ready(main);
