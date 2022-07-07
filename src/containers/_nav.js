export default [
  {
    _tag: "CSidebarNavItem",
    name: "Employee",
    to: "/dashboard",
    icon: "cil-people",
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // }
  },
  // {
  //   _tag: 'CSidebarNavTitle',
  //   _children: ['Theme']
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Employee',
  //   to: '/theme/colors',
  //   icon: 'cil-people',
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Typography',
  //   to: '/theme/typography',
  //   icon: 'cil-pencil',
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Colors',
  //   to: '/theme/colors',
  //   icon: 'cil-drop',
  // },

  {
    _tag: "CSidebarNavDropdown",
    name: "Attendance",
    route: "/buttons",
    icon: "cil-list",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Daily Attendance",
        to: "/buttons/buttons",
        icon: "cil-calendar-today",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Attendance Report",
        icon: "cil-calendar-today",
        to: "/buttons/brand-buttons",
      },
      // {
      //   _tag: "CSidebarNavItem",
      //   name: "Check I/O",
      //   icon: "cil-calendar-today",
      //   to: "/buttons/button-dropdowns"
      // },
    ],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Payroll",
    to: "/theme/typography",
    icon: "cil-pencil",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Assignments",
    to: "/theme/colors",
    icon: "cil-file",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Sites",
    to: "/users/User",
    icon: "cil-paper-plane",
  },
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Inventory",
  //   to: "/inventory",
  //   icon: "cil-notes",
  // },

];
