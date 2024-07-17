import {message, Tabs} from 'antd';
import Bookings from './Bookings';
import axios from "axios";
import {useNavigate} from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();
    // const onChange = (key) => {
    //     console.log(key);
    //   };
    const checkUser = async () => {
        const user = await axios.get("/api/users/get-current-user", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (user.data.data.role === "partner" ) {
            navigate("/partner");
            message.error("You are not allowed to access this page");
        }
        if (user.data.data.role === "admin" ) {
            navigate("/admin");
            message.error("You are not allowed to access this page");
        }
        else {

        }
    }
    checkUser();

        const items = [
        {
          key: '1',
          label: 'Bookings',
          children: <Bookings/>,
        },
        // {
        //   key: '3',
        //   label: 'Tab 3',
        //   children: 'Content of Tab Pane 3',
        // },
      ];

    return (
        <>
        <h1>User Profile Page</h1>
            <Tabs defaultActiveKey="2" items={items} />
        </>
    )
}

export default Profile;