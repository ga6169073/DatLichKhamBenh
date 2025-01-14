export const adminMenu = [
    { // quản lý người dùng
        name: 'menu.admin.manage-user',
        menus: [

            // {
            //     name: 'menu.admin.crud', link: '/system/user-manage'
            // },
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux'
            },
            {
                name: 'menu.admin.manage-doctor', link: '/system/manage-doctor'
            },
            // {
            //     name: 'menu.admin.manage-admin', link: '/system/user-admin'
            // },

            // subMenus: [
            //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
            //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
            // ]
            // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
            {
                name:'menu.doctor.manage-schedule', link: '/doctor/manage-schedule'
            },
        ]
    },
    
    {
        // quản lý phòng khám
        name: 'menu.admin.manage-clinic',
        menus: [
            {
                name: 'menu.admin.manage-clinic', link: '/system/manage-clinic'
            }
        ]
    },
    {
        // quản lý chuyên khoa
        name: 'menu.admin.manage-specialty',
        menus: [
            {
                name: 'menu.admin.manage-specialty', link: '/system/manage-specialty'
            }
        ]
    }
];

export const doctorMenu = [
    {
        name: 'menu.admin.manage-user',
        menus: [
            {
                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule'
            },
            {
                name: 'menu.doctor.manage-patient', link: '/doctor/manage-patient'
            }
        ]
    }
]