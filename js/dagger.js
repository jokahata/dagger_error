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
    var inFileError = false;
    var outputMessage = "";

    for (var i = 0; i < errorLogLines.length; i++) {
        var line = errorLogLines[i];
        if (line.includes("Warning")) {
            continue;
        }

        if (line.endsWith(".java")) {
            inFileError = true;
        }
        outputMessage = appendParagraph(outputMessage, line);
    }

    printOutput(outputMessage);
}

function printOutput(outputMessage) {
    var outputLines = $('#errorfound');
    outputLines.append(outputMessage);
}

function clearOutput() {
    var outputLines = $('#errorfound');
    outputLines.children().remove();
}

function appendParagraph(message, toAppend) {
    message += "<p>" + toAppend + "</p>";
    return message;
}