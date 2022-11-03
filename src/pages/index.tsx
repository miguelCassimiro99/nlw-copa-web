interface HomeProps {
  count: number
}

export const getServerSideProps = async () => {
  try {
    const response = await fetch('http://localhost:3333/pools/count')
    const data = await response.json()

    return {
      props: {
        count: data.count
    }
  }
  } catch (error) {
    console.log('Error')
  }
  
}

export default function Home(props: HomeProps) {
  return (
    <h1 className="text-3xl font-semibold">Count: { props.count ? props.count : 0 }</h1>
  )
}
