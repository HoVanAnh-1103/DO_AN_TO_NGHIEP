import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ConfigProvider } from 'antd';
import colors from '@access/colors';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        components: {
          Input: {
            ...colors.primary,
            hoverBorderColor: '#5BB318'
          },
          Button: {
            defaultBg: '#5BB318',
            defaultColor: "#fff",
            // size: 50
          },
          Checkbox: {
            size: 123,
            colorPrimary: '#5BB318'
          },
          Layout: {
            siderBg: '#fff'
          },
          Menu: {
            darkItemBg: '#fff',
            darkItemSelectedBg: '#CDE0C4',
            darkItemSelectedColor: "#7F7C7C",
            darkItemColor: '#7F7C7C',
            iconSize: 16,
            darkSubMenuItemBg: '#a3cf90',
            darkItemHoverColor: '#535353' 
          }
        },

      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
