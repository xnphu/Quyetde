const maxLength = 200;
const questionContentElem = document.getElementById('questionContent');
const remainCharElem = document.getElementById('remain');

questionContentElem.addEventListener(
    'input', 
    function() {
        var remainChar = maxLength - questionContentElem.value.length;
        remainCharElem.innerText = remainChar;
    }
);