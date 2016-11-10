$(function() {
    createGMap();
    initSearchBox();
    initGeocoder();
    multiRefresh();
    removeMarkerItem();
	editMarkerItem();
    hoverDelete();
	hoverEdit();
	hoverItem();
	clickCenter();
	clickCloseModal();
	carToCenter();
	resizeWindowInit();
	if($(window).width() < 1024){
		mobileButtonAction();
		clickOutMobilePanel();
	}
});


function multiRefresh(time){
	setTimeout(multiRefresh, time || 3000);
	setMapHeight();
	getMarkersFromServer();
	getLastCarPositions();
}



