import Layout from '../src/components/Layout';
import Auth, { TYPES } from '../src/components/Auth';

const RegisterPage = () => {
  return (
    <Layout>
      <Auth type={TYPES.REGISTER} />
    </Layout>
  );
};

export default RegisterPage;
