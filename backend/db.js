import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import session from 'express-session';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import multer from 'multer';
import path from 'path';
import bcrypt from 'bcrypt'


const app = express();
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["POST", "GET", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser())
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 * 24
  }
}
))

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage
})

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "signup"
})

db.connect(function(err) {
  if(err) {
      console.log("Error in Connection");
  } else {
      console.log("Connected");
  }
})

app.get('/get/:id', (req, res) => {
  const id = req.params.id;
  const sql = "Select * from klient where id = ?"
  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ Error: "Get klient error in sql" })
    return res.json({ Status: "Success", Result: result })
  })
})

app.get('/getProdukt/:id',(req,res)=>{
  const id=req.params.id;
  const sqlQuery="Select * from products where id = ?"
  db.query(sqlQuery,[id],(err,result)=>{
    if (err) return res.json({ Error: "Get product error in sql" })
    return res.json({ Status: "Success", Result: result })
  })
})

app.put('/update/:id', (req, res) => {
  const id = req.params.id;
  const { name, email, address } = req.body;
  const sql = "UPDATE klient SET name=?, email=?, address=? WHERE id=?";
  db.query(sql, [name, email, address, id], (err, result) => {
    if (err) return res.json({ Error: "Error when updating in sql" })
    return res.json({ Status: "Success", Result: result })
  })
})

app.put('/updateProduct/:id',(req,res)=>{
  const id=req.params.id;
  const {name,description,price,stock}=req.body;
  const sql="Update products set name=?,description=?,price=?,stock=? where id = ?";
  db.query(sql, [name, description, price, stock,id], (err, result) => {
    if (err) return res.json({ Error: "Error when updating in sql" })
    return res.json({ Status: "Success", Result: result })
  })
})

app.delete('/delete/:id', (req, res) => {
  const id = req.params.id;
  const sql = "Delete from klient where id=?";
  db.query(sql, [id], (err, res) => {
    if (err) return res.json({ Error: "error kur kem dasht me bo delete" })
    return res.json({ Status: "Success" })
  })
})

app.delete('/deleteProduct/:id',(req,res)=>{
  const id = req.params.id;
  const sql = "Delete from products where id = ?";
  db.query(sql,[id],(err,res)=>{
    if(err) return res.json({Error:"Error ne delete"})
    return res.json({Status:"Success"})
  })
})

app.get('/adminCount', (req, res) => {
  const sql = "Select count(id) as admin from users where role ='admin'";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Error in running query" })
    return res.json(result)
  })
})

app.get('/productCount',(req,res)=>{
  const sql="Select count(id) as product from products";
  db.query(sql,(err,result)=>{
    if (err) return res.json({ Error: "Error in running query" })
    return res.json(result)
  })
})

app.get('/userCount', (req, res) => {
  const sql = "Select count(id) as users from users where role ='user'";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Error in running query" })
    return res.json(result)
  })
})

app.get('/admins', (req, res) => {
  const sql = "SELECT id, name, email FROM users WHERE role='admin'";
  db.query(sql, (err, result) => {
    if (err) return res.json({ error: "Error in running query" });
    return res.json(result);
  });
});


app.post('/register', (req, res) => {
  const sql = "INSERT INTO users(`name`,`email`,`password`) VALUES (?)";
  const values = [
    req.body.name,
    req.body.email,
    req.body.password
  ]
  db.query(sql, [values], (err, result) => {
    if (err) return res.json({ Message: "Error in Node" })
    return res.json(result)
  })
})

app.get('/shumaEProdukteve',(req,res)=>{
  const sql="Select sum(price) as shuma from products";
  db.query(sql,(err,result)=>{
    if (err) return res.json({ Error: "Error in running query" })
    return res.json(result)
  })
})

app.post('/login', (req, res) => {
  const sql = 'SELECT * FROM users WHERE email = ? and password = ?';
  db.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) {
      console.log(err);
      return res.json({ Error: "An error occurred while logging in" });
    }
    if (result.length > 0) {
      req.session.role = result[0].role;
      //console.log(req.session.name);
      //console.log(result);
      return res.json({ Login: true,userId: result[0].id, name: req.session.name })
    } else {
      res.json({ Login: false });
    }
  });
});


app.post('/create', upload.single('image'), (req, res) => {
  const sql = "INSERT into klient(`name`,`email`,`password`,`address`,`image`) VALUES(?)";
  bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
    if (err) return res.json({ Error: "error in hashing password" })
    const values = [
      req.body.name,
      req.body.email,
      hash,
      req.body.address,
      req.file.filename
    ]
    db.query(sql, [values], (err, result) => {
      if (err) return res.json({ Error: "Inside signup query" })
      return res.json({ Status: "Success" })
    })
  })
})

