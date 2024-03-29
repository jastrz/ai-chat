import api from "api/axiosConfig";

async function getHistoryList(username) {
  try {
    const response = await api.get(`/history/list/${username}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching history list: ", error);
    return null;
  }
}

async function getHistory(historyId) {
  try {
    const response = await api.get(`/history/${historyId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching history: ", error);
    return null;
  }
}

async function removeHistory(historyId) {
  try {
    const response = await api.delete(`/history/${historyId}`);
    return response.data;
  } catch (error) {
    console.log("Error deleting history");
    return null;
  }
}

export { getHistory, getHistoryList, removeHistory };
