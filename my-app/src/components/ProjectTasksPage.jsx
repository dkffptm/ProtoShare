import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const BASE = '/api/project'

export default function ProjectTasksPage() {
  const { projectId: projectIdParam } = useParams()
  const projectId = projectIdParam || ''
  const navigate = useNavigate()

  const [projects, setProjects] = useState([])
  const [tab, setTab] = useState('Tasks')
  const [tasks, setTasks] = useState([])
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [isEditingTask, setIsEditingTask] = useState(false)
  const [taskForm, setTaskForm] = useState({
    id: null, code: '', title: '', description: '',
    status: 'TODO', priority: 'MEDIUM', dueDate: '', assigneeId: ''
  })
  const [selectedTask, setSelectedTask] = useState(null)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [editingCommentId, setEditingCommentId] = useState(null)
  const [commentEditText, setCommentEditText] = useState('')
  const [logs, setLogs] = useState([])

  const authHeader = { Authorization: 'Bearer ' + localStorage.getItem('token') }

  useEffect(() => {
    fetch(`${BASE}/list`, { headers: authHeader })
      .then(r => r.json()).then(data => setProjects(data || []))
      .catch(console.error)
  }, [])

  useEffect(() => {
    if (!projectId) return
    fetch(`${BASE}/tasks?projectId=${projectId}`, { headers: authHeader })
      .then(r => r.json()).then(data => {
        setTasks(Array.isArray(data) ? data : [])
        setShowTaskForm(false)
        setIsEditingTask(false)
        setSelectedTask(null)
        setTab('Tasks')
      }).catch(console.error)
  }, [projectId])

  useEffect(() => {
    if (tab === 'Comments' && selectedTask) {
      fetch(`${BASE}/comments?taskId=${selectedTask.id}`, { headers: authHeader })
        .then(r => r.json()).then(data => setComments(data || []))
        .catch(console.error)
    }
  }, [tab, selectedTask])

  useEffect(() => {
    if (tab === 'Logs' && projectId) {
      fetch(`${BASE}/logs?projectId=${projectId}`, { headers: authHeader })
        .then(r => r.json()).then(data => setLogs(data || []))
        .catch(console.error)
    }
  }, [tab, projectId])

  const currentProject = projects.find(p => p.id === Number(projectId))
  const members = currentProject?.members || []

  const handleField = e => {
    const { name, value } = e.target
    setTaskForm(prev => ({ ...prev, [name]: value }))
  }

  const createTask = async () => {
    const res = await fetch(`${BASE}/task/create`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', ...authHeader },
      body: JSON.stringify({
        projectId: Number(projectId), ...taskForm,
        dueDate: taskForm.dueDate || undefined,
        assigneeId: taskForm.assigneeId ? Number(taskForm.assigneeId) : undefined
      })
    })
    if (!res.ok) return console.error('업무 생성 실패:', await res.json())
    const t = await res.json()
    setTasks(prev => [t, ...prev])
  }

  const updateTask = async () => {
    if (!taskForm.id) return
    const res = await fetch(`${BASE}/task/update`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json', ...authHeader },
      body: JSON.stringify({ ...taskForm, assigneeId: taskForm.assigneeId ? Number(taskForm.assigneeId) : null })
    })
    if (!res.ok) return console.error('업무 수정 실패:', await res.json())
    const updated = await res.json()
    setTasks(prev => prev.map(t => (t.id === updated.id ? updated : t)))
  }

  const deleteTask = async id => {
    const res = await fetch(`${BASE}/task/delete`, {
      method: 'DELETE', headers: { 'Content-Type': 'application/json', ...authHeader },
      body: JSON.stringify({ id })
    })
    if (!res.ok) return console.error('업무 삭제 실패:', await res.json())
    setTasks(prev => prev.filter(t => t.id !== id))
    if (selectedTask?.id === id) setSelectedTask(null)
  }

  const saveComment = async e => {
    e.preventDefault()
    if (!selectedTask || !newComment) return
    const res = await fetch(`${BASE}/comment/create`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', ...authHeader },
      body: JSON.stringify({ taskId: selectedTask.id, content: newComment })
    })
    if (!res.ok) return console.error('댓글 생성 실패:', await res.json())
    const c = await res.json()
    setComments(prev => [c, ...prev])
    setNewComment('')
  }

  const updateComment = async id => {
    const res = await fetch(`${BASE}/comment/update`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json', ...authHeader },
      body: JSON.stringify({ id, content: commentEditText })
    })
    if (!res.ok) return console.error('댓글 수정 실패:', await res.json())
    const c = await res.json()
    setComments(prev => prev.map(x => (x.id === c.id ? c : x)))
    setEditingCommentId(null)
  }

  const deleteComment = async id => {
    const res = await fetch(`${BASE}/comment/delete`, {
      method: 'DELETE', headers: { 'Content-Type': 'application/json', ...authHeader },
      body: JSON.stringify({ id })
    })
    if (!res.ok) return console.error('댓글 삭제 실패:', await res.json())
    setComments(prev => prev.filter(x => x.id !== id))
  }

  const deleteLog = async id => {
    if (!window.confirm('이 로그를 정말 삭제하시겠습니까?')) return
    const res = await fetch(`${BASE}/log/delete`, {
      method: 'DELETE', headers: { 'Content-Type': 'application/json', ...authHeader },
      body: JSON.stringify({ id })
    })
    if (!res.ok) return console.error('로그 삭제 실패:', await res.json())
    setLogs(prev => prev.filter(x => x.id !== id))
  }

  useEffect(() => {
    if (!projectIdParam) navigate('/projects')
  }, [projectIdParam, navigate])

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-white px-4 py-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">프로젝트 {currentProject?.title || ''}</h1>
        <nav className="flex gap-6 border-b border-gray-700 mb-6">
          {['Tasks', 'Comments', 'Logs'].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`pb-1 transition ${tab === t ? 'border-b-2 border-blue-400 text-blue-400' : 'text-gray-400 hover:text-white'}`}
            >{t}</button>
          ))}
        </nav>

        {tab === 'Tasks' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">업무 목록</h2>
              <button
                onClick={() => {
                  setShowTaskForm(f => !f)
                  setIsEditingTask(false)
                  setTaskForm({ id: null, code: '', title: '', description: '', status: 'TODO', priority: 'MEDIUM', dueDate: '', assigneeId: '' })
                }}
                className="bg-[#4f8cff] hover:bg-[#357de0] text-white text-sm font-semibold px-4 py-1 rounded"
              >{showTaskForm ? '취소' : '업무 추가'}</button>
            </div>

            {showTaskForm && (
              <form
                onSubmit={e => { e.preventDefault(); isEditingTask ? updateTask() : createTask(); setShowTaskForm(false) }}
                className="bg-[#2a2a2a] p-4 rounded mb-6"
              >
                <input name="code" value={taskForm.code} onChange={handleField} placeholder="코드" className="w-full p-2 rounded bg-[#2c2c2c] text-white placeholder-gray-400 mb-2" required />
                <input name="title" value={taskForm.title} onChange={handleField} placeholder="제목" className="w-full p-2 rounded bg-[#2c2c2c] text-white placeholder-gray-400 mb-2" required />
                <textarea name="description" value={taskForm.description} onChange={handleField} placeholder="설명" className="w-full p-2 rounded bg-[#2c2c2c] text-white placeholder-gray-400 mb-2" />
                <div className="flex gap-2 mb-2">
                  <select name="status" value={taskForm.status} onChange={handleField} className="bg-[#2c2c2c] text-white p-2 rounded">
                    <option value="TODO">TODO</option>
                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                    <option value="DONE">DONE</option>
                  </select>
                  <select name="priority" value={taskForm.priority} onChange={handleField} className="bg-[#2c2c2c] text-white p-2 rounded">
                    <option value="LOW">LOW</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HIGH">HIGH</option>
                  </select>
                  <input type="date" name="dueDate" value={taskForm.dueDate} onChange={handleField} className="bg-[#2c2c2c] text-white p-2 rounded" />
                </div>
                <select name="assigneeId" value={taskForm.assigneeId} onChange={handleField} className="bg-[#2c2c2c] text-white p-2 rounded w-full mb-2">
                  <option value="">-- 담당자 선택 --</option>
                  {members.map(m => (
                    <option key={m.userId} value={m.userId}>{m.user.name}</option>
                  ))}
                </select>
                <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded">{isEditingTask ? '저장' : '생성'}</button>
              </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tasks.map(t => (
                <div key={t.id} className="p-4 bg-[#2b2b2b] hover:bg-[#3a3a3a] rounded relative">
                  <div className="absolute top-2 right-2 flex gap-2 text-sm">
                    <button onClick={() => { setIsEditingTask(true); setShowTaskForm(true); setTaskForm({ ...t, dueDate: t.dueDate?.slice(0,10) || '', assigneeId: t.assigneeId?.toString() || '' }) }} className="text-blue-400">수정</button>
                    <button onClick={() => deleteTask(t.id)} className="text-red-400">삭제</button>
                  </div>
                  <div onClick={() => { setSelectedTask(t); setTab('Comments') }} className="cursor-pointer mb-1">
                    <strong>{t.title}</strong> <em className="text-sm text-blue-300">({t.code})</em>
                  </div>
                  <p className="text-gray-300 text-sm truncate">{t.description || '-'}</p>
                  <div className="flex justify-between text-xs mt-2 text-gray-400">
                    <span>{t.dueDate ? new Date(t.dueDate).toLocaleDateString() : '-'}</span>
                    <span>{t.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'Comments' && (
          <div className="pt-4">
            {!selectedTask ? (
              <p className="text-gray-400">댓글을 보려면 먼저 업무를 선택해 주세요.</p>
            ) : (
              <>
                <h3 className="mb-2 text-lg font-semibold">“{selectedTask.title}” 에 대한 댓글</h3>
                <ul className="space-y-2 mb-4">
                  {comments.map(c => (
                    <li key={c.id} className="p-3 bg-[#2c2c2c] rounded flex justify-between items-center">
                      {editingCommentId === c.id ? (
                        <>
                          <input value={commentEditText} onChange={e => setCommentEditText(e.target.value)} className="flex-1 p-2 bg-[#1e1e1e] rounded mr-2" />
                          <button onClick={() => updateComment(c.id)} className="bg-green-600 px-3 py-1 rounded mr-2">저장</button>
                          <button onClick={() => setEditingCommentId(null)} className="bg-gray-600 px-3 py-1 rounded">취소</button>
                        </>
                      ) : (
                        <>
                          <span className="flex-1 text-white">{c.content}</span>
                          <div className="space-x-2 text-xs text-gray-400">
                            <button onClick={() => { setEditingCommentId(c.id); setCommentEditText(c.content) }}>수정</button>
                            <button onClick={() => deleteComment(c.id)}>삭제</button>
                          </div>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
                <form onSubmit={saveComment} className="flex gap-2">
                  <input value={newComment} onChange={e => setNewComment(e.target.value)} placeholder="댓글 입력..." className="flex-1 p-2 bg-[#2c2c2c] rounded text-white" />
                  <button type="submit" className="bg-[#4f8cff] px-3 py-1 rounded text-white">등록</button>
                </form>
              </>
            )}
          </div>
        )}

        {tab === 'Logs' && (
          <div className="pt-4">
            <h3 className="mb-2 text-lg font-semibold">로그 내역</h3>
            {logs.length === 0 ? (
              <p className="text-gray-400">기록된 로그가 없습니다.</p>
            ) : (
              <table className="w-full text-left bg-[#2a2a2a] rounded overflow-hidden">
                <thead>
                  <tr>
                    <th className="px-2 py-1">Action</th>
                    <th className="px-2 py-1">Entity</th>
                    <th className="px-2 py-1">Date</th>
                    <th className="px-2 py-1">관리</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map(l => (
                    <tr key={l.id} className="border-t border-[#444]">
                      <td className="px-2 py-1 text-white">{l.action}</td>
                      <td className="px-2 py-1 text-white">{l.entityType}</td>
                      <td className="px-2 py-1 text-white">{new Date(l.loggedAt).toLocaleString()}</td>
                      <td className="px-2 py-1">
                        <button onClick={() => deleteLog(l.id)} className="text-red-400 text-sm hover:underline">삭제</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
