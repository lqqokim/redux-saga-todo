const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const config = require('./config');
const { auth } = require('./middleware/auth');
const { User } = require('./model/User');
const { Todo } = require('./model/Todo');

// application/x-www-form-urlencoded, req.body에 담을수 있도록
app.use(bodyParser.urlencoded({ extended: true }));
// application/json
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
// 124.58.246.124/32
const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// k3yPvkqmY1kKFkjz
app.get('/', (req, res) => res.send('Hello World!!'));

app.get('/api/todos', (req, res) => {
    Todo.find().then(todos => {
        res.status(200).send({
            success: true,
            data: todos
        })
    })
});

app.post('/api/todos', (req, res) => {

    const todo = new Todo(req.body);

    todo.save().then(todo => {
        res.status(200).send({
            success: true,
            data: todo
        });
    })
});

app.put('/api/todo', (req, res) => {
    console.log('req ', req.body)
    Todo.findOneAndUpdate({ _id: req.body._id }, { $set: { completed: !req.body.completed } }, { new: true })
        .then(data => {
            console.log('aa ', data);
            return res.status(200).send({
                success: true,
                data
            })
        }
        );
})

app.post('/api/users/register', (req, res) => {

    const user = new User(req.body);

    user.save((err, user) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        })
    });
});

app.post('/api/users/login', (req, res) => {
    // 1.요청된 이메일이 db에 있는지 확인
    User.findOne({
        email: req.body.email
    }, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: '제공된 이메일에 해당되는 유저가 없습니다.'
            });
        }

        // 2. 이메일이 존재한다면 비밀번호 일치하는지 확인
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) return res.json({
                loginSuccess: false, message: '비밀번호가 틀렸습니다.'
            });

            // 비밀번호가 일치한다면 토큰을 생성한다.
            user.generateToken((err, user) => {
                if (err) return res.status(500).send(err);
                // 토큰저장 (쿠키, 로컬스토리지)
                res.cookie('x_auth', user.token).status(200).json({ loginSuccess: true, userId: user._id })
            });
        });
    })
});

app.get('/api/users/auth', auth, (req, res) => {
    // 여기까지 미들웨어를 통과했다는 것은 Authentication이 true
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    });
});

app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate({
        _id: req.user._id
    }, { token: '' }, (err, user) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        })
    })
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// mongodb+srv://tonykim:<password>@cluster0-cp3gt.mongodb.net/<dbname>?retryWrites=true&w=majority
// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://tonykim:<password>@cluster0-cp3gt.mongodb.net/<dbname>?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });