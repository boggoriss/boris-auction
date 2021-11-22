function sendRequest (method, url, body = null){
    const headers = { "Content-Type": "application/json; charset=utf-8" };
    return fetch(url, {
        method: method,
        body: body !== null ? JSON.stringify(body) : null,
        headers: headers
    }).then(response => {
        return response.json();
    })
}

$(document).ready(()=>{
    $("#edit").on('click', () => {
        console.log('edit clicked')
        let dateTime = $('#dateTime').val();
        let timeout = $('#timeout').val();
        let countingTime = $('#countingTime').val();
        let pause = $('#pause').val();
        sendRequest('POST', '/api/settings/edit', {dateTime,
            timeout,
            countingTime,
            pause})
            .then(r => {location.reload()})
            .catch(r => {location.reload()})
    })
});
