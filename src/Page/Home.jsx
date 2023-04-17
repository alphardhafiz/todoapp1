import "../style/HomeStyle.css";
import Title from "../component/Title";
import TaskList from "../component/TaskList";
import ButtonCRUD from "../component/ButtonCRUD";

const Home = () => {
  return (
    <div className="container">
      <Title />
      <ButtonCRUD />
      <TaskList />
    </div>
  );
};

export default Home;
