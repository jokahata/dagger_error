$(document).ready(function(){
    $('#errorlog').keypress(function(e){
        if(e.which == 13){
            clear_output();
            var errorLogLines = $('textarea#errorlog').val().split('\n');
            var outputLines = $('#errorfound');
            for (var i = 0; i < errorLogLines.length; i++) {
                var line = errorLogLines[i];
                appendParagraph(outputLines, line);
            }
        }
    });
});

function clear_output() {
    var outputLines = $('#errorfound');
    outputLines.children().remove();
}

function appendParagraph(parent, toAppend) {
    parent.append("<p>" + toAppend + "</p>");
}