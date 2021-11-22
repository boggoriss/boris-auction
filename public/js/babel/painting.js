function sendRequest(method, url, body = null) {
  const headers = {
    "Content-Type": "application/json; charset=utf-8"
  };
  return fetch(url, {
    method: method,
    body: body !== null ? JSON.stringify(body) : null,
    headers: headers
  }).then(response => {
    return response.json();
  });
}

$(document).ready(() => {
  $('#edit').on("click", event => {
    event.stopPropagation();
    event.preventDefault();
    $("#edit").attr("hidden", true);
    $("#cancel").attr("hidden", false);
    $("#save").attr("hidden", false);
    $("form p input").attr("disabled", false);
  });
  $('#cancel').on("click", event => {
    event.stopPropagation();
    event.preventDefault();
    $("#cancel").attr("hidden", true);
    $("#save").attr("hidden", true);
    $("#edit").attr("hidden", false);
    $("form p input").attr("disabled", true);
  });
  $('#save').on("click", e => {
    e.preventDefault();
    let id = $(event.target).attr("chID");
    console.log(id);
    let title = $('#title').val();
    let author = $('#author').val();
    let startPrice = $('#startPrice').val();
    sendRequest('POST', `/api/edit/${id}`, {
      title,
      author,
      startPrice
    }).then(r => {
      location.reload();
    }).catch(e => {
      location.reload();
    }); // $.ajax({             // Совершенно непонятно, почему так не работает
    //     url: `/api/edit/${id}`,
    //     data: JSON.stringify({ title, author, startPrice }),
    //     type:'POST',
    //     dataType: "JSON",
    //     success: function(response) {
    //         console.log(response);
    //     }
    // });
  });
});