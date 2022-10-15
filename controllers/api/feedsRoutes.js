const router = require('express').Router();
const { Feeds } = require('../../models');

// Get route returns all feeds
router.get('/', async (req, res) => {
    try {
        const feeds = await Feeds.findAll({
           order: [['id', 'ASC']],
        });

        res.status(200).json(feeds);
    } catch (err) {
        res.status(505).json(err);
    }
});


// Post route to create a feed
router.post('/', async (req, res) => {
    try {
        if (req.body.name && req.body.feed_url && req.body.source) {
            const feeds = await Feeds.create({
                name: req.body.name,
                feed_url: req.body.feed_url,
                source: req.body.source,
            });
            res.status(200).json(feeds);
        } else {
            console.log('Please check that you have both a name and url for the feed you want to add.')
            res.status(200).json(feeds);
        }
    } catch (err) {
        res.status(506).json(err);
    }
});

// Delete route single feed

router.delete('/:id', async (req, res) => {
  
           try {
            const feeds = await Feeds.destroy({
                where: {
                id: req.params.id
                }
                })
                
    
    
            res.status(200).json(feeds);
        } catch (err) {
            res.status(507).json(err);
        }
    });


  // Delete all feeds

router.delete('/', async (req, res) => {
//   where for item id, saved id and pass in some info to delete all, might need to pass in items to be able to delete all...

    try {
     const feeds = await Feeds.destroy(
         req.body,
     );


     res.status(200).json(feeds);
 } catch (err) {
     res.status(507).json(err);
 }
});  




module.exports = router;