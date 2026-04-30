import React, { useState, useEffect } from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const base_url = 'http://localhost:9000/api/v1'

const TheHeaderDropdownNotif = () => {
  const [notifications, setNotifications] = useState([])
  const [summary, setSummary] = useState({ totalPending: 0, totalEmployees: 0, todayAttendanceCount: 0 })
  const [isLoading, setIsLoading] = useState(false)
  const history = useHistory()

  const fetchNotifications = async () => {
    setIsLoading(true)
    try {
      const res = await axios.get(`${base_url}/notifications`, {
        headers: { 'authorization': localStorage.getItem('Bearer') }
      })
      setNotifications(res.data.notifications || [])
      setSummary(res.data.summary || { totalPending: 0, totalEmployees: 0, todayAttendanceCount: 0 })
    } catch (err) {
      console.error("Error fetching notifications:", err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchNotifications()
    // Poll every 60 seconds for fresh notifications
    const interval = setInterval(fetchNotifications, 60000)
    return () => clearInterval(interval)
  }, [])

  const getIconColor = (type) => {
    switch (type) {
      case 'pending_approval': return 'text-warning'
      case 'checkin': return 'text-success'
      case 'checkout': return 'text-info'
      case 'approved': return 'text-success'
      default: return 'text-primary'
    }
  }

  const getTimeAgo = (timestamp) => {
    if (!timestamp) return ''
    const now = new Date()
    const time = new Date(timestamp)
    const diffMs = now - time
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    return `${diffDays}d ago`
  }

  const pendingCount = summary.totalPending || 0
  const totalCount = notifications.length

  return (
    <CDropdown
      inNav
      className="c-header-nav-item mx-2"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <CIcon name="cil-bell"/>
        {totalCount > 0 && (
          <CBadge shape="pill" color={pendingCount > 0 ? "danger" : "info"}>
            {totalCount}
          </CBadge>
        )}
      </CDropdownToggle>
      <CDropdownMenu placement="bottom-end" className="pt-0" style={{ minWidth: '320px' }}>
        <CDropdownItem
          header
          tag="div"
          className="text-center"
          color="light"
        >
          <strong>
            {totalCount > 0 ? `You have ${totalCount} notifications` : 'No notifications'}
          </strong>
        </CDropdownItem>

        {/* Summary section */}
        {(pendingCount > 0 || summary.todayAttendanceCount > 0) && (
          <CDropdownItem
            header
            tag="div"
            color="light"
            style={{ fontSize: '0.8rem', padding: '6px 12px' }}
          >
            {pendingCount > 0 && (
              <span style={{ marginRight: '12px' }}>
                <CBadge color="warning" style={{ marginRight: '4px' }}>{pendingCount}</CBadge>
                Pending
              </span>
            )}
            <span>
              <CBadge color="info" style={{ marginRight: '4px' }}>{summary.todayAttendanceCount}</CBadge>
              Check-ins today
            </span>
          </CDropdownItem>
        )}

        {/* Notification items */}
        {isLoading ? (
          <CDropdownItem className="text-center py-3">
            <small className="text-muted">Loading...</small>
          </CDropdownItem>
        ) : notifications.length === 0 ? (
          <CDropdownItem className="text-center py-3">
            <small className="text-muted">No recent activity</small>
          </CDropdownItem>
        ) : (
          notifications.slice(0, 8).map((notif) => (
            <CDropdownItem
              key={notif.id}
              onClick={() => notif.actionUrl && history.push(notif.actionUrl)}
              style={{ cursor: 'pointer', borderBottom: '1px solid #f0f0f0' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <CIcon name={notif.icon || 'cil-bell'} className={`mr-2 ${getIconColor(notif.type)}`} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {notif.message}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <small className="text-muted" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {notif.detail}
                    </small>
                    <small className="text-muted ml-2" style={{ whiteSpace: 'nowrap' }}>
                      {getTimeAgo(notif.timestamp)}
                    </small>
                  </div>
                </div>
              </div>
            </CDropdownItem>
          ))
        )}

        {/* Footer */}
        {pendingCount > 0 && (
          <CDropdownItem
            className="text-center border-top"
            onClick={() => history.push('/users/pending')}
            style={{ cursor: 'pointer' }}
          >
            <strong style={{ color: '#e55353' }}>
              View {pendingCount} pending approval{pendingCount > 1 ? 's' : ''}
            </strong>
          </CDropdownItem>
        )}
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdownNotif