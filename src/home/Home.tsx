import React, { useState } from 'react';
import styles from './Home.module.scss';
import { useForm, SubmitHandler } from 'react-hook-form';

interface IFormState {
  name: string,
  email: string,
}

function Home() {
  const {register, handleSubmit, reset} = useForm<IFormState>()
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const onSubmit: SubmitHandler<IFormState> = (data) => {
    setIsLoading(true)
    fetch('http://localhost:5000/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(response => {
      response.json()
    }).then(data => {
      if(data !== null || data !== undefined) {
        setIsSuccess(true)
        reset()
      }
    }).finally(() => {
      setIsLoading(false)
    })
  }
  
  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {isSuccess
        ?
          <div className={styles.success}>Форма отправлена!</div>
        :
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
        }
      </form>
    </div>
  );
}

export default Home;
