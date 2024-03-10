import api from "api/axiosConfig";

async function getHistoryList(username) {
  try {
    const response = await api.post("/historyList", { username });
    return response.data;
  } catch (error) {
    console.error("Error fetching history list: ", error);
    return null;
  }
}

async function getHistory(historyId) {
  try {
    const response = await api.get("/history", { data: historyId });
    return response.data;
  } catch (error) {
    console.error("Error fetching history: ", error);
    return null;
  }
}

export { getHistory, getHistoryList };
