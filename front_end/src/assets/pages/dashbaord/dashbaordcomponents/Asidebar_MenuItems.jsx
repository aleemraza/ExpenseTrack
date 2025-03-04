import { IoIosLogOut } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { FaRegFile } from "react-icons/fa";

export const user_Menu = [
    {
      icon: <IoHomeOutline size={30} />,
      label: 'Dashbaord',
      path: '/userdashbaord/userhome',

    },
    {
      icon: <FaRegFile size={30} />,
      label: 'Report',
      path: '/userdashbaord/userreport',

    }
];
export const admin_Menu = [
    {
      icon: <IoHomeOutline size={30} />,
      label: 'Admin Home',
      path: '/admindashbaord/AdminPage',

    }
];

export const PageNotFoundMenu = [
  
];