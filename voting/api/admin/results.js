var rs = require('http/v3/rs');
var query = require('db/v3/query');

var getProposalsSql = 'select PROPOSAL_NAME from PROPOSALS';

var getResultsSql = 'select PROPOSAL_NAME, count(*) as VOTES from PROPOSALS'
	+ ' join VOTES on VOTE_PROPOSAL_ID = PROPOSAL_ID'
	+ ' group by (PROPOSAL_NAME) order by VOTES';

rs.service()
	.resource('')
		.get(function(ctx, request, response) {
			let proposals = query.execute(getProposalsSql);
			let results = query.execute(getResultsSql);

			for (let i = 0; i < proposals.length; i ++) {
				proposals[i].VOTES = 0;
				for (let j = 0; j < results.length; j ++) {
					if (proposals[i].PROPOSAL_NAME === results[j].PROPOSAL_NAME) {
						proposals[i].VOTES = results[j].VOTES;
						break;
					}
				}
			}

			let votingResults = proposals.sort(function(a, b) {
				return b.VOTES - a.VOTES;
			});
			response.println(JSON.stringify(votingResults));
		})
.execute();