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
	/*if(teamData.length>0){
		$('.team_data').each(function(indx, element){
			$(this).text(teamData[indx]);
		});
	}*/
	setTimeout(multiRefresh, time || 3000);
	setMapHeight();
	getMarkersFromServer();
	getLastCarPositions();
}



