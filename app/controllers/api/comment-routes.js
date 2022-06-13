const router = require('express').Router();
const { Comment } = require('../../models');

//Get comments
router.get('/', (req, res) => {
  Comment.findAll({
    attributes: ['id', 'comment_text', 'created_at'],
  })
    .then((dbCommentData) => res.json(dbCommentData))
    .catch((err) => res.status(500).json(err));
});

router.get('/:id', (req,res)=>{
  Comment.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(dbCommentData=>{
    if(!dbCommentData){
      res.status(404).json({ message: 'No comment found with this id'});
    }
    res.json(dbCommentData);
  })
  .catch(err=> res.status(500).json(err));
});

// Upload a new comment
router.post('/', (req, res) => {
  Comment.create({
    comment_text: req.body.comment_text,
    post_id: req.body.post_id,
    user_id: req.session.user_id,
  })
    .then((dbCommentData) => res.json(dbCommentData))
    .catch((err) => res.status(500).json(err));
});

// Edit a comment
 router.put('/:id', (req, res) => {
Comment.update(req.body,
{
  where: {
    id: req.params.id
  },
  comment_text: req.body.comment_text
})
.then(dbCommentData=>{
  if(!dbCommentData){
    res.status(404).json({ message: 'No comment with that id'});
  }
  res.json(dbCommentData)
})
.catch(err=> res.status(500).json(err));
 });

// Delete a comment
router.delete('/:id', (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbCommentData) => {
      if (!dbCommentData) {
        res.status(404).json({ message: 'No comment found with this id' });
        return;
      }
      res.json(dbCommentData);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
