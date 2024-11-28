import React, { useEffect, useState } from "react";
import { getUserlist } from "../../services/backendApiHelper"; // Adjust the path as needed
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserList = () => {
  const [users, setUsers] = useState<{ name: string; email: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        // Pass any necessary data (e.g., pagination or filters) or use an empty object.
        const response = await getUserlist({});
        setUsers(response?.data || []); // Adjust based on your API response structure.
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch users.");
        toast.error("Error fetching users!");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

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
          <div className="grid grid-cols-2 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-3">
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Name
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Email
              </h5>
            </div>
          </div>

          {users.map((user, key) => (
            <div
              className={`grid grid-cols-2 sm:grid-cols-3 ${
                key === users.length - 1
                  ? ""
                  : "border-b border-stroke dark:border-strokedark"
              }`}
              key={key}
            >
              <div className="p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{user.name}</p>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <p className="text-meta-3">{user.email}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;
