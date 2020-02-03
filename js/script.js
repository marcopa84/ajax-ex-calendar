$(document).ready(function () {
  var mounths = 0;

  var daysInMounth = moment("2018-"+(mounths+1), "YYYY-MM").daysInMonth();
  console.log(daysInMounth);

  getDays(daysInMounth);

  $('.next-mounth').on('click', function() {
    mounths = mounths + 1;
    if (mounths > 11) {
      alert('Calendario 2019 non pronto!');
    }
    else {
      var daysInMounth = moment("2018-"+(mounths+1), "YYYY-MM").daysInMonth();
      console.log(mounths);
      console.log(daysInMounth);
      $('.mounth-days').text('');
      getDays(daysInMounth);
    }

  });


});


// creo i giorni in base alla variabile dei giorni del mese selezionato
function getDays(dayMax) {
  var day=0;
  for (var i = 0; i < dayMax; i++) {
    var source = document.getElementById("entry-template").innerHTML;
    var template = Handlebars.compile(source);
    var context = {
      day : (day=day+1) + ' ' + "prova",
    };
    var html = template(context);
    $('.mounth-days').append(html);
  };
}
