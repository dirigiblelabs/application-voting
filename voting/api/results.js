var rs = require('http/v3/rs');
var query = require('db/v3/query');

var sql = 'select PROPOSAL_NAME, count(*) as VOTES from PROPOSALS'
	+ ' join VOTES on VOTE_PROPOSAL_ID = PROPOSAL_ID'
	+ ' group by (PROPOSAL_NAME)';

rs.service()
	.resource('')
		.get(function(ctx, request, response) {
			let resultset = query.execute(sql);
			response.println(JSON.stringify(resultset));
		})
.execute();