$(document).ready(function(){

  $("#remaining-time").hide();
  $("#start").on('click', trivia.startGame);
  $(document).on('click' , '.option', trivia.guessChecker);

})

var trivia = {

  correct: 0,
  incorrect: 0,
  unanswered: 0,
  currentSet: 0,
  timer: 20,
  timerOn: false,
  timerId : '',

  questions: {
    q1: 'For approximately how many days did World War One last?',
    q2: 'For what reason was Mata Hari executed in 1917?',
    q3: 'In what year of the war did the British send a force to protect the Suez Canal?',
    q4: 'In which country did the Battle of Passchendaele take place?',
    q5: "Where would you see a German Zeppelin?",
    q6: 'Whom did Japan declare war on in 1914 when they entered the conflict?',
    q7: "In which city was Archduke Franz Ferdinand murdered?"
  },
  options: {
    q1: ['1766', '4566', '1466', '1666'],
    q2: ['Adultery', 'Sabotage', 'Espionage', 'Anti-War Protest'],
    q3: ['1914', '1916', '1917', '1915'],
    q4: ['Italy', 'Belgium', 'France', 'Germany'],
    q5: ['Underwater','In a Trench','On a Soldier','In the Air'],
    q6: ['Germany','Russia','Great Britain','France'],
    q7: ['Tirana', 'Zagreb', 'Sarajevo','Budapest']
  },
  answers: {
    q1: '1,566',
    q2: 'Espionage',
    q3: '1914',
    q4: 'Belgium',
    q5: 'In the Air',
    q6: 'Germany',
    q7: 'Sarajevo'
  },

  startGame: function(){

    trivia.currentSet = 0;
    trivia.correct = 0;
    trivia.incorrect = 0;
    trivia.unanswered = 0;
    clearInterval(trivia.timerId);


    $('#game').show();


    $('#results').html('');


    $('#timer').text(trivia.timer);


    $('#start').hide();

    $('#remaining-time').show();

    trivia.nextQuestion();

  },

  nextQuestion : function(){


    trivia.timer = 10;
    $('#timer').removeClass('last-seconds');
    $('#timer').text(trivia.timer);


    if(!trivia.timerOn){
      trivia.timerId = setInterval(trivia.timerRunning, 1000);
    }


    var questionContent = Object.values(trivia.questions)[trivia.currentSet];
    $('#question').text(questionContent);


    var questionOptions = Object.values(trivia.options)[trivia.currentSet];


    $.each(questionOptions, function(index, key){
      $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
    })

  },

  timerRunning : function(){

    if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
      $('#timer').text(trivia.timer);
      trivia.timer--;
        if(trivia.timer === 4){
          $('#timer').addClass('last-seconds');
        }
    }

    else if(trivia.timer === -1){
      trivia.unanswered++;
      trivia.result = false;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
    }

    else if(trivia.currentSet === Object.keys(trivia.questions).length){


      $('#results')
        .html('<h3>Thank you for playing!</h3>'+
        '<p>Correct: '+ trivia.correct +'</p>'+
        '<p>Incorrect: '+ trivia.incorrect +'</p>'+
        '<p>Unaswered: '+ trivia.unanswered +'</p>'+
        '<p>Please play again!</p>');


      $('#game').hide();


      $('#start').show();
    }

  },

  guessChecker : function() {


    var resultId;


    var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];


    if($(this).text() === currentAnswer){

      $(this).addClass('btn-success').removeClass('btn-info');

      trivia.correct++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Correct Answer!</h3>');
    }

    else{

      $(this).addClass('btn-danger').removeClass('btn-info');

      trivia.incorrect++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Better luck next time! '+ currentAnswer +'</h3>');
    }

  },

  guessResult : function(){


    trivia.currentSet++;


    $('.option').remove();
    $('#results h3').remove();


    trivia.nextQuestion();

  }

}
