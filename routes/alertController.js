let { alerts } = require('../models');

module.exports.set = app => {
  app.get('/delete/alert/:id', (req, res) => {
     alerts.destroy({
         where: {
             id: req.params.id
         }
     }).then(() => res.redirect(req.header('Referer') || '/'))
  })
};