require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB 연결 성공'))
  .catch((err) => console.log('MongoDB 연결 실패:', err));

// Todo 스키마
const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    dueDate: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const Todo = mongoose.model('Todo', todoSchema);

// 전체 Todo 목록 조회
app.get('/api/todos', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: '목록 조회 실패' });
  }
});

// Todo 추가
app.post('/api/todos', async (req, res) => {
  try {
    const { title, dueDate } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: '제목을 입력하세요.' });
    }

    const newTodo = new Todo({
      title: title.trim(),
      dueDate: dueDate || null,
    });

    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: 'Todo 추가 실패' });
  }
});

// Todo 완료 상태 변경
app.put('/api/todos/:id', async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { completed: req.body.completed },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: '해당 Todo를 찾을 수 없습니다.' });
    }

    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: 'Todo 상태 변경 실패' });
  }
});

// Todo 삭제
app.delete('/api/todos/:id', async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

    if (!deletedTodo) {
      return res.status(404).json({ message: '해당 Todo를 찾을 수 없습니다.' });
    }

    res.json({ message: '삭제 완료' });
  } catch (error) {
    res.status(500).json({ message: 'Todo 삭제 실패' });
  }
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`로컬 서버 실행: http://localhost:${PORT}`);
  });
}

module.exports = app;