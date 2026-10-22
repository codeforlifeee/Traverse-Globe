import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.jsx';

/**
 * Build-time render of one URL, used by scripts/prerender.mjs for the homepage.
 * The tree must match the one main.jsx hydrates (apart from the router).
 *
 * Only what renders without data or a viewport ends up in the HTML: the header and
 * hero. Below-the-fold sections render their reserved-height placeholders, because
 * they mount on scroll (see Section in pages/Home.jsx).
 */
export function render(url) {
  const queryClient = new QueryClient();
  return renderToString(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </QueryClientProvider>
    </StrictMode>
  );
}
