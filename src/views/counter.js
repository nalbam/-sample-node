let API_URL = 'https://sample-node.apps.opspresso.com';

function _counter(name, type) {
    let url = API_URL + `/counter/${name}`;
    $.ajax({
        url: url,
        type: type,
        success: function (res, status) {
            console.log(`_counter (${name}) : ${status}`);
            if (res) {
                $(`#thumbs-${name}-count`).html(res);
            }
        }
    });
}

$(function () {
    _counter('up', 'get');
    _counter('down', 'get');
    setInterval(function () {
        _counter('up', 'get');
        _counter('down', 'get');
    }, 1000);
});

$(function () {
    $('.btn-thumbs-up').click(function () {
        _counter('up', 'post');
    });
    $('.btn-thumbs-down').click(function () {
        _counter('down', 'delete');
    });
});
