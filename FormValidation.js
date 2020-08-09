var forms = document.getElementsByClassName("needs-validation");

forms = Array.prototype.slice.call( forms );

forms.forEach(element => {
    element.addEventListener("submit", function(event){
        var _inputs = element.getElementsByTagName("input");
        _inputs = Array.prototype.slice.call( _inputs );
        _inputs.forEach(_input => {
            var _type = _input.type;
            if (!(_type == "hidden" || _type == "submit")){
                var _stopEvent = 0;
                if (_input.type != "file"){
                    _stopEvent = normal_validate(_input);
                }
                else{
                    _stopEvent = file_validate(_input);
                }
                if (_stopEvent)
                    stopEvent(event);
            }
        });
    });
});

function normal_validate(element){
    if (element.checkValidity()){
        markAsValid(element)
        return 0;
    }
    else{
        markAsInvalid(element)
        return 1;
    }
}

function file_validate(element){
    var _formats = element.accept.replace(/,/g,'|')
    var _allowedExtensions = new RegExp('('+_formats+')$','i');
    var _filePath = element.value;

    if(_allowedExtensions.test(_filePath) && element.checkValidity()){
        markAsValid(element);
        return 0;
    }
    else{
        markAsInvalid(element);
        return 1;
    }
}

function markAsValid(element){
    element.classList.remove("is-invalid");
    element.classList.add("is-valid");
}

function markAsInvalid(element){
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
}

function stopEvent(event){
    console.log("EVENT STOPPED")
    event.preventDefault();
    event.stopPropagation();
}