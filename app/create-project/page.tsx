import React, { ReactNode } from "react";
import Modal from "../components/Modal";
import ProjectForm from "../components/ProjectForm";

const page = () => {
  return (
    <Modal>
      <h3 className="modal-head-text">Create a New Project</h3>
      <ProjectForm />
    </Modal>
  );
};

export default page;
