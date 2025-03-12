import axios from "axios";

export const api = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
});

const accessToken = localStorage.getItem("accessToken");
const auth = accessToken ? `${accessToken}` : null;
//? `${accessToken}` : null;

console.log("accessToken", accessToken);

// Axios 인스턴스 생성
const client = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
  headers: {
    Authorization: auth,
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

//요청 인터셉터
client.interceptors.request.use(
  (response) => {
    const accessToken = localStorage.getItem("accessToken");
    console.log("Auth value in fetchToken:", auth);
    if (accessToken) {
      response.headers.Authorization = accessToken;
    }
    return response;
  },
  (error) => Promise.reject(error)
);

//응답 인터셉터
client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const { status, data } = error.response || {};

    if (
      status === 401 &&
      data.error === "Token Expired" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const accessToken = localStorage.getItem("accessToken");
        console.log("expired");
        if (accessToken) {
          const response = await axios.post(`/auth/reissue`, null, {
            headers: {
              Authorization: auth,
              "Content-Type": "application/json",
            },
            withCredentials: true,
          });

          //새 토큰 저장
          const accessToken = response.data.accessToken;
          localStorage.setItem("accessToken", accessToken);

          //갱신된 토큰으로 요청 헤더 설정
          client.defaults.headers.Authorization = accessToken;
          originalRequest.headers.Authorization = accessToken;

          //원래 요청 재시도
          return client(originalRequest);
        }
      } catch (refreshError) {
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export { client };
