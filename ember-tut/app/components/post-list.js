import Ember from 'ember';

export default Ember.Component.extend({
	posts: [],
	actions: {
		addPost: function () {
			let text = this.get('postText');
			let author = this.get('postAuthor');
			let post = {
				text,
				author,
			};
			
			this.sendAction('action', post);
			this.get('posts').pushObject(post);
		}
	}
});
