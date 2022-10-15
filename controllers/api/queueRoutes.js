const router = require('express').Router();
const { Queue } = require('../../models');

// Get route returns all queue
router.get('/', async (req, res) => {
    try {
        const queue = await Queue.findAll({
           order: [['id', 'ASC']],
        });

        res.status(200).json(queue);
    } catch (err) {
        res.status(505).json(err);
    }
});


// Post route to create a queue 
router.post('/', async (req, res) => {
    try {
        if (!req.body.item_id) {
            const queue = await Queue.create({
                item_id: req.body.item_id,
                user_id: req.session.user_id
            });
            res.status(200).json(queue);
        } else {
            const queue = await Queue.create({
                item_id: req.body.item_id,
                user_id: req.body.user_id
            });
            res.status(200).json(queue);
        }
    } catch (err) {
        res.status(506).json(err);
    }
});

// Delete route single item

router.delete('/:id', async (req, res) => {
  
           try {
            const queue = await Queue.destroy(
                req.params.id,
            );
    
    
            res.status(200).json(queue);
        } catch (err) {
            res.status(507).json(err);
        }
    });


  // Delete whole queue

router.delete('/', async (req, res) => {
  
    try {
     const queue = await Queue.destroy(
         req.body,
     );


     res.status(200).json(queue);
 } catch (err) {
     res.status(507).json(err);
 }
});  


module.exports = router;