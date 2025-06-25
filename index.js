const typingText = document.querySelector('.typing-test p');
const input = document.querySelector('.wrapper .input-field');
const time = document.querySelector('.time span b');
const mistakes = document.querySelector('.mistake span');
const wpm = document.querySelector('.wpm span');
const cpm = document.querySelector('.cpm span');
const btn = document.querySelector('button');

// set value
let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistake = 0;
let isTyping =  false;
  

function loadParagraph(){
    const paragraph = ["A programmer, or this add one two computer programmer, is a professional who writes computer code to create and test software.Programmers work closely with software developers and may sometimes take on some of their tasks, such as designing programs.","A random paragraph can also be an excellent way for a writer to tackle writers' block.This how being you stupid in this world. You are intelligent but no commonsense,this is fact for you.", "Writing block can often happen due to being stuck with a current project that the writer is trying to complete.By inserting a completely random paragraph from which to begin, it can take down some of the issues that may have been causing the writers' block in the first place.","it's not only writers who can benefit from this free online tool.If you're a programmer who's working on a project where blocks of text are needed, this tool can be a great way to get that.","It's a good way to test your programming and that the tool being created is working well.Icredible primeier lleague sense you too bad hetrigenous like that far.","Business is the practice of making a living by buying, selling, or producing products, or any activity or enterprise for profit. A business can be a company, a type of work, or a situation or activity.","Business is the practice of making one's living or making money by producing or buying and selling products (such as goods and services). you are sesible for a bussines, it's to work hard for your work.","Health can be promoted by encouraging healthful activities, such as regular physical exercise and adequate sleep,[1] and by reducing or avoiding unhealthful activities or situations, such as smoking or excessive stress.", "Some factors affecting health are due to individual choices, such as whether to engage in a high-risk behavior.paragraph index random log console outline Timeline here to search."];

    const randomIndex = Math.floor(Math.random()*paragraph.length);
    typingText.innerHTML = "";
    for(const char of paragraph[randomIndex]){
        console.log(char);
        typingText.innerHTML += `<span>${char}</span>`;
    }
    typingText.querySelectorAll('span')[0].classList.add('active');
    document.addEventListener('keydown', () => input.focus());
    typingText.addEventListener("click", () =>{
        input.focus()
    })
}

// handle userInput
function initTyping(){
   const char = typingText.querySelectorAll('span');
   const typedChar = input.value.charAt(charIndex);
   if(charIndex < char.length && timeLeft > 0){

     if(!isTyping){
        timer = setInterval(initTime,1000);
        isTyping = true;
     }

    if(char[charIndex].innerText === typedChar){
        char[charIndex].classList.add('correct');
        console.log("correct");
    }
    else{
        mistake++;
        char[charIndex].classList.add('incorrect');
        console.log("incorrect");
    }
    charIndex++;
    char[charIndex].classList.add("active");
    mistakes.innerText = mistake;
    cpm.innerText = charIndex - mistake;
   }
   else{
    clearInterval(timer);
    input.value = '';
   }
}

function initTime(){
    if(timeLeft > 0){
        timeLeft--;
        time.innerText = timeLeft;
        const wpmVal = Math.round(((charIndex - mistake)/5)/(maxTime - timeLeft)*60);
        wpm.innerText = wpmVal;
    }else{
        clearInterval(timer);
    }
}
function reset(){
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = 0;
    mistake = 0;
    isTyping = false;
    wpm.innerText = 0;
    cpm.innerText = 0;
    mistakes.innerText = 0;
    time.innerText = timeLeft;
    input.value = '';
}

input.addEventListener("input", initTyping);
btn.addEventListener("click", reset);

loadParagraph();
