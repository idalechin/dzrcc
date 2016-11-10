var teams = [],
    teamsIds = [],
    teamInfowindow;

function refreshTeamsArray(data) {
    $.each(data, function (key, val) {
        if (teamsIds.indexOf(val.id) < 0) {
            var teamMarker = new google.maps.Marker({
                position: {lat: parseFloat(val.lat), lng: parseFloat(val.lon)},
                map: gmap,
                title: "Команда " + (val.id),
                icon: {
                    url: 'img/car_' + val.id + '.svg',
                    size: new google.maps.Size(24, 24),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(12, 24)
                }
            });
            teamMarker.id = val.id;
            teams.push(teamMarker);
            teamsIds.push(val.id);
            setTeamsListeners(teamMarker);
            addTeamToList(val.id);
        } else {
            teams.forEach(function (item, i, arr) {
                if (item.id == val.id) {
                    item.setPosition({lat: parseFloat(val.lat), lng: parseFloat(val.lon)});
                }
            });
        }
        refreshTeamInList(val.id, val.time);
    });
}

function setTeamsListeners(teamMarker) {
    google.maps.event.addListener(teamMarker, "click", function (e) {
        if (teamInfowindow) {
            teamInfowindow.close()
        }
        ;
        teamInfowindow = new google.maps.InfoWindow({
            content: '<div>' + getTeamsInfo(parseInt(teamMarker.id)) + ':<br>' + teamMarker.getPosition().lat() + ', ' + teamMarker.getPosition().lng() + '</div>'
        });
        teamInfowindow.open(gmap, teamMarker);
    });
}

function addTeamToList(id) {
    $('.teams').append('<li class="team"  data-car-id=\"' + id + '\" ><img src=\"img/car_' + id + '.svg\" class="team_image"> ' + getTeamsInfo(parseInt(id)) + '   <span class=\"team_data_' + id + '\">…</span></li>');
}

function refreshTeamInList(id, time) {
    var date = new Date(parseInt(time));
    $('.team_data_' + id).text(date.toLocaleString().match(/\s.+$/i)[0]);
}

//----------
function getTeamsInfo(id) {
    switch (id) {
        case 1:
            return "\"Твоя мама\"";
            break;
        case 2:
            return "\"Лударь\"";
            break;
        case 3:
            return "\"Сучий жир\"";
            break;
        case 4:
            return "\"Шкаф\"";
            break;
        case 5:
            return "\"Муму\"";
            break;
        case 6:
            return "\"Пиво\"";
            break;
        case 7:
            return "\"name\"";
            break;
        case 8:
            return "\"name\"";
            break;
        default:
            return "?";
    }
}

