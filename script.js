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

const finalMusic =
document.getElementById('finalMusic');

music.volume = 0.4;

finalMusic.volume = 0.72;

boom.volume = 0.35;

countSound.volume = 0.5;



// START MUSIC ON FIRST CLICK

document.body.addEventListener('click',()=>{

  if(music.paused){

    music.play().catch(err => console.log(err));

  }

},{ once:true });

music.addEventListener('ended',()=>{

  music.currentTime = 0;

  music.play();

});

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

  document.body.style.overflow = 'hidden';

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

  document.body.style.overflow = 'auto';

  boom.currentTime = 0;

  finalMusic.currentTime = 0;

  boom.play();

  finalMusic.play();

  window.scrollTo({
    top:document.body.scrollHeight,
    behavior:'smooth'
  });

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
Some people enter our lives unexpectedly, yet somehow become unforgettable.
Through every memory, every laugh, and every chaotic moment in our journey, we had many fights and misunderstandings, and I know I hurt you many times. But even after all that, you never changed your affection towards me and continued to care for me in the same way, which truly means a lot.
I’m really sorry for all the times I hurt you, and thank you for always being kind, patient, and affectionate with me. You are genuinely a rare and beautiful soul.
I don’t know whether we will stay in touch in the future or not, but wherever you are, you will always have my best wishes.
You deserve a future filled with peace, happiness, success, and people who truly value your heart. I hope your life ahead becomes beautiful in every way, filled with good memories, smiles, and a happy married life.
Happy Birthday, Sonima ❤️
`;

  const target =
  document.getElementById('finalMessage');

  let i = 0;

  function type(){

    if(i < message.length){

      target.innerHTML =
message.substring(0,i)

i++;

      setTimeout(
        type,
        Math.random()*25 + 20
      );

    }

  }

  type();

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

  for(let i=0;i<80;i++){

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

document.querySelectorAll('.memory-wrapper')
.forEach(wrapper=>{

    const canvas =
    wrapper.querySelector('.memoryScratch');

    const message =
    wrapper.querySelector('.scratchMessage');

    const ctx =
    canvas.getContext('2d');

    canvas.width =
    wrapper.offsetWidth;

    canvas.height =
    wrapper.offsetHeight;

    const gradient =
    ctx.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height
    );

    gradient.addColorStop(0,'#ff4fd8');
    gradient.addColorStop(0.5,'#7a5cff');
    gradient.addColorStop(1,'#ff4fd8');

    ctx.fillStyle =
    gradient;

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    let scratching = false;
    let scratchCount = 0;

    canvas.addEventListener(
        'mousedown',
        ()=> scratching = true
    );

    canvas.addEventListener(
        'mouseup',
        ()=> scratching = false
    );

    canvas.addEventListener(
        'mouseleave',
        ()=> scratching = false
    );

    canvas.addEventListener(
        'mousemove',
        e=>{

            if(!scratching) return;

            const rect =
            canvas.getBoundingClientRect();

            const x =
            e.clientX - rect.left;

            const y =
            e.clientY - rect.top;

            ctx.globalCompositeOperation =
            'destination-out';

            ctx.beginPath();

            ctx.arc(
                x,
                y,
                45,
                0,
                Math.PI * 2
            );

            ctx.fill();

            scratchCount++;

            if(scratchCount > 15){

                canvas.style.opacity='0';

                message.style.opacity='0';

                setTimeout(()=>{

                    canvas.remove();

                    message.remove();

                },800);

            }

        });

});
