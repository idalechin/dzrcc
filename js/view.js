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

function openModal(pos) {
    $('.modal').data('position', pos);
    $('.modal__back').removeClass('hidden');
    $('.modal__input').val('');
    $('.modal__input').focus();
}

function closeModal(code) {
    var pos = $('.modal').data('position');
    if(code != null){
        insertMarker(pos, code);
    }
    $('.modal').data('position', null);
    $('.modal__back').addClass('hidden')
}

function itemSetIcon(item, icon, anim) {
    item.setIcon(icon);
    item.setAnimation(anim)
}
