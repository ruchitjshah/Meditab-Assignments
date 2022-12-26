var screenSize = window.matchMedia("(min-width: 1224px)");
changeSizeFunc(screenSize);
changeSize.addListener(changeSizeFunc);
function changeSizeFunc(){
    const sidemenuclosebtn = document.getElementById('side-menu-close-btn').classList;
    const leftsidenav = document.getElementById('leftsidenav');
    if(sidemenuclosebtn.contains('fa-angle-right')){
        sidemenuclosebtn.remove('fa-angle-left');
        sidemenuclosebtn.add('fa-angle-right');
        leftsidenav.style.width = "2%";
    }
    else
    {
        sidemenuclosebtn.remove('fa-angle-right');
        sidemenuclosebtn.add('fa-angle-left');
        
        leftsidenav.style.width = "16%";
    }
}