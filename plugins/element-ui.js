import Vue from 'vue'
import {
  Pagination,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Input,
  Message,
  Button,
  Result,
  Backtop,
  Icon,
  Skeleton,
  SkeletonItem,
  Tag
} from "element-ui";

Vue.component(Pagination.name, Pagination)
Vue.component(Dropdown.name, Dropdown)
Vue.component(DropdownMenu.name, DropdownMenu)
Vue.component(DropdownItem.name, DropdownItem)
Vue.component(Input.name, Input)
Vue.component(Button.name, Button)
Vue.component(Result.name, Result)
Vue.component(Backtop.name, Backtop)
Vue.component(Icon.name, Icon)
Vue.component(Skeleton.name, Skeleton)
Vue.component(SkeletonItem.name, SkeletonItem)
Vue.component(Tag.name, Tag)
Vue.prototype.$message = Message
