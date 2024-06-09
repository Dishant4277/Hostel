import "./App.css";

import RegistrationForm from "./RegistrationForm";
import StudentPage from "./StudentPage";
import Complaint from "./Complaint";
import Hostelirs from "./Hostelirs";
import UploadButton from "./UploadButton";
import Messages from "./Messages";
import Home from "./Home";
import NoticeBoard from "./NoticeBoard";
import Update from "./Update";
import NewLogin from "./NewLogin";
import NotAllowed from "./NotAllowed";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Warden from "./Warden";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import HostelStudents from "./HostelStudents";
import AdminRegistration from "./AdminRegistration";
import About from "./About";

function App() {
  const User_Type = {
    public: "PUBLIC",
    student: "STUDENT",
    admin: "ADMIN",
  };

  const [CurrentUser, setCurrentUser] = useState(
    localStorage.getItem("CurrentUser") || null
  );

  function PublicElement({ children }) {
    return <>{children}</>;
  }

  function AdminElement({ children }) {
    if (CurrentUser === "admin") {
      return <>{children}</>;
    }
    return <Navigate to="/NotAllowed" replace />;
  }

  function StudentElement({ children }) {
    if (CurrentUser === "student") {
      return <>{children}</>;
    }
    return <Navigate to="/NotAllowed" replace />;
  }

  var Current_User = User_Type.public;

  const setAndStoreCurrentUser = (userType) => {
    setCurrentUser(userType);
    localStorage.setItem("CurrentUser", userType);
  };

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <PublicElement>
                <Home setCurrentUser={setCurrentUser} />
              </PublicElement>
            }
          ></Route>

          <Route
            path="/Login"
            element={
              <PublicElement>
                <NewLogin setCurrentUser={setAndStoreCurrentUser} />
              </PublicElement>
            }
          />
          <Route
            path="/About"
            element={
              <PublicElement>
                <About  />
              </PublicElement>
            }
          />

          <Route
            path="/NotAllowed"
            element={
              <publicElement>
                <NotAllowed />
              </publicElement>
            }
          ></Route>
          <Route
            path="/Warden"
            element={
              <AdminElement>
                <Warden />
              </AdminElement>
            }
          />
          <Route
            path="/NoticeBoard"
            element={
              <AdminElement>
                <NoticeBoard />
              </AdminElement>
            }
          />
          <Route
            path="/UploadButton"
            element={
              <AdminElement>
                <UploadButton />
              </AdminElement>
            }
          />
          <Route
            path="/Hostelirs"
            element={
              <AdminElement>
                <Hostelirs />
              </AdminElement>
            }
          />
          <Route
            path="/Update/:id"
            element={
              <AdminElement>
                <Update />
              </AdminElement>
            }
          />
          <Route
            path="/Messages"
            element={
              <AdminElement>
                <Messages />
              </AdminElement>
            }
          />
          <Route
            path="/RegistrationForm"
            element={
              <AdminElement>
                <RegistrationForm />
              </AdminElement>
            }
          />

          <Route
            path="/AdminRegistration"
            element={
              <AdminElement>
                <AdminRegistration />
              </AdminElement>
            }
          />

          <Route
            path="/Complaint"
            element={
              <StudentElement>
                <Complaint />
              </StudentElement>
            }
          />

          <Route
            path="/StudentPage"
            element={
              <StudentElement>
                <StudentPage />
              </StudentElement>
            }
          />

          <Route
            path="/HostelStudents"
            element={
              <StudentElement>
                <HostelStudents />
              </StudentElement>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
