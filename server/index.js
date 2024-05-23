const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const ObjectId = require('mongodb').ObjectId;
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://todoLister:bpWiTb0DeRiuXjuX@cluster0.76p5fxc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const port = 7000


app.use(cors({
    origin: 'http://localhost:3000', // or '*' to allow all origins
    methods: ['GET', 'POST', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type']
}));


app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.get('/api', (req, res) => {
  res.json({"users": ["userOne", "userTwo", "userThree"]})
})

app.get('/', (req, res) => {
res.send('Hello World!')
})

app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
  
    await client.connect();
  
    await client.db("todos").command({ ping: 1 });
    const todosCollection = client.db("todos").collection("todos");
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    // POST - (Create)
    app.post('/addTodo', (req, res) => {
      const todo = req.body; 
      // console.log(vegetable)
      todosCollection.insertOne(todo)
      .then(result => {
        result.acknowledged === true & res.redirect('/');
    })
  })

  app.get('/todos', async (req, res) => {
    try {
      const todos = await todosCollection.find({}).toArray();
      res.send(todos);
    } catch (error) {
      console.error('Error fetching vegetables:', error);
      res.status(500).send('Internal Server Error');
    }
  });


  // GET By Id
  app.get('/todo/:id', async (req, res) => {
    try {
      const id = isNaN(req.params.id) ? req.params.id : parseInt(req.params.id);
      const query = isNaN(id) ? { _id: new ObjectId(id) } : { _id: id };
      const todo = await todosCollection.findOne(query);
      if (!todo) {
        res.status(404).send('Todo not found');
        return;
      }

      res.json(todo);
    } catch (error) {
      console.error('Error fetching todo by ID:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  // UPDATE - (update)
  app.patch('/update/:id', (req, res) => {
    const id = new ObjectId(req.params.id);
    const { name, location, start_time, end_time } = req.body;  // Use req.body instead of req.params

    todosCollection.updateOne(
        { _id: id },
        {
            $set: {
                name,
                location,
                start_time,
                end_time
            }
        }
    )
    .then(result => {
        if (result.modifiedCount > 0) {
            res.json({ success: true });
        } else {
            res.json({ success: false, message: 'Item not found' });
        }
    });
});


 // DELETE - (delete)
 app.delete('/delete/:id', (req, res) => {
  const id = new ObjectId(req.params.id);
  
  todosCollection.deleteOne({_id: id})
      .then(result => {
          if (result.deletedCount > 0) {
              res.json({ success: true });
          } else {
              res.json({ success: false, message: 'Todo not found' });
          }
      })
      .catch(error => {
          console.error("Error deleting:", error);
          res.status(500).json({ success: false, message: 'Internal Server Error' });
      });
});


  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

