import "./App.css";
import React, { useState } from "react";
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/base.css";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const [country, setCountry] = useState("Japan");

  const initialNodes = [
    {
      id: "h1",
      data: {
        label: (
          <div style={{ textAlign: "center", lineHeight: "120px" }}>
            <h4 style={{ margin: 0 }}>WHEN</h4>
          </div>
        ),
      },
      type: "input",
      position: { x: 50, y: 150 },
      style: {
        background: "purple",
        borderRadius: "50%",
        width: 120, // smaller width
        height: 120, // smaller height
      },
      sourcePosition: "right",
    },

    {
      id: "2",
      data: {
        label: (
          <h6>
            <span style={{ fontWeight: "normal" }}>
              This Rule will be executed
            </span>
            <span style={{ fontWeight: "bold" }}> when </span>
            <span style={{ fontWeight: "normal" }}>a lead is </span>
            <span style={{ fontWeight: "bold" }}> created </span>
            <span style={{ fontWeight: "normal" }}>or is</span>
            <span style={{ fontWeight: "bold" }}> editied </span>
            <span style={{ fontWeight: "normal" }}>
              to meet the condition (if any)
            </span>
          </h6>
        ),
      },
      type: "output",
      position: { x: 550, y: 250 },
      style: {
        background: "white",
      },
      sourcePosition: "left",
    },
    {
      id: "3",
      data: {
        label: (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <h4 style={{ margin: 0 }}>CONDITION 1</h4>
          </div>
        ),
      },
      type: "default",
      style: {
        background: "yellow",
        width: 150, // increase the width
        height: 150, // increase the height
      },
      position: { x: 50, y: 400 },
    },
    {
      id: "4",
      data: {
        label: (
          <div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <h6 style={{ margin: 0, fontWeight: "bold" }}>1. Country,</h6>
              <input
                type="text"
                style={{ marginLeft: "5px" }}
                placeholder="Japan"
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
          </div>
        ),
      },
      type: "default",
      position: { x: 550, y: 450 },
    },
  ];

  const initialEdges = [
    {
      id: "e1-2",
      source: "h1",
      target: "2",
      type: "smoothstep",
    },
    {
      id: "e2-3",
      source: "2",
      target: "3",
      type: "smoothstep",
    },
    {
      id: "e1-3",
      source: "h1",
      target: "3",
      type: "smoothstep",
    },
    {
      id: "e3-4",
      source: "3",
      target: "4",
      type: "smoothstep",
    },
  ];
  const handleSubmit = async (event) => {
    event.preventDefault();

    const newPin = {
      When: "when a lead is created or is editied  to meet the condition (if any)",
      Condition: country,
    };

    try {
      const res = await axios.post(
        "https://react-flow-backend.onrender.com/api/product",
        newPin
      );
      toast(`Saved in database`);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div style={{ height: "100vh", width: "100%", position: "relative" }}>
      <ReactFlow defaultEdges={initialEdges} defaultNodes={initialNodes}>
        <h5 style={{ paddingLeft: "20px" }}>Welcome Email</h5>
        <h6 style={{ marginLeft: "20px", fontWeight: "normal" }}>@ Leads</h6>
        <h6 style={{ marginLeft: "20px", fontWeight: "normal" }}>
          Automatic email for leads from japan
        </h6>

        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>

      <div style={{ position: "absolute", bottom: "30px", left: "80px" }}>
        <button
          style={{
            marginRight: "10px",
            padding: "10px 20px",
            background: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            boxShadow: "0px 2px 4px rgba(0,0,0,0.2)",
          }}
          onClick={handleSubmit}
        >
          Save
        </button>
        <button
          style={{
            padding: "10px 20px",
            background: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            boxShadow: "0px 2px 4px rgba(0,0,0,0.2)",
          }}
        >
          Cancel
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
