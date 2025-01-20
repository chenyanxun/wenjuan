import { createBrowserRouter } from 'react-router-dom'

import MainLayout from '../pages/layout/MainLayout'
import ManageLayout from '../pages/layout/ManageLayout'
import QuestionLayout from '../pages/layout/QuestionLayout'
import Index from '../pages/index/Index'
import Login from '../pages/login/Index'
import Register from '../pages/register/Index'
import NotFound from '../pages/notFound/Index'
import List from '../pages/manage/list/Index'
import Trash from '../pages/manage/trash/Index'
import Star from '../pages/manage/star/Index'
import Edit from '../pages/question/edit/Index'
import Stat from '../pages/question/stat/Index'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Index />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'manage',
        element: <ManageLayout />,
        children: [
          {
            path: 'list',
            element: <List />,
          },
          {
            path: 'star',
            element: <Star />,
          },
          {
            path: 'trash',
            element: <Trash />,
          },
        ],
      },
    ],
  },
  {
    path: 'question',
    element: <QuestionLayout />,
    children: [
      {
        path: 'edit/:id',
        element: <Edit />,
      },
      {
        path: 'stat/:id', // statistic 统计
        element: <Stat />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])

export default router
