const contactsRoutes = [
    {
        path: '',
        loadComponent: () => import('./list/list.component').then(m => m.ListComponent)
    }
]


export default contactsRoutes;