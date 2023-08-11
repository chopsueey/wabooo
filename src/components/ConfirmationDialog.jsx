import React from "react";
import Modal from "react-modal";

const ConfirmationDialog = ({ isOpen, onRequestClose, onConfirm }) => {
  return (
    <Modal
      className="fixed inset-0 flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Delete Confirmation"
    >
      <div className="blubb text-cyan-300 rounded-lg p-6 w-full max-w-md text-center">
        <h2 className="text-lg font-semibold mb-4">
          Are you sure you want to delete?
        </h2>
        <button
          className="px-4 py-2 blubb border border-red-600 text-red-600 font-bold rounded hover:text-red-700  mr-2"
          onClick={onConfirm}
        >
          Yes
        </button>
        <button
          className="px-4 py-2 blubb border border-cyan-300 text-cyan-300 rounded hover:text-cyan-500"
          onClick={onRequestClose}
        >
          No
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmationDialog;