app.get('/getKlientat', (req, res) => {
  const sql = "Select * from klient";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Get Klient Erorr in sql" })
    return res.json({ Status: "Success", Result: result })
  })
})



app.get('/', (req, res) => {
  if (req.session.role) {
    return res.json({ valid: true, role: req.session.role })
  } else {
    return res.json({ valid: false })
  }
})

app.get('/logout', (req, res) => {
  req.session.destroy();
  return res.json("Success");
})

app.post('/produktet/create', upload.single('image'), (req, res) => {
  const sql = "Insert into products (`name`,`description`,`price`,`image_url`,`stock`,`category_id`,`created_at`) VALUES (?)"
  const values = [
    req.body.name,
    req.body.description,
    req.body.price,
    req.file.filename,
    req.body.stock,
    req.body.category_id,
    req.body.created_at
  ]
  db.query(sql, [values], (err, result) => {
    if (err) return res.json({ Error: "Gabim gjate insertimit te produkteve ne databaze" })
    return res.json({ Status: "Success" })
  })
})

app.get('/getProduktet', (req, res) => {
  const sql = "Select * from products";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Error ne marrjen e te dhenave" })
    return res.json({ Status: "Success", Result: result })
  })
})

app.get('/getCategories', (req, res) => {
  const sql = "SELECT * FROM categories";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Gabim në marrjen e të dhënave" });
    return res.json({ Status: "Success", Result: result });
  });
});

app.get('/getOrders',(req,res)=>{
  const sql="Select * from orders";
  db.query(sql,(err,result)=>{
    if(err) return res.json({Error:"Gabim gjate marrjes se orderave"})
    return res.json({Status:"Success",Result:result});
  })
})

app.get('/getCategoryView/:id',(req,res)=>{
  const id = req.params.id;
  const sql = "Select id,name,description from categories where id = ?";
  db.query(sql,[id],(err,result)=>{
    if (err) return res.json({ Error: "Error when getting data in sql" })
    return res.json({ Status: "Success", Result: result })
  })
})
app.get('/getProduktetView/:id',(req,res)=>{
  const id = req.params.id;
  const sql = "Select id,name,description,price,image_url,stock,category_id,created_at from products where id = ?";
  db.query(sql,[id],(err,result)=>{
    if (err) return res.json({ Error: "Error when getting data in sql" })
    return res.json({ Status: "Success", Result: result })
  })
})

app.get('/getCartView/:id',(req,res)=>{
  const id = req.params.id;
  const sql = "Select id,name,description,price,image_url,stock,category_id,created_at from products where id = ?";
  db.query(sql,[id],(err,result)=>{
    if (err) return res.json({ Error: "Error when getting data in sql" })
    return res.json({ Status: "Success", Result: result })
  })
})

app.post('/createOrder',(req,res)=>{
  
  const sql="INSERT into orders(`user_id`,`order_date`,`name`,`address`,`city`,`country`,`postal_code`,`status`) VALUES(?)";
  const values = [
    req.body.user_id,
    req.body.order_date,
    req.body.name,
    req.body.address,
    req.body.city,
    req.body.country,
    req.body.postal_code,
    req.body.status
  ]

  db.query(sql,[values],(err,results)=>{
    if(err){
      console.log(err);
      res.json({status:'Error'})
    }else{
      res.json({ status: 'Success' });
    }
  })
})

app.delete('/deleteCategory/:id', (req, res) => {
  const categoryId = req.params.id;
  const sql = "DELETE FROM categories WHERE id = ?";
  db.query(sql, [categoryId], (err, result) => {
    if (err) return res.json({ Error: "Gabim në fshirjen e kategorisë" });
    if (result.affectedRows === 0) {
      return res.json({ Status: "Error", Message: "Kategoria nuk u gjet" });
    }
    return res.json({ Status: "Success", Message: "Kategoria u fshi me sukses" });
  });
});





app.post('/createCategory', (req, res) => {
  const { name, description } = req.body;
  const sql = "INSERT INTO categories (name, description) VALUES (?, ?)";
  const values = [name, description];
  
  db.query(sql, values, (err, result) => {
    if (err) {
      return res.json({ Status: "Error", Message: "Gabim në krijimin e kategorisë" });
    }
    
    return res.json({ Status: "Success", Message: "Kategoria u krijua me sukses" });
  });
});


app.put('/updateKategorii/:id',(req,res)=>{
  const id=req.params.id;
  const {name,description}=req.body;
  const sql="Update categories set name=?,description=? where id = ?";
  db.query(sql, [name, description, id], (err, result) => {
    if (err) return res.json({ Error: "Error when updating in sql" })
    return res.json({ Status: "Success", Result: result })
  })
})

