var ensure   = require('ensure')
  , assert   = require('assert')
  , cfg      = require('../../cfg/tests.js')
  , nano     = require('../../nano')(cfg)
  , tests    = exports;

function db_name(i) { return "att_in" + i; }
function db(i) { return nano.use(db_name(i)); }

tests.att_new_doc = function (callback) {
  nano.db.create(db_name("a"), function () {
    db("a").attachment.insert("new", "att", "Hello World!", "text/plain", callback);
  });
};

tests.att_new_doc_ok = function (e,b) {
  nano.db.destroy(db_name("a"));
  assert.isNull(e);
  assert.ok(b.ok);
  assert.equal(b.id, "new");
};

ensure(__filename, tests, module);