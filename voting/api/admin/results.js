var rs = require('http/v4/rs');
var query = require('db/v4/query');
var update = require('db/v4/update');

var getProposalsSql = 'select PROPOSAL_NAME, PROPOSAL_IMAGE from PROPOSALS';

var getResultsSql = 'select PROPOSAL_NAME, count(*) as VOTES from PROPOSALS'
	+ ' join VOTES on VOTE_PROPOSAL_ID = PROPOSAL_ID'
	+ ' group by (PROPOSAL_NAME) order by VOTES';

var deleteResultsSql = 'delete from VOTES';

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
		.delete(function(ctx, request, response) {
			update.execute(deleteResultsSql);
			response.println('');
			response.setStatus(200);
		})
.execute();