app.get('/gettKategorii/:id',(req,res)=>{
  const id=req.params.id;
  const sqlQuery="Select * from categories where id = ?"
  db.query(sqlQuery,[id],(err,result)=>{
    if (err) return res.json({ Error: "Get product error in sql" })
    return res.json({ Status: "Success", Result: result })
  })
})

app.get('/logoutUser', (req, res) => {
  req.session.destroy();
  return res.json("Success");
})

app.get('/logoutKompani',(req,res)=>{
  req.session.destroy();
  return res.json("Success");
})
app.get('/api/profile', (req, res) => {
  const sql = 'SELECT * FROM users WHERE id = ?';
  const userId = req.query.userId;
  db.query(sql, [userId], (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.json(results[0]);
    }
  });
});

app.get('/produktetUser', (req, res) => {
  const query = 'SELECT * FROM products'; // Kërkesa SQL për të zgjedhur të gjitha produktet

  db.query(query, (error, results) => {
    if (error) {
      console.error('Gabim gjatë marrjess së produkteve: ', error);
      res.status(500).json({ error: 'Gabim gjatë marrjes së produkteve' });
    } else {
      res.status(200).json(results);
    }
  });
});


app.get('/user/kategorite',(req,res)=>{
  const sql='Select * from categories';
  db.query(sql,(err,results)=>{
    if (err) {
      console.error('Gabim gjate marrjess se kategorive: ', err);
      res.status(500).json({ error: 'Gabim gjate marrjes se kategorive' });
    } else {
      res.status(200).json(results);
    }
  })
})

app.post('/createReview', (req, res) => {
  const { product_id, name, rating, comment, created_at } = req.body;

  // Kryeni validimin e të dhënave
  if (!product_id || !name || !rating || !comment || !created_at) {
    return res.status(400).json({ error: 'Të dhënat janë të pasakta' });
  }

  // Kryeni ndonjë validim shtesë sipas nevojës

  // Kryeni INSERT në tabelën "reviews" në MySQL
  const query = 'INSERT INTO reviews (product_id, name, rating, comment, created_at) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [product_id, name, rating, comment, created_at], (error, results) => {
    if (error) {
      console.error('Gabim gjatë shtimit të review: ' + error.stack);
      res.status(500).json({ error: 'Gabim gjatë shtimit të review' });
      return;
    }
    res.json({ status: 'Success' });
  });
});
app.get('/getReviews/:productId', (req, res) => {
  const productId = req.params.productId;
  const query = 'SELECT * FROM reviews WHERE product_id = ?';

  db.query(query, [productId], (error, results) => {
    if (error) {
      console.error('Gabim gjatë marrjes së reviews: ' + error.stack);
      res.status(500).json({ error: 'Gabim gjatë marrjes së reviews' });
      return;
    }
    res.json({ Status: 'Success', Result: results });
  });
});


/*app.get('/produktetUser', (req, res) => {
  const priceRange = req.query.priceRange;

  let minPrice = 0;
  let maxPrice = 0;

  switch (priceRange) {
    case '0-100':
      maxPrice = 100;
      break;
    case '100-200':
      minPrice = 100;
      maxPrice = 200;
      break;
    case '200-500':
      minPrice = 200;
      maxPrice = 500;
      break;
    case '1000+':
      minPrice = 1000;
      break;
    default:
      res.status(400).json({ error: 'Invalid price range' });
      return;
  }

  // Construct the SQL query with the price range filter
  const query = `SELECT * FROM products WHERE price >= ${minPrice} AND price <= ${maxPrice}`;
  
  db.query(query, (error, results) => {
    if (error) {
      console.error('Gabim gjate marrjes se produkteve: ' + error.stack);
      res.status(500).json({ error: 'Gabim gjate marrjes se produkteve' });
      return;
    }

    // Return the response with the filtered products
    res.json(results);
  });
});
//With the updated code, you can now make a GET request to /produktetKompani endpoint with the priceRange query parameter set to one of the following values: 0-100, 100-200, 200-500, or above1000. The code will then filter the products based on the selected price range and return the filtered results in the response.
*/








app.get('/produktetKompani', (req, res) => {
  // Merr te gjitha produktet nga tabela "products"
  const query = 'SELECT * FROM products';
  db.query(query, (error, results) => {
    if (error) {
      console.error('Gabim gjate marrjes se produkteve: ' + error.stack);
      res.status(500).json({ error: 'Gabim gjate marrjes se produkteve' });
      return;
    }

    // Kthe pergjigjen me produktet
    res.json(results);
  });
});


app.listen(8081, () => {
  console.log("Running on portt 8081");
})

