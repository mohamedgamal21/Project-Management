import { useState, useRef } from "react";

import SideBar from "./components/SideBar.jsx";
import AddingProjects from "./components/AddingProjects.jsx";
import NoProjectSelected from "./components/noProjectSelected.jsx";
import SelectedProject from "./components/SelectedProject.jsx";

function App() {
const [projectState, setProjectState] = useState({
        selectedProjectId: undefined,
        projects: [],
        tasks: []
    });

  function handleAddTask(text) {
      setProjectState(prevState => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        id: taskId,
        projectId: prevState.selectedProjectId
      };
        
      return {
        ...prevState,
        selectedProjectId: undefined,
        tasks: [newTask, ...prevState.tasks]
      }
    })
    }

  function handleDeleteTask(id) {
    setProjectState(prevState => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter(
          (task) => task.id !== id
        ),
      }
    });
  }

    function handleSelectProject(id) {
      setProjectState(prevState => {
        return {
          ...prevState,
          selectedProjectId: id,
        }
      });
    }

    function handleStartProject() {
      setProjectState(prevState => {
        return {
          ...prevState,
          selectedProjectId: null,
        }
      });
    }

  function handleCanelProject() {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      }
    });
  }

  function handleAddProject(projectData) {
    setProjectState(prevState => {
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId
      }
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject]
      }
    })
  }

  function handleDeleteProject() {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectId
        ),
      }
    });
  }

  const selectedProject = projectState.projects.find(
    project => project.id === projectState.selectedProjectId
  )

  let content = (
    <SelectedProject
      project={selectedProject}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projectState.tasks}
    />
  );
  
    if (projectState.selectedProjectId === null) {
      content = <AddingProjects onAdd={handleAddProject} onCancel={handleCanelProject} />
    } else if (projectState.selectedProjectId === undefined) {
      content = <NoProjectSelected onStartAddProject={handleStartProject} />
    } 

  return (
    <main className="h-screen my-8 flex gap-8">
      <SideBar
        onStartAddProject={handleStartProject}
        projects={projectState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
