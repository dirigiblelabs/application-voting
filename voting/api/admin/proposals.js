var rs = require('http/v3/rs');
var query = require('db/v3/query');
var update = require('db/v3/update');
var sequence = require('db/v3/sequence');

var getProposalsSql = 'select * from PROPOSALS';
var addPrpopsalSql = 'insert into PROPOSALS (PROPOSAL_ID, PROPOSAL_NAME, PROPOSAL_IMAGE) values (?, ?, ?)';
var proposalsSequence = 'PROPOSALS_SEQUENCE';

rs.service()
	.resource('')
		.get(function(ctx, request, response) {
			let result = query.execute(getProposalsSql);
			response.println(JSON.stringify(result));
		})
		.post(function(ctx, request, response) {
			let proposal = request.getJSON();
			let id = sequence.nextval(proposalsSequence);
			let name = proposal.name;
			let image = proposal.image;
			let updated = update.execute(addPrpopsalSql, [id, name, image]);
			let isSuccessful = updated !== null;
			let vote = {
				'code': isSuccessful ? 200 : 400,
				'message': isSuccessful ? 'successfully added' : 'failed to add'
			};
			response.println(JSON.stringify(vote));
		})
.execute();