$(document).ready(function(){
    $('#errorlog').keypress(function(e){
        if(e.which == 13){
            clearOutput();
            processErrorLog();
        }
    });
});

function processErrorLog() {
    var errorLogLines = $('textarea#errorlog').val().split('\n');
    var outputLines = $('#errorfound');
    for (var i = 0; i < errorLogLines.length; i++) {
        var line = errorLogLines[i];
        if (line.includes("Warning")) {
            continue;
        }

        appendParagraph(outputLines, line);
    }
}

function clearOutput() {
    var outputLines = $('#errorfound');
    outputLines.children().remove();
}

function appendParagraph(parent, toAppend) {
    parent.append("<p>" + toAppend + "</p>");
}