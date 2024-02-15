import { QueryClient, QueryClientProvider } from 'react-query';
import Layout from '../components/layout/Layout';
import '../styles/globals.scss';
import variables from '../styles/variables.module.scss';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <Layout color={variables.primaryColor}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </Layout>
  );
}

export default MyApp;
