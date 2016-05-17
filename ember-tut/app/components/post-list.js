import Ember from 'ember';

export default Ember.Component.extend({
	posts: [],
	actions: {
		addPost: function () {
			let title = this.get('postTitle');
			let text = this.get('postText');
			let post = {
				title,
				text,
			};

			this.sendAction('action', post);
			this.get('posts').pushObject(post);
		}
	}
});
