import React, { useEffect, useState } from "react";
import Styles from "./Dashboard.module.css";
import axios from "axios";
import { useAuth } from "../../../Context/AuthContext";
import { TaskData } from "../../../../Interfaces/Interface";

export default function Dashboard() {
  const [tasksList, setTasksList] = useState([]);
  const { requestHeaders, baseUrl, loginUser } = useAuth();

  const [taskData, setTaskData] = useState<TaskData>({
    toDo: 0,
    inProgress: 0,
    done: 0,
  });

  const getTasksList = async () => {
    try {
      let response = await axios.get(`${baseUrl}/tasks`, {
        headers: requestHeaders,
      });
      setTasksList(response.data.data);
    } catch (error) {}
  };


  const data = {
    datasets: [
      {
        data: [taskData.toDo, taskData.inProgress, taskData.done],
        backgroundColor: ["#E7C3D7", "#E4E4BC", "#CFD1EC"],
        hoverOffset: 4,
      },
    ],
    labels: ["Pending", "Completed"],
  };


  useEffect(() => {
    getTasksList();
  }, []);
  return (
    <>
      <div
        className={`${Styles.headerContainer} container-fluid p-4 my-2 rounded-4`}
      >
        <div className="row align-items-center my-5">
          <div className="col-md-8 ">
            <div className="content text-white">
              <h1>
                Welcome
                <span className={`${Styles.textGold} ms-3`}>
                  {loginUser?.userName}
                </span>
              </h1>
              <h5 className="my-3">
                You can manage tasks
              </h5>
            </div>
          </div>
        </div>
      </div>
      {loginUser?.userGroup == "Manager" ? (
        <div>
          <div className={`${Styles.textPadding} container-fluid `}>
         <div className={`${Styles.task} row `}>
              <div className="col-md-5 rounded-2 p-3 my-2 dark-tabel">
                <b className="dark-p">Tasks</b>
                <p className="text-muted dark-p">
                  Number of Projects that have Tasks in Progress{" "}
                </p>

                <div className="row g-2 mt-4">
                  <div
                    className={`${Styles.bgProgress} col-md-3 mx-1 rounded-4 p-2`}
                  >
                    <div className="p-2">
                      <span
                        className={`${Styles.bgProgressicon} p-2 rounded-3`}
                      >
                        <i className="fa fa-chart-simple"></i>
                      </span>
                      <p className=" mt-3 text-muted"> Progress</p>
                      <p className="my-2">
                        <b>{taskData.inProgress}</b>
                      </p>
                    </div>
                  </div>
                  <div
                    className={`${Styles.bgTasks} col-md-3 mx-1 rounded-4 p-2`}
                  >
                    <div className="p-2">
                      <span
                        className={`${Styles.bgProjectTaskicon} p-2 rounded-3`}
                      >
                        <i className="fa fa-list-check"></i>
                      </span>
                      <p className=" mt-3 text-muted">Tasks Number</p>
                      <p className="my-2">
                        <b>{tasksList.length}</b>
                      </p>
                    </div>
                  </div>
                  <div
                    className={`${Styles.bgProjects} col-md-3 mx-1 rounded-4 p-2`}
                  >
                    <div className="p-2">
                      <span
                        className={`${Styles.bgProjectNoicon} p-2 rounded-3`}
                      >
                        <i className="fa fa-mobile"></i>
                      </span>
                      <p className=" mt-3 text-muted">Projects Number</p>
                      <p className="my-2">
                        <b>{projectsList.length}</b>
                      </p>
                    </div>
                  </div>
                </div>
                <div className={`${Styles.chart} mt-4 pt-1`} style={{ height: '300px', width: '300px' }}>
                  <Pie data={data} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
              </div>
              <div className="col-md-1"></div>
              <div className="col-md-5 bg-white rounded-2 p-3 my-2 dark-tabel">
                <b className="dark-p">Users</b>
                <p className="text-muted dark-p">
                  Number of Users Active and Inactive
                </p>
                <div className="row g-2 mt-4">
                  <div
                    className={`${Styles.bgProgress} col-md-3 rounded-4 p-2 mx-3`}
                  >
                    <div className="p-2">
                      <span
                        className={`${Styles.bgProgressicon} p-2 rounded-3`}
                      >
                        <i className="fa fa-chart-simple"></i>
                      </span>
                      <p className=" mt-3 text-muted"> Active</p>
                      <p className="my-2">
                        <b>{active}</b>
                      </p>
                    </div>
                  </div>
                  <div
                    className={`${Styles.bgTasks} col-md-3 rounded-4 p-2 mx-3`}
                  >
                    <div className="p-2">
                      <span
                        className={`${Styles.bgProjectTaskicon} p-2 rounded-3`}
                      >
                        <i className="fa  fa-list-check"></i>
                      </span>
                      <p className=" mt-3 text-muted">Inactive</p>
                      <p className="my-2">
                        <b>{inactive}</b>
                      </p>
                    </div>
                  </div>
                </div>
                <div className={`${Styles.chart} mt-4 pt-1`} style={{ height: '300px', width: '300px' }}>
                  <Pie data={isActive} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
