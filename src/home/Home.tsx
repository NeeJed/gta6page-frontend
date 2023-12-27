import React, { useState } from 'react';
import styles from './Home.module.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import { createNewRecord } from '../http/userAPI';

interface IFormState {
  name: string,
  email: string,
}

function Home() {
  const {register, handleSubmit, reset} = useForm<IFormState>()
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const onSubmit: SubmitHandler<IFormState> = async (data) => {
    setIsLoading(true)
    try {
      let response = await createNewRecord(data)
      setIsSuccess(true)
      reset()
    } catch (e) {
      if (e instanceof Error) {
        setErrorMessage(e.message)
        // setErrorMessage(e.response.data.message)
        console.log(e)
      }
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <>
          <h1>
            GTA 6
          </h1>
          <input type="name" placeholder="Введите имя:" {...register('name')}/>
          <input type="email" placeholder="Введите Email:" {...register('email')}/>
          <button disabled={isLoading}>
            Отправить заявку
          </button>
        </>
        {isSuccess
        ?
          <div className={styles.success}>Форма отправлена!</div>
        :
        <div>{errorMessage}</div>
        }
      </form>
    </div>
  );
}

export default Home;
