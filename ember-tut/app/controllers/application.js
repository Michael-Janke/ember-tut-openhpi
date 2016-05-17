import Ember from 'ember';

export default Ember.Controller.extend({
	destinationId: "questions",
	actions: {
		switchWormhole: function() {
			if(this.get("destinationId") == "questions") {
				this.set("destinationId", "sidebar");
			}
			else {
				this.set("destinationId", "questions");
			}
		}
	}
});
