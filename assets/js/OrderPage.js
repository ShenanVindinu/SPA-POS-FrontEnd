$(document).ready(function() {

    setDate(); 

    function setDate() {
        var today = new Date().toISOString().split('T')[0];
        $('#OrderDateField').val(today);
    }

});