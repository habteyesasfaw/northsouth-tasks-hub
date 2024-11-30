import { Link } from 'react-router-dom';
import { Chat } from '../../types/chat';
import UserOne from '../../images/task/task-01.jpg';
import {
  getTask,
  addTask,
  updateTask,
  deleteTask,
} from '../../services/backendApiHelper'; // Adjust the path as needed
import { useEffect, useState } from 'react';
import React from 'react';
import DeleteModal from '../../components/DeleteModal';
import { toast, ToastContainer } from 'react-toastify';
import { Trash2 } from 'lucide-react';

// Example Task Data
const data = [
  {
    id: 1,
    task_list: {
      id: 1,
      user_id: 1,
      name: 'Task List 1',
      description: 'description1',
      created_at: '2024-11-27T18:10:40.000000Z',
      updated_at: '2024-11-27T18:10:40.000000Z',
    },
    name: 'Task 1',
    description: 'Description for Task 1',
    is_completed: null,
    created_at: '2024-11-27T18:10:47.000000Z',
    updated_at: '2024-11-27T18:10:47.000000Z',
  },
];

// Transform task data to match chatData format
const transformedTasks: Chat[] = data.map((task) => ({
  avatar: UserOne, // Use default avatar or dynamic logic
  name: task.task_list.name, // Task list name
  text: task.name, // Task name
  time: new Date(task.created_at).getHours(), // Extract time
  textCount: task.is_completed ? 0 : 1, // Example logic
  color: task.is_completed ? '#10B981' : '#FFBA00', // Completed: green, Pending: yellow
}));

// Merge chatData and transformedTasks
const chatData: Chat[] = [
  ...[
    {
      avatar: UserOne,
      name: 'Jhon Doe',
      text: 'How are you?',
      time: 32,
      textCount: 3,
      color: '#FFBA00',
    },
  ],
  ...transformedTasks, // Add transformed task data here
];

const ChatCard = () => {
  const [isLoading, setIsLoading] = useState<null | boolean>(false);

  // Delete Modal
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const deleteToggle = () => setDeleteModal(!deleteModal);
  const [eventData, setEventData] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      const result = await getTask(null);
      console.log('result: ', result);
    };
    fetchData();
  }, []);

  const onClickDelete = (cell: any) => {
    setDeleteModal(true);
    if (cell.id) {
      setEventData(cell);
    }
  };
  const handleDelete = () => {
    if (eventData) {
      deleteTask(eventData.id)
        .then(() => {
          toast.success(' deleted successfully');
          setIsLoading(true);
        })
        .catch((error: any) => {
          toast.error('Failed to delete Cost Center');
          setIsLoading(false);
        });
      setDeleteModal(false);
    }
  };

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onHide={deleteToggle}
        onDelete={handleDelete}
      />
      <ToastContainer closeButton={false} limit={1} />
      <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
        <div className="mb-6 flex items-center justify-between px-7.5">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Task
          </h4>
          <Link
            to="#"
            className="inline-flex items-center justify-center rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            Add Task
          </Link>
        </div>

        <div>
          {chatData.map((chat, key) => (
            <Link
              to="/tasklist"
              className="flex items-center gap-5 py-3 px-7.5 hover:bg-gray-3 dark:hover:bg-meta-4"
              key={key}
            >
              <div className="relative h-14 w-14 rounded-full">
                <img src={chat.avatar} alt="User" />
                <span
                  className="absolute right-0 bottom-0 h-3.5 w-3.5 rounded-full border-2 border-white"
                  style={{ backgroundColor: chat.color }}
                ></span>
              </div>

              <div className="flex flex-1 items-center justify-between">
                <div>
                  <h5 className="font-medium text-black dark:text-white">
                    {chat.name}
                  </h5>
                  <p>
                    <span className="text-sm text-black dark:text-white">
                      {chat.text}
                    </span>
                    <span className="text-xs"> . {chat.time} min</span>
                  </p>
                </div>
                {/* {chat.textCount !== 0 && (
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                  <span className="text-sm font-medium text-white">
                    {chat.textCount}
                  </span>
                </div>
              )} */}
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button className="hover:text-primary">
                      <svg
                        className="fill-current"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.8" clipPath="url(#clip0_88_10224)">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M1.56524 3.23223C2.03408 2.76339 2.66997 2.5 3.33301 2.5H9.16634C9.62658 2.5 9.99967 2.8731 9.99967 3.33333C9.99967 3.79357 9.62658 4.16667 9.16634 4.16667H3.33301C3.11199 4.16667 2.90003 4.25446 2.74375 4.41074C2.58747 4.56702 2.49967 4.77899 2.49967 5V16.6667C2.49967 16.8877 2.58747 17.0996 2.74375 17.2559C2.90003 17.4122 3.11199 17.5 3.33301 17.5H14.9997C15.2207 17.5 15.4326 17.4122 15.5889 17.2559C15.7452 17.0996 15.833 16.8877 15.833 16.6667V10.8333C15.833 10.3731 16.2061 10 16.6663 10C17.1266 10 17.4997 10.3731 17.4997 10.8333V16.6667C17.4997 17.3297 17.2363 17.9656 16.7674 18.4344C16.2986 18.9033 15.6627 19.1667 14.9997 19.1667H3.33301C2.66997 19.1667 2.03408 18.9033 1.56524 18.4344C1.0964 17.9656 0.833008 17.3297 0.833008 16.6667V5C0.833008 4.33696 1.0964 3.70107 1.56524 3.23223Z"
                            fill=""
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M16.6664 2.39884C16.4185 2.39884 16.1809 2.49729 16.0056 2.67253L8.25216 10.426L7.81167 12.188L9.57365 11.7475L17.3271 3.99402C17.5023 3.81878 17.6008 3.5811 17.6008 3.33328C17.6008 3.08545 17.5023 2.84777 17.3271 2.67253C17.1519 2.49729 16.9142 2.39884 16.6664 2.39884ZM14.8271 1.49402C15.3149 1.00622 15.9765 0.732178 16.6664 0.732178C17.3562 0.732178 18.0178 1.00622 18.5056 1.49402C18.9934 1.98182 19.2675 2.64342 19.2675 3.33328C19.2675 4.02313 18.9934 4.68473 18.5056 5.17253L10.5889 13.0892C10.4821 13.196 10.3483 13.2718 10.2018 13.3084L6.86847 14.1417C6.58449 14.2127 6.28409 14.1295 6.0771 13.9225C5.87012 13.7156 5.78691 13.4151 5.85791 13.1312L6.69124 9.79783C6.72787 9.65131 6.80364 9.51749 6.91044 9.41069L14.8271 1.49402Z"
                            fill=""
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_88_10224">
                            <rect width="20" height="20" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </button>
                    <Link
                      to="#"
                      className="flex items-center justify-center w-8 h-8 transition-all duration-200 ease-linear rounded-md dark:text-zink-200 text-slate-500 hover:text-red-500 dark:hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-500/20"
                      onClick={() => {
                        onClickDelete(data);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Link>
                  </div>
                </td>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ChatCard;
