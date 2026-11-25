import React from 'react';
import Modal from './Modal';

export default function LogOutConfirmModal({ onConfirm, onCancel }) {
  return (
    <Modal title="Sign out" description="Are you sure you want to leave the instructor portal?" onClose={onCancel}>
      <div className="modal-actions">
        <button className="button button-secondary" type="button" onClick={onCancel}>Stay</button>
        <button className="button button-primary" type="button" onClick={onConfirm}>Sign out</button>
      </div>
    </Modal>
  );
}
