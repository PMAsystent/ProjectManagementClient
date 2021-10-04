import React, {useMemo} from "react";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import * as yup from "yup";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {registerUser} from "../../redux/auth/auth.thunks";

const validationSchema = yup.object({
  userName: yup.string()
    .required('Nazwa jest wymagana!'),
  email: yup.string()
    .email('Email jest niepoprawny!').required('Email jest wymagany!'),
  password: yup.string()
    .min(8, "Minimalna długość hasła to 8 znaków!").required('Hasło jest wymagane!'),
  confirmPassword: yup.string()
    .oneOf([yup.ref("password")], "Hasła muszą być takie same!").required('Hasło jest wymagane!'),
});

const Register = () => {
  const defaultValue = useMemo(() => ({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  }), []);
  const history = useHistory();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,

    formState: {
      errors,
    },
  } = useForm({
    defaultValues: useMemo(() => {
      return defaultValue;
    }, [defaultValue]),
    resolver: yupResolver(validationSchema),
  });

  const handlegoBack = () => {
    history.goBack();
  }

  const onSubmit = (values: any) => {
    const payload = values;
    delete payload['confirmPassword'];
    dispatch(registerUser(payload));
  };

  return (
    <div className="container">
      <div className="text">
        <h1>LOGO</h1>
        <h3>Utwórz nowe konto</h3>
      </div>
      <div className="form">
        <form onSubmit={handleSubmit(onSubmit)} key={'register'}>
          <CustomInput
            {...register('userName')}
            placeholder="Nazwa użytkownika"
            type="text"
            helperText={errors.userName?.message}
            error={!!errors.userName}
          />
          <CustomInput
            {...register('email')}
            placeholder="Email"
            type="email"
            helperText={errors.email?.message}
            error={!!errors.email}
          />
          <CustomInput
            {...register('password')}
            placeholder="Hasło"
            type="password"
            helperText={errors.password?.message}
            error={!!errors.password}
          />
          <CustomInput
            {...register('confirmPassword')}
            placeholder="Powtórz hasło"
            type="password"
            helperText={errors.confirmPassword?.message}
            error={!!errors.confirmPassword}
          />
          <CustomButton type='submit' className="btn-primary">Zarejestruj się</CustomButton>
          <ArrowBackIcon className="icon" onClick={handlegoBack} />
        </form>
      </div>
    </div>
  );
}

export default Register;