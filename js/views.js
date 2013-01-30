// Views
var HomeView = Backbone.View.extend(
{
	initialize: function()
	{
		this.render();
	},
	render: function(){},
	showLessons: function()
	{
		var view_data	= {};
		var template	= _.template($("#lessons").html(), view_data);
		this.$el.html(template).hide().delay(250).fadeIn();
		
		$('#footer').hide();
		
		// Refresh
		setTimeout(function() {
			myScroll.refresh();
			myScroll.scrollTo(0, 0, 0) 			
		}, 500);		
		
	},
});


var LessonView = Backbone.View.extend(
{
	initialize: function()
	{
		this.render();		
	},
	render: function() {},
	build: function()
	{
		// Build Phrase List
		var phrases_html = '';

		$.each(LessonModel.get('phrases'), function(key, phrase)
		{
			phrases_html += '<li><a href="#/' + LessonModel.get('lesson_url') + '/' + key + '" class="play-phrase">' + phrase.native + '</a></li>';
		});

		// Populate HTML
		var template = _.template($("#phrases").html(), { title: LessonModel.get('lesson'), available_phrases: phrases_html });
		$('#scroller').html(template).hide().delay(250).fadeIn();

		// Footer
		var template = '<a href="#"><span class="icon-arrow-left-alt1"></span></a> <a href="#" id="button_play_all"><span class="icon-play"></span></a>';
		$('#footer').html(template).hide().delay(250).fadeIn();
		

        // Refresh
		setTimeout(function() {
			myScroll.refresh();
			myScroll.scrollTo(0, 0, 0) 
		}, 500);
		
		
		$('#button_play_all').live('click', function(e)
		{
			e.preventDefault();
			var audio = document.createElement('audio');
			audio.setAttribute('id', 'audio-player');
			audio.setAttribute('src', 'audio/' + LessonModel.get('audio_file'));
			audio.load();
			//audio.currentTime = 1;
			audio.play();

			// Pause on Stop
			audio.addEventListener('timeupdate', function(e)
			{
				if (audio.currentTime > LessonModel.get('intro').end)
				{
					console.log('stop introduction');
					audio.pause();
				}
			}, true);
		});
				
	}
});


var PhraseView = Backbone.View.extend(
{
	initialize: function()
	{
		this.render();
	},
	render: function() {},
	build: function(id)
	{
		console.log('inside of phrase ' + id + ' at start ' +  LessonModel.get('phrases')[id].start);

		// HTML Template
		var phrase_html = {
			foreign		: LessonModel.get('phrases')[id].foreign,
			native		: LessonModel.get('phrases')[id].native,
			lesson_url	: LessonModel.get('lesson_url')
		}

		var template = _.template($("#player").html(), phrase_html);
		$('#scroller').html(template).hide().delay(250).fadeIn();


	    var template = '' +
		    '<a id="button_back" href="#/' + LessonModel.get('lesson_url') + '"><span class="icon-arrow-left-alt1"></span></a>' +
		    '<a id="button_loop" href="#"><span class="icon-equalizer"></span></a>' +
			'<a id="button_player" href="#"><span class="icon-pause"></span></a>' +
			'<a id="button_vol" href="#"><span class="icon-volume-high"></span></a>';

		$('#footer').html(template).hide().delay(250).fadeIn();


		// Refresh
		setTimeout(function() {
			myScroll.refresh();
			myScroll.scrollTo(0, 0, 0);			
		}, 500);


		// Empty Audio Object
		var loop_current	= 1;
		var loop_total		= 4;


		// Create Audio Object
		var audio = document.createElement('audio');
		audio.setAttribute('id', 'audio-player');
		audio.setAttribute('src', 'audio/' + LessonModel.get('audio_file'));
		audio.load();
		audio.play();

		// Listener
		audio.addEventListener('timeupdate', function()
		{
			if (audio.currentTime < LessonModel.get('phrases')[id].start)
			{
				audio.currentTime = LessonModel.get('phrases')[id].start;
				audio.volume=.75;
			}

			if (audio.currentTime > LessonModel.get('phrases')[id].end)
			{
				if (loop_current < loop_total)
				{
					loop_current++;
					audio.currentTime = LessonModel.get('phrases')[id].start;
					audio.play();
					console.log('update loop_current: ' + loop_current + ' and learn moa');
				}
				else
				{
					console.log('stop now at: ' + LessonModel.get('phrases')[id].end);
					audio.pause(); 
				}
			}
		}, false);



		$('#button_back').live('click', function()
		{
			audio.pause();	
		})


		$('#button_player').live('click', function(e)
		{
			e.preventDefault();
			if ($(this).html() === '<span class="icon-pause"></span>')
			{
				audio.pause();
				$(this).html('<span class="icon-play"></span>');
			}
			else if ($(this).html() === '<span class="icon-play"></span>')
			{
				audio.play();
				$(this).html('<span class="icon-pause"></span>');
			}
		});


		$('#button_vol').live('click', function(e)
		{
			e.preventDefault();
			if ($(this).html() === '<span class="icon-volume-high"></span>')
			{
				audio.volume=.25;
				$(this).html('<span class="icon-volume-medium"></span>');
			}
			else if ($(this).html() === '<span class="icon-volume-medium"></span>')
			{
				audio.volume=.75;
				$(this).html('<span class="icon-volume-high"></span>');
			}
		});

	}
});
