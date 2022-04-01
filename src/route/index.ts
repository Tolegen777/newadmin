import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import SettingsIcon from '@mui/icons-material/Settings';
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import InventoryIcon from '@mui/icons-material/Inventory';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import GroupIcon from '@mui/icons-material/Group';
import MessageIcon from '@mui/icons-material/Message';
import EngineeringRoundedIcon from '@mui/icons-material/EngineeringRounded';

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
    PRODUCTS = "/app/products",
    ORDERS = "/app/orders",
    HOME = "/app",
    POSTS = "/app/posts",
    SETTINGS = "/app/settings",
    CLIENTS = "/app/clients",
    EMPLOYEES = "/app/employees"
}

export const privateRoute = [

]


export const menuRoutes: RouteType[] = [
    { name: "Профиль", path: MyRoutes.PROFILE, icon: PersonRoundedIcon },
    // { name: "Главная", path: MyRoutes.ORDERS, icon: ArticleIcon },
    { name: "Мои товары", path: MyRoutes.PRODUCTS, icon: InventoryIcon },
    { name: "Мои заказы", path: MyRoutes.ORDERS, icon: FactCheckIcon },
    { name: "Клиенты", path: MyRoutes.CLIENTS, icon: GroupIcon },
    { name: "Сотрудники", path: MyRoutes.EMPLOYEES, icon: EngineeringRoundedIcon },
]

export const publicRoute = []