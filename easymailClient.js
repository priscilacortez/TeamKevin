// Given a string of text, returns a list of sentences contained in the text.
function getSentences(text) {
    var re = /[\.?!]\s+[A-Z](?!\.)(?=[a-z0-9A-Z\s\W]*[\.?!])/g;
    var myArray;
    var sentenceList = [];
    var lastIndex = -1;
    while ((myArray = re.exec(text)) !== null) {
        var punct = myArray.index;                                              // index of punctuation
        sentenceList.push(text.substring(Math.max(0,lastIndex-1), punct+1))     // add sentence to list
        lastIndex = re.lastIndex;                                               // update last index accounted for
    }
    if (re.lastIndex != -1) {
        sentenceList.push(text.substring(punct+1, text.length));                // add last sentence
    }
    return sentenceList;
}

//// CURRENTLY NOT WORKING
//function getSentences2(sentenceList) {
//    var newSentenceList = [];
//    for (i = 0; i < sentenceList.length; i++) {    
//        oldSentence = sentenceList[i];
//        sentences = oldSentence.split(/<div>/g);
//        for (j = 0; j < sentences.length; j++) {
//            sentences[j] = '<div>' + sentences[j];
//        }
//        newSentenceList = newSentenceList.concat(sentences);
//    }
//    return newSentenceList;
//}

// Returns true if sentence contains a question mark
function isQuestion(sentence) {
    var re = /[?]/;
    return sentence.match(re) != null;
}

// Given a list of text sentences, returns a string with sentences separated by <br> tags.
function getSentenceHTML(sentenceList) {
    var html = '';
    while (sentenceList.length > 0) {
        var currentSentence = sentenceList.shift();
        if (isQuestion(currentSentence)) {
            html += '<span class="question">';
            html += currentSentence;
            html += '</span>'
        } else {
            html += currentSentence;
        }
        html += '<br>';
    }
    return html;
}