import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TodoType } from "../todoList/TodoList";
import axios from "axios";
import { useAuthStore } from "../../../../store/authStore";
import { useTodoStore } from "../../../../store/todoStore";

const TodoDetail = () => {
  const { todoId } = useParams();
  const [detail, setDetail] = useState<TodoType | null>(null);
  const { token } = useAuthStore();
  const { mode } = useTodoStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!todoId) return;

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/todos/${todoId}`, {
        headers: { Authorization: token },
      })
      .then((res) => {
        const createAt = new Date(res.data.data.createdAt);
        const year = createAt.getFullYear();
        const month = createAt.getMonth() + 1;
        const date = createAt.getDate();
        const hour = createAt.getHours();
        const min = createAt.getMinutes();

        return {
          ...res.data.data,
          createdAt: `${year}-${month}-${date} ${hour}:${min}`,
        };
      })
      .then((data) => {
        const updatedAt = new Date(data.updatedAt);
        const year = updatedAt.getFullYear();
        const month = updatedAt.getMonth() + 1;
        const date = updatedAt.getDate();
        const hour = updatedAt.getHours();
        const min = updatedAt.getMinutes();

        return {
          ...data,
          updatedAt: `${year}-${month}-${date} ${hour}:${min}`,
        };
      })
      .then((data) => {
        setDetail(data);
      });
  }, [todoId]);

  const removeTodo = () => {
    axios
      .delete(`${import.meta.env.VITE_BASE_URL}/todos/${todoId}`, {
        headers: { Authorization: token },
      })
      .then(() => {
        navigate("/todo");
        setDetail(null);
      });
  };

  if (mode !== "read") return;

  if (!todoId) return;

  return (
    <section>
      <header>
        <h3>TodoDetail</h3>
        {detail && (
          <div>
            <button>수정</button>
            <button onClick={removeTodo}>삭제</button>
          </div>
        )}
      </header>
      <p>token: {token}</p>

      {detail && (
        <div>
          <p>title: {detail.title}</p>
          <p>content: {detail.content}</p>
          <p>작성일: {detail.createdAt}</p>
          <p>수정일: {detail.updatedAt}</p>
        </div>
      )}
    </section>
  );
};

export default TodoDetail;
