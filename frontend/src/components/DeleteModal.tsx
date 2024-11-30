import React from 'react';

// Icons
import { Delete, DeleteIcon, Trash2, X } from 'lucide-react';

// Image
import Modal from './Modal';

interface props {
  show: boolean;
  onHide: () => void;
  onDelete: () => void;
}

const DeleteModal: React.FC<props> = ({ show, onHide, onDelete }) => {
  return (
    <React.Fragment>
      <Modal
        show={show}
        onHide={onHide}
        id="deleteModal"
        modal-center="true"
        className=" mt-40 fixed flex flex-col transition-all duration-300 ease-in-out left-2/4 z-drawer -translate-x-2/4 -translate-y-2/4"
        dialogClassName="w-screen md:w-[25rem] bg-white shadow rounded-md"
      >
        <Modal.Body className="max-h-[calc(theme('height.screen')_-_80px)] overflow-y-auto px-6 py-6">
          <div className="float-right">
            <button
              data-modal-close="deleteModal"
              className="transition-all duration-200 ease-linear text-slate-500 hover:text-red-500"
            >
              <X className="w-5 h-5" onClick={onHide} />
            </button>
          </div>
          <Trash2 className="block h-14 w-14 mx-auto text-red-500" />
          <div className="mt-5 text-center">
            <h5 className="mb-1">Are you sure?</h5>
            <p className="text-slate-500 dark:text-zink-200">
              Are you certain you want to delete this record?
            </p>
            <div className="flex justify-center gap-2 mt-6">
              <button
                type="reset"
                className="bg-white text-slate-500 btn hover:text-slate-500 hover:bg-slate-100 focus:text-slate-500 focus:bg-slate-100 active:text-slate-500 active:bg-slate-100  dark:hover:bg-slate-500/10 dark:focus:bg-slate-500/10 dark:active:bg-slate-500/10"
                onClick={onHide}
              >
                Cancel
              </button>
              <button
                type="submit"
                id="deleteRecord"
                data-modal-close="deleteModal"
                className=" Pointer inline-flex items-center justify-end rounded-md bg-red-500 py-4 px-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-4"
                onClick={onDelete}
              >
                Yes, Delete It!
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default DeleteModal;
