const async_handler=require("express-async-handler");
exports.deleteone= model=> async_handler(async(req, res) => {
        await model.findByIdAndDelete(req.params.id);
        res.status(204).json({ data: null })
})


exports.update =model=> async_handler(async(req, res) => {
        datas=await model.findByIdAndUpdate(req.params.id,req.body,{new:true , runValidators:true});
        res.status(200).json({  data: {datas}  })
})

exports.create = model=>async_handler(async (req, res) => {
    // try {
        const doc = await model.create(req.body)
            ; res.status(201).json({ status: "sucess", data: { tour: doc } })
})
    
exports.getones=(module,popoption)=> async_handler(async(req, res) => {
  
    queryss = module.findById(req.params.id)
    if (popoption) queryss = queryss.populate(popoption)
        DOC=await queryss
        
        res.status(200).json({ status: "sucess", data: { tour: DOC } })
})