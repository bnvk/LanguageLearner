// Models
var LessonModel = Backbone.Model.extend({
    defaults:{
    	language: "",
    	lesson: "",
    	lesson_url: "",
    	creator: "",
    	audio_file: "",
		intro: { start: 1, end: 1 },
		phrases: {}
    },
	url: function() {
		return this.instanceUrl;
	},
	initialize: function(props) {
		this.instanceUrl = props.url;
	}
});
