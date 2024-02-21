function openMain() {
    document.getElementById("myAside").style.width = "250px";
    document.getElementById("mainContent").style.width = "calc(100% - 250px)";
}

function closeAside() {
    document.getElementById("myAside").style.width = "0";
    document.getElementById("mainContent").style.width = "100%";
}