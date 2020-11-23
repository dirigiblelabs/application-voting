var rs = require('http/v4/rs');
var query = require('db/v4/query');
var update = require('db/v4/update');
var user = require('security/v4/user');

var checkVoteSql = 'select * from \"VOTES\" where \"VOTE_USER_ID\" = ?';

var voteSql = 'insert into \"VOTES\" values (?, ?)';

rs.service()
	.resource('')
		.get(function(ctx, request, response) {
			let result = query.execute(checkVoteSql, [user.getName()]);
			let isVoted = result.length !== 0;
			let vote = {
				'status': !isVoted ? 200 : 400,
				'message': !isVoted ? 'not voted': 'already voted'
			};
			response.setStatus(vote.status);
			response.println(JSON.stringify(vote));
		})
		.post(function(ctx, request, response) {
			let proposalId = request.getJSON().proposalId;
			let userId = user.getName();
			let updated = update.execute(voteSql, [proposalId, userId]);
			let isSuccessfullyVoted = updated !== null;
			let vote = {
				'status': isSuccessfullyVoted ? 200 : 400,
				'message': isSuccessfullyVoted ? 'successfully voted' : 'already voted'
			};
			response.println(JSON.stringify(vote));
			response.setStatus(vote.status);
		})
.execute();