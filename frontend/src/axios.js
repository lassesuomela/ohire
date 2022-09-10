import axios from "axios";

axios.defaults.baseURL = "http://192.168.1.20:8081/api";

axios.defaults.headers.common["authorization"] = "Bearer " + localStorage.getItem("token");

export default axios;
