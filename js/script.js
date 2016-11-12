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
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || $(window).width() < 1024) {
		mobileButtonAction();
		clickOutMobilePanel();
	}
});


function multiRefresh(time){
	setTimeout(multiRefresh, time || 5000);
	setMapHeight();
	getMarkersFromServer();
	getLastCarPositions();
}



