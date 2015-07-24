/* global module */

var ps = require( 'pubsub-js' ),
    bean = require( 'bean' );

module.exports = function() {


  this.handleMq = function (){
      if (this.data.mql.matches) {
        // if ((this.els.content.childNodes[1] || this.els.content.childNodes[0])=== this.els.btMenu){
        //   this.els.content.removeChild(this.els.btMenu);
        // }
        this.els.btMenu.setAttribute("aria-hidden", "true");
        this.els.btMenu.setAttribute("aria-expanded", "true");
        this.els.menu.setAttribute("aria-hidden", "false");

      }else{
        // this.els.content.insertBefore(this.els.btMenu, this.els.menu);

        this.els.btMenu.setAttribute("aria-hidden", "false");
        this.els.btMenu.setAttribute("aria-expanded", "false");
        this.els.menu.setAttribute("aria-hidden", "true");


      }
    };


  this.bind = function() {
    var introHeight = this.els.intro.offsetHeight,
    headerHeight = this.els.header.offsetHeight,
    topHeight = introHeight+headerHeight,
    scroll ;



    this.data.mql.addListener( this.handleMq.bind(this) );

    bean.on( window, 'scroll', function(){

      scroll = document.body.scrollTop || document.documentElement.scrollTop;

        if(scroll > topHeight && !this.data.menuFixed){
          this.data.menuFixed = true;
          this.els.menu.classList.add('fixed');
          this.els.btMenu.classList.add('fixed');
        }else if( scroll <= topHeight && this.data.menuFixed ){
          this.data.menuFixed = false;
          this.els.menu.classList.remove('fixed');
          this.els.btMenu.classList.remove('fixed');
        }



    }.bind(this)

    );

    bean.on( this.els.content, 'click', 'button', function(){
      // current status of the navigation
      var open = this.els.menu.getAttribute( 'aria-hidden' ) === 'false';
      // égal ça ==>
      // if( this.els.menu.getAttribute( 'aria-hidden' ) === 'false' ){
      //   open = true;
      // }
      // else{
      //   open = false
      // }

      // new status of the navigation
      this.data.navOpen = !open;

      this.els.menu.setAttribute("aria-hidden", open );
      this.els.btMenu.setAttribute("aria-expanded", !open );

    }.bind(this) );

    bean.on( this.els.doc, 'click', function(){
      if( this.data.navOpen ) {
        this.els.btMenu.click();
      }

    }.bind(this) );


      bean.on( this.els.menu, 'click','a', function(){
        if( this.data.navOpen ) {
          this.els.btMenu.click();
        }

      }.bind(this)
      );

  };

  this.dom = function() {
  // store selectors
    this.els = {
      btMenu : document.querySelector(".content > button"),
      doc : document.querySelector('.doc'),
      content : document.querySelector('.content'),
      menu : document.querySelector('[role="navigation"]'),
      header : document.querySelector('#header'),
      items : [].slice.call( document.querySelectorAll('[role="nav"] li')),
      links : [].slice.call( document.querySelectorAll('[role="nav"] li a' )),
      logo : document.querySelector('.header>div'),
      intro : document.querySelector('.intro'),
    };
    // Store Datas
    this.data = {
      mql : window.matchMedia("(min-width: 1024px)")
    };
  };

  this.init = function() {
    this.dom();
    this.bind();
    this.handleMq();
  };

  ps.subscribe( 'app.start', this.init.bind( this ));

  return {};
};

