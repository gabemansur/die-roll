$(document).ready(function(){

	// Display the roll count and max # of rolls
	$("#count").html(count);
	$("#max").html(maxRolls);

	// Bind the click function to the Throw button
	$("#throw").click(function(){

		// If the subject condition requires choosing which
		// side of the dice is scored (facing up or down)
		// check to see that one is selected, and if not,
		// display a warning.
		if(cond == 'transparent' &&
			!$("input:radio[name='direction']").is(':checked')){

				$("#msg").html("Please pick a direction.<br>Choose 'U' for up and 'D' for down");
		}

		// Otherwise, clear any existing warning and
		// throw the dice
		else {
			$("#msg").html('');
			doThrow();
			sendData();
			updateCount();
		}
	})

});


function doThrow()
{

	$("#die").attr("src", "img/die_0.jpg");

	$("#die").rotate({ count:4, duration:0.2, easing:'ease-out' });

	setTimeout(function () {

	k = getRandomInt(1, 6);
	$("#die").attr("src", "img/die_" + k + ".jpg");
	$("#result").val(k);

	result = $("#die_form").serialize();
	console.log(result);

	}, 600);

}

function updateCount()
{
	count++;
	$("#count").html(count);

	if(count >= maxRolls){
		endGame();
	}
}

function endGame()
{
	 $('#throw').addClass('disabled').unbind();
	 $("#msg").html("You have completed this task.<br>Please wait for the experiment to continue.");

}


function sendData(data)
{

	$.ajax( {
		type: "POST",
		url: 'process_throw.php',
		data: data,
		success: function( response ) {
			console.log( response );
		}
	} );

}

function getRandomInt(min, max)
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


/*
jQuery-Rotate-Plugin v0.2 by anatol.at
http://jsfiddle.net/Anatol/T6kDR/
*/
$.fn.rotate=function(options) {
  var $this=$(this), prefixes, opts, wait4css=0;
  prefixes=['-Webkit-', '-Moz-', '-O-', '-ms-', ''];
  opts=$.extend({
    startDeg: false,
    endDeg: 360,
    duration: 1,
    count: 1,
    easing: 'linear',
    animate: {},
    forceJS: false
  }, options);

  function supports(prop) {
    var can=false, style=document.createElement('div').style;
    $.each(prefixes, function(i, prefix) {
      if (style[prefix.replace(/\-/g, '')+prop]==='') {
        can=true;
      }
    });
    return can;
  }

  function prefixed(prop, value) {
    var css={};
    if (!supports.transform) {
      return css;
    }
    $.each(prefixes, function(i, prefix) {
      css[prefix.toLowerCase()+prop]=value || '';
    });
    return css;
  }

  function generateFilter(deg) {
    var rot, cos, sin, matrix;
    if (supports.transform) {
      return '';
    }
    rot=deg>=0 ? Math.PI*deg/180 : Math.PI*(360+deg)/180;
    cos=Math.cos(rot);
    sin=Math.sin(rot);
    matrix='M11='+cos+',M12='+(-sin)+',M21='+sin+',M22='+cos+',SizingMethod="auto expand"';
    return 'progid:DXImageTransform.Microsoft.Matrix('+matrix+')';
  }

  supports.transform=supports('Transform');
  supports.transition=supports('Transition');

  opts.endDeg*=opts.count;
  opts.duration*=opts.count;

  if (supports.transition && !opts.forceJS) { // CSS-Transition
    if ((/Firefox/).test(navigator.userAgent)) {
      wait4css=(!options||!options.animate)&&(opts.startDeg===false||opts.startDeg>=0)?0:25;
    }
    $this.queue(function(next) {
      if (opts.startDeg!==false) {
        $this.css(prefixed('transform', 'rotate('+opts.startDeg+'deg)'));
      }
      setTimeout(function() {
        $this
          .css(prefixed('transition', 'all '+opts.duration+'s '+opts.easing))
          .css(prefixed('transform', 'rotate('+opts.endDeg+'deg)'))
          .css(opts.animate);
      }, wait4css);

      setTimeout(function() {
        $this.css(prefixed('transition'));
        if (!opts.persist) {
          $this.css(prefixed('transform'));
        }
        next();
      }, (opts.duration*1000)-wait4css);
    });

  } else { // JavaScript-Animation + filter
    if (opts.startDeg===false) {
      opts.startDeg=$this.data('rotated') || 0;
    }
    opts.animate.perc=100;

    $this.animate(opts.animate, {
      duration: opts.duration*1000,
      easing: $.easing[opts.easing] ? opts.easing : '',
      step: function(perc, fx) {
        var deg;
        if (fx.prop==='perc') {
          deg=opts.startDeg+(opts.endDeg-opts.startDeg)*perc/100;
          $this
            .css(prefixed('transform', 'rotate('+deg+'deg)'))
            .css('filter', generateFilter(deg));
        }
      },
      complete: function() {
        if (opts.persist) {
          while (opts.endDeg>=360) {
            opts.endDeg-=360;
          }
        } else {
          opts.endDeg=0;
          $this.css(prefixed('transform'));
        }
        $this.css('perc', 0).data('rotated', opts.endDeg);
      }
    });
  }

  return $this;
};
