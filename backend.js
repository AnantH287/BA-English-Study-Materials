const express = require('express');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));  
app.use(bodyParser.json());

const JWT_SECRET = 'your-secret-key';

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '01032004',
  database: 'literature',
});

conn.connect((err) => {
  if (err) {
    console.log("Cannot connect to MySQL.");
  } else {
    console.log('Database connected successfully');
  }
});


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  
      },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); 
  },
});
const upload = multer({ storage: storage });


app.post('/literature', upload.fields([{ name: 'tamil' }, { name: 'english' }]), (req, res) => {
  const { title, author, content } = req.body;
  const tamilVedio = req.files['tamil'] ? req.files['tamil'][0].filename : null;
  const englishVedio = req.files['english'] ? req.files['english'][0].filename : null;

  const query = `INSERT INTO questions (title, author_name, content, tamil_vedio, english_vedio)
    VALUES (?, ?, ?, ?, ?)`;
  const values = [title, author, content, tamilVedio, englishVedio];

  conn.query(query, values, (err, result) => {
    if (err) {
      console.error("Error inserting the data", err);
      res.status(500).send("Error inserting the data");
    } else {
      console.log("Data uploaded successfully");
      res.status(200).send("Data inserted successfully");
    }
  });
});

//Show all subjects for each page

app.get('/literature/:id', (req, res) => {
  const subjectId = req.params.id;
  const query = `SELECT * FROM questions WHERE subjectId = ?`;

  conn.query(query, [subjectId], (err, result) => {
    if (err) {
      console.error("Error fetching the data from the database", err);
      res.status(500).send({ message: 'Error fetching the data from the database' });
    } else {
      if (result.length > 0) {
        console.log("Successfully fetched the data");
        res.status(200).send(result);  
      } else {
        res.status(404).send({ message: 'No data found' });
      }
    }
  });
});

// ================bookmark section===================

app.post('/literature/bookmark', (req, res) => {
  console.log('Bookmark request received');
  const { userId, subjectId } = req.body;

  if (!userId || !subjectId) {
    return res.status(404).send({ message: 'Missing userId and subjectId' });
  }

  const query = 'INSERT INTO bookmarks (userId, subjectId) VALUES (?, ?)';
  const values = [userId, subjectId]; 

  conn.query(query, values, (err, result) => {
    if (err) {
      console.error("Can't insert bookmark", err);
      return res.status(500).send({ message: 'Error inserting bookmark' });
    } else {
      console.log('Bookmark inserted successfully');
      return res.status(200).send({ message: 'Successfully bookmarked' });
    }
  });
});

app.post('/literature/cancel-bookmark', (req, res) => {
  console.log('Cancel bookmark request received');
  
  const { userId, subjectId } = req.body;

  if (!userId || !subjectId) {
    return res.status(404).send({ message: 'Missing userId and subjectId' });
  }

  const sql = 'UPDATE bookmarks SET status = ? WHERE userId = ? AND subjectId = ?';
  const values = [false, userId, subjectId]; 

  conn.query(sql, values, (err, result) => {
    if (err) {
      console.error("Can't cancel the bookmark", err);
      return res.status(500).send({ message: 'Error canceling bookmark' });
    } else {
      console.log('Bookmark canceled successfully');
      return res.status(200).send({ message: 'Successfully canceled bookmark' });
    }
  });
});

// ==============mark================

app.post('/literature/marks',(req,res)=>{
  const {userId,subjectId,score,fieldname}=req.body
  
  if (!userId || !subjectId || !score || !fieldname ) {
    return res.status(404).send({ message: 'Missing userId and subjectId' });
  }
  const query=`INSERT INTO marks (userId,subjectId,${fieldname}) VALUES ( ?, ?, ?)`;
  const values=[userId,subjectId,score]

  conn.query(query,values,(err,result)=>{
    if(err){
      console.log("Can't send the mark to database",err.message);
      return res.status(405).send({message:"Error in Sending mark "})
    } 
      console.log("Mark sended sucessfully");
      return res.status(200).send({message:"Sucessfully sended mark to Database"})
  })
})


// =========resister and login page===================

const adminLogin = (email, password, callback) => {
  const query = 'SELECT * FROM admin WHERE email = ? AND password = ?';
  conn.query(query, [email, password], (err, result) => {
    if (err) return callback(err, null);
    if (result.length > 0) return callback(null, result[0]);  // Admin found
    return callback(null, null);  // No admin found
  });
};

// User login check

