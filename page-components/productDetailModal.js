import React from "react";
import Modal from "react-modal";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    width: "60%", // Increase the width as needed
    height: "match-content", // Set height to 100% to match the main div
    maxHeight: "90vh", // Set a maximum height if needed
    padding: "0px",
    backgroundColor: "#f7f7f7",
    border: "2px",
    display: "flex",
    
    // overflowX: "hidden",
    // overflowY:"wrap",
    justifyContent: "center",
    alignItems: "center",
     boxShadow: "0 8px 8px rgba(0.3, 0.3, 0.3, 0.3)", // Add the box shadow here
  },
  // overlay: {
  //   backgroundColor: "rgba(175, 175, 175, 0.9)",
  //   zIndex: 1000,
  // },
};



export default function PrimaryModal({ isOpenProp, children }) {
  return (
    <Modal
      // className="modal fade"
      isOpen={isOpenProp}
      style={customStyles}
      ariaHideApp={false}
    >
      {children}
    </Modal>
  );
}
