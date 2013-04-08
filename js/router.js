var ApplicationRouter = Backbone.Router.extend(
{
	initialize: function(el)
	{
		this.el = el;

		// Views
		Home = new HomeView({ el: $('#stage') });
	},
	routes: {
		"" 				: "index",
		"about"			: "about",
		":lesson"		: "lesson",
		":lesson/:id"	: "lesson",
	},
	index: function()
	{
		NavView.showHeader('Takk Iceland <img src="images/iceland.svg" height="85">');
		NavView.hideFooter();
	
		AppModel.fetch({
	        success: function(response) {
	        	console.log('Config loaded is success');
	        	
	        	Home.showLessons();
	        },
	        error: function(response) {
	        	console.log('Config lodaded is error');
	        }
	    });
		
	},
	about: function()
	{
		console.log('router: about');

		var NewPlayerModel = new PlayerModel({ urlRoot: '/audio' });
		player = new Media(NewPlayerModel.get('audio_file'), NewPlayerModel.mediaSuccess, NewPlayerModel.mediaError, NewPlayerModel.mediaStatus);
		player.play();
	},
	lesson: function(lesson, id)
	{
		// Models
		LessonModel.url = 'json/' + lesson + '.json';
		LessonModel.fetch({
			success: function() {
			
				// Show Lesson
				if (id === undefined) {
					console.log('router & data loaded lesson: ' + lesson);

					// Update Header
					NavView.updateHeader(LessonModel.get('lesson'));

					// Lesson
					LessonView.build();
					
					// Footer
					NavView.updateFooter('lesson');
				}
				// Show Phrase
				else {
					console.log('router lesson: ' + lesson + ' id: ' + id);
					
					// Hide Header
					NavView.hideHeader();
					
					// Phrase
					PhraseView.build(id);
				
					// Footer
					NavView.updateFooter('phrase');
				}
			}
		});	
	}
});