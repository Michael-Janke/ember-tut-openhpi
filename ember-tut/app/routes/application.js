import Ember from 'ember';

export default Ember.Route.extend({
	model: function () {
		return $.get('http://localhost:8080/questions');
	},
	actions: {
		postPosts: function	(post) {
			$.ajax({
		    type: 'POST',
		    url: 'http://localhost:8080/questions',
		    contentType: 'application/json; charset=utf-8',
		    dataType: 'json',
		    data: JSON.stringify(post)
			});
		}
	}
});
