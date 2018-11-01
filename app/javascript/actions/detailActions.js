import {
  FETCH_DETAILS_API_CALL_REQUEST,
  CLEAR_USER_DETAILS,
  SAVE_USER_DETAILS_API_CALL_REQUEST,
  HANDLE_DROPDOWN_CHANGE,
  HANDLE_EDIT_BUTTON_CHANGE,
} from './actionTypes';

export const handleDropdownChangeAction = (name, value) => ({
  type: HANDLE_DROPDOWN_CHANGE,
  payload: { name, value },
});

export const handleEditButtonChangeAction = value => ({
  type: HANDLE_EDIT_BUTTON_CHANGE,
  payload: { value },
});

export function fetchDetailsActions(id) {
  return { type: FETCH_DETAILS_API_CALL_REQUEST, payload: { id: id } };
}

export const clearDetails = () => ({
  type: CLEAR_USER_DETAILS,
});

export function saveUserDetailsActions(id, details, isRolesDisabled) {
  return {
    type: SAVE_USER_DETAILS_API_CALL_REQUEST,
    payload: { id: id, details: details, isRolesDisabled },
  };
}
