'use strict';

module.exports = function(app){
  app.dataSources.mdb.automigrate('blog', function(err){
    if(err) throw err;
    console.log('tables created');
  });
  app.dataSources.mdb.automigrate('bunny', function(err){
    if(err) throw err;
    console.log('tables created');
  });

  app.dataSources.mdb.automigrate('comment', function(err){
    if(err) throw err;
    console.log('tables created');
  });

}
