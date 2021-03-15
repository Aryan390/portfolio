class Typewriter{
  constructor(textEl,words){
    this.textEl = textEl
    this.words = words
    this.wait = 3000
    this.text = ''
    this.wordIndex = 0
    this.isDeleting = false
  }
  type(){
    let index = this.wordIndex % this.words.length
    let fullText = this.words[index]

    if(this.isDeleting){
      this.text = fullText.substring(0,this.text.length-1)
    }else{
      this.text = fullText.substring(0,this.text.length+1)
    }
    
    this.textEl.innerHTML = `${this.text}`
    
    let typeSpeed = 300

    if(this.isDeleting){
      typeSpeed /=2
    }

    // if text is === fulltext
    if(!this.isDeleting && this.text === fullText){
      typeSpeed= this.wait
      this.isDeleting= true
    }else if(this.isDeleting && this.text === ''){

      this.isDeleting=false
      this.wordIndex++
    }

    setTimeout(()=>this.type(),typeSpeed)
  }
}

// init function
function init(){
  const textEl = document.querySelector('.text')
  const words = JSON.parse(textEl.getAttribute('data-words'))

  const typeMe = new Typewriter(textEl,words)
  typeMe.type()
}

init()

// smooth scrolling
const a = document.querySelectorAll('a')

a.forEach(link =>{
  link.addEventListener('click',smoothScroll)
})

function smoothScroll(e){
  if(e.target.hash!==''){
    $('html,body').animate({
      scrollTop: $(e.target.hash).offset().top-10
    },400)
  }
}


// animation using gsap
function initAnimation(){
  const tl = new gsap.timeline()
  
  tl.to('.layer-1',{duration: .5,y:'-100vh',delay:.7})
  .to('.layer-2',{y:'-100vh',duration:.5})
  .to('.layer-3',{y:'-100vh',duration:.5})
  .to('.main-overlay',{y:'-100vh'})
  .from('.btn',{opacity: 0,duration: .7,scale: 0.2})
  .from('.heading-text',{duration:2,y:'10vh',opacity: 0,ease: 'back',delay:.6})
  .from('.icon',{opacity: 0})
  .from('.list-item',{opacity: 0,y:'5px'})
  .from('.who-box',{xPercent:50,opacity:0,ease: 'power2.out',duration:.9})
}

initAnimation()