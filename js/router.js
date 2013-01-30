var ApplicationRouter = Backbone.Router.extend(
{
	initialize: function(el)
	{
		this.el = el;

		// Views
		Home = new HomeView({ el: $('#scroller') });
	},
	routes: {
		"" 				: "index",
		"about"			: "about",
		":lesson"		: "lesson",
		":lesson/:id"	: "lesson",
	},
	index: function()
	{
		console.log('router: index');
		Home.showLessons();
	},
	about: function()
	{
		console.log('router: about');
	},
	lesson: function(lesson, id)
	{
		// Models
		if (id === undefined)
		{
			LessonModel.url = 'json/' + lesson + '.json';
			LessonModel.fetch({
				success: function()
				{
					console.log('router & data loaded lesson: ' + lesson);
					LessonView.build();
				}
			});
		}
		else
		{
			console.log('router lesson: ' + lesson + ' id: ' + id);
			PhraseView.build(id);
		}	
	}
});