import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

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
    e.preventDefault();
    if (!course || !testDate) return;
    const { error } = await supabase.from('finals').insert([
      { course, test_date: testDate, classroom }
    ]);
    if (error) return console.error(error);
    setCourse('');
    setTestDate('');
    setClassroom('');
    fetchList();
  }

  return (
    <div style={{ fontFamily: 'system-ui, Arial', padding: 24 }}>
      <h1>Study Plan — Finals</h1>
      <form onSubmit={handleAdd} style={{ marginBottom: 24 }}>
        <div>
          <label>Course: </label>
          <input value={course} onChange={(e) => setCourse(e.target.value)} />
        </div>
        <div>
          <label>Test date & time: </label>
          <input type="datetime-local" value={testDate} onChange={(e) => setTestDate(e.target.value)} />
        </div>
        <div>
          <label>Classroom: </label>
          <input value={classroom} onChange={(e) => setClassroom(e.target.value)} />
        </div>
        <button type="submit">Add Final</button>
      </form>

      <h2>Upcoming Finals</h2>
      {loading && <div>Loading…</div>}
      <ul>
        {list.map((item) => (
          <li key={item.id} style={{ marginBottom: 8 }}>
            <strong>{item.course}</strong> — {new Date(item.test_date).toLocaleString()} — {item.classroom}
          </li>
        ))}
      </ul>
    </div>
  );
}
