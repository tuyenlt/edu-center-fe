import AvatarUser from '@/components/shared/AvatarUser';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import api from '@/services/api';
import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import MagicInput from '@/components/shared/MagicInput';

export default function StaffManage() {
  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [filteredStaffs, setFilteredStaffs] = useState([]);
  const [addStaffOpen, setAddStaffOpen] = useState(false);

  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

  const [addError, setAddError] = useState('');
  const [adding, setAdding] = useState(false);

  const fetchStaffs = async () => {
    setLoading(true);
    api
      .get('/users/list?role=staff')
      .then((response) => {
        setStaffs(response.data);
        setFilteredStaffs(response.data);
      })
      .catch((error) => {
        console.error('Error fetching staffs:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchStaffs();
    return () => {
      setStaffs([]);
      setFilteredStaffs([]);
    };
  }, []);

  const handleSearch = () => {
    if (!keyword) {
      setFilteredStaffs(staffs);
      return;
    }
    setLoading(true);
    const filtered = staffs.filter((staff) =>
      staff.name.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilteredStaffs(filtered);
    setLoading(false);
  };

  const resetAddForm = () => {
    setNewName('');
    setNewEmail('');
    setNewPassword('');
    setNewPasswordConfirm('');
    setAddError('');
  };

  const closeAddModal = () => {
    resetAddForm();
    setAddStaffOpen(false);
  };

  const handleAddStaff = async (e) => {
    e.preventDefault();

    if (
      !newName.trim() ||
      !newEmail.trim() ||
      !newPassword ||
      !newPasswordConfirm
    ) {
      setAddError('please fill in all fields.');
      return;
    }
    if (newPassword !== newPasswordConfirm) {
      setAddError('Password does not match.');
      return;
    }

    setAddError('');
    setAdding(true);

    try {
      const payload = {
        name: newName.trim(),
        email: newEmail.trim(),
        password: newPassword,
        role: 'staff',
      };
      const response = await api.post('/users?nologin=true', payload);
      await fetchStaffs();

      closeAddModal();
    } catch (err) {
      console.error('Error adding staff:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setAddError(err.response.data.message);
      } else {
        setAddError('Something went wrong. Please try again.');
      }
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="max-w-screen-2xl m-auto p-10">
      {loading && (
        <div className="flex items-center justify-center h-50">
          <LoadingSpinner />
        </div>
      )}

      <div className="w-full flex items-center mb-4">
        <div className="flex items-center w-full gap-2">
          <MagicInput
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search staff by name..."
            className="w-full"
          />
          <Button
            onClick={handleSearch}
            className="btn btn-primary"
            variant="outline"
          >
            Search
          </Button>
          <Button
            variant="outline"
            onClick={() => setAddStaffOpen(true)}
            className="btn btn-success"
          >
            Add Staff Account
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {filteredStaffs.map((staff) => (
          <div
            key={staff._id}
            className="flex justify-between items-center border rounded-md border-gray-200 py-4 px-5 hover:bg-gray-50"
          >
            <div className="flex items-center">
              <AvatarUser user={staff} className="w-12 h-12 mr-2" />
              <div className="flex flex-col">
                <span className="font-semibold">{staff.name}</span>
                <span className="text-gray-500">{staff.email}</span>
              </div>
            </div>
            <div className="text-gray-400 text-sm">
              {staff.isOnline ? (
                <span className="text-green-500">Online</span>
              ) : (
                <span className="text-red-500">Offline</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ========== Modal: Add Staff Account ========== */}
      {addStaffOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={closeAddModal}
          />

          <div className="relative bg-white rounded-lg shadow-lg w-[90vw] max-w-md mx-auto p-6">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={closeAddModal}
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="text-xl font-semibold mb-4">
              Add New Staff Account
            </h2>

            <form onSubmit={handleAddStaff} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Name</label>
                <Input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Full name"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Email</label>
                <Input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="staff@example.com"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Password</label>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 6 characters"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">
                  Confirm Password
                </label>
                <Input
                  type="password"
                  value={newPasswordConfirm}
                  onChange={(e) => setNewPasswordConfirm(e.target.value)}
                  placeholder="Re-enter password"
                />
              </div>

              {addError && (
                <div className="text-red-500 text-sm">{addError}</div>
              )}

              <div className="flex justify-end gap-2 mt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={closeAddModal}
                  disabled={adding}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={adding}>
                  {adding ? (
                    <div className="flex items-center">
                      <LoadingSpinner className="w-4 h-4 mr-2 text-white" />
                      Adding...
                    </div>
                  ) : (
                    'Add Staff'
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
