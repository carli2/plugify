/*
TODO:
 - Notify changes (-> to rebuild menus etc.)
 - Rule Syntax
 - 
*/


function Knowledgebase() {
	// fixed predicates
	function PredicatePool() {
		var constantFacts = [];
		var generators = [];

		this.push = function (params) {
			constantFacts.push(params);
		}

		this.addGenerator = function (generator) {
			generators.push(generator);
		}

		this.walk = function* () {
			for (var i = 0; i < constantFacts.length; i++) {
				yield constantFacts[i];
			}
			for (var i = 0; i < generators.length; i++) {
				for (let item of generators[i]()) {
					yield item;
				}
			}
		}
	}

	var predicates = {};

	function getPredicate(predicate) {
		if (!predicates[predicate]) {
			predicates[predicate] = new PredicatePool();
		}
		return predicates[predicate];
	}

	this.getPredicates = function () {
		return Object.keys(predicates);
	}

	this.addFact = function (predicate, params) {
		getPredicate(predicate).push(params);
	}

	this.addMapRule = function (predicate1, predicate2, mapping) {
		var source = getPredicate(predicate1);
		getPredicate(predicate2).addGenerator(function* () {
			for (let item of source.walk()) {
				yield mapping(item);
			}
		});
	}

	this.addGenerator = function (predicate, generator) {
		return getPredicate(predicate).addGenerator(generator);
	}

	this.walk = function (predicate) {
		return getPredicate(predicate).walk();
	}
}

module.exports = Knowledgebase;
