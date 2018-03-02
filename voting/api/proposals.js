var rs = require('http/v3/rs');
var query = require('db/v3/query');

var getProposalsSql = 'select * from PROPOSALS';

rs.service()
	.resource('')
		.get(function(ctx, request, response) {
			let result = query.execute(getProposalsSql);
			response.println(JSON.stringify(result));
		})
.execute();