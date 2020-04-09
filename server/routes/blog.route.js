const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const blogCtrl = require('../controllers/blog.controller');
var multer = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, '' + Date.now() + '-' + file.originalname)
  }
})

var upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    // 限制文件上传类型，仅可上传png格式图片
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg' || file.mimetype == 'image/png' || file.mimetype == 'image/gif') {
      cb(null, true)
    } else {
      cb(null, false)
    }
  }
})

const router = express.Router();
module.exports = router;

router.get('/getRelativeBlogs', getRelativeBlogs);
router.get('/gettagcloud', tagCloud);
router.get('/getarticlesbytype', getArticlesByType);
router.post('/upload', passport.authenticate('jwt', { session: false }), upload.single('blogBanner'), postBanner);
router.post('/', passport.authenticate('jwt', { session: false }), insert);
router.get('/', index);
router.put('/:id', passport.authenticate('jwt', { session: false }), update);
router.get('/:id', detail);
router.delete('/:id', passport.authenticate('jwt', { session: false }), destroy);

async function insert (req, res) {
  let blog = await blogCtrl.insert(req.body);
  res.json(blog);
}

async function detail (req, res) {
  let blog = await blogCtrl.detail(req.params.id);
  res.json(blog)
}

async function index (req, res) {
  let blogs = await blogCtrl.index(req.query);
  res.json(blogs);
}

async function update (req, res) {
  let blog = await blogCtrl.update(req.body, req.params.id);
  res.json(blog)
}

async function destroy (req, res) {
  let blog = await blogCtrl.destroy(req.params.id)
  res.json(blog)
}

async function postBanner (req, res) {
  var file = req.file;
  res.json(file)
}

async function getRelativeBlogs (req, res) {
  let blogs = await blogCtrl.getRelativeBlogs(req.query.id, req.query.tag);
  res.json(blogs)
}

async function tagCloud (req, res) {
  let tagCloud = await blogCtrl.tagCloud();
  res.json(tagCloud)
}

async function getArticlesByType(req, res) {
  let articles = await blogCtrl.getArticlesByType();
  res.json(articles)
}