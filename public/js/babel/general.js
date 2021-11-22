$(document).ready(function () {
  let id = null;
  $(".deletion").on("click", function (event) {
    let arr = event.target.id.split("#");
    id = arr[1];
    $.ajax({
      url: '/',
      method: "DELETE",
      data: {
        id
      },
      success: function success(data) {
        $("#" + data.id).detach();
      }
    });
  });
});