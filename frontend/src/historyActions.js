import * as historyApi from "api/historyApi";
import { store } from "store/store";
import * as chatActions from "store/chatSlice";
import { PromptStatus } from "data/prompt";

export async function setHistory(historyId) {
  const currentHistoryId = store.getState().chat.historyId;
  if (currentHistoryId !== historyId) {
    const history = await historyApi.getHistory(historyId);
    history.messages = history.messages.map(({ _id, prompt, ...rest }) => {
      return {
        ...rest,
        guid: _id,
        ...(prompt
          ? {
              prompt: {
                type: prompt.type,
                status: PromptStatus.Completed,
              },
            }
          : {}),
      };
    });
    if (history) {
      store.dispatch(chatActions.setCurrentHistory(history));
    }
  }
}

export async function removeHistory(historyId) {
  console.log(historyId);
  const result = await historyApi.removeHistory(historyId);
  console.log(result);
  if (result.success) {
    const currentHistoryId = store.getState().chat.historyId;
    if (currentHistoryId === historyId) {
      store.dispatch(chatActions.clearHistory());
    }
    store.dispatch(chatActions.removeHistory(historyId));
    console.log("History is removed");
  } else {
    console.log("History is not removed");
  }
}

export async function getHistoryIds() {
  const username = store.getState().auth.userData.username;
  if (username) {
    const historyList = await historyApi.getHistoryList(username);
    if (historyList && historyList.length > 0) {
      store.dispatch(chatActions.setHistoryList(historyList));
    }
  } else {
    console.log("Couldn't get historyIds, because username is null");
  }
}
