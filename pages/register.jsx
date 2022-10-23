import Auth, { TYPES } from '../src/components/Auth';
import Layout from '../src/components/Layout';

const RegisterPage = () => {
  return (
    <Layout>
      <Auth type={TYPES.REGISTER} />
    </Layout>
  );
};

export default RegisterPage;
