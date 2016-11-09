function sidePanelMobileShow(el) {
    $(el).addClass('mobile-show');
}

function sidePanelMobileHide(el) {
    $(el).removeClass('mobile-show');
}

function setMapHeight() {
    var $mainHeight = $(window).height() - $('header').height();
    if($(window).width() < 1024)
        $('main').height($mainHeight - 15);
    else
        $('main').height($mainHeight - 40);
}

function itemAddHover(id) {
    $('.point-list__item').each(function (item) {
        if($(this).attr('data-id') == id){
            $(this).addClass('point-list__item--hover')
        }
    })
}

function itemRemoveHover(id) {
    $('.point-list__item').each(function (item) {
        if($(this).attr('data-id') == id){
            $(this).removeClass('point-list__item--hover')
        }
    })
}

function openModal(pos, id) {
    var $modal = $('.modal'),
        $modalBack = $('.modal__back'),
        $modalInput = $('.modal__input');

    if(pos == null) {
        $modal.data('marker-id', id);
        $modal.addClass('modal--edit');
    } else {
        $modal.data('position', pos);
    }
    $modalBack.removeClass('hidden');
    $modalInput.val('');
    $modalInput.focus();
}

function closeModal(code, id) {
    var $modal = $('.modal'),
        $modalBack = $('.modal__back');

    var pos = $modal.data('position');
    if(pos == null){
        if(code != null){
            markers.forEach(function (item) {
                if(item.id == id){
                    updateMarker(id, code, item.position.lat(), item.position.lng());
                }
            });
        }
    } else {
        if(code != null){
            insertMarker(pos, code);
        }
    }
    $modal.data('marker-id', null);
    $modal.data('position', null);
    $modalBack.removeClass('modal--edit').addClass('hidden')
}

function itemSetIcon(item, icon, anim) {
    item.setIcon(icon);
    item.setAnimation(anim)
}
