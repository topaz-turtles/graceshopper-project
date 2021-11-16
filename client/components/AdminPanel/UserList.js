import axios from "axios";
import React, { useEffect, useState } from "react";
import { TOKEN } from "../../store/auth";

const UserList = () => {

    const [userList, setUserList] = useState([]);

    useEffect(() => {
        const fetchUserList = async () => {
                const token = window.localStorage.getItem(TOKEN)
                const { data } = await axios.get('/api/admin/users', {
                    headers: {
                        authorization: token
                    }
                })
                setUserList(data);
            
        }

        try {
            fetchUserList()
        } catch (error) {
            console.error(error)
        }
    }, [])

    return (
        <table className="info-table">
            <tr className="info-table-row">
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Address</th>
                <th>Account Type</th>
            </tr>
            {userList.map(user => <tr>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{`${user.address || ''} ${user.city || ''} ${user.state|| ''} ${user.zipcode|| ''} ${user.phone|| ''}`}</td>
                <td width='100px'><center>{user.isAdmin?'Admin':'Normal'}</center></td>
            </tr>)}
        </table>
    )
}

export default UserList;