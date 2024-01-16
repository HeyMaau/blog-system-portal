import {useState} from "#app";
import {StateConstants} from "~/utils/NewConstants";

export const useCurrentRouterPath = () => {
  return useState(StateConstants.KEY_CURRENT_ROUTER_PATH, () => '/')
}
