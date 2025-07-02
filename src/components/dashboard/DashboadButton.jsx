import React from "react";
import { AiFillPieChart } from "react-icons/ai";
import { FaChartPie } from "react-icons/fa6";
import { useNavigate } from "react-router";

function DashboadButton() {
  const navigate = useNavigate();
  return (
    <>
      <FaChartPie
        onClick={() => {
          navigate("/dashboard");
        }}
        title="Dashboard"
        size={40}
        className="border-2 p-2 dark:border-text-primary-dark dark:text-text-primary-dark border-text-primary-light text-text-primary-light rounded-full cursor-pointer"
      />
    </>
  );
}

export default DashboadButton;
