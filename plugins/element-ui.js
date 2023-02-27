import Vue from 'vue'
import {Pagination, Dropdown, DropdownMenu, DropdownItem, Input, Message, Button} from "element-ui";

Vue.component(Pagination.name, Pagination)
Vue.component(Dropdown.name, Dropdown)
Vue.component(DropdownMenu.name, DropdownMenu)
Vue.component(DropdownItem.name, DropdownItem)
Vue.component(Input.name, Input)
Vue.component(Button.name, Button)
Vue.prototype.$message = Message