const userLogin = (email, password, callback) => {
  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  conn.query(query, [email, password], (err, result) => {
    if (err) return callback(err, null);
    if (result.length > 0) {
      const userId=result[0].userId;
      return callback(null, {userId});  
      
    }
    return callback(null, null);  // No user found
  });
};

const userRegister = (username, email, password, callback) => {
  
  // Check if email exists
  
  const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
  conn.query(checkEmailQuery, [email], (err, result) => {
    if (err) return callback(err, null);

    if (result.length > 0) {
      // Email already exists
      return callback(null, { message: 'Email already exists' });
    } else if(err==null)
    {
      const insertQuery = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
      conn.query(insertQuery, [username, email, password], (err, result) => {
      if (err) return callback(err, null);
        
        const userId = result.insertId;  
        return callback(null, { userId });
      });  
    }
  });
};

// Login endpoint

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  adminLogin(email, password, (err, adminResult) => {
    if (err) return res.status(500).json({ message: 'Database error' });

    if (adminResult) {
      const token = jwt.sign({ id: adminResult.adminId, role: 'admin' }, JWT_SECRET, { expiresIn: '1h' });
      return res.status(200).json({ message: 'Admin login successful', token });
    }

    userLogin(email, password, (err, userResult) => {
      if (err) return res.status(500).json({ message: 'Database error' });

      if (userResult) {
        const token = jwt.sign({ id: userResult.userId, role: 'user' }, JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ message: 'User login successful', token, userId: userResult.userId });
      }

      return res.status(401).json({ message: 'Invalid email or password' });
    });
  });
});

app.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  userRegister(username, email, password, (err, result) => {
    if (err) return res.status(500).json({ message: 'Database error' });

    if (result.userId) {
      return res.status(200).json({ message: 'Registration successful', userId: result.userId });
    }
    return res.status(200).json({ message: 'User already exists', userId: result.userId });
  });
});



// ======get userinformation with help of userId========

app.get("/literature/getuser/:id", (req, res) => {
  const userId = req.params.id; 
  const querys = "SELECT * FROM users WHERE userId = ?";

  conn.query(querys, [userId], (err, result) => {
    if (err) {
      console.error("Can't get the user information from the database");
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Successfully retrieved user information", result });
  });
});


// ==================show list of bookmarks=====================

app.get("/literature/getallbookmarks/:id",(req,res)=>{
  
  const userId=req.params.id;

const querys=`select distinct
	b.bookmarkId,
    b.userId,
    q.subjectId,
    q.title,
    q.author_name,
    q.content
     from 
       bookmarks b 
	join 
      questions q on b.subjectId = q.subjectId 
	where userId= ?  and b.status=1`;

conn.query(querys,userId,(err,result)=>{
  if (err) {
    console.error('Error fetching bookmarks', err);
    return res.status(500).send({ message: 'Error fetching bookmarks' });
  }
  if (result.length > 0) {
    return res.status(200).send({ result });
  } else {
    return res.status(404).send({ message: 'No bookmarks found for this user' });

  }
})
})

// ============= Get Marks To show Student Page===============

app.get("/literature/marks/:id",(req,res)=>{

  const userId=req.params.id;

  if(!userId){
    return res.status(404).send({message:"UserId Not Required For Get Marks"})
  }

  const querys= "SELECT MAX(prothalamion) as prothalamion , MAX(on_his_blindness) as on_his_blindness , MAX(the_lamb) as the_lamb , MAX(shakespeare_england) as shakespeare_england , MAX(age_of_caxon) as age_of_caxon , MAX(tragedy_comedy) as tragedy_comedy , MAX(the_heroic_couplet) as the_heroic_couplet , MAX(edward_two) as edward_two , MAX(all_for_love) as all_for_love , MAX(murder_in_the_cathedral) as murder_in_the_cathedral , MAX(age_of_elizabeth) as age_of_elizabeth , MAX(age_of_chaucer) as age_of_chaucer , MAX(the_victorian_age) as the_victorian_age , MAX(article) as article , MAX(adverbs) as adverbs , MAX(letter_writting) as letter_writting FROM marks WHERE userId = ? ";
  conn.query(querys,userId,(err,result)=>{
      if(err){
          console.log("Can't Get the Marks Form Database",err.message)
          return res.status(500).send({message:"Can't Get the Marks Form Database"+err.message})
      }
      if(result.length > 0){
        return res.status(200).send({result})
      } else {
          return res.status(404).send({ message: 'No marks found for this user' });
        }
  })
})

const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
