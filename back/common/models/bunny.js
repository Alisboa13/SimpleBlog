'use strictA';
const utils = require('loopback/lib/utils');
var path = require('path');
var senderAddress = "AlanDeniLisboa@gmail.com";
const config =  {
  host: "localhost",
  port: "4200"
};

module.exports = function(Bunny) {
  Bunny.afterRemote('create', function(context, user, next) {
    var options = {
      type: 'email',
      to: user.email,
      from: senderAddress,
      template: path.resolve(__dirname, '../views/verify.ejs'),
      redirect: '/verified',
      user: user
    };

    user.verify(options, function(err, response) {
      if ( err ) {
        Bunny.deleteById(user.id);
        return next(err);
      }
      context.res.sender('response', {
        title: 'Singed up successfully',
        content: 'Please Check you email and click on the verification link before loggin in.',
        redirectTo: '/',
        redirectToLinkText: 'Log in'
      });

    });
  })
  
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
