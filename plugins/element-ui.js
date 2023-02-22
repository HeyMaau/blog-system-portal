import Vue from 'vue'
import {Pagination, Dropdown, DropdownMenu, DropdownItem, Container, Input, Header, Main, Message} from "element-ui";

Vue.component(Pagination.name, Pagination)
Vue.component(Dropdown.name, Dropdown)
Vue.component(DropdownMenu.name, DropdownMenu)
Vue.component(DropdownItem.name, DropdownItem)
Vue.component(Container.name, Container)
Vue.component(Input.name, Input)
Vue.component(Header.name, Header)
Vue.component(Main.name, Main)
Vue.prototype.$message = Message
