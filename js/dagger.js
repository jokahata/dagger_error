$(document).ready(function(){
    $('#errorlog').keypress(function(e){
        if(e.which == 13){
            clearOutput();
            processErrorLog();
        }
    });
});

function processErrorLog() {
    // Final message we show to user
    var outputMessage = "";

    // Current chunk of message, like the file an error occurs and the error
    var messageChunk = "";

    // If this chunk contains a valid error, should be true
    var shouldSaveChunk = false;
    
    var errorLogLines = $('textarea#errorlog').val().split('\n');
    for (var i = 0; i < errorLogLines.length; i++) {
        var line = errorLogLines[i];

        if (isClassLine(line) || isInformationLine(line) || isWarningLine(line)) {
            if (shouldSaveChunk) {
                // Send entire error chunk to buffer
                messageChunk += "<hr/>"
                outputMessage += messageChunk;
            }

            messageChunk = "";
            shouldSaveChunk = false;

            if (isClassLine(line)) {
                messageChunk = appendParagraph(messageChunk, line); 
            }
            continue;
        } else if (isErrorLine(line)) {
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

function isErrorLine(line) {
    return line.includes("Error");
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
    message += "<p>&nbsp;&nbsp;&nbsp;&nbsp;" + toAppend + "</p>";
    return message;
}