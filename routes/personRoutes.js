const { Router } = require('express')
const Person = require('../models/Person')

const router = require('express').Router()

router.post('/', async (req,res) =>{
    const {name,salary,approved} = req.body
    
    
    if(!name){
        res.status(422).json({error: 'Name is required!'})
        return
    }
    
    const person = {
        name,
        salary,
        approved
    }
    
    try{
     await Person.create(person)
     res.status(200).json({message:'Person was inserted whit succes!'})
    }catch(error){
       res.status(500).json({error: error})
    }
    
    })

    router.get('/',async(req,res) =>{

        try{
            const people = await Person.find()          
            res.status(200).json(people)

        }catch(error){
           res.status(500).json({ error: error})
        }
    })

    router.get('/:id',async(req,res) =>{

        const id = req.params.id

        try{
            const person = await Person.findOne({_id: id})  
            if(!person){
                res.status(422).json({message:'Person not found!'})  
                return
            }

            res.status(200).json(person)

        }catch(error){
           res.status(500).json({ error: error})
        }
    })

    router.patch('/:id', async (req,res) =>{
        const id = req.params.id

        const {name,salary,approved} = req.body

        const person = {
            name,
            salary,
            approved
        }
        
        if(!id){
            res.status(422).json({error: 'Id is required!'})
            return
        } 
        
        try{
         
            const updatePerson = await Person.updateOne({_id: id},person)
            if(updatePerson.matchedCount === 0){
                res.status(422).json({message:'Person not found!'})  
                return
            }
            res.status(200).json(person)
        }catch(error){
            res.status(500).json({error: error})
        }
        
        })

        router.delete('/:id', async(req,res) => {
            const id = req.params.id

            const person = await Person.findOne({_id: id})  
            if(!person){
                res.status(422).json({message:'Person not found!'})  
                return
            }

            try{
                await Person.deleteOne({_id: id})
                res.status(200).json({message:'Person deleted witch succes!'}) 
            }catch{
                res.status(500).json({error: error})
            }
        })
    



    module.exports = router 