import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Modal from 'react-bootstrap/Modal';

const RepoMarkDown = ({ content, show, setShow }) => {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Modal size="lg" show={show} onHide={handleClose} centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title>README.md</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {content.length !== 0 ? (
          <ReactMarkdown children={content} />
        ) : (
          <p>No content</p>
        )}
      </Modal.Body>
    </Modal>
  );
};
export default RepoMarkDown;
