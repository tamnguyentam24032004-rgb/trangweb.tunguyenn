const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

let tasks = []; // Nơi lưu trữ dữ liệu công việc

// Luồng 1: Lấy danh sách công việc
app.get('/api/tasks', (req, res) => res.json(tasks));

// Luồng 2: Thêm công việc mới
app.post('/api/tasks', (req, res) => {
    const newTask = { id: Date.now(), title: req.body.title, status: 'PENDING' };
    tasks.unshift(newTask);
    res.json(newTask); // Trả về công việc vừa tạo
});

// Luồng 3: Xóa công việc
app.delete('/api/tasks/:id', (req, res) => {
    tasks = tasks.filter(t => t.id != req.params.id);
    res.json({ message: 'Đã xóa công việc' });
});

app.listen(5000, () => console.log('🚀 Máy chủ Backend đang chạy tại http://localhost:5000'));