'use strictA';
const utils = require('loopback/lib/utils');
var path = require('path');
var senderAddress = "noreply@SimpleBlog.io";
const config =  {
  host: "localhost",
  port: "4200"
};
const emailre = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

module.exports = function(Bunny) {
  // Validations
  Bunny.validatesPresenceOf('username', 'email', 'password');
  Bunny.validatesLengthOf('password', {min: 6, max: 256, message: {min: 'Password is too short (min:6)', max: 'Password is too long (max:256)'}});
  Bunny.validatesFormatOf('email', {with: emailre, message: 'Must provide a valid email'});
  Bunny.validatesLengthOf('username', {min: 4, max:128, message: {min: 'username is too short (min:4)', max: "username too long (max: 128)"}});
  Bunny.validatesLengthOf('email', {max: 256, message: {max: "Email too long"}});
  Bunny.validatesUniquenessOf('email', {message: 'email is not unique'});
  Bunny.validatesUniquenessOf('username', {message: 'Usename is not unique'});


  Bunny.beforeRemote('create', function(context, user, next){
    if(validatePassword(context.args.data.password))
      next();
    else
      next('Password Invalid');
  });

  Bunny.afterRemote('create', function(context, user, next) {
    const href = `http://${config.host}:${config.port}/verify?uid=${user.id}`;
    var options = {
      type: 'email',
      to: user.email,
      from: senderAddress,
      template: path.resolve(__dirname, '../views/verify.ejs'),
      redirect: '/verified',
      host: config.host,
      port: config.port,
      user: user,
      verifyHref: href
    };

    user.verify(options, function(err, response) {
      if (err) {
        Bunny.deleteById(user.id);
        return next(err);
      }
      next();
    });
  });

  Bunny.observe('before save', function event(ctx, next) { //Observe any insert/update event on Model
    if (ctx.instance) {
      if(!validatePassword(ctx.instance.password) )
         next('password not valid');
      else 
        next();
    } 
    else {
      if(!validatePassword(ctx.data.password) )
         next('password not valid');
      else 
        next();
    }
  });

    Bunny.on('resetPasswordRequest', function(info) {
    var url = 'http://' + config.host + ':' + config.port + '/reset-password';
    var d = url + '?access_token='+info.accessToken.id;
    var html = 'Click <a href="' + d + '">here</a> to reset your password. Or enter: ' + d + " in you browser.";

    Bunny.app.models.Email.send({
      to: info.email,
      from: senderAddress,
      subject: 'Password reset',
      html: html
    }, function(err) {
      if (err) return console.log('> error sending password reset email');
      console.log('> sending password reset email to:', info.email);
    });
});
  Bunny.getName = function(shopId, cb) {
    Bunny.findById( shopId, function (err, instance) {
        var response = instance;
        cb(null, response.username);
    });
  }

    Bunny.remoteMethod (
        'getName',
        {
          http: {path: '/:id/getname', verb: 'get'},
          accepts: {arg: 'id', type: 'number', required: true },
          returns: {arg: 'name', type: 'string'}
        }
    );
}

validatePassword = function(password) {
  if(!password)
    return false;
  if( (password.length > 5) && (password.length < 257))
    return true;
  return false;
}
