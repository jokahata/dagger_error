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

        // Is not an error line
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

                // If also an error line
                if (isErrorLine(line) && isValidError(line) && !line.includes("cannot find symbol")) {
                    messageChunk = appendError(messageChunk, line);
                    outputMessage += messageChunk;
                }
            }
            continue;
        } else if (isErrorLine(line)) {
            if (isValidError(line)) {
                    // Valid error
                    messageChunk = appendError(messageChunk, line);
                    shouldSaveChunk = true;
            }
                    // Trash error
                    continue;
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
    return line.includes(".java");
}

function isValidError(line) {
    return !(line.includes("cannot find symbol class") || line.includes("does not exist"));
}

function isErrorLine(line) {
    return line.includes("error:");
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