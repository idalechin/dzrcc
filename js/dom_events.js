function removeMarkerItem(){
    $(document).on('click', '[data-toggle="delete-item"]', function () {
        var $id = $(this).closest('.point-list__item').attr('data-id');
        removeMarker($id);
    });
}

function editMarkerItem(){
    $(document).on('click', '[data-toggle="edit-item"]', function () {
        var $id = $(this).closest('.point-list__item').attr('data-id');
        openModal(null, $id);
    });
}

function hoverDelete() {
    $(document).on('mouseenter', '[data-toggle="delete-item"]', function () {
            $(this).closest('.point-list__item').addClass('hover--delete');
        }
    );
    $(document).on('mouseleave', '[data-toggle="delete-item"]', function () {
            $(this).closest('.point-list__item').removeClass('hover--delete');
        }
    );
}

function hoverEdit() {
    $(document).on('mouseenter', '[data-toggle="edit-item"]', function () {
            $(this).closest('.point-list__item').addClass('hover--edit');
        }
    );
    $(document).on('mouseleave', '[data-toggle="edit-item"]', function () {
            $(this).closest('.point-list__item').removeClass('hover--edit');
        }
    );
}

function hoverItem() {
    $(document).on('mouseenter', '.point-list__item', function () {
        var $id = $(this).attr('data-id');
        markers.forEach(function(item) {
            if(item.id == $id){
                itemSetIcon(item, markerImageHover, google.maps.Animation.BOUNCE);
            }
        });
    });
    $(document).on('mouseleave', '.point-list__item', function () {
        var $id = $(this).attr('data-id');
        markers.forEach(function(item) {
            if(item.id == $id){
                itemSetIcon(item, markerImage, null);
            }
        });
    });
}

function clickCenter() {
    $(document).on('click', '.point-list__item', function () {
        var $id = $(this).attr('data-id');
        markers.forEach(function(item) {
            if(item.id == $id){
                gmap.panTo(item.position);
            }
        });
    })
}

function clickCloseModal() {
    $(document).on('click', '.modal__btn--ok', function (e) {
        var code = $('.modal__input').val();
        var id = $(".modal").data('marker-id');
        closeModal(code, id);
    });
    $(document).on('click', '.modal__btn--no', function (e) {
        closeModal(null, null);
    });
    $(document).on('keypress', '.modal', function (e) {
        if (e.which == 13) {
            var code = $('.modal__input').val();
            var id = $(".modal").data('marker-id');
            closeModal(code, id);
        }
    });
    $(document).on('mousedown', function (e){
        var panel = $(".modal");
        if (!panel.is(e.target) && panel.has(e.target).length === 0 && $(".modal:visible").length) {
            closeModal(null, null);
        }
    });
}

function mobileButtonAction() {
    $(document).on('click', '.btn--mobile', function (e) {
        $('.panel--mobile').removeClass('mobile-show');
        var activElement = $(this).attr('data-mobile');
        sidePanelMobileShow(activElement);
    });

    $(document).on('click', '.panel--mobile li', function (e) {
        sidePanelMobileHide('.panel--mobile');
    });

    $(document).on('mousedown', '.btn--mobile', function (e) {
        $(this).addClass('btn--down')
    });
    $(document).on('mouseup', '.btn--mobile', function (e) {
        $(this).removeClass('btn--down')
    });
}

function clickOutMobilePanel() {
    $(document).on('mousedown', function (e){
        var panel = $(".panel--mobile");
        var panelList = panel.find('ul');
        if (!panelList.is(e.target) && panelList.has(e.target).length === 0) {
            sidePanelMobileHide(panel);
        }
    });
}

function carToCenter() {
    $(document).on('click', '.team', function (e) {
        var $id = $(this).attr('data-car-id');
        teams.forEach(function(item, i, arr) {
            if(item.id==$id ){
                gmap.panTo(item.position);
            }
        });
    });
}

function resizeWindowInit() {
    $(window).on('resize', function (e) {
        if($(window).width() < 1024){
            mobileButtonAction();
            clickOutMobilePanel();
        }
    });
}