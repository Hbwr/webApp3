//write a function that gets an element with id navBar and glues it to the top of the screen

function stickyNavBar() {
    var navBar = document.getElementById("navBar");
    navBar.classList.add("sticky");
}

function scrollAction() {
    if (window.pageYOffset > 0) {
        document.getElementById("navBar").classList.add("sticky");
    } else {
        document.getElementById("navBar").classList.remove("sticky");
    }
}

//define the sticky class for CSS

window.onscroll = function () {
    scrollAction();
};
