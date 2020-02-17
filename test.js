var kb = new (require('./knowledgebase.js'))();

kb.addFact('E-Mails', {tbl: 'email'});
kb.addFact('Table', {tbl: 'user'});
kb.addFact('Column', {tbl: 'user', column: 'username', type: 'text'});
kb.addFact('Column', {tbl: 'user', column: 'password', type: 'password'});

kb.addMapRule('E-Mails', 'Table', function (x) { return {tbl: x.tbl}; });
kb.addMapRule('E-Mails', 'Column', function (x) { return {tbl: x.tbl, column: 'subject'}; });
kb.addMapRule('E-Mails', 'Column', function (x) { return {tbl: x.tbl, column: 'body'}; });

var predicates = kb.getPredicates();
for (let predicate of predicates) {
	for (let params of kb.walk(predicate)) {
		console.log(predicate, params);
	}
}
