import React, {useMemo, useState} from "react";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

const validationSchema = yup.object({
  email: yup.string().email('Email jest niepoprawny').required('Email jest wymagany!'),
  confirmEmail: yup.string().required('Hasło jest wymagane!'),
});

const Index = () => {
  const [defaultValue, setDefaultValue] = useState<any>({
    email: '',
    confirmEmail: '',
  });

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

  const onSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <div className="container">
      <div className="text">
        <h1>LOGO</h1>
        <h3>Wspieramy Twój Projekt</h3>
      </div>
      <div className="form">
        <form onSubmit={handleSubmit(onSubmit)} key={'forgotPassword'}>
          <CustomInput
            {...register('email')}
            placeholder="Email"
            type="email"
            helperText={errors.email?.message}
            error={errors.email}
          />
          <CustomInput
            {...register('confirmEmail')}
            placeholder="Powtórz email"
            type="email"
            helperText={errors.confirmPassword?.message}
            error={errors.confirmPassword}
          />
          <CustomButton type='submit' className="btn-primary">Zarejestruj się</CustomButton>
        </form>
      </div>
    </div>
  );
}

export default Index;