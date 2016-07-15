'use strict'

const express = require('express')
const router = express.Router()
const M = require('./../server/schemas.js')

router.get('/today', function(req, res){
  let now = new Date();
  M.Game.find({when:{$gt: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1), $lt: new Date(now.getFullYear(), now.getMonth(), now.getDate()+1)}}, function(err, result){
    if(err){
      console.log(err);
    } else {
      let ret = []
      result.forEach((item) => {
        item.joined.forEach((i) => {
          M.User.find({userId: i.userId}, function(err, doc){
            if(err){
              console.log(err);
            }
            doc.forEach((j) => {
              console.log(j.firstname + " " + j.lastname);
              joiners.push(j.firstname + " " + j.lastname);
            })
          })
          console.log("called");
          console.log(joiners);
          ret.push({
            _id: item._id,
            name: item.name,
            address: item.address,
            image_url: item.image_url,
            latlong: item.latlong,
            price: item.price,
            when: item.when,
            desc: item.desc,
            joiners: joiners.join(),
            capacity: item.capacity
          })
        })
      })

      res.send(ret);
    }
  })
})

router.get('/tomorrow', function(req, res){
  let now2 = new Date();
  now2.setDate(now2.getDate()+1);
  M.Game.find({when:{$gt: new Date(now2.getFullYear(), now2.getMonth(), now2.getDate() - 1), $lt: new Date(now2.getFullYear(), now2.getMonth(), now2.getDate()+1)}}, function(err, result){
    if(err){
      console.log(err);
    } else {
      res.send(result);
    }
  })
})

router.get('/soon', function(req, res){
  let now3 = new Date();
  now3.setDate(now3.getDate()+2);
  M.Game.find({when:{$gt: new Date(now3.getFullYear(), now3.getMonth(), now3.getDate() - 1)}}, function(err, result){
    if(err){
      console.log(err);
    } else {
      res.send(result);
    }
  })
})

module.exports = router
