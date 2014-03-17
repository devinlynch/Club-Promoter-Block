console.log('Promoter blocker started!');

var tolerance = 3;

var cache = {};
function removePosts() {
	$( "._5jmm" ).each(function( index ) {
		if(isPromoterPost($(this)))
			$(this).remove();
	});
}

function isPromoterPost(e) {
	var id = e.attr('id');
	if(cache[id] !== undefined) {
		return cache[id];
	}

	var isClubPost = false;
	e.find('.userContent').each(function( index ) {

		var text = '';
		$(this).find('p,span').each(function(){
			var t = $(this).text();
			if(t)
				text += t;
		});


		isClubPost = isTextPromoterPost(text);
		if(isClubPost) {
			return false;
		}
	});

	cache[id] = isClubPost;

	return isClubPost;
}

function isTextPromoterPost(text) {
	if(!text)
		return false;

	text = text.toLowerCase();

	var matches = 0;
	for(var word in phrases) {
		var phrase = phrases[word];
		if(text.indexOf(word) !== -1) {
			matches+=phrase.points;
		}
	}
	
	var isPromoterPost = (matches >= tolerance);

	if(isPromoterPost) {
		console.log('['+text+'] - Flagged as club post');
	} else {
	}

	return isPromoterPost;
}

var phrases = {
	'beer': {
		points: 0.5
	},
	'guest list': {
		points: 5
	},
	'guestlist': {
		points: 5
	},
	'club': {
		points: 2
	},
	'bar': {
		points: 2
	},
	'$': {
		points: 0.5
	},
	'captain morgan': {
		points: 1
	},
	'jagerbomb': {
		points: 3
	},
	'no cover': {
		points: 2
	},
	'lineup': {
		points: 1
	},
	'jack daniel': {
		points: 1.5
	},
	'come on out': {
		points: 5
	},
	'friday night': {
		points: 1
	},
	'thursday night': {
		points: 1
	},
	'saturday night': {
		points: 1
	},
	'dj': {
		points: 0.5
	},
	'tickets': {
		points: 0.5
	},
	'cheap beeer': {
		points: 1.5
	},
	'cheap draft beer': {
		points: 2
	},
	'patio': {
		points: 0.5
	},
	'tequila': {
		points: 0.5
	},
	'shots': {
		points: 0.5
	},
	'beuties': {
		points: 0.5
	}
}

setInterval(removePosts,1000);