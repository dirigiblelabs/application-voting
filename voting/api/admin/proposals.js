var rs = require('http/v4/rs');
var query = require('db/v4/query');
var update = require('db/v4/update');
var sequence = require('db/v4/sequence');

var getProposalsSql = 'select * from \"PROPOSALS\"';
var createPrpopsalSql = 'insert into \"PROPOSALS\" (\"PROPOSAL_ID\", \"PROPOSAL_NAME\", \"PROPOSAL_IMAGE\") values (?, ?, ?)';
var deleteProposalSql = 'delete from \"PROPOSALS\" where \"PROPOSAL_ID\" = ?';
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
			let updated = update.execute(createPrpopsalSql, [
				{
					type: "INTEGER",
					value: id
				}, {
					type: "VARCHAR",
					value: name
				}, {
					type: "VARCHAR",
					value: image
				}
			]);
			let isSuccessful = updated !== null;
			let status = {
				'code': isSuccessful ? 200 : 400,
				'message': isSuccessful ? 'successfully added' : 'failed to add'
			};
			response.println(JSON.stringify(status));
			response.setStatus(status.code);
		})
	.resource('{id}')
		.delete(function(ctx, request, response) {
			let proposalId = ctx.pathParameters.id;
			let updated = update.execute(deleteProposalSql, [
				{
					type: "INTEGER",
					value: proposalId
				}
			]);
			let isSuccessful = updated !== null;
			let status = {
				'code': isSuccessful ? 200 : 400,
				'message': isSuccessful ? 'successfully removed' : 'failed to remove'
			};
			response.println(JSON.stringify(status));
			response.setStatus(status.code);
		})
.execute();