import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Header from './components/header/header';
import Product from './components/product/product';
import Catalog from './components/catalog/catalog';
import Basket from './components/basket/basket.tsx';
import { Provider } from 'react-redux'
import { store } from './redux/store';
import Favorite from './components/favorite/favorite.tsx';
import Blog from './components/blog/blog.tsx';
import ArticleBlog from './components/blog/articleBlog.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "store",
    element: <Header/>,
    children: [
      {
        path: "catalog",
        element: <Catalog/>
      },
      {
        path: "sneakers/:id",
        element: <Product/>
      },
      {
        path: "cart",
        element: <Basket/>
      },
      {
        path: "favorite",
        element: <Favorite/>
      }
    ]
  },
  {
    path: "blog",
    element: <Blog/>,
  },
  {
    path: "blog/article/:id",
    element: <ArticleBlog/>
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
