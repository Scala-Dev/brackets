

function ScalaContext(readOnly) {
  this.readOnly = readOnly;
}

ScalaContext.prototype.clear = function(callback) {
  if(this.readOnly) {
    callback("[ScalaContext] Error: write operation on read only context");
    return;
  }
  // var objectStore = this.objectStore;
  // Object.keys(objectStore).forEach(function(key){
  //   delete objectStore[key];
  // });
  // asyncCallback(callback);
  callback();
};

// Scala context doesn't care about differences between Object and Buffer
ScalaContext.prototype.getObject =
ScalaContext.prototype.getBuffer =
function(key, callback) {
  this.reader(key, callback);
};
ScalaContext.prototype.putObject =
ScalaContext.prototype.putBuffer =
function(key, value, callback) {
  if(this.readOnly) {
    callback("[ScalaContext] Error: write operation on read only context");
    return;
  }

  this.writer(key, value, callback);
};

ScalaContext.prototype.delete = function(key, callback) {
  if(this.readOnly) {
    callback("[ScalaContext] Error: write operation on read only context");
    return;
  }

  this.deleter(key, callback);
};


function Scala(name) {
  this.name = name || 'File System';
}
Scala.isSupported = function() {
  return true;
};

Scala.prototype.open = function(callback) {
  callback();
};
Scala.prototype.getReadOnlyContext = function() {
  return new ScalaContext(true);
};
Scala.prototype.getReadWriteContext = function() {
  return new ScalaContext(false);
};

module.exports = Scala;
