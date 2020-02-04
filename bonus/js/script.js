$(document).ready(function () {
  var mounth = 0;

  getDays(mounth);

  // mese successivo click
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
  // mese precedente click
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
  // cambio mese da tastiera
  $(document).keydown(
    function(){

      if (event.which == 39 || event.keycode == 39){
        mounth = mounth + 1;
        if (mounth > 11) {
          alert('Calendario 2019 non pronto!');
        }
        else {
          $('.mounth-days').text('');
          getDays(mounth);
        }
      }
      else if (event.which == 37 || event.keycode == 37){
        mounth = mounth - 1;
        if (mounth < 0) {
          alert('Calendario 2017 non selezionabile!');
        }
        else {
          $('.mounth-days').text('');
          getDays(mounth);
        }
      }
    }
  );
  // ------------
});


// creo i giorni in base alla variabile dei giorni del mese selezionato + scrivo mese
function getDays(mounth) {
    // calcolo i giorni del mese
  moment.locale('it');
  var daysInMounth = moment("2018-"+(mounth+1), "YYYY-MM").daysInMonth();
  $('.mounth-name').text(moment.months(mounth)+' 2018');
  // ciclo per i giorni e creo tanti <li> quanti sono i giorni
  var day=0;
  var mounthAttr = mounth +1;
  for (var i = 0; i < daysInMounth; i++) {
    var source = document.getElementById("entry-template").innerHTML;
    var template = Handlebars.compile(source);
    var context = {
      attr: '2018-'+addZero(mounthAttr)+'-'+addZero(day=day+1),
      day : day + ' ' + moment.months(mounth),
    };
    var html = template(context);
    $('.mounth-days').append(html);

  };

  $.ajax({
    url: "https://flynn.boolean.careers/exercises/api/holidays?year=2018&month="+mounth,
    method: "GET",
    success: function (data, stato) {
      var arrayFest = data.response;
      console.log(data.response);
      for (var i = 0; i < arrayFest.length; i++) {
        console.log(arrayFest[i].date);
        $('li').each(function() {
          var dayAttr = $(this).attr('data-date');
          if (dayAttr == arrayFest[i].date) {
            $(this).children('.event').append(arrayFest[i].name);
            $(this).addClass('event-day');
          }
        });
      }

    },
    error: function (richiesta, stato, errori) {
      alert("E' avvenuto un errore. " + errore);
    }
  });

};

// funzione per uniformare data con doppia cifra
function addZero(number) {
  if(number < 10) {
    number = '0' + number;
  }
  return number;
}
