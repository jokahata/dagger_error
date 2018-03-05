$(document).ready(function(){
    $('#errorlog').keypress(function(e){
        if(e.which == 13){
            clearOutput();
            processErrorLog();
        }
    });
});

function processErrorLog() {
    // false when we are either in logs we don't care about ("warnings")
    // true once we've found set of errors related to a java class
    var inClassWithPossibleError = false;
    var outputMessage = "";

    // Looking for possible error mode
    // Not looking for error mode

    var messageChunk = "";
    var shouldSaveChunk = false;
    var errorLogLines = $('textarea#errorlog').val().split('\n');
    for (var i = 0; i < errorLogLines.length; i++) {
        var line = errorLogLines[i];

        if (inClassWithPossibleError) {
            // Check if we reach a trash message or another class to end
            if (isClassLine(line) || isInformationLine(line) || isWarningLine(line)) {
                if (shouldSaveChunk) {
                    // Send entire error chunk to buffer
                    outputMessage += messageChunk;
                    messageChunk = "";
                    shouldSaveChunk = false;
                }
               continue;
            } else {
                if (line.includes("cannot find symbol class") || line.includes("does not exist")) {
                    // Trash error
                    continue;
                } else {
                    // Valid error
                    messageChunk = appendError(messageChunk, line);
                    shouldSaveChunk = true;
                }
            }
        }

        if (isWarningLine(line)) {
            continue;
        }

        if (isClassLine(line)) {
            inClassWithPossibleError = true;
        }
        outputMessage = appendParagraph(outputMessage, line);
    }

    printOutput(outputMessage);
}

function isInformationLine(line) {
    return line.startsWith("Information:")
}

function isWarningLine(line) {
    return line.startsWith("Warning")
}

function isClassLine(line) {
    return line.endsWith(".java");
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

function appendError(message, toAppend) {
    message += "<p>\t" + toAppend + "</p>";
    return message;
}