import Image from 'next/image'
import appPreviewImg from '../assets/app-nlw-copa-preview.png'
import logoImg from '../assets/logo.svg'
import avatarImg from '../assets/avatares.png'
import iconCheckImg from '../assets/icon-check.svg'
import { api } from '../lib/axios'
import { FormEvent, useState } from 'react'

interface HomeProps {
  poolCount: number
  guessCount: number
  userCount: number
}

export const getStaticProps = async () => {
  const [ poolCountResponse, guessCountResponse, userCountResponse ] = await Promise.all([
    api.get('pools/count'),
    api.get('guesses/count'),
    api.get('users/count')
  ])

  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      userCount: userCountResponse.data.count
    }
  }
}

export default function Home(props: HomeProps) {

  const [poolTitle, setPoolTitle] = useState('')

  async function createPool(event: FormEvent) {
    event.preventDefault()

    try {
      const response = await api.post('/pools', {
        title: poolTitle
      })

      const { code } = response.data;

      await navigator.clipboard.writeText(code)
      alert('Bolão criado com sucesso, código copiado para a área de transferência')
      setPoolTitle('')

    } catch (error) {
      alert('Falha ao criar bolão')
      console.log(error)
    }

  }

  return (
    <div className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 items-center gap-28">
      <main>
        <Image src={logoImg} alt="NLW Copa" />
        <h1 className="mt-14 text-white font-bold text-5xl leading-tight">
          Crie seu próprio boão da copa e compartilhe entre amigos!
        </h1>

        <div className="mt-10 flex items-center gap-2">
          <Image src={avatarImg} alt="users" />
          
          <strong className="text-gray-100 text-xl">
            <span className="text-ignite-500">+{props.userCount || 0}</span> pessoas já estão usando
          </strong>
        </div>

        <form onSubmit={createPool} className="mt-10 flex gap-2">
          <input
            className="flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100"
            type="text"
            required
            placeholder='Qual nome do seu bolão?'
            onChange={event => setPoolTitle(event.target.value)}
            value={poolTitle}
          />
          <button
            type="submit"
            className="bg-nlw-yellow-500 px-6 py-4 rounded text-lg text-gray-900 font-bold uppercase hover:bg-yellow-400"
          >
              Criar meu bolão
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-300 leading-relaxed">Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas</p>

        <div className="mt-10 pt-10 border-t border-gray-600 flex justify-between items-center text-gray-100">
          <div className="flex items-center gap-6">
            <Image src={iconCheckImg} alt="icon check" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{props.poolCount || 0}</span>
              <span>Bolões criados</span>
            </div>
          </div>

          <div className="h-14 w-px bg-gray-600"></div>
          <div className="flex items-center gap-6">
            <Image src={iconCheckImg} alt="icon check" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{props.guessCount || 0}</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>

      </main>

      <Image src={appPreviewImg} alt="Two cellphones displaying the app preview" />
    </div>
  )
}
