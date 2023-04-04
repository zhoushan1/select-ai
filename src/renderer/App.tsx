import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

import { ReactNode } from 'react';
import './App.css';
import 'antd/dist/reset.css';
import routerList from './router';

type Props = {
  children: ReactNode;
};

function PageLayout({ children }: Props) {
  return (
    <div>
      {/* <div>头部组件</div> */}
      {children}
      {/* <div>底部组件</div> */}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <PageLayout>
        <Routes>
          {routerList.map(({ path, element, ...rest }) => {
            // eslint-disable-next-line react/jsx-props-no-spreading
            return <Route key={path} path={path} element={element} {...rest} />;
          })}
        </Routes>
      </PageLayout>
    </Router>
  );
}
