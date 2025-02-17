import { IoIosLogOut } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { FaRegFile } from "react-icons/fa";


export const user_Menu = [
    {
      icon: <IoHomeOutline  />,
      label: 'User Profile',
      path: '/userdashbaord/',
    },
    {
      icon: <FaRegFile  />,
      label: 'Setting',
      path: '/userdashbaord/',
    },
    {
        icon: <FaRegFile  />,
        label: 'logout',
        path: '/userdashbaord/',
    }
];
export const admin_Menu = [
    {
        icon: <IoHomeOutline size={30} />,
        label: 'Admin Profile',
        path: '/userdashbaord/userhome',
      },
      {
        icon: <FaRegFile size={30} />,
        label: 'Setting',
        path: '/userdashbaord/userreport',
      },
      {
          icon: <FaRegFile size={30} />,
          label: 'logout',
          path: '/userdashbaord/userreport',  
    }
];