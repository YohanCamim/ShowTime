import React from "react";
import { Navigate } from "react-router-dom"

import UsersPanel from "../components/UsersPanel"
import ShowsPanel from "../components/ShowsPanel"
import GroupsPanel from "../components/GroupsPanel";
import KPI from "../components/KPI"

class Admin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isAdmin: true,

        }
    }
    render() {
        if (this.state.isAdmin) {
            return (<div>
                <h1>Admin Panel</h1>
                <div className="grid-account">
                    <ShowsPanel />
                    <UsersPanel />
                    <GroupsPanel />
                    <KPI />
                </div>
            </div>)
        } else {
            return <Navigate replace to="/" />

        }

    }
}
export default Admin