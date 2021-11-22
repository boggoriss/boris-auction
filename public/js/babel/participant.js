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

$(document).ready(function () {
  $(".deletion").on("click", function (event) {
    let id = event.target.id;
    console.log(id);
    sendRequest('DELETE', `/api/participant/`, {
      id
    }).then(r => {
      location.reload();
    }).catch(e => {
      location.reload();
    });
  });
  $(".edit").on("click", event => {
    event.preventDefault();
    let id = $(event.target).attr("idToChange");
    console.log(id);
    let changeCash = prompt("Введите новое количество денег");

    if (changeCash === null || changeCash === '') {
      confirm('Милорд, ну вы деньгу вбейте пж');
      location.reload();
    }

    if (changeCash !== null || changeCash !== '') {
      sendRequest('POST', `/api/participant/edit/${id}`, {
        cashReserve: changeCash
      }).then(r => location.reload()).catch(r => location.reload());
    }
  });
  $('#add').on("click", e => {
    let name = $('#name').val();
    let cashReserve = $('#cashReserve').val();
    sendRequest('POST', '/api/participant/add', {
      name,
      cashReserve
    }).then(r => location.reload()).catch(r => location.reload());
  });
});