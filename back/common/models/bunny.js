'use strictA';
var path = require('path');
var senderAddress = "AlanDeniLisboa@gmail.com";

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
    var html = 'Click <a href="' + url + '?access_token=' +
        info.accessToken.id + '">here</a> to reset your password';

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

};
