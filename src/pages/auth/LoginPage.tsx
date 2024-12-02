import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { afterLogin, postLogin } from "../../features/auth/apis/auth";
import { useAuthStore } from "../../features/auth/store/authStore";
import type { AuthPayloadType } from "../../features/auth/types";

const LoginPage = () => {
  const { register, handleSubmit, reset } = useForm<AuthPayloadType>();
  const [loginError, setLoginError] = useState<string>("");
  const { setToken } = useAuthStore();

  const login = useCallback(({ email, password }: AuthPayloadType) => {
    postLogin({ email, password })
      .then((res) => {
        afterLogin(res.token);
        setToken(res.token);
        reset();
      })
      .catch((error) => {
        setLoginError(error.response.data.details);
      });
  }, []);

  return (
    <section>
      <h1>login</h1>

      <form onSubmit={handleSubmit(login)}>
        <div>
          <label htmlFor="email">아이디</label>
          <input type="text" id="email" {...register("email")} />
        </div>

        <div>
          <label htmlFor="password">비밀번호</label>
          <input type="password" id="password" {...register("password")} />
        </div>

        {loginError && <p>{loginError}</p>}

        <div>
          <button type="submit">로그인</button>
        </div>

        <div>
          <Link to="/auth/join">회원가입</Link>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
