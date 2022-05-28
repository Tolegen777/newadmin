import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import SettingsIcon from '@mui/icons-material/Settings';
import {SvgIconTypeMap} from '@mui/material';
import {OverridableComponent} from '@mui/material/OverridableComponent';
import InventoryIcon from '@mui/icons-material/Inventory';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import GroupIcon from '@mui/icons-material/Group';
import MessageIcon from '@mui/icons-material/Message';
import EngineeringRoundedIcon from '@mui/icons-material/EngineeringRounded';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import {useSelector} from "react-redux";

type RouteType = {
    name: string;
    path: string;
    icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
}

export enum MyRoutes {
    LOGIN = "/login",
    FORGOT_PASSWORD = "/login/forgot",
    CHANGE_PASSWORD = "/login/reset",

    PROFILE = "/app/profile",
    PRODUCTS = "/app/products/list",
    ORDERS = "/app/orders",
    HOME = "/app",
    POSTS = "/app/posts",
    SETTINGS = "/app/settings",
    NOTIFICATIONS = "/app/notifications",
    EMPLOYEES = "/app/employees"
}

export const privateRoute = []




export const menuRoutes: RouteType[] = [
    {name: "Профиль", path: MyRoutes.PROFILE, icon: PersonRoundedIcon},
    // { name: "Главная", path: MyRoutes.ORDERS, icon: ArticleIcon },
    {name: "Мои товары", path: MyRoutes.PRODUCTS, icon: InventoryIcon},
    {name: "Мои заказы", path: MyRoutes.ORDERS, icon: FactCheckIcon},
    {name: "Уведомления", path: MyRoutes.NOTIFICATIONS, icon: ChatBubbleIcon},
    {name: "Сотрудники", path: MyRoutes.EMPLOYEES, icon: EngineeringRoundedIcon},
]

export const publicRoute = []