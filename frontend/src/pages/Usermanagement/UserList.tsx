import React, { useEffect, useState } from "react";
import { getUserlist } from "../../services/backendApiHelper"; // Adjust the path as needed
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserList = () => {
  const [users, setUsers] = useState<{ id: number; name: string; email: string }[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await getUserlist({ page: currentPage });
        setUsers(response?.data?.data || []);
        setTotalPages(response?.data?.meta?.last_page || 1); // Adjust based on your API response.
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch users.");
        toast.error("Error fetching users!");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentPage]);

  const handleEdit = (id: number) => {
    toast.info(`Edit user with ID: ${id}`);
    // Add your edit logic here
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      toast.success(`User with ID: ${id} deleted!`);
      // Add your delete logic here
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        User List
      </h4>
      <ToastContainer />

      {loading && <p>Loading users...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="flex flex-col">
          <div className="grid grid-cols-4 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">ID</h5>
            </div>
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">Name</h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">Email</h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">Actions</h5>
            </div>
          </div>

          {users.map((user) => (
            <div
              className={`grid grid-cols-6 sm:grid-cols-5 ${
                user.id === users[users.length - 1]?.id
                  ? ""
                  : "border-b border-stroke dark:border-strokedark"
              }`}
              key={user.id}
            >
              <div className="p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{user.id}</p>
              </div>
              <div className="p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{user.name}</p>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <p className="text-meta-3">{user.email}</p>
              </div>
              <div className="flex items-center space-x-3.5">
                <button
                  onClick={() => handleEdit(user.id)}
                  className="bg-blue-500 text-white px-6 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-500 text-white px-6 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {/* Pagination */}
          <div className="mt-4 flex justify-center items-center gap-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <p className="text-black dark:text-white">
              Page {currentPage} of {totalPages}
            </p>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
