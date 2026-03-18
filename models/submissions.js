let submissions = [];
let nextId = 1;

function getAll(status) {
  if (status) return submissions.filter(s => s.status === status);
  return submissions;
}

function getById(id) {
  return submissions.find(s => s.id === id) || null;
}

function create(data) {
  const newSubmission = {
    id: nextId++,
    name: data.name || '',
    name_th: data.name_th || '',
    project: data.project || '',
    project_th: data.project_th || '',
    location: data.location || '',
    country: data.country || '',
    position: data.position || '',
    position_th: data.position_th || '',
    network: data.network || '',
    tags: data.tags || [],
    email: data.email || '',
    note: data.note || '',
    status: 'pending',
    created_at: new Date().toISOString(),
    reviewed_at: null,
  };
  submissions.push(newSubmission);
  return newSubmission;
}

function remove(id) {
  const idx = submissions.findIndex(s => s.id === id);
  if (idx === -1) return null;
  return submissions[idx];
}

function removePending(id) {
  const idx = submissions.findIndex(s => s.id === id);
  if (idx === -1) return { error: 'not_found' };
  if (submissions[idx].status !== 'pending') return { error: 'not_pending' };
  submissions.splice(idx, 1);
  return { ok: true };
}

function setStatus(id, status) {
  const submission = submissions.find(s => s.id === id);
  if (!submission) return null;
  submission.status = status;
  submission.reviewed_at = new Date().toISOString();
  return submission;
}

module.exports = { getAll, getById, create, removePending, setStatus };
