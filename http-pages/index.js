function toggle() {
    console.log('tyt');
    var customCheck2 = document.getElementById('customCheck2');
    var customCheck3 = document.getElementById('customCheck3');
    if (!customCheck2.checked & !customCheck3.checked) {
        document.getElementById('roles').style.display = 'none';
    } else {
        document.getElementById('roles').style.display = 'block';
    }
}


(function () {
    document.addEventListener("DOMContentLoaded", function () {
        toggle();
    })
})();
