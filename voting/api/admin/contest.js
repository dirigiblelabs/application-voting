var rs = require('http/v3/rs');
var configurations = require('core/v3/configurations');

rs.service()
	.resource('')
		.get(function(ctx, request, response) {
			response.println(JSON.stringify({
				'name': configurations.get('VOTING_CONTEST')
			}));
		})
		.post(function(ctx, request, response) {
			let contest = request.getJSON();
			configurations.set('VOTING_CONTEST', contest.name);
		})
.execute();