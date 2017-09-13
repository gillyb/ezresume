module.exports = (app) => {

    app.get('/logout', (req, res) => {
        req.session.destroy((err) => {
            // TODO: do something with err!
            res.redirect('/');
        });
    });

};