var timerCounter =75;
var currentQuestion =0;
var incorrect = false;
var totalScore = 0;
var penalty = 5;
var testFinished = false;
var x = document.getElementById("myAudio"); 
var y = document.getElementById("myAudio1"); 
var currentChoosedQuiz=[];
var htmlQuestionAndAnswers = [ // list of questions & answers
{
	title: "What does HTML stand for?",
    choices: ["Hyperlinks and Text Markup Language", "Home Tool Markup Language", "Hyper Text Markup Language"],
    answer: "2",
	score: 10
},
{
	title: "Who is making the Web standards?",
    choices: ["Google", "The World Wide Web Consortium", "Microsoft","Mozilla"],
    answer: "1",
	score: 10
},
{
	title: "Choose the correct HTML element for the largest heading:",
    choices: ["h1", "heading", "head","h3"],
    answer: "0",
	score: 10
},
{
	title: "Where is the correct place to insert a JavaScript in HTML?",
    choices: ["The body section", "Both the head section and the body section are correct", "The head section"],
    answer: "1",
	score: 10
},
{
	title: "Web pages starts with which ofthe following tag?",
    choices: ["Body", "Title", "HTML","Form"],
    answer: "2",
	score: 10
}


];


var cssQuestionAndAnswers = [ // list of questions & answers
    {
        title: "How do you change the font of an element?",
        choices: ["font-family:", "font=", "f:"],
        answer: "0",
        score: 10
    },
    {
        title: "What does CSS stand for?",
        choices: ["Computer Style Sheets", "Creative Style Sheets", "Cascading Style Sheets","Colorful Style Sheets"],
        answer: "2",
        score: 10
	},
	
	{
        title: "Which is the correct CSS syntax?",
        choices: ["body {color: black}", "{body;color:black}", "{body:color=black(body}","body:color=black"],
        answer: "0",
        score: 10
	},
	
    {
        title: "Which property is used to change the background color?",
        choices: ["bgcolor:", "background-color", "color:"],
        answer: "1",
        score: 10
	},
	
	{
        title: "How do you change the text color of an element?",
        choices: ["text-color=", "fgcolor:", "color:","text-color:"],
        answer: "2",
        score: 10
    }
    
    ];

function highScores(){ // storing high scores in the high score modal
  for (let i = 0; i <localStorage.length; i++) {
   document.getElementById("score-list").innerHTML = document.getElementById("score-list").innerHTML+'<li class="list-group-item"><span class="float-left">'+localStorage.key(i)+'</span><span class="float-right">'+localStorage.getItem(localStorage.key(i))+'</span></li>';
}
}
function save(){ // saving user name with its score
  localStorage.setItem(document.getElementById("user-name").value, totalScore);
}
function askQuestion(){ // Asking question function which keeps asking the question till length of questions & answers array
if(currentQuestion < currentChoosedQuiz.length ){
	document.getElementById("ques").innerHTML = currentChoosedQuiz[currentQuestion].title;
	var options = document.getElementById("altcontainer");
	document.getElementById("altcontainer").innerHTML ="";
	for(var itr=0;itr<currentChoosedQuiz[currentQuestion].choices.length;itr++){
		document.getElementById("altcontainer").innerHTML =document.getElementById("altcontainer").innerHTML+'<label class="radiocontainer checkedlabel" id="label2">'+currentChoosedQuiz[currentQuestion].choices[itr]+'<input type="radio" name="quiz" id="2" onclick="clickRadio(this)" value="'+itr+'"><span class="checkmark"></span></label><br>';
	}
	}
	else{
	testFinished = true;
	document.getElementById("ques").innerHTML = "Finished";
	document.getElementById("altcontainer").innerHTML ="";
	showResultModal();
		
	}
}

function showResultModal(){ // result modal with score
    document.getElementById("score").innerHTML = totalScore;
    $('#score-board').modal('show'); 
}

function clickRadio(radioCtrl){//to prevent array index out of bound error & increase score value if correct answer is given
	if(currentQuestion < currentChoosedQuiz.length ){
	if(radioCtrl.value == currentChoosedQuiz[currentQuestion].answer){
		y.play();
	//alert("correct");
	document.getElementById("ans-evaluation").innerHTML="<span id='correct'>Correct</span>";
	totalScore = currentChoosedQuiz[currentQuestion].score+ totalScore;
	//console.log(totalScore);
	}
	else{
	incorrect=true;
	  x.play(); 
	//alert("Incorrect");
	document.getElementById("ans-evaluation").innerHTML="<span id ='incorrect'>Incorrect</span>";

	}
		sleep(500).then(() => {
	
			 document.getElementById("ans-evaluation").innerHTML=" ";
	askQuestion();
	
	
	});
	}
 
	    currentQuestion++;
}

function startQuiz(choice){ // starting quiz 
if (choice==1){
    currentChoosedQuiz=htmlQuestionAndAnswers;
}
else if (choice==2)
{
    currentChoosedQuiz=cssQuestionAndAnswers;
}

    startTimer();
askQuestion();

};
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function  startTimer(){ //start timer function to start time

for(var seconds=timerCounter;seconds>=0;seconds--){



document.getElementById("timer").innerHTML = "00:"+seconds;
if(incorrect){
    seconds=seconds-penalty;

incorrect=false;
}
if(testFinished){
    seconds=0;
}
if (seconds===0){
    testFinished = true;
	document.getElementById("ques").innerHTML = "Finished";
	document.getElementById("altcontainer").innerHTML ="";
	showResultModal();
    break;
    }    
await sleep(900);


}

};