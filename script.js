// LOADER

history.scrollRestoration = "manual";

window.onload = () => {

  window.scrollTo(0,0);

};

window.addEventListener('load',()=>{

  setTimeout(()=>{

    document.getElementById('loader')
    .style.display='none';

  },2200);

});

// CURSOR

const cursor =
document.querySelector('.cursor');

window.addEventListener('mousemove',(e)=>{

  cursor.style.left =
  e.clientX+'px';

  cursor.style.top =
  e.clientY+'px';

});

// MUSIC

const music =
document.getElementById('music');

const countSound =
document.getElementById('countSound');

const boom =
document.getElementById('boomSound');

music.volume = 0.4;

// START MUSIC ON FIRST CLICK

document.body.addEventListener('click',()=>{

  music.play();

},{ once:true });

// MUSIC BUTTON

const toggle =
document.getElementById('musicToggle');

toggle.addEventListener('click',()=>{

  if(music.paused){

    music.play();

  }else{

    music.pause();

  }

});

// START JOURNEY

const startBtn =
document.getElementById('startJourney');

startBtn.addEventListener('click',()=>{

  music.play();

  document.querySelector('.gallery-section')
  .scrollIntoView({
    behavior:'smooth'
  });

});

// SCROLL REVEAL

const reveals =
document.querySelectorAll('.reveal');

window.addEventListener('scroll',()=>{

  reveals.forEach((el)=>{

    const top =
    el.getBoundingClientRect().top;

    if(top < window.innerHeight - 100){

      el.classList.add('active');

    }

  });

});

// WISH CARDS

const cards =
document.querySelectorAll('.wish-card');

cards.forEach((card)=>{

  card.addEventListener('click',()=>{

    if(card.classList.contains('locked'))
    return;

    if(!card.classList.contains('opened')){

      card.classList.add('opened');


      const next =
      document.querySelector(
      `[data-order="${
        parseInt(card.dataset.order)+1
      }"]`
      );

      if(next){

        setTimeout(()=>{

          next.classList.remove('locked');

        },1600);

      }

      if(card.classList.contains('jagi-card')){

        setTimeout(()=>{

          startCountdown();

        },2200);

      }

    }

  });

});

// COUNTDOWN

function startCountdown(){

  countSound.currentTime = 0;

  countSound.play();

  music.pause();

  const section =
  document.getElementById('countdownSection');

  section.classList.remove('hidden');

  section.scrollIntoView({
    behavior:'smooth'
  });

  const number =
  document.getElementById('countNumber');

  let count = 5;

  const interval =
  setInterval(()=>{

    number.innerHTML = count;

    document.body.style.transform =
    'translateX(5px)';

    setTimeout(()=>{

      document.body.style.transform =
      'translateX(0px)';

    },100);

    count--;

    if(count < 0){

      countSound.pause();

      clearInterval(interval);

      launchFinal();

    }

  },1000);

}

// FINAL

function launchFinal(){

  boom.play();

  music.play();

  const final =
  document.getElementById('finalSection');

  final.classList.remove('hidden');

  final.scrollIntoView({
    behavior:'smooth'
  });

  startFireworks();

  typeMessage();

}

// TYPING EFFECT

function typeMessage(){

  const message = `
Some people enter our lives unexpectedly, yet somehow become unforgettable. Through every memory, every laugh, and every chaotic moment in our journey, we fought a lot and had many misunderstandings, and I know I hurt you many times. But even after all that, you never changed your affection towards me, and you still cared for me in the same way, which truly means a lot. You are such a rare and beautiful soul, and as a friend, I will always be there for you. There’s something I always wanted to tell you — a sincere sorry — but my ego always stopped me from saying it. So today, I just want to say I’m really sorry for all the times I hurt you, and thank you for always being kind, patient, and affectionate with me. You deserve a future filled with peace, happiness, success, and people who truly value your heart. I hope your life ahead becomes beautiful in every way, filled with lovely memories, endless smiles, and a wonderful married life. Happy Birthday, Sonima ❤️
`;

  const target =
  document.getElementById('finalMessage');

  let i = 0;

  const interval =
  setInterval(()=>{

    target.innerHTML +=
    message.charAt(i);

    i++;

    if(i >= message.length){

      clearInterval(interval);

    }

  },35);

}

// FIREWORKS

const canvas =
document.getElementById('fireworks');

const ctx =
canvas.getContext('2d');

canvas.width =
window.innerWidth;

canvas.height =
window.innerHeight;

let particles = [];

function createFirework(){

  const x =
  Math.random()*canvas.width;

  const y =
  Math.random()*canvas.height/2;

  for(let i=0;i<120;i++){

    particles.push({

      x,
      y,

      radius:
      Math.random()*3+1,

      speed:
      Math.random()*6+2,

      angle:
      Math.random()*Math.PI*2,

      life:100

    });

  }

}

function animateFireworks(){

  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  particles.forEach((p,index)=>{

    p.x +=
    Math.cos(p.angle)*p.speed;

    p.y +=
    Math.sin(p.angle)*p.speed;

    p.life--;

    ctx.beginPath();

    ctx.arc(
      p.x,
      p.y,
      p.radius,
      0,
      Math.PI*2
    );

    ctx.fillStyle =
    `rgba(255,79,216,${
      p.life/100
    })`;

    ctx.fill();

    if(p.life<=0){

      particles.splice(index,1);

    }

  });

  requestAnimationFrame(
    animateFireworks
  );

}

function startFireworks(){

  setInterval(()=>{

    createFirework();

  },700);

  animateFireworks();

}
