const grpc = require('grpc');
const path = require('path');
const PROTO_PATH = path.join(__dirname, '/article.proto');
const article = grpc.load(PROTO_PATH).article;

let db = [{
  id: '1',
  content: 'This is your article1',
  title: 'article title',
  isPublic: true,
  url: 'article-title',
  cover: 'xxxxxx.jpg'
},{
  id: '2',
  content: 'This is your article2',
  title: 'article title',
  isPublic: true,
  url: 'article-title',
  cover: 'xxxxxx.jpg'
},{
  id: '3',
  content: 'This is your article3',
  title: 'article title',
  isPublic: true,
  url: 'article-title',
  cover: 'xxxxxx.jpg'
},{
  id: '4',
  content: 'This is your article4',
  title: 'article title',
  isPublic: true,
  url: 'article-title',
  cover: 'xxxxxx.jpg'
}];


class Article {
  getList (call, callback) {
    return callback(null, {
      articles: db
    })
  }
  getById (call, callback) {
    for (var i = 0; i < db.length; i++) {
      if (db[i].id === call.request.id) {
        return callback(null, db[i]);
      }
    }
    return callback('Can not find article.');
  }
  insert (call, callback) {
    let newArticle = Object.assign({}, call.request);
    newArticle.id = (db.length + 1) + '';
    db.push(newArticle);
    return callback(null, newArticle);
  }
  update (call, callback) {
    if (!call.request.id) {
      return callback('Article id can not find.');
    }
    for( var i = 0; i < db.length; i++) {
      if (db[i].id === call.request.id) {
        const newArticle = Object.assign(db[i], call.request);
        db.splice(i, 1, newArticle);
        return callback(null, newArticle);
      }
    }
    return callback('Can not find article.');
  }
  remove (call, callback) {
    if (!call.request.id) {
      return callback('Article id can not find.');
    }
    for( var i = 0; i < db.length; i++) {
      if (db[i].id === call.request.id) {
        db.splice(i, 1);
        return callback(null);
      }
    }
    return callback('Can not find article.');
  }
}

/**
 * Implements the SayHello RPC method.
 */
function getArticleList(call, callback) {
  callback(null, {
    araticle: db
  });
}
const getServer = function (service, serviceCall, lintener){
  const server = new grpc.Server();
  server.addService(service, serviceCall);
  server.bind(lintener, grpc.ServerCredentials.createInsecure());
  return server;
}

function main() {
  const articleServer = getServer(article.service, new Article, '0.0.0.0:50051');
  articleServer.start();
}

main();
