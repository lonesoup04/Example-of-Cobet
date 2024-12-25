import React from 'react'
import Navbar from './components/Navbar'
import Categories from './components/Categories'
import DiscussArea from './components/DiscussArea'
import EventArea from './components/EventArea'
import EventDetail from './components/EventDetail';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout'
import UserInfo from './components/UserInfo'
import DepositPage from './components/DepositPage'

const App = () => {
  const events = [
    { id: 1, title: 'What will be BTC price in the end of ', options: [
        { price: '$105,000', probability: 10 },
        { price: '$100,000', probability: 20 },
        { price: '$95,000', probability: 20 },
        { price: '$90,000', probability: 30 },
        { price: '$85,000', probability: 10 },
        { price: '$80,000', probability: 10 },
        
      ],
      volume: '$9.6m',
      deadline: 'Dec 31, 2024',
      comments: 620,
 },
    { id: 2, title: 'Olympics 2024', options: [
        { price: 'Donald Trump', probability: 52 },
        { price: 'Joe Biden', probability: 46 },
        { price: 'Other', probability: 2 },
      ],
      volume: '$15.4m',
      deadline: 'Nov 5, 2024',
      comments: 1020,},
    { id: 3, title: 'World Climate Summit',options: [
        { price: '$10,000', probability: 15 },
        { price: '$8,000', probability: 30 },
        { price: '$5,000', probability: 55 },
      ],
      volume: '$7.2m',
      deadline: 'Dec 31, 2024',
      comments: 450,},

    { id: 4, title: 'World Climate Summit',options: [
        { price: '$10,000', probability: 15 },
        { price: '$8,000', probability: 30 },
        { price: '$5,000', probability: 55 },
      ],
      volume: '$7.2m',
      deadline: 'Dec 31, 2024',
      comments: 450,},

      { id: 5, title: 'World Climate Summit',options: [
        { price: '$10,000', probability: 15 },
        { price: '$8,000', probability: 30 },
        { price: '$5,000', probability: 55 },
      ],
      volume: '$7.2m',
      deadline: 'Dec 31, 2024',
      comments: 450,},
    // 更多事件数据...
  ];

  return (
    <Router>
      <Routes>
        {/* 主页面 */}
        <Route
          path="/"
          element={
            <Layout>
              <DiscussArea/>
              <EventArea events={events} />
            </Layout>
          }
        />
        
        {/* 事件细节页面 */}
        <Route path="/event/:id" element={
          <Layout>
            <EventDetail events={events} />
          </Layout>
            } />

        {/* 用户信息页面 */}
        <Route path="/user/:id" element={
          <Layout>
            <UserInfo />
          </Layout>
        } />

        {/* 存款页面 */}
        <Route path="/deposit" element={
          <Layout>
            <DepositPage />
          </Layout>
        } />

      </Routes>
    </Router>
    
  )
}

export default App