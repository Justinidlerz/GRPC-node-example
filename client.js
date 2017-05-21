const promise = require('bluebird');
const co = require('co');
const path = require('path');
const grpc = require('grpc');
const PROTO_PATH = path.join(__dirname, '/article.proto');
const Client = grpc.load(PROTO_PATH).article;

const getClient = function (address) {
  return new Client(address, grpc.credentials.createInsecure());
};


function main() {
  const articleClient = getClient('127.0.0.1:50051');

  // insert
  articleClient.insert({
    content: 'This is your article5',
    title: 'article title',
    isPublic: true,
    url: 'article-title',
    cover: 'xxxxxx.jpg'
  }, function (err, res) {
    if (err) {
      return console.log(err);
    }
    console.log('Insert success');
    return console.log(res);
  })


  // get by id
  articleClient.getById({id: '1'}, function(err, res) {
    if (err) {
      return console.log(err);
    }
    console.log('Get by id 1:');
    console.log(res);
  });


  // update
  articleClient.update({
    id: '1',
    content: '哈哈哈哈',
    title: 'article title',
    isPublic: true,
    url: 'article-title',
    cover: 'xxxxxx.jpg'
  }, function (err, res) {
    if (err) {
      return console.log(err);
    }
    console.log('update article id 1');
    return console.log(res);
  });


  // get list
  articleClient.getList({}, function (err, res) {
    if (err) {
      return console.log(err);
    }
    console.log('article list: ')
    return console.log(res.articles);
  })


}



main();
