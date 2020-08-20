/**
 * @description 班级管理
 */

import Layout from '@/layout'

const classManagement = {
    path: '/class',
    component: Layout,
    redirect: '/class/recruitStudent',
    meta: { title: '班级管理', icon: 'class' },
    children: [
        {
            path: 'recruitStudent',
            name: 'recruitStudent',
            component: () => import('@/views/class/recruitStudent/index'),
            meta: { title: '招生中', icon: 'recruitStudent' }
        },
        {
            path: 'learn',
            name: 'learn',
            component: () => import('@/views/class/learnIng/index'),
            meta: { title: '学习中', icon: 'learnIng' }
        },
        {
            path: 'finish',
            name: 'finish',
            component: () => import('@/views/class/finish/index'),
            meta: { title: '已结业', icon: 'finish' }
        }
    ]
}

export default classManagement

