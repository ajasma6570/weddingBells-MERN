import React from 'react'
import AdminDashBoard from '../../Components/AdminComponent/AdminDashBoard'
import AdminFooter from './AdminFooter'

export default function AdminDashBoardPage() {
  return (
    <div  style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>


<div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <AdminDashBoard />
        </div>
        <AdminFooter />
    </div>
  )
}
