const sqlInjectionReg = /(\s*([\0\b\'\"\n\r\t\%\_\\]*\s*(((select\s*.+\s*from\s*.+)|(insert\s*.+\s*into\s*.+)|(update\s*.+\s*set\s*.+)|(delete\s*.+\s*from\s*.+)|(drop\s*.+)|(truncate\s*.+)|(alter\s*.+)|(exec\s*.+)|(\s*(all|any|not|and|between|in|like|or|some|contains|containsall|containskey)\s*.+[\=\>\<=\!\~]+.+)|(let\s+.+[\=]\s*.*)|(begin\s*.*\s*end)|(\s*[\/\*]+\s*.*\s*[\*\/]+)|(\s*(\-\-)\s*.*\s+)|(\s*(contains|containsall|containskey)\s+.*)))(\s*[\;]\s*)*)+)/i;
/**
 * This function will validate input for any SQL injection commands
 * @param {*} joi 
 * @returns 
 */
function sqlInjectionFilter (joi) {
	return {
		type: 'string',
		base: joi.string(),
		rules: {
			sqlInjectionFilter: {
				validate (value, helpers) {
					const containSQLInjection = sqlInjectionReg.test(value)
					if (!containSQLInjection) {
						return true;
					}
					return helpers.error("String shouldn't contain any SQL injection commands");
				}
			}
		}
	};
}

const JOI = require('joi');
JOI.extend(sqlInjectionFilter);