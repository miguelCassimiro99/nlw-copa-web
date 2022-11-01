interface HomeProps {
  count: number
}

export const getServerSideProps = async () => {
  const response = await fetch('http://localhost:3333/pools/count')
  const data = await response.json()
  return {
    props: {
      count: data.count
    }
  }
}

export default function Home(props: HomeProps) {
  return (
    <h1>Count: { props.count }</h1>
  )
}
