/*
 * GET home routes page.
 */

var fs = require('fs');

var settings = require('../../settings');
var controller = require('../controller');
var user = controller.user;
var sign = controller.sign;
var post = controller.post;
var tag = controller.tag;
var comment = controller.comment;

var EventProxy = require('eventproxy');

function routes(app) {
    // index
    app.get('/', home);
    app.get('/index', home);
    app.get('/home', home);
    app.get('/about', function(req, res, next) {res.render('about', {about: true});});
    app.get('/resume', resume);

    // user about
    app.get('/signup', sign.signup);
    app.post('/signup', sign.signup);
    app.get('/login', sign.login);
    app.post('/login', sign.login);
    app.get('/logout', sign.logout);
    app.get('/info', sign.info);
    //app.get('/social/oauth/callback', sign.socialLogin);

    // post about
    app.get('/edit/:postid?', sign.loginCheck, sign.adminCheck, post.edit);
    app.post('/post/create', sign.loginCheck, sign.adminCheck, post.create);
    app.put('/post/update/:postid', sign.loginCheck, sign.adminCheck, post.update);
    app.delete('/post/delete/:postid', sign.loginCheck, sign.adminCheck, post.remove);
    app.get('/post/:postid', post.show);
    app.get('/post/content/:postid?', post.getPostContent);

    // comment about
    app.get('/comment/:postid?', comment.findAllByPostId);
    app.post('/comment/add/:postid?', comment.add);
    app.delete('/comment/delete/:commentid?', sign.loginCheck, comment.remove);

    // tag about
    app.get('/tag/:tag', tag.findPostsByTag);

    // post counts about
    app.get('/posts/:year/:month', post.counts);

    // search
    app.post('/search', post.search);
};

function home(req, res, next) {
    var proxy = EventProxy.create('posts', 'tags', 'counts', function(posts, tags, counts) {
        var sUser = user.getSessionUser(req) || {};
        res.render('index', {
            user: {admin: !!sUser.admin},
            posts: posts,
            tags: tags,
            counts: counts,
            home: true
        });
    }).fail(next);

    post.fetchByPage(0, 10, function(err, doc) {
        //console.log('fetchByPage: ', err, doc)
        if(err) return proxy.emit('error', err);
        proxy.emit('posts', doc);
    });

    tag.findAllTags(function(err, doc) {
        //console.log('findAllTags: ', err, doc)
        if(err) return proxy.emit('error', err);
        proxy.emit('tags', doc);
    });

    post.findCounts(null, function(err, doc) {
        //console.log('countMonthy: ', err, doc)
        if(err) return proxy.emit('error', err);
        proxy.emit('counts', doc);
    });
};

function resume(req, res, next) {
    var key = req.query.for || req.query.from;
    var type = req.query.type;

    if(!key || !~settings.REAUME_KEYS.indexOf(key)) return next(403);

    if(type && type == 'node') {
        if(!fs.existsSync(settings.REAUME_PATH_NODE)) return next(404);
        fs.createReadStream(settings.REAUME_PATH_NODE).pipe(res);
        return;
    }

    if(!fs.existsSync(settings.REAUME_PATH)) return next(404);

    fs.createReadStream(settings.REAUME_PATH).pipe(res);
};

module.exports = routes;
