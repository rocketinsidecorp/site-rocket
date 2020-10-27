window.addEventListener('scroll', function() {
    var nav = document.querySelector("nav");
    nav.classList.toggle('sticky', window.scrollY > 0);
})

var TxtRotate = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 150 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function() {
        that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('txt-rotate');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-rotate');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period);
        }
    }
};

const makeNavLinksSmooth = () => {
    const navLinks = document.querySelectorAll('.nav-link');

    for (let n in navLinks) {
        if (navLinks.hasOwnProperty(n)) {
            navLinks[n].addEventListener('click', e => {
                e.preventDefault();
                document.querySelector(navLinks[n].hash)
                    .scrollIntoView({
                        behavior: "smooth"
                    });
            });
        }
    }
}

const spyScrolling = () => {
    const sections = document.querySelectorAll('.hero-bg');

    window.onscroll = () => {
        const scrollPos = document.documentElement.scrollTop || document.body.scrollTop;

        for (let s in sections)
            if (sections.hasOwnProperty(s) && sections[s].offsetTop <= scrollPos) {
                const id = sections[s].id;
                document.querySelector('.active').classList.remove('active');
                document.querySelector(`a[href*=${ id }]`).parentNode.classList.add('active');
            }
    }
}

makeNavLinksSmooth();
spyScrolling();