$('.slider').fullpage({
	paddingTop: 85,
	navigation: true,
	navigationPosition: 'right',
	onLeave: function(index, newIndex, direction){
		$('.slide-'+newIndex).addClass('is-active');

		if (newIndex == 5) {
			$('#fp-nav').addClass('slide-5-active');
		} else {
			$('#fp-nav').removeClass('slide-5-active');
		}
	},
	afterLoad: function(anchorLink, index){
		$('.slide-1').addClass('is-active');
	},
});

function iconHovers(){
	var $icons = $('.slide-icons > span');

	$icons.on({
		mouseenter: function(){
			var $this = $(this);

			if (!$this.hasClass('active-icon')) {
				var $activeIcon = $this.parent().find('> .active-icon'),
					activeID = $activeIcon.data('id'),
					thisID = $this.data('id');

				$activeIcon.removeClass('active-icon');
				$activeIcon.parent().find('.icon-text [data-id="'+activeID+'"]').removeClass('active-icon');

				$this.addClass('active-icon');
				$this.parent().find('.icon-text [data-id="'+thisID+'"]').addClass('active-icon');
			}
		}
	})
};

iconHovers();

function menuToggle(){
	var $button = $('.site-menu-button'),
		$menu = $('.site-menu-wrap');

	$button.on({
		click: function(){

			$(this).toggleClass('menu-active');
			$menu.toggleClass('menu-active');
		},
		mouseenter: function(){
			$menu.addClass('menu-hovered');
		},
		mouseleave: function(){
			$menu.removeClass('menu-hovered');
		}
	})
};

menuToggle();

$('.nav-shortcut').on({
	mouseenter: function(){
		$(this).addClass('sc-hovered');
	},
	mouseleave: function(){
		$(this).removeClass('sc-hovered');
	}
});

$('.panel').on({
	mouseenter: function(){
		$('.page-header').css('z-index', '0');
		$(this).addClass('hovered');
	},
	mouseleave: function(){
		$('.page-header').css('z-index', '200');
		$(this).removeClass('hovered');
	}
})

$('.site-menu-button').mouseenter(function() {
  $( ".site-menu-text" ).css( "opacity", "1" );
});
$('.site-menu-button').mouseleave(function() {
  $( ".site-menu-text" ).css( "opacity", "0" );
});


function loadBlogFeed(){
  var xml=$.ajax({url:"https://blog.viosey.com/atom.xml", async:false}),
    xmlDoc = $.parseXML(xml.responseText),
    $xml = $( xmlDoc );

  $xml.find( "entry" ).each(function(index){
      var title = $(this).find('title').text();
      var link = $(this).find('link').attr('href');
      var published = $(this).find('published').text().substr(0, 10);
      var summary = $(this).find('summary').text();
      var $summary = $.parseHTML($(this).find('summary').text());

      $(".news-title").eq(index).append(title);
      $(".news-item").eq(index).attr("href", link);
      $(".news-date").eq(index).append(published);
      $(".news-summary").eq(index).append($summary[1]);
      if (index == 5) return false;
  });
}
$(".site-menu-icon").click(function() {

})
// $(document).ready(function(){
//   console.log(1);
// });

window.onload = function(){
  loadBlogFeed();
  console.info(
      "\n %c Copyrightight © viosey 2014-2017 %c \n\n",
      "color:#455a64;background:#e0e0e0;padding:5px 0;border-top-left-radius:5px;border-bottom-left-radius:5px;",
      "color:#ffffff;background:##455a64;padding:5px 0;border-top-right-radius:5px;border-bottom-right-radius:5px;"
  );
};
