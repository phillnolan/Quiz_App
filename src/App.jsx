import React from 'react'
import { Provider } from 'react-redux'
import { store } from "./store/store"
import { Quiz } from './components'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import LSD from './pages/LSD'
import TTHCM from './pages/TTHCM'
import CNPM from './pages/CNPM'
import MMT from './pages/MMT'
import TTNT from './pages/TTNT'
import TRIET from './pages/TRIET'
import KTCT from './pages/KTCT'
import { listPage } from './constants/listPages'

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename="/Quiz_App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/LSD" element={<LSD />} />
          <Route path="/LSD/:quizId" element={<Quiz quizType="LSD" />} />
          <Route path="/TTHCM" element={<TTHCM />} />
          <Route path="/TTHCM/:quizId" element={<Quiz quizType="TTHCM" />} />
          <Route path="/CNPM" element={<CNPM />} />
          <Route path="/CNPM/:quizId" element={<Quiz quizType="CNPM" />} />
          <Route path="/MMT" element={<MMT />} />
          <Route path="/MMT/:quizId" element={<Quiz quizType="MMT" />} />
          <Route path="/TTNT" element={<TTNT />} />
          <Route path="/TTNT/:quizId" element={<Quiz quizType="TTNT" />} />
          <Route path="/TRIET" element={<TRIET />} />
          <Route path="/TRIET/:quizId" element={<Quiz quizType="TRIET" />} />
          <Route path="/KTCT" element={<KTCT />} />
          <Route path="/KTCT/:quizId" element={<Quiz quizType="KTCT" />} />
          {listPage.filter(p => !['/LSD', '/TTHCM', '/CNPM', '/MMT', '/TTNT', '/TRIET', '/KTCT'].includes(p.href)).map((page) => (
            <Route key={page.id} path={page.href} element={<Quiz quizType={page.href.substring(1)} />} />
          ))}
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}


