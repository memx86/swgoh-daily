import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

import Link from 'next/link';

const s = {};

export const TYPES = {
  LOGIN: 'login',
  REGISTER: 'register',
};

const FIELDS = {
  NAME: 'name',
  EMAIL: 'email',
  PASSWORD: 'password',
  CONFIRM_PASSWORD: 'confirmPassword',
};

const FIELDS_LOGIN = [FIELDS.EMAIL, FIELDS.PASSWORD];
const FIELDS_REGISTER = [FIELDS.NAME, ...FIELDS_LOGIN, FIELDS.CONFIRM_PASSWORD];

const Auth = ({ type = TYPES.LOGIN }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = data => console.log(data);

  const isRegister = type === TYPES.REGISTER;
  const title = isRegister ? 'Register' : 'Login';
  const fields = isRegister ? FIELDS_REGISTER : FIELDS_LOGIN;

  //   console.log(watch("example")); // watch input value by passing the name of it

  return (
    <section>
      <div className={s.wrapper}>
        <h1 className={s.title}>{title}</h1>
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          {fields.map(field => (
            <label key={field}>
              <input {...register(field, { required: true })} />
              {errors[field] && <span>This field is required</span>}
            </label>
          ))}
          <button className={s.btn} type="submit"></button>
        </form>
        <p className={s.text}>
          {isRegister ? 'Already' : "Don't"} have an account?
          <Link href={isRegister ? '/login' : '/register'} className={s.link}>
            {isRegister ? 'Log in' : 'Register'}
          </Link>
        </p>
      </div>
    </section>
  );
};

Auth.propTypes = {
  type: PropTypes.oneOf(Object.values(TYPES)),
};

export default Auth;
