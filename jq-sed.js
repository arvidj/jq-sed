$(function ($) {
    var xml = $('[name=xml]');
    var js = $('[name=js]');
    var res = $('[name=result]');

    var xml_e = CodeMirror.fromTextArea(xml[0], {lineNumbers: true, mode: 'xml'});
    var js_e = CodeMirror.fromTextArea(js[0], {lineNumbers: true, mode: 'javascript'});
    var res_e = CodeMirror.fromTextArea(res[0], {lineNumbers: true, mode: 'xml'});

    function error (error, url, line) {
        $('#error-row').show();
        $('#error-row ul').append('<li>' + error + ' (see console for more info)</li>');
    };

    function update () {
        $('#error-row').hide();
        $('#error-row ul > li').remove();

        var $xml = $($.parseXML(xml_e.getDoc().getValue()));
        var jsText = js_e.getDoc().getValue();

        var res = eval(jsText);

        // debug
        // console.log(res);

        var doc = $xml.get(0);
        var xmlStr = (new XMLSerializer()).serializeToString(doc);
        res_e.getDoc().setValue(vkbeautify.xml(xmlStr));
    };

    xml_e.on('change', update)
    js_e.on('change', update)
    window.onerror = error;
    // window.error = error;
    update()
});
