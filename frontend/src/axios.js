import axios from "axios";

axios.defaults.baseURL = "https://jobs.lassesuomela.com/api";

axios.defaults.headers.common["authorization"] = "Bearer " + localStorage.getItem("token");

export default axios;
