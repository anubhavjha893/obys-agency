function locomotiveAnimation() {
    gsap.registerPlugin(ScrollTrigger);
  
    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
  
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector("#main"),
      smooth: true,
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);
  
    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
      scrollTop(value) {
        return arguments.length
          ? locoScroll.scrollTo(value, 0, 0)
          : locoScroll.scroll.instance.scroll.y;
      }, // we don't have to define a scrollLeft because we're only scrolling vertically.
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
      pinType: document.querySelector("#main").style.transform
        ? "transform"
        : "fixed",
    });
  
    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  
    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
  }
  
  function loaderanimaton() {
    var tl = gsap.timeline();
    var h2 = document.querySelector(".line2 h2");
    var grow = 0;
  
    tl.from(".line h1", {
      y: 150,
      stagger: 0.2,
    });
    tl.from(".line2", {
      opacity: 0,
      onStart: function () {
        const clrinterval = setInterval(function () {
          if (grow < 100) {
            h2.innerHTML = grow++;
          } else {
            h2.innerHTML = grow;
            clearInterval(clrinterval);
          }
          console.log("JJ");
        }, 30);
      },
    });
    tl.to("#loader", {
      delay: 4,
      opacity: 0,
      duration: 0.2,
    });
    tl.from(".page1", {
      delay: 0.2,
      y: 1600,
      opacity: 0,
      duration: 1,
      ease: Power4,
    });
    tl.to("#loader", {
      display: "none",
    });
    tl.from(".nav", {
      opacity: 0,
      y: -100,
    });
    tl.from(".page1 .line", {
      opacity: 0,
      y: 100,
      stagger: 0.2,
    });
  }
  function cursor() {
    document.addEventListener("mousemove", function (dets) {
      console.log(dets);
      gsap.to("#cursor", {
        left: dets.x,
        top: dets.y,
      });
    });
  
    Shery.makeMagnet(".nav i,a" /* Element to target.*/, {
      //Parameters are optional.
    });
  }
  function shery(){
    Shery.imageEffect(".image-div", {
      style: 5,
      slideStyle: (setScroll) => {
        window.addEventListener("scroll", () => {
          setScroll(window.scrollY / innerHeight); //Updating the scroll
        });
      },
    });
  }
  
  loaderanimaton();
  cursor();
  locomotiveAnimation();
  shery();
  