import React, { useState, useEffect } from 'react';
import { getAllUsers, updateUserRole, deleteUser, toggleUserStatus } from '../../services/api';

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await getAllUsers();
      setUsers(response.data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const updateRole = async (userId, newRole) => {
    try {
      await updateUserRole(userId, newRole);
      fetchUsers();
      alert(`User role updated to ${newRole}`);
    } catch (err) {
      alert('Failed to update role');
    }
  };

  const toggleStatus = async (userId, currentStatus) => {
    const action = currentStatus ? 'suspend' : 'activate';
    if (window.confirm(`Are you sure you want to ${action} this user?`)) {
      try {
        const response = await toggleUserStatus(userId);
        if (response.data.success) {
          alert(response.data.message);
          fetchUsers();
        } else {
          alert(response.data.error || 'Failed to update status');
        }
      } catch (err) {
        console.error('Error toggling status:', err);
        alert('Failed to update user status');
      }
    }
  };

  const deleteUserHandler = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      try {
        await deleteUser(userId);
        fetchUsers();
        alert('User deleted successfully');
      } catch (err) {
        alert('Failed to delete user');
      }
    }
  };

  if (loading) {
    return <div style={{ padding: '32px', textAlign: 'center' }}>Loading users...</div>;
  }

  if (error) {
    return (
      <div style={{ padding: '32px', textAlign: 'center' }}>
        <p style={{ color: 'red' }}>{error}</p>
        <button onClick={fetchUsers} style={{ padding: '8px 16px', background: '#C4622D', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Retry</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '32px', marginBottom: '8px' }}>User Management</h1>
          <p style={{ color: '#9A8F84' }}>Manage platform users, roles, and permissions</p>
        </div>
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '10px 16px', border: '1px solid #E8D5B7', borderRadius: '10px', width: '250px', outline: 'none' }}
        />
      </div>

      <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E8D5B7', overflow: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
          <thead style={{ background: '#F8F9FA', borderBottom: '1px solid #E8D5B7' }}>
            <tr>
              <th style={{ padding: '16px', textAlign: 'left' }}>User</th>
              <th style={{ padding: '16px', textAlign: 'left' }}>Role</th>
              <th style={{ padding: '16px', textAlign: 'left' }}>Status</th>
              <th style={{ padding: '16px', textAlign: 'left' }}>Joined</th>
              <th style={{ padding: '16px', textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id} style={{ borderBottom: '1px solid #F0EAE0' }}>
                <td style={{ padding: '16px' }}>
                  <div style={{ fontWeight: 500 }}>{user.name || 'Unknown'}</div>
                  <div style={{ fontSize: '12px', color: '#9A8F84' }}>{user.email}</div>
                </td>
                <td style={{ padding: '16px' }}>
                  <select
                    value={user.role || 'GUEST'}
                    onChange={(e) => updateRole(user.id, e.target.value)}
                    style={{ padding: '6px 12px', border: '1px solid #E8D5B7', borderRadius: '8px', background: 'white', cursor: 'pointer' }}
                    disabled={user.role === 'ADMIN' && user.email === 'admin@vilastay.com'}
                  >
                    <option value="GUEST">Guest</option>
                    <option value="OWNER">Owner</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                  {user.role === 'ADMIN' && user.email === 'admin@vilastay.com' && (
                    <div style={{ fontSize: '10px', color: '#9A8F84', marginTop: '4px' }}>Default admin cannot be changed</div>
                  )}
                </td>
                <td style={{ padding: '16px' }}>
                  <span style={{ 
                    padding: '4px 12px', 
                    borderRadius: '20px', 
                    fontSize: '12px', 
                    fontWeight: 500, 
                    background: user.active ? '#E8F5E9' : '#FFEBEE', 
                    color: user.active ? '#2E7D32' : '#C62828' 
                  }}>
                    {user.active ? 'Active' : 'Suspended'}
                  </span>
                </td>
                <td style={{ padding: '16px', fontSize: '14px', color: '#666' }}>
                  {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                </td>
                <td style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => toggleStatus(user.id, user.active)}
                      style={{ 
                        padding: '6px 12px', 
                        background: user.active ? '#ED6C02' : '#2E7D32', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '6px', 
                        cursor: 'pointer', 
                        fontSize: '12px' 
                      }}
                    >
                      {user.active ? 'Suspend' : 'Activate'}
                    </button>
                    <button
                      onClick={() => deleteUserHandler(user.id)}
                      style={{ 
                        padding: '6px 12px', 
                        background: '#C62828', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '6px', 
                        cursor: 'pointer', 
                        fontSize: '12px' 
                      }}
                      disabled={user.role === 'ADMIN' && user.email === 'admin@vilastay.com'}
                    >
                      Delete
                    </button>
                  </div>
                  {user.role === 'ADMIN' && user.email === 'admin@vilastay.com' && (
                    <div style={{ fontSize: '10px', color: '#9A8F84', marginTop: '4px' }}>Cannot delete main admin</div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminUsers;