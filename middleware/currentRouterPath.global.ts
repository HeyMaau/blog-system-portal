import {defineNuxtRouteMiddleware} from "#app";
import {useCurrentRouterPath} from "~/composables/useCurrentRouterPath";

export default defineNuxtRouteMiddleware((to, from) => {
  const currentRouterPath = useCurrentRouterPath()
  currentRouterPath.value = to.path
})
