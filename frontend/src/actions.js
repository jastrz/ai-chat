import * as historyApi from "api/historyApi";
import { store } from "store/store";
import * as chatActions from "store/chatSlice";

export async function setHistory(historyId) {
  const history = await historyApi.getHistory(historyId);
  if (history) {
    store.dispatch(chatActions.setCurrentHistory(history));
  }
}

export async function removeHistory(historyId) {
  console.log(historyId);
  const result = await historyApi.removeHistory(historyId);
  console.log(result);
  if (result.success) {
    store.dispatch(chatActions.removeHistory(historyId));
    console.log("History is removed");
  } else {
    console.log("History is not removed");
  }
}
