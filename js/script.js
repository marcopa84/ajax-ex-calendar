$(document).ready(function () {
  var mounth = 0;

  getDays(mounth);

  // mese successivo
  $('.next-mounth').on('click', function() {
    mounth = mounth + 1;
    if (mounth > 11) {
      alert('Calendario 2019 non pronto!');
    }
    else {
      $('.mounth-days').text('');
      getDays(mounth);
    }
  });
  // mese precedente
  $('.prev-mounth').on('click', function() {
    mounth = mounth - 1;
    if (mounth < 0) {
      alert('Calendario 2017 non selezionabile!');
    }
    else {
      $('.mounth-days').text('');
      getDays(mounth);
    }
  });

});


// creo i giorni in base alla variabile dei giorni del mese selezionato
function getDays(mounth) {
  var mounthsName = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];

  var daysInMounth = moment("2018-"+(mounth+1), "YYYY-MM").daysInMonth();
  $('.mounth-name').text(mounthsName[mounth]);

  var day=0;
  for (var i = 0; i < daysInMounth; i++) {
    var source = document.getElementById("entry-template").innerHTML;
    var template = Handlebars.compile(source);
    var context = {
      day : (day=day+1) + ' ' + mounthsName[mounth],
    };
    var html = template(context);
    $('.mounth-days').append(html);
  };
}
