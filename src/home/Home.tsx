import React from 'react';
import styles from './Home.module.scss';
import { useForm, SubmitHandler } from 'react-hook-form';

const isSuccess = false;

interface IFormState {
  name: string,
  email: string,
}

const onSubmit: SubmitHandler<IFormState> = (data) => {
  console.log(data)
}

function Home() {

  const {register, handleSubmit} = useForm<IFormState>()

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
              <button>
                Отправить заявку
              </button>
          </>
        }
      </form>
    </div>
  );
}

export default Home;
