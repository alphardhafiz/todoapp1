import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Page/Home";
import AddUser from "./Page/AddUser";
import AddTask from "./Page/AddTask";
import UserListPage from "./Page/UserListPage";
import EditUser from "./Page/EditUser";
import EditTask from "./Page/EditTask";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/user-list" element={<UserListPage />} />
        <Route path="/edit-user/:id" element={<EditUser />} />
        <Route path="/add-task" element={<AddTask />} />
        <Route path="/edit-task/:id" element={<EditTask />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
