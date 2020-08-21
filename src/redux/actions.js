import { ALL_TASK, DELETE_TASK, FILTER_TASK, GET_FAVORITE, DELETE_FAVORITE } from "./actions-types";


export const allTask = (payload) => {
  return {
      type: ALL_TASK,
      task: payload
  }
};

export const deleteTask = (payload) => {
  return {
      type: DELETE_TASK,
      task: payload
  }
};

export const addTask = (payload) => {
  return {
      type: FILTER_TASK,
      task: payload
  }
};

export const getFavorite = (payload) => {
  return {
      type: GET_FAVORITE,
      task: payload
  }
};

export const deleteFavorite = (payload) => {
  return {
      type: DELETE_FAVORITE,
      task: payload
  }
};

