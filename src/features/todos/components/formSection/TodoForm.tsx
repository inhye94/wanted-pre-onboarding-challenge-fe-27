import { useTodoForm } from "../../hooks/useTodoForm";
import TextInputField from "../../../../shared/components/ui/TextInputField";
import Button from "../../../../shared/components/ui/Button";
import EditButtonsWrapper from "../EditButtonsWrapper";

const TodoForm = () => {
  const {
    formState,
    titleRef,
    contentRef,
    cancel,
    handleChange,
    handleSubmit,
    todoId,
  } = useTodoForm();
  return (
    <form action="">
      <TextInputField
        ref={titleRef}
        value={formState.title}
        name="title"
        label="제목"
        placeholder="제목을 입력하세요"
        onInput={handleChange}
      />

      <TextInputField
        ref={contentRef}
        value={formState.content}
        name="content"
        label="내용"
        placeholder="내용을 입력하세요"
        onInput={handleChange}
      />

      <EditButtonsWrapper>
        <Button onClick={handleSubmit}>{todoId ? "수정" : "등록"}</Button>
        <Button variant="secondary" onClick={cancel}>
          취소
        </Button>
      </EditButtonsWrapper>
    </form>
  );
};

export default TodoForm;