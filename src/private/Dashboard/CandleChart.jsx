// TradingViewWidget.jsx
import { memo, useEffect, useRef } from 'react';

function TradingViewWidget() {
  const container = useRef();

  useEffect(
    () => {
      const existingScript = container.current.querySelector("script");
      if (existingScript) {
        return;
      }  

      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "allow_symbol_change": true,
          "calendar": false,
          "details": true,
          "hide_side_toolbar": false,
          "hide_top_toolbar": false,
          "hide_legend": false,
          "hide_volume": false,
          "hotlist": false,
          "interval": "60",
          "locale": "en",
          "save_image": true,
          "style": "1",
          "symbol": "BINANCE:BTCUSDT",
          "theme": "dark",
          "timezone": "America/Sao_Paulo",
          "backgroundColor": "#0F0F0F",
          "gridColor": "rgba(242, 242, 242, 0.06)",
          "watchlist": [],
          "withdateranges": true,
          "compareSymbols": [],
          "studies": [],
          "autosize": true
        }`;
      container.current.appendChild(script);

        return () => {
            if (container.current) {
                container.current.innerHTML = '';
            }
        };
    },
    []
  );

  return (
    <div className='row'>
        <div className='col-12' style={{ height: 520 }}>
            <div className="tradingview-widget-container" ref={container} style={{ height: "100%", width: "100%" }}>
                <div className="tradingview-widget-container__widget" style={{ height: "calc(100% - 32px)", width: "100%" }}>
                </div>
            </div>
        </div>
    </div>

  );
}

export default memo(TradingViewWidget);
