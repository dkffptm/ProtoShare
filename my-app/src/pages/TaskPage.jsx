import React, { useState } from 'react';

function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: '', desc: '', due: '', status: '' });
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({ title: '', desc: '', due: '', status: '' });
    setEditIndex(null);
  };

  const handleSave = () => {
    const { title, desc, due, status } = form;
    if (!title || !desc || !due || !status) {
      alert('모든 필드를 입력하세요.');
      return;
    }

    const newTask = { ...form };
    if (editIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = newTask;
      setTasks(updatedTasks);
    } else {
      setTasks([...tasks, newTask]);
    }
    resetForm();
  };

  const handleEdit = (index) => {
    setForm(tasks[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    if (editIndex === index) resetForm();
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-[#1e1e1e] text-white min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6">📋 업무 관리</h1>
      <div className="flex gap-6">
        {/* Task List */}
        <div className="flex-1 bg-[#2a2a2a] rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">업무 목록</h2>
            <button onClick={resetForm} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm text-white">
              새 업무
            </button>
          </div>
          {tasks.length === 0 ? (
            <p className="text-gray-400">등록된 업무가 없습니다.</p>
          ) : (
            tasks.map((task, index) => (
              <div key={index} className="border-b border-gray-700 py-3">
                <div className="font-semibold text-lg">{task.title}</div>
                <div className="text-sm text-gray-300">{task.desc}</div>
                <div className="text-xs text-gray-400 mt-1">마감일: {task.due}</div>
                <div className="text-xs text-gray-400 mb-2">상태: {task.status}</div>
                <button onClick={() => handleEdit(index)} className="text-blue-400 text-sm mr-3 hover:underline">
                  수정
                </button>
                <button onClick={() => handleDelete(index)} className="text-red-400 text-sm hover:underline">
                  삭제
                </button>
              </div>
            ))
          )}
        </div>

        {/* Task Form */}
        <div className="w-96 bg-[#2a2a2a] rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">📝 업무 입력</h2>

          <label className="block text-sm mb-1">업무</label>
          <textarea
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full p-2 bg-[#1e1e1e] border border-gray-600 rounded mb-3"
          />

          <label className="block text-sm mb-1">설명</label>
          <textarea
            name="desc"
            value={form.desc}
            onChange={handleChange}
            className="w-full p-2 bg-[#1e1e1e] border border-gray-600 rounded mb-3"
          />

          <label className="block text-sm mb-1">마감일</label>
          <input
            type="date"
            name="due"
            value={form.due}
            onChange={handleChange}
            className="w-full p-2 bg-[#1e1e1e] border border-gray-600 rounded mb-3"
          />

          <label className="block text-sm mb-1">상태</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full p-2 bg-[#1e1e1e] border border-gray-600 rounded mb-5"
          >
            <option value="">상태 선택</option>
            <option value="예정">예정</option>
            <option value="진행 중">진행 중</option>
            <option value="완료">완료</option>
          </select>

          <div className="flex gap-2">
            <button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
              저장
            </button>
            <button onClick={resetForm} className="bg-gray-600 text-white px-4 py-2 rounded">
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskPage;
