// Models
var AppModel = Backbone.Model.extend({
	urlRoot: "json/"
});


var UserModel =  Backbone.Model.extend({
	defaults: {
		loop_total: 4
	}
});

var LessonModel = Backbone.Model.extend({
    defaults: {
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

var PlayerModel = Backbone.Model.extend({
    defaults: {
    	audio_file: "/audio/common-communication.mp3",
		intro: { start: 1, end: 1 }
    },
	initialize: function() {
	
		//return '';new Media(this.get('audio_file'), this.mediaSuccess, this.mediaError, this.mediaStatus);
	},
	mediaSuccess: function() {
		console.log('Inside mediaSuccess yay!!!!');
	},
	mediaError: function() {
		console.log('Inside mediaError yay!!!!');
	},
	mediaStatus: function() {
		console.log('Inside mediaStatus yay!!!!');
	}
});