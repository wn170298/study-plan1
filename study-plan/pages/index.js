import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

function formatDateTime(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleString();
  } catch (e) {
    return iso;
  }
}

export default function Home() {
  const [course, setCourse] = useState('');
  const [testDate, setTestDate] = useState('');
  const [classroom, setClassroom] = useState('');
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchList();
  }, []);

  async function fetchList() {
    setLoading(true);
    const { data, error } = await supabase
      .from('finals')
      .select('*')
      .order('test_date', { ascending: true });
    if (error) console.error(error);
    else setList(data || []);
    setLoading(false);
  }

  async function handleAdd(e) {
    e && e.preventDefault();
    if (!course || !testDate) return;
    // convert local datetime-local value to ISO with timezone
    const iso = new Date(testDate).toISOString();
    const { error } = await supabase.from('finals').insert([
      { course: course.trim(), test_date: iso, classroom: classroom.trim() }
    ]);
    if (error) return console.error(error);
    setCourse('');
    setTestDate('');
    setClassroom('');
    fetchList();
  }

  async function handleDelete(id) {
    const { error } = await supabase.from('finals').delete().eq('id', id);
    if (error) return console.error(error);
    fetchList();
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Study Plan — Finals</h1>
      </div>

      <div className="card">
        <form onSubmit={handleAdd}>
          <div className="form-row">
            <input
              placeholder="Course name"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              required
            />
            <input
              type="datetime-local"
              value={testDate}
              onChange={(e) => setTestDate(e.target.value)}
              required
            />
            <input
              placeholder="Classroom (e.g. Room 101)"
              value={classroom}
              onChange={(e) => setClassroom(e.target.value)}
            />
            <button className="primary" type="submit">Add</button>
          </div>
        </form>
      </div>

      <div style={{ height: 18 }} />

      <div className="card">
        <h2 style={{ marginTop: 0 }}>Upcoming Finals</h2>
        {loading && <div className="empty">Loading…</div>}
        {!loading && list.length === 0 && <div className="empty">No finals scheduled yet.</div>}
        <div className="list">
          {list.map((item) => (
            <div className="item" key={item.id}>
              <div>
                <div style={{ fontWeight: 700 }}>{item.course}</div>
                <div className="meta">{formatDateTime(item.test_date)} • {item.classroom || '—'}</div>
              </div>
              <div className="controls">
                <button className="btn-ghost" onClick={() => navigator.clipboard?.writeText(`${item.course} — ${formatDateTime(item.test_date)} — ${item.classroom || ''}`)}>Copy</button>
                <button className="btn-ghost" onClick={() => handleDelete(item.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
