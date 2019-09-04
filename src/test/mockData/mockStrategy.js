import passport from 'passport-strategy';
import util from 'util';
import user from './mockProfile';

/**
   * @function Strategy
   * @param {string} name - name of the strategy
   * @param {string} callback - callback function
   * @returns {void}
*/
function Strategy(name, callback) {
  if (!name || name.length === 0) { throw new TypeError('Please supply a strategy name to work with.'); }
  passport.Strategy.call(this);
  this.name = name;
  this._user = user[name];
  this._cb = callback;
}
util.inherits(Strategy, passport.Strategy);

Strategy.prototype.authenticate = function authenticate() {
  this._cb(null, null, this._user, (err, authenticatedUser) => {
    if (this._user) this.success(authenticatedUser);
    else this.success(undefined);
  });
};
export default Strategy;
