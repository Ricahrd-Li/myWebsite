const fade_in_elements = function() {
	$('.fade_in_element').each(function() {
		if ($(this).css('opacity') != 0) {
			// console.log("element " + this.innerHTML + " returns.");
			return;
		}
		var object_bottom = $(this).offset().top;
		var object_height = $(this).outerHeight();
		var window_bottom = $(window).scrollTop() + $(window).height();

		if (window_bottom > (object_bottom + (object_height / 4))) {
			if ($(this).hasClass('hover_element')) {
				// Case 1: On hover, fade AND move container. (For contact boxes)
				if ($(this).hasClass('contact_container')) {
					$(this).animate({opacity: 1}, 600).delay(1).hover(function() {
						$(this).animate({opacity: 0.85, marginTop: '10px', marginBottom: '30px'});
					}, function() {
						$(this).animate({opacity: 1, marginTop: '20px', marginBottom: '20px'});
					});
				} 
				// Case 2: On hover, fade container. (For resume boxes)
				else {
					$(this).animate({opacity: 1}, 600).delay(1).hover(function() {
						$(this).animate({opacity: 0.85});
					}, function () {
						$(this).animate({opacity: 1});
					});
				}
			} 
			// Case 3: No hover effects, just fade the element onto the screen.
			else {
				$(this).animate({opacity: 1}, 600);
			}
			
		}
	});
}

const scroll_to_anchor = function(event) {
	var anchor_id = event.data.param1
	console.log("scroll_to_anchor(): anchor_id %s", anchor_id);
	var anchor = $('#anchor_' + anchor_id);
	var header_offset = (9 * $('header').outerHeight()) / 10;
	$('html, body').animate({
		scrollTop: Math.max(anchor.offset().top - header_offset, 0)
	}, 1000);
}

jQuery.fn.rotate = function(degrees) {
    $(this).css({'-webkit-transform' : 'rotate('+ degrees +'deg)', 
        '-moz-transform' : 'rotate('+ degrees +'deg)',
        '-ms-transform' : 'rotate('+ degrees +'deg)', 
        'transform' : 'rotate('+ degrees +'deg)',
        'transform-origin' : 'center',
        '-webkit-transition' : '.3s ease-out',
        '-moz-transition' : '.3s ease-out',
        '-o-transition' : '.3s ease-out'});

    return $(this);
}

$(document).ready(function() {

	// Fade in elements (and add hover effects) at startup.
	fade_in_elements();
	// Also fade in elements every time the user scrolls.
	$(window).scroll(fade_in_elements);

	$('html, body').click(function() {
		$('.header_container_hidden').slideUp();
	});

	$('#header_navigation_button').click(function(event) {
		$('.header_container_hidden').slideToggle();
		event.stopPropagation();
		console.log("toggle");
	});

	$('.resume_text_more').click(function(event) {
		if ($(this).parent().siblings('.resume_hidden').css('display') == 'none') {
			$(this).children('.resume_text_more_text').html('Show Less');
			$(this).children('.triangle').rotate(90);
		} else {
			$(this).children('.resume_text_more_text').html('Show More');
			$(this).children('.triangle').rotate(0);
		}
		$(this).parent().siblings('.resume_hidden').slideToggle();

		event.stopPropagation();
		event.preventDefault();
	})

	var navigation_hidden_links = ['.scroll_to_top', '#header_navigation_hidden_about', '#header_navigation_hidden_resumes', '#header_navigation_hidden_resume', '#header_navigation_hidden_contact']
	for (i = 0; i < navigation_hidden_links.length; i++) {
		$(navigation_hidden_links[i]).click(function(event) {
			// $('.header_container_hidden').slideToggle();
			event.stopPropagation();
		})
	}

	// Set targets for anchor links => navigation menu items will scroll to the appropriate anchor point.
	var anchors = ['top', 'about', 'resume', 'playground', 'contact'];
	for (i = 0; i < anchors.length; i++) {
		var anchor = anchors[i];
		$('.scroll_to_' + anchor).click({param1: anchor}, scroll_to_anchor);
	}
});

