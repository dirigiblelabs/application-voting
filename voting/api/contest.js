var rs = require('http/v4/rs');
var configurations = require('core/v4/configurations');

rs.service()
	.resource('')
		.get(function(ctx, request, response) {
			response.println(JSON.stringify({
				'name': configurations.get('VOTING_CONTEST')
			}));
		})
.execute();